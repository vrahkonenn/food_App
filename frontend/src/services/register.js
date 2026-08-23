const baseUrl = '/api/users'

const register = async (username, email, password) => {

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ username, email, password })
  }

  const response = await fetch(baseUrl, options)

  if (!response.ok) {
    throw new Error({ error: 'Failed to register'})
  }

  return await response.json()
}

export default { register }