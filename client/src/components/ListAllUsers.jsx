// import React,{useState,useEffect} from 'react'
// import { Link } from 'react-router-dom';
// import Axios from 'axios';

// const ListAllUsers = () => {
//     const [users, setUsers] = useState([]);
//     const [temp, setTemp] = useState(false)
//     useEffect(() => {
//         Axios.get('http://localhost/getallusers')
//         .then(response=>{
//             console.log(response);
//             setUsers(response.data.data);
//             setTemp(true);
//         }).catch(error=>{
//             console.log(error);
//         })
//     }, [])

//   return (
//     <>
//     {temp?<>
//         {users.map(user=>{
//             let url='/user/'+user._id;
//             return <><Link to={url}>{user.email}</Link><br/></>
//         })}
//     </>:<></>}
//     </>
//   )
// }

// export default ListAllUsers







//import 'index.css';  // Ensure the correct path to the CSS file

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
//import './ListAllUsers.css';  // Import the CSS file

const ListAllUsers = () => {
    const [users, setUsers] = useState([]);
    const [temp, setTemp] = useState(false);

    useEffect(() => {
        Axios.get('http://localhost/getallusers')
            .then(response => {
                console.log(response);
                setUsers(response.data.data);
                setTemp(true);
            }).catch(error => {
                console.log(error);
            })
    }, [])

    return (
        <div className="user-list-container">
            {temp ? (
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => {
                            let url = '/user/' + user._id;
                            return (
                                <tr key={user._id}>
                                    <td>{user.email}</td>
                                    <td><Link to={url}>View Details</Link></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default ListAllUsers;

















