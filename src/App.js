import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import {Link} from 'react-router-dom';
import Login from "./components/Login";
import Home from './components/Home';
import CredsForm from './components/SaveCreds';
import Navbar from './components/Navbar';
import InfoPage from './components/InfoPage';
import Links from "./components/Links";
import Notes from "./components/Notes";
import ToDoList from "./components/ToDoList";
import Forest from "./components/Forest";
import Dropdown from "./components/Dropdown";

function App() {
    return (
        <main>
            <Switch>
				<Route path="/" component={Login} exact/>
		        <Route path="/Home" component={Home}/>
                <Route path="/creds" component={CredsForm} />
                <Route path="/InfoPage" component={InfoPage}/>
                <Route path="/Links" component={Links}/>
                <Route path="/Notes" component={Notes}/>
                <Route path="/ToDoList" component={ToDoList}/>
                <Route path="/Forest" component={Forest}/>
	            <Route component={Error} />
            </Switch>
	    <Navbar />
        </main>
    );
};
export default App;
