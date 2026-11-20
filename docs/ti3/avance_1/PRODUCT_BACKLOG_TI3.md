# SMARTAUDITORIA TI3 — PRODUCT BACKLOG PROPUESTO (V4.0)
**Maestría en Computación para el Desarrollo de Aplicaciones Inteligentes**  
**Universidad del Valle — Facultad de Ingeniería**  
**Autor:** Ing. Leonardo Javier Bastidas Moreno  
**Corte Académico:** 20 de noviembre de 2026 — Avance 1 (V4.0-TI3)  
**Entidad Beneficiaria:** Secretaría de Educación y Cultura — Gobernación del Cauca  

---

## 1. Principio de Gobernanza y Estado de Claves

> [!IMPORTANT]
> **Aviso de Conciliación de Identificadores:**  
> Las claves `SCRUM-49` a `SCRUM-61` **NO HAN SIDO CREADAS EN JIRA CLOUD**. Jira Cloud únicamente contiene de forma oficial los tickets `SCRUM-5` a `SCRUM-48`. Por tanto, en toda la documentación técnica de TI3 se denominan estrictamente como `[SCRUM-XX]` y las historias como `HU-031` a `HU-040`.

### Separación de Línea Base TI2 vs. Propuesta TI3
* **Línea Base Histórica TI2 (Cerrada):** 207 Story Points estimados, 189 SP en estado Done (136 SP aceptados formalmente + 53 SP con aceptación parcial documentada) y 18 SP en Backlog (`SCRUM-46`, `SCRUM-47`, `SCRUM-48`).
* **Alcance Propuesto TI3 (V4.0):**
  - **Must-Have (Demanda Operativa Gobernación del Cauca):** **59 Story Points** distribuidos en 10 Historias de Usuario (`HU-031` a `HU-040`). Estimación de alcance sujeta a capacidad demostrada.
  - **Should-Have (Deuda Técnica TI2 Condicionada):** **18 Story Points** correspondientes a las 3 tareas técnicas heredadas e independientes: `SCRUM-46` (5 SP: CI/CD), `SCRUM-47` (8 SP: RAG ChromaDB 93 controles) y `SCRUM-48` (5 SP: Validación E2E VPS). Este trabajo queda **condicionado a la capacidad remanente**, sin prometer que estará terminado al cierre del Sprint 11.
  - **Supresión de Historias Paraguas:** Se elimina cualquier concepto de historia envolvente artificial (`HU-041`) para evitar doble conteo. `SCRUM-46`, `SCRUM-47` y `SCRUM-48` permanecen con sus claves y criterios originales. Total planificado: $59\text{ SP (Must)} + 18\text{ SP (Should condicionado)} = 77\text{ SP totales sin duplicidad}$.

---

## 2. Épicas Candidatas Propuestas para Trabajo Integrador 3

| Código Épica | Clave Jira Candidata | Nombre Oficial de la Épica | Release | Alcance Estratégico y Técnico | Historias Vinculadas | Esfuerzo MoSCoW |
| :---: | :--- | :--- | :---: | :--- | :--- | :---: |
| **`EP-07` (Propuesta)** | `SCRUM-49` | Estabilización Operativa, Seguridad de Sesiones y Resiliencia | `V4.0-TI3` | Control y revocación de sesión JWT por inactividad en servidor (`T-01`), resiliencia y aislamiento de excepciones SPA (`EVA-01`, `PDF-02`, `PDF-07`), y carga desacoplada en paneles (`DAS-02`, `RIE-02`, `PDF-01`). | `HU-031` (5 SP)<br>`HU-033` (5 SP)<br>`HU-035` (5 SP) | **15 SP Must** |
| **`EP-08` (Propuesta)** | `SCRUM-50` | Homologación Institucional MIPG / DAFP V7 de Activos, Carga Masiva y Auditoría | `V4.0-TI3` | Parser multi-hoja `.xlsm` institucional (`ACT-03..05`, `PDF-08`), inventario maestro de activos con 28 columnas Cauca (`ACT-01..02`, `EVA-02`, `PDF-03`), gestión operativa de auditorías (`AUD-01`), y endurecimiento del Wizard de evaluación (`EVA-05..08`, `PDF-05`, `PDF-06`). | `HU-034` (8 SP)<br>`HU-037` (8 SP)<br>`HU-038` (5 SP)<br>`HU-039` (8 SP) | **29 SP Must** |
| **`EP-09` (Propuesta)** | `SCRUM-51` | Calidad Visual, Ergonomía y Consistencia de Reportes | `V4.0-TI3` | Erradicación total de mojibake UTF-8 y padding de modales (`T-02`, `PDF-04`), matriz de riesgos unificada y responsiva DAFP V7 (`DAS-01`, `EVA-03`, `RIE-01`), y paginación con filtros en reportes (`EVA-04`, `REP-01..02`). | `HU-032` (5 SP)<br>`HU-036` (5 SP)<br>`HU-040` (5 SP) | **15 SP Must** |

