import { useLang } from '../context/LanguageContext'

// Windmill + wheat mark inspired by the Surur Bakeries logo, drawn as inline SVG
// so it scales crisply and adapts to light/dark backgrounds.
export function LogoMark({ size = 44 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="31" fill="var(--red)" />
      <circle cx="32" cy="32" r="31" stroke="var(--gold)" strokeWidth="2" />
      {/* windmill house */}
      <path d="M26 44V31l6-5 6 5v13z" fill="#fff" />
      <rect x="30" y="37" width="4" height="7" fill="var(--red)" />
      {/* windmill blades */}
      <g stroke="#fff" strokeWidth="3" strokeLinecap="round">
        <line x1="32" y1="26" x2="21" y2="15" />
        <line x1="32" y1="26" x2="43" y2="15" />
        <line x1="32" y1="26" x2="21" y2="37" />
        <line x1="32" y1="26" x2="43" y2="37" />
      </g>
      {/* wheat sheaf */}
      <path
        d="M46 50c-6-2-9-7-9-13"
        stroke="var(--gold)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <g fill="var(--gold)">
        <ellipse cx="41" cy="40" rx="2" ry="3.4" transform="rotate(30 41 40)" />
        <ellipse cx="43" cy="45" rx="2" ry="3.4" transform="rotate(30 43 45)" />
        <ellipse cx="45" cy="50" rx="2" ry="3.4" transform="rotate(30 45 50)" />
      </g>
    </svg>
  )
}

export default function Logo() {
  const { lang } = useLang()
  return (
    <a href="#home" className="logo" aria-label="Surur Bakeries">
      <LogoMark size={44} />
      <span className="logo-text">
        <span className="logo-name">{lang === 'ar' ? 'مخابز سرور' : 'Surur Bakeries'}</span>
        <span className="logo-tag">Light &amp; Diet · Since 1986</span>
      </span>
    </a>
  )
}
