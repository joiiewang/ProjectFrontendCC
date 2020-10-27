import React, {useState} from 'react';
import {CSSTransition} from 'react-transition-group';
import './css/NavBar.css';



function theNavbar () {
  return (
    <Navbar>
        <li class = "item" className = "linkeditemsnav">
          <a className = "item" href = "/Home">Home</a>
          <a className = "item" href = "/ToDoList">Todo's</a>
          <a className = "item" href = "/Links">Links</a>
          <a className = "item" href = "/Notes">Notes</a>
          <a className = "item" href = "/Forest">Forest</a>
        </li>
      

      <NavItem icon = "Classes">
        <DropdownMenu></DropdownMenu>
      </NavItem>
      <NavItem icon = "More">
        <DropdownMenuTwo></DropdownMenuTwo>
      </NavItem>
    </Navbar>
  )
}

function Navbar (props) {
  return (
    <nav className = "navbar">
      <ul className = "navbar-nav">{props.children}</ul>
    </nav>
  )
}

function NavItem (props) {
  const [open, setOpen] = useState(false);
  
  return (
    <li className="linkeditemsnav">
      <a href = "#" className = "navbaritems" onClick = {() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  )
}


function DropdownMenu () {
  const [activeMenu, setActiveMenu] = useState ('classes');
  const [menuHeight, setMenuHeight] = useState(null);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }
  
  function DropdownItem (props) {
    return (
      <a href="#" className = "menu-item" 
      onClick = {() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className = "icon-button">{props.leftIcon}</span>
        {props.children}
        <span className = "icon-right">{props.rightIcon}</span>
    </a>
    )
  }
  
  return (
    <div className = "dropdown" style={{height: menuHeight}}>

        <CSSTransition
          in={activeMenu === 'classes'}
          timeout = {500}
          classNames = "menu-primary"
          unmountOnExit>
            <div className = "menu">
              <DropdownItem>Class 1</DropdownItem>
              <DropdownItem>Class 2</DropdownItem>
              <DropdownItem>Add Class</DropdownItem>
            </div>

        </CSSTransition>

    </div>
  )
}

function DropdownMenuTwo () {
  const [activeMenu, setActiveMenu] = useState ('more');
  const [menuHeight, setMenuHeight] = useState(null);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }
  
  function DropdownItem (props) {
    return (
      <a href="#" className = "menu-item" 
      onClick = {() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className = "icon-button">{props.leftIcon}</span>
        {props.children}
        <span className = "icon-right">{props.rightIcon}</span>
    </a>
    )
  }
  
  return (
    <div className = "dropdown" style={{height: menuHeight}}>


        <CSSTransition
          in={activeMenu === 'more'}
          timeout = {500}
          classNames = "menu-primary"
          unmountOnExit>
            <div className = "menu">
              <DropdownItem><a href = "/InfoPage">Info</a></DropdownItem>
              <DropdownItem><a href = "/LogIn">Log Out</a></DropdownItem>
            </div>

        </CSSTransition>
    </div>
  )
}

export default theNavbar;

    

