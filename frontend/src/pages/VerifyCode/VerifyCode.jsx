import { useRef, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import api from '../../services/api'

import Alert from '../../components/Alert/Alert'

import '../../styles/auth.css'
import '../VerifyCode/VerifyCode.css'

function VerifyCode() {

  /*
  |--------------------------------------------------------------------------
  | STATES
  |--------------------------------------------------------------------------
  */

  const [code, setCode] = useState(
    ['', '', '', '', '', '']
  )

  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  /*
  |--------------------------------------------------------------------------
  | NAVEGAÇÃO
  |--------------------------------------------------------------------------
  */

  const navigate = useNavigate()

  /*
  |--------------------------------------------------------------------------
  | REFS INPUTS
  |--------------------------------------------------------------------------
  */

  const inputsRef = useRef([])

  /*
  |--------------------------------------------------------------------------
  | EMAIL
  |--------------------------------------------------------------------------
  */

  const email = localStorage.getItem(
    'verificationEmail'
  )

  /*
  |--------------------------------------------------------------------------
  | DIGITAR CÓDIGO
  |--------------------------------------------------------------------------
  */

  function handleChange(value, index) {

    /*
    |--------------------------------------------------------------------------
    | SOMENTE NÚMEROS
    |--------------------------------------------------------------------------
    */

    if (!/^\d?$/.test(value)) return

    const updatedCode = [...code]

    updatedCode[index] = value

    setCode(updatedCode)

    /*
    |--------------------------------------------------------------------------
    | AUTO NEXT
    |--------------------------------------------------------------------------
    */

    if (
      value &&
      index < 5 &&
      inputsRef.current[index + 1]
    ) {

      inputsRef.current[index + 1].focus()
    }
  }

  /*
  |--------------------------------------------------------------------------
  | BACKSPACE
  |--------------------------------------------------------------------------
  */

  function handleKeyDown(e, index) {

    if (
      e.key === 'Backspace' &&
      !code[index] &&
      index > 0 &&
      inputsRef.current[index - 1]
    ) {

      inputsRef.current[index - 1].focus()
    }
  }

  /*
  |--------------------------------------------------------------------------
  | VERIFICAR
  |--------------------------------------------------------------------------
  */

  async function handleVerify(e) {

    e.preventDefault()

    /*
    |--------------------------------------------------------------------------
    | VALIDAR CÓDIGO COMPLETO
    |--------------------------------------------------------------------------
    */

    const finalCode = code.join('')

    if (finalCode.length < 6) {

      setMessageType('error')

      setMessage(
        'Digite o código completo'
      )

      return
    }

    try {

      const response = await api.post(
        '/auth/verify-email',
        {
          email,
          code: finalCode
        }
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
      | LIMPAR LOCAL STORAGE
      |--------------------------------------------------------------------------
      */

      localStorage.removeItem(
        'verificationEmail'
      )

      /*
      |--------------------------------------------------------------------------
      | REDIRECIONAR
      |--------------------------------------------------------------------------
      */

      setTimeout(() => {

        navigate('/login')

      }, 1500)

    } catch (error) {

      setMessageType('error')

      setMessage(
        error.response?.data?.error ||
        'Erro ao verificar código'
      )
    }
  }

  return (

    <div className="auth-container">

      <form
        className="auth-card"
        onSubmit={handleVerify}
      >

        <Alert
          message={message}
          type={messageType}
        />

        <h2 className="auth-title">
          Verificação
        </h2>

        <p className="auth-subtitle">
          Digite o código enviado
          para seu email
        </p>

        <div className="code-container">

          {
            code.map((digit, index) => (

            
              <input
                key={`code-input-${index}`}

                ref={(el) => {

                  if (el) {

                    inputsRef.current[index] = el
                  }
                }}

                type="text"

                maxLength="1"

                value={digit}

                className="code-input"

                onChange={(e) =>
                  handleChange(
                    e.target.value,
                    index
                  )
                }

                onKeyDown={(e) =>
                  handleKeyDown(
                    e,
                    index
                  )
                }
              />
            ))
          }

        </div>

        <button
          type="submit"
          className="auth-button"
        >
          VERIFICAR
        </button>

      </form>

    </div>
  )
}

export default VerifyCode