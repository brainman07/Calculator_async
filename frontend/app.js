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
		return serverCalculator;
	else return localCalculator;
}

function calculate() {
	var values = getNumbers();
	var operation = getOperation();
	var calculator = getCalculator();

	calculator.calculate(values, operation);
}