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
    const bearerToken = `Bearer ${token}`

    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': bearerToken},
        body: JSON.stringify(recipe)
    }

    const response = await fetch(baseUrl, options)

    if (!response.ok) {
        throw new Error('Failed to create a recipe')
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

export default { getAll, getOne, createRecipe, deleteRecipe}