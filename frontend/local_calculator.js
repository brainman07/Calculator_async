class LocalCalculator {
    calculate (values, operation) {
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
        // setTimeout( () => {return result}, 3000);
        // $("#result").html(result);

        return new Promise( (resolve, reject) => {
            resolve(result); // reject(err)
        });
    }
}