import React from "react";
import { Route, Switch } from "react-router-dom";
// import {Link} from 'react-router-dom';
import Login from "./components/Login";
import Home from "./components/HomePage/Home";
import CredsForm from "./components/SaveCreds";
import Navbar from "./components/Navbar";
import InfoPage from "./components/InfoPage";
import Links from "./components/Links";
import Notes from "./components/Notes";
import Forest from "./components/Forest";
import AddClass from "./components/AddClass";
import NewUser from "./components/NewUser";
import ShowClasses from "./components/ShowClasses";
import Course from "./components/Course";
import ToDoListPage from "./components/ToDoListPage";
function App() {
  return (
    <main>
      <Navbar />
      <br />
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/NewUser" component={NewUser} exact />
        <Route path="/Home" component={Home} />
        <Route path="/creds" component={CredsForm} />
        <Route path="/InfoPage" component={InfoPage} />
        <Route path="/Links" component={Links} />
        <Route path="/Notes" component={Notes} />
        <Route path="/ToDoListPage" component={ToDoListPage} />
        <Route path="/Forest" component={Forest} />
        <Route path="/AddClass" component={AddClass} />
        <Route path="/ShowClasses" component={ShowClasses} />
        <Route path="/Course" component={Course} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}
export default App;
