import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

class NewUser extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: "",
      passwordConfirm: "",
      passwordSame: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value, type, checked } = event.target;
    type === "checkbox"
      ? this.set({ [name]: checked })
      : this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.password == this.state.passwordConfirm);
    if (this.state.password == this.state.passwordConfirm) {
      this.setState({ passwordSame: true });
    } else {
      alert("Passwords do not match. Please re-enter.");
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const saveCreds = (evt) => {
      //send creds to backend
      evt.preventDefault();
      alert(`Submitting ${this.state.userName} and ${this.state.password}`);

      let server = "http://localhost:8118/api";

      if (process.env.REACT_APP_REMOTE) {
        //set this in .env file: REACT_APP_REMOTE=1
        server = "https://project-backend-cc.herokuapp.com/api/v1";
      }

      if (process.env.NODE_ENV !== "development") {
        server = "https://project-backend-cc.herokuapp.com/api/v1";
      }

      console.log("server = " + server);
      const url = `${server}/users`;
      const bd = JSON.stringify({ username: this.state.userName });
      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: bd,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("SaveCreds saveCreds: Fetch Response data: ");
          console.log(data); //don't log an object WITH a string else the conversion won't work and object will not be dumped
          alert("response: " + data["MESSAGE"]);
        })
        .catch((error) =>
          console.log(
            "SaveCreds saveCreds: Fetch Failure (is server up?): " + error
          )
        );
    };
  }

  render() {
    if (this.state.passwordSame) {
      return <Redirect to={"/Home"} />;
    }

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
        <form style={styles} onSubmit={this.handleSubmit.bind(this)}>
          <p style={title}>Register</p>
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
          <label>
            Confirm Password:
            <input
              style={inputStyle}
              type="password"
              value={this.state.passwordConfirm}
              name="passwordConfirm"
              onChange={this.handleChange}
            />
          </label>
          <button type="submit" style={loginStyle}>
            Let's start planting
          </button>
        </form>
      </div>
    );
  }
}

export default NewUser;

/*
<Link to="/Home">
          <input
            type="submit"
            style={loginStyle}
            value="Let's start planning"
          />
        </Link>
*/
