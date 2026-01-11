import { ParallaxBanner } from "react-scroll-parallax";
import cls from "./dn42.module.scss";
import DN42 from "./../assets/images/dn42.svg?no-inline";
import { Element } from 'react-scroll'
import { Badge, Heading, IconButton, Link, Text, Tooltip, Table, Button, Card, Switch, Flex, Dialog, Spinner } from "@radix-ui/themes";
import { PiDiscordLogoDuotone, PiEnvelopeDuotone, PiGithubLogoDuotone, PiInfoDuotone, PiPhoneCallDuotone, PiFacebookLogoDuotone, PiMatrixLogoDuotone, PiComputerTowerDuotone, PiBroadcastDuotone, PiTelegramLogoDuotone } from "react-icons/pi";

import { useCallback, useEffect, useMemo, useState } from "react";

import { NodeTables } from "../components/NodeTables";

import { ContinentColors, CountryToContinent } from "../components/geoinfo";
import NodeMap from "../components/NodeMap";

const ListSocial = [
    {
        name: "Matrix",
        icon: <PiMatrixLogoDuotone size={25} />,
        url: "https://matrix.to/#/@badaimweeb:matrix.org"
    },
    {
        name: "Email",
        icon: <PiEnvelopeDuotone size={25} />,
        url: "mailto:dn42@badaimweeb.me"
    },
    {
        name: "Telegram",
        icon: <PiTelegramLogoDuotone size={25} />,
        url: "https://t.me/badaimweeb"
    },
    {
        name: "Discord",
        icon: <PiDiscordLogoDuotone size={25} />,
        url: "https://discord.gg/uF9gxYveek"
    },
    {
        name: "GitHub",
        icon: <PiGithubLogoDuotone size={25} />,
        url: "https://github.com/BadAimWeeb"
    },
    {
        name: "Facebook",
        icon: <PiFacebookLogoDuotone size={25} />,
        url: "https://www.facebook.com/badaimweeb"
    },
];

const Services = [
    {
        image: "",
        name: "Looking Glass",
        type: "",
        description: "bird-lg with a different frontend",
        buttons: [
            {
                name: "ext",
                url: "https://dn42-lg.badaimweeb.me"
            },
            {
                name: "dn42",
                url: "https://lg.badaimweeb.dn42"
            }
        ]
    },
    {
        image: "",
        name: "FlapAlerted",
        type: "",
        description: "an instance of FlapAlerted by Kioubit",
        buttons: [
            {
                name: "ext",
                url: "https://dn42-fa.badaimweeb.me"
            },
            {
                name: "dn42",
                url: "https://fa.badaimweeb.dn42"
            }
        ]
    },
    {
        image: "",
        name: "Anycast IP",
        type: "",
        description: "pingable anycast IP for testing connectivity",
        buttons: [
            {
                name: "dn42 ipv4",
                url: "http://172.22.130.175"
            },
            {
                name: "dn42 ipv6",
                url: "http://[fd99:727:bad0:f000::]"
            }
        ]
    }
];

