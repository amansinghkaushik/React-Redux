import {createSlice, nanoid } from '@reduxjs/toolkit'
//nano id creates unique ids

const initialState = {
    todos: [{id: 1, text: "todo 1"}]
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,

    //reducers are functions that modify the state based on the action dispatched
    reducers: {
        addTodo: (state, action) => {
            const newtodo = {
                id: nanoid(),
                text: action.payload
            }
            state.todos.push(newtodo)
        }, 
        //we always get access to state and action as parameters
        //state gives the value of the initial state
        //action gives the value passed from the component

        removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
        },
        //brings all todos except the one with the id passed from the component
    }
})

export const {addTodo, removeTodo} = todoSlice.actions
//exporting the actions to be used in the component

export default todoSlice.reducer
//exporting the reducer to be used in the store 