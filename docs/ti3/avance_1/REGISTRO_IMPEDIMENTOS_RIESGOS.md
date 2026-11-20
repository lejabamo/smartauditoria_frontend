# SMARTAUDITORIA TI3 — REGISTRO DE IMPEDIMENTOS Y RIESGOS (V4.0)
**Maestría en Computación para el Desarrollo de Aplicaciones Inteligentes**  
**Universidad del Valle — Facultad de Ingeniería**  
**Autor:** Ing. Leonardo Javier Bastidas Moreno  
**Corte Académico:** 20 de noviembre de 2026 — Gate G0.5  

---

## 1. Matriz de Riesgos del Proyecto y Estrategias de Mitigación

| ID Riesgo | Categoría | Descripción del Riesgo | Impacto | Probabilidad | Nivel de Riesgo | Estrategia de Mitigación / Contingencia | Responsable |
| :---: | :--- | :--- | :---: | :---: | :---: | :--- | :---: |
| **R-01** | Técnico / Datos | Incompatibilidad estructural en la plantilla `.xlsm` oficial de la Gobernación (macros complejas, cabeceras en filas dinámicas). | **Alto** | **Media** | **MEDIO** | Implementar un parser inteligente multi-hoja con openpyxl que detecte la hoja `'1. ACTIVOS DE INFORMACIÓN'`, con previsualización dry-run y reporte granular de errores por fila/columna (`HU-034`). | Desarrollador / Arquitecto |
| **R-02** | Técnico / IA | Grounding impreciso o alucinaciones en el motor RAG al sugerir controles ISO 27002 fuera de contexto. | **Alto** | **Media** | **MEDIO** | Re-indexar los 93 controles en ChromaDB con metadatos normativos completos, manteniendo el fallback determinístico a base de datos relacional cuando la similitud vectorial sea inferior a 0.70 (`HU-041` / `SCRUM-47`). | Desarrollador / Ing. MLOps |
| **R-03** | Gestión / Tiempo | Ventana acotada de ejecución de 4 semanas (23 de noviembre al 20 de diciembre de 2026). | **Muy Alto** | **Alta** | **ALTO** | Priorización estricta bajo MoSCoW: blindar los 59 SP Must-Have para los operadores de la Gobernación y condicionar los 18 SP de deuda técnica TI2 a la capacidad remanente del Sprint 11. | Product Owner / Desarrollador |
| **R-04** | Operativo / Humano | Disponibilidad limitada de los operadores institucionales (Stiven Fernández y Kevin Coca) para sesiones de validación. | **Alto** | **Media** | **MEDIO** | Coordinar ventanas de validación funcional tempranas al cierre de cada sprint con listas de chequeo predefinidas y ambientes de prueba listos en el VPS. | Product Owner / Operadores |
| **R-05** | Seguridad / Confidencialidad | Fuga accidental de credenciales o secretos en repositorios o evidencias públicas. | **Crítico** | **Baja** | **MEDIO** | Política de cero secretos en código: desindexación permanente de `.env`, parametrización vía variables de entorno obligatorias y pre-commit hooks de auditoría (`.gitignore` auditado). | Auditor de Seguridad |

---

## 2. Registro Activo de Impedimentos (Blockers)

| ID | Fecha Detección | Módulo Afectado | Descripción del Impedimento | Impacto Operativo | Acción Correctiva / Estado |
| :---: | :---: | :--- | :--- | :--- | :--- |
| **IMP-01** | 2026-11-19 | Gobernanza Jira | Claves `SCRUM-49..62` aún no creadas en Jira Cloud. | Impide registrar commits definitivos con IDs oficiales de Jira. | **Mitigado localmente:** Se utiliza la convención provisional `[Candidato SCRUM-XX]` en `docs/agile/jira_import.csv` hasta la autorización formal de importación masiva. |
| **IMP-02** | 2026-11-19 | Despliegue VPS | Restricción de solo lectura local (prohibido push y deploy sin autorización). | Las historias `HU-031`, `HU-032` y `HU-033` no pueden validarse en producción. | **Bajo control:** Se mantiene el desarrollo en validación local anticipada con 82 pruebas automatizadas en verde hasta aprobación de Gate G0.5. |
| **IMP-03** | 2026-11-19 | Datos Institucionales | Ausencia de diccionario de datos formal para las 28 columnas de la Gobernación del Cauca. | Riesgo de tipos de datos divergentes en el modelo de BD. | **En resolución:** Se extrajo la estructura directamente de `Levantamiento de Activos de Información y Riesgos - Prueba.xlsm` para consolidar el esquema en `HU-037`. |

---

## 3. Plan de Monitoreo y Contingencia

1. **Revisión Semanal de Riesgos:** Al inicio de cada sprint (lunes 08:00 AM) se reevaluará la probabilidad e impacto de cada riesgo.
2. **Umbral de Alerta de Capacidad:** Si al cierre del Sprint 9 el avance es inferior a 28 SP acumulados, se activará de inmediato la poda de alcance no esencial, priorizando exclusivamente `HU-034`, `HU-037` y `HU-039`.
3. **Puntos de Control de Calidad:** Ninguna historia pasará a estado de validación con operadores si no cuenta con sus pruebas automatizadas unitarias ejecutadas al 100% en local.
