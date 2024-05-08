import React,{useEffect} from 'react'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate=useNavigate();
  useEffect(() => {
    console.log(localStorage.getItem('cookbookloggedIn'));
    if (localStorage.getItem('cookbookloggedIn')) navigate('/home');
  })
  const registerUser = () => {
    let email = document.getElementById('emailInput').value;
    let password = document.getElementById('passwordInput').value;
    Axios.post('http://localhost/register', { email: email, password: password })
      .then(data => console.log(data))
      .catch(error => console.log(error));
  }
  return (
    <div>
      <input type="email" name="" id="emailInput" placeholder='email' />
      <input type="password" name="" id="passwordInput" placeholder='password' />
      <button type="button" onClick={registerUser}>SignUp</button>
    </div>
  )
}

export default Register
