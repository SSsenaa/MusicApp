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
      setError('Şarkıcılar yüklenemedi: ' + (err.response?.data?.message || err.message))
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name.trim() || !style.trim()) {
      setError('İsim ve müzik stili zorunludur.')
      return
    }

    try {
      const singerData = { name: name.trim(), style: style.trim() }

      if (editingId) {
        await updateSinger(editingId, singerData)
        setSuccess('Şarkıcı başarıyla güncellendi!')
      } else {
        await addSinger(singerData)
        setSuccess('Şarkıcı başarıyla eklendi!')
      }

      resetForm()
      fetchSingers()
    } catch (err) {
      setError('Şarkıcı kaydedilemedi: ' + (err.response?.data?.message || err.message))
    }
  }

  const resetForm = () => {
    setName('')
    setStyle('')
    setEditingId(null)
    setError('')
  }

  const handleEdit = (singer) => {
    setEditingId(singer.singerId)
    setName(singer.name)
    setStyle(singer.style)
    setError('')
    setSuccess('')
  }

  const handleCancel = () => {
    resetForm()
    setSuccess('')
  }

  const handleDelete = async (singerId) => {
    if (window.confirm('Bu şarkıcıyı silmek istediğinize emin misiniz?')) {
      try {
        await deleteSinger(singerId)
        setSuccess('Şarkıcı başarıyla silindi!')
        setError('')
        fetchSingers()
      } catch (err) {
        // Backend ilişkili albüm varsa 400 döndürüyor, mesajı göster
        setError('Şarkıcı silinemedi: ' + (err.response?.data?.message || err.message))
      }
    }
  }

  if (loading) {
    return <div className="container"><div className="card"><div className="loading">Şarkıcılar yükleniyor...</div></div></div>
  }

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ marginBottom: '20px', color: '#1a1a2e' }}>Şarkıcılar</h2>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Şarkıcı Adı"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ flex: 1 }}
            />
            <input
              type="text"
              placeholder="Müzik Stili"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              style={{ flex: 1 }}
            />
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
                <th>Şarkıcı Adı</th>
                <th>Müzik Stili</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {singers.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', color: '#999' }}>
                    Henüz şarkıcı yok
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
                        <button onClick={() => handleEdit(singer)}>Düzenle</button>
                        <button
                          onClick={() => handleDelete(singer.singerId)}
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
