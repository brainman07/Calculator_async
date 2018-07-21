const http = require("http");
const url = require('url');
const SqlHistoryStorage = require('./SqlHistoryStorage');
const HistoryEntry = require('./HistoryEntry');
const Calculator = require('./Calculator');

const db = {
    host: "localhost",
    user: "root",
    password: "qwer",
    database: "calculator_db",
};

var sqlStorage = new SqlHistoryStorage(db);

http.createServer(async (req, res) => {

    if (req.method == 'GET' && (req.url.indexOf("operation") != -1)) {
        const query = url.parse(req.url, true).query;
        const nr1 = Number(query.firstNumber);
        const nr2 = Number(query.secondNumber);

        const result = new Calculator().calculateResult(nr1, nr2, query.operation).toString();

        const entry = new HistoryEntry(query.operation, nr1, nr2, result, new Date());
        await sqlStorage.saveHistoryEntry(entry);

        res.writeHead(200, {'Content-type': 'text/plain',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST',
                'Access-Control-Allow-Headers': '*'
            });
        res.write(result);
        res.end();
    }

    if (req.method == 'GET' && (req.url.indexOf("getHistory") != -1)) {
        const history = await sqlStorage.getHistory();
        console.log(history);

        res.write(JSON.stringify(history));
        res.end();
    }

}).listen(8080);