import { fetchFileContents } from "../../lib/utils";

type FoundDigit = {
    digit: string|number, 
    index: number,
    length: string|number,
}

const digits = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9
];

const reverseText = (text: string) => text.split('').reverse().join('');

const parseDigit = (digit: string|number) => {
    if (typeof digit === 'number') {
        return digit;
    }

    // Look, I'm just tired at this point and this is the final piece of the puzzle.
    switch (digit) {
        case 'one':
            return 1;
        case 'two':
            return 2;
        case 'three':
            return 3;
        case 'four':
            return 4;
        case 'five':
            return 5;
        case 'six':
            return 6;
        case 'seven':
            return 7;
        case 'eight':
            return 8;
        case 'nine':
            return 9;
        default:
            console.log('HOW DID THAT HAPPEN?!')
            return 502;
    }
}

// This isn't a smart solution.
// But it is a solution.
const getLastNumber = (line: string) => {
    const reversedLine = reverseText(line)
    const digitsFound: FoundDigit[] = digits.map(digit => {
        const reversedDigit = reverseText(digit + '');
        // We concatenate an empty string here because digit is either a string or a number, and we don't particularly care for the difference when searching a string.
        const index = reversedLine.search(reversedDigit + '');
        const length = typeof digit === 'string' ? reversedDigit.length : 1;
        return { 
            digit, 
            index: index !== -1 ? line.length - index - length : index,
            length,
         };
    }).filter(digit => digit.index !== -1);


    if (digitsFound.length === 0) {
        console.log(`Uh oh! No digits were found in: ${line}`)
        return -1;
    }
    const lastNumberFound = digitsFound.reduce((digit1, digit2) => digit1.index > digit2.index ? digit1 : digit2);
    return parseDigit(lastNumberFound.digit);
}

const getFirstNumber = (line: string) => {
    const digitsFound: FoundDigit[] = digits.map(digit => {
        // We concatenate an empty string here because digit is either a string or a number, and we don't particularly care for the difference when searching a string.
        const index = line.search(digit + '');
        return { 
            digit, 
            index,
            length: typeof digit === 'string' ? digit.length : 1,
         };
    }).filter(digit => digit.index !== -1);

    if (digitsFound.length === 0) {
        console.log(`Uh oh! No digits were found in: ${line}`)
        return -1;
    }

    const firstNumberFound = digitsFound.reduce((digit1, digit2) => digit1.index < digit2.index ? digit1 : digit2);
    return parseDigit(firstNumberFound.digit);
}

const calculateCalibrationValue = (line: string) => {
    const firstNumber = getFirstNumber(line);
    const lastNumber = getLastNumber(line);
    if (firstNumber === -1 || lastNumber === -1) {
        console.log('WRONG! One of the numbers failed to be found');
    }

    return parseInt(firstNumber + '' + lastNumber);
}

const crunchTheNumbers = (input: string[]) => input.reduce((total, value) => total + calculateCalibrationValue(value), 0)

const input = fetchFileContents('input');

console.log(crunchTheNumbers(input));