export default function PageDN42() {
    const [openTable, setOpenTable] = useState(false);


    const [topology, setTopology] = useState<{
        topology: Record<string, [string, number | null, string | null][]>;
        rgCode: Record<string, string>;
        geo: Record<string, [number, number]>;
    } | null>(null);

    const formattedTopology = useMemo(() => {
        if (!topology) return {};

        const formatted: Record<string, Record<string, [nhRTT: number | null, nh: string | null]>> = {};
        for (let node in topology.topology) {
            formatted[node] = {};

            for (let [peer, nhRTT, nh] of topology.topology[node]) {
                formatted[node][peer] = [nhRTT, nh];
            }
        }

        return formatted;
    }, [topology]);
    const dynamicRgCode = useMemo(() => topology?.rgCode || {}, [topology]);
    const dynamicGeo = useMemo(() => topology?.geo || {}, [topology]);

    const [toggleTopology, setToggleTopology] = useState(false);
    const [toggleTopologyReverse, setToggleTopologyReverse] = useState(false);
    const [currentNodeSelected, setCurrentNodeSelected] = useState<string | null>(null);
    const currentNodeRCSelected = useMemo(() => {
        if (!currentNodeSelected) return null;
        return NodeTables.find(x => x.sc === currentNodeSelected)?.rc || null;
    }, [currentNodeSelected]);

    useEffect(() => {
        function fetchTopology() {
            fetch("https://lambda-landing.badaimweeb.me/topology")
                .then(res => res.json())
                .then(data => setTopology(data))
                .catch(() => { });
        }

        fetchTopology();
        fetchTopology();
        const interval = setInterval(fetchTopology, 15 * 1000);
        return () => clearInterval(interval);
    }, []);

    const [sortBy, setSortBy] = useState<"sc" | "rc">("rc");
    const [sortDirection, setSortDirection] = useState<1 | -1>(1);

    const handleSortChange = useCallback((sort: typeof sortBy) => {
        if (sort === sortBy) {
            setSortDirection(oldSortDirection => (oldSortDirection === 1 ? -1 : 1));
        } else {
            setSortBy(sort);
        }
    }, [sortBy, setSortBy, setSortDirection]);

    const cacheLatencyTable = useMemo(() => {
        if (!topology) return <Spinner size="3" />

        const nt = NodeTables.slice().sort((a, b) => CountryToContinent[a.rc.slice(0, 2).toLocaleUpperCase()]?.localeCompare(CountryToContinent[b.rc.slice(0, 2).toLocaleUpperCase()]) || a.rc.localeCompare(b.rc));

        return <Table.Root style={{ width: '100%', height: '80vh' }}>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell
                        style={{
                            whiteSpace: "nowrap",
                            position: "sticky",
                            top: 0,
                            left: 0,
                            zIndex: 20,
                            backgroundColor: "var(--color-panel-solid)"
                        }}
                    >From \ To</Table.ColumnHeaderCell>
                    {nt.map((node, index) => (
                        <Table.ColumnHeaderCell style={{
                            whiteSpace: "nowrap", position: "sticky", top: 0, zIndex: 20,
                            backgroundColor: ContinentColors[CountryToContinent[node.country] || ""] || "var(--gray-7)"
                        }} key={index}><Tooltip content={node.displayName}><div>{node.rc}</div></Tooltip></Table.ColumnHeaderCell>
                    ))}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {nt.map((fromNode, rowIndex) => {
                    return <Table.Row key={rowIndex}>
                        <Table.Cell style={{
                            fontWeight: "bold", whiteSpace: "nowrap", position: "sticky", left: 0, zIndex: 10,
                            backgroundColor: ContinentColors[CountryToContinent[fromNode.country] || ""] || "var(--gray-7)"
                        }}><Tooltip content={fromNode.displayName}><div>{fromNode.rc}</div></Tooltip></Table.Cell>
                        {nt.map((toNode) => {
                            if (fromNode.sc === toNode.sc) {
                                return <Table.Cell key={fromNode.sc} style={{ backgroundColor: "#444444" }}>-</Table.Cell>;
                            } else {
                                const hop: [String, number][] = [];
                                let latency = 0;

                                let nextHop = fromNode.sc;
                                for (; ;) {
                                    const entry = formattedTopology[nextHop]?.[toNode.sc]; //topology?.topology[nextHop].find(x => x[0] === toNode.sc);
                                    if (!entry) {
                                        hop.push(["×(no path)", 0]);
                                        latency = 0;
                                        break;
                                    }

                                    let [nhRTT, nh] = entry;

                                    if (nh) {
                                        latency += nhRTT ?? NaN;
                                        nextHop = nh;
                                        if (hop.find(x => x[0] === nextHop)) {
                                            hop.push(["×(loop - " + nextHop + ")", 0]);
                                            latency = 0;
                                            break;
                                        }

                                        hop.push([nh, Math.round((nhRTT as number || 0) * 10) / 10]);
                                    } else {
                                        latency += nhRTT ?? NaN;
                                        break;
                                    }
                                }

                                let tooltip = `${fromNode.displayName} → ${toNode.displayName}\n`;

                                if (hop.length) {
                                    let cul = 0;
                                    for (let [hn, hl] of hop) {
                                        let hopNode = nt.find(x => x.sc === hn);
                                        if (hopNode) {
                                            tooltip += `\n via  ${hopNode.displayName} (${cul ? "+" : ""}${hl}ms) (PL ${Math.ceil((cul += hl) * 10) / 10}ms)`;
                                        } else {
                                            tooltip += `\n via ${hn} (${cul ? "+" : ""}${hl}ms) (PL ${Math.ceil((cul += hl) * 10) / 10}ms)`;
                                        }
                                    }
                                    if (latency - cul > 0)
                                        tooltip += `\n last-mile (+${Math.ceil((latency - cul) * 10) / 10}ms)`;
                                } else {
                                    tooltip += `\n direct`;
                                }

                                return <Table.Cell key={fromNode.sc + "-" + toNode.sc} style={{ whiteSpace: "nowrap", color: latency > 150 ? "#ff6b6b" : latency > 50 ? "#ffd93d" : latency > 0 ? "#8aff7f" : "inherit" }}>
                                    <Tooltip content={tooltip} style={{ whiteSpace: "pre-wrap" }}>
                                        <div>
                                            {(latency > 0 && !isNaN(latency)) ? Math.ceil(latency) + "ms" : "N/A"}
                                            <sup style={{ fontSize: "0.6em" }}>{hop.length ? hop.length : ""}</sup>
                                        </div>
                                    </Tooltip>
                                </Table.Cell>;
                            }
                        })}
                    </Table.Row>
                })}
                <Table.Row>
                    <Table.Cell style={{ height: "var(--space-4)" }}></Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table.Root>;
    }, [topology]);

    return (
        <div className={cls.HomePage}>
            <Element name="home" className={cls.Main}>
                <ParallaxBanner
                    layers={[{ image: DN42, speed: -25, className: cls.BannerInner }]}
                    className={cls.Banner}
                />
                <div className={cls.Info}>
                    <Heading className={cls.Hello} size="6">
                        BadAimWeeb's dn42 stuff
                    </Heading>
                    <Text size="2" color="gray">
                        AS4242423797
                    </Text>
                </div>
            </Element>
            <Element name="information" className={cls.Section}>
                <div className={cls.Heading}>
                    <IconButton className={cls.Icons} size="4" variant="surface">
                        <PiInfoDuotone size={25} />
                    </IconButton>
                    <div className={cls.Inf}>
                        <Heading style={{ "--text-color": "#e2d1d4" } as React.CSSProperties} className={"PrettyTitle"} size="4">
                            information
                        </Heading>
                        <Text size="1" color="gray">
                            bla bla bla...
                        </Text>
                    </div>
                </div>
                <div className={cls.BodyInformation}>
                    <div className={cls.Content}>
                        <Text size="2" color="gray">
                            I run a various of services on dn42. This page will serve as a hub for my dn42-related stuff.<br />
                            <br /><br />
                            My AS follows these well-known BGP community:
                            <ul>
                                <li><Link href="https://www.iana.org/go/rfc1997">NO_EXPORT</Link> (65535:65281)</li>
                                <li><Link href="https://www.iana.org/go/rfc1997">NO_ADVERTISE</Link> (65535:65282)</li>
                                <li><Link href="https://www.iana.org/go/rfc1997">NO_EXPORT_SUBCONFED</Link> (65535:65283)</li>
                                <li><Link href="https://www.iana.org/go/rfc8326">GRACEFUL_SHUTDOWN</Link> (65535:0)</li>
                            </ul>
                            My AS also includes informational large communities on the advertised routes:
                            <ul>
                                <li>
                                    <b>(4242423797, 100, ABCD)</b>: routes learned by server code ABCD (AB corresponds to index in alphabet, 1 = "A")
                                    <ul>
                                        <li><i>For example: 306 corresponds to server code C06 (check table below)</i></li>
                                    </ul>
                                </li>
                                <li><b>(4242423797, 101, 41..70)</b>: routes learned in server with this <Link href="https://dn42.dev/howto/BGP-communities#region">dn42 region</Link></li>
                                <li><b>(4242423797, 102, x)</b>: routes learned in server with this <Link href="https://github.com/lukes/ISO-3166-Countries-with-Regional-Codes/blob/master/all/all.csv">ISO 3166-1 numeric country code</Link></li>
                            </ul>
                            Cold-potato routing is used if route contains dn42 region community and/or dn42 country community. Hot-potato routing is used otherwise.<br />
                            Routes with AS_LENGTH &gt; 8 are rejected, as it usually indicates a zombie/ghost route (failed to withdraw routes down the chain).<br />
                            <br /><br />
                            If you want to peer with me, I have a few requirements:<br />
                            <ul>
                                <li>you must have a valid ASN and information in dn42 registry</li>
                                <li>your node must implement ROA checks</li>
                                <li>your node must support IPv6</li>
                                <li>your node should have a latency of &lt;= 20ms. in rare circumstances, i may allow for a higher latency peerings.</li>
                                <li>(optional) your node should be able to do MP-BGP with Extended Next Hop (IPv4 over IPv6 next hop).</li>
                                <li>(optional) your node should have a public internet IP address. if not (or if you node have DDNS instead), please let me know.</li>
                                <li>(optional) your node should have BFD enabled and configured.</li>
                            </ul>
                            I prefer using WireGuard as the transport protocol, but I'm open to experimenting with other protocols.<br />
                            To request peering, please contact me via one of the contact links below.
                        </Text>
                    </div>
                </div>
            </Element>
            <Element name="node-list" className={cls.Section}>
                <div className={cls.Heading}>
                    <IconButton className={cls.Icons} size="4" variant="surface">
                        <PiComputerTowerDuotone size={25} />
                    </IconButton>
                    <div className={cls.BodyNodeList}>
                        <Heading style={{ "--text-color": "#e2d1d4" } as React.CSSProperties} className={"PrettyTitle"} size="4">
                            node list
                        </Heading>
                        <Text size="1" color="gray">
                            where are my nodes?
                        </Text>
                    </div>
                </div>
                <div className={cls.BodyNodeList}>
                    <div className={cls.Content}>
                        <div style={{ marginBottom: 16 }}>
                            <Text as="label" size="2">
                                <Flex gap="2">
                                    <Switch size="3" checked={toggleTopology} onCheckedChange={setToggleTopology} />
                                    Toggle topology viewing (forward path)
                                </Flex>
                            </Text>
                        </div>
                        <div style={{ marginBottom: 16 }}>
                            <Text as="label" size="2">
                                <Flex gap="2">
                                    <Switch size="3" checked={toggleTopologyReverse} onCheckedChange={setToggleTopologyReverse} />
                                    Toggle topology viewing (reverse path)
                                </Flex>
                            </Text>
                        </div>

                        <NodeMap
                            currentNodeSelected={currentNodeSelected}
                            setCurrentNodeSelected={setCurrentNodeSelected}
                            toggleTopology={toggleTopology}
                            toggleTopologyReverse={toggleTopologyReverse}
                            formattedTopology={formattedTopology || {}}
                            dynamicRgCode={dynamicRgCode}
                            dynamicGeo={dynamicGeo}
                        />

                        {(toggleTopology || toggleTopologyReverse) && <div style={{ marginBottom: 8 }}>
                            <Text size="2" color="gray">Click on a node marker to view topology for that node.</Text>
                            {!!currentNodeSelected && <><br /><Text size="2" color="gray">Currently viewing topology for <strong>{currentNodeRCSelected}</strong> ({currentNodeSelected}). <Link href="#bruh" onClick={() => setCurrentNodeSelected(null)}>Clear selection</Link></Text></>}
                        </div>}
                        <br />
                        <Link href="#bruh" onClick={() => setOpenTable(x => !x)}>{!openTable ? "or view a table of nodes instead..." : "close node list table"}</Link>
                        {openTable && (
                            <div className={cls.TableWrapper}>
                                <Table.Root>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.ColumnHeaderCell style={{ position: "sticky", top: 0, backgroundColor: "var(--color-panel-solid)", zIndex: 1 }}><Link href="#sort" onClick={() => handleSortChange("sc")}>Server</Link></Table.ColumnHeaderCell>
                                            <Table.ColumnHeaderCell style={{ position: "sticky", top: 0, backgroundColor: "var(--color-panel-solid)", zIndex: 1 }}><Link href="#sort" onClick={() => handleSortChange("rc")}>Region Code</Link></Table.ColumnHeaderCell>
                                            <Table.ColumnHeaderCell style={{ position: "sticky", top: 0, backgroundColor: "var(--color-panel-solid)", zIndex: 1 }}>IPv4</Table.ColumnHeaderCell>
                                            <Table.ColumnHeaderCell style={{ position: "sticky", top: 0, backgroundColor: "var(--color-panel-solid)", zIndex: 1 }}>IPv6</Table.ColumnHeaderCell>
                                            <Table.ColumnHeaderCell style={{ position: "sticky", top: 0, backgroundColor: "var(--color-panel-solid)", zIndex: 1 }}>Endpoint</Table.ColumnHeaderCell>
                                            <Table.ColumnHeaderCell style={{ position: "sticky", top: 0, backgroundColor: "var(--color-panel-solid)", zIndex: 1 }}>DN42 IP</Table.ColumnHeaderCell>
                                            <Table.ColumnHeaderCell style={{ position: "sticky", top: 0, backgroundColor: "var(--color-panel-solid)", zIndex: 1 }}>Notes</Table.ColumnHeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {NodeTables
                                            .slice()
                                            .sort((a, b) => {
                                                if (a[sortBy] < b[sortBy]) return -1 * sortDirection;
                                                if (a[sortBy] > b[sortBy]) return 1 * sortDirection;

                                                return 0;
                                            })
                                            .map((node, index) => (
                                                <Table.Row key={index}>
                                                    <Table.Cell>{node.sc}</Table.Cell>
                                                    <Table.Cell>{node.rc}</Table.Cell>
                                                    <Table.Cell>{node.ipv4}</Table.Cell>
                                                    <Table.Cell>{node.ipv6}</Table.Cell>
                                                    <Table.Cell><code>{node.endpoint}</code></Table.Cell>
                                                    <Table.Cell><code>{node.dn42IPv4}</code><br /><code>{node.dn42IPv6}</code></Table.Cell>
                                                    <Table.Cell style={{
                                                        whiteSpace: "pre-wrap"
                                                    }}>{node.notes}</Table.Cell>
                                                </Table.Row>
                                            ))}
                                    </Table.Body>
                                </Table.Root>
                            </div>
                        )}
                        <br />
                        <br />
                        <Dialog.Root>
                            <Dialog.Trigger>
                                <Link href="#bruh2">view latency table</Link>
                            </Dialog.Trigger>
                            <Dialog.Content maxWidth="90vw" style={{ padding: 0 }}>
                                <div style={{ padding: "var(--space-5)", paddingBottom: 0 }}>
                                    <Dialog.Title>Latency Table</Dialog.Title>
                                </div>

                                <div style={{ padding: "0 var(--space-4) 0 var(--space-4)", position: "relative" }}>
                                    {cacheLatencyTable}
                                </div>
                            </Dialog.Content>
                        </Dialog.Root>
                    </div>
                </div>
            </Element>
            <Element name="dn42-services" className={cls.Section}>
                <div className={cls.Heading}>
                    <IconButton className={cls.Icons} size="4" variant="surface">
                        <PiBroadcastDuotone size={25} />
                    </IconButton>
                    <div className={cls.Inf}>
                        <Heading style={{ "--text-color": "#e2d1d4" } as React.CSSProperties} className={"PrettyTitle"} size="4">
                            dn42 services
                        </Heading>
                        <Text size="1" color="gray">
                            i run stuff
                        </Text>
                    </div>
                </div>
                <div className={cls.BodyProjects}>
                    {Services.map((project, index) => (
                        <Card variant="surface" key={index} className={cls.Projects}>
                            <img src={project.image} alt={project.name} className={cls.ProjectImage} />

                            <div className={cls.ProjectInfoContainer}>
                                <div className={cls.ProjectInfo}>
                                    <Heading size="3" className={"PrettyTitle"}>
                                        {project.name} {project.type ? <Badge size="1" style={{ marginLeft: 4 }}>{project.type}</Badge> : null}
                                    </Heading>
                                    <Text size="1" color="gray" className={cls.ProjectDescription}>
                                        {project.description}
                                    </Text>
                                </div>
                                <div className={cls.space}></div>
                                <div className={cls.Action}>
                                    {project.buttons.map((button, index) => (
                                        <a href={button.url} target="_blank" rel="noreferrer">
                                            <Button size="1" key={index} variant="solid" className={cls.ProjectButton}>
                                                {button.name}
                                            </Button>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </Element>
            <Element name="contact-me" className={cls.Section}>
                <div className={cls.Heading}>
                    <IconButton className={cls.Icons} size="4" variant="surface">
                        <PiPhoneCallDuotone size={25} />
                    </IconButton>
                    <div className={cls.Inf}>
                        <Heading style={{ "--text-color": "#e2d1d4" } as React.CSSProperties} className={"PrettyTitle"} size="4">
                            contact
                        </Heading>
                        <Text size="1" color="gray">
                            of course
                        </Text>
                    </div>
                </div>
                <div className={cls.BodyContact}>
                    <Text align="center" size="3" color="gray">
                        except for email, all buttons here are the same in home page.<br />
                        again, this is sorted by most to least recommended:<br />
                    </Text>

                    <div className={cls.List}>
                        {ListSocial.map((social, index) => (
                            <Tooltip content={social.name} key={index}>
                                <a href={social.url} target="_blank" title={social.name} rel="noreferrer">
                                    <IconButton size="4" variant="surface" className={cls.Social}>
                                        {social.icon}
                                    </IconButton>
                                </a>
                            </Tooltip>
                        ))}
                    </div>
                </div>
            </Element>
        </div>
    )
}
