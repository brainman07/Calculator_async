const HistoryEntry = require('./HistoryEntry');
const fs = require('fs').promises;

module.exports = class FileHistoryStorage {
    constructor(filePath) {
        this.filePath = filePath;
        fs.appendFile(filePath, '');
    }

    async saveHistoryEntry(entry) {
        const jsonBuffer = await fs.readFile(this.filePath);
        const json = jsonBuffer.toString();

        var history = json ? JSON.parse(json) : [];

        history.push(entry);

        await fs.writeFile(this.filePath, JSON.stringify(history));
    }

    async getHistory() {
        const data = JSON.parse(await fs.readFile(this.filePath));
        return data;
    }
}