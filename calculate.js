function get_numbers(){
	var	firstNumber = document.getElementById("firstNumber").value;
	var	secondNumber = document.getElementById("secondNumber").value;
	var values = {
		nr1:(+firstNumber), 
		nr2:(+secondNumber)
	};
	return values;
}

function get_operation(){
	var dropdown = document.getElementById("dropdown1");
	return dropdown.options[dropdown.selectedIndex].value;
}

function execute_operation(){
	
	var values = get_numbers();
	var result = 0;

	switch (get_operation()){
		case "Addition":
			result = (values.nr1) + (values.nr2);
			break;

		case "Subtraction":
			result = (values.nr1) - (values.nr2);
			break;

		case "Multiplication":
			result = (values.nr1) * (values.nr2);
			break;

		case "Division":
			result = (values.nr1) / (values.nr2);
			break;

		case "Pow":
			result = Math.pow((values.nr1), (values.nr2));
			break;
	}

	document.getElementById("result").innerHTML = result;
}