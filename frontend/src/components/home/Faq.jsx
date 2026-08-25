import { useState } from 'react'
import { SectionHeading } from '../shared/SectionHeading'
import { FAQ_ITEMS } from '../../data/faq'
import './Faq.css'

export function Faq() {
  const [openIndex, setOpenIndex] = useState(null)

  function toggle(index) {
    setOpenIndex((current) => (current === index ? null : index))
  }

  return (
    <section className="section section--alt" id="faq">
      <div className="container">
        <SectionHeading title="Perguntas frequentes" />

        <div className="faq__list">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div className="faq__item" key={item.question}>
                <button
                  type="button"
                  className="faq__question"
                  aria-expanded={isOpen}
                  onClick={() => toggle(index)}
                >
                  {item.question}
                  <span className="faq__icon" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && <p className="faq__answer">{item.answer}</p>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
