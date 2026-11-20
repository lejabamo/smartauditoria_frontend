# SMARTAUDITORIA TI3 — GUION OFICIAL DE SUSTENTACIÓN ACADÉMICA (15 MINUTOS)
**Programa:** Maestría en Computación para el Desarrollo de Aplicaciones Inteligentes  
**Institución:** Universidad del Valle — Facultad de Ingeniería  
**Ponente:** Ing. Leonardo Javier Bastidas Moreno  
**Instancia:** Primera Sustentación / Avance 1 — Trabajo Integrador 3 (V4.0)  
**Fecha:** 20 de noviembre de 2026  
**Distribución del Tiempo:** 11.5 minutos de exposición oral + 3.5 minutos de demostración en vivo y navegación (15 min en total)  

---

## Estructura Temporal y Cronometría de la Sesión

| Bloque | Ventana Temporal | Diapositivas / Actividad | Duración | Foco Principal |
| :---: | :---: | :--- | :---: | :--- |
| **I** | 00:00 – 03:20 | Diapositivas 1 a 3 | 3.3 min | Contexto institucional, diagnóstico de operadores y priorización MoSCoW. |
| **II** | 03:20 – 06:40 | Diapositivas 4 a 6 | 3.3 min | Backlog candidato, arquitectura Smart BPMN y Release Plan balanceado. |
| **III** | 06:40 – 10:10 | Diapositivas 7 a 9 | 3.5 min | Avances locales de HU-031, HU-032, HU-033 y trazabilidad de 82 pruebas. |
| **IV** | 10:10 – 11:30 | Diapositiva 10 | 1.3 min | Compromisos inmediatos Gate G0.5 y ruta crítica hacia el 20 de diciembre. |
| **V** | 11:30 – 15:00 | Demostración en Vivo & Preguntas | 3.5 min | Navegación de la SPA, prueba de modal de inactividad, ErrorBoundary y Q&A. |

---

## Guion Discursivo Paso a Paso (Calibrado a 11.5 Minutos / ~1,480 Palabras)

### Minuto 00:00 – 01:10 | Diapositiva 1: Continuidad TI2 $\rightarrow$ TI3 y Objetivos de V4.0 (145 palabras)
> *"Muy buenos días a los miembros del comité evaluador de la Maestría en Computación para el Desarrollo de Aplicaciones Inteligentes de la Universidad del Valle. Presento el primer avance de Trabajo Integrador 3 para **SmartAuditorIA**, desarrollado junto a la Secretaría de Educación y Cultura de la Gobernación del Cauca.*
>
> *En Trabajo Integrador 2 consolidamos una línea base de 189 Story Points en estado Done en 7 sprints, con 136 SP aceptados formalmente y 53 SP bajo evaluación. El propósito de esta iteración final V4.0 es la consolidación operativa: cerrar las brechas identificadas en campo por los operadores, incorporar la plantilla oficial de 28 columnas y asegurar que SmartAuditorIA sea un producto terminado y listo para producción, alineado estrictamente con ISO/IEC 27001:2022, los 93 controles de ISO 27002 y las directrices del DAFP V7 y MIPG."*

---

### Minuto 01:10 – 02:15 | Diapositiva 2: Evaluación Real de Stiven, Kevin y Secretaría General (140 palabras)
> *"Esta iteración se sustenta en una evaluación de campo real y documentada tras el despliegue del software en el VPS de producción institucional. Recibimos dos insumos formales invaluables:*
>
> *Primero, el informe técnico de los operadores Stiven Fernández y Kevin Coca con 22 hallazgos concretos en torno a la carga masiva en Excel, la ergonomía del Wizard de riesgos y la visualización de reportes.*
>
> *Segundo, la matriz oficial de observaciones de la Secretaría General con 8 puntos críticos de seguridad, sesión y ortografía.*
>
> *Tras una auditoría minuciosa en los repositorios, comprobamos la reproducibilidad del 100% de estos 30 hallazgos en el código fuente, identificando con precisión los componentes de frontend y backend involucrados."*

---

### Minuto 02:15 – 03:20 | Diapositiva 3: Priorización de Hallazgos y Decisiones de Producto (145 palabras)
> *"Aplicando la técnica MoSCoW, establecimos un plan de acción riguroso y sostenible:*
>
> *Clasificamos como **Must-Have** 10 Historias de Usuario que concentran 59 Story Points. Estas historias resuelven el 100% de los bloqueos de los operadores: expiración de sesión por inactividad, soporte al formato `.xlsm` con macros, ficha con 28 columnas y escala CIA 1 a 5, y desacople del Wizard de evaluación.*
>
> *Por otra parte, la deuda técnica heredada de TI2 —representada por los tickets independientes SCRUM-46, 47 y 48 con 18 Story Points de CI/CD y RAG— fue clasificada responsablemente como **Should-Have condicionado**. Esto significa que se abordará de forma complementaria sin prometer su culminación en el sprint final, protegiendo así la entrega de las necesidades operativas de la entidad beneficiaria."*

