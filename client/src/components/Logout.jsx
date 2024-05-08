import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate=useNavigate();
    useEffect(() => {
      localStorage.removeItem('cookbookloggedIn');
      localStorage.removeItem('cookbookUser');
      navigate('/');
    })
    
  return (
    <div>
      
    </div>
  )
}

export default Logout
