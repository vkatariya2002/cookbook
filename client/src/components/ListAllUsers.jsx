import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios';

const ListAllUsers = () => {
    const [users, setUsers] = useState([]);
    const [temp, setTemp] = useState(false)
    useEffect(() => {
        Axios.get('http://localhost/getallusers')
        .then(response=>{
            console.log(response);
            setUsers(response.data.data);
            setTemp(true);
        }).catch(error=>{
            console.log(error);
        })
    }, [])

  return (
    <>
    {temp?<>
        {users.map(user=>{
            let url='/user/'+user._id;
            return <><Link to={url}>{user.email}</Link><br/></>
        })}
    </>:<></>}
    </>
  )
}

export default ListAllUsers
