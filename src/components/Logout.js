import React from "react"


export default class Logout extends React.Component {
    
    handleClick = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('password');
        sessionStorage.setItem('loggedIn', false);
      };

    render () {
        return (
            <div>
                <a href="/" onClick={() => this.handleClick()}>Log Out</a>
            </div>
        )
    }
    
}