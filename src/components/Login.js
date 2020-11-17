import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login(props) {
  const [state, updateState] = useState({
    userName: "",
    password: "",
    loggedIn: false,
  });

  function handleChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    updateState({
      ...state,
      [name]: value,
    });
  }

  const saveCreds = (evt) => {

    evt.preventDefault();
    sessionStorage.setItem('username', state.userName);
    sessionStorage.setItem('password', state.password);

  


    const url = ("https://project-backend-cc.herokuapp.com/api/v1/users/"+ this.state.username)

    fetch(url, {
      method: 'get',
      headers: new Headers({
        'Authorization': 'Basic '+btoa(this.state.username+":"+this.state.password),
	      'Content-Type': 'application/json'
      })
      }).then(function(response){
        if(!response.ok) {
	      throw new Error("HTTP status "+response.status + " Username or password incorrect.")
      }
      return response.json();
      }).then(data => this.setState({
      loggedIn: true
    })).catch(error => alert(error));

    if (this.state.loggedIn) {
      window.location.href = '/ShowClasses'; //Note: this reloads the page
    }

  


    return;

  };

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
            value={state.userName}
            name="userName"
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            style={inputStyle}
            type="password"
            value={state.seckey}
            name="password"
            onChange={handleChange}
          />
        </label>
        <button onClick={saveCreds}> Let's get planting </button>
        <Link to="/NewUser">
          <input type="submit" style={loginStyle} value="I'm a new seedling" />
        </Link>
      </form>
    </div>
  );
}

export default Login;