---

### Minuto 03:20 – 04:30 | Diapositiva 4: Product Backlog y Nuevas Épicas / HU Candidatas (145 palabras)
> *"Bajo una rigurosa gobernanza ágil, estructuramos el Backlog de TI3 en 3 nuevas épicas oficiales:*
>
> *La **Épica 7**, orientada a Estabilización Operativa, Sesiones y Resiliencia; la **Épica 8**, dedicada a la Homologación MIPG/DAFP de Activos, Carga Masiva y Auditoría; y la **Épica 9**, enfocada en Calidad Visual, Ergonomía y Reportes.*
>
> *Es crucial destacar un principio de transparencia metodológica: las historias propuestas van de HU-031 a HU-040 y sus claves Jira asociadas se denominan formalmente como `[Candidato SCRUM-52..61]`. No han sido creadas de forma anticipada en Jira Cloud para salvaguardar el historial. Asimismo, se eliminó cualquier historia paraguas artificial, manteniendo SCRUM-46, 47 y 48 como tareas técnicas independientes para evitar cualquier doble conteo de puntos."*

---

### Minuto 04:30 – 05:40 | Diapositiva 5: Smart BPMN y Arquitectura Impactada (150 palabras)
> *"La solución responde a un flujo de valor de 5 fases modelado bajo la arquitectura **Smart BPMN** aprobada: Gobierno y Autenticación, Inventario Maestro de Activos, Evaluación de Riesgos en 8 Pasos, Monitoreo y Auditoría, y Asistencia RAG con 93 controles.*
>
> *En términos de persistencia real verificada en código y contenedores Docker, la base de datos relacional opera sobre **MariaDB 10.11 / MySQL en puerto 3306**, y la base vectorial para los 93 controles ISO 27002 corre sobre **ChromaDB 0.5.3**.*
>
> *Respecto a la matriz de riesgos, la auditoría reveló que la norma DAFP V7 aprueba una matriz de 5x5 con 4 zonas de riesgo, mientras que el Dashboard operativo actual implementó una matriz de 4x5 con 3 niveles que presenta desborde en laptops. Esta discrepancia técnica queda formalmente tipificada para ser homologada en la historia HU-036."*

---

### Minuto 05:40 – 06:40 | Diapositiva 6: Release Plan: Sprints Previstos del 23/11 al 18/12 (140 palabras)
> *"Para materializar el Backlog formulamos un Release Plan balanceado en **4 sprints futuros de una semana**, desde el 23 de noviembre hasta el 18 de diciembre de 2026, con validación final el 19 y 20 de diciembre:*
>
> *El **Sprint 8** aborda Estabilidad Core, Sesión y Resiliencia con 15 SP Must.*
> *El **Sprint 9** implementa la Carga Masiva `.xlsm` y paneles con 13 SP Must, asignando SCRUM-46 como trabajo condicionado.*
> *El **Sprint 10** incorpora las 28 columnas de activos, la matriz DAFP y reportes con 18 SP Must, vinculando SCRUM-47.*
> *Y el **Sprint 11** cierra con Auditorías y Wizard integral con 13 SP Must, ligando SCRUM-48.*
>
> *Esta distribución evita sobrecargas artificiales al cierre y se ajusta a una capacidad neta de 14 a 16 Story Points semanales."*

---

### Minuto 06:40 – 07:50 | Diapositiva 7: Avance HU-031: Sesiones, Implementación y Pruebas (150 palabras)
> *"En el marco preparatorio, realizamos un desarrollo local anticipado en validación sobre las tres historias del Sprint 8.*
>
> *La **HU-031** resuelve la vulnerabilidad de sesiones desatendidas mediante una doble barrera:*
> *En el cliente, `AuthContext.tsx` rastrea la actividad mediante listeners DOM; tras 14 minutos de inactividad, abre un modal con cuenta regresiva de 60 segundos, sincronizado entre pestañas vía `BroadcastChannel`.*
> *En el servidor, refactorizamos el decorador `@require_auth` para validar contra la tabla `sesiones_usuario` que la sesión no haya sido revocada ni haya expirado, retornando un `HTTP 401 Unauthorized` inmediato.*
> *Este avance cuenta con una prueba de integración en backend y dos pruebas unitarias en frontend, todas en verde, permaneciendo en validación local a la espera de pruebas en el VPS institucional."*

