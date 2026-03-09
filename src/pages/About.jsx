import Header from '../components/Header'
import Footer from '../components/Footer'

export default function About() {
  const values = [
    {
      icon: '💡',
      title: 'Innovation',
      desc: 'Wir bleiben an der Spitze der KI-Forschung und setzen neueste Erkenntnisse in praktische Lösungen um.',
    },
    {
      icon: '🤝',
      title: 'Transparenz',
      desc: 'Wir erklären unsere KI-Systeme verständlich und sorgen für nachvollziehbare Entscheidungen.',
    },
    {
      icon: '🎯',
      title: 'Pragmatismus',
      desc: 'Wir fokussieren uns auf Lösungen, die echten Geschäftswert liefern — nicht auf Technologie um ihrer selbst willen.',
    },
    {
      icon: '🔒',
      title: 'Verantwortung',
      desc: 'Wir entwickeln KI-Systeme, die ethischen Standards entsprechen und die Privatsphäre respektieren.',
    },
  ]

  const team = [
    {
      avatar: '👨‍💼',
      name: 'Dr. Michael Weber',
      role: 'CEO & Founder',
      desc: 'Promovierter KI-Forscher mit 15 Jahren Erfahrung in Machine Learning und Unternehmensberatung.',
    },
    {
      avatar: '👩‍💻',
      name: 'Dr. Anna Weber',
      role: 'Head of Research',
      desc: 'Expertin für Generative AI und Natural Language Processing. Veröffentlicht regelmäßig in führenden Fachzeitschriften.',
    },
    {
      avatar: '👨‍💻',
      name: 'Markus Schmidt',
      role: 'Lead Developer',
      desc: 'Vollstack-Entwickler mit Schwerpunkt auf skalierbaren KI-Systemen und Cloud-Architekturen.',
    },
    {
      avatar: '👩‍🔬',
      name: 'Dr. Sarah Klein',
      role: 'Security Expert',
      desc: 'Spezialisiert auf KI-Sicherheit und Adversarial Machine Learning. Beraterin für regulatorische Compliance.',
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
              👋 Unser Team
            </div>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl mb-6">
              Über AI Insights
            </h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
              Wir sind ein leidenschaftliches Team von KI-Enthusiasten, Forschern und Softwareentwicklern, 
              die daran arbeiten, die Zukunft der künstlichen Intelligenz zu gestalten.
            </p>
          </div>
        </section>

        {/* About Content */}
        <section className="px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6">
                  🎯 Unsere Mission
                </div>
                
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  KI für alle zugänglich machen
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-lg">
                  AI Insights wurde mit der Vision gegründet, Künstliche Intelligenz für Unternehmen aller Größen zugänglich zu machen. 
                  Wir glauben, dass KI-Technologien das Potenzial haben, Geschäftsprozesse zu revolutionieren und innovative Lösungen 
                  für komplexe Probleme zu schaffen.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-lg">
                  Unser Team besteht aus erfahrenen Data Scientists, Softwareentwicklern und Branchenexperten, die gemeinsam an der 
                  Schnittstelle von Forschung und praktischer Anwendung arbeiten. Wir entwickeln nicht nur fortschrittliche KI-Lösungen, 
                  sondern teilen auch unser Wissen durch unseren Newsletter und Blog.
                </p>

                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Was uns antreibt
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    In einer sich schnell wandelnden technologischen Landschaft bleiben wir neugierig und lernbereit. 
                    Jedes Projekt ist für uns eine Gelegenheit, neue Erkenntnisse zu gewinnen und unsere Lösungen kontinuierlich zu verbessern. 
                    Wir arbeiten eng mit unseren Kunden zusammen, um maßgeschneiderte Lösungen zu entwickeln, die echten Mehrwert bieten.
                  </p>
                </div>
              </div>
            </div>

            {/* Values Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-16">
              {values.map((value, idx) => (
                <div
                  key={idx}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 card-hover border border-gray-100 dark:border-gray-700"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
                      {value.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="px-6 py-16 lg:px-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
                👥 Die Experten
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-4">
                Unser Team
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Lernen Sie die Köpfe hinter AI Insights kennen - erfahrene Experten mit Leidenschaft für Innovation
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member, idx) => (
                <div
                  key={idx}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 card-hover border border-gray-100 dark:border-gray-700 overflow-hidden"
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10 text-center">
                    <div className="w-28 h-28 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-5xl shadow-lg shadow-indigo-500/25 group-hover:scale-110 transition-transform duration-300">
                      {member.avatar}
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm mb-4">
                      {member.role}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {member.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
