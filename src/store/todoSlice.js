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

export const toogleStatus = createAsyncThunk(
  'todos/toogleStatus',
  async function(id,{rejectWithValue,dispatch,getState}) {
    const todo = getState().todos.todos.find(el => el.id === id)
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,{
        method : 'PATCH',
        headers : {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
          completed : !todo.completed
        })
      })

      if(!res.ok) {
        throw new Error('Не могу изменить статус Server Error')
      }
      
      dispatch(toggleTodo(id))
      dispatch(compliteTodo())
      

    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addNewTodo = createAsyncThunk(
  'todos/addNewTodo',
  async function(text,{rejectWithValue,dispatch}) {
    try {

      const todo = {
        title : text,
        userId : 1,
        completed : false
      }

      const res = await fetch('https://jsonplaceholder.typicode.com/todos',{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify(todo)
      })

      if(!res.ok) {
        throw new Error('Не могу создать задачу Server Error')
      }
      const data = await res.json()

      dispatch(addtodo(data))

    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)


const setError = (state,action) => {
  state.status = 'rejected'
  state.error = action.payload
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
    [fetchTodos.rejected] : setError,
    [deleteTodos.rejected] : setError,
    [toogleStatus.rejected] : setError,
    [addNewTodo.rejected] : setError,
  }
})

// Action creators are generated for each case reducer function
export const { addtodo,removeTodo,toggleTodo,compliteTodo,restartTodo } = todoSlice.actions

export default todoSlice.reducer