const fs = require('node:fs');

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

const input = [
    'two1nine',
    'eightwothree',
    'abcone2threexyz',
    'xtwone3four',
    '4nineeightseven2',
    'zoneight234',
    '7pqrstsixteen',
];

const fetchFileContents = (pathToFile: string) => {
    try {
        const data = fs.readFileSync(pathToFile, 'utf8');
        return data.split('\n');
    } catch (err) {
        console.error(err);
        return[];
    }
}

const isCharacterNumeric = (char: string) => {
    return /\d/.test(char)
}

const getSecondNumber = (line: string) => {
    // This will be similar to getFirstNumber
    // BUT
    // We reverse line before we search it
    // AND
    // We reverse all strings in `digits` before searching for them
    // AND THEN
    // We need to flip the resulting index...somehow. Maybe? Do we actually? Possibly not.
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
    console.log(firstNumberFound.digit + " " + line);
}

input.forEach(inputValue => getFirstNumber(inputValue));

// @TODO: Finish this: const reverseDigit = (digit: string) => 

// @TODO: Lots.
// let calculateCalibrationValue = (line: string) => {
//     const chars = line.split('');
//     if (chars.length === 0) {
//         return 0;
//     }

//     // @TODO: We can no longer just filter out all characters that aren't numeric.
//     const firstNumber = getFirstNumber(line);

//     if (numbers.length > 1) {
//         return Number.parseInt(numbers[0] + numbers.pop())
//     } else if (numbers.length === 1) {
//         return Number.parseInt(numbers[0] + numbers[0]);
//     } else {
//         console.log(`Something ain't right! Line is: ${line}`)
//         return -1;
//     }
// }

// let crunchTheNumbers = (input: string[]) => input.reduce((total, value) => total + calculateCalibrationValue(value), 0)

// input.forEach(inputItem => console.log(calculateCalibrationValue(inputItem)))

// console.log(crunchTheNumbers(input));
