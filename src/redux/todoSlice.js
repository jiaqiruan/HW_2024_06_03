import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../API/todoAPI";

const getTodosAsync = createAsyncThunk("todos/getTodos", async ()=>{
    const response = await getTodos();
    return response;
});

const createTodoAsync = createAsyncThunk("todos/createTodo",async(payload)=>{
    const response = await createTodo(payload);
    return response;
});

const editTodoAsync = createAsyncThunk("todos/editTodo", async(payload)=>{
    const response = await updateTodo(payload.id,{content: payload.content});
    return response;
});

const deleteTodoAsync = createAsyncThunk("todos/deleteTodo",async(payload)=>{
    const id = payload.id;
    const response = await deleteTodo(id);
    return response;
});

const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todos: [],
    },
    reducers: {

    },
    extraReducers: (builder)=>{
        builder
        .addCase(getTodosAsync.fulfilled, (state,action)=>{
            state.todos = action.payload;
        })
        .addCase(createTodoAsync.fulfilled, (state,action)=>{
            state.todos = [action.payload, ...state.todos];
        })
        .addCase(editTodoAsync.fulfilled, (state,action)=>{

            state.todos = state.todos.map((item)=>{
                if(item.id === action.payload.id){
                    return {...item, content: action.payload.content};
                }else{
                    return item;
                }
            });
        })
        .addCase(deleteTodoAsync.fulfilled, (state, action)=>{
            state.todos = state.todos.filter((item)=>{
                return item.id !== action.payload.id;
            });
        });
    },
});
export {getTodosAsync, createTodoAsync, deleteTodoAsync, editTodoAsync };
export default todoSlice.reducer;