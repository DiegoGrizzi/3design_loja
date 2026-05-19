
import Header from '../../components/Header/Header'
import {useEffect} from 'react'
import {ArrowUpRight} from 'lucide-react'

import './Home.css'

function Home() {

  /*
|--------------------------------------------------------------------------
| SCROLL ANIMATION
|--------------------------------------------------------------------------
*/

useEffect(() => {

  const elements =
    document.querySelectorAll('.fade-up')

  const observer =
    new IntersectionObserver(

      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              'show'
            )
          }
        })
      },

      {
        threshold: 0.15
      }
    )

  elements.forEach((el) => {
    observer.observe(el)
  })

  return () => {

    elements.forEach((el) => {
      observer.unobserve(el)
    })
  }

}, [])

  return (

    <div className="home">

      <Header />

      <section className="hero">

        <div className="hero-overlay"></div>

        <div className="hero-content">

          <span className="hero-mini-title">
            FABRICAÇÃO ADITIVA
          </span>

          <h1>

            Do digital
            <br />

            ao <span>físico.</span>

          </h1>

          <p>

            Impressão 3D de alta precisão.

          </p>

        </div>

      </section>

<section className="featured-section fade-up">

  <div className="section-header">

    <span>PRODUTOS</span>

    <h2>
      Produtos em destaque
    </h2>

  </div>

  <div className="featured-grid">

    {/* --------------------------------------------------------------- */}
    {/* CARD 1 */}
    {/* --------------------------------------------------------------- */}

    <div className="product-card">

      <span className="product-badge">
        DESTAQUE
      </span>
<button className="product-link">

  <ArrowUpRight size={18} />

</button>
      <div className="product-image">

        <img
          src="/images/placeholder.png"
          alt=""
        />

      </div>

      <div className="product-info">

        <div>

          <h3>
            Produto
          </h3>

          <p>
            Categoria
          </p>

        </div>

        <span>
          R$ 0,00
        </span>

      </div>

    </div>

    {/* --------------------------------------------------------------- */}
    {/* CARD 2 */}
    {/* --------------------------------------------------------------- */}

    <div className="product-card">

      <span className="product-badge">
        DESTAQUE
      </span>
      <button className="product-link">

  <ArrowUpRight size={18} />

</button>

      <div className="product-image">

        <img
          src="/images/placeholder.png"
          alt=""
        />

      </div>

      <div className="product-info">

        <div>

          <h3>
            Produto
          </h3>

          <p>
            Categoria
          </p>

        </div>

        <span>
          R$ 0,00
        </span>

      </div>

    </div>

    {/* --------------------------------------------------------------- */}
    {/* CARD 3 */}
    {/* --------------------------------------------------------------- */}

    <div className="product-card">

      <span className="product-badge">
        DESTAQUE
      </span>

      <button className="product-link">

  <ArrowUpRight size={18} />

</button>

      <div className="product-image">

        <img
          src="/images/placeholder.png"
          alt=""
        />

      </div>

      <div className="product-info">

        <div>

          <h3>
            Produto
          </h3>

          <p>
            Categoria
          </p>

        </div>

        <span>
          R$ 0,00
        </span>

      </div>

    </div>

  </div>

</section>
    </div>
  )
}

export default Home