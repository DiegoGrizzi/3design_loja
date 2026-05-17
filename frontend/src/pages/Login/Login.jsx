import { useState } from 'react'

import { useNavigate, Link} from 'react-router-dom'


import api from '../../services/api'

import Alert from '../../components/Alert/Alert'

import '../../styles/auth.css'
import './Login.css'

function Login() {

  /*
  |--------------------------------------------------------------------------
  | STATES
  |--------------------------------------------------------------------------
  */

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  /*
  |--------------------------------------------------------------------------
  | LOGO
  |--------------------------------------------------------------------------
  */

  const [logoError, setLogoError] = useState(false)

  /*
  |--------------------------------------------------------------------------
  | NAVEGAÇÃO
  |--------------------------------------------------------------------------
  */

  const navigate = useNavigate()

  /*
  |--------------------------------------------------------------------------
  | LOGIN
  |--------------------------------------------------------------------------
  */

  async function handleLogin(e) {

    e.preventDefault()

    try {

      const response = await api.post(
        '/auth/login',
        {
          email,
          password
        }
      )

      /*
      |--------------------------------------------------------------------------
      | SALVAR TOKEN
      |--------------------------------------------------------------------------
      */

      localStorage.setItem(
        'token',
        response.data.token
      )

      localStorage.setItem(
        'user',
        JSON.stringify(response.data.user)
      )

      /*
      |--------------------------------------------------------------------------
      | ALERTA
      |--------------------------------------------------------------------------
      */

      setMessage(response.data.message)

      setMessageType('success')

      /*
      |--------------------------------------------------------------------------
      | REDIRECIONAR
      |--------------------------------------------------------------------------
      */

      setTimeout(() => {

        navigate('/dashboard')

      }, 700)

    } catch (error) {

      setMessageType('error')

      setMessage(
        error.response?.data?.error ||
        'Erro ao realizar login'
      )
    }
  }

  return (

    <div className="auth-container">

      <form
        className="auth-card"
        onSubmit={handleLogin}
      >

        <Alert
          message={message}
          type={messageType}
        />

        <div className="logo">

          <div className="logo-square">
            <div></div>
          </div>

          {
            logoError ? (

              <h1>
                <span className="logo-number">
                  3
                </span>

                {'DESIGN'}
              </h1>

            ) : (

              <img
                src="/images/logo.png"
                alt="Logo"
                className="logo-image"
                onError={() => setLogoError(true)}
              />

            )
          }

        </div>

        <h2 className="auth-title">
          Entrar
        </h2>

        <p className="auth-subtitle">
          Faça login para acessar
          sua conta
        </p>

        <div className="form-group">

          <label>
            EMAIL
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

        </div>

        <div className="form-group">

          <label>
            SENHA
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

        </div>

        <button
          type="submit"
          className="auth-button"
        >
          ENTRAR
        </button>
        <div className="auth-links">

  <span>
    Não possui conta ? 
  </span>

  <Link to="/register">

    Criar conta

  </Link>

</div>

      </form>

    </div>
  )
}

export default Login