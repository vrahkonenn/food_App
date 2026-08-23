const baseUrl = '/api/recipes'

const getAll = async () => {
    const response = await fetch(baseUrl)

    if (!response.ok) {
        throw new Error('Failed to fetch recipes')
    }
    return await response.json()
}

export default { getAll }