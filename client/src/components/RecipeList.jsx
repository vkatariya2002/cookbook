// import React, { useState, useEffect } from 'react';
// import Axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// const RecipeList = () => {
//     const [recipesSelf, setRecipesSelf] = useState([]);
//     const [recipes, setRecipes] = useState([]);
//     const navigate=useNavigate()
//     useEffect(() => {
//         let selfRecipes=localStorage.getItem('cookbookUserRecipes').split(',');
//         let temp=[];
//         console.log(selfRecipes);
//         for(let i=0;i<selfRecipes.length;i++){
//         Axios.get('https://forkify-api.herokuapp.com/api/v2/recipes/'+selfRecipes[i])
//         .then(response =>{
//             console.log(response);
//             temp.push(response.data.data.recipe);
//             if(i==selfRecipes.length-1) setRecipesSelf(temp);
//         })
//         .catch(error => console.error('error fetching recipes', error));
//     }
//     },[]);
//     useEffect(() => {
//         Axios.get('https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza')
//         .then(response =>{
//             console.log(response);
//             setRecipes(response.data.recipes);
//         })
//         .catch(error => console.error('error fetching recipes', error));
//     },[]);
//     const showDesc=(url)=>{
//         location.href=url
//     }
//     const search=()=>{
//         let search_query=document.getElementById('search-input').value;
//         // Axios.get(`https://forkify-api.herokuapp.com/api/search?q=${search_query}`)
//         Axios.get(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${search_query}`)
//         .then(response=>{
//             console.log(response);
//             setRecipes(response.data.recipes);
//         }).catch(error=>{
//             console.error('error fetching recipes', error)
//         })
//     }
//     return (
//         <div>
//             <input type="text" name="" id="search-input"/>
//             <button type="button" onClick={search}>Search</button>
//             <h2>Self Recipes</h2>
//             <ul className='recipe-list'>
//                 {recipesSelf.map(recipe => (
//                     <li key={recipe._id}>
//                     <div className='recipe-card-cont'>
//                         <img src={recipe.image_url} alt=""/>
//                         {/* <div className='recipe-desc-cont'> */}
//                         <h2>{recipe.title.toUpperCase()}</h2>
//                         <label>{recipe.publisher}</label>
//                         {/* <label><b>INGREDIENTS</b></label>
//                         <label>{recipe.ingredients.slice(0,80)}</label> */}
//                         <button type="button" onClick={()=>{showDesc(recipe.source_url)}}>View More</button>
//                         {/* </div> */}
//                     </div>
//                     </li>
//                 ))}
//             </ul>
//             <h2>Recipes</h2>
//             <ul className='recipe-list'>
//                 {recipes.map(recipe => (
//                     <li key={recipe._id}>
//                     <div className='recipe-card-cont'>
//                         <img src={recipe.image_url} alt=""/>
//                         {/* <div className='recipe-desc-cont'> */}
//                         <h2>{recipe.title.toUpperCase()}</h2>
//                         <label>{recipe.publisher}</label>
//                         {/* <label><b>INGREDIENTS</b></label>
//                         <label>{recipe.ingredients.slice(0,80)}</label> */}
//                         <button type="button" onClick={()=>{showDesc(recipe.source_url)}}>View More</button>
//                         {/* </div> */}
//                     </div>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default RecipeList;

// // let search_query=document.getElementById('search-input').value;
// // `https://forkify-api.herokuapp.com/api/search?q=${search_query}`


import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RecipeList = () => {
    const [recipesSelf, setRecipesSelf] = useState([]);
    const [recipes, setRecipes] = useState([]); // Initialize with an empty array
    const navigate = useNavigate();

    useEffect(() => {
        let selfRecipes = localStorage.getItem('cookbookUserRecipes').split(',');
        let temp = [];
        // console.log(selfRecipes);
        for (let i = 0; i < selfRecipes.length; i++) {
            Axios.get('https://forkify-api.herokuapp.com/api/v2/recipes/' + selfRecipes[i])
                .then(response => {
                    // console.log(response);
                    temp.push(response.data.data.recipe);
                    if (i === selfRecipes.length - 1) setRecipesSelf(temp);
                })
                .catch(error => console.error('error fetching recipes', error));
        }
    }, []);

    useEffect(() => {
        Axios.get('https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza')
            .then(response => {
                console.log(response);
                setRecipes(response.data.data.recipes);
            })
            .catch(error => console.error('error fetching recipes', error));
    }, []);

    const showDesc = (id) => {
        navigate('/recipe/'+id);
    }

    const search = () => {
        let search_query = document.getElementById('search-input').value;
        Axios.get(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${search_query}`)
            .then(response => {
                console.log(response);
                setRecipes(response.data.data.recipes);
            })
            .catch(error => {
                console.error('error fetching recipes', error)
            })
    }

    return (
        <div>
            <input type="text" name="" id="search-input" />
            <button type="button" onClick={search}>Search</button>
            <h2>Self Recipes</h2>
            <ul className='recipe-list'>
                {recipesSelf.map(recipe => (
                    <li key={recipe._id}>
                        <div className='recipe-card-cont'>
                            <img src={recipe.image_url} alt="" />
                            <h2>{recipe.title.toUpperCase()}</h2>
                            <label>{recipe.publisher}</label>
                            <button type="button" onClick={() => { showDesc(recipe.id) }}>View More</button>
                        </div>
                    </li>
                ))}
            </ul>
            <h2>Recipes</h2>
            <ul className='recipe-list'>
                {recipes.map(recipe => (
                    <li key={recipe._id}>
                        <div className='recipe-card-cont'>
                            <img src={recipe.image_url} alt="" />
                            <h2>{recipe.title.toUpperCase()}</h2>
                            <label>{recipe.publisher}</label>
                            <button type="button" onClick={() => { showDesc(recipe.id) }}>View More</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;