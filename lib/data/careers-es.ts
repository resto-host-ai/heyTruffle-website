/**
 * Spanish display translations for the careers wizard (components/careers/
 * CareersWizard.tsx). Display-only, on purpose: everything that actually
 * gets stored in `answers` and sent to Make -> ClickUp (role names, choice
 * option text, select option values) stays the canonical English string
 * from lib/data/careers.ts no matter which language the UI is showing.
 * That's what keeps the Make webhook's field mapping (Drop Down options,
 * interestedRoles values) working regardless of which language an
 * applicant filled the form in — see CareersWizard.tsx's `tr()` /
 * `roleDisplay()` helpers, which only ever substitute the label shown,
 * never the value written to state.
 *
 * Every dictionary here is keyed by the same stable identifier the English
 * data already has (`Role.id`, or a step's `k`) rather than by array index,
 * so reordering lib/data/careers.ts doesn't silently misalign a
 * translation. The two "fields"-type steps have no top-level `k` in the
 * English data, so they're addressed here by the synthetic keys "basics"
 * (step 1 of 9: name/email/phone) and "finalDetails" (step 9 of 9).
 */

export const ROLES_ES: Record<
  string,
  { name: string; vac: string; bullets: readonly string[]; ident: string }
> = {
  bdr: {
    name: "Representante de Desarrollo de Negocios",
    vac: "3 vacantes",
    bullets: [
      "Sos el motor comercial del equipo. Nada entra al pipeline sin pasar por vos.",
      "Sos dueño de cada lead que llega por nuestros canales de generación y lead magnets, desde el primer contacto hasta la reunión agendada.",
      "Hablás todos los días con dueños y gerentes de restaurantes en Estados Unidos. Mucha habilidad de venta y tacto: la mitad del trabajo es leer a la persona del otro lado de la línea.",
      "Es el rol que más rápido te enseña a vender en esta industria, y de acá van a salir los account managers y sales executives del año que viene.",
    ],
    ident:
      "Si hablar con desconocidos te sale natural, y podés aguantar cinco no's para llegar a un sí, este es tu lugar.",
  },
  am: {
    name: "Account Manager, Cuentas en EE.UU.",
    vac: "2 vacantes",
    bullets: [
      "Vas a manejar entre 10 y 20 cuentas: cadenas de restaurantes en EE.UU. y Latinoamérica, cuyos equipos te van a conocer por tu nombre.",
      "Es un rol construido sobre la comunicación antes que el proceso. Empatía, entender dónde está cada cliente y qué le preocupa de verdad, muchas veces antes de que lo diga.",
      "La otra mitad es analítica: armás, entendés y presentás los reportes de performance de tus cuentas, y podés defender lo que dicen.",
      "Liderás los pedidos de nuevas funcionalidades junto con el equipo de producto. Entendés el problema, lo traducís en algo que ingeniería pueda construir, y seguís el proceso hasta que sale.",
      "Con el tiempo vas a tomar ownership total: ajustar los asistentes vos mismo, sin depender de nadie más.",
    ],
    ident:
      "Si sos expresivo, bueno leyendo a la gente, y te molesta cuando un número no cierra, esa combinación es rara y es justo lo que buscamos.",
  },
  ae: {
    name: "Sales Executive, Mercado de EE.UU.",
    vac: "2 vacantes",
    bullets: [
      "Sos el que cierra. Tomás las reuniones que trae el equipo y las convertís en clientes.",
      "Armás el business case para cada cadena: cuántas llamadas están perdiendo hoy, cuánto vale eso en dólares, y qué cambia con nosotros.",
      "Negociás en inglés con gente que negocia para vivir. Precio, integraciones, y el miedo legítimo a que una IA le hable a sus clientes.",
      "Es el rol con el número más claro de la empresa, y variable sin techo. Si vendés, se nota.",
    ],
    ident:
      "Si ya cerraste deals B2B y te gusta un trabajo que se mide solo, acá vas a estar cómodo.",
  },
  gtm: {
    name: "GTM Engineer",
    vac: "1 vacante",
    bullets: [
      "Construís la máquina comercial: las listas, las secuencias, los reportes y los experimentos. Todo lo que hace que el equipo de ventas llegue a las cuentas correctas con el mensaje correcto.",
      "Buscamos a alguien con experiencia en B2B que quiera experimentar. No tenemos límites en lo que estamos dispuestos a probar.",
      "Creatividad y data en la misma persona. Se te ocurre algo raro, lo armás en dos días, lo medís, y lo matás sin drama si no funciona.",
      "Es un rol técnico que vive adentro del equipo comercial. Vas a ver el efecto de lo que construís en el pipeline la misma semana.",
    ],
    ident:
      "Si sos de los que automatiza cualquier cosa que odiaría hacer dos veces, y además querés entender por qué la gente compra y por qué no, este rol te va a gustar.",
  },
  design: {
    name: "AI Designer",
    vac: "1 vacante",
    bullets: [
      "Te sumás al equipo de diseño de HeyTruffle. Buscamos a alguien que tome ownership de las herramientas de IA para contenido: edición, imágenes y video.",
      "Producís con IA el volumen que hace dos años le hubiera tomado a un equipo de tres personas: landing pages, creatividades de campaña, video corto, material de ventas, assets de marca.",
      "Buscamos criterio antes que herramientas. La IA acelera a alguien con ojo y expone a alguien que no lo tiene.",
      "Vas a defender decisiones de diseño, incluso frente al CEO. Se espera que lo hagas.",
    ],
    ident:
      "Si tenés portfolio, opiniones propias, y ya usás herramientas generativas todos los días sin que se note en el resultado, queremos ver tu trabajo.",
  },
  swe: {
    name: "Software Engineer",
    vac: "1 vacante",
    bullets: [
      "Vas a construir nuestras integraciones con las plataformas más grandes de restaurant tech: UberEats, OpenTable, Toast, y el sistema POS de cada cadena que se suma.",
      "Te sumás a un equipo de ingeniería con experiencia real en producción, no vas a construir esto solo. Lo que se construye ahora se construye con varias miradas con experiencia en la sala.",
      "Mentalidad ofensiva: shippeamos tres o cuatro features por trimestre. Valoramos la velocidad y entender de verdad el código, no solo que funcione de casualidad.",
      "Necesitamos gente cómoda usando herramientas de IA para código todos los días, con expertise real en cloud.",
      "Valoramos ingenieros que entienden cómo funcionan los LLMs por dentro y que ya construyeron un producto desde cero. Casi todo está por construirse, y buscamos mentalidad de líder para construirlo.",
    ],
    ident:
      "Si querés ser parte de un equipo de ingeniería de alto rendimiento shippeando features y escribiendo código todo el día, este es tu lugar.",
  },
  seo: {
    name: "SEO y Posicionamiento de Marca",
    vac: "1 vacante",
    bullets: [
      "Nuestro problema es que casi nadie en Estados Unidos sabe que esta categoría existe todavía. Vas a nombrarla, con un posicionamiento de marca fuerte, como ya lo hiciste en otro lado.",
      "Marketing B2B, no B2C: entendés cómo venderle algo caro y técnico a alguien ocupado, y podés meterte en los detalles técnicos del producto para investigar bien el mercado y la categoría.",
      "Es el único canal que compone: lo que escribís este mes te sigue trayendo clientes dentro de dos años. Todo lo demás para el día que dejás de empujarlo.",
      "SEO técnico y escritura en la misma persona, para el mercado de EE.UU.",
      "Y usás IA para todo: investigación de mercado, posicionamiento, generación de contenido a un volumen que antes le tomaba a un equipo entero.",
    ],
    ident:
      "Si ya construiste un posicionamiento de marca fuerte en Estados Unidos, sabés leer un Search Console, y te importa cómo se ve lo que publicás, este rol es completamente tuyo.",
  },
  fde: {
    name: "Forward Deployed Engineer",
    vac: "1 vacante",
    bullets: [
      "Estás entre nuestros clientes y el producto. Escuchás conversaciones reales entre los agentes y quienes llaman, y encontrás dónde se rompe la experiencia.",
      "En la práctica, sos prompt engineer: entendés exactamente cómo funciona el prompting en distintos LLMs, y usás herramientas avanzadas y guardrails para llevarlo a producción, no solo a un playground.",
      "Necesitás habilidad real comunicándote con clientes: vas a estar en la llamada explicando algo técnico en términos simples, todas las semanas.",
      "Construís tus propios MVPs e iterás rápido: probás una hipótesis con un cliente real en vez de esperar a que producto lo agende.",
      "Los pedidos de los clientes más grandes, los que no entran en el roadmap pero igual hay que resolver, son tuyos.",
      "Si trabajaste en gastronomía, eso cuenta mucho. Entender lo que pasa en el piso en una noche a full cambia completamente cómo resolvés esto.",
    ],
    ident:
      "Sos mitad prompt engineer, mitad la cara del producto frente al cliente: tan cómodo ajustando un prompt como explicándoselo a alguien que no tiene idea qué es un LLM.",
  },
  talent: {
    name: "Talent Acquisition Partner",
    vac: "1 vacante",
    bullets: [
      "Vas a construir el equipo que construye todo lo demás. Es la contratación que hace posible cada otra contratación.",
      "Y vas a ser nuestra cara en el mundo: eventos, ferias de empleo, universidades, comunidades técnicas. Hoy nadie nos conoce en el mercado de talento argentino, y vos sos quien cambia eso.",
      "Full cycle de verdad: definís el rol con el hiring manager antes de publicarlo, buscás, entrevistás, y cerrás.",
      "Vas a poder decirle a un jefe de área que su búsqueda está mal definida. Más que poder: se espera que lo hagas.",
    ],
    ident:
      "Si te apasiona el oficio de encontrar gente, y también te sentís cómodo parado hablándole a una sala llena de desconocidos, esas son las dos mitades de este rol.",
  },
  open: {
    name: "No ves tu rol acá",
    vac: "siempre abierto",
    bullets: [
      "Si ninguno de los nueve roles de arriba es el tuyo, pero igual pensás que podrías cambiar algo acá, esta es tu posición.",
      "Esto no es un buzón de currículums. Si aparece alguien excepcional para una función que hoy no tenemos, creamos el rol.",
      "Ejemplo real: no estamos buscando un Head of Finance. Si uno nos escribe y hace el caso, lo entrevistamos y construimos el rol.",
      "Vas a hablar con Lucas, el fundador, incluso si el rol no existe todavía. Y si no es el momento, te vamos a dar una fecha concreta para volver a hablar.",
    ],
    ident:
      "Si claramente sos excelente en algo difícil de categorizar, o venís de otra industria y ves acá algo que nosotros no vemos, escribinos.",
  },
};

