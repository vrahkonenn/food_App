const baseUrl = '/api/recipes'

const getAll = async () => {
    const response = await fetch(baseUrl)

    if (!response.ok) {
        throw new Error('Failed to fetch recipes')
    }
    return await response.json()
}

const getOne = async (id) => {
    const response = await fetch(`${baseUrl}/${id}`)

    if (!response.ok) {
        throw new Error('Failed to fetch recipe')
    }

    return await response.json()
}

const createRecipe = async (recipe, token) => {
  const formData = new FormData()

  formData.append("name", recipe.name)
  formData.append("description", recipe.description)
  formData.append("servings", recipe.servings)

  formData.append("ingredients",
    JSON.stringify(recipe.ingredients)
  )

  formData.append("instructions",
    JSON.stringify(recipe.instructions)
  )

  if (recipe.image) {
    formData.append("image", recipe.image)
  }

  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  if (!response.ok) {
    throw new Error("Failed to create a recipe")
  }

  return await response.json()
}

const deleteRecipe = async (id, token) => {
    const bearerToken = `Bearer ${token}`

    const options = {
        method: 'DELETE',
        headers: {'Authorization': bearerToken},
    }

    const response = await fetch(`${baseUrl}/${id}`, options)

    if (!response.ok) {
        throw new Error('Failed to delete a recipe')
    }
    return await response.json()
}

const commentRecipe = async (id, text, token) => {
    const bearerToken = `Bearer ${token}`

    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': bearerToken},
        body: JSON.stringify({text})
    }

    const response = await fetch(`${baseUrl}/${id}/comments`, options)

    if (!response.ok) {
        throw new Error('Failed to comment a recipe')
    }
    return await response.json()
}

const deleteComment = async (id, commentId, token) => {
    const bearerToken = `Bearer ${token}`

    const options = {
        method: 'DELETE',
        headers: {'Authorization': bearerToken},
    }

    const response = await fetch(`${baseUrl}/${id}/comments/${commentId}`, options)

    if (!response.ok) {
        throw new Error('Failed to delete a comment')
    }
    return await response.json()
}

const rateRecipe = async (id, rating, token) => {
    const bearerToken = `Bearer ${token}`

    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': bearerToken},
        body: JSON.stringify({rating})
    }

    const response = await fetch(`${baseUrl}/${id}/ratings`, options)

    if (!response.ok) {
        throw new Error('Failed to rate a recipe')
    }
    return await response.json()
}

export default { getAll, getOne, createRecipe, deleteRecipe, commentRecipe, deleteComment, rateRecipe}