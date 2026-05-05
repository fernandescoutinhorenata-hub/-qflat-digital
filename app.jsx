// BILINHO - 3D Print Marketplace Portfolio
// Visual system: Space Grotesk + Inter, Purple/White/Orange palette

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primaryColor": "#7c3aed",
  "accentColor": "#f97316",
  "darkBg": "#1a0a2e",
  "heroTitle": "Transformamos suas ideias em realidade",
  "ctaText": "Solicitar Orçamento Grátis",
  "showReviews": true,
  "cardStyle": "shadow",
  "animationsEnabled": true
}/*EDITMODE-END*/;

const SHEETS_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSfodiat6mVYPYdcsbt2LkO3quUTdDTya3dl0JZHDYDvmwZExJAk9rO3GtNmrmnQ00ukjnf_A4ppvVA/pub?output=csv";

function parseCSV(text) {
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",").map(h => 
    h.trim().replace(/^"|"$/g, ""));
  return lines.slice(1).map(line => {
    const values = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '"') {
        inQuotes = !inQuotes;
      } else if (line[i] === "," && !inQuotes) {
        values.push(current.trim());
        current = "";
      } else {
        current += line[i];
      }
    }
    values.push(current.trim());
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = values[i] || "";
    });
    return {
      id: Number(obj.id),
      name: obj.name,
      category: obj.category,
      material: obj.material,
      customization: obj.customization,
      price: obj.price,
      badge: obj.badge || null,
      color: obj.color,
      image: obj.image || null,
      image2: obj.image2 || null,
      image3: obj.image3 || null,
      description: obj.description,
      details: obj.details ? obj.details.split("|") : [],
      images: [obj.color, obj.color, obj.color],
      reviews: []
    };
  });
}

function getDriveImage(url) {
  if (!url) return null;
  
  // Extrai o ID do link do Google Drive
  const match = url.match(
    /(?:id=|\/d\/)([a-zA-Z0-9_-]{10,})/
  );
  if (!match) return url;
  
  const id = match[1];
  
  // Usa thumbnail do Google que não tem CORS
  return `https://drive.google.com/thumbnail?id=${id}&sz=w800`;
}




const PORTFOLIO = [
  { id: 1, title: "Réplica de Arquitetura", client: "Studio AR", before: "oklch(85% 0.03 280)", after: "oklch(50% 0.20 280)", tag: "Maquete" },
  { id: 2, title: "Peça Industrial Custom", client: "TechFab Ltda", before: "oklch(85% 0.03 220)", after: "oklch(45% 0.12 220)", tag: "Protótipo" },
  { id: 3, title: "Troféu Corporativo", client: "GameOn Summit", before: "oklch(85% 0.03 45)", after: "oklch(60% 0.22 45)", tag: "Brinde" },
];

// ─── ICONS ──────────────────────────────────────────────
const Icon = ({ name, size = 20, color = "currentColor" }) => {
  const icons = {
    menu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    x: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    star: <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>,
    arrow: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5"><polyline points="20,6 9,17 4,12"/></svg>,
    cube: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27,6.96 12,12.01 20.73,6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
    send: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9"/></svg>,
    print: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><polyline points="6,9 6,2 18,2 18,9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>,
    truck: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><rect x="1" y="3" width="15" height="13"/><polygon points="16,8 20,8 23,11 23,16 16,16 16,8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
    pencil: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
    whatsapp: <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>,
    instagram: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill={color} stroke="none"/></svg>,
    filter: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"/></svg>,
    close: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>,
    location: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    mail: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  };
  return icons[name] || null;
};

// ─── BADGE ──────────────────────────────────────────────
const Badge = ({ text }) => {
  const colors = {
    POPULAR: { bg: "var(--orange)", color: "#fff" },
    PRO: { bg: "var(--purple)", color: "#fff" },
    NOVO: { bg: "oklch(55% 0.20 160)", color: "#fff" },
    EXCLUSIVO: { bg: "oklch(55% 0.20 10)", color: "#fff" },
  };
  const c = colors[text] || { bg: "var(--gray-200)", color: "var(--gray-800)" };
  return (
    <span style={{
      display: "inline-block", padding: "3px 10px",
      background: c.bg, color: c.color,
      fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
      borderRadius: 99, fontFamily: "var(--font-head)", textTransform: "uppercase"
    }}>{text}</span>
  );
};

