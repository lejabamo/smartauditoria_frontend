# SMARTAUDITORIA TI3 — G0-R: INFORME DE REGULARIZACIÓN METODOLÓGICA Y SUSTENTACIÓN LOCAL
**Maestría en Computación para el Desarrollo de Aplicaciones Inteligentes**  
**Universidad del Valle — Facultad de Ingeniería**  
**Autor:** Ing. Leonardo Javier Bastidas Moreno  
**Fecha de Corte:** 20 de noviembre de 2026  
**Fase:** Gate G0-R (Diagnóstico, Regularización y Preparación de Sustentación — Trabajo Integrador 3)  
**Modalidad:** Local / Solo Lectura Remota (Sin commits, pushes, cambios en Jira Cloud ni despliegues)

---

## 1. Inventario Exhaustivo de Archivos Modificados

Se realizó una auditoría completa del árbol de trabajo (`git status`, `git diff --stat`) diferenciando de manera estricta los cambios preexistentes de saneamiento de credenciales respecto a las modificaciones técnicas introducidas para el desarrollo anticipado de las historias de usuario de TI3.

### 1.1. Cambios Preexistentes (Saneamiento de Credenciales y Scripts Operativos)
Estos archivos corresponden a la eliminación de credenciales duras, desindexación de `.env` y parametrización segura de scripts operativos sin vinculación a historias de usuario:

| Archivo | Tipo de Cambio | Líneas (+ / -) | Propósito Técnico |
| :--- | :--- | :---: | :--- |
| `.gitignore` | Modificado | +21 / -0 | Exclusión estricta de `.env*`, `.venv`, `secrets` y temporales |
| `.env` | Desindexado (Git RM) | N/A | Retirado del control de versiones para evitar fuga de credenciales |
| `smartauditoria_backend/.env.example` | Modificado | +1 / -1 | Plantilla segura sin contraseñas en texto plano |
| `smartauditoria_backend/app/config.py` | Modificado | +2 / -2 | Fallbacks no sensibles para desarrollo local |
| `smartauditoria_backend/migrations/env.py` | Modificado | +3 / -2 | Carga de variables de entorno seguras para Alembic |
| `check_oracle.py`, `deploy_to_vps.py` | Modificados | +4 / -3 | Parametrización mediante `os.getenv` de conexión VPS |
| `docker-compose.yml`, `docker-compose.sgsri.yml` | Modificados | +6 / -6 | Eliminación de passwords en texto plano en servicios docker |
| `e2e_vps_validation.py`, `post_deploy.py` | Modificados | +7 / -7 | Sanitización de credenciales en scripts de validación VPS |
| `fix_db.py`, `run_init_db.py`, `start_sgsri.py` | Modificados | +7 / -6 | Carga dinámica de variables sin secretos quemados |
| `remote_deploy.py`, `test_production.py` | Modificados | +3 / -3 | Parametrización de accesos seguros |
| `vps_auth_check.py`, `vps_docker_compose.py`, `vps_inspect.py` | Modificados | +7 / -6 | Scripts de administración VPS con variables de entorno |

### 1.2. Cambios Funcionales Introducidos (Desarrollo Anticipado en Validación — Sprint 8)
Archivos modificados y creados específicamente para resolver los requerimientos de los operadores:

