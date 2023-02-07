import {useState,useEffect,useRef} from 'react';
import axios from 'axios';
import Search from '../HOC/Search';
const Users = () => {
    const [users,setUsers] = useState(undefined);
    const [userList,setUserList] = useState(<p>Loading</p>);
    const [input,setInput] = useState('');

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         const _users = await axios.get('https://jsonplaceholder.typicode.com/users');
    //         setUsers(_users.data);
    //     }
    //     setTimeout(fetchUsers,2000);

    // },[]);

    // useEffect(() => {
    //     if(users === undefined) return;
    //     setUserList(<div >{
    //         users.map((users) => {
    //             return <p key = {users.id}>{users.name}</p>
    //     })} 
    // </div>)
    // },[users]);

    // const onChange = (e) => {
    //     setInput(e.target.value);
    //     if(e.target.value == '') {
    //         setUserList(<div>{
    //             users.map((users) => {
    //                 return <p key = {users.id}>{users.name}</p>
    //             })}
    //         </div>)
    //         return;
    //     }
    //     setUserList(users.filter((user) => {
    //         return user.name.indexOf(input) >= 0;
    //     }).map((user) => {
    //         return <p key = {user.id}>{user.name}</p>
    //     }));
    // }
    return <div style = {{backgroundColor:"lightgreen",height :"auto",width:"50%"}}>
        {/* <p>Users</p>
        <input type = "search" placeholder='Search user' name = 'input' value = {input} onChange = {e => onChange(e)}></input> */}
        {userList}
    </div>
}

export default Search(Users,"users");
