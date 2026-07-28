# Auditoría de performance y calidad de código — Foco: Mobile

**Fecha:** 2026-07-28 · **Build auditado:** `8f92e65` (main) · **Método:** análisis estático del código + build de producción real + mediciones con Playwright (Chromium y WebKit, viewport 393×660) contra `next start` local y contra producción en Render.

---

## 1. Resumen ejecutivo

El sitio está **arquitectónicamente sano**: 100% SSG (94 rutas prerendered, cero SSR accidental), media pesada diferida (`preload="none"` en video y audios), facades correctas para Vimeo/Calendly, scroll handlers con rAF+passive, cero fetches client-side evitables, cero console.log en cliente, dependencias mínimas (4 runtime deps, todas usadas). El problema de mobile NO es estructural — es una suma de 5 causas puntuales, en orden de impacto:

| # | Causa | Impacto mobile | Evidencia medida |
|---|-------|----------------|------------------|
| 1 | **1.59MB / 98 archivos woff2 de fuentes PRELOADEADOS en cada página.** Gowun Batang es una fuente coreana que Google slicea en ~190 subsets unicode; la config actual preloadea 94 de ellos (1.48MB) aunque el sitio solo usa caracteres latinos. Encima se cargan 5 familias, una de ellas (Montserrat, 3 pesos) con **cero usos** en el código. | **Crítico** — es el 55% del peso de cada página y compite con el LCP en cada visita | Medido: home mobile = FONT 1,592KB vs IMG 548KB vs JS ~200KB (gz). 98 `<link rel="preload" as="font">` en el HTML built |
| 2 | **Render sirve los estáticos lento y sin CDN.** Cada chunk de JS tarda ~1s en descargar incluso desde desktop con buena conexión; la hidratación completa llega a 1.3s en cable → mucho más en un teléfono. | **Alto** — multiplica todo lo demás | Medido contra producción: chunks a 950-995ms c/u; `js-ready` a 1.3s (Chromium desktop) |
| 3 | **Costo GPU por frame en scroll (jank iOS):** `backdrop-blur-xl` + `mix-blend-luminosity` permanentes en el header fijo; 3 blobs de blur 130-140px **animados con scale** en /case-study (re-rasterizan en WebKit); ~15 overlays de grain `mix-blend-overlay` full-bleed. | **Alto** (jank, no carga) | A/B WebKit vs Chromium: secciones con estos efectos 3× más lentas en WebKit |
| 4 | **Microsoft Clarity con `afterInteractive` en todas las rutas** — el único third-party eager: ~35KB + CPU de session recording justo en la ventana de hidratación/INP. | **Alto** en INP/TBT | `components/layout/Clarity.tsx:10-16`; en las trazas: `collect` 728-898ms |
| 5 | **Imágenes: sin AVIF (config default = solo webp), `quality 90` y `priority` en fondos decorativos de 100vw en 8 páginas** (compiten con el LCP), SVGs del marquee 287KB crudos sin optimizar, fuentes de imagen 2560px para renders de 200-900px. | **Medio-Alto** | Tabla completa en Fase 3; IMG 548KB en home mobile |

**El JS propio es secundario:** ~97KB (framework Next/React: 446KB raw / ~110KB gz, no reducible; propio: ~30KB gz, del cual ~20-25% es evitable).

---

## 2. Hallazgos detallados

### FASE 1 — Arquitectura

