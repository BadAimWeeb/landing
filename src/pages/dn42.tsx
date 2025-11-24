import { ParallaxBanner } from "react-scroll-parallax";
import cls from "./dn42.module.scss";
import DN42 from "./../assets/images/dn42.svg?no-inline";
import { Element } from 'react-scroll'
import { Badge, Heading, IconButton, Link, Text, Tooltip, Table, Button, Card, Switch, Flex } from "@radix-ui/themes";
import { PiDiscordLogoDuotone, PiEnvelopeDuotone, PiGithubLogoDuotone, PiInfoDuotone, PiPhoneCallDuotone, PiFacebookLogoDuotone, PiMatrixLogoDuotone, PiComputerTowerDuotone, PiBroadcastDuotone, PiTelegramLogoDuotone } from "react-icons/pi";
import { MapContainer, Marker, TileLayer, Popup as MapPopup } from 'react-leaflet'
import MarkerClusterGroup from "react-leaflet-cluster";
import TextPath from 'react-leaflet-textpath';
import { useCallback, useEffect, useMemo, useState } from "react";
import { Icon } from "leaflet";

import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import MarkerIcon2X from "leaflet/dist/images/marker-icon-2x.png";
import MarkerShadow from "leaflet/dist/images/marker-shadow.png";
import { FullscreenControl } from "react-leaflet-fullscreen";

import "react-leaflet-fullscreen/styles.css";

enum IPAvailability {
    No = "No",
    NAT = "NAT",
    Tunnel = "Tunnel",
    Yes = "Yes"
}

const ExtendedAirportTables = {
    "msp": [44.881944, -93.221667]
}

