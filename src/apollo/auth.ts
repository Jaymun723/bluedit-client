export const TOKEN_KEY = "token"
export const USER_KEY = "user"

export const login = (token: string, user: { id: string; name: string }) => {
  localStorage.setItem(TOKEN_KEY, token)
  setUser(user)
}

export const getUser = () => {
  const userJson = localStorage.getItem(USER_KEY)
  if (userJson) {
    return JSON.parse(userJson) as { id: string; name: string }
  }
}

export const setUser = (user: { id: string; name: string }) => {
  localStorage.setItem(USER_KEY, JSON.stringify({ id: user.id, name: user.name }))
}

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

export const hasToken = () => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    return true
  }
  return false
}

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}
