// ============================================================
//  DESAFIO DE CABLEADO ESTRUCTURADO — Game Data
//  10 Niveles × 5 Mini-juegos
// ============================================================

const GAME_DATA = {

  // ─── NIVEL 1: Fundamentos ────────────────────────────────
  1: {
    titulo: "Fundamentos del Cableado",
    descripcion: "Aprende los conceptos básicos del cableado estructurado",
    color: "#1a7f5a",
    juegos: [
      {
        id: 1,
        tipo: "drag_order",
        titulo: "Ordena el Estándar T568B",
        descripcion: "Arrastra los cables en el orden correcto para el conector T568B",
        tiempo: 60,
        instruccion: "¡Arrastra y ordena los 8 cables según la norma T568B!",
        items: [
          { id:"wb", texto:"Blanco-Naranja", color:"#FF8C00", colorBg:"#FFF3E0" },
          { id:"b",  texto:"Naranja",        color:"#FF6600", colorBg:"#FFE0CC" },
          { id:"wg", texto:"Blanco-Verde",   color:"#4CAF50", colorBg:"#E8F5E9" },
          { id:"bl", texto:"Azul",           color:"#2196F3", colorBg:"#E3F2FD" },
          { id:"wbl",texto:"Blanco-Azul",    color:"#64B5F6", colorBg:"#E3F2FD" },
          { id:"g",  texto:"Verde",          color:"#388E3C", colorBg:"#E8F5E9" },
          { id:"wbr",texto:"Blanco-Marrón",  color:"#8D6E63", colorBg:"#EFEBE9" },
          { id:"br", texto:"Marrón",         color:"#5D4037", colorBg:"#EFEBE9" }
        ],
        orden_correcto: ["wb","b","wg","bl","wbl","g","wbr","br"],
        puntaje: 100
      },
      {
        id: 2,
        tipo: "herramientas",
        titulo: "Elige la Herramienta",
        descripcion: "Selecciona la herramienta correcta para cada tarea",
        tiempo: 45,
        instruccion: "¿Qué herramienta se usa para crimpar un cable RJ45?",
        pregunta: "Para terminar un conector RJ45 en un cable UTP necesitas:",
        opciones: [
          { id:"a", texto:"Martillo",    emoji:"🔨", correcto: false, feedback:"El martillo no sirve para conectores de red, dañaría los pines." },
          { id:"b", texto:"Crimpadora", emoji:"🔧", correcto: true,  feedback:"¡Correcto! La crimpadora prensa los pines del conector sobre los cables." },
          { id:"c", texto:"Destornillador", emoji:"🪛", correcto: false, feedback:"El destornillador es para tornillos, no para crimpar conectores." },
          { id:"d", texto:"Tijeras", emoji:"✂️", correcto: false, feedback:"Las tijeras pueden cortar cables pero no crimpar conectores RJ45." }
        ],
        puntaje: 100
      },
      {
        id: 3,
        tipo: "escenario",
        titulo: "Tipo de Cable Correcto",
        descripcion: "Elige el cable adecuado según el escenario",
        tiempo: 40,
        instruccion: "Lee el escenario y elige el tipo de cable correcto",
        escenario: "Una fábrica necesita instalar red en zona con maquinaria pesada que genera interferencia electromagnética intensa.",
        opciones: [
          { id:"a", texto:"UTP Cat5e",  correcto:false, feedback:"UTP (Unshielded) no tiene blindaje, muy susceptible a interferencias." },
          { id:"b", texto:"STP Cat6",   correcto:true,  feedback:"¡Correcto! STP (Shielded Twisted Pair) tiene blindaje metálico que protege contra interferencias." },
          { id:"c", texto:"Cable Coaxial RG-6", correcto:false, feedback:"El coaxial es para TV/señal RF, no para redes Ethernet modernas en fábricas." },
          { id:"d", texto:"Fibra Monomodo", correcto:false, feedback:"La fibra es inmune a EMI pero es excesiva y costosa para este caso si STP funciona." }
        ],
        puntaje: 100
      },
      {
        id: 4,
        tipo: "emparejar",
        titulo: "Normas y Sus Funciones",
        descripcion: "Empareja cada norma con su función principal",
        tiempo: 50,
        instruccion: "Haz clic en una norma y luego en su función para emparejarlas",
        pares: [
          { izq:"ANSI/TIA-568",   der:"Cableado de telecomunicaciones en edificios" },
          { izq:"TIA-606",        der:"Administración e identificación/etiquetado" },
          { izq:"TIA-607",        der:"Sistemas de puesta a tierra y bonding" },
          { izq:"ISO/IEC 11801",  der:"Estándar internacional de cableado genérico" }
        ],
        puntaje: 100
      },
      {
        id: 5,
        tipo: "velocidad",
        titulo: "¡Carrera de Velocidad!",
        descripcion: "Responde rápido: más velocidad = más puntos",
        tiempo: 15,
        instruccion: "¡Tienes 15 segundos! ¿Qué cable soporta 10 Gbps hasta 100 metros?",
        pregunta: "¿Qué categoría de cable UTP soporta 10 Gbps hasta 100m?",
        opciones: [
          { id:"a", texto:"Cat5e",  correcto:false },
          { id:"b", texto:"Cat6",   correcto:false },
          { id:"c", texto:"Cat6a",  correcto:true  },
          { id:"d", texto:"Cat3",   correcto:false }
        ],
        puntaje: 150
      }
    ]
  },

  // ─── NIVEL 2: Tipos de Cable ─────────────────────────────
  2: {
    titulo: "Tipos de Cable",
    descripcion: "Conoce los diferentes cables de red y sus características",
    color: "#1565C0",
    juegos: [
      {
        id: 1,
        tipo: "escenario",
        titulo: "Selección de Cable",
        tiempo: 40,
        instruccion: "¿Qué cable elegirías para este escenario?",
        escenario: "Necesitas conectar dos edificios separados por 800 metros. La conexión debe ser de alta velocidad y sin problemas de interferencia.",
        opciones: [
          { id:"a", texto:"UTP Cat6a",        correcto:false, feedback:"UTP tiene límite de 100m, no llega a 800m." },
          { id:"b", texto:"STP Cat7",          correcto:false, feedback:"STP también tiene límite de 100m." },
          { id:"c", texto:"Fibra Óptica",      correcto:true,  feedback:"¡Correcto! La fibra óptica puede cubrir kilómetros sin problemas de interferencia." },
          { id:"d", texto:"Cable Coaxial RG-11",correcto:false,feedback:"El coaxial RG-11 puede llegar más lejos pero no es la solución profesional moderna." }
        ],
        puntaje: 100
      },
      {
        id: 2,
        tipo: "emparejar",
        titulo: "Cable y Distancia Máxima",
        tiempo: 50,
        instruccion: "Empareja cada cable con su distancia máxima estándar",
        pares: [
          { izq:"UTP Cat6 (1Gbps)",         der:"100 metros" },
          { izq:"Fibra Multimodo OM3",       der:"300 metros" },
          { izq:"Fibra Monomodo",            der:"40 kilómetros+" },
          { izq:"Cable Coaxial (Ethernet)",  der:"500 metros" }
        ],
        puntaje: 100
      },
      {
        id: 3,
        tipo: "drag_order",
        titulo: "Ordena T568A",
        tiempo: 60,
        instruccion: "Ahora ordena los cables según el estándar T568A",
        items: [
          { id:"wg",  texto:"Blanco-Verde",   color:"#4CAF50", colorBg:"#E8F5E9" },
          { id:"g",   texto:"Verde",          color:"#388E3C", colorBg:"#E8F5E9" },
          { id:"wb",  texto:"Blanco-Naranja", color:"#FF8C00", colorBg:"#FFF3E0" },
          { id:"bl",  texto:"Azul",           color:"#2196F3", colorBg:"#E3F2FD" },
          { id:"wbl", texto:"Blanco-Azul",    color:"#64B5F6", colorBg:"#E3F2FD" },
          { id:"b",   texto:"Naranja",        color:"#FF6600", colorBg:"#FFE0CC" },
          { id:"wbr", texto:"Blanco-Marrón",  color:"#8D6E63", colorBg:"#EFEBE9" },
          { id:"br",  texto:"Marrón",         color:"#5D4037", colorBg:"#EFEBE9" }
        ],
        orden_correcto: ["wg","g","wb","bl","wbl","b","wbr","br"],
        puntaje: 100
      },
      {
        id: 4,
        tipo: "herramientas",
        titulo: "Herramienta para Fibra",
        tiempo: 40,
        instruccion: "¿Qué herramienta se usa para empalmar fibra óptica?",
        pregunta: "Para unir dos fibras ópticas de manera permanente y con baja pérdida, necesitas:",
        opciones: [
          { id:"a", texto:"Crimpadora RJ45",   emoji:"🔧", correcto:false, feedback:"La crimpadora es para conectores de cobre, no para fibra." },
          { id:"b", texto:"Fusionadora de fibra", emoji:"🔬", correcto:true, feedback:"¡Correcto! La fusionadora une los núcleos de fibra mediante arco eléctrico." },
          { id:"c", texto:"Pelacables",         emoji:"✂️", correcto:false, feedback:"El pelacables prepara la fibra pero no hace el empalme." },
          { id:"d", texto:"Tester de red",      emoji:"📡", correcto:false, feedback:"El tester verifica conexiones pero no une fibras." }
        ],
        puntaje: 100
      },
      {
        id: 5,
        tipo: "velocidad",
        titulo: "¡Velocidad!",
        tiempo: 15,
        instruccion: "¡15 segundos! Responde rápido...",
        pregunta: "¿Cuál es la velocidad máxima del cable Cat8?",
        opciones: [
          { id:"a", texto:"1 Gbps",   correcto:false },
          { id:"b", texto:"10 Gbps",  correcto:false },
          { id:"c", texto:"25 Gbps",  correcto:false },
          { id:"d", texto:"40 Gbps",  correcto:true  }
        ],
        puntaje: 150
      }
    ]
  },

  // ─── NIVEL 3: Normativas ─────────────────────────────────
  3: {
    titulo: "Normativas y Estándares",
    descripcion: "Domina las normas internacionales del cableado",
    color: "#6A1B9A",
    juegos: [
      {
        id: 1,
        tipo: "emparejar",
        titulo: "Normas Internacionales",
        tiempo: 55,
        instruccion: "Empareja cada norma con su organismo emisor",
        pares: [
          { izq:"ANSI/TIA-568",   der:"TIA (EE.UU.)" },
          { izq:"ISO/IEC 11801",  der:"ISO/IEC (Internacional)" },
          { izq:"EN 50173",       der:"CENELEC (Europa)" },
          { izq:"NOM-169-SCFI",   der:"NOM (México)" }
        ],
        puntaje: 100
      },
      {
        id: 2,
        tipo: "escenario",
        titulo: "Aplicación de Norma",
        tiempo: 45,
        instruccion: "¿Qué norma aplicas en este caso?",
        escenario: "Eres el técnico responsable de instalar un sistema de etiquetado y documentación completa para todos los cables, paneles y puertos de un nuevo edificio corporativo.",
        opciones: [
          { id:"a", texto:"ANSI/TIA-568-C",  correcto:false, feedback:"TIA-568 define el cableado físico, no el sistema de etiquetado." },
          { id:"b", texto:"TIA-606-B",        correcto:true,  feedback:"¡Correcto! TIA-606 es la norma para administración de infraestructura de telecomunicaciones." },
          { id:"c", texto:"TIA-607",          correcto:false, feedback:"TIA-607 trata sobre puesta a tierra y bonding, no etiquetado." },
          { id:"d", texto:"ISO/IEC 14763",    correcto:false, feedback:"ISO 14763 trata sobre implementación y operación, no etiquetado exclusivamente." }
        ],
        puntaje: 100
      },
      {
        id: 3,
        tipo: "herramientas",
        titulo: "Instrumento de Medición",
        tiempo: 40,
        instruccion: "¿Qué instrumento certifica instalaciones de cableado estructurado?",
        pregunta: "Para certificar que una instalación Cat6a cumple con TIA-568, necesitas:",
        opciones: [
          { id:"a", texto:"Multímetro",           emoji:"⚡", correcto:false, feedback:"El multímetro mide voltaje/resistencia pero no certifica parámetros de red." },
          { id:"b", texto:"Certificador de cable", emoji:"📊", correcto:true,  feedback:"¡Correcto! Equipos como Fluke DSX-8000 miden atenuación, NEXT, RL y certifican." },
          { id:"c", texto:"Osciloscopio",          emoji:"📈", correcto:false, feedback:"El osciloscopio visualiza señales pero no tiene los estándares de certificación." },
          { id:"d", texto:"Detector de voltaje",   emoji:"🔌", correcto:false, feedback:"El detector de voltaje solo indica presencia de tensión." }
        ],
        puntaje: 100
      },
      {
        id: 4,
        tipo: "drag_order",
        titulo: "Capas del Cableado Estructurado",
        tiempo: 60,
        instruccion: "Ordena las subsecciones del cableado estructurado de mayor a menor alcance",
        items: [
          { id:"campus",   texto:"Cableado de Campus",      color:"#7B1FA2", colorBg:"#F3E5F5" },
          { id:"backbone", texto:"Cableado Vertical",       color:"#1565C0", colorBg:"#E3F2FD" },
          { id:"horiz",    texto:"Cableado Horizontal",     color:"#2E7D32", colorBg:"#E8F5E9" },
          { id:"area",     texto:"Área de Trabajo",         color:"#E65100", colorBg:"#FFF3E0" }
        ],
        orden_correcto: ["campus","backbone","horiz","area"],
        puntaje: 100
      },
      {
        id: 5,
        tipo: "velocidad",
        titulo: "¡Sprint de Normas!",
        tiempo: 15,
        instruccion: "¡Rápido! ¿Qué norma define la puesta a tierra?",
        pregunta: "¿Qué norma TIA regula los sistemas de puesta a tierra en telecomunicaciones?",
        opciones: [
          { id:"a", texto:"TIA-568",  correcto:false },
          { id:"b", texto:"TIA-606",  correcto:false },
          { id:"c", texto:"TIA-607",  correcto:true  },
          { id:"d", texto:"TIA-942",  correcto:false }
        ],
        puntaje: 150
      }
    ]
  },

  // ─── NIVEL 4: Categorías de Cable ────────────────────────
  4: {
    titulo: "Categorías de Cable UTP",
    descripcion: "Aprende las diferencias entre Cat5e, Cat6, Cat6a, Cat7 y Cat8",
    color: "#BF360C",
    juegos: [
      {
        id: 1,
        tipo: "emparejar",
        titulo: "Categoría y Velocidad",
        tiempo: 55,
        instruccion: "Empareja cada categoría con su velocidad máxima",
        pares: [
          { izq:"Cat5e",  der:"1 Gbps hasta 100m" },
          { izq:"Cat6",   der:"10 Gbps hasta 55m" },
          { izq:"Cat6a",  der:"10 Gbps hasta 100m" },
          { izq:"Cat8",   der:"40 Gbps hasta 30m" }
        ],
        puntaje: 100
      },
      {
        id: 2,
        tipo: "escenario",
        titulo: "Cable para Data Center",
        tiempo: 45,
        instruccion: "Elige el cable adecuado para este escenario",
        escenario: "Estás diseñando la infraestructura de un data center de alto rendimiento. Las distancias de los racks son de 25 metros y necesitas 40 Gbps entre switches de core.",
        opciones: [
          { id:"a", texto:"Cat6a",   correcto:false, feedback:"Cat6a llega a 10 Gbps, no a 40 Gbps." },
          { id:"b", texto:"Cat7",    correcto:false, feedback:"Cat7 soporta 10 Gbps, no 40 Gbps en cobre." },
          { id:"c", texto:"Cat8",    correcto:true,  feedback:"¡Correcto! Cat8 soporta 40 Gbps hasta 30m, perfecto para este data center." },
          { id:"d", texto:"Cat5e",   correcto:false, feedback:"Cat5e es muy antiguo para un data center moderno de alto rendimiento." }
        ],
        puntaje: 100
      },
      {
        id: 3,
        tipo: "herramientas",
        titulo: "Conector Adecuado",
        tiempo: 40,
        instruccion: "¿Qué conector usa el cableado Cat7?",
        pregunta: "El cable Cat7 puede usar conectores especiales además del RJ45 estándar:",
        opciones: [
          { id:"a", texto:"Solo RJ45",   emoji:"🔌", correcto:false, feedback:"Cat7 puede usar RJ45 pero también tiene su propio conector GG45 y TERA." },
          { id:"b", texto:"GG45 / TERA", emoji:"🔧", correcto:true,  feedback:"¡Correcto! Cat7 usa conectores GG45 o TERA para aprovechar sus frecuencias de 600 MHz." },
          { id:"c", texto:"LC Dúplex",   emoji:"💡", correcto:false, feedback:"Los conectores LC son para fibra óptica, no para cobre." },
          { id:"d", texto:"BNC",         emoji:"📡", correcto:false, feedback:"BNC es para cable coaxial." }
        ],
        puntaje: 100
      },
      {
        id: 4,
        tipo: "drag_order",
        titulo: "Ordena por Velocidad",
        tiempo: 55,
        instruccion: "Ordena los cables de MENOR a MAYOR velocidad máxima",
        items: [
          { id:"cat3",  texto:"Cat3 (10 Mbps)",   color:"#795548", colorBg:"#EFEBE9" },
          { id:"cat5e", texto:"Cat5e (1 Gbps)",    color:"#1565C0", colorBg:"#E3F2FD" },
          { id:"cat6a", texto:"Cat6a (10 Gbps)",   color:"#2E7D32", colorBg:"#E8F5E9" },
          { id:"cat8",  texto:"Cat8 (40 Gbps)",    color:"#BF360C", colorBg:"#FBE9E7" }
        ],
        orden_correcto: ["cat3","cat5e","cat6a","cat8"],
        puntaje: 100
      },
      {
        id: 5,
        tipo: "velocidad",
        titulo: "¡Sprint de Categorías!",
        tiempo: 15,
        instruccion: "¡15 segundos! Categoría con frecuencia de 250 MHz:",
        pregunta: "¿Qué categoría de cable opera a una frecuencia máxima de 250 MHz?",
        opciones: [
          { id:"a", texto:"Cat5e (100 MHz)",  correcto:false },
          { id:"b", texto:"Cat6 (250 MHz)",   correcto:true  },
          { id:"c", texto:"Cat6a (500 MHz)",  correcto:false },
          { id:"d", texto:"Cat7 (600 MHz)",   correcto:false }
        ],
        puntaje: 150
      }
    ]
  },

  // ─── NIVEL 5: Topologías y Componentes ───────────────────
  5: {
    titulo: "Topologías y Componentes",
    descripcion: "Aprende sobre topologías de red y componentes de infraestructura",
    color: "#00695C",
    juegos: [
      {
        id: 1,
        tipo: "emparejar",
        titulo: "Componente y Función",
        tiempo: 55,
        instruccion: "Empareja cada componente con su función",
        pares: [
          { izq:"Patch Panel",      der:"Punto de conexión/distribución en rack" },
          { izq:"Switch PoE",       der:"Alimentación eléctrica por cable de red" },
          { izq:"Keystone Jack",    der:"Conector hembra en faceplates/canaletas" },
          { izq:"Cable Manager",    der:"Organización y soporte de cables en rack" }
        ],
        puntaje: 100
      },
      {
        id: 2,
        tipo: "escenario",
        titulo: "Topología Correcta",
        tiempo: 45,
        instruccion: "¿Qué topología es la más adecuada?",
        escenario: "Una empresa quiere que si falla cualquier switch de acceso, los demás continúen funcionando. ¿Qué topología de cableado entre switches recomendarías?",
        opciones: [
          { id:"a", texto:"Bus",        correcto:false, feedback:"La topología bus tiene un solo cable principal; si falla, cae toda la red." },
          { id:"b", texto:"Estrella",   correcto:false, feedback:"La estrella simple tiene un punto único de fallo en el centro." },
          { id:"c", texto:"Anillo",     correcto:false, feedback:"El anillo simple también tiene puntos de fallo." },
          { id:"d", texto:"Estrella jerárquica redundante", correcto:true, feedback:"¡Correcto! La topología estrella con enlaces redundantes entre switches es el estándar empresarial." }
        ],
        puntaje: 100
      },
      {
        id: 3,
        tipo: "herramientas",
        titulo: "Tendido de Cable",
        tiempo: 40,
        instruccion: "¿Qué herramienta usas para jalar cable por ductos?",
        pregunta: "Para pasar cables por dentro de tuberías largas o entre pisos necesitas:",
        opciones: [
          { id:"a", texto:"Escalera",      emoji:"🪜", correcto:false, feedback:"La escalera da acceso a altura pero no ayuda a pasar cable por ductos." },
          { id:"b", texto:"Guía de cable (fish tape)", emoji:"🔩", correcto:true, feedback:"¡Correcto! La guía de cable o fish tape es la herramienta estándar para jalar cables por ductos." },
          { id:"c", texto:"Taladro",       emoji:"🔨", correcto:false, feedback:"El taladro hace perforaciones pero no pasa el cable." },
          { id:"d", texto:"Nivel láser",   emoji:"📐", correcto:false, feedback:"El nivel asegura alineación pero no tiene uso en tendido de cables." }
        ],
        puntaje: 100
      },
      {
        id: 4,
        tipo: "drag_order",
        titulo: "Ruta del Cable en Edificio",
        tiempo: 60,
        instruccion: "Ordena el recorrido del cable desde el proveedor hasta el usuario",
        items: [
          { id:"isp",    texto:"Entrada ISP/MPOE",      color:"#BF360C", colorBg:"#FBE9E7" },
          { id:"mdf",    texto:"Cuarto Principal (MDF)", color:"#1565C0", colorBg:"#E3F2FD" },
          { id:"idf",    texto:"Cuarto Secundario (IDF)",color:"#7B1FA2", colorBg:"#F3E5F5" },
          { id:"toa",    texto:"Toma de Área de Trabajo",color:"#2E7D32", colorBg:"#E8F5E9" }
        ],
        orden_correcto: ["isp","mdf","idf","toa"],
        puntaje: 100
      },
      {
        id: 5,
        tipo: "velocidad",
        titulo: "¡Velocidad de Componentes!",
        tiempo: 15,
        instruccion: "¡Rápido! ¿Cuántos puertos tiene un patch panel estándar?",
        pregunta: "¿Cuántos puertos tiene un patch panel estándar de 1U para rack 19\"?",
        opciones: [
          { id:"a", texto:"12 puertos",  correcto:false },
          { id:"b", texto:"24 puertos",  correcto:true  },
          { id:"c", texto:"48 puertos",  correcto:false },
          { id:"d", texto:"96 puertos",  correcto:false }
        ],
        puntaje: 150
      }
    ]
  },

  // ─── NIVEL 6: Fibra Óptica ───────────────────────────────
  6: {
    titulo: "Fibra Óptica",
    descripcion: "Domina los tipos y conectores de fibra óptica",
    color: "#0277BD",
    juegos: [
      {
        id: 1,
        tipo: "emparejar",
        titulo: "Tipos de Fibra",
        tiempo: 55,
        instruccion: "Empareja el tipo de fibra con su característica principal",
        pares: [
          { izq:"Monomodo (SMF)",   der:"Un solo rayo de luz, largas distancias, núcleo 9µm" },
          { izq:"Multimodo OM3",    der:"50µm, 10 Gbps hasta 300m, láser optimizado" },
          { izq:"Multimodo OM4",    der:"50µm, 10 Gbps hasta 550m, alta velocidad" },
          { izq:"Multimodo OM5",    der:"50µm, SWDM, múltiples longitudes de onda" }
        ],
        puntaje: 100
      },
      {
        id: 2,
        tipo: "herramientas",
        titulo: "Conectores de Fibra",
        tiempo: 40,
        instruccion: "Identifica el conector correcto",
        pregunta: "Para conexiones en equipos activos y patch panels en data centers modernos, el conector de fibra más pequeño y popular es:",
        opciones: [
          { id:"a", texto:"SC (Cuadrado)",   emoji:"🔌", correcto:false, feedback:"SC es popular pero más grande que LC, se usa más en exterior y backbone." },
          { id:"b", texto:"LC (Small Form)", emoji:"💡", correcto:true,  feedback:"¡Correcto! LC es el estándar en data centers por su tamaño compacto y alta densidad." },
          { id:"c", texto:"ST (Bayoneta)",   emoji:"🔩", correcto:false, feedback:"ST es un conector antiguo de giro bayoneta, ya poco usado." },
          { id:"d", texto:"FC (Roscado)",    emoji:"⚙️", correcto:false, feedback:"FC se usa en equipos de medición y telecomunicaciones, no data center." }
        ],
        puntaje: 100
      },
      {
        id: 3,
        tipo: "escenario",
        titulo: "Fibra para Campus",
        tiempo: 45,
        instruccion: "Selecciona el tipo de fibra correcto",
        escenario: "Una universidad necesita conectar 5 edificios en un campus de 2 km². Las distancias entre edificios varían de 300 a 1500 metros. Necesitan 10 Gbps entre edificios.",
        opciones: [
          { id:"a", texto:"UTP Cat6a",         correcto:false, feedback:"UTP tiene límite de 100m, insuficiente para este campus." },
          { id:"b", texto:"Fibra Multimodo OM3",correcto:false, feedback:"OM3 solo llega a 300m para 10 Gbps, insuficiente para las distancias largas." },
          { id:"c", texto:"Fibra Monomodo OS2", correcto:true,  feedback:"¡Correcto! Fibra monomodo OS2 soporta distancias de varios kilómetros con 10+ Gbps." },
          { id:"d", texto:"STP Cat8",           correcto:false, feedback:"Cat8 solo cubre 30m, completamente inadecuado para campus." }
        ],
        puntaje: 100
      },
      {
        id: 4,
        tipo: "drag_order",
        titulo: "Proceso de Fusión de Fibra",
        tiempo: 60,
        instruccion: "Ordena los pasos del proceso de fusión de fibra óptica",
        items: [
          { id:"strip",  texto:"1. Pelar la fibra",           color:"#0277BD", colorBg:"#E1F5FE" },
          { id:"clean",  texto:"2. Limpiar el núcleo",        color:"#01579B", colorBg:"#E1F5FE" },
          { id:"cleave", texto:"3. Cortar (cleave) la fibra", color:"#1565C0", colorBg:"#E3F2FD" },
          { id:"fuse",   texto:"4. Fusionar con arco",        color:"#283593", colorBg:"#E8EAF6" },
          { id:"protect",texto:"5. Proteger el empalme",      color:"#4527A0", colorBg:"#EDE7F6" }
        ],
        orden_correcto: ["strip","clean","cleave","fuse","protect"],
        puntaje: 100
      },
      {
        id: 5,
        tipo: "velocidad",
        titulo: "¡Sprint de Fibra!",
        tiempo: 15,
        instruccion: "¡15 segundos! Velocidad de la luz en fibra óptica:",
        pregunta: "La velocidad de la luz en fibra óptica es aproximadamente:",
        opciones: [
          { id:"a", texto:"100,000 km/s",  correcto:false },
          { id:"b", texto:"200,000 km/s",  correcto:true  },
          { id:"c", texto:"300,000 km/s",  correcto:false },
          { id:"d", texto:"150,000 km/s",  correcto:false }
        ],
        puntaje: 150
      }
    ]
  },

  // ─── NIVEL 7: Diseño e Instalación ───────────────────────
  7: {
    titulo: "Diseño e Instalación",
    descripcion: "Aprende a planificar y ejecutar instalaciones profesionales",
    color: "#558B2F",
    juegos: [
      {
        id: 1,
        tipo: "emparejar",
        titulo: "Cuartos de Telecomunicaciones",
        tiempo: 55,
        instruccion: "Empareja el término con su definición",
        pares: [
          { izq:"MDF",  der:"Main Distribution Frame - Punto central del edificio" },
          { izq:"IDF",  der:"Intermediate Distribution Frame - Cableado por piso" },
          { izq:"TR",   der:"Telecommunications Room - Cuarto de equipos activos" },
          { izq:"ER",   der:"Equipment Room - Sala de servidores y core" }
        ],
        puntaje: 100
      },
      {
        id: 2,
        tipo: "escenario",
        titulo: "Capacidad del Canaleta",
        tiempo: 45,
        instruccion: "¿Cuántos cables caben en esta canaleta?",
        escenario: "Tienes una canaleta de 100mm × 60mm (60 cm²). Usarás cables Cat6 cuyo diámetro exterior es de 6mm (área ~0.28 cm² cada uno). La norma recomienda llenar como máximo el 40% de la capacidad.",
        opciones: [
          { id:"a", texto:"Máximo 85 cables",  correcto:false, feedback:"85 cables usaría casi toda la capacidad, violando la norma del 40%." },
          { id:"b", texto:"Máximo 42 cables",  correcto:false, feedback:"42 cables es el 40% sin margen de error en el cálculo." },
          { id:"c", texto:"Máximo 85 cables (pero solo 34 según norma)", correcto:true, feedback:"¡Correcto! 60cm²/0.28cm²=85 teóricos, al 40%=34 cables. Siempre aplica el 40% de llenado." },
          { id:"d", texto:"Sin límite si son Cat6",correcto:false, feedback:"Siempre hay límite de llenado para mantener la integridad térmica y del radio de curvatura." }
        ],
        puntaje: 100
      },
      {
        id: 3,
        tipo: "drag_order",
        titulo: "Proceso de Instalación",
        tiempo: 60,
        instruccion: "Ordena los pasos de una instalación profesional",
        items: [
          { id:"plano",   texto:"1. Planos y documentación",    color:"#558B2F", colorBg:"#F1F8E9" },
          { id:"canal",   texto:"2. Instalación de canaletas",  color:"#33691E", colorBg:"#F1F8E9" },
          { id:"cable",   texto:"3. Tendido de cable",          color:"#1B5E20", colorBg:"#E8F5E9" },
          { id:"term",    texto:"4. Terminación en conectores", color:"#004D40", colorBg:"#E0F2F1" },
          { id:"cert",    texto:"5. Certificación y pruebas",   color:"#01579B", colorBg:"#E1F5FE" }
        ],
        orden_correcto: ["plano","canal","cable","term","cert"],
        puntaje: 100
      },
      {
        id: 4,
        tipo: "herramientas",
        titulo: "Herramienta de Terminación",
        tiempo: 40,
        instruccion: "¿Qué herramienta termina un cable en un keystone jack?",
        pregunta: "Para terminar un cable UTP en un conector de impacto (keystone jack) necesitas:",
        opciones: [
          { id:"a", texto:"Crimpadora",    emoji:"🔧", correcto:false, feedback:"La crimpadora es para conectores RJ45 macho, no para keystones." },
          { id:"b", texto:"Punch-down",    emoji:"🔨", correcto:true,  feedback:"¡Correcto! La herramienta punch-down (110) inserta y corta el cable en el keystone." },
          { id:"c", texto:"Pelacables",    emoji:"✂️", correcto:false, feedback:"El pelacables quita la chaqueta externa pero no termina el cable en el jack." },
          { id:"d", texto:"Soldador",      emoji:"🔥", correcto:false, feedback:"Nunca se suelda cableado estructurado, se usan conexiones mecánicas." }
        ],
        puntaje: 100
      },
      {
        id: 5,
        tipo: "velocidad",
        titulo: "¡Sprint de Instalación!",
        tiempo: 15,
        instruccion: "¡Rápido! Radio mínimo de curvatura para Cat6:",
        pregunta: "El radio mínimo de curvatura para cable UTP Cat6 es (aprox.):",
        opciones: [
          { id:"a", texto:"4 veces el diámetro",   correcto:true  },
          { id:"b", texto:"10 veces el diámetro",  correcto:false },
          { id:"c", texto:"2 veces el diámetro",   correcto:false },
          { id:"d", texto:"Sin restricción",        correcto:false }
        ],
        puntaje: 150
      }
    ]
  },

  // ─── NIVEL 8: Seguridad y Tendencias ─────────────────────
  8: {
    titulo: "Seguridad y PoE",
    descripcion: "Seguridad física, PoE y tecnologías emergentes",
    color: "#AD1457",
    juegos: [
      {
        id: 1,
        tipo: "emparejar",
        titulo: "Estándares PoE",
        tiempo: 55,
        instruccion: "Empareja el estándar PoE con su potencia máxima",
        pares: [
          { izq:"IEEE 802.3af (PoE)",    der:"15.4 W por puerto" },
          { izq:"IEEE 802.3at (PoE+)",   der:"30 W por puerto" },
          { izq:"IEEE 802.3bt (PoE++)",  der:"90 W por puerto" },
          { izq:"UPOE (Cisco)",          der:"60 W por puerto" }
        ],
        puntaje: 100
      },
      {
        id: 2,
        tipo: "escenario",
        titulo: "Cámara IP con PoE",
        tiempo: 45,
        instruccion: "¿Qué estándar PoE necesitas?",
        escenario: "Necesitas instalar cámaras PTZ de alta definición que consumen 25W cada una. Tienes un switch PoE estándar (802.3af). ¿Puedes usarlo?",
        opciones: [
          { id:"a", texto:"Sí, 802.3af es suficiente",    correcto:false, feedback:"802.3af solo entrega 15.4W, insuficiente para 25W." },
          { id:"b", texto:"No, necesitas 802.3at (PoE+)", correcto:true,  feedback:"¡Correcto! 802.3at entrega hasta 30W, suficiente para cámaras PTZ de 25W." },
          { id:"c", texto:"No, solo sirve fibra óptica",  correcto:false, feedback:"PoE funciona por cable de cobre, no requiere fibra." },
          { id:"d", texto:"Sí, con cualquier cable Cat",  correcto:false, feedback:"El tipo de cable no determina la potencia PoE, sino el estándar del switch." }
        ],
        puntaje: 100
      },
      {
        id: 3,
        tipo: "herramientas",
        titulo: "Control de Acceso Físico",
        tiempo: 40,
        instruccion: "¿Cómo proteges físicamente un cuarto de telecomunicaciones?",
        pregunta: "La mejor práctica de seguridad física para un TR (Telecommunications Room) es:",
        opciones: [
          { id:"a", texto:"Contraseña en el switch",   emoji:"💻", correcto:false, feedback:"La contraseña en el switch es seguridad lógica, no física del cuarto." },
          { id:"b", texto:"Llave mecánica estándar",   emoji:"🔑", correcto:false, feedback:"Las llaves mecánicas no registran accesos y son copiables." },
          { id:"c", texto:"Control biométrico + log",  emoji:"🔐", correcto:true,  feedback:"¡Correcto! Control biométrico con registro de accesos cumple TIA-942 y best practices." },
          { id:"d", texto:"Guardia 24/7 en la puerta", emoji:"👮", correcto:false, feedback:"El guardia ayuda pero no es suficiente sin control de acceso electrónico." }
        ],
        puntaje: 100
      },
      {
        id: 4,
        tipo: "drag_order",
        titulo: "Capas de Seguridad en Red",
        tiempo: 60,
        instruccion: "Ordena las capas de seguridad de afuera hacia adentro",
        items: [
          { id:"perimeter", texto:"Seguridad Perimetral (firewall)", color:"#AD1457", colorBg:"#FCE4EC" },
          { id:"network",   texto:"Seguridad de Red (VLAN/ACL)",    color:"#880E4F", colorBg:"#FCE4EC" },
          { id:"endpoint",  texto:"Seguridad de Endpoint (NAC)",    color:"#6A1B9A", colorBg:"#F3E5F5" },
          { id:"data",      texto:"Seguridad de Datos (cifrado)",   color:"#4527A0", colorBg:"#EDE7F6" }
        ],
        orden_correcto: ["perimeter","network","endpoint","data"],
        puntaje: 100
      },
      {
        id: 5,
        tipo: "velocidad",
        titulo: "¡Sprint de Seguridad!",
        tiempo: 15,
        instruccion: "¡Rápido! ¿En qué cable funciona PoE?",
        pregunta: "¿Mínimamente qué categoría de cable soporta PoE 802.3bt (90W)?",
        opciones: [
          { id:"a", texto:"Cat3",   correcto:false },
          { id:"b", texto:"Cat5e",  correcto:true  },
          { id:"c", texto:"Cat6a",  correcto:false },
          { id:"d", texto:"Cat8",   correcto:false }
        ],
        puntaje: 150
      }
    ]
  },

  // ─── NIVEL 9: Data Centers ───────────────────────────────
  9: {
    titulo: "Data Centers",
    descripcion: "Infraestructura de centros de datos y norma TIA-942",
    color: "#263238",
    juegos: [
      {
        id: 1,
        tipo: "emparejar",
        titulo: "Tiers de Data Center",
        tiempo: 55,
        instruccion: "Empareja el Tier con su disponibilidad anual",
        pares: [
          { izq:"Tier I",   der:"99.671% (28.8 hrs downtime/año)" },
          { izq:"Tier II",  der:"99.741% (22 hrs downtime/año)" },
          { izq:"Tier III", der:"99.982% (1.6 hrs downtime/año)" },
          { izq:"Tier IV",  der:"99.995% (26 min downtime/año)" }
        ],
        puntaje: 100
      },
      {
        id: 2,
        tipo: "escenario",
        titulo: "Tier para Banco",
        tiempo: 45,
        instruccion: "¿Qué Tier de data center necesita un banco?",
        escenario: "Un banco nacional necesita un data center que tolere cualquier falla de componente sin interrumpir el servicio. Debe poder hacer mantenimiento sin downtime y tener redundancia N+1 en todos los sistemas.",
        opciones: [
          { id:"a", texto:"Tier I",   correcto:false, feedback:"Tier I no tiene redundancia, inaceptable para servicios financieros." },
          { id:"b", texto:"Tier II",  correcto:false, feedback:"Tier II tiene redundancia parcial pero aún permite interrupciones." },
          { id:"c", texto:"Tier III", correcto:true,  feedback:"¡Correcto! Tier III (concurrent maintainability) permite mantenimiento sin downtime, estándar para bancos." },
          { id:"d", texto:"Ninguno sirve", correcto:false, feedback:"Tier III o IV son perfectamente adecuados para servicios financieros." }
        ],
        puntaje: 100
      },
      {
        id: 3,
        tipo: "herramientas",
        titulo: "Gestión de Cables en Rack",
        tiempo: 40,
        instruccion: "Mejor práctica para gestión de cables en rack de data center:",
        pregunta: "Para mantener un data center ordenado, con fácil acceso y buena refrigeración en los racks, la mejor práctica es:",
        opciones: [
          { id:"a", texto:"Cables largos atados juntos",emoji:"🔗", correcto:false, feedback:"Cables largos y atados dificultan cambios y pueden obstruir el flujo de aire." },
          { id:"b", texto:"Patch cables medidos exactos + organización por colores",emoji:"🎨", correcto:true, feedback:"¡Correcto! Cables de longitud exacta más código de colores es el estándar de data centers profesionales." },
          { id:"c", texto:"Sin importar, solo que funcione",emoji:"✅", correcto:false, feedback:"El orden impacta directamente en la refrigeración, el MTTR y las auditorías." },
          { id:"d", texto:"Solo inalámbrico en data center",emoji:"📡", correcto:false, feedback:"El WiFi no reemplaza las conexiones físicas en data centers." }
        ],
        puntaje: 100
      },
      {
        id: 4,
        tipo: "drag_order",
        titulo: "Zonas del Data Center",
        tiempo: 60,
        instruccion: "Ordena las zonas del data center según TIA-942",
        items: [
          { id:"entrada", texto:"Área de Entrada de Carriers",  color:"#263238", colorBg:"#ECEFF1" },
          { id:"mdf_dc",  texto:"Cuarto Principal (MDA)",       color:"#37474F", colorBg:"#ECEFF1" },
          { id:"hda",     texto:"Área de Distribución Horizontal",color:"#455A64",colorBg:"#CFD8DC" },
          { id:"zone",    texto:"Zona de Distribución (ZDA)",   color:"#546E7A", colorBg:"#CFD8DC" },
          { id:"eqa",     texto:"Área de Equipos (EDA)",        color:"#607D8B", colorBg:"#B0BEC5" }
        ],
        orden_correcto: ["entrada","mdf_dc","hda","zone","eqa"],
        puntaje: 100
      },
      {
        id: 5,
        tipo: "velocidad",
        titulo: "¡Sprint de Data Center!",
        tiempo: 15,
        instruccion: "¡15 segundos! ¿Qué significa PUE?",
        pregunta: "PUE (Power Usage Effectiveness) en data centers es:",
        opciones: [
          { id:"a", texto:"Potencia Total / Potencia IT",   correcto:true  },
          { id:"b", texto:"Potencia IT / Potencia Total",   correcto:false },
          { id:"c", texto:"Precio por Unidad de Energía",   correcto:false },
          { id:"d", texto:"Protocolo Universal Ethernet",   correcto:false }
        ],
        puntaje: 150
      }
    ]
  },

  // ─── NIVEL 10: MAESTRO ───────────────────────────────────
  10: {
    titulo: "Examen Final del Técnico",
    descripcion: "Demuestra todo lo aprendido. ¡Conviértete en Técnico Certificado!",
    color: "#FF6F00",
    juegos: [
      {
        id: 1,
        tipo: "emparejar",
        titulo: "Repaso Total: Normas",
        tiempo: 60,
        instruccion: "Última prueba de normas — ¡todo lo que aprendiste!",
        pares: [
          { izq:"Cat6a + STP",          der:"Ambiente con alta interferencia EMI" },
          { izq:"Fibra OS2 Monomodo",   der:"Backbone de campus, >1 km" },
          { izq:"Cat8 + blindaje S/FTP",der:"Data center, 40 Gbps a 30m" },
          { izq:"OM4 Multimodo",        der:"Data center, 10 Gbps hasta 550m" }
        ],
        puntaje: 150
      },
      {
        id: 2,
        tipo: "drag_order",
        titulo: "Maestro T568B",
        tiempo: 45,
        instruccion: "¡Una última vez! Orden T568B completo en 45 segundos",
        items: [
          { id:"wb",  texto:"Blanco-Naranja", color:"#FF8C00", colorBg:"#FFF3E0" },
          { id:"b",   texto:"Naranja",        color:"#FF6600", colorBg:"#FFE0CC" },
          { id:"wg",  texto:"Blanco-Verde",   color:"#4CAF50", colorBg:"#E8F5E9" },
          { id:"bl",  texto:"Azul",           color:"#2196F3", colorBg:"#E3F2FD" },
          { id:"wbl", texto:"Blanco-Azul",    color:"#64B5F6", colorBg:"#E3F2FD" },
          { id:"g",   texto:"Verde",          color:"#388E3C", colorBg:"#E8F5E9" },
          { id:"wbr", texto:"Blanco-Marrón",  color:"#8D6E63", colorBg:"#EFEBE9" },
          { id:"br",  texto:"Marrón",         color:"#5D4037", colorBg:"#EFEBE9" }
        ],
        orden_correcto: ["wb","b","wg","bl","wbl","g","wbr","br"],
        puntaje: 150
      },
      {
        id: 3,
        tipo: "escenario",
        titulo: "Caso Real: Hospital",
        tiempo: 50,
        instruccion: "Diseño para un hospital — ¡piensa bien!",
        escenario: "Un hospital necesita conectar equipos médicos críticos (monitores de UCI) que no pueden perder conectividad bajo ninguna circunstancia y que están en zonas con equipos de resonancia magnética (alta interferencia).",
        opciones: [
          { id:"a", texto:"UTP Cat6, topología estrella simple",    correcto:false, feedback:"UTP sin blindaje fallará con la interferencia de resonancia magnética." },
          { id:"b", texto:"STP Cat6a + redundancia de enlace + UPS", correcto:true, feedback:"¡Perfecto! STP protege de EMI, redundancia garantiza uptime, UPS protege de cortes." },
          { id:"c", texto:"WiFi 6E en toda la UCI",                 correcto:false, feedback:"WiFi puede interferir con equipos médicos y no garantiza la estabilidad requerida." },
          { id:"d", texto:"Fibra óptica directa a cada equipo",     correcto:false, feedback:"Fibra hasta cada monitor es excesivo y los equipos médicos típicamente usan RJ45." }
        ],
        puntaje: 150
      },
      {
        id: 4,
        tipo: "herramientas",
        titulo: "Certificación Final",
        tiempo: 40,
        instruccion: "El cliente quiere certifcación oficial. ¿Qué haces?",
        pregunta: "Al terminar una instalación Cat6a para un banco, el cliente exige documentación de certificación. ¿Qué debes entregarle?",
        opciones: [
          { id:"a", texto:"Solo el diagrama de la instalación", emoji:"📐", correcto:false, feedback:"El diagrama muestra el diseño pero no prueba que los cables cumplen los parámetros." },
          { id:"b", texto:"Reporte de certificador (Fluke/JDSU) por cada enlace + planos as-built", emoji:"📊", correcto:true, feedback:"¡Correcto! El reporte de certificación con PASS en cada enlace más los planos as-built es la entrega estándar profesional." },
          { id:"c", texto:"Factura de materiales",              emoji:"💰", correcto:false, feedback:"La factura lista los materiales pero no certifica la instalación." },
          { id:"d", texto:"Foto de los cables instalados",     emoji:"📷", correcto:false, feedback:"Las fotos evidencian el trabajo pero no certifican parámetros eléctricos." }
        ],
        puntaje: 150
      },
      {
        id: 5,
        tipo: "velocidad",
        titulo: "¡SPRINT FINAL!",
        tiempo: 10,
        instruccion: "¡10 SEGUNDOS! ¡La pregunta final de un Técnico Certificado!",
        pregunta: "¿Cuál es el ancho de banda (frecuencia) máximo del cable Cat7?",
        opciones: [
          { id:"a", texto:"250 MHz",  correcto:false },
          { id:"b", texto:"500 MHz",  correcto:false },
          { id:"c", texto:"600 MHz",  correcto:true  },
          { id:"d", texto:"2000 MHz", correcto:false }
        ],
        puntaje: 200
      }
    ]
  }
};

// Exportar para uso en módulos Node.js si aplica
if (typeof module !== 'undefined') module.exports = GAME_DATA;
