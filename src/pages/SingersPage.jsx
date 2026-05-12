import { useState, useEffect } from 'react'
import { getSingers, addSinger, updateSinger, deleteSinger } from '../api'

export default function SingersPage() {
  const [singers, setSingers] = useState([])
  const [name, setName] = useState('')
  const [style, setStyle] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSingers()
  }, [])

  const fetchSingers = async () => {
    try {
      setLoading(true)
      const response = await getSingers()
      setSingers(response.data)
      setError('')
    } catch (err) {
      setError('Failed to fetch singers: ' + (err.response?.data?.message || err.message))
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!name.trim() || !style.trim()) {
      setError('Name and Style are required')
      return
    }

    try {
      const singerData = { name: name.trim(), style: style.trim() }
      
      if (editingId) {
        await updateSinger(editingId, singerData)
        setSuccess('Singer updated successfully!')
      } else {
        await addSinger(singerData)
        setSuccess('Singer added successfully!')
      }
      
      setName('')
      setStyle('')
      setEditingId(null)
      setError('')
      fetchSingers()
    } catch (err) {
      setError('Failed to save singer: ' + (err.response?.data?.message || err.message))
    }
  }

  const handleEdit = (singer) => {
    setEditingId(singer.singerId)
    setName(singer.name)
    setStyle(singer.style)
    setError('')
    setSuccess('')
  }

  const handleCancel = () => {
    setEditingId(null)
    setName('')
    setStyle('')
    setError('')
  }

  const handleDelete = async (singerId) => {
    if (window.confirm('Are you sure you want to delete this singer?')) {
      try {
        await deleteSinger(singerId)
        setSuccess('Singer deleted successfully!')
        setError('')
        fetchSingers()
      } catch (err) {
        setError('Failed to delete singer: ' + (err.response?.data?.message || err.message))
      }
    }
  }

  if (loading) {
    return <div className="container"><div className="card"><div className="loading">Loading singers...</div></div></div>
  }

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ marginBottom: '20px', color: '#1a1a2e' }}>Singers</h2>
        
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Singer Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ flex: 1 }}
            />
            <input
              type="text"
              placeholder="Music Style"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              style={{ flex: 1 }}
            />
            <button type="submit">
              {editingId ? 'Update Singer' : 'Add Singer'}
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
                <th>Singer ID</th>
                <th>Name</th>
                <th>Style</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {singers.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', color: '#999' }}>
                    No singers found
                  </td>
                </tr>
              ) : (
                singers.map((singer) => (
                  <tr key={singer.singerId}>
                    <td>{singer.singerId}</td>
                    <td>{singer.name}</td>
                    <td>{singer.style}</td>
                    <td>
                      <div className="action-buttons">
                        <button onClick={() => handleEdit(singer)}>Edit</button>
                        <button 
                          onClick={() => handleDelete(singer.singerId)}
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
