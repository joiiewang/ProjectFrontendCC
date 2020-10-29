import React from 'react'
import './css/NotesList.css';

class NotesList extends React.Component {
    constructor () {
        super()
        this.state = {
            notes: []
        }
    }
  
    handleSubmit = note => {
      this.setState({notes: [...this.state.notes, note]});
    }
    
    handleDelete = (index) => {
      const newArr = [...this.state.notes];
      newArr.splice(index, 1);
      this.setState({notes: newArr});
    }
  
    render() {
      return(
        <div>
          <div>
            <Header numNotes={this.state.notes.length} />
            <TodoList notes={this.state.notes} onDelete={this.handleDelete} />
            <SubmitForm onFormSubmit={this.handleSubmit} />
          </div>
        </div>
      );
    } 
  }
  
  
  class SubmitLinkForm extends React.Component {
    state = { note: '' };
  
    handleSubmit = (e) => {
      e.preventDefault();
      if(this.state.note === '') return;
      this.props.onFormSubmit(this.state.note);
      this.setState({ note: '' });
    }
  
    render() {
      return(
        <div className='footer'>
        <form onSubmit={this.handleSubmit}>
          <input 
            type='text'
            placeholder='Enter Item'
            value={this.state.note}
            onChange={(e) => this.setState({note: e.target.value})}
          />
          <button>Add</button>
        </form>
          </div>
      );
    }
  }
  
  
  const Header = (props) => {
    return(
      <div className='content'>
        <h1>
          Notes
        </h1>
      </div>
    )
  }
  
  
  const TodoList = (props) => {
    const notes = props.notes.map((note, index) => {
      return <Todo content={note} key={index} id={index} onDelete={props.onDelete} />
    })
    return( 
      <div>
        {notes}
      </div>
    );
  }
  
  const Todo = (props) => {
    return(
      <div className='flex-box'>
        <p>{props.content}</p>
        <button onClick={() => {props.onDelete(props.id)}}>Remove</button>
      </div>
    );
  }
  export { NotesList, SubmitNoteForm };