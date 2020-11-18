import React, { useState } from "react";
import { Link } from "react-router-dom";

class Login extends React.Component {
  constructor (props) {
    super (props) 
    this.state = {
      userName: "",
      password: "",
      loggedIn: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.saveCreds = this.saveCreds.bind(this);
  }

  handleChange(event) {
    const { name, value, type, checked } = event.target;
    type === "checkbox"
      ? this.set({ [name]: checked })
      : this.setState({ [name]: value });
  }


  saveCreds (evt) {

    let currentComponent = this;

    evt.preventDefault();
    sessionStorage.setItem('username', this.state.userName);
    sessionStorage.setItem('password', this.state.password);


  
    let server = "http://localhost:8118";

      if (process.env.REACT_APP_REMOTE) {
        //set this in .env file: REACT_APP_REMOTE=1
        server = "https://project-backend-cc.herokuapp.com";
      }

      if (process.env.NODE_ENV !== "development") {
        server = "https://project-backend-cc.herokuapp.com";
      }

      const url = (`${server}/api/v1/users/${this.state.userName}/courses/`)
      console.log(this.state.userName)

      fetch(url, {
        method: 'get',
        headers: new Headers({
          'Authorization': 'Basic '+btoa(this.state.userName+":"+this.state.password),
          'Content-Type': 'application/json'
        })
      }).then(function(response){
        if(!response.ok) {
        throw new Error("Username or password incorrect")
        }
        else {
          currentComponent.setState({loggedIn: true})
          }
        return response.json();
      }).catch(error => alert("Username or password incorrect"));

      const timer = setTimeout( () => {
       console.log(currentComponent.state.loggedIn)
       if (currentComponent.state.loggedIn) {
        sessionStorage.setItem('loggedIn', true);
        window.location.href = '/ShowClasses';
       }}, 1000);

    return

  };


  render () {
    const styles = {
      margin: "auto",
      width: "200px",
      border: "3px solid green",
      padding: "10px",
      borderRadius: "25px",
      backgroundColor: "#76FF5B",
    };
    const inputStyle = {
      width: "90%",
      margin: "auto",
      borderRadius: "7px",
      padding: "4px",
      backgroundColor: "#CBFEC0",
    };
    const loginStyle = {
      borderRadius: "7px",
      padding: "4px",
      marginLeft: "4%",
      marginTop: "5px",
      width: "90%",
    };
    const title = {
      textAlign: "center",
      fontSize: "25px",
      fontWeight: "bold",
    };

    return (
      <div>
        <form style={styles}>
          <p style={title}>Sign In</p>
          <label>
            Username:
            <input
              style={inputStyle}
              type="text"
              value={this.state.userName}
              name="userName"
              onChange={this.handleChange}
            />
          </label>
          <label>
            Password:
            <input
              style={inputStyle}
              type="password"
              value={this.state.password}
              name="password"
              onChange={this.handleChange}
            />
          </label>
          <button onClick={this.saveCreds} style={loginStyle}> Let's get planting </button>
          <Link to="/NewUser">
            <input type="submit" style={loginStyle} value="I'm a new seedling" />
          </Link>
        </form>
      </div>
    );

  }
}

export default Login;