| Hallazgo | Evidencia | Impacto | Fix |
|---|---|---|---|
| 5 familias tipográficas en el root layout | `app/layout.tsx:20-56`: Inter (4 pesos), Gowun Batang (2), Google Sans (variable + eje GRAD), Montserrat (3), Geist Mono | **Alto** | Ver Fase 4 (fuentes) |
| Hero completo es client component por un `useState` del buscador | `components/home/Hero.tsx:1,10-11` — el H1/LCP se hidrata sin necesidad | Medio | Extraer form+DemoAssistant a un leaf client; hero queda server |
| `HostsDemo` (670 líneas) + transcripts completos importados eager desde la home | `components/home/WhatIsSection.tsx:5` → `lib/hosts.ts` (12.9KB) viaja entero en el chunk cliente `369-rwdbz1p8-.js` (56KB raw / 17KB gz) — verificado por firma de contenido | Medio | `next/dynamic` para HostsDemo; transcripts con `import()` dinámico al primer play |
| `DemoAssistant` (222 líneas) importado eager en 3 lugares; retorna `null` hasta abrirse | `Hero.tsx:6`, `TryDemoButton.tsx:4`, `DemoSearchBar.tsx:4` | Medio | `next/dynamic` con trigger en el click |
| Client boundaries empujables | `Testimonials.tsx:1` (estado solo en el card), `Partner.tsx:1,38` (419 líneas por un useState de modal), `TrustedByLogo.tsx:33` (solo onError ×20 instancias) | Medio | Bajar el directive al leaf interactivo |
| **Código muerto: 15 archivos client** | `components/macbook-dashboard/` (13 archivos, 780 líneas, cero importadores), `components/marketing/Features.tsx` e `Integrations.tsx` (solo imports comentados en `app/page.tsx:12,14`), `formatCount` en `lib/format.ts` | Bajo runtime (tree-shaken) / Alto higiene | Borrar |
| `"use client"` redundantes sin interactividad | `components/roi-calculator/CardGrid.tsx`, `ProgressBar.tsx`, `QuestionStep.tsx`, `ThanksPanel.tsx` | Bajo | Quitar directive |
| RebrandModal global en todas las rutas | `app/layout.tsx:100`, gated por `?from=restohost` + localStorage | Bajo | Aceptable; opcional gate más barato |
| Sanos ✓ | Deps runtime = exactamente `marked/next/react/react-dom`, todas usadas; `marked` NO llega al cliente (0 matches en chunks); barrel de case-studies es server-only; sin `import * as`; ninguna page es client | — | — |

### FASE 2 — Bundle y JavaScript

- **First Load JS (home, medido):** framework 446KB raw (~110KB gz — `1eglloh0s_w8l.js` 221KB + `3p1_bvy3plzeq.js` 142KB + 3 más, no reducible) + **~97KB propios**: secciones del home 56KB (`369-rwdbz1p8-.js`, incluye transcripts) + layout 41.5KB (Header 451 líneas, RebrandModal, ScrollReveal, Calendly loader). El objetivo <130KB gz por ruta **se cumple hoy** (~140KB gz total con framework; el propio son ~30KB gz).
- **Nota Turbopack:** el build de Next 16.2 no imprime la tabla de First Load JS; se midió con transferencia real por ruta.
- Candidatos a `next/dynamic`: HostsDemo, DemoAssistant, RoiCalculatorForm (solo en su ruta, ya aislado ✓).
- Scripts de terceros: **Clarity `afterInteractive` global es el único problema** (→ `lazyOnload`). Calendly on-click ✓, Vimeo facade ✓, GSC meta inofensivo ✓.
- **Bug funcional descubierto:** `Contact.tsx:33-34`, `RoiCalculatorForm.tsx:45-46`, `Partner.tsx:109-110` pushean eventos a `window.dataLayer` pero **GTM/GA no se carga en ningún lado** — el funnel de analytics está ciego. Decidir: cargar GTM (lazyOnload) o borrar los pushes.

### FASE 3 — Imágenes y assets

Total `public/`: 20.7MB (imágenes 11.1, video 5.1, audio 4.2). Todo raster pasa por `next/image` ✓; cero `<img>` problemáticos (3 nativos, logos chicos con lazy). El costo wire real en mobile:

