import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getTodosAsync,createTodoAsync,editTodoAsync,deleteTodoAsync} from "../redux/todoSlice";


export default function Todolist() {
    const dispatch = useDispatch();
    const todos = useSelector((state)=>state.todos.todos);

    const [newTodo, setNewTodo] = useState("");
    const [editId, setEditId] = useState(null);
    const [editInput, setEditInput] = useState("");

    useEffect(()=>{
        dispatch(getTodosAsync());
    },[dispatch]);

    const handleSubmit = ()=>{
        dispatch(createTodoAsync({content: newTodo}));
        setNewTodo("");
    };

    const handleEdit = (id) =>{
        if(editId === id){
            dispatch(editTodoAsync({id:id, content: editInput}));
            setEditInput("");
            setEditId(null);
        }else{
            setEditId(id);
            setEditInput(todos.find((todo) => todo.id === id).content);
        }
    }

    const handleDelete = (id)=>{
        dispatch(deleteTodoAsync({id:id}));
    }

    return (
        <div className='todo-container'>
            <div className='todo-form'>
                <input value={newTodo} onChange={(event)=>{setNewTodo(event.target.value)}}/>
                <button onClick={handleSubmit}>submit</button>
            </div>
            <div className='todo-list'>
                <ul>
                    {todos.map((item)=>{
                        const isEdit = item.id === editId;
                        <li key={item.id}>
                            {/* edit or not */}
                            {isEdit 
                            ? (<input value={editInput} onChange={(event)=>setEditInput(event.target.value)}/>) 
                            : (<span>{item.content}</span>)}
                            <button onClick={()=>handleEdit(item.id)}> 
                                {editId===item.id ? "save" : "edit"}
                            </button>
                            <button onClick={()=>{handleDelete(item.id)}}>delete</button>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    );
};
