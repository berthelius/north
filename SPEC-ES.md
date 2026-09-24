# Especificación NORTH.md

**Versión:** 0.1  
**Estado:** Activo (Lanzamiento Público Canónico)  
**Autor:** [Viktor Berthelius](https://brthls.com) (BRTHLS)  
**Licencia:** MIT  
**Fecha:** 2026-09-24  

---

## Resumen

`NORTH.md` es un único archivo markdown situado en la raíz de un proyecto de software
que declara el **propósito, la ambición y los trade-offs precalculados** del proyecto en un
formato legible tanto por personas como por agentes de código con IA.

Actúa como ancla del **stack de gobernanza de agentes en 5 capas**:

- `CONSTITUTION.md` — **límites** (seguridad, barreras negativas, líneas rojas invariantes).
- `AGENTS.md` / `CLAUDE.md` — **cómo** operan los agentes (build, test, entorno).
- `design.md` — **diseño y contrato visual** (tokens de UI, layout, sistemas de diseño).
- `SOUL.md` — **quién** es el producto (voz, persona, tono).
- `NORTH.md` — **por qué** y **hasta dónde** (propósito, ambición, arbitraje de trade-offs por defecto, reversibilidad).

---

## Motivación

Los agentes de programación actuales tienden por defecto a una **producción segura e incremental**. Optimizan para
"no romper lo que funciona" antes que para "subir de nivel". Ante una tarea ambigua,
eligen la interpretación más pequeña. Al proponer soluciones, sugieren
parches en lugar de refactorizaciones estructurales. Cuando dudan, añaden manejo de errores en lugar de
eliminar el modo de fallo en su origen.

Los archivos de reglas a nivel de repositorio (`CLAUDE.md`, `AGENTS.md`) cubren aspectos *operativos*:
qué comandos ejecutar, qué puertas de enlace respetar, qué convenciones seguir.
Los archivos de identidad (`SOUL.md`) cubren aspectos *estéticos* y *culturales*: voz, tono,
quiénes somos.

Ninguna de estas capas responde a la pregunta decisiva sobre si un agente entregará un
**parche competente** o un **salto ambicioso**:

> _¿Hacia dónde va este proyecto y hasta dónde estamos dispuestos a empujar para llegar allí?_

`NORTH.md` responde a esa pregunta, en siete secciones canónicas, en un solo archivo.

---

## Ubicación del archivo

`NORTH.md` DEBE ubicarse en la raíz del repositorio.

Si un monorepo contiene múltiples productos diferenciados, cada producto PUEDE tener su propio
`NORTH.md` en la raíz de su paquete. El `NORTH.md` de la raíz del monorepo describe entonces la
ambición general compartida.

---

## Formato del archivo

`NORTH.md` es un archivo CommonMark. DEBE contener las siete
secciones canónicas definidas a continuación, en orden, cada una como un encabezado H2.

Las secciones PUEDEN omitirse si no aplican, pero el encabezado DEBE conservarse
con una breve nota justificando la omisión.

Se PUEDEN añadir secciones adicionales después de las siete canónicas.

---

## Las siete secciones

### 1. North Star (Estrella Polar)

Una sola frase declarando el destino. No el roadmap. No el próximo
trimestre. El destino final.

Una North Star bien planteada es:

- **Suficientemente específica para descartar alternativas.** "Ser el mejor ERP" no es una
  North Star. "Reemplazar el software contable tradicional para pymes europeas para 2027" sí lo es.
- **Suficientemente ambiciosa para generar incomodidad.** Si la North Star parece cómoda y segura,
  no es una North Star.
- **Alcanzable en principio.** Una North Star no es una fantasía. Es un destino
  que justifica decisiones de ingeniería difíciles.

> **Ejemplo.** _Nordic ERP reemplaza el software tradicional para pymes europeas
> haciendo que la gestión empresarial nativa de IA sea el estándar por defecto para 2027._

### 2. The Bar (El Listón de Calidad)

El umbral de calidad que distingue lo "entregado" de lo "empezado". Define qué
trabajo es aceptable considerar completado.

Un Listón bien planteado es:

- **Medible u observable.** "Alta calidad" no es un Listón. "Latencia p95 por debajo de
  200ms, cero errores de tipado en CI, accesibilidad AA en cada vista" sí lo es.
- **Superior al estándar por defecto de la industria.** Un listón en el promedio de la industria no es ningún listón.
- **Defendido por barreras mecánicas.** Los elementos del listón DEBEN asignarse a mecanismos de validación: comprobaciones de CI,
  linters, reglas de revisión o runbooks.

> **Ejemplo.** _Cada funcionalidad entregada pasa: comprobación de tipos, linter, suite completa de pruebas,
> Lighthouse ≥95 en todas las métricas, WCAG AA mediante axe, y paridad i18n en 15
> idiomas. Cero excepciones, sin "TODO: pruebas luego"._

### 3. Asymmetric Bets (Apuestas Asimétricas)

Los frentes donde deliberadamente invertimos un esfuerzo 10x, y los frentes donde 1.1x es
deliberadamente correcto.

Una sección de Apuestas Asimétricas bien planteada nombra ambos lados:

- **Dónde vamos a lo grande.** Lo que merece inversión desproporcionada por ser
  estructural o estratégicamente decisivo.
- **Dónde entregamos deliberadamente estándar.** Lo que está bien al 80% para poder concentrar la
  capacidad restante en las apuestas de diferenciación.

Esta sección previene dos modos de fallo críticos: sobre-invertir en trabajo comoditizado y
sub-invertir en el trabajo que genera ventajas acumulativas.

> **Ejemplo.**  
> _Apostar 10x en: modelo de interacción nativo de IA, corrección de cumplimiento fiscal,
> onboarding completado en menos de 90 segundos._  
> _Aceptar 1.1x en: interfaz de configuración de administración, experiencia de importación legacy, paneles internos._

### 4. Anti-Goals (Anti-Objetivos)

Aquello que nos negamos explícitamente a hacer, incluso cuando sería fácil o
rentable a corto plazo. Los Anti-Objetivos son la forma de decir que no sin volver a debatirlo
cada semana.

Un Anti-Objetivo bien planteado es:

- **Tentador.** Si a nadie se le ocurriría pedirlo, no es un Anti-Objetivo.
- **Justificado.** Una razón directa de una línea que resiste la presión inmediata.
- **Específico.** No "no hacemos código malo", sino "no construimos funcionalidades que requieran
  revisión manual de un contable antes de ser operables".

> **Ejemplo.**  
> _No construimos un módulo de CRM. (Twenty ya existe; nos integramos, no
> reconstruimos)._  
> _No soportamos despliegues locales on-premise. (Distrae de la velocidad de producto
> cloud-native)._  
> _No aceptamos peticiones de funcionalidades sin fricción de usuario documentada. (El roadmap se
> basa en tracción real, no en ocurrencias)._

### 5. Trade-off Defaults (Trade-offs por Defecto)

Decisiones ya tomadas sobre dilemas recurrentes de ingeniería, documentadas una sola vez
para no re-debatirlas en cada sprint.

Cubre los trade-offs que surgen continuamente en tu dominio:

- Velocidad vs. seguridad
- Amplitud vs. profundidad
- Construir vs. comprar (Build vs. Buy)
- Generalidad vs. ajuste exacto
- Compatibilidad hacia atrás vs. diseño limpio
- Inquilino único vs. multi-inquilino (Single vs. Multi-tenant)

Para cada uno: declara la opción por defecto y las condiciones explícitas bajo las cuales esa opción
se invierte.

> **Ejemplo.**  
> _Defecto: velocidad sobre seguridad en herramientas internas; seguridad sobre velocidad en
> código contable/fiscal. Inversión: cualquier código que toque VeriFactu o nóminas debe cumplir el
> estándar de seguridad independientemente del alcance interno o externo._

### 6. Ambition Triggers (Disparadores de Ambición)

Frases — utilizadas por personas y citadas en los prompts de los agentes de IA — que escalan el
alcance cuando el equipo o el modelo están pensando en pequeño.

Un Disparador de Ambición bien planteado:

- **Es suficientemente corto para recordarse.**
- **Fuerza un cambio de marco mental concreto.** No "sé ambicioso", sino "¿cómo sería
  la versión 10x de esto?".
- **Permite responder con legitimidad: 'esta ya es la versión 10x'.**

> **Ejemplos.**  
> _"¿Existe una versión 10x de esta solución?"_  
> _"¿Qué entregaría [equipo de referencia mundial] en este caso?"_  
> _"Si tuviéramos tres semanas en lugar de tres días, ¿qué cambiaría?"_  
> _"¿Cuál es la versión de esto que mostraríamos en una keynote de lanzamiento?"_

### 7. Reversibility (Reversibilidad)

Un mapa de qué decisiones son puertas de un solo sentido (costosas de revertir) y cuáles son
puertas de doble sentido (económicas de revertir). Las puertas de un solo sentido merecen deliberación. Las puertas de
doble sentido merecen velocidad y autonomía.

Una sección de Reversibilidad bien planteada lista:

- **Puertas de un solo sentido en este proyecto.** Cambios de esquema de base de datos en producción,
  contratos de API pública, identidad de marca, lógica de cálculo fiscal, fronteras de seguridad.
- **Puertas de doble sentido en este proyecto.** Copy de la interfaz, diseño de herramientas internas, estructura de
  código modular, dependencias en herramientas de soporte.
- **La disposición por defecto.** Ante la duda, cómo tratarla.

> **Ejemplo.**  
> _Puertas de un solo sentido: formato de firma VeriFactu, estructura de respuestas de la API pública,
> elección de dominio._  
> _Puertas de doble sentido: interfaz de administración interna, dependencia en una librería OSS determinada,
> organización interna de módulos._  
> _Ante la duda: tratar como puerta de doble sentido y avanzar con rapidez._

---

## Propagación (recomendada)

Los proyectos que adoptan `NORTH.md` DEBERÍAN facilitar su descubrimiento:

1. **Referéncialo desde `CLAUDE.md` / `AGENTS.md` / `SOUL.md`:**

   > Consulta [NORTH.md](./NORTH.md) para conocer el propósito y la ambición del proyecto.

2. **Menciónalo en el README con un badge:**

   ```markdown
   [![NORTH.md](https://northfile.dev/badge.svg)](https://northfile.dev/es)
   ```

3. **Mantenlo conciso.** Un NORTH.md que ocupe más de dos pantallas ha perdido su foco.

---

## Versionado

Esta especificación sigue [Versionado Semántico](https://semver.org/lang/es/).

- **MAJOR** para cambios incompatibles en las secciones canónicas.
- **MINOR** para secciones aditivas o aclaraciones que puedan alterar el comportamiento de
  validadores.
- **PATCH** para correcciones de redacción o editoriales.

Un archivo `NORTH.md` PUEDE declarar la versión de la especificación a la que se adhiere mediante un comentario HTML
en la primera línea:

```markdown
<!-- NORTH.md spec: v0.1 -->
```

---

## Relación con otras convenciones

`NORTH.md` está diseñado para coexistir, no para reemplazar, a las convenciones adyacentes del stack de gobernanza de 5 capas:

| Capa | Archivo | Propósito | Custodio / Origen |
|---|---|---|---|
| **Capa 1** | `CONSTITUTION.md` | Límites de seguridad e invariantes negativas | Anthropic / Alineación |
| **Capa 2** | `AGENTS.md` / `CLAUDE.md` | Comandos de build, linters e instrucciones de ejecución | Linux Foundation |
| **Capa 3** | `design.md` | Tokens de interfaz, contratos de layout y diseño | Google Material |
| **Capa 4** | `SOUL.md` | Voz, tono e identidad hacia el usuario | Comunidad |
| **Capa 5** | `NORTH.md` | Propósito, listón de calidad y arbitraje de trade-offs | BRTHLS |

Un proyecto de ingeniería ambicioso puede componer las cinco capas modularmente junto a `llms.txt` para rastreo por IA.

---

## Implementación de referencia

La referencia canónica y plantilla se encuentra en
**[https://northfile.dev](https://northfile.dev)** (o en español en **[https://northfile.dev/es](https://northfile.dev/es)**).

La matriz comparativa del ecosistema se encuentra en
**[https://northfile.dev/compare](https://northfile.dev/compare)**.

Ejemplos en múltiples dominios se encuentran en
**[https://northfile.dev/examples](https://northfile.dev/examples)**.

---

## Registro de cambios (Changelog)

### v0.1 — 2026-09-24

- Lanzamiento canónico público de la especificación.
- Siete secciones canónicas formalizadas: North Star, The Bar, Apuestas Asimétricas, Anti-Objetivos, Trade-offs por Defecto, Disparadores de Ambición y Reversibilidad.
- Esquema de tabla estructurada de Trade-offs con condiciones explícitas de inversión (`Flip when`).
- Distinción entre Barreras Automatizadas Mecánicas y Aserciones de Verdad en The Bar.
- Formalización del stack de gobernanza de agentes en 5 capas (`CONSTITUTION.md`, `AGENTS.md`, `design.md`, `SOUL.md`, `NORTH.md`).
- Política de versionado semver adoptada.
