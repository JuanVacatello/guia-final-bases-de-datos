# Análisis de finales · Bases de Datos (ex Gestión de Datos) · UTN FRBA

> **Paso 1 de la guía.** Base: **{{N_FINALES}} finales (2018–2025)** con enunciado, más una pregunta suelta de Moodle.
> Datos en [`datos/finales.json`](datos/finales.json) · generado el {{GENERADO}} con `python herramientas/generar_analisis.py`.

---

## En 30 segundos

- **El formato no cambió desde 2018** (salvo los finales virtuales de 2021): 2 V/F, 2 preguntas para desarrollar y 2 prácticos. La materia ahora se llama **Bases de Datos** y los finales de 2025 siguieron igual.
- **Teoría:** lo que más se pregunta es **transacciones/aislamiento** ({{T_transacciones}} de {{N_TEORIA}}). **En 2023–2025 lo más preguntado fue OLTP/OLAP/DW** ({{TR_olap}} de {{N_TEORIA_REC}}), pegado a transacciones ({{TR_transacciones}}) y hashing/índices ({{TR_hashing}}).
- **V/F:** lo que más sale son los **objetos de BD** (CHECK, UNIQUE, triggers, vistas, funciones): {{VF_integridad}} de {{N_VF}}. Después **árboles y Huffman** ({{VF_arboles}}; Huffman solo, {{N_HUFFMAN}}).
- **Práctica:** A «qué devuelve» {{PR_A}} · B «escribir query» {{PR_B}} · C «trigger/objetos» {{PR_C}} · D «concurrencia» {{PR_D}}.
- **La cátedra recicla:** hashing vs árbol B salió {{K_hashing_vs_arbolb}} veces; ACID, grafos, niveles de aislamiento y OLTP vs OLAP, {{K_acid}} veces cada una.
- **Tus apuntes tienen errores y contradicciones** (Huffman, Heapsort, hash vs B+). Los marqué abajo y en la guía van con ⚠️.

---

## 1. Qué material hay

{{RESUMEN_FUENTES}}

- **Cómo los leí:** PDF con texto (pdftotext), PDF escaneados y fotos (lectura de imagen), `.docx` (extracción de texto e imágenes en orden), `.txt`, `.sql` y `.py`. Los `.url` no se usaron.
- **Finales 2025:** salen de `INVESTIGACION-para-claude-code.md` y de los hilos de UTNianos que cita (leídos el 19/11/2026). Son transcripciones de alumnos; en el del 18/02 el texto de los V/F está en una imagen que no se pudo leer.
- **Calidad:** 2 finales de 2024 están **reconstruidos de memoria** (27/02 y 10/12; al de 10/12 le falta un V/F). Hay 2 finales de 2022 **sin fecha** (los llamo A y B).
- **No son finales, pero los usé para respuestas:** `Resumen GGDD.pdf` (con su tabla de V/F), `Teóricas GDD.pdf`, `VF y desarrollables reinosa`, el banco `[teoria]-respuestas-vof-desarrollo.py`, `Finales Teoria.docx`, `Resumen Aislamientos.pdf`, `QUERYS PRACTICAS.sql`, `algunos practicos resueltos.txt`, `Guias resueltas GDD.txt` (guía práctica de la cursada) y el libro *Estructuras de Datos* de UTN (Ing. S. Pérez, basado en Pfaltz) para las definiciones de árboles.
- **Leyenda de respuestas:** ✅ oficial (cátedra, Moodle o nota del examen corregido) · ✔ las fuentes coinciden · ⚠️ polémica (fuentes en conflicto: decidí razonando) · ⬜ conviene dejarla en blanco.

---

## 2. Novedades: materia nueva y finales 2025

