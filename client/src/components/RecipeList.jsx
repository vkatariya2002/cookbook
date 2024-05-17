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
    // const [recipesSelfId, setRecipesSelfId] = useState([]);
    const [recipesFavourite, setRecipesFavourite] = useState([]);
    const [recipesFavouriteId, setRecipesFavouriteId] = useState([]);
    const [recipesSelfId, setRecipesSelfId] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [temp, setTemp] = useState(0)
    const [temp0, setTemp0] = useState(0)
    const [temp_1, setTemp_1] = useState(0)
    const navigate = useNavigate();

    useEffect(() => {
        if (temp_1 > 0) {
            let temp2 = [];
            // console.log(selfRecipes);
            for (let i = 0; i < recipesSelfId.length; i++) {
                Axios.get('https://forkify-api.herokuapp.com/api/v2/recipes/' + recipesSelfId[i])
                    .then(response => {
                        // console.log(response);
                        temp2.push(response.data.data.recipe);
                        if (i === recipesSelfId.length - 1) setRecipesSelf(temp2);
                    })
                    .catch(error => console.error('error fetching recipes', error));
            }
        }
    }, [temp_1])
    useEffect(() => {
        if (temp > 0) {
            let temp2 = [];
            // console.log(selfRecipes);
            for (let i = 0; i < recipesFavouriteId.length; i++) {
                Axios.get('https://forkify-api.herokuapp.com/api/v2/recipes/' + recipesFavouriteId[i])
                    .then(response => {
                        // console.log(response);
                        temp2.push(response.data.data.recipe);
                        if (i === recipesFavouriteId.length - 1) setRecipesFavourite(temp2);
                    })
                    .catch(error => console.error('error fetching recipes', error));
            }
        }
    }, [temp]);

    useEffect(() => {
        Axios.get('https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza')
            .then(response => {
                console.log(response);
                setRecipes(response.data.data.recipes);
            })
            .catch(error => console.error('error fetching recipes', error));
    }, []);

    const showDesc = (id) => {
        navigate('/recipe/' + id);
    }
    useEffect(() => {
        setRecipesSelfId(localStorage.getItem('cookbookUserRecipes').split(','));
        setRecipesFavouriteId(localStorage.getItem('cookbookUserFavRecipes').split(','));
        setTemp(temp + 1);
        setTemp_1(temp_1 + 1);
    }, [temp0])

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
    const addToFavourites = (e, id) => {
        // e.target.style.color='red';
        console.log(e.target.style.color)
        console.log(id);
        if (e.target.style.color == 'red') {
            console.log('test2');
            Axios.post('http://localhost/addtf', { 'email': localStorage.getItem('cookbookUser'), 'id': id, 'action': 'subtract' })
                .then(response => {
                    console.log(response)
                    e.target.style.color = 'blue'
                    let temp3 = localStorage.getItem('cookbookUserFavRecipes').split(',');
                    let index = temp3.indexOf(id);
                    temp3.splice(index, 1);
                    localStorage.removeItem('cookbookUserFavRecipes');
                    localStorage.setItem('cookbookUserFavRecipes', temp3);
                    setTemp0(temp0 + 1);
                })
                .catch(error => console.log(error));
        }
        else if (e.target.style.color == '' || e.target.style.color == 'blue') {
            console.log('test1');
            Axios.post('http://localhost/addtf', { 'email': localStorage.getItem('cookbookUser'), 'id': id, 'action': 'add' })
                .then(response => {
                    console.log(response)
                    e.target.style.color = 'red';
                    let temp3 = localStorage.getItem('cookbookUserFavRecipes').split(',');
                    temp3.push(id);
                    localStorage.removeItem('cookbookUserFavRecipes');
                    localStorage.setItem('cookbookUserFavRecipes', temp3);
                    setTemp0(temp0 + 1);
                })
                .catch(error => console.log(error));
        }
    }
    const deleteRecipeSelf = (id) => {
        Axios.delete(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=dcb03609-b995-4590-8477-0784c5ffb1e33`)
            .then(response2 => {
                console.log(response2);
                Axios.post('http://localhost/drs', { email: localStorage.getItem('cookbookUser'), id: id })
                    .then(response => {
                        console.log(response);
                        let temp3 = localStorage.getItem('cookbookUserRecipes').split(',');
                        temp3.pop(id);
                        localStorage.removeItem('cookbookUserRecipes');
                        localStorage.setItem('cookbookUserRecipes', temp3);
                        setTemp0(temp0 + 1);
                    }).catch(error => {
                        console.log(error);
                    })
            }).catch(error => {
                console.log(error);
            })
    }
    const deleteRecipeFav = (id) => {
        Axios.post('http://localhost/drf', { email: localStorage.getItem('cookbookUser'), id: id })
            .then(response => {
                console.log(response);
                let temp3 = localStorage.getItem('cookbookUserFavRecipes').split(',');
                let index = temp3.indexOf(id);
                temp3.splice(index, 1);
                localStorage.removeItem('cookbookUserFavRecipes');
                localStorage.setItem('cookbookUserFavRecipes', temp3);
                setTemp0(temp0 + 1);
            }).catch(error => {
                console.log(error);
            })
    }
    // const addToFavourites = (id) => {
    //     if (!favoriteRecipes.includes(id)) {
    //         // If recipe is not in favorites, add it
    //         Axios.post('http://localhost/addtf', { 'email': localStorage.getItem('cookbookUser'), 'id': id, 'action': 'add' })
    //             .then(response => {
    //                 console.log(response);
    //                 setFavoriteRecipes([...favoriteRecipes, id]); // Update favoriteRecipes state
    //             })
    //             .catch(error => console.log(error));
    //     } else {
    //         // If recipe is already in favorites, remove it
    //         Axios.post('http://localhost/addtf', { 'email': localStorage.getItem('cookbookUser'), 'id': id, 'action': 'subtract' })
    //             .then(response => {
    //                 console.log(response);
    //                 setFavoriteRecipes(favoriteRecipes.filter(recipeId => recipeId !== id)); // Update favoriteRecipes state
    //             })
    //             .catch(error => console.log(error));
    //     }
    // }
    return (
        <div>
        <br />
            <div className='search-cont'>
            <br />
                <input type="text" name="" id="search-input" />
                <button type="button" onClick={search}>Search</button>
            </div>
            <br />
            <h2 className='heading'>Self Recipes</h2>
            {recipesSelf.length > 0 ? <ul className='recipe-list'>
                {recipesSelf.map(recipe => (
                    <li key={recipe.id}>
                        <div className='recipe-card-cont'>
                            <img src={recipe.image_url} alt="" />
                            {/* <h2>{recipe.title}</h2> */}
                            <br />
                            <label>{recipe.title}</label>
                            <div style={{display:"flex", flexDirection:"row", marginRight :"10px", justifyContent:"space-around" }}>
                            <button type="button" onClick={() => { showDesc(recipe.id) }}>View More</button>
                            
                            <button type="button" onClick={() => { deleteRecipeSelf(recipe.id) }}>Delete</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul> : <></>}
            <br />
            <h2 className='heading'>Favourite Recipes</h2>
            <ul className='recipe-list'>
                {recipesFavourite.map(recipe => (
                    <li key={recipe.id}>
                        <div className='recipe-card-cont'>
                            <img src={recipe.image_url} alt="" />
                            <h2>{recipe.title}</h2>
                            <label>{recipe.publisher}</label>
                            <button type="button" onClick={() => { showDesc(recipe.id) }}>View More</button>
                            <button type="button" onClick={() => { deleteRecipeFav(recipe.id) }}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            <br />
            <h2 className='heading'>Recipes</h2>
            <ul className='recipe-list'>
                {recipes.map(recipe => (
                    <li key={recipe.id}>
                        <div className='recipe-card-cont'>
                            <img src={recipe.image_url} alt="" />
                            <h2>{recipe.title}</h2>
                            <label>{recipe.publisher}</label>
                            <span class="material-symbols-outlined" onClick={(e) => { addToFavourites(e, recipe.id.toString()) }}>
                                thumb_up
                            </span>
                           
                                <button type="button" onClick={() => { showDesc(recipe.id) }}>View More</button>
                            
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;