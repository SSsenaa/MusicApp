import { Routes, Route, Link } from 'react-router-dom'
import SingersPage from './pages/SingersPage'
import AlbumsPage from './pages/AlbumsPage'

function App() {
  return (
    <div>
      <nav style={{ background: '#1a1a2e', padding: '12px 24px', display: 'flex', gap: '20px', alignItems: 'center' }}>
        <span style={{ color: '#e94560', fontWeight: 'bold', fontSize: '20px', marginRight: '20px' }}>🎵 Music App</span>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', padding: '6px 14px', borderRadius: '4px', background: '#16213e' }}>Singers</Link>
        <Link to="/albums" style={{ color: 'white', textDecoration: 'none', padding: '6px 14px', borderRadius: '4px', background: '#16213e' }}>Albums</Link>
      </nav>
      <Routes>
        <Route path="/" element={<SingersPage />} />
        <Route path="/albums" element={<AlbumsPage />} />
      </Routes>
    </div>
  )
}

export default App
