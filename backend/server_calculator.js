const http = require("http");
const qs = require('querystring');
const url = require('url');
const fs = require('fs');
const path = require('path');
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

    const projectPath = path.join(__dirname, '..');

    if ((req.method == 'GET') && (req.url.indexOf("assign_1.html") != -1)) {
        fs.readFile(projectPath + "\\frontend\\assign_1.html", (err, data) => {
            res.writeHead(200, {'Content-type': 'text/html'});
            res.write(data);
            res.end();
        });
        // res.writeHead(200, {'Content-type': 'text/html'});
  //    fs.createReadStream(__dirname + '/assign_1.html', 'utf8').pipe(res);
    };

    if ((req.method == 'GET') && (req.url.indexOf("style.css") != -1)) {
        fs.readFile(projectPath + "\\frontend\\style.css", (err, data) => {
            res.writeHead(200, {'Content-type': 'text/css'});
            res.write(data);
            res.end();
        });
    };

    if ((req.method == 'GET') && (req.url.indexOf("app.js") != -1)) {
        fs.readFile(projectPath + "\\frontend\\app.js", (err, data) => {
            res.writeHead(200, {'Content-type': 'application/javascript'});
            res.write(data);
            res.end();
        });
    };

    if ((req.method == 'GET') && (req.url.indexOf("local_calculator.js") != -1)) {
        fs.readFile(projectPath + "\\frontend\\local_calculator.js", (err, data) => {
            res.writeHead(200, {'Content-type': 'application/javascript'});
            res.write(data);
            res.end();
        });
    };

    if ((req.method == 'GET') && (req.url.indexOf("remote_calculator.js") != -1)) {
        fs.readFile(projectPath + "\\frontend\\remote_calculator.js", (err, data) => {
            res.writeHead(200, {'Content-type': 'application/javascript'});
            res.write(data);
            res.end();
        });
    };

    if (req.method == 'GET' && (req.url.indexOf("operation") != -1)) {
        const query = url.parse(req.url, true).query;
        let result = 0, nr1, nr2;

        nr1 = Number(query.firstNumber);
        nr2 = Number(query.secondNumber);

        res.writeHead(200, {'Content-type': 'text/plain',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST',
                'Access-Control-Allow-Headers': '*'
            });
        result = new Calculator().calculateResult(nr1, nr2, query.operation).toString();

        entry = new HistoryEntry(query.operation, nr1, nr2, result, new Date());
        await sqlStorage.saveHistoryEntry(entry);

        res.write(result);
        res.end();
    }

    if (req.method == 'GET' && (req.url.indexOf("getHistory") != -1)) {
        const history = await sqlStorage.getHistory();
        console.log(history);
        res.write(JSON.stringify(history));
        res.end();
    }

    // if (req.method == 'POST') {
    //     var body = '';

    //     req.on('data', (data) => {
    //         body += data;

    //         // Too much POST data => kill the connection
    //         if (body.length > 1e6)
    //             res.writeHead(413, {'Content-type': 'text/plain'}).end();
    //             req.connection.destroy();
    //     });

    //     req.on('end', () => {
    //         let result = 0, nr1, nr2;
    //         let post;

    //         post = qs.parse(body);
    //         nr1 = post.firstNumber;
    //         nr2 = post.secondNumber;

    //         res.writeHead(200, {'Content-type': 'text/plain',
    //             'Access-Control-Allow-Origin': '*',
    //             'Access-Control-Allow-Methods': 'GET, POST',
    //             'Access-Control-Allow-Headers': '*'
    //         });
    //         result = new Calculator().calculateResult(nr1, nr2, post.operation).toString();

    //         entry = new HistoryEntry(post.operation, nr1, nr2, result, new Date());
    //         sqlStorage.saveHistoryEntry(entry);

    //         res.write(result);
    //         res.end();
    //     });
    // };

}).listen(8080);