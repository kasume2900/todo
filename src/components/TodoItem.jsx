import React from 'react'
import { useDispatch } from 'react-redux'
import { compliteTodo, deleteTodos, toogleStatus } from '../store/todoSlice'

const TodoItem = ({id,completed,title}) => {

  const dispatch = useDispatch()

  const delTask = () => {
    dispatch(deleteTodos(id))
  }
  const checkTask = () => {
    dispatch(toogleStatus(id))
    //dispatch(compliteTodo())
  }

  return (
    <div className='item'>
      <div onClick={checkTask} className={`text ${completed ? 'yes' : 'no'}`}>{title}</div>
      <div onClick={delTask} className='delete'>X</div>
    </div>
  )
}

export default TodoItem