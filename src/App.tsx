import './App.css'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './auth/ProtectedRoute'
import MainLayout from './layout/MainLayout'
import { LoginPage } from '@pages/LoginPage'
import HomePage from '@pages/HomePage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/public" element={<>Public Page</>} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage/>} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
