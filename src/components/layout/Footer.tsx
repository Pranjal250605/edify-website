import { MapPin, Mail, ExternalLink } from 'lucide-react'

const LINKS = {
  Services: ['AI Reskilling', 'Drone UTM', 'Blockchain Security', 'Zentej Hackathon'],
  Company:  ['About Us', 'Careers', 'IIT Mandi Partnership', 'Press'],
  Connect:  ['Contact', 'GitHub', 'LinkedIn', 'edify.jp'],
}

export default function Footer() {
  return (
    <footer className="relative bg-surface mt-16 pt-8 pb-4 ghost-border overflow-hidden rounded-t-[40px] px-4 md:px-0">

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full blur-[80px]
        bg-primary-container/5 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 bg-surface-container-low rounded-3xl ghost-border ambient-shadow">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 shrink-0">
                <img
                  src="/edifylogo.png"
                  alt="Edify"
                  draggable={false}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-display font-semibold text-2xl text-text-primary">
                Edify
              </span>
              <span className="font-body text-xs text-text-muted mt-2">/ Japan</span>
            </div>

            <p className="font-body font-medium text-text-muted text-sm leading-relaxed max-w-xs mb-6">
              Bridging the future with AI, Drone Technology, and Blockchain-secured infrastructure.
              Hiroshima-based. Globally minded.
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-text-muted text-sm font-body font-medium">
                <MapPin size={13} className="text-primary-DEFAULT shrink-0" />
                Hiroshima, Japan
              </div>
              <div className="flex items-center gap-2 text-text-muted text-sm font-body font-medium">
                <Mail size={13} className="text-primary-DEFAULT shrink-0" />
                hello@edify.jp
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group}>
              <h4 className="font-display font-semibold text-text-primary text-xl mb-6">
                {group}
              </h4>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item}>
                    <a
                      href="#"
                      className="font-body font-medium text-text-muted text-sm hover:text-primary-DEFAULT transition-colors duration-200 flex items-center gap-2 group"
                    >
                      {item}
                      <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-text-muted uppercase">
            © {new Date().getFullYear()} Edify Inc. — Hiroshima, Japan
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
              <a key={item} href="#"
                className="font-body uppercase text-xs text-text-muted hover:text-primary-DEFAULT transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
