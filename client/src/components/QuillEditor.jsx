import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';


const QuillEditor = () => {
    const navigate = useNavigate();
    useEffect(() => {
        console.log(localStorage.getItem('cookbookloggedIn'));
        if (localStorage.getItem('cookbookloggedIn') === null) navigate('/');
    })
    // const logout=()=>{
    //     localStorage.removeItem('cookbookloggedIn');
    //     navigate('/');
    // }
    const [value, setValue] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    // const [prevIngredients, setIngredients] = useState([]);
    let ingredients = [];
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
        console.log(event.target.files[0])
        const formData = new FormData();
        formData.append('key', '2f5904dc8ec2d2f4192acf8ef4f361f4');
        formData.append('image', event.target.files[0]);
        Axios.post("https://api.imgbb.com/1/upload",formData)
            .then(response => {
                console.log(response);
                setThumbnail(response.data.data.display_url)
            })
            .catch(error => {
                console.log(error);
            })
        // const reader = new FileReader();

        // reader.onload = function () {
        //     const text = reader.result;
        //     console.log(text);
        //     Axios.post('https://api.imgbb.com/1/upload?key=c9d1c1907c518506f05d9c06bb56b294',{image:text,name:'temp'})
        //     .then(data=>{
        //         console.log(data);
        //     })
        //     .catch(error=>{
        //         console.log(error);
        //     })
        // };

        // reader.readAsDataURL(event.target.files[0]);
    }
    const addIngredients = () => {
        let newIngredient = document.getElementById('ingredients').value
        // setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
        // console.log(prevIngredients);
        ingredients.push({
            quantity: 1,
            unit: "",
            description: newIngredient
        })
    }
    const addRecipe = () => {
        let recipeName = document.getElementById('recipeName').value;

        console.log(value);
        Axios.post('https://forkify-api.herokuapp.com/api/v2/recipes?key=dcb03609-b995-4590-8477-0784c5ffb1e3', {
            image_url: thumbnail,
            "publisher": localStorage.getItem('cookbookUser'),
            "ingredients": ingredients,
            "source_url": thumbnail,
            "image_url": thumbnail,
            "publisher_url": thumbnail,
            "title": recipeName,
            "cooking_time": 1,
            "servings": 1
        })
            .then(response => {
                Axios.post('http://localhost/addRecipe', { id: response.data.data.recipe.id, email: localStorage.getItem('cookbookUser') })
                    .then(data =>{
                        console.log("Recipe: ", data);
                        let temp=localStorage.getItem('cookbookUserRecipes').split(',');
                        temp.push(response.data.data.recipe.id);
                        localStorage.removeItem('cookbookUserRecipes');
                        localStorage.setItem('cookbookUserRecipes',temp);
            })
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    }
    return (
        <>
            <input type="text" name="" id="recipeName" placeholder='Name of your Recipe' />
            <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} placeholder='Instructions for your Recipe' />
            <input type="file" name="" id="recipeThumbnailImage" onChange={uploadImage} accept='image/*' />
            <input type='text' id='ingredients' />
            <button type="button" onClick={addIngredients}>Add Ingredient</button>
            <button type="button" onClick={addRecipe}>Add Recipe</button>
            {/* <button type="button" onClick={logout}>Logout</button> */}
        </>)
}

export default QuillEditor
// { name: recipeName, instructions: value, thumbnailImage: thumbnail, postedBy: localStorage.getItem('cookbookUser'), ingredients: ingredients },