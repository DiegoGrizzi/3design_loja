import Header from '../../components/Header/Header'

import {
  Link
} from 'react-router-dom'

import {
  useEffect,
  useState
} from 'react'

import {
  ArrowUpRight,
  FileCode2,
  Cpu,
  Layers3,
  Package,
  X
} from 'lucide-react'

import './Home.css'

function Home() {

  const [activeModal, setActiveModal] =
  useState(null)

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

      {/* =============================================================== */}
      {/* HERO */}
      {/* =============================================================== */}

      <section className="hero">

        <div className="hero-overlay"></div>

        <div className="hero-content fade-up">

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

      {/* =============================================================== */}
      {/* PRODUTOS */}
      {/* =============================================================== */}

      <section className="featured-section fade-up">

        <div className="section-header">

          <span>
            PRODUTOS
          </span>

          <h2>
            Produtos em destaque
          </h2>

        </div>

        <div className="featured-grid">

          {/* CARD 1 */}

          <div className="product-card">

            <span className="product-badge">
              DESTAQUE
            </span>

            <button className="product-link">

              <ArrowUpRight size={18} />

            </button>

            <div className="product-image">

              <img
                src="/images/decoracao.png"
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

          {/* CARD 2 */}

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

          {/* CARD 3 */}

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

      {/* =============================================================== */}
{/* PROCESSO */}
{/* =============================================================== */}

<section className="process-section fade-up">

  <div className="section-header">

    <span>
      // PROCESSO
    </span>

    <h2>
      Da ideia ao objeto
    </h2>

  </div>

  <div className="process-grid">

    {/* CARD 1 */}

    <button
      type="button"
      className="process-card"
      onClick={() => setActiveModal('modelo')}
    >

      <div className="process-icon">

        <FileCode2 size={34} />

      </div>

      <div className="process-number">
        01
      </div>

      <h3>
        MODELO
      </h3>

      <p>
        Design digital 3D
      </p>

    </button>

    {/* CARD 2 */}

    <button
      type="button"
      className="process-card"
      onClick={() => setActiveModal('fatiamento')}
    >

      <div className="process-icon">

        <Cpu size={34} />

      </div>

      <div className="process-number">
        02
      </div>

      <h3>
        FATIAMENTO
      </h3>

      <p>
        Conversão em G-code
      </p>

    </button>

    {/* CARD 3 */}

    <button
      type="button"
      className="process-card"
      onClick={() => setActiveModal('impressao')}
    >

      <div className="process-icon">

        <Layers3 size={34} />

      </div>

      <div className="process-number">
        03
      </div>

      <h3>
        IMPRESSÃO
      </h3>

      <p>
        Camada por camada
      </p>

    </button>

    {/* CARD 4 */}

    <button
      type="button"
      className="process-card"
      onClick={() => setActiveModal('entrega')}
    >

      <div className="process-icon">

        <Package size={34} />

      </div>

      <div className="process-number">
        04
      </div>

      <h3>
        ENTREGA
      </h3>

      <p>
        Produto finalizado
      </p>

    </button>

  </div>

</section>

      {/* =============================================================== */}
      {/* TICKER */}
      {/* =============================================================== */}

      <section className="ticker">

        <div className="ticker-track">

          <span>IMPRESSÃO 3D</span>
          <span>◆</span>
          <span>ALTA PRECISÃO</span>
          <span>◆</span>
          <span>PLA</span>
          <span>◆</span>
          <span>PETG</span>
          <span>◆</span>
          <span>ABS</span>
          <span>◆</span>
          <span>RESINA</span>
          <span>◆</span>
          <span>PROTOTIPAGEM</span>
          <span>◆</span>
          <span>DESIGN PARAMÉTRICO</span>

          <span>IMPRESSÃO 3D</span>
          <span>◆</span>
          <span>ALTA PRECISÃO</span>
          <span>◆</span>
          <span>PLA</span>
          <span>◆</span>
          <span>PETG</span>
          <span>◆</span>
          <span>ABS</span>
          <span>◆</span>
          <span>RESINA</span>
          <span>◆</span>
          <span>PROTOTIPAGEM</span>
          <span>◆</span>
          <span>DESIGN PARAMÉTRICO</span>

        </div>

      </section>

      {/* =============================================================== */}
{/* MODAL */}
{/* =============================================================== */}

{
  activeModal && (

    <div
      className="modal-overlay"
      role="button"
      tabIndex={0}
      onClick={() => setActiveModal(null)}
      onKeyDown={(e) => {

        if (e.key === 'Escape') {

          setActiveModal(null)
        }
      }}
    >

      <div
        className="process-modal"
        onClick={(e) => e.stopPropagation()}
      >

        <button
          type="button"
          className="close-modal"
          onClick={() => setActiveModal(null)}
          aria-label="Fechar modal"
        >

          <X size={20} />

        </button>

        <h2>

          {activeModal.toUpperCase()}

        </h2>

        <p>

          {
            activeModal === 'modelo' &&
            'A modelagem 3D é a primeira etapa do processo. Nela criamos ou ajustamos o objeto digital que será transformado em uma peça física.'
          }

          {
            activeModal === 'fatiamento' &&
            'O modelo é preparado em um software de fatiamento que converte o arquivo 3D em instruções para a impressora, definindo camadas, velocidade e qualidade.'
          }

          {
            activeModal === 'impressao' &&
            'A impressora constrói o objeto camada por camada utilizando o material selecionado, garantindo precisão e qualidade no resultado final.'
          }

          {
            activeModal === 'entrega' &&
            'Após inspeção e acabamento, o produto é embalado e entregue ao cliente pronto para uso.'
          }

        </p>

      </div>

    </div>

  )
}

      {/* =============================================================== */}
      {/* FOOTER */}
      {/* =============================================================== */}

      <footer className="footer">

        <div className="footer-brand">

          <h2>
            <span>3</span>Design
          </h2>

          <p>
            Transformando ideias digitais
            em objetos físicos com precisão.
          </p>

        </div>

        <div className="footer-links">

          <h3>
            // NAVEGAÇÃO
          </h3>

     <Link to="/">
  Início
</Link>

<Link to="/catalogo">
  Catálogo
</Link>

        </div>

        <div className="footer-materials">

          <h3>
            // MATERIAIS
          </h3>

          <div className="material-tags">

            <span>PLA</span>

            <span>PETG</span>

            <span>ABS</span>

            <span>RESINA</span>

            <span>TPU</span>

            <span>NYLON</span>

          </div>

        </div>

      </footer>

    </div>
  )
}

export default Home
