import React, { Component } from 'react';
import './App.css';
import axios from 'axios';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: 0,
      userName: 'firstname lastname',
      email: 'email@address.com',
      votesForA: 0,
      votesForB: 0,
      persons: [],
      errors: [],
      confirmationText: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  componentDidMount() {
    // axios.get(`https://jsonplaceholder.typicode.com/users`)
    axios.get(`http://localhost:12345/opinion/candidatesUsingCRUD`)
      .then(response => {
        const persons = response.data;
        this.setState({ persons });
      })
  }

  validateFields(name, email) {
    // we are going to store errors for all fields
    // in a signle array
    const errors = [];

    if (name.length === 0) {
      errors.push("Name can't be empty");
    }

    if (email.length < 5) {
      errors.push("Email should be at least 5 charcters long");
    }
    if (email.split('').filter(x => x === '@').length !== 1) {
      errors.push("Email should contain a @");
    }
    if (email.indexOf('.') === -1) {
      errors.push("Email should contain at least one dot");
    }
    return errors;
  }

  onChange(i) {
    this.setState({
      checked: i
    });
  }

  handleNameChange(event) {
    this.setState({
      userName: event.target.value
    });
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  handleFormSubmit(formSubmitEvent) {

    formSubmitEvent.preventDefault();
    const { userName, email } = this.state;

    const errors = this.validateFields(userName, email);
    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }

    console.log(this.state.userName, 'you have selected:', this.state.checked, 'eMail : ' + this.state.email);

    axios.post('http://localhost:12345/opinion/vote/'+this.state.userName+'/'+this.state.email+'/'+this.state.checked, {
      // name: 'first last',
      // email: 'abc.email.com',
      // candidate: 'test'
    })
    .then(function (response) {
      console.log("Successful");
    })
    .catch(function (error) {
      console.log("Abhishek : URL not found");
    });

    this.setState({
      confirmationText: `${this.state.userName} you have selected , Candidate :  ${this.state.checked}`
    });
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <h1> Welcome to voting app </h1>

        <form onSubmit={this.handleFormSubmit.bind(this)}>
          {errors.map(error => (
            <p key={error}><font color="red">Error: {error}</font></p>
          ))}
          <p>
            name : <input type="text"
              value={this.state.userName}
              onChange={this.handleNameChange} />
          </p>
          <p>
            email : <input type="text"
              value={this.state.email}
              onChange={this.handleEmailChange} />
          </p>
          <h1> Choose your candidate </h1>

          {
            this.state.persons.map((person, i) => {
              return <div key={person.id}>
                <label key={person.id}>
                  <input type="radio"
                    value={person.name}
                    key={person.id}
                    // checked={this.state.checked === i ? true : false}
                    checked={this.state.checked === person.name}
                    onChange={this.onChange.bind(this, person.name)}
                  />
                  {person.name}
                </label>
              </div>
            })
          }
          <button className="btn btn-default" type="submit">Save</button>
        </form>
        <p>
          <font color="Blue" size="5"> {this.state.confirmationText} </font>
        </p>
      </div>
    );
  }
}

export default App;
