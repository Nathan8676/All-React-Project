import { createSlice , nanoid } from "@reduxjs/toolkit";

const initialState = {
    todo: [{
        id: nanoid(),
        text: "Learn React",
        completed: false
    }],   
}


export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state , action) => {
            const todo ={
                id: nanoid(),
                text: action.payload,
                completed: false
            }
            state.todo.push(todo)
           
        }, 
        removeTodo: (state , action) => {
            state.todo = state.todo.filter((todo) => todo.id !== action.payload)    
        },

        updateTodo: (state , action) => { 
            state.todo = state.todo.map((todo) => todo.id === action.payload.id ? action.payload : todo)
        },

        toggleTodo: (state , action) => {
           const todo = state.todo.find((todo) => todo.id === action.payload)
           if(todo){
            todo.completed = !todo.completed
           }
        }, 
    }
})


export const {addTodo, removeTodo, updateTodo , toggleTodo} = todoSlice.actions

export default todoSlice.reducer