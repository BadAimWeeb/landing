import { ParallaxBanner } from "react-scroll-parallax";
import cls from "./dn42.module.scss";
import DN42 from "./../assets/images/dn42.svg?no-inline";
import { Element } from 'react-scroll'
import { Badge, Heading, IconButton, Link, Text, Tooltip, Table, Button, Card, Switch, Flex } from "@radix-ui/themes";
import { PiDiscordLogoDuotone, PiEnvelopeDuotone, PiGithubLogoDuotone, PiInfoDuotone, PiPhoneCallDuotone, PiFacebookLogoDuotone, PiMatrixLogoDuotone, PiComputerTowerDuotone, PiBroadcastDuotone } from "react-icons/pi";
import { MapContainer, Marker, TileLayer, Popup as MapPopup } from 'react-leaflet'
import MarkerClusterGroup from "react-leaflet-cluster";
import TextPath from 'react-leaflet-textpath';
import { useEffect, useMemo, useState } from "react";
import { Icon } from "leaflet";

import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import MarkerIcon2X from "leaflet/dist/images/marker-icon-2x.png";
import MarkerShadow from "leaflet/dist/images/marker-shadow.png";

enum IPAvailability {
    No = "No",
    NAT = "NAT",
    Tunnel = "Tunnel",
    Yes = "Yes"
}

