import { useState } from 'react'

import { useNavigate, Link } from 'react-router-dom'

import api from '../../services/api'

import Alert from '../../components/Alert/Alert'

/*
|--------------------------------------------------------------------------
| CSS
|--------------------------------------------------------------------------
*/

import '../../styles/auth.css'
import './Register.css'

function Register() {

  /*
  |--------------------------------------------------------------------------
  | NAVEGAÇÃO
  |--------------------------------------------------------------------------
  */

  const navigate = useNavigate()

  /*
  |--------------------------------------------------------------------------
  | STATES
  |--------------------------------------------------------------------------
  */

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  /*
  |--------------------------------------------------------------------------
  | ALERTAS
  |--------------------------------------------------------------------------
  */

  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  /*
  |--------------------------------------------------------------------------
  | CONTROLE DA LOGO
  |--------------------------------------------------------------------------
  */

  const [logoError, setLogoError] = useState(false)

  /*
  |--------------------------------------------------------------------------
  | CADASTRO
  |--------------------------------------------------------------------------
  */

  async function handleRegister(e) {

    e.preventDefault()

    try {

      const response = await api.post(
        '/auth/register',
        {
          name,
          email,
          password
        }
      )

      /*
      |--------------------------------------------------------------------------
      | SALVAR EMAIL
      |--------------------------------------------------------------------------
      */

      localStorage.setItem(
        'verificationEmail',
        email
      )

      /*
      |--------------------------------------------------------------------------
      | ALERTA SUCESSO
      |--------------------------------------------------------------------------
      */

      setMessage(response.data.message)

      setMessageType('success')

      /*
      |--------------------------------------------------------------------------
      | LIMPAR CAMPOS
      |--------------------------------------------------------------------------
      */

      setName('')
      setEmail('')
      setPassword('')

      /*
      |--------------------------------------------------------------------------
      | REDIRECIONAR
      |--------------------------------------------------------------------------
      */

      setTimeout(() => {

        navigate('/verify-code')

      }, 700)

    } catch (error) {

      console.error(error)

      setMessageType('error')

      /*
      |--------------------------------------------------------------------------
      | TRATAMENTO DE ERROS
      |--------------------------------------------------------------------------
      */

      if (error.response) {

        setMessage(
          error.response.data.error
        )

      } else if (error.request) {

        setMessage(
          'Backend não respondeu'
        )

      } else {

        setMessage(
          'Erro ao cadastrar usuário'
        )
      }
    }
  }

  return (

    <div className="auth-container">

      <form
        className="auth-card"
        onSubmit={handleRegister}
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
          Criar Conta
        </h2>

        <p className="auth-subtitle">
          Crie sua conta para acessar a plataforma
        </p>

        <div className="form-group">

          <label htmlFor="name">
            NOME
          </label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

        </div>

        <div className="form-group">

          <label htmlFor="email">
            EMAIL
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

        </div>

        <div className="form-group">

          <label htmlFor="password">
            SENHA
          </label>

          <input
            id="password"
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
          CRIAR CONTA
        </button>

        <div className="auth-links">

  <span>
    Já possui conta?
  </span>

  <Link to="/login">

    Entrar

  </Link>

</div>

      </form>

    </div>
  )
}

export default Register