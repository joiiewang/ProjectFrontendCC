import React, { useState } from 'react';
import {Link} from 'react-router-dom';

function Login(props) {
    const [state, updateState] = useState({
        acckey: "",
        seckey: ""
    })

	function handleChange(evt) {
        const name = evt.target.name
        const value = evt.target.value
		updateState({
            ...state,
            [name]: value
        })
	}
	
	// We have to do the hooks and stuff I think to connect to backend
	// ----------------------------- Honestly Have no idea how this works ------------------------
	// eslint-disable-next-line
	const saveCreds = (evt) => {  //send creds to backend
	evt.preventDefault();
        alert(`Submitting ${state.acckey} and ${state.seckey}`)
	
        let server = "http://localhost:8118/api"

        if (process.env.REACT_APP_REMOTE) { //set this in .env file: REACT_APP_REMOTE=1
            server = "https://project-backend-cc.herokuapp.com/api"
		}

        if (process.env.NODE_ENV !== 'development') {
            server = "https://project-backend-cc.herokuapp.com/api"
		}

		console.log("server = "+server)
        const url = `${server}/keys`
		const bd = JSON.stringify({ "acckey":state.acckey, "seckey":state.seckey })
        fetch(url, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },           
            body: bd     
		}).then(response => response.json()) 
		.then(data => {
		    console.log("SaveCreds saveCreds: Fetch Response data: ")
		    console.log(data) //don't log an object WITH a string else the conversion won't work and object will not be dumped
		    alert('response: ' + data["MESSAGE"])
		}).catch((error) => console.log("SaveCreds saveCreds: Fetch Failure (is server up?): "+ error))
    }

	const styles = {
		margin: "auto",
		width: "200px",
		border: "3px solid green",
		padding: "10px",
		borderRadius: "25px",
		backgroundColor: "#76FF5B",
	}
	const inputStyle = {
		width: "90%",
		margin: "auto",
		borderRadius: "7px",
		padding: "4px",
		backgroundColor: "#CBFEC0",
	}
	const loginStyle = {
		borderRadius: "7px",
		padding: "4px",
		marginLeft: "4%",
		marginTop: "5px",
		width: "90%",
	 }
  
	return (
		<div>
		<form style={styles}>
			<label>
				Username:
				<input style={inputStyle} type="text" 
					value={state.acckey} 
					name="acckey" 
					onChange={handleChange} />
			</label>
			<label>
				Password:
				<input style={inputStyle}
					type="text" 
					value={state.seckey} 
					name="seckey" 
					onChange={handleChange} />
			</label>
			<Link to="/Home">
				<input type="submit" style={loginStyle} value="Let's get planting" />
			</Link>
		</form>
		</div>
	)
}

export default Login;