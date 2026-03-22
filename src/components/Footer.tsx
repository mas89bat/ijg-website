import { MapPin, Phone, Mail } from 'lucide-react';

const WA_NUMBER = '26481000000';
const WA_URL = `https://wa.me/${WA_NUMBER}?text=Hello%2C%20I%27d%20like%20to%20speak%20with%20an%20IJG%20advisor.`;

export default function Footer() {
  return (
    <>
      {/* Contact section */}
      <section id="contact" style={{ padding: '5rem 0', background: '#0D1117', borderTop: '1px solid #1F2937' }}>
        <div className="ijg-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>
            {/* Left */}
            <div>
              <span className="section-label" style={{ marginBottom: '1.25rem', display: 'inline-block' }}>CONTACT US</span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', marginBottom: '1rem' }}>
                Get in touch with IJG
              </h2>
              <div className="gold-divider" />
              <p style={{ color: '#9CA3AF', fontSize: '1rem', lineHeight: 1.7, marginTop: '1.25rem', marginBottom: '2rem' }}>
                Our team is available Monday to Friday, 08:00–17:00 WAT.
                For urgent matters, reach us on WhatsApp.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ color: '#C9A84C', marginTop: '2px' }}><MapPin size={20} /></div>
                  <div>
                    <div style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600, color: '#F5F0E8', marginBottom: '0.25rem' }}>Office</div>
                    <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.875rem', color: '#9CA3AF', lineHeight: 1.6 }}>
                      4th Floor, 1@Steps<br />
                      Corner of Grove & Chasie Streets<br />
                      Kleine Kuppe, Windhoek, Namibia
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ color: '#C9A84C' }}><Phone size={20} /></div>
                  <div>
                    <div style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600, color: '#F5F0E8', marginBottom: '0.25rem' }}>Phone</div>
                    <a href="tel:+26461256666" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.875rem', color: '#9CA3AF' }}>+264 61 256 666</a>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ color: '#C9A84C' }}><Mail size={20} /></div>
                  <div>
                    <div style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600, color: '#F5F0E8', marginBottom: '0.25rem' }}>Email</div>
                    <a href="mailto:info@ijg.net" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.875rem', color: '#9CA3AF' }}>info@ijg.net</a>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-wa">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Us
                </a>
              </div>
            </div>

            {/* Right — map placeholder */}
            <div className="ijg-card" style={{
              minHeight: '280px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '1rem',
              background: 'rgba(201,168,76,0.04)',
              border: '1px solid rgba(201,168,76,0.15)',
            }}>
              <MapPin size={40} color="#C9A84C" />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.1rem', color: '#F5F0E8', marginBottom: '0.5rem' }}>
                  1@Steps, Kleine Kuppe
                </div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.875rem', color: '#9CA3AF' }}>
                  Windhoek, Namibia
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=1@Steps+Windhoek+Namibia"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ fontSize: '0.8rem', padding: '0.5rem 1.25rem' }}
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 1024px) {
            #contact > div > div {
              grid-template-columns: 1fr 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#07090F',
        borderTop: '1px solid #1F2937',
        padding: '3rem 0 2rem',
      }}>
        <div className="ijg-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem', marginBottom: '2.5rem' }}>
            {/* Brand */}
            <div>
              <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.25rem', color: '#F5F0E8', marginBottom: '0.75rem' }}>
                IJG Group
              </div>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: '#6B7280', lineHeight: 1.7, maxWidth: '280px' }}>
                Namibia's leading independent financial services group.
                Delivering expert advisory, investment management, and wealth solutions since 1994.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontStyle: 'normal', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9CA3AF', marginBottom: '1rem' }}>
                Quick Links
              </div>
              {[
                { label: 'Our Services', href: '#services' },
                { label: 'IJG Wealth Tools', href: 'https://ijg-wealth.vercel.app' },
                { label: 'IJG Research', href: 'https://ijgresearch-vsevfbwk.manus.space' },
                { label: 'About IJG', href: '#about' },
                { label: 'Contact', href: '#contact' },
                { label: 'Careers', href: 'https://ijg.net/careers' },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{ display: 'block', fontFamily: 'DM Sans, sans-serif', fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.6rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#F5F0E8')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#6B7280')}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Legal */}
            <div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontStyle: 'normal', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9CA3AF', marginBottom: '1rem' }}>
                Legal
              </div>
              {[
                { label: 'Privacy Policy', href: 'https://ijg.net/privacy-policy' },
                { label: 'Terms of Use', href: 'https://ijg.net/terms-of-use' },
                { label: 'PAIA Manual', href: 'https://ijg.net/paia-manual' },
                { label: 'Complaints', href: 'https://ijg.net/complaints' },
                { label: 'Cookie Policy', href: 'https://ijg.net/cookie-policy' },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block', fontFamily: 'DM Sans, sans-serif', fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.6rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#F5F0E8')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#6B7280')}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop: '1px solid #1F2937',
            paddingTop: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', color: '#4B5563', lineHeight: 1.6 }}>
              IJG Group is regulated by the Namibia Financial Institutions Supervisory Authority (NAMFISA).
              Registration number: 94/388. The information on this website is for general information purposes only
              and does not constitute financial advice. Past performance is not indicative of future results.
            </p>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', color: '#4B5563' }}>
              © {new Date().getFullYear()} IJG Group (Pty) Ltd. All rights reserved.
            </p>
          </div>
        </div>

        <style>{`
          @media (min-width: 768px) {
            footer > div > div:first-child {
              grid-template-columns: 2fr 1fr 1fr !important;
            }
            footer > div > div:last-child {
              flex-direction: row !important;
              justify-content: space-between !important;
              align-items: center !important;
            }
          }
        `}</style>
      </footer>
    </>
  );
}