| Archivo | Actual | Formato | Dimensiones | Render máx. | Optimizado est. | Ahorro |
|---|---|---|---|---|---|---|
| `videos/moment.mp4` | 5,104KB | mp4 | 720×540 | 900px card | ~2,500KB (CRF más agresivo) | ~2,600KB wire |
| Fuentes preloadeadas (ver F4) | 1,590KB | woff2 | — | — | ~100KB | **~1,490KB wire** |
| `images/card1-4.webp` (galería case-study) | 1,544KB | webp | 2560×1078 | 100vw mob | ~480KB @1800w | 1,060KB |
| `images/background_gradient.webp` | 508KB | webp | 1920×2022 | 100vw bg ×5 páginas | ~150KB @q75+AVIF | 360KB |
| `images/case-rreal.webp` + `case-baires.webp` | 704KB | webp | 2560×1920 | 90vw mob | ~230KB @1400w | 475KB |
| Avatares hosts ×4 | 664KB | webp | 1080×1065 | 200px/52vw | ~220KB @700w | 445KB |
| `logo_*.svg` ×10 (marquee TrustedBy) | 287KB | svg **crudo, `unoptimized`** | vector | 74-189px | ~60KB (SVGO) | **227KB wire** |
| `testimonials/*-poster.webp` ×2 | 236KB | webp | 2328×1772 | 580px | ~105KB | 130KB |
| Blog (50 archivos) | 4,732KB | webp | 1920×1280 | 900px | ~3,300KB @q75 | 1,400KB (repo) |
| **Total potencial** | | | | | | **~7.3MB fuente / ~2.3MB wire** |

Hallazgos puntuales:
- **`priority` mal usado en fondos decorativos** (el LCP en esas páginas es texto o otra imagen): `app/blog/[slug]/page.tsx:61-66` (¡dos priority por post!), `app/integrations/[slug]/page.tsx:69`, `components/case-study/CaseStudyPage.tsx:54`, `app/testimonials/page.tsx:34`, `app/faq/page.tsx:173`, `app/roi-calculator/page.tsx:31`, `components/layout/LegalPage.tsx:122`, `app/not-found.tsx:19` → cambiar a `loading="eager" fetchPriority="low"` (patrón ya usado en WhatIsSection).
- **`quality={90}` en fotos** (solo se justifica en gradientes): `HostsDemo.tsx:335,441`, `CaseStudies.tsx:233,263` → 75.
- **Sin AVIF**: `next.config.ts:54-61` no define `formats` → default webp-only en Next 16. Agregar `['image/avif','image/webp']` baja los fondos 100vw 30-50%.
- `HeroBackground.tsx:52-115`: SVG inline de 123 líneas con 9 `feGaussianBlur` (stdDeviation hasta **200**) + `feTurbulence` full-viewport. Bien diseñado (rasteriza una vez, la animación es transform de la capa cacheada, reduced-motion la apaga) pero el raster inicial en un teléfono @3x es caro y la textura queda retenida en GPU (~1.3× viewport, `will-change` permanente). → En mobile: servir un webp estático del mismo gradiente.
- Sanos ✓: audio 4.2MB nunca se descarga sin click; blog carga por página; cero assets huérfanos; cero CSS `background-image: url()` fuera del pipeline.

### FASE 4 — Fuentes, CSS y render

