import React from "react";
import { NotesList, SubmitNoteForm } from "./NotesList";
import { LinkList, SubmitLinkForm } from "./LinkList";
import ToDoList from "./ToDoList";
import DeletePopup from "./DeletePopup"

class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.location.name,
      id: this.props.location.id,
      toDoList: [],
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
          <ToDoList/>
          <br/>
        </div>

        <button onClick= {(event) => this.setState({ isOpen: true})}>
          Delete Class</button>

        <DeletePopup isOpen= {this.state.isOpen} onClose = {(event) => this.setState({isOpen: false})} 
        courseName = {this.state.name} id = {this.state.id}>
        </DeletePopup>
        
      </div>
    );
  }
}

export default Course;

/*
        <LinkList links = {this.state.toDoList}/>
        <NotesList notes = {this.state.notes}/>
        <ToDoList todos = {this.state.toDoList}/>

        <div className = "btn" onClick = {this.togglePop}>
          <button>
            Delete Class
         </button>
        </div>
        {this.state.deleteClassSeen ? <Popup toggle = {this.togglePop}/> : null}
*/

 /*
  setUsername () {
    this.setState({name : this.props.name})
  }
  

  getCourseInfo () {
    fetch ('https://project-backend-cc.herokuapp.com/api/v1/users/courses/' + this.state.name)
  }
  */