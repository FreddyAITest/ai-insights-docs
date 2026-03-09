import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Blog() {
  const featuredPost = {
    icon: '🎨',
    date: '8. März 2026',
    readTime: '25 Min. Lesezeit',
    title: 'The Digital Paper Empire: AI-Powered Mass Production & Lead Generation',
    desc: 'Complete guide to generating 2,000+ AI designs, automating publication across Etsy and marketplaces, and building automated lead generation systems.',
    slug: 'digital-paper-empire',
  }

  const posts = [
    {
      icon: '🤖',
      date: '4. März 2026',
      readTime: '8 Min. Lesezeit',
      title: 'Die Zukunft der Generativen KI: Was kommt nach ChatGPT?',
      desc: 'Ein tiefer Einblick in die nächsten Generationen von KI-Modellen und ihre potenziellen Anwendungen in der Unternehmenswelt.',
      slug: 'zukunft-generative-ki',
    },
    {
      icon: '📊',
      date: '1. März 2026',
      readTime: '6 Min. Lesezeit',
      title: 'Machine Learning in der Praxis: Erfolgsbeispiele aus der Industrie',
      desc: 'Wie Unternehmen maschinelles Lernen nutzen, um Prozesse zu optimieren und neue Geschäftsmöglichkeiten zu erschließen.',
      slug: 'machine-learning-praxis',
    },
    {
      icon: '🔒',
      date: '26. Februar 2026',
      readTime: '7 Min. Lesezeit',
      title: 'KI-Sicherheit: Herausforderungen und Lösungen für 2026',
      desc: 'Welche Sicherheitsrisiken KI-Systeme mit sich bringen und wie Unternehmen sich schützen können.',
      slug: 'ki-sicherheit-2026',
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
              📝 Insights & News
            </div>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl mb-6">
              Unser Blog
            </h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
              Aktuelle Einblicke in KI-Technologie, Trends und Innovationen - 
              direkt von unserem Expertenteam
            </p>
          </div>
        </section>

        {/* Featured Post */}
        <section className="px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="inline-block bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                🔥 Neuester Artikel
              </span>
            </div>
            
            <a
              href={`/blog/${featuredPost.slug}`}
              className="group block bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 card-hover border border-gray-100 dark:border-gray-700"
            >
              <div className="grid md:grid-cols-2">
                <div className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-12 lg:p-16 flex items-center justify-center overflow-hidden">
                  {/* Decorative circles */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
                  <div className="relative z-10 text-8xl lg:text-9xl transform group-hover:scale-110 transition-transform duration-300">
                    {featuredPost.icon}
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{featuredPost.desc}</p>
                  <span className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold group-hover:gap-3 transition-all">
                    Jetzt lesen
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="px-6 py-16 lg:px-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-4">
                📚 Archiv
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-2">
                Weitere Artikel
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Entdecken Sie unsere älteren Beiträge und verpassen Sie keine Insights
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, idx) => (
                <a
                  key={idx}
                  href={`/blog/${post.slug}`}
                  className="group block bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 card-hover border border-gray-100 dark:border-gray-700"
                >
                  <div className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 text-center overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                    <div className="relative z-10 text-6xl transform group-hover:scale-110 transition-transform duration-300">
                      {post.icon}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed line-clamp-3">{post.desc}</p>
                    <span className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold group-hover:gap-3 transition-all">
                      Weiterlesen
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
