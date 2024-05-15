import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios';

const UserSelfRecipes = () => {
    const params=useParams();
    const [selfRecipesId, setSelfRecipesId] = useState([]);
    const [temp, setTemp] = useState(false);
    const [recipesSelf, setRecipesSelf] = useState([]);
    const [temp3, settemp3] = useState(false);

    useEffect(() => {
      Axios.get('http://localhost/getusr/'+params.id)
      .then(response=>{
        console.log(response);
        setSelfRecipesId(response.data.selfRecipes)
        setTemp(true);
    }).catch(error=>{
        console.log(error);
    })
    }, [])
    
    useEffect(() => {
      if(temp){
        let temp2=[];
        for (let i = 0; i < selfRecipesId.length; i++) {
            Axios.get('https://forkify-api.herokuapp.com/api/v2/recipes/' + selfRecipesId[i])
                .then(response => {
                    // console.log(response);
                    temp2.push(response.data.data.recipe);
                    if (i === selfRecipesId.length - 1){
                        setRecipesSelf(temp2);
                        settemp3(true);
                    }
                })
                .catch(error => console.error('error fetching recipes', error));
        }
      }
    }, [temp])
    const showDesc = (id) => {
      navigate('/recipe/' + id);
  }

  return (
    <div>
      {temp3?
      <ul>
      {recipesSelf.map(recipe => (
                    <li key={recipe.id}>
                        <div className='recipe-card-cont'>
                            <img src={recipe.image_url} alt="" />
                            <h2>{recipe.title}</h2>
                            <label>{recipe.publisher}</label>
                            <button type="button" onClick={() => { showDesc(recipe.id) }}>View More</button>
                        </div>
                    </li>
                ))}
      </ul>
      :<></>}
    </div>
  )
}

export default UserSelfRecipes
