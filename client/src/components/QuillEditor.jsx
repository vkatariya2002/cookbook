import React, { useState,useEffect } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';


const QuillEditor = () => {
    const navigate=useNavigate();
    useEffect(() => {
      console.log(localStorage.getItem('cookbookloggedIn'));
      if(localStorage.getItem('cookbookloggedIn')===null) navigate('/');
    })
    // const logout=()=>{
    //     localStorage.removeItem('cookbookloggedIn');
    //     navigate('/');
    // }
    const [value, setValue] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [ingredients, setIngredients] = useState('');
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['image', 'code-block']
        ],
    };
    const uploadImage = async (event) => {
        const reader = new FileReader();

        reader.onload = function () {
            const text = reader.result;
            console.log(text);
            setThumbnail(text);
        };

        reader.readAsDataURL(event.target.files[0]);
    }
    const saveIngredients=()=>{
        setIngredients(document.getElementById('ingredients').value);
    }
    const addRecipe = () => {
        let recipeName=document.getElementById('recipeName').value;

        console.log(value);
        Axios.post('http://localhost/addRecipe', { name: recipeName, instructions: value, thumbnailImage: thumbnail, postedBy: localStorage.getItem('cookbookUser'), ingredients: ingredients})
            .then(data => { console.log(data) })
            .catch(error => console.log(error));
    }
    return (
        <>
            <input type="text" name="" id="recipeName" placeholder='Name of your Recipe' />
            <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} placeholder='Instructions for your Recipe' />
            <input type="file" name="" id="recipeThumbnailImage" onChange={uploadImage} accept='image/*'/>
            <input type='text' id='ingredients' onChange={saveIngredients}/>
            <button type="button" onClick={addRecipe}>Add Recipe</button>
            {/* <button type="button" onClick={logout}>Logout</button> */}
        </>)
}

export default QuillEditor
