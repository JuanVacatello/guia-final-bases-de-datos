# Análisis de finales · Bases de Datos (ex Gestión de Datos) · UTN FRBA

> **Paso 1 de la guía.** Base: **41 finales (2018–2025)** con enunciado, más una pregunta suelta de Moodle.
> Datos en [`datos/finales.json`](datos/finales.json) · generado el 19/11/2026 con `python herramientas/generar_analisis.py`.

---

## En 30 segundos

- **El formato no cambió desde 2018** (salvo los finales virtuales de 2021): 2 V/F, 2 preguntas para desarrollar y 2 prácticos. La materia ahora se llama **Bases de Datos** y los finales de 2025 siguieron igual.
- **Teoría:** lo que más se pregunta es **transacciones/aislamiento** (18 de 74). **En 2023–2025 lo más preguntado fue OLTP/OLAP/DW** (9 de 44), pegado a transacciones (8) y hashing/índices (7).
- **V/F:** lo que más sale son los **objetos de BD** (CHECK, UNIQUE, triggers, vistas, funciones): 22 de 79. Después **árboles y Huffman** (21; Huffman solo, 10).
- **Práctica:** A «qué devuelve» 28 · B «escribir query» 24 · C «trigger/objetos» 19 · D «concurrencia» 12.
- **La cátedra recicla:** hashing vs árbol B salió 6 veces; ACID, grafos, niveles de aislamiento y OLTP vs OLAP, 5 veces cada una.
- **Tus apuntes tienen errores y contradicciones** (Huffman, Heapsort, hash vs B+). Los marqué abajo y en la guía van con ⚠️.

---

## 1. Qué material hay

| Año | Finales | Formato | De dónde salen |
|---|---|---|---|
| 2018 | 3: 21/02/2018, 12/03/2018, 17/07/2018 | presencial | finales 2018, finales 2023 y algunos antes |
| 2019 | 4: 12/02/2019, 26/02/2019, 25/09/2019, 04/12/2019 | presencial | finales 2019 |
| 2020 | 1: 26/02/2020 | presencial | finales 2020 |
| 2021 | 5: 10/03/2021, 22/06/2021, 02/08/2021, 23/09/2021, s/f (Moodle) | virtual | finales 2021, finales 2023 y algunos antes |
| 2022 | 7: 02/03/2022, 09/09/2022, 2022 (s/f, A), 2022 (s/f, B), 06/12/2022, 16/12/2022, 22/12/2022 | presencial | finales 2023 y algunos antes |
| 2023 | 9: 22/02/2023, 28/02/2023, 07/03/2023, 23/05/2023, 25/07/2023, 01/08/2023, 27/09/2023, 05/12/2023, 12/12/2023 | presencial | finales 2023 y algunos antes |
| 2024 | 10: 20/02/2024, 27/02/2024, 05/03/2024, 04/2024 (especial), 23/07/2024, 30/07/2024, 18/10/2024, 03/12/2024, 10/12/2024, 17/12/2024 | presencial | finales 2024 |
| 2025 | 3: 11/02/2025, 18/02/2025, 29/07/2025 | presencial | INVESTIGACION-para-claude-code.md + hilo de UTNianos |

- **Cómo los leí:** PDF con texto (pdftotext), PDF escaneados y fotos (lectura de imagen), `.docx` (extracción de texto e imágenes en orden), `.txt`, `.sql` y `.py`. Los `.url` no se usaron.
- **Finales 2025:** salen de `INVESTIGACION-para-claude-code.md` y de los hilos de UTNianos que cita (leídos el 19/11/2026). Son transcripciones de alumnos; en el del 18/02 el texto de los V/F está en una imagen que no se pudo leer.
- **Calidad:** 2 finales de 2024 están **reconstruidos de memoria** (27/02 y 10/12; al de 10/12 le falta un V/F). Hay 2 finales de 2022 **sin fecha** (los llamo A y B).
- **No son finales, pero los usé para respuestas:** `Resumen GGDD.pdf` (con su tabla de V/F), `Teóricas GDD.pdf`, `VF y desarrollables reinosa`, el banco `[teoria]-respuestas-vof-desarrollo.py`, `Finales Teoria.docx`, `Resumen Aislamientos.pdf`, `QUERYS PRACTICAS.sql`, `algunos practicos resueltos.txt`, `Guias resueltas GDD.txt` (guía práctica de la cursada) y el libro *Estructuras de Datos* de UTN (Ing. S. Pérez, basado en Pfaltz) para las definiciones de árboles.
- **Leyenda de respuestas:** ✅ oficial (cátedra, Moodle o nota del examen corregido) · ✔ las fuentes coinciden · ⚠️ polémica (fuentes en conflicto: decidí razonando) · ⬜ conviene dejarla en blanco.

---

## 2. Novedades: materia nueva y finales 2025

- **Ahora es «Bases de Datos» (plan K23).** El programa es el mismo de Gestión de Datos, en 4 unidades (tabla de abajo), y los finales de 2025 mantienen el formato y la línea de preguntas.
- **Se confirma el patrón** en los 3 finales de 2025: aislamiento y bloqueos, ACID, constraints, grafos y joins en teoría; País-Provincia-Ciudad, autorreferencias, producto cartesiano, LEFT JOIN anulado y precedencia AND/OR en la práctica.
- **Temas nuevos o que vuelven:** **plan de ejecución** (2020 y 11/02/2025), **vistas como solución práctica** (11/02/2025) y **constraints con 3 ejemplos** (29/07/2025).
- **Formato 2025:** dan **5 minutos para leer** el examen y decidir si rendir. El 29/07/2025 los **V/F fueron sin justificar**. Prepará las dos versiones: respuesta sola y justificación de una línea.
- **Consejos repetidos en el foro:** dejar los V/F para el final y no contestar si dudás; «vayan por las teóricas, siempre preguntan lo mismo».
- **Apuntes oficiales de la cátedra** (sitio de Google: Apuntes): Árboles, Teoría de Grafos, Métodos de Clasificación, **Transacciones y Niveles de Aislamiento**, DW/DM/OLAP, T-SQL para SQL Server, Introducción a PL-SQL, Arquitectura de Aplicaciones y BDOO. Los PDFs piden iniciar sesión: si los bajás, los sumo.

### ¿Qué unidades del programa se toman?

| Unidad del programa | Teoría 2018–2025 | Teoría 2023–2025 | V/F |
|---|---|---|---|
| **1.** Estructuras de datos (grafos, pilas, colas, listas, árboles; representación estática y dinámica) | 7 | 4 | 3 |
| **2.** Manipulación de datos (ordenamiento, búsqueda, árboles binarios y n-arios, árbol B, hashing, Huffman, encriptamiento) | 21 | 14 | 37 |
| **3.** Diseño de datos (modelo relacional, ER, claves, normalización, arquitectura ANSI/SPARC, cliente-servidor) | 3 | 1 | 2 |
| **4.** Bases de datos (tipos de BD, SQL y T-SQL, transacciones y concurrencia, integridad, seguridad, recuperación, DW/OLAP) | 43 | 25 | 37 |

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

74 preguntas en 37 finales. La última columna cuenta solo 2023–2025 (44 preguntas).

| # | Tema | 2018–2024 | % | 2023–2025 |
|---|---|---|---|---|
| 1 | Transacciones, ACID, aislamiento y bloqueos | ████████████████████ 18 | 24% | 8 |
| 2 | Hashing vs Árbol B e índices | █████████████ 12 | 16% | 7 |
| 3 | Integridad y objetos de BD (constraints, triggers, vistas, snapshots, SP vs función) | ████████████ 11 | 15% | 4 |
| 4 | OLTP/OLAP, Data Warehouse, ETL, modelo estrella | ██████████ 9 | 12% | 9 |
| 5 | Arquitectura ANSI/SPARC, modelo relacional, joins y SQL | █████████ 8 | 11% | 5 |
| 6 | Grafos | ████████ 7 | 9% | 4 |
| 7 | Algoritmos de ordenamiento | ██████ 5 | 7% | 3 |
| 8 | Árboles (B, B+, ABB, barridos) y Huffman | ████ 4 | 5% | 4 |

- **Con los 4 primeros temas cubrís 50 de 74 (68%)** de las preguntas de desarrollo.
- **Tendencia:** OLTP/OLAP/DW no salió como desarrollo entre 2018 y 2022, y en 2023–2025 es **el tema más preguntado** (9 de 44).
- Integridad/objetos bajó en teoría, pero sigue primero en los V/F.
- Árboles casi no se desarrolla: cuando sale es **Árbol B vs ABB**, **split y fusión** o **representación estática**.

### 4.2 Verdadero / Falso

79 afirmaciones: **43 Falsas y 35 Verdaderas** (1 con el enunciado incompleto).

| # | Tema | 2018–2024 | % |
|---|---|---|---|
| 1 | Integridad y objetos de BD (constraints, triggers, vistas, snapshots, SP vs función) | ████████████████████ 22 | 28% |
| 2 | Árboles (B, B+, ABB, barridos) y Huffman | ███████████████████ 21 | 27% |
| 3 | Transacciones, ACID, aislamiento y bloqueos | ████████ 9 | 11% |
| 4 | Hashing vs Árbol B e índices | ████████ 9 | 11% |
| 5 | Algoritmos de ordenamiento | ██████ 7 | 9% |
| 6 | Arquitectura ANSI/SPARC, modelo relacional, joins y SQL | █████ 6 | 8% |
| 7 | Grafos | ███ 3 | 4% |
| 8 | OLTP/OLAP, Data Warehouse, ETL, modelo estrella | ██ 2 | 3% |

- Los **objetos de BD** son el tema #1 de los V/F: CHECK, UNIQUE con NULL, cantidad de triggers por evento, insert en vistas, funciones sin DML.
- **Huffman** solo ya son 10 afirmaciones: es el tema puntual más repetido.

### 4.3 Prácticos

83 ejercicios (incluye los de Moodle 2021). Columnas por año = cantidad de ejercicios de ese tipo.

| Tipo | Qué es | Total | % | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **A** | ¿Qué devuelve / qué pasa? (analizar una consulta o un script) | ████████████████████ 28 | 34% | 3 | 2 | 1 | 3 | 2 | 6 | 7 | 4 |
| **B** | Escribir una consulta (o una sentencia DML) | █████████████████ 24 | 29% | 1 | 3 | 0 | 1 | 5 | 4 | 8 | 2 |
| **C** | Programar objetos: trigger, SP, función o DDL para una regla | ██████████████ 19 | 23% | 2 | 3 | 1 | 3 | 2 | 4 | 4 | 0 |
| **D** | Concurrencia: procesos en paralelo, aislamiento y bloqueos | █████████ 12 | 14% | 0 | 0 | 0 | 2 | 5 | 4 | 1 | 0 |

**Modelos de datos que se repiten:**

| Modelo | Finales | Ejercicios | Fechas |
|---|---|---|---|
| Tabla de números (Numeros, Parametros, Secuencias, Tablita) | 8 | 15 | 09/09/2022, 22/02/2023, 07/03/2023, 25/07/2023, 27/09/2023, 12/12/2023, 05/03/2024, 18/02/2025 |
| País → Provincia → Ciudad | 6 | 12 | 21/02/2018, 2022 (s/f, B), 27/02/2024, 30/07/2024, 17/12/2024, 29/07/2025 |
| Producto / Stock / Depósito / Envase / Composición | 7 | 12 | 04/12/2019, 02/03/2022, 2022 (s/f, A), 06/12/2022, 16/12/2022, 28/02/2023, 01/08/2023 |
| Persona con su_padre_es | 4 | 8 | 12/02/2019, 04/2024 (especial), 18/10/2024, 10/12/2024 |
| Usuarios / Ingresos (vista vw_final) | 4 | 5 | 12/03/2018, 22/06/2021, 02/08/2021, 23/09/2021 |
| Producto (procesos A y B en paralelo) | 4 | 4 | 10/03/2021, 06/12/2022, 16/12/2022, 22/02/2023 |
| tabla1 / tabla2 / Persons | 2 | 3 | 26/02/2019, 11/02/2025 |
| Entrenador / Especialidad | 3 | 3 | 10/03/2021, 02/08/2021, 23/09/2021 |

### 4.4 Lo que creías vs. lo que muestran los finales

