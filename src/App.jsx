import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Legal from './pages/Legal'
import StockDashboard from './StockDashboard'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<StockDashboard />} />
          <Route path="/legal/privacy" element={<Legal />} />
          <Route path="/legal/impressum" element={<Legal />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
