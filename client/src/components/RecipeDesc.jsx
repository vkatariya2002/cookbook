// import React, { useState,useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import Axios from 'axios';

// const RecipeDesc = () => {
//     const [recipeDesc, setRecipeDesc] = useState({});
//     const params=useParams();
//     useEffect(() => {
//       Axios.get('https://forkify-api.herokuapp.com/api/v2/recipes/'+params.id)
//       .then(response=>{
//         console.log(response)
//         setRecipeDesc(response.data.data.recipe);
//       }).catch(error=>{
//         console.log(error)
//       })
//     }, [])
    
//   return (
//     <div>
//       <h2>{recipeDesc.title}</h2>
//       <img src={recipeDesc.image_url} alt="" />
//       <ul>
//     {/* {recipeDesc.ingredients.map(element=>{
//         return <li>element.description</li>
//     })} */}
//     </ul>
//     <label>Cooking Time: {recipeDesc.cooking_time}</label>
//     <label>Number of Servings: {recipeDesc.servings}</label>
//     </div>
//   )
// }

// export default RecipeDesc
















// import React, { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import Axios from 'axios';
// import { Grid, Button, Image, Header, Segment } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';


// const RecipeDesc = () => {
//   const [recipeDesc, setRecipeDesc] = useState({});
//   const [temp, setTemp] = useState(false);
//   const params = useParams();
//   useEffect(() => {
//     Axios.get('https://forkify-api.herokuapp.com/api/v2/recipes/' + params.id)
//       .then(response => {
//         console.log(response)
//         setRecipeDesc(response.data.data.recipe);
//         setTemp(true);
//       }).catch(error => {
//         console.log(error)
//       })
//   }, [])

//   return (
//     <div>
//       <h2 style={{textAlign: "center"}}>{recipeDesc.title}</h2>
//     <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
//     <div style={{display: "flex"}}>
//       <div>
//         <img src={recipeDesc.image_url} alt="" style={{margin: "0 50px 0 0"}}/>
//       </div>
//       <div>
//       <div>
//         <label style={{marginRight:"20px"}}>Publisher: {recipeDesc.publisher}</label>
//         <Link to={recipeDesc.source_url} style={{backgroundColor: "green", marginLeft:"20px", padding: "10px", borderRadius: "5px", textDecoration:"none"}}>Recipe URL</Link>
//       </div>
//       <div>
//         {temp ? <table style={{margin: "50px"}}>
//           <thead>
//             <th style={{ border: "2px solid black" }}>Ingredients</th>
//           </thead>
//           <tbody>
//             {recipeDesc.ingredients.map(element => {
//               return <tr><td style={{ border: "1px solid black" }}>{element.description}</td></tr>
//             })}
//           </tbody>
//         </table> : <></>}
//       </div>
//       </div>
//       {/* {JSON.stringify(recipeDesc)} */}
//     </div>
//     </div>
//     <div>
//         <p style={{textAlign: "center"}}>Cooking Time: {recipeDesc.cooking_time}</p>
//         <p style={{textAlign: "center"}}>Number of Servings: {recipeDesc.servings}</p>
//       </div>
//       </div>
//   )
// }

// export default RecipeDesc




















// Object.keys(recipe).length > 0 ? 
    // <Grid container stackable columns={2} className="detailsPageContent">
    //     <Grid.Column>
    //         <Button 
    //             as={Link}
    //             to={'/recipes'}
    //             content="Back to recipe List"
    //             color="yellow"
    //             style={{ marginBottom: 40 }}
    //         />
    //         <Image src={recipe.image_url} />
    //     </Grid.Column>
    //     <Grid.Column>
    //         <Header size="medium">{recipe.title}</Header>
    //         <p>Provided By: {recipe.publisher}</p>
    //         <Button 
    //             as={"a"}
    //             href={recipe.publisher_url}
    //             target="_blank"
    //             content="Publisher Webpage"
    //             color="blue"
    //         />
    //         <Button 
    //             as={"a"}
    //             href={recipe.source_url}
    //             target="_blank"
    //             content="Recipe URL"
    //             color="green"
    //         />
    //         <Header size="large" content="Ingredients" />
    //         <Segment.Group>
    //             {
    //                 recipe && recipe.ingredients.map(data => (
    //                     <Segment>
    //                         <h5>{data}</h5>
    //                     </Segment>
    //                 ))
    //             }
    //         </Segment.Group>
    //     </Grid.Column>
    // </Grid> : null



















    import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';
import './../RecipeDesc.css';

const RecipeDesc = () => {
  const [recipeDesc, setRecipeDesc] = useState({});
  const [temp, setTemp] = useState(false);
  const params = useParams();

  useEffect(() => {
    Axios.get('https://forkify-api.herokuapp.com/api/v2/recipes/' + params.id)
      .then(response => {
        console.log(response);
        setRecipeDesc(response.data.data.recipe);
        setTemp(true);
      }).catch(error => {
        console.log(error);
      });
  }, [params.id]);

  return (
    <div className="recipe-container">
      <h2 className="recipe-title">{recipeDesc.title}</h2>
      <div style={{display: "flex", justifyContent:"center", alignItems:"center"}} >
            <label>Publisher: {recipeDesc.publisher}</label>
            <Link to={recipeDesc.source_url} className="recipe-url">Recipe URL</Link>
          </div>
      <div className="recipe-content">
        <div>
          <img src={recipeDesc.image_url} alt="" className="recipe-image" />
        </div>
        <div className="recipe-details">
          <div className="recipe-ingredients">
            {temp ? (
              <table>
                <thead>
                  <tr>
                    <th>Ingredients</th>
                  </tr>
                </thead>
                <tbody>
                  {recipeDesc.ingredients.map((element, index) => (
                    <tr key={index}>
                      <td>{element.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}
          </div>
        </div>
      </div>
      <div className="recipe-footer">
        <p>Cooking Time: {recipeDesc.cooking_time} minutes</p>
        <p>Number of Servings: {recipeDesc.servings}</p>
      </div>
    </div>
  );
};

export default RecipeDesc;
