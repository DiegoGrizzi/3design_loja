/*
|--------------------------------------------------------------------------
| REACT
|--------------------------------------------------------------------------
*/

import {
  useEffect,
  useState
} from 'react'

/*
|--------------------------------------------------------------------------
| REACT ROUTER
|--------------------------------------------------------------------------
*/

import {
  Link
} from 'react-router-dom'

/*
|--------------------------------------------------------------------------
| ICONS
|--------------------------------------------------------------------------
*/

import {
  ShoppingCart,
  LayoutGrid,
  User,
  LogOut
} from 'lucide-react'

/*
|--------------------------------------------------------------------------
| CSS
|--------------------------------------------------------------------------
*/

import './Header.css'

function Header() {

  /*
  |--------------------------------------------------------------------------
  | STATE
  |--------------------------------------------------------------------------
  */

  const [isLogged, setIsLogged] =
    useState(false)

  /*
  |--------------------------------------------------------------------------
  | VERIFICAR TOKEN
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    const token =
      localStorage.getItem('token')

    setIsLogged(!!token)

  }, [])

  /*
  |--------------------------------------------------------------------------
  | LOGOUT
  |--------------------------------------------------------------------------
  */

  function handleLogout() {

    localStorage.removeItem('token')

    localStorage.removeItem('user')

    setIsLogged(false)
  }

  return (

    <header className="header">

      {/* ---------------------------------------------------------------- */}
      {/* LOGO */}
      {/* ---------------------------------------------------------------- */}

      <div className="header-logo">

        <div className="logo-square">
          <div></div>
        </div>

        <h1>
          <span>3</span>Design
        </h1>

      </div>

      {/* ---------------------------------------------------------------- */}
      {/* MENU */}
      {/* ---------------------------------------------------------------- */}

      <nav className="header-nav">

        <button type="button">
          INÍCIO
        </button>

        <button type="button">
          CATÁLOGO
        </button>

      </nav>

      {/* ---------------------------------------------------------------- */}
      {/* ACTIONS */}
      {/* ---------------------------------------------------------------- */}

      <div className="header-actions">

        <button type="button">

          <ShoppingCart size={18} />

        </button>

        <button type="button">

          <LayoutGrid size={18} />

        </button>

        {
          isLogged ? (

            <button
              type="button"
              onClick={handleLogout}
            >

              <LogOut size={18} />

            </button>

          ) : (

<Link to="/login">

  <User size={18} />

</Link>
          )
        }

      </div>

    </header>
  )
}

export default Header