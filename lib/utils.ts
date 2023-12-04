import fs from 'node:fs';

export const fetchFileContents = (pathToFile: string) => {
    try {
        const data = fs.readFileSync(pathToFile, 'utf8');
        // The filter is to remove the annoying empty line at end of file that keeps tripping me up!
        return data.split('\n').filter((value) => value);
        
    } catch (err) {
        console.error(err);
        return[];
    }
}
