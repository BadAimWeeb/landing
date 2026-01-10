import { AirportToPlaceName } from "./geoinfo";

const SPLIT_FORMAT = /^([a-z]{2})-([a-z]{3,4})(\d+)$/i;

export enum IPAvailability {
    No = "No",
    NAT = "NAT",
    Tunnel = "Tunnel",
    Yes = "Yes"
}

export const ExtendedAirportTables = {
    "msp": [44.881944, -93.221667]
};

export const BaseNodeTables: {
    sc: string;
    rc: string;
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
            rc: "us-slc1",
            lat: 40.788333,
            lon: -111.977778,
            endpoint: "us-slc1.rc.badaimweeb.me",
            dn42IPv4: "172.22.130.161",
            dn42IPv6: "fd99:727:bad0:200::1",
            ipv4: IPAvailability.Yes,
            ipv6: IPAvailability.Yes,
            notes: null
        },
        {
            sc: "C04",
            rc: "us-ord1",
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
            sc: "C29",
            rc: "nl-ley1",
            lat: 52.460278,
            lon: 5.527222,
            endpoint: "nl-ley1.rc.badaimweeb.me",
            dn42IPv4: "172.22.142.135",
            dn42IPv6: "fd99:727:bad0:3300::1",
            ipv4: IPAvailability.Yes,
            ipv6: IPAvailability.No,
            notes: null
        },
        {
            sc: "C30",
            rc: "se-arn1",
            lat: 59.651944,
            lon: 17.918611,
            endpoint: "se-arn1.rc.badaimweeb.me",
            dn42IPv4: "172.22.142.136",
            dn42IPv6: "fd99:727:bad0:3400::1",
            ipv4: IPAvailability.Yes,
            ipv6: IPAvailability.Yes,
            notes: null
        },
        {
            sc: "C31",
            rc: "bg-sof1",
            lat: 42.695,
            lon: 23.408333,
            endpoint: "bg-sof1.rc.badaimweeb.me",
            dn42IPv4: "172.22.142.137",
            dn42IPv6: "fd99:727:bad0:3500::1",
            ipv4: IPAvailability.Yes,
            ipv6: IPAvailability.Yes,
            notes: null
        },
        {
            sc: "C32",
            rc: "fr-cdg1",
            lat: 49.009722,
            lon: 2.547778,
            endpoint: "fr-cdg1.rc.badaimweeb.me",
            dn42IPv4: "172.22.142.138",
            dn42IPv6: "fd99:727:bad0:3600::1",
            ipv4: IPAvailability.Yes,
            ipv6: IPAvailability.Yes,
            notes: null
        },
        {
            sc: "C33",
            rc: "ng-los1",
            lat: 6.577222,
            lon: 3.321111,
            endpoint: "ng-los1.rc.badaimweeb.me",
            dn42IPv4: "172.22.142.139",
            dn42IPv6: "fd99:727:bad0:3700::1",
            ipv4: IPAvailability.Yes,
            ipv6: IPAvailability.Yes,
            notes: null
        },
        {
            sc: "C34",
            rc: "tr-ist1",
            lat: 41.262222,
            lon: 28.727778,
            endpoint: "tr-ist1.rc.badaimweeb.me",
            dn42IPv4: "172.22.142.140",
            dn42IPv6: "fd99:727:bad0:3800::1",
            ipv4: IPAvailability.Yes,
            ipv6: IPAvailability.Yes,
            notes: null
        },
        {
            sc: "C35",
            rc: "fi-hel1",
            lat: 60.317222,
            lon: 24.963333,
            endpoint: "fi-hel1.rc.badaimweeb.me",
            dn42IPv4: "172.22.142.141",
            dn42IPv6: "fd99:727:bad0:3900::1",
            ipv4: IPAvailability.Yes,
            ipv6: IPAvailability.Yes,
            notes: null
        },
        {
            sc: "C36",
            rc: "za-jnb1",
            lat: -26.133333,
            lon: 28.25,
            endpoint: "za-jnb1.rc.badaimweeb.me",
            dn42IPv4: "172.22.142.142",
            dn42IPv6: "fd99:727:bad0:3a00::1",
            ipv4: IPAvailability.Yes,
            ipv6: IPAvailability.Yes,
            notes: null
        },
        {
            sc: "C37",
            rc: "us-phx1",
            lat: 33.434167,
            lon: -112.011667,
            endpoint: "us-phx1.rc.badaimweeb.me",
            dn42IPv4: "172.22.142.143",
            dn42IPv6: "fd99:727:bad0:3b00::1",
            ipv4: IPAvailability.Yes,
            ipv6: IPAvailability.Yes,
            notes: null
        },
        {
            sc: "C38",
            rc: "us-iah1",
            lat: 29.984444,
            lon: -95.341389,
            endpoint: "us-iah1.rc.badaimweeb.me",
            dn42IPv4: "172.22.142.144",
            dn42IPv6: "fd99:727:bad0:3c00::1",
            ipv4: IPAvailability.Yes,
            ipv6: IPAvailability.Yes,
            notes: null
        },
        {
            sc: "C39",
            rc: "nl-ams1",
            lat: 52.3,
            lon: 4.765,
            endpoint: "nl-ams1.rc.badaimweeb.me",
            dn42IPv4: "172.22.142.145",
            dn42IPv6: "fd99:727:bad0:3d00::1",
            ipv4: IPAvailability.Yes,
            ipv6: IPAvailability.No,
            notes: null
        },
        {
            sc: "C40",
            rc: "us-las1",
            lat: 36.08,
            lon: -115.152222,
            endpoint: "us-las1.rc.badaimweeb.me",
            dn42IPv4: "172.22.142.146",
            dn42IPv6: "fd99:727:bad0:3e00::1",
            ipv4: IPAvailability.Yes,
            ipv6: IPAvailability.Yes,
            notes: null
        },
        {
            sc: "C41",
            rc: "us-dtw1",
            lat: 42.2125,
            lon: -83.353333,
            endpoint: "us-dtw1.rc.badaimweeb.me",
            dn42IPv4: "172.22.142.147",
            dn42IPv6: "fd99:727:bad0:3f00::1",
            ipv4: IPAvailability.Yes,
            ipv6: IPAvailability.Yes,
            notes: null
        },
        {
            sc: "C42",
            rc: "ie-dub1",
            lat: 53.421389,
            lon: -6.27,
            endpoint: "ie-dub1.rc.badaimweeb.me",
            dn42IPv4: "172.22.142.149",
            dn42IPv6: "fd99:727:bad0:4100::1",
            ipv4: IPAvailability.Yes,
            ipv6: IPAvailability.No,
            notes: null
        },
        {
            sc: "C43",
            rc: "es-mad1",
            lat: 40.472222,
            lon: -3.560833,
            endpoint: "es-mad1.rc.badaimweeb.me",
            dn42IPv4: "172.22.142.150",
            dn42IPv6: "fd99:727:bad0:4200::1",
            ipv4: IPAvailability.Yes,
            ipv6: IPAvailability.Yes,
            notes: null
        },
        {
            sc: "C44",
            rc: "is-rkv1",
            lat: 64.13,
            lon: -21.940556,
            endpoint: "is-rkv1.rc.badaimweeb.me",
            dn42IPv4: "172.22.142.151",
            dn42IPv6: "fd99:727:bad0:4300::1",
            ipv4: IPAvailability.Yes,
            ipv6: IPAvailability.Yes,
            notes: null
        },
        {
            sc: "C45",
            rc: "de-xfks1",
            lat: 50.466667,
            lon: 12.366667,
            endpoint: "de-xfks1.rc.badaimweeb.me",
            dn42IPv4: "172.22.142.150",
            dn42IPv6: "fd99:727:bad0:4200::1",
            ipv4: IPAvailability.NAT,
            ipv6: IPAvailability.Yes,
            notes: "Clearnet MTU is 1420 bytes. WireGuard connection will use MTU 1340 (or lower if necessary)."
        },
        {
            sc: "D01",
            rc: "au-syd2",
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
            sc: "D07",
            rc: "sg-sin5",
            lat: 1.359167,
            lon: 103.989444,
            endpoint: "sg-sin5.rc.badaimweeb.me",
            dn42IPv4: "172.22.130.190",
            dn42IPv6: "fd99:727:bad0:1900::1",
            ipv4: IPAvailability.Yes,
            ipv6: IPAvailability.Yes,
            notes: "Non-permanent node."
        },
        {
            sc: "D08",
            rc: "sg-sin4",
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
            sc: "D11",
            rc: "jp-hnd2",
            lat: 35.553333,
            lon: 139.781111,
            endpoint: "jp-hnd2.rc.badaimweeb.me",
            dn42IPv4: "172.22.142.131",
            dn42IPv6: "fd99:727:bad0:2f00::1",
            ipv4: IPAvailability.Yes,
            ipv6: IPAvailability.Yes,
            notes: "Non-permanent node."
        },
        {
            sc: "D12",
            rc: "jp-itm2",
            lat: 34.784444,
            lon: 135.439167,
            endpoint: "jp-itm2.rc.badaimweeb.me",
            dn42IPv4: "172.22.142.154",
            dn42IPv6: "fd99:727:bad0:4600::1",
            ipv4: IPAvailability.Yes,
            ipv6: IPAvailability.Yes,
            notes: "Non-permanent node."
        },
        {
            sc: "D13",
            rc: "jp-hnd3",
            lat: 35.553333,
            lon: 139.781111,
            endpoint: "jp-hnd3.rc.badaimweeb.me",
            dn42IPv4: "172.22.142.155",
            dn42IPv6: "fd99:727:bad0:4700::1",
            ipv4: IPAvailability.Yes,
            ipv6: IPAvailability.Yes,
            notes: "Non-permanent node."
        },
        {
            sc: "E03",
            rc: "vn-sgn2",
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
            lat: 44.881944,
            lon: -93.221667,
            endpoint: "<contact>.rc.badaimweeb.me",
            dn42IPv4: "172.22.142.162",
            dn42IPv6: "fd99:727:bad0:1400::1",
            ipv4: IPAvailability.NAT,
            ipv6: IPAvailability.Yes,
            notes: "Residental network.\nShould not be used as transit to other AS (low speed & unstable latency)."
        },
        {
            sc: "G05",
            rc: "us-msp7",
            lat: 44.881944,
            lon: -93.221667,
            endpoint: "<contact>.rc.badaimweeb.me",
            dn42IPv4: "172.22.142.148",
            dn42IPv6: "fd99:727:bad0:4000::1",
            ipv4: IPAvailability.Yes,
            ipv6: IPAvailability.Tunnel,
            notes: "Residental network."
        },
        {
            sc: "G99",
            rc: "us-msp1",
            lat: 44.881944,
            lon: -93.221667,
            endpoint: "<contact>.rc.badaimweeb.me",
            dn42IPv4: "172.22.130.169",
            dn42IPv6: "fd99:727:bad0:a00::1",
            ipv4: IPAvailability.Yes,
            ipv6: IPAvailability.Yes,
            notes: "Residental network.\Should not be used as transit to other AS (low speed)."
        },
        {
            sc: "H01",
            rc: "vn-dad1",
            lat: 16.043889,
            lon: 108.199444,
            endpoint: "vn-dad1.rc.badaimweeb.me",
            dn42IPv4: "172.22.142.185",
            dn42IPv6: "fd99:727:bad0:1f00::1",
            ipv4: IPAvailability.NAT,
            ipv6: IPAvailability.Yes,
            notes: "Residental network.\nOperated by MICHIOXD-MNT, you can also peer with him :)"
        },
        {
            sc: "H02",
            rc: "vn-vii1",
            lat: 18.736725,
            lon: 105.670881,
            endpoint: "<contact>.rc.badaimweeb.me",
            dn42IPv4: "172.22.142.134",
            dn42IPv6: "fd99:727:bad0:3200::1",
            ipv4: IPAvailability.NAT,
            ipv6: IPAvailability.Yes,
            notes: "Residental network.\nOperated by MICHIOXD-MNT, you can also peer with him :)"
        }
    ];

