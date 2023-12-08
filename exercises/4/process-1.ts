import { fetchFileContents } from "../../lib/utils";

const input = fetchFileContents('input');

type Card = {
    winners: number[],
    numbers: number[],
}

const scoreCard = (card: Card) => {
    let score = 0;

    card.winners.forEach((winner) => {
        const cardHasWinner = card.numbers.some((cardNumber) => cardNumber === winner);

        if (cardHasWinner) {
            score = score === 0 ? 1 : score * 2;
        }
    });

    return score;
}

const parseCardNumbers = (cardNumbers: string) => {
    return cardNumbers.trim().split(' ').map((numberToParse) => Number.parseInt(numberToParse));
}

const parseCard = (cardToParse: string): Card => {
    const cardValues = cardToParse.split(':')[1];
    const [winnersToParse, numbersToParse] = cardValues.split('|');

    return {
        winners: parseCardNumbers(winnersToParse),
        numbers: parseCardNumbers(numbersToParse),
    }
}

const crunchTheNumbers = (cards: string[]) => {
    return input.reduce((total, card) => total + scoreCard(parseCard(card)), 0);
}

console.log(crunchTheNumbers(input));