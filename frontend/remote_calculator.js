const serverCalculator = {
    calculate: function(values, operation) {
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                $("#result").html(xhttp.responseText);
            }
        };

        //xhttp.open("POST", "http://localhost:8080/server.js", true);
        xhttp.open("GET", `http://localhost:8080/server_calculator.js?firstNumber=${values.nr1}
            &secondNumber=${values.nr2}&operation=${operation}`, true);
        //xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        //xhttp.send(`firstNumber=${values.nr1}&secondNumber=${values.nr2}&operation=${getOperation()}`);
        xhttp.send();
    }
}