- **Ahora es «Bases de Datos» (plan K23).** El programa es el mismo de Gestión de Datos, en 4 unidades (tabla de abajo), y los finales de 2025 mantienen el formato y la línea de preguntas.
- **Se confirma el patrón** en los {{N_FINALES_2025}} finales de 2025: aislamiento y bloqueos, ACID, constraints, grafos y joins en teoría; País-Provincia-Ciudad, autorreferencias, producto cartesiano, LEFT JOIN anulado y precedencia AND/OR en la práctica.
- **Temas nuevos o que vuelven:** **plan de ejecución** (2020 y 11/02/2025), **vistas como solución práctica** (11/02/2025) y **constraints con 3 ejemplos** (29/07/2025).
- **Formato 2025:** dan **5 minutos para leer** el examen y decidir si rendir. El 29/07/2025 los **V/F fueron sin justificar**. Prepará las dos versiones: respuesta sola y justificación de una línea.
- **Consejos repetidos en el foro:** dejar los V/F para el final y no contestar si dudás; «vayan por las teóricas, siempre preguntan lo mismo».
- **Apuntes oficiales de la cátedra** (sitio de Google: Apuntes): Árboles, Teoría de Grafos, Métodos de Clasificación, **Transacciones y Niveles de Aislamiento**, DW/DM/OLAP, T-SQL para SQL Server, Introducción a PL-SQL, Arquitectura de Aplicaciones y BDOO. Los PDFs piden iniciar sesión: si los bajás, los sumo.

### ¿Qué unidades del programa se toman?

{{TABLA_UNIDADES}}

- La práctica (3.a/3.b) es siempre SQL y T-SQL: **unidad 4**.
- **Casi no se toman:** normalización, entidad-relación, NoSQL y seguridad. Alcanza con un repaso corto.

---

## 3. Cómo es el final (verificado)

| Parte | Puntaje | Qué es | Qué muestran los finales |
|---|---|---|---|
| **1.a / 1.b** | +1 bien · **−1 mal** · 0 en blanco | Verdadero o Falso | Igual en todos los presenciales 2018–2025. |
| **2.a / 2.b** | 2 c/u | Teoría para desarrollar | Límite variable: **10, 15, 20 o 30 renglones**, o «una carilla». |
| **3.a / 3.b** | 2 c/u | Práctica (SQL / T-SQL) | A veces numerados «3» y «4». |
| **Aprobación** | ≥ **6 puntos** | y **al menos un práctico correcto** | Algunos dicen «tener el ejercicio práctico aprobado». |
| **Motor** | — | «especificar de qué motor se trata» | Aclarar **SQL Server / T-SQL** en cada código. |

- **El −1 pesa:** el 22/12/2022 un alumno erró los dos V/F y terminó con **2** puntos totales. El 23/07/2024 otro dejó un V/F **en blanco** y aprobó con 8.
- **Excepción, 2021 (virtual, Moodle):** 2 V/F de 1 punto, 1 multiple choice de 3 puntos y 1 código de 5 puntos, sin teoría para desarrollar.

---

## 4. Ranking de temas

### 4.1 Teoría para desarrollar (2.a / 2.b)

{{N_TEORIA}} preguntas en {{N_TEORIA_FINALES}} finales. La última columna cuenta solo 2023–2025 ({{N_TEORIA_REC}} preguntas).

{{RANKING_TEORIA}}

- **Con los 4 primeros temas cubrís {{TOP4_TEORIA}}** de las preguntas de desarrollo.
- **Tendencia:** OLTP/OLAP/DW no salió como desarrollo entre 2018 y 2022, y en 2023–2025 es **el tema más preguntado** ({{TR_olap}} de {{N_TEORIA_REC}}).
- Integridad/objetos bajó en teoría, pero sigue primero en los V/F.
- Árboles casi no se desarrolla: cuando sale es **Árbol B vs ABB**, **split y fusión** o **representación estática**.

### 4.2 Verdadero / Falso

{{N_VF}} afirmaciones: **{{N_F}} Falsas y {{N_V}} Verdaderas** ({{N_SIN_TEXTO_VF}} con el enunciado incompleto).

{{RANKING_VF}}

- Los **objetos de BD** son el tema #1 de los V/F: CHECK, UNIQUE con NULL, cantidad de triggers por evento, insert en vistas, funciones sin DML.
- **Huffman** solo ya son {{N_HUFFMAN}} afirmaciones: es el tema puntual más repetido.

### 4.3 Prácticos

{{N_PRACTICA}} ejercicios (incluye los de Moodle 2021). Columnas por año = cantidad de ejercicios de ese tipo.

