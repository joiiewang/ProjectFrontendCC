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

  
    let server = "http://localhost:8118";

      if (process.env.REACT_APP_REMOTE) {
        //set this in .env file: REACT_APP_REMOTE=1
        server = "https://project-backend-cc.herokuapp.com";
      }

      if (process.env.NODE_ENV !== "development") {
        server = "https://project-backend-cc.herokuapp.com";
      }




    window.location.href = '/ShowClasses'; //Note: this reloads the page
    
    /*
    const url = `${server}/api/v1/users/`;
    fetch(url, {
      method: 'get',
      headers: new Headers({
        'Authorization': 'Basic '+btoa(state.username+":"+ state.password),
	      'Content-Type': 'application/json'
      })
      }).then(function(response){
        if(!response.ok) {
	      throw new Error(Error + "Username or password incorrect.")
      }
      }).then(this.setState({ loggedIn: true
    })).catch(error => alert(error + "Username or password incorrect."));

    if (this.state.loggedIn) {
    }
    */

    return

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