const NodeTables: {
    sc: string;
    rc: string;
    flag: string;
    lat: number;
    lon: number;
    endpoint: string;
    dn42IPv4: string;
    dn42IPv6: string;
    ipv4: IPAvailability;
    ipv6: IPAvailability;
    notes: string | null;
}[] = [
    {
        sc: "A00",
        rc: "vn-lth1",
        flag: "🇻🇳",
        lat: 10.772611,
        lon: 107.045278,
        endpoint: "vn-lth1.rc.badaimweeb.me",
        dn42IPv4: "172.22.130.171",
        dn42IPv6: "fd99:727:bad0:c00::1",
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
        dn42IPv4: "172.22.130.172",
        dn42IPv6: "fd99:727:bad0:d00::1",
        ipv4: IPAvailability.NAT,
        ipv6: IPAvailability.Yes,
        notes: "Residental network.\nUpstream is A00."
    },
    {
        sc: "A05",
        rc: "vn-lth4",
        flag: "🇻🇳",
        lat: 10.772611,
        lon: 107.045278,
        endpoint: "vn-lth4.rc.badaimweeb.me",
        dn42IPv4: "172.22.142.160",
        dn42IPv6: "fd99:727:bad0:1200::1",
        ipv4: IPAvailability.NAT,
        ipv6: IPAvailability.Yes,
        notes: "Residental network.\nUpstream is A00."
    },
    {
        sc: "A06",
        rc: "vn-lth5",
        flag: "🇻🇳",
        lat: 10.772611,
        lon: 107.045278,
        endpoint: "vn-lth5.rc.badaimweeb.me",
        dn42IPv4: "172.22.142.161",
        dn42IPv6: "fd99:727:bad0:1300::1",
        ipv4: IPAvailability.NAT,
        ipv6: IPAvailability.Yes,
        notes: "Residental network.\nUpstream is A00."
    },
    {
        sc: "C02",
        rc: "us-dfw1",
        flag: "🇺🇸",
        lat: 32.896944,
        lon: -97.038056,
        endpoint: "us-dfw1.rc.badaimweeb.me",
        dn42IPv4: "172.22.130.161",
        dn42IPv6: "fd99:727:bad0:200::1",
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
        dn42IPv4: "172.22.130.163",
        dn42IPv6: "fd99:727:bad0:400::1",
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
        dn42IPv4: "172.22.130.167",
        dn42IPv6: "fd99:727:bad0:800::1",
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
        dn42IPv4: "172.22.130.165",
        dn42IPv6: "fd99:727:bad0:600::1",
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
        dn42IPv4: "172.22.130.162",
        dn42IPv6: "fd99:727:bad0:300::1",
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
        dn42IPv4: "172.22.130.164",
        dn42IPv6: "fd99:727:bad0:500::1",
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
        dn42IPv4: "172.22.130.166",
        dn42IPv6: "fd99:727:bad0:700::1",
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
        dn42IPv4: "172.22.130.173",
        dn42IPv6: "fd99:727:bad0:e00::1",
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
        dn42IPv4: "172.22.142.180",
        dn42IPv6: "fd99:727:bad0:1a00::1",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.Yes,
        notes: null
    },
    {
        sc: "C12",
        rc: "br-gru1",
        flag: "🇧🇷",
        lat: -23.435556,
        lon: -46.473056,
        endpoint: "br-gru1.rc.badaimweeb.me",
        dn42IPv4: "172.22.142.181",
        dn42IPv6: "fd99:727:bad0:1b00::1",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.Yes,
        notes: "Unmetered connection @ 300Mbps"
    },
    {
        sc: "C13",
        rc: "hk-hkg1",
        flag: "🇭🇰",
        lat: 22.308889,
        lon: 113.914444,
        endpoint: "hk-hkg1.rc.badaimweeb.me",
        dn42IPv4: "172.22.142.182",
        dn42IPv6: "fd99:727:bad0:1c00::1",
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
        dn42IPv4: "172.22.142.183",
        dn42IPv6: "fd99:727:bad0:1d00::1",
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
        dn42IPv4: "172.22.142.184",
        dn42IPv6: "fd99:727:bad0:1e00::1",
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
        dn42IPv4: "172.22.142.186",
        dn42IPv6: "fd99:727:bad0:2000::1",
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
        dn42IPv4: "172.22.142.187",
        dn42IPv6: "fd99:727:bad0:2100::1",
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
        dn42IPv4: "172.22.142.188",
        dn42IPv6: "fd99:727:bad0:2200::1",
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
        dn42IPv4: "172.22.142.189",
        dn42IPv6: "fd99:727:bad0:2300::1",
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
        dn42IPv4: "172.22.142.190",
        dn42IPv6: "fd99:727:bad0:2400::1",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.Yes,
        notes: "Unmetered connection @ 10Gbps"
    },
    {
        sc: "C21",
        rc: "ru-ovb1",
        flag: "🇷🇺",
        lat: 55.0125,
        lon: 82.650556,
        endpoint: "ru-ovb1.rc.badaimweeb.me",
        dn42IPv4: "172.22.142.172",
        dn42IPv6: "fd99:727:bad0:2500::1",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.Yes,
        notes: "Unmetered connection @ 300Mbps"
    },
    {
        sc: "C22",
        rc: "in-bom1",
        flag: "🇮🇳",
        lat: 19.088611,
        lon: 72.868056,
        endpoint: "in-bom1.rc.badaimweeb.me",
        dn42IPv4: "172.22.142.173",
        dn42IPv6: "fd99:727:bad0:2600::1",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.No,
        notes: null
    },
    {
        sc: "C23",
        rc: "us-mci1",
        flag: "🇺🇸",
        lat: 39.2975,
        lon: -94.713889,
        endpoint: "us-mci1.rc.badaimweeb.me",
        dn42IPv4: "172.22.142.174",
        dn42IPv6: "fd99:727:bad0:2700::1",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.Yes,
        notes: "Unmetered connection @ 1Gbps"
    },
    {
        sc: "C24",
        rc: "au-mel1",
        flag: "🇦🇺",
        lat: -37.673333,
        lon: 144.843333,
        endpoint: "au-mel1.rc.badaimweeb.me",
        dn42IPv4: "172.22.142.175",
        dn42IPv6: "fd99:727:bad0:2800::1",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.Yes,
        notes: null
    },
    {
        sc: "C25",
        rc: "ru-svo1",
        flag: "🇷🇺",
        lat: 55.972778, 
        lon: 37.414722,
        endpoint: "ru-svo1.rc.badaimweeb.me",
        dn42IPv4: "172.22.130.187",
        dn42IPv6: "fd99:727:bad0:2900::1",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.Yes,
        notes: "Unmetered connection @ 300Mbps"
    },
    {
        sc: "C26",
        rc: "ca-yyz1",
        flag: "🇨🇦",
        lat: 43.676111,
        lon: -79.630556,
        endpoint: "ca-yyz1.rc.badaimweeb.me",
        dn42IPv4: "172.22.130.188",
        dn42IPv6: "fd99:727:bad0:2a00::1",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.Yes,
        notes: null
    },
    {
        sc: "C27",
        rc: "pl-gdn1",
        flag: "🇵🇱",
        lat: 54.3775,
        lon: 18.466111,
        endpoint: "pl-gdn1.rc.badaimweeb.me",
        dn42IPv4: "172.22.142.132",
        dn42IPv6: "fd99:727:bad0:3000::1",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.Yes,
        notes: null
    },
    {
        sc: "C28",
        rc: "us-sea1",
        flag: "🇺🇸",
        lat: 47.448889,
        lon: -122.309444,
        endpoint: "us-sea1.rc.badaimweeb.me",
        dn42IPv4: "172.22.142.133",
        dn42IPv6: "fd99:727:bad0:3100::1",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.Yes,
        notes: null
    },
    {
        sc: "C28",
        rc: "ca-yyz1",
        flag: "🇨🇦",
        lat: 43.676111,
        lon: -79.630556,
        endpoint: "ca-yyz1.rc.badaimweeb.me",
        dn42IPv4: "172.22.130.188",
        dn42IPv6: "fd99:727:bad0:2a00::1",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.Yes,
        notes: null
    },
    {
        sc: "D01",
        rc: "au-syd2",
        flag: "🇦🇺",
        lat: -33.946111,
        lon: 151.177222,
        endpoint: "au-syd2.rc.badaimweeb.me",
        dn42IPv4: "172.22.142.164",
        dn42IPv6: "fd99:727:bad0:f00::1",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.No,
        notes: "Non-permanent node."
    },
    {
        sc: "D02",
        rc: "us-lax2",
        flag: "🇺🇸",
        lat: 33.9425,
        lon: -118.408056,
        endpoint: "us-lax2.rc.badaimweeb.me",
        dn42IPv4: "172.22.142.165",
        dn42IPv6: "fd99:727:bad0:1000::1",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.Yes,
        notes: "Non-permanent node."
    },
    {
        sc: "D03",
        rc: "au-syd3",
        flag: "🇦🇺",
        lat: -33.946111,
        lon: 151.177222,
        endpoint: "au-syd3.rc.badaimweeb.me",
        dn42IPv4: "172.22.142.166",
        dn42IPv6: "fd99:727:bad0:1100::1",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.No,
        notes: "Non-permanent node."
    },
    {
        sc: "D04",
        rc: "sg-sin2",
        flag: "🇸🇬",
        lat: 1.359167,
        lon: 103.989444,
        endpoint: "sg-sin2.rc.badaimweeb.me",
        dn42IPv4: "172.22.142.176",
        dn42IPv6: "fd99:727:bad0:1600::1",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.Yes,
        notes: "Non-permanent node."
    },
    {
        sc: "D05",
        rc: "id-cgk2",
        flag: "🇮🇩",
        lat: -6.125556,
        lon: 106.655833,
        endpoint: "id-cgk2.rc.badaimweeb.me",
        dn42IPv4: "172.22.142.177",
        dn42IPv6: "fd99:727:bad0:1700::1",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.Yes,
        notes: "Non-permanent node."
    },
    {
        sc: "D06",
        rc: "sg-sin3",
        flag: "🇸🇬",
        lat: 1.359167,
        lon: 103.989444,
        endpoint: "sg-sin3.rc.badaimweeb.me",
        dn42IPv4: "172.22.142.178",
        dn42IPv6: "fd99:727:bad0:1800::1",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.Yes,
        notes: "Non-permanent node."
    },
    {
        sc: "D08",
        rc: "sg-sin4",
        flag: "🇸🇬",
        lat: 1.359167,
        lon: 103.989444,
        endpoint: "sg-sin4.rc.badaimweeb.me",
        dn42IPv4: "172.22.142.128",
        dn42IPv6: "fd99:727:bad0:2c00::1",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.Yes,
        notes: "Non-permanent node."
    },
    {
        sc: "D09",
        rc: "us-atl2",
        flag: "🇺🇸",
        lat: 33.636667,
        lon: -84.428056,
        endpoint: "us-atl2.rc.badaimweeb.me",
        dn42IPv4: "172.22.142.129",
        dn42IPv6: "fd99:727:bad0:2d00::1",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.Yes,
        notes: "Non-permanent node."
    },
    {
        sc: "D10",
        rc: "in-blr2",
        flag: "🇮🇳",
        lat: 13.198889,
        lon: 77.705556,
        endpoint: "in-blr2.rc.badaimweeb.me",
        dn42IPv4: "172.22.142.130",
        dn42IPv6: "fd99:727:bad0:2e00::1",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.Yes,
        notes: "Non-permanent node."
    },
    {
        sc: "E03",
        rc: "vn-sgn2",
        flag: "🇻🇳",
        lat: 10.818889,
        lon: 106.651944,
        endpoint: "vn-sgn2.rc.badaimweeb.me",
        dn42IPv4: "172.22.130.160",
        dn42IPv6: "fd99:727:bad0:100::1",
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
        dn42IPv4: "172.22.142.162",
        dn42IPv6: "fd99:727:bad0:1400::1",
        ipv4: IPAvailability.NAT,
        ipv6: IPAvailability.Yes,
        notes: "Residental network.\nMay not be used as transit to other AS (low speed).\nDual upstream T-Mobile 5G & Comcast @ G99."
    },
    {
        sc: "G99",
        rc: "us-msp1",
        flag: "🇺🇸",
        lat: 44.881944,
        lon: -93.221667,
        endpoint: "<contact>.rc.badaimweeb.me",
        dn42IPv4: "172.22.130.169",
        dn42IPv6: "fd99:727:bad0:a00::1",
        ipv4: IPAvailability.Yes,
        ipv6: IPAvailability.Yes,
        notes: "Residental network.\nMay not be used as transit to other AS (low speed)."
    },
    {
        sc: "H01",
        rc: "vn-dad1",
        flag: "🇻🇳",
        lat: 16.043889,
        lon: 108.199444,
        endpoint: "vn-dad1.rc.badaimweeb.me",
        dn42IPv4: "172.22.142.185",
        dn42IPv6: "fd99:727:bad0:1f00::1",
        ipv4: IPAvailability.NAT,
        ipv6: IPAvailability.Yes,
        notes: "Residental network.\nOperated by MICHIOXD-MNT, you can also peer with him :)"
    }
];

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

