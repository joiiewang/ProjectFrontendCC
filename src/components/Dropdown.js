import React from 'react';
import AddClass from './AddClass'
import { Link } from 'react-router-dom';

class Dropdown extends React.Component {
    constructor(){ 
        super ();
        this.state = {
            showMenu : false
        }
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    showMenu (event) {
        event.preventDefault();
        this.setState({showMenu: true}, () => {
            document.addEventListener('click', this.closeMenu)
        })
    }

    closeMenu() {
        this.setState({ showMenu: false}, () => {
            document.removeEventListener('click', this.closeMenu)
        })
    }

    render () {
        return (
            <div>
                <button onClick={this.showMenu}>
                    Classes
                </button>

                {/*Need to import list of classes from backend and use here 
                Also need to link add class button to form*/}
    
                {this.state.showMenu ? (
                    <div className = "menu">
                        <button> Class 1 </button>
                        <button> Class 2</button>
                        <button> Class 3</button>
                        <Link to="/AddClass">Add Class</Link>
                    </div>
                ) : null}

            </div>
        )
    }


}

export default Dropdown;