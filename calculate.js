function calculate(){
	var dropdown = document.getElementById("dropdown1");
	
	var	nr1 = document.getElementById("firstNumber").value;
	window.alert(nr1);

	var	nr2 = document.getElementById("firstNumber").value;
	var result = 0;

	switch (dropdown.selectedIndex){
		case 0:
			result = nr1 + nr2;
		case 1:
			result = nr1 - nr2;
		case 2:
			result = nr1 * nr2;
		case 3:
			result = nr1 / nr2;
		case 4:
			result = Math.pow(nr1, nr2);
	}

	document.getElementById("result").value = result;
}