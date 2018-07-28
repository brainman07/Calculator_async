const http = require("http");
const url = require('url');
const path = require('path');
const SqlHistoryStorage = require('./SqlHistoryStorage');
const FileHistoryStorage = require('./FileHistoryStorage');
const HistoryEntry = require('./HistoryEntry');
const Calculator = require('./Calculator');

const db = {
    host: "localhost",
    user: "root",
    password: "qwer",
    database: "calculator_db",
};

const filePath = path.join(__dirname, "history.json");

var sqlStorage = new SqlHistoryStorage(db);
var fileStorage = new FileHistoryStorage(filePath);

http.createServer(async (req, res) => {

    if (req.method == 'GET' && (req.url.indexOf("operation") != -1)) {
        const query = url.parse(req.url, true).query;
        const nr1 = Number(query.firstNumber);
        const nr2 = Number(query.secondNumber);

        const result = new Calculator().calculateResult(nr1, nr2, query.operation).toString();

        const entry = new HistoryEntry(query.operation, nr1, nr2, result, new Date());
        // await sqlStorage.saveHistoryEntry(entry);
        await fileStorage.saveHistoryEntry(entry);

        res.writeHead(200, {'Content-type': 'text/plain',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'GET, POST',
                            'Access-Control-Allow-Headers': '*'
            });
        res.write(result);
        res.end();
    }

    if (req.method == 'GET' && (req.url.indexOf("getHistory") != -1)) {
        // const history = await sqlStorage.getHistory();
        const history = await fileStorage.getHistory();
        console.log(history);

        res.writeHead(200, {'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'});
        
        const response = JSON.stringify(history);
        res.write(response);
        res.end();
    }

}).listen(8080);