import { fetchFileContents } from "../../lib/utils";

const startNodeID = 'AAA';
const endNodeID = 'ZZZ';

type NodeID = string;
type NodeRoute = {
    left: NodeID,
    right: NodeID,
}

const input = fetchFileContents('input');
const instructions = input[0].split('');
const nodes = input.slice(2).map((line) => {
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
        left,
        right,
    };

    return acc;
}, {})


let currentNodeID = startNodeID;

let currentInstructionIndex = 0;

const parseInstruction = (instruction: string) => {
    if (!['R', 'L'].includes(instruction)) {
        throw new TypeError('Instruction to parse must be either L or R.');
    }

    return instruction === 'R' ? 'right' : 'left';
}

let stepsRequired = 0;

while (currentNodeID !== endNodeID) {
    console.log(`Current node ID: ${currentNodeID}`);
    if (currentInstructionIndex === instructions.length) {
        currentInstructionIndex = 0;
    }
    const currentInstruction = parseInstruction(instructions[currentInstructionIndex]);
    console.log(`Current instruction: ${currentInstruction}`)
    const currentNodeRoute = nodes[currentNodeID];
    console.log(`Current node route: L(${currentNodeRoute.left}) and R(${currentNodeRoute.right}) `);
    currentNodeID = currentNodeRoute[currentInstruction];
    currentInstructionIndex++;
    stepsRequired++;
}

console.log(stepsRequired);