---

## 3. Matriz de las 10 Historias de Usuario Candidatas TI3 (59 SP Must-Have)

| ID Historia | Clave Candidata | Épica | Sprint Previsto | Prioridad | SP | Fuente y Hallazgos Resueltos | Criterios de Aceptación (DoD) | Estado Actual |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- | :--- | :---: |
| **`HU-031`** | `SCRUM-52` | `EP-07` | Sprint 8 | **Must** | **5** | Informe Pág. 3 (`T-01`), Matriz Obs. 1 | Inactividad a 15 min; modal a los 14 min (60s countdown); BroadcastChannel entre pestañas; `@require_auth` valida `SesionUsuario.activa` y expira token en BD (`401 Unauthorized`). | **Desarrollo Anticipado en Validación Local** *(Código y tests unitarios/integración implementados; pendiente validación VPS)* |
| **`HU-032`** | `SCRUM-53` | `EP-09` | Sprint 8 | **Must** | **5** *(calibrado)* | Informe Pág. 4 (`T-02`), Matriz Obs. 4 | 0 caracteres mojibake en 11 archivos de vistas/componentes; tildes normativas correctas; padding superior en modal de plan de contingencia (`EditableActionPlan.tsx`); test guardián automatizado. | **Desarrollo Anticipado en Validación Local** *(11 archivos saneados; test guardián pasando; pendiente validación visual VPS)* |
| **`HU-033`** | `SCRUM-54` | `EP-07` | Sprint 8 | **Must** | **5** | Informe Pág. 11 (`EVA-01`), Matriz Obs. 2, 7 | `RouteErrorBoundary` atrapa excepciones lazy en SPA sin pantalla blanca; `getEvaluacionEstado` funcional pura sin mutación en render; bloqueo de avance en Paso 0 sin activo seleccionado. | **Desarrollo Anticipado en Validación Local** *(ErrorBoundary y Wizard desacoplado; pendiente validación funcional VPS)* |
| **`HU-034`** | `SCRUM-55` | `EP-08` | Sprint 9 | **Must** | **8** | Informe Pág. 7–9 (`ACT-03..05`), Matriz Obs. 8 | Parser multi-hoja `.xlsm` detecta hoja `1. ACTIVOS DE INFORMACIÓN` y fila de cabecera; límite 50 MB con validación cliente; inserción transaccional por lotes con barra de progreso y log de errores por celda. | **Propuesta Planificada (Sprint 9)** |
| **`HU-035`** | `SCRUM-56` | `EP-07` | Sprint 9 | **Must** | **5** | Informe Pág. 5 (`DAS-02`), Pág. 10 (`RIE-02`), Matriz Obs. 1 | Carga independiente con `Promise.allSettled`; estados de reintento por tarjeta; gráfico `Activos por Categoría` muestra categorías institucionales completas; salud del sistema sin `null` ni loop infinito. | **Propuesta Planificada (Sprint 9)** |
| **`HU-036`** | `SCRUM-57` | `EP-09` | Sprint 10 | **Must** | **5** | Informe Pág. 5 (`DAS-01`), Pág. 9 (`RIE-01`), Pág. 12 (`EVA-03`) | Componente único responsivo de Matriz de Riesgos DAFP V7 5x5 sin scroll horizontal en Dashboard, Riesgos y Wizard; tarjetas de recomendaciones adaptadas a pantalla sin solapamiento. | **Propuesta Planificada (Sprint 10)** |
| **`HU-037`** | `SCRUM-58` | `EP-08` | Sprint 10 | **Must** | **8** | Informe Pág. 6–7 (`ACT-01..02`), Pág. 11 (`EVA-02`), Matriz Obs. 3 | Modelo de base de datos con las 28 columnas Cauca (Secretaría, Grupo Interno, Marca, Modelo, escala CIA 1–5); `<Autocomplete>` de responsables; modal de detalle por pestañas con botón `"Evaluar Activo"`. | **Propuesta Planificada (Sprint 10)** |
| **`HU-040`** | `SCRUM-61` | `EP-09` | Sprint 10 | **Must** | **5** | Informe Pág. 12 (`EVA-04`), Pág. 17 (`REP-01..02`) | Buscador en Paso 1 del Wizard filtra grid paginada sin saltar de paso; paginación y chips de filtros en informes; leyendas y tooltips de Recharts con nombre, cantidad y porcentaje. | **Propuesta Planificada (Sprint 10)** |
| **`HU-038`** | `SCRUM-59` | `EP-08` | Sprint 11 | **Must** | **5** | Informe Pág. 16 (`AUD-01`), Matriz Obs. 7 | Endpoints `GET /api/auditorias/<id>` y `PUT /api/auditorias/<id>` funcionales; modales `Ver Detalle` y `Editar` con RBAC; tabla con paginación y filtros por estado y texto. | **Propuesta Planificada (Sprint 11)** |
| **`HU-039`** | `SCRUM-60` | `EP-08` | Sprint 11 | **Must** | **8** | Informe Pág. 13–15 (`EVA-05..08`), Matriz Obs. 5, 6 | Bloqueo estricto de pasos si faltan obligatorios; buscador de riesgos por campo `Nombre`; debounce y supresión de auto-scroll en inputs; campos de fases DAFP y guardado consolidado en backend. | **Propuesta Planificada (Sprint 11)** |