// ─── NAVBAR ──────────────────────────────────────────────
const Navbar = ({ onQuote }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Produtos", href: "#produtos" },
    { label: "Sobre", href: "#sobre" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid oklch(88% 0.015 280)" : "1px solid transparent",
      transition: "all 0.3s ease",
      padding: "0 24px",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 68,
      }}>
        {/* Logo */}
        <div 
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }} 
          onClick={() => window.scrollTo({top:0,behavior:"smooth"})}>
          <img 
            src="https://res.cloudinary.com/dzo5tqghf/image/upload/v1778016623/01_-_LOGO_FLAT_dom9us.png" 
            alt="flat. a sua agência digital"
            className="logo-img"
            style={{ 
              height: 38,
              width: "auto",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
          {links.map(l => (
            <a key={l.label} href={l.href} style={{
              fontFamily: "var(--font-head)", fontWeight: 500, fontSize: 15,
              color: "var(--gray-600)", textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => e.target.style.color = "var(--purple)"}
            onMouseLeave={e => e.target.style.color = "var(--gray-600)"}
            >{l.label}</a>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button onClick={() => window.open("https://wa.me/5579999990966", "_blank")} style={{
            background: "var(--orange)", color: "#fff",
            border: "none", borderRadius: 99,
            padding: "10px 22px",
            fontFamily: "var(--font-head)", fontWeight: 600, fontSize: 14,
            cursor: "pointer", transition: "all 0.2s",
            boxShadow: "0 2px 12px oklch(68% 0.19 45 / 0.35)",
          }}
          onMouseEnter={e => { e.target.style.background = "var(--orange-hover)"; e.target.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.target.style.background = "var(--orange)"; e.target.style.transform = ""; }}
          >Orçamento Grátis →</button>
          <button onClick={() => setMobileOpen(!mobileOpen)} style={{
            background: "none", border: "none", cursor: "pointer", padding: 4, display: "none"
          }} className="mobile-menu-btn">
            <Icon name={mobileOpen ? "x" : "menu"} size={22} color="var(--purple)" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          background: "#fff", padding: "16px 24px 24px",
          borderTop: "1px solid var(--gray-100)",
          display: "flex", flexDirection: "column", gap: 16,
        }}>
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)} style={{
              fontFamily: "var(--font-head)", fontWeight: 600, fontSize: 16,
              color: "var(--text)", textDecoration: "none",
            }}>{l.label}</a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .logo-img { height: 28px !important; }
        }
      `}</style>
    </nav>
  );
};

// ─── HERO ──────────────────────────────────────────────
const Hero = ({ onQuote, tweaks }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <section style={{
      minHeight: "100vh",
      background: `radial-gradient(ellipse 80% 60% at 60% 30%, oklch(92% 0.08 280) 0%, oklch(98% 0.02 280) 55%, white 100%)`,
      display: "flex", alignItems: "center",
      padding: "100px 24px 60px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Grid pattern */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(oklch(45% 0.22 280 / 0.04) 1px, transparent 1px), linear-gradient(90deg, oklch(45% 0.22 280 / 0.04) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }} />

      <div className="hero-grid" style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        {/* Left */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "oklch(68% 0.19 45 / 0.12)", color: "var(--orange)",
            padding: "6px 14px", borderRadius: 99, marginBottom: 24,
            fontSize: 12, fontWeight: 700, fontFamily: "var(--font-head)", letterSpacing: "0.06em",
            border: "1px solid oklch(68% 0.19 45 / 0.25)",
          }}>
            ✦ IMPRESSÃO 3D SOB DEMANDA
          </div>

          <h1 style={{
            fontFamily: "var(--font-head)", fontWeight: 700,
            fontSize: "clamp(36px, 5vw, 60px)", lineHeight: 1.1,
            color: "var(--text)", marginBottom: 20,
            textWrap: "balance",
          }}>
            {tweaks.heroTitle}<br />
            <span style={{ color: "var(--purple)" }}>com Impressão 3D</span>
          </h1>

          <p style={{
            fontSize: 17, lineHeight: 1.7, color: "var(--gray-600)",
            maxWidth: 480, marginBottom: 36,
            fontFamily: "var(--font-body)",
          }}>
            Envie sua ideia, nós criamos. Miniaturas, peças técnicas, decoração e brindes personalizados, do projeto à entrega, com qualidade profissional.
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }}>
            <button onClick={() => window.open("https://wa.me/5579999990966", "_blank")} style={{
              background: "var(--orange)", color: "#fff", border: "none",
              borderRadius: 99, padding: "15px 32px",
              fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 15,
              cursor: "pointer", transition: "all 0.25s",
              boxShadow: "0 4px 20px oklch(68% 0.19 45 / 0.40)",
              display: "flex", alignItems: "center", gap: 8,
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px oklch(68% 0.19 45 / 0.50)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 20px oklch(68% 0.19 45 / 0.40)"; }}
            >
              {tweaks.ctaText} <Icon name="arrow" size={16} color="#fff" />
            </button>
            <a href="#produtos" style={{
              background: "transparent", color: "var(--purple)",
              border: "2px solid oklch(45% 0.22 280 / 0.3)", borderRadius: 99,
              padding: "13px 28px", textDecoration: "none",
              fontFamily: "var(--font-head)", fontWeight: 600, fontSize: 15,
              transition: "all 0.2s", display: "inline-flex", alignItems: "center",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "oklch(45% 0.22 280 / 0.06)"; e.currentTarget.style.borderColor = "var(--purple)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "oklch(45% 0.22 280 / 0.3)"; }}
            >Ver Produtos</a>
          </div>

          <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            {[
              { icon: "check", text: "Prazo garantido" },
              { icon: "check", text: "Materiais premium" },
              { icon: "check", text: "100% personalizado" },
            ].map(item => (
              <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{ width: 18, height: 18, borderRadius: 99, background: "oklch(55% 0.20 160 / 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="check" size={11} color="oklch(45% 0.22 160)" />
                </div>
                <span style={{ fontSize: 13, color: "var(--gray-600)", fontWeight: 500 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — 3D visual */}
        <div className="hero-visual" style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
          {/* Glow blob */}
          <div style={{
            position: "absolute", width: 300, height: 300, borderRadius: "50%",
            background: "oklch(60% 0.20 280 / 0.25)",
            filter: "blur(80px)", pointerEvents: "none",
          }} />

          {/* Main cube visual */}
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              width: 280, height: 280,
              background: "white",
              borderRadius: 28,
              boxShadow: hovered
                ? "0 32px 80px oklch(45% 0.22 280 / 0.30), 0 0 0 1px oklch(45% 0.22 280 / 0.15)"
                : "0 20px 60px oklch(45% 0.22 280 / 0.18), 0 0 0 1px oklch(45% 0.22 280 / 0.08)",
              transform: hovered ? "translateY(-8px) rotate(1deg)" : "translateY(0) rotate(0deg)",
              transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 12,
              cursor: "default", position: "relative", overflow: "hidden",
            }}>

            {/* Layers visual */}
            <div style={{ position: "relative", width: 140, height: 140 }}>
              {[0,1,2,3,4].map(i => (
                <div key={i} style={{
                  position: "absolute", left: "50%",
                  width: 140 - i*16, height: 20,
                  background: i === 0 ? "var(--purple)" : `oklch(${55+i*8}% ${0.22-i*0.03} 280)`,
                  borderRadius: 4,
                  transform: `translateX(-50%) translateY(${i * 22}px)`,
                  opacity: 1-i*0.12,
                  transition: "all 0.3s",
                }} />
              ))}
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 15, color: "var(--text)" }}>Impressão em Camadas</div>
              <div style={{ fontSize: 12, color: "var(--gray-400)", marginTop: 2 }}>PRECISÃO 0.1mm</div>
            </div>

            {/* Orange badge */}
            <div style={{
              position: "absolute", bottom: 16, right: 16,
              background: "var(--orange)", color: "#fff",
              borderRadius: 99, padding: "5px 12px",
              fontSize: 11, fontWeight: 700, fontFamily: "var(--font-head)",
            }}>PERSONALIZADO</div>
          </div>

          {/* Floating chips */}
          <FloatingChip top={-20} left={20} delay={0} label="Camada 0.1mm" icon="cube" />
          <FloatingChip top={80} right={-40} delay={0.3} label="PLA Premium" icon="check" />
          <FloatingChip bottom={20} left={-30} delay={0.6} label="Entrega rápida" icon="truck" />
        </div>
      </div>

      {/* Stats bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: "white", borderTop: "1px solid var(--gray-100)",
        padding: "20px 24px",
      }}>
        <div className="stats-bar" style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "center", gap: "clamp(24px, 5vw, 80px)", flexWrap: "wrap" }}>
          {[
            { value: "+500", label: "Projetos entregues" },
            { value: "4.9★", label: "Avaliação média" },
            { value: "48h", label: "Prazo médio" },
            { value: "100%", label: "Personalizado" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 22, color: "var(--purple)" }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "var(--gray-400)", marginTop: 2, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { 
            grid-template-columns: 1fr !important; 
          }
          .hero-visual { 
            display: none !important; 
          }
          .hero-badges {
            flex-direction: column !important;
            gap: 8px !important;
          }
          .stats-bar {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  );
};

const FloatingChip = ({ top, bottom, left, right, delay, label, icon }) => {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300 + delay * 400);
    return () => clearTimeout(t);
  }, []);

  const style = {
    position: "absolute",
    ...(top !== undefined && { top }),
    ...(bottom !== undefined && { bottom }),
    ...(left !== undefined && { left }),
    ...(right !== undefined && { right }),
    background: "white",
    borderRadius: 99,
    padding: "8px 14px",
    display: "flex", alignItems: "center", gap: 8,
    boxShadow: "0 4px 16px oklch(45% 0.22 280 / 0.15), 0 0 0 1px oklch(88% 0.015 280)",
    fontSize: 12, fontWeight: 600, fontFamily: "var(--font-head)",
    color: "var(--text)", whiteSpace: "nowrap",
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(8px)",
    transition: "all 0.5s cubic-bezier(.22,1,.36,1)",
    zIndex: 2,
  };

  return (
    <div style={style}>
      <div style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--purple-pale)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name={icon} size={11} color="var(--purple)" />
      </div>
      {label}
    </div>
  );
};

// ─── FILTERS ──────────────────────────────────────────────
const CATEGORIES = ["Todos", "Personalizados 3D", "Social Mídia"];
const CUSTOMIZATIONS = ["Todos", "Alta", "Média", "Total"];

const Filters = ({ activeCategory, setCategory, activeCustomization, setCustomization, priceFilter, setPriceFilter }) => {
  const [open, setOpen] = React.useState(false);

  const chipStyle = (active) => ({
    padding: "7px 16px", borderRadius: 99, fontSize: 13, fontWeight: 600,
    fontFamily: "var(--font-head)", cursor: "pointer", border: "1.5px solid",
    borderColor: active ? "var(--purple)" : "var(--gray-200)",
    background: active ? "var(--purple)" : "white",
    color: active ? "white" : "var(--gray-600)",
    transition: "all 0.15s", whiteSpace: "nowrap",
  });

  return (
    <div style={{ background: "white", border: "1px solid var(--gray-100)", borderRadius: 20, padding: "20px 24px", marginBottom: 32, boxShadow: "var(--shadow-sm)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <Icon name="filter" size={16} color="var(--gray-400)" />
        <span style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 14, color: "var(--text)" }}>Filtros</span>
        <button onClick={() => setOpen(!open)} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "var(--purple)", fontWeight: 600, fontFamily: "var(--font-head)" }}>
          {open ? "Recolher ▲" : "Expandir ▼"}
        </button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: open ? 20 : 0 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "var(--gray-400)", fontFamily: "var(--font-head)", letterSpacing: "0.06em", alignSelf: "center", marginRight: 4 }}>CATEGORIA</span>
        {CATEGORIES.map(c => (
          <button key={c} style={chipStyle(activeCategory === c)} onClick={() => setCategory(c)}
            onMouseEnter={e => { if (activeCategory !== c) { e.currentTarget.style.borderColor = "var(--purple)"; e.currentTarget.style.color = "var(--purple)"; } }}
            onMouseLeave={e => { if (activeCategory !== c) { e.currentTarget.style.borderColor = "var(--gray-200)"; e.currentTarget.style.color = "var(--gray-600)"; } }}
          >{c}</button>
        ))}
      </div>

      {open && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--gray-400)", fontFamily: "var(--font-head)", letterSpacing: "0.06em", marginRight: 4 }}>PERSONALIZAÇÃO</span>
            {CUSTOMIZATIONS.map(c => (
              <button key={c} style={chipStyle(activeCustomization === c)} onClick={() => setCustomization(c)}
                onMouseEnter={e => { if (activeCustomization !== c) { e.currentTarget.style.borderColor = "var(--purple)"; e.currentTarget.style.color = "var(--purple)"; } }}
                onMouseLeave={e => { if (activeCustomization !== c) { e.currentTarget.style.borderColor = "var(--gray-200)"; e.currentTarget.style.color = "var(--gray-600)"; } }}
              >{c}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── PRODUCT CARD ──────────────────────────────────────────────
const ProductCard = ({ product, onClick }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onClick={() => onClick(product)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "white", borderRadius: 20,
        border: `1.5px solid ${hovered ? "oklch(45% 0.22 280 / 0.30)" : "var(--gray-100)"}`,
        overflow: "hidden", cursor: "pointer",
        transition: "all 0.25s cubic-bezier(.22,1,.36,1)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "var(--shadow-lg)" : "var(--shadow-sm)",
      }}>

      {/* Image area */}
      <div style={{
        height: 180,
        background: product.image 
          ? "var(--gray-50)" 
          : `linear-gradient(135deg, 
              ${product.color}33 0%, 
              ${product.color}66 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {product.image ? (
          <img
            src={getDriveImage(product.image)}
            alt={product.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.3s",
            }}
            onError={e => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}
        <div style={{
          width: 100, height: 100, borderRadius: 18,
          background: product.color,
          boxShadow: `0 12px 32px ${product.color}66`,
          display: product.image ? "none" : "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: hovered ?
            "rotate(6deg) scale(1.08)" :
            "rotate(3deg) scale(1)",
          transition: "transform 0.3s",
        }}>
          <Icon name="cube" size={36}
            color="rgba(255,255,255,0.85)" />
        </div>

        {product.badge && (
          <div style={{ position: "absolute", top: 12, left: 12 }}>
            <Badge text={product.badge} />
          </div>
        )}

        <div style={{
          position: "absolute", top: 12, right: 12,
          background: "white", borderRadius: 99, padding: "4px 10px",
          fontSize: 11, fontWeight: 600, color: "var(--gray-600)", fontFamily: "var(--font-head)",
        }}>{product.category}</div>
      </div>

      {/* Content */}
      <div style={{ padding: "16px 18px 18px" }}>
        <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 16, color: "var(--text)", marginBottom: 4 }}>{product.name}</h3>
        <p style={{ fontSize: 13, color: "var(--gray-400)", marginBottom: 14, lineHeight: 1.5 }}>Material: {product.material} · {product.customization} personalização</p>

        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 11, color: "var(--gray-400)", fontWeight: 500, marginBottom: 1 }}>Preço</div>
            <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 15, color: "var(--purple)", whiteSpace: "nowrap" }}>{product.price}</div>
          </div>
          <button style={{
            background: hovered ? "var(--orange)" : "var(--purple)",
            color: "white", border: "none", borderRadius: 99,
            padding: "9px 18px", fontSize: 13, fontWeight: 600,
            fontFamily: "var(--font-head)", cursor: "pointer",
            transition: "all 0.2s",
            flexShrink: 0,
          }}>Ver Detalhes</button>
        </div>
      </div>
    </div>
  );
};