type ChoiceOptEs = { t: string; s?: string };

type StepEs = {
  eyebrow?: string;
  title?: string;
  sub?: string;
  ph?: string;
  warn?: string;
  /** Parallel to the English step's `opts`, by index — display label/sub
   *  only, never the stored value (see file header). */
  opts?: readonly ChoiceOptEs[];
};

// Keyed by the step's `k` (unique for every choice/line/roles/text step).
export const STEPS_ES: Record<string, StepEs> = {
  seniority: {
    eyebrow: "2 de 9",
    title: "¿Dónde estás en tu carrera?",
    sub: "Respondé según años reales de experiencia, no el título que te hayan puesto.",
    opts: [
      { t: "Junior", s: "0 a 2 años de experiencia." },
      { t: "Semi-senior", s: "3 a 5 años." },
      { t: "Senior", s: "Más de 5 años." },
      { t: "Roles de liderazgo", s: "Lideré equipos o áreas." },
    ],
  },
  strongestSkill: {
    eyebrow: "3 de 9",
    title: "En una línea: ¿cuál es tu habilidad más fuerte?",
    sub: "La que dirías primero, sin bajarle el precio.",
    ph: "Ej.: Consigo que gente que no quiere atenderme igual me escuche.",
  },
  interestedRoles: {
    eyebrow: "4 de 9",
    title: "¿Cuáles te interesan?",
    sub: "Hacé click en cualquiera para releer qué significa el rol. Elegí hasta tres con el círculo de la izquierda.",
  },
  aiExperience: {
    eyebrow: "5 de 9",
    title: "¿Qué construiste con IA?",
    sub: "No qué herramientas usás: qué construiste, y qué cambió porque lo construiste.",
    warn: "Nada de relleno. Quien lea esto lo va a notar en un segundo, porque nosotros usamos estas herramientas todo el día. Y si todavía no construiste nada, contanos por qué: esa respuesta también sirve y no te descarta.",
    ph: "Qué construiste, con qué, y qué cambió. Si algo falló, contanos eso también. Si no construiste nada, contanos por qué.",
  },
  startupExperience: {
    eyebrow: "6 de 9",
    title: "¿Trabajaste en una startup?",
    sub: "Si sí, contanos un poco: cuánta gente, qué terminaste haciendo que no estaba en tu puesto. Si no, contanos cómo te lo imaginás.",
    ph: "Dos o tres líneas.",
  },
  likesDislikes: {
    eyebrow: "7 de 9",
    title: "De los lugares donde trabajaste: ¿qué te gustó, y qué no?",
    sub: "Las dos cosas. La segunda dice más que la primera, así que no la edulcores.",
    ph: "Qué te hizo quedarte, y qué te hizo irte o querer irte.",
  },
  englishLevel: {
    eyebrow: "8 de 9",
    title:
      "Inglés: un Zoom de 45 minutos con un COO estadounidense que habla rápido y te interrumpe.",
    sub: "Sé honesto. Algunos roles lo necesitan y otros no, así que exagerarlo acá solo te hace perder tiempo a vos.",
    opts: [
      { t: "Manejo la reunión sin dudarlo." },
      { t: "Me defiendo bien. Puedo perderme algún matiz, pero no se me cae." },
      { t: "Entiendo todo pero me cuesta hablar con fluidez." },
      { t: "Todavía no estoy ahí." },
    ],
  },
};

