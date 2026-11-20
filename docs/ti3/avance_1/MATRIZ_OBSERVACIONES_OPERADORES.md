# SMARTAUDITORIA TI3 — MATRIZ DE OBSERVACIONES DE OPERADORES Y FUENTES
**Maestría en Computación para el Desarrollo de Aplicaciones Inteligentes**  
**Universidad del Valle — Facultad de Ingeniería**  
**Autor:** Ing. Leonardo Javier Bastidas Moreno  
**Corte Académico:** 20 de noviembre de 2026 — Gate G0.5  
**Fuentes Oficiales Auditadas:**  
1. `SmartAuditorIA_Informe_actualizadoStiven_Kevin.docx` (18/11/2026 — 22 hallazgos técnicos).  
2. `Observaciones para el aplicativo SmartAuditorIA SGSI.pdf` (Noviembre 2026 — 8 observaciones de Secretaría General).  

---

## 1. Resumen Consolidado de Fuentes

| Identificador Fuente | Documento Físico | Autores / Entidad | Total Hallazgos | Áreas Clave Diagnosticadas |
| :--- | :--- | :--- | :---: | :--- |
| **Informe Operadores** | `SmartAuditorIA_Informe_actualizadoStiven_Kevin.docx` | Stiven Fernández & Kevin Coca (Operadores SGSI) | **22** | Sesión, Navegación, Carga Masiva .xlsm, Wizard de Riesgos, Visualización y Reportes. |
| **Matriz SGSI** | `Observaciones para el aplicativo SmartAuditorIA SGSI.pdf` | Secretaría General / SEC Gobernación del Cauca | **8** | Seguridad de tokens, Pantallas en blanco, Columnas oficiales, Ortografía UTF-8, Auditorías. |

---

## 2. Matriz Exhaustiva de Observaciones y Mapeo Funcional

