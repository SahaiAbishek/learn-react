import React, { Component } from 'react';
import './App.css';
import data from './candidateList.json';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: 0,
      userName: 'firstname lastname',
      email: 'email@address.com',
      votesForA: 0,
      votesForB: 0
    };
  }

  voteForA() {
    data.map((dynamicData, i) =>
      console.log(dynamicData.name));
    this.setState((prevState) => ({
      votesForA: prevState.votesForA + 1
    }));
  }

  voteForB() {
    this.setState((prevState) => ({
      votesForB: prevState.votesForB + 1
    }));
  }

  onChange(i) {
    this.setState({
      selectedOption: i
    });
  }

  handleNameChange() {
    this.setState({ userName: 'none' });
  }

  handleChange(event) {
    this.setState({
      selectedOption: event.target.value
    });
  }

  handleFormSubmit(formSubmitEvent) {
    formSubmitEvent.preventDefault();

    console.log('You have selected:',this.state.selectedOption);
  }

  render() {
    return (
      <div>
        <h1> Hello  {this.state.userName} </h1>
        <p>
          name : <input type="text" name="userName" placeholder={this.state.userName}
            onChange={this.handleNameChange.bind(this)} />
        </p>
        <p>
          email : <input type="text" name="userEmail" placeholder={this.state.email} />
        </p>
        <table width="100%" align="center" border="0">
          <tbody>
            <tr>
              <td><a href=""><font size="50">A </font></a>  </td>
              <td><a href=""><font size="50">B </font> </a></td>
            </tr>
            <tr>
              <td><button onClick={this.voteForA.bind(this)}>Vote for A</button></td>
              <td><button onClick={this.voteForB.bind(this)}>Vote for B</button></td>
            </tr>
            <tr>
              <td>Total votes = {this.state.votesForA}</td>
              <td>Total votes = {this.state.votesForB}</td>
            </tr>

          </tbody>
        </table>

        <form onSubmit={this.handleFormSubmit}>
          <h1> Radio button trial </h1>

          {
            data.map((optn, i) => {
              return <div>
                <label>  {optn.name}
                  <input type="radio"
                    key={optn.cid}
                    checked={this.state.selectedOption === i ? true : false}
                    onChange={this.onChange.bind(this, i)}
                  />
                </label>
              </div>
            })
          }
          <button className="btn btn-default" type="submit">Save</button>
        </form>
      </div>
    );
  }
}

export default App;
