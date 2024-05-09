import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import RecipeList from './RecipeList';

const Home = () => {
    const navigate=useNavigate();
    useEffect(() => {
      console.log(localStorage.getItem('cookbookloggedIn'));
      if(localStorage.getItem('cookbookloggedIn')===null) navigate('/');
    })
    // const logout=()=>{
    //     localStorage.removeItem('cookbookloggedIn');
    //     navigate('/');
    // }
  return (
    <div>
        Home
        <RecipeList/>
      {/* <button type='button' onClick={logout}>Logout</button> */}
    </div>
  )
}

export default Home
