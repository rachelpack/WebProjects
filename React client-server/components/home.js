import React from 'react'
import { BrowserRouter as Router, Link, Switch, Route, useRouteMatch } from 'react-router-dom'
import Info from './info'
import Albums from './albums'
import Login from './login'
import Posts from './posts'
import Todos from './todos'

function Home() {

    const user = JSON.parse(localStorage.getItem('user'))
    let { url, path } = useRouteMatch();


    return (

        <>
            <h2>hello, {user.name}</h2>
            <Link to="/login" onClick={() => localStorage.setItem('user', null)}>Logout</Link>
             <br />
            <Router>
                <Link to={`${url}/info`}>Info</Link>
                <br />
                <Link to={`${url}/todos`}>Todos</Link>
                <br />
                <Link to={`${url}/posts`}>Posts</Link>
                <br />
                <Link to={`${url}/albums`}>Albums</Link>
               
               
                <Switch>
                    <Route path={`${path}/info`} component={Info}>
                        
                    </Route>
                    <Route path={`${path}/todos`} component={Todos}>
                        
                    </Route>
                    <Route path={`${path}/posts`} component={Posts}>
                       
                    </Route>
                    <Route path={`${path}/albums`} component={Albums}>
                        
                    </Route>
                </Switch>
            </Router>
           
        </>
    )
}

export default Home;
