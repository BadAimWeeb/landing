import { MapContainer, Marker, TileLayer, Popup as MapPopup } from 'react-leaflet'
import MarkerClusterGroup from "react-leaflet-cluster";
import TextPath from 'react-leaflet-textpath';
import { FullscreenControl } from "react-leaflet-fullscreen";
import { NodeTables, ExtendedAirportTables, IPAvailability } from "../components/NodeTables";
import { Badge } from '@radix-ui/themes';

import { Icon } from "leaflet";

import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import MarkerIcon2X from "leaflet/dist/images/marker-icon-2x.png";
import MarkerShadow from "leaflet/dist/images/marker-shadow.png";
import { useMemo } from 'react';

import "react-leaflet-fullscreen/styles.css";

import cls from "./NodeMap.module.scss";

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

export default function NodeMap({
    toggleTopology,
    toggleTopologyReverse,
    currentNodeSelected,
    setCurrentNodeSelected,
    formattedTopology,
    dynamicRgCode,
    dynamicGeo
}: {
    toggleTopology: boolean;
    toggleTopologyReverse: boolean;
    currentNodeSelected: string | null;
    setCurrentNodeSelected: (node: string | null) => void;
    formattedTopology: Record<string, Record<string, [nhRTT: number | null, nh: string | null]>>;
    dynamicRgCode: Record<string, string>;
    dynamicGeo: Record<string, [number, number]>;
}) {
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

    const renderTopologyPath = useMemo(() => {
        if (!toggleTopology || !currentNodeSelected || !formattedTopology) return [];

        const paths: Record<string, [[number, number], [number, number], string]> = {};
        const dyn = {
            rgCode: dynamicRgCode,
            geo: dynamicGeo
        };
        const selectedNodeCoords = getCoords(currentNodeSelected, dyn);
        if (!selectedNodeCoords) return [];

        for (let [peer, [nhRTT, nh]] of Object.entries(formattedTopology[currentNodeSelected] || {})) {
            function recursivelyTraversePath(target: string, current: string, mirror = 0, past: string[] = []) {
                if (past.includes(current)) return; // avoid circular path

                const t = formattedTopology[current]?.[target];
                if (t) {
                    const currentNodeCoords = getCoords(current, dyn);
                    if (!currentNodeCoords) return;
                    currentNodeCoords[1] += mirror;

                    const nh = t[1];
                    if (nh) {
                        const nextHop = nh;
                        const nextHopLatency = t[0] ?? NaN;

                        const nextHopCoords = getCoords(nextHop, dyn);
                        if (!nextHopCoords) return;

                        nextHopCoords[1] += mirror;

                        const furtherMirrorShift = mirrorNearest(currentNodeCoords[1], nextHopCoords[1]);
                        nextHopCoords[1] += furtherMirrorShift;

                        paths[current + "-" + nextHop] = [currentNodeCoords, nextHopCoords, Math.ceil(nextHopLatency) + "ms"];

                        recursivelyTraversePath(target, nextHop, mirror + furtherMirrorShift, past.concat(current));
                    } else {
                        const targetNodeCoords = getCoords(target, dyn);

                        if (targetNodeCoords) {
                            targetNodeCoords[1] += mirror;

                            const furtherMirrorShift = mirrorNearest(currentNodeCoords[1], targetNodeCoords[1]);

                            paths[current + "-" + target] = [currentNodeCoords, [targetNodeCoords[0], targetNodeCoords[1] + furtherMirrorShift], Math.ceil(t[0] ?? NaN) + "ms"];
                        }
                    }
                }
            }

            if (nh) {
                const nextHopCoords = getCoords(nh, dyn);
                if (!nextHopCoords) break;

                const mirrorOffset = mirrorNearest(selectedNodeCoords[1], nextHopCoords[1]);
                paths[nh] = [selectedNodeCoords, [nextHopCoords[0], nextHopCoords[1] + mirrorOffset], Math.ceil(nhRTT ?? NaN) + "ms"];
                recursivelyTraversePath(peer, nh, mirrorOffset, [currentNodeSelected]);
            } else {
                const targetNodeCoords = getCoords(peer, dyn);
                if (!targetNodeCoords) break;

                const mirrorOffset = mirrorNearest(selectedNodeCoords[1], targetNodeCoords[1]);
                paths[peer] = [selectedNodeCoords, [targetNodeCoords[0], targetNodeCoords[1] + mirrorOffset], Math.ceil(nhRTT ?? NaN) + "ms"];
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
    }, [toggleTopology, formattedTopology, currentNodeSelected, dynamicRgCode, dynamicGeo]);

    const renderReverseTopologyPath = useMemo(() => {
        if (!toggleTopologyReverse || !currentNodeSelected || !formattedTopology) return [];

        const paths: Record<string, [[number, number], [number, number], string]> = {};
        const dyn = {
            rgCode: dynamicRgCode,
            geo: dynamicGeo
        };

        const selectedNodeCoords = getCoords(currentNodeSelected, dyn);
        if (!selectedNodeCoords) return [];

        for (let revNode in formattedTopology) {
            if (revNode === currentNodeSelected) continue;

            const revNodeCoords = getCoords(revNode, dyn);
            if (!revNodeCoords) continue;

            const n = formattedTopology[revNode]?.[currentNodeSelected];
            if (!n) continue;
            const [nhRTT, nh] = n;

            console.log(revNode, currentNodeSelected, nhRTT, nh);

            if (nh) {
                // draw a line to next hop only. since we know every node will eventually lead to currentNodeSelected
                // we don't need to recursively traverse the path
                const nextHop = nh;
                const nextHopCoords = getCoords(nextHop, dyn);
                if (!nextHopCoords) continue;

                const nextHopLatency = nhRTT;
                if (typeof nextHopLatency !== "number") continue;

                const mirrorOffset = mirrorNearest(revNodeCoords[1], nextHopCoords[1]);
                nextHopCoords[1] += mirrorOffset;

                paths[revNode + "-" + nextHop] = [revNodeCoords, nextHopCoords, Math.ceil(nextHopLatency) + "ms"];
            } else {
                const mirrorOffset = mirrorNearest(selectedNodeCoords[1], revNodeCoords[1]);
                revNodeCoords[1] += mirrorOffset;

                paths[revNode] = [revNodeCoords, selectedNodeCoords, Math.ceil(nhRTT ?? NaN) + "ms"];
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
    }, [toggleTopologyReverse, formattedTopology, currentNodeSelected, dynamicRgCode, dynamicGeo]);

    return (
        <MapContainer worldCopyJump center={[20, 0]} zoom={1.5} id="dn42-overview-map" className={cls.MapOverview}>
            <FullscreenControl />
            <TileLayer
                attribution='Maps &copy; <a href="https://www.thunderforest.com/">Thunderforest</a>, Data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                url="https://tile.thunderforest.com/transport-dark/{z}/{x}/{y}{r}.png?apikey=491724f125b64e5299d20c9c1c17309d"
                maxZoom={18}
            />
            <MarkerClusterGroup zoomToBoundsOnClick maxClusterRadius={15}>
                {NodeTables.map((node, index) => new Array(3).fill(0).map((_, i) => (
                    <Marker icon={MarkerIconLL} position={[node.lat, node.lon + ((+i - 1) * 360)]} key={index + "-" + i}>
                        <MapPopup autoPan interactive eventHandlers={{
                            add: () => {
                                setCurrentNodeSelected(node.sc);
                            }
                        }}>
                            <strong>{node.displayName}</strong> - <strong>{node.rc}</strong> <span style={{ fontSize: 10 }}>({node.sc})</span><br />
                            <br />
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
                new Array(3).fill(0).map((_, i) => ([
                    <TextPath
                        key={"f" + i + index}
                        positions={[
                            [path[0][0], path[0][1] + ((+i - 1) * 360)],
                            [path[1][0], path[1][1] + ((+i - 1) * 360)]
                        ]}
                        text={"↑ " + path[2]}
                        attributes={{
                            style: "font-weight: bold;",
                            fill: "#FFD1D9"
                        }}
                        center
                        offset={18}
                        pathOptions={{
                            fill: true,
                            fillColor: "#ff2045a6",
                            color: "#ff2045a6"
                        }}
                        orientation={path[0][1] < path[1][1] ? void 0 : "flip"}
                    />
                ]))
            )).flat(2)}

            {toggleTopologyReverse && renderReverseTopologyPath.map((path, index) => (
                new Array(3).fill(0).map((_, i) => ([
                    <TextPath
                        key={"f" + index}
                        positions={[
                            [path[0][0], path[0][1] + ((+i - 1) * 360)],
                            [path[1][0], path[1][1] + ((+i - 1) * 360)]
                        ]}
                        text={"↓ " + path[2]}
                        attributes={{
                            style: "font-weight: bold;",
                            fill: "#B1F1CB"
                        }}
                        pathOptions={{
                            fill: true,
                            fillColor: "#22ff98a8",
                            color: "#22ff98a8"
                        }}
                        center
                        offset={18}
                        orientation={path[0][1] < path[1][1] ? void 0 : "flip"}
                    />
                ]))
            )).flat()}
        </MapContainer>
    );
}