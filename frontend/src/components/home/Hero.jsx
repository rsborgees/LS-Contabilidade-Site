import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import heroImage1 from '../../assets/hero-accounting-1.jpg'
import heroImage2 from '../../assets/hero-accounting-2.jpg'
import heroImage3 from '../../assets/hero-accounting-3.jpg'
import { WhatsappButton } from '../shared/WhatsappButton'
import { SLOGAN } from '../../lib/constants'
import './Hero.css'

const SLIDES = [heroImage1, heroImage2, heroImage3]
const SLIDE_INTERVAL_MS = 5500

function slideOffset(slideIndex, activeIndex, total) {
  let offset = slideIndex - activeIndex
  if (offset > total / 2) offset -= total
  if (offset < -total / 2) offset += total
  return offset
}

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % SLIDES.length)
    }, SLIDE_INTERVAL_MS)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="hero">
      <div className="hero__slides" aria-hidden="true">
        {SLIDES.map((slide, index) => (
          <img
            key={slide}
            src={slide}
            alt=""
            className="hero__slide"
            style={{ transform: `translateX(${slideOffset(index, activeIndex, SLIDES.length) * 100}%)` }}
          />
        ))}
      </div>
      <div className="hero__scrim" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__copy">
          <h1 className="hero__title">{SLOGAN}</h1>
          <p className="hero__description">
            Estamos em Salvador/BA e atendemos em todo o Brasil. Venha ser nosso cliente!
          </p>
          <div className="hero__actions">
            <WhatsappButton message="Olá! Quero abrir uma empresa com a LS Contabilidade.">
              Falar no WhatsApp
            </WhatsappButton>
            <Link to="/servicos" className="btn btn--outline btn--outline-on-dark">
              Conhecer os serviços
            </Link>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <strong>10 anos</strong>
              <span>de mercado</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <strong>100 empresas</strong>
              <span>abertas por nós</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__dots">
        {SLIDES.map((slide, index) => (
          <button
            key={slide}
            type="button"
            className={`hero__dot ${index === activeIndex ? 'hero__dot--active' : ''}`}
            aria-label={`Mostrar imagem ${index + 1} de ${SLIDES.length}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </section>
  )
}
