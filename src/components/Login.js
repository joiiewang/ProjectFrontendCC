import React, { useState } from 'react';

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
	

	// ----------------------------- Honestly Have no idea how this works ------------------------
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
		padding: "10px"
	}
	const inputStyle = {
		width: "90%",
		margin: "auto"
	}

	return (
		<div>
		<form onSubmit={saveCreds}>
			<label>
				Username:
				<input 
					type="text" 
					value={state.acckey} 
					name="acckey" 
					onChange={handleChange} />
			</label>
			<label>
				Password:
				<input 
					type="text" 
					value={state.seckey} 
					name="seckey" 
					onChange={handleChange} />
			</label>
			<input type="submit" value="Submit" />
		</form>
		</div>
    )
}