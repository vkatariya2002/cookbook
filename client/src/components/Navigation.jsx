import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
const Navigation = () => {
  const navigate=useNavigate();
  const [visibility, setVisibility] = useState(true);
    useEffect(() => {
      console.log(localStorage.getItem('cookbookloggedIn'));
      if(localStorage.getItem('cookbookloggedIn')){
        setVisibility(false);
      }
      else setVisibility(true);
    })
  //   const logout=()=>{
  //     localStorage.removeItem('cookbookloggedIn');
  //     navigate('/');
  // }
  return (
    <nav class="navbar">
      <ul>
        {visibility?<></>:<li><Link to="/home">Home</Link></li>}
        {visibility?<li><Link to="/">Login</Link></li>:<li><Link to='/logout'>Logout</Link></li>}
        {visibility?<li><Link to="/register">Register</Link></li>:<></>}
        {visibility?<></>:<li><Link to="/create">Create</Link></li>}
      </ul>
    </nav>
  )
}

export default Navigation;
