import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

const RED   = '#C41E3A'
const CYAN  = '#0EA5E9'
const STEEL = '#A0A0A0'

function Footer() {
  const navigate = useNavigate();
  const { t } = useLanguage()

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #111 0%, #1e1e1e 60%, #220810 100%)',
      borderTop: `4px solid ${RED}`,
      padding: '3.5rem 1rem 1.5rem',
    }}>
      <div className="container-page">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>

          {/* ── Brand Column ─────────────────────────────────────────── */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div 
                onClick={(e) => {
                  if (e.detail === 5) navigate('/sjh-control-room');
                }} 
                style={{ cursor: 'pointer' }}
              >
                <img src={logo} alt="SRI JAI HARI" style={{ height: 52, width: 'auto', objectFit: 'contain', filter: 'brightness(1.1)' }} />
              </div>
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 17 }}>
                  <span style={{ color: RED }}>SRI JAI HARI</span>
                </div>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: STEEL, marginTop: 2 }}>
                  Engineering Solution
                </div>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, lineHeight: 1.7, maxWidth: 260 }}>
              {t('footer.tagline')}
            </p>
          </div>

          {/* ── Quick Links ───────────────────────────────────────────── */}
          <div>
            <h3 style={{ color: '#fff', fontWeight: 800, fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 16, height: 2, background: RED, display: 'inline-block', borderRadius: 2 }} />
              {t('footer.quickLinks')}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[['/', t('nav.home')], ['/enquiry', t('nav.enquiry')], ['/products', t('footer.ourProducts')]].map(([href, label]) => (
                <li key={href}>
                  <a href={href} style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13.5, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = RED}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                  >
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: RED, display: 'inline-block', flexShrink: 0 }} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ───────────────────────────────────────────────── */}
          <div>
            <h3 style={{ color: '#fff', fontWeight: 800, fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 16, height: 2, background: STEEL, display: 'inline-block', borderRadius: 2 }} />
              {t('footer.contactUs')}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <a href="mailto:jaiharienggsolutions@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'rgba(255,255,255,0.55)', transition: 'color 0.2s', fontSize: 13 }}
                onMouseEnter={e => e.currentTarget.style.color = RED}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}>
                <svg width="15" height="15" fill="none" stroke={RED} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                jaiharienggsolutions@gmail.com
              </a>

              {['+91 9514111460', '+91 9842211460'].map(num => (
                <a key={num} href={`tel:${num.replace(/\s/g,'')}`} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'rgba(255,255,255,0.55)', transition: 'color 0.2s', fontSize: 13 }}
                  onMouseEnter={e => e.currentTarget.style.color = CYAN}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}>
                  <svg width="15" height="15" fill="none" stroke={CYAN} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  {num}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────────────────────── */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12.5 }}>
            © {new Date().getFullYear()} <span style={{ color: RED, fontWeight: 700 }}>SRI JAI HARI</span> Engineering Solution. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 6 }}>
            <span style={{ background: 'rgba(196,30,58,0.25)', color: RED, borderRadius: 6, padding: '3px 10px', fontSize: 10, fontWeight: 700, letterSpacing: '0.06em' }}>SJHES</span>
            <span style={{ background: 'rgba(14,165,233,0.2)', color: CYAN, borderRadius: 6, padding: '3px 10px', fontSize: 10, fontWeight: 700, letterSpacing: '0.06em' }}>TAMIL NADU</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
