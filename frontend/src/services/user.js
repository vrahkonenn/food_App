
const update = async (username, email, favourites, token) => {
    const bearerToken = `Bearer ${token}`

    const options = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json', 'Authorization' : bearerToken},
        body: JSON.stringify({ username, email, favourites })
    }

    const response = await fetch('/api/users/profile', options)

    if (!response.ok) {
        throw new Error({ error: 'failed to update user' })
    }

    return await response.json()
} 

export default { update }