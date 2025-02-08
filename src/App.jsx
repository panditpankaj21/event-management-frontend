import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Register from './pages/Register'
import EditEventModal from './components/EditEventModal'
import EventDetails from './components/EventDetails'

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
                <Navbar />
                <Home />
            </ProtectedRoute>
          }/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-event" element = {
            <ProtectedRoute>
              <EditEventModal />
            </ProtectedRoute>
          }/>
          <Route path="/events/:id" element={
            <ProtectedRoute>
              <EventDetails/>
            </ProtectedRoute>
          }/>
        </Routes>
    </BrowserRouter>
  )
}

export default App