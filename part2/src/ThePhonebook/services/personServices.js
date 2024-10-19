import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

const getAllPersons = () => {
  return axios.get(baseUrl);
}

const createPerson = newPerson => {
  return axios.post(baseUrl, newPerson)
}

const updateNumberOfPerson = (id, editPerson) => {
  return axios.put(`${baseUrl}/${id}`, editPerson)
}

const deletePerson = idPerson => {
  return axios.delete(`${ baseUrl }/${ idPerson }`)
}

export default { getAllPersons, createPerson, updateNumberOfPerson, deletePerson }