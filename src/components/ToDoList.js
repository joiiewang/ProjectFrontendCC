import React from 'react';
import './css/ToDoList.css';
import * as SVGLoaders from 'svg-loaders-react';

class ToDoList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      courseid: this.props.id ? this.props.id : null,
      todos: [], 
      loaded: false
    };
  }

  async componentDidMount() {
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

    let url = (`${server}/api/v2/users/${username}/todos/`)
    if(this.state.courseid !== null) {
      url = (`${server}/api/v2/users/${username}/todos/?course_id=${this.state.courseid}`)
    }

    await fetch (url, {
      method: 'get',
      headers: new Headers({
        'Authorization': 'Basic '+btoa(username+":"+password),
        'Content-Type': 'application/json'
      })
    }).then(function(response){
      if(!response.ok){
        throw new Error("HTTP status "+response.status)
      }
      return response.json();
    })
    .then(data=>this.setState({
      todos: data,
      loaded: true 
    })).catch(error => console.log(error));

  }

  handleSubmit = (toDoItem) => {
    console.log(toDoItem)
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

      const url = (`${server}/api/v2/users/${username}/todos/`)

      let bd = JSON.stringify(toDoItem);
      if(this.state.courseid !== null) {
        var id = {course_id: this.state.courseid}
        toDoItem = {...id, ...toDoItem}
        bd = JSON.stringify(toDoItem)
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
        todos: [...this.state.todos, data]
      })).catch(error => console.log(error));
  };

  handleChange = (id) => {

    const x = (toDoItem) => toDoItem.id === id;

    const newToDoItemArr = [...this.state.todos];
    newToDoItemArr[newToDoItemArr.findIndex(x)].completed =  !newToDoItemArr[newToDoItemArr.findIndex(x)].completed;
    this.setState({todos: newToDoItemArr});
    
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

    let url = (`${server}/api/v2/users/${username}/todos/${id}/`)

    fetch(url, {
      method: 'post',
      headers: new Headers({
        'Authorization': 'Basic '+btoa(username+":"+password),
        'Content-Type': 'application/json'
      })
    }).catch(error => console.log(error));
  }
  
  handleDelete = (index, id) => {

    const x = (toDoItem) => toDoItem.id === id;

    const newToDoItemArr = [...this.state.todos];
    newToDoItemArr.splice(newToDoItemArr.findIndex(x), 1);
    this.setState({todos: newToDoItemArr});


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

    let url = (`${server}/api/v2/users/${username}/todos/${id}/`)

    fetch(url, {
      method: 'delete',
      headers: new Headers({
        'Authorization': 'Basic '+btoa(username+":"+password),
        'Content-Type': 'application/json'
      })
    }).catch(error => alert(error));
  }
  //Call api, get JSON with items and change state

  render() {
    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    if(!this.state.loaded){
      return (
        <div style={style}>
          <SVGLoaders.Circles stroke="#6c319c" fill="#6c319c"/>
        </div>
      )
    }
    return(
      
        <div>
          <h1 className= "moveRight">ToDos</h1>
          <ToDoItemElements todos={this.state.todos} onDelete= {this.handleDelete} handleChange = {this.handleChange} />
          <SubmitForm onFormSubmit={this.handleSubmit} courseid={this.props.id} />
        </div>
    
    );
  } 
}

class SubmitForm extends React.Component {
  state = { text: '', dueDate: ''};

  handleSubmit = (e, r) => {
    e.preventDefault();
    if(this.state.text === '') return;
    if (this.state.dueDate === '') return;
    this.props.onFormSubmit(this.state);
    this.setState({ text: '' });
    this.setState({dueDate:''});
    
  }

  

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input
          className = "toDoInput"
          type='text'
          placeholder='To Do Item'
          value={this.state.text}
          onChange={(e) => this.setState({text: e.target.value})}
        />
        <input 
          className = "dateInput"
          type='date'
          placeholder='Due Date'
          value={this.state.dueDate}
          onChange={(r) => this.setState({dueDate: r.target.value})}
        />
        <button className = "toDoAddButton"
        >Add</button>
      </form>
    );
  }

}

const ToDoItemElements = (props) => {
  const todos = props.todos.map((toDoItem, index) => {
    return <Elem name={toDoItem.text} dueDate={toDoItem.dueDate} completed={toDoItem.completed} key={index} id={toDoItem.id} onDelete={props.onDelete} handleChange={props.handleChange} />
  })  
  const sortedToDos = todos.sort(function (a, b){return ('' + a.props.dueDate).localeCompare(b.props.dueDate) });  
  const finalsortedToDos = sortedToDos.sort(function(a, b){return (a.props.completed === b.props.completed)? 0 : a.props.completed? 1 : -1;})
  return( 
    <div className = "toDoBox">
      {finalsortedToDos}
    </div>
  );
}

const Elem = (props) => {
  const styles = 
  {
    fontSize: "5 px"
  }
  const completedStyle =
  {
    fontSize: "italic",
    color: "#cdcdcd",
    textDecoration: "line-through"
  }
  return(
    <div className = "element">
      <input 
          type="checkbox" 
          checked= {props.completed}
          onChange={() => props.handleChange(props.id)}
      />
        <p style={props.completed ? completedStyle: null}>
          {props.name + " "}
          {props.dueDate}
          </p>

       <button 
       className = "removeButton"
       onClick={() => {props.onDelete(props.key, props.id)}}>
         <div className= "removeText">
          Remove
           </div></button>    
 
    </div>
  );
}


export default ToDoList;