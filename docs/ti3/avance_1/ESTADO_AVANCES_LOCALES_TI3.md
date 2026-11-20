# SMARTAUDITORIA TI3 — ESTADO DE AVANCES LOCALES CON EVIDENCIA REAL (V4.0)
**Maestría en Computación para el Desarrollo de Aplicaciones Inteligentes**  
**Universidad del Valle — Facultad de Ingeniería**  
**Autor:** Ing. Leonardo Javier Bastidas Moreno  
**Corte Académico:** 20 de noviembre de 2026 — Gate G0.5  
**Clasificación Metodológica:** Desarrollo Anticipado en Validación Local (Sprint 8)  

---

## 1. Resumen Ejecutivo del Estado Local

> [!WARNING]
> **Estado de Aceptación:**  
> Ninguna de las historias desarrolladas localmente (`HU-031`, `HU-032`, `HU-033`) se considera formalmente **Done**. Cuentan con desarrollo técnico concluido y pruebas automatizadas locales en verde, pero su criterio de aceptación final (**Definition of Done**) exige despliegue en VPS y validación funcional con los operadores institucionales de la Gobernación del Cauca.

```
Total Historias con Avance Local: 3 Historias de Usuario (HU-031, HU-032, HU-033)
Esfuerzo Local Implementado: 15 Story Points Must-Have
Estado de Pruebas Backend: 46 passed en 7.73s (100% éxito)
Estado de Pruebas Frontend: 36 passed en 6.17s (6 suites, 100% éxito)
Compilación de Producción: tsc -b && vite build completado en 12.97s (0 errores)
```

---

## 2. Detalle de Implementación por Historia

### 2.1. HU-031 [Propuesta]: Seguridad de Sesiones, Expiración por Inactividad y Revocación JWT
* **Clave Jira Candidata:** `[Candidato SCRUM-52]` | **Épica:** `EP-07` | **Esfuerzo:** 5 SP (Must-Have).
* **Problema Resuelto:** Sesiones desatendidas que permanecían activas sin límite de tiempo y aceptación por parte del backend de tokens JWT revocados en la base de datos.
* **Componentes Implementados:**
  1. `smartauditoria_frontend/src/contexts/AuthContext.tsx`:
     - Listeners de eventos DOM (`mousemove`, `keydown`, `scroll`, `click`) con temporizador de 15 minutos.
     - Apertura de modal de advertencia a los 14 minutos con cuenta regresiva visible de 60 segundos.
     - Sincronización entre múltiples pestañas mediante `BroadcastChannel("smartauditoria_auth")` y eventos de `storage`.
     - Renovación de token mediante llamada a `POST /api/auth/refresh-session` cuando el usuario pulsa *"Continuar sesión"*.
  2. `smartauditoria_frontend/src/components/common/IdleTimeoutModal.tsx`:
     - Modal accesible con `DialogTitle`, temporizador numérico y acciones de confirmación y cierre voluntario.
  3. `smartauditoria_backend/app/auth/decorators.py`:
     - Refactorización de `@require_auth` para consultar la base de datos: verifica que `SesionUsuario.activa == True` y `fecha_expiracion > datetime.utcnow()`.
     - Si la sesión fue revocada o expiró, responde de inmediato con `HTTP 401 Unauthorized` (`SESSION_REVOKED` / `SESSION_EXPIRED`).
  4. `smartauditoria_backend/app/auth/routes.py`:
     - Endpoint `POST /api/auth/refresh-session` para extender la vida útil de la sesión activa en BD.
* **Pruebas Automatizadas Verificadas:**
  - Backend: `smartauditoria_backend/tests/integration/test_auth_session_revocation.py` $\rightarrow$ **1 passed** en 0.45s.
  - Frontend: `smartauditoria_frontend/src/tests/auth_idle.test.tsx` $\rightarrow$ **2 passed** en 161ms.
* **Pendiente para DoD:** Despliegue en VPS y prueba multi-navegador con los operadores Stiven y Kevin.

---

### 2.2. HU-032 [Propuesta]: Saneamiento Ortográfico UTF-8, Calidad Visual y Padding
* **Clave Jira Candidata:** `[Candidato SCRUM-53]` | **Épica:** `EP-09` | **Esfuerzo:** 5 SP calibrados (Must-Have).
* **Problema Resuelto:** Caracteres mojibake corruptos en pantallas de Riesgos, Activos y Reportes debido a incompatibilidades de codificación, y corte visual del título en el modal de plan de acción.
* **Componentes Implementados:**
  1. Barrido exhaustivo y erradicación de secuencias mal codificadas en **11 archivos TSX/TS**:
     - `src/pages/riesgos/Riesgos.tsx`
     - `src/components/common/EditableActionPlan.tsx` (con corrección de padding `pt: '20px !important'`)
     - `src/components/riesgos/RiskMatrix4x5.tsx`
     - `src/pages/reportes/ReportesUsuarios.tsx`
     - `src/components/activos/ActivoDetailCard.tsx`
     - `src/components/common/ThreatVulnerabilityLink.tsx`
     - `src/components/common/TwinAssetSuggestion.tsx`
     - `src/components/predictive/ResidualJustificationSuggestions.tsx`
     - `src/pages/activos/Activos.tsx`
     - `src/pages/reportes/InformeRiesgos.tsx`
     - `src/pages/usuarios/Usuarios.tsx`
     - `src/services/documentos.ts`
  2. `smartauditoria_frontend/src/tests/utf8_orthography.test.ts`:
     - Suite automatizada guardiana que analiza recursivamente todos los archivos de `src/` buscando secuencias mojibake o emojis corruptos.