// ─── PRODUCT DETAIL MODAL ──────────────────────────────────────────────
const ProductModal = ({ product, onClose, onQuote }) => {
  const [activeImage, setActiveImage] = React.useState(0);

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 2000,
      background: "rgba(18, 6, 36, 0.65)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20,
    }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>

      <div style={{
        background: "white", borderRadius: 24, width: "100%", maxWidth: 860,
        maxHeight: "90vh", overflow: "auto",
        boxShadow: "0 32px 80px rgba(0,0,0,0.35)",
        position: "relative",
      }}>

        {/* Close */}
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16, zIndex: 10,
          background: "var(--gray-100)", border: "none", borderRadius: "50%",
          width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
        }}>
          <Icon name="x" size={16} color="var(--gray-600)" />
        </button>

        <div className="modal-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
          {/* Images */}
          <div style={{ padding: 28 }}>
            <div style={{
              height: 280, borderRadius: 16, marginBottom: 12,
              background: product.image 
                ? "var(--gray-50)" 
                : `linear-gradient(135deg, 
                    ${product.images[activeImage]}33, 
                    ${product.images[activeImage]}88)`,
              display: "flex", alignItems: "center", 
              justifyContent: "center",
              overflow: "hidden",
            }}>
              {(() => {
                const allImages = [
                  product.image,
                  product.image2,
                  product.image3
                ].filter(Boolean);

                const currentImage = allImages.length > 0
                  ? allImages[activeImage] || allImages[0]
                  : null;

                return currentImage ? (
                  <img
                    src={getDriveImage(currentImage)}
                    alt={product.name}
                    style={{
                      width: "100%", height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      borderRadius: 16,
                    }}
                  />
                ) : (
                  <div style={{
                    width: 120, height: 120, borderRadius: 20,
                    background: product.images[activeImage],
                    boxShadow: `0 16px 40px 
                      ${product.images[activeImage]}55`,
                    display: "flex", alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <Icon name="cube" size={48}
                      color="rgba(255,255,255,0.85)" />
                  </div>
                );
              })()}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {(() => {
                const allImages = [
                  product.image,
                  product.image2,
                  product.image3
                ].filter(Boolean);

                const displayImages = allImages.length > 0 
                  ? allImages 
                  : product.images;

                return displayImages.map((img, i) => (
                  <div 
                    key={i} 
                    onClick={() => setActiveImage(i)}
                    style={{
                      flex: 1, height: 60, borderRadius: 10,
                      border: `2px solid ${activeImage === i 
                        ? "var(--purple)" : "var(--gray-100)"}`,
                      cursor: "pointer",
                      transition: "border 0.15s",
                      overflow: "hidden",
                      background: "var(--gray-50)",
                    }}>
                    {allImages.length > 0 ? (
                      <img
                        src={getDriveImage(img)}
                        alt={`${product.name} ${i + 1}`}
                        style={{
                          width: "100%", height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div style={{
                        width: "100%", height: "100%",
                        background: `linear-gradient(135deg, 
                          ${img}44, ${img}88)`,
                        display: "flex", alignItems: "center",
                        justifyContent: "center",
                      }}>
                        <div style={{ 
                          width: 28, height: 28,
                          borderRadius: 6, background: img 
                        }} />
                      </div>
                    )}
                  </div>
                ));
              })()}
            </div>
          </div>

          {/* Details */}
          <div className="modal-details" style={{ padding: "28px 28px 28px 0" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
              <Badge text={product.badge || "DISPONÍVEL"} />
              <span style={{ fontSize: 12, color: "var(--gray-400)", alignSelf: "center" }}>{product.category}</span>
            </div>

            <h2 style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 24, color: "var(--text)", marginBottom: 10 }}>{product.name}</h2>
            <p style={{ fontSize: 14, color: "var(--gray-600)", lineHeight: 1.7, marginBottom: 20 }}>{product.description}</p>

            {/* Includes */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--gray-400)", letterSpacing: "0.06em", marginBottom: 8 }}>INCLUI</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {product.details.map(d => (
                  <div key={d} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <div style={{ width: 16, height: 16, borderRadius: "50%", background: "oklch(55% 0.20 160 / 0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name="check" size={9} color="oklch(45% 0.22 160)" />
                    </div>
                    <span style={{ fontSize: 13, color: "var(--gray-600)" }}>{d}</span>
                  </div>
                ))}
              </div>
            </div>



            {/* Price */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 11, color: "var(--gray-400)" }}>Investimento</div>
                <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 22, color: "var(--purple)" }}>{product.price}</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>

              <button 
                onClick={() => window.open("https://wa.me/5579999990966", "_blank")}
                style={{
                  flex: 1,
                  background: "white", 
                  color: "var(--purple)",
                  border: "2px solid var(--purple)", 
                  borderRadius: 12, 
                  padding: "14px",
                  fontFamily: "var(--font-head)", 
                  fontWeight: 700, 
                  fontSize: 14,
                  cursor: "pointer", 
                  transition: "all 0.2s",
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  gap: 8,
                }}
                onMouseEnter={e => { 
                  e.currentTarget.style.background = "var(--purple)"; 
                  e.currentTarget.style.color = "white"; 
                }}
                onMouseLeave={e => { 
                  e.currentTarget.style.background = "white"; 
                  e.currentTarget.style.color = "var(--purple)"; 
                }}
              >
                <Icon name="whatsapp" size={16} color="currentColor" />
                Fazer Orçamento
              </button>

              <button 
                onClick={() => window.open("https://wa.me/5579999990966", "_blank")}
                style={{
                  flex: 1,
                  background: "var(--orange)", 
                  color: "white",
                  border: "none", 
                  borderRadius: 12, 
                  padding: "14px",
                  fontFamily: "var(--font-head)", 
                  fontWeight: 700, 
                  fontSize: 14,
                  cursor: "pointer", 
                  transition: "all 0.2s",
                  boxShadow: "0 4px 16px oklch(68% 0.19 45 / 0.35)",
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  gap: 8,
                }}
                onMouseEnter={e => { 
                  e.currentTarget.style.background = "var(--orange-hover)"; 
                }}
                onMouseLeave={e => { 
                  e.currentTarget.style.background = "var(--orange)"; 
                }}
              >
                <Icon name="whatsapp" size={16} color="white" />
                Finalizar Compra
              </button>

            </div>
          </div>
        </div>

        {/* Reviews */}
        {product.reviews.length > 0 && (
          <div style={{ padding: "24px 28px", borderTop: "1px solid var(--gray-100)" }}>
            <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "var(--font-head)", color: "var(--text)", marginBottom: 16 }}>
              Avaliações ({product.reviews.length})
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
              {product.reviews.map((r, i) => (
                <div key={i} style={{ background: "var(--gray-50)", borderRadius: 12, padding: "16px" }}>
                  <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
                    {Array.from({length: r.stars}).map((_, j) => <Icon key={j} name="star" size={14} color="var(--orange)" />)}
                  </div>
                  <p style={{ fontSize: 13, color: "var(--gray-600)", lineHeight: 1.6, marginBottom: 12, fontStyle: "italic" }}>"{r.text}"</p>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--purple)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 11, color: "white", fontWeight: 700 }}>{r.name[0]}</span>
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>{r.name}</div>
                      <div style={{ fontSize: 11, color: "var(--gray-400)" }}>{r.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <style>{`
          @media (max-width: 768px) {
            .modal-grid {
              grid-template-columns: 1fr !important;
            }
            .modal-details {
              padding: 0 28px 28px !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

// ─── PRODUCTS SECTION ──────────────────────────────────────────────
const ProductsSection = ({ onQuote }) => {
  const [activeCategory, setCategory] = React.useState("Todos");
  const [activeCustomization, setCustomization] = React.useState("Todos");
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  const [PRODUCTS, setProducts] = React.useState([]);
  const [loadingProducts, setLoadingProducts] = React.useState(true);

  React.useEffect(() => {
    fetch(SHEETS_URL)
      .then(res => res.text())
      .then(text => {
        const parsed = parseCSV(text);
        console.log("Primeiro produto:", parsed[0]);
        console.log("Colunas:", Object.keys(parsed[0]));
        setProducts(parsed);
        setLoadingProducts(false);
      })
      .catch(err => {
        console.error("Erro ao carregar produtos:", err);
        setLoadingProducts(false);
      });
  }, []);

  const filtered = PRODUCTS.filter(p => {
    if (activeCategory !== "Todos" && p.category !== activeCategory) return false;
    if (activeCustomization !== "Todos" && p.customization !== activeCustomization) return false;
    return true;
  });

  return (
    <section id="produtos" style={{ padding: "80px 24px", background: "var(--gray-50)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "var(--orange)", fontFamily: "var(--font-head)", marginBottom: 12 }}>NOSSOS SERVIÇOS</div>
          <h2 style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "clamp(28px, 4vw, 44px)", color: "var(--text)", marginBottom: 14 }}>Design que gera resultado</h2>
          <p style={{ fontSize: 16, color: "var(--gray-600)", maxWidth: 540, margin: "0 auto" }}>
            Escolha o serviço ideal para sua marca e descubra como transformamos ideias em design que vende.
          </p>
        </div>

        <Filters
          activeCategory={activeCategory} setCategory={setCategory}
          activeCustomization={activeCustomization} setCustomization={setCustomization}
        />

        {loadingProducts ? (
          <div style={{ 
            textAlign: "center", 
            padding: "80px 0",
            color: "var(--gray-400)" 
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: "50%",
              border: "3px solid var(--gray-200)",
              borderTopColor: "var(--purple)",
              margin: "0 auto 16px",
              animation: "spin 0.8s linear infinite",
            }} />
            <p style={{ 
              fontFamily: "var(--font-head)", 
              fontSize: 15 
            }}>
              Carregando produtos...
            </p>
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ 
            textAlign: "center", 
            padding: "60px 0", 
            color: "var(--gray-400)" 
          }}>
            <Icon name="filter" size={40} 
              color="var(--gray-200)" />
            <p style={{ 
              marginTop: 16, 
              fontFamily: "var(--font-head)" 
            }}>
              Nenhum produto encontrado.
            </p>
          </div>
        ) : (
          <div 
            className="products-grid"
            style={{ 
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)", 
              gap: 24 
            }}>
            {filtered.map(p => 
              <ProductCard 
                key={p.id} 
                product={p} 
                onClick={setSelectedProduct} 
              />
            )}
          </div>
        )}
        <style>{`
          @media (max-width: 1024px) {
            .products-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
          @media (max-width: 640px) {
            .products-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>

      </div>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onQuote={onQuote} />
      )}
    </section>
  );
};



