import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios';

const RecipeDesc = () => {
    const [recipeDesc, setRecipeDesc] = useState({});
    const params=useParams();
    useEffect(() => {
      Axios.get('https://forkify-api.herokuapp.com/api/v2/recipes/'+params.id)
      .then(response=>{
        console.log(response)
        setRecipeDesc(response.data.data.recipe);
      }).catch(error=>{
        console.log(error)
      })
    }, [])
    
  return (
    <div>
      <h2>{recipeDesc.title}</h2>
      <img src={recipeDesc.image_url} alt="" />
      <ul>
    {recipeDesc.ingredients.map(element=>{
        return <li>element.description</li>
    })}
    </ul>
    <label>Cooking Time:&nbsp{recipeDesc.cooking_time}</label>
    <label>Number of Servings: &nbsp{recipeDesc.servings}</label>
    </div>
  )
}

export default RecipeDesc
