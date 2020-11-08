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
          <h1>To Do Page</h1>
          <ToDoItemElements toDoItems={this.state.toDoItems} onDelete= {this.handleDelete} />
          <SubmitForm onFormSubmit={this.handleSubmit} />
        </div>
    
    );
  } 
}

class SubmitForm extends React.Component {
  state = { toDoItem: ''};

  handleSubmit = (e, r) => {
    e.preventDefault();
    if(this.state.toDoItem === '') return;
    this.props.onFormSubmit([this.state.toDoItem]);
    this.setState({ toDoItem: '' });
    
  }
  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input 
          type='text'
          placeholder='Enter To Do Item'
          value={this.state.toDoItem}
          onChange={(e) => this.setState({toDoItem: e.target.value})}
        />
        <button>Add</button>
      </form>
    );
  }

}

const ToDoItemElements = (props) => {
  const todos = props.toDoItems.map((item, index) => {
    return <Elem toDoItem={item[0]}  key={index} id={index} onDelete={props.onDelete} />
  })
  return( 
    <div className = "toDoBox">
      {todos}
    </div>
  );
}

const Elem = (props) => {
  return(
    <div className = "element">
      <input 
          type="checkbox" 
      />
        <p>{props.toDoItem}</p>
      <button onClick={() => {props.onDelete(props.id)}}>Remove</button>    

    </div>
  );
}


export default ToDoList;