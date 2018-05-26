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
    var option = $("#dropdown1 option:selected");
    //return dropdown.options[dropdown.selectedIndex].value;
    return $("#dropdown1 option:checked").val();
}