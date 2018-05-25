var http = require("http");
var qs = require('querystring');

http.createServer(function (req, res) {
	
	if (req.method == 'GET') {
		console.log("smth");
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
			//console.log(nr1);
			nr2 = post.secondNumber;

			switch (post.operation) {
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
		});
	}

}).listen(8080);