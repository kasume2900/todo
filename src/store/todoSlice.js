import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  todos: [],
  complited : false,
  status : null,
  error : null,
}

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async function(_,{rejectWithValue}) {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      if (!res.ok) {
        throw new Error('Server Error')
      }
      const data = await res.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteTodos = createAsyncThunk(
  'todos/deleteTodos',
  async function(id,{rejectWithValue,dispatch}) {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,{
        method: 'DELETE'
      })
      
      if(!res.ok) {
        throw new Error('Не могу удалить Error Server')
      }

      dispatch(removeTodo(id))

    } catch (error) {
        return rejectWithValue(error.message)
    }
  }
)

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
       todo.completed = !todo.completed
    },
    compliteTodo(state) {
      const todos = []
      state.todos.forEach(el => {
        if (el.completed) {
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
  extraReducers: {
    [fetchTodos.pending] : (state) => {
      state.status = 'loading'
      state.error = null
    },
    [fetchTodos.fulfilled] : (state,action) => {
      state.status = 'resolved'
      state.todos = action.payload
    },
    [fetchTodos.rejected] : (state,action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { addtodo,removeTodo,toggleTodo,compliteTodo,restartTodo } = todoSlice.actions

export default todoSlice.reducer