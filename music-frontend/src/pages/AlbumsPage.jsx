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
      setError('Veri yüklenemedi: ' + (err.response?.data?.message || err.message))
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim()) {
      setError('Albüm adı zorunludur.')
      return
    }
    if (!singerId) {
      setError('Şarkıcı seçimi zorunludur.')
      return
    }

    try {
      const albumData = {
        title: title.trim(),
        year: year ? parseInt(year) : null,
        singerId: parseInt(singerId)
      }

      if (editingId) {
        await updateAlbum(editingId, { albumId: editingId, ...albumData })
        setSuccess('Albüm başarıyla güncellendi!')
      } else {
        await addAlbum(albumData)
        setSuccess('Albüm başarıyla eklendi!')
      }

      resetForm()
      fetchData()
    } catch (err) {
      setError('Albüm kaydedilemedi: ' + (err.response?.data?.message || err.message))
    }
  }

  const resetForm = () => {
    setTitle('')
    setYear('')
    setSingerId('')
    setEditingId(null)
    setError('')
  }

  const handleEdit = (album) => {
    setEditingId(album.albumId)
    setTitle(album.title)
    setYear(album.year ? album.year.toString() : '')
    // Backend artık singerId de döndürüyor — direkt kullan
    setSingerId(album.singerId ? album.singerId.toString() : '')
    setError('')
    setSuccess('')
  }

  const handleCancel = () => {
    resetForm()
    setSuccess('')
  }

  const handleDelete = async (albumId) => {
    if (window.confirm('Bu albümü silmek istediğinize emin misiniz?')) {
      try {
        await deleteAlbum(albumId)
        setSuccess('Albüm başarıyla silindi!')
        setError('')
        fetchData()
      } catch (err) {
        setError('Albüm silinemedi: ' + (err.response?.data?.message || err.message))
      }
    }
  }

  if (loading) {
    return <div className="container"><div className="card"><div className="loading">Albümler yükleniyor...</div></div></div>
  }

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ marginBottom: '20px', color: '#1a1a2e' }}>Albümler</h2>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Albüm Adı"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ flex: 1 }}
            />
            <input
              type="number"
              placeholder="Yıl"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              min="1900"
              max="2100"
              style={{ flex: 0.8 }}
            />
            <select
              value={singerId}
              onChange={(e) => setSingerId(e.target.value)}
              style={{ flex: 1 }}
            >
              <option value="">Şarkıcı Seç</option>
              {singers.map((singer) => (
                <option key={singer.singerId} value={singer.singerId}>
                  {singer.name}
                </option>
              ))}
            </select>
            <button type="submit">
              {editingId ? 'Güncelle' : 'Ekle'}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancel} className="secondary">
                İptal
              </button>
            )}
          </div>
        </form>

        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Albüm Adı</th>
                <th>Yıl</th>
                <th>Şarkıcı</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {albums.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', color: '#999' }}>
                    Henüz albüm yok
                  </td>
                </tr>
              ) : (
                albums.map((album) => (
                  <tr key={album.albumId}>
                    <td>{album.albumId}</td>
                    <td>{album.title}</td>
                    <td>{album.year ?? '—'}</td>
                    <td>{album.singerName}</td>
                    <td>
                      <div className="action-buttons">
                        <button onClick={() => handleEdit(album)}>Düzenle</button>
                        <button
                          onClick={() => handleDelete(album.albumId)}
                          className="secondary"
                          style={{ background: '#dc3545' }}
                        >
                          Sil
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
