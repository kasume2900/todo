import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  todos: [],
  complited : false,
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addtodo(state,action) {
      state.todos.push(action.payload)
    },
    removeTodo(state,action) {
      state.todos = state.todos.filter(el => el.id !== action.payload )
    },
    toggleTodo(state,action) {
       const todo =  state.todos.find(el => el.id === action.payload)
       todo.status = !todo.status
    },
    compliteTodo(state) {
      const todos = []
      state.todos.forEach(el => {
        if (el.status) {
          todos.push(el)
        }
      })
      if(state.todos.length === todos.length){
        state.complited = true
      }
    },
    restartTodo(state) {
      state.complited = false
      state.todos =[]
    }
  },
})

// Action creators are generated for each case reducer function
export const { addtodo,removeTodo,toggleTodo,compliteTodo,restartTodo } = todoSlice.actions

export default todoSlice.reducer