class Operation extends React.Component {
    constructor(props) {
        super(props);
        this.handleFirstNumberChange = this.handleFirstNumberChange.bind(this);
        this.handleSecondNumberChange = this.handleSecondNumberChange.bind(this);
        this.handleOperationChange = this.handleOperationChange.bind(this);
        this.handleServerCheck = this.handleServerCheck.bind(this);
    }

    handleFirstNumberChange(e) {
        this.props.onFirstNumberChange(e.target.value);
    }

    handleSecondNumberChange(e) {
        this.props.onSecondNumberChange(e.target.value);
    }

    handleOperationChange(e) {
        this.props.onOperationChange(e.target.value);
    }

    handleServerCheck(e) {
        this.props.onServerCalculationChange();
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
                            value={this.props.firstNumber}
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
                            value={this.props.secondNumber}
                            onChange={this.handleSecondNumberChange}
                        />
                    </label>
                </p>
                
                Operation : <select id="dropdown1" onChange={this.handleOperationChange} value={this.props.operation}>
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
                        checked={this.props.serverCalculation}
                        onChange={this.handleServerCheck}
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
        this.handleResultClick = this.handleResultClick.bind(this);
    }

    handleResultClick() {
        this.props.onResultClick();
        // va apela handler-ul din CalculatorBox, care schimba state.result + 
        // apeleaza handler-ul pt history, care probabil va fi in App
    }

    render () {
        return (
            <div>
                <input 
                    type="button" 
                    id="resultButton" 
                    value="Result :" 
                    onClick={this.handleResultClick}
                />
                <p id="result">
                    {this.props.result}
                </p>
            </div>
        );
    }
}

class CalculatorBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstNumber: 0,
            secondNumber: 0,
            operation: "Addition",
            serverCalculation: true,
            result: 0
        };
        this.handleFirstNumberChange = this.handleFirstNumberChange.bind(this);
        this.handleSecondNumberChange = this.handleSecondNumberChange.bind(this);
        this.handleOperationChange = this.handleOperationChange.bind(this);
        this.handleServerCheck = this.handleServerCheck.bind(this);
        this.handleResultClick = this.handleResultClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    getNumbers() {
        var firstNumber = this.state.firstNumber;
        var secondNumber = this.state.secondNumber;
        var values = {
            nr1:(+firstNumber), 
            nr2:(+secondNumber)
        };
        return values;
    }
    
    getCalculator() {
        if (this.state.serverCalculation)
            return new ServerCalculator();
        else return new LocalCalculator();
    }
    
    async handleResultClick() {
        var values = this.getNumbers();
        var operation = this.state.operation;
        var calculator = this.getCalculator();
    
        const result = await calculator.calculate(values, operation);
        this.setState({result: result});
    
        this.props.onHistoryChange();
    }

    handleFirstNumberChange(firstNumber) {
        this.setState({firstNumber: firstNumber});
    }

    handleSecondNumberChange(secondNumber) {
        this.setState({secondNumber: secondNumber});
    }

    handleOperationChange(operation) {
        this.setState({operation: operation});
    }

    handleServerCheck() {
        this.setState({serverCalculation: !this.state.serverCalculation});
    }

    handleDeleteClick() {
        this.props.onDeleteClick();
    }

    render () {
        return (
            <form id="calcForm" onSubmit={() => {return false}} method="get">
                <Operation 
                    firstNumber={this.state.firstNumber}
                    secondNumber={this.state.secondNumber}
                    operation={this.state.operation}
                    serverCalculation={this.state.serverCalculation}

                    onFirstNumberChange={this.handleFirstNumberChange}
                    onSecondNumberChange={this.handleSecondNumberChange}
                    onOperationChange={this.handleOperationChange}
                    onServerCalculationChange={this.handleServerCheck}
                />
                <Result 
                    result={this.state.result}
                    onResultClick={this.handleResultClick}
                />
                <input 
                    type="button" 
                    id="delButton" 
                    value="Delete history"
                    onClick={this.handleDeleteClick}
                />
            </form>
        );
    }
}

class History extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.getHistory();
    }

    render () {
        var rows = [];
        this.props.history.forEach((entry, index) => {
            const timestamp = entry.timestamp.slice(0, 10) +" "+ entry.timestamp.slice(11, 19);
            rows.push(
                <tr key={entry.timestamp}>
                    <td className="center">{index+1}</td>
                    <td>{entry.operation}</td>
                    <td className="center">{entry.number1}</td>
                    <td className="center">{entry.number2}</td>
                    <td className="center">{entry.result}</td>
                    <td>{timestamp}</td>
                </tr>
            );
        });

        return (
            <table id="historyTable">
                <thead>
                    <tr>
                        <th>History</th>
                        <th>Operation</th>
                        <th>1st number</th>
                        <th>2nd number</th>
                        <th>Result</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: []
        };
        this.handleHistoryChange = this.handleHistoryChange.bind(this);
        this.handleDeleteHistory = this.handleDeleteHistory.bind(this);
    }

    async handleHistoryChange() {
        const currentLocation = window.location.hostname;
        var response = await fetch(`http://${currentLocation}:8080/server_calculator.js?message="getHistory"`);
        const history = JSON.parse(await response.text());

        this.setState({history: history});
    }

    async handleDeleteHistory() {
        const currentLocation = window.location.hostname;
        await fetch(`http://${currentLocation}:8080/server_calculator.js?message="delHistory"`);
        
        this.setState({history: []});
    }

    render () {
        return (
            <div class="flex-container">
                <div class="header">
                    <h1>Online calculator</h1>
                </div>
                <CalculatorBox 
                    onHistoryChange={this.handleHistoryChange}
                    onDeleteClick={this.handleDeleteHistory}    
                />
                <History 
                    history={this.state.history}
                    getHistory={this.handleHistoryChange}
                />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('container')
);