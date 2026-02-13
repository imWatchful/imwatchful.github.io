import { Link } from '@tanstack/react-router'
import { Github, Linkedin, Twitter } from 'lucide-react'
import { AIIcon } from './AIIcon'
import { FlickerUnderline } from './FlickerUnderline/FlickerUnderline'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Blog', to: '/blog' },
  { label: 'Projects', to: '/projects' },
]

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/imWatchful',
    icon: Github,
  },
  {
    label: 'Twitter',
    href: 'https://x.com/imWatchful',
    icon: Twitter,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/gamidm/',
    icon: Linkedin,
  },
]

function Footer() {
  return (
    <footer className="footer no-flow">
      <div className="footer-content no-flow">
        <div className="footer-top no-flow">
          <div className="footer-social" aria-label="Social links">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                className="footer-social-link"
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
              >
                <AIIcon icon={Icon} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom no-flow">
          <p className="footer-copy">Copyright © Gamid Muratbekov</p>
          <nav aria-label="Footer" className="footer-nav">
            <ul className="footer-nav-list">
              {navItems.map((item) => (
                <li key={item.to} className="footer-nav-item">
                  <Link to={item.to} className="footer-link" viewTransition>
                    <FlickerUnderline color="lime">
                      {item.label}
                    </FlickerUnderline>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
