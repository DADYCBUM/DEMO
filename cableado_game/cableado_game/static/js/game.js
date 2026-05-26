// ============================================================
//  SIMULADOR DE CABLEADO ESTRUCTURADO — Game Engine v2
//  Ing. en Sistemas | 4to año - Redes
// ============================================================

const Game = (() => {
  let state = {
    usuario: null,
    nivelActual: 1,
    juegoActual: 1,
    puntaje: 0,
    juegosPorNivel: {},
    timer: null,
    tiempoRestante: 0,
  };

  // ── Init ──────────────────────────────────────────────────
  function init() {
    const saved = localStorage.getItem('cableado_state');
    if (saved) {
      try {
        const s = JSON.parse(saved);
        state.usuario = s.usuario;
        state.puntaje = s.puntaje || 0;
        state.juegosPorNivel = s.juegosPorNivel || {};
        for (const k in state.juegosPorNivel) {
          state.juegosPorNivel[k] = new Set(state.juegosPorNivel[k]);
        }
      } catch(e) {}
    }
    renderPantalla('inicio');
  }

  function saveState() {
    const s = { ...state };
    s.juegosPorNivel = {};
    for (const k in state.juegosPorNivel) {
      s.juegosPorNivel[k] = Array.from(state.juegosPorNivel[k]);
    }
    s.timer = null;
    localStorage.setItem('cableado_state', JSON.stringify(s));
  }

  function nivelDesbloqueado() {
    for (let n = 1; n <= 10; n++) {
      const c = state.juegosPorNivel[n];
      if (!c || c.size < 5) return n;
    }
    return 10;
  }

  // ── Pantallas ─────────────────────────────────────────────
  function renderPantalla(pantalla, params = {}) {
    const app = document.getElementById('app');
    if (!app) return;
    clearTimer();
    switch (pantalla) {
      case 'inicio':    app.innerHTML = htmlInicio(); break;
      case 'intro':     app.innerHTML = htmlIntro(); initIntroAnimations(); break;
      case 'mapa':      app.innerHTML = htmlMapa(); initMapa(); break;
      case 'juego':     renderJuego(params.nivel, params.juego); break;
      case 'resultado': app.innerHTML = htmlResultado(params); break;
      case 'final':     app.innerHTML = htmlFinal(); break;
    }
    // Botón flotante de temario siempre presente (excepto modal)
    agregarBotonTemario();
  }

  // ── Botón flotante temario ────────────────────────────────
  function agregarBotonTemario() {
    setTimeout(() => {
      const existing = document.getElementById('temario-float-btn');
      if (existing) return;
      const btn = document.createElement('button');
      btn.id = 'temario-float-btn';
      btn.className = 'temario-btn-flotante';
      btn.innerHTML = '📚 TEMARIO';
      btn.onclick = () => mostrarTemario();
      document.body.appendChild(btn);
    }, 100);
  }

  // ── TEMARIO DETALLADO ──────────────────────────────────────
  function mostrarTemario() {
    const existing = document.getElementById('temario-overlay');
    if (existing) { existing.remove(); return; }

    const overlay = document.createElement('div');
    overlay.id = 'temario-overlay';
    overlay.className = 'temario-overlay';
    overlay.innerHTML = `
    <div class="temario-modal">
      <div class="temario-header">
        <h2>📚 TEMARIO — CABLEADO ESTRUCTURADO</h2>
        <button class="temario-close" onclick="document.getElementById('temario-overlay').remove()">✕</button>
      </div>
      <div class="temario-body">
        <div class="temario-intro">
          Este temario cubre los contenidos del curso de <strong>Cableado Estructurado</strong> para <strong>Ingeniería en Sistemas — 4to año, Redes</strong>. Úsalo como referencia en cualquier momento durante el simulador. Haz clic en cada sección para expandirla.
        </div>

        <!-- SECCIÓN 1 -->
        <div class="temario-section open">
          <div class="temario-section-header" onclick="toggleSec(this.parentElement)">
            <span class="t-sec-icon">🏗️</span>
            <span class="t-sec-title">1. Fundamentos del Cableado Estructurado</span>
            <span class="t-sec-arrow">▼</span>
          </div>
          <div class="temario-section-body">
            <div class="t-subsection">
              <h4>¿Qué es el Cableado Estructurado?</h4>
              <p>Es un sistema de cableado estandarizado que provee infraestructura de telecomunicaciones unificada en edificios o campus. Soporta voz, datos, video e IoT bajo un mismo diseño modular y escalable.</p>
              <p>Su arquitectura permite que el mismo cableado sea utilizado por distintos equipos y fabricantes, reduciendo costos de mantenimiento y facilitando futuras expansiones.</p>
            </div>
            <div class="t-subsection">
              <h4>Componentes Principales</h4>
              <ul>
                <li><strong>Cableado Horizontal:</strong> Conecta el Cuarto de Telecomunicaciones (TC) con cada toma de trabajo (TO). Máximo 90m de cable + 10m de cordones.</li>
                <li><strong>Cableado Vertical (Backbone):</strong> Interconecta cuartos de telecomunicaciones, cuartos de equipos y facilidades de entrada entre pisos o edificios.</li>
                <li><strong>Área de Trabajo (WA):</strong> Zona donde el usuario final conecta sus dispositivos mediante cordones de parcheo desde la toma (TO).</li>
                <li><strong>Cuarto de Telecomunicaciones (TC):</strong> Alberga los paneles de parcheo, switches y conexiones del cableado horizontal.</li>
                <li><strong>Cuarto de Equipos (ER):</strong> Centraliza servidores, PBX, routers y equipos de mayor complejidad.</li>
                <li><strong>Facilidad de Entrada (EF):</strong> Punto donde los servicios externos (ISP, telefonía) ingresan al edificio.</li>
              </ul>
            </div>
            <div class="t-subsection">
              <h4>Normas Clave</h4>
              <table class="t-table">
                <tr><th>Norma</th><th>Alcance</th><th>Detalle</th></tr>
                <tr><td>ANSI/TIA-568</td><td>EE.UU.</td><td>Cableado de telecomunicaciones en edificios comerciales. Define componentes, distancias, conectores y rendimiento.</td></tr>
                <tr><td>ISO/IEC 11801</td><td>Internacional</td><td>Estándar global de cableado genérico para edificios y campus. Más adoptado fuera de América del Norte.</td></tr>
                <tr><td>TIA-606-B</td><td>Administración</td><td>Sistema de administración, identificación y etiquetado de infraestructura de telecomunicaciones.</td></tr>
                <tr><td>TIA-607-C</td><td>Tierra/Bonding</td><td>Sistemas de puesta a tierra y bonding para telecomunicaciones en edificios comerciales.</td></tr>
                <tr><td>TIA-569</td><td>Espacios</td><td>Diseño y construcción de espacios físicos para telecomunicaciones (cuartos, ductos, bandejas).</td></tr>
              </table>
              <div class="t-tip">💡 <strong>Consejo de examen:</strong> TIA-568 define rendimiento de canal (100m total), ISO/IEC 11801 establece clases de rendimiento por frecuencia (Clase D = Cat5e, Clase E = Cat6, Clase EA = Cat6A, Clase F = Cat7).</div>
            </div>
          </div>
        </div>

        <!-- SECCIÓN 2 -->
        <div class="temario-section">
          <div class="temario-section-header" onclick="toggleSec(this.parentElement)">
            <span class="t-sec-icon">🔌</span>
            <span class="t-sec-title">2. Tipos de Cable y Sus Características</span>
            <span class="t-sec-arrow">▼</span>
          </div>
          <div class="temario-section-body">
            <div class="t-subsection">
              <h4>Par Trenzado (Twisted Pair)</h4>
              <p>El tipo más usado en LANs modernas. Cuatro pares de conductores trenzados dentro de una cubierta. El trenzado reduce la diafonía (crosstalk) y la interferencia electromagnética.</p>
              <ul>
                <li><strong>UTP (Unshielded):</strong> Sin blindaje. Económico, flexible. Susceptible a EMI. El más común en oficinas.</li>
                <li><strong>STP (Shielded):</strong> Cada par tiene blindaje individual + malla exterior. Mejor inmunidad a EMI. Requiere puesta a tierra correcta.</li>
                <li><strong>FTP/ScTP:</strong> Solo malla exterior sobre todos los pares. Balance entre costo y protección.</li>
                <li><strong>S/FTP:</strong> Blindaje individual por par + malla exterior. Máxima protección, usado en Cat7/Cat8.</li>
              </ul>
              <table class="t-table">
                <tr><th>Categoría</th><th>Velocidad</th><th>Frec. Máx.</th><th>Dist. Máx.</th><th>Uso típico</th></tr>
                <tr><td>Cat3</td><td>10 Mbps</td><td>16 MHz</td><td>100m</td><td>Telefonía, Ethernet 10BASE-T (legado)</td></tr>
                <tr><td>Cat5e</td><td>1 Gbps</td><td>100 MHz</td><td>100m</td><td>1000BASE-T, redes de oficina estándar</td></tr>
                <tr><td>Cat6</td><td>1 Gbps / 10 Gbps*</td><td>250 MHz</td><td>100m / 55m*</td><td>10GBASE-T en distancias cortas</td></tr>
                <tr><td>Cat6A</td><td>10 Gbps</td><td>500 MHz</td><td>100m</td><td>10GBASE-T, data centers, hospitales</td></tr>
                <tr><td>Cat7</td><td>10 Gbps</td><td>600 MHz</td><td>100m</td><td>Industrial, alta interferencia (S/FTP)</td></tr>
                <tr><td>Cat8</td><td>25-40 Gbps</td><td>2000 MHz</td><td>30m</td><td>Data centers, ToR switches</td></tr>
              </table>
              <div class="t-warn">⚠️ Cat6 soporta 10 Gbps solo hasta ~55m. Para 10 Gbps a 100m se requiere Cat6A obligatoriamente.</div>
            </div>
            <div class="t-subsection">
              <h4>Fibra Óptica</h4>
              <p>Transmite datos como pulsos de luz. Inmune a interferencia electromagnética, permite largas distancias y anchos de banda muy altos. Ideal para backbone y conexiones entre edificios.</p>
              <ul>
                <li><strong>Multimodo (MM):</strong> Núcleo grande (50µm u 62.5µm). Múltiples rayos de luz. Distancias hasta ~2km según tipo. Más económica para distancias cortas.</li>
                <li><strong>Monomodo (SM):</strong> Núcleo muy pequeño (9µm). Un solo rayo de luz. Distancias de hasta 100km+. Para campus, WAN, proveedores.</li>
              </ul>
              <table class="t-table">
                <tr><th>Tipo</th><th>Núcleo</th><th>Velocidad</th><th>Dist. máx.</th></tr>
                <tr><td>OM1 (MM)</td><td>62.5µm</td><td>1 Gbps</td><td>275m</td></tr>
                <tr><td>OM3 (MM)</td><td>50µm</td><td>10 Gbps</td><td>300m</td></tr>
                <tr><td>OM4 (MM)</td><td>50µm</td><td>40 Gbps</td><td>150m</td></tr>
                <tr><td>OS2 (SM)</td><td>9µm</td><td>100 Gbps+</td><td>40km+</td></tr>
              </table>
            </div>
          </div>
        </div>

        <!-- SECCIÓN 3 -->
        <div class="temario-section">
          <div class="temario-section-header" onclick="toggleSec(this.parentElement)">
            <span class="t-sec-icon">🔧</span>
            <span class="t-sec-title">3. Conectores, Herramientas y Proceso de Crimpado</span>
            <span class="t-sec-arrow">▼</span>
          </div>
          <div class="temario-section-body">
            <div class="t-subsection">
              <h4>Conector RJ-45</h4>
              <p>El conector estándar para Ethernet en par trenzado. Tiene 8 posiciones y 8 contactos (8P8C). Cada pin hace contacto con uno de los 8 conductores del cable UTP/STP. Es fundamental seguir el orden correcto según el estándar.</p>
            </div>
            <div class="t-subsection">
              <h4>Estándar T568A vs T568B</h4>
              <table class="t-table">
                <tr><th>Pin</th><th>T568A</th><th>T568B</th></tr>
                <tr><td>1</td><td>Blanco-Verde</td><td>Blanco-Naranja</td></tr>
                <tr><td>2</td><td>Verde</td><td>Naranja</td></tr>
                <tr><td>3</td><td>Blanco-Naranja</td><td>Blanco-Verde</td></tr>
                <tr><td>4</td><td>Azul</td><td>Azul</td></tr>
                <tr><td>5</td><td>Blanco-Azul</td><td>Blanco-Azul</td></tr>
                <tr><td>6</td><td>Naranja</td><td>Verde</td></tr>
                <tr><td>7</td><td>Blanco-Marrón</td><td>Blanco-Marrón</td></tr>
                <tr><td>8</td><td>Marrón</td><td>Marrón</td></tr>
              </table>
              <div class="t-tip">💡 <strong>Cable Directo (Patch):</strong> Mismo estándar en ambos extremos (T568B—T568B). Conecta dispositivo a switch. <br><strong>Cable Cruzado (Crossover):</strong> T568A en un extremo, T568B en el otro. Conecta dispositivos iguales (PC-PC). Los switches modernos con Auto-MDI/X hacen esto automáticamente.</div>
            </div>
            <div class="t-subsection">
              <h4>Herramientas Esenciales</h4>
              <ul>
                <li><strong>Crimpadora RJ-45:</strong> Herramienta que presiona los pines metálicos del conector sobre los conductores del cable. Sin ella, la conexión no es posible.</li>
                <li><strong>Pelacables:</strong> Retira la cubierta exterior del cable sin dañar los pares internos. Importante no rayar los conductores.</li>
                <li><strong>Probador de Cable (Cable Tester):</strong> Verifica continuidad de los 8 conductores, detecta pares cruzados, cortocircuitos y cables abiertos.</li>
                <li><strong>Herramienta de Impacto (Punch-Down):</strong> Termina cables en bloques 110 o keystone jacks para paneles de parcheo y salidas de pared.</li>
                <li><strong>Certificador de Cable (Fluke):</strong> Equipo profesional que verifica que el enlace cumple con los parámetros de la categoría (atenuación, NEXT, FEXT, etc.).</li>
              </ul>
            </div>
            <div class="t-subsection">
              <h4>Proceso de Crimpado RJ-45</h4>
              <ul>
                <li>1. Pelar ~2.5cm de cubierta exterior sin dañar los pares.</li>
                <li>2. Desenredar y enderezar los 8 conductores.</li>
                <li>3. Ordenar los conductores según T568A o T568B.</li>
                <li>4. Cortar a longitud pareja (~13mm desde el borde del conector).</li>
                <li>5. Insertar los conductores en el conector RJ-45, verificando que cada uno llegue al fondo.</li>
                <li>6. Crimpar con la herramienta aplicando presión firme y pareja.</li>
                <li>7. Verificar con probador de cable.</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- SECCIÓN 4 -->
        <div class="temario-section">
          <div class="temario-section-header" onclick="toggleSec(this.parentElement)">
            <span class="t-sec-icon">📐</span>
            <span class="t-sec-title">4. Diseño e Instalación de Redes</span>
            <span class="t-sec-arrow">▼</span>
          </div>
          <div class="temario-section-body">
            <div class="t-subsection">
              <h4>Reglas de Distancia (TIA-568)</h4>
              <ul>
                <li><strong>Canal completo:</strong> Máximo 100m (incluyendo cable horizontal + cordones de parcheo en ambos extremos).</li>
                <li><strong>Cable permanente (link permanente):</strong> Máximo 90m.</li>
                <li><strong>Cordones de parcheo:</strong> Máximo 10m en total (TC + área de trabajo).</li>
                <li><strong>Área de trabajo (cordón de equipo):</strong> Máximo 5m.</li>
              </ul>
            </div>
            <div class="t-subsection">
              <h4>Topología Estrella</h4>
              <p>TIA-568 exige topología estrella: cada punto de trabajo se conecta directamente al cuarto de telecomunicaciones mediante un cable independiente. No se permiten derivaciones o daisy-chain en el cableado horizontal.</p>
            </div>
            <div class="t-subsection">
              <h4>Consideraciones de Instalación</h4>
              <ul>
                <li><strong>Radio de curvatura mínimo:</strong> 4 veces el diámetro del cable para evitar degradación de señal.</li>
                <li><strong>Separación de cables de potencia:</strong> Mantener al menos 15cm de separación de cables eléctricos de baja tensión. Mayor separación para voltajes altos o fluorescentes.</li>
                <li><strong>Etiquetado (TIA-606):</strong> Cada cable, puerto y toma debe estar etiquetado con identificador único para facilitar administración y resolución de problemas.</li>
                <li><strong>Gestión de cables:</strong> Usar bridas no tensionadas, bandejas de cable y organizadores de rack para proteger la integridad física del cableado.</li>
                <li><strong>Puesta a tierra:</strong> El blindaje de cables STP/FTP debe conectarse correctamente a tierra en UN solo extremo para evitar lazos de tierra.</li>
              </ul>
              <div class="t-warn">⚠️ Nunca doblar un cable UTP en ángulos agudos de 90°. Siempre usar curvas suaves. Un doblez brusco puede cambiar el paso del trenzado y degradar el rendimiento.</div>
            </div>
            <div class="t-subsection">
              <h4>Cuarto de Telecomunicaciones (Rack)</h4>
              <ul>
                <li><strong>Patch Panel:</strong> Panel de 24 o 48 puertos que termina el cableado horizontal. Permite reconfiguración sin mover cables permanentes.</li>
                <li><strong>Switch:</strong> Equipo activo de capa 2 que interconecta dispositivos y segmenta colisiones.</li>
                <li><strong>Organizadores de cable:</strong> Guías horizontales y verticales que mantienen los cordones de parcheo ordenados.</li>
                <li><strong>PDU (Power Distribution Unit):</strong> Regleta de energía para equipos activos en el rack.</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- SECCIÓN 5 -->
        <div class="temario-section">
          <div class="temario-section-header" onclick="toggleSec(this.parentElement)">
            <span class="t-sec-icon">📏</span>
            <span class="t-sec-title">5. Parámetros de Rendimiento y Certificación</span>
            <span class="t-sec-arrow">▼</span>
          </div>
          <div class="temario-section-body">
            <div class="t-subsection">
              <h4>Parámetros de Transmisión Clave</h4>
              <table class="t-table">
                <tr><th>Parámetro</th><th>Descripción</th><th>Importancia</th></tr>
                <tr><td>Atenuación (Insertion Loss)</td><td>Pérdida de señal a lo largo del cable. Se mide en dB. A mayor frecuencia, mayor atenuación.</td><td>Limita la distancia del canal</td></tr>
                <tr><td>NEXT (Near-End Crosstalk)</td><td>Interferencia entre pares en el extremo de transmisión. Causado por acoplamiento inductivo/capacitivo.</td><td>Reduce la SNR</td></tr>
                <tr><td>FEXT (Far-End Crosstalk)</td><td>Interferencia entre pares en el extremo opuesto al transmisor.</td><td>Relevante en 10GBase-T</td></tr>
                <tr><td>Return Loss</td><td>Señal reflejada por impedancia no uniforme (empalmes mal hechos, conectores deficientes).</td><td>Indica calidad de terminación</td></tr>
                <tr><td>Delay Skew</td><td>Diferencia de retardo entre pares del mismo cable. Crítico para transmisión paralela.</td><td>Importante en Gigabit Ethernet</td></tr>
              </table>
            </div>
            <div class="t-subsection">
              <h4>Proceso de Certificación</h4>
              <p>La certificación confirma que el canal instalado cumple con los parámetros de la categoría especificada. Se usa un certificador profesional (Fluke DSX, Ideal, etc.) que realiza mediciones en todas las frecuencias.</p>
              <ul>
                <li><strong>Prueba Wiremap:</strong> Verifica continuidad y correcta pinoutde todos los pines (detecta cruzados, cortocircuitos, cables abiertos).</li>
                <li><strong>Prueba de Longitud:</strong> Calcula longitud usando velocidad de propagación nominal (NVP).</li>
                <li><strong>Prueba de Atenuación:</strong> Pérdida total del canal en dB.</li>
                <li><strong>Prueba NEXT/FEXT/Return Loss:</strong> Mide todos los parámetros de crosstalk.</li>
              </ul>
              <div class="t-tip">💡 Un resultado de certificación "PASS" garantiza que el canal funcionará correctamente para la categoría especificada durante su vida útil.</div>
            </div>
          </div>
        </div>

        <!-- SECCIÓN 6 -->
        <div class="temario-section">
          <div class="temario-section-header" onclick="toggleSec(this.parentElement)">
            <span class="t-sec-icon">🏢</span>
            <span class="t-sec-title">6. Topologías y Casos Prácticos</span>
            <span class="t-sec-arrow">▼</span>
          </div>
          <div class="temario-section-body">
            <div class="t-subsection">
              <h4>Escenarios Comunes en el Examen</h4>
              <ul>
                <li><strong>Conexión PC — Switch:</strong> Cable directo (patch) T568B—T568B, Cat5e o superior.</li>
                <li><strong>Conexión Switch — Switch (legado):</strong> Cable cruzado T568A—T568B. Los switches modernos con Auto-MDI/X no lo necesitan.</li>
                <li><strong>Edificios separados > 100m:</strong> Fibra óptica (OM3/OM4 para multimodo hasta 300m; OS2 para distancias mayores).</li>
                <li><strong>Zona con alta interferencia eléctrica:</strong> STP o FTP (con puesta a tierra correcta).</li>
                <li><strong>Data center, 10 Gbps a 100m:</strong> Cat6A obligatorio. Cat6 solo llega a ~55m a 10G.</li>
                <li><strong>Conexión entre pisos (backbone vertical):</strong> Fibra multimodo OM3/OM4 o monomodo OS2 según distancia.</li>
              </ul>
            </div>
            <div class="t-subsection">
              <h4>Conteo de Puertos y Escalabilidad</h4>
              <p>Un cuarto de telecomunicaciones estándar debe tener capacidad de crecer. La regla práctica es: planificar para 20% de crecimiento adicional en puertos y espacio físico. La norma TIA-569 establece requisitos de espacio mínimo según la cantidad de áreas de trabajo servidas.</p>
            </div>
            <div class="t-subsection">
              <h4>PoE (Power over Ethernet)</h4>
              <p>Permite transmitir energía eléctrica junto con datos por el mismo cable UTP. Importante para cámaras IP, teléfonos VoIP, puntos de acceso Wi-Fi y sensores IoT.</p>
              <ul>
                <li><strong>PoE (IEEE 802.3af):</strong> Hasta 15.4W por puerto.</li>
                <li><strong>PoE+ (IEEE 802.3at):</strong> Hasta 30W por puerto.</li>
                <li><strong>PoE++ (IEEE 802.3bt):</strong> Hasta 90W por puerto (Type 4).</li>
              </ul>
              <div class="t-warn">⚠️ Con PoE de alta potencia en Cat6A, el calentamiento del cable puede afectar la atenuación. TIA-568-C.2-1 establece correcciones de temperatura para este caso.</div>
            </div>
          </div>
        </div>

      </div>
    </div>`;

    overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.remove();
    });
    document.body.appendChild(overlay);
  }

  // exponer para onclick en HTML
  window.toggleSec = function(section) {
    section.classList.toggle('open');
  };

  // ── INICIO ───────────────────────────────────────────────
  function htmlInicio() {
    return `
    <div class="screen screen-inicio">
      <div class="inicio-bg"></div>
      <div class="inicio-content">
        <div class="env-badge"><span class="env-dot"></span> SIM-REDES v2.0 · ACTIVO</div>
        <div class="logo-container">
          <div class="logo-icon">🔌</div>
          <h1 class="logo-title">SIMULADOR DE</h1>
          <h2 class="logo-subtitle">CABLEADO ESTRUCTURADO</h2>
          <div class="logo-tagline">Ing. en Sistemas · 4to año — Módulo Redes</div>
        </div>
        <div class="inicio-form">
          <input type="text" id="nombre-input" placeholder="Ingresa tu nombre de usuario..." maxlength="30" class="nombre-input" />
          <button class="btn-comenzar" onclick="Game.comenzar()">
            <span>INICIAR SESIÓN</span>
            <span class="btn-icon">→</span>
          </button>
          ${state.usuario ? `<button class="btn-continuar" onclick="Game.continuar()">↩ Continuar como <strong>${state.usuario}</strong></button>` : ''}
        </div>
        <div class="inicio-stats">
          <div class="stat-item"><span class="stat-num">10</span><span class="stat-label">Módulos</span></div>
          <div class="stat-item"><span class="stat-num">50</span><span class="stat-label">Ejercicios</span></div>
          <div class="stat-item"><span class="stat-num">🏆</span><span class="stat-label">Certificado</span></div>
        </div>
      </div>
    </div>`;
  }

  // ── INTRO ────────────────────────────────────────────────
  function htmlIntro() {
    return `
    <div class="screen screen-intro">
      <div class="intro-header">
        <h1>BIENVENIDO AL ENTORNO DE SIMULACIÓN</h1>
        <p class="intro-lead">Repasa los fundamentos antes de comenzar los módulos de práctica</p>
      </div>
      <div class="intro-cards" id="intro-cards">
        <div class="intro-card" data-delay="0">
          <div class="card-icon">🏗️</div>
          <h3>¿Qué es?</h3>
          <p>Sistema de cableado estandarizado que soporta múltiples equipos en edificios. Incluye cables, conectores, tomas y equipos de distribución bajo normas ANSI/TIA e ISO/IEC.</p>
        </div>
        <div class="intro-card" data-delay="120">
          <div class="card-icon">🎯</div>
          <h3>Aplicaciones</h3>
          <p>Infraestructura unificada para voz, datos y video. Permite conectar computadoras, teléfonos IP, cámaras de seguridad, puntos de acceso Wi-Fi y sensores IoT.</p>
        </div>
        <div class="intro-card" data-delay="240">
          <div class="card-icon">📋</div>
          <h3>¿Por qué importa?</h3>
          <p>Una instalación correcta garantiza velocidad, confiabilidad y escalabilidad. Reduce costos de mantenimiento hasta un 60% comparado con cableado no estructurado.</p>
        </div>
        <div class="intro-card" data-delay="360">
          <div class="card-icon">📏</div>
          <h3>Normas Clave</h3>
          <p><strong>ANSI/TIA-568</strong>: Cableado comercial EE.UU.<br><strong>ISO/IEC 11801</strong>: Estándar internacional<br><strong>TIA-606</strong>: Etiquetado y administración<br><strong>TIA-607</strong>: Puesta a tierra</p>
        </div>
        <div class="intro-card" data-delay="480">
          <div class="card-icon">🔌</div>
          <h3>Tipos de Cable</h3>
          <p><strong>UTP Cat5e→Cat8</strong>: Par trenzado para ≤100m<br><strong>STP/FTP</strong>: Blindado, resistente a EMI<br><strong>Fibra Multimodo</strong>: Campus ≤2km<br><strong>Fibra Monomodo</strong>: Larga distancia, km</p>
        </div>
        <div class="intro-card" data-delay="600">
          <div class="card-icon">🚀</div>
          <h3>Tu Entorno</h3>
          <p>10 módulos de ejercicios prácticos con 5 tipos de actividad: ordenamiento de cables, selección de herramientas, análisis de escenarios, emparejamiento de conceptos y retos de velocidad.</p>
        </div>
      </div>
      <div class="intro-footer">
        <button class="btn-primary" onclick="Game.irMapa()">Acceder a Módulos →</button>
      </div>
    </div>`;
  }

  function initIntroAnimations() {
    setTimeout(() => {
      document.querySelectorAll('.intro-card').forEach(card => {
        const delay = parseInt(card.dataset.delay) || 0;
        setTimeout(() => card.classList.add('visible'), delay);
      });
    }, 100);
  }

  // ── MAPA ─────────────────────────────────────────────────
  function htmlMapa() {
    const maxNivel = nivelDesbloqueado();
    let nivelesHTML = '';
    for (let n = 1; n <= 10; n++) {
      const data = GAME_DATA[n];
      const completados = state.juegosPorNivel[n] ? state.juegosPorNivel[n].size : 0;
      const bloqueado = n > maxNivel;
      const completo = completados >= 5;
      const cls = bloqueado ? 'nivel-card bloqueado' : completo ? 'nivel-card completo' : 'nivel-card activo';
      const progressPct = (completados / 5) * 100;
      const colorStr = bloqueado ? '#3a4a62' : data.color;

      nivelesHTML += `
      <div class="${cls}" ${!bloqueado ? `onclick="Game.irNivel(${n})"` : ''} style="border-left: 3px solid ${colorStr}">
        <div class="nivel-numero" style="color:${colorStr}">${String(n).padStart(2,'0')}</div>
        <div class="nivel-info">
          <div class="nivel-titulo">${data.titulo}</div>
          <div class="nivel-desc">${data.descripcion}</div>
          <div class="nivel-progress">
            <div class="progress-bar">
              <div class="progress-fill" style="width:${progressPct}%; background:${colorStr}"></div>
            </div>
            <span class="progress-text">${completados}/5</span>
          </div>
        </div>
        <div class="nivel-estado">${bloqueado ? '🔒' : completo ? '✅' : '▶'}</div>
      </div>`;
    }

    return `
    <div class="screen screen-mapa">
      <div class="mapa-header">
        <button class="btn-back" onclick="Game.renderPantalla('inicio')">← Inicio</button>
        <div class="mapa-title">
          <h2>MÓDULOS DE PRÁCTICA</h2>
          <span class="mapa-usuario">// ${state.usuario}</span>
        </div>
        <div class="puntaje-total">⭐ ${state.puntaje} pts</div>
      </div>
      <div class="niveles-grid" id="niveles-grid">
        ${nivelesHTML}
      </div>
    </div>`;
  }

  function initMapa() {
    setTimeout(() => {
      document.querySelectorAll('.nivel-card').forEach((card, i) => {
        setTimeout(() => card.classList.add('visible'), i * 50);
      });
    }, 50);
  }

  // ── JUEGO ─────────────────────────────────────────────────
  function renderJuego(nivel, juego) {
    state.nivelActual = nivel;
    state.juegoActual = juego;
    const app = document.getElementById('app');
    clearTimer();

    const nivelData = GAME_DATA[nivel];
    const juegoData = nivelData.juegos[juego - 1];
    const completados = state.juegosPorNivel[nivel] || new Set();

    // Dots de progreso
    const dotsHTML = Array.from({length: 5}, (_,i) => {
      const j = i + 1;
      const cls = completados.has(j) ? 'done' : j === juego ? 'current' : '';
      return `<div class="jp-dot ${cls}"></div>`;
    }).join('');

    // Sidebar items
    const sidebarJuegosHTML = Array.from({length: 5}, (_,i) => {
      const j = i + 1;
      const jData = nivelData.juegos[i];
      const isDone = completados.has(j);
      const isCurrent = j === juego;
      const cls = isCurrent ? 's-juego-item current' : isDone ? 's-juego-item done' : 's-juego-item';
      const tipoLabel = {drag_order:'Ordenar',herramientas:'Herramienta',escenario:'Escenario',emparejar:'Emparejar',velocidad:'Velocidad'}[jData.tipo] || jData.tipo;
      return `<div class="${cls}">
        <span class="s-j-num">${String(j).padStart(2,'0')}</span>
        <span class="s-j-label">${tipoLabel}</span>
        <span class="s-j-status">${isDone ? '✓' : isCurrent ? '▶' : '○'}</span>
      </div>`;
    }).join('');

    // Tipo de ejercicio tag
    const tipoTags = {
      drag_order:'ORDENAMIENTO',herramientas:'SELECCIÓN',escenario:'ANÁLISIS',
      emparejar:'EMPAREJAMIENTO',velocidad:'VELOCIDAD'
    };
    const tipoTag = tipoTags[juegoData.tipo] || juegoData.tipo.toUpperCase();

    // Renderizar contenido del ejercicio
    let contenidoHTML = '';
    switch (juegoData.tipo) {
      case 'drag_order':  contenidoHTML = renderDragOrder(juegoData); break;
      case 'herramientas':
      case 'escenario':
      case 'velocidad':   contenidoHTML = renderOpcionMultiple(juegoData, juegoData.tipo === 'velocidad'); break;
      case 'emparejar':   contenidoHTML = renderEmparejar(juegoData); break;
    }

    app.innerHTML = `
    <div class="screen screen-juego">
      <div class="juego-header">
        <div class="juego-header-left">
          <button class="btn-back" onclick="Game.irMapa()">← Módulos</button>
          <div class="juego-tabs">
            <div class="juego-tab active"><span class="tab-dot"></span> Módulo ${String(nivel).padStart(2,'0')}.${String(juego).padStart(2,'0')}</div>
          </div>
        </div>
        <div class="juego-header-right">
          <div class="juego-meta">
            <span class="juego-nivel-badge" style="background:${nivelData.color}">${nivelData.titulo.split(' ').slice(0,2).join(' ')}</span>
            <span class="juego-count">${juego}/5</span>
          </div>
          <div class="juego-timer" id="juego-timer">
            <span id="timer-display">⏱ ${juegoData.tiempo}s</span>
          </div>
        </div>
      </div>

      <div class="juego-progress-row">${dotsHTML}</div>

      <div class="juego-layout">
        <div class="juego-sidebar">
          <div class="sidebar-section">
            <div class="sidebar-label">Módulo actual</div>
            <div class="sidebar-nivel-info">
              <div class="s-nivel-name">${nivelData.titulo}</div>
              <div class="s-nivel-desc">${nivelData.descripcion}</div>
            </div>
          </div>
          <div class="sidebar-section">
            <div class="sidebar-label">Estadísticas</div>
            <div class="sidebar-stats">
              <div class="s-stat">
                <span class="s-stat-label">Puntaje</span>
                <span class="s-stat-val">${state.puntaje}</span>
              </div>
              <div class="s-stat">
                <span class="s-stat-label">Completados</span>
                <span class="s-stat-val">${completados.size}/5</span>
              </div>
              <div class="s-stat">
                <span class="s-stat-label">Módulo</span>
                <span class="s-stat-val">${nivel}/10</span>
              </div>
            </div>
          </div>
          <div class="sidebar-section">
            <div class="sidebar-label">Ejercicios</div>
            <div class="sidebar-juegos">${sidebarJuegosHTML}</div>
          </div>
        </div>

        <div class="juego-main">
          <div class="juego-body">
            <div class="juego-exercise-header">
              <div class="exercise-tag">▷ ${tipoTag}</div>
              <div class="juego-titulo">${juegoData.titulo}</div>
              <div class="juego-instruccion">${juegoData.instruccion || juegoData.descripcion}</div>
            </div>
            ${contenidoHTML}
          </div>
        </div>
      </div>
    </div>`;

    // Init específico por tipo
    if (juegoData.tipo === 'drag_order') initDragOrder();
    if (juegoData.tipo === 'emparejar') initEmparejar(juegoData);

    startTimer(juegoData.tiempo, nivel, juego, juegoData);
  }

  // ── DRAG & DROP ───────────────────────────────────────────
  function renderDragOrder(juego) {
    const shuffled = [...juego.items].sort(() => Math.random() - 0.5);
    const itemsHTML = shuffled.map((item, i) =>
      `<div class="drag-item" draggable="true" data-id="${item.id}" style="background:${item.colorBg}; animation-delay:${i*0.05}s">
        <span class="drag-handle">⠿</span>
        <span class="drag-dot" style="background:${item.color}"></span>
        <span class="drag-text">${item.texto}</span>
      </div>`
    ).join('');

    return `
    <div class="drag-container" id="drag-container">
      <div class="drag-hint">// ARRASTRA PARA REORDENAR — pin 1 arriba → pin 8 abajo</div>
      <div class="drag-list" id="drag-list">${itemsHTML}</div>
      <button class="btn-verificar" onclick="Game.verificarDrag()">Verificar Orden ✓</button>
    </div>`;
  }

  function initDragOrder() {
    const list = document.getElementById('drag-list');
    if (!list) return;
    let dragging = null;
    list.addEventListener('dragstart', e => {
      dragging = e.target.closest('.drag-item');
      if (dragging) dragging.classList.add('dragging');
    });
    list.addEventListener('dragend', () => {
      if (dragging) dragging.classList.remove('dragging');
      dragging = null;
    });
    list.addEventListener('dragover', e => {
      e.preventDefault();
      const over = e.target.closest('.drag-item');
      if (over && over !== dragging) {
        const rect = over.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        list.insertBefore(dragging, e.clientY < mid ? over : over.nextSibling);
      }
    });
    // Touch
    let touchItem = null, touchClone = null;
    list.addEventListener('touchstart', e => {
      touchItem = e.target.closest('.drag-item');
      if (!touchItem) return;
      touchItem.classList.add('dragging');
      touchClone = touchItem.cloneNode(true);
      touchClone.style.cssText = `position:fixed;opacity:0.7;pointer-events:none;z-index:9999;width:${touchItem.offsetWidth}px`;
      document.body.appendChild(touchClone);
    }, {passive:true});
    list.addEventListener('touchmove', e => {
      if (!touchItem || !touchClone) return;
      e.preventDefault();
      const t = e.touches[0];
      touchClone.style.left = (t.clientX - touchItem.offsetWidth/2) + 'px';
      touchClone.style.top  = (t.clientY - 20) + 'px';
      const el = document.elementFromPoint(t.clientX, t.clientY);
      const over = el ? el.closest('.drag-item') : null;
      if (over && over !== touchItem) {
        const rect = over.getBoundingClientRect();
        list.insertBefore(touchItem, t.clientY < rect.top + rect.height/2 ? over : over.nextSibling);
      }
    }, {passive:false});
    list.addEventListener('touchend', () => {
      if (touchItem) touchItem.classList.remove('dragging');
      if (touchClone) touchClone.remove();
      touchItem = null; touchClone = null;
    }, {passive:true});
  }

  function verificarDrag() {
    const juego = GAME_DATA[state.nivelActual].juegos[state.juegoActual - 1];
    const items = document.querySelectorAll('#drag-list .drag-item');
    const orden = Array.from(items).map(i => i.dataset.id);
    const correcto = JSON.stringify(orden) === JSON.stringify(juego.orden_correcto);
    mostrarFeedback(correcto,
      correcto ? '✓ Orden correcto. Todos los pines están en la posición correcta.' :
                 'Orden incorrecto. Revisa la posición de los pines e inténtalo de nuevo.',
      juego.puntaje);
  }

  // ── OPCIONES ──────────────────────────────────────────────
  function renderOpcionMultiple(juego, esVelocidad = false) {
    const escenHTML = juego.escenario ? `
      <div class="escenario-box">
        <span class="escenario-icon">📋</span>
        <p>${juego.escenario}</p>
      </div>` : '';
    const pregHTML = juego.pregunta ? `<div class="pregunta-text">${juego.pregunta}</div>` : '';
    const opcsHTML = juego.opciones.map(opc => `
      <button class="opcion-btn ${esVelocidad ? 'velocidad-btn' : ''}"
              data-id="${opc.id}"
              onclick="Game.elegirOpcion('${opc.id}')">
        ${opc.emoji ? `<span class="opc-emoji">${opc.emoji}</span>` : ''}
        <span class="opc-texto">${opc.texto}</span>
      </button>`).join('');
    return `
    <div class="opciones-container">
      ${escenHTML}${pregHTML}
      <div class="opciones-grid">${opcsHTML}</div>
    </div>`;
  }

  function elegirOpcion(id) {
    const juego = GAME_DATA[state.nivelActual].juegos[state.juegoActual - 1];
    const opcion = juego.opciones.find(o => o.id === id);
    if (!opcion) return;
    document.querySelectorAll('.opcion-btn').forEach(btn => {
      btn.disabled = true;
      const btnId = btn.dataset.id;
      const opc = juego.opciones.find(o => o.id === btnId);
      if (opc && opc.correcto) btn.classList.add('correcto');
      if (btnId === id && !opc.correcto) btn.classList.add('incorrecto');
    });
    const fb = opcion.feedback || (opcion.correcto ? '¡Correcto!' : 'Incorrecto, revisa el concepto.');
    mostrarFeedback(opcion.correcto, fb, juego.puntaje, 800);
  }

  // ── EMPAREJAR ─────────────────────────────────────────────
  function renderEmparejar(juego) {
    const izqShuf = [...juego.pares].sort(() => Math.random() - 0.5);
    const derShuf = [...juego.pares].sort(() => Math.random() - 0.5);
    const izqHTML = izqShuf.map(p =>
      `<div class="emp-item izq" data-izq="${p.izq}" onclick="Game.clickEmparejar(this,'izq')">${p.izq}</div>`
    ).join('');
    const derHTML = derShuf.map(p =>
      `<div class="emp-item der" data-der="${p.der}" onclick="Game.clickEmparejar(this,'der')">${p.der}</div>`
    ).join('');
    return `
    <div class="emparejar-container">
      <div class="emp-columna">${izqHTML}</div>
      <div class="emp-columna">${derHTML}</div>
    </div>
    <div id="emp-feedback" class="emp-feedback"></div>`;
  }

  let empSelIzq = null, empSelDer = null, empCompletados = 0;
  function initEmparejar() { empSelIzq = null; empSelDer = null; empCompletados = 0; }

  function clickEmparejar(el, lado) {
    if (el.classList.contains('matched')) return;
    const juego = GAME_DATA[state.nivelActual].juegos[state.juegoActual - 1];
    if (lado === 'izq') {
      document.querySelectorAll('.emp-item.izq.selected').forEach(e => e.classList.remove('selected'));
      empSelIzq = el; el.classList.add('selected');
    } else {
      empSelDer = el;
    }
    if (empSelIzq && empSelDer) {
      const par = juego.pares.find(p => p.izq === empSelIzq.dataset.izq);
      const correcto = par && par.der === empSelDer.dataset.der;
      if (correcto) {
        empSelIzq.classList.add('matched'); empSelDer.classList.add('matched');
        empSelIzq.classList.remove('selected');
        empCompletados++;
        const fb = document.getElementById('emp-feedback');
        if (fb) fb.textContent = '✓ Par correcto';
        if (empCompletados >= juego.pares.length) {
          setTimeout(() => mostrarFeedback(true, '✓ Todos los pares correctos. Excelente.', juego.puntaje), 400);
        }
      } else {
        empSelIzq.classList.add('error-flash'); empSelDer.classList.add('error-flash');
        setTimeout(() => {
          empSelIzq && empSelIzq.classList.remove('error-flash','selected');
          empSelDer && empSelDer.classList.remove('error-flash');
        }, 600);
        const fb = document.getElementById('emp-feedback');
        if (fb) fb.textContent = '✕ Par incorrecto, intenta de nuevo';
      }
      empSelIzq = null; empSelDer = null;
    }
  }

  // ── TIMER ─────────────────────────────────────────────────
  function startTimer(segundos) {
    state.tiempoRestante = segundos;
    updateTimerDisplay();
    state.timer = setInterval(() => {
      state.tiempoRestante--;
      updateTimerDisplay();
      if (state.tiempoRestante <= 0) {
        clearTimer();
        mostrarFeedback(false, '⏱ Tiempo agotado. Inténtalo de nuevo.', 0, 0);
      }
    }, 1000);
  }
  function updateTimerDisplay() {
    const el = document.getElementById('timer-display');
    if (!el) return;
    const t = state.tiempoRestante;
    el.textContent = `⏱ ${t}s`;
    el.className = t <= 5 ? 'timer-danger' : t <= 10 ? 'timer-warn' : '';
  }
  function clearTimer() {
    if (state.timer) { clearInterval(state.timer); state.timer = null; }
  }

  // ── FEEDBACK ──────────────────────────────────────────────
  function mostrarFeedback(correcto, mensaje, puntajeJuego, delay = 0) {
    clearTimer();
    const tiempoBonus = correcto ? Math.max(0, Math.floor(state.tiempoRestante * 2)) : 0;
    const puntajeGanado = correcto ? (puntajeJuego + tiempoBonus) : 0;
    const overlay = document.createElement('div');
    overlay.className = `feedback-overlay ${correcto ? 'feedback-ok' : 'feedback-fail'}`;
    overlay.innerHTML = `
      <div class="feedback-box">
        <div class="feedback-icon">${correcto ? '✅' : '⚠️'}</div>
        <div class="feedback-msg">${mensaje}</div>
        ${correcto ? `<div class="feedback-pts">+${puntajeGanado} pts</div>` : ''}
        <button class="btn-continuar-j" onclick="Game.avanzarJuego(${correcto}, ${puntajeGanado})">
          ${correcto ? 'Siguiente ejercicio →' : 'Reintentar'}
        </button>
      </div>`;
    setTimeout(() => {
      document.getElementById('app').appendChild(overlay);
      setTimeout(() => overlay.classList.add('visible'), 30);
    }, delay);
  }

  function avanzarJuego(correcto, puntajeGanado) {
    if (!correcto) { renderJuego(state.nivelActual, state.juegoActual); return; }
    if (!state.juegosPorNivel[state.nivelActual]) state.juegosPorNivel[state.nivelActual] = new Set();
    state.juegosPorNivel[state.nivelActual].add(state.juegoActual);
    state.puntaje += puntajeGanado;
    saveState();
    fetch('/guardar_progreso', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({nivel:state.nivelActual, juego:state.juegoActual, puntaje:puntajeGanado})
    }).catch(()=>{});
    const completadosNivel = state.juegosPorNivel[state.nivelActual].size;
    if (completadosNivel >= 5) {
      state.nivelActual >= 10 ? renderPantalla('final') :
        renderPantalla('resultado', {nivel:state.nivelActual, puntaje:state.puntaje, siguienteNivel:state.nivelActual+1});
    } else {
      let nextJ = 1;
      for (let j = 1; j <= 5; j++) {
        if (!state.juegosPorNivel[state.nivelActual].has(j)) { nextJ = j; break; }
      }
      renderJuego(state.nivelActual, nextJ);
    }
  }

  // ── RESULTADO ────────────────────────────────────────────
  function htmlResultado(params) {
    const nivelData = GAME_DATA[params.nivel];
    return `
    <div class="screen screen-resultado">
      <div class="resultado-content">
        <div class="resultado-icon">🏆</div>
        <h2>MÓDULO ${params.nivel} COMPLETADO</h2>
        <h3>${nivelData.titulo}</h3>
        <div class="resultado-stars">★★★</div>
        <div class="resultado-puntaje">Puntaje acumulado: <strong>${params.puntaje}</strong></div>
        <div class="resultado-botones">
          <button class="btn-primary" onclick="Game.irNivel(${params.siguienteNivel})">
            Módulo ${params.siguienteNivel}: ${GAME_DATA[params.siguienteNivel].titulo} →
          </button>
          <button class="btn-secondary" onclick="Game.irMapa()">Ver todos los módulos</button>
        </div>
      </div>
    </div>`;
  }

  // ── FINAL ────────────────────────────────────────────────
  function htmlFinal() {
    return `
    <div class="screen screen-final">
      <div class="final-content">
        <div class="certificado">
          <div class="cert-header">⚙ CERTIFICADO DE COMPETENCIA ⚙</div>
          <div class="cert-titulo">TÉCNICO EN CABLEADO ESTRUCTURADO</div>
          <div class="cert-nombre">${state.usuario}</div>
          <div class="cert-texto">Ha completado satisfactoriamente todos los módulos del Simulador de Cableado Estructurado, demostrando dominio en normas internacionales, tipos de cable, herramientas, instalación, certificación y diseño de redes estructuradas.</div>
          <div class="cert-puntaje">Puntaje Final: ⭐ ${state.puntaje}</div>
          <div class="cert-fecha">${new Date().toLocaleDateString('es-ES',{year:'numeric',month:'long',day:'numeric'})}</div>
          <div class="cert-sello">✓ CERT</div>
        </div>
        <button class="btn-primary" onclick="Game.reiniciar()">↩ Nueva Sesión</button>
      </div>
    </div>`;
  }

  // ── NAVEGACIÓN ────────────────────────────────────────────
  function comenzar() {
    const input = document.getElementById('nombre-input');
    const nombre = (input ? input.value : '').trim();
    if (!nombre) { input && input.classList.add('shake'); setTimeout(() => input && input.classList.remove('shake'), 500); return; }
    state.usuario = nombre;
    saveState();
    fetch('/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({nombre})}).catch(()=>{});
    renderPantalla('intro');
  }
  function continuar() { renderPantalla('mapa'); }
  function irMapa() { renderPantalla('mapa'); }
  function irNivel(n) {
    if (n > nivelDesbloqueado()) return;
    const completados = state.juegosPorNivel[n] || new Set();
    let primerJuego = 1;
    for (let j = 1; j <= 5; j++) { if (!completados.has(j)) { primerJuego = j; break; } }
    renderJuego(n, primerJuego);
  }
  function reiniciar() { state.puntaje = 0; state.juegosPorNivel = {}; saveState(); renderPantalla('inicio'); }

  return {
    init, renderPantalla,
    comenzar, continuar, irMapa, irNivel, reiniciar,
    verificarDrag, elegirOpcion, clickEmparejar, avanzarJuego
  };
})();

document.addEventListener('DOMContentLoaded', Game.init);