---

### Minuto 07:50 – 09:00 | Diapositiva 8: Avance HU-032 y HU-033: Codificación, Navegación y Validaciones (150 palabras)
> *"La **HU-032** erradica el mojibake mediante un barrido completo en 11 archivos TSX, restableciendo la ortografía normativa y ajustando el padding en el modal de planes de acción, blindado por un test guardián automatizado que verifica cero violaciones tipográficas en todo el frontend.*
>
> *Por su parte, la **HU-033** suprime el riesgo de pantallas en blanco implementando `RouteErrorBoundary.tsx` para aislar excepciones en rutas lazy y ofrecer una interfaz de recuperación. Además, en el Wizard de evaluación convertimos `getEvaluacionEstado` en una función pura, eliminando guardados prematuros dentro del ciclo de render y bloqueando el avance en el Paso 0 si no hay activo seleccionado.*
> *Ambas historias superaron exitosamente sus pruebas unitarias en Vitest y se mantienen como desarrollo local anticipado."*

---

### Minuto 09:00 – 10:10 | Diapositiva 9: Trazabilidad de Pruebas, Calidad y Estado de Aceptación (150 palabras)
> *"La solidez técnica del proyecto se sustenta en **82 pruebas automatizadas locales**, todas ejecutándose al 100% de éxito:*
>
> *En backend, disponemos de **46 pruebas en Pytest**, incluyendo autenticación, bulk upload, evaluación de riesgos y la nueva prueba de revocación de sesiones en servidor, ejecutadas en 7.73 segundos.*
> *En frontend, contamos con **36 pruebas en Vitest** a través de 6 suites de componentes, asistentes de IA, ErrorBoundary y el guardián ortográfico, completadas en 6.17 segundos.*
> *Asimismo, la compilación de producción con TypeScript y Vite finaliza en 12.97 segundos con **cero errores y cero advertencias de tipado**.*
> *Reiteramos con rigor metodológico que estos avances no se declaran como Done, sino como implementaciones locales listas para despliegue y validación con los operadores."*

---

### Minuto 10:10 – 11:30 | Diapositiva 10: Próximos Sprints, CI/CD, Integración de Servicios y Cierre V4.0 (160 palabras)
> *"Para finalizar, nuestra hoja de ruta inmediata contempla tres pasos clave:*
>
> *Primero, recibir la aprobación de este Gate G0.5-QC para dar de alta en Jira Cloud las historias oficiales e iniciar el registro de smart commits bajo la regla `AGENTS.md`.*
> *Segundo, arrancar el Sprint 8 el próximo 23 de noviembre, desplegando los avances de sesión, ortografía y resiliencia en el VPS.*
> *Y tercero, ejecutar secuencialmente los Sprints 9 a 11 para incorporar la carga masiva `.xlsm`, la ficha de 28 columnas y el Wizard consolidado, culminando el 20 de diciembre con la firma del acta de validación operativa con los operadores Stiven Fernández y Kevin Coca.*
>
> *A continuación, dedicaremos los siguientes 3 minutos y medio a navegar la interfaz local, comprobar los componentes y atender cualquier inquietud del comité evaluador. Muchas gracias."*

---

## Guía para el Bloque V: Demostración en Vivo y Navegación (Minuto 11:30 – 15:00)

1. **Apertura de la SPA Local (30 segundos):**
   - Mostrar la navegación fluida entre los módulos del menú lateral (`Dashboard`, `Activos`, `Evaluación`, `Riesgos`, `Auditoría`, `Reportes`).
   - Resaltar la ausencia total de pantallas en blanco y la correcta ortografía en acentos normativos.
2. **Demostración de HU-031 y HU-033 (1 minuto):**
   - Provocar la apertura del `IdleTimeoutModal` y verificar el temporizador regresivo de 60 segundos.
   - Mostrar la pantalla de recuperación amigable provista por `RouteErrorBoundary` ante excepciones.
3. **Inspección de Suites Automatizadas en Terminal (30 segundos):**
   - Ejecutar `npm test -- --run` (36 tests passed) y `pytest` (46 tests passed).
4. **Espacio para Preguntas del Jurado (1.5 minutos):**
   - Responder dudas técnicas de arquitectura, base de datos MariaDB o modelo de riesgos DAFP V7.
