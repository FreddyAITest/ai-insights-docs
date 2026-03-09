import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    privacy: false,
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message || !formData.privacy) {
      setError('Bitte füllen Sie alle erforderlichen Felder aus und akzeptieren Sie die Datenschutzerklärung.')
      return
    }

    // Simulate form submission (replace with actual API call)
    console.log('Form submitted:', formData)
    setSubmitted(true)
  }

  const faqs = [
    {
      q: 'Wie schnell erhalte ich eine Antwort?',
      a: 'Wir bemühen uns, alle Anfragen innerhalb von 24-48 Stunden während der Geschäftszeiten zu beantworten. Bei dringenden Anliegen empfehlen wir einen Anruf.',
    },
    {
      q: 'Bieten Sie kostenlose Erstberatungen an?',
      a: 'Ja, wir bieten ein unverbindliches 30-minütiges Erstgespräch an, um Ihre Anforderungen kennenzulernen und mögliche Lösungsansätze zu besprechen.',
    },
    {
      q: 'Mit welchen Branchen arbeiten Sie?',
      a: 'Wir arbeiten mit Unternehmen verschiedener Branchen, darunter Finanzdienstleistungen, Gesundheitswesen, Einzelhandel, Fertigung und Technologie.',
    },
    {
      q: 'Unterstützen Sie auch internationale Projekte?',
      a: 'Ja, wir betreuen Kunden europaweit und bieten unsere Dienstleistungen auf Deutsch und Englisch an.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative px-6 py-20 lg:px-8 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600"></div>
          
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-white/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-white/10 rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="mx-auto max-w-7xl text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
              💬 Wir sind hier
            </div>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl mb-6">
              Kontaktieren Sie uns
            </h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
              Wir freuen uns auf Ihre Nachricht und melden uns schnellstmöglich bei Ihnen. 
              Unser Team steht bereit, um Ihre Fragen zu beantworten.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 lg:p-10 shadow-xl border border-gray-100 dark:border-gray-700">
                  <div className="mb-8">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      Nachricht senden
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Füllen Sie das Formular aus und wir melden uns innerhalb von 24-48 Stunden.
                    </p>
                  </div>

                  {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Vorname *
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full rounded-xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                            placeholder="Max"
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Nachname *
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full rounded-xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                            placeholder="Mustermann"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          E-Mail-Adresse *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full rounded-xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                          placeholder="max@beispiel.de"
                        />
                      </div>

                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Firma
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full rounded-xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                          placeholder="Ihr Unternehmen (optional)"
                        />
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Betreff *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full rounded-xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                        >
                          <option value="">Bitte wählen...</option>
                          <option value="allgemein">Allgemeine Anfrage</option>
                          <option value="projekt">Projektanfrage</option>
                          <option value="partnership">Partnerschaft</option>
                          <option value="presse">Presse/Medien</option>
                          <option value="support">Support</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Nachricht *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full rounded-xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 resize-none"
                          placeholder="Wie können wir Ihnen helfen?"
                        />
                      </div>

                      <div>
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            name="privacy"
                            checked={formData.privacy}
                            onChange={handleChange}
                            className="mt-1 h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 transition-colors"
                          />
                          <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                            Ich habe die{' '}
                            <a href="/legal/privacy" className="text-indigo-600 hover:underline font-medium">
                              Datenschutzerklärung
                            </a>{' '}
                            gelesen und stimme zu, dass meine Angaben zur Kontaktaufnahme gespeichert werden.
                          </span>
                        </label>
                      </div>

                      {error && (
                        <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-5 py-4 text-red-700 dark:text-red-300 text-sm">
                          ⚠️ {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        className="group w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition-all duration-200 btn-press disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="flex items-center justify-center gap-2">
                          📤 Nachricht senden
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                      </button>
                    </form>
                  ) : (
                    <div className="text-center py-16">
                      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-5xl shadow-lg shadow-green-500/25">
                        ✅
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                        Vielen Dank für Ihre Nachricht!
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                        Wir haben Ihre Anfrage erhalten und melden uns schnellstmöglich bei Ihnen.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 card-hover border border-gray-100 dark:border-gray-700">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl mb-4 shadow-lg shadow-indigo-500/25 group-hover:scale-110 transition-transform duration-300">
                    🏢
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    Unsere Adresse
                  </h3>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white mb-2">AI Insights GmbH</p>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      Musterstraße 123<br />
                      10115 Berlin<br />
                      Deutschland
                    </p>
                  </div>
                </div>

                <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 card-hover border border-gray-100 dark:border-gray-700">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-2xl mb-4 shadow-lg shadow-purple-500/25 group-hover:scale-110 transition-transform duration-300">
                    📞
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    Kontaktmöglichkeiten
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">E-Mail</p>
                      <a href="mailto:info@example.de" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium transition-colors">
                        info@example.de
                      </a>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Telefon</p>
                      <a href="tel:+493012345678" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium transition-colors">
                        +49 (0) 30 123 456 78
                      </a>
                    </div>
                  </div>
                </div>

                <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 card-hover border border-gray-100 dark:border-gray-700">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-red-600 flex items-center justify-center text-2xl mb-4 shadow-lg shadow-pink-500/25 group-hover:scale-110 transition-transform duration-300">
                    🕒
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    Geschäftszeiten
                  </h3>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white mb-2">Bürozeiten</p>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      Montag - Freitag<br />
                      09:00 - 18:00 Uhr
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-16">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-4">
                  ❓ FAQ
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                  Häufig gestellte Fragen
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Antworten auf die häufigsten Fragen zu unserer Arbeit
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {faqs.map((faq, idx) => (
                  <div 
                    key={idx} 
                    className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 card-hover border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0 shadow-md">
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {faq.q}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
