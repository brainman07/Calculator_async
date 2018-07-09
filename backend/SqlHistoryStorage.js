const mysql = require('mysql');

module.exports = class SqlHistoryStorage {
    constructor(db) {
        this.con = mysql.createConnection(db);

        this.con.connect((err) => {
            if (err) {
                console.log('Error connecting to the db.');
            };
        });
    }

    saveHistoryEntry(entry) {
        const query =  `INSERT INTO history 
                        (Operation, Number1, Number2, Result, Time_stamp) 
                        VALUES ('${entry.operation}', ${entry.number1}, ${entry.number2}, ${entry.result}, 
                        '${entry.timestamp.getFullYear()}-${entry.timestamp.getMonth()+1}-${entry.timestamp.getDate()} ${entry.timestamp.getHours()}:${entry.timestamp.getMinutes()}:${entry.timestamp.getSeconds()}')`;

        this.con.query(query, (err) => {
            if (err) {
                console.log("Error executing saveHistoryEntry query.");
            };
        });
    }

    getHistory() {
        const query = "SELECT * FROM history LIMIT 10";

        this.con.query(query, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                return result;
            };
        });
    }
}