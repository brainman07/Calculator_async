class ServerCalculator {
    async calculate(values, operation) {
        const currentLocation = window.location.hostname;

        const response = await fetch(`http://86.127.181.250:8080/server_calculator.js
                                    ?firstNumber=${values.nr1}
                                    &secondNumber=${values.nr2}
                                    &operation=${operation}`);
        
        const result = await response.text();
        
        return Number(result);
        
        //xhttp.open("POST", "http://localhost:8080/server.js", true);
        //xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        //xhttp.send(`firstNumber=${values.nr1}&secondNumber=${values.nr2}&operation=${getOperation()}`);
    }
}