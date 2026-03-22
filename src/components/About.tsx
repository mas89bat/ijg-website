import { Shield, Globe, Users, Award } from 'lucide-react';

const PILLARS = [
  {
    icon: <Shield size={24} />,
    title: 'Truly Independent',
    desc: 'No bank ownership. No product bias. Our advice is shaped entirely by your interests — not by distribution targets or institutional mandates.',
  },
  {
    icon: <Award size={24} />,
    title: 'NAMFISA Regulated',
    desc: 'Fully licensed and regulated by the Namibia Financial Institutions Supervisory Authority. Trusted by generations of Namibian investors since 1994.',
  },
  {
    icon: <Users size={24} />,
    title: 'Local Expertise',
    desc: 'Deep understanding of Namibian markets, regulations, and investment opportunities. Our team lives and works in the communities we serve.',
  },
  {
    icon: <Globe size={24} />,
    title: 'Global Access',
    desc: 'Offshore investment solutions and international market access through established partnerships — giving Namibian clients a genuine global vantage point.',
  },
];

export default function About() {
  return (
    <section id="about" style={{ padding: '5rem 0', background: '#07090F' }}>
      <div className="ijg-container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', alignItems: 'center' }}>
          {/* Left */}
          <div>
            <span className="section-label" style={{ marginBottom: '1.25rem', display: 'inline-block' }}>WHY IJG</span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', marginBottom: '1rem' }}>
              Thirty years of independent advice
            </h2>
            <div className="gold-divider" />
            <p style={{ color: '#9CA3AF', fontSize: '1rem', lineHeight: 1.75, marginTop: '1.25rem', marginBottom: '1.25rem' }}>
              IJG was founded in 1994 on a single principle: that Namibians deserve financial advice
              free from the conflicts of interest that come with bank-owned advisory firms.
            </p>
            <p style={{ color: '#9CA3AF', fontSize: '1rem', lineHeight: 1.75, marginBottom: '2rem' }}>
              Three decades later, that principle remains unchanged. We manage over N$15 billion
              in assets for more than 2,500 clients — from individuals planning their retirement
              to pension funds managing billions in institutional capital.
            </p>

            {/* Timeline */}
            <div style={{ borderLeft: '2px solid #1F2937', paddingLeft: '1.5rem' }}>
              {[
                { year: '1994', event: 'IJG founded in Windhoek' },
                { year: '2001', event: 'IJG Securities — NSX stockbroking licence' },
                { year: '2008', event: 'Asset management division established' },
                { year: '2015', event: 'N$10B assets under management milestone' },
                { year: '2024', event: 'N$15B+ AUM — 2,500+ clients served' },
              ].map((item, i) => (
                <div key={i} style={{ position: 'relative', marginBottom: '1.25rem' }}>
                  <div style={{
                    position: 'absolute',
                    left: '-1.75rem',
                    top: '0.3rem',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#C9A84C',
                  }} />
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem', fontWeight: 700, color: '#C9A84C', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>
                    {item.year}
                  </div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.875rem', color: '#9CA3AF' }}>
                    {item.event}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — pillars */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {PILLARS.map((p, i) => (
              <div key={i} className="ijg-card" style={{ padding: '1.25rem' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  background: 'rgba(201,168,76,0.1)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#C9A84C',
                  marginBottom: '1rem',
                }}>
                  {p.icon}
                </div>
                <h4 style={{
                  fontFamily: 'Georgia, serif',
                  fontStyle: 'italic',
                  fontSize: '1rem',
                  color: '#F5F0E8',
                  marginBottom: '0.6rem',
                }}>
                  {p.title}
                </h4>
                <p style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.8rem',
                  color: '#9CA3AF',
                  lineHeight: 1.6,
                }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          #about > div > div {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
