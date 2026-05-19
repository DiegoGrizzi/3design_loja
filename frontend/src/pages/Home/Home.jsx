
import Header from '../../components/Header/Header'


import './Home.css'

function Home() {

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

    </div>
  )
}

export default Home