import { Routes, Route }
from 'react-router-dom'

import Register
from '../pages/Register/Register'

import VerifyCode
from '../pages/VerifyCode/VerifyCode'

function AppRoutes() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Register />}
      />

      <Route
        path="/verify-code"
        element={<VerifyCode />}
      />

    </Routes>
  )
}

export default AppRoutes