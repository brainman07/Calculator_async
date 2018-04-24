function getNumbers()
{
    var firstNumber = $("#firstNumber").val();
    //console.log(typeof $("#firstNumber"));
    var secondNumber = $("#secondNumber").val();
    var values = 
    {
        nr1:(+firstNumber), 
        nr2:(+secondNumber)
    };
    return values;
}

function getOperation()
{
    var option = $("#dropdown1 option:selected");
    //return dropdown.options[dropdown.selectedIndex].value;
    console.log($("#dropdown1 option:selected").text());
    return $("#dropdown1 option:selected").val();
}

function executeOperation()
{
    var values = getNumbers();
    var result = 0;

    switch (getOperation()){
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

    $("#result").html(result);
}