export type FieldEs = { label?: string; ph?: string; note?: string; options?: readonly string[] };

type FieldsStepEs = {
  eyebrow?: string;
  title?: string;
  sub?: string;
  fields: Record<string, FieldEs>;
};

// Synthetic keys "basics" / "finalDetails" — the two "fields"-type steps
// have no top-level `k` in the English data (CareersWizard.tsx identifies
// which is which by checking for the "fullName" / "studies" field key).
export const FIELDS_STEPS_ES: Record<"basics" | "finalDetails", FieldsStepEs> = {
  basics: {
    eyebrow: "1 de 9",
    title: "Empecemos con lo básico",
    sub: "Nada de esto sale del equipo.",
    fields: {
      fullName: { label: "Nombre completo" },
      email: { label: "Email" },
      phone: { label: "Teléfono", ph: "9 11 1234 5678" },
    },
  },
  finalDetails: {
    eyebrow: "9 de 9",
    title: "Últimos detalles",
    sub: "Tu CV es opcional. Si preferís dejarnos solo tu LinkedIn, alcanza.",
    fields: {
      studies: {
        label: "¿Cómo venís con tus estudios?",
        note: "Los roles junior son para gente que ya se recibió, o que está en su último cuatrimestre. Si te queda más que eso, escribinos cuando estés terminando y te tenemos en cuenta.",
        // Parallel to careers.ts studies.options, by index — display only.
        options: [
          "Ya me recibí",
          "Estoy en mi último cuatrimestre",
          "Todavía me queda más de un cuatrimestre",
          "No hice una carrera universitaria",
        ],
      },
      degree: {
        label: "Carrera y universidad",
        ph: "Ej.: Ingeniería Industrial, ITBA",
      },
      officeAvailability: {
        label: "La oficina está en Béccar, en la zona norte de Buenos Aires.",
        note: "Dos días a la semana en la oficina es un requisito. Si eso no te cierra ahora, preferimos decírtelo de entrada y no en tu cuarta entrevista.",
        options: [
          "Vivo cerca, no es problema",
          "Me queda cómodo, dos días a la semana no es problema",
          "Me queda lejos, pero puedo hacer dos días a la semana",
          "No puedo hacer dos días a la semana",
        ],
      },
      linkedin: { label: "LinkedIn", ph: "linkedin.com/in/..." },
      resumeUrl: {
        label: "Link a tu CV o portfolio (Drive, Notion, PDF, Behance)",
      },
      howFound: {
        label: "¿Cómo nos encontraste?",
        options: [
          "Alguien me lo reenvió por WhatsApp",
          "LinkedIn",
          "Un amigo o alguien del equipo",
          "Instagram",
          "Telegram",
          "La bolsa de trabajo de mi universidad",
          "Get on Board u otra bolsa de trabajo",
          "Otro",
        ],
      },
      referredBy: {
        label: "Si alguien del equipo te lo mandó, ¿quién?",
      },
    },
  },
};

