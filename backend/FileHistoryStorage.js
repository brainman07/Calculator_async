const HistoryEntry = require('./HistoryEntry');
const fs = require('fs').promises;

var history = [];

module.exports = class FileHistoryStorage {
    constructor(filePath) {
        this.filePath = filePath;
        fs.writeFile(filePath, '');
    }

    async saveHistoryEntry(entry) {
        history.push(entry);
        await fs.writeFile(this.filePath, JSON.stringify(history) + "\n");
    }

    async getHistory() {
        const data = JSON.parse(await fs.readFile(this.filePath));
        return data;
    }
}