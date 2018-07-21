const mysql = require('mysql');

module.exports = class SqlHistoryStorage {
    constructor(db) {
        this.db = db;
    }

    async createConnection() {
        return new Promise(async (resolve, reject) => {
            const con = await mysql.createConnection(this.db);

            con.connect((err) => {
                if (err) {
                    reject('Error connecting to the db.');
                }
                else {
                    resolve(con);
                }
            });
        });
    }

    async saveHistoryEntry(entry) {
        const query =  `INSERT INTO history 
                        (Operation, Number1, Number2, Result, Time_stamp) 
                        VALUES ('${entry.operation}', ${entry.number1}, ${entry.number2}, ${entry.result}, 
                        '${entry.timestamp.getFullYear()}-${entry.timestamp.getMonth()+1}-${entry.timestamp.getDate()} ${entry.timestamp.getHours()}:${entry.timestamp.getMinutes()}:${entry.timestamp.getSeconds()}')`;

        return new Promise(async (resolve, reject) => {
            const con = await this.createConnection();
            con.query(query, (err, result) => {
                con.end();
                if (err) {
                    reject("Error executing saveHistoryEntry query.");
                }
                else {
                    resolve(result);
                };
            });
        });
    }

    async getHistory() {
        const query = "SELECT * FROM history";

        return new Promise(async (resolve, reject) => {
            const con = await this.createConnection();
            con.query(query, (err, result) => {
                con.end();
                if (err) {
                    reject("Error executing getHistory query.");
                } else {
                    resolve(result);
                };
            });
        });
    }
}