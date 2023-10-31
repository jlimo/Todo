import './App.css';
import { useState } from 'react';
//first thing is to create the frontend layout so we know what is happening
export default function App() {
  const [newItem, SetNewItem]= useState("")
  const [todos, SetTodos]= useState([])

  function handleSubmit(e) {
    e.preventDefault()

    SetTodos(currentTodos => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ]
    })

    SetNewItem("")
  }

  function toggleTodo(id, completed) {
    SetTodos( currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }

        return todo
      })
    })
  }

  function deleteTodo(id) {
    SetTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }
  
  return  (
    <>
  <form onSubmit={handleSubmit}className="new-item-form">
    <div className="form-row">
      <label htmlFor="item">New Item</label>
      <input value={newItem} 
      onChange={e => SetNewItem(e.target.value)}
       type="text" id="item" />
    </div>
    <button className='btn'> Add</button>
  </form>
  <h1 className='header'>Todo List</h1>
  <ul className="list">
    {todos.length === 0 && "no Todos"}
    {todos.map(todo => {
      return (
      <li key={todo.id}>
    <label>
      <input type="checkbox" checked={todo.completed}
       onChange={e => toggleTodo(todo.id, e.target.checked)} />
      {todo.title}
      </label>
      <button onClick={() => deleteTodo(todo.id)} 
      className="btn btn-Danger">Delete</button>
    </li>
      )
    })}
  </ul>
  </>
  )
}
