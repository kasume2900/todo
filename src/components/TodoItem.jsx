import React from 'react'
import { useDispatch } from 'react-redux'
import { compliteTodo, removeTodo, toggleTodo } from '../store/todoSlice'

const TodoItem = ({id,status,text}) => {

  const dispatch = useDispatch()

  const delTask = () => {
    dispatch(removeTodo(id))
  }
  const checkTask = () => {
    dispatch(toggleTodo(id))
    dispatch(compliteTodo())
  }

  return (
    <div className='item'>
      <div onClick={checkTask} className={`text ${status ? 'yes' : 'no'}`}>{text}</div>
      <div onClick={delTask} className='delete'>X</div>
    </div>
  )
}

export default TodoItem