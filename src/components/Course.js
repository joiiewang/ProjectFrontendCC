import React from "react";
import { NotesList, SubmitNoteForm } from "./NotesList";
import { LinkList, SubmitLinkForm } from "./LinkList";
import ToDoList from "./ToDoList";
import DeletePopup from "./DeletePopup"
import "../components/css/ShowClasses.css";

class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.location.name,
      id: this.props.location.id,
      todos: [],
      notes: [],
      links: [],
      isOpen: false
    };
  }



  render() {

    return (
      <div>
        <div>
          <h1>{this.state.name}</h1>
          <LinkList id={this.state.id}/>
          <br/>
          <NotesList id={this.state.id}/>
          <br/>
          <ToDoList id={this.state.id}/>
          <br/>
        </div>

        <button className= "deleteCourseButton" onClick= {(event) => this.setState({ isOpen: true})}>
          Delete Class</button>

        <DeletePopup isOpen= {this.state.isOpen} onClose = {(event) => this.setState({isOpen: false})} 
        courseName = {this.state.name} id = {this.state.id}>
        </DeletePopup>
        
      </div>
    );
  }
}

export default Course;