{{RANKING_PRACTICA}}

**Modelos de datos que se repiten:**

{{MODELOS}}

### 4.4 Lo que creías vs. lo que muestran los finales

| Lo que sabías | Qué muestran los finales | |
|---|---|---|
| Formato fijo 1 · 2 · 3 | Igual en 2018–2025; solo 2021 fue distinto (virtual). | ✔ |
| +1 / −1 / 0 en blanco | Confirmado con exámenes corregidos. | ✔ |
| 6 puntos y un práctico correcto | Confirmado. | ✔ |
| Indicar el motor | Lo piden en casi todos. | ✔ |
| Orden de teoría: transacciones > hashing > integridad > OLTP/OLAP > grafos > árboles > ordenamiento > ANSI/joins | Casi exacto: {{T_transacciones}} · {{T_hashing}} · {{T_integridad}} · {{T_olap}}; ANSI/joins/SQL ({{T_relacional}}) supera a grafos ({{T_grafos}}) y árboles queda último ({{T_arboles}}). **En 2023–2025 OLTP/OLAP pasó al primer lugar.** | ≈ |
| V/F: árboles, Huffman, hashing, aislamiento | Correcto, pero **el #1 son los objetos de BD** ({{VF_integridad}}). Árboles+Huffman {{VF_arboles}}, aislamiento {{VF_transacciones}}, hashing {{VF_hashing}}. | ≈ |
| 4 tipos de práctico | Confirmado: A {{PR_A}} · B {{PR_B}} · C {{PR_C}} · D {{PR_D}}. | ✔ |
| Modelos País→Provincia→Ciudad y Persona | Confirmado, y hay dos más igual de frecuentes: **Producto/Stock/Depósito** y **tabla de números**. | ✔+ |

---

## 5. Patrones que se repiten

### 5.1 Preguntas recicladas

{{RECICLADAS}}

### 5.2 V/F: reglas que salen de los datos

1. **Absolutos** («siempre», «nunca», «el único», «todo», «cualquier», «solo»): **{{N_ABS_F}} de {{N_ABS}} fueron Falsos.** Excepción que salió **{{K_check_trigger}} veces**: «un CHECK siempre puede ser reemplazado por un trigger» → **V**.
2. **Si dudás, en blanco.** Un error resta lo mismo que suma un acierto. Hacelos al final.
3. **Huffman, los 6 hechos que se preguntan:** nodos = 2·hojas − 1 (impar) · el árbol es «completo» · N niveles → códigos de hasta N − 1 bits · 15 bits → 16 niveles · hojas al mismo nivel → misma longitud · no todos los códigos quedan en menos de 8 bits.
4. **Respondé como SQL Server:** UNIQUE admite **un** NULL · varios triggers AFTER por evento, pero **un solo INSTEAD OF** · las funciones no hacen INSERT/UPDATE/DELETE · una query sin filas no cancela nada · una subconsulta con EXISTS puede traer varias columnas.
5. **«Completo» según la cátedra** = cada nodo tiene 0 o 2 hijos (ver 5.8).

### 5.3 Práctico A («¿qué devuelve?»): las trampas favoritas

| Trampa | Resultado | Salió |
|---|---|---|
| Producto cartesiano con una tabla vacía | **Conjunto vacío** (ni siquiera COUNT = 0) | 26/02/19, 04/12/19, 11/02/25 |
| Self-join con `<` o `>` | Pares distintos: N(N−1)/2 filas; MIN/MAX dan el **2º menor / 2º mayor** | 09/09/22, 27/09/23, 05/03/24, 18/02/25 |
| Precedencia lógica: `1=1 OR x AND y` | **AND se evalúa antes que OR**: el WHERE es siempre verdadero | 22/02/23, 18/02/25 |
| LEFT JOIN seguido de un JOIN sobre la tabla opcional | El JOIN **anula** el LEFT JOIN | 03/12/24, 29/07/25 |
| COUNT(*) vs COUNT(col) vs COUNT(DISTINCT) con joins | Cuenta filas del join, no entidades | 17/07/18, 2022 B, 23/05/23, 17/12/24 |
| OUTER JOIN + GROUP BY | Aparece un **grupo NULL** → «como máximo N + 1» | 20/02/24 (×2) |
| TOP n con valores duplicados | El IN trae todas las copias: 10 a 11 filas | 07/03/23 |
| MAX de una tabla vacía + 1 | NULL + 1 = **NULL** | 09/09/22 |
| Vista con UNION sin NOT EXISTS | Duplica usuarios: no devuelve lo pedido | 12/03/18, Moodle 2021 ×3 |
| Script DML con UNIQUE, UPDATE masivo y COMMIT suelto | Solo falla el COMMIT (no hay BEGIN TRAN) | 22/02/23 |
| GROUP BY de una columna que no existe | **Error de compilación** | 27/02/24 |

