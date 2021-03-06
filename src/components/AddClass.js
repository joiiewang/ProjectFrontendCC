import React from "react";
import './css/AddClass.css';

// Need to make a pop-up window and pass to backend
class AddClass extends React.Component {
  constructor() {
    super();
    this.state = {
      courseName: ""
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

  checkNull () {

    if(!this.state.courseName.trim()){
      alert("Please enter the name of your course")
      return false;
   }
    else {
      return true;
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    var notNull = this.checkNull()
    if (notNull) {
      this.sendNameToBackend(); 
      window.location.href = "/ShowClasses";
    }
  }

   async sendNameToBackend () {

    const username = sessionStorage.getItem('username')
    const password = sessionStorage.getItem('password')

    let server = "http://localhost:8118";

      if (process.env.REACT_APP_REMOTE) {
        //set this in .env file: REACT_APP_REMOTE=1
        server = "https://project-backend-cc.herokuapp.com";
      }

      if (process.env.NODE_ENV !== "development") {
        server = "https://project-backend-cc.herokuapp.com";
      }


    const url = (`${server}/api/v2/users/${username}/courses/`)
    const bd = JSON.stringify({ name: this.state.courseName});

    await fetch(url, {
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
    .catch(error => console.log(error));

  }

  
  

  render() {


    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input
          className = "input"
          type="text"
          value={this.state.courseName}
          name="courseName"
          placeholder="Course Name"
          onChange={this.handleChange}
        />
        <br />
        <button className = "addButton">Submit</button>
      </form>
    );
  }
}

export default AddClass;
