import { fetchFileContents } from "../../lib/utils";

const testInput = [
    'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
    'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
    'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
    'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
    'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
];
const input = fetchFileContents('input');

type ParsedBallCount = {
    colour: string,
    count: number,
}
type BallCount = Record<string, number>;
type Set = Partial<BallCount>;
type Game = {
    id: number,
    sets: Set[],
};

const parseBallCount = (ballData: string): ParsedBallCount => {
    const [count, colour] = ballData.trim().split(' ');
    if (!colour) {
        throw new Error(`Could not find ball count for ${ballData}`);
    }
    return {
        colour: colour,
        count: Number.parseInt(count),
    }
}

const parseSet = (setData: string): Set => {
    const ballData = setData.trim().split(',');
    const set: Set = {};
    ballData.forEach((ballData) => {
        const ballCount = parseBallCount(ballData);
        set[ballCount.colour] = ballCount.count;
    });

    return set;
}

const parseAllSets = (setsData: string): Set[] => {
    const splitSets = setsData.trim().split(';');
    return splitSets.map(set => parseSet(set));
}

const getMinimumGameState = (game: Game): BallCount => {
    const minimalState = {
        red: 0,
        green: 0,
        blue: 0,
    };

    game.sets.forEach(set => {
        if (typeof set.red === 'number' && set.red > minimalState.red) {
            minimalState.red = set.red;
        }

        if (typeof set.green === 'number' && set.green > minimalState.green) {
            minimalState.green = set.green;
        }

        if (typeof set.blue === 'number' && set.blue > minimalState.blue) {
            minimalState.blue = set.blue;
        }
    })

    return minimalState;
}

const calculatePower = (set: BallCount) => {
    return set.red * set.green * set.blue;
}

const parseGame = (line: string) => {
    const [gameMetadata, setsData] = line.trim().split(':');
    const gameIdMatch = gameMetadata.match(/^Game (\d+)/);
    if (gameIdMatch === null) {
        throw new Error(`Could not find game id: ${line}`)
    }
    const gameId = gameIdMatch[1];
    const game: Game = {
        id: Number.parseInt(gameId),
        sets: parseAllSets(setsData)
    }

    return game;
}

const crunchTheNumbers = (results: string[]) => results.reduce((total, result) => {
    const game = parseGame(result);
    const leastCubes = getMinimumGameState(game);
    return total + calculatePower(leastCubes);
}, 0);

console.log(crunchTheNumbers(testInput));