**Fuentes (el hallazgo #1 de toda la auditoría):**
- Todas via `next/font/google` (self-hosted, `display: swap` ✓, sin `<link>`/@import ✓). PERO: **233 woff2 emitidos (5.0MB), 98 preloadeados en cada ruta (1.63MB)**.
- `app/layout.tsx:26-30`: **Gowun Batang** (coreana) → 190 slices unicode, 94 preloadeados = 1,476KB. El sitio solo usa latin. → **Fix: `next/font/local` con subset latin 400/700 (~2 archivos, ~80KB) o `preload: false`.**
- `app/layout.tsx:47-51`: **Montserrat con CERO usos** (no existe `font-montserrat` en el código; el footer usa `font-body`). → Borrar.
- Google Sans con `adjustFontFallback: false` → swap sin `size-adjust` sobre 177 elementos `font-body` (incluye el lead del hero) → riesgo CLS medible. → Fallback manual con size-adjust o quitar el flag.
- Geist Mono: 14 usos, 2 de ellos en código muerto. Revisar si justifica la familia.

**CSS / costo de render (jank):**
- **`Header.tsx:169`: `backdrop-blur-xl` permanente en el header fijo** + `mix-blend-luminosity` (:118,182,207). Costo por frame en todo scroll de iOS, en todas las páginas. → Mobile: bg sólido sin blur (`md:backdrop-blur-xl`), y `invisible` en vez de `opacity-0` cuando el overlay lo tapa. **Impacto: Alto.**
- **`SuccessStats.tsx:113-121`: 3 blobs 520-580px con `blur-[130-140px]` ANIMADOS con scale** (`stat-drift-*`, globals.css:137-169) — re-rasterizan el filtro por frame en WebKit, corren infinito también en mobile. → `hidden md:block` o webp estático. **Impacto: Alto en /case-study.**
- Blurs estáticos gigantes (memoria GPU): `MomentSection.tsx:61-62` (2×620px), `faq:248`, `CaseStudies.tsx:117`. → Reducir en mobile. Medio.
- `globals.css:70-76`: `.reveal` deja `will-change: opacity, transform` para siempre (capa retenida por elemento). → Scoped a `:not(.is-visible)`. Medio.
- `host-alive`/`host-ring` (globals.css:495-535): animaciones infinitas por avatar aunque la sección no esté en viewport. → Pausar via IO. Medio-Bajo.
- ~15 overlays de grain `mix-blend-overlay` full-bleed (composición offscreen de la sección entera c/u). → Hornear el grain en los webp de fondo o gate mobile. Medio acumulado.
- `transition-all` ×22 — los que importan: header fijo y cards del carrusel (repaint 500ms por swipe). → Transicionar propiedades explícitas. Bajo-Medio.
- Sanos ✓: todos los @keyframes animan solo transform/opacity; todos los scroll handlers con rAF + passive + bail mobile; máscaras mayormente estáticas.

**CLS:**
- Imágenes: cero sin dimensiones ✓. Video con aspect + poster ✓. Secciones pinned reservan altura ✓. Reveals visible-by-default ✓ (fix de hoy).
- Riesgo restante: el swap de Google Sans sin size-adjust (arriba) y la scrollbar del RebrandModal (micro; `scrollbar-gutter: stable`).

### FASE 5 — Data fetching y rendering

- **Todo SSG ✓**: 94 rutas prerendered, `revalidate: false`, cero `headers()/cookies()/searchParams`, único dynamic `/api/contact` (correcto).
- `dynamicParams = false` **solo en case-study** — blog, blog paginado e integrations aceptan slugs basura con render on-demand (lecturas FS por request en Render). → Agregar en los 3. Bajo perf / Medio hardening.
- Fetches cliente: todos event-driven (forms, autocomplete con debounce) ✓. `lib/blog.ts` lee FS solo en build ✓. Sin waterfalls ✓.
- `trailingSlash: true` pero hay hrefs internos sin barra final (`BlogIndex.tsx:63,109`, `blog/[slug]/page.tsx:169`, `Header.tsx:14-19`) → 308 extra para crawlers/hits directos. Bajo.

### FASE 6 — Higiene

- Componentes >300 líneas: HostsDemo 670, CaseStudyPage 664, Header 451, Partner 419, CaseStudiesList 374, RoiCalculatorForm 362, CaseStudies 358. → Dividir HostsDemo y CaseStudyPage primero (mantenibilidad, no perf).
- `console.*`: solo en `/api/contact` (server, decisión conocida). Cero en cliente ✓.
- Dead code: macbook-dashboard (13), Features, Integrations marketing (ver F1).
- Deps sin uso: ninguna ✓. TODO/FIXME: cero ✓. Comentario stale en `HeroBackground.tsx:1-5`.
- Build: 0 errores, 0 warnings ✓.
- (Hardening, no perf: API key del demo con fallback hardcodeado en `lib/demoAssistant.ts:17-19` — ya trackeado, espera rotación de Kevin.)

---

## 3. Plan de remediación priorizado

### Quick wins (<1h cada uno, orden de ejecución)

| # | Acción | Ahorro estimado | Esfuerzo |
|---|---|---|---|
| 1 | **Fuentes**: Gowun Batang → `next/font/local` latin 400/700 (o `preload:false`); **borrar Montserrat**; revisar Geist Mono | **~1.5MB/página** (-94%) | 45 min |
| 2 | **Clarity → `strategy="lazyOnload"`** | INP/TBT en toda ruta | 5 min |
| 3 | `next.config.ts`: `images.formats: ['image/avif','image/webp']` | 30-50% en fondos 100vw | 5 min + build check |
| 4 | `priority` → `eager + fetchPriority="low"` en los 8 fondos decorativos | LCP en blog/integrations/case-study/faq/etc. | 20 min |
| 5 | `quality` 90→75 en fotos (HostsDemo, CaseStudies) | ~40% en esas imágenes | 10 min |
| 6 | Header: `md:backdrop-blur-xl` + bg sólido mobile + `invisible` con overlay | Jank de scroll iOS global | 20 min |
| 7 | SuccessStats: blobs animados `hidden md:block` | Jank /case-study | 10 min |
| 8 | Borrar dead code (macbook-dashboard, Features, Integrations, formatCount, directives redundantes) | Higiene | 20 min |
| 9 | `dynamicParams = false` en blog/blog-page/integrations | Hardening | 10 min |
| 10 | Trailing slashes en hrefs internos | SEO/308s | 10 min |

### Mejoras estructurales (por sprint)

1. **SVGs del marquee**: SVGO/re-export (287KB → ~60KB wire en la home).
2. **Re-encode de fuentes de imagen**: card1-4, case-rreal/baires, avatares hosts, background_gradient, posters (≈3MB fuente; con AVIF del QW#3 el wire baja solo).
3. **Hero boundary split**: hero server + leaf client (form); HeroBackground como webp estático en mobile (raster + memoria GPU).
4. **HostsDemo lazy**: `next/dynamic` + transcripts por host con `import()` al play (~17KB gz menos en el first load del home).
5. **DemoAssistant dynamic** on-click (3 entry points).
6. **Grain overlays**: hornear en los webp o gate mobile (~15 secciones).
7. **`will-change` scoped** en `.reveal` + pausar `host-ring/alive` fuera de viewport.
8. **moment.mp4**: re-encode a ~2.5-3MB y/o gate de autoplay con `navigator.connection.saveData`.
9. **Decisión GTM**: cargarlo `lazyOnload` o borrar los `dataLayer.push` ciegos.
10. **Infra (Kevin)**: CDN delante de Render (Cloudflare) o plan superior — los chunks a ~1s c/u multiplican todo lo anterior.
11. Refactor de mantenibilidad: dividir HostsDemo y CaseStudyPage.

### Impacto proyectado en la home mobile

| Métrica | Hoy (medido/estimado) | Post quick-wins | Post estructurales |
|---|---|---|---|
| Peso total transferido | ~2.6MB | ~1.0MB | ~0.7MB |
| Fuentes | 1,590KB | ~100KB | ~100KB |
| First Load JS (gz) | ~140KB | ~140KB | ~120KB |
| LCP (4G, estimado) | 4-6s | ~2.5s | <2.5s ✓ |
| CLS | riesgo por swap Google Sans | <0.1 ✓ | <0.1 ✓ |
| INP | Clarity compitiendo | <200ms ✓ | <200ms ✓ |

---

## 4. Métricas objetivo (criterio de done)

- LCP < 2.5s (4G, Moto G/iPhone 12 class) · CLS < 0.1 · INP < 200ms · First Load JS < 130KB gz por ruta (hoy ya se cumple) · **Fuentes < 150KB por página** (nuevo objetivo propio, hoy 1,590KB).
- Validación: Lighthouse mobile + el A/B WebKit/Chromium de Playwright usado en esta auditoría, contra producción.
