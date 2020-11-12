import React from "react";
import UtilityFunctions, { generalFetch } from "../UtilityFunctions"

// Need to make a pop-up window and pass to backend
class AddClass extends React.Component {
  constructor() {
    super();
    this.state = {
      courseName: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  // included all input types in case we need it
  handleChange(event) {
    const { name, value, type, checked } = event.target;
    type === "checkbox"
      ? this.set({ [name]: checked })
      : this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.sendNameToBackend(); 
    alert('Adding course');
  }

  sendNameToBackend () {
    const username = sessionStorage.getItem('username')
    const password = sessionStorage.getItem('password')
    const url = ("https://project-backend-cc.herokuapp.com/api/v1/users/"+ username +"/courses/")
    const bd = JSON.stringify({ name: this.state.courseName});


    generalFetch (username, password, url, bd)

    /*
    fetch(url, {
      method: "POST",
      headers: new Headers({
      	'Authorization': 'Basic '+btoa(username+":"+password),
        "Content-Type": "application/json",
      }),
      body: bd,
    }).then(function(response){
      if(!response.ok) {
	throw new Error("HTTP status "+response.status)
      }
      return response.json();
    }).then(data => console.log(data))
    .catch(error => alert(error));
  */
  }
  

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input
          type="text"
          value={this.state.courseName}
          name="courseName"
          placeholder="Course Name"
          onChange={this.handleChange}
        />
        <br />
        <button>Submit</button>
      </form>
    );
  }
}

export default AddClass;
