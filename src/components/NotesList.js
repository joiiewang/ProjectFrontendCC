import React from "react";
import { generalFetch } from "../UtilityFunctions"
import "./css/NotesList.css";
import * as SVGLoaders from 'svg-loaders-react';

class NotesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseid: this.props.id ? this.props.id : null,
      notes: [],
      loaded: false
    };
  }

  async componentDidMount () {
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

    let url = (`${server}/api/v2/users/${username}/notes/`)
    if(this.state.courseid !== null) {
      url = (`${server}/api/v2/users/${username}/notes/?course_id=${this.state.courseid}`)
    }
    
    await fetch(url, {
      method: 'get',
      headers: new Headers({
      	'Authorization': 'Basic '+btoa(username+":"+password),
	'Content-Type': 'application/json'
      })
    }).then(function(response){
      if(!response.ok) {
	throw new Error("HTTP status "+response.status)
      }
      return response.json();
    }).then(data => this.setState({
      notes: data,
      loaded: true
    })).catch(error => alert(error));
  }

  handleSubmit = (note) => {
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


    const url = (`${server}/api/v2/users/${username}/notes/`)

    let bd = JSON.stringify(note);
    if(this.state.courseid !== null) {
      var id = {course_id: this.state.courseid}
      note = {...id, ...note}
      bd = JSON.stringify(note)
    }

    fetch(url, {
      method: "post",
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
    }).then(data => this.setState({
      notes: [...this.state.notes, data]
    })).catch(error => alert(error));
  };

  handleDelete = (index, id) => {

    const x = (note) => note.id === id;

    const newArr = [...this.state.notes];
    newArr.splice(newArr.findIndex(x), 1);
    this.setState({ notes: newArr });

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

    let url = (`${server}/api/v2/users/${username}/notes/${id}`)
  
    fetch(url, {
      method: 'delete',
      headers: new Headers({
        'Authorization': 'Basic '+btoa(username+":"+password),
        'Content-Type': 'application/json'
      })
    }).catch(error => alert(error));

  };

  render() {
    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    if(!this.state.loaded){
      return (
        <div style={style}>
          <SVGLoaders.Circles stroke="#6c319c" fill="#6c319c"/>
        </div>
      )
    }
      return (
        <div>
          <div>
            <Header/>
            <TodoList notes={this.state.notes} onDelete={this.handleDelete} />
            <SubmitNoteForm onFormSubmit={this.handleSubmit} courseid={this.props.id} />
          </div>
        </div>
      );
  }
}

class SubmitNoteForm extends React.Component {
  state = { text: "" };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.text || this.state.text.length === 0 || /^\s*$/.test(this.state.text)) {
      return;
    }
    this.props.onFormSubmit(this.state);
    this.setState({ text: "" });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            className = "notesInput"
            type="text"
            placeholder="Enter Item"
            maxlength="128"
            value={this.state.text}
            onChange={(e) => this.setState({ text: e.target.value })}
          />
          <button className = "notesAddButton"
          >Add</button>
        </form>
      <p className = "remChars">{128 - this.state.text.length} characters remaining...</p>
      </div>
    );
  }
}

const Header = (props) => {
  return (
    <div>
      <h1 className = "moveRight" >Notes</h1>
    </div>
  );
};

const TodoList = (props) => {
  const notes = props.notes.map((note, index) => {
    return (
      <Todo content={note.text} key={index} id={note.id} onDelete={props.onDelete} />
    );
  });
  return <div className="toDoBox">{notes}</div>;
};

const Todo = (props) => {
  return (
    <div className="element">
      <p>{props.content}</p>
      <button
        className = "removeButton"
        onClick={() => {
          props.onDelete(props.key, props.id);
        }}
      >
        Remove
      </button>
    </div>
  );
};
export { NotesList, SubmitNoteForm };