// ─── ABOUT ──────────────────────────────────────────────
const AboutSection = () => {
  const diffs = [
    { icon: "cube", title: "Precisão Industrial", 
      desc: "Impressoras de última geração com tolerância de 0.1mm. Qualidade profissional em cada projeto." },
    { icon: "send", title: "Entrega Rápida", 
      desc: "Produção expressa disponível. A maioria dos projetos fica pronta em 24–48 horas." },
    { icon: "pencil", title: "Personalização Total", 
      desc: "Desde o primeiro contato até a entrega, cada detalhe é pensado para você. Nada é genérico." },
    { icon: "truck", title: "Entregamos para Todo o Brasil", 
      desc: "Atendemos clientes de norte a sul do país. Envio rápido e seguro para qualquer estado brasileiro." },
  ];

  return (
    <section id="sobre" style={{ padding: "80px 24px", background: "var(--gray-50)" }}>
      <div className="about-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>

        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "var(--orange)", fontFamily: "var(--font-head)", marginBottom: 12 }}>SOBRE A FLAT.</div>
          <h2 style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "clamp(28px, 3.5vw, 40px)", color: "var(--text)", marginBottom: 20, lineHeight: 1.2 }}>
            Especializados em transformar ideias em design que vende
          </h2>
          <p style={{ fontSize: 15, color: "var(--gray-600)", lineHeight: 1.8, marginBottom: 16 }}>
            A flat. nasceu da paixão pelo design digital. Somos especialistas em criação de conteúdo visual, atendendo desde empreendedores independentes até grandes empresas.
          </p>
          <p style={{ fontSize: 15, color: "var(--gray-600)", lineHeight: 1.8, marginBottom: 36 }}>
            Com criatividade e estratégia, entregamos projetos que vão além da expectativa, porque para nós, cada arte conta uma história.
          </p>

          <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            {[["2019", "Fundada"], ["500+", "Clientes"], ["98%", "Satisfação"]].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 30, color: "var(--purple)" }}>{v}</div>
                <div style={{ fontSize: 12, color: "var(--gray-400)", fontWeight: 500 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {diffs.map(d => (
            <div key={d.title} style={{
              background: "white", borderRadius: 16, padding: "22px 24px",
              display: "flex", gap: 18, alignItems: "flex-start",
              border: "1px solid var(--gray-100)",
              boxShadow: "var(--shadow-sm)",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateX(4px)"; e.currentTarget.style.borderColor = "oklch(45% 0.22 280 / 0.25)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = "var(--gray-100)"; }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--purple-pale)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name={d.icon} size={20} color="var(--purple)" />
              </div>
              <div>
                <h4 style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 16, color: "var(--text)", marginBottom: 6 }}>{d.title}</h4>
                <p style={{ fontSize: 13, color: "var(--gray-600)", lineHeight: 1.6 }}>{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <style>{`
          @media (max-width: 768px) {
            .about-grid {
              grid-template-columns: 1fr !important;
              gap: 40px !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

// ─── REVIEWS ──────────────────────────────────────────────
const ReviewsSection = () => {
  const reviews = [
    { name: "Lucas M.", role: "Designer Gráfico", text: "A qualidade das miniaturas é absurda. Enviei uma foto e recebi algo melhor do que imaginava. Atendimento impecável do início ao fim.", stars: 5 },
    { name: "Carla F.", role: "Arquiteta", text: "Usei para maquetes de projetos de arquitetura. Precisão perfeita, entrega dentro do prazo e o acabamento superou minhas expectativas.", stars: 5 },
    { name: "Rodrigo S.", role: "Engenheiro Mecânico", text: "Peças técnicas com dimensional correto. A equipe entendeu perfeitamente a especificação. Indicaria para qualquer projeto industrial.", stars: 5 },
    { name: "Marina K.", role: "Gerente de Marketing", text: "Brindes exclusivos para nosso evento. A reação dos convidados foi incrível. Com certeza voltaremos a trabalhar juntos.", stars: 5 },
    { name: "Bruno A.", role: "Desenvolvedor", text: "Fiz um case personalizado para o meu setup. Ficou exatamente como eu havia pedido, com encaixe perfeito.", stars: 4 },
    { name: "Sofia L.", role: "Artista Visual", text: "A escultura em resina é simplesmente de outro nível. Detalhamento que eu nunca achei que fosse possível. Arte de verdade.", stars: 5 },
  ];

  return (
    <section style={{ padding: "80px 24px", background: "white" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "var(--orange)", fontFamily: "var(--font-head)", marginBottom: 12 }}>AVALIAÇÕES</div>
          <h2 style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "clamp(28px, 4vw, 44px)", color: "var(--text)", marginBottom: 8 }}>O que nossos clientes dizem</h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <div style={{ display: "flex", gap: 3 }}>
              {[...Array(5)].map((_, i) => <Icon key={i} name="star" size={18} color="var(--orange)" />)}
            </div>
            <span style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 16, color: "var(--text)" }}>4.9</span>
            <span style={{ fontSize: 13, color: "var(--gray-400)" }}>de 5 · 120+ avaliações</span>
          </div>
        </div>

        <div className="reviews-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {reviews.map((r, i) => (
            <div key={i} style={{
              background: "var(--gray-50)", borderRadius: 16, padding: "22px",
              border: "1px solid var(--gray-100)", transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = ""; }}
            >
              <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
                {[...Array(r.stars)].map((_, j) => <Icon key={j} name="star" size={14} color="var(--orange)" />)}
                {[...Array(5-r.stars)].map((_, j) => <Icon key={j} name="star" size={14} color="var(--gray-200)" />)}
              </div>
              <p style={{ fontSize: 14, color: "var(--gray-600)", lineHeight: 1.7, marginBottom: 18, fontStyle: "italic" }}>"{r.text}"</p>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "var(--purple)", display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <span style={{ fontSize: 14, color: "white", fontWeight: 700, fontFamily: "var(--font-head)" }}>{r.name[0]}</span>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", fontFamily: "var(--font-head)" }}>{r.name}</div>
                  <div style={{ fontSize: 11, color: "var(--gray-400)" }}>{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <style>{`
          @media (max-width: 768px) {
            .reviews-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

// ─── CTA FINAL ──────────────────────────────────────────────
const CtaSection = ({ onQuote }) => (
  <section style={{
    padding: "80px 24px",
    background: `linear-gradient(135deg, var(--purple-dark) 0%, oklch(30% 0.20 290) 50%, oklch(25% 0.16 280) 100%)`,
    position: "relative", overflow: "hidden",
  }}>
    {/* Background grid */}
    <div style={{
      position: "absolute", inset: 0, pointerEvents: "none",
      backgroundImage: `linear-gradient(oklch(80% 0.08 280 / 0.05) 1px, transparent 1px), linear-gradient(90deg, oklch(80% 0.08 280 / 0.05) 1px, transparent 1px)`,
      backgroundSize: "40px 40px",
    }} />

    <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative" }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24,
        background: "oklch(68% 0.19 45 / 0.15)", color: "var(--orange)",
        padding: "7px 16px", borderRadius: 99, fontSize: 12, fontWeight: 700,
        fontFamily: "var(--font-head)", letterSpacing: "0.06em",
        border: "1px solid oklch(68% 0.19 45 / 0.3)",
      }}>
        ✦ PRONTO PARA COMEÇAR?
      </div>

      <h2 style={{
        fontFamily: "var(--font-head)", fontWeight: 700,
        fontSize: "clamp(30px, 5vw, 52px)", color: "white",
        marginBottom: 18, lineHeight: 1.15, textWrap: "balance",
      }}>
        Transforme sua ideia<br />em realidade <span style={{ color: "var(--orange)" }}>agora</span>
      </h2>

      <p style={{ fontSize: 17, color: "oklch(75% 0.08 280)", maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.7 }}>
        Orçamento grátis em até 2 horas. Sem compromisso. Sem complicação. Só qualidade.
      </p>

      <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
        <button onClick={() => window.open("https://wa.me/5579999990966", "_blank")} style={{
          background: "var(--orange)", color: "white", border: "none",
          borderRadius: 99, padding: "16px 36px",
          fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 16,
          cursor: "pointer", transition: "all 0.25s",
          boxShadow: "0 4px 24px oklch(68% 0.19 45 / 0.45)",
          display: "flex", alignItems: "center", gap: 10,
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px) scale(1.02)"; e.currentTarget.style.boxShadow = "0 8px 32px oklch(68% 0.19 45 / 0.55)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 24px oklch(68% 0.19 45 / 0.45)"; }}
        >
          <Icon name="send" size={17} color="#fff" /> Solicitar orçamento grátis
        </button>

        <a href="https://wa.me/5500000000000" style={{
          background: "transparent", color: "white",
          border: "2px solid rgba(255,255,255,0.25)", borderRadius: 99,
          padding: "14px 28px", textDecoration: "none",
          fontFamily: "var(--font-head)", fontWeight: 600, fontSize: 15,
          transition: "all 0.2s", display: "inline-flex", alignItems: "center", gap: 8,
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}
        >
          <Icon name="whatsapp" size={16} color="white" /> WhatsApp
        </a>
      </div>
    </div>
  </section>
);

// ─── FOOTER ──────────────────────────────────────────────
const Footer = () => (
  <footer style={{ background: "oklch(12% 0.08 280)", padding: "56px 24px 28px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, marginBottom: 48 }}>

        {/* Brand */}
        <div className="footer-brand">
          <img 
            src="https://res.cloudinary.com/dzo5tqghf/image/upload/v1778016623/01_-_LOGO_FLAT_dom9us.png" 
            alt="flat. a sua agência digital"
            style={{ 
              height: 44,
              width: "auto",
              objectFit: "contain",
              marginBottom: 12,
              display: "block",
            }}
          />
          <p style={{ fontSize: 14, color: "oklch(55% 0.06 280)", lineHeight: 1.8, marginBottom: 20 }}>
            Especialistas em design digital. Transformamos ideias em arte com criatividade, qualidade e resultado.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <a href="https://instagram.com/flat.agdigital" target="_blank" rel="noopener noreferrer" style={{
              width: 36, height: 36, borderRadius: 8,
              background: "oklch(20% 0.08 280)", border: "1px solid oklch(25% 0.08 280)",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s", color: "oklch(55% 0.06 280)",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--purple)"; e.currentTarget.style.borderColor = "var(--purple)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "oklch(20% 0.08 280)"; e.currentTarget.style.borderColor = "oklch(25% 0.08 280)"; }}
            >
              <Icon name="instagram" size={16} color="white" />
            </a>
            <a href="https://wa.me/5579999990966" target="_blank" rel="noopener noreferrer" style={{
              width: 36, height: 36, borderRadius: 8,
              background: "oklch(20% 0.08 280)", border: "1px solid oklch(25% 0.08 280)",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s", color: "oklch(55% 0.06 280)",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--purple)"; e.currentTarget.style.borderColor = "var(--purple)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "oklch(20% 0.08 280)"; e.currentTarget.style.borderColor = "oklch(25% 0.08 280)"; }}
            >
              <Icon name="whatsapp" size={16} color="white" />
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "oklch(45% 0.08 280)", marginBottom: 16, fontFamily: "var(--font-head)" }}>NAVEGAÇÃO</div>
          {["Produtos", "Sobre Nós"].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/\s/g,"-")}`} style={{ display: "block", fontSize: 14, color: "oklch(55% 0.06 280)", textDecoration: "none", marginBottom: 10, transition: "color 0.15s" }}
              onMouseEnter={e => e.target.style.color = "white"} onMouseLeave={e => e.target.style.color = "oklch(55% 0.06 280)"}
            >{l}</a>
          ))}
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "oklch(45% 0.08 280)", marginBottom: 16, fontFamily: "var(--font-head)" }}>CONTATO</div>
          {[
            { icon: "whatsapp", text: "(79) 9 9999-0966" },
            { icon: "whatsapp", text: "(79) 9 9948-4696" },
            { icon: "mail", text: "flat3digital@gmail.com" },
            { icon: "location", text: "Brasil · Todo o país" },
          ].map(c => (
            <div key={c.text} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
              <Icon name={c.icon} size={14} color="var(--orange)" />
              <span style={{ fontSize: 14, color: "oklch(55% 0.06 280)" }}>{c.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: "1px solid oklch(20% 0.06 280)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontSize: 13, color: "oklch(38% 0.05 280)" }}>© 2026 flat. Todos os direitos reservados.</span>
        <span style={{ fontSize: 13, color: "oklch(38% 0.05 280)" }}>Design Digital · Qualidade Garantida</span>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
          }
          .footer-brand {
            grid-column: 1 / -1 !important;
          }
        }
      `}</style>
    </div>
  </footer>
);

// ─── QUOTE MODAL ──────────────────────────────────────────────
const QuoteModal = ({ onClose }) => {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({ name: "", email: "", whatsapp: "", type: "", description: "" });
  const [submitted, setSubmitted] = React.useState(false);

  const types = ["Miniatura Personalizada", "Peça Técnica", "Decoração", "Brinde Corporativo", "Arte & Escultura", "Outro"];

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 3000,
      background: "rgba(18, 6, 36, 0.75)", backdropFilter: "blur(10px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>

      <div style={{
        background: "white", borderRadius: 24, width: "100%", maxWidth: 480,
        padding: "36px", boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
        position: "relative",
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16,
          background: "var(--gray-100)", border: "none", borderRadius: "50%",
          width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
        }}>
          <Icon name="x" size={14} color="var(--gray-600)" />
        </button>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              background: "oklch(55% 0.20 160 / 0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
            }}>
              <Icon name="check" size={32} color="oklch(45% 0.22 160)" />
            </div>
            <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 24, color: "var(--text)", marginBottom: 10 }}>Pedido enviado!</h3>
            <p style={{ fontSize: 15, color: "var(--gray-600)", lineHeight: 1.7 }}>
              Recebemos sua solicitação e entraremos em contato em até <strong>2 horas</strong> com o orçamento personalizado.
            </p>
            <button onClick={onClose} style={{
              marginTop: 24, background: "var(--purple)", color: "white", border: "none",
              borderRadius: 99, padding: "12px 28px",
              fontFamily: "var(--font-head)", fontWeight: 600, fontSize: 15, cursor: "pointer",
            }}>Fechar</button>
          </div>
        ) : (
          <>
            {/* Progress */}
            <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
              {[1,2,3].map(s => (
                <div key={s} style={{
                  flex: 1, height: 4, borderRadius: 99,
                  background: s <= step ? "var(--purple)" : "var(--gray-100)",
                  transition: "background 0.3s",
                }} />
              ))}
            </div>

            <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 22, color: "var(--text)", marginBottom: 6 }}>
              {step === 1 && "Seus dados"}
              {step === 2 && "Sobre o projeto"}
              {step === 3 && "Descreva sua ideia"}
            </h3>
            <p style={{ fontSize: 14, color: "var(--gray-400)", marginBottom: 24 }}>
              {step === 1 && "Como podemos te contatar?"}
              {step === 2 && "Qual tipo de projeto?"}
              {step === 3 && "Mais detalhes, melhor o orçamento"}
            </p>

            {step === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <InputField label="Seu nome" placeholder="Ex: João Silva" value={formData.name} onChange={v => setFormData({...formData, name: v})} />
                <InputField label="E-mail" placeholder="seu@email.com" value={formData.email} onChange={v => setFormData({...formData, email: v})} />
                <InputField label="WhatsApp" placeholder="(00) 0 0000-0000" value={formData.whatsapp} onChange={v => setFormData({...formData, whatsapp: v})} />
              </div>
            )}

            {step === 2 && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {types.map(t => (
                  <button key={t} onClick={() => setFormData({...formData, type: t})} style={{
                    padding: "12px 14px", borderRadius: 10, fontSize: 13, fontWeight: 600,
                    fontFamily: "var(--font-head)", cursor: "pointer", textAlign: "left",
                    background: formData.type === t ? "var(--purple)" : "var(--gray-50)",
                    color: formData.type === t ? "white" : "var(--gray-600)",
                    border: `1.5px solid ${formData.type === t ? "var(--purple)" : "var(--gray-200)"}`,
                    transition: "all 0.15s",
                  }}>{t}</button>
                ))}
              </div>
            )}

            {step === 3 && (
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--gray-600)", marginBottom: 6 }}>Descreva seu projeto</label>
                <textarea
                  placeholder="Ex: Quero uma miniatura de 15cm do meu personagem favorito, em PLA branco, para colocar na estante..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  rows={5}
                  style={{
                    width: "100%", padding: "12px 14px", borderRadius: 10,
                    border: "1.5px solid var(--gray-200)", fontSize: 14,
                    fontFamily: "var(--font-body)", resize: "vertical",
                    outline: "none", color: "var(--text)", lineHeight: 1.6,
                  }}
                  onFocus={e => { e.target.style.borderColor = "var(--purple)"; }}
                  onBlur={e => { e.target.style.borderColor = "var(--gray-200)"; }}
                />
              </div>
            )}

            <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
              {step > 1 && (
                <button onClick={() => setStep(step - 1)} style={{
                  flex: 1, background: "var(--gray-100)", color: "var(--gray-600)", border: "none",
                  borderRadius: 99, padding: "13px",
                  fontFamily: "var(--font-head)", fontWeight: 600, fontSize: 15, cursor: "pointer",
                }}>← Voltar</button>
              )}
              <button
                onClick={() => step < 3 ? setStep(step + 1) : handleSubmit()}
                style={{
                  flex: 2, background: "var(--orange)", color: "white", border: "none",
                  borderRadius: 99, padding: "13px",
                  fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 15, cursor: "pointer",
                  boxShadow: "0 4px 16px oklch(68% 0.19 45 / 0.35)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--orange-hover)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "var(--orange)"; }}
              >
                {step < 3 ? "Continuar →" : "Enviar solicitação ✦"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const InputField = ({ label, placeholder, value, onChange }) => (
  <div>
    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--gray-600)", marginBottom: 6, fontFamily: "var(--font-head)" }}>{label}</label>
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%", padding: "11px 14px", borderRadius: 10,
        border: "1.5px solid var(--gray-200)", fontSize: 14,
        fontFamily: "var(--font-body)", outline: "none", color: "var(--text)",
        background: "var(--gray-50)", transition: "border 0.15s",
      }}
      onFocus={e => { e.target.style.borderColor = "var(--purple)"; e.target.style.background = "white"; }}
      onBlur={e => { e.target.style.borderColor = "var(--gray-200)"; e.target.style.background = "var(--gray-50)"; }}
    />
  </div>
);

