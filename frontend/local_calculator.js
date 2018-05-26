function sendValues()
{
    var values = getNumbers(),
        result = 0,
        xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = () => {
        if (this.readyState == 4 && this.status == 200) {
            $("#result").html(this.responseText);
        }
    };

    //xhttp.open("POST", "http://localhost:8080/server.js", true);
    xhttp.open("GET", `http://localhost:8080/server_calculator.js?firstNumber=${values.nr1}
        &secondNumber=${values.nr2}&operation=${getOperation()}`, true);
    //xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //xhttp.send(`firstNumber=${values.nr1}&secondNumber=${values.nr2}&operation=${getOperation()}`);
    xhttp.send();
}