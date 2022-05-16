export default httpClient => ({
  getMe: async () => {
    // users/me vem da API
    const response = await httpClient.get('/users/me')
    return {
      data: response.data
    }
  },
  generateApikey: async () => {
    const response = await httpClient.post('/users/me/apikey')

    return {
      data: response.data
    }
  }
})
