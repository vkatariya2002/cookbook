import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import QuillEditor from './components/QuillEditor';
import Navigation from './components/Navigation';
import Logout from './components/Logout';
import RecipeList from './components/RecipeList';
import RecipeDesc from './components/RecipeDesc';

function App() {
  const [count, setCount] = useState(0)

  return (
  <div>

    <BrowserRouter>
    <Navigation/>
      <Routes>
        <Route index element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/create" element={<QuillEditor/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/recipe/:id" element={<RecipeDesc/>} />
      </Routes>
    </BrowserRouter>
  </div>

  )
}

export default App
