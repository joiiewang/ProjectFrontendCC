import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./css/NavBar.css";
import Logout from "./Logout"

export default class theNavbar extends React.Component {

  constructor() {
    super();
    this.state = {
      loggedIn: false
    }
    this.isLoggedIn = this.isLoggedIn.bind(this)
  }

  isLoggedIn () {
    try {
      const storageLoggedIn = sessionStorage.getItem('loggedIn')
      this.setState({loggedIn : storageLoggedIn})
    } catch (e) {console.log("no storage session")
  }}

 render () {
    return (
      <Navbar>
      <li className="item">
        <a className="item" href="/Home">
          Home
        </a>
        <a className="item" href="/ToDoListPage">
          Todo's
        </a>
        <a className="item" href="/Links">
          Links
        </a>
        <a className="item" href="/Notes">
          Notes
        </a>
        <a className="item" href="/Forest">
          Forest
        </a>
      </li>

      <NavItem icon="Classes">
        <DropdownMenu></DropdownMenu>
      </NavItem>
      <NavItem icon="More">
        <DropdownMenuTwo></DropdownMenuTwo>
      </NavItem>
    </Navbar>
  );
  }
}


function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="navbaritems">
      <a href="#" className="navbaritems" 
      onClick ={() => setOpen(!open)}
	  //onMouseOver={() => setOpen(true)}
	  //onMouseLeave={()=> setOpen(false)}
    >
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("classes");
  const [menuHeight, setMenuHeight] = useState(null);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        {props.children}
      </a>
    );
  }

    return (
      <div className="dropdown" style={{ height: menuHeight }}>
        <CSSTransition
          in={activeMenu === "classes"}
          timeout={500}
          classNames="menu-primary"
          unmountOnExit
        >
          <div className="menu">
            <DropdownItem>
              <a href="/ShowClasses">Show Classes</a>
            </DropdownItem>
            <DropdownItem>
              <a href="/AddClass">Add Class</a>
            </DropdownItem>
          </div>
        </CSSTransition>
      </div>
    );
}

function DropdownMenuTwo() {
  const [activeMenu, setActiveMenu] = useState("more");
  const [menuHeight, setMenuHeight] = useState(null);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        {props.children}
      </a>
    );
  }

    return (
      <div className="dropdown" style={{ height: menuHeight }}>
        <CSSTransition
          in={activeMenu === "more"}
          timeout={500}
          classNames="menu-primary"
          unmountOnExit
        >
          <div className="menu">
            <DropdownItem>
              <a href="/InfoPage">Info</a>
            </DropdownItem>
            <DropdownItem>
              <Logout/>
              
            </DropdownItem>
          </div>
        </CSSTransition>
      </div>
    );
}

