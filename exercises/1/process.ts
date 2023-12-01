const isCharacterNumeric = (char: string) => {
    return /\d/.test(char)
}
let calculateCalibrationValue = (line: string): number => {
    const chars = line.split('');
    const numbers = chars.filter(isCharacterNumeric);
    if (numbers.length > 1) {
        return Number.parseInt(numbers[0] + numbers.pop())
    } else if (numbers.length === 1) {
        return Number.parseInt(numbers[0] + numbers[0]);
    } else {
        console.log(`Something ain't right!`)
        return -1;
    }
}

console.log(calculateCalibrationValue('1abc2'));
console.log(calculateCalibrationValue('pqr3stu8vwx'));
console.log(calculateCalibrationValue('a1b2c3d4e5f'));
console.log(calculateCalibrationValue('treb7uchet'));