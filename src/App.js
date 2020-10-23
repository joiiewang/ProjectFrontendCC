import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import CredsForm from './components/SaveCreds';
import Navbar from './components/Navbar';
import InfoPage from './components/InfoPage';
import Links from "./components/Links";
import Notes from "./components/Notes";
import ToDoList from "./components/ToDoList";
import Login from "./components/Login"

function App() {
    return (
        <main>
            <Switch>
		        <Route path="/" component={Home} exact />
                <Route path="/creds" component={CredsForm} />
                <Route path="/InfoPage" component={InfoPage}/>
                <Route path="/Links" component={Links}/>
                <Route path="/Notes" component={Notes}/>
                <Route path="/ToDoList" component={ToDoList}/>
                <Route path="/Login" component={Login}/>
	            <Route component={Error} />
            </Switch>
	    <Navbar />
        </main>
    );
};
export default App;
