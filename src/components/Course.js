import React from "react";
import { NotesList, SubmitNoteForm } from "./NotesList";
import { LinkList, SubmitLinkForm } from "./LinkList";
import ToDoList from "./ToDoList";

class Course extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      toDoList: [],
      notes: [],
      links: [],
    };
  }

  setUsername () {
    this.setState({name : this.props.name})
  }

  getCourseInfo () {
    fetch ('https://project-backend-cc.herokuapp.com/api/v1/users/courses/' + this.state.name)
  }

  render() {
    this.setUsername()
    this.getCourseInfo()
    return (
      <div>
        <h1>{this.state.name}</h1>
        <LinkList links = {this.state.links}/>
        <NotesList notes = {this.state.notes}/>
        <ToDoList todos = {this.state.toDoList}/>
      </div>
    );
  }
}

export default Course;