### 5.4 Práctico B (escribir la query): esqueletos que vuelven

- **Autorreferencia (Persona, Empleado-jefe):** abuelo = 2 joins; hijos por padre = GROUP BY padre; LEFT JOIN si piden «todas las personas».
- **«Los que no tienen…»** (países sin ciudades): NOT EXISTS con la cadena de joins adentro.
- **«El/los que más/menos»:** no alcanza TOP 1 (empates) → filtrar por `= MAX(...)` o usar `TOP 1 WITH TIES`.
- **Primeros N y últimos N:** dos TOP (ASC y DESC) unidos con IN/OR o UNION ALL.
- **«En más de la mitad de los depósitos»:** `HAVING COUNT(...) > (SELECT COUNT(*) FROM deposito) / 2.0`.
- **Respuesta en forma de vista** (11/02/25): CREATE VIEW + alias en cada columna; nada de ORDER BY adentro.
- **«Ninguna columna en NULL»:** ISNULL/COALESCE; el texto («No posee…», «LIBRE») solo en columnas de texto.
- **Prohibiciones del enunciado** (sin subconsultas en el FROM, sin cursores, sin vistas): leelas antes de escribir.

### 5.5 Práctico C (trigger/objetos): frases gatillo

| Si el enunciado dice… | Hacé… |
|---|---|
| «la regla se cumple actualmente y la base es accedida por n aplicaciones» | La regla va **en el motor**: trigger AFTER (INSERT/UPDATE y lo que corresponda en la otra tabla) con `IF EXISTS (...) ROLLBACK`. |
| «poder borrar X con un comando DELETE» | **INSTEAD OF DELETE** que borra primero los hijos y después X, **multifila**. Un SP no vale (cátedra, 30/07/24). |
| «posee un trigger INSTEAD OF que no puede modificarse» | Usar **AFTER**: hay un solo INSTEAD OF por evento. |
| «sin alterar la estructura / sin usar FK» | Triggers en **las dos tablas** (padre e hija). |
| «valores no nulos únicos» | Trigger: UNIQUE admite un solo NULL. |
| «no se conoce la profundidad de la jerarquía» | **CTE recursiva** (o función recursiva). El corrector bajó a 1/5 una solución sin recursión. |
| Siempre | Pensarlo **multifila**: nada de `SELECT @x = col FROM inserted` sin cursor. |

### 5.6 Práctico D (concurrencia): el esqueleto

| Situación | Qué pasa |
|---|---|
| A y B leen la misma fila en **RR o SERIALIZABLE** y después la actualizan | **Deadlock**: el motor mata a uno y queda el valor del otro. |
| A en RR y B en READ COMMITTED (B lee y suelta) | A actualiza; B espera el bloqueo de A y escribe último → queda **el valor de B**. |
| A inserta una PK y B inserta la misma (en cualquier nivel) | B espera; cuando A confirma, **B falla por PK**. |
| READ UNCOMMITTED | Lee datos sin confirmar, pero **sus escrituras sí se bloquean**. |
| «Leo, verifico y después actualizo» con READ COMMITTED | Dos procesos validan el mismo stock → **stock negativo**. |
| ROLLBACK después del COMMIT | No deshace nada (da error: no hay transacción abierta). |
| Lo que hizo mi propia transacción | **Siempre lo veo**, en cualquier nivel. |

### 5.7 «Sin errores de sintaxis» no significa «sin errores»

