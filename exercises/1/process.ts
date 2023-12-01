const fs = require('node:fs');

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
let calculateCalibrationValue = (line: string) => {
    const chars = line.split('');
    if (chars.length === 0) {
        return 0;
    }
    const numbers = chars.filter(isCharacterNumeric);
    if (numbers.length > 1) {
        return Number.parseInt(numbers[0] + numbers.pop())
    } else if (numbers.length === 1) {
        return Number.parseInt(numbers[0] + numbers[0]);
    } else {
        console.log(`Something ain't right! Line is: ${line}`)
        return -1;
    }
}

let crunchTheNumbers = (input: string[]) => input.reduce((total, value) => total + calculateCalibrationValue(value), 0)

const input = fetchFileContents('input');

console.log(crunchTheNumbers(input));
