import { useEffect, useState } from 'react'
import './ContactForm.css'

function emptyForm(defaultSubject, initialPlan) {
  return {
    name: '',
    phone: '',
    email: '',
    subject: defaultSubject,
    plan: initialPlan || '',
    message: '',
    company: '',
  }
}

export function ContactForm({ defaultSubject = '', planOptions, initialPlan = '' }) {
  const [form, setForm] = useState(() => emptyForm(defaultSubject, initialPlan))
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (initialPlan) {
      setForm((current) => ({ ...current, plan: initialPlan }))
    }
  }, [initialPlan])

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setStatus('sending')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error('Falha ao enviar o formulário')
      }

      setStatus('success')
      setForm(emptyForm(defaultSubject, initialPlan))
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="company"
        value={form.company}
        onChange={handleChange}
        className="contact-form__honeypot"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      {status === 'success' && (
        <p className="contact-form__notice contact-form__notice--success">
          Mensagem enviada com sucesso! Em breve entraremos em contato.
        </p>
      )}
      {status === 'error' && (
        <p className="contact-form__notice contact-form__notice--error">
          Não foi possível enviar sua mensagem agora. Tente novamente em instantes.
        </p>
      )}

      <div className="contact-form__row">
        <label className="contact-form__field">
          <span>Nome</span>
          <input type="text" name="name" required value={form.name} onChange={handleChange} />
        </label>
        <label className="contact-form__field">
          <span>Telefone</span>
          <input type="tel" name="phone" required value={form.phone} onChange={handleChange} />
        </label>
      </div>

      <div className="contact-form__row">
        <label className="contact-form__field">
          <span>E-mail</span>
          <input type="email" name="email" required value={form.email} onChange={handleChange} />
        </label>
        <label className="contact-form__field">
          <span>Assunto</span>
          <input type="text" name="subject" required value={form.subject} onChange={handleChange} />
        </label>
      </div>

      {planOptions && (
        <label className="contact-form__field">
          <span>Plano desejado</span>
          <select name="plan" required value={form.plan} onChange={handleChange}>
            <option value="" disabled>
              Selecione um plano
            </option>
            {planOptions.map((plan) => (
              <option value={plan} key={plan}>
                {plan}
              </option>
            ))}
          </select>
        </label>
      )}

      <label className="contact-form__field">
        <span>Mensagem</span>
        <textarea name="message" rows={5} required value={form.message} onChange={handleChange} />
      </label>

      <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
        {status === 'sending' ? 'Enviando...' : 'Enviar mensagem'}
      </button>
    </form>
  )
}
