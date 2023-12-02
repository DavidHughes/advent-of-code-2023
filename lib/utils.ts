const fs = require('node:fs');

export const fetchFileContents = (pathToFile: string) => {
    try {
        const data = fs.readFileSync(pathToFile, 'utf8');
        return data.split('\n');
    } catch (err) {
        console.error(err);
        return[];
    }
}
