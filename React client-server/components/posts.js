import React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Switch, Route, useRouteMatch } from 'react-router-dom'

export default function Posts() {


    const [arrPosts, setArrPosts] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const post = async () => {
        await fetch(`https://jsonplaceholder.typicode.com/posts/?userId=${user.id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setArrPosts(data)
            })
    }

    const handleLinks = () => {

    }
    let { url, path } = useRouteMatch();
    const postTo = arrPosts.map(post => <><Link to={`${url}/links`} onClick={handleLinks}>{post.title}</Link><br /></>)
    useEffect(() => {
        post();
    }, [])


    return (
        <>
            <h3>your posts</h3>
            {postTo}

        </>
    )

}