// ─── APP ROOT ──────────────────────────────────────────────
const App = () => {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [quoteOpen, setQuoteOpen] = React.useState(false);

  // Apply tweaks to CSS vars
  React.useEffect(() => {
    document.documentElement.style.setProperty("--orange", tweaks.accentColor);
    document.documentElement.style.setProperty("--purple-dark", tweaks.darkBg);
  }, [tweaks.accentColor, tweaks.darkBg]);

  return (
    <div>
      <Navbar onQuote={() => setQuoteOpen(true)} />
      <Hero onQuote={() => setQuoteOpen(true)} tweaks={tweaks} />
      <ProductsSection onQuote={() => setQuoteOpen(true)} />


      {tweaks.showReviews && <ReviewsSection />}
      <AboutSection />
      <CtaSection onQuote={() => setQuoteOpen(true)} />
      <Footer />

      {quoteOpen && <QuoteModal onClose={() => setQuoteOpen(false)} />}

      <TweaksPanel>
        <TweakSection label="Cores" />
        <TweakColor label="Cor de Destaque (CTA)" value={tweaks.accentColor} onChange={v => setTweak("accentColor", v)} />
        <TweakColor label="Fundo Escuro" value={tweaks.darkBg} onChange={v => setTweak("darkBg", v)} />
        <TweakSection label="Conteúdo" />
        <TweakText label="Título do Hero" value={tweaks.heroTitle} onChange={v => setTweak("heroTitle", v)} />
        <TweakText label="Texto do Botão CTA" value={tweaks.ctaText} onChange={v => setTweak("ctaText", v)} />
        <TweakToggle label="Mostrar Avaliações" value={tweaks.showReviews} onChange={v => setTweak("showReviews", v)} />
        <TweakSection label="Layout" />
        <TweakRadio label="Estilo de Cards" value={tweaks.cardStyle} options={["shadow","border","flat"]} onChange={v => setTweak("cardStyle", v)} />
      </TweaksPanel>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
