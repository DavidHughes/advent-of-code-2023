import { fetchFileContents } from "../../lib/utils";

type NodeID = string;
type NodeRoute = {
    L: NodeID,
    R: NodeID,
}

const input = fetchFileContents('input');
const instructions = input[0].split('') as ['R', 'L'];
const nodes = input.slice(1).map((line) => {
    const [test, id, left, right] = /([A-Z]{3}) = \(([A-Z]{3}), ([A-Z]{3})\)/.exec(line) ?? [-1, 'ERROR', 'ERROR', 'ERROR'];

    if (test === -1) {
        throw new TypeError(`Could not parse line: ${line}`);
    }

    return {
        id,
        left,
        right,
    }
}).reduce((acc: Record<NodeID, NodeRoute>, {id, left, right}) => {
    acc[id] = {
        L: left,
        R: right,
    };

    return acc;
}, {});

const goalNodes = Object.keys(nodes).filter(nodeID => /..Z/.exec(nodeID));

let currentNodeIDs = Object.keys(nodes).filter(nodeID => /..A/.exec(nodeID));
let currentInstructionIndex = 0;

let stepsRequired = 0;

const isGoalReached = (nodeIDs: NodeID[]) => nodeIDs.every(nodeIDs => goalNodes.includes(nodeIDs));

const fetchNodeRoutes = (nodeIDs: NodeID[]) => nodeIDs.map(nodeID => nodes[nodeID]);

const fetchNextNodes = (nodeRoutes: NodeRoute[], direction: 'L' | 'R') => nodeRoutes.map(route => route[direction]);

const startTime = Date.now();
while (!isGoalReached(currentNodeIDs)) {
    // console.log(`Current node ID: ${currentNodeIDs}`);
    if (currentInstructionIndex === instructions.length) {
        currentInstructionIndex = 0;
    }

    // console.log(`Current instruction: ${currentInstruction}`)

    const currentNodeRoutes = fetchNodeRoutes(currentNodeIDs);
    // console.log(`Current node routes:`);
    // console.log(currentNodeRoutes);
    currentNodeIDs = fetchNextNodes(currentNodeRoutes, instructions[currentInstructionIndex]);
    currentInstructionIndex++;
    stepsRequired++;
}

console.log(`That only took ${Date.now() - startTime} seconds`);

console.log(stepsRequired);