La cátedra mete errores que **no son de sintaxis** y los cuenta:

- INSERT con **3 columnas y 4 valores** (30/07/24, respuesta oficial «Ninguna»).
- UPDATE sobre la tabla **`product`** cuando la tabla es `producto` (Moodle 2021, oficial «Ninguna»; repetido el 22/02/23).
- `GROUP BY p.idpcia` cuando PAIS **no tiene** esa columna (27/02/24).
- **COMMIT sin BEGIN TRANSACTION** (22/02/23).
- **Función con UPDATE** (04/12/19): una función no puede modificar tablas.
- `varchar + 1` → conversión implícita que falla si el texto no es numérico (27/09/23).

**Regla:** leé los nombres de tablas y columnas letra por letra. Si ves un error y las opciones no lo contemplan, elegí «Ninguna» y justificá.

### 5.8 Vocabulario de la cátedra (cambia respuestas de V/F)

Definiciones del libro de Estructuras de Datos de UTN (Pérez, basado en Pfaltz), que usa el mismo vocabulario que la cátedra:

| Término | Definición | Ojo |
|---|---|---|
| **Árbol** = **árbol principal derecho** | «Los términos árbol y árbol principal derecho son sinónimos»: todo nodo sale de un único punto principal (la raíz) | Por eso «el B+ es un árbol principal derecho balanceado» es **V**. |
| Árbol **completo** | «\|R(y)\| = n para todos los puntos no maximales»: cada nodo interno tiene exactamente n hijos (binario: 2) | En binario da **cantidad impar** de nodos. En inglés «complete» es otra cosa. |
| Árbol **lleno** | Completo + todas las hojas «a la misma profundidad» | «Todos los niveles llenos» = lleno, no completo (23/07/24). |
| **Balanceado** | En cada nodo, los dos subárboles difieren en a lo sumo 1 nodo | |
| **AVL** | En cada nodo, las **alturas** de los subárboles difieren en a lo sumo 1 | |
| **Niveles** en Huffman | La raíz cuenta como nivel 1 | N niveles → códigos de hasta N − 1 bits. |
| **Grado** | De un nodo: cantidad de hijos. Del árbol: el máximo | Árbol B: un **nodo** con k claves tiene k+1 hijos. |
| **Transformada de Knuth** | Pasa cualquier árbol n-ario a binario (primer hijo + hermano) | Así se le puede aplicar el barrido simétrico. |

---

## 6. Contradicciones en tus apuntes (adelanto)

En la guía cada una va marcada con ⚠️ y su explicación. Las más importantes:

