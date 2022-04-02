import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addtodo } from '../store/todoSlice'
import './todo.scss'
import TodoList from './TodoList'

const TodoInput = () => {

  const [value,setValue] = useState('')
  const dispatch = useDispatch()

  const changeInput = (e) => {
    setValue(e.target.value)
  }

  const addTask = () => {
    if (value) {
      dispatch(addtodo({
        id: Date.now(),
        status : false,
        text : value
      }))
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
  },[])


  return (
    <div className='todoWrapper'>
      <h1>todo</h1>
      <div className="todoinputwrap">
        <input onKeyDown={handleKeyDown} ref={inputRef} onChange={changeInput} value={value} type="text" />
        <button onClick={addTask}>add task</button>
      </div>
      <TodoList />
    </div>
  )
}

export default TodoInput