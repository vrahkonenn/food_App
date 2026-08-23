const baseUrl = '/api/login'

const login = async (username, password) => {

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ username, password })
  }

  const response = await fetch(baseUrl, options)

  if (!response.ok) {
    throw new Error({ error: 'Failed to log in'})
  }

  return await response.json()
}

export default { login }