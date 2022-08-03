import React from 'react';
import { Route, BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'



export default function Logout() {
    
    const history = useHistory();

        const d = () => {
            localStorage.removeItem('user');
            history.push('/home')
        return (
            <div>
            { d }
            <Router>
                <Route path="/home">
                    <Home />
                </Route>
            </Router >
            </div>
        )
    }
}