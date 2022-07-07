import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
  state = {
    manager: '',
    car: [],
    phone: [],
    computer: [],
    balance: '',
    value: '',
    message: ''
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, balance });
  }

  onCarSubmit = async event => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Waiting on transaction success...' });

    await lottery.methods.bid('0').send({
      from: accounts[0],
      value: web3.utils.toWei('0.01', 'ether')
    });

    this.setState({ message: 'You have been Bided!' });
  };
  onPhoneSubmit = async event => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Waiting on transaction success...' });

    await lottery.methods.bid('1').send({
      from: accounts[0],
      value: web3.utils.toWei('0.01', 'ether')
    });

    this.setState({ message: 'You have been Bided!' });
  };
  onComputerSubmit = async event => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Waiting on transaction success...' });

    await lottery.methods.bid('2').send({
      from: accounts[0],
      value: web3.utils.toWei('0.01', 'ether')
    });

    this.setState({ message: 'You have been Bided!' });
  };

  withdraw = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Waiting on transaction success...' });

    await lottery.methods.withdraw().send({
      from: accounts[0]
    });
    accounts.balance = this.state.balance;
    this.setState({ message: 'Balance transfered!' })
  }

  winner = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Waiting on transaction success...' });
  }
  onClick = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Waiting on transaction success...' });

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    this.setState({ message: 'A winner has been picked!' });
  };

  reveal = async () => {
    const car = await lottery.methods.getItems(0).call();
    const phone = await lottery.methods.getItems(1).call();
    const computer = await lottery.methods.getItems(2).call();

    this.setState({car, phone, computer});
       
    this.setState({ message: 'Waiting on transaction success...' });
  };

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <hr />

        <form onSubmit={this.onCarSubmit}>
          <h4>Car</h4>
          <p>{this.state.car.length}</p>
          <div>
            <button
              value={web3.utils.toWei('0.01', 'ether')}
              onChange={event => this.setState({ value: event.target.value })}>Bid</button>
          </div>
          <hr />
        </form>
        <form onSubmit={this.onPhoneSubmit}>
          <h4>Phone</h4>
          <p>{this.state.phone.length}</p>
          <div>
            <button
                value={web3.utils.toWei('0.01', 'ether')}
                onChange={event => this.setState({ value: event.target.value })}>Bid</button>
          </div>
          <hr />
        </form>
        <form onSubmit={this.onComputerSubmit}>
          <h4>Computer</h4>
          <p>{this.state.computer.length}</p>
          <div>
            <button
                value={web3.utils.toWei('0.01', 'ether')}
                onChange={event => this.setState({ value: event.target.value })}>Bid</button>
          </div>
          <hr />
        </form>

        <p>Current Account<br></br>
        <label>{}</label>
        </p>

        <p>Owner's Account<br></br>
          <label>{this.state.manager}</label>
        </p>

        <p>
          Balance<br></br> 
          {web3.utils.fromWei(this.state.balance, 'ether')}
        </p>
        <hr />

        <button onClick={this.reveal}>Reveal</button><br></br>
        <button onClick={this.winner}>Am I Winner?</button><br></br>
        <button onClick={this.withdraw}>Withdraw</button><br></br>
        <button onClick={this.onClick}>Declare Winner</button><br></br>

        <hr />

        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;