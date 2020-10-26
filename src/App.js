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
import Forest from "./components/Forest"
import AddClass from "./components/AddClass"

function App() {
    return (
        <main>
            <Navbar />
            <br/>
            <Switch>
				<Route path="/" component={Login} exact/>
		        <Route path="/Home" component={Home}/>
                <Route path="/creds" component={CredsForm} />
                <Route path="/InfoPage" component={InfoPage}/>
                <Route path="/Links" component={Links}/>
                <Route path="/Notes" component={Notes}/>
                <Route path="/ToDoList" component={ToDoList}/>
                <Route path="/Forest" component={Forest}/>
                <Route path="/AddClass" component={AddClass}/>
	            <Route component={Error} />
            </Switch>
        </main>
    );
};
export default App;
