import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewTodo, fetchTodos } from '../store/todoSlice'
import './todo.scss'
import TodoList from './TodoList'

const TodoInput = () => {

  const [value,setValue] = useState('')

  const {status,error} = useSelector(state => state.todos)

  const dispatch = useDispatch()

  const changeInput = (e) => {
    setValue(e.target.value)
  }

  const addTask = () => {
    if (value) {
      dispatch(addNewTodo(value))
    }
    
    setValue('')
  }

  const inputRef = useRef(null)

  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      addTask()
    }
  }

  useEffect(() => {
    inputRef.current.focus()
    dispatch(fetchTodos())
  },[dispatch])


  return (
    <div className='todoWrapper'>
      <h1>todo</h1>
      <div className="todoinputwrap">
        <input onKeyDown={handleKeyDown} ref={inputRef} onChange={changeInput} value={value} type="text" />
        <button onClick={addTask}>add task</button>
      </div>
      {status === 'loading' && <h2>Loading ...</h2>}
      {error && <h2>{error}</h2>}
      <TodoList />
    </div>
  )
}

export default TodoInput