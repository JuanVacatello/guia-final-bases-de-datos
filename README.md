# Guía para el final de Bases de Datos (ex Gestión de Datos), UTN FRBA

Material de estudio armado a partir de **41 finales (2018–2025)**, tus apuntes y la investigación de `INVESTIGACION-para-claude-code.md`.
Motor de la cátedra: **SQL Server / T-SQL**.

**Para estudiar, abrí `index.html` con doble clic.** Funciona sin servidor y sin instalar nada; en el celular también.

## Estado

| Etapa | Qué incluye | Estado |
|---|---|---|
| 1 | Análisis de los finales ([`analisis-finales.md`](analisis-finales.md)) | ✅ listo, con los finales 2025 |
| 2a | Sitio: inicio, plan de estudio y el tema Transacciones como muestra de estilo | ✅ listo |
| 2b | Los otros 12 temas por unidad, práctica SQL, finales resueltos, banco de V/F completo (176), 3 simulacros y `practica.sql` | ✅ listo |

## Qué hay en esta carpeta

```
guia/
├── index.html              ← EMPEZÁ ACÁ: cómo es el final, qué se toma y las 4 unidades
├── plan.html               ← plan de 4 semanas con casillas que se guardan
├── unidad-1/               ← Estructuras de datos
│   ├── grafos.html
│   └── estructuras.html        pilas, colas, listas, secuencial y linkeada
├── unidad-2/               ← Manipulación de datos
│   ├── arboles.html            árboles, ABB, barridos, Knuth (+ laboratorio ABB)
│   ├── arbol-b.html            árbol B y B+, split y fusión
│   ├── hashing.html            hashing e índices (+ laboratorio de tabla de hash)
│   ├── huffman.html            Huffman (+ laboratorio para comprimir tu texto)
│   └── ordenamiento.html
├── unidad-3/               ← Diseño de datos
│   ├── modelo-relacional.html  claves, integridad, álgebra, normalización
│   └── arquitectura.html       ANSI/SPARC y componentes del motor
├── unidad-4/               ← Bases de datos (toda la práctica sale de acá)
│   ├── transacciones.html
│   ├── objetos.html            constraints, triggers, vistas, SP y funciones
│   ├── sql.html                joins, NULL, precedencia, subconsultas, plan de ejecución
│   └── olap.html               OLTP, OLAP, Data Warehouse, ETL, estrella
├── practica/
│   ├── sql.html                método por tipo, trampas de la cátedra y plantillas T-SQL
│   ├── finales.html            prácticos 2023–2025 resueltos (solución oculta)
│   ├── banco-vf.html           los 176 V/F, filtrables, con +1 / −1 / 0
│   └── simulacros.html         3 exámenes con autocorrección
├── practica.sql            ← tablas de los finales + datos de prueba + todas las soluciones (SQL Server)
├── assets/
│   ├── estilos.css         ← diseño compartido (modo claro/oscuro automático)
│   ├── app.js              ← menú, ejercicios, banco, simulacros, progreso
│   ├── interactivos.js     ← laboratorios: ABB, Huffman y hashing
│   └── datos.js            ← generado desde datos/ (no editar a mano)
├── datos/
│   ├── finales.json        ← los 41 finales transcriptos: preguntas, temas, respuestas, fuente
│   └── vf.json             ← banco de V/F: 176 afirmaciones, cada una con su página y fuente
├── analisis-finales.md     ← PASO 1: qué se toma, con qué frecuencia y qué se repite
├── herramientas/           ← scripts internos: no hace falta abrirlos para estudiar
│   ├── generar_analisis.py     regenera analisis-finales.md
│   ├── plantilla-analisis.md   texto fijo del análisis
│   └── generar_datos_js.py     copia datos/*.json a assets/datos.js
└── README.md
```

## Cómo está armada cada página de tema

Siempre en el mismo orden, para que sepas dónde está cada cosa:

1. **🟦 En 30 segundos**: la idea en 4 líneas.
2. **Diagramas**: dibujos SVG que se ven en claro y en oscuro, sin internet.
3. **Tablas comparativas**.
4. **🟥 Trampas**: los V/F que ya salieron, con respuesta y por qué.
5. **🟪 Respuestas modelo**: como para escribir en el examen, en 15 renglones.
6. **🟩 Ejercitá**: ejercicios de finales con opciones, código para escribir y V/F con la regla +1 / −1 / 0.

Algunas páginas suman un **laboratorio** interactivo (armar un ABB, comprimir con Huffman, cargar una tabla de hash).

## Sobre el código SQL

No había SQL Server en la compu donde se armó la guía, así que el código se revisó a mano contra la sintaxis de SQL Server 2016 o posterior. Para probarlo, abrí `practica.sql` en SQL Server Management Studio o Azure Data Studio y ejecutá primero la parte 1 (crea la base `GuiaFinal` con datos de prueba).

Tu progreso (temas estudiados, casillas del plan, tema claro u oscuro) se guarda en el navegador.

## Cómo se marcan las respuestas

| Marca | Significa |
|---|---|
| ✅ oficial | La dio la cátedra (revisión, Moodle) o se deduce de la nota del examen corregido |
| ✔ | Todas las fuentes coinciden |
| ⚠️ polémica | Las fuentes se contradicen o tienen un error; se decidió razonando (siempre con la explicación) |
| ⬜ en blanco | No hay forma segura de decidir: en el final conviene no responderla |

## Si cambiás algo en `datos/`

Desde la carpeta `guia`:

```
python herramientas/generar_datos_js.py   # actualiza lo que muestran las páginas
python herramientas/generar_analisis.py   # actualiza analisis-finales.md
```