| Afirmación o ejercicio | Qué dicen tus fuentes | Qué usamos | Por qué |
|---|---|---|---|
| «Conviene buscar por una clave en hash que en B+» (30/07/24) | Teóricas: V | **F** ✅ | Respuesta oficial. Hashing gana solo en búsqueda puntual de **clave única**. Con «clave única existente» (04/12/19) es V. |
| Huffman «se basa en un árbol binario completo» | Resumen y banco: F | **V** ✅ | Dos correcciones oficiales. «Completo» = 0 o 2 hijos. |
| «El B+ es un árbol principal derecho balanceado» | Teóricas: F · otra resolución: V | **V** | Libro de UTN: «árbol» y «árbol principal derecho» son sinónimos; el B+ es balanceado. |
| Los nodos de Huffman son siempre impares | Resumen GGDD dice F **y** V | **V** | n = 2·hojas − 1. |
| Heapsort: misma complejidad para cualquier orden de los datos | Resumen GGDD dice F **y** V | **V** | O(n log n) en todos los casos. |
| «Heapsort mejora con datos semiordenados» | Resumen GGDD (teoría) | **Falso** | Heapsort no aprovecha el orden previo. |
| Palabra capicúa → código de Huffman capicúa | Teóricas y una resolución: V · otro banco: F | **F** | ABCBA → 11010011, que al revés es 11001011. |
| Todo grafo de grado 2 es un árbol binario | «VF Reinosa (chequeados)»: V | **F** ✅ | Oficial (16/12/22). Un triángulo tiene grado 2. |
| Datamining: «…y reglas de inducción» | Dos bancos: V | **F** ✅ | Moodle 2021: «las reglas de inducción no son técnicas de DataMining». |
| QuickSort: su complejidad varía según cómo vengan los datos | Un banco: F | **V** ✅ | Oficial (Moodle 2021): O(n log n) a O(n²). |
| Las funciones de hash no tienen inversa | Un banco: F | **V** | Muchas claves caen en la misma posición: no se puede volver atrás. |
| READ COMMITTED: al modificar siempre hay bloqueo exclusivo | Teóricas: F | **V** | Toda escritura toma bloqueo exclusivo hasta el COMMIT. |
| Árbol B: el tiempo de acceso depende en parte del tamaño de la clave | Dos bancos: F | **V** | Clave más chica → más claves por nodo → menos niveles. La cátedra lo preguntó así el 03/12/24. |
| Los índices solo sirven para ganar velocidad | Dos bancos: V · Resumen: F | **F** | Un índice UNIQUE garantiza unicidad. |
| Si falla el trigger de INSERT, la fila no queda | Un banco: F · Resumen: V | **V** | Evento y trigger son atómicos. |
| «Un árbol binario con 4 nodos nunca puede ser completo» | Bancos: F | **V** | Con la definición del libro, un árbol binario completo tiene cantidad impar de nodos. |
| «Árbol B con N claves → grado N+1» | Resumen: V **y** F | **F** | Eso vale para un **nodo**, no para el árbol. |
| HAVING solo se usa con GROUP BY | VF Reinosa: V | **F** | T-SQL acepta HAVING sin GROUP BY. |
| No se pueden crear índices en vistas | Banco: V | **F (SQL Server)** | Existen las vistas indexadas. |
| UNIQUE «permite tantos NULL como se quiera» | Resumen (justificación) | **Uno solo** | En SQL Server. |
| «INSERT/UPDATE/DELETE bloquean compartido» | Resumen Aislamientos | **Exclusivo** | Las escrituras toman bloqueo exclusivo. |
| 17/07/18 3.a (COUNT con LEFT JOIN) | Dos resoluciones: C | **B** | C exigiría al menos un empleado. |
| 20/02/24 3.a (RIGHT JOIN + GROUP BY) | Resolución: máximo N | **Máximo N + 1** | Falta contar el grupo NULL. |
| 03/12/24 3.a (laboratorio) | El alumno marcó d | **c** | El JOIN anula el LEFT JOIN. |
| 22/02/23 3.b (SERIALIZABLE, tabla `product`) | Resolución: deadlock | **Ninguna** | Clave oficial del mismo ejercicio en 2021. |
| 25/07/23 3.a (primer hueco) | Resoluciones de alumnos | **Corregida** | No contemplan que falte la clave 1. |
| 02/03/22 3.b (stock negativo) | «Subir a Repeatable Read» | **UPDATE atómico + CHECK** | Repeatable Read cambia el negativo por deadlocks. |
| 11/02/25 3.b (vista de jefes) | Solución del foro | **Corregida** | COUNT(*) con columnas sin GROUP BY no compila. |

---

## 7. Tabla resumen: una fila por final

Hacé clic en la fecha para ir al detalle.

{{TABLA_RESUMEN}}

---

## 8. Detalle: una tabla por final

{{DETALLE}}

---

## 9. Qué significa para estudiar

1. **La práctica decide el final:** vale 4 puntos y tenés que aprobar al menos un ejercicio. Prioridad: **A y B** ({{N_PR_AB_PCT}}% de los ejercicios), después **D** (concurrencia: siempre el mismo esqueleto) y **C** (5 plantillas de trigger).
2. **Teoría:** con respuestas modelo de **transacciones, hashing/índices, objetos de integridad y OLTP/OLAP** cubrís la mayoría. Sumá grafos, joins y plan de ejecución, ordenamiento, ANSI/SPARC y árbol B vs ABB, que son cortos.
3. **V/F:** banco con todas las afirmaciones de tus archivos, sin repetir, con la regla +1/−1/0 y las polémicas marcadas.
4. **Simulacros** con preguntas reales: el reciclaje hace que muchas vuelvan textuales.
