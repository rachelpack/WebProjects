import React from 'react';
import { useEffect, useState } from 'react'
// import Home from './home';
import { useHistory } from 'react-router-dom'

function Login() {

    const [username, setUsername] = useState("Antonette");
    const [password, setPassword] = useState("9509");
    const history = useHistory();


    const handleSubmit = async (event) => {
        event.preventDefault();
        await fetch(`https://jsonplaceholder.typicode.com/users`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                for (let i =0; i < 10; ++i) {
                    console.log(data[i].username)
                    if (data[i].username===username && data[i].address.geo.lat.slice(-4) == password) {
                        localStorage.setItem('user', JSON.stringify(data[i]));
                        history.push('/home') 
                        return;
                    }
                }

            })
            .catch(() => alert("Unauthorized user"))
        
    }


    
    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    placeholder={"username"}
                    value={username}
                    onChange={handleChangeUsername} />
                <input type="password"
                    placeholder={"password"}
                    value={password}
                    onChange={handleChangePassword} />

                <button>login</button>
            </form>
        </div>
    )


}
export default Login;