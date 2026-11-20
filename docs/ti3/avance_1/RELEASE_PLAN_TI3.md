# SMARTAUDITORIA TI3 — RELEASE PLAN DE CUATRO SPRINTS (V4.0)
**Maestría en Computación para el Desarrollo de Aplicaciones Inteligentes**  
**Universidad del Valle — Facultad de Ingeniería**  
**Autor:** Ing. Leonardo Javier Bastidas Moreno  
**Corte Académico:** 20 de noviembre de 2026 — Avance 1 (V4.0-TI3)  
**Plazo de Entrega Final:** 20 de diciembre de 2026  

---

## 1. Alcance General, Capacidad y Festivos

* **Versión Objetivo:** `Release V4.0-TI3` — Homologación Institucional Gobernación del Cauca, Consolidación Operativa y Cierre de Tesis.
* **ID Jira:** `V4.0-TI3` (`id: 10037`) | **Estado en Jira:** `Unreleased` (Fecha objetivo: `2026-12-20`).
* **Compromiso de Alcance Funcional Garantizado (Must-Have):** **59 Story Points** (10 Historias de Usuario `HU-031` a `HU-040`), estimación sujeta a la capacidad neta de desarrollo.
* **Trabajo Condicionado Heredado (Should-Have):** **18 Story Points** (3 tareas técnicas independientes `SCRUM-46` [5 SP], `SCRUM-47` [8 SP], `SCRUM-48` [5 SP]). Se abordará como stretch goals condicionados a disponibilidad remanente. **No forman parte del compromiso garantizado.**
* **Capacidad Neta de Ingeniería:**
  - 1 Desarrollador Fullstack / Arquitecto con dedicación intensiva (~13 a 16 SP semanales netos).
  - Semana de 40h brutas: 15% ceremonias (6h), 22.5% calidad SDD/TDD/CI (9h), 12.5% validación operadores (5h), 50% codificación (20h).
* **Impacto del Calendario Colombiano:**
  - El **martes 08 de diciembre (Día de la Inmaculada Concepción)** es festivo nacional en Colombia. El Sprint 10 cuenta con **4 días hábiles**, por lo que su carga comprometida se calibró estrictamente a **13 SP Must-Have**.
* **Ventana de Validación con Operadores:**
  - Las pruebas y validación final de aceptación en el VPS (`riesgosti.tics.sedcauca.gov.co`) se programan para los días **jueves 17 y viernes 18 de diciembre de 2026**, sujeto a la disponibilidad de los operadores Stiven Fernández y Kevin Coca.
  - El **sábado 19 y domingo 20 de diciembre de 2026** se reservan como ventana de contingencia y congelación de release `v4.0.0`.

---

## 2. Cronograma Calibrado de Sprints

```mermaid
gantt
    title Cronograma Oficial V4.0-TI3 (Jira Cloud IDs 145..148 | 23 Nov – 20 Dic 2026)
    dateFormat  YYYY-MM-DD
    section Sprints Oficiales Jira Cloud
    Sprint 8 (ID 145) : Core, Sesión & Resiliencia (15 SP Must)       :s8, 2026-11-23, 2026-11-29
    Sprint 9 (ID 146) : Carga Masiva & Dashboard (13 SP Must + 5 Cond):s9, 2026-11-30, 2026-12-06
    Sprint 10 (ID 147): Activos 28 Col, Matriz & Gráficas (18 SP Must):s10, 2026-12-07, 2026-12-13
    Sprint 11 (ID 148): Auditorías REST & Wizard DAFP (13 SP Must)    :s11, 2026-12-14, 2026-12-20
    section Hitos de Cierre
    Validación en Vivo Operadores SEC Cauca (17-18 Dic)               :val, 2026-12-17, 2026-12-18
    Contingencia y Congelación Release v4.0.0 (19-20 Dic)             :cont, 2026-12-19, 2026-12-20
```

---

### Sprint 8: Estabilidad Core, Seguridad de Sesiones y Resiliencia UI
* **ID Jira:** `Sprint 8` (`id: 145`)
* **Fechas Oficiales en Jira:** 23 de noviembre al 29 de noviembre de 2026.
* **Historias Comprometidas (15 SP Must-Have):**
  - **`SCRUM-52` / `HU-031` (5 SP | Must):** Expiración por inactividad a 15 min, modal a 60s, sincronización `BroadcastChannel` y validación de revocación en base de datos (`SesionUsuario.activa`) en `@require_auth`.
  - **`SCRUM-53` / `HU-032` (5 SP | Must):** Erradicación total de mojibake en 11 archivos de frontend, padding superior en `EditableActionPlan.tsx` y test automatizado guardián `utf8_orthography.test.ts`.
  - **`SCRUM-54` / `HU-033` (5 SP | Must):** `RouteErrorBoundary` para contención de excepciones en lazy routes, refactorización pura de `getEvaluacionEstado` en el Wizard y bloqueo de avance en Paso 0 sin activo.
