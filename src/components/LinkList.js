import React from 'react'
import '../css/LinkList.css'

class LinkList extends React.Component {
    // We can pass in an array to populate this component
    // this.state.links is an array of [name, url] arrays
    constructor () {
          super()
          this.state = {
              links: []
          }
      }
  
    handleSubmit = (link) => {
      this.setState({links: [...this.state.links, link]});
    }
    
    handleDelete = (index) => {
      const newLinkArr = [...this.state.links];
      newLinkArr.splice(index, 1);
      this.setState({links: newLinkArr});
    }
  
    render() {
      return(
        
          <div className='card frame'>
            <Header/>
            <LinkElements links={this.state.links} onDelete= {this.handleDelete} />
            <SubmitForm onFormSubmit={this.handleSubmit} />
          </div>
      
      );
    } 
  }
  
  
  class SubmitForm extends React.Component {
    state = { name: '', url: ''};
  
    handleSubmit = (e, r) => {
      e.preventDefault();
      if(this.state.name === '') return;
      if(this.state.url === '') return;
      this.props.onFormSubmit([this.state.name, this.state.url]);
      this.setState({ name: '' });
      this.setState({ url: '' });
    }
  
    render() {
      return(
        <form onSubmit={this.handleSubmit}>
          <input 
            type='text'
            className='input'
            placeholder='Enter Name'
            value={this.state.name}
            onChange={(e) => this.setState({name: e.target.value})}
          />
          <input 
            type='text'
            className='input'
            placeholder='Enter URL'
            value={this.state.url}
            onChange={(r) => this.setState({url: r.target.value})}
          />
          <button className='button'>Add</button>
        </form>
      );
    }
  }
  
  
  const Header = () => {
    return(
      <div className='card-header'>
        <h1 className='card-header-title header'>
          Links
        </h1>
      </div>
    )
  }
  
  const LinkElements = (props) => {
    const todos = props.links.map((link, index) => {
      return <Elem name={link[0]} url={link[1]} key={index} id={index} onDelete={props.onDelete} />
    })
    return( 
      <div className='list-wrapper'>
        {todos}
      </div>
    );
  }
  
  const Elem = (props) => {
    return(
      <div className='list-item'>
        <a href={props.url} target="_blank"> {props.name}</a> 
        <button class="delete is-pulled-right" onClick={() => {props.onDelete(props.id)}}></button>
      </div>
    );
  }

export default LinkList