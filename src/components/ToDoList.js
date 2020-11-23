import React from 'react';
import './css/ToDoList.css';
class ToDoList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      courseid: this.props.id ? this.props.id : null,
      todos: [] //this.props.todos
    };
  }

  componentDidMount() {
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

    fetch (url, {
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
    })//.then(data=> console.log(data))
    .then(data=>this.setState({
      todos: data 
    })).catch(error => alert(error));

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
      })).catch(error => alert(error));
  };
  
  handleDelete = (index,id) => {
    const newToDoItemArr = [...this.state.todos];
    newToDoItemArr.splice(index, 1);
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
    return(
      
        <div>
          <h1>Todos</h1>
          <ToDoItemElements todos={this.state.todos} onDelete= {this.handleDelete} />
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
          type='text'
          placeholder='To Do Item'
          value={this.state.text}
          onChange={(e) => this.setState({text: e.target.value})}
        />
        <input 
          type='text'
          placeholder='Due Date(yyyymmdd)'
          value={this.state.dueDate}
          onChange={(r) => this.setState({dueDate: r.target.value})}
        />
        <button>Add</button>
      </form>
    );
  }

}

const ToDoItemElements = (props) => {
  const todos = props.todos.map((toDoItem, index) => {
    return <Elem name={toDoItem.text} dueDate={toDoItem.dueDate} key={index} id={toDoItem.id} onDelete={props.onDelete} />
  })  
  const sortedToDos = todos.sort(function(a, b){return a.props.dueDate - b.props.dueDate });
  return( 
    <div className = "toDoBox">
      {sortedToDos}
    </div>
  );
}

const Elem = (props) => {
  const styles = 
  {
    fontSize: "5 px"
  }
  return(
    <div className = "element">
      <input 
          type="checkbox" 
      />
        <p>{props.name}</p>
        <p style = {styles}>{props.dueDate}</p>

      <button onClick={() => {props.onDelete(props.key, props.id)}}>Remove</button>    

    </div>
  );
}


export default ToDoList;