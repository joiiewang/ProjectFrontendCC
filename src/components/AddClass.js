import React from "react";
import Course from "./Course";
import Username from "./Username"

// Need to make a pop-up window and pass to backend
class AddClass extends React.Component {
  constructor() {
    super();
    this.state = {
      className: "",
      userName: "",  //this.props.userName?
      submitted: false,
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
    this.setState({ submitted: true });
  }

  renderSubmit() {
    this.render(<Course name={this.state.className} />);
  }

  sendNameToBackend () {
    const bd = JSON.stringify({ courseName: this.state.className, userName : this.state.userName});
    const url = "https://project-backend-cc.herokuapp.com/api/v1/users" 
    // Need to store username so we can add it to end of this
    

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
  }

  newClass() {
    this.sendNameToBackend()
    return (
      <Course name={this.state.className}/>
    )
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input
          type="text"
          value={this.state.className}
          name="className"
          placeholder="Class Name"
          onChange={this.handleChange}
        />
        <br />
        <button>Submit</button>
      </form>
    );
  }

  render() {
    return (
      <div>
        {!this.state.submitted && this.renderForm()}
        {this.state.submitted && this.newClass()}
      </div>
    );
  }
}

export default AddClass;
