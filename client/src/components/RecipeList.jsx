import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const navigate=useNavigate()
    useEffect(() => {
        Axios.get('https://forkify-api.herokuapp.com/api/search?q=pizza')
        .then(response =>{
            console.log(response);
            setRecipes(response.data.recipes);
        })
        .catch(error => console.error('error fetching recipes', error));
    },[]);
    const showDesc=(url)=>{
        location.href=url
    }
    const search=()=>{
        let search_query=document.getElementById('search-input').value;
        Axios.get(`https://forkify-api.herokuapp.com/api/search?q=${search_query}`)
        // Axios.get(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${search_query}&key=052a8ee5-4250-49c8-8145-cc221b138a30`)
        .then(response=>{
            console.log(response);
            setRecipes(response.data.recipes);
        }).catch(error=>{
            console.error('error fetching recipes', error)
        })
    }
    return (
        <div>
            <input type="text" name="" id="search-input"/>
            <button type="button" onClick={search}>Search</button>
            <h2>Recipes</h2>
            <ul className='recipe-list'>
                {recipes.map(recipe => (
                    <li key={recipe._id}>
                    <div className='recipe-card-cont'>
                        <img src={recipe.image_url} alt=""/>
                        {/* <div className='recipe-desc-cont'> */}
                        <h2>{recipe.title.toUpperCase()}</h2>
                        <label>{recipe.publisher}</label>
                        {/* <label><b>INGREDIENTS</b></label>
                        <label>{recipe.ingredients.slice(0,80)}</label> */}
                        <button type="button" onClick={()=>{showDesc(recipe.publisher_url)}}>View More</button>
                        {/* </div> */}
                    </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;

// let search_query=document.getElementById('search-input').value;
// `https://forkify-api.herokuapp.com/api/search?q=${search_query}`