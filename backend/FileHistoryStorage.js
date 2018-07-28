const HistoryEntry = require('./HistoryEntry');
const fs = require('fs').promises;

module.exports = class FileHistoryStorage {
    constructor(filePath) {
        this.filePath = filePath;
        fs.writeFile(filePath, '');
    }

    async saveHistoryEntry(entry) {
        await fs.appendFile(this.filePath, JSON.stringify(entry) + "\n");
    }

    async getHistory() {
        const data = JSON.parse(await fs.readFile(this.filePath));
        return data;
    }
}