| Lo que sabías | Qué muestran los finales | |
|---|---|---|
| Formato fijo 1 · 2 · 3 | Igual en 2018–2025; solo 2021 fue distinto (virtual). | ✔ |
| +1 / −1 / 0 en blanco | Confirmado con exámenes corregidos. | ✔ |
| 6 puntos y un práctico correcto | Confirmado. | ✔ |
| Indicar el motor | Lo piden en casi todos. | ✔ |
| Orden de teoría: transacciones > hashing > integridad > OLTP/OLAP > grafos > árboles > ordenamiento > ANSI/joins | Casi exacto: 18 · 12 · 11 · 9; ANSI/joins/SQL (8) supera a grafos (7) y árboles queda último (4). **En 2023–2025 OLTP/OLAP pasó al primer lugar.** | ≈ |
| V/F: árboles, Huffman, hashing, aislamiento | Correcto, pero **el #1 son los objetos de BD** (22). Árboles+Huffman 21, aislamiento 9, hashing 9. | ≈ |
| 4 tipos de práctico | Confirmado: A 28 · B 24 · C 19 · D 12. | ✔ |
| Modelos País→Provincia→Ciudad y Persona | Confirmado, y hay dos más igual de frecuentes: **Producto/Stock/Depósito** y **tabla de números**. | ✔+ |

---

## 5. Patrones que se repiten

### 5.1 Preguntas recicladas

