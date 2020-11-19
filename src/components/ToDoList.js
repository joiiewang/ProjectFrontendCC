import React from 'react';
import './css/ToDoList.css';
class ToDoList extends React.Component {
  constructor () {
        super()
        this.state = {
            toDoItems: [] //this.props.todos
        }
    }

  handleSubmit = (toDoItem) => {
    this.setState({toDoItems: [...this.state.toDoItems, toDoItem]});
  }
  
  handleDelete = (index) => {
    const newToDoItemsArr = [...this.state.toDoItems];
    newToDoItemsArr.splice(index, 1);
    this.setState({toDoItems: newToDoItemsArr});
  }
  //Call api, get JSON with items and change state

  render() {
    return(
      
        <div>
          <h1>Todos</h1>
          <ToDoItemElements toDoItems={this.state.toDoItems} onDelete= {this.handleDelete} />
          <SubmitForm onFormSubmit={this.handleSubmit} />
        </div>
    
    );
  } 
}

class SubmitForm extends React.Component {
  state = { toDoItem: '', dueDate: ''};

  handleSubmit = (e, r) => {
    e.preventDefault();
    this.sendToDoToBackend();
    if(this.state.toDoItem === '') return;
    if (this.state.dueDate === '') return;
    this.props.onFormSubmit([this.state.toDoItem, this.state.dueDate]);
    this.setState({ toDoItem: '' });
    this.setState({dueDate:''});
    
  }

sendToDoToBackend() {
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

   
}

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input 
          type='text'
          placeholder='To Do Item'
          value={this.state.toDoItem}
          onChange={(e) => this.setState({toDoItem: e.target.value})}
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
  const todos = props.toDoItems.map((item, index) => {
    return <Elem toDoItem={item[0]} dueDate={item[1]} key={index} id={index} onDelete={props.onDelete} />
  })  
  console.log("2019-11-5" < "2018");
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
        <p>{props.toDoItem}</p>
        <p style = {styles}>{props.dueDate}</p>

      <button onClick={() => {props.onDelete(props.id)}}>Remove</button>    

    </div>
  );
}


export default ToDoList;