* **Carga Comprometida:** **15 SP Must-Have** (0 Should).

---

### Sprint 9: Carga Masiva Transaccional y Paneles de Dashboard/Riesgos
* **ID Jira:** `Sprint 9` (`id: 146`)
* **Fechas Oficiales en Jira:** 30 de noviembre al 06 de diciembre de 2026.
* **Historias Comprometidas (13 SP Must-Have):**
  - **`SCRUM-55` / `HU-034` (8 SP | Must):** Parser inteligente multi-hoja `.xlsm` que detecta `1. ACTIVOS DE INFORMACIÓN`, valida límite de 50MB en cliente y procesa inserciones transaccionales por lotes con barra de progreso y log de errores por celda.
  - **`SCRUM-56` / `HU-035` (5 SP | Must):** Carga desacoplada con `Promise.allSettled` y estados de reintento por tarjeta; inclusión de todas las categorías institucionales en gráficos; salud del sistema sin bucles ni `null`.
* **Trabajo Condicionado (No Garantizado):**
  - **`SCRUM-46` (5 SP | Should):** Estabilización de pipelines `ci.yml` en GitHub Actions en verde (backend y engine).
* **Carga Comprometida:** **13 SP Must-Have** (+ 5 SP Should condicionado).

---

### Sprint 10: Homologación de Activos (28 Columnas Cauca), Matriz DAFP y Gráficas
* **ID Jira:** `Sprint 10` (`id: 147`)
* **Fechas Oficiales en Jira:** 07 de diciembre al 13 de diciembre de 2026 (Semana continua que incluye festivo y fin de semana como ventana académica de ejecución).
* **Historias Oficiales (18 SP Must-Have):**
  - **`SCRUM-57` / `HU-036` (5 SP | Must):** Componente único responsivo de Matriz de Riesgos DAFP V7 5x5 sin scroll horizontal en Dashboard, Riesgos y Wizard; tarjetas de recomendaciones adaptables sin cortes.
  - **`SCRUM-58` / `HU-037` (8 SP | Must):** Modelo de base de datos con las 28 columnas Cauca (Secretaría, Grupo Interno, Marca, Modelo, escala CIA 1–5 con cálculo automático); selector predictivo de responsables; modal de detalle por pestañas con botón `"Evaluar Activo"`.
  - **`SCRUM-61` / `HU-040` (5 SP | Must):** Paginación en grilla de activos del Paso 1 sin saltar de paso; chips de filtros y paginación en Informe de Riesgos y Tendencias; tooltips y leyendas de Recharts con porcentaje y recuento.
* **Trabajo Condicionado (No Garantizado):**
  - **`SCRUM-47` (8 SP | Should):** Re-indexación de 93 controles ISO 27002 en ChromaDB y benchmarking RAG.
* **Carga Oficial Comprometida:** **18 SP Must-Have** (+ 8 SP Should condicionado).

---

### Sprint 11: Gestión de Auditorías REST y Wizard Integral DAFP
* **ID Jira:** `Sprint 11` (`id: 148`)
* **Fechas Oficiales en Jira:** 14 de diciembre al 20 de diciembre de 2026.
* **Historias Oficiales (13 SP Must-Have):**
  - **`SCRUM-59` / `HU-038` (5 SP | Must):** Endpoints REST `GET /api/auditorias/<id>` y `PUT /api/auditorias/<id>`; modales funcionales de consulta y edición de hallazgos con RBAC; tabla con filtros y paginación.
  - **`SCRUM-60` / `HU-039` (8 SP | Must):** Bloqueo estricto de pasos 1 a 6 si faltan obligatorios; buscador de riesgos por campo `Nombre`; debounce y supresión de auto-scroll; campos de fases DAFP y guardado atómico consolidado con vínculo a controles ISO 27002.
* **Trabajo Condicionado (No Garantizado):**
  - **`SCRUM-48` (5 SP | Should):** Validación integral E2E en VPS de producción.
* **Carga Oficial Comprometida:** **13 SP Must-Have** (+ 5 SP Should condicionado).

---

### Validación Operativa Final con Operadores (17–18 Dic 2026)
* **Fechas:** Jueves 17 y Viernes 18 de diciembre de 2026 (sujeto a disponibilidad institucional).
* **Objetivo:** Sesión formal de validación en el VPS de producción (`riesgosti.tics.sedcauca.gov.co`) con los operadores Stiven Fernández y Kevin Coca.
* **Actividades:**
  1. Comprobación punto a punto de las 22 observaciones del `.docx` y 8 del `.pdf`.
  2. Firma del Acta de Validación Funcional y Aceptación Operativa.

### Ventana de Contingencia y Cierre (19–20 Dic 2026)
* **Fechas:** Sábado 19 y Domingo 20 de diciembre de 2026.
* **Objetivo:** Ajustes menores de contingencia, congelación formal de versión `v4.0.0` y cierre de repositorio para sustentación académica.
