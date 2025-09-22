import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedLayout from './components/ProtectedLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import ChatWidget from './components/ChatWidget';
function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Publicas */}
        <Route path='/' element={<h1>Home page</h1>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Rutas Protegidas */}
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
          <Route path="/profile" element={<h1>Profile</h1>} />
        </Route>
      </Routes>
      <ChatWidget />
    </BrowserRouter>
  )
}
export default App