| # | ID Hallazgo | Documento y Página | Módulo Afectado | Descripción del Problema Reportado por los Operadores | Verificación en Código | Historia TI3 Vinculada | Prioridad | Estado de Avance |
| :-: | :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| **1** | `T-01` | Docx Pág. 3 | Autenticación | La sesión permanece abierta indefinidamente tras inactividad; no hay aviso previo al usuario. | `AuthContext.tsx` carecía de tracking de eventos DOM; decorador `@require_auth` no validaba estado en BD. | **`HU-031`** | **Must** | **Desarrollo Anticipado en Validación Local** |
| **2** | `PDF-01` | PDF Pág. 1 | Autenticación | Un token JWT revocado administrativamente sigue siendo aceptado por el backend mientras la firma sea válida. | `@require_auth` solo verificaba `jwt.decode` sin consultar la tabla `sesiones_usuario`. | **`HU-031`** | **Must** | **Desarrollo Anticipado en Validación Local** |
| **3** | `T-02` | Docx Pág. 4 | Interfaz General | Caracteres extraños y mojibake en palabras con tildes (Evaluación, Información, etc.) en Riesgos y Reportes. | 11 archivos de frontend presentaban secuencias de bytes mal codificadas UTF-8 (`Ã³`, `Ã¡`, etc.). | **`HU-032`** | **Must** | **Desarrollo Anticipado en Validación Local** |
| **4** | `PDF-04` | PDF Pág. 2 | Interfaz / CSS | En el modal de planes de acción, el título `"Título de la Acción"` se corta visualmente en el borde superior. | `EditableActionPlan.tsx` no contaba con padding superior suficiente en el contenedor `DialogContent`. | **`HU-032`** | **Must** | **Desarrollo Anticipado en Validación Local** |
| **5** | `EVA-01` | Docx Pág. 11 | Wizard Riesgos | Al navegar o cambiar entre secciones del Wizard, en ocasiones la pantalla queda en blanco sin mensaje. | Excepciones no capturadas en componentes hijos lazy rompían el árbol completo de React sin fallback UI. | **`HU-033`** | **Must** | **Desarrollo Anticipado en Validación Local** |
| **6** | `PDF-02` | PDF Pág. 1 | Navegación SPA | Al hacer clic en ciertas opciones del menú lateral, la SPA no responde o se bloquea la navegación. | Carencia de un ErrorBoundary por ruta dinámica que restablezca el ciclo de vida de React. | **`HU-033`** | **Must** | **Desarrollo Anticipado en Validación Local** |
| **7** | `PDF-07` | PDF Pág. 3 | Menú / Wizard | La palabra `"Evaluacion"` aparece sin tilde en el menú lateral y hay saltos inconsistentes de página. | `Layout.tsx` tenía texto literal `"Evaluacion"`; `RiskAssessmentWizard.tsx` ejecutaba guardado parcial en render. | **`HU-033`** | **Must** | **Desarrollo Anticipado en Validación Local** |
| **8** | `ACT-03` | Docx Pág. 7 | Carga Masiva | La carga del archivo `.xlsm` oficial de la Gobernación falla indicando error de estructura o formato no soportado. | El parser de backend asumía archivos `.xlsx` planos con cabecera en fila 1 y no soportaba archivos con macros multi-hoja. | **`HU-034`** | **Must** | Propuesta Sprint 9 |
| **9** | `ACT-04` | Docx Pág. 8 | Carga Masiva | El sistema no detecta automáticamente la hoja `'1. ACTIVOS DE INFORMACIÓN'` dentro del libro de trabajo Excel. | Falta de lógica de búsqueda dinámica por nombre exacto de pestaña en la librería `openpyxl`. | **`HU-034`** | **Must** | Propuesta Sprint 9 |
| **10** | `ACT-05` | Docx Pág. 9 | Carga Masiva | Al subir archivos grandes (mayores a 10MB), la petición retorna error 413 sin mensaje explicativo. | `MAX_CONTENT_LENGTH` de Flask y configuración de Nginx restringían el payload sin validación en cliente. | **`HU-034`** | **Must** | Propuesta Sprint 9 |
| **11** | `PDF-08` | PDF Pág. 3 | Carga Masiva | La carga masiva no muestra una barra de progreso real ni reporta qué fila o columna presentó fallos. | El servicio procesaba sincrónicamente todo el archivo sin retornar errores tabulados por celda. | **`HU-034`** | **Must** | Propuesta Sprint 9 |
| **12** | `DAS-02` | Docx Pág. 5 | Dashboard | Si falla un indicador del Dashboard, todo el panel falla en cascada o queda con estado 'Cargando' permanente. | `Promise.all` global hacía fallar la vista completa ante el error de una sola métrica de API. | **`HU-035`** | **Must** | Propuesta Sprint 9 |
| **13** | `RIE-02` | Docx Pág. 10 | Riesgos | En la vista de Riesgos, los filtros por categoría ocultan categorías oficiales de la Gobernación que tienen 0 riesgos. | El frontend solo renderizaba opciones presentes en la respuesta en lugar del catálogo maestro DAFP. | **`HU-035`** | **Must** | Propuesta Sprint 9 |
| **14** | `DAS-01` | Docx Pág. 5 | Dashboard | La matriz de riesgos se desborda horizontalmente en pantallas portátiles, requiriendo scroll incómodo. | Contenedor rígido de ancho fijo en `RiskMatrix4x5.tsx` sin escala responsiva mediante CSS Flex/Grid. | **`HU-036`** | **Must** | Propuesta Sprint 9 |
| **15** | `RIE-01` | Docx Pág. 9 | Riesgos | Las tarjetas de recomendaciones y justificaciones residuales se cortan en sus extremos en resoluciones medias. | Componente de tarjetas predictivas con ancho superior al contenedor padre de Material UI. | **`HU-036`** | **Must** | Propuesta Sprint 9 |
| **16** | `EVA-03` | Docx Pág. 12 | Wizard Riesgos | La matriz de evaluación en el Paso 3 del Wizard no coincide visualmente con la del Dashboard principal. | Coexistencia de dos componentes divergentes (`RiskMatrix.tsx` 5x5 y `RiskMatrix4x5.tsx` 4x5). | **`HU-036`** | **Must** | Propuesta Sprint 9 |
| **17** | `ACT-01` | Docx Pág. 6 | Inventario Activos | El formulario de creación de activos solo pide datos básicos y no contempla las 28 columnas de la Gobernación. | El modelo `ActivoInformacion` en SQLAlchemy carece de campos como Marca, Modelo, Serial y Grupo Interno. | **`HU-037`** | **Must** | Propuesta Sprint 10 |
| **18** | `ACT-02` | Docx Pág. 7 | Inventario Activos | En el campo 'Responsable', se debe escribir el nombre a mano sin autocompletado sobre los usuarios del sistema. | El input era un `<TextField>` plano sin vinculación al endpoint `/api/usuarios`. | **`HU-037`** | **Must** | Propuesta Sprint 10 |
| **19** | `EVA-02` | Docx Pág. 11 | Inventario / Wizard | En la ficha de detalle de activo no existe acceso directo para iniciar una evaluación de riesgos sobre ese activo. | La tarjeta `ActivoDetailCard.tsx` no contaba con botón de acción contextual `"Evaluar Activo"`. | **`HU-037`** | **Must** | Propuesta Sprint 10 |
| **20** | `PDF-03` | PDF Pág. 2 | Inventario Activos | Se requiere clasificar los activos por Secretaría y Subsecretaría y calcular el promedio CIA (1 a 5). | El backend no almacena la escala numérica 1–5 para Confidencialidad, Integridad y Disponibilidad. | **`HU-037`** | **Must** | Propuesta Sprint 10 |
| **21** | `AUD-01` | Docx Pág. 16 | Auditoría | Los botones 'Ver Detalle' y 'Editar' en la tabla de auditorías no ejecutan ninguna acción visible al hacer clic. | Los botones tenían manejadores `onClick` vacíos o apuntaban a modales no instanciados en React. | **`HU-038`** | **Must** | Propuesta Sprint 10 |
| **22** | `EVA-05` | Docx Pág. 13 | Wizard Riesgos | El Wizard permite avanzar al siguiente paso incluso si los campos obligatorios del paso actual están vacíos. | La función `handleNext` no verificaba el estado de validación de los pasos intermedios. | **`HU-039`** | **Must** | Propuesta Sprint 10/11 |
| **23** | `EVA-06` | Docx Pág. 14 | Wizard Riesgos | El buscador de riesgos preexistentes en el Wizard no encuentra registros al digitar su nombre. | El `<Autocomplete>` consultaba la propiedad en minúscula `option.nombre`, pero el API retorna `'Nombre'`. | **`HU-039`** | **Must** | Propuesta Sprint 10/11 |
| **24** | `EVA-07` | Docx Pág. 14 | Wizard Riesgos | Al escribir en los campos de Amenaza y Vulnerabilidad, la pantalla salta automáticamente hacia arriba. | Cada cambio disparaba re-render del hook `useWizardAI` sin debounce, provocando `scrollIntoView` en el chat. | **`HU-039`** | **Must** | Propuesta Sprint 10/11 |
| **25** | `EVA-08` | Docx Pág. 15 | Wizard Riesgos | El guardado final de la evaluación toma demasiado tiempo y en ocasiones pierde los controles ISO asociados. | El cliente hacía hasta 7 llamadas secuenciales desincronizadas al guardar la evaluación. | **`HU-039`** | **Must** | Propuesta Sprint 10/11 |
| **26** | `PDF-05` | PDF Pág. 3 | Wizard Riesgos | Se requiere registrar la fase del ciclo de vida del riesgo según las guías del DAFP V7. | Ausencia de campos de fase metodológica en el esquema de base de datos de evaluación de riesgos. | **`HU-039`** | **Must** | Propuesta Sprint 10/11 |
| **27** | `PDF-06` | PDF Pág. 3 | Wizard Riesgos | Falta asociar amenazas y vulnerabilidades con el catálogo ISO/IEC 27005 en el paso de tratamiento. | Faltaba vincular la clave foránea del control ISO 27002 en la tabla de controles aplicados. | **`HU-039`** | **Must** | Propuesta Sprint 10/11 |
| **28** | `EVA-04` | Docx Pág. 12 | Wizard Riesgos | Al filtrar activos en el Paso 1, si hay más de 12 registros se rompe la visualización de la cuadrícula. | El contenedor grid carecía de paginación local y desbordaba el layout del Wizard. | **`HU-040`** | **Must** | Propuesta Sprint 11 |
| **29** | `REP-01` | Docx Pág. 17 | Reportes | En los reportes de riesgos, los gráficos de torta no muestran el porcentaje ni el nombre en los tooltips. | La configuración de `PieChart` en Recharts no formateaba las propiedades `value` y `name`. | **`HU-040`** | **Must** | Propuesta Sprint 11 |
| **30** | `REP-02` | Docx Pág. 17 | Reportes | No es posible filtrar el informe de riesgos por fecha de creación ni por responsable de forma combinada. | La vista `InformeRiesgos.tsx` enviaba filtros independientes sin soporte de consulta combinada. | **`HU-040`** | **Must** | Propuesta Sprint 11 |

---

## 3. Conclusión de la Auditoría de Fuentes
El 100% de los 30 hallazgos reportados por la Gobernación del Cauca (22 en `.docx` y 8 en `.pdf`) se encuentran plenamente categorizados, asociados a archivos específicos del código fuente e integrados en las 10 Historias de Usuario Must-Have (`HU-031` a `HU-040`) de Trabajo Integrador 3.
