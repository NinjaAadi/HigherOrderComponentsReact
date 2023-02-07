import {useState,useEffect,useRef} from 'react';
import axios from 'axios';
const Todos = () => {
    const [todos,setTodos] = useState(undefined);
    const [todoList,setTodoList] = useState(<p>Loading</p>);
    const [input,setInput] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            const _users = await axios.get('https://jsonplaceholder.typicode.com/todos');
            setTodos(_users.data.slice(1,10));
        }
        setTimeout(fetchUsers,2000);

    },[]);

    useEffect(() => {
        if(todos === undefined) return;
        setTodoList(<div >{
            todos.map((todo) => {
                return <p key = {todo.id}>{todo.title}</p>
        })} 
    </div>)
    },[todos]);

    const onChange = (e) => {
        setInput(e.target.value);
        if(e.target.value == '') {
            setTodoList(<div>{
                todos.map((todos) => {
                    return <p key = {todos.id}>{todos.title}</p>
                })}
            </div>)
            return;
        }
        setTodoList(todos.filter((todos) => {
            return todos.title.indexOf(input) >= 0;
        }).map((todos) => {
            return <p key = {todos.id}>{todos.title}</p>
        }));
    }
    return <div style = {{backgroundColor:"gold",height :"auto",width:"50%"}}>
        <p>Todos</p>
        <input type = "search" placeholder='Search todos' name = 'input' value = {input} onChange = {e => onChange(e)}></input>
        {todoList}
    </div>
}

export default Todos;