---

## 4. Matriz de Tareas Técnicas Heredadas TI2 (18 SP Should-Have Condicionado)

| Clave Jira Oficial | Tarea Técnica Heredada | Épica | Sprint Asignado | Prioridad | SP | Criterio de Aceptación Original (DoD) | Estado y Condición |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- | :--- |
| **[SCRUM-46](https://smartauditoria.atlassian.net/browse/SCRUM-46)** | Estabilización Pipelines CI/CD GitHub Actions | `EP-03` | Sprint 9 | **Should** | **5** | Workflows `ci.yml` ejecutando en verde en repositorios de backend y engine. | 📋 **Trabajo Condicionado (Sprint 9)** — Sujeto a capacidad remanente sin comprometer entregables de la Gobernación del Cauca. |
| **[SCRUM-47](https://smartauditoria.atlassian.net/browse/SCRUM-47)** | Re-indexación Catálogo 93 Controles ISO 27002 en ChromaDB | `EP-03` | Sprint 10 | **Should** | **8** | 100% controles ISO indexados con metadatos completos y script de benchmarking RAG con Precision@3 $\ge 0.70$. | 📋 **Trabajo Condicionado (Sprint 10)** — Sujeto a capacidad remanente sin comprometer entregables de la Gobernación del Cauca. |
| **[SCRUM-48](https://smartauditoria.atlassian.net/browse/SCRUM-48)** | Validación Integral E2E en VPS de Producción | `EP-05` | Sprint 11 | **Should** | **5** | Script `e2e_vps_validation.py` pasando al 100% contra endpoints HTTPS y base de datos de producción. | 📋 **Trabajo Condicionado (Sprint 11)** — Sujeto a capacidad remanente sin comprometer entregables de la Gobernación del Cauca. |

---

## 5. Resumen de Capacidad del Release V4.0-TI3

$$\text{Esfuerzo Comprometido (Must-Have)} = 59\text{ SP (10 Historias de Usuario)}$$
$$\text{Deuda Técnica Heredada (Should-Have Condicionado)} = 18\text{ SP (3 Tareas Técnicas Independientes)}$$
$$\text{Total Backlog Planificado} = 77\text{ SP}$$

* **Carga Balanceada por Sprint:**
  - **Sprint 8:** 15 SP Must-Have (0 Should) $\rightarrow$ 15 SP.
  - **Sprint 9:** 13 SP Must-Have (+ 5 SP Should condicionado `SCRUM-46`) $\rightarrow$ 13 a 18 SP.
  - **Sprint 10:** 18 SP Must-Have (+ 8 SP Should condicionado `SCRUM-47`) $\rightarrow$ 18 a 26 SP.
  - **Sprint 11:** 13 SP Must-Have (+ 5 SP Should condicionado `SCRUM-48`) $\rightarrow$ 13 a 18 SP.
* **Política de Cierre:** Los 59 SP Must-Have garantizan la resolución de las observaciones institucionales. La deuda técnica de 18 SP se abordará únicamente si la capacidad y estabilidad del sistema lo permiten, sin comprometer la entrega final del 20 de diciembre de 2026.
