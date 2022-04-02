import React from 'react'
import { useDispatch } from 'react-redux'
import { restartTodo } from '../store/todoSlice'

const Complited = () => {

  const dispatch = useDispatch()

  const handelCkick = () => {
    dispatch(restartTodo())
  }

  return (
    <div className='complited'>
      <div className='complitedItem'>
        <h2>Complited!</h2>
        <div onClick={handelCkick} className='res'>Restart</div>
      </div>
    </div>
  )
}

export default Complited