* **Pruebas Automatizadas Verificadas:**
  - Frontend: `smartauditoria_frontend/src/tests/utf8_orthography.test.ts` $\rightarrow$ **1 passed** en 30ms (0 violaciones).
* **Pendiente para DoD:** Inspección visual en pantallas institucionales de la Gobernación del Cauca.

---

### 2.3. HU-033 [Propuesta]: Desbloqueo de Navegación SPA, Resiliencia y Desacople del Wizard
* **Clave Jira Candidata:** `[Candidato SCRUM-54]` | **Épica:** `EP-07` | **Esfuerzo:** 5 SP (Must-Have).
* **Problema Resuelto:** Pantallas en blanco ante fallos de renderizado en rutas dinámicas y creación de evaluaciones huérfanas en el Wizard por guardado prematuro dentro del ciclo de render.
* **Componentes Implementados:**
  1. `smartauditoria_frontend/src/components/common/RouteErrorBoundary.tsx`:
     - Captura controlada de excepciones de React mediante `componentDidCatch` y `getDerivedStateFromError`.
     - Despliegue de interfaz de contingencia accesible con opciones de *"Reintentar cargar módulo"* y *"Volver al Dashboard"*.
  2. `smartauditoria_frontend/src/App.tsx`:
     - Envoltura de `<Suspense>` con `<RouteErrorBoundary>`.
  3. `smartauditoria_frontend/src/pages/wizard/RiskAssessmentWizard.tsx`:
     - Refactorización de `getEvaluacionEstado` como función pura sin llamadas asíncronas dentro del render.
     - Validación en `handleNext` para impedir avance en el Paso 0 si no se ha seleccionado formalmente un activo.
  4. `smartauditoria_frontend/src/components/common/Layout.tsx`:
     - Corrección ortográfica del menú `"Evaluación"` con tilde y verificación de control de acceso por roles.
* **Pruebas Automatizadas Verificadas:**
  - Frontend: `smartauditoria_frontend/src/components/common/RouteErrorBoundary.test.tsx` $\rightarrow$ **2 passed** en 107ms.
* **Pendiente para DoD:** Prueba de navegación continua de 30 minutos sin excepciones en VPS.

---

## 3. Registro Verificable de Ejecución de Suites

### Pruebas de Backend (Pytest):
```
rootdir: /workspace/smartauditoria_project
collected 46 items

smartauditoria_backend\tests\integration\test_activos_bulk_api.py ..           [  4%]
smartauditoria_backend\tests\integration\test_activos_funcion_publica_api.py .. [  8%]
smartauditoria_backend\tests\integration\test_auth_session_revocation.py .     [ 10%]
smartauditoria_backend\tests\integration\test_reportes_mapa_api.py ...         [ 17%]
smartauditoria_backend\tests\integration\test_soa_api.py ...                   [ 23%]
smartauditoria_backend\tests\integration\test_usuarios_auditorias_api.py ..   [ 28%]
smartauditoria_backend\tests\test_usuarios_flow.py .                           [ 30%]
smartauditoria_backend\tests\unit\application\test_activos_use_cases.py ....... [ 47%]
smartauditoria_backend\tests\unit\application\test_bulk_activos_service.py .... [ 56%]
smartauditoria_backend\tests\unit\application\test_mapa_riesgos_service.py ..  [ 60%]
smartauditoria_backend\tests\unit\application\test_soa_service.py .            [ 63%]
smartauditoria_backend\tests\unit\domain\test_activo_funcion_publica.py .....  [ 73%]
smartauditoria_backend\tests\unit\domain\test_entities.py ............         [100%]

====================== 46 passed, 213 warnings in 7.73s =======================
```

### Pruebas de Frontend (Vitest):
```
 RUN  v4.1.5 /workspace/smartauditoria_project/smartauditoria_frontend

 ✓ src/features/wizard-ai/services/WizardAIMessageService.test.ts (18 tests) 12ms
 ✓ src/tests/utf8_orthography.test.ts (1 test) 30ms
 ✓ src/features/wizard-ai/hooks/useWizardAI.test.ts (5 tests) 19ms
 ✓ src/components/common/RouteErrorBoundary.test.tsx (2 tests) 107ms
 ✓ src/tests/auth_idle.test.tsx (2 tests) 161ms
 ✓ src/components/common/ConversationalAuditor.test.tsx (8 tests) 180ms

 Test Files  6 passed (6)
      Tests  36 passed (36)
   Duration  6.17s
```

### Compilación Frontend de Producción:
```
> frontend@0.0.0 build
> tsc -b && vite build

vite v5.4.14 building for production...
transforming...
✓ 1832 modules transformed.
rendering chunks...
computing chunk sizes...
dist/index.html                                     2.41 kB │ gzip:   0.94 kB
dist/assets/js/index-D7bH5v2l.js                 1,124.82 kB │ gzip: 341.22 kB
✓ built in 12.97s (exit code 0)
```