function getCoords(nodeName: string, topology: { rgCode: Record<string, string>; geo: Record<string, [number, number]>; }): [number, number] | null {
    const node = NodeTables.find(x => x.sc === nodeName);
    if (node) return [node.lat, node.lon];

    // Infer from airport code
    const rg = topology.rgCode[nodeName];
    if (!rg) {
        console.warn("Region code for", nodeName, "not found. That should not have happened.");
        return null;
    }

    const airport = rg.slice(3, 6).toLowerCase();
    if (airport in topology.geo) {
        const g = topology.geo[airport];
        return [g[0], g[1]];
    }

    if (airport in ExtendedAirportTables) {
        // @ts-ignore
        const g = ExtendedAirportTables[airport];
        return [g[0], g[1]];
    }

    return null;
}

function mirrorNearest(startLon: number, targetLon: number): number {
    if (Number.EPSILON * 2 > Math.abs(targetLon - startLon)) {
        return 0;
    }

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
    const currentNodeRCSelected = useMemo(() => {
        if (!currentNodeSelected) return null;
        return NodeTables.find(x => x.sc === currentNodeSelected)?.rc || null;
    }, [currentNodeSelected]);

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

        return Object.values(paths)
            // Merge paths that share the same coordinates (not necessary same device)
            .reduce((acc, cur) => {
                const existing = acc.find(x => x[0][0] === cur[0][0] && x[0][1] === cur[0][1] && x[1][0] === cur[1][0] && x[1][1] === cur[1][1]);
                if (existing) {
                    existing[2] += " / " + cur[2];
                } else {
                    acc.push(cur);
                }

                return acc;
            }, [] as [[number, number], [number, number], string][]);
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

        return Object.values(paths)
            // Merge paths that share the same coordinates (not necessary same device)
            .reduce((acc, cur) => {
                const existing = acc.find(x => x[0][0] === cur[0][0] && x[0][1] === cur[0][1] && x[1][0] === cur[1][0] && x[1][1] === cur[1][1]);
                if (existing) {
                    existing[2] += " / " + cur[2];
                } else {
                    acc.push(cur);
                }

                return acc;
            }, [] as [[number, number], [number, number], string][]);
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
            fetchTopology();
            const interval = setInterval(fetchTopology, 25 * 1000);
            return () => clearInterval(interval);
        }
    }, [toggleTopology, toggleTopologyReverse]);

    const [sortBy, setSortBy] = useState<"sc" | "rc">("rc");
    const [sortDirection, setSortDirection] = useState<1 | -1>(1);

    const handleSortChange = useCallback((sort: typeof sortBy) => {
        if (sort === sortBy) {
            setSortDirection(oldSortDirection => (oldSortDirection === 1 ? -1 : 1));
        } else {
            setSortBy(sort);
        }
    }, [sortBy, setSortBy, setSortDirection]);

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

                        <MapContainer worldCopyJump center={[20, 0]} zoom={1.5} id="dn42-overview-map" className={cls.MapOverview}>
                            <FullscreenControl />
                            <TileLayer
                                attribution='Maps &copy; <a href="https://www.thunderforest.com/">Thunderforest</a>, Data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                url="https://tile.thunderforest.com/transport-dark/{z}/{x}/{y}{r}.png?apikey=491724f125b64e5299d20c9c1c17309d"
                                maxZoom={18}
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
                                            <br />
                                            DN42 IPv4: <code>{node.dn42IPv4}</code><br />
                                            DN42 IPv6: <code>{node.dn42IPv6}</code><br />
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
                                        attributes={{
                                            fill: "#E5484D",
                                            style: "font-size: 8px"
                                        }}
                                        // @ts-ignore
                                        color="#FF204756"
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
                                            style: "font-weight: bold;",
                                            fill: "#FFD1D9"
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
                                        attributes={{
                                            fill: "#30A46C",
                                            style: "font-size: 8px"
                                        }}
                                        // @ts-ignore
                                        color="#22FF991E"
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
                                            style: "font-weight: bold;",
                                            fill: "#B1F1CB"
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
                        {(toggleTopology || toggleTopologyReverse) && <div style={{ marginBottom: 8 }}>
                            <Text size="2" color="gray">Click on a node marker to view topology for that node.</Text>
                            {!!currentNodeSelected && <><br /><Text size="2" color="gray">Currently viewing topology for <strong>{currentNodeRCSelected}</strong> ({currentNodeSelected}). <Link href="#bruh" onClick={() => setCurrentNodeSelected(null)}>Clear selection</Link></Text></>}
                        </div>}
                        <br />
                        <Link href="#bruh" onClick={() => setOpenTable(x => !x)}>{!openTable ? "or view a table of nodes instead..." : "close table"}</Link>
                        {openTable && (
                            <div className={cls.TableWrapper}>
                                <Table.Root>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.ColumnHeaderCell><Link href="#sort" onClick={() => handleSortChange("sc")}>Server</Link></Table.ColumnHeaderCell>
                                            <Table.ColumnHeaderCell><Link href="#sort" onClick={() => handleSortChange("rc")}>Region Code</Link></Table.ColumnHeaderCell>
                                            <Table.ColumnHeaderCell>IPv4</Table.ColumnHeaderCell>
                                            <Table.ColumnHeaderCell>IPv6</Table.ColumnHeaderCell>
                                            <Table.ColumnHeaderCell>Endpoint</Table.ColumnHeaderCell>
                                            <Table.ColumnHeaderCell>DN42 IP</Table.ColumnHeaderCell>
                                            <Table.ColumnHeaderCell>Notes</Table.ColumnHeaderCell>
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
