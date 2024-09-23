import React, { useEffect } from 'react'
import { useState } from 'react'
import { completeTodo, deleteTodo, getAllTodos, inCompleteTodo } from '../services/TodoService'
import { useNavigate } from 'react-router-dom'

const ListTodoComponent = () => {

    

const [todos, setTodos] = useState([])

useEffect(()=>{
    setTimeout(listTodos(),2000)

},[])

function listTodos()
{
    getAllTodos().then((response)=>
    {
        setTodos(response.data)

    }).catch(error=>{
        console.log(error)

    });
    
}

const navigate = useNavigate()

function addNewTodo()
{
    navigate("/add-todo")
}

function updateTodo(id)
{
    console.log(id)
    navigate(`/update-todo/${id}`)
}

function removeTodo(id)
{
    deleteTodo(id).then((response)=>{
        listTodos();
    }).catch(error=>{
        console.error(error)
    })
}

function markCompleteTodo(id)
{
    completeTodo(id).then((response)=>
    {
        listTodos()
    }).catch(error =>{
        console.error(error)
    })
}

function markinCompleteTodo(id)
{
    inCompleteTodo(id).then((response)=>{
        listTodos()
    }).catch(error=>
    {
        console.log(error);
    }
    )
}
  
return (
    <div className='container'>
        <h2 className='text-center'>List of Todos</h2>

        <button className='btn btn-primary mb-2' onClick={addNewTodo}>Add Todo</button>

        <div>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>Todo Title</th>
                        <th>Todo Description</th>
                        <th>Todo Completed</th>
                        <th>Actions</th>
                    </tr>
                
                </thead> 
                <tbody>

                    {
                        todos.map(todo =>
                            
                            <tr key={todo.id}>
                                
                                <td>{todo.title}</td>
                                <td>{todo.description}</td>
                                <td>{todo.completed ? 'Yes' : 'No'}</td>
                                <td>
                                    <button className='btn btn-info' onClick={()=>updateTodo(todo.id)}>Update</button>
                                    <button className='btn btn-danger mx-3' onClick={()=>removeTodo(todo.id)}>Delete</button>
                                    <button className='btn btn-success mx-1' onClick={()=>markCompleteTodo(todo.id)}>Complete</button>
                                    <button className='btn btn-info mx-2' onClick={()=>markinCompleteTodo(todo.id)}>In Complete</button>

                                    
                                </td>
                                


                            </tr>

                        )
                    }
                    
                </tbody>

            </table>
        </div>


    </div>
  )
}

export default ListTodoComponent