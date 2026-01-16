import { useState } from 'react'
import AddTodo from './components/AddTodo'
import Todo from './components/Todo'

function App() {

  return (
    <>
      <h1>Learn about Redux Toolkit</h1>
      <AddTodo />
      <Todo />
    </>
  )
}

export default App
