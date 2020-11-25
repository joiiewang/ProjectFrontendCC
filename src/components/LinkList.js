import React from "react";
import "./css/LinkList.css";
import * as SVGLoaders from 'svg-loaders-react';

class LinkList extends React.Component {
  // We can pass in an array to populate this component
  // this.state.links is an array of [name, url] arrays
  constructor(props) {
    super(props);
    this.state = {
      courseid: this.props.id ? this.props.id : null,
      links: [], 
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

    let url = (`${server}/api/v2/users/${username}/links/`)
    if(this.state.courseid !== null) {
      url = (`${server}/api/v2/users/${username}/links/?course_id=${this.state.courseid}`)
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
      links: data,
      loaded: true
    })).catch(error => alert(error));
  }

  handleSubmit = (link) => {
    console.log(link)
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


    const url = (`${server}/api/v2/users/${username}/links/`)

    let bd = JSON.stringify(link);
    if(this.state.courseid !== null) {
      var id = {course_id: this.state.courseid}
      link = {...id, ...link}
      bd = JSON.stringify(link)
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
      links: [...this.state.links, data]
    })).catch(error => alert(error));
  };

  handleDelete = (index, id) => {
    const newLinkArr = [...this.state.links];
    newLinkArr.splice(index, 1);
    this.setState({ links: newLinkArr });

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

    let url = (`${server}/api/v2/users/${username}/links/${id}`)

    fetch(url, {
      method: 'delete',
      headers: new Headers({
        'Authorization': 'Basic '+btoa(username+":"+password),
        'Content-Type': 'application/json'
      })
    }).catch(error => alert(error));
  };

  render() {
    if(!this.state.loaded){
      const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
      return (
        <div style={style}>
          <SVGLoaders.Circles stroke="#6c319c" fill="#6c319c"/>
        </div>
      )
    }
    return (
      <div>
        <Header />
        <LinkElements links={this.state.links} onDelete={this.handleDelete} />
        <SubmitLinkForm onFormSubmit={this.handleSubmit} courseid={this.props.id}/>
      </div>
    );
  }
}

class SubmitLinkForm extends React.Component {
  state = { text: "", url: "" };

  handleSubmit = (e, r) => {
    e.preventDefault();
    if (this.state.text === "") return;
    if (this.state.url === "") return;
    this.props.onFormSubmit(this.state);
    this.setState({ text: "" });
    this.setState({ url: "" });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Enter Name"
          value={this.state.text}
          onChange={(e) => this.setState({ text: e.target.value })}
        />
        <input
          type="text"
          placeholder="Enter URL"
          value={this.state.url}
          onChange={(r) => this.setState({ url: r.target.value })}
        />
        <button>Add</button>
      </form>
    );
  }
}

const Header = () => {
  return (
    <div>
      <h1>Links</h1>
    </div>
  );
};

const LinkElements = (props) => {
  const todos = props.links.map((link, index) => {
    return (
      <Elem
        name={link.text}
        url={link.url}
        key={index}
        id={link.id}
        onDelete={props.onDelete}
      />
    );
  });
  return <div className="toDoBox">{todos}</div>;
};

const Elem = (props) => {
  var url;
  url = props.url;
  if (!props.url.includes("https://")) {
    url = "https://" + url;
  }
  return (
    <div className="element"> 
      <a href={url} target="_blank">
        {" "}
        {props.name}
      </a>
      <button
        onClick={() => {
          props.onDelete(props.key, props.id);
        }}
      >
        Remove
      </button>
    </div>
  );
};

export { LinkList, SubmitLinkForm };
