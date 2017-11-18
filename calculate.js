function operation(){
	var dropdown = document.getElementById("dropdown1");

	var	nr1 = document.getElementById("firstNumber").value;

	var	nr2 = document.getElementById("secondNumber").value;
	var result = 0;

	switch (dropdown.selectedIndex){
		case 0:
			result = (+nr1) + (+nr2);

			break;
		case 1:
			result = (+nr1) - (+nr2);
			break;
		case 2:
			result = (+nr1) * (+nr2);
			break;
		case 3:
			result = (+nr1) / (+nr2);
			break;
		case 4:
			result = Math.pow((+nr1), (+nr2));
			break;
	}

	document.getElementById("result").innerHTML = result;
}