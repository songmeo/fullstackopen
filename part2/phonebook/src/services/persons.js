import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    return response.data
  })
}

const create = (newObject) => {
  axios.post(baseUrl, newObject)
  .then(response => response.json())
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const deleteOne = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const personService = { 
    getAll,
    create,
    update,
    deleteOne
}

export default personService
