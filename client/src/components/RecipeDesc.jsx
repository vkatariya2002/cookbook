import React from 'react'
import { useParams } from 'react-router-dom'

const RecipeDesc = () => {
    const params=useParams();
    
  return (
    <div>
      {params.id}
    </div>
  )
}

export default RecipeDesc
