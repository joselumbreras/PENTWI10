import React, { Component } from 'react';
import './App.css';

class Screen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      digits: []
    };
  }

  append(digit) {
    this.setState({ digits: this.state.digits.concat([digit]) });
  }

  value() {
    var args = Array.prototype.slice.call(arguments);
    if (args.length === 0) {
      return parseFloat(this.text());
    } else {
      this.setState({ digits: args[0].toString().split('') });
    }    
  }

  text() {
    return this.state.digits.join('');
  }

  clear() {
    this.setState({ digits: [] });
  }

  render() {
    return (
      <input type="text" className="w-100" style={{textAlign: 'right'}} value={this.text()}/>
    );
  }

}

class Button extends Component {

  render() {
    return (
      <button type="button" className="btn btn-primary" onClick={() => this.props.click(this.props.value)}>{this.props.text}</button>
    );
  }

}

class Calculator extends Component {

  initScreenComponent(screen) {
    this.screen = screen;
  }

  onClickNumber(number) {
    this.screen.append(number);
  }

  onClickOperator(operator) {
    var value = this.screen.value();

    if (!isNaN(value)) {
      this.value1 = value;
    }
    
    this.value2 = null;
    this.operator = operator;

    this.screen.clear();
  }

  onClickEquals() {
    var value = this.screen.value();

    if (isNaN(value)) {
      return;
    }

    var number1 = this.value1;
    var number2 = this.value2 !== null ? this.value2 : value;
    var result;

    switch (this.operator) {
      case '+': result = number1 + number2; break;
      case '-': result = number1 - number2; break;
      case '*': result = number1 * number2; break;
      case '/': result = number1 / number2; break;
      default:
        result = null;
        break;
    }

    if (result === null) {
      return;
    }

    this.value1 = result;
    this.value2 = number2;

    this.screen.value(result);
  }

  onClickClear() {
    this.screen.clear();
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12" style={{paddingTop: '10px', paddingBottom: '10px'}}>
          <Screen ref={this.initScreenComponent.bind(this)} />
        </div>
        <div className="col-md-12">
          <Button text={"7"} value={7} click={this.onClickNumber.bind(this)} />
          <Button text={"8"} value={8} click={this.onClickNumber.bind(this)} />
          <Button text={"9"} value={9} click={this.onClickNumber.bind(this)} />
        </div>
        <div className="col-md-12">
          <Button text={"4"} value={4} click={this.onClickNumber.bind(this)} />
          <Button text={"5"} value={5} click={this.onClickNumber.bind(this)} />
          <Button text={"6"} value={6} click={this.onClickNumber.bind(this)} />
        </div>
        <div className="col-md-12">
          <Button text={"1"} value={1} click={this.onClickNumber.bind(this)} />
          <Button text={"2"} value={2} click={this.onClickNumber.bind(this)} />
          <Button text={"3"} value={3} click={this.onClickNumber.bind(this)} />
        </div>
        <div className="col-md-12">
          <Button text={"0"} value={0} click={this.onClickNumber.bind(this)} />
        </div>
        <div className="col-md-12" style={{paddingTop: '10px', paddingBottom: '10px'}}>
          <Button text={"Sumar"} value={"+"} click={this.onClickOperator.bind(this)} />
          <Button text={"Restar"} value={"-"} click={this.onClickOperator.bind(this)} />
          <Button text={"Multiplicar"} value={"*"} click={this.onClickOperator.bind(this)} />
          <Button text={"Dividir"} value={"/"} click={this.onClickOperator.bind(this)} />
        </div>
        <div className="col-md-12" style={{paddingTop: '10px', paddingBottom: '10px'}}>
          <Button text={"Resultado"} click={this.onClickEquals.bind(this)} />
          <Button text={"Limpiar"} click={this.onClickClear.bind(this)} />
        </div>
      </div>
    );
  }

}

class App extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <Calculator />
        </div>
      </div>
    );
  }
}

export default App;
