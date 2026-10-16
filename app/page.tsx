import ContactForm from "./contact-form";

const personalLines = [
  "Automotores",
  "Hogar",
  "Incendio",
  "Accidentes personales",
  "Vida individual",
  "Caución de alquileres",
  "Embarcaciones de placer",
];

const commercialLines = [
  "Incendio",
  "Riesgos del trabajo",
  "Comercios",
  "Consorcios",
  "Responsabilidad civil",
  "Vida colectivo",
  "Caución",
];

const corporateLines = [
  "Todo riesgo operativo",
  "Todo riesgo construcción",
  "Interrupción de la explotación",
  "Incendio",
  "Responsabilidad civil",
  "Seguro técnico",
  "Transportes",
];

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Ir al inicio">
          <span className="brand-mark">EDF</span>
          <span className="brand-copy">
            <strong>Eduardo Di Fermo</strong>
            <small>Análisis de Riesgos y Seguros</small>
          </span>
        </a>
        <nav aria-label="Navegación principal">
          <a href="#inicio">Inicio</a>
          <a href="#nosotros">Sobre mí</a>
          <a href="#servicios">Servicios</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <a className="header-cta" href="https://wa.me/5491125205234?text=Hola%20Eduardo%2C%20quisiera%20hacerte%20una%20consulta%20sobre%20seguros" target="_blank" rel="noreferrer">
          Consultar <ArrowIcon />
        </a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">Asesoramiento personal · Empresas · Familias</p>
          <h1>Estés donde estés, hagas lo que hagas, necesitás el <em>seguro adecuado.</em></h1>
          <p className="hero-lead">
            Analizamos tus riesgos antes de recomendar una cobertura. Así protegés tu vida, tu patrimonio y tu actividad con decisiones claras.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contacto">Solicitar asesoramiento <ArrowIcon /></a>
            <a className="button button-secondary" href="#servicios">Ver coberturas</a>
          </div>
          <div className="hero-proof" aria-label="Diferenciales del servicio">
            <span><b>01</b> Atención personalizada</span>
            <span><b>02</b> Análisis integral</span>
            <span><b>03</b> Respaldo profesional</span>
          </div>
        </div>
        <figure className="hero-visual">
          <img src="/images/analisis-riesgos.webp" alt="Panorama de actividades, bienes y personas que requieren una adecuada gestión de riesgos" />
          <figcaption>
            <span>Análisis integral</span>
            <strong>Cada actividad tiene riesgos distintos. La cobertura también debe serlo.</strong>
          </figcaption>
        </figure>
      </section>

      <section className="value-strip" aria-label="Nuestro compromiso">
        <article>
          <span>01</span>
          <div><h2>Experiencia comprobada</h2><p>Decisiones respaldadas por conocimiento del mercado y el apoyo de Valcarce-Deve Brokers.</p></div>
        </article>
        <article>
          <span>02</span>
          <div><h2>Atención personalizada</h2><p>Una conversación directa, respuestas claras y seguimiento cuando realmente lo necesitás.</p></div>
        </article>
        <article>
          <span>03</span>
          <div><h2>Amplia gama de coberturas</h2><p>Alternativas para proteger tus bienes, tu familia, tu comercio o la operación de tu empresa.</p></div>
        </article>
      </section>

      <section className="about section" id="nosotros">
        <div className="section-label">Sobre mí</div>
        <div className="about-main">
          <p className="eyebrow">Cercanía para decidir mejor</p>
          <h2>No se trata de vender una póliza. Se trata de entender qué necesitás proteger.</h2>
        </div>
        <div className="about-copy">
          <p>Mi nombre es <strong>Eduardo Di Fermo</strong>. Trabajo en análisis de riesgos y recomendación de coberturas para proteger tu vida y tu patrimonio.</p>
          <p>Con el respaldo de <strong>Valcarce-Deve Brokers</strong>, mi enfoque se basa en brindarte un servicio personalizado, confiable y de calidad. A partir de un relevamiento detallado, trabajamos juntos para encontrar la opción más adecuada.</p>
          <div className="broker-note"><b>35 años</b><span>de trayectoria de Valcarce-Deve Brokers en asesoramiento y administración de riesgos.</span></div>
        </div>
      </section>

      <section className="services section" id="servicios">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Servicios</p>
            <h2>Protección pensada para cada etapa y cada escala.</h2>
          </div>
          <p>Conocemos en profundidad la actividad de cada cliente, auditamos los riesgos y proponemos mejoras al plan de seguros existente.</p>
        </div>
        <div className="service-grid">
          <article className="service-card featured">
            <span className="card-number">01</span>
            <h3>Líneas personales</h3>
            <p>Tu vida, tu hogar y tu patrimonio.</p>
            <ul>{personalLines.map((line) => <li key={line}>{line}</li>)}</ul>
          </article>
          <article className="service-card">
            <span className="card-number">02</span>
            <h3>Líneas comerciales</h3>
            <p>Continuidad y respaldo para tu actividad.</p>
            <ul>{commercialLines.map((line) => <li key={line}>{line}</li>)}</ul>
          </article>
          <article className="service-card dark">
            <span className="card-number">03</span>
            <h3>Líneas corporativas</h3>
            <p>Soluciones integrales para operaciones complejas.</p>
            <ul>{corporateLines.map((line) => <li key={line}>{line}</li>)}</ul>
          </article>
        </div>
      </section>

      <section className="method section">
        <div className="section-heading compact">
          <div><p className="eyebrow">Cómo trabajamos</p><h2>Un proceso simple para una decisión importante.</h2></div>
        </div>
        <ol className="method-list">
          <li><span>01</span><h3>Escuchamos</h3><p>Conocemos tu situación, tus bienes y tu actividad.</p></li>
          <li><span>02</span><h3>Evaluamos</h3><p>Identificamos amenazas, probabilidades e impacto.</p></li>
          <li><span>03</span><h3>Comparamos</h3><p>Analizamos opciones, alcances, límites y costos.</p></li>
          <li><span>04</span><h3>Acompañamos</h3><p>Seguimos a tu lado durante la vigencia y ante un siniestro.</p></li>
        </ol>
      </section>

      <section className="contact section" id="contacto">
        <div className="contact-copy">
          <p className="eyebrow">Hablemos</p>
          <h2>Contame qué necesitás proteger.</h2>
          <p>Dejame tus datos y tu consulta se abrirá directamente en WhatsApp. Sin vueltas, sin respuestas automáticas eternas.</p>
          <div className="contact-links">
            <a href="mailto:eduardo@difermo.com.ar"><small>Email</small><strong>eduardo@difermo.com.ar</strong></a>
            <a href="tel:+5491141753202"><small>Teléfono</small><strong>+54 9 11 4175 3202</strong></a>
            <a href="https://wa.me/5491125205234" target="_blank" rel="noreferrer"><small>WhatsApp</small><strong>+54 9 11 2520 5234</strong></a>
          </div>
        </div>
        <ContactForm />
      </section>

      <footer>
        <a className="brand footer-brand" href="#inicio">
          <span className="brand-mark">EDF</span>
          <span className="brand-copy"><strong>Eduardo Di Fermo</strong><small>Análisis de Riesgos y Seguros</small></span>
        </a>
        <p>Asesoramiento personalizado para personas, comercios y empresas.</p>
        <p>© {new Date().getFullYear()} Eduardo Di Fermo</p>
      </footer>
    </main>
  );
}