// Flat lookup by field key, merging both "fields" steps — field keys are
// unique across the whole form, so FieldInput can look a translation up
// without needing to know which of the two steps it's rendering for.
export const FIELD_ES: Record<string, FieldEs> = {
  ...FIELDS_STEPS_ES.basics.fields,
  ...FIELDS_STEPS_ES.finalDetails.fields,
};

export const FIELD_ERRORS_ES: Record<string, string> = {
  fullName: "Solo letras, sin números ni símbolos.",
  email: "Ingresá un email real y no descartable.",
  phone: "Ingresá un número de teléfono válido (solo dígitos, entre 7 y 15).",
  linkedin: "Ingresá tu URL o handle de LinkedIn.",
};

/** Static wizard chrome — everything that isn't sourced from STEPS/ROLES.
 *  The intro/result screens' prose (which has inline <strong> tags at
 *  specific points, not just plain paragraphs) is translated directly as
 *  JSX inside CareersWizard.tsx instead of being routed through this data
 *  file — trying to template bold-in-the-middle-of-a-sentence text as plain
 *  strings would just fight the markup, and that prose isn't reused
 *  anywhere else the way STEPS/ROLES are. */
export const UI_ES = {
  back: "Atrás",
  continue: "Continuar",
  start: "Empezar",
  optional: "(opcional)",
  chooseAnOption: "Elegí una opción",
  countryCode: "Código de país",
  roleSelectedCount: (n: number, max: number) => `${n} de ${max} seleccionados`,
  charactersCount: (n: number) => `${n} caracteres`,
  markAsInteresting: (name: string) => `Marcar ${name} como interesante`,
} as const;
