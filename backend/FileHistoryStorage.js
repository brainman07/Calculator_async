const HistoryEntry = require('./HistoryEntry');
const fs = require('fs').promises;

module.exports = class FileHistoryStorage {
    constructor(filePath) {
        this.history = [];
        this.filePath = filePath;
        fs.writeFile(filePath, '');
    }

    async saveHistoryEntry(entry) {
        this.history.push(entry);
        await fs.writeFile(this.filePath, JSON.stringify(this.history) + "\n");
    }

    async getHistory() {
        const data = JSON.parse(await fs.readFile(this.filePath));
        return data;
    }
}