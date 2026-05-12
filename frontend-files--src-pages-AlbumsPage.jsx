import { useState, useEffect } from 'react'
import { getAlbums, addAlbum, updateAlbum, deleteAlbum, getSingers } from '../api'

export default function AlbumsPage() {
  const [albums, setAlbums] = useState([])
  const [singers, setSingers] = useState([])
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [singerId, setSingerId] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [albumsRes, singersRes] = await Promise.all([
        getAlbums(),
        getSingers()
      ])
      setAlbums(albumsRes.data)
      setSingers(singersRes.data)
      setError('')
    } catch (err) {
      setError('Failed to fetch data: ' + (err.response?.data?.message || err.message))
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!title.trim() || !year.trim() || !singerId) {
      setError('Title, Year, and Singer are required')
      return
    }

    try {
      const albumData = { 
        title: title.trim(), 
        year: parseInt(year),
        singerId: parseInt(singerId)
      }
      
      if (editingId) {
        await updateAlbum(editingId, { albumId: editingId, ...albumData })
        setSuccess('Album updated successfully!')
      } else {
        await addAlbum(albumData)
        setSuccess('Album added successfully!')
      }
      
      setTitle('')
      setYear('')
      setSingerId('')
      setEditingId(null)
      setError('')
      fetchData()
    } catch (err) {
      setError('Failed to save album: ' + (err.response?.data?.message || err.message))
    }
  }

  const handleEdit = (album) => {
    setEditingId(album.albumId)
    setTitle(album.title)
    setYear(album.year.toString())
    // Find the singer ID from the singer name
    const singer = singers.find(s => s.name === album.singerName)
    setSingerId(singer ? singer.singerId.toString() : '')
    setError('')
    setSuccess('')
  }

  const handleCancel = () => {
    setEditingId(null)
    setTitle('')
    setYear('')
    setSingerId('')
    setError('')
  }

  const handleDelete = async (albumId) => {
    if (window.confirm('Are you sure you want to delete this album?')) {
      try {
        await deleteAlbum(albumId)
        setSuccess('Album deleted successfully!')
        setError('')
        fetchData()
      } catch (err) {
        setError('Failed to delete album: ' + (err.response?.data?.message || err.message))
      }
    }
  }

  const getSingerName = (sId) => {
    const singer = singers.find(s => s.singerId === parseInt(sId))
    return singer ? singer.name : ''
  }

  if (loading) {
    return <div className="container"><div className="card"><div className="loading">Loading albums...</div></div></div>
  }

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ marginBottom: '20px', color: '#1a1a2e' }}>Albums</h2>
        
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Album Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ flex: 1 }}
            />
            <input
              type="number"
              placeholder="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              style={{ flex: 0.8 }}
            />
            <select
              value={singerId}
              onChange={(e) => setSingerId(e.target.value)}
              style={{ flex: 1 }}
            >
              <option value="">Select Singer</option>
              {singers.map((singer) => (
                <option key={singer.singerId} value={singer.singerId}>
                  {singer.name}
                </option>
              ))}
            </select>
            <button type="submit">
              {editingId ? 'Update Album' : 'Add Album'}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancel} className="secondary">
                Cancel
              </button>
            )}
          </div>
        </form>

        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Album ID</th>
                <th>Title</th>
                <th>Year</th>
                <th>Singer Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {albums.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', color: '#999' }}>
                    No albums found
                  </td>
                </tr>
              ) : (
                albums.map((album) => (
                  <tr key={album.albumId}>
                    <td>{album.albumId}</td>
                    <td>{album.title}</td>
                    <td>{album.year}</td>
                    <td>{album.singerName}</td>
                    <td>
                      <div className="action-buttons">
                        <button onClick={() => handleEdit(album)}>Edit</button>
                        <button 
                          onClick={() => handleDelete(album.albumId)}
                          className="secondary"
                          style={{ background: '#dc3545' }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