const EMOJI_FLAG_TABLE: { [key: string]: string } = {
    "A":"🇦",
    "B":"🇧",
    "C":"🇨",
    "D":"🇩",
    "E":"🇪",
    "F":"🇫",
    "G":"🇬",
    "H":"🇭",
    "I":"🇮",
    "J":"🇯",
    "K":"🇰",
    "L":"🇱",
    "M":"🇲",
    "N":"🇳",
    "O":"🇴",
    "P":"🇵",
    "Q":"🇶",
    "R":"🇷",
    "S":"🇸",
    "T":"🇹",
    "U":"🇺",
    "V":"🇻",
    "W":"🇼",
    "X":"🇽",
    "Y":"🇾",
    "Z":"🇿"
}

export const NodeTables: {
    sc: string;
    rc: string;
    country: string;
    flag: string;
    displayName: string;
    lat: number;
    lon: number;
    endpoint: string;
    dn42IPv4: string;
    dn42IPv6: string;
    ipv4: IPAvailability;
    ipv6: IPAvailability;
    notes: string | null;
}[] = BaseNodeTables.map(node => {
    let tsplit = SPLIT_FORMAT.exec(node.rc.toLocaleLowerCase());
    let name = (AirportToPlaceName[tsplit ? tsplit[2] : ""] ?? `Region ${tsplit ? tsplit[2] : ""}`) + " " + (parseInt(tsplit ? tsplit[3] : "1") - 1 ? tsplit![3] : "");

    return {
        ...node,
        country: tsplit ? tsplit[1].toUpperCase() : "xx",
        flag: tsplit ? (EMOJI_FLAG_TABLE[tsplit[1].toUpperCase().charAt(0)] + EMOJI_FLAG_TABLE[tsplit[1].toUpperCase().charAt(1)]) : "🏳️",
        displayName: name
    }
});
