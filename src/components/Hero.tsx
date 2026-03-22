import { ArrowRight } from 'lucide-react';

const WA_NUMBER = '26481000000';
const WA_URL = `https://wa.me/${WA_NUMBER}?text=Hello%2C%20I%27d%20like%20to%20speak%20with%20an%20IJG%20advisor.`;

const STATS = [
  { value: '30+', label: 'Years of Excellence' },
  { value: 'N$15B+', label: 'Assets Under Management' },
  { value: '2,500+', label: 'Clients Served' },
  { value: '100%', label: 'Independent — No Bank Ownership' },
];

export default function Hero() {
  const scrollToServices = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section style={{
      background: 'linear-gradient(160deg, #07090F 0%, #0D1117 50%, #07090F 100%)',
      borderBottom: '1px solid #1F2937',
      paddingTop: '5rem',
      paddingBottom: '4rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle grid background */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.03,
        backgroundImage: 'linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      {/* Gold accent line top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, transparent, #C9A84C 30%, #C9A84C 70%, transparent)',
      }} />

      <div className="ijg-container" style={{ position: 'relative' }}>
        <div style={{ maxWidth: '780px' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <span className="section-label">IJG GROUP — NAMIBIA</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.75rem)',
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            color: '#F5F0E8',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
          }}>
            Your vantage point<br />
            <span style={{ color: '#C9A84C' }}>in Namibian finance.</span>
          </h1>

          <div style={{ width: '56px', height: '2px', background: '#C9A84C', marginBottom: '1.5rem' }} />

          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: '#9CA3AF',
            lineHeight: 1.7,
            maxWidth: '600px',
            marginBottom: '2.5rem',
          }}>
            Namibia's leading independent financial services group — delivering expert advisory,
            investment management, stockbroking, research, and wealth solutions since 1994.
            No bank ownership. No product bias. Advice that serves your interests first.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '4rem' }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-wa">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Speak to an Advisor
            </a>
            <button onClick={scrollToServices} className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Explore Our Services <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1px',
          background: '#1F2937',
          border: '1px solid #1F2937',
          borderRadius: '12px',
          overflow: 'hidden',
        }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              background: '#111827',
              padding: '1.25rem 1.5rem',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                color: '#C9A84C',
                fontWeight: 400,
                lineHeight: 1,
                marginBottom: '0.35rem',
              }}>{s.value}</div>
              <div style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.75rem',
                color: '#9CA3AF',
                lineHeight: 1.3,
              }}>{s.label}</div>
            </div>
          ))}
        </div>

        <style>{`
          @media (min-width: 640px) {
            div[style*="gridTemplateColumns"] {
              grid-template-columns: repeat(4, 1fr) !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
