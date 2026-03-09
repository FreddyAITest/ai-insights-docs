import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'GitHub', icon: '🐙', href: '#' },
    { name: 'LinkedIn', icon: '💼', href: '#' },
    { name: 'Twitter', icon: '🐦', href: '#' },
  ]

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-950 dark:from-gray-950 dark:to-black pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold text-white mb-4 hover:opacity-80 transition-opacity">
              <span className="text-3xl">🤖</span>
              <span>AI <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Insights</span></span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Ihr Partner für KI-Innovationen und Software-Entwicklung. Wir gestalten die Zukunft der künstlichen Intelligenz.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-indigo-600 flex items-center justify-center text-xl transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/25"
                  aria-label={social.name}
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-indigo-500 rounded-full"></span>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/about', label: 'Über uns' },
                { to: '/blog', label: 'Blog' },
                { to: '/contact', label: 'Kontakt' },
                { to: '/dashboard', label: 'Dashboard' },
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-gray-400 hover:text-white text-sm transition-all duration-200 hover:translate-x-1 inline-block"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-purple-500 rounded-full"></span>
              Rechtliches
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/legal/privacy', label: 'Datenschutz' },
                { to: '/legal/impressum', label: 'Impressum' },
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-gray-400 hover:text-white text-sm transition-all duration-200 hover:translate-x-1 inline-block"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter CTA */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-pink-500 rounded-full"></span>
              Bleib aktuell
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Erhalte die neuesten KI-Insights direkt in dein Postfach.
            </p>
            <Link 
              to="/#newsletter"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-lg hover:from-indigo-500 hover:to-purple-500 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5"
            >
              Newsletter abonnieren
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} AI Insights GmbH. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/legal/privacy" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
              Datenschutz
            </Link>
            <span className="text-gray-700">•</span>
            <Link to="/legal/impressum" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
              Impressum
            </Link>
            <span className="text-gray-700">•</span>
            <span className="text-gray-500 text-sm">Made with 🤖 in Berlin</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
