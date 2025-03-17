const apiUrl = import.meta.env.VITE_API_URL

export const signInFetch = async (username, password) => {
    const res = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            "Content-type": "Application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    })
    const result = await res.json()
    return result.user
}