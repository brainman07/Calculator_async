function getNumbers()
{
    var firstNumber = $("#firstNumber").val();
    //console.log(typeof $("#firstNumber"));
    var secondNumber = $("#secondNumber").val();
    var values = {
        nr1:(+firstNumber), 
        nr2:(+secondNumber)
    };
    return values;
}

function getOperation()
{
    var option = $("#dropdown1 option:selected");
    //return dropdown.options[dropdown.selectedIndex].value;
    //console.log($("#dropdown1 option:checked").val());
    return $("#dropdown1 option:checked").val();
}

function sendValues()
{
    var values = getNumbers(),
        result = 0,
        xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $("#result").html(this.responseText);
        }
    };

    //xhttp.open("POST", "http://localhost:8080/server.js", true);
    xhttp.open("GET", `http://localhost:8080/server.js?firstNumber=${values.nr1}
        &secondNumber=${values.nr2}&operation=${getOperation()}`, true);
    //xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //xhttp.send(`firstNumber=${values.nr1}&secondNumber=${values.nr2}&operation=${getOperation()}`);
    xhttp.send();

}