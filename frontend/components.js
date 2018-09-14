class Operation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstNumber: 0,
            secondNumber: 0,
            serverCalculation: true
        };
        this.handleFirstNumberChange = this.handleFirstNumberChange.bind(this);
        this.handleSecondNumberChange = this.handleSecondNumberChange.bind(this);
        this.handleServerCheck = this.handleServerCheck.bind(this);
    }

    handleFirstNumberChange(e) {
        this.setState({firstNumber: e.target.value});
    }

    handleSecondNumberChange(e) {
        this.setState({secondNumber: e.target.value});
    }

    handleServerCheck(e) {
        this.setState({serverCalculation: !this.state.serverCalculation});
    }

    render () {
        return (
            <div>
                <p>
                    <label>
                        1st number : 
                        <input 
                            type="number" 
                            id="firstNumber" 
                            name="firstNumber" 
                            value={this.state.firstNumber}
                            onChange={this.handleFirstNumberChange}
                        />
                    </label>
                </p>
                
                <p>
                    <label>
                        2nd number:
                        <input 
                            type="number" 
                            id="secondNumber" 
                            name="secondNumber" 
                            value={this.state.secondNumber}
                            onChange={this.handleSecondNumberChange}
                        />
                    </label>
                </p>
                
                Operation : <select id="dropdown1">
                    <option value="Addition">Add (+)</option>
                    <option value="Subtraction">Subtract (-)</option>
                    <option value="Multiplication">Multiply (*)</option>
                    <option value="Division">Divide (/)</option>
                    <option value="Power">x to the y power (x^y)</option>
                </select>
                <br/><br/>
                <label>
                    <input 
                        type="checkbox" 
                        id="local_or_remote" 
                        
                    />
                    Calculate using server
                </label>
            </div>
        );
    }
}

class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: 0
        };
        this.handleResultChange = this.handleResultChange.bind(this);
    }

    handleResultChange(e) {
        this.setState({result: e.target.value});
    }

    render () {
        return (
            <div>
                <input type="submit" id="resultButton" value="Result :" onClick={calculate}/>
                <p id="result" onChange={this.handleResultChanges}>
                    {this.state.result}
                </p>
            </div>
        );
    }
}

class CalculatorBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <form onSubmit={() => {return false}} method="get">
                <Operation />
                <Result />
            </form>
        );
    }
}

ReactDOM.render(
    <CalculatorBox />,
    document.getElementById('calcForm')
);