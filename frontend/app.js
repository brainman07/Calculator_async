function getNumbers()
{
    var firstNumber = $("#firstNumber").val();
    var secondNumber = $("#secondNumber").val();
    var values = {
        nr1:(+firstNumber), 
        nr2:(+secondNumber)
    };
    return values;
}

function getOperation()
{
    //return dropdown.options[dropdown.selectedIndex].value;
    return $("#dropdown1 option:checked").val();
}

function getCalculator() {
	if ($('#local_or_remote')[0].checked)
		return new ServerCalculator();
	else return new LocalCalculator();
}

async function calculate() {
	var values = getNumbers();
	var operation = getOperation();
	var calculator = getCalculator();

    const result = await calculator.calculate(values, operation);
    $("#result").html(result);

    const currentLocation = window.location.hostname;
    var response = await fetch(`http://${currentLocation}:8080/server_calculator.js?message="getHistory"`);
    const history = JSON.parse(await response.text());
    //console.log(history);
    
    $('#historyTable td').remove();
    for (var entryNumber in history) {
        const entry = history[entryNumber];
        
        $(` <tr><td>${Number(entryNumber)+1}</td>
                <td>${entry.operation}</td>
                <td>${entry.number1}</td>
                <td>${entry.number2}</td>
                <td>${entry.result}</td>
                <td>${entry.timestamp}</td>
            </tr>`).appendTo('#historyTable tbody');
    };
}