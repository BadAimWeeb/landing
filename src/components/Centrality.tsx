import { useMemo } from "react";
import { NodeTables, SCtoRCLookup } from "./NodeTables";
import cytoscape from "cytoscape";
import { Table } from "@radix-ui/themes";

// weight pulled from map.dn42
const alpha = 0.5;
const beta = 0.3;
const gamma = 0.2;

export default function Centrality(props: {
    formattedTopology: Record<string, Record<string, [nhRTT: number | null, nh: string | null]>>;
    dynamicRgCode: Record<string, string>;
    showDownstream?: boolean;
    showUpstream?: boolean;
}) {
    const calc = useMemo(() => {
        const cy = cytoscape({
            headless: true
        });

        const n = new Set<string>();
        for (const node of NodeTables) {
            n.add(node.sc);
            cy.add({
                group: "nodes",
                data: {
                    id: node.sc
                }
            });
        }

        const kc: Map<string, Map<string, number>> = new Map();
        const fc: Map<string, Set<string>> = new Map();
        const forwardUsage: Map<string, [number, number]> = new Map(); // [direct count, forward count]
        const traversedEdges = new Set<string>();
        for (const [sc, neighbors] of Object.entries(props.formattedTopology)) {
            if (!n.has(sc)) {
                console.warn(`Node ${sc} not in node set`);
                n.add(sc);
                cy.add({
                    group: "nodes",
                    data: {
                        id: sc
                    }
                });
            }

            for (const [target, [nhRTT, nh]] of Object.entries(neighbors)) {
                let t: string;
                if (nh) {
                    t = nh;
                    forwardUsage.has(nh) ? forwardUsage.get(nh)![1]++ : forwardUsage.set(nh, [0, 1]);
                } else {
                    t = target;
                    forwardUsage.has(target) ? forwardUsage.get(target)![0]++ : forwardUsage.set(target, [1, 0]);
                }
                console.log(sc, target, nhRTT, nh, t);

                if (!t) {
                    console.warn(`No valid target for ${sc} -> ${target}`);
                    continue;
                }

                if (traversedEdges.has(`${sc}-${t}`)) continue;
                traversedEdges.add(`${sc}-${t}`);

                if (!n.has(t)) {
                    console.warn(`Node ${t} not in node set`);
                    n.add(t);
                    cy.add({
                        group: "nodes",
                        data: {
                            id: t
                        }
                    });
                }

                cy.add({
                    group: "edges",
                    data: {
                        id: `${sc}-${t}`,
                        source: sc,
                        target: t
                    }
                });

                if (!kc.has(sc)) {
                    kc.set(sc, new Map());
                }

                kc.get(sc)!.set(t, nhRTT ?? 0);

                if (nh) {
                    if (!fc.has(sc)) {
                        fc.set(sc, new Set());
                    }

                    fc.get(sc)!.add(nh);
                }
            }
        }

        //@ts-ignore
        let dcn: cytoscape.SearchDegreeCentralityNormalizedResultDirected = cy.elements().degreeCentralityNormalized({
            directed: true
        });
        //@ts-ignore
        let dcnu: cytoscape.SearchDegreeCentralityNormalizedResultUndirected = cy.elements().degreeCentralityNormalized({
            directed: false
        });

        let bcn = cy.elements().betweennessCentrality({
            directed: true
        });
        let ccn = cy.elements().closenessCentralityNormalized({
            directed: true
        });

        let sortedNodes = [...cy.nodes()].map(n => ({
            id: n.id(),

            ccn: ccn.closeness(n),
            bcn: bcn.betweenness(n),
            dcn: dcnu.degree(n),
            dcnIn: dcn.indegree(n),
            dcnOut: dcn.outdegree(n),
            index: 0, // to be filled later

            connCandidates: kc.get(n.id()) || new Map<string, number>(),
            recvCandidates: new Set<string>()
        })).sort((a, b) => b.bcn - a.bcn);

        let maxBcn = sortedNodes[0]?.bcn || 1;
        for (let node of sortedNodes) {
            // normalize
            node.bcn /= maxBcn;

            node.index = (alpha * node.bcn) + (beta * node.ccn) + (gamma * node.dcn);
        }

        sortedNodes.sort((a, b) => b.index - a.index);
        
        let mapping: Record<string, typeof sortedNodes[number]> = {};
        for (let node of sortedNodes) {
            mapping[node.id] = node;
        }

        for (let node of sortedNodes) {
            for (let target of node.connCandidates.keys()) {
                mapping[target].recvCandidates.add(node.id);
            }
        }

        cy.destroy();

        return [sortedNodes, forwardUsage, fc] as const;
    }, [props.formattedTopology, props.dynamicRgCode]);

    const render = useMemo(() => {
        let [sortedNodes, forwardUsage, fc] = calc;

        return sortedNodes
            .filter(n => forwardUsage.get(n.id)?.[0] || forwardUsage.get(n.id)?.[1])
            .map((n, i) => {
            let receiveUsage = forwardUsage.get(n.id) || [0, 0];

            let peer: [string, number][] = [];
            let upstream: [string, number][] = [];

            for (let [target, rtt] of Array.from(n.connCandidates.entries()).sort((a, b) => a[1] - b[1])) {
                if (fc.get(n.id)?.has(target)) {
                    upstream.push([target, rtt]);
                } else {
                    peer.push([target, rtt]);
                }
            }

            let downstream = new Set<string>();
            let downstreamPeers = new Set<string>();
            for (let [did, upstreamSet] of fc.entries()) {
                if (upstreamSet.has(n.id)) {
                    downstream.add(did);
                }
            }

            for (let pid of n.recvCandidates) {
                if (!downstream.has(pid)) {
                    downstreamPeers.add(pid);
                }
            }

            return <Table.Row key={n.id}>
                <Table.Cell>{i + 1}</Table.Cell>
                <Table.Cell>
                    {SCtoRCLookup[n.id]?.[1] || n.id}
                    {SCtoRCLookup[n.id] ? <><br /><span style={{ fontSize: 10 }}>{n.id} / {SCtoRCLookup[n.id][0]}</span></> : ""}
                </Table.Cell>
                <Table.Cell>
                    {(n.index * 10000).toFixed(0)}<br />
                </Table.Cell>
                <Table.Cell style={{ whiteSpace: "pre", fontFamily: "monospace" }}>
                    BCN: {n.bcn.toFixed(4)}<br />
                    CCN: {n.ccn.toFixed(4)}<br />
                    DCN: {n.dcn.toFixed(4)}
                </Table.Cell>
                {!!props.showDownstream && <Table.Cell>
                    Degree (in): {n.dcnIn.toFixed(4)}<br /><br />
                    Downstream: {downstream.size} {downstream.size > 0 ? <><br />{
                        Array.from(downstream).map(target => (
                            `${SCtoRCLookup[target]?.[1] || target}^`
                        )).join(",  ")
                    }</> : ""}
                    <br />
                    <br />
                    Peer: {downstreamPeers.size} {downstreamPeers.size > 0 ? <><br />{
                        Array.from(downstreamPeers).map(target => (
                            `${SCtoRCLookup[target]?.[1] || target}`
                        )).join(",  ")
                    }</> : ""}
                    <br /><br />
                    Routes: {receiveUsage[0]} direct / {receiveUsage[1]} forward
                </Table.Cell>}
                {!!props.showUpstream && <Table.Cell>
                    Degree (out): {n.dcnOut.toFixed(4)}<br /><br />
                    Upstream: {upstream.length} {upstream.length > 0 ? <><br />{
                        upstream.map(([target, rtt]) => (
                            `${SCtoRCLookup[target]?.[1] || target}* (${rtt.toFixed(2)}ms)`
                        )).join(",  ")
                    }</> : ""}
                    <br />
                    <br />
                    Peer: {peer.length} {peer.length > 0 ? <><br />{
                        peer.map(([target, rtt]) => (
                            `${SCtoRCLookup[target]?.[1] || target} (${rtt.toFixed(2)}ms)`
                        )).join(",  ")
                    }</> : ""}
                </Table.Cell>}
            </Table.Row>
        });
    }, [calc, props.showDownstream, props.showUpstream]);

    return <div>
        <Table.Root style={{ width: '100%', height: '80vh' }}>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>Rank</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Node</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Index</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Centrality</Table.ColumnHeaderCell>
                    {!!props.showDownstream && <Table.ColumnHeaderCell>Downstream (^)</Table.ColumnHeaderCell>}
                    {!!props.showUpstream && <Table.ColumnHeaderCell>Forward (*: upstream)</Table.ColumnHeaderCell>}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {render}
            </Table.Body>
        </Table.Root>
    </div>;
}
