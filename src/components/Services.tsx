import { ArrowRight, TrendingUp, BarChart2, Building2, Briefcase, BookOpen } from 'lucide-react';

const DIVISIONS = [
  {
    icon: <TrendingUp size={28} />,
    label: 'WEALTH MANAGEMENT',
    title: 'IJG Wealth',
    desc: 'Comprehensive financial planning for individuals and families — home loans, retirement, education savings, vehicle finance, and investment strategies tailored to your life goals.',
    cta: 'Open Wealth Tools',
    href: 'https://ijg-wealth.vercel.app',
    live: true,
    badge: 'Live',
  },
  {
    icon: <BookOpen size={28} />,
    label: 'RESEARCH & INSIGHTS',
    title: 'IJG Research',
    desc: 'Namibia\'s most comprehensive independent financial research platform. Daily market briefings, macroeconomic analysis, and sector reports — in English, Afrikaans, and Oshiwambo.',
    cta: 'Read Research',
    href: 'https://ijgresearch-vsevfbwk.manus.space',
    live: true,
    badge: 'Live',
  },
  {
    icon: <BarChart2 size={28} />,
    label: 'STOCKBROKING',
    title: 'IJG Securities',
    desc: 'Full-service stockbroking on the Namibia Stock Exchange (NSX) and Johannesburg Stock Exchange (JSE). Equity trading, fixed income, and portfolio management for retail and institutional clients.',
    cta: 'Coming Soon',
    href: '#contact',
    live: false,
    badge: 'Coming Soon',
  },
  {
    icon: <Briefcase size={28} />,
    label: 'INVESTMENT MANAGEMENT',
    title: 'IJG Asset Management',
    desc: 'Discretionary asset management for pension funds, corporates, and retail investors. Namibian-focused portfolios with access to global markets through established international partnerships.',
    cta: 'Coming Soon',
    href: '#contact',
    live: false,
    badge: 'Coming Soon',
  },
  {
    icon: <Building2 size={28} />,
    label: 'ADVISORY',
    title: 'IJG Advisory',
    desc: 'Corporate finance, business valuations, capital raising, and M&A advisory. Independent advice for Namibian businesses navigating growth, restructuring, and strategic transactions.',
    cta: 'Coming Soon',
    href: '#contact',
    live: false,
    badge: 'Coming Soon',
  },
  {
    icon: <TrendingUp size={28} />,
    label: 'PRIVATE EQUITY',
    title: 'IJG Capital',
    desc: 'Development capital and private equity investments in Namibian businesses. Focus on renewable energy, infrastructure, and high-growth sectors driving the Namibian economy forward.',
    cta: 'Coming Soon',
    href: '#contact',
    live: false,
    badge: 'Coming Soon',
  },
];

export default function Services() {
  return (
    <section id="services" style={{ padding: '5rem 0', background: '#07090F' }}>
      <div className="ijg-container">
        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <span className="section-label" style={{ marginBottom: '1rem', display: 'inline-block' }}>OUR DIVISIONS</span>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', marginBottom: '1rem' }}>
            A complete financial services group
          </h2>
          <div className="gold-divider" />
          <p style={{ color: '#9CA3AF', fontSize: '1rem', maxWidth: '560px', marginTop: '1rem', lineHeight: 1.7 }}>
            Six specialised divisions — one independent group. Each built on the same foundation:
            expertise, integrity, and a singular focus on Namibian clients.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1.25rem',
        }}>
          {DIVISIONS.map((div, i) => (
            <div
              key={i}
              className="ijg-card"
              style={{
                position: 'relative',
                borderColor: div.live ? 'rgba(201,168,76,0.3)' : '#1F2937',
              }}
            >
              {/* Badge */}
              <div style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: div.live ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.06)',
                color: div.live ? '#10B981' : '#6B7280',
                fontFamily: 'DM Sans, sans-serif',
                fontStyle: 'normal',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '0.2rem 0.55rem',
                borderRadius: '4px',
                border: `1px solid ${div.live ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.1)'}`,
              }}>
                {div.badge}
              </div>

              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                {/* Icon */}
                <div style={{
                  flexShrink: 0,
                  width: '52px',
                  height: '52px',
                  background: 'rgba(201,168,76,0.1)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#C9A84C',
                }}>
                  {div.icon}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontStyle: 'normal',
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#C9A84C',
                    marginBottom: '0.4rem',
                  }}>
                    {div.label}
                  </div>
                  <h3 style={{
                    fontFamily: 'Georgia, serif',
                    fontStyle: 'italic',
                    fontSize: '1.2rem',
                    color: '#F5F0E8',
                    marginBottom: '0.75rem',
                  }}>
                    {div.title}
                  </h3>
                  <p style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.875rem',
                    color: '#9CA3AF',
                    lineHeight: 1.65,
                    marginBottom: '1.25rem',
                  }}>
                    {div.desc}
                  </p>
                  <a
                    href={div.href}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontFamily: 'DM Sans, sans-serif',
                      fontStyle: 'normal',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: div.live ? '#C9A84C' : '#6B7280',
                      textDecoration: 'none',
                      cursor: div.live ? 'pointer' : 'default',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => { if (div.live) (e.currentTarget as HTMLElement).style.color = '#E2C97E'; }}
                    onMouseLeave={e => { if (div.live) (e.currentTarget as HTMLElement).style.color = '#C9A84C'; }}
                  >
                    {div.cta} {div.live && <ArrowRight size={14} />}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          #services > div > div:last-child {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (min-width: 1200px) {
          #services > div > div:last-child {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
