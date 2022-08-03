import React from 'react';

export default function Info() {
    const user = JSON.parse(localStorage.getItem("user"))


    return (
        <>
          <h3>your information</h3>
          <p> name:  {user.name}</p>  
          <p>phone:  {user.phone}</p>
          <p>email:  {user.email}</p>
          <p>address:  {user.address.city}, {user.address.street}</p>
        </>
    )
 }; 
