import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Home() {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const BREVO_URL = 'https://1b30e838.sibforms.com/serve/MUIFACzYNK980ANbLgaBgdz9rb7kM0cbd_FlarizsA9Pe2z_xTzPgHv4LdGrGNNfW1-AdkoS6-iqbE7XtrErU2Y48ovQ-3qGNUnRANCLgAdz6kHda7XFg4ht5U5ggUrLlbppC5g97xvkljU53tOh9eERXIHzJNfg2Cr1PxlcPaTaevGhIBuOuYjUvyQkFWEzloLS1UdhoBYmNf-dvQ=='

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !consent) {
      setError('Bitte gib deine E-Mail-Adresse ein und akzeptiere die Datenschutzerklärung.')
      return
    }

    setLoading(true)

    const formData = new FormData()
    formData.append('EMAIL', email)
    formData.append('consent', 'on')
    formData.append('locale', 'de')

    try {
      await fetch(BREVO_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      })

      setSubmitted(true)
      setEmail('')
      setConsent(false)
    } catch (err) {
      setError('Ein Fehler ist aufgetreten. Bitte versuche es erneut.')
    } finally {
      setLoading(false)
    }
  }

  const projects = [
    {
      icon: '🤖',
      title: 'AI Automation Suite',
      desc: 'Intelligente Automatisierungslösung für Unternehmensprozesse mit maschinellem Lernen und natürlicher Sprachverarbeitung.',
      tags: ['KI', 'Automation', 'Enterprise'],
    },
    {
      icon: '📊',
      title: 'Predictive Analytics Platform',
      desc: 'Datengetriebene Vorhersagemodelle für präzise Geschäftsprognosen und strategische Entscheidungsfindung.',
      tags: ['Analytics', 'Machine Learning', 'SaaS'],
    },
    {
      icon: '💬',
      title: 'Conversational AI Assistant',
      desc: 'Natürliche Sprachassistenten für Kundenservice und interne Kommunikation mit kontextuellem Verständnis.',
      tags: ['NLP', 'Chatbot', 'Customer Service'],
    },
  ]

  const features = [
    {
      icon: '🚀',
      title: 'Früher Zugang',
      desc: 'Erfahren Sie als Erster von neuen Projekten und Beta-Versionen unserer Softwarelösungen.',
    },
    {
      icon: '📚',
      title: 'Experten-Insights',
      desc: 'Tiefe technische Einblicke und Best Practices von unserem KI-Entwicklungsteam.',
    },
    {
      icon: '🎯',
      title: 'Praktische Anwendungen',
      desc: 'Reale Use-Cases und Implementierungsbeispiele für Ihre eigenen Projekte.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative px-6 py-20 lg:px-8 lg:py-32 overflow-hidden">
          {/* Background gradient orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-pulse-slow"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 dark:bg-indigo-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="mx-auto max-w-7xl text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Neueste KI-Insights direkt in dein Postfach
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl mb-6 animate-slide-up">
              AI Innovation
              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Newsletter</span>
            </h1>
            
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Erhalten Sie die neuesten Einblicke in KI-Projekte und Software-Innovationen. 
              Exklusive Inhalte, praktische Anleitungen und Early Access zu unseren Tools.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <a
                href="#newsletter"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:from-indigo-500 hover:to-purple-500 transition-all duration-200 btn-press hover:-translate-y-0.5"
              >
                🚀 Jetzt kostenlos anmelden
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a 
                href="#projekte" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 btn-press hover:-translate-y-0.5 border border-gray-200 dark:border-gray-700"
              >
                Projekte ansehen
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500 dark:text-gray-400 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>100% kostenlos</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Kein Spam</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Jederzeit kündbar</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>DSGVO-konform</span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Blog Section */}
        <section className="px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="relative rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 lg:p-12 overflow-hidden shadow-2xl shadow-indigo-500/25 card-hover">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                    📝 Blog
                  </span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                    ✨ Featured
                  </span>
                </div>
                
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  Neuester Blog-Artikel
                </h2>
                <p className="text-indigo-100 mb-8 max-w-2xl">
                  Entdecken Sie die neuesten Trends in der KI-Entwicklung und wie sie Ihr Unternehmen transformieren können. 
                  Praktische Einblicke von unserem Expertenteam.
                </p>
                <a
                  href="/blog"
                  className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-indigo-600 shadow-lg hover:shadow-xl transition-all duration-200 btn-press hover:-translate-y-0.5"
                >
                  Jetzt lesen
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="px-6 py-24 lg:px-8 bg-white dark:bg-gray-800" id="projekte">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-4">
                💡 Innovation
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Unsere neuesten Projekte
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Entdecken Sie unsere aktuellen KI- und Software-Innovationen, die die Zukunft gestalten
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, idx) => (
                <article
                  key={idx}
                  className="group relative rounded-2xl bg-gradient-to-b from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 p-8 shadow-md hover:shadow-xl transition-all duration-300 card-hover border border-gray-100 dark:border-gray-600 overflow-hidden"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl mb-6 shadow-lg shadow-indigo-500/25 group-hover:scale-110 transition-transform duration-300">
                      {project.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {project.desc}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 px-3 py-1.5 text-sm font-medium text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-24 lg:px-8 bg-gray-50 dark:bg-gray-900" id="features">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
                ⭐ Vorteile
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Warum unseren Newsletter abonnieren?
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Exklusive Inhalte direkt von unserem Entwicklungsteam - kostenlos und unverbindlich
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, idx) => (
                <div 
                  key={idx} 
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 card-hover border border-gray-100 dark:border-gray-700"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  
                  <div className="relative z-10 text-center">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="relative px-6 py-24 lg:px-8 overflow-hidden" id="newsletter">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600"></div>
          
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="mx-auto max-w-2xl text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
              🎁 Kostenlos & Unverbindlich
            </div>
            
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Bereit loszulegen?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-indigo-100">
              Treten Sie unserem Newsletter bei und erfahren Sie als Erster von neuen Projekten, 
              exklusiven Insights und Early Access zu unseren Tools.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="mt-10 space-y-5">
                <div>
                  <label htmlFor="email" className="sr-only">
                    E-Mail-Adresse
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border-0 bg-white/20 backdrop-blur-sm px-6 py-4 text-white placeholder:text-white/70 shadow-lg ring-1 ring-inset ring-white/30 focus:ring-2 focus:ring-inset focus:ring-white sm:text-base sm:leading-6 transition-all duration-200"
                    placeholder="deine@email.de"
                  />
                </div>

                <div className="flex items-start text-left">
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="consent" className="ml-3 text-sm text-indigo-100 leading-relaxed">
                    Ich akzeptiere die{' '}
                    <a href="/legal/privacy" className="underline hover:text-white transition-colors">
                      Datenschutzerklärung
                    </a>{' '}
                    und stimme zu, dass meine E-Mail-Adresse für den Newsletter gespeichert wird.
                  </label>
                </div>

                {error && (
                  <div className="rounded-xl bg-red-500/20 backdrop-blur-sm border border-red-400/30 px-5 py-4 text-red-100 text-sm">
                    ⚠️ {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full rounded-xl bg-white px-8 py-4 text-base font-bold text-indigo-600 shadow-xl hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 btn-press hover:-translate-y-0.5 disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Wird gesendet...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      🚀 KOSTENLOS ANMELDEN
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  )}
                </button>

                <div className="flex items-center justify-center gap-4 text-xs text-indigo-200">
                  <div className="flex items-center gap-1">
                    <span>🔒</span>
                    <span>DSGVO-konform</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>✓</span>
                    <span>Double Opt-In</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>✕</span>
                    <span>Jederzeit kündbar</span>
                  </div>
                </div>
              </form>
            ) : (
              <div className="mt-10 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 px-8 py-10">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  ✅ Erfolgreich angemeldet!
                </h3>
                <p className="text-indigo-100 leading-relaxed">
                  Bitte prüfe dein E-Mail-Postfach und bestätige die Anmeldung (Double Opt-In). 
                  Danach erhältst du regelmäßig unsere neuesten Insights.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
