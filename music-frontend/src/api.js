import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000/api' })

export const getSingers = () => API.get('/singers')
export const addSinger = (singer) => API.post('/singers', singer)
export const updateSinger = (id, singer) => API.put(`/singers/${id}`, singer)
export const deleteSinger = (id) => API.delete(`/singers/${id}`)

export const getAlbums = () => API.get('/albums')
export const addAlbum = (album) => API.post('/albums', album)
export const updateAlbum = (id, album) => API.put(`/albums/${id}`, album)
export const deleteAlbum = (id) => API.delete(`/albums/${id}`)
