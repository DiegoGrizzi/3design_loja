import {
  Routes,
  Route
} from 'react-router-dom'

import Home from './pages/Home/Home'

import Register from './pages/Register/Register'

import VerifyCode from './pages/VerifyCode/VerifyCode'

import Login from './pages/Login/Login'

function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/verify-code"
        element={<VerifyCode />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

    </Routes>
  )
}

export default App