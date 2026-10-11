# Especificación NORTH.md

**Versión:** 0.1  
**Estado:** Activo (primera versión pública)  
**Autor:** [Viktor Berthelius](https://brthls.com) (BRTHLS)  
**Licencia:** MIT  
**Fecha:** 2026-09-24  

---

## Resumen

`NORTH.md` es un único archivo markdown situado en la raíz de un proyecto de software
que declara el **propósito, la ambición y los trade-offs precalculados** del proyecto en un
formato legible tanto por personas como por agentes de código con IA.

Está pensado para convivir con los demás archivos de contexto que los agentes ya leen.
Proponemos verlos como un **stack de cinco capas**: un modelo, no un estándar
establecido.

- `CONSTITUTION.md` — **límites** (principios innegociables y fronteras).
- `AGENTS.md` / `CLAUDE.md` — **cómo** trabajan los agentes (build, test, entorno).
- `DESIGN.md` — **aspecto** (tokens de diseño y la razón de cada uno).
- `SOUL.md` — **quién** es el agente (persona, valores, tono).
- `NORTH.md` — **por qué** y **hasta dónde** (propósito, ambición, trade-offs por defecto, reversibilidad).

---

## Motivación

Los agentes de programación tienden por defecto a una **producción segura e incremental**. Optimizan para
"no romper lo que funciona" antes que para "subir de nivel". Ante una tarea ambigua,
eligen la interpretación más pequeña. Al proponer soluciones, sugieren
parches en lugar de reescrituras. Cuando dudan, añaden manejo de errores en lugar de
eliminar el modo de fallo en su origen.

Los archivos de reglas a nivel de repositorio (`CLAUDE.md`, `AGENTS.md`) cubren aspectos *operativos*:
qué comandos ejecutar, qué controles (gates) respetar, qué convenciones seguir.
Los archivos de identidad (`SOUL.md`) cubren el *carácter*: la voz, el tono y los valores
del agente.

Ninguna de estas capas responde a la pregunta que decide si un agente entrega un
**parche competente** o un **salto ambicioso**:

> _¿Hacia dónde va este proyecto y hasta dónde estamos dispuestos a empujar para llegar allí?_

`NORTH.md` responde a esa pregunta, en siete secciones, en un solo archivo.

---

## Ubicación del archivo

`NORTH.md` DEBE ubicarse en la raíz del repositorio.

Si un monorepo contiene varios productos diferenciados, cada producto PUEDE tener su propio
`NORTH.md` en la raíz de su paquete. El `NORTH.md` de la raíz describe entonces la
ambición común.

---

## Formato del archivo

`NORTH.md` es un archivo markdown CommonMark. DEBERÍA contener las siete
secciones canónicas definidas a continuación, en orden, cada una como un encabezado H2.

Las secciones PUEDEN omitirse si no aplican, pero el encabezado DEBERÍA conservarse
con una breve nota que explique la omisión.

Se PUEDEN añadir secciones adicionales después de las siete canónicas.

---

## Las siete secciones

### 1. North Star (Estrella Polar)

Una sola frase que declara el destino. No el roadmap. No el próximo
trimestre. El destino.

Una North Star bien planteada es:

- **Lo bastante específica para descartar alternativas.** "Ser el mejor ERP" no es una
  North Star. "Sustituir la contabilidad en hojas de cálculo de los autónomos europeos para 2030" sí lo es.
- **Lo bastante ambiciosa para incomodar.** Si la North Star parece segura,
  no es una North Star.
- **Alcanzable en principio.** Una North Star no es una fantasía. Es un destino
  que justifica decisiones difíciles.

> **Ejemplo.** _Arkwell hace que cerrar el mes en un día sea lo normal para los pequeños
> fabricantes europeos en 2030._

### 2. The Bar (El Listón)

El umbral de calidad que distingue lo "entregado" de lo "empezado". Define qué
trabajo es aceptable dar por terminado.

Un Listón bien planteado es:

- **Medible u observable.** "Alta calidad" no es un Listón. "Latencia p95 por debajo de
  200 ms, cero errores de tipos en CI, accesibilidad AA en cada página" sí lo es.
- **Más alto que el estándar del sector.** Un listón en la media del sector no es ningún listón.
- **Defendido por controles.** Los elementos del Listón DEBERÍAN asignarse a mecanismos de control: comprobaciones de CI,
  linters, reglas de revisión, runbooks.

> **Ejemplo.** _Cada funcionalidad entregada pasa: comprobación de tipos, linter, suite completa de pruebas,
> Lighthouse ≥95 en todas las métricas, WCAG AA mediante axe y paridad i18n en todos los
> idiomas soportados. Sin excepciones, sin "TODO: pruebas luego"._

### 3. Asymmetric Bets (Apuestas Asimétricas)

Los frentes donde invertimos deliberadamente un esfuerzo 10x, y los frentes donde 1.1x es
lo correcto.

Una sección de Apuestas Asimétricas bien planteada nombra ambos lados:

- **Dónde vamos a lo grande.** Lo que merece una inversión desproporcionada por ser
  estructural o estratégicamente decisivo.
- **Dónde entregamos deliberadamente a medio gas.** Lo que está bien al 80 % para poder dedicar la
  capacidad restante a las apuestas.

Esta sección previene dos modos de fallo: sobreinvertir en trabajo de commodity e
infrainvertir en el trabajo que se acumula.

> **Ejemplo.**  
> _Apostar 10x en: conciliación entre inventario y contabilidad, corrección de la facturación electrónica,
> migración desde el sistema anterior._  
> _Aceptar 1.1x en: interfaz de ajustes de administración, pulido de paneles, informes internos._

### 4. Anti-Goals (Anti-Objetivos)

Aquello que nos negamos explícitamente a hacer, incluso cuando sería fácil o
rentable a corto plazo. Los Anti-Objetivos son la forma de decir que no sin volver a decidirlo
cada semana.

Un Anti-Objetivo bien planteado es:

- **Tentador.** Si nadie lo pediría nunca, no es un Anti-Objetivo.
- **Justificado.** Una razón de una línea que resiste la presión.
- **Específico.** No "no hacemos chapuzas", sino "no entregamos funcionalidades que requieran
  la revisión de un contable externo antes de usarse".

> **Ejemplo.**  
> _No construimos un módulo de CRM. (Ya existen CRM maduros; nos integramos, no
> reconstruimos)._  
> _No soportamos despliegues on-premise. (Distraen de la velocidad de un producto
> cloud-first)._  
> _No aceptamos peticiones de funcionalidades sin un problema de usuario documentado. (El roadmap
> se basa en la demanda, no en la oferta)._

### 5. Trade-off Defaults (Trade-offs por Defecto)

Decisiones ya tomadas sobre trade-offs habituales, escritas una sola vez
para no volver a debatirlas en cada sprint.

Cubre los trade-offs que surgen una y otra vez en tu dominio. Pares habituales:

- Velocidad vs. seguridad
- Amplitud vs. profundidad
- Construir vs. comprar
- Generalidad vs. ajuste
- Compatibilidad hacia atrás vs. diseño limpio
- Inquilino único vs. multiinquilino

Para cada uno: nombra la opción por defecto y las condiciones bajo las que esa opción
se invierte.

> **Ejemplo.**  
> _Por defecto: velocidad sobre seguridad en herramientas internas; seguridad sobre velocidad en
> código fiscal. Se invierte: cualquier código que toque la facturación electrónica o las nóminas debe cumplir el
> criterio de seguridad, sea interno o externo._

### 6. Ambition Triggers (Disparadores de Ambición)

Frases — usadas por personas y citadas en los prompts de los agentes de IA — que amplían el
alcance cuando el equipo está pensando en pequeño.

Un Disparador de Ambición bien planteado:

- **Es lo bastante corto para recordarse.**
- **Fuerza un cambio de marco concreto.** No "sé ambicioso", sino "¿cómo sería
  la versión 10x?".
- **Admite como respuesta 'esta ya es la versión 10x'.**

> **Ejemplos.**  
> _"¿Existe una versión 10x de esto?"_  
> _"¿Qué entregaría aquí [equipo de referencia]?"_  
> _"Si tuviéramos tres semanas en lugar de tres días, ¿qué cambiaría?"_  
> _"¿Cuál es la versión de esto que acabaría en la demo de una keynote?"_

### 7. Reversibility (Reversibilidad)

Un mapa de qué decisiones son puertas de un solo sentido (costosas de revertir) y cuáles son
puertas de doble sentido (baratas de revertir). Las puertas de un solo sentido merecen deliberación. Las de
doble sentido merecen velocidad.

Una sección de Reversibilidad bien planteada lista:

- **Puertas de un solo sentido en este proyecto.** Cambios de esquema de base de datos en producción,
  contratos de API pública, identidad de marca, lógica de cálculo fiscal, fronteras de seguridad.
- **Puertas de doble sentido en este proyecto.** Textos de la interfaz, disposición de herramientas internas, estructura
  del código, dependencias de herramientas internas.
- **La disposición por defecto.** Ante la duda, cómo tratarla.

> **Ejemplo.**  
> _Puertas de un solo sentido: formato de firma de la factura electrónica, forma de las respuestas de la API pública,
> elección de dominio._  
> _Puertas de doble sentido: interfaz de administración interna, dependencia de una librería OSS concreta,
> organización del código no público._  
> _Ante la duda: tratar como puerta de doble sentido y avanzar._

---

## Propagación (recomendada)

Los proyectos que adoptan `NORTH.md` DEBERÍAN facilitar su descubrimiento:

1. **Referéncialo desde `CLAUDE.md` / `AGENTS.md` / `SOUL.md`:**

   > Consulta [NORTH.md](./NORTH.md) para conocer el propósito y la ambición del proyecto.

2. **Menciónalo en el README con un badge:**

   ```markdown
   [![NORTH.md](https://northfile.dev/badge.svg)](https://northfile.dev/es)
   ```

3. **Mantenlo breve.** Un NORTH.md de más de dos pantallas ha perdido el foco.

---

## Versionado

Esta especificación sigue [Versionado Semántico](https://semver.org/lang/es/).

- **MAJOR** para cambios incompatibles en las secciones.
- **MINOR** para secciones añadidas o aclaraciones que puedan cambiar el comportamiento de
  los validadores.
- **PATCH** para cambios editoriales.

Un archivo `NORTH.md` PUEDE declarar la versión de la especificación a la que se adhiere mediante un comentario HTML
en la primera línea:

```markdown
<!-- NORTH.md spec: v0.1 -->
```

---

## Relación con otras convenciones

`NORTH.md` está diseñado para coexistir con las convenciones vecinas, no para reemplazarlas:

| Archivo | Propósito | Origen |
|---|---|---|
| `README.md` | Presentación pública e incorporación de personas | Convención de largo recorrido |
| `AGENTS.md` | Instrucciones operativas para agentes de código: build, test, convenciones | [agents.md](https://agents.md), bajo la Agentic AI Foundation (Linux Foundation) |
| `CLAUDE.md` | Instrucciones de proyecto que carga Claude Code | [Anthropic](https://code.claude.com/docs/en/memory) |
| `CONSTITUTION.md` | Principios innegociables y fronteras | Convenciones de la comunidad, p. ej. [agentconstitution.dev](https://agentconstitution.dev); GitHub Spec Kit mantiene una constitución de proyecto |
| `DESIGN.md` | Tokens de diseño y la razón de cada uno | [Google Labs](https://github.com/google-labs-code/design.md) |
| `SOUL.md` | La persona, los valores y el tono del agente | [soul.md](https://soul.md) |
| `VISION.md` | Dirección a largo plazo | Sin convención formal |
| `NORTH.md` | Propósito, ambición y trade-offs precalculados | Esta especificación |
| `llms.txt` | Índice de un sitio web que ayuda a LLM y agentes a usarlo | [llmstxt.org](https://llmstxt.org), propuesto por Jeremy Howard (2024) |

Usa la combinación que encaje con tu proyecto. El modelo de cinco capas del Resumen es una
propuesta sobre cómo se reparten el trabajo estos archivos, no un estándar del sector.

---

## Implementación de referencia

El sitio de la especificación y la plantilla están en
**[https://northfile.dev](https://northfile.dev)** (en español en **[https://northfile.dev/es](https://northfile.dev/es)**).

La comparación con convenciones vecinas está en
**[https://northfile.dev/es/compare](https://northfile.dev/es/compare)**.

Los ejemplos — uno real y cinco ilustrativos — están en
**[https://northfile.dev/examples](https://northfile.dev/examples)**.

---

## Registro de cambios

### v0.1 — 2026-09-24

- Primera versión pública.
- Siete secciones definidas: North Star, The Bar, Asymmetric Bets, Anti-Goals, Trade-off Defaults, Ambition Triggers y Reversibility.
- Los Trade-offs por Defecto nombran cada opción por defecto y la condición bajo la que se invierte.
- Propuesta de un modelo de cinco capas para los archivos de contexto de agentes (`CONSTITUTION.md`, `AGENTS.md`, `DESIGN.md`, `SOUL.md`, `NORTH.md`).
- Guía de propagación y marcador opcional de versión de la especificación.
- Política de versionado semver adoptada.
