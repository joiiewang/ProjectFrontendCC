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
    
    return (
      this.state.classes.map((course) => (
        <p>{course.name}</p>
      ))
    )
    
  }

  render() {
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
