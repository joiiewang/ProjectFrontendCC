import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from "./Dropdown";

function Navbar() {
  return (
    <div>
      <Link to="/">Home</Link>{" "}
      <Link to="/creds">Save Creds</Link>
      <Dropdown/>
      
    </div>
  );
};
export default Navbar;

