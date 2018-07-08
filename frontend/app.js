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
}