| Sección | Qué se pregunta (texto de la primera vez; después puede cambiar la redacción) | Veces | Fechas |
|---|---|---|---|
| Teoría | Indique en qué casos considera que el método de Hashing sería mejor que el de Árbol B para la creación de índices. | 6 | 02/03/2022, 2022 (s/f, B), 16/12/2022, 07/03/2023, 25/07/2023, 17/12/2024 |
| Teoría | ¿Qué representa la sigla ACID? Desarrolle cada uno de sus componentes. | 5 | 12/03/2018, 26/02/2019, 2022 (s/f, B), 05/03/2024, 29/07/2025 |
| Teoría | Desarrolle el concepto de Grafos, su posible utilización, clasificación y representación computacional. | 5 | 12/02/2019, 09/09/2022, 20/02/2024, 10/12/2024, 18/02/2025 |
| Teoría | Explique el concepto de ISOLATION LEVEL. Mencione las diferencias entre cada nivel. | 5 | 04/12/2019, 09/09/2022, 06/12/2022, 23/07/2024, 11/02/2025 |
| Teoría | Describa (en no más de 1 carilla) el concepto de OLAP y OLTP. Ejemplifique. | 5 | 28/02/2023, 01/08/2023, 05/03/2024, 23/07/2024, 30/07/2024 |
| Práctica | Vista vw_final (último ingreso por usuario o fecha de alta si nunca ingresó) hecha con UNION, pero la segunda parte N… | 4 | 12/03/2018, 22/06/2021, 02/08/2021, 23/09/2021 |
| Práctica | TABLITA(numero UNIQUE). Describir errores o qué retorna: SELECT MAX(t1.numero), MAX(t2.numero) FROM tablita t1, tabli… | 4 | 09/09/2022, 27/09/2023, 05/03/2024, 18/02/2025 |
| Teoría | Relacione y explique los conceptos de transacción, lockeos y aislamiento. | 4 | 17/07/2018, 2022 (s/f, A), 18/10/2024, 10/12/2024 |
| Práctica | Persona(id, fecha_nacimiento, apellido, nombre, su_padre_es): mostrar las personas con sus abuelos paternos (nombre y… | 3 | 12/02/2019, 04/2024 (especial), 18/10/2024 |
| Práctica | SELECT t1.campoA, COUNT(*) FROM tabla1 t1, tabla2 GROUP BY t1.campoA; tabla1 tiene 500 filas y tabla2 está vacía. Opc… | 3 | 26/02/2019, 04/12/2019, 11/02/2025 |
| Teoría | Desarrolle dos objetos de bases de datos que puedan garantizar la integridad de la misma. | 3 | 04/12/2019, 27/09/2023, 30/07/2024 |
| Teoría | Enumere y explique al menos tres algoritmos de clasificación u ordenamiento que conozca. | 3 | 26/02/2020, 05/12/2023, 04/2024 (especial) |
| Teoría | Describir las ventajas y desventajas de los índices. | 3 | 16/12/2022, 05/12/2023, 03/12/2024 |
| Teoría | Desarrollar el concepto de join, enumere y explique cada uno de los tipos. Ejemplifique. | 3 | 22/02/2023, 04/2024 (especial), 18/02/2025 |
| V/F | Un constraint de tipo CHECK siempre puede ser reemplazado por un trigger. | 3 | 12/02/2019, 05/03/2024, 18/10/2024 |
| V/F | Una columna que posea la constraint UNIQUE puede contener como máximo una sola fila con NULL en dicha columna. | 3 | 26/02/2019, 04/12/2019, 05/12/2023 |
| V/F | Nunca es posible ejecutar la operación de insert sobre una vista. | 3 | 26/02/2020, 07/03/2023, 12/12/2023 |
| V/F | Un barrido simétrico sobre un ABB (árbol binario de búsqueda) devuelve un conjunto ordenado de datos. | 3 | 2022 (s/f, B), 07/03/2023, 29/07/2025 |
| V/F | Para una misma tabla y evento, solo puede haber un trigger de AFTER. | 3 | 22/12/2022, 20/02/2024, 11/02/2025 |
| Práctica | SERIALIZABLE con bloqueo de tabla compartido. A y B: BEGIN, SELECT detalle de producto id=1, UPDATE 'product' SET det… | 2 | 10/03/2021, 22/02/2023 |
| Práctica | País tiene más de 100 registros: consulta que retorne los 5 primeros países del alfabeto y los 5 últimos (las 2 colum… | 2 | 2022 (s/f, B), 17/12/2024 |
| Práctica | Productos con stoc_cantidad > 0 en más de la mitad de los depósitos: código, depósito con más cantidad y stock total;… | 2 | 06/12/2022, 16/12/2022 |
| Práctica | A y B en SERIALIZABLE: T2 A SELECT, T3 B SELECT, T4 A UPDATE 'PROCESO A', T5 B UPDATE 'PROCESO B', T6 COMMIT. Opcione… | 2 | 06/12/2022, 16/12/2022 |
| Práctica | TABLITAFINAL(numero UNIQUE) vacía, sin triggers: INSERT 1; INSERT 3; INSERT NULL; UPDATE numero = ISNULL(numero,5)+1… | 2 | 22/02/2023, 18/02/2025 |
| Práctica | SP descuenta_stock: BEGIN TRAN; IF EXISTS (stock >= @cant) UPDATE ... COMMIT ELSE ROLLBACK; el nivel de aislamiento s… | 2 | 28/02/2023, 01/08/2023 |
| Práctica | Los datos NO están correctos: implementar los objetos para que en STOCK no pueda existir 2 veces el mismo depósito pa… | 2 | 28/02/2023, 01/08/2023 |
| Práctica | dia LEFT JOIN horario h1 (turno 0) JOIN materia m1 LEFT JOIN horario h2 (turno 1) JOIN materia m2, con ISNULL(..., 'L… | 2 | 03/12/2024, 29/07/2025 |
| Teoría | Defina el concepto de transacción en un Sistema de Base de Datos. | 2 | 12/03/2018, 12/02/2019 |
| Teoría | Explique la arquitectura interna de un Sistema de Base de Datos. | 2 | 17/07/2018, 20/02/2024 |
| Teoría | Explicar la utilidad de obtener el plan de ejecución de un select de consulta de datos. | 2 | 26/02/2020, 11/02/2025 |
| Teoría | Realice una comparación entre una view y un snapshot. | 2 | 22/12/2022, 27/02/2024 |
| Teoría | Explique (en no más de 10 renglones) las diferencias entre un árbol B y un árbol binario de búsqueda balanceado. | 2 | 28/02/2023, 01/08/2023 |
| Teoría | Describa el modelo estrella de un dataMart. | 2 | 23/05/2023, 18/10/2024 |
| Teoría | Explicar los niveles de aislamiento read uncommitted y serializable; mencione un ejemplo de cuándo utilizaría cada uno. | 2 | 25/07/2023, 12/12/2023 |
| V/F | Todo grafo de grado 2 es un árbol binario. | 2 | 17/07/2018, 16/12/2022 |
| V/F | Las únicas restricciones posibles aplicables en el modelo relacional son por tabla. | 2 | 10/03/2021, 22/06/2021 |
| V/F | La reexpresión de caracteres al aplicar Huffman implica la disminución a menos de 8 bits de todos los caracteres. | 2 | 09/09/2022, 04/2024 (especial) |
| V/F | El Algoritmo de Huffman basa la asignación de códigos comprimidos en un árbol binario completo. | 2 | 16/12/2022, 17/12/2024 |

### 5.2 V/F: reglas que salen de los datos

1. **Absolutos** («siempre», «nunca», «el único», «todo», «cualquier», «solo»): **22 de 30 fueron Falsos.** Excepción que salió **3 veces**: «un CHECK siempre puede ser reemplazado por un trigger» → **V**.
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

| Fecha | V/F (tema → respuesta) | Teoría (2.a · 2.b) | Práctica (tipo · modelo) |
|---|---|---|---|
| [21/02/2018](#final-2018-02-21) | Árboles → **V** · Transacciones → **F** | Objetos BD · Objetos BD | **C** País-Prov-Ciudad · **A** País-Prov-Ciudad |
| [12/03/2018](#final-2018-03-12) | Objetos BD → **V** · Árboles → **F** | Transacciones · Transacciones | **A** Usuarios-Ingresos · **C** Usuarios-Ingresos |
| [17/07/2018](#final-2018-07-17) | Árboles → **V** · Grafos → **F** | Transacciones · Relacional/SQL | **A** Empresa-Área · **B** Empresa-Área |
| [12/02/2019](#final-2019-02-12) | Objetos BD → **V** · Árboles → **F** | Transacciones · Grafos | **B** Persona · **B** Persona |
| [26/02/2019](#final-2019-02-26) | Huffman → **V** · Objetos BD → **V** | Objetos BD · Transacciones | **A** Tablas genéricas · **C** Tablas genéricas |
| [25/09/2019](#final-2019-09-25) | Objetos BD → **F** · Huffman → **V** | Objetos BD · Objetos BD | **B** Caballos · **C** Caballos |
| [04/12/2019](#final-2019-12-04) | Objetos BD → **F** · Hash/índices → **V** | Objetos BD · Transacciones | **A** Producto-Stock · **C** Producto-Stock |
| [26/02/2020](#final-2020-02-26) | Hash/índices → **V** · Objetos BD → **F** | Relacional/SQL · Ordenamiento | **C** T1-T2 · **A** T1-T2 |
| [10/03/2021](#final-2021-03-10) | Relacional/SQL → **F** · OLAP/DW → **V** | — (sin desarrollo) | **D** Producto A/B · **C** Entrenador |
| [22/06/2021](#final-2021-06-22) | Ordenamiento → **F** · Relacional/SQL → **F** | — (sin desarrollo) | **A** Usuarios-Ingresos · **C** Perfiles |
| [02/08/2021](#final-2021-08-02) | Árboles → **V** · Ordenamiento → **V** | — (sin desarrollo) | **A** Usuarios-Ingresos · **C** Entrenador |
| [23/09/2021](#final-2021-09-23) | OLAP/DW → **F** · Grafos → **V** | — (sin desarrollo) | **A** Usuarios-Ingresos · **B** Entrenador |
| [s/f (Moodle)](#final-moodle-sf) | — | — (sin desarrollo) | **D** prueba |
| [02/03/2022](#final-2022-03-02) | Transacciones → **F** · Ordenamiento → **V** | Hash/índices · Grafos | **D** Producto-Stock · **D** Producto-Stock |
| [09/09/2022](#final-2022-09-09) | Huffman → **F** · Objetos BD → **F** | Grafos · Transacciones | **D** Números · **A** Números |
| [2022 (s/f, A)](#final-2022-sfa) | Transacciones → **V** · Hash/índices → **F** | Transacciones · Relacional/SQL | **B** Producto-Stock · **C** Producto-Stock |
| [2022 (s/f, B)](#final-2022-sfb) | Árboles → **V** · Ordenamiento → **F** | Hash/índices · Transacciones | **B** País-Prov-Ciudad · **A** País-Prov-Ciudad |
| [06/12/2022](#final-2022-12-06) | Objetos BD → **F** · Hash/índices → **F** | Transacciones · Hash/índices | **B** Producto-Stock · **D** Producto A/B |
| [16/12/2022](#final-2022-12-16) | Huffman → **V** · Grafos → **F** | Hash/índices · Hash/índices | **B** Producto-Stock · **D** Producto A/B |
| [22/12/2022](#final-2022-12-22) | Hash/índices → **V** · Objetos BD → **F** | Ordenamiento · Objetos BD | **B** Mundial · **C** Mundial |
| [22/02/2023](#final-2023-02-22) | Huffman → **F** · Relacional/SQL → **F** | Relacional/SQL · Grafos | **A** Números · **D** Producto A/B |
| [28/02/2023](#final-2023-02-28) | Transacciones → **F** · Hash/índices → **F** | OLAP/DW · Árboles | **D** Producto-Stock · **C** Producto-Stock |
| [07/03/2023](#final-2023-03-07) | Árboles → **V** · Objetos BD → **F** | Hash/índices · OLAP/DW | **A** Números · **B** Números |
| [23/05/2023](#final-2023-05-23) | Huffman → **V** · Objetos BD → **F** | Árboles · OLAP/DW | **A** T1-T2-T3 · **A** T1-T2-T3 |
| [25/07/2023](#final-2023-07-25) | Objetos BD → **V** · Árboles → **F** | Hash/índices · Transacciones | **B** Números · **B** Números |
| [01/08/2023](#final-2023-08-01) | Transacciones → **F** · Hash/índices → **V** | OLAP/DW · Árboles | **D** Producto-Stock · **C** Producto-Stock |
| [27/09/2023](#final-2023-09-27) | Objetos BD → **F** · Huffman → **F** | Objetos BD · OLAP/DW | **D** Números · **A** Números |
| [05/12/2023](#final-2023-12-05) | Objetos BD → **F** · Objetos BD → **V** | Hash/índices · Ordenamiento | **A** Juego · **B** Juego |
| [12/12/2023](#final-2023-12-12) | Objetos BD → **V** · Objetos BD → **?** | Ordenamiento · Transacciones | **C** Números · **C** Números |
| [20/02/2024](#final-2024-02-20) | Ordenamiento → **F** · Objetos BD → **F** | Relacional/SQL · Grafos | **A** Feriados · **A** Feriados |
| [27/02/2024](#final-2024-02-27) | Transacciones → **V** · Huffman → **V** | Hash/índices · Objetos BD | **A** País-Prov-Ciudad · **B** País-Prov-Ciudad |
| [05/03/2024](#final-2024-03-05) | Objetos BD → **V** · Transacciones → **F** | OLAP/DW · Transacciones | **A** Números · **B** Números |
| [04/2024 (especial)](#final-2024-04-especial) | Relacional/SQL → **F** · Huffman → **F** | Relacional/SQL · Ordenamiento | **B** Persona · **B** Persona |
| [23/07/2024](#final-2024-07-23) | Árboles → **F** · Objetos BD → **V** | OLAP/DW · Transacciones | **B** Login · **C** Login |
| [30/07/2024](#final-2024-07-30) | Hash/índices → **F** · Transacciones → **V** | Objetos BD · OLAP/DW | **C** País-Prov-Ciudad · **D** País-Prov-Ciudad |
| [18/10/2024](#final-2024-10-18) | Hash/índices → **V** · Objetos BD → **V** | Transacciones · OLAP/DW | **B** Persona · **B** Persona |
| [03/12/2024](#final-2024-12-03) | Relacional/SQL → **V** · Transacciones → **F** | Hash/índices · Hash/índices | **A** Laboratorio · **C** Laboratorio |
| [10/12/2024](#final-2024-12-10) | Ordenamiento → **F** | Transacciones · Grafos | **A** Persona · **C** Persona |
| [17/12/2024](#final-2024-12-17) | Árboles → **F** · Huffman → **V** | Hash/índices · Árboles | **B** País-Prov-Ciudad · **A** País-Prov-Ciudad |
| [11/02/2025](#final-2025-02-11) | Relacional/SQL → **F** · Objetos BD → **F** | Relacional/SQL · Transacciones | **A** Tablas genéricas · **B** Empleado-jefe |
| [18/02/2025](#final-2025-02-18) | — | Grafos · Relacional/SQL | **A** Números · **A** Números |
| [29/07/2025](#final-2025-07-29) | Árboles → **V** · Ordenamiento → **V** | Objetos BD · Transacciones | **B** País-Prov-Ciudad · **A** País-Prov-Ciudad |

---

## 8. Detalle: una tabla por final

<a id="final-2018-02-21"></a>
### 21/02/2018 · presencial

Fuente: `finales 2023 y algunos antes/Finales GDD.docx (foto del enunciado)`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 1a | El Árbol B+ es un árbol Principal Derecho Balanceado. | V/F · Árboles | **V** ⚠️ polémica<br><sub>El libro de Estructuras de Datos de UTN (Pérez, sobre Pfaltz) dice que «los términos árbol y árbol principal derecho son sinónimos». El B+ es un árbol y está balanceado (todas las hojas al mismo nivel). Teóricas dice F sin justificarlo.</sub> |
| 1b | Para entornos transaccionales de alta concurrencia es conveniente setear el Isolation Level en Repeatable Read. | V/F · Transacciones | **F** ✔ |
| 2a | Explique el objeto vista: definición, para qué casos lo usaría y su relación con la seguridad e integridad. | Teoría · Objetos BD | desarrollo |
| 2b | Explique el concepto de Dominio y las reglas de Integridad de Entidad, Referencial y Semántica. | Teoría · Objetos BD | desarrollo |
| 3a | Implementar la regla: si una provincia no posee ciudades, Habitantes debe ser NULL; si tiene, debe ser mayor a 0 (la regla se cumple hoy y acceden n aplicaciones). | **C** · País-Prov-Ciudad | Triggers AFTER sobre Provincia (INSERT/UPDATE) y sobre Ciudad (INSERT/UPDATE/DELETE) que validen la regla para las provincias afectadas y hagan ROLLBACK. ✔ |
| 3b | ¿Qué devuelve? SELECT pro.idPcia, ISNULL(pro.habitantes,0), pa.detalle FROM provincia pro JOIN pais pa ... WHERE pro.habitantes = (SELECT MAX(pro2.habitantes) ... del mismo país) ORDER BY pro.habitantes. Opciones A/B/C. | **A** · País-Prov-Ciudad | B: como mínimo 1 fila por país con al menos 1 provincia con ciudades (los NULL no pasan el '=' y puede haber empates). ✔ |

<a id="final-2018-03-12"></a>
### 12/03/2018 · presencial

Fuente: `finales 2018/2018-Final_12_de_Marzo.pdf`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 1a | Si se desea que no se puedan eliminar registros de una tabla de auditoría, una opción es crear un trigger que lo impida. | V/F · Objetos BD | **V** ✔ |
| 1b | La cantidad de nodos de un árbol de expresión siempre es par. | V/F · Árboles | **F** ✔ |
| 2a | Defina el concepto de transacción en un Sistema de Base de Datos. | Teoría · Transacciones | desarrollo |
| 2b | ¿Qué representa la sigla ACID? Desarrolle cada uno de sus componentes. | Teoría · Transacciones | desarrollo |
| 3a | Vista vw_final (último ingreso por usuario o fecha de alta si nunca ingresó) hecha con UNION, pero la segunda parte NO filtra a los que ya ingresaron. Opciones I-IV. | **A** · Usuarios-Ingresos | II: se crea pero no devuelve lo pedido (agrega la fecha de alta de TODOS los usuarios). Falta WHERE NOT EXISTS (ingresos del usuario). ✔ |
| 3b | DELETE FROM usuarios WHERE idusuario = 8 da error: explicar el motivo e implementar los objetos para poder borrar usuarios así. | **C** · Usuarios-Ingresos | Falla por la FK de Ingresos. INSTEAD OF DELETE en Usuarios que borre primero los Ingresos de los usuarios de deleted y después los Usuarios (multifila, con IN/JOIN contra deleted). ✔ |

<a id="final-2018-07-17"></a>
### 17/07/2018 · presencial

Fuente: `finales 2018/2018-Final_17_de_Julio.pdf`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 1a | Es posible implementar el concepto de ABB (Árbol Binario de Búsqueda) en un Array. | V/F · Árboles | **V** ✔ |
| 1b | Todo grafo de grado 2 es un árbol binario. | V/F · Grafos | **F** ✅ oficial<br><sub>Oficial por la nota del 16/12/2022 (misma afirmación). Contraejemplo: un triángulo o un nodo con bucle tienen grado 2 y no son árboles.</sub> |
| 2a | Relacione y explique los conceptos de transacción, lockeos y aislamiento. | Teoría · Transacciones | desarrollo |
| 2b | Explique la arquitectura interna de un Sistema de Base de Datos. | Teoría · Relacional/SQL | desarrollo |
| 3a | ¿Qué devuelve? SELECT e.id_empresa, COUNT(DISTINCT a.id_area), COUNT(em.id_empresa) FROM empresa e JOIN area a ... LEFT JOIN empleado em ... GROUP BY e.id_empresa. Opciones A-D. | **A** · Empresa-Área | B: 1 fila por empresa con al menos 1 área; cantidad de áreas (todas, el LEFT JOIN las conserva) y cantidad de empleados. ⚠️ polémica<br><sub>Las dos resoluciones de alumnos dicen C, pero C exige 'al menos un empleado' y eso lo impediría solo un INNER JOIN con empleado.</sub> |
| 3b | Consulta: un renglón por empresa con al menos 1 área y ninguna área con más de 10 empleados: id_empresa, cantidad de áreas y cantidad de empleados. | **B** · Empresa-Área | JOIN empresa-área + LEFT JOIN empleado, GROUP BY empresa, y excluir empresas con alguna área de más de 10 empleados (NOT EXISTS / NOT IN con HAVING COUNT > 10). ✔ |

<a id="final-2019-02-12"></a>
### 12/02/2019 · presencial

Fuente: `finales 2019/2019-Final_12_de_Febrero.pdf`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 1a | Un constraint de tipo CHECK siempre puede ser reemplazado por un trigger. | V/F · Objetos BD | **V** ✔ |
| 1b | Los árboles B garantizan un número de niveles menor que otros árboles. | V/F · Árboles | **F** ✔ |
| 2a | Defina el concepto de transacción en un Sistema de Base de Datos. | Teoría · Transacciones | desarrollo |
| 2b | Desarrolle el concepto de Grafos, su posible utilización, clasificación y representación computacional. | Teoría · Grafos | desarrollo |
| 3a | Persona(id, fecha_nacimiento, apellido, nombre, su_padre_es): mostrar las personas con sus abuelos paternos (nombre y apellido de ambos). | **B** · Persona | Doble self-join: hijo JOIN padre ON hijo.su_padre_es = padre.id JOIN abuelo ON padre.su_padre_es = abuelo.id. ✔ |
| 3b | Mostrar los padres y cuántos hijos tienen (nombre y apellido del padre y cantidad). | **B** · Persona | padre JOIN hijo ON hijo.su_padre_es = padre.id GROUP BY padre.id, padre.nombre, padre.apellido con COUNT(*). ✔ |

<a id="final-2019-02-26"></a>
### 26/02/2019 · presencial

Fuente: `finales 2019/2019-Final_26_de_Febrero.pdf`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 1a | En el árbol de Huffman la cantidad total de nodos es (total de hojas × 2) − 1. | V/F · Huffman | **V** ✔ |
| 1b | Una columna que posea la constraint UNIQUE puede contener como máximo una sola fila con NULL en dicha columna. | V/F · Objetos BD | **V** ✔ |
| 2a | Explique el concepto, la funcionalidad y para qué se utilizan los triggers en una BD relacional. | Teoría · Objetos BD | desarrollo |
| 2b | Explique qué significa la sigla ACID y desarrolle cada concepto. | Teoría · Transacciones | desarrollo |
| 3a | SELECT t1.campoA, COUNT(*) FROM tabla1 t1, tabla2 GROUP BY t1.campoA; tabla1 tiene 500 filas y tabla2 está vacía. Opciones 1-4. | **A** · Tablas genéricas | 4) Conjunto vacío: el producto cartesiano con una tabla vacía es vacío (no hay grupos, ni siquiera COUNT = 0). ✔ |
| 3b | Persons sin constraints: implementar los objetos para emular que el campo Ciudad sea FK a Ciudades(IdCiudad). | **C** · Tablas genéricas | Trigger AFTER INSERT, UPDATE en Persons (si hay ciudad no nula inexistente → ROLLBACK) y trigger AFTER DELETE, UPDATE en Ciudades (si queda alguna persona apuntando a una ciudad borrada → ROLLBACK). ✔ |

<a id="final-2019-09-25"></a>
### 25/09/2019 · presencial

Fuente: `finales 2019/2019-Final_25_de_Septiembre.pdf`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 1a | En una db relacional las vistas pueden ser utilizadas para brindar consistencia de datos. | V/F · Objetos BD | **F** ✔ |
| 1b | En Huffman, si un carácter posee el código 0011, entonces con seguridad existe al menos otro carácter cuyo código comienza con 001. | V/F · Huffman | **V** ✔ |
| 2a | Desarrolle 2 objetos de una base de datos que sirven para brindar seguridad. | Teoría · Objetos BD | desarrollo |
| 2b | Explique las principales diferencias entre una función y un stored procedure. | Teoría · Objetos BD | desarrollo |
| 3a | Carreras/Caballos: para la fecha del día, el/los nombres del caballo ganador (Puesto = 1) que menos dinero recibió en apuestas. | **B** · Caballos | Filtrar fecha de hoy y puesto 1, y quedarse con los que tienen TotalApostado = MIN(...) (no usar TOP 1: pide 'el/los'). ✔ |
| 3b | Implantar: 'por cada carrera, los valores no nulos de Puesto deben ser consecutivos iniciando en 1' (se cumple hoy, n aplicaciones). | **C** · Caballos | Trigger AFTER INSERT, UPDATE en Caballos que, para las carreras afectadas, verifique que COUNT(puesto no nulo) = MAX(puesto) y que no haya repetidos; si no → ROLLBACK. ✔ |

<a id="final-2019-12-04"></a>
### 04/12/2019 · presencial

Fuente: `finales 2019/2019-Final_4_de_Diciembre.pdf`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 1a | Una columna afectada por una constraint UNIQUE no puede almacenar valores repetidos ni NULL. | V/F · Objetos BD | **F** ✔ |
| 1b | Hashing es más performante que el Árbol B en la búsqueda de una clave única en particular existente. | V/F · Hash/índices | **V** ✔ |
| 2a | Desarrolle dos objetos de bases de datos que puedan garantizar la integridad de la misma. | Teoría · Objetos BD | desarrollo |
| 2b | Explique el concepto de ISOLATION LEVEL. Mencione las diferencias entre cada nivel. | Teoría · Transacciones | desarrollo |
| 3a | SELECT p.prod_codigo, COUNT(*) FROM PRODUCTOS p, DEPOSITO d GROUP BY p.prod_codigo HAVING COUNT(*) > 0; PRODUCTOS tiene 15000 filas y DEPOSITO está vacía. Opciones 1-5. | **A** · Producto-Stock | 3) Conjunto vacío (producto cartesiano con tabla vacía). ✔ |
| 3b | Un programador resuelve con CREATE FUNCTION FN_REASIGNAR_PRODUCTOS una reasignación de depósitos usando dos UPDATE sobre STOCK. ¿Es correcta? Corregir y justificar. | **C** · Producto-Stock | Incorrecta: una función no puede modificar tablas (UPDATE). Debe ser un STORED PROCEDURE. Además, mover todo el stock de un producto a un único depósito puede violar la PK (producto, depósito) si el producto tenía stock en varios. ✔ |

<a id="final-2020-02-26"></a>
### 26/02/2020 · presencial

Fuente: `finales 2020/Final GDD 26-02-2020.jpeg`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 1a | Si una función de hash no posee una buena dispersión, se van a producir muchas colisiones. | V/F · Hash/índices | **V** ✔ |
| 1b | Nunca es posible ejecutar la operación de insert sobre una vista. | V/F · Objetos BD | **F** ✔ |
| 2a | Explicar la utilidad de obtener el plan de ejecución de un select de consulta de datos. | Teoría · Relacional/SQL | desarrollo |
| 2b | Enumere y explique al menos tres algoritmos de clasificación u ordenamiento que conozca. | Teoría · Ordenamiento | desarrollo |
| 3a | T1(ID, DETALLE) y T2(ID, ID_T1, DETALLE): agregar los objetos para establecer la integridad referencial entre T1 y T2, sin alterar la estructura ni usar FK constraints (rige desde que se crea el código). | **C** · T1-T2 | Triggers: AFTER INSERT, UPDATE en T2 (ID_T1 debe existir en T1) y AFTER DELETE, UPDATE en T1 (no dejar hijos huérfanos), con ROLLBACK. ✔ |
| 3b | Con el modelo anterior se ejecuta ALTER TABLE T2 ADD FOREIGN KEY (ID_T1) REFERENCES T1(ID) (mismo tipo). a) da error, b) se ejecuta sin problemas, c) ninguna. | **A** · T1-T2 | Depende: falla si T1.ID no es PK/UNIQUE o si quedaron filas huérfanas de antes del trigger (la FK se crea WITH CHECK). Justificar ese análisis. ⬜ en blanco<br><sub>No hay resolución en las fuentes.</sub> |

<a id="final-2021-03-10"></a>
### 10/03/2021 · virtual

Fuente: `finales 2021/final-GDD-10-3-2021.pdf (captura de Moodle con corrección)`  
Formato virtual 2021: 2 V/F de 1 punto, 1 multiple choice de 3 puntos y 1 ejercicio de código de 5 puntos. Sin teoría para desarrollar.

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| V/F 1 | Las únicas restricciones posibles aplicables en el modelo relacional son por tabla. | V/F · Relacional/SQL | **F** ✅ oficial<br><sub>También hay restricciones por columna (NOT NULL, CHECK de columna) y entre tablas (FK).</sub> |
| V/F 2 | Las técnicas más comunes utilizadas en el Datamining son las redes neuronales, los árboles de decisión y los algoritmos genéticos. | V/F · OLAP/DW | **V** ✅ oficial<br><sub>Comentario oficial de Moodle: 'Las reglas de inducción no son técnicas de DataMining'.</sub> |
| MC | SERIALIZABLE con bloqueo de tabla compartido. A y B: BEGIN, SELECT detalle de producto id=1, UPDATE 'product' SET detalle='X'/'Y' WHERE id=1, COMMIT. Opciones: deadlock / X / Y / A o B termina antes / ninguna. | **D** · Producto A/B | Ninguna de las anteriores (respuesta oficial). ✅ oficial<br><sub>Explicación más probable: el UPDATE apunta a la tabla 'product' y la tabla es 'producto' → el UPDATE falla en ambos, no hay deadlock y el detalle no cambia. Si la tabla estuviera bien escrita, habría deadlock.</sub> |
| Código | DDL sobre Entrenador/Especialidad vacías: PK en los id, relación N:M entrenador-especialidad, tabla ATLETA con entrenador asignado, UNIQUE en espe_detalle e integridad referencial. Script ejecutable de una vez. | **C** · Entrenador | ALTER COLUMN ... NOT NULL antes de las PK; tabla intermedia con PK compuesta y dos FK; tipos iguales a los referenciados (CHAR(10)); UNIQUE; FK desde Atleta. ✅ oficial<br><sub>Comentarios del corrector: faltó NOT NULL antes de las PK y los tipos debían respetar CHAR(10).</sub> |

<a id="final-2021-06-22"></a>
### 22/06/2021 · virtual

Fuente: `finales 2021/Final GDD 22 6 2021 Enunciado.pdf (captura de Moodle)`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| V/F 1 | El Heap es un árbol n-ario el cual debe cumplir la norma de que el padre sea mayor que sus hijos en todos los niveles. | V/F · Ordenamiento | **F** ✅ oficial<br><sub>El heap es un árbol BINARIO (cargado por niveles de izquierda a derecha).</sub> |
| V/F 2 | Las únicas restricciones posibles aplicables en el modelo relacional son por tabla. | V/F · Relacional/SQL | **F** ✅ oficial |
| MC | Vista vw_final con UNION y WHERE NOT EXISTS (versión corregida del 12/03/2018). ¿Es correcta? | **A** · Usuarios-Ingresos | La vista es correcta y devuelve exactamente lo solicitado (oficial). ✅ oficial |
| Código | Usuario, Perfil, Usuario_Perfil y Log_Asignaciones: crear los objetos para controlar la vigencia de permisos (no vigente si hay una baja 'DEL' posterior a la fecha de alta) y dejar inactivo ('I') el perfil no vigente. | **C** · Perfiles | SP (o trigger sobre Log_Asignaciones) que haga UPDATE Usuario_Perfil SET uspe_activo = 'I' cuando EXISTS un log 'DEL' del mismo usuario y perfil con fecha posterior al alta. ✔ |

<a id="final-2021-08-02"></a>
### 02/08/2021 · virtual

Fuente: `finales 2021/final-GDD-2-8-2021.pdf (captura de Moodle con corrección)`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| V/F 1 | Si un árbol binario es completo, entonces la cantidad de nodos que posee es impar. | V/F · Árboles | **V** ✅ oficial<br><sub>Confirma la definición de la cátedra: completo = cada nodo tiene 0 o 2 hijos → n = 2i + 1.</sub> |
| V/F 2 | El algoritmo de QuickSort tiene un orden de complejidad que varía según cómo vengan ordenados los datos. | V/F · Ordenamiento | **V** ✅ oficial<br><sub>Puede ser O(n log n) o O(n²) (comentario oficial).</sub> |
| MC | La misma vista vw_final con NOT EXISTS. | **A** · Usuarios-Ingresos | La vista es correcta y devuelve exactamente lo solicitado (oficial). ✅ oficial |
| Código | Dado un código de entrenador devolver 'El entrenador X tiene un nivel N y sus dependientes acumulan Z horas semanales' (N = entrenados directos e indirectos; Z = horas directas e indirectas; profundidad desconocida). | **C** · Entrenador | Recursión: CTE recursiva (o función recursiva) sobre entrenado_por_id para contar dependientes y sumar horas, dentro de un SP o función que arme el texto. ✅ oficial<br><sub>Comentario del corrector a una solución sin recursión: 'No resuelve la recursividad' (1/5).</sub> |

<a id="final-2021-09-23"></a>
### 23/09/2021 · virtual

Fuente: `finales 2021/final-GDD-23-9-2021.pdf (captura de Moodle con corrección)`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| V/F 1 | Un sistema de Data Warehousing no permite la integración de bases de datos heterogéneas (relacionales, documentales, geográficas, archivos, etc.). | V/F · OLAP/DW | **F** ✅ oficial<br><sub>Integrar fuentes heterogéneas es justamente una característica del DW.</sub> |
| V/F 2 | Un vector se puede utilizar para representar cualquier grafo restricto. | V/F · Grafos | **V** ✅ oficial |
| MC | La misma vista vw_final con NOT EXISTS. | **A** · Usuarios-Ingresos | La vista es correcta y devuelve exactamente lo solicitado (oficial). ✅ oficial |
| Código | Para todos los entrenadores: apellido y nombre, los de quien lo entrena, cantidad de especialidades y horas semanales de ambos. Ninguna columna en NULL; si no tiene entrenador mostrar 'No posee entrenador'. | **B** · Entrenador | Self LEFT JOIN Entrenador e1 → e2 (su entrenador) + subconsultas correlacionadas para cantidades; ISNULL(..., 0) en los números y el texto solo en la columna del nombre. ✅ oficial<br><sub>Corrector: el 'No posee entrenador' era solo para la columna del nombre; en las numéricas mostrar 0.</sub> |

<a id="final-moodle-sf"></a>
### s/f (Moodle) · virtual

Fuente: `finales 2023 y algunos antes/Finales GDD.docx (captura 'Final XX')`  
Solo se conserva una pregunta de multiple choice.

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| MC | prueba(valor) vacía. TRAN1 READ UNCOMMITTED; TRAN2 READ COMMITTED inserta 1, cuenta, COMMIT y luego ROLLBACK; TRAN1 cuenta antes y después. ¿Qué devuelven los COUNT(*) en t6, t7 y t10? | **D** · prueba | 1, 1, 1 (oficial): TRAN2 ve lo propio, TRAN1 lee sucio y el ROLLBACK posterior al COMMIT no deshace nada. ✅ oficial |

<a id="final-2022-03-02"></a>
### 02/03/2022 · presencial

Fuente: `finales 2023 y algunos antes/Finales GDD.docx (foto)`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 1a | En un stored procedure, dentro de una transacción no se puede cambiar el nivel de aislamiento. | V/F · Transacciones | **F** ✔ |
| 1b | El método Heapsort siempre es más rápido que el método de la Burbuja para ordenar un conjunto de datos desordenados. | V/F · Ordenamiento | **V** ⚠️ polémica<br><sub>Todas las fuentes dicen V (O(n log n) contra O(n²)). Ojo con el 'siempre': con muy pocos datos o datos casi ordenados la burbuja con bandera puede ganar; por eso hay quien la marca F.</sub> |
| 2a | Indique en qué casos considera que el método de Hashing sería mejor que el de Árbol B para la creación de índices. | Teoría · Hash/índices | desarrollo |
| 2b | Indique dos ejemplos donde sería necesario el uso de un grafo irrestricto para modelar una solución. | Teoría · Grafos | desarrollo |
| 3a | STOCK(1,1,100). A y B en SERIALIZABLE (lecturas con bloqueo compartido): SELECT del producto, UPDATE cantidad = cantidad − 1; A hace COMMIT y B ROLLBACK. Opciones: 99 por el rollback de B / 100 o 99 según decida el motor / siempre 100 por deadlock / ninguna. | **D** · Producto-Stock | b) 100 o 99: ambos leen (S), ambos piden X → deadlock; si el motor mata a A queda 100 (B hace rollback), si mata a B queda 99. ⚠️ polémica<br><sub>El enunciado tiene 'UPDATE STOCK SET set cantidad', que tomado literal es un error de sintaxis. Se asume error de tipeo.</sub> |
| 3b | Trigger tr_final FOR INSERT en ITEM_FACTURA con BEGIN TRANSACTION, cursor e IF (stock >= cantidad) UPDATE ... con READ COMMITTED y mucha concurrencia: el stock quedó negativo. Explicar por qué y cómo corregirlo. | **D** · Producto-Stock | Check-then-act: con READ COMMITTED el SELECT libera el bloqueo al terminar de leer, dos transacciones validan el mismo stock y ambas descuentan. Solución: UPDATE atómico con la condición en el WHERE (y verificar @@ROWCOUNT) o leer con UPDLOCK/HOLDLOCK, más un CHECK (cantidad >= 0). ⚠️ polémica<br><sub>La resolución del alumno propone Repeatable Read: evita el negativo pero genera deadlocks.</sub> |

<a id="final-2022-09-09"></a>
### 09/09/2022 · presencial

Fuente: `finales 2023 y algunos antes/Finales GDD.docx (foto)`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 1a | La reexpresión de caracteres al aplicar Huffman implica la disminución a menos de 8 bits de todos los caracteres. | V/F · Huffman | **F** ✔ |
| 1b | La ejecución sin filas de resultado de una query dentro de un trigger en SQL Server genera la cancelación de la transacción. | V/F · Objetos BD | **F** ✔ |
| 2a | Desarrolle el concepto de Grafo, su utilización, los tipos de grafos y sus diferentes representaciones computacionales. | Teoría · Grafos | desarrollo |
| 2b | Indique los distintos niveles de aislamiento de un DBMS indicando claramente qué tipos de bloqueos se ejecutan en cada uno de ellos. | Teoría · Transacciones | desarrollo |
| 3 | prueba(col1 int NOT NULL) vacía. Proceso 1: dos SELECT COUNT(*) en la misma transacción (a y b). Proceso 2: INSERT INTO prueba (col1) (SELECT MAX(col1)+1 FROM prueba). a) a y b siempre iguales b) nunca iguales c) depende d) no hay info e) ninguna. | **D** · Números | a) Siempre iguales: con la tabla vacía MAX(col1) es NULL y NULL+1 es NULL → el INSERT falla por NOT NULL. La tabla sigue vacía (0 y 0) sin importar el aislamiento. ✔ |
| 4 | TABLITA(numero UNIQUE). Describir errores o qué retorna: SELECT MAX(t1.numero), MAX(t2.numero) FROM tablita t1, tablita t2 WHERE t1.numero > t2.numero (más de 10 filas). | **A** · Números | No tiene errores: devuelve el máximo y el segundo máximo (t2 nunca puede ser el máximo). ✔ |

<a id="final-2022-sfa"></a>
### 2022 (s/f, A) · presencial

Fuente: `finales 2023 y algunos antes/Finales GDD.docx ('Final XX/YY/2022 **', foto)`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 1a | La lectura consistente (READ COMMITTED), cuando una transacción modifica un dato, siempre tiene que generar un bloqueo exclusivo para que otra transacción no vea datos inconsistentes. | V/F · Transacciones | **V** ⚠️ polémica<br><sub>Toda modificación toma un bloqueo exclusivo hasta el fin de la transacción; es lo que impide la lectura sucia. 'Teóricas GDD' dice F confundiendo con los bloqueos de lectura.</sub> |
| 1b | Los accesos mediante funciones de HASH son eficientes siempre y se recomiendan usar en todos los casos en los que se necesite acceder a datos. | V/F · Hash/índices | **F** ✔ |
| 2a | Desarrolle el concepto de Atomicidad, aislamiento y transacciones. | Teoría · Transacciones | desarrollo |
| 2b | Desarrolle el concepto de Modelo Relacional. | Teoría · Relacional/SQL | desarrollo |
| 3a | Producto/Composición (combos): para todos los productos, nombre, nombre del componente y cantidad que lo compone; si no es compuesto mostrar 'sin compuesto' y 0. | **B** · Producto-Stock | Producto LEFT JOIN Composicion LEFT JOIN Producto (componente) con ISNULL(detalle, 'sin compuesto') e ISNULL(cantidad, 0). ✔ |
| 3b | Objetos para controlar que el precio de un producto compuesto sea siempre igual a la suma de precio × cantidad de sus componentes. | **C** · Producto-Stock | Trigger AFTER INSERT, UPDATE, DELETE en Composición y AFTER UPDATE en Producto que recalculen la suma de los combos afectados y hagan ROLLBACK si no coincide. ✔ |

<a id="final-2022-sfb"></a>
### 2022 (s/f, B) · presencial

Fuente: `finales 2023 y algunos antes/Finales GDD.docx ('Final XX/YY/2022 ****', foto corregida: 8)`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 1a | Un barrido simétrico sobre un ABB (árbol binario de búsqueda) devuelve un conjunto ordenado de datos. | V/F · Árboles | **V** ✔ |
| 1b | El método de ordenamiento quick sort tiene siempre el mismo orden de complejidad, es decir, la complejidad computacional es constante. | V/F · Ordenamiento | **F** ✔ |
| 2a | Realice una comparación entre Hashing y árbol B como método de acceso a datos. | Teoría · Hash/índices | desarrollo |
| 2b | Explique las propiedades A.C.I.D. de una base de datos relacional. | Teoría · Transacciones | desarrollo |
| 3a | País tiene más de 100 registros: consulta que retorne los 5 primeros países del alfabeto y los 5 últimos (las 2 columnas). | **B** · País-Prov-Ciudad | WHERE idpais IN (TOP 5 ORDER BY detalle) OR idpais IN (TOP 5 ORDER BY detalle DESC), o UNION ALL de dos derivadas con TOP. ✔ |
| 3b | SELECT pa.IDPAIS, SUM(pro.HABITANTES), COUNT(*) FROM pais pa, provincias pro WHERE pa.IDPAIS = pro.IDPAIS GROUP BY pa.IDPAIS. Opciones A-D. | **A** · País-Prov-Ciudad | D: 1 fila por país con al menos 1 provincia; habitantes del país (suma de sus provincias); cantidad de provincias. ✅ oficial<br><sub>El mismo ejercicio salió el 17/12/2024 y el alumno que marcó D sacó 2/2.</sub> |

<a id="final-2022-12-06"></a>
### 06/12/2022 · presencial

Fuente: `finales 2023 y algunos antes/Finales GDD.docx (foto)`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 1a | Es lo mismo utilizar una UNIQUE CONSTRAINT sobre un campo identificador de una tabla que una Primary Key, dado que ambas ofrecen el mismo concepto y funcionalidad. | V/F · Objetos BD | **F** ✔ |
| 1b | Siempre, en todos los casos, es más rápido el acceso a los datos mediante un índice que mediante algún algoritmo sobre la tabla. | V/F · Hash/índices | **F** ✔ |
| 2a | Explique el concepto de transacción e isolation level. | Teoría · Transacciones | desarrollo |
| 2b | Explique en qué casos usaría una función de HASH. Ejemplifique. | Teoría · Hash/índices | desarrollo |
| 3a | Productos con stoc_cantidad > 0 en más de la mitad de los depósitos: código, depósito con más cantidad y stock total; primero los que tienen stock > 0 en todos los depósitos. | **B** · Producto-Stock | GROUP BY producto con HAVING COUNT(depósitos con stock > 0) > (SELECT COUNT(*) FROM deposito) / 2.0; subconsulta TOP 1 para el depósito; ORDER BY CASE para los que están en todos. ✔ |
| 3b | A y B en SERIALIZABLE: T2 A SELECT, T3 B SELECT, T4 A UPDATE 'PROCESO A', T5 B UPDATE 'PROCESO B', T6 COMMIT. Opciones a-e. | **D** · Producto A/B | d) Deadlock: los dos tienen bloqueo compartido y piden exclusivo; el motor mata a uno y queda 'PROCESO A' o 'PROCESO B'. ✔ |

<a id="final-2022-12-16"></a>
### 16/12/2022 · presencial

Fuente: `finales 2023 y algunos antes/Finales GDD.docx (foto corregida: 9)`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 1a | El Algoritmo de Huffman basa la asignación de códigos comprimidos en un árbol binario completo. | V/F · Huffman | **V** ✅ oficial<br><sub>El alumno puso V y sumó el punto. 'Completo' para la cátedra = cada nodo tiene 0 o 2 hijos (no que las hojas estén al mismo nivel).</sub> |
| 1b | Todo grafo de grado 2 es un árbol binario. | V/F · Grafos | **F** ✅ oficial<br><sub>El alumno puso F y sumó el punto.</sub> |
| 2a | Indique un escenario donde la creación de índices con Tablas de Hashing sea más eficiente que con Árboles B. | Teoría · Hash/índices | desarrollo |
| 2b | Describir las ventajas y desventajas de los índices. | Teoría · Hash/índices | desarrollo |
| 3a | Igual al 06/12/2022 pero solo productos con alguno de los tres envases con más productos asignados, y mostrando el detalle del envase. | **B** · Producto-Stock | Agregar WHERE prod_envase IN (SELECT TOP 3 envase ... GROUP BY ... ORDER BY COUNT(*) DESC) y JOIN a Envase para el detalle. ✔ |
| 3b | A en REPEATABLE READ, B en READ COMMITTED: T2 A SELECT, T3 B SELECT, T4 A UPDATE, T5 B UPDATE, T6 COMMIT. Opciones a-e. | **D** · Producto A/B | b) Queda 'PROCESO B': B libera su bloqueo de lectura al terminar el SELECT, A actualiza; B espera el bloqueo de A y escribe después del COMMIT de A. ✅ oficial<br><sub>El alumno marcó B y sacó 2/2.</sub> |

<a id="final-2022-12-22"></a>
### 22/12/2022 · presencial

Fuente: `finales 2023 y algunos antes/Finales GDD.docx (foto corregida: 2)`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 1a | Si un índice es por clave duplicada, no se puede implementar con Hashing. | V/F · Hash/índices | **V** ✅ oficial<br><sub>El alumno puso F y le restaron 1. Para la cátedra hashing se usa con claves únicas.</sub> |
| 1b | Para una misma tabla y evento, solo puede haber un trigger de AFTER. | V/F · Objetos BD | **F** ✅ oficial<br><sub>El alumno puso V y le restaron 1. Puede haber varios AFTER; INSTEAD OF hay uno solo por evento.</sub> |
| 2a | Elija un algoritmo de clasificación visto en la materia con complejidad computacional constante y descríbalo. | Teoría · Ordenamiento | desarrollo |
| 2b | Realice una comparación entre una view y un snapshot. | Teoría · Objetos BD | desarrollo |
| 3a | MundialFutbol(IdMundial, Anio, PaisCampeon, PaisSubCampeon): nombre del país que fue el último en ganar un mundial por primera vez. | **B** · Mundial | SELECT TOP 1 PaisCampeon FROM MundialFutbol GROUP BY PaisCampeon ORDER BY MIN(Anio) DESC. ✔ |
| 3b | Implantar: el campeón y el subcampeón no pueden ser el mismo y la diferencia entre mundiales no puede ser menor a 4 años (se cumple hoy, n aplicaciones). | **C** · Mundial | CHECK (PaisCampeon <> PaisSubCampeon) o trigger; trigger AFTER INSERT, UPDATE con IF EXISTS (mundial a menos de 4 años de uno de inserted, distinto id) → ROLLBACK. ✔ |

<a id="final-2023-02-22"></a>
### 22/02/2023 · presencial

Fuente: `finales 2023 y algunos antes/Finales GDD.docx (foto)`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 1a | Si una palabra se escribe igual de izquierda a derecha como de derecha a izquierda, entonces su código de Huffman se escribe igual de izquierda a derecha como de derecha a izquierda. | V/F · Huffman | **F** ⚠️ polémica<br><sub>La palabra es capicúa pero cada código no lo es. Contraejemplo ABCBA con A=11, B=0, C=10: 11 0 10 0 11 = 11010011, que al revés es 11001011. Teóricas y una resolución dicen V; otros bancos, F.</sub> |
| 1b | Luego de CREATE TABLE tablitaFinal (campo1 VARCHAR2(5)) y poblar la tabla, para cualquier set de datos se da: SELECT COUNT(campo1) = SELECT COUNT(*). | V/F · Relacional/SQL | **F** ✔ |
| 2a | Desarrollar el concepto de join, enumere y explique cada uno de los tipos. Ejemplifique. | Teoría · Relacional/SQL | desarrollo |
| 2b | Describa cómo representar en forma estática y dinámica un grafo irrestricto. | Teoría · Grafos | desarrollo |
| 3a | TABLITAFINAL(numero UNIQUE) vacía, sin triggers: INSERT 1; INSERT 3; INSERT NULL; UPDATE numero = ISNULL(numero,5)+1 WHERE 1=1 OR ...; INSERT NULL; COMMIT. Indicar errores y contenido final. | **A** · Números | Todo funciona salvo el COMMIT (no hay BEGIN TRANSACTION). El UPDATE afecta todas las filas: 1→2, 3→4, NULL→6. Final: NULL, 2, 4, 6. ✔ |
| 3b | Mismo ejercicio que el 10/03/2021: SERIALIZABLE, bloqueo de tabla compartido, A/B con SELECT y UPDATE 'product' detalle X/Y. Opciones a-f. | **D** · Producto A/B | f) Ninguna de las anteriores, siguiendo la respuesta oficial del mismo ejercicio en 2021. ⚠️ polémica<br><sub>El alumno respondió e) deadlock (sin nota visible). La clave oficial 2021 fue 'Ninguna': el UPDATE usa la tabla 'product' y no 'producto'.</sub> |

<a id="final-2023-02-28"></a>
### 28/02/2023 · presencial

Fuente: `finales 2023 y algunos antes/Finales GDD.docx (foto)`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 1a | Un nivel de aislamiento REPEATABLE READ no genera problemas de interbloqueo. | V/F · Transacciones | **F** ✔ |
| 1b | Un Split en un ARBOL B es una operación tan costosa que hace que sea recomendable siempre aplicar índices de funciones de hash antes que índices de tipo ARBOL B. | V/F · Hash/índices | **F** ✔ |
| 2a | Describa (en no más de 1 carilla) el concepto de OLAP y OLTP. Ejemplifique. | Teoría · OLAP/DW | desarrollo |
| 2b | Explique (en no más de 10 renglones) las diferencias entre un árbol B y un árbol binario de búsqueda balanceado. | Teoría · Árboles | desarrollo |
| 3a | SP descuenta_stock: BEGIN TRAN; IF EXISTS (stock >= @cant) UPDATE ... COMMIT ELSE ROLLBACK; el nivel de aislamiento se define en cada ejecución. 1) siempre funciona 2) puede dejar stock negativo 3) con algún nivel puede dar interbloqueo 4) todas. | **D** · Producto-Stock | 2) y 3): con READ COMMITTED dos ejecuciones validan el mismo stock y ambas descuentan (negativo); con REPEATABLE READ o SERIALIZABLE ambas retienen el bloqueo de lectura y se interbloquean. ✔ |
| 3b | Los datos NO están correctos: implementar los objetos para que en STOCK no pueda existir 2 veces el mismo depósito para el mismo producto. | **C** · Producto-Stock | Primero consolidar los duplicados (sumar y dejar una fila por par) y después UNIQUE (id_producto, id_deposito) o un trigger AFTER INSERT, UPDATE con GROUP BY ... HAVING COUNT(*) > 1 → ROLLBACK. ✔ |

<a id="final-2023-03-07"></a>
### 07/03/2023 · presencial

Fuente: `finales 2023 y algunos antes/Finales GDD.docx (foto)`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 1a | Si a un árbol binario de búsqueda (ABB) se le ejecuta un barrido simétrico, devuelve un conjunto ordenado de datos. | V/F · Árboles | **V** ✔ |
| 1b | En una View, nunca se pueden realizar insert de registros. | V/F · Objetos BD | **F** ✔ |
| 2a | Compare los métodos de Hashing y Árbol B en cuanto a su eficiencia en la recuperación de datos. | Teoría · Hash/índices | desarrollo |
| 2b | Explique la funcionalidad de una ETL y el modelo estrella en una implementación de Data Warehouse. | Teoría · OLAP/DW | desarrollo |
| 3a | Secuencias (≥ 20 filas, clave sin nulos y con un solo valor duplicado): SELECT clave FROM Secuencias WHERE clave IN (SELECT TOP 5 clave ORDER BY clave) OR clave IN (SELECT TOP 5 clave ORDER BY clave DESC) ORDER BY 1. ¿Da error? Si no, mínimo y máximo de filas. | **A** · Números | No da error. Mínimo 10 filas, máximo 11 (si el duplicado queda justo en el borde del top 5, entran las dos copias). ✔ |
| 3b | En una única instrucción DML eliminar los 2 registros que poseen el valor duplicado en clave. | **B** · Números | DELETE FROM Secuencias WHERE clave IN (SELECT clave FROM Secuencias GROUP BY clave HAVING COUNT(*) > 1). ✔ |

<a id="final-2023-05-23"></a>
### 23/05/2023 · presencial

Fuente: `finales 2023 y algunos antes/Finales GDD.docx (foto)`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 1a | Si en un árbol de Huffman todas las hojas están en el mismo nivel, entonces todos los códigos poseen la misma longitud. | V/F · Huffman | **V** ✔ |
| 1b | Una Constraint de check puede evaluar campos de distintas tablas. | V/F · Objetos BD | **F** ✔ |
| 2a | Explique el concepto de split y fusión en un árbol B. | Teoría · Árboles | desarrollo |
| 2b | Describa el modelo estrella de un dataMart. | Teoría · OLAP/DW | desarrollo |
| 3.1 | T1 -< T2 >- T3. a) ¿Qué devuelve SELECT T1.id, (SELECT COUNT(DISTINCT T2.t3_id) FROM T2 WHERE T2.t1_id = T1.id) FROM T1? b) Reescribirla sin subconsultas. c) ¿Qué cambia si se saca el DISTINCT? | **A** · T1-T2-T3 | a) Cada id de T1 con la cantidad de T3 distintos relacionados (0 si ninguno). b) T1 LEFT JOIN T2 + GROUP BY T1.id + COUNT(T2.t3_id). c) Nada: (t1_id, t3_id) es la PK de T2, no hay repetidos. ✔ |
| 3.2 | Indicar los errores de una consulta (o cómo hacerla más eficiente si T1 tiene más de 1 millón de filas y T2 10). | **A** · T1-T2-T3 | SUM sobre una columna CHAR, ORDER BY dentro de la subconsulta sin TOP, HAVING escrito después del ORDER BY, columna T1.t1_col2 fuera del GROUP BY. ✔ |

<a id="final-2023-07-25"></a>
### 25/07/2023 · presencial

Fuente: `finales 2023 y algunos antes/Finales GDD.docx (foto)`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 1a | Una view puede utilizarse para brindar seguridad. | V/F · Objetos BD | **V** ✔ |
| 1b | Si sobre un ABB con N niveles se desea consultar una clave que no existe, la cantidad exacta de lecturas que realiza es N. | V/F · Árboles | **F** ✔ |
| 2a | Explicar las principales diferencias entre Árbol B+ y Hashing para el acceso a los datos. | Teoría · Hash/índices | desarrollo |
| 2b | Explicar los niveles de aislamiento read uncommitted y serializable; mencione un ejemplo de cuándo utilizaría cada uno. | Teoría · Transacciones | desarrollo |
| 3a | Numeros(clave PK, valor), clave > 0 garantizado y tabla no vacía: consulta ANSI SQL que retorne el primer hueco de clave, o el valor siguiente a la máxima si no hay huecos. | **B** · Números | CASE WHEN no existe la clave 1 THEN 1 ELSE MIN(n.clave + 1) de las claves cuyo siguiente no existe (NOT EXISTS) END. ⚠️ polémica<br><sub>Las resoluciones de alumnos fallan si falta la clave 1 y usan TOP sin ORDER BY.</sub> |
| 3b | Sentencia DML que inserte un solo registro usando la consulta anterior para la clave y NULL en valor. ¿Puede dar error? Justificar. | **B** · Números | INSERT INTO Numeros (clave, valor) SELECT <consulta>, NULL. Sí puede fallar: dos ejecuciones concurrentes calculan el mismo hueco y la segunda viola la PK. ✔ |

<a id="final-2023-08-01"></a>
### 01/08/2023 · presencial

Fuente: `finales 2023 y algunos antes/Finales GDD.docx (foto corregida: 6)`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 1a | La lectura confirmada (READ COMMITTED) nunca genera bloqueos, dado que solo los niveles de aislamiento superiores como SERIALIZABLE pueden hacerlo. | V/F · Transacciones | **F** ✅ oficial<br><sub>El alumno puso F y sumó. Read Committed toma bloqueos compartidos al leer (y exclusivos al escribir).</sub> |
| 1b | Pueden existir situaciones donde recorrer secuencialmente una tabla es más eficiente que acceder mediante un índice. | V/F · Hash/índices | **V** ✅ oficial<br><sub>El alumno puso V y sumó.</sub> |
| 2a | Describa (en no más de 1 carilla) el concepto de OLAP y OLTP. Ejemplifique. | Teoría · OLAP/DW | desarrollo |
| 2b | Explique (en no más de 10 renglones) las diferencias entre un árbol B y un árbol binario de búsqueda balanceado. | Teoría · Árboles | desarrollo |
| 3a | El mismo SP descuenta_stock ejecutado N veces en paralelo con EXEC descuenta_stock 1, 1, 100: explicar qué problema presenta. | **D** · Producto-Stock | Con READ COMMITTED puede dejar stock negativo (todas validan antes de que alguna descuente); con REPEATABLE READ o SERIALIZABLE, deadlocks y víctimas. ✔ |
| 3b | Por error hay N registros de stock para el mismo depósito y producto: dejar 1 registro por par con la suma de las cantidades y evitar que vuelva a pasar. | **C** · Producto-Stock | SP (o script) que inserte las sumas y borre los duplicados en una transacción + UNIQUE (id_deposito, id_producto) o trigger. ✔ |

<a id="final-2023-09-27"></a>
### 27/09/2023 · presencial

Fuente: `finales 2023 y algunos antes/Finales GDD.docx (foto)`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 1a | Una función escalar no puede retornar null. | V/F · Objetos BD | **F** ✔ |
| 1b | Si el árbol de Huffman posee N niveles, entonces el código de mayor tamaño posee N bits. | V/F · Huffman | **F** ✔ |
| 2a | Desarrolle 2 objetos de una base de datos que sirven para asegurar la Integridad de datos. | Teoría · Objetos BD | desarrollo |
| 2b | Explique la funcionalidad de una ETL y el concepto de staging área en una implementación de Data Warehouse. | Teoría · OLAP/DW | desarrollo |
| 3a | PARAMETROS(clave PK, valor varchar NULL). SP sp_increment_parametro: BEGIN TRAN; SELECT @valor; UPDATE valor = @valor + 1; COMMIT. Inconvenientes si muchos usuarios lo invocan en paralelo con SERIALIZABLE. | **D** · Números | Deadlocks: todos leen con bloqueo compartido retenido y después piden exclusivo; el motor mata víctimas y esas invocaciones se pierden (con error). Además @valor + 1 convierte el varchar a int: falla si el valor no es numérico. ✔ |
| 3b | PARAMETROS con al menos 1000 filas: ¿qué devuelve SELECT MIN(f1.clave), MAX(f2.clave) FROM parametros f1, parametros f2 WHERE f1.clave > f2.clave? | **A** · Números | La segunda clave más chica y la segunda más grande. ✔ |

<a id="final-2023-12-05"></a>
### 05/12/2023 · presencial

Fuente: `finales 2023 y algunos antes/Finales GDD.docx (foto)`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 1a | Una tabla no puede tener 2 claves foráneas que referencien a la misma tabla. | V/F · Objetos BD | **F** ✔ |
| 1b | Si una columna posee la constraint UNIQUE, entonces una sola fila como máximo puede contener NULL en dicha columna. | V/F · Objetos BD | **V** ✔ |
| 2a | Determinar qué índices implementaría sobre las tablas de una consulta (usuario/rol con OR, LIKE '%Gonzalez' y lower()) sabiendo que no hay claves implementadas. Justificar. | Teoría · Hash/índices | desarrollo |
| 2b | Enumere y explique al menos tres algoritmos de clasificación que conozca. | Teoría · Ordenamiento | desarrollo |
| 3a | Juego(jugador, jugada, carta), 2 jugadores, gana la carta mayor y en empate gana el 1; empieza el 1 y luego el ganador de la mano anterior. Describir qué retorna una query ordenada por jugada y por un CASE con subconsulta TOP 1 ... ORDER BY carta DESC de la jugada anterior. | **A** · Juego | Las jugadas en orden y, dentro de cada una, primero quien ganó la mano anterior. Falla en los empates: el TOP 1 entre cartas iguales no garantiza elegir al jugador 1. ✔ |
| 3b | Jugador y mayor carta jugada por cada uno, primero el de la mayor carta (empate: jugador 1). Sin tablas auxiliares, cursores, subconsultas en el FROM ni vistas. | **B** · Juego | SELECT jugador, MAX(carta) FROM Juego GROUP BY jugador ORDER BY MAX(carta) DESC, jugador. ✔ |

<a id="final-2023-12-12"></a>
### 12/12/2023 · presencial

Fuente: `finales 2023 y algunos antes/Finales GDD.docx (foto)`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 1a | Una de las ventajas de los Stored Procedures es que se utilizan para manejar la seguridad en la base de datos. | V/F · Objetos BD | **V** ✔ |
| 1b | No es posible realizar [palabra faltante en la foto] a través de una vista. | V/F · Objetos BD | **?** ⬜ en blanco<br><sub>El enunciado está incompleto. Si era 'inserts', es F.</sub> |
| 2a | Explicar 2 métodos de ordenamiento recursivos vistos durante la materia. | Teoría · Ordenamiento | desarrollo |
| 2b | Dé un ejemplo donde sería adecuado aplicar un nivel de aislamiento Read uncommitted y otro para Serializable. Justifique. | Teoría · Transacciones | desarrollo |
| 3a | Numeros(clave PK, valor) vacía: trigger de insert que valide que las claves sean consecutivas desde 1. Ya posee un trigger INSTEAD OF que no puede modificarse y una constraint de no positivos. | **C** · Números | Trigger AFTER INSERT (no puede haber otro INSTEAD OF INSERT): IF MAX(clave) <> COUNT(*) → ROLLBACK (con claves positivas y únicas eso equivale a 1..n sin huecos). ✔ |
| 3b | Otro trigger de insert que valide que los valores no nulos del campo valor sean únicos. Explicar por qué no se puede con una Constraint UNIQUE. | **C** · Números | Trigger AFTER INSERT (y UPDATE) con GROUP BY valor HAVING COUNT(*) > 1 sobre los no nulos → ROLLBACK. UNIQUE no sirve porque en SQL Server admite un solo NULL. ✔ |

<a id="final-2024-02-20"></a>
### 20/02/2024 · presencial

Fuente: `finales 2024/20-02-24.jpg`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 1a | El tiempo de ejecución de cualquier algoritmo de clasificación es directamente proporcional a la cantidad de elementos a ordenar. | V/F · Ordenamiento | **F** ✔ |
| 1b | En una tabla de una base de datos relacional no se puede definir más de un trigger por cada evento (insert, delete, update). | V/F · Objetos BD | **F** ✔ |
| 2a | Describa la arquitectura interna de un DBMS: niveles o capas, funcionalidad y funcionamiento de cada uno. | Teoría · Relacional/SQL | desarrollo |
| 2b | Desarrolle el concepto de Grafos, su posible utilización, clasificación y representación computacional. | Teoría · Grafos | desarrollo |
| 3a | N = feriados de 2012. SELECT COUNT(*), FechaCheckOut FROM Alojamientos RIGHT JOIN Feriados ON FechaCheckOut = Fecha AND anio = 2012 GROUP BY FechaCheckOut ORDER BY 2. Opciones I-VI. | **A** · Feriados | V) Como máximo N + 1 filas: hasta N fechas que coinciden más un grupo NULL (todos los feriados sin checkout, incluidos los de otros años que el RIGHT JOIN conserva). ⚠️ polémica<br><sub>La resolución del alumno dice II (máximo N): olvida el grupo NULL.</sub> |
| 3b | Lo mismo con LEFT JOIN y GROUP BY Fecha. | **A** · Feriados | V) Como máximo N + 1 filas: hasta N fechas de feriado más un grupo NULL (alojamientos sin feriado). ⚠️ polémica |

<a id="final-2024-02-27"></a>
### 27/02/2024 · presencial

Fuente: `finales 2024/final 27-02-24.txt (reconstruido de memoria por un alumno)`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 1a | El nivel de aislamiento SERIALIZABLE es el único que evita las lecturas fantasmas. | V/F · Transacciones | **V** ⚠️ polémica<br><sub>Entre los 4 niveles ANSI que enseña la cátedra, V. (SQL Server además tiene SNAPSHOT, que también las evita.)</sub> |
| 1b | Si en Huffman el código del símbolo más largo es de 15 bits, entonces el árbol tiene 16 niveles. | V/F · Huffman | **V** ✔ |
| 2a | Explicar Hashing como método de acceso a datos. | Teoría · Hash/índices | desarrollo |
| 2b | Explicar las diferencias entre vista y snapshot. | Teoría · Objetos BD | desarrollo |
| 3a | SELECT 1 FROM PAIS P JOIN PROVINCIA PR ON P.idpais = PR.idpais JOIN CIUDAD C ON C.idpcia = PR.idpcia GROUP BY p.idpcia (joins por PK/FK, sin nulos ni tablas vacías). Opciones: 1 fila / 1 por provincia / error de ejecución / error de compilación. | **A** · País-Prov-Ciudad | Error de compilación: PAIS no tiene la columna idpcia (Invalid column name). ⚠️ polémica<br><sub>El alumno no estaba seguro ('ninguna').</sub> |
| 3b | Para cada país, el total de sus provincias y de sus ciudades. | **B** · País-Prov-Ciudad | Pais LEFT JOIN Provincia LEFT JOIN Ciudad, GROUP BY país, COUNT(DISTINCT idpcia) y COUNT(idciudad). ✔ |

<a id="final-2024-03-05"></a>
### 05/03/2024 · presencial

Fuente: `finales 2024/05-03-24.jpg`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 1a | La funcionalidad de un Constraint de tipo check siempre puede ser reemplazada por un trigger. | V/F · Objetos BD | **V** ✔ |
| 1b | Los niveles de aislamiento permiten que no se generen deadlocks. | V/F · Transacciones | **F** ✔ |
| 2a | Comparar procesos OLTP vs. OLAP en cuanto a su utilización y diseño de base de datos. | Teoría · OLAP/DW | desarrollo |
| 2b | ¿Qué representa la sigla ACID? Desarrolle cada uno de sus componentes. | Teoría · Transacciones | desarrollo |
| 3a | Numeros(numero PK) con al menos N registros (N > 4): SELECT 1 FROM Numeros t1, Numeros t2 WHERE t1.numero < t2.numero GROUP BY t1.numero, t2.numero. Opciones: 1 / N / N−1 / N² / Σ i de 1 a N−1 / ninguna. | **A** · Números | e) Σ i (i = 1..N−1) = N(N−1)/2: una fila por cada par distinto con el primero menor. ⚠️ polémica<br><sub>Si la tabla tuviera más de N filas la cuenta sería mayor; se toma N como la cantidad de filas, que es lo que busca la pregunta.</sub> |
| 3b | Reescribir con una sola tabla en el FROM principal: SELECT MIN(t1.numero) AS Valor1, MAX(t2.numero) AS Valor2 FROM Numeros t1, Numeros t2 WHERE t1.numero > t2.numero. | **B** · Números | Es el 2º mínimo y el 2º máximo: SELECT MIN(numero), (SELECT MAX(numero) FROM Numeros WHERE numero < (SELECT MAX(numero) FROM Numeros)) FROM Numeros WHERE numero > (SELECT MIN(numero) FROM Numeros). ✔ |

<a id="final-2024-04-especial"></a>
### 04/2024 (especial) · presencial

Fuente: `finales 2024/final-especial-abri-24l.jpg (foto corregida: 9)`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 1a | Toda consulta que utilice al menos una función de grupo debe ir acompañada de la cláusula GROUP BY. | V/F · Relacional/SQL | **F** ✅ oficial<br><sub>El alumno puso F y sumó. SELECT COUNT(*) FROM t no lleva GROUP BY.</sub> |
| 1b | La reexpresión de caracteres al aplicar Huffman implica la disminución de 8 bits para la expresión de todos los caracteres. | V/F · Huffman | **F** ✅ oficial<br><sub>El alumno puso F y sumó.</sub> |
| 2a | Desarrollar el concepto de join, enumere y explique cada uno de los tipos. Ejemplifique. | Teoría · Relacional/SQL | desarrollo |
| 2b | Enumere y explique al menos tres algoritmos de clasificación u ordenamiento que conozca. | Teoría · Ordenamiento | desarrollo |
| 3a | Persona con su_padre_es: personas con sus abuelos paternos. | **B** · Persona | Doble self-join hijo → padre → abuelo. ✅ oficial<br><sub>2/2 en la foto.</sub> |
| 3b | Padres y cuántos hijos tienen. | **B** · Persona | Self-join + GROUP BY padre + COUNT(*). ✔ |

<a id="final-2024-07-23"></a>
### 23/07/2024 · presencial

Fuente: `finales 2024/final-23-07-24.jpg (foto corregida: 8)`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 1a | Un árbol binario completo es un árbol N-ario con N=2, donde todos sus niveles están llenos. | V/F · Árboles | **F** ⚠️ polémica<br><sub>Eso es un árbol LLENO. Para la cátedra, completo = cada nodo tiene 0 o 2 hijos. El alumno la dejó en blanco (0 puntos).</sub> |
| 1b | Las funciones creadas por el usuario (objeto function) en T-SQL no permiten sentencias INSERT/DELETE/UPDATE en su cuerpo. | V/F · Objetos BD | **V** ✅ oficial<br><sub>El alumno puso V y sumó. (Matiz: sí permiten DML sobre variables de tipo tabla locales.)</sub> |
| 2a | Explique las diferencias entre los modelos OLAP y OLTP (máx. 10 renglones). | Teoría · OLAP/DW | desarrollo |
| 2b | Explique LECTURA SUCIA, LECTURA REPETIBLE y LECTURA FANTASMA. Indique cómo se comportan READ COMMITTED y REPEATABLE READ ante esos conceptos. | Teoría · Transacciones | desarrollo |
| 3a | Usuario/Perfil/Usuario_Perfil/Login: por usuario, nombre, fecha de alta, detalle de estado, cantidad de perfiles, perfil con más logins fallidos (empate: menor código) y logins fallidos totales. Sin subselects en el FROM. | **B** · Login | Usuario LEFT JOIN Usuario_Perfil + GROUP BY usuario; subconsulta TOP 1 ... ORDER BY COUNT DESC, id para el perfil; subconsulta COUNT para fallidos. ✔ |
| 3b | Objetos para que con 3 logins fallidos en el mismo día la cuenta pase a bloqueada sin grabar más fallidos ese día, y que con el password genérico '00x@T3st' un usuario bloqueado o inactivo se reactive registrando 'Primer ingreso'. Considerar concurrencia. | **C** · Login | INSTEAD OF INSERT en Login (multifila, con cursor si hace falta) que decida por fila: descartar, insertar, bloquear o reactivar; leer los contadores con UPDLOCK/HOLDLOCK para la concurrencia. ✔ |

<a id="final-2024-07-30"></a>
### 30/07/2024 · presencial

Fuente: `finales 2024/FINAL 30-07-24/Final 30.07.24.jpg + resolucionCatedra.txt (respuestas de la cátedra en la revisión)`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 1a | Conviene en términos de velocidad buscar en una estructura de hash por una clave que buscar en una estructura de árbol B+. | V/F · Hash/índices | **F** ✅ oficial<br><sub>Respuesta de la cátedra en la revisión. 'Teóricas GDD' dice V. Lectura más probable: 'una clave' no dice que sea única ni existente; con claves duplicadas o colisiones hashing no conviene.</sub> |
| 1b | El nivel de aislamiento repeatable read acepta lecturas fantasmas. | V/F · Transacciones | **V** ✅ oficial |
| 2a | Explique y desarrolle 2 objetos de base de datos que puedan ser utilizados para asegurar la integridad de datos. | Teoría · Objetos BD | desarrollo<br><sub>Cátedra: valían Constraints (cuentan como 1), Triggers, Stored Procedures o Vistas WITH CHECK OPTION.</sub> |
| 2b | Comparar procesos OLTP vs. OLAP (DSS) en cuanto a su utilización de base de datos. | Teoría · OLAP/DW | desarrollo |
| 3a | Crear los objetos para poder borrar una Provincia con un comando DELETE. | **C** · País-Prov-Ciudad | Trigger INSTEAD OF DELETE en Provincia que soporte varias filas: primero DELETE de Ciudad WHERE idpcia IN (SELECT idpcia FROM deleted) y después de Provincia. Con un SP no vale: tiene que funcionar con DELETE. ✅ oficial |
| 3b | A: BEGIN; INSERT país 1000; INSERT provincia con 3 columnas y 4 valores; COMMIT. B: BEGIN; READ UNCOMMITTED; INSERT el mismo país 1000; COMMIT. Opciones A-E. | **D** · País-Prov-Ciudad | E) Ninguna: B queda bloqueado por la clave que insertó A; el INSERT de provincia de A falla (columnas ≠ valores) pero A confirma el país; luego el INSERT de B falla por PK. Queda el país sin provincia. ✅ oficial |

<a id="final-2024-10-18"></a>
### 18/10/2024 · presencial

Fuente: `finales 2024/final-18-10-24.jpg`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 1a | Las funciones de hashing no poseen funciones inversas. | V/F · Hash/índices | **V** ⚠️ polémica<br><sub>Muchas claves van a la misma posición (no es inyectiva): no se puede volver atrás. Teóricas, Resumen y el banco de Reinosa dicen V; un banco dice F ('hay funciones invertibles').</sub> |
| 1b | Un constraint de tipo CHECK siempre puede ser reemplazado por un trigger. | V/F · Objetos BD | **V** ✔ |
| 2a | Describa el concepto de Transaccionalidad, aislamiento y bloqueos en una base de datos relacional. | Teoría · Transacciones | desarrollo |
| 2b | Explique detalladamente el modelo estrella para el armado de un Data Warehouse en un DBMS. | Teoría · OLAP/DW | desarrollo |
| 3a | Persona con su_padre_es: personas con sus abuelos paternos. | **B** · Persona | Doble self-join hijo → padre → abuelo. ✔ |
| 3b | Padres y cuántos hijos tienen. | **B** · Persona | Self-join + GROUP BY padre + COUNT(*). ✔ |

<a id="final-2024-12-03"></a>
### 03/12/2024 · presencial

Fuente: `finales 2024/final 03-12-24.jpg`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 1a | El análisis del plan de consulta permite detectar la operatoria interna desarrollada por un RDBMS para procesar la consulta. | V/F · Relacional/SQL | **V** ✔ |
| 1b | Colocar un nivel de aislamiento muy restrictivo garantiza que siempre se van a poder ejecutar y finalizar con éxito un procedimiento. | V/F · Transacciones | **F** ✔ |
| 2a | Indique por qué un índice conformado por una clave numérica corta es más rápido en el acceso a los datos que un índice compuesto o conformado con un string largo. | Teoría · Hash/índices | desarrollo |
| 2b | Explique en qué casos la presencia de un índice en una tabla podría generar mayor caída de performance que la ventaja aportada. | Teoría · Hash/índices | desarrollo |
| 3a | dia LEFT JOIN horario h1 (turno 0) JOIN materia m1 LEFT JOIN horario h2 (turno 1) JOIN materia m2, con ISNULL(..., 'LIBRE'), para ver la ocupación del laboratorio 401. a) no compila b) error en ejecución c) se ejecuta pero no retorna lo pedido d) retorna lo solicitado. | **A** · Laboratorio | c) El JOIN con materia anula el LEFT JOIN: los días con un turno libre desaparecen y nunca se muestra 'LIBRE'. ⚠️ polémica<br><sub>En la foto el alumno marcó d). Para que funcione, los JOIN con materia tienen que ser LEFT JOIN.</sub> |
| 3b | Implementar 'una materia no puede estar asignada en el mismo día en laboratorios diferentes' sin alterar la estructura. | **C** · Laboratorio | Trigger AFTER INSERT, UPDATE en Horario: IF EXISTS (inserted i JOIN Horario h ON misma materia y día AND h.labo_id <> i.labo_id) → ROLLBACK. ✔ |

<a id="final-2024-12-10"></a>
### 10/12/2024 · presencial

Fuente: `finales 2024/final 10-12-24.txt (reconstruido de memoria; falta un V/F)`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 1 | La complejidad computacional de los métodos de ordenamiento depende del espacio ocupado por las estructuras que se usan. | V/F · Ordenamiento | **F** ✔ |
| 2a | Describir transaccionalidad, aislamiento y bloqueos. | Teoría · Transacciones | desarrollo |
| 2b | Definir grafos, clasificación y representación computacional. | Teoría · Grafos | desarrollo |
| 3a | Explicar qué devuelve: SELECT a.nombre, b.nombre, c.nombre FROM persona c LEFT JOIN persona b ON c.su_padre_es = b.id LEFT JOIN persona a ON b.su_padre_es = a.id. | **A** · Persona | Todas las personas (c) con el nombre de su padre (b) y de su abuelo paterno (a); NULL cuando no lo tienen. Columnas en orden abuelo, padre, persona. ✔ |
| 3b | Codificar la restricción de que no puede haber una relación cíclica entre padre e hijo (que alguien termine siendo ancestro de sí mismo). | **C** · Persona | Trigger AFTER INSERT, UPDATE en Persona con CTE recursiva que sube por su_padre_es desde cada fila de inserted; si vuelve a la misma persona → ROLLBACK. ✔ |

<a id="final-2024-12-17"></a>
### 17/12/2024 · presencial

Fuente: `finales 2024/final 17-12-24.JPG (foto corregida: 8)`

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 1a | ABB: si el barrido postorden es 9, 12, 16, 15 y 10, entonces el preorden sobre el mismo árbol es 10, 9, 12, 15 y 16. | V/F · Árboles | **F** ✔ |
| 1b | Huffman: el árbol binario es completo. | V/F · Huffman | **V** ✅ oficial<br><sub>El alumno puso V y sumó.</sub> |
| 2a | Realice una comparación entre Hashing y árbol B como método de acceso a datos. | Teoría · Hash/índices | desarrollo |
| 2b | Explique un método estático de implementación de árboles binarios. | Teoría · Árboles | desarrollo |
| 3a | Los 5 primeros países del alfabeto y los 5 últimos (las 2 columnas). | **B** · País-Prov-Ciudad | Igual que en 2022: dos TOP 5 (ASC y DESC) combinados. ✅ oficial<br><sub>2/2 en la foto.</sub> |
| 3b | SELECT pa.IDPAIS, SUM(pro.HABITANTES), COUNT(*) FROM pais pa INNER JOIN provincias pro ON ... GROUP BY pa.IDPAIS. Opciones A-D. | **A** · País-Prov-Ciudad | D. ✅ oficial<br><sub>El alumno marcó D y sacó 2/2.</sub> |

<a id="final-2025-02-11"></a>
### 11/02/2025 · presencial

Fuente: `INVESTIGACION-para-claude-code.md + hilo de UTNianos (transcripción de un alumno)`  
Dieron 5 minutos para leer el examen antes de decidir si rendir.

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 1a | En SQL, una subconsulta en el WHERE siempre debe retornar una columna. | V/F · Relacional/SQL | **F** ✔ |
| 1b | En una tabla de una base de datos relacional no se puede definir más de un trigger por cada evento (insert, update, delete). | V/F · Objetos BD | **F** ✔ |
| 2a | Explicar la utilidad de obtener el plan de ejecución de un SELECT de consulta de datos. | Teoría · Relacional/SQL | desarrollo |
| 2b | Indique los distintos niveles de aislamiento de un DBMS indicando claramente qué tipos de bloqueos se ejecutan en cada uno de ellos. | Teoría · Transacciones | desarrollo |
| 3a | Consulta con producto cartesiano contra una tabla vacía (según el alumno, idéntica a un final anterior; el enunciado está en una imagen del hilo). | **A** · Tablas genéricas | Conjunto vacío: el producto cartesiano con una tabla vacía no tiene filas. ✔ |
| 3b | Empleado(empl_id PK, empl_descr, empl_jefe FK a Empleado): crear una VISTA con código y nombre del jefe, código y nombre de cada empleado a cargo y la cantidad de empleados a cargo del jefe, con alias en cada columna, solo para jefes con más de 5 empleados. | **B** · Empleado-jefe | CREATE VIEW con self-join jefe-empleado; la cantidad con una subconsulta correlacionada; filtrar los jefes con más de 5 empleados. ✔ |

<a id="final-2025-02-18"></a>
### 18/02/2025 · presencial

Fuente: `INVESTIGACION-para-claude-code.md + hilo de UTNianos (respuestas de un alumno)`  
Los dos V/F fueron Verdaderos según el alumno, pero el texto está en una imagen del hilo que no se pudo leer. Dieron 5 minutos para leer el examen.

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 2a | Desarrolle el concepto de grafos: tipos, usos y representación estática y dinámica. | Teoría · Grafos | desarrollo |
| 2b | Desarrollar el concepto de join, enumere y explique cada uno de los tipos. | Teoría · Relacional/SQL | desarrollo |
| 3a | Script sobre una tabla con numero UNIQUE (INSERTs, UPDATE ... WHERE 1=1 OR numero IS NOT NULL AND numero > 0, INSERT NULL): indicar errores y contenido final. Enunciado en imagen; parecido al del 22/02/2023. | **A** · Números | Sin errores según el alumno: queda 2, 4, 6, NULL. El WHERE es siempre verdadero porque AND se evalúa antes que OR. ✔ |
| 3b | Producto cartesiano de una tabla consigo misma (t1.numero > t2.numero) con MAX sobre las dos copias, sin GROUP BY: ¿qué devuelve? | **A** · Números | El mayor y el segundo mayor valor. No hace falta GROUP BY porque el SELECT solo tiene funciones de agregado. ✔ |

<a id="final-2025-07-29"></a>
### 29/07/2025 · presencial

Fuente: `INVESTIGACION-para-claude-code.md + hilo de UTNianos (transcripción de un alumno)`  
V/F sin justificar. La materia ya se llama Bases de Datos.

| # | Pregunta | Tema · tipo | Respuesta |
|---|---|---|---|
| 1a | Si a un árbol binario de búsqueda se le realiza un barrido simétrico, se obtiene un conjunto ordenado de datos. | V/F · Árboles | **V** ✔ |
| 1b | El algoritmo Quicksort utiliza la técnica de «divide y vencerás». | V/F · Ordenamiento | **V** ✔ |
| 2a | Definir brevemente el concepto de constraint. Dar 3 ejemplos y explicarlos. | Teoría · Objetos BD | desarrollo |
| 2b | Definir qué son las propiedades ACID. | Teoría · Transacciones | desarrollo |
| 3a | País/Provincia/Ciudad: consulta que devuelva los países que no tienen ciudades cargadas. | **B** · País-Prov-Ciudad | Pais con NOT EXISTS (Provincia JOIN Ciudad del mismo país). ✔ |
| 3b | FROM Pais LEFT JOIN Provincia ... JOIN Ciudad ...: elegir el resultado entre 4 opciones (no transcriptas). | **A** · País-Prov-Ciudad | Ninguna de las 4, según el alumno: el JOIN con Ciudad anula el LEFT JOIN y se pierden los países sin provincias o sin ciudades. ✔ |

---

## 9. Qué significa para estudiar

1. **La práctica decide el final:** vale 4 puntos y tenés que aprobar al menos un ejercicio. Prioridad: **A y B** (63% de los ejercicios), después **D** (concurrencia: siempre el mismo esqueleto) y **C** (5 plantillas de trigger).
2. **Teoría:** con respuestas modelo de **transacciones, hashing/índices, objetos de integridad y OLTP/OLAP** cubrís la mayoría. Sumá grafos, joins y plan de ejecución, ordenamiento, ANSI/SPARC y árbol B vs ABB, que son cortos.
3. **V/F:** banco con todas las afirmaciones de tus archivos, sin repetir, con la regla +1/−1/0 y las polémicas marcadas.
4. **Simulacros** con preguntas reales: el reciclaje hace que muchas vuelvan textuales.
