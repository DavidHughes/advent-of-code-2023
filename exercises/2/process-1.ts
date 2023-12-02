import { fetchFileContents } from "../../lib/utils";

const input = fetchFileContents('input');

const limit = Object.freeze({
    'red': 12,
    'green': 13,
    'blue': 14,
});

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

const isGamePossible = (game: Game) => {
    const setsPossiblity = game.sets.map(set => {
        if (typeof set.red === "number" && set.red > limit.red) {
            return false;
        }

        if (typeof set.green === "number" && set.green > limit.green) {
            return false;
        }

        if (typeof set.blue === "number" && set.blue > limit.blue) {
            return false;
        }

        return true;
    });

    const gamePossibility = setsPossiblity.every((bool) => bool);
    if (gamePossibility) {
        console.log(`Game ${game.id} is possible, sets are:`);
        console.log(game.sets);
    }

    return gamePossibility;
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

const getIDIfResultPossible = (result: string) => {
    const game = parseGame(result);
    
    return isGamePossible(game) ? game.id : 0;
}

const crunchTheNumbers = (results: string[]) => results.reduce((total, result) => total + getIDIfResultPossible(result), 0);

console.log(crunchTheNumbers(input));