const NodeTables = [
    {
        sc: "A00",
        rc: "vn-lth1",
        flag: "🇻🇳",
        lat: 10.772611,
        lon: 107.045278,
        endpoint: "<contact>.rc.badaimweeb.me",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.Yes,
        notes: "Residental network."
    },
    {
        sc: "A04",
        rc: "vn-lth3",
        flag: "🇻🇳",
        lat: 10.772611,
        lon: 107.045278,
        endpoint: "vn-lth3.rc.badaimweeb.me",
        ipv4: IPAvailability.NAT,
        ipv6: IPAvailability.Yes,
        notes: "Residental network. Upstream is A00."
    },
    {
        sc: "A05",
        rc: "vn-lth4",
        flag: "🇻🇳",
        lat: 10.772611,
        lon: 107.045278,
        endpoint: "vn-lth4.rc.badaimweeb.me",
        ipv4: IPAvailability.NAT,
        ipv6: IPAvailability.Yes,
        notes: "Residental network. Upstream is A00."
    },
    {
        sc: "A06",
        rc: "vn-lth5",
        flag: "🇻🇳",
        lat: 10.772611,
        lon: 107.045278,
        endpoint: "vn-lth5.rc.badaimweeb.me",
        ipv4: IPAvailability.NAT,
        ipv6: IPAvailability.Yes,
        notes: "Residental network. Upstream is A00."
    },
    {
        sc: "C02",
        rc: "us-dfw1",
        flag: "🇺🇸",
        lat: 32.896944,
        lon: -97.038056,
        endpoint: "us-dfw1.rc.badaimweeb.me",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.Tunnel,
        notes: null
    },
    {
        sc: "C04",
        rc: "us-ord1",
        flag: "🇺🇸",
        lat: 41.978611,
        lon: -87.904722,
        endpoint: "us-ord1.rc.badaimweeb.me",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.Tunnel,
        notes: null
    },
    {
        sc: "C05",
        rc: "de-fra2",
        flag: "🇩🇪",
        lat: 50.033333,
        lon: 8.570556,
        endpoint: "de-fra2.rc.badaimweeb.me",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.No,
        notes: "This node has slightly weak resources."
    },
    {
        sc: "C06",
        rc: "vn-sgn1",
        flag: "🇻🇳",
        lat: 10.818889,
        lon: 106.651944,
        endpoint: "vn-sgn1.rc.badaimweeb.me",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.Yes,
        notes: null
    },
    {
        sc: "C07",
        rc: "my-jhb1",
        flag: "🇲🇾",
        lat: 1.640556,
        lon: 103.670278,
        endpoint: "my-jhb1.rc.badaimweeb.me",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.Yes,
        notes: "Singapore nodes can peer with this node."
    },
    {
        sc: "C08",
        rc: "vn-han1",
        flag: "🇻🇳",
        lat: 21.213889,
        lon: 105.803056,
        endpoint: "vn-han1.rc.badaimweeb.me",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.Yes,
        notes: null
    },
    {
        sc: "C09",
        rc: "de-fra1",
        flag: "🇩🇪",
        lat: 50.033333,
        lon: 8.570556,
        endpoint: "de-fra1.rc.badaimweeb.me",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.Yes,
        notes: null
    },
    {
        sc: "C10",
        rc: "au-syd1",
        flag: "🇦🇺",
        lat: -33.946111,
        lon: 151.177222,
        endpoint: "au-syd1.rc.badaimweeb.me",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.Yes,
        notes: null
    },
    {
        sc: "C11",
        rc: "us-lax1",
        flag: "🇺🇸",
        lat: 33.9425,
        lon: -118.408056,
        endpoint: "us-lax1.rc.badaimweeb.me",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.No,
        notes: null
    },
    {
        sc: "C12",
        rc: "br-gru1",
        flag: "🇧🇷",
        lat: -23.435556,
        lon: -46.473056,
        endpoint: "br-gru1.rc.badaimweeb.me",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.Yes,
        notes: null
    },
    {
        sc: "C13",
        rc: "hk-hkg1",
        flag: "🇭🇰",
        lat: 22.308889,
        lon: 113.914444,
        endpoint: "hk-hkg1.rc.badaimweeb.me",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.Yes,
        notes: null
    },
    {
        sc: "C14",
        rc: "us-tpa1",
        flag: "🇺🇸",
        lat: 27.979722,
        lon: -82.534722,
        endpoint: "us-tpa1.rc.badaimweeb.me",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.Yes,
        notes: null
    },
    {
        sc: "C15",
        rc: "tw-tpe1",
        flag: "🇹🇼",
        lat: 25.076389,
        lon: 121.223889,
        endpoint: "tw-tpe1.rc.badaimweeb.me",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.Yes,
        notes: null
    },
    {
        sc: "C16",
        rc: "jp-hnd1",
        flag: "🇯🇵",
        lat: 35.553333,
        lon: 139.781111,
        endpoint: "jp-hnd1.rc.badaimweeb.me",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.Yes,
        notes: null
    },
    {
        sc: "C17",
        rc: "ao-nbj1",
        flag: "🇦🇴",
        lat: -9.046778,
        lon: 13.507194,
        endpoint: "ao-nbj1.rc.badaimweeb.me",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.No,
        notes: null
    },
    {
        sc: "C18",
        rc: "us-sjc1",
        flag: "🇺🇸",
        lat: 37.362778,
        lon: -121.929167,
        endpoint: "us-sjc1.rc.badaimweeb.me",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.Yes,
        notes: "Unmetered connection @ 1Gbps"
    },
    {
        sc: "C19",
        rc: "gb-lhr1",
        flag: "🇬🇧",
        lat: 51.4775,
        lon: -0.461389,
        endpoint: "gb-lhr1.rc.badaimweeb.me",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.No,
        notes: "Unmetered connection @ 10Gbps"
    },
    {
        sc: "C20",
        rc: "us-jfk1",
        flag: "🇺🇸",
        lat: 40.639722,
        lon: -73.778889,
        endpoint: "us-jfk1.rc.badaimweeb.me",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.Yes,
        notes: "Unmetered connection @ 10Gbps"
    },
    {
        sc: "E03",
        rc: "vn-sgn2",
        flag: "🇻🇳",
        lat: 10.818889,
        lon: 106.651944,
        endpoint: "vn-sgn2.rc.badaimweeb.me",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.No,
        notes: null
    },
    {
        sc: "G00",
        rc: "us-msp3",
        flag: "🇺🇸",
        lat: 44.881944,
        lon: -93.221667,
        endpoint: "<contact>.rc.badaimweeb.me",
        ipv4: IPAvailability.NAT,
        ipv6: IPAvailability.Yes,
        notes: "Residental network. This node may not be used as transit to other AS since it has low upload/download speed. Dual upstream T-Mobile 5G & Comcast @ G99."
    },
    {
        sc: "G99",
        rc: "us-msp1",
        flag: "🇺🇸",
        lat: 44.881944,
        lon: -93.221667,
        endpoint: "<contact>.rc.badaimweeb.me",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.Yes,
        notes: "Residental network. This node may not be used as transit to other AS since it has low upload/download speed."
    },
    {
        sc: "H01",
        rc: "vn-dad1",
        flag: "🇻🇳",
        lat: 16.043889,
        lon: 108.199444,
        endpoint: "vn-dad1.rc.badaimweeb.me",
        ipv4: IPAvailability.NAT,
        ipv6: IPAvailability.Yes,
        notes: "Residental network. Operated by MICHIOXD-MNT, you can also peer with him :)"
    }
];

