import React from "react";

class ShowClasses extends React.Component {
  constructor() {
    super();
    this.state = {
      classes : []
    };

  }
  userName = "bob"
  usernameString = ("https://project-backend-cc.herokuapp.com/api/v1/users/"+ this.userName +"/courses")

  componentDidMount () {
    fetch(this.usernameString).then(response => response.json()).then(data => this.setState({
      classes: data
    }))
  }

  mapClasses() {
    console.log(this.state.classes.length + "We are in map classes")
    return (this.state.classes.length)
  }

  render() {
    console.log(this.state.classes)
    return (
      <div>
        <p>{this.mapClasses()}</p>
        <button>
          <a href="/Course">Class 1</a>
        </button>
      </div>
    );
  }
}

export default ShowClasses;
