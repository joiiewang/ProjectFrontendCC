import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from "./Dropdown";
import '../css/NavBar.css';

function Navbar() {
  return (
    <nav>
      <ul class = "menu">
        <li class = "item"><a href="/Home">Home</a></li>
        <li class = "item"><a href="/Links">Links</a></li>
        <li class = "item"><a href="/ToDoList">To-Do List</a></li>
        <li class = "item"><a href="/InfoPage">Info</a></li>
        <li class = "item"><a href="/Forest">Forest</a></li>
        <li class = "item"><a href="/Login">Logout</a></li>

      {/*<Link to="/">Home</Link>{" "}
      <Link to="/creds">Save Creds</Link>
      <Dropdown/>*/}
      </ul>
    </nav>
  );
};
export default Navbar;

