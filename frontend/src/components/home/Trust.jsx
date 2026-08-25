import { useEffect, useRef, useState } from 'react'
import { SectionHeading } from '../shared/SectionHeading'
import { CLIENTS } from '../../data/clients'
import { TESTIMONIALS } from '../../data/testimonials'
import './Trust.css'

const LOGO_LOOP = [...CLIENTS, ...CLIENTS]

export function Trust() {
  const trackRef = useRef(null)
  const cardRefs = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (mostVisible) {
          const index = cardRefs.current.indexOf(mostVisible.target)
          if (index !== -1) setActiveIndex(index)
        }
      },
      { root: track, threshold: [0.6] },
    )

    cardRefs.current.forEach((card) => card && observer.observe(card))
    return () => observer.disconnect()
  }, [])

  function scrollToIndex(index) {
    const card = cardRefs.current[index]
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
    }
  }

  function goPrev() {
    scrollToIndex(Math.max(activeIndex - 1, 0))
  }

  function goNext() {
    scrollToIndex(Math.min(activeIndex + 1, TESTIMONIALS.length - 1))
  }

  return (
    <section className="section section--generous trust">
      <div className="container">
        <SectionHeading
          title="Empresas que confiam na LS"
          description="Prova real de quem já resolveu a contabilidade com a gente — dos nossos clientes aos depoimentos de quem usa o serviço no dia a dia."
        />

        <div className="trust__logos-marquee">
          <div className="trust__logos-track">
            {LOGO_LOOP.map((client, index) => (
              <div className="trust__logo" key={`${client.name}-${index}`} title={client.name}>
                <img src={client.logo} alt={client.name} loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div className="trust__testimonials-carousel">
          <div className="trust__testimonials-track" ref={trackRef}>
            {TESTIMONIALS.map((testimonial, index) => (
              <blockquote
                className="trust__testimonial"
                key={testimonial.name}
                ref={(el) => {
                  cardRefs.current[index] = el
                }}
              >
                <p className="trust__quote">“{testimonial.quote}”</p>
                <cite className="trust__name">{testimonial.name}</cite>
              </blockquote>
            ))}
          </div>

          <div className="trust__testimonials-controls">
            <button
              type="button"
              className="trust__arrow"
              onClick={goPrev}
              disabled={activeIndex === 0}
              aria-label="Depoimento anterior"
            >
              ‹
            </button>

            <div className="trust__dots">
              {TESTIMONIALS.map((testimonial, index) => (
                <button
                  key={testimonial.name}
                  type="button"
                  className={`trust__dot ${index === activeIndex ? 'trust__dot--active' : ''}`}
                  aria-label={`Ver depoimento de ${testimonial.name}`}
                  onClick={() => scrollToIndex(index)}
                />
              ))}
            </div>

            <button
              type="button"
              className="trust__arrow"
              onClick={goNext}
              disabled={activeIndex === TESTIMONIALS.length - 1}
              aria-label="Próximo depoimento"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
