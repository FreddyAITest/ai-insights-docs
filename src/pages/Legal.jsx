import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Legal() {
  const { type } = useParams()

  const isPrivacy = type === 'privacy' || !type

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="pt-20">
        <div className="px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {/* Navigation Tabs */}
            <div className="flex gap-2 mb-8 bg-gray-100 dark:bg-gray-800 rounded-xl p-2">
              <Link
                to="/legal/privacy"
                className={`flex-1 text-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  isPrivacy
                    ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                📋 Datenschutzerklärung
              </Link>
              <Link
                to="/legal/impressum"
                className={`flex-1 text-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  !isPrivacy
                    ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                📄 Impressum
              </Link>
            </div>

            {isPrivacy ? <PrivacyContent /> : <ImpressumContent />}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function PrivacyContent() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100 dark:border-gray-700">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-4">
          🔒 Datenschutz
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
          Datenschutzerklärung
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Stand: März 2026
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm">1</span>
            Datenschutz auf einen Blick
          </h2>
          
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Allgemeine Hinweise</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>
          </div>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-3">Datenerfassung auf dieser Website</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-indigo-500 pl-4">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Wer ist verantwortlich für die Datenerfassung?</strong><br />
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Wie erfassen wir Ihre Daten?</strong><br />
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
              </p>
            </div>
            <div className="border-l-4 border-pink-500 pl-4">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Wofür nutzen wir Ihre Daten?</strong><br />
                Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
              </p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-3">Welche Rechte haben Sie bezüglich Ihrer Daten?</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm">2</span>
            Hosting
          </h2>
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-indigo-100 dark:border-indigo-800">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
              Wir hosten die Inhalte unserer Website bei folgendem Anbieter: <strong className="text-gray-900 dark:text-white">Netlify</strong>. 
              Anbieter ist Netlify, Inc., 2325 3rd Street, Suite 296, San Francisco, California 94107, USA.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
              Netlify ist ein Tool zum Erstellen und Hosten von Websites. Wenn Sie unsere Website besuchen, erfasst Netlify Logfiles, 
              Host-IP-Adressen und weitere Informationen, die in Server-Logfiles automatisch erfasst werden.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Die Verwendung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer 
              möglichst zuverlässigen Darstellung unserer Website.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm">3</span>
            Allgemeine Hinweise und Pflichtinformationen
          </h2>
          
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-3">Datenschutz</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten 
            vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
          </p>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-3">Hinweis zur verantwortlichen Stelle</h3>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 mb-6 border border-gray-200 dark:border-gray-500">
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
              <strong className="text-gray-900 dark:text-white text-lg">AI Insights GmbH</strong><br />
              Musterstraße 123<br />
              10115 Berlin<br />
              Deutschland<br /><br />
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                E-Mail: <a href="mailto:info@example.de" className="text-indigo-600 dark:text-indigo-400 hover:underline">info@example.de</a>
              </span><br />
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Telefon: <a href="tel:+493012345678" className="text-indigo-600 dark:text-indigo-400 hover:underline">+49 (0) 30 123 456 78</a>
              </span>
            </p>
          </div>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-3">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. 
            Dazu reicht eine formlose Mitteilung per E-Mail an uns.
          </p>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-3">Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, haben Sie jederzeit das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, 
            gegen die Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm">4</span>
            Datenerfassung auf dieser Website
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Cookies</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Unsere Internetseiten verwenden so genannte "Cookies". Cookies sind kleine Textdateien und richten auf Ihrem Endgerät keinen Schaden an. 
                Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Kontaktformular</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten 
                zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt 
                oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse 
                an der effektiven Bearbeitung der an uns gerichteten Anfragen.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Newsletter</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                Wenn Sie den auf der Website angebotenen Newsletter beziehen möchten, benötigen wir von Ihnen eine E-Mail-Adresse sowie Informationen, 
                welche uns die Überprüfung gestatten, dass Sie der Inhaber der angegebenen E-Mail-Adresse sind und mit dem Empfang des Newsletters einverstanden sind.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Die Verarbeitung der in das Newsletteranmeldeformular eingegebenen Daten erfolgt ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). 
                Sie können die Speicherung dieser Daten sowie die Nutzung zur Newsletterversendung jederzeit widerrufen.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm">5</span>
            Analyse-Tools und Tools von Drittanbietern
          </h2>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
              Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit sogenannten Analyseprogrammen.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Wir verwenden keine Analyse-Tools von Drittanbietern ohne Ihre ausdrückliche Einwilligung.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm">6</span>
            Plugins und Tools
          </h2>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Diese Website verwendet keine externen Plugins oder Tools von Drittanbietern, die personenbezogene Daten an diese übermitteln würden.
            </p>
          </div>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Quelle: eRecht24 - Datenschutz-Generator von Rechtsanwalt Sören Siebert
        </p>
      </div>
    </div>
  )
}

function ImpressumContent() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100 dark:border-gray-700">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
          📄 Impressum
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
          Impressum
        </h1>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Angaben gemäß § 5 TMG</h2>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 border border-gray-200 dark:border-gray-500">
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
              <strong className="text-gray-900 dark:text-white text-lg">AI Insights GmbH</strong><br />
              Musterstraße 123<br />
              10115 Berlin<br />
              Deutschland
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Kontakt</h2>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 border border-gray-200 dark:border-gray-500">
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
              <strong className="text-gray-900 dark:text-white">Telefon:</strong> +49 (0) 30 123 456 78<br />
              <strong className="text-gray-900 dark:text-white">E-Mail:</strong>{' '}
              <a href="mailto:info@example.de" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                info@example.de
              </a>
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Vertreten durch</h2>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 border border-gray-200 dark:border-gray-500">
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
              Dr. Michael Weber (Geschäftsführer)
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Registereintrag</h2>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 border border-gray-200 dark:border-gray-500">
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
              Eintragung im Handelsregister.<br />
              Registergericht: Amtsgericht Berlin-Charlottenburg<br />
              Registernummer: HRB 123456
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Umsatzsteuer-ID</h2>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 border border-gray-200 dark:border-gray-500">
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              <strong className="text-gray-900 dark:text-white">DE123456789</strong>
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Redaktionell verantwortlich</h2>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 border border-gray-200 dark:border-gray-500">
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
              Dr. Michael Weber<br />
              Musterstraße 123<br />
              10115 Berlin<br />
              Deutschland
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">EU-Streitschlichtung</h2>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
              <a 
                href="https://ec.europa.eu/consumers/odr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                https://ec.europa.eu/consumers/odr
              </a>.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Haftungsausschluss</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Haftung für Inhalte</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. 
                Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen 
                oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Haftung für Links</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
                Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Urheberrecht</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. 
                Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Datenschutzbeauftragter</h2>
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-indigo-100 dark:border-indigo-800">
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
              Bei Fragen zum Datenschutz wenden Sie sich bitte an:<br />
              <strong className="text-gray-900 dark:text-white">
                <a href="mailto:datenschutz@example.de" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                  datenschutz@example.de
                </a>
              </strong>
            </p>
          </div>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Quelle: eRecht24
        </p>
      </div>
    </div>
  )
}