const ListSocial = [
    {
        name: "Matrix",
        icon: <PiMatrixLogoDuotone size={25} />,
        url: "https://matrix.to/#/@badaimweeb:matrix.org"
    },
    {
        name: "Discord",
        icon: <PiDiscordLogoDuotone size={25} />,
        url: "https://discord.gg/uF9gxYveek"
    },
    {
        name: "Email",
        icon: <PiEnvelopeDuotone size={25} />,
        url: "mailto:dn42@badaimweeb.me"
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
    }
];

function getCoords(nodeName: string, topology: { rgCode: Record<string, string>; geo: Record<string, [number, number]>; }): [number, number] | null {
    const node = NodeTables.find(x => x.sc === nodeName);
    if (node) return [node.lat, node.lon];

    // Infer from airport code
    const rg = topology.rgCode[nodeName];
    const airport = rg.slice(3, 6).toLowerCase();
    if (airport in topology.geo) {
        return topology.geo[airport];
    }

    return null;
}

function mirrorNearest(startLon: number, targetLon: number): number {
    let distMirrors = [Math.abs(startLon - (targetLon - 360)), Math.abs(startLon - targetLon), Math.abs(startLon - (targetLon + 360))];

    return (distMirrors.indexOf(Math.min(...distMirrors)) - 1) * 360;
}

