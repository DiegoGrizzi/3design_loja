import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

import Register from './pages/Register/Register'
import VerifyCode from './pages/VerifyCode/VerifyCode'
import Login from './pages/Login/Login'

import './styles/global.css'

function App() {

  return (

    <Routes>

      <Route
        path="/login"
        element={<Login />}
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
        path="*"
        element={
          <Navigate to="/login" />
        }
      />

    </Routes>
  )
}

export default App