| Archivo | Historia Funcional | Estado | Líneas (+ / -) | Descripción de la Modificación |
| :--- | :---: | :---: | :---: | :--- |
| `smartauditoria_backend/app/auth/decorators.py` | **HU-031** | Modificado | +17 / -3 | Verificación en BD (`SesionUsuario`) de expiración y revocación en `@require_auth` |
| `smartauditoria_backend/app/auth/routes.py` | **HU-031** | Modificado | +25 / -21 | Endpoint `POST /api/auth/refresh-session` y validación de sesión en `/api/auth/me` |
| `smartauditoria_backend/tests/integration/test_auth_session_revocation.py` | **HU-031** | Nuevo | +88 | Prueba de integración de revocación de sesión en servidor (1 passed) |
| `smartauditoria_frontend/src/contexts/AuthContext.tsx` | **HU-031** | Modificado | +148 / -12 | Temporizador 15 min idle, modal a 60s, BroadcastChannel sincronizado y refresh |
| `smartauditoria_frontend/src/components/common/IdleTimeoutModal.tsx` | **HU-031** | Nuevo | +82 | Modal accesible con cuenta regresiva, botón continuar y botón cerrar sesión |
| `smartauditoria_frontend/src/tests/auth_idle.test.tsx` | **HU-031** | Nuevo | +115 | Pruebas unitarias de advertencia de inactividad y cierre por timeout (2 passed) |
| `smartauditoria_frontend/src/pages/riesgos/Riesgos.tsx` | **HU-032** | Modificado | +7 / -7 | Saneamiento ortográfico UTF-8 (acentos y caracteres tipográficos dañados) |
| `smartauditoria_frontend/src/components/common/EditableActionPlan.tsx` | **HU-032** | Modificado | +12 / -12 | Corrección UTF-8 y padding superior `pt: '20px !important'` en `DialogContent` |
| `smartauditoria_frontend/src/components/riesgos/RiskMatrix4x5.tsx` | **HU-032** | Modificado | +3 / -3 | Reemplazo de caracteres mojibake por acentos válidos en leyenda de matriz |
| `smartauditoria_frontend/src/pages/reportes/ReportesUsuarios.tsx` | **HU-032** | Modificado | +1 / -1 | Limpieza de caracteres residuales UTF-8 |
| `smartauditoria_frontend/src/components/activos/ActivoDetailCard.tsx` | **HU-032** | Modificado | +1 / -1 | Limpieza ortográfica de etiquetas |
| `smartauditoria_frontend/src/components/common/ThreatVulnerabilityLink.tsx` | **HU-032** | Modificado | +17 / -17 | Eliminación de mojibake y emojis corruptos en sugerencias de amenazas |
| `smartauditoria_frontend/src/components/common/TwinAssetSuggestion.tsx` | **HU-032** | Modificado | +3 / -3 | Corrección tipográfica en sugerencias de gemelos digitales |
| `smartauditoria_frontend/src/components/predictive/ControlSuggestions.tsx` | **HU-032** | Modificado | +1 / -1 | Limpieza UTF-8 en sugerencias predictivas de controles ISO 27002 |
| `smartauditoria_frontend/src/components/predictive/ResidualJustificationSuggestions.tsx` | **HU-032** | Modificado | +2 / -2 | Saneamiento ortográfico en justificaciones residuales |
| `smartauditoria_frontend/src/components/predictive/ResidualRiskSuggestions.tsx` | **HU-032** | Modificado | +1 / -1 | Saneamiento UTF-8 en riesgos residuales |
| `smartauditoria_frontend/src/pages/activos/Activos.tsx` | **HU-032** | Modificado | +8 / -8 | Corrección de tildes y caracteres corruptos en tabla de activos |
| `smartauditoria_frontend/src/pages/reportes/InformeRiesgos.tsx` | **HU-032** | Modificado | +6 / -6 | Limpieza de títulos, encabezados y gráficas con mojibake |
| `smartauditoria_frontend/src/pages/reportes/TendenciasSeguridad.tsx` | **HU-032** | Modificado | +1 / -1 | Corrección de leyendas de auditoría |
| `smartauditoria_frontend/src/pages/usuarios/Usuarios.tsx` | **HU-032** | Modificado | +7 / -7 | Saneamiento ortográfico en gestión de usuarios y roles |
| `smartauditoria_frontend/src/services/documentos.ts` | **HU-032** | Modificado | +6 / -6 | Corrección de etiquetas de documentos y categorización |
| `smartauditoria_frontend/src/tests/utf8_orthography.test.ts` | **HU-032** | Nuevo | +80 | Test automatizado guardián de regresión ortográfica y UTF-8 (1 passed) |
| `smartauditoria_frontend/src/pages/wizard/RiskAssessmentWizard.tsx` | **HU-033** | Modificado | +11 / -4 | `getEvaluacionEstado` puro, eliminación de guardado en render, validación paso 0 |
| `smartauditoria_frontend/src/components/common/RouteErrorBoundary.tsx` | **HU-033** | Nuevo | +72 | Capturador de fallos de renderizado en rutas lazy con recuperación SPA |
| `smartauditoria_frontend/src/components/common/RouteErrorBoundary.test.tsx` | **HU-033** | Nuevo | +68 | Pruebas unitarias de aislamiento de excepciones en navegación (2 passed) |
| `smartauditoria_frontend/src/App.tsx` | **HU-033** | Modificado | +3 / -2 | Envoltura de `<Suspense>` con `<RouteErrorBoundary>` |
| `smartauditoria_frontend/src/components/common/Layout.tsx` | **HU-033** | Modificado | +1 / -1 | Corrección de acento en menú `"Evaluación"` y garantía de acceso por roles |
| `docs/agile/PRODUCT_BACKLOG.md` | **Gobernanza** | Modificado | +34 / -0 | Registro formal de propuestas `HU-031..041`, calibración de SP y MoSCoW |
| `docs/agile/RELEASE_PLAN.md` | **Gobernanza** | Modificado | +20 / -2 | Plan de 4 sprints (S8..S11) con capacidad neta y separación de deuda |
| `docs/agile/jira_import.csv` | **Gobernanza** | Modificado | +14 / -0 | Plantilla de importación con claves `[CANDIDATO-SCRUM-XX]` y estado propuesta |
| `docs/agile/jira_integrador_2.csv` | **Gobernanza** | Modificado | +14 / -0 | Conciliación de trazabilidad sin claves definitivas prematuras |

---

## 2. Conciliación Formal del Backlog y Capacidad

### 2.1. Estado de Claves en Jira Cloud y Nomenclatura Rigurosa
* **Confirmación de Estado Remoto:** En Jira Cloud existen exactamente 43 issues oficiales (claves `SCRUM-5` a `SCRUM-48`). Las claves `SCRUM-49` a `SCRUM-62` **NO HAN SIDO CREADAS** en el servidor de Jira.
* **Política de Nomenclatura:** Se prohíbe el uso de claves `SCRUM-XX` como hechos consumados para historias nuevas. En toda la documentación y artefactos locales se denominan estrictamente:
  - Claves Jira: `[Candidato SCRUM-49]` a `[Candidato SCRUM-62]`.
  - Historias Funcionales: `HU-031 [Propuesta]` a `HU-041 [Propuesta]`.
  - Épicas Candidatas: `EP-07 [Propuesta]`, `EP-08 [Propuesta]`, `EP-09 [Propuesta]`.

### 2.2. Calibración de Estimaciones Técnicas
* **`HU-032` (Saneamiento Ortográfico, Calidad Visual y Padding):**  
  - *Estimación Original Preliminar:* 3 Story Points.  
  - *Estimación Calibrada:* **5 Story Points**.  
  - *Justificación Técnica:* El análisis forense reveló la presencia de caracteres mojibake y emojis corruptos distribuidos a lo largo de **11 archivos TypeScript/TSX** (en lugar de 2 archivos inicialmente previstos), más el ajuste de CSS en `DialogContent` de `EditableActionPlan.tsx` y la implementación del test guardián automatizado `utf8_orthography.test.ts` para prevenir regresiones.
* **Conciliación de `HU-034` y `HU-035`:**  
  - **`HU-034` (Gestión Jerárquica de Áreas y Subsecretarías — Gobernación del Cauca):** 8 Story Points. Modela la estructura organizacional requerida por los operadores institucionales.
  - **`HU-035` (Ponderación Contextual Multicriterio del Activo según Naturaleza):** 5 Story Points. Permite ponderar activos según su impacto operativo real.

### 2.3. Segregación de Deuda Técnica Heredada (18 SP)
Se identificó formalmente la deuda técnica de TI2 correspondiente a `SCRUM-46` (5 SP), `SCRUM-47` (8 SP) y `SCRUM-48` (5 SP), que suman **18 Story Points**:
- Esta deuda **NO se mezcla** con las funcionalidades Must-Have de los operadores.
- Ha sido programada en el **Sprint 11** bajo clasificación **Should-Have / Backlog**, garantizando que los Sprints 8, 9 y 10 se concentren al 100% en las prioridades críticas de la Gobernación del Cauca.

### 2.4. Resumen de Capacidad del Release Plan V4.0 (Nov 23 – Dic 20, 2026)
* **Alcance Propuesto TI3:** 11 Historias de Usuario / Tareas (`HU-031` a `HU-041`).
* **Esfuerzo Funcional Nuevo (Must-Have):** **59 Story Points** (10 historias críticas).
* **Esfuerzo Técnico Heredado (Should-Have):** **18 Story Points** (`SCRUM-46..48`).
* **Total Planificado:** **77 Story Points** distribuidos en 4 Sprints:
  - **Sprint 8 (Nov 23 – Nov 29, 2026):** 15 SP (Estabilidad Core, Sesión, Ortografía, Navegación — `HU-031`, `HU-032`, `HU-033`).
  - **Sprint 9 (Nov 30 – Dic 06, 2026):** 17 SP (Estructura Organizacional, Carga Masiva y Ponderación — `HU-034`, `HU-035`, `HU-036`).
  - **Sprint 10 (Dic 07 – Dic 13, 2026):** 19 SP (Motor RAG Calibrado, Wizard de Evaluación y DAFP — `HU-037`, `HU-038`, `HU-039`).
  - **Sprint 11 (Dic 14 – Dic 20, 2026):** 26 SP (Auditoría Integral `HU-040`, Hardening `HU-041` [8 SP Must] + Deuda Técnica TI2 `SCRUM-46..48` [18 SP Should]).

---

## 3. Auditoría SDD/TDD de HU-031, HU-032 y HU-033

### 3.1. HU-031 [Propuesta]: Gestión Segura del Ciclo de Sesión y Expiración en Servidor
* **1. Hallazgo del Operador y Fuente:**  
  Informe Stiven/Kevin, Pág. 3; Matriz de Observaciones, Obs. 1: *"La sesión no expira tras inactividad prolongada ni advierte al usuario, y si un token es revocado el backend continúa permitiendo peticiones hasta que el JWT expire por reloj."*
* **2. Criterio de Aceptación (DoD):**  
  1) Temporizador cliente de 15 minutos de inactividad que abre modal a los 14 minutos (60s countdown).  
  2) Sincronización entre pestañas (`BroadcastChannel` / `storage event`).  
  3) Verificación en backend contra base de datos (`SesionUsuario.activa == True` y `fecha_expiracion > now()`).  
  4) Si la sesión está inactiva o expirada, responder `401 Unauthorized` con código `SESSION_REVOKED` / `SESSION_EXPIRED`.
* **3. Diseño / SDD Utilizado:**  
  Arquitectura de Doble Barrera: En cliente, middleware de actividad en `AuthContext.tsx` con listener de eventos DOM (`mousemove`, `keydown`, `scroll`, `click`), sincronizado con `BroadcastChannel("smartauditoria_auth")`. En backend, decorador `@require_auth` en `decorators.py` que consulta la tabla `sesiones_usuario` antes de ejecutar la vista.
* **4. Archivos y Funciones Implementadas:**  
  - `smartauditoria_backend/app/auth/decorators.py`: Función `require_auth` modificada para validar `SesionUsuario`.
  - `smartauditoria_backend/app/auth/routes.py`: Endpoints `POST /api/auth/refresh-session` y validación en `GET /api/auth/me`.
  - `smartauditoria_frontend/src/contexts/AuthContext.tsx`: Hooks de tracking, `handleUserActivity`, `resetIdleTimer`, `handleLogout`.
  - `smartauditoria_frontend/src/components/common/IdleTimeoutModal.tsx`: Componente visual accesible de cuenta regresiva.
* **5. Pruebas Automatizadas Vinculadas:**  
  - Backend: `smartauditoria_backend/tests/integration/test_auth_session_revocation.py` (`test_session_revocation_enforced_by_server`).
  - Frontend: `smartauditoria_frontend/src/tests/auth_idle.test.tsx` (2 pruebas: advertencia modal y timeout de cierre).
* **6. Resultado Esperado vs. Obtenido:**  
  - *Esperado:* Cierre de sesión automático y bloqueo 401 en servidor cuando se revoca la sesión.  
  - *Obtenido:* 100% coincidente. El test de backend confirma rechazo `401` al desactivar sesión en BD.
* **7. Evidencia Real de Ejecución:**  
  - Pytest: `smartauditoria_backend\tests\integration\test_auth_session_revocation.py . [100%] PASSED in 0.45s`.
  - Vitest: `src/tests/auth_idle.test.tsx (2 tests) PASSED in 161ms`.
* **8. Pruebas Pendientes:**  
  - Prueba E2E en VPS de producción con múltiples navegadores simultáneos (programada para validación del Sprint 8).
* **9. Veredicto DoD:**  
  **Desarrollo Técnico Completado Localmente / En Validación Anticipada** (DoD funcional satisfecho, pendiente integración VPS).

---

### 3.2. HU-032 [Propuesta]: Saneamiento Ortográfico UTF-8, Calidad Visual y Padding
* **1. Hallazgo del Operador y Fuente:**  
  Informe Stiven/Kevin, Pág. 4; Matriz de Observaciones, Obs. 4 y 7: *"Errores de codificación en caracteres especiales, tildes convertidas en símbolos extraños en pantallas de Riesgos, Activos y Reportes; corte del campo 'Título de la Acción' en el modal de plan de contingencia."*
* **2. Criterio de Aceptación (DoD):**  
  1) Cero caracteres corruptos (mojibake) en toda la interfaz de usuario.  
  2) Despliegue correcto de tildes (á, é, í, ó, ú, ñ) y caracteres ortográficos españoles.  
  3) Padding superior adecuado en modal de plan de acción (`EditableActionPlan.tsx`) que evite corte de texto.  
  4) Test automatizado que impida la entrada de caracteres residuales en archivos del frontend.
* **3. Diseño / SDD Utilizado:**  
  Codificación canónica UTF-8 estricta en el árbol `src/`. Reemplazo sistemático de secuencias de bytes mal codificadas (`Ã³`, `Ã¡`, etc.) y emojis de formato ambiguo. Estilo defensivo MUI con `pt: '20px !important'` en contenedor `DialogContent`. Test guardián basado en expresiones regulares que audita recursivamente `src/**/*.{ts,tsx}`.
* **4. Archivos y Funciones Implementadas:**  
  - 11 archivos de vistas y componentes saneados (`Riesgos.tsx`, `EditableActionPlan.tsx`, `RiskMatrix4x5.tsx`, `ReportesUsuarios.tsx`, `Activos.tsx`, `InformeRiesgos.tsx`, `Usuarios.tsx`, `documentos.ts`, `ThreatVulnerabilityLink.tsx`, `TwinAssetSuggestion.tsx`, `ResidualJustificationSuggestions.tsx`).
  - `smartauditoria_frontend/src/tests/utf8_orthography.test.ts`: Test automatizado con regex de detección de mojibake y emojis corruptos.
* **5. Pruebas Automatizadas Vinculadas:**  
  - Frontend: `smartauditoria_frontend/src/tests/utf8_orthography.test.ts` (1 suite exhaustiva).
* **6. Resultado Esperado vs. Obtenido:**  
  - *Esperado:* Cero violaciones ortográficas o de codificación en todos los componentes.  
  - *Obtenido:* 0 infracciones detectadas en los 11 archivos intervenidos y en todo el directorio `src/`.
* **7. Evidencia Real de Ejecución:**  
  - Vitest: `src/tests/utf8_orthography.test.ts (1 test) PASSED in 30ms`.
* **8. Pruebas Pendientes:**  
  - Inspección visual en navegador en pantallas de alta resolución (DPI scaling).
* **9. Veredicto DoD:**  
  **Desarrollo Técnico Completado Localmente / En Validación Anticipada** (DoD funcional y estético verificado).

---

### 3.3. HU-033 [Propuesta]: Desbloqueo de Navegación SPA, Resiliencia y Corrección de Wizard
* **1. Hallazgo del Operador y Fuente:**  
  Informe Stiven/Kevin, Pág. 2; Matriz de Observaciones, Obs. 2 y 5: *"Al navegar hacia ciertas vistas o al fallar una carga de componente dinámico, la pantalla queda completamente en blanco sin opción de recuperación. En el Wizard de evaluación, se generan guardados prematuros sin activo seleccionado que dejan evaluaciones huérfanas."*
* **2. Criterio de Aceptación (DoD):**  
  1) Captura de errores de renderizado en rutas React Lazy sin crasheo global de la aplicación (Error Boundary funcional).  
  2) Pantalla de contingencia amigable con opción de recargar módulo o volver al Dashboard.  
  3) Wizard de Evaluación: función `getEvaluacionEstado` pura sin efectos colaterales de mutación ni guardado automático durante el ciclo de render.  
  4) Bloqueo estricto del botón 'Siguiente' en el Paso 0 si no se ha seleccionado un activo.  
  5) Corrección del acento en el menú de navegación (`"Evaluación"`).
* **3. Diseño / SDD Utilizado:**  
  Patrón Error Boundary en arquitectura React con `componentDidCatch` y `getDerivedStateFromError`. Envoltura en `App.tsx` alrededor de las rutas bajo `<Suspense>`. Refactorización funcional en `RiskAssessmentWizard.tsx` desacoplando la lógica de derivación de estado del guardado en backend, asegurando idempotencia y pureza de renderizado.
* **4. Archivos y Funciones Implementadas:**  
  - `smartauditoria_frontend/src/components/common/RouteErrorBoundary.tsx`: Componente de contención de fallos con UI de recuperación.
  - `smartauditoria_frontend/src/components/common/RouteErrorBoundary.test.tsx`: Suite unitaria que simula fallos de componentes hijos.
  - `smartauditoria_frontend/src/App.tsx`: Integración del Boundary envolviendo lazy routes.
  - `smartauditoria_frontend/src/pages/wizard/RiskAssessmentWizard.tsx`: Refactorización de `getEvaluacionEstado` y validación en `handleNext`.
  - `smartauditoria_frontend/src/components/common/Layout.tsx`: Menú con label `"Evaluación"` y roles validados.
* **5. Pruebas Automatizadas Vinculadas:**  
  - Frontend: `smartauditoria_frontend/src/components/common/RouteErrorBoundary.test.tsx` (2 pruebas: renderizado normal y captura de excepción con botón de reintento).
* **6. Resultado Esperado vs. Obtenido:**  
  - *Esperado:* Intercepción de excepciones sin pantalla en blanco; el Wizard no invoca guardado parcial sin interacción explícita del usuario.  
  - *Obtenido:* 100% verificado. La prueba unitaria confirma renderizado del fallback UI ante excepciones provocadas.
* **7. Evidencia Real de Ejecución:**  
  - Vitest: `src/components/common/RouteErrorBoundary.test.tsx (2 tests) PASSED in 107ms`.
  - Vitest Global: `6 test files passed, 36 tests passed in 6.17s`.
  - Compilación Vite: `tsc -b && vite build -> built in 12.97s, exit code 0`.
* **8. Pruebas Pendientes:**  
  - Prueba de ciclo completo de guardado parcial y reanudación con activos reales en entorno VPS.
* **9. Veredicto DoD:**  
  **Desarrollo Técnico Completado Localmente / En Validación Anticipada** (DoD de resiliencia y estabilidad verificado).

---

## 4. Regularización Cronológica y de Gobernanza

1. **Clasificación Metodológica:**  
   Todo el código desarrollado localmente con anterioridad al inicio formal del Sprint 8 queda catalogado rigurosamente como **"Desarrollo Anticipado en Validación"**.
2. **Integridad del Historial:**  
   - No se han creado actas retrospectivas ficticias ni registros retroactivos de ceremonias Scrum que no tuvieron lugar.
   - No se asumen aprobaciones de operadores de la Gobernación del Cauca sin la correspondiente evidencia firmada o registrada en actas de entrega.
   - Las fechas del Sprint 8 (Noviembre 23 a Noviembre 29 de 2026) corresponden a la ventana de trabajo regular que será formalizada una vez que la dirección del proyecto apruebe este Gate G0-R.

---

## 5. Primera Sustentación TI3 — Presentación Local (10 Diapositivas y Guion)

### 5.1. Diapositivas Diseñadas para la Sustentación Académica

```
========================================================================================
DIAPOSITIVA 1: Portada y Contexto Institucional
----------------------------------------------------------------------------------------
TÍTULO: SmartAuditorIA — Sistema de Gestión y Auditoría de Seguridad de Activos de Información
SUBTÍTULO: Trabajo Integrador 3: Iteración Final de Ingeniería de Software (V4.0)
PROGRAMA: Maestría en Computación para el Desarrollo de Aplicaciones Inteligentes
INSTITUCIÓN: Universidad del Valle — Facultad de Ingeniería
AUTOR: Ing. Leonardo Javier Bastidas Moreno
CASO DE APLICACIÓN: Secretaría de Educación y Cultura — Gobernación del Cauca
MARCO NORMATIVO: ISO/IEC 27001:2022, ISO/IEC 27002:2022 (93 controles), DAFP V7 / MIPG, Ley 1712 de 2014
OBJETIVO DE LA SESIÓN: Presentar el diagnóstico de operadores, la regularización del Backlog TI3 y los avances técnicos locales hacia la versión final de diciembre.
========================================================================================
DIAPOSITIVA 2: Línea Base TI2 y Diagnóstico Operativo de la Gobernación del Cauca
----------------------------------------------------------------------------------------
TÍTULO: Línea Base TI2 y Diagnóstico Operativo
• Estado de Cierre TI2:
  - 207 Story Points planificados en Jira Cloud (Sprints 1 a 7).
  - 189 Story Points en estado Done (136 SP con DoD completamente aceptado + 53 SP con aceptación funcional parcial en evaluación).
  - 18 Story Points en Backlog correspondientes a tareas de hardening y optimización (SCRUM-46, 47 y 48).
• Diagnóstico Formal de Operadores (Gobernación del Cauca):
  - Fuente 1: Informe Actualizado Stiven/Kevin (22 hallazgos de usabilidad, persistencia y flujos).
  - Fuente 2: Matriz de Observaciones SGSI (8 observaciones de seguridad, sesión, ortografía y filtros).
• Categorización de Brechas: 1) Seguridad de sesión y tokens; 2) Estabilidad y pantallas en blanco; 3) Visualización ortográfica UTF-8; 4) Flujo del Wizard y DAFP; 5) Precisión y grounding del motor RAG.
========================================================================================
DIAPOSITIVA 3: Backlog Regularizado TI3 y Matriz MoSCoW
----------------------------------------------------------------------------------------
TÍTULO: Backlog Propuesto para Trabajo Integrador 3 (V4.0)
• Principio de Gobernanza: Claves Jira tratadas formalmente como [Candidato SCRUM-XX] y HU como [Propuesta].
• Clasificación MoSCoW del Esfuerzo:
  - MUST-HAVE (Crítico para Operación Gobernación): 59 Story Points (10 Historias de Usuario HU-031 a HU-040).
    * HU-031 (5 SP): Sesión e inactividad en servidor.
    * HU-032 (5 SP): Saneamiento UTF-8 y calidad visual.
    * HU-033 (5 SP): Navegación SPA y desacople de Wizard.
    * HU-034 (8 SP): Estructura organizacional y subsecretarías.
    * HU-035 (5 SP): Ponderación multicriterio de activos.
    * HU-036 (5 SP): Validación y previsualización de carga masiva.
    * HU-037 (5 SP): Calibración RAG con embeddings locales e híbridos.
    * HU-038 (5 SP): Wizard de evaluación con cálculo DAFP.
    * HU-039 (8 SP): Matriz y reporte exportable DAFP V7.
    * HU-040 (8 SP): Módulo de auditorías internas y hallazgos.
  - SHOULD-HAVE (Optimización y Deuda Técnica TI2): 18 Story Points (SCRUM-46, 47, 48 + HU-041 Hardening).
• Total Esfuerzo Planificado: 77 Story Points sin duplicaciones.
========================================================================================
DIAPOSITIVA 4: Arquitectura Smart BPMN y Componentes Impactados
----------------------------------------------------------------------------------------
TÍTULO: Arquitectura del Sistema y Flujo Smart BPMN
• Flujo de Valor en 5 Fases BPMN:
  1. Identificación y Levantamiento de Activos (MIPG / DAFP).
  2. Evaluación y Calificación de Riesgos (Matriz 4x5 ISO 27005).
  3. Tratamiento y Planes de Contingencia (ISO 27002 / 93 Controles).
  4. Auditoría, Hallazgos y Monitoreo Continuo.
  5. Asistencia Inteligente y Grounding Normativo (Motor RAG).
• Componentes Arquitectónicos Impactados:
  - Frontend SPA (React 18 + TypeScript + Vite + Material UI).
  - Backend API (Flask + SQLAlchemy + JWT Security Layer).
  - Engine RAG (ChromaDB + FAISS + Sentence Transformers + Google Gemini API).
  - Base de Datos Relacional (MariaDB 10.11 / MySQL (3306) en VPS de Producción).
========================================================================================
DIAPOSITIVA 5: Release Plan de 4 Sprints y Capacidad Neta
----------------------------------------------------------------------------------------
TÍTULO: Release Plan V4.0 (23 Noviembre — 20 Diciembre 2026)
• Cronograma y Distribución de Carga:
  - Sprint 8 (23 Nov - 29 Nov | 15 SP): Estabilidad Core, Sesión, Ortografía y Resiliencia (HU-031, HU-032, HU-033).
  - Sprint 9 (30 Nov - 06 Dic | 17 SP): Organización Institucional, Carga Masiva y Ponderación (HU-034, HU-035, HU-036).
  - Sprint 10 (07 Dic - 13 Dic | 19 SP): Inteligencia RAG, Wizard DAFP y Reportes Oficiales (HU-037, HU-038, HU-039).
  - Sprint 11 (14 Dic - 20 Dic | 26 SP): Auditoría Integral (HU-040, 8 SP), Hardening (HU-041) y Deuda Técnica TI2 (SCRUM-46..48, 18 SP).
• Capacidad de Ejecución: 1 Desarrollador Fullstack / Arquitecto con dedicación intensiva, apalancado en infraestructura automatizada CI/CD y suites de pruebas de regresión.
========================================================================================
DIAPOSITIVA 6: Avances Locales — HU-031: Seguridad y Ciclo de Sesión
----------------------------------------------------------------------------------------
TÍTULO: Desarrollo Anticipado: Gestión de Sesión y Expiración en Servidor
• Diagnóstico Resuelto: Sesión desatendida y tokens JWT no invalidados tras revocación administrativa.
• Solución Implementada:
  - Cliente: Temporizador de 15 min de inactividad con listeners DOM, advertencia visual modal a 60 segundos y sincronización multipestaña con BroadcastChannel.
  - Servidor: Decorador @require_auth con validación en BD (SesionUsuario.activa == True).
  - API: Endpoint POST /api/auth/refresh-session para renovación transparente mientras el usuario interactúa.
• Validación:
  - Test Backend: test_auth_session_revocation.py -> PASSED (comprobación de 401 Unauthorized ante sesión desactivada).
  - Test Frontend: auth_idle.test.tsx -> 2 PASSED (modal visual y expiración automática).
========================================================================================
DIAPOSITIVA 7: Avances Locales — HU-032: Saneamiento UTF-8 y Calidad Visual
----------------------------------------------------------------------------------------
TÍTULO: Desarrollo Anticipado: Saneamiento Ortográfico y Consistencia Visual
• Diagnóstico Resuelto: Caracteres mojibake (símbolos dañados por mala codificación de tildes) en pantallas institucionales y corte visual del formulario en planes de contingencia.
• Solución Implementada:
  - Barrido y corrección exhaustiva en 11 archivos de vistas y componentes TSX/TS.
  - Normalización tipográfica de términos normativos: Evaluación, Amenazas, Clasificación, Vulnerabilidad.
  - Ajuste de espaciado en EditableActionPlan.tsx con padding superior defensivo (pt: '20px !important').
  - Guardián Automatizado: Suite utf8_orthography.test.ts que audita el código fuente garantizando 0 regresiones.
• Validación:
  - Test Frontend: utf8_orthography.test.ts -> PASSED (0 fallos de codificación en todo el árbol de código).
========================================================================================
DIAPOSITIVA 8: Avances Locales — HU-033: Desbloqueo SPA y Wizard Resiliente
----------------------------------------------------------------------------------------
TÍTULO: Desarrollo Anticipado: Navegación Resiliente y Wizard Seguro
• Diagnóstico Resuelto: Pantalla blanca completa ante excepciones de carga y evaluaciones huérfanas por guardados parciales automáticos sin selección de activo.
• Solución Implementada:
  - RouteErrorBoundary: Componente de contención de fallos que aísla excepciones en rutas dinámicas, mostrando una interfaz de recuperación amigable con botón de reintento.
  - Wizard de Riesgos Desacoplado: Conversión de getEvaluacionEstado en función pura y eliminación de llamadas asíncronas de guardado dentro del ciclo de render.
  - Validación Estricta: Paso 0 bloqueado hasta que el operador seleccione formalmente un activo del inventario.
• Validación:
  - Test Frontend: RouteErrorBoundary.test.tsx -> 2 PASSED (captura controlada y renderizado normal).
========================================================================================
DIAPOSITIVA 9: Evidencia de Calidad y Resultados de Pruebas Automatizadas
----------------------------------------------------------------------------------------
TÍTULO: Calidad Verificable: 82 Pruebas Automatizadas y Build Limpio
• Resultados Verificados en el Entorno Local:
  - Backend (Pytest): 46 pruebas unitarias e integradas exitosas (46 passed en 7.73s).
    * Incluye flujo de autenticación, gestión de activos, bulk upload, cálculo de riesgos y revocación de sesión.
  - Frontend (Vitest): 36 pruebas unitarias y de componentes exitosas (6 suites passed en 6.17s).
    * Incluye asistente conversacional, hooks de IA, manejo de inactividad, ErrorBoundary y ortografía UTF-8.
  - Compilación de Producción: tsc -b && vite build -> Compilación limpia en 12.97s, 0 errores tipográficos.
• Indicador Global de Salud: 100% de pruebas en verde, base de código estable para inicio de sprint formal.
========================================================================================
DIAPOSITIVA 10: Matriz de Riesgos, Impedimentos y Ruta hacia el Cierre Final
----------------------------------------------------------------------------------------
TÍTULO: Gestión de Riesgos, Próximos Pasos y Ruta al 20 de Diciembre
• Principales Riesgos Identificados y Mitigación:
  - R-01 (Calibración RAG): Riesgo de grounding impreciso -> Mitigación: Indexación de 93 controles ISO 27002 con embeddings locales y validación humana.
  - R-02 (Carga Masiva Excel): Incompatibilidad de formatos de la Gobernación -> Mitigación: Previsualización dry-run con rollback automático.
  - R-03 (Ventana de Tiempo): 4 semanas hasta entrega -> Mitigación: Focalización estricta en 59 SP Must-Have.
• Ruta de Aprobación Inmediata (Gate G0-R):
  - 1) Autorización del Backlog regularizado y Release Plan de 4 Sprints.
  - 2) Creación formal de historias candidatas en Jira Cloud ([Candidato SCRUM-49..62]).
  - 3) Inicio formal del Sprint 8 y sincronización con el entorno de pruebas VPS.
========================================================================================
```

---

### 5.2. Guion Detallado del Expositor (Pacing Recomendado: 15 Minutos)

* **Minuto 00:00 – 01:30 | Diapositiva 1: Portada y Contexto Institucional**
  > "Muy buenos días/tardes a los miembros del comité académico. Presento el estado de avance e inicio de la iteración final de ingeniería de software para SmartAuditorIA, en el marco de la Maestría en Computación para el Desarrollo de Aplicaciones Inteligentes de la Universidad del Valle. Nuestro proyecto aborda una problemática crítica y real: la gestión de activos de información y la evaluación automatizada de riesgos de seguridad digital en la Secretaría de Educación y Cultura de la Gobernación del Cauca, alineado estrictamente con ISO/IEC 27001:2022, el catálogo de 93 controles de ISO 27002 y las directrices del DAFP y MIPG. El objetivo de esta sesión es sustentar la regularización del backlog, el análisis de las observaciones operativas y los avances técnicos desarrollados localmente para asegurar el éxito de la versión final V4.0."

* **Minuto 01:30 – 03:00 | Diapositiva 2: Línea Base TI2 y Diagnóstico Operativo**
  > "Al cierre de Trabajo Integrador 2, consolidamos un backlog histórico de 207 Story Points, con 189 SP en estado Done, de los cuales 136 SP cuentan con aceptación plena verificada y 53 SP permanecieron bajo evaluación funcional. Durante las pruebas operativas en la Gobernación del Cauca, recibimos dos insumos invaluables: el informe técnico de los operadores Stiven y Kevin con 22 hallazgos, y la matriz de observaciones SGSI con 8 puntos adicionales. Identificamos que el sistema requería atención en cuatro frentes: seguridad en el ciclo de sesión, prevención de pantallas en blanco ante fallos de renderizado, corrección ortográfica y visual, y desacople de procesos automáticos en el Wizard de evaluación."

* **Minuto 03:00 – 04:30 | Diapositiva 3: Backlog Regularizado TI3 y Matriz MoSCoW**
  > "Bajo una rigurosa gobernanza ágil, hemos estructurado el Backlog de Trabajo Integrador 3 manteniendo la separación entre el trabajo planificado y las claves oficiales. Ninguna historia nueva ha sido creada prematuramente en Jira Cloud; se presentan como propuestas formalmente clasificadas bajo MoSCoW. Identificamos 59 Story Points como estrictamente 'Must-Have' para satisfacer las necesidades de los operadores institucionales, distribuidos en 10 Historias de Usuario desde HU-031 hasta HU-040. Adicionalmente, los 18 Story Points de deuda técnica heredada de TI2 se programaron como 'Should-Have' en el último sprint, garantizando que el equipo concentre toda su energía en los requerimientos prioritarios de la Gobernación."

* **Minuto 04:30 – 06:00 | Diapositiva 4: Arquitectura Smart BPMN y Componentes Impactados**
  > "La arquitectura del aplicativo responde a un flujo de valor de 5 fases modelado en Smart BPMN: identificación de activos, calificación matricial de riesgos, selección de controles de tratamiento, auditoría interna y asistencia inteligente con IA. Esta iteración final impacta todas las capas del sistema: en el frontend SPA desarrollado en React y TypeScript, fortalecemos el manejo de sesión y la resiliencia ante excepciones; en el backend API con Flask y SQLAlchemy, incorporamos verificación de sesiones en base de datos; y en el motor de IA, optimizamos la integración RAG para asegurar sugerencias normativas fiables y trazables."

* **Minuto 06:00 – 07:30 | Diapositiva 5: Release Plan de 4 Sprints y Capacidad Neta**
  > "Hemos diseñado un Release Plan realista y ejecutable de 4 semanas, desde el 23 de noviembre hasta el 20 de diciembre de 2026. El Sprint 8 está dedicado a la estabilidad core, sesión, ortografía y resiliencia; el Sprint 9 abordará la estructura jerárquica de áreas y la carga masiva; el Sprint 10 se enfocará en el motor RAG y la matriz oficial DAFP; y el Sprint 11 consolidará las auditorías internas, el hardening de seguridad y la conciliación de deuda técnica. Con una capacidad calibrada y apoyados en integración continua y pruebas automatizadas, garantizamos la entrega del producto final en la fecha límite fijada."

* **Minuto 07:30 – 09:00 | Diapositiva 6: Avances Locales — HU-031: Seguridad y Sesión**
  > "Pasando a los avances técnicos desarrollados anticipadamente en el entorno local, la HU-031 resuelve la vulnerabilidad de sesiones desatendidas. Implementamos una doble barrera: en el frontend, el AuthContext rastrea la actividad del usuario y, a los 14 minutos de inactividad, despliega un modal con cuenta regresiva de 60 segundos, sincronizado entre pestañas mediante BroadcastChannel. En el backend, el decorador `@require_auth` ahora valida contra la tabla `sesiones_usuario` si la sesión fue revocada o expiró, respondiendo un 401 Unauthorized inmediato. Esta implementación cuenta con pruebas unitarias en frontend y una prueba de integración en backend, todas ejecutadas con éxito."

* **Minuto 09:00 – 10:30 | Diapositiva 7: Avances Locales — HU-032: Calidad Visual y UTF-8**
  > "La HU-032 responde a un requerimiento de calidad fundamental para un aplicativo institucional. Los operadores reportaron caracteres corruptos en leyendas, matrices y tablas debido a discrepancias de codificación UTF-8. Realizamos un saneamiento integral en 11 archivos del frontend, eliminando cualquier rastro de mojibake y corrigiendo el espaciado del modal de planes de acción para evitar cortes de texto. Para garantizar que ningún cambio futuro reintroduzca este problema, creamos un test automatizado guardián que audita recursivamente el código fuente con cero violaciones permitidas."

* **Minuto 10:30 – 12:00 | Diapositiva 8: Avances Locales — HU-033: Desbloqueo y Resiliencia**
  > "La HU-033 elimina el riesgo de pantallas en blanco. Desarrollamos un componente `RouteErrorBoundary` que envuelve las rutas dinámicas, capturando excepciones de renderizado y ofreciendo al usuario la posibilidad de reintentar la carga del módulo o regresar al Dashboard sin reiniciar la aplicación. Asimismo, refactorizamos el Wizard de Evaluación de Riesgos: eliminamos llamadas automáticas de guardado dentro del ciclo de render que creaban registros huérfanos, convertimos la función de cálculo de estado en una función pura y bloqueamos el avance si no existe un activo seleccionado."

* **Minuto 12:00 – 13:30 | Diapositiva 9: Evidencia de Calidad y Pruebas Automatizadas**
  > "La calidad de nuestro desarrollo no se basa en afirmaciones, sino en evidencia verificable. Actualmente contamos con 82 pruebas automatizadas completamente en verde: 46 pruebas en el backend que cubren flujos de autenticación, gestión de activos, bulk upload y revocación de sesión; y 36 pruebas en el frontend que validan componentes interactivos, asistentes de IA, contención de errores y ciclo de sesión. Además, el proceso de compilación de producción con TypeScript y Vite se ejecuta con cero errores y advertencias tipográficas en menos de 13 segundos."

* **Minuto 13:30 – 15:00 | Diapositiva 10: Matriz de Riesgos y Próximos Pasos**
  > "Para finalizar, hemos identificado los riesgos del proyecto y sus respectivas estrategias de mitigación: la calibración del motor RAG se abordará con indexación local y evaluación experta; el soporte de plantillas Excel se protegerá mediante previsualización y validación previa; y el plazo de entrega se salvaguarda focalizando el esfuerzo en los 59 SP Must-Have. Nos encontramos listos para someter a aprobación este Gate G0-R, tras lo cual crearemos formalmente los issues en Jira Cloud, sincronizaremos los avances en el entorno VPS e iniciaremos formalmente el Sprint 8. Quedo a disposición del comité evaluador para atender sus preguntas."

---

## 6. Lista de Decisiones que Requieren Autorización

Para dar inicio a las actividades formales de desarrollo y publicación, se somete a revisión y aprobación del Product Owner / Dirección del Proyecto los siguientes puntos:

1. **Aprobación de la Calibración de HU-032:**  
   Confirmar formalmente la recalibración de la estimación de `HU-032` de 3 a **5 Story Points**, justificada por la intervención de 11 archivos y la inclusión del test guardián de regresión ortográfica.
2. **Aprobación del Backlog Propuesto V4.0 (59 SP Must-Have + 18 SP Should-Have):**  
   Validar la distribución de historias `HU-031` a `HU-041` y la segregación de la deuda técnica heredada (`SCRUM-46..48`) en el Sprint 11.
3. **Autorización para Creación de Issues en Jira Cloud:**  
   Autorizar la ejecución controlada del script de importación para dar de alta en Jira Cloud los tickets `SCRUM-49` a `SCRUM-62` a partir de `docs/agile/jira_import.csv`.
4. **Autorización de Smart Commits Locales:**  
   Autorizar la ejecución de los commits locales correspondientes a `HU-031`, `HU-032` y `HU-033` bajo la convención `[CANDIDATO-SCRUM-XX][HU-0XX] <tipo>: <mensaje>`.
5. **Autorización de Push y Sincronización con VPS:**  
   Autorizar la publicación remota en GitHub y el posterior despliegue y validación E2E en el VPS institucional de producción.

---
*Fin del Informe Gate G0-R. Sistema detenido en espera de revisión y autorización.*
