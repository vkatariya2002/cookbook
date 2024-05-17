// import React,{useEffect} from 'react'
// import Axios from 'axios';
// import { useNavigate } from 'react-router-dom';


// const Login = ()=>{
//     const navigate=useNavigate();
//     useEffect(() => {
//         console.log(localStorage.getItem('cookbookloggedIn'));
//         if(localStorage.getItem('cookbookloggedIn')) navigate('/home');
//     })
//     const loginUser = ()=>{
//         let email = document.getElementById('emailInput').value;
//         let password = document.getElementById('passwordInput').value;
//         Axios.post('http://localhost/login',{email:email,password:password})
//         .then(Response=>{
//             console.log(Response)
//             console.log('login successful:',Response.data.status);
//             localStorage.setItem('cookbookloggedIn', true);
//             localStorage.setItem('cookbookUser', Response.data.email);
//             localStorage.setItem('cookbookUserRecipes', Response.data.selfRecipes);
//             localStorage.setItem('cookbookUserFavRecipes', Response.data.favRecipes);
//             if(Response.data.status==='success') navigate('/home');
//         })
//         .catch(error=>{
//             console.log('login failed',error);
//         });
//     };
//     return(
//         <div>
//             <input type='email' id='emailInput' placeholder='Email'/>
//             <input type='password' id='passwordInput' placeholder='password'/>
//             <button type='button'onClick={loginUser}>Login</button>
//             <label>Don't have an account?<a href='/register'>SignUp Here</a></label>
//         </div>
//     );
// };
// export default Login;


import React, { useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './../login.css'; // Import the CSS file

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('cookbookloggedIn')) {
            navigate('/home');
        }
    }, [navigate]);

    const loginUser = () => {
        let email = document.getElementById('emailInput').value;
        let password = document.getElementById('passwordInput').value;
        Axios.post('http://localhost/login', { email: email, password: password })
            .then(response => {
                if (response.data.status === 'success') {
                    localStorage.setItem('cookbookloggedIn', true);
                    localStorage.setItem('cookbookUser', response.data.email);
                    localStorage.setItem('cookbookUserRecipes', response.data.selfRecipes);
                    localStorage.setItem('cookbookUserFavRecipes', response.data.favRecipes);
                    navigate('/home');
                }
            })
            .catch(error => {
                console.log('login failed', error);
            });
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <div className="input-group">
                <input type="email" id="emailInput" placeholder="Email" className="login-input" />
            </div>
            <div className="input-group">
                <input type="password" id="passwordInput" placeholder="Password" className="login-input" />
            </div>
            <button type="button" onClick={loginUser} className="login-button">Login</button>
            <label className="signup-label">
                Don't have an account? <a href="/register" className="signup-link">Sign Up Here</a>
            </label>
        </div>
    );
};

export default Login;
