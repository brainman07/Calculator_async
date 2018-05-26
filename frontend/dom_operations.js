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