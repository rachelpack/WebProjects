import React from 'react';
import {useState, useEffect} from 'react'

export default function Todos(){
    const [arrTodos, setArrTodos] = useState([]);
    const handleTodos = async () => {

        const user = (JSON.parse(localStorage.getItem("user")))
        const todos = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${user.id}`)
        .then(function(response){ return response.json(); })
        .then(function(data) {
            const items = data;
            console.log(items)
            setArrTodos(items);

        });
       
    }
    useEffect(() => {
        handleTodos()
    }, []);

    const serialOrder = ()=>{

    }
    const executionOfOrder = ()=>{

    };
    const alphabeticalOrder = ()=>{

    };
    const randomOrder = ()=>{
        const arrTodos2 = arrTodos;
        const tempTodosArr = arrTodos2.shuffle();
        setArrTodos(tempTodosArr);
   
    }
    // useEffect(() => {
    //     randomOrder()
    // }, []);
    const todosUser = arrTodos.map(todo=><p>{todo.title} {<input type="checkbox" checked={todo.completed}/>}</p>)

    //  const changeOrder=(()=>)

    return(
        <div>
            <p>Select a criterion:</p>
            <select >
                <option value="serial">serial</option>
                <option value="execution of">execution of</option>
                <option value="alphabetical">alphabetical</option>
                <option value="random" onChange={randomOrder}>random</option>
            </select>

            <p> The Todos:    </p> 
            {todosUser}
            
        </div>
        
    )

};