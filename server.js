var http = require("http");
var qs = require('querystring');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
	
	// function calculateResult(nr1, nr2, operation) {
	// 	let result = 0;
		
	// 	return result;
	// }

	if ((req.method == 'GET') && (req.url.indexOf("assign_1.html") != -1)) {
		fs.readFile("assign_1.html", function(err, data) {
			res.writeHead(200, {'Content-type': 'text/html'});
			res.write(data);
			res.end();
		});
		// res.writeHead(200, {'Content-type': 'text/html'});
  //   	fs.createReadStream(__dirname + '/assign_1.html', 'utf8').pipe(res);
	};

	if ((req.method == 'GET') && (req.url.indexOf("style.css") != -1)) {
		fs.readFile("style.css", function(err, data) {
			res.writeHead(200, {'Content-type': 'text/css'});
			res.write(data);
			res.end();
		});
	};

	if ((req.method == 'GET') && (req.url.indexOf("calculate.js") != -1)) {
		fs.readFile("calculate.js", function(err, data) {
			res.writeHead(200, {'Content-type': 'application/javascript'});
			res.write(data);
			res.end();
		});
	};

	if (req.method == 'GET' && (req.url.indexOf("server.js") != -1)) {
		const query = url.parse(req.url, true).query;
		let result = 0, nr1, nr2;

		nr1 = query.firstNumber;
		nr2 = query.secondNumber;

		switch (query.operation) {
	        case "Addition":
	            result = (nr1) + (nr2);
	            break;

	        case "Subtraction":
	            result = (nr1) - (nr2);
	            break;

	        case "Multiplication":
	            result = (nr1) * (nr2);
	            break;

	        case "Division":
	            result = (nr1) / (nr2);
	            break;

	        case "Pow":
	            result = Math.pow(nr1, nr2);
	            break;
		}

		res.writeHead(200, {'Content-type': 'text/plain',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST',
				'Access-Control-Allow-Headers': '*'
			});
		res.write(result.toString());
		res.end();
	}

	if (req.method == 'POST') {
		var body = '';

		req.on('data', function (data) {
			body += data;

			// Too much POST data => kill the connection
			if (body.length > 1e6)
				res.writeHead(413, {'Content-type': 'text/plain'}).end();
				req.connection.destroy();
		});

		req.on('end', function() {
			let result = 0, nr1, nr2;
			let post;

			post = qs.parse(body);
			nr1 = post.firstNumber;
			nr2 = post.secondNumber;

			res.writeHead(200, {'Content-type': 'text/plain',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST',
				'Access-Control-Allow-Headers': '*'
			});
			res.write(calculateResult(nr1, nr2, post.operation).toString());
			res.end();
		});
	};

}).listen(8080);