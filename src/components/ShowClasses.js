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
        <button>
          <a href= "/Course">
          {course.name}
          </a>
          </button>
      ))
    )
    
  }

  render() {
    return (
      <div>
        <p>{this.mapClasses()}</p>
      </div>
    );
  }
}

export default ShowClasses;
