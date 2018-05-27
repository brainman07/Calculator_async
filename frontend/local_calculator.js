const localCalculator = {
    calculate: function(values, operation) {
        switch (operation) {
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
                result = Math.pow(values.nr1, values.nr2);
                break;
        }
        $("#result").html(result);
    }
}