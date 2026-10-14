import { useState, useEffect, useRef } from 'react';
import PatternWaves from './PatternWaves';
import ASCIIText from './ASCIIText';
import MaskedHeading from './MaskedHeading';
import GlassSurface from './GlassSurface';
import ScrollReveal from './ScrollReveal';
import DitherVeil from './DitherVeil';
import teslaChrome from './Images/TESLACHROME.png';
import Folder from './Folder';
import HoloCard from './HoloCard';
import member01 from './Images/01.png';
import member02 from './Images/02.png';
import member03 from './Images/03.jpeg';
import member04 from './Images/04.png';

const EMPTY_CARD_ART = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="446" viewBox="0 0 320 446"><rect width="320" height="446" rx="14" fill="%23d8dde4"/><rect x="12" y="12" width="296" height="422" rx="10" fill="%23111116" stroke="%23c0c7d0" stroke-width="1.5"/><circle cx="160" cy="205" r="42" fill="%23181820" stroke="%233a3a48" stroke-width="1"/><path d="M144 205h32M160 189v32" stroke="%23717188" stroke-width="2" stroke-linecap="round"/><text x="160" y="274" text-anchor="middle" font-family="'DotGothic16', monospace, sans-serif" font-size="12" fill="%23888899" letter-spacing="3">[ EMPTY ]</text></svg>`;

const SECTIONS = [
  { id: 'home', label: 'HOME' },
  { id: 'about-us', label: 'ABOUT US' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'team', label: 'TEAM' }
];

const ABOUT_US_TEXT = `Blank Paper is an independent engineering collective that builds headless execution protocols to strip financial friction out of the physical world. We do not build consumer apps; we write the digital bedrock that moves physical mass. Our primary objective is to eradicate the "Working Capital Trap" in Indian agriculture by treating freight as a discrete computational payload. By linking sovereign Digital Public Infrastructure (DPI) with continuous GPS telemetry and strict UPI escrow locks, our flagship logistics protocol Bharat Culture enforces a zero-trust architecture where cargo only moves when capital is mathematically secured. To maintain absolute independence and avoid the venture capital debt cycle, this physical infrastructure is aggressively self-funded by our internal capital engine, The Scrappr a hyper-optimized AI coding agent built for enterprise compute arbitrage. We move the atoms, but we refuse to hold the debt.`;

const HIGHLIGHT_TERMS = [
  'Blank Paper',
  'Bharat Culture',
  'The Scrappr',
  'Working Capital Trap',
  'Digital Public Infrastructure (DPI)',
  'headless execution protocols',
  'digital bedrock',
  'discrete computational payload',
  'GPS telemetry',
  'UPI escrow locks',
  'zero-trust architecture',
  'AI coding agent',
  'enterprise compute arbitrage',
  'move the atoms'
];

const BHARAT_CULTURE_ITEMS = [
  {
    title: 'Discrete Freight Payload',
    description: 'Treats agricultural freight as discrete computational payloads to eradicate the Working Capital Trap.'
  },
  {
    title: 'Zero-Trust Telemetry',
    description: 'Cargo strictly moves when capital is mathematically secured with continuous sovereign GPS tracking.'
  },
  {
    title: 'DPI & UPI Escrow Locks',
    description: 'Seamlessly links Indian Digital Public Infrastructure with real-time UPI escrow mechanisms.'
  }
];

const THE_SCRAPPR_ITEMS = [
  {
    title: 'Autonomous Coding Agent',
    description: 'Hyper-optimized AI coding agent engineered for enterprise compute arbitrage.'
  },
  {
    title: 'Internal Capital Flow',
    description: 'Self-funds physical mass infrastructure without relying on venture capital debt cycles.'
  },
  {
    title: 'Atoms Without Debt',
    description: 'Moves digital and physical mass while strictly refusing to hold institutional debt.'
  }
];

const WAYPOINT_ITEMS = [
  {
    title: 'AR Indoor Navigation',
    description: 'Augmented reality wayfinding system delivering sub-meter indoor positioning across campus facilities.'
  },
  {
    title: 'Spatial Infrastructure',
    description: 'Bypasses GPS dead-zones inside complex academic buildings via real-time camera visual odometry.'
  },
  {
    title: 'Smart Campus Grid',
    description: 'Dynamic directional waypoints and real-time POI guidance overlaid onto the physical environment.'
  }
];

const KNIGHT_ITEMS = [
  {
    title: 'Esports RUST Platform',
    description: 'High-frequency competitive tournament platform architected for Rust gaming networks.'
  },
  {
    title: 'Razorpay Gateway',
    description: 'Automated entry liquidity and instant prize distributions via secured Razorpay integration.'
  },
  {
    title: 'YT Streams & Live Updates',
    description: 'Seamless YouTube Live broadcasting with real-time socket-based scoreboards and live kill feeds.'
  }
];

const PAPER_CLIP_ITEMS = [
  {
    title: 'Zero-Login Sharing',
    description: 'Frictionless student resource sharing platform without accounts or signup walls.'
  },
  {
    title: 'Instant Supabase Downloads',
    description: 'Distributed academic material delivery with instant high-speed downloads via Supabase storage.'
  },
  {
    title: 'Decentralized Notes Grid',
    description: 'Open knowledge index for college study guides, lecture notes, and previous year repositories.'
  }
];

const BLANK_AI_ITEMS = [
  {
    title: 'Qwen 2.5B Distillation',
    description: 'High-precision legal intelligence distilled from Qwen 2.5B parameter base architecture.'
  },
  {
    title: 'Indian Legal Corpus',
    description: 'Fine-tuned on Indian statutory provisions, constitutional case law, and regulatory compliance.'
  },
  {
    title: 'Headless Clause Inference',
    description: 'Rapid contract parsing and real-time legal research with mathematical citation accuracy.'
  }
];

const CRP_ITEMS = [
  {
    title: '542 District Agronomics',
    description: 'Machine learning model predicting optimal crop viability across 542 Indian districts.'
  },
  {
    title: 'Official Govt Datasets',
    description: 'Trained on verified Indian agricultural ministry, ICAR, and agro-climatic meteorological data.'
  },
  {
    title: 'Precision Yield Advisory',
    description: 'Recommends high-resilience, high-yield cultivars to maximize farmer margins and mitigate risk.'
  }
];

function App() {
  const [activeSection, setActiveSection] = useState('HOME');
  const isClickScrollRef = useRef(false);

  const scrollToSection = (id, label) => {
    setActiveSection(label);
    isClickScrollRef.current = true;
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => {
      isClickScrollRef.current = false;
    }, 800);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isClickScrollRef.current) return;
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(SECTIONS[i].label);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: '#000000' }}>
      {/* Fixed Fullscreen Background */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      >
        <PatternWaves
          preset="silk"
          color="#ffffff"
          backgroundColor="#000000"
          fade="none"
          interactive={false}
          cursorSize={50}
          cursorStrength={0.6}
        />
      </div>

      {/* Floating GlassSurface Section Dock */}
      <div
        style={{
          position: 'fixed',
          bottom: '36px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '94vw'
        }}
      >
        <GlassSurface
          width={640}
          height={86}
          borderRadius={43}
          distortionScale={-180}
          displace={0.5}
          backgroundOpacity={0.18}
        >
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              width: '100%',
              height: '100%',
              padding: '0 12px',
              gap: '10px'
            }}
          >
            {SECTIONS.map(section => {
              const isActive = activeSection === section.label;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => scrollToSection(section.id, section.label)}
                  style={{
                    background: isActive ? 'rgba(255, 255, 255, 0.14)' : 'transparent',
                    border: isActive
                      ? '1px solid rgba(255, 255, 255, 0.35)'
                      : '1px solid transparent',
                    color: isActive ? '#ffffff' : '#888888',
                    fontFamily: "'DotGothic16', 'Silkscreen', monospace",
                    fontSize: '16px',
                    fontWeight: 700,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    padding: '10px 18px',
                    borderRadius: '28px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.22s ease-out',
                    backdropFilter: isActive ? 'blur(4px)' : 'none',
                    boxShadow: 'none',
                    outline: 'none',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#888888';
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {isActive && (
                    <span
                      style={{
                        display: 'inline-block',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: '#ffffff'
                      }}
                    />
                  )}
                  {section.label}
                </button>
              );
            })}
          </nav>
        </GlassSurface>
      </div>

      {/* Main Content Sections */}
      <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        {/* SECTION 1: HOME */}
        <section
          id="home"
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px 20px',
            textAlign: 'center',
            position: 'relative'
          }}
        >
          {/* Top Left Corner Art: TESLACHROME DitherVeil */}
          <div
            style={{
              position: 'absolute',
              top: '24px',
              left: '28px',
              width: 'clamp(90px, 9vw, 130px)',
              height: 'clamp(120px, 12vw, 174px)',
              zIndex: 20,
              background: 'transparent',
              overflow: 'hidden'
            }}
          >
            <DitherVeil
              src={teslaChrome}
              pattern="bayer"
              pixelSize={2.2}
              levels={3}
              contrast={1.35}
              brightness={0.05}
              inkColor="#000000"
              paperColor="#ffffff"
              revealRadius={180}
              softness={0.6}
              linger={1}
            />
          </div>

          {/* Hero Headings: Blank Paper & Architects of the Inevitable */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              marginTop: '-70px'
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: 400 }}>
              <ASCIIText
                text="BLANK PAPER"
                asciiFontSize={8}
                colors={['#ff6188', '#fc9867', '#ffd866']}
                textScale={1.15}
                blocks={0.9}
                waves={0.15}
                waveSpeed={0.4}
                chroma={1}
                tilt={0.15}
                hueShift={1}
                scramble={0.6}
                clickRipple={false}
                idle
                interactive={false}
              />
            </div>

            <div
              style={{
                width: '100%',
                maxWidth: '1200px',
                margin: '-30px auto 0',
                padding: '0 20px',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <MaskedHeading
                text="Architects of the Inevitable."
                mediaType="color"
                color="#2F6BFF"
                highlightWords={['Inevitable']}
                highlightColor="#FF1E42"
                parallax={0}
                drift={0}
                reveal="wipe"
                trigger="view"
                duration={1.5}
                textScale={0.042}
                style={{ whiteSpace: 'nowrap' }}
              />
            </div>
          </div>
        </section>

        {/* SECTION 2: ABOUT US */}
        <section
          id="about-us"
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '120px 24px',
            maxWidth: '1100px',
            margin: '0 auto'
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '32px'
            }}
          >
            <span
              style={{
                fontFamily: "'DotGothic16', monospace",
                color: '#888888',
                fontSize: '16px',
                letterSpacing: '2px',
                fontWeight: 700
              }}
            >
              [ 01 // ABOUT US ]
            </span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.12)' }} />
          </div>

          {/* ScrollReveal Component */}
          <ScrollReveal
            baseOpacity={0.06}
            enableBlur={true}
            baseRotation={2}
            blurStrength={8}
            rotationEnd="bottom 85%"
            wordAnimationEnd="bottom 75%"
            highlightTerms={HIGHLIGHT_TERMS}
          >
            {ABOUT_US_TEXT}
          </ScrollReveal>
        </section>

        {/* SECTION 3: PROJECTS */}
        <section
          id="projects"
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '120px 24px',
            maxWidth: '1360px',
            margin: '0 auto'
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '48px'
            }}
          >
            <span
              style={{
                fontFamily: "'DotGothic16', monospace",
                color: '#888888',
                fontSize: '16px',
                letterSpacing: '2px',
                fontWeight: 700
              }}
            >
              [ 02 // PROJECTS ]
            </span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.12)' }} />
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'stretch',
              gap: '28px',
              width: '100%',
              overflow: 'visible'
            }}
          >
            {/* Project 1: Bharat Culture Folder (Lime Green) */}
            <div
              style={{
                background: 'rgba(10, 10, 14, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '24px',
                padding: '36px 24px 44px',
                backdropFilter: 'blur(16px)',
                flex: '1 1 310px',
                maxWidth: '360px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                overflow: 'visible'
              }}
            >
              <h3
                style={{
                  margin: '0 0 12px',
                  fontSize: '26px',
                  fontWeight: 600,
                  color: '#ffffff'
                }}
              >
                Bharat Culture
              </h3>
              <p
                style={{
                  margin: '0 0 32px',
                  color: '#a3a3a3',
                  fontSize: '15px',
                  lineHeight: '1.6',
                  maxWidth: '320px'
                }}
              >
                Eradicating the Working Capital Trap in agriculture by treating freight as a discrete computational payload.
              </p>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  minHeight: '260px',
                  position: 'relative',
                  overflow: 'visible'
                }}
              >
                <Folder
                  label="Bharat Culture"
                  items={BHARAT_CULTURE_ITEMS}
                  mode="flap"
                  variant="glass"
                  color="#1aff01"
                  theme="dark"
                  size={1.05}
                />
              </div>
            </div>

            {/* Project 2: The Scrappr Folder (Orange) */}
            <div
              style={{
                background: 'rgba(10, 10, 14, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '24px',
                padding: '36px 24px 44px',
                backdropFilter: 'blur(16px)',
                flex: '1 1 310px',
                maxWidth: '360px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                overflow: 'visible'
              }}
            >
              <h3
                style={{
                  margin: '0 0 12px',
                  fontSize: '26px',
                  fontWeight: 600,
                  color: '#ffffff'
                }}
              >
                The Scrappr
              </h3>
              <p
                style={{
                  margin: '0 0 32px',
                  color: '#a3a3a3',
                  fontSize: '15px',
                  lineHeight: '1.6',
                  maxWidth: '320px'
                }}
              >
                Hyper-optimized AI coding agent built for enterprise compute arbitrage to aggressively self-fund physical infrastructure.
              </p>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  minHeight: '260px',
                  position: 'relative',
                  overflow: 'visible'
                }}
              >
                <Folder
                  label="The Scrappr"
                  items={THE_SCRAPPR_ITEMS}
                  mode="book"
                  variant="glass"
                  color="#ff7700"
                  theme="dark"
                  size={1.05}
                />
              </div>
            </div>

            {/* Project 3: Waypoint Folder (Blue) */}
            <div
              style={{
                background: 'rgba(10, 10, 14, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '24px',
                padding: '36px 24px 44px',
                backdropFilter: 'blur(16px)',
                flex: '1 1 310px',
                maxWidth: '360px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                overflow: 'visible'
              }}
            >
              <h3
                style={{
                  margin: '0 0 12px',
                  fontSize: '26px',
                  fontWeight: 600,
                  color: '#ffffff'
                }}
              >
                Waypoint
              </h3>
              <p
                style={{
                  margin: '0 0 32px',
                  color: '#a3a3a3',
                  fontSize: '15px',
                  lineHeight: '1.6',
                  maxWidth: '320px'
                }}
              >
                A smart campus navigation system using AR as indoor navigation for sub-meter positional wayfinding.
              </p>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  minHeight: '260px',
                  position: 'relative',
                  overflow: 'visible'
                }}
              >
                <Folder
                  label="Waypoint"
                  items={WAYPOINT_ITEMS}
                  mode="flap"
                  variant="glass"
                  color="#2F6BFF"
                  theme="dark"
                  size={1.05}
                />
              </div>
            </div>

            {/* Project 4: Knight Folder (Neon Red) */}
            <div
              style={{
                background: 'rgba(10, 10, 14, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '24px',
                padding: '36px 24px 44px',
                backdropFilter: 'blur(16px)',
                flex: '1 1 310px',
                maxWidth: '360px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                overflow: 'visible'
              }}
            >
              <h3
                style={{
                  margin: '0 0 12px',
                  fontSize: '26px',
                  fontWeight: 600,
                  color: '#ffffff'
                }}
              >
                Knight
              </h3>
              <p
                style={{
                  margin: '0 0 32px',
                  color: '#a3a3a3',
                  fontSize: '15px',
                  lineHeight: '1.6',
                  maxWidth: '320px'
                }}
              >
                An Esports RUST platform with Razorpay payment gateway, YouTube Live streaming, and real-time live match updates.
              </p>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  minHeight: '260px',
                  position: 'relative',
                  overflow: 'visible'
                }}
              >
                <Folder
                  label="Knight"
                  items={KNIGHT_ITEMS}
                  mode="book"
                  variant="glass"
                  color="#ff1e42"
                  theme="dark"
                  size={1.05}
                />
              </div>
            </div>

            {/* Project 5: Paper Clip Folder (Purple) */}
            <div
              style={{
                background: 'rgba(10, 10, 14, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '24px',
                padding: '36px 24px 44px',
                backdropFilter: 'blur(16px)',
                flex: '1 1 310px',
                maxWidth: '360px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                overflow: 'visible'
              }}
            >
              <h3
                style={{
                  margin: '0 0 12px',
                  fontSize: '26px',
                  fontWeight: 600,
                  color: '#ffffff'
                }}
              >
                Paper Clip
              </h3>
              <p
                style={{
                  margin: '0 0 32px',
                  color: '#a3a3a3',
                  fontSize: '15px',
                  lineHeight: '1.6',
                  maxWidth: '320px'
                }}
              >
                A student resource sharing platform without any logins, offering instant high-speed downloads using Supabase.
              </p>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  minHeight: '260px',
                  position: 'relative',
                  overflow: 'visible'
                }}
              >
                <Folder
                  label="Paper Clip"
                  items={PAPER_CLIP_ITEMS}
                  mode="flap"
                  variant="glass"
                  color="#b026ff"
                  theme="dark"
                  size={1.05}
                />
              </div>
            </div>

            {/* Project 6: Blank AI Folder (Yellow) */}
            <div
              style={{
                background: 'rgba(10, 10, 14, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '24px',
                padding: '36px 24px 44px',
                backdropFilter: 'blur(16px)',
                flex: '1 1 310px',
                maxWidth: '360px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                overflow: 'visible'
              }}
            >
              <h3
                style={{
                  margin: '0 0 12px',
                  fontSize: '26px',
                  fontWeight: 600,
                  color: '#ffffff'
                }}
              >
                Blank AI
              </h3>
              <p
                style={{
                  margin: '0 0 32px',
                  color: '#a3a3a3',
                  fontSize: '15px',
                  lineHeight: '1.6',
                  maxWidth: '320px'
                }}
              >
                A legal AI model created by distillation method from Qwen 2.5B parameters.
              </p>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  minHeight: '260px',
                  position: 'relative',
                  overflow: 'visible'
                }}
              >
                <Folder
                  label="Blank AI"
                  items={BLANK_AI_ITEMS}
                  mode="book"
                  variant="glass"
                  color="#ffd600"
                  theme="dark"
                  size={1.05}
                />
              </div>
            </div>

            {/* Project 7: CRP Folder (Pink) */}
            <div
              style={{
                background: 'rgba(10, 10, 14, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '24px',
                padding: '36px 24px 44px',
                backdropFilter: 'blur(16px)',
                flex: '1 1 310px',
                maxWidth: '360px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                overflow: 'visible'
              }}
            >
              <h3
                style={{
                  margin: '0 0 12px',
                  fontSize: '26px',
                  fontWeight: 600,
                  color: '#ffffff'
                }}
              >
                CRP
              </h3>
              <p
                style={{
                  margin: '0 0 32px',
                  color: '#a3a3a3',
                  fontSize: '15px',
                  lineHeight: '1.6',
                  maxWidth: '320px'
                }}
              >
                An ML model based on official government data that recommends the top crops for 542 districts in India.
              </p>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  minHeight: '260px',
                  position: 'relative',
                  overflow: 'visible'
                }}
              >
                <Folder
                  label="CRP"
                  items={CRP_ITEMS}
                  mode="flap"
                  variant="glass"
                  color="#ff2d75"
                  theme="dark"
                  size={1.05}
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: TEAM */}
        <section
          id="team"
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '120px 24px 80px',
            maxWidth: '1280px',
            margin: '0 auto'
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '48px'
            }}
          >
            <span
              style={{
                fontFamily: "'DotGothic16', monospace",
                color: '#888888',
                fontSize: '16px',
                letterSpacing: '2px',
                fontWeight: 700
              }}
            >
              [ 03 // TEAM BLANK PAPER ]
            </span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.12)' }} />
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'flex-start',
              gap: '32px',
              width: '100%'
            }}
          >
            {/* Slot 1: VISHNUPRIYAN S */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                width: '260px'
              }}
            >
              <HoloCard
                image={member01}
                alt="VISHNUPRIYAN S - TEAM LEADER"
                preset="none"
                width={260}
                radius={14}
                frame={5}
                zoom={1.65}
                imageOffset={[-0.09, -0.12]}
                edgeSparkle={0}
                glare={0}
                foilColor="#e2e6ec"
                intensity={0.8}
              />
              <div style={{ marginTop: '16px' }}>
                <h4 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: 600, color: '#ffffff' }}>
                  VISHNUPRIYAN S
                </h4>
                <span
                  style={{
                    fontFamily: "'DotGothic16', monospace",
                    color: '#2F6BFF',
                    textShadow:
                      '-1px -1px 0 #000, 0px -1px 0 #000, 1px -1px 0 #000, -1px 0px 0 #000, 1px 0px 0 #000, -1px 1px 0 #000, 0px 1px 0 #000, 1px 1px 0 #000',
                    fontSize: '13px',
                    letterSpacing: '1.5px'
                  }}
                >
                  TEAM LEADER
                </span>
              </div>
            </div>

            {/* Slot 2: HARI DHANUSH C */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                width: '260px'
              }}
            >
              <HoloCard
                image={member02}
                alt="HARI DHANUSH C - OPS HEAD"
                preset="none"
                width={260}
                radius={14}
                frame={5}
                zoom={1.25}
                imageOffset={[-0.10, -0.04]}
                edgeSparkle={0}
                glare={0}
                foilColor="#e2e6ec"
                intensity={0.8}
              />
              <div style={{ marginTop: '16px' }}>
                <h4 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: 600, color: '#ffffff' }}>
                  HARI DHANUSH C
                </h4>
                <span
                  style={{
                    fontFamily: "'DotGothic16', monospace",
                    color: '#2F6BFF',
                    textShadow:
                      '-1px -1px 0 #000, 0px -1px 0 #000, 1px -1px 0 #000, -1px 0px 0 #000, 1px 0px 0 #000, -1px 1px 0 #000, 0px 1px 0 #000, 1px 1px 0 #000',
                    fontSize: '13px',
                    letterSpacing: '1.5px'
                  }}
                >
                  OPS HEAD
                </span>
              </div>
            </div>

            {/* Slot 3: LEELA KRISHNA S */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                width: '260px'
              }}
            >
              <HoloCard
                image={member03}
                alt="LEELA KRISHNA S - CORE TEAM MEMBER"
                preset="none"
                width={260}
                radius={14}
                frame={5}
                imageOffset={[0, -0.02]}
                edgeSparkle={0}
                glare={0}
                foilColor="#e2e6ec"
                intensity={0.8}
              />
              <div style={{ marginTop: '16px' }}>
                <h4 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: 600, color: '#ffffff' }}>
                  LEELA KRISHNA S
                </h4>
                <span
                  style={{
                    fontFamily: "'DotGothic16', monospace",
                    color: '#2F6BFF',
                    textShadow:
                      '-1px -1px 0 #000, 0px -1px 0 #000, 1px -1px 0 #000, -1px 0px 0 #000, 1px 0px 0 #000, -1px 1px 0 #000, 0px 1px 0 #000, 1px 1px 0 #000',
                    fontSize: '13px',
                    letterSpacing: '1.5px'
                  }}
                >
                  CORE TEAM MEMBER
                </span>
              </div>
            </div>

            {/* Slot 4: PARTHIBAN S */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                width: '260px'
              }}
            >
              <HoloCard
                image={member04}
                alt="PARTHIBAN S - CORE TEAM MEMBER"
                preset="none"
                width={260}
                radius={14}
                frame={5}
                edgeSparkle={0}
                glare={0}
                intensity={0.8}
                foilColor="#e2e6ec"
              />
              <div style={{ marginTop: '16px' }}>
                <h4 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: 600, color: '#ffffff' }}>
                  PARTHIBAN S
                </h4>
                <span
                  style={{
                    fontFamily: "'DotGothic16', monospace",
                    color: '#2F6BFF',
                    textShadow:
                      '-1px -1px 0 #000, 0px -1px 0 #000, 1px -1px 0 #000, -1px 0px 0 #000, 1px 0px 0 #000, -1px 1px 0 #000, 0px 1px 0 #000, 1px 1px 0 #000',
                    fontSize: '13px',
                    letterSpacing: '1.5px'
                  }}
                >
                  CORE TEAM MEMBER
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Footer Credits & Copyright */}
        <footer
          style={{
            width: '100%',
            padding: '24px clamp(24px, 4vw, 56px) 64px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '20px'
          }}
        >
          {/* Left Side: Powered & Co Powered */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '6px',
              textAlign: 'left'
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: "'DotGothic16', monospace",
                fontSize: 'clamp(20px, 2.2vw, 26px)',
                fontWeight: 600,
                letterSpacing: '2px',
                lineHeight: 1.25,
                color: 'rgba(255, 255, 255, 0.85)',
                paintOrder: 'stroke fill',
                WebkitTextStroke: '1px #000000',
                textShadow:
                  '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 2px 10px rgba(0, 0, 0, 0.7)'
              }}
            >
              Powered By Stubbornness
            </p>
            <p
              style={{
                margin: 0,
                fontFamily: "'DotGothic16', monospace",
                fontSize: 'clamp(18px, 1.8vw, 22px)',
                fontWeight: 600,
                letterSpacing: '2px',
                lineHeight: 1.25,
                color: 'rgba(255, 255, 255, 0.85)',
                paintOrder: 'stroke fill',
                WebkitTextStroke: '1px #000000',
                textShadow:
                  '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 2px 10px rgba(0, 0, 0, 0.7)'
              }}
            >
              Co Powered By Ego
            </p>
          </div>

          {/* Right Side: Copyright Team Blank Paper */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              textAlign: 'right'
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: "'DotGothic16', monospace",
                fontSize: 'clamp(18px, 1.8vw, 22px)',
                fontWeight: 600,
                letterSpacing: '2px',
                lineHeight: 1.25,
                color: 'rgba(255, 255, 255, 0.85)',
                paintOrder: 'stroke fill',
                WebkitTextStroke: '1px #000000',
                textShadow:
                  '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 2px 10px rgba(0, 0, 0, 0.7)'
              }}
            >
              © Team Blank Paper
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
