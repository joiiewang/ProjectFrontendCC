import React from 'react'

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
        
          <div>
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
            placeholder='Enter Name'
            value={this.state.name}
            onChange={(e) => this.setState({name: e.target.value})}
          />
          <input 
            type='text'
            placeholder='Enter URL'
            value={this.state.url}
            onChange={(r) => this.setState({url: r.target.value})}
          />
          <button>Add</button>
        </form>
      );
    }
  }
  
  
  const Header = () => {
    return(
      <div>
        <h1>
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
      <div>
        {todos}
      </div>
    );
  }
  
  const Elem = (props) => {
    return(
      <div>
        <a href={props.url} target="_blank" style="color: #333FFF"> {props.name}</a> 
        <button onClick={() => {props.onDelete(props.id)}}>Remove</button>
      </div>
    );
  }

  export { LinkList, SubmitForm };