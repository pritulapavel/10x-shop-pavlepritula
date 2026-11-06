import type { ReactNode } from 'react'
import { StoreBrand } from './StoreNavigation'

interface SocialProfile {
  name: string
  icon: ReactNode
  url: string
}

const socialProfiles: readonly SocialProfile[] = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=61560250531900',
    icon: <path d="M14 22v-9h3l.5-3.5H14V7.3c0-1 .3-1.7 1.8-1.7h1.9V2.5c-.3 0-1.4-.2-2.8-.2-2.8 0-4.7 1.7-4.7 4.8v2.4H7V13h3.2v9z" />,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/10x.edu.ge/',
    icon: <g fill="none" stroke="currentColor" strokeWidth="1.75">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </g>,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/10xedu/',
    icon: <path d="M3 8h4v13H3zm2-6a2.25 2.25 0 1 1 0 4.5A2.25 2.25 0 0 1 5 2zm5 6h4v1.8a4 4 0 0 1 3.5-2c3.7 0 4.5 2.3 4.5 5.4V21h-4v-7c0-1.4-.2-2.7-1.9-2.7S14 12.7 14 14v7h-4z" />,
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/channel/UCvdR88HnOIjcprwOzz7kWxA',
    icon: <path fillRule="evenodd" d="M22 7a3 3 0 0 0-2.1-2.1C18.1 4.5 12 4.5 12 4.5s-6.1 0-7.9.4A3 3 0 0 0 2 7a31 31 0 0 0 0 10 3 3 0 0 0 2.1 2.1c1.8.4 7.9.4 7.9.4s6.1 0 7.9-.4A3 3 0 0 0 22 17a31 31 0 0 0 0-10ZM10 8.5l6 3.5-6 3.5z" />,
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@10x.edu',
    icon: <path d="M14 2h3.4c.3 2.5 1.7 4 4.1 4.2v3.5a8.2 8.2 0 0 1-4.1-1.2v7.1a6.4 6.4 0 1 1-6.4-6.4h1v3.5a3 3 0 1 0 2 2.9z" />,
  },
]

function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="shop-container pt-5 pb-3 text-sm text-muted sm:pt-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-6">
          <div>
            <StoreBrand />
            <p className="mt-1">This is a shop for final exam in 10x.</p>
          </div>
          <div>
            <h2 className="mb-2 text-sm font-semibold text-ink">Social</h2>
            <ul className="flex flex-wrap gap-2">
              {socialProfiles.map(({ name, icon, url }) => (
                <li key={name}>
                  <a href={url} target="_blank" rel="noopener noreferrer" aria-label={name} className="secondary-button px-0 text-muted hover:border-focus hover:text-accent-ink">
                    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="currentColor" className="size-4 shrink-0">{icon}</svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-4 border-t border-line pt-3 text-xs">{new Date().getFullYear()} · 10X Shop</p>
      </div>
    </footer>
  )
}

export default Footer