export default function PageDN42() {
    const [openTable, setOpenTable] = useState(false);
    const MarkerIconLL = useMemo(() => new Icon({
        iconUrl: MarkerIcon,
        iconRetinaUrl: MarkerIcon2X,
        shadowUrl: MarkerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
    }), []);

    const [topology, setTopology] = useState<{
        topology: Record<string, [string, string | number][]>;
        rgCode: Record<string, string>;
        geo: Record<string, [number, number]>;
    } | null>(null);
    const [toggleTopology, setToggleTopology] = useState(false);
    const [toggleTopologyReverse, setToggleTopologyReverse] = useState(false);
    const [currentNodeSelected, setCurrentNodeSelected] = useState<string | null>(null);

    const renderTopologyPath = useMemo(() => {
        if (!topology || !toggleTopology || !currentNodeSelected) return [];

        const paths: Record<string, [[number, number], [number, number], string]> = {};
        const selectedNodeCoords = getCoords(currentNodeSelected, topology);
        if (!selectedNodeCoords) return [];

        for (let [peer, nextHopOrLatency] of topology.topology[currentNodeSelected] || []) {
            const topologyNonNull = topology;
            function recursivelyTraversePath(target: string, current: string, mirror = 0, past: string[] = []) {
                if (past.includes(current)) return; // avoid circular path

                const t = topologyNonNull.topology[current]?.find(x => x[0] === target);
                if (t) {
                    const latencyOrNextHop = t[1];
                    const currentNodeCoords = getCoords(current, topologyNonNull);
                    if (!currentNodeCoords) return;
                    currentNodeCoords[1] += mirror;

                    switch (typeof latencyOrNextHop) {
                        case "number": {
                            const latency = latencyOrNextHop;

                            const targetNodeCoords = getCoords(target, topologyNonNull);

                            if (targetNodeCoords) {
                                targetNodeCoords[1] += mirror;

                                const furtherMirrorShift = mirrorNearest(currentNodeCoords[1], targetNodeCoords[1]);

                                paths[current + "-" + target] = [currentNodeCoords, [targetNodeCoords[0], targetNodeCoords[1] + furtherMirrorShift], Math.ceil(latency) + "ms"];
                            }
                            
                            return;
                        }
                        case "string": {
                            const nextHop = latencyOrNextHop;

                            const nextHopLatency = topologyNonNull.topology[current]?.find(x => x[0] === nextHop)?.[1] as number;
                            const nextHopCoords = getCoords(nextHop, topologyNonNull);
                            if (!nextHopCoords) return;

                            nextHopCoords[1] += mirror;

                            const furtherMirrorShift = mirrorNearest(currentNodeCoords[1], nextHopCoords[1]);
                            nextHopCoords[1] += furtherMirrorShift;

                            paths[current + "-" + nextHop] = [currentNodeCoords, nextHopCoords, Math.ceil(nextHopLatency) + "ms"];

                            recursivelyTraversePath(target, nextHop, mirror + furtherMirrorShift, past.concat(current));
                            break;
                        }
                    }
                }
            }

            switch (typeof nextHopOrLatency) {
                case "number": {
                    const targetNodeCoords = getCoords(peer, topology);
                    if (!targetNodeCoords) break;

                    const mirrorOffset = mirrorNearest(selectedNodeCoords[1], targetNodeCoords[1]);
                    paths[peer] = [selectedNodeCoords, [targetNodeCoords[0], targetNodeCoords[1] + mirrorOffset], Math.ceil(nextHopOrLatency) + "ms"];
                    break;
                }
                case "string": {
                    const nextHopCoords = getCoords(peer, topology);
                    if (!nextHopCoords) break;

                    const mirrorOffset = mirrorNearest(selectedNodeCoords[1], nextHopCoords[1]);
                    recursivelyTraversePath(peer, nextHopOrLatency, mirrorOffset, [currentNodeSelected]);
                    break;
                }
            }
        }

        return Object.values(paths);
    }, [topology, toggleTopology, currentNodeSelected]);

    const renderReverseTopologyPath = useMemo(() => {
        if (!topology || !toggleTopologyReverse || !currentNodeSelected) return [];

        const paths: Record<string, [[number, number], [number, number], string]> = {};
        const selectedNodeCoords = getCoords(currentNodeSelected, topology);
        if (!selectedNodeCoords) return [];

        for (let revNode in topology.topology) {
            if (revNode === currentNodeSelected) continue;

            const revNodeCoords = getCoords(revNode, topology);
            if (!revNodeCoords) continue;
            
            const nextHopOrLatency = topology.topology[revNode].find(x => x[0] === currentNodeSelected)?.[1];
            if (!nextHopOrLatency) continue;

            switch (typeof nextHopOrLatency) {
                case "number": {
                    const latency = nextHopOrLatency;

                    const mirrorOffset = mirrorNearest(selectedNodeCoords[1], revNodeCoords[1]);
                    revNodeCoords[1] += mirrorOffset;

                    paths[revNode] = [revNodeCoords, selectedNodeCoords, Math.ceil(latency) + "ms"];
                    break;
                }

                case "string": {
                    // draw a line to next hop only. since we know every node will eventually lead to currentNodeSelected
                    // we don't need to recursively traverse the path
                    const nextHop = nextHopOrLatency;
                    const nextHopCoords = getCoords(nextHop, topology);
                    if (!nextHopCoords) break;

                    const nextHopLatency = topology.topology[revNode]?.find(x => x[0] === nextHopOrLatency)?.[1];
                    if (typeof nextHopLatency !== "number") break;

                    const mirrorOffset = mirrorNearest(revNodeCoords[1], nextHopCoords[1]);
                    nextHopCoords[1] += mirrorOffset;

                    paths[revNode + "-" + nextHop] = [revNodeCoords, nextHopCoords, Math.ceil(nextHopLatency) + "ms"];

                    break;
                }
            }
        }

        return Object.values(paths);
    }, [topology, toggleTopology, toggleTopologyReverse, currentNodeSelected]);

    useEffect(() => {
        if (toggleTopology || toggleTopologyReverse) {
            function fetchTopology() {
                fetch("https://lambda-landing.badaimweeb.me/topology")
                    .then(res => res.json())
                    .then(data => setTopology(data))
                    .catch(() => { });
            }

            fetchTopology();
            const interval = setInterval(fetchTopology, 60 * 1000);
            return () => clearInterval(interval);
        }
    }, [toggleTopology, toggleTopologyReverse]);

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
                            I prefer using WireGuard as the transport protocol, but I'm open to experimenting with other protocols. BUT, PLEASE DO NOT USE ZEROTIER.
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

                        <MapContainer worldCopyJump center={[20, 0]} zoom={1.5} id="dn42-overview-map" className={cls.MapOverview}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <MarkerClusterGroup zoomToBoundsOnClick maxClusterRadius={15}>
                                {NodeTables.map((node, index) => new Array(5).fill(0).map((_, i) => (
                                    <Marker icon={MarkerIconLL} position={[node.lat, node.lon + ((+i - 2) * 360)]} key={index + "-" + i}>
                                        <MapPopup autoPan interactive eventHandlers={{
                                            add: () => {
                                                setCurrentNodeSelected(node.sc);
                                            }
                                        }}>
                                            {node.flag} <strong>{node.rc}</strong> ({node.sc})<br /><br />
                                            Endpoint: <code>{node.endpoint}</code><br />
                                            IPv4: <Badge size="2" variant="solid" color={node.ipv4 === IPAvailability.Yes ? "green" : node.ipv4 === IPAvailability.No ? "red" : "yellow"}>{node.ipv4}</Badge>&nbsp;/&nbsp;
                                            IPv6: <Badge size="2" variant="solid" color={node.ipv6 === IPAvailability.Yes ? "green" : node.ipv6 === IPAvailability.No ? "red" : "yellow"}>{node.ipv6}</Badge><br />
                                            {node.notes && (<><br />Notes: {node.notes}</>)}
                                        </MapPopup>
                                    </Marker>
                                )))}
                            </MarkerClusterGroup>

                            {toggleTopology && renderTopologyPath.map((path, index) => (
                                new Array(5).fill(0).map((_, i) => ([
                                    <TextPath
                                        key={"f" + i + index + "-2"}
                                        positions={[
                                            [path[0][0], path[0][1] + ((+i - 2) * 360)],
                                            [path[1][0], path[1][1] + ((+i - 2) * 360)]
                                        ]}
                                        text={">"}
                                        // @ts-ignore
                                        color="rgba(232, 48, 94, 0.7)"
                                        repeat
                                    />,
                                    <TextPath
                                        key={"f" + i + index}
                                        positions={[
                                            [path[0][0], path[0][1] + ((+i - 2) * 360)],
                                            [path[1][0], path[1][1] + ((+i - 2) * 360)]
                                        ]}
                                        text={"↑ " + path[2]}
                                        attributes={{
                                            style: "fill: black; font-weight: bold;"
                                        }}
                                        // @ts-ignore
                                        stroke={false}
                                        center
                                        offset={18}
                                        orientation={path[0][1] < path[1][1] ? void 0 : "flip"}
                                    />
                                ]))
                            )).flat(2)}

                            {toggleTopologyReverse && renderReverseTopologyPath.map((path, index) => (
                                new Array(5).fill(0).map((_, i) => ([
                                    <TextPath
                                        key={"r" + i + index + "-2"}
                                        positions={[
                                            [path[0][0], path[0][1] + ((+i - 2) * 360)],
                                            [path[1][0], path[1][1] + ((+i - 2) * 360)]
                                        ]}
                                        text={">"}
                                        // @ts-ignore
                                        color="rgba(94, 232, 48, 0.7)"
                                        repeat
                                    />,
                                    <TextPath
                                        key={"f" + index}
                                        positions={[
                                            [path[0][0], path[0][1] + ((+i - 2) * 360)],
                                            [path[1][0], path[1][1] + ((+i - 2) * 360)]
                                        ]}
                                        text={"↓ " + path[2]}
                                        attributes={{
                                            style: "fill: black; font-weight: bold;"
                                        }}
                                        // @ts-ignore
                                        stroke={false}
                                        center
                                        offset={18}
                                        orientation={path[0][1] < path[1][1] ? void 0 : "flip"}
                                    />
                                ]))
                            )).flat()}
                        </MapContainer>
                        {(toggleTopology || toggleTopologyReverse) && <div style={{ marginBottom: 8 }}><Text size="2" color="gray">Click on a node marker to view topology for that node.</Text></div>}
                        <br />
                        <Link href="#bruh" onClick={() => setOpenTable(x => !x)}>{!openTable ? "or view a table of nodes instead..." : "close table"}</Link>
                        {openTable && (
                            <div className={cls.TableWrapper}>
                                <Table.Root>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.ColumnHeaderCell>Server</Table.ColumnHeaderCell>
                                            <Table.ColumnHeaderCell>Region Code</Table.ColumnHeaderCell>
                                            <Table.ColumnHeaderCell>IPv4</Table.ColumnHeaderCell>
                                            <Table.ColumnHeaderCell>IPv6</Table.ColumnHeaderCell>
                                            <Table.ColumnHeaderCell>Endpoint</Table.ColumnHeaderCell>
                                            <Table.ColumnHeaderCell>Notes</Table.ColumnHeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {NodeTables.map((node, index) => (
                                            <Table.Row key={index}>
                                                <Table.Cell>{node.sc}</Table.Cell>
                                                <Table.Cell>{node.rc}</Table.Cell>
                                                <Table.Cell>{node.ipv4}</Table.Cell>
                                                <Table.Cell>{node.ipv6}</Table.Cell>
                                                <Table.Cell><code>{node.endpoint}</code></Table.Cell>
                                                <Table.Cell>{node.notes}</Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table.Root>
                            </div>
                        )}
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
