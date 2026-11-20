// Archivo generado por herramientas/generar_datos_js.py a partir de datos/*.json.
// No lo edites a mano: cambiá los .json y volvé a correr el script.
window.GUIA = {
 "temas": {
  "transacciones": "Transacciones, ACID, aislamiento y bloqueos",
  "hashing": "Hashing vs Árbol B e índices",
  "integridad": "Integridad y objetos de BD (constraints, triggers, vistas, snapshots, SP vs función)",
  "olap": "OLTP/OLAP, Data Warehouse, ETL, modelo estrella",
  "grafos": "Grafos",
  "arboles": "Árboles (B, B+, ABB, barridos) y Huffman",
  "ordenamiento": "Algoritmos de ordenamiento",
  "relacional": "Arquitectura ANSI/SPARC, modelo relacional, joins y SQL"
 },
 "tipos_practica": {
  "A": "¿Qué devuelve / qué pasa? (analizar una consulta o un script)",
  "B": "Escribir una consulta (o una sentencia DML)",
  "C": "Programar objetos: trigger, SP, función o DDL para una regla",
  "D": "Concurrencia: procesos en paralelo, aislamiento y bloqueos"
 },
 "unidades": {
  "1": "Estructuras de datos (grafos, pilas, colas, listas, árboles; representación estática y dinámica)",
  "2": "Manipulación de datos (ordenamiento, búsqueda, árboles binarios y n-arios, árbol B, hashing, Huffman, encriptamiento)",
  "3": "Diseño de datos (modelo relacional, ER, claves, normalización, arquitectura ANSI/SPARC, cliente-servidor)",
  "4": "Bases de datos (tipos de BD, SQL y T-SQL, transacciones y concurrencia, integridad, seguridad, recuperación, DW/OLAP)"
 },
 "tema_unidad": {
  "grafos": 1,
  "arboles": 2,
  "hashing": 2,
  "ordenamiento": 2,
  "transacciones": 4,
  "integridad": 4,
  "olap": 4,
  "relacional": "según el ítem (campo unidad)"
 },
 "finales": [
  {
   "id": "2018-02-21",
   "fecha": "21/02/2018",
   "formato": "presencial",
   "fuente": "finales 2023 y algunos antes/Finales GDD.docx (foto del enunciado)",
   "vf": [
    {
     "n": "1a",
     "texto": "El Árbol B+ es un árbol Principal Derecho Balanceado.",
     "tema": "arboles",
     "respuesta": "V",
     "estado": "razonada",
     "nota": "El libro de Estructuras de Datos de UTN (Pérez, sobre Pfaltz) dice que «los términos árbol y árbol principal derecho son sinónimos». El B+ es un árbol y está balanceado (todas las hojas al mismo nivel). Teóricas dice F sin justificarlo."
    },
    {
     "n": "1b",
     "texto": "Para entornos transaccionales de alta concurrencia es conveniente setear el Isolation Level en Repeatable Read.",
     "tema": "transacciones",
     "respuesta": "F",
     "estado": "consenso",
     "nota": "Más bloqueos y más riesgo de deadlock; en alta concurrencia conviene un nivel más permisivo (Read Committed)."
    }
   ],
   "teoria": [
    {
     "n": "2a",
     "texto": "Explique el objeto vista: definición, para qué casos lo usaría y su relación con la seguridad e integridad.",
     "tema": "integridad",
     "clave": "vista"
    },
    {
     "n": "2b",
     "texto": "Explique el concepto de Dominio y las reglas de Integridad de Entidad, Referencial y Semántica.",
     "tema": "integridad",
     "clave": "reglas-integridad"
    }
   ],
   "practica": [
    {
     "n": "3a",
     "tipo": "C",
     "modelo": "pais-provincia-ciudad",
     "texto": "Implementar la regla: si una provincia no posee ciudades, Habitantes debe ser NULL; si tiene, debe ser mayor a 0 (la regla se cumple hoy y acceden n aplicaciones).",
     "respuesta": "Triggers AFTER sobre Provincia (INSERT/UPDATE) y sobre Ciudad (INSERT/UPDATE/DELETE) que validen la regla para las provincias afectadas y hagan ROLLBACK.",
     "estado": "consenso"
    },
    {
     "n": "3b",
     "tipo": "A",
     "modelo": "pais-provincia-ciudad",
     "texto": "¿Qué devuelve? SELECT pro.idPcia, ISNULL(pro.habitantes,0), pa.detalle FROM provincia pro JOIN pais pa ... WHERE pro.habitantes = (SELECT MAX(pro2.habitantes) ... del mismo país) ORDER BY pro.habitantes. Opciones A/B/C.",
     "respuesta": "B: como mínimo 1 fila por país con al menos 1 provincia con ciudades (los NULL no pasan el '=' y puede haber empates).",
     "estado": "consenso"
    }
   ]
  },
  {
   "id": "2018-03-12",
   "fecha": "12/03/2018",
   "formato": "presencial",
   "fuente": "finales 2018/2018-Final_12_de_Marzo.pdf",
   "vf": [
    {
     "n": "1a",
     "texto": "Si se desea que no se puedan eliminar registros de una tabla de auditoría, una opción es crear un trigger que lo impida.",
     "tema": "integridad",
     "respuesta": "V",
     "estado": "consenso",
     "nota": "Por ejemplo un INSTEAD OF DELETE que no borre, o un AFTER DELETE con ROLLBACK."
    },
    {
     "n": "1b",
     "texto": "La cantidad de nodos de un árbol de expresión siempre es par.",
     "tema": "arboles",
     "respuesta": "F",
     "estado": "consenso",
     "nota": "Con operadores binarios cada nodo interno tiene 2 hijos: n = 2i + 1, siempre impar. Ej: (2*3)+6 tiene 5 nodos."
    }
   ],
   "teoria": [
    {
     "n": "2a",
     "texto": "Defina el concepto de transacción en un Sistema de Base de Datos.",
     "tema": "transacciones",
     "clave": "transaccion-def"
    },
    {
     "n": "2b",
     "texto": "¿Qué representa la sigla ACID? Desarrolle cada uno de sus componentes.",
     "tema": "transacciones",
     "clave": "acid"
    }
   ],
   "practica": [
    {
     "n": "3a",
     "tipo": "A",
     "modelo": "usuarios-ingresos",
     "clave": "vista-usuarios-ingresos",
     "texto": "Vista vw_final (último ingreso por usuario o fecha de alta si nunca ingresó) hecha con UNION, pero la segunda parte NO filtra a los que ya ingresaron. Opciones I-IV.",
     "respuesta": "II: se crea pero no devuelve lo pedido (agrega la fecha de alta de TODOS los usuarios). Falta WHERE NOT EXISTS (ingresos del usuario).",
     "estado": "consenso"
    },
    {
     "n": "3b",
     "tipo": "C",
     "modelo": "usuarios-ingresos",
     "texto": "DELETE FROM usuarios WHERE idusuario = 8 da error: explicar el motivo e implementar los objetos para poder borrar usuarios así.",
     "respuesta": "Falla por la FK de Ingresos. INSTEAD OF DELETE en Usuarios que borre primero los Ingresos de los usuarios de deleted y después los Usuarios (multifila, con IN/JOIN contra deleted).",
     "estado": "consenso"
    }
   ]
  },
  {
   "id": "2018-07-17",
   "fecha": "17/07/2018",
   "formato": "presencial",
   "fuente": "finales 2018/2018-Final_17_de_Julio.pdf",
   "vf": [
    {
     "n": "1a",
     "texto": "Es posible implementar el concepto de ABB (Árbol Binario de Búsqueda) en un Array.",
     "tema": "arboles",
     "respuesta": "V",
     "estado": "consenso",
     "nota": "Representación estática: hijos de la posición i en 2i y 2i+1 (o 2i+1 y 2i+2)."
    },
    {
     "n": "1b",
     "texto": "Todo grafo de grado 2 es un árbol binario.",
     "tema": "grafos",
     "clave": "grafo-grado2",
     "respuesta": "F",
     "estado": "oficial",
     "nota": "Oficial por la nota del 16/12/2022 (misma afirmación). Contraejemplo: un triángulo o un nodo con bucle tienen grado 2 y no son árboles."
    }
   ],
   "teoria": [
    {
     "n": "2a",
     "texto": "Relacione y explique los conceptos de transacción, lockeos y aislamiento.",
     "tema": "transacciones",
     "clave": "transaccion-aislamiento-bloqueos"
    },
    {
     "n": "2b",
     "texto": "Explique la arquitectura interna de un Sistema de Base de Datos.",
     "tema": "relacional",
     "clave": "arquitectura",
     "unidad": 3
    }
   ],
   "practica": [
    {
     "n": "3a",
     "tipo": "A",
     "modelo": "empresa-area-empleado",
     "texto": "¿Qué devuelve? SELECT e.id_empresa, COUNT(DISTINCT a.id_area), COUNT(em.id_empresa) FROM empresa e JOIN area a ... LEFT JOIN empleado em ... GROUP BY e.id_empresa. Opciones A-D.",
     "respuesta": "B: 1 fila por empresa con al menos 1 área; cantidad de áreas (todas, el LEFT JOIN las conserva) y cantidad de empleados.",
     "estado": "razonada",
     "nota": "Las dos resoluciones de alumnos dicen C, pero C exige 'al menos un empleado' y eso lo impediría solo un INNER JOIN con empleado."
    },
    {
     "n": "3b",
     "tipo": "B",
     "modelo": "empresa-area-empleado",
     "texto": "Consulta: un renglón por empresa con al menos 1 área y ninguna área con más de 10 empleados: id_empresa, cantidad de áreas y cantidad de empleados.",
     "respuesta": "JOIN empresa-área + LEFT JOIN empleado, GROUP BY empresa, y excluir empresas con alguna área de más de 10 empleados (NOT EXISTS / NOT IN con HAVING COUNT > 10).",
     "estado": "consenso"
    }
   ]
  },
  {
   "id": "2019-02-12",
   "fecha": "12/02/2019",
   "formato": "presencial",
   "fuente": "finales 2019/2019-Final_12_de_Febrero.pdf",
   "vf": [
    {
     "n": "1a",
     "texto": "Un constraint de tipo CHECK siempre puede ser reemplazado por un trigger.",
     "tema": "integridad",
     "clave": "check-trigger",
     "respuesta": "V",
     "estado": "consenso",
     "nota": "Todo lo que valida un CHECK lo puede validar un trigger (al revés no)."
    },
    {
     "n": "1b",
     "texto": "Los árboles B garantizan un número de niveles menor que otros árboles.",
     "tema": "arboles",
     "respuesta": "F",
     "estado": "consenso",
     "nota": "La altura depende de la cantidad de claves, el orden y la ocupación de los nodos; no hay garantía frente a 'cualquier otro árbol'."
    }
   ],
   "teoria": [
    {
     "n": "2a",
     "texto": "Defina el concepto de transacción en un Sistema de Base de Datos.",
     "tema": "transacciones",
     "clave": "transaccion-def"
    },
    {
     "n": "2b",
     "texto": "Desarrolle el concepto de Grafos, su posible utilización, clasificación y representación computacional.",
     "tema": "grafos",
     "clave": "grafos-completo"
    }
   ],
   "practica": [
    {
     "n": "3a",
     "tipo": "B",
     "modelo": "persona",
     "clave": "persona-abuelos-padres",
     "texto": "Persona(id, fecha_nacimiento, apellido, nombre, su_padre_es): mostrar las personas con sus abuelos paternos (nombre y apellido de ambos).",
     "respuesta": "Doble self-join: hijo JOIN padre ON hijo.su_padre_es = padre.id JOIN abuelo ON padre.su_padre_es = abuelo.id.",
     "estado": "consenso"
    },
    {
     "n": "3b",
     "tipo": "B",
     "modelo": "persona",
     "clave": "persona-abuelos-padres",
     "texto": "Mostrar los padres y cuántos hijos tienen (nombre y apellido del padre y cantidad).",
     "respuesta": "padre JOIN hijo ON hijo.su_padre_es = padre.id GROUP BY padre.id, padre.nombre, padre.apellido con COUNT(*).",
     "estado": "consenso"
    }
   ]
  },
  {
   "id": "2019-02-26",
   "fecha": "26/02/2019",
   "formato": "presencial",
   "fuente": "finales 2019/2019-Final_26_de_Febrero.pdf",
   "vf": [
    {
     "n": "1a",
     "texto": "En el árbol de Huffman la cantidad total de nodos es (total de hojas × 2) − 1.",
     "tema": "arboles",
     "subtema": "huffman",
     "respuesta": "V",
     "estado": "consenso",
     "nota": "Cada nodo interno tiene exactamente 2 hijos: n = 2h − 1."
    },
    {
     "n": "1b",
     "texto": "Una columna que posea la constraint UNIQUE puede contener como máximo una sola fila con NULL en dicha columna.",
     "tema": "integridad",
     "clave": "unique-null",
     "respuesta": "V",
     "estado": "consenso",
     "nota": "En SQL Server (el motor de la cátedra) UNIQUE admite un único NULL. En Oracle o PostgreSQL admite varios."
    }
   ],
   "teoria": [
    {
     "n": "2a",
     "texto": "Explique el concepto, la funcionalidad y para qué se utilizan los triggers en una BD relacional.",
     "tema": "integridad",
     "clave": "triggers"
    },
    {
     "n": "2b",
     "texto": "Explique qué significa la sigla ACID y desarrolle cada concepto.",
     "tema": "transacciones",
     "clave": "acid"
    }
   ],
   "practica": [
    {
     "n": "3a",
     "tipo": "A",
     "modelo": "tablas-genericas",
     "clave": "cartesiano-vacia",
     "texto": "SELECT t1.campoA, COUNT(*) FROM tabla1 t1, tabla2 GROUP BY t1.campoA; tabla1 tiene 500 filas y tabla2 está vacía. Opciones 1-4.",
     "respuesta": "4) Conjunto vacío: el producto cartesiano con una tabla vacía es vacío (no hay grupos, ni siquiera COUNT = 0).",
     "estado": "consenso"
    },
    {
     "n": "3b",
     "tipo": "C",
     "modelo": "tablas-genericas",
     "texto": "Persons sin constraints: implementar los objetos para emular que el campo Ciudad sea FK a Ciudades(IdCiudad).",
     "respuesta": "Trigger AFTER INSERT, UPDATE en Persons (si hay ciudad no nula inexistente → ROLLBACK) y trigger AFTER DELETE, UPDATE en Ciudades (si queda alguna persona apuntando a una ciudad borrada → ROLLBACK).",
     "estado": "consenso"
    }
   ]
  },
  {
   "id": "2019-09-25",
   "fecha": "25/09/2019",
   "formato": "presencial",
   "fuente": "finales 2019/2019-Final_25_de_Septiembre.pdf",
   "vf": [
    {
     "n": "1a",
     "texto": "En una db relacional las vistas pueden ser utilizadas para brindar consistencia de datos.",
     "tema": "integridad",
     "respuesta": "F",
     "estado": "consenso",
     "nota": "La consistencia la dan las transacciones y las constraints; las vistas sirven para seguridad y simplificación. (Matiz: WITH CHECK OPTION valida lo que se inserta por la vista.)"
    },
    {
     "n": "1b",
     "texto": "En Huffman, si un carácter posee el código 0011, entonces con seguridad existe al menos otro carácter cuyo código comienza con 001.",
     "tema": "arboles",
     "subtema": "huffman",
     "respuesta": "V",
     "estado": "consenso",
     "nota": "El árbol de Huffman es completo: el nodo 0011 tiene un hermano 0010, que es hoja o tiene hojas debajo."
    }
   ],
   "teoria": [
    {
     "n": "2a",
     "texto": "Desarrolle 2 objetos de una base de datos que sirven para brindar seguridad.",
     "tema": "integridad",
     "clave": "seguridad-objetos"
    },
    {
     "n": "2b",
     "texto": "Explique las principales diferencias entre una función y un stored procedure.",
     "tema": "integridad",
     "clave": "sp-vs-funcion"
    }
   ],
   "practica": [
    {
     "n": "3a",
     "tipo": "B",
     "modelo": "carreras-caballos",
     "texto": "Carreras/Caballos: para la fecha del día, el/los nombres del caballo ganador (Puesto = 1) que menos dinero recibió en apuestas.",
     "respuesta": "Filtrar fecha de hoy y puesto 1, y quedarse con los que tienen TotalApostado = MIN(...) (no usar TOP 1: pide 'el/los').",
     "estado": "consenso"
    },
    {
     "n": "3b",
     "tipo": "C",
     "modelo": "carreras-caballos",
     "texto": "Implantar: 'por cada carrera, los valores no nulos de Puesto deben ser consecutivos iniciando en 1' (se cumple hoy, n aplicaciones).",
     "respuesta": "Trigger AFTER INSERT, UPDATE en Caballos que, para las carreras afectadas, verifique que COUNT(puesto no nulo) = MAX(puesto) y que no haya repetidos; si no → ROLLBACK.",
     "estado": "consenso"
    }
   ]
  },
  {
   "id": "2019-12-04",
   "fecha": "04/12/2019",
   "formato": "presencial",
   "fuente": "finales 2019/2019-Final_4_de_Diciembre.pdf",
   "vf": [
    {
     "n": "1a",
     "texto": "Una columna afectada por una constraint UNIQUE no puede almacenar valores repetidos ni NULL.",
     "tema": "integridad",
     "clave": "unique-null",
     "respuesta": "F",
     "estado": "consenso",
     "nota": "No admite repetidos, pero sí un NULL (SQL Server)."
    },
    {
     "n": "1b",
     "texto": "Hashing es más performante que el Árbol B en la búsqueda de una clave única en particular existente.",
     "tema": "hashing",
     "respuesta": "V",
     "estado": "consenso",
     "nota": "Acceso directo O(1) contra O(log n). Ojo: el 30/07/2024 la cátedra marcó FALSO una versión sin 'única' ('conviene buscar por una clave en hash que en B+')."
    }
   ],
   "teoria": [
    {
     "n": "2a",
     "texto": "Desarrolle dos objetos de bases de datos que puedan garantizar la integridad de la misma.",
     "tema": "integridad",
     "clave": "integridad-2-objetos"
    },
    {
     "n": "2b",
     "texto": "Explique el concepto de ISOLATION LEVEL. Mencione las diferencias entre cada nivel.",
     "tema": "transacciones",
     "clave": "niveles-aislamiento"
    }
   ],
   "practica": [
    {
     "n": "3a",
     "tipo": "A",
     "modelo": "producto-stock",
     "clave": "cartesiano-vacia",
     "texto": "SELECT p.prod_codigo, COUNT(*) FROM PRODUCTOS p, DEPOSITO d GROUP BY p.prod_codigo HAVING COUNT(*) > 0; PRODUCTOS tiene 15000 filas y DEPOSITO está vacía. Opciones 1-5.",
     "respuesta": "3) Conjunto vacío (producto cartesiano con tabla vacía).",
     "estado": "consenso"
    },
    {
     "n": "3b",
     "tipo": "C",
     "modelo": "producto-stock",
     "texto": "Un programador resuelve con CREATE FUNCTION FN_REASIGNAR_PRODUCTOS una reasignación de depósitos usando dos UPDATE sobre STOCK. ¿Es correcta? Corregir y justificar.",
     "respuesta": "Incorrecta: una función no puede modificar tablas (UPDATE). Debe ser un STORED PROCEDURE. Además, mover todo el stock de un producto a un único depósito puede violar la PK (producto, depósito) si el producto tenía stock en varios.",
     "estado": "consenso"
    }
   ]
  },
  {
   "id": "2020-02-26",
   "fecha": "26/02/2020",
   "formato": "presencial",
   "fuente": "finales 2020/Final GDD 26-02-2020.jpeg",
   "vf": [
    {
     "n": "1a",
     "texto": "Si una función de hash no posee una buena dispersión, se van a producir muchas colisiones.",
     "tema": "hashing",
     "respuesta": "V",
     "estado": "consenso",
     "nota": "Mala dispersión = muchas claves caen en las mismas posiciones."
    },
    {
     "n": "1b",
     "texto": "Nunca es posible ejecutar la operación de insert sobre una vista.",
     "tema": "integridad",
     "clave": "insert-vista",
     "respuesta": "F",
     "estado": "consenso",
     "nota": "Se puede si la vista es actualizable (una tabla base, sin agregados ni DISTINCT) o con un trigger INSTEAD OF INSERT."
    }
   ],
   "teoria": [
    {
     "n": "2a",
     "texto": "Explicar la utilidad de obtener el plan de ejecución de un select de consulta de datos.",
     "tema": "relacional",
     "clave": "plan-ejecucion",
     "unidad": 4
    },
    {
     "n": "2b",
     "texto": "Enumere y explique al menos tres algoritmos de clasificación u ordenamiento que conozca.",
     "tema": "ordenamiento",
     "clave": "algoritmos-3"
    }
   ],
   "practica": [
    {
     "n": "3a",
     "tipo": "C",
     "modelo": "t1-t2",
     "texto": "T1(ID, DETALLE) y T2(ID, ID_T1, DETALLE): agregar los objetos para establecer la integridad referencial entre T1 y T2, sin alterar la estructura ni usar FK constraints (rige desde que se crea el código).",
     "respuesta": "Triggers: AFTER INSERT, UPDATE en T2 (ID_T1 debe existir en T1) y AFTER DELETE, UPDATE en T1 (no dejar hijos huérfanos), con ROLLBACK.",
     "estado": "consenso"
    },
    {
     "n": "3b",
     "tipo": "A",
     "modelo": "t1-t2",
     "texto": "Con el modelo anterior se ejecuta ALTER TABLE T2 ADD FOREIGN KEY (ID_T1) REFERENCES T1(ID) (mismo tipo). a) da error, b) se ejecuta sin problemas, c) ninguna.",
     "respuesta": "Depende: falla si T1.ID no es PK/UNIQUE o si quedaron filas huérfanas de antes del trigger (la FK se crea WITH CHECK). Justificar ese análisis.",
     "estado": "sin_resolver",
     "nota": "No hay resolución en las fuentes."
    }
   ]
  },
  {
   "id": "2021-03-10",
   "fecha": "10/03/2021",
   "formato": "virtual",
   "fuente": "finales 2021/final-GDD-10-3-2021.pdf (captura de Moodle con corrección)",
   "notas": "Formato virtual 2021: 2 V/F de 1 punto, 1 multiple choice de 3 puntos y 1 ejercicio de código de 5 puntos. Sin teoría para desarrollar.",
   "vf": [
    {
     "n": "V/F 1",
     "texto": "Las únicas restricciones posibles aplicables en el modelo relacional son por tabla.",
     "tema": "relacional",
     "clave": "restricciones-tabla",
     "respuesta": "F",
     "estado": "oficial",
     "nota": "También hay restricciones por columna (NOT NULL, CHECK de columna) y entre tablas (FK).",
     "unidad": 3
    },
    {
     "n": "V/F 2",
     "texto": "Las técnicas más comunes utilizadas en el Datamining son las redes neuronales, los árboles de decisión y los algoritmos genéticos.",
     "tema": "olap",
     "clave": "datamining-tecnicas",
     "respuesta": "V",
     "estado": "oficial",
     "nota": "Comentario oficial de Moodle: 'Las reglas de inducción no son técnicas de DataMining'."
    }
   ],
   "teoria": [],
   "practica": [
    {
     "n": "MC",
     "tipo": "D",
     "modelo": "producto-concurrencia",
     "clave": "serializable-producto",
     "texto": "SERIALIZABLE con bloqueo de tabla compartido. A y B: BEGIN, SELECT detalle de producto id=1, UPDATE 'product' SET detalle='X'/'Y' WHERE id=1, COMMIT. Opciones: deadlock / X / Y / A o B termina antes / ninguna.",
     "respuesta": "Ninguna de las anteriores (respuesta oficial).",
     "estado": "oficial",
     "nota": "Explicación más probable: el UPDATE apunta a la tabla 'product' y la tabla es 'producto' → el UPDATE falla en ambos, no hay deadlock y el detalle no cambia. Si la tabla estuviera bien escrita, habría deadlock."
    },
    {
     "n": "Código",
     "tipo": "C",
     "modelo": "entrenador",
     "texto": "DDL sobre Entrenador/Especialidad vacías: PK en los id, relación N:M entrenador-especialidad, tabla ATLETA con entrenador asignado, UNIQUE en espe_detalle e integridad referencial. Script ejecutable de una vez.",
     "respuesta": "ALTER COLUMN ... NOT NULL antes de las PK; tabla intermedia con PK compuesta y dos FK; tipos iguales a los referenciados (CHAR(10)); UNIQUE; FK desde Atleta.",
     "estado": "oficial",
     "nota": "Comentarios del corrector: faltó NOT NULL antes de las PK y los tipos debían respetar CHAR(10)."
    }
   ]
  },
  {
   "id": "2021-06-22",
   "fecha": "22/06/2021",
   "formato": "virtual",
   "fuente": "finales 2021/Final GDD 22 6 2021 Enunciado.pdf (captura de Moodle)",
   "vf": [
    {
     "n": "V/F 1",
     "texto": "El Heap es un árbol n-ario el cual debe cumplir la norma de que el padre sea mayor que sus hijos en todos los niveles.",
     "tema": "ordenamiento",
     "respuesta": "F",
     "estado": "oficial",
     "nota": "El heap es un árbol BINARIO (cargado por niveles de izquierda a derecha)."
    },
    {
     "n": "V/F 2",
     "texto": "Las únicas restricciones posibles aplicables en el modelo relacional son por tabla.",
     "tema": "relacional",
     "clave": "restricciones-tabla",
     "respuesta": "F",
     "estado": "oficial",
     "unidad": 3
    }
   ],
   "teoria": [],
   "practica": [
    {
     "n": "MC",
     "tipo": "A",
     "modelo": "usuarios-ingresos",
     "clave": "vista-usuarios-ingresos",
     "texto": "Vista vw_final con UNION y WHERE NOT EXISTS (versión corregida del 12/03/2018). ¿Es correcta?",
     "respuesta": "La vista es correcta y devuelve exactamente lo solicitado (oficial).",
     "estado": "oficial"
    },
    {
     "n": "Código",
     "tipo": "C",
     "modelo": "usuario-perfil",
     "texto": "Usuario, Perfil, Usuario_Perfil y Log_Asignaciones: crear los objetos para controlar la vigencia de permisos (no vigente si hay una baja 'DEL' posterior a la fecha de alta) y dejar inactivo ('I') el perfil no vigente.",
     "respuesta": "SP (o trigger sobre Log_Asignaciones) que haga UPDATE Usuario_Perfil SET uspe_activo = 'I' cuando EXISTS un log 'DEL' del mismo usuario y perfil con fecha posterior al alta.",
     "estado": "consenso",
     "nota": "El alumno obtuvo 5/5; su .sql no está en la carpeta."
    }
   ]
  },
  {
   "id": "2021-08-02",
   "fecha": "02/08/2021",
   "formato": "virtual",
   "fuente": "finales 2021/final-GDD-2-8-2021.pdf (captura de Moodle con corrección)",
   "vf": [
    {
     "n": "V/F 1",
     "texto": "Si un árbol binario es completo, entonces la cantidad de nodos que posee es impar.",
     "tema": "arboles",
     "respuesta": "V",
     "estado": "oficial",
     "nota": "Confirma la definición de la cátedra: completo = cada nodo tiene 0 o 2 hijos → n = 2i + 1."
    },
    {
     "n": "V/F 2",
     "texto": "El algoritmo de QuickSort tiene un orden de complejidad que varía según cómo vengan ordenados los datos.",
     "tema": "ordenamiento",
     "respuesta": "V",
     "estado": "oficial",
     "nota": "Puede ser O(n log n) o O(n²) (comentario oficial)."
    }
   ],
   "teoria": [],
   "practica": [
    {
     "n": "MC",
     "tipo": "A",
     "modelo": "usuarios-ingresos",
     "clave": "vista-usuarios-ingresos",
     "texto": "La misma vista vw_final con NOT EXISTS.",
     "respuesta": "La vista es correcta y devuelve exactamente lo solicitado (oficial).",
     "estado": "oficial"
    },
    {
     "n": "Código",
     "tipo": "C",
     "modelo": "entrenador",
     "texto": "Dado un código de entrenador devolver 'El entrenador X tiene un nivel N y sus dependientes acumulan Z horas semanales' (N = entrenados directos e indirectos; Z = horas directas e indirectas; profundidad desconocida).",
     "respuesta": "Recursión: CTE recursiva (o función recursiva) sobre entrenado_por_id para contar dependientes y sumar horas, dentro de un SP o función que arme el texto.",
     "estado": "oficial",
     "nota": "Comentario del corrector a una solución sin recursión: 'No resuelve la recursividad' (1/5)."
    }
   ]
  },
  {
   "id": "2021-09-23",
   "fecha": "23/09/2021",
   "formato": "virtual",
   "fuente": "finales 2021/final-GDD-23-9-2021.pdf (captura de Moodle con corrección)",
   "vf": [
    {
     "n": "V/F 1",
     "texto": "Un sistema de Data Warehousing no permite la integración de bases de datos heterogéneas (relacionales, documentales, geográficas, archivos, etc.).",
     "tema": "olap",
     "respuesta": "F",
     "estado": "oficial",
     "nota": "Integrar fuentes heterogéneas es justamente una característica del DW."
    },
    {
     "n": "V/F 2",
     "texto": "Un vector se puede utilizar para representar cualquier grafo restricto.",
     "tema": "grafos",
     "respuesta": "V",
     "estado": "oficial"
    }
   ],
   "teoria": [],
   "practica": [
    {
     "n": "MC",
     "tipo": "A",
     "modelo": "usuarios-ingresos",
     "clave": "vista-usuarios-ingresos",
     "texto": "La misma vista vw_final con NOT EXISTS.",
     "respuesta": "La vista es correcta y devuelve exactamente lo solicitado (oficial).",
     "estado": "oficial"
    },
    {
     "n": "Código",
     "tipo": "B",
     "modelo": "entrenador",
     "texto": "Para todos los entrenadores: apellido y nombre, los de quien lo entrena, cantidad de especialidades y horas semanales de ambos. Ninguna columna en NULL; si no tiene entrenador mostrar 'No posee entrenador'.",
     "respuesta": "Self LEFT JOIN Entrenador e1 → e2 (su entrenador) + subconsultas correlacionadas para cantidades; ISNULL(..., 0) en los números y el texto solo en la columna del nombre.",
     "estado": "oficial",
     "nota": "Corrector: el 'No posee entrenador' era solo para la columna del nombre; en las numéricas mostrar 0."
    }
   ]
  },
  {
   "id": "moodle-sf",
   "fecha": "s/f (Moodle)",
   "formato": "virtual",
   "fuente": "finales 2023 y algunos antes/Finales GDD.docx (captura 'Final XX')",
   "notas": "Solo se conserva una pregunta de multiple choice.",
   "vf": [],
   "teoria": [],
   "practica": [
    {
     "n": "MC",
     "tipo": "D",
     "modelo": "prueba",
     "texto": "prueba(valor) vacía. TRAN1 READ UNCOMMITTED; TRAN2 READ COMMITTED inserta 1, cuenta, COMMIT y luego ROLLBACK; TRAN1 cuenta antes y después. ¿Qué devuelven los COUNT(*) en t6, t7 y t10?",
     "respuesta": "1, 1, 1 (oficial): TRAN2 ve lo propio, TRAN1 lee sucio y el ROLLBACK posterior al COMMIT no deshace nada.",
     "estado": "oficial"
    }
   ]
  },
  {
   "id": "2022-03-02",
   "fecha": "02/03/2022",
   "formato": "presencial",
   "fuente": "finales 2023 y algunos antes/Finales GDD.docx (foto)",
   "vf": [
    {
     "n": "1a",
     "texto": "En un stored procedure, dentro de una transacción no se puede cambiar el nivel de aislamiento.",
     "tema": "transacciones",
     "respuesta": "F",
     "estado": "consenso",
     "nota": "SET TRANSACTION ISOLATION LEVEL se puede ejecutar dentro de un SP y dentro de una transacción."
    },
    {
     "n": "1b",
     "texto": "El método Heapsort siempre es más rápido que el método de la Burbuja para ordenar un conjunto de datos desordenados.",
     "tema": "ordenamiento",
     "respuesta": "V",
     "estado": "razonada",
     "nota": "Todas las fuentes dicen V (O(n log n) contra O(n²)). Ojo con el 'siempre': con muy pocos datos o datos casi ordenados la burbuja con bandera puede ganar; por eso hay quien la marca F."
    }
   ],
   "teoria": [
    {
     "n": "2a",
     "texto": "Indique en qué casos considera que el método de Hashing sería mejor que el de Árbol B para la creación de índices.",
     "tema": "hashing",
     "clave": "hashing-vs-arbolb"
    },
    {
     "n": "2b",
     "texto": "Indique dos ejemplos donde sería necesario el uso de un grafo irrestricto para modelar una solución.",
     "tema": "grafos",
     "clave": "grafo-irrestricto-ejemplos"
    }
   ],
   "practica": [
    {
     "n": "3a",
     "tipo": "D",
     "modelo": "producto-stock",
     "texto": "STOCK(1,1,100). A y B en SERIALIZABLE (lecturas con bloqueo compartido): SELECT del producto, UPDATE cantidad = cantidad − 1; A hace COMMIT y B ROLLBACK. Opciones: 99 por el rollback de B / 100 o 99 según decida el motor / siempre 100 por deadlock / ninguna.",
     "respuesta": "b) 100 o 99: ambos leen (S), ambos piden X → deadlock; si el motor mata a A queda 100 (B hace rollback), si mata a B queda 99.",
     "estado": "razonada",
     "nota": "El enunciado tiene 'UPDATE STOCK SET set cantidad', que tomado literal es un error de sintaxis. Se asume error de tipeo."
    },
    {
     "n": "3b",
     "tipo": "D",
     "modelo": "producto-stock",
     "texto": "Trigger tr_final FOR INSERT en ITEM_FACTURA con BEGIN TRANSACTION, cursor e IF (stock >= cantidad) UPDATE ... con READ COMMITTED y mucha concurrencia: el stock quedó negativo. Explicar por qué y cómo corregirlo.",
     "respuesta": "Check-then-act: con READ COMMITTED el SELECT libera el bloqueo al terminar de leer, dos transacciones validan el mismo stock y ambas descuentan. Solución: UPDATE atómico con la condición en el WHERE (y verificar @@ROWCOUNT) o leer con UPDLOCK/HOLDLOCK, más un CHECK (cantidad >= 0).",
     "estado": "razonada",
     "nota": "La resolución del alumno propone Repeatable Read: evita el negativo pero genera deadlocks."
    }
   ]
  },
  {
   "id": "2022-09-09",
   "fecha": "09/09/2022",
   "formato": "presencial",
   "fuente": "finales 2023 y algunos antes/Finales GDD.docx (foto)",
   "vf": [
    {
     "n": "1a",
     "texto": "La reexpresión de caracteres al aplicar Huffman implica la disminución a menos de 8 bits de todos los caracteres.",
     "tema": "arboles",
     "subtema": "huffman",
     "clave": "huffman-8bits",
     "respuesta": "F",
     "estado": "consenso",
     "nota": "Los caracteres poco frecuentes pueden quedar con códigos de más de 8 bits."
    },
    {
     "n": "1b",
     "texto": "La ejecución sin filas de resultado de una query dentro de un trigger en SQL Server genera la cancelación de la transacción.",
     "tema": "integridad",
     "respuesta": "F",
     "estado": "consenso",
     "nota": "Una consulta sin filas no es un error; el trigger sigue ejecutándose."
    }
   ],
   "teoria": [
    {
     "n": "2a",
     "texto": "Desarrolle el concepto de Grafo, su utilización, los tipos de grafos y sus diferentes representaciones computacionales.",
     "tema": "grafos",
     "clave": "grafos-completo"
    },
    {
     "n": "2b",
     "texto": "Indique los distintos niveles de aislamiento de un DBMS indicando claramente qué tipos de bloqueos se ejecutan en cada uno de ellos.",
     "tema": "transacciones",
     "clave": "niveles-aislamiento"
    }
   ],
   "practica": [
    {
     "n": "3",
     "tipo": "D",
     "modelo": "numeros",
     "texto": "prueba(col1 int NOT NULL) vacía. Proceso 1: dos SELECT COUNT(*) en la misma transacción (a y b). Proceso 2: INSERT INTO prueba (col1) (SELECT MAX(col1)+1 FROM prueba). a) a y b siempre iguales b) nunca iguales c) depende d) no hay info e) ninguna.",
     "respuesta": "a) Siempre iguales: con la tabla vacía MAX(col1) es NULL y NULL+1 es NULL → el INSERT falla por NOT NULL. La tabla sigue vacía (0 y 0) sin importar el aislamiento.",
     "estado": "consenso"
    },
    {
     "n": "4",
     "tipo": "A",
     "modelo": "numeros",
     "clave": "min-max-selfjoin",
     "texto": "TABLITA(numero UNIQUE). Describir errores o qué retorna: SELECT MAX(t1.numero), MAX(t2.numero) FROM tablita t1, tablita t2 WHERE t1.numero > t2.numero (más de 10 filas).",
     "respuesta": "No tiene errores: devuelve el máximo y el segundo máximo (t2 nunca puede ser el máximo).",
     "estado": "consenso"
    }
   ]
  },
  {
   "id": "2022-sfA",
   "fecha": "2022 (s/f, A)",
   "formato": "presencial",
   "fuente": "finales 2023 y algunos antes/Finales GDD.docx ('Final XX/YY/2022 **', foto)",
   "vf": [
    {
     "n": "1a",
     "texto": "La lectura consistente (READ COMMITTED), cuando una transacción modifica un dato, siempre tiene que generar un bloqueo exclusivo para que otra transacción no vea datos inconsistentes.",
     "tema": "transacciones",
     "respuesta": "V",
     "estado": "razonada",
     "nota": "Toda modificación toma un bloqueo exclusivo hasta el fin de la transacción; es lo que impide la lectura sucia. 'Teóricas GDD' dice F confundiendo con los bloqueos de lectura."
    },
    {
     "n": "1b",
     "texto": "Los accesos mediante funciones de HASH son eficientes siempre y se recomiendan usar en todos los casos en los que se necesite acceder a datos.",
     "tema": "hashing",
     "respuesta": "F",
     "estado": "consenso",
     "nota": "No sirven para rangos, orden ni claves duplicadas."
    }
   ],
   "teoria": [
    {
     "n": "2a",
     "texto": "Desarrolle el concepto de Atomicidad, aislamiento y transacciones.",
     "tema": "transacciones",
     "clave": "transaccion-aislamiento-bloqueos"
    },
    {
     "n": "2b",
     "texto": "Desarrolle el concepto de Modelo Relacional.",
     "tema": "relacional",
     "clave": "modelo-relacional",
     "unidad": 3
    }
   ],
   "practica": [
    {
     "n": "3a",
     "tipo": "B",
     "modelo": "producto-stock",
     "texto": "Producto/Composición (combos): para todos los productos, nombre, nombre del componente y cantidad que lo compone; si no es compuesto mostrar 'sin compuesto' y 0.",
     "respuesta": "Producto LEFT JOIN Composicion LEFT JOIN Producto (componente) con ISNULL(detalle, 'sin compuesto') e ISNULL(cantidad, 0).",
     "estado": "consenso"
    },
    {
     "n": "3b",
     "tipo": "C",
     "modelo": "producto-stock",
     "texto": "Objetos para controlar que el precio de un producto compuesto sea siempre igual a la suma de precio × cantidad de sus componentes.",
     "respuesta": "Trigger AFTER INSERT, UPDATE, DELETE en Composición y AFTER UPDATE en Producto que recalculen la suma de los combos afectados y hagan ROLLBACK si no coincide.",
     "estado": "consenso"
    }
   ]
  },
  {
   "id": "2022-sfB",
   "fecha": "2022 (s/f, B)",
   "formato": "presencial",
   "fuente": "finales 2023 y algunos antes/Finales GDD.docx ('Final XX/YY/2022 ****', foto corregida: 8)",
   "vf": [
    {
     "n": "1a",
     "texto": "Un barrido simétrico sobre un ABB (árbol binario de búsqueda) devuelve un conjunto ordenado de datos.",
     "tema": "arboles",
     "clave": "abb-simetrico",
     "respuesta": "V",
     "estado": "consenso",
     "nota": "Inorden: izquierdo, raíz, derecho → orden ascendente."
    },
    {
     "n": "1b",
     "texto": "El método de ordenamiento quick sort tiene siempre el mismo orden de complejidad, es decir, la complejidad computacional es constante.",
     "tema": "ordenamiento",
     "respuesta": "F",
     "estado": "consenso",
     "nota": "O(n log n) en promedio y O(n²) en el peor caso."
    }
   ],
   "teoria": [
    {
     "n": "2a",
     "texto": "Realice una comparación entre Hashing y árbol B como método de acceso a datos.",
     "tema": "hashing",
     "clave": "hashing-vs-arbolb"
    },
    {
     "n": "2b",
     "texto": "Explique las propiedades A.C.I.D. de una base de datos relacional.",
     "tema": "transacciones",
     "clave": "acid"
    }
   ],
   "practica": [
    {
     "n": "3a",
     "tipo": "B",
     "modelo": "pais-provincia-ciudad",
     "clave": "paises-top5",
     "texto": "País tiene más de 100 registros: consulta que retorne los 5 primeros países del alfabeto y los 5 últimos (las 2 columnas).",
     "respuesta": "WHERE idpais IN (TOP 5 ORDER BY detalle) OR idpais IN (TOP 5 ORDER BY detalle DESC), o UNION ALL de dos derivadas con TOP.",
     "estado": "consenso"
    },
    {
     "n": "3b",
     "tipo": "A",
     "modelo": "pais-provincia-ciudad",
     "clave": "paises-top5",
     "texto": "SELECT pa.IDPAIS, SUM(pro.HABITANTES), COUNT(*) FROM pais pa, provincias pro WHERE pa.IDPAIS = pro.IDPAIS GROUP BY pa.IDPAIS. Opciones A-D.",
     "respuesta": "D: 1 fila por país con al menos 1 provincia; habitantes del país (suma de sus provincias); cantidad de provincias.",
     "estado": "oficial",
     "nota": "El mismo ejercicio salió el 17/12/2024 y el alumno que marcó D sacó 2/2."
    }
   ]
  },
  {
   "id": "2022-12-06",
   "fecha": "06/12/2022",
   "formato": "presencial",
   "fuente": "finales 2023 y algunos antes/Finales GDD.docx (foto)",
   "vf": [
    {
     "n": "1a",
     "texto": "Es lo mismo utilizar una UNIQUE CONSTRAINT sobre un campo identificador de una tabla que una Primary Key, dado que ambas ofrecen el mismo concepto y funcionalidad.",
     "tema": "integridad",
     "respuesta": "F",
     "estado": "consenso",
     "nota": "UNIQUE admite un NULL; la PK no admite NULL (integridad de entidad) y hay una sola por tabla."
    },
    {
     "n": "1b",
     "texto": "Siempre, en todos los casos, es más rápido el acceso a los datos mediante un índice que mediante algún algoritmo sobre la tabla.",
     "tema": "hashing",
     "respuesta": "F",
     "estado": "consenso",
     "nota": "Tablas chicas o consultas que traen gran parte de la tabla: el recorrido secuencial gana."
    }
   ],
   "teoria": [
    {
     "n": "2a",
     "texto": "Explique el concepto de transacción e isolation level.",
     "tema": "transacciones",
     "clave": "niveles-aislamiento"
    },
    {
     "n": "2b",
     "texto": "Explique en qué casos usaría una función de HASH. Ejemplifique.",
     "tema": "hashing",
     "clave": "hashing-usos"
    }
   ],
   "practica": [
    {
     "n": "3a",
     "tipo": "B",
     "modelo": "producto-stock",
     "clave": "productos-stock-depositos",
     "texto": "Productos con stoc_cantidad > 0 en más de la mitad de los depósitos: código, depósito con más cantidad y stock total; primero los que tienen stock > 0 en todos los depósitos.",
     "respuesta": "GROUP BY producto con HAVING COUNT(depósitos con stock > 0) > (SELECT COUNT(*) FROM deposito) / 2.0; subconsulta TOP 1 para el depósito; ORDER BY CASE para los que están en todos.",
     "estado": "consenso"
    },
    {
     "n": "3b",
     "tipo": "D",
     "modelo": "producto-concurrencia",
     "clave": "procesos-ab-producto",
     "texto": "A y B en SERIALIZABLE: T2 A SELECT, T3 B SELECT, T4 A UPDATE 'PROCESO A', T5 B UPDATE 'PROCESO B', T6 COMMIT. Opciones a-e.",
     "respuesta": "d) Deadlock: los dos tienen bloqueo compartido y piden exclusivo; el motor mata a uno y queda 'PROCESO A' o 'PROCESO B'.",
     "estado": "consenso"
    }
   ]
  },
  {
   "id": "2022-12-16",
   "fecha": "16/12/2022",
   "formato": "presencial",
   "fuente": "finales 2023 y algunos antes/Finales GDD.docx (foto corregida: 9)",
   "vf": [
    {
     "n": "1a",
     "texto": "El Algoritmo de Huffman basa la asignación de códigos comprimidos en un árbol binario completo.",
     "tema": "arboles",
     "subtema": "huffman",
     "clave": "huffman-completo",
     "respuesta": "V",
     "estado": "oficial",
     "nota": "El alumno puso V y sumó el punto. 'Completo' para la cátedra = cada nodo tiene 0 o 2 hijos (no que las hojas estén al mismo nivel)."
    },
    {
     "n": "1b",
     "texto": "Todo grafo de grado 2 es un árbol binario.",
     "tema": "grafos",
     "clave": "grafo-grado2",
     "respuesta": "F",
     "estado": "oficial",
     "nota": "El alumno puso F y sumó el punto."
    }
   ],
   "teoria": [
    {
     "n": "2a",
     "texto": "Indique un escenario donde la creación de índices con Tablas de Hashing sea más eficiente que con Árboles B.",
     "tema": "hashing",
     "clave": "hashing-vs-arbolb"
    },
    {
     "n": "2b",
     "texto": "Describir las ventajas y desventajas de los índices.",
     "tema": "hashing",
     "clave": "indices"
    }
   ],
   "practica": [
    {
     "n": "3a",
     "tipo": "B",
     "modelo": "producto-stock",
     "clave": "productos-stock-depositos",
     "texto": "Igual al 06/12/2022 pero solo productos con alguno de los tres envases con más productos asignados, y mostrando el detalle del envase.",
     "respuesta": "Agregar WHERE prod_envase IN (SELECT TOP 3 envase ... GROUP BY ... ORDER BY COUNT(*) DESC) y JOIN a Envase para el detalle.",
     "estado": "consenso"
    },
    {
     "n": "3b",
     "tipo": "D",
     "modelo": "producto-concurrencia",
     "clave": "procesos-ab-producto",
     "texto": "A en REPEATABLE READ, B en READ COMMITTED: T2 A SELECT, T3 B SELECT, T4 A UPDATE, T5 B UPDATE, T6 COMMIT. Opciones a-e.",
     "respuesta": "b) Queda 'PROCESO B': B libera su bloqueo de lectura al terminar el SELECT, A actualiza; B espera el bloqueo de A y escribe después del COMMIT de A.",
     "estado": "oficial",
     "nota": "El alumno marcó B y sacó 2/2."
    }
   ]
  },
  {
   "id": "2022-12-22",
   "fecha": "22/12/2022",
   "formato": "presencial",
   "fuente": "finales 2023 y algunos antes/Finales GDD.docx (foto corregida: 2)",
   "vf": [
    {
     "n": "1a",
     "texto": "Si un índice es por clave duplicada, no se puede implementar con Hashing.",
     "tema": "hashing",
     "respuesta": "V",
     "estado": "oficial",
     "nota": "El alumno puso F y le restaron 1. Para la cátedra hashing se usa con claves únicas."
    },
    {
     "n": "1b",
     "texto": "Para una misma tabla y evento, solo puede haber un trigger de AFTER.",
     "tema": "integridad",
     "clave": "triggers-por-evento",
     "respuesta": "F",
     "estado": "oficial",
     "nota": "El alumno puso V y le restaron 1. Puede haber varios AFTER; INSTEAD OF hay uno solo por evento."
    }
   ],
   "teoria": [
    {
     "n": "2a",
     "texto": "Elija un algoritmo de clasificación visto en la materia con complejidad computacional constante y descríbalo.",
     "tema": "ordenamiento",
     "clave": "algoritmo-constante"
    },
    {
     "n": "2b",
     "texto": "Realice una comparación entre una view y un snapshot.",
     "tema": "integridad",
     "clave": "vista-snapshot"
    }
   ],
   "practica": [
    {
     "n": "3a",
     "tipo": "B",
     "modelo": "mundial",
     "texto": "MundialFutbol(IdMundial, Anio, PaisCampeon, PaisSubCampeon): nombre del país que fue el último en ganar un mundial por primera vez.",
     "respuesta": "SELECT TOP 1 PaisCampeon FROM MundialFutbol GROUP BY PaisCampeon ORDER BY MIN(Anio) DESC.",
     "estado": "consenso"
    },
    {
     "n": "3b",
     "tipo": "C",
     "modelo": "mundial",
     "texto": "Implantar: el campeón y el subcampeón no pueden ser el mismo y la diferencia entre mundiales no puede ser menor a 4 años (se cumple hoy, n aplicaciones).",
     "respuesta": "CHECK (PaisCampeon <> PaisSubCampeon) o trigger; trigger AFTER INSERT, UPDATE con IF EXISTS (mundial a menos de 4 años de uno de inserted, distinto id) → ROLLBACK.",
     "estado": "consenso"
    }
   ]
  },
  {
   "id": "2023-02-22",
   "fecha": "22/02/2023",
   "formato": "presencial",
   "fuente": "finales 2023 y algunos antes/Finales GDD.docx (foto)",
   "vf": [
    {
     "n": "1a",
     "texto": "Si una palabra se escribe igual de izquierda a derecha como de derecha a izquierda, entonces su código de Huffman se escribe igual de izquierda a derecha como de derecha a izquierda.",
     "tema": "arboles",
     "subtema": "huffman",
     "respuesta": "F",
     "estado": "razonada",
     "nota": "La palabra es capicúa pero cada código no lo es. Contraejemplo ABCBA con A=11, B=0, C=10: 11 0 10 0 11 = 11010011, que al revés es 11001011. Teóricas y una resolución dicen V; otros bancos, F."
    },
    {
     "n": "1b",
     "texto": "Luego de CREATE TABLE tablitaFinal (campo1 VARCHAR2(5)) y poblar la tabla, para cualquier set de datos se da: SELECT COUNT(campo1) = SELECT COUNT(*).",
     "tema": "relacional",
     "respuesta": "F",
     "estado": "consenso",
     "nota": "COUNT(campo) no cuenta NULL; COUNT(*) cuenta filas.",
     "unidad": 4
    }
   ],
   "teoria": [
    {
     "n": "2a",
     "texto": "Desarrollar el concepto de join, enumere y explique cada uno de los tipos. Ejemplifique.",
     "tema": "relacional",
     "clave": "join",
     "unidad": 4
    },
    {
     "n": "2b",
     "texto": "Describa cómo representar en forma estática y dinámica un grafo irrestricto.",
     "tema": "grafos",
     "clave": "grafo-irrestricto-representacion"
    }
   ],
   "practica": [
    {
     "n": "3a",
     "tipo": "A",
     "modelo": "numeros",
     "clave": "tablita-script",
     "texto": "TABLITAFINAL(numero UNIQUE) vacía, sin triggers: INSERT 1; INSERT 3; INSERT NULL; UPDATE numero = ISNULL(numero,5)+1 WHERE 1=1 OR ...; INSERT NULL; COMMIT. Indicar errores y contenido final.",
     "respuesta": "Todo funciona salvo el COMMIT (no hay BEGIN TRANSACTION). El UPDATE afecta todas las filas: 1→2, 3→4, NULL→6. Final: NULL, 2, 4, 6.",
     "estado": "consenso"
    },
    {
     "n": "3b",
     "tipo": "D",
     "modelo": "producto-concurrencia",
     "clave": "serializable-producto",
     "texto": "Mismo ejercicio que el 10/03/2021: SERIALIZABLE, bloqueo de tabla compartido, A/B con SELECT y UPDATE 'product' detalle X/Y. Opciones a-f.",
     "respuesta": "f) Ninguna de las anteriores, siguiendo la respuesta oficial del mismo ejercicio en 2021.",
     "estado": "razonada",
     "nota": "El alumno respondió e) deadlock (sin nota visible). La clave oficial 2021 fue 'Ninguna': el UPDATE usa la tabla 'product' y no 'producto'."
    }
   ]
  },
  {
   "id": "2023-02-28",
   "fecha": "28/02/2023",
   "formato": "presencial",
   "fuente": "finales 2023 y algunos antes/Finales GDD.docx (foto)",
   "vf": [
    {
     "n": "1a",
     "texto": "Un nivel de aislamiento REPEATABLE READ no genera problemas de interbloqueo.",
     "tema": "transacciones",
     "respuesta": "F",
     "estado": "consenso",
     "nota": "Dos transacciones que leen la misma fila y después la actualizan se bloquean mutuamente."
    },
    {
     "n": "1b",
     "texto": "Un Split en un ARBOL B es una operación tan costosa que hace que sea recomendable siempre aplicar índices de funciones de hash antes que índices de tipo ARBOL B.",
     "tema": "hashing",
     "respuesta": "F",
     "estado": "consenso",
     "nota": "El split es ocasional y el árbol B sirve para rangos y orden; hashing no."
    }
   ],
   "teoria": [
    {
     "n": "2a",
     "texto": "Describa (en no más de 1 carilla) el concepto de OLAP y OLTP. Ejemplifique.",
     "tema": "olap",
     "clave": "oltp-olap"
    },
    {
     "n": "2b",
     "texto": "Explique (en no más de 10 renglones) las diferencias entre un árbol B y un árbol binario de búsqueda balanceado.",
     "tema": "arboles",
     "clave": "arbolb-vs-abb"
    }
   ],
   "practica": [
    {
     "n": "3a",
     "tipo": "D",
     "modelo": "producto-stock",
     "clave": "descuenta-stock",
     "texto": "SP descuenta_stock: BEGIN TRAN; IF EXISTS (stock >= @cant) UPDATE ... COMMIT ELSE ROLLBACK; el nivel de aislamiento se define en cada ejecución. 1) siempre funciona 2) puede dejar stock negativo 3) con algún nivel puede dar interbloqueo 4) todas.",
     "respuesta": "2) y 3): con READ COMMITTED dos ejecuciones validan el mismo stock y ambas descuentan (negativo); con REPEATABLE READ o SERIALIZABLE ambas retienen el bloqueo de lectura y se interbloquean.",
     "estado": "consenso"
    },
    {
     "n": "3b",
     "tipo": "C",
     "modelo": "producto-stock",
     "clave": "stock-duplicados",
     "texto": "Los datos NO están correctos: implementar los objetos para que en STOCK no pueda existir 2 veces el mismo depósito para el mismo producto.",
     "respuesta": "Primero consolidar los duplicados (sumar y dejar una fila por par) y después UNIQUE (id_producto, id_deposito) o un trigger AFTER INSERT, UPDATE con GROUP BY ... HAVING COUNT(*) > 1 → ROLLBACK.",
     "estado": "consenso"
    }
   ]
  },
  {
   "id": "2023-03-07",
   "fecha": "07/03/2023",
   "formato": "presencial",
   "fuente": "finales 2023 y algunos antes/Finales GDD.docx (foto)",
   "vf": [
    {
     "n": "1a",
     "texto": "Si a un árbol binario de búsqueda (ABB) se le ejecuta un barrido simétrico, devuelve un conjunto ordenado de datos.",
     "tema": "arboles",
     "clave": "abb-simetrico",
     "respuesta": "V",
     "estado": "consenso"
    },
    {
     "n": "1b",
     "texto": "En una View, nunca se pueden realizar insert de registros.",
     "tema": "integridad",
     "clave": "insert-vista",
     "respuesta": "F",
     "estado": "consenso"
    }
   ],
   "teoria": [
    {
     "n": "2a",
     "texto": "Compare los métodos de Hashing y Árbol B en cuanto a su eficiencia en la recuperación de datos.",
     "tema": "hashing",
     "clave": "hashing-vs-arbolb"
    },
    {
     "n": "2b",
     "texto": "Explique la funcionalidad de una ETL y el modelo estrella en una implementación de Data Warehouse.",
     "tema": "olap",
     "clave": "etl-estrella"
    }
   ],
   "practica": [
    {
     "n": "3a",
     "tipo": "A",
     "modelo": "numeros",
     "texto": "Secuencias (≥ 20 filas, clave sin nulos y con un solo valor duplicado): SELECT clave FROM Secuencias WHERE clave IN (SELECT TOP 5 clave ORDER BY clave) OR clave IN (SELECT TOP 5 clave ORDER BY clave DESC) ORDER BY 1. ¿Da error? Si no, mínimo y máximo de filas.",
     "respuesta": "No da error. Mínimo 10 filas, máximo 11 (si el duplicado queda justo en el borde del top 5, entran las dos copias).",
     "estado": "consenso"
    },
    {
     "n": "3b",
     "tipo": "B",
     "modelo": "numeros",
     "texto": "En una única instrucción DML eliminar los 2 registros que poseen el valor duplicado en clave.",
     "respuesta": "DELETE FROM Secuencias WHERE clave IN (SELECT clave FROM Secuencias GROUP BY clave HAVING COUNT(*) > 1).",
     "estado": "consenso"
    }
   ]
  },
  {
   "id": "2023-05-23",
   "fecha": "23/05/2023",
   "formato": "presencial",
   "fuente": "finales 2023 y algunos antes/Finales GDD.docx (foto)",
   "vf": [
    {
     "n": "1a",
     "texto": "Si en un árbol de Huffman todas las hojas están en el mismo nivel, entonces todos los códigos poseen la misma longitud.",
     "tema": "arboles",
     "subtema": "huffman",
     "respuesta": "V",
     "estado": "consenso",
     "nota": "La longitud del código es la profundidad de la hoja."
    },
    {
     "n": "1b",
     "texto": "Una Constraint de check puede evaluar campos de distintas tablas.",
     "tema": "integridad",
     "respuesta": "F",
     "estado": "consenso",
     "nota": "Solo columnas de la misma fila/tabla. (En SQL Server se podría 'hacer trampa' llamando a una función, pero la respuesta esperada es F.)"
    }
   ],
   "teoria": [
    {
     "n": "2a",
     "texto": "Explique el concepto de split y fusión en un árbol B.",
     "tema": "arboles",
     "clave": "split-fusion"
    },
    {
     "n": "2b",
     "texto": "Describa el modelo estrella de un dataMart.",
     "tema": "olap",
     "clave": "estrella"
    }
   ],
   "practica": [
    {
     "n": "3.1",
     "tipo": "A",
     "modelo": "t1-t2-t3",
     "texto": "T1 -< T2 >- T3. a) ¿Qué devuelve SELECT T1.id, (SELECT COUNT(DISTINCT T2.t3_id) FROM T2 WHERE T2.t1_id = T1.id) FROM T1? b) Reescribirla sin subconsultas. c) ¿Qué cambia si se saca el DISTINCT?",
     "respuesta": "a) Cada id de T1 con la cantidad de T3 distintos relacionados (0 si ninguno). b) T1 LEFT JOIN T2 + GROUP BY T1.id + COUNT(T2.t3_id). c) Nada: (t1_id, t3_id) es la PK de T2, no hay repetidos.",
     "estado": "consenso"
    },
    {
     "n": "3.2",
     "tipo": "A",
     "modelo": "t1-t2-t3",
     "texto": "Indicar los errores de una consulta (o cómo hacerla más eficiente si T1 tiene más de 1 millón de filas y T2 10).",
     "respuesta": "SUM sobre una columna CHAR, ORDER BY dentro de la subconsulta sin TOP, HAVING escrito después del ORDER BY, columna T1.t1_col2 fuera del GROUP BY.",
     "estado": "consenso"
    }
   ]
  },
  {
   "id": "2023-07-25",
   "fecha": "25/07/2023",
   "formato": "presencial",
   "fuente": "finales 2023 y algunos antes/Finales GDD.docx (foto)",
   "vf": [
    {
     "n": "1a",
     "texto": "Una view puede utilizarse para brindar seguridad.",
     "tema": "integridad",
     "respuesta": "V",
     "estado": "consenso",
     "nota": "Restringe filas y columnas visibles."
    },
    {
     "n": "1b",
     "texto": "Si sobre un ABB con N niveles se desea consultar una clave que no existe, la cantidad exacta de lecturas que realiza es N.",
     "tema": "arboles",
     "respuesta": "F",
     "estado": "consenso",
     "nota": "Es como máximo N: depende de la rama que recorra."
    }
   ],
   "teoria": [
    {
     "n": "2a",
     "texto": "Explicar las principales diferencias entre Árbol B+ y Hashing para el acceso a los datos.",
     "tema": "hashing",
     "clave": "hashing-vs-arbolb"
    },
    {
     "n": "2b",
     "texto": "Explicar los niveles de aislamiento read uncommitted y serializable; mencione un ejemplo de cuándo utilizaría cada uno.",
     "tema": "transacciones",
     "clave": "ru-serializable-ejemplos"
    }
   ],
   "practica": [
    {
     "n": "3a",
     "tipo": "B",
     "modelo": "numeros",
     "texto": "Numeros(clave PK, valor), clave > 0 garantizado y tabla no vacía: consulta ANSI SQL que retorne el primer hueco de clave, o el valor siguiente a la máxima si no hay huecos.",
     "respuesta": "CASE WHEN no existe la clave 1 THEN 1 ELSE MIN(n.clave + 1) de las claves cuyo siguiente no existe (NOT EXISTS) END.",
     "estado": "razonada",
     "nota": "Las resoluciones de alumnos fallan si falta la clave 1 y usan TOP sin ORDER BY."
    },
    {
     "n": "3b",
     "tipo": "B",
     "modelo": "numeros",
     "texto": "Sentencia DML que inserte un solo registro usando la consulta anterior para la clave y NULL en valor. ¿Puede dar error? Justificar.",
     "respuesta": "INSERT INTO Numeros (clave, valor) SELECT <consulta>, NULL. Sí puede fallar: dos ejecuciones concurrentes calculan el mismo hueco y la segunda viola la PK.",
     "estado": "consenso"
    }
   ]
  },
  {
   "id": "2023-08-01",
   "fecha": "01/08/2023",
   "formato": "presencial",
   "fuente": "finales 2023 y algunos antes/Finales GDD.docx (foto corregida: 6)",
   "vf": [
    {
     "n": "1a",
     "texto": "La lectura confirmada (READ COMMITTED) nunca genera bloqueos, dado que solo los niveles de aislamiento superiores como SERIALIZABLE pueden hacerlo.",
     "tema": "transacciones",
     "respuesta": "F",
     "estado": "oficial",
     "nota": "El alumno puso F y sumó. Read Committed toma bloqueos compartidos al leer (y exclusivos al escribir)."
    },
    {
     "n": "1b",
     "texto": "Pueden existir situaciones donde recorrer secuencialmente una tabla es más eficiente que acceder mediante un índice.",
     "tema": "hashing",
     "respuesta": "V",
     "estado": "oficial",
     "nota": "El alumno puso V y sumó."
    }
   ],
   "teoria": [
    {
     "n": "2a",
     "texto": "Describa (en no más de 1 carilla) el concepto de OLAP y OLTP. Ejemplifique.",
     "tema": "olap",
     "clave": "oltp-olap"
    },
    {
     "n": "2b",
     "texto": "Explique (en no más de 10 renglones) las diferencias entre un árbol B y un árbol binario de búsqueda balanceado.",
     "tema": "arboles",
     "clave": "arbolb-vs-abb"
    }
   ],
   "practica": [
    {
     "n": "3a",
     "tipo": "D",
     "modelo": "producto-stock",
     "clave": "descuenta-stock",
     "texto": "El mismo SP descuenta_stock ejecutado N veces en paralelo con EXEC descuenta_stock 1, 1, 100: explicar qué problema presenta.",
     "respuesta": "Con READ COMMITTED puede dejar stock negativo (todas validan antes de que alguna descuente); con REPEATABLE READ o SERIALIZABLE, deadlocks y víctimas.",
     "estado": "consenso",
     "nota": "El alumno sacó 1/2."
    },
    {
     "n": "3b",
     "tipo": "C",
     "modelo": "producto-stock",
     "clave": "stock-duplicados",
     "texto": "Por error hay N registros de stock para el mismo depósito y producto: dejar 1 registro por par con la suma de las cantidades y evitar que vuelva a pasar.",
     "respuesta": "SP (o script) que inserte las sumas y borre los duplicados en una transacción + UNIQUE (id_deposito, id_producto) o trigger.",
     "estado": "consenso",
     "nota": "El alumno sacó 0,5/2."
    }
   ]
  },
  {
   "id": "2023-09-27",
   "fecha": "27/09/2023",
   "formato": "presencial",
   "fuente": "finales 2023 y algunos antes/Finales GDD.docx (foto)",
   "vf": [
    {
     "n": "1a",
     "texto": "Una función escalar no puede retornar null.",
     "tema": "integridad",
     "respuesta": "F",
     "estado": "consenso",
     "nota": "RETURN NULL es válido."
    },
    {
     "n": "1b",
     "texto": "Si el árbol de Huffman posee N niveles, entonces el código de mayor tamaño posee N bits.",
     "tema": "arboles",
     "subtema": "huffman",
     "respuesta": "F",
     "estado": "consenso",
     "nota": "N − 1 bits: la raíz es el nivel 1 y no aporta bit."
    }
   ],
   "teoria": [
    {
     "n": "2a",
     "texto": "Desarrolle 2 objetos de una base de datos que sirven para asegurar la Integridad de datos.",
     "tema": "integridad",
     "clave": "integridad-2-objetos"
    },
    {
     "n": "2b",
     "texto": "Explique la funcionalidad de una ETL y el concepto de staging área en una implementación de Data Warehouse.",
     "tema": "olap",
     "clave": "etl"
    }
   ],
   "practica": [
    {
     "n": "3a",
     "tipo": "D",
     "modelo": "numeros",
     "texto": "PARAMETROS(clave PK, valor varchar NULL). SP sp_increment_parametro: BEGIN TRAN; SELECT @valor; UPDATE valor = @valor + 1; COMMIT. Inconvenientes si muchos usuarios lo invocan en paralelo con SERIALIZABLE.",
     "respuesta": "Deadlocks: todos leen con bloqueo compartido retenido y después piden exclusivo; el motor mata víctimas y esas invocaciones se pierden (con error). Además @valor + 1 convierte el varchar a int: falla si el valor no es numérico.",
     "estado": "consenso"
    },
    {
     "n": "3b",
     "tipo": "A",
     "modelo": "numeros",
     "clave": "min-max-selfjoin",
     "texto": "PARAMETROS con al menos 1000 filas: ¿qué devuelve SELECT MIN(f1.clave), MAX(f2.clave) FROM parametros f1, parametros f2 WHERE f1.clave > f2.clave?",
     "respuesta": "La segunda clave más chica y la segunda más grande.",
     "estado": "consenso"
    }
   ]
  },
  {
   "id": "2023-12-05",
   "fecha": "05/12/2023",
   "formato": "presencial",
   "fuente": "finales 2023 y algunos antes/Finales GDD.docx (foto)",
   "vf": [
    {
     "n": "1a",
     "texto": "Una tabla no puede tener 2 claves foráneas que referencien a la misma tabla.",
     "tema": "integridad",
     "respuesta": "F",
     "estado": "consenso",
     "nota": "Ej.: Persona con FK a padre y FK a madre."
    },
    {
     "n": "1b",
     "texto": "Si una columna posee la constraint UNIQUE, entonces una sola fila como máximo puede contener NULL en dicha columna.",
     "tema": "integridad",
     "clave": "unique-null",
     "respuesta": "V",
     "estado": "consenso",
     "nota": "En SQL Server."
    }
   ],
   "teoria": [
    {
     "n": "2a",
     "texto": "Determinar qué índices implementaría sobre las tablas de una consulta (usuario/rol con OR, LIKE '%Gonzalez' y lower()) sabiendo que no hay claves implementadas. Justificar.",
     "tema": "hashing",
     "clave": "indices"
    },
    {
     "n": "2b",
     "texto": "Enumere y explique al menos tres algoritmos de clasificación que conozca.",
     "tema": "ordenamiento",
     "clave": "algoritmos-3"
    }
   ],
   "practica": [
    {
     "n": "3a",
     "tipo": "A",
     "modelo": "juego",
     "texto": "Juego(jugador, jugada, carta), 2 jugadores, gana la carta mayor y en empate gana el 1; empieza el 1 y luego el ganador de la mano anterior. Describir qué retorna una query ordenada por jugada y por un CASE con subconsulta TOP 1 ... ORDER BY carta DESC de la jugada anterior.",
     "respuesta": "Las jugadas en orden y, dentro de cada una, primero quien ganó la mano anterior. Falla en los empates: el TOP 1 entre cartas iguales no garantiza elegir al jugador 1.",
     "estado": "consenso"
    },
    {
     "n": "3b",
     "tipo": "B",
     "modelo": "juego",
     "texto": "Jugador y mayor carta jugada por cada uno, primero el de la mayor carta (empate: jugador 1). Sin tablas auxiliares, cursores, subconsultas en el FROM ni vistas.",
     "respuesta": "SELECT jugador, MAX(carta) FROM Juego GROUP BY jugador ORDER BY MAX(carta) DESC, jugador.",
     "estado": "consenso"
    }
   ]
  },
  {
   "id": "2023-12-12",
   "fecha": "12/12/2023",
   "formato": "presencial",
   "fuente": "finales 2023 y algunos antes/Finales GDD.docx (foto)",
   "vf": [
    {
     "n": "1a",
     "texto": "Una de las ventajas de los Stored Procedures es que se utilizan para manejar la seguridad en la base de datos.",
     "tema": "integridad",
     "respuesta": "V",
     "estado": "consenso",
     "nota": "Se da permiso de EXECUTE sobre el SP sin dar permisos sobre las tablas."
    },
    {
     "n": "1b",
     "texto": "No es posible realizar [palabra faltante en la foto] a través de una vista.",
     "tema": "integridad",
     "clave": "insert-vista",
     "respuesta": "?",
     "estado": "sin_resolver",
     "nota": "El enunciado está incompleto. Si era 'inserts', es F."
    }
   ],
   "teoria": [
    {
     "n": "2a",
     "texto": "Explicar 2 métodos de ordenamiento recursivos vistos durante la materia.",
     "tema": "ordenamiento",
     "clave": "algoritmos-recursivos"
    },
    {
     "n": "2b",
     "texto": "Dé un ejemplo donde sería adecuado aplicar un nivel de aislamiento Read uncommitted y otro para Serializable. Justifique.",
     "tema": "transacciones",
     "clave": "ru-serializable-ejemplos"
    }
   ],
   "practica": [
    {
     "n": "3a",
     "tipo": "C",
     "modelo": "numeros",
     "texto": "Numeros(clave PK, valor) vacía: trigger de insert que valide que las claves sean consecutivas desde 1. Ya posee un trigger INSTEAD OF que no puede modificarse y una constraint de no positivos.",
     "respuesta": "Trigger AFTER INSERT (no puede haber otro INSTEAD OF INSERT): IF MAX(clave) <> COUNT(*) → ROLLBACK (con claves positivas y únicas eso equivale a 1..n sin huecos).",
     "estado": "consenso"
    },
    {
     "n": "3b",
     "tipo": "C",
     "modelo": "numeros",
     "texto": "Otro trigger de insert que valide que los valores no nulos del campo valor sean únicos. Explicar por qué no se puede con una Constraint UNIQUE.",
     "respuesta": "Trigger AFTER INSERT (y UPDATE) con GROUP BY valor HAVING COUNT(*) > 1 sobre los no nulos → ROLLBACK. UNIQUE no sirve porque en SQL Server admite un solo NULL.",
     "estado": "consenso"
    }
   ]
  },
  {
   "id": "2024-02-20",
   "fecha": "20/02/2024",
   "formato": "presencial",
   "fuente": "finales 2024/20-02-24.jpg",
   "vf": [
    {
     "n": "1a",
     "texto": "El tiempo de ejecución de cualquier algoritmo de clasificación es directamente proporcional a la cantidad de elementos a ordenar.",
     "tema": "ordenamiento",
     "respuesta": "F",
     "estado": "consenso",
     "nota": "Crece como n log n o n², no linealmente."
    },
    {
     "n": "1b",
     "texto": "En una tabla de una base de datos relacional no se puede definir más de un trigger por cada evento (insert, delete, update).",
     "tema": "integridad",
     "clave": "triggers-por-evento",
     "respuesta": "F",
     "estado": "consenso"
    }
   ],
   "teoria": [
    {
     "n": "2a",
     "texto": "Describa la arquitectura interna de un DBMS: niveles o capas, funcionalidad y funcionamiento de cada uno.",
     "tema": "relacional",
     "clave": "arquitectura",
     "unidad": 3
    },
    {
     "n": "2b",
     "texto": "Desarrolle el concepto de Grafos, su posible utilización, clasificación y representación computacional.",
     "tema": "grafos",
     "clave": "grafos-completo"
    }
   ],
   "practica": [
    {
     "n": "3a",
     "tipo": "A",
     "modelo": "alojamientos-feriados",
     "texto": "N = feriados de 2012. SELECT COUNT(*), FechaCheckOut FROM Alojamientos RIGHT JOIN Feriados ON FechaCheckOut = Fecha AND anio = 2012 GROUP BY FechaCheckOut ORDER BY 2. Opciones I-VI.",
     "respuesta": "V) Como máximo N + 1 filas: hasta N fechas que coinciden más un grupo NULL (todos los feriados sin checkout, incluidos los de otros años que el RIGHT JOIN conserva).",
     "estado": "razonada",
     "nota": "La resolución del alumno dice II (máximo N): olvida el grupo NULL."
    },
    {
     "n": "3b",
     "tipo": "A",
     "modelo": "alojamientos-feriados",
     "texto": "Lo mismo con LEFT JOIN y GROUP BY Fecha.",
     "respuesta": "V) Como máximo N + 1 filas: hasta N fechas de feriado más un grupo NULL (alojamientos sin feriado).",
     "estado": "razonada"
    }
   ]
  },
  {
   "id": "2024-02-27",
   "fecha": "27/02/2024",
   "formato": "presencial",
   "fuente": "finales 2024/final 27-02-24.txt (reconstruido de memoria por un alumno)",
   "vf": [
    {
     "n": "1a",
     "texto": "El nivel de aislamiento SERIALIZABLE es el único que evita las lecturas fantasmas.",
     "tema": "transacciones",
     "respuesta": "V",
     "estado": "razonada",
     "nota": "Entre los 4 niveles ANSI que enseña la cátedra, V. (SQL Server además tiene SNAPSHOT, que también las evita.)"
    },
    {
     "n": "1b",
     "texto": "Si en Huffman el código del símbolo más largo es de 15 bits, entonces el árbol tiene 16 niveles.",
     "tema": "arboles",
     "subtema": "huffman",
     "respuesta": "V",
     "estado": "consenso",
     "nota": "Niveles = bits del código más largo + 1."
    }
   ],
   "teoria": [
    {
     "n": "2a",
     "texto": "Explicar Hashing como método de acceso a datos.",
     "tema": "hashing",
     "clave": "hashing-acceso"
    },
    {
     "n": "2b",
     "texto": "Explicar las diferencias entre vista y snapshot.",
     "tema": "integridad",
     "clave": "vista-snapshot"
    }
   ],
   "practica": [
    {
     "n": "3a",
     "tipo": "A",
     "modelo": "pais-provincia-ciudad",
     "texto": "SELECT 1 FROM PAIS P JOIN PROVINCIA PR ON P.idpais = PR.idpais JOIN CIUDAD C ON C.idpcia = PR.idpcia GROUP BY p.idpcia (joins por PK/FK, sin nulos ni tablas vacías). Opciones: 1 fila / 1 por provincia / error de ejecución / error de compilación.",
     "respuesta": "Error de compilación: PAIS no tiene la columna idpcia (Invalid column name).",
     "estado": "razonada",
     "nota": "El alumno no estaba seguro ('ninguna')."
    },
    {
     "n": "3b",
     "tipo": "B",
     "modelo": "pais-provincia-ciudad",
     "texto": "Para cada país, el total de sus provincias y de sus ciudades.",
     "respuesta": "Pais LEFT JOIN Provincia LEFT JOIN Ciudad, GROUP BY país, COUNT(DISTINCT idpcia) y COUNT(idciudad).",
     "estado": "consenso"
    }
   ]
  },
  {
   "id": "2024-03-05",
   "fecha": "05/03/2024",
   "formato": "presencial",
   "fuente": "finales 2024/05-03-24.jpg",
   "vf": [
    {
     "n": "1a",
     "texto": "La funcionalidad de un Constraint de tipo check siempre puede ser reemplazada por un trigger.",
     "tema": "integridad",
     "clave": "check-trigger",
     "respuesta": "V",
     "estado": "consenso"
    },
    {
     "n": "1b",
     "texto": "Los niveles de aislamiento permiten que no se generen deadlocks.",
     "tema": "transacciones",
     "respuesta": "F",
     "estado": "consenso",
     "nota": "Los niveles altos (RR, Serializable) los vuelven más probables."
    }
   ],
   "teoria": [
    {
     "n": "2a",
     "texto": "Comparar procesos OLTP vs. OLAP en cuanto a su utilización y diseño de base de datos.",
     "tema": "olap",
     "clave": "oltp-olap"
    },
    {
     "n": "2b",
     "texto": "¿Qué representa la sigla ACID? Desarrolle cada uno de sus componentes.",
     "tema": "transacciones",
     "clave": "acid"
    }
   ],
   "practica": [
    {
     "n": "3a",
     "tipo": "A",
     "modelo": "numeros",
     "texto": "Numeros(numero PK) con al menos N registros (N > 4): SELECT 1 FROM Numeros t1, Numeros t2 WHERE t1.numero < t2.numero GROUP BY t1.numero, t2.numero. Opciones: 1 / N / N−1 / N² / Σ i de 1 a N−1 / ninguna.",
     "respuesta": "e) Σ i (i = 1..N−1) = N(N−1)/2: una fila por cada par distinto con el primero menor.",
     "estado": "razonada",
     "nota": "Si la tabla tuviera más de N filas la cuenta sería mayor; se toma N como la cantidad de filas, que es lo que busca la pregunta."
    },
    {
     "n": "3b",
     "tipo": "B",
     "modelo": "numeros",
     "clave": "min-max-selfjoin",
     "texto": "Reescribir con una sola tabla en el FROM principal: SELECT MIN(t1.numero) AS Valor1, MAX(t2.numero) AS Valor2 FROM Numeros t1, Numeros t2 WHERE t1.numero > t2.numero.",
     "respuesta": "Es el 2º mínimo y el 2º máximo: SELECT MIN(numero), (SELECT MAX(numero) FROM Numeros WHERE numero < (SELECT MAX(numero) FROM Numeros)) FROM Numeros WHERE numero > (SELECT MIN(numero) FROM Numeros).",
     "estado": "consenso"
    }
   ]
  },
  {
   "id": "2024-04-especial",
   "fecha": "04/2024 (especial)",
   "formato": "presencial",
   "fuente": "finales 2024/final-especial-abri-24l.jpg (foto corregida: 9)",
   "vf": [
    {
     "n": "1a",
     "texto": "Toda consulta que utilice al menos una función de grupo debe ir acompañada de la cláusula GROUP BY.",
     "tema": "relacional",
     "respuesta": "F",
     "estado": "oficial",
     "nota": "El alumno puso F y sumó. SELECT COUNT(*) FROM t no lleva GROUP BY.",
     "unidad": 4
    },
    {
     "n": "1b",
     "texto": "La reexpresión de caracteres al aplicar Huffman implica la disminución de 8 bits para la expresión de todos los caracteres.",
     "tema": "arboles",
     "subtema": "huffman",
     "clave": "huffman-8bits",
     "respuesta": "F",
     "estado": "oficial",
     "nota": "El alumno puso F y sumó."
    }
   ],
   "teoria": [
    {
     "n": "2a",
     "texto": "Desarrollar el concepto de join, enumere y explique cada uno de los tipos. Ejemplifique.",
     "tema": "relacional",
     "clave": "join",
     "unidad": 4
    },
    {
     "n": "2b",
     "texto": "Enumere y explique al menos tres algoritmos de clasificación u ordenamiento que conozca.",
     "tema": "ordenamiento",
     "clave": "algoritmos-3"
    }
   ],
   "practica": [
    {
     "n": "3a",
     "tipo": "B",
     "modelo": "persona",
     "clave": "persona-abuelos-padres",
     "texto": "Persona con su_padre_es: personas con sus abuelos paternos.",
     "respuesta": "Doble self-join hijo → padre → abuelo.",
     "estado": "oficial",
     "nota": "2/2 en la foto."
    },
    {
     "n": "3b",
     "tipo": "B",
     "modelo": "persona",
     "clave": "persona-abuelos-padres",
     "texto": "Padres y cuántos hijos tienen.",
     "respuesta": "Self-join + GROUP BY padre + COUNT(*).",
     "estado": "consenso",
     "nota": "La foto muestra 1/2: probablemente por algún detalle (agrupar por id y no solo por nombre)."
    }
   ]
  },
  {
   "id": "2024-07-23",
   "fecha": "23/07/2024",
   "formato": "presencial",
   "fuente": "finales 2024/final-23-07-24.jpg (foto corregida: 8)",
   "vf": [
    {
     "n": "1a",
     "texto": "Un árbol binario completo es un árbol N-ario con N=2, donde todos sus niveles están llenos.",
     "tema": "arboles",
     "respuesta": "F",
     "estado": "razonada",
     "nota": "Eso es un árbol LLENO. Para la cátedra, completo = cada nodo tiene 0 o 2 hijos. El alumno la dejó en blanco (0 puntos)."
    },
    {
     "n": "1b",
     "texto": "Las funciones creadas por el usuario (objeto function) en T-SQL no permiten sentencias INSERT/DELETE/UPDATE en su cuerpo.",
     "tema": "integridad",
     "respuesta": "V",
     "estado": "oficial",
     "nota": "El alumno puso V y sumó. (Matiz: sí permiten DML sobre variables de tipo tabla locales.)"
    }
   ],
   "teoria": [
    {
     "n": "2a",
     "texto": "Explique las diferencias entre los modelos OLAP y OLTP (máx. 10 renglones).",
     "tema": "olap",
     "clave": "oltp-olap"
    },
    {
     "n": "2b",
     "texto": "Explique LECTURA SUCIA, LECTURA REPETIBLE y LECTURA FANTASMA. Indique cómo se comportan READ COMMITTED y REPEATABLE READ ante esos conceptos.",
     "tema": "transacciones",
     "clave": "niveles-aislamiento"
    }
   ],
   "practica": [
    {
     "n": "3a",
     "tipo": "B",
     "modelo": "usuario-login",
     "texto": "Usuario/Perfil/Usuario_Perfil/Login: por usuario, nombre, fecha de alta, detalle de estado, cantidad de perfiles, perfil con más logins fallidos (empate: menor código) y logins fallidos totales. Sin subselects en el FROM.",
     "respuesta": "Usuario LEFT JOIN Usuario_Perfil + GROUP BY usuario; subconsulta TOP 1 ... ORDER BY COUNT DESC, id para el perfil; subconsulta COUNT para fallidos.",
     "estado": "consenso",
     "nota": "El alumno sacó 1/2."
    },
    {
     "n": "3b",
     "tipo": "C",
     "modelo": "usuario-login",
     "texto": "Objetos para que con 3 logins fallidos en el mismo día la cuenta pase a bloqueada sin grabar más fallidos ese día, y que con el password genérico '00x@T3st' un usuario bloqueado o inactivo se reactive registrando 'Primer ingreso'. Considerar concurrencia.",
     "respuesta": "INSTEAD OF INSERT en Login (multifila, con cursor si hace falta) que decida por fila: descartar, insertar, bloquear o reactivar; leer los contadores con UPDLOCK/HOLDLOCK para la concurrencia.",
     "estado": "consenso",
     "nota": "El alumno sacó 2/2."
    }
   ]
  },
  {
   "id": "2024-07-30",
   "fecha": "30/07/2024",
   "formato": "presencial",
   "fuente": "finales 2024/FINAL 30-07-24/Final 30.07.24.jpg + resolucionCatedra.txt (respuestas de la cátedra en la revisión)",
   "vf": [
    {
     "n": "1a",
     "texto": "Conviene en términos de velocidad buscar en una estructura de hash por una clave que buscar en una estructura de árbol B+.",
     "tema": "hashing",
     "respuesta": "F",
     "estado": "oficial",
     "nota": "Respuesta de la cátedra en la revisión. 'Teóricas GDD' dice V. Lectura más probable: 'una clave' no dice que sea única ni existente; con claves duplicadas o colisiones hashing no conviene."
    },
    {
     "n": "1b",
     "texto": "El nivel de aislamiento repeatable read acepta lecturas fantasmas.",
     "tema": "transacciones",
     "respuesta": "V",
     "estado": "oficial"
    }
   ],
   "teoria": [
    {
     "n": "2a",
     "texto": "Explique y desarrolle 2 objetos de base de datos que puedan ser utilizados para asegurar la integridad de datos.",
     "tema": "integridad",
     "clave": "integridad-2-objetos",
     "nota": "Cátedra: valían Constraints (cuentan como 1), Triggers, Stored Procedures o Vistas WITH CHECK OPTION."
    },
    {
     "n": "2b",
     "texto": "Comparar procesos OLTP vs. OLAP (DSS) en cuanto a su utilización de base de datos.",
     "tema": "olap",
     "clave": "oltp-olap"
    }
   ],
   "practica": [
    {
     "n": "3a",
     "tipo": "C",
     "modelo": "pais-provincia-ciudad",
     "texto": "Crear los objetos para poder borrar una Provincia con un comando DELETE.",
     "respuesta": "Trigger INSTEAD OF DELETE en Provincia que soporte varias filas: primero DELETE de Ciudad WHERE idpcia IN (SELECT idpcia FROM deleted) y después de Provincia. Con un SP no vale: tiene que funcionar con DELETE.",
     "estado": "oficial"
    },
    {
     "n": "3b",
     "tipo": "D",
     "modelo": "pais-provincia-ciudad",
     "texto": "A: BEGIN; INSERT país 1000; INSERT provincia con 3 columnas y 4 valores; COMMIT. B: BEGIN; READ UNCOMMITTED; INSERT el mismo país 1000; COMMIT. Opciones A-E.",
     "respuesta": "E) Ninguna: B queda bloqueado por la clave que insertó A; el INSERT de provincia de A falla (columnas ≠ valores) pero A confirma el país; luego el INSERT de B falla por PK. Queda el país sin provincia.",
     "estado": "oficial"
    }
   ]
  },
  {
   "id": "2024-10-18",
   "fecha": "18/10/2024",
   "formato": "presencial",
   "fuente": "finales 2024/final-18-10-24.jpg",
   "vf": [
    {
     "n": "1a",
     "texto": "Las funciones de hashing no poseen funciones inversas.",
     "tema": "hashing",
     "respuesta": "V",
     "estado": "razonada",
     "nota": "Muchas claves van a la misma posición (no es inyectiva): no se puede volver atrás. Teóricas, Resumen y el banco de Reinosa dicen V; un banco dice F ('hay funciones invertibles')."
    },
    {
     "n": "1b",
     "texto": "Un constraint de tipo CHECK siempre puede ser reemplazado por un trigger.",
     "tema": "integridad",
     "clave": "check-trigger",
     "respuesta": "V",
     "estado": "consenso"
    }
   ],
   "teoria": [
    {
     "n": "2a",
     "texto": "Describa el concepto de Transaccionalidad, aislamiento y bloqueos en una base de datos relacional.",
     "tema": "transacciones",
     "clave": "transaccion-aislamiento-bloqueos"
    },
    {
     "n": "2b",
     "texto": "Explique detalladamente el modelo estrella para el armado de un Data Warehouse en un DBMS.",
     "tema": "olap",
     "clave": "estrella"
    }
   ],
   "practica": [
    {
     "n": "3a",
     "tipo": "B",
     "modelo": "persona",
     "clave": "persona-abuelos-padres",
     "texto": "Persona con su_padre_es: personas con sus abuelos paternos.",
     "respuesta": "Doble self-join hijo → padre → abuelo.",
     "estado": "consenso"
    },
    {
     "n": "3b",
     "tipo": "B",
     "modelo": "persona",
     "clave": "persona-abuelos-padres",
     "texto": "Padres y cuántos hijos tienen.",
     "respuesta": "Self-join + GROUP BY padre + COUNT(*).",
     "estado": "consenso"
    }
   ]
  },
  {
   "id": "2024-12-03",
   "fecha": "03/12/2024",
   "formato": "presencial",
   "fuente": "finales 2024/final 03-12-24.jpg",
   "vf": [
    {
     "n": "1a",
     "texto": "El análisis del plan de consulta permite detectar la operatoria interna desarrollada por un RDBMS para procesar la consulta.",
     "tema": "relacional",
     "respuesta": "V",
     "estado": "consenso",
     "unidad": 4
    },
    {
     "n": "1b",
     "texto": "Colocar un nivel de aislamiento muy restrictivo garantiza que siempre se van a poder ejecutar y finalizar con éxito un procedimiento.",
     "tema": "transacciones",
     "respuesta": "F",
     "estado": "consenso",
     "nota": "Más bloqueos = más esperas y deadlocks; un proceso puede ser elegido víctima."
    }
   ],
   "teoria": [
    {
     "n": "2a",
     "texto": "Indique por qué un índice conformado por una clave numérica corta es más rápido en el acceso a los datos que un índice compuesto o conformado con un string largo.",
     "tema": "hashing",
     "clave": "indices"
    },
    {
     "n": "2b",
     "texto": "Explique en qué casos la presencia de un índice en una tabla podría generar mayor caída de performance que la ventaja aportada.",
     "tema": "hashing",
     "clave": "indices"
    }
   ],
   "practica": [
    {
     "n": "3a",
     "tipo": "A",
     "modelo": "laboratorio",
     "clave": "left-join-anulado",
     "texto": "dia LEFT JOIN horario h1 (turno 0) JOIN materia m1 LEFT JOIN horario h2 (turno 1) JOIN materia m2, con ISNULL(..., 'LIBRE'), para ver la ocupación del laboratorio 401. a) no compila b) error en ejecución c) se ejecuta pero no retorna lo pedido d) retorna lo solicitado.",
     "respuesta": "c) El JOIN con materia anula el LEFT JOIN: los días con un turno libre desaparecen y nunca se muestra 'LIBRE'.",
     "estado": "razonada",
     "nota": "En la foto el alumno marcó d). Para que funcione, los JOIN con materia tienen que ser LEFT JOIN."
    },
    {
     "n": "3b",
     "tipo": "C",
     "modelo": "laboratorio",
     "texto": "Implementar 'una materia no puede estar asignada en el mismo día en laboratorios diferentes' sin alterar la estructura.",
     "respuesta": "Trigger AFTER INSERT, UPDATE en Horario: IF EXISTS (inserted i JOIN Horario h ON misma materia y día AND h.labo_id <> i.labo_id) → ROLLBACK.",
     "estado": "consenso"
    }
   ]
  },
  {
   "id": "2024-12-10",
   "fecha": "10/12/2024",
   "formato": "presencial",
   "fuente": "finales 2024/final 10-12-24.txt (reconstruido de memoria; falta un V/F)",
   "vf": [
    {
     "n": "1",
     "texto": "La complejidad computacional de los métodos de ordenamiento depende del espacio ocupado por las estructuras que se usan.",
     "tema": "ordenamiento",
     "respuesta": "F",
     "estado": "consenso",
     "nota": "La complejidad temporal depende de la cantidad de elementos (y de cómo vienen), no del espacio."
    }
   ],
   "teoria": [
    {
     "n": "2a",
     "texto": "Describir transaccionalidad, aislamiento y bloqueos.",
     "tema": "transacciones",
     "clave": "transaccion-aislamiento-bloqueos"
    },
    {
     "n": "2b",
     "texto": "Definir grafos, clasificación y representación computacional.",
     "tema": "grafos",
     "clave": "grafos-completo"
    }
   ],
   "practica": [
    {
     "n": "3a",
     "tipo": "A",
     "modelo": "persona",
     "texto": "Explicar qué devuelve: SELECT a.nombre, b.nombre, c.nombre FROM persona c LEFT JOIN persona b ON c.su_padre_es = b.id LEFT JOIN persona a ON b.su_padre_es = a.id.",
     "respuesta": "Todas las personas (c) con el nombre de su padre (b) y de su abuelo paterno (a); NULL cuando no lo tienen. Columnas en orden abuelo, padre, persona.",
     "estado": "consenso"
    },
    {
     "n": "3b",
     "tipo": "C",
     "modelo": "persona",
     "texto": "Codificar la restricción de que no puede haber una relación cíclica entre padre e hijo (que alguien termine siendo ancestro de sí mismo).",
     "respuesta": "Trigger AFTER INSERT, UPDATE en Persona con CTE recursiva que sube por su_padre_es desde cada fila de inserted; si vuelve a la misma persona → ROLLBACK.",
     "estado": "consenso"
    }
   ]
  },
  {
   "id": "2024-12-17",
   "fecha": "17/12/2024",
   "formato": "presencial",
   "fuente": "finales 2024/final 17-12-24.JPG (foto corregida: 8)",
   "vf": [
    {
     "n": "1a",
     "texto": "ABB: si el barrido postorden es 9, 12, 16, 15 y 10, entonces el preorden sobre el mismo árbol es 10, 9, 12, 15 y 16.",
     "tema": "arboles",
     "respuesta": "F",
     "estado": "consenso",
     "nota": "Raíz 10; izquierda 9; derecha 15 con hijos 12 y 16. Preorden real: 10, 9, 15, 12, 16."
    },
    {
     "n": "1b",
     "texto": "Huffman: el árbol binario es completo.",
     "tema": "arboles",
     "subtema": "huffman",
     "clave": "huffman-completo",
     "respuesta": "V",
     "estado": "oficial",
     "nota": "El alumno puso V y sumó."
    }
   ],
   "teoria": [
    {
     "n": "2a",
     "texto": "Realice una comparación entre Hashing y árbol B como método de acceso a datos.",
     "tema": "hashing",
     "clave": "hashing-vs-arbolb"
    },
    {
     "n": "2b",
     "texto": "Explique un método estático de implementación de árboles binarios.",
     "tema": "arboles",
     "clave": "arbol-estatico"
    }
   ],
   "practica": [
    {
     "n": "3a",
     "tipo": "B",
     "modelo": "pais-provincia-ciudad",
     "clave": "paises-top5",
     "texto": "Los 5 primeros países del alfabeto y los 5 últimos (las 2 columnas).",
     "respuesta": "Igual que en 2022: dos TOP 5 (ASC y DESC) combinados.",
     "estado": "oficial",
     "nota": "2/2 en la foto."
    },
    {
     "n": "3b",
     "tipo": "A",
     "modelo": "pais-provincia-ciudad",
     "clave": "paises-top5",
     "texto": "SELECT pa.IDPAIS, SUM(pro.HABITANTES), COUNT(*) FROM pais pa INNER JOIN provincias pro ON ... GROUP BY pa.IDPAIS. Opciones A-D.",
     "respuesta": "D.",
     "estado": "oficial",
     "nota": "El alumno marcó D y sacó 2/2."
    }
   ]
  },
  {
   "id": "2025-02-11",
   "fecha": "11/02/2025",
   "formato": "presencial",
   "fuente": "INVESTIGACION-para-claude-code.md + hilo de UTNianos (transcripción de un alumno)",
   "notas": "Dieron 5 minutos para leer el examen antes de decidir si rendir.",
   "vf": [
    {
     "n": "1a",
     "texto": "En SQL, una subconsulta en el WHERE siempre debe retornar una columna.",
     "tema": "relacional",
     "unidad": 4,
     "respuesta": "F",
     "estado": "consenso",
     "nota": "Con EXISTS la subconsulta puede devolver cualquier cantidad de columnas. Con IN o con un comparador sí tiene que devolver una sola."
    },
    {
     "n": "1b",
     "texto": "En una tabla de una base de datos relacional no se puede definir más de un trigger por cada evento (insert, update, delete).",
     "tema": "integridad",
     "clave": "triggers-por-evento",
     "respuesta": "F",
     "estado": "consenso",
     "nota": "Puede haber varios AFTER por evento; INSTEAD OF, uno solo."
    }
   ],
   "teoria": [
    {
     "n": "2a",
     "texto": "Explicar la utilidad de obtener el plan de ejecución de un SELECT de consulta de datos.",
     "tema": "relacional",
     "unidad": 4,
     "clave": "plan-ejecucion"
    },
    {
     "n": "2b",
     "texto": "Indique los distintos niveles de aislamiento de un DBMS indicando claramente qué tipos de bloqueos se ejecutan en cada uno de ellos.",
     "tema": "transacciones",
     "clave": "niveles-aislamiento"
    }
   ],
   "practica": [
    {
     "n": "3a",
     "tipo": "A",
     "modelo": "tablas-genericas",
     "clave": "cartesiano-vacia",
     "texto": "Consulta con producto cartesiano contra una tabla vacía (según el alumno, idéntica a un final anterior; el enunciado está en una imagen del hilo).",
     "respuesta": "Conjunto vacío: el producto cartesiano con una tabla vacía no tiene filas.",
     "estado": "consenso"
    },
    {
     "n": "3b",
     "tipo": "B",
     "modelo": "empleado-jefe",
     "texto": "Empleado(empl_id PK, empl_descr, empl_jefe FK a Empleado): crear una VISTA con código y nombre del jefe, código y nombre de cada empleado a cargo y la cantidad de empleados a cargo del jefe, con alias en cada columna, solo para jefes con más de 5 empleados.",
     "respuesta": "CREATE VIEW con self-join jefe-empleado; la cantidad con una subconsulta correlacionada; filtrar los jefes con más de 5 empleados.",
     "estado": "consenso",
     "nota": "La solución publicada en el foro pone COUNT(*) junto a columnas sin GROUP BY: así no compila en SQL Server."
    }
   ]
  },
  {
   "id": "2025-02-18",
   "fecha": "18/02/2025",
   "formato": "presencial",
   "fuente": "INVESTIGACION-para-claude-code.md + hilo de UTNianos (respuestas de un alumno)",
   "notas": "Los dos V/F fueron Verdaderos según el alumno, pero el texto está en una imagen del hilo que no se pudo leer. Dieron 5 minutos para leer el examen.",
   "vf": [],
   "teoria": [
    {
     "n": "2a",
     "texto": "Desarrolle el concepto de grafos: tipos, usos y representación estática y dinámica.",
     "tema": "grafos",
     "clave": "grafos-completo"
    },
    {
     "n": "2b",
     "texto": "Desarrollar el concepto de join, enumere y explique cada uno de los tipos.",
     "tema": "relacional",
     "unidad": 4,
     "clave": "join"
    }
   ],
   "practica": [
    {
     "n": "3a",
     "tipo": "A",
     "modelo": "numeros",
     "clave": "tablita-script",
     "texto": "Script sobre una tabla con numero UNIQUE (INSERTs, UPDATE ... WHERE 1=1 OR numero IS NOT NULL AND numero > 0, INSERT NULL): indicar errores y contenido final. Enunciado en imagen; parecido al del 22/02/2023.",
     "respuesta": "Sin errores según el alumno: queda 2, 4, 6, NULL. El WHERE es siempre verdadero porque AND se evalúa antes que OR.",
     "estado": "consenso",
     "nota": "Si el script termina con COMMIT sin BEGIN TRANSACTION, ese COMMIT da error (como en 2023)."
    },
    {
     "n": "3b",
     "tipo": "A",
     "modelo": "numeros",
     "clave": "min-max-selfjoin",
     "texto": "Producto cartesiano de una tabla consigo misma (t1.numero > t2.numero) con MAX sobre las dos copias, sin GROUP BY: ¿qué devuelve?",
     "respuesta": "El mayor y el segundo mayor valor. No hace falta GROUP BY porque el SELECT solo tiene funciones de agregado.",
     "estado": "consenso"
    }
   ]
  },
  {
   "id": "2025-07-29",
   "fecha": "29/07/2025",
   "formato": "presencial",
   "fuente": "INVESTIGACION-para-claude-code.md + hilo de UTNianos (transcripción de un alumno)",
   "notas": "V/F sin justificar. La materia ya se llama Bases de Datos.",
   "vf": [
    {
     "n": "1a",
     "texto": "Si a un árbol binario de búsqueda se le realiza un barrido simétrico, se obtiene un conjunto ordenado de datos.",
     "tema": "arboles",
     "clave": "abb-simetrico",
     "respuesta": "V",
     "estado": "consenso"
    },
    {
     "n": "1b",
     "texto": "El algoritmo Quicksort utiliza la técnica de «divide y vencerás».",
     "tema": "ordenamiento",
     "respuesta": "V",
     "estado": "consenso",
     "nota": "Elige un pivote, parte en dos sublistas y resuelve cada una recursivamente."
    }
   ],
   "teoria": [
    {
     "n": "2a",
     "texto": "Definir brevemente el concepto de constraint. Dar 3 ejemplos y explicarlos.",
     "tema": "integridad",
     "clave": "constraints"
    },
    {
     "n": "2b",
     "texto": "Definir qué son las propiedades ACID.",
     "tema": "transacciones",
     "clave": "acid"
    }
   ],
   "practica": [
    {
     "n": "3a",
     "tipo": "B",
     "modelo": "pais-provincia-ciudad",
     "texto": "País/Provincia/Ciudad: consulta que devuelva los países que no tienen ciudades cargadas.",
     "respuesta": "Pais con NOT EXISTS (Provincia JOIN Ciudad del mismo país).",
     "estado": "consenso"
    },
    {
     "n": "3b",
     "tipo": "A",
     "modelo": "pais-provincia-ciudad",
     "clave": "left-join-anulado",
     "texto": "FROM Pais LEFT JOIN Provincia ... JOIN Ciudad ...: elegir el resultado entre 4 opciones (no transcriptas).",
     "respuesta": "Ninguna de las 4, según el alumno: el JOIN con Ciudad anula el LEFT JOIN y se pierden los países sin provincias o sin ciudades.",
     "estado": "consenso"
    }
   ]
  }
 ],
 "vf": [
  {
   "id": "TX01",
   "tema": "transacciones",
   "pagina": "transacciones",
   "texto": "Para entornos transaccionales de alta concurrencia es conveniente setear el Isolation Level en Repeatable Read.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Repeatable Read retiene los bloqueos de lectura hasta el COMMIT: más esperas y más deadlocks. Con mucha concurrencia conviene Read Committed.",
   "finales": [
    "21/02/2018"
   ],
   "fuentes": [
    "Teóricas GDD",
    "banco .py"
   ]
  },
  {
   "id": "TX02",
   "tema": "transacciones",
   "pagina": "transacciones",
   "texto": "En un stored procedure, dentro de una transacción no se puede cambiar el nivel de aislamiento.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "SET TRANSACTION ISOLATION LEVEL se puede ejecutar dentro de un SP y con una transacción abierta.",
   "finales": [
    "02/03/2022"
   ],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "TX03",
   "tema": "transacciones",
   "pagina": "transacciones",
   "texto": "La lectura consistente (READ COMMITTED), cuando una transacción modifica un dato, siempre tiene que generar un bloqueo exclusivo para que otra transacción no vea datos inconsistentes.",
   "respuesta": "V",
   "estado": "razonada",
   "justificacion": "Toda escritura toma un bloqueo exclusivo hasta el fin de la transacción, en cualquier nivel. Ese bloqueo es el que impide que otro lector en Read Committed vea el dato sin confirmar.",
   "polemica": "Teóricas GDD dice F porque lo confunde con los bloqueos de lectura (compartidos). La resolución del docx dice V.",
   "finales": [
    "2022 (s/f, A)"
   ],
   "fuentes": [
    "Teóricas GDD (dice F)",
    "Finales GDD.docx (dice V)"
   ]
  },
  {
   "id": "TX04",
   "tema": "transacciones",
   "pagina": "transacciones",
   "texto": "Un nivel de aislamiento REPEATABLE READ no genera problemas de interbloqueo.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Si dos transacciones leen la misma fila (bloqueo compartido retenido) y después la quieren actualizar, cada una espera a la otra: deadlock.",
   "finales": [
    "28/02/2023"
   ],
   "fuentes": [
    "Teóricas GDD",
    "Finales GDD.docx"
   ]
  },
  {
   "id": "TX05",
   "tema": "transacciones",
   "pagina": "transacciones",
   "texto": "La lectura confirmada (READ COMMITTED) nunca genera bloqueos, dado que solo los niveles de aislamiento superiores como SERIALIZABLE pueden hacerlo.",
   "respuesta": "F",
   "estado": "oficial",
   "justificacion": "Read Committed toma bloqueos compartidos mientras lee y exclusivos al escribir.",
   "finales": [
    "01/08/2023"
   ],
   "fuentes": [
    "nota del examen corregido"
   ]
  },
  {
   "id": "TX06",
   "tema": "transacciones",
   "pagina": "transacciones",
   "texto": "El nivel de aislamiento SERIALIZABLE es el único que evita las lecturas fantasmas.",
   "respuesta": "V",
   "estado": "razonada",
   "justificacion": "De los 4 niveles ANSI, solo Serializable bloquea el rango leído, así nadie inserta filas que cumplan el WHERE.",
   "polemica": "SQL Server tiene además el nivel SNAPSHOT, que también los evita. Con los 4 niveles que enseña la cátedra, es V.",
   "finales": [
    "27/02/2024"
   ],
   "fuentes": [
    "final reconstruido de memoria"
   ]
  },
  {
   "id": "TX07",
   "tema": "transacciones",
   "pagina": "transacciones",
   "texto": "Los niveles de aislamiento permiten que no se generen deadlocks.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Ningún nivel los evita. Los más altos (Repeatable Read, Serializable) los hacen más probables.",
   "finales": [
    "05/03/2024"
   ],
   "fuentes": [
    "Teóricas GDD",
    "banco .py"
   ]
  },
  {
   "id": "TX08",
   "tema": "transacciones",
   "pagina": "transacciones",
   "texto": "El nivel de aislamiento repeatable read acepta lecturas fantasmas.",
   "respuesta": "V",
   "estado": "oficial",
   "justificacion": "Bloquea las filas que leyó, pero no impide que otra transacción inserte filas nuevas que cumplan el WHERE.",
   "finales": [
    "30/07/2024"
   ],
   "fuentes": [
    "respuesta de la cátedra en la revisión"
   ]
  },
  {
   "id": "TX09",
   "tema": "transacciones",
   "pagina": "transacciones",
   "texto": "Colocar un nivel de aislamiento muy restrictivo garantiza que siempre se van a poder ejecutar y finalizar con éxito un procedimiento.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Más bloqueos significa más esperas y más deadlocks: el motor puede elegir ese procedimiento como víctima y abortarlo.",
   "finales": [
    "03/12/2024"
   ],
   "fuentes": [
    "foto del examen"
   ]
  },
  {
   "id": "TX10",
   "tema": "transacciones",
   "pagina": "transacciones",
   "texto": "Configurando el Read Committed Isolation Level al ejecutar una transacción, se evita que otras transacciones modifiquen las filas que han sido leídas por la transacción actual.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "En Read Committed el bloqueo de lectura se suelta al terminar de leer: otros pueden modificar esas filas (lectura no repetible). Eso lo evita Repeatable Read.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "TX11",
   "tema": "transacciones",
   "pagina": "transacciones",
   "texto": "Un nivel de aislamiento SERIALIZABLE es recomendable para no leer datos sucios de una tabla.",
   "respuesta": "V",
   "estado": "razonada",
   "justificacion": "Serializable evita las lecturas sucias (y todas las anomalías).",
   "polemica": "Para evitar solo las lecturas sucias alcanza Read Committed. Si dijera «el único nivel que…» sería F.",
   "finales": [],
   "fuentes": [
    "banco .py (dice V)"
   ]
  },
  {
   "id": "TX12",
   "tema": "transacciones",
   "pagina": "transacciones",
   "texto": "En un modelo de DB OLTP el concepto de transacción está asociado a la atomicidad de procesamiento.",
   "respuesta": "V",
   "estado": "razonada",
   "justificacion": "Atomicidad: la transacción se procesa toda o nada. La frase dice «asociado», no «solamente asociado».",
   "polemica": "Un banco dice F («también consistencia, aislamiento y durabilidad»). El Resumen GGDD y el foro de UTNianos dicen V.",
   "finales": [],
   "fuentes": [
    "banco .py (dice F)",
    "Resumen GGDD (dice V)",
    "foro UTNianos (dice V)"
   ]
  },
  {
   "id": "TX13",
   "tema": "transacciones",
   "pagina": "transacciones",
   "texto": "Un DBMS que soporta atomicidad, consistencia, aislamiento y durabilidad (ACID) puede ser considerado transaccional.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Cumplir ACID es justamente lo que define a un motor transaccional.",
   "finales": [],
   "fuentes": [
    "banco .py",
    "Resumen GGDD"
   ]
  },
  {
   "id": "TX14",
   "tema": "transacciones",
   "pagina": "transacciones",
   "texto": "Luego de ejecutar una sentencia SQL para crear una tabla, si se ejecuta un rollback la tabla queda dropeada.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Sin BEGIN TRANSACTION, el CREATE TABLE se confirma solo (autocommit) y el ROLLBACK no tiene nada que deshacer. Dentro de una transacción explícita, en SQL Server el ROLLBACK sí la eliminaría.",
   "finales": [],
   "fuentes": [
    "banco .py",
    "foro UTNianos"
   ]
  },
  {
   "id": "TX15",
   "tema": "transacciones",
   "pagina": "transacciones",
   "texto": "En un motor de bases de datos relacional se aplica la metodología transaccional, por lo cual hasta que no se verifica con éxito la última sentencia de la transacción no se confirma ningún cambio en la base.",
   "respuesta": "V",
   "estado": "razonada",
   "justificacion": "Es la atomicidad: los cambios de una transacción quedan confirmados recién con el COMMIT; si algo falla antes, el ROLLBACK los deshace.",
   "polemica": "El banco de Reinosa dice «la última transacción»: tomado literal no tiene sentido (cada transacción confirma por separado). Leída como «la última sentencia de la transacción», es V.",
   "finales": [],
   "fuentes": [
    "banco de Reinosa (dice V)"
   ]
  },
  {
   "id": "GR01",
   "tema": "grafos",
   "pagina": "grafos",
   "texto": "Todo grafo de grado 2 es un árbol binario.",
   "respuesta": "F",
   "estado": "oficial",
   "justificacion": "Grado 2 solo limita cuántos arcos salen de cada nodo. Un árbol exige además una raíz, un solo padre por nodo y ningún ciclo: un triángulo a→b→c→a tiene grado 2 y no es árbol.",
   "polemica": "El banco de Reinosa dice V. La nota del examen del 16/12/2022 confirma F.",
   "finales": [
    "17/07/2018",
    "16/12/2022"
   ],
   "fuentes": [
    "nota del examen corregido (16/12/2022)",
    "Resumen GGDD"
   ]
  },
  {
   "id": "GR02",
   "tema": "grafos",
   "pagina": "grafos",
   "texto": "Un vector se puede utilizar para representar cualquier grafo restricto.",
   "respuesta": "V",
   "estado": "oficial",
   "justificacion": "Los restrictos son las listas (biunívocos) y los árboles (unívocos). La lista se guarda en orden en el vector; el árbol, con los hijos de la posición i en 2i y 2i+1 (o pasándolo antes a binario con Knuth).",
   "finales": [
    "23/09/2021"
   ],
   "fuentes": [
    "Moodle (clave oficial)",
    "banco de Reinosa"
   ]
  },
  {
   "id": "GR03",
   "tema": "grafos",
   "pagina": "grafos",
   "texto": "Cuando un grafo no es unívoco, debe ser categorizado como un grafo irrestricto.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Restrictos son los biunívocos (listas) y los unívocos (árboles: cada nodo con un solo predecesor). Si algún nodo tiene más de un predecesor, ya modela cualquier relación: es irrestricto.",
   "finales": [],
   "fuentes": [
    "banco de Reinosa"
   ]
  },
  {
   "id": "GR04",
   "tema": "grafos",
   "pagina": "grafos",
   "texto": "Un grafo es biunívoco cuando cada nodo tiene un solo predecesor y un solo sucesor.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Es el grafo lineal (la lista): cada nodo tiene a lo sumo un predecesor y a lo sumo un sucesor (el primero no tiene predecesor y el último no tiene sucesor).",
   "finales": [],
   "fuentes": [
    "banco de Reinosa"
   ]
  },
  {
   "id": "GR05",
   "tema": "grafos",
   "pagina": "grafos",
   "texto": "Dado el grafo G(P,E) con P = {a} y E = {(a,a)}, el grafo es un árbol.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Tiene un bucle: a es su propio padre y no hay raíz sin predecesor. Además, un árbol de n nodos tiene n − 1 arcos: con 1 nodo serían 0 arcos.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "GR06",
   "tema": "grafos",
   "pagina": "grafos",
   "texto": "Todo grafo de grado 1 es también un árbol.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Un nodo con un bucle tiene grado 1 y no es árbol. Dos pares sueltos (a→b y c→d) tampoco: no están conectados.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "GR07",
   "tema": "grafos",
   "pagina": "grafos",
   "texto": "Para reducir el espacio al representar un grafo siempre es más conveniente la forma dinámica que la estática.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Depende de la densidad. En un grafo denso (muchos arcos de los posibles) la matriz desperdicia poco y los punteros de la forma dinámica ocupan más.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "GR08",
   "tema": "grafos",
   "pagina": "grafos",
   "texto": "Para representar grafos irrestrictos son más performantes las representaciones dinámicas que las estáticas.",
   "respuesta": "F",
   "estado": "razonada",
   "justificacion": "En velocidad suele ganar la estática: el lugar de cada relación ya está reservado y no hay que pedir memoria. La dinámica conviene en espacio para grafos grandes o dispersos.",
   "polemica": "La justificación del Resumen dice que la estática es más rápida porque no hay que dar de alta relaciones. Si una matriz es enorme, también puede ser más lenta: por eso no hay una «mejor siempre».",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "GR09",
   "tema": "grafos",
   "pagina": "grafos",
   "texto": "Los grafos irrestrictos solo pueden representarse computacionalmente de manera dinámica.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "También en forma estática, con una matriz de adyacencia (n × n) o de incidencia (nodos × arcos).",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "GR10",
   "tema": "grafos",
   "pagina": "grafos",
   "texto": "La única estructura de datos estática capaz de representar cualquier grafo es una matriz.",
   "respuesta": "V",
   "estado": "razonada",
   "justificacion": "Para un grafo irrestricto hace falta guardar cualquier par (x, y): eso es una matriz de adyacencia o de incidencia. Un vector solo alcanza para los restrictos.",
   "polemica": "Es la respuesta del Resumen. Se puede discutir que una matriz se guarda en memoria como un vector fila tras fila; si sale, justificá con matriz de adyacencia y de incidencia.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "GR11",
   "tema": "grafos",
   "pagina": "grafos",
   "texto": "Un vector puede representar computacionalmente cualquier grafo irrestricto.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Un vector representa listas y árboles (restrictos). Para uno irrestricto hace falta una matriz o una estructura linkeada (listas de adyacencia).",
   "finales": [],
   "fuentes": [
    "banco de Reinosa"
   ]
  },
  {
   "id": "GR12",
   "tema": "grafos",
   "pagina": "grafos",
   "texto": "El recorrido en anchura (BFS) usa una cola y el recorrido en profundidad (DFS) usa una pila.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "BFS visita por niveles: encola los vecinos (FIFO). DFS baja por un camino y vuelve atrás (backtracking): pila o recursión (LIFO).",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "ES01",
   "tema": "grafos",
   "pagina": "estructuras",
   "texto": "Una pila es una lista en la que todas las altas y bajas ocurren en un mismo extremo.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Es la definición de pila (LIFO): el último que entra es el primero que sale.",
   "finales": [],
   "fuentes": [
    "libro de la cátedra (Pérez)"
   ]
  },
  {
   "id": "ES02",
   "tema": "grafos",
   "pagina": "estructuras",
   "texto": "Una cola es una lista LIFO.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "La cola es FIFO: entra por un extremo y sale por el otro. LIFO es la pila.",
   "finales": [],
   "fuentes": [
    "libro de la cátedra (Pérez)"
   ]
  },
  {
   "id": "ES03",
   "tema": "grafos",
   "pagina": "estructuras",
   "texto": "La representación linkeada siempre ocupa menos memoria que la secuencial.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Cada nodo linkeado guarda además sus punteros. Con la estructura llena, la secuencial (vector) ocupa menos; la linkeada gana cuando el tamaño varía mucho.",
   "finales": [],
   "fuentes": [
    "libro de la cátedra (Pérez)"
   ]
  },
  {
   "id": "ES04",
   "tema": "grafos",
   "pagina": "estructuras",
   "texto": "Insertar un elemento en el medio de una lista con representación secuencial requiere, en promedio, desplazar n/2 elementos.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Hay que correr un lugar todo lo que está después de la posición: en promedio la mitad. En la linkeada solo se cambian dos punteros.",
   "finales": [],
   "fuentes": [
    "libro de la cátedra (Pérez)"
   ]
  },
  {
   "id": "ES05",
   "tema": "grafos",
   "pagina": "estructuras",
   "texto": "Una doble cola permite altas y bajas en cualquiera de los dos extremos.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Es la definición del libro: pila = un extremo; cola = entra por uno y sale por el otro; doble cola = cualquiera de los dos.",
   "finales": [],
   "fuentes": [
    "libro de la cátedra (Pérez)"
   ]
  },
  {
   "id": "ES06",
   "tema": "grafos",
   "pagina": "estructuras",
   "texto": "Las estructuras linkeadas son más apropiadas para datos dinámicos y las secuenciales para datos estáticos o casi estáticos.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Es la regla general del libro: insertar y borrar es barato con punteros; acceder por posición es barato en un vector.",
   "finales": [],
   "fuentes": [
    "libro de la cátedra (Pérez)"
   ]
  },
  {
   "id": "AR01",
   "tema": "arboles",
   "pagina": "arboles",
   "texto": "La cantidad de nodos de un árbol de expresión siempre es par.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Con operadores binarios, cada nodo interno tiene 2 hijos: n = 2·internos + 1, siempre impar. Ejemplo: (2 * 3) + 6 tiene 5 nodos.",
   "finales": [
    "12/03/2018"
   ],
   "fuentes": [
    "Resumen GGDD",
    "banco de Reinosa"
   ]
  },
  {
   "id": "AR02",
   "tema": "arboles",
   "pagina": "arboles",
   "texto": "Es posible implementar el concepto de ABB (árbol binario de búsqueda) en un array.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Representación secuencial: el nodo de la posición i tiene sus hijos en 2i y 2i + 1. Es lo que usa Heapsort.",
   "finales": [
    "17/07/2018"
   ],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "AR03",
   "tema": "arboles",
   "pagina": "arboles",
   "texto": "Si un árbol binario es completo, entonces la cantidad de nodos que posee es impar.",
   "respuesta": "V",
   "estado": "oficial",
   "justificacion": "Para la cátedra, completo = cada nodo tiene 0 o 2 hijos. Entonces n = 2·internos + 1: siempre impar.",
   "finales": [
    "02/08/2021"
   ],
   "fuentes": [
    "Moodle (clave oficial)"
   ]
  },
  {
   "id": "AR04",
   "tema": "arboles",
   "pagina": "arboles",
   "texto": "Un barrido simétrico sobre un ABB (árbol binario de búsqueda) devuelve un conjunto ordenado de datos.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Simétrico (inorden) = izquierdo, raíz, derecho. En un ABB lo de la izquierda es menor y lo de la derecha mayor: sale en orden ascendente.",
   "finales": [
    "2022 (s/f, B)",
    "07/03/2023",
    "29/07/2025"
   ],
   "fuentes": [
    "Resumen GGDD",
    "Teóricas GDD"
   ]
  },
  {
   "id": "AR05",
   "tema": "arboles",
   "pagina": "arboles",
   "texto": "Si sobre un ABB con N niveles se desea consultar una clave que no existe, la cantidad exacta de lecturas que realiza es N.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Es como máximo N: la búsqueda termina cuando llega a un hijo vacío, y eso puede pasar en una rama corta.",
   "finales": [
    "25/07/2023"
   ],
   "fuentes": [
    "Teóricas GDD"
   ]
  },
  {
   "id": "AR06",
   "tema": "arboles",
   "pagina": "arboles",
   "texto": "Un árbol binario completo es un árbol N-ario con N = 2, donde todos sus niveles están llenos.",
   "respuesta": "F",
   "estado": "razonada",
   "justificacion": "Eso es un árbol LLENO. Para la cátedra, completo = cada nodo tiene 0 o 2 hijos; las hojas pueden estar en niveles distintos.",
   "polemica": "Con la definición «clásica» de internet (todos los niveles llenos salvo el último), muchos la marcan V. El alumno de ese final la dejó en blanco. Usá la del libro de la cátedra.",
   "finales": [
    "23/07/2024"
   ],
   "fuentes": [
    "libro de la cátedra (Pérez)"
   ]
  },
  {
   "id": "AR07",
   "tema": "arboles",
   "pagina": "arboles",
   "texto": "ABB: si el barrido postorden es 9, 12, 16, 15 y 10, entonces el preorden sobre el mismo árbol es 10, 9, 12, 15 y 16.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "La raíz es el último del postorden: 10. A la izquierda queda 9; a la derecha 15, con hijos 12 y 16. Preorden real: 10, 9, 15, 12, 16.",
   "finales": [
    "17/12/2024"
   ],
   "fuentes": [
    "foto del examen"
   ]
  },
  {
   "id": "AR08",
   "tema": "arboles",
   "pagina": "arboles",
   "texto": "La estructura de ABB (árbol binario de búsqueda) es un árbol completo.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Un ABB puede tener nodos con un solo hijo (por ejemplo, si las claves llegan ordenadas queda como una lista).",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "AR09",
   "tema": "arboles",
   "pagina": "arboles",
   "texto": "Sobre un árbol n-ario con n > 2 se pueden realizar los barridos preorden, simétrico, postorden y por niveles.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "El simétrico necesita «izquierdo, raíz, derecho»: solo existe en binarios. Para un n-ario primero hay que pasarlo a binario con la transformada de Knuth.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD (dos veces)"
   ]
  },
  {
   "id": "AR10",
   "tema": "arboles",
   "pagina": "arboles",
   "texto": "El barrido preorden se puede hacer en todo tipo de árboles, pero el simétrico es solo para árboles binarios.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Preorden (raíz y después cada hijo) y postorden (cada hijo y después la raíz) sirven para cualquier grado. El simétrico pone la raíz «entre» dos hijos.",
   "finales": [],
   "fuentes": [
    "banco de Reinosa"
   ]
  },
  {
   "id": "AR11",
   "tema": "arboles",
   "pagina": "arboles",
   "texto": "Dado el árbol {(c,a), (c,b), (c,d), (c,e)}, su barrido simétrico es a, b, c, d, e.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "c tiene 4 hijos: no es binario y no tiene barrido simétrico.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "AR12",
   "tema": "arboles",
   "pagina": "arboles",
   "texto": "Un árbol binario con cuatro nodos nunca puede ser completo.",
   "respuesta": "V",
   "estado": "razonada",
   "justificacion": "Con la definición de la cátedra (cada nodo con 0 o 2 hijos), un binario completo siempre tiene una cantidad impar de nodos. Con 4, imposible.",
   "polemica": "El Resumen dice F usando la definición clásica («niveles llenos salvo el último, alineado a la izquierda»). La clave oficial del 02/08/2021 confirma la definición de la cátedra.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD (dice F)",
    "Moodle 02/08/2021 (definición)"
   ]
  },
  {
   "id": "AR13",
   "tema": "arboles",
   "pagina": "arboles",
   "texto": "Si un árbol es completo, la cantidad de arcos es par.",
   "respuesta": "F",
   "estado": "razonada",
   "justificacion": "Vale para binarios (n impar → n − 1 arcos par), pero no para cualquier árbol: uno ternario completo con raíz y 3 hojas tiene 3 arcos.",
   "polemica": "Si dijera «árbol binario completo», sería V.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "AR14",
   "tema": "arboles",
   "pagina": "arboles",
   "texto": "Si un árbol está balanceado, entonces está completo.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Una raíz con un solo hijo está balanceada (1 contra 0 nodos) y no es completa (tiene un nodo con 1 hijo).",
   "finales": [],
   "fuentes": [
    "Resumen GGDD",
    "banco de Reinosa"
   ]
  },
  {
   "id": "AR15",
   "tema": "arboles",
   "pagina": "arboles",
   "texto": "El árbol lleno y el árbol completo son dos tipos de árboles binarios balanceados.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "El lleno sí está balanceado. El completo no necesariamente: una «espina» donde cada nodo tiene una hoja a la derecha y sigue por la izquierda es completa y está desbalanceada.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "AR16",
   "tema": "arboles",
   "pagina": "arboles",
   "texto": "Si un árbol binario está completo y balanceado, todas las hojas están en el mismo nivel.",
   "respuesta": "V",
   "estado": "razonada",
   "justificacion": "Con las definiciones del libro: en un completo cada subárbol tiene una cantidad impar de nodos; balanceado exige que difieran en a lo sumo 1; dos impares que difieren en ≤ 1 son iguales. Repetido en cada nodo, el árbol queda lleno.",
   "polemica": "El banco de Reinosa dice F, pensando «balanceado» como AVL (alturas que difieren en 1). Con la definición del libro (cantidad de nodos), es V. Si dudás, en blanco.",
   "finales": [],
   "fuentes": [
    "banco de Reinosa (dice F)",
    "libro de la cátedra (definiciones)"
   ]
  },
  {
   "id": "AR17",
   "tema": "arboles",
   "pagina": "arboles",
   "texto": "Si en un árbol el subárbol derecho y el izquierdo tienen la misma profundidad y la misma cantidad de elementos, entonces está perfectamente balanceado.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "La condición tiene que cumplirse en todos los nodos, no solo en la raíz.",
   "finales": [],
   "fuentes": [
    "banco de Reinosa"
   ]
  },
  {
   "id": "AR18",
   "tema": "arboles",
   "pagina": "arboles",
   "texto": "Solo los árboles binarios perfectos son balanceados.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Balanceado admite una diferencia de 1 en cada nodo; no hace falta que esté perfecto (lleno).",
   "finales": [],
   "fuentes": [
    "banco de Reinosa"
   ]
  },
  {
   "id": "AR19",
   "tema": "arboles",
   "pagina": "arboles",
   "texto": "Un árbol con grado mayor a 2 no puede ser representado con una representación computacional estática.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Se puede guardar en un vector (reservando n lugares de hijos por nodo) o pasarlo a binario con Knuth y guardarlo con la regla 2i, 2i + 1.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "AR20",
   "tema": "arboles",
   "pagina": "arboles",
   "texto": "Cualquier árbol puede ser representado computacionalmente mediante un vector.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Representación secuencial: la posición codifica la relación padre-hijo. Si el árbol no está lleno se desperdician lugares, pero se puede.",
   "finales": [],
   "fuentes": [
    "banco de Reinosa",
    "Resumen GGDD"
   ]
  },
  {
   "id": "AR21",
   "tema": "arboles",
   "pagina": "arboles",
   "texto": "Debido a que el crecimiento de un árbol es exponencial en base a su grado, los tiempos de búsqueda en el mismo son siempre logarítmicos.",
   "respuesta": "F",
   "estado": "razonada",
   "justificacion": "Solo si está balanceado. Un ABB al que le llegan las claves ordenadas queda como una lista: búsqueda lineal O(n).",
   "polemica": "El Resumen y Reinosa dicen V. El «siempre» lo vuelve falso: el mismo libro de la cátedra dice que el peor caso del ABB es el de las claves ordenadas.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD (dice V)",
    "libro de la cátedra"
   ]
  },
  {
   "id": "AR22",
   "tema": "arboles",
   "pagina": "arboles",
   "texto": "Cuando un ABB se basa en un árbol AVL, su orden de complejidad para buscar es n log₂ n.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Buscar en un AVL es O(log n): baja un nivel por comparación y la altura es logarítmica.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "AR23",
   "tema": "arboles",
   "pagina": "arboles",
   "texto": "La máxima cantidad de nodos que puede contener un árbol está acotada por el grado del mismo.",
   "respuesta": "?",
   "estado": "sin_resolver",
   "justificacion": "Solo si además se fija la cantidad de niveles: con grado n y h niveles, a lo sumo 1 + n + n² + … + n^(h−1) nodos. Sin altura fija, no hay cota.",
   "polemica": "Reinosa dice V sin justificar. Como está escrita, conviene dejarla en blanco.",
   "finales": [],
   "fuentes": [
    "banco de Reinosa (dice V)"
   ]
  },
  {
   "id": "AR24",
   "tema": "arboles",
   "pagina": "arboles",
   "texto": "Un árbol siempre tiene más punteros que elementos de datos.",
   "respuesta": "?",
   "estado": "sin_resolver",
   "justificacion": "Depende de qué se cuente. Arcos: n − 1, menos que los nodos (F). Campos link en la representación linkeada de un binario: 2n, más que los nodos (V).",
   "polemica": "El Resumen dice F contando arcos. Si sale, aclarar qué se cuenta o dejarla en blanco.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD (dice F)"
   ]
  },
  {
   "id": "HU01",
   "tema": "arboles",
   "pagina": "huffman",
   "texto": "En el árbol de Huffman la cantidad total de nodos es (total de hojas × 2) − 1.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Cada paso une 2 nodos en uno nuevo: con h hojas se crean h − 1 internos. Total: 2h − 1.",
   "finales": [
    "26/02/2019"
   ],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "HU02",
   "tema": "arboles",
   "pagina": "huffman",
   "texto": "En Huffman, si un carácter posee el código 0011, entonces con seguridad existe al menos otro carácter cuyo código comienza con 001.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "El árbol es completo: el nodo 0011 tiene un hermano 0010, que es una hoja o tiene hojas debajo. Ese carácter empieza con 001.",
   "finales": [
    "25/09/2019"
   ],
   "fuentes": [
    "Teóricas GDD"
   ]
  },
  {
   "id": "HU03",
   "tema": "arboles",
   "pagina": "huffman",
   "texto": "La reexpresión de caracteres al aplicar Huffman implica la disminución a menos de 8 bits (o la disminución de 8 bits) para la expresión de todos los caracteres.",
   "respuesta": "F",
   "estado": "oficial",
   "justificacion": "Los códigos tienen largo variable: los frecuentes quedan cortos y los raros pueden quedar con más de 8 bits. Comprime el total, no cada carácter.",
   "finales": [
    "09/09/2022",
    "04/2024 (especial)"
   ],
   "fuentes": [
    "nota del examen corregido (04/2024)",
    "Resumen GGDD",
    "banco de Reinosa"
   ]
  },
  {
   "id": "HU04",
   "tema": "arboles",
   "pagina": "huffman",
   "texto": "El algoritmo de Huffman basa la asignación de códigos comprimidos en un árbol binario completo.",
   "respuesta": "V",
   "estado": "oficial",
   "justificacion": "Para la cátedra, completo = cada nodo tiene 0 o 2 hijos, y Huffman siempre une de a dos. (No quiere decir que las hojas estén al mismo nivel.)",
   "polemica": "El Resumen dice F («no necesariamente quedan completos») usando la definición clásica. Dos exámenes corregidos (16/12/2022 y 17/12/2024) sumaron el punto con V.",
   "finales": [
    "16/12/2022",
    "17/12/2024"
   ],
   "fuentes": [
    "notas de exámenes corregidos",
    "Resumen GGDD (dice F)"
   ]
  },
  {
   "id": "HU05",
   "tema": "arboles",
   "pagina": "huffman",
   "texto": "Si una palabra se escribe igual de izquierda a derecha que de derecha a izquierda, su código de Huffman también.",
   "respuesta": "F",
   "estado": "razonada",
   "justificacion": "La secuencia de caracteres es capicúa, pero cada código no lo es. Con A = 11, B = 0, C = 10, ABCBA = 11 0 10 0 11 = 11010011; al revés: 11001011.",
   "polemica": "Teóricas y una resolución dicen V; Reinosa y otros bancos, F. El contraejemplo lo decide.",
   "finales": [
    "22/02/2023"
   ],
   "fuentes": [
    "banco de Reinosa (dice F)",
    "Teóricas GDD (dice V)"
   ]
  },
  {
   "id": "HU06",
   "tema": "arboles",
   "pagina": "huffman",
   "texto": "Si en un árbol de Huffman todas las hojas están en el mismo nivel, entonces todos los códigos poseen la misma longitud.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "El largo de cada código es la profundidad de su hoja.",
   "finales": [
    "23/05/2023"
   ],
   "fuentes": [
    "Teóricas GDD"
   ]
  },
  {
   "id": "HU07",
   "tema": "arboles",
   "pagina": "huffman",
   "texto": "Si el árbol de Huffman posee N niveles, entonces el código de mayor tamaño posee N bits.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "N − 1 bits: la raíz es el nivel 1 y no aporta ningún bit; cada arco aporta uno.",
   "finales": [
    "27/09/2023"
   ],
   "fuentes": [
    "Teóricas GDD"
   ]
  },
  {
   "id": "HU08",
   "tema": "arboles",
   "pagina": "huffman",
   "texto": "Si en Huffman el código del símbolo más largo es de 15 bits, entonces el árbol tiene 16 niveles.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Niveles = bits del código más largo + 1 (la raíz es el nivel 1).",
   "finales": [
    "27/02/2024"
   ],
   "fuentes": [
    "Teóricas GDD"
   ]
  },
  {
   "id": "HU09",
   "tema": "arboles",
   "pagina": "huffman",
   "texto": "El algoritmo de Huffman se basa en un árbol binario del que obtiene los códigos comprimidos de cada carácter.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "El código de un carácter es el camino desde la raíz hasta su hoja: 0 a la izquierda, 1 a la derecha.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD (dos veces)"
   ]
  },
  {
   "id": "HU10",
   "tema": "arboles",
   "pagina": "huffman",
   "texto": "La cantidad de nodos de un árbol de Huffman siempre es impar.",
   "respuesta": "V",
   "estado": "razonada",
   "justificacion": "n = 2h − 1 (h = hojas): siempre impar.",
   "polemica": "El Resumen tiene esta misma afirmación dos veces: una dice F y otra V. La cuenta 2h − 1 la decide.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD (dice F y V)"
   ]
  },
  {
   "id": "HU11",
   "tema": "arboles",
   "pagina": "huffman",
   "texto": "En Huffman, si un carácter tiene el código 1001, entonces ningún otro carácter puede tener el código 10011.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Los caracteres son hojas: 1001 no tiene hijos, así que no existe un camino 10011. Ningún código es prefijo de otro.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD",
    "banco de Reinosa (con 1011 y 1011111)"
   ]
  },
  {
   "id": "HU12",
   "tema": "arboles",
   "pagina": "huffman",
   "texto": "El árbol en el que se basa Huffman es un árbol principal derecho balanceado.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Es un árbol (para la cátedra, árbol = principal derecho), pero no tiene por qué estar balanceado: un carácter muy frecuente queda arriba y los raros muy abajo.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD",
    "banco de Reinosa"
   ]
  },
  {
   "id": "HU13",
   "tema": "arboles",
   "pagina": "huffman",
   "texto": "La compactación por Huffman permite redefinir el almacenamiento lógico de los símbolos de modo que la pérdida de información sea despreciable.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Huffman es compresión SIN pérdida: se decodifica exactamente el texto original.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "HU14",
   "tema": "arboles",
   "pagina": "huffman",
   "texto": "La compresión que se logra con Huffman es mayor cuando la variedad de caracteres distintos que aparecen es menor.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Con pocos símbolos distintos el árbol es bajo y los códigos son cortos comparados con los 8 bits originales.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "AB01",
   "tema": "arboles",
   "pagina": "arbol-b",
   "texto": "El árbol B+ es un árbol principal derecho balanceado.",
   "respuesta": "V",
   "estado": "razonada",
   "justificacion": "El libro de la cátedra dice que «árbol» y «árbol principal derecho» son sinónimos. El B+ es un árbol y está balanceado: todas sus hojas están al mismo nivel.",
   "polemica": "Teóricas GDD dice F sin justificar. Se decide por la definición textual del libro.",
   "finales": [
    "21/02/2018"
   ],
   "fuentes": [
    "libro de la cátedra (Pérez)",
    "Teóricas GDD (dice F)"
   ]
  },
  {
   "id": "AB02",
   "tema": "arboles",
   "pagina": "arbol-b",
   "texto": "Los árboles B garantizan un número de niveles menor que otros árboles.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "La altura depende de la cantidad de claves, del orden y de la ocupación de los nodos. Un árbol con más hijos por nodo, o más lleno, puede tener menos niveles.",
   "finales": [
    "12/02/2019"
   ],
   "fuentes": [
    "Teóricas GDD"
   ]
  },
  {
   "id": "AB03",
   "tema": "arboles",
   "pagina": "arbol-b",
   "texto": "En la implementación de un árbol B, todos los nodos que contienen claves se encuentran en el mismo nivel.",
   "respuesta": "F",
   "estado": "razonada",
   "justificacion": "En el árbol B también los nodos internos tienen claves. Lo que está al mismo nivel son las hojas. «Todas las claves en hojas al mismo nivel» es el B+.",
   "polemica": "Reinosa dice V (dos veces), seguramente pensando «todas las hojas al mismo nivel». El Resumen dice F.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD (dice F)",
    "banco de Reinosa (dice V)"
   ]
  },
  {
   "id": "AB04",
   "tema": "arboles",
   "pagina": "arbol-b",
   "texto": "El árbol B+ nunca puede quedar lleno.",
   "respuesta": "F",
   "estado": "razonada",
   "justificacion": "Con factor de carga del 100 % todos los nodos quedan completos. Tiene sentido en un índice que solo se consulta.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD (marcado «revisar»)"
   ]
  },
  {
   "id": "AB05",
   "tema": "arboles",
   "pagina": "arbol-b",
   "texto": "Si un nodo de un árbol B tiene N claves, entonces tiene N + 1 hijos.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Las claves separan los punteros: n punteros, n − 1 claves (libro de la cátedra).",
   "polemica": "En los bancos aparece como «si un árbol B tiene N claves entonces el grado es N + 1», y el Resumen la responde V y F en dos lugares. Si dice «el árbol» (todas sus claves), es F.",
   "finales": [],
   "fuentes": [
    "libro de la cátedra",
    "Resumen GGDD (dice V y F)"
   ]
  },
  {
   "id": "AB06",
   "tema": "arboles",
   "pagina": "arbol-b",
   "texto": "Un árbol B o un B+ tiene un alto costo de mantenimiento y por eso implementa un factor de carga en cada nodo.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Dejar lugar libre en cada nodo permite insertar sin hacer split en cada alta.",
   "finales": [],
   "fuentes": [
    "banco de Reinosa"
   ]
  },
  {
   "id": "AB07",
   "tema": "arboles",
   "pagina": "arbol-b",
   "texto": "El método de árbol B no es aplicable a archivos con grandes volúmenes de datos.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Es justamente para eso: cada nodo es una página de disco y se leen pocas páginas. Lo usan los índices de los motores y los file systems.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD",
    "banco de Reinosa"
   ]
  },
  {
   "id": "AB08",
   "tema": "arboles",
   "pagina": "arbol-b",
   "texto": "En un índice de un DBMS armado en un árbol B, el tiempo de acceso a la información depende en parte del tamaño de la clave almacenada.",
   "respuesta": "V",
   "estado": "razonada",
   "justificacion": "Con claves cortas entran más por página: más hijos por nodo, menos niveles, menos lecturas a disco y comparaciones más baratas.",
   "polemica": "El Resumen dice F («depende de la altura»), pero la altura depende justamente del tamaño de clave. El final del 03/12/2024 preguntó por qué una clave numérica corta es más rápida.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD (dice F)",
    "teoría del 03/12/2024"
   ]
  },
  {
   "id": "AB09",
   "tema": "arboles",
   "pagina": "arbol-b",
   "texto": "Cuanto más chico se tome el factor de split (de carga) de un árbol B, mayor será la cantidad de niveles del mismo.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Nodos menos llenos = más nodos para las mismas claves = más niveles.",
   "finales": [],
   "fuentes": [
    "banco de Reinosa"
   ]
  },
  {
   "id": "AB10",
   "tema": "arboles",
   "pagina": "arbol-b",
   "texto": "El orden de complejidad de un ABB es similar al del árbol B.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "En promedio los dos son logarítmicos, pero el ABB en el peor caso es O(n) (degenera en lista) y el árbol B siempre está balanceado: O(log n).",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "HA01",
   "tema": "hashing",
   "pagina": "hashing",
   "texto": "Hashing es más performante que el árbol B en la búsqueda de una clave única en particular existente.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Acceso directo: se calcula la posición (O(1)). El árbol B tiene que bajar niveles (O(log n)).",
   "polemica": "Ojo con el 30/07/2024: la cátedra marcó F una versión sin «única» ni «existente». Leé cada palabra.",
   "finales": [
    "04/12/2019"
   ],
   "fuentes": [
    "Teóricas GDD"
   ]
  },
  {
   "id": "HA02",
   "tema": "hashing",
   "pagina": "hashing",
   "texto": "Si una función de hash no posee una buena dispersión, se van a producir muchas colisiones.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Mala dispersión = muchas claves caen en las mismas posiciones.",
   "finales": [
    "26/02/2020"
   ],
   "fuentes": [
    "Teóricas GDD"
   ]
  },
  {
   "id": "HA03",
   "tema": "hashing",
   "pagina": "hashing",
   "texto": "Los accesos mediante funciones de hash son eficientes siempre y se recomiendan en todos los casos en que se necesite acceder a datos.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "No sirven para rangos (BETWEEN, >, <), ni para recorrer en orden, ni para claves muy repetidas.",
   "finales": [
    "2022 (s/f, A)"
   ],
   "fuentes": [
    "Teóricas GDD"
   ]
  },
  {
   "id": "HA04",
   "tema": "hashing",
   "pagina": "hashing",
   "texto": "Siempre, en todos los casos, es más rápido el acceso a los datos mediante un índice que mediante algún algoritmo sobre la tabla.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Con tablas chicas, o consultas que traen gran parte de la tabla, el recorrido secuencial gana: el índice suma lecturas.",
   "finales": [
    "06/12/2022"
   ],
   "fuentes": [
    "Teóricas GDD"
   ]
  },
  {
   "id": "HA05",
   "tema": "hashing",
   "pagina": "hashing",
   "texto": "Si un índice es por clave duplicada, no se puede implementar con hashing.",
   "respuesta": "V",
   "estado": "oficial",
   "justificacion": "Para la cátedra, hashing es para claves únicas: todas las repetidas caerían en la misma posición y serían colisiones seguras.",
   "finales": [
    "22/12/2022"
   ],
   "fuentes": [
    "nota del examen corregido (el alumno puso F y le restaron)"
   ]
  },
  {
   "id": "HA06",
   "tema": "hashing",
   "pagina": "hashing",
   "texto": "Un split en un árbol B es una operación tan costosa que hace recomendable aplicar siempre índices de hash antes que índices de árbol B.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "El split es ocasional (el factor de carga lo reduce) y el árbol B sirve para rangos y orden; hashing no.",
   "finales": [
    "28/02/2023"
   ],
   "fuentes": [
    "Teóricas GDD"
   ]
  },
  {
   "id": "HA07",
   "tema": "hashing",
   "pagina": "hashing",
   "texto": "Pueden existir situaciones donde recorrer secuencialmente una tabla es más eficiente que acceder mediante un índice.",
   "respuesta": "V",
   "estado": "oficial",
   "justificacion": "Tablas chicas o consultas que devuelven gran parte de las filas.",
   "finales": [
    "01/08/2023"
   ],
   "fuentes": [
    "nota del examen corregido"
   ]
  },
  {
   "id": "HA08",
   "tema": "hashing",
   "pagina": "hashing",
   "texto": "Conviene, en términos de velocidad, buscar en una estructura de hash por una clave que buscar en una estructura de árbol B+.",
   "respuesta": "F",
   "estado": "oficial",
   "justificacion": "Respuesta de la cátedra en la revisión. «Una clave» no dice que sea única ni que exista: con claves repetidas o muchas colisiones, hashing no conviene.",
   "polemica": "Teóricas GDD dice V. Compará con el 04/12/2019, que decía «clave única existente» y era V.",
   "finales": [
    "30/07/2024"
   ],
   "fuentes": [
    "respuesta de la cátedra en la revisión",
    "Teóricas GDD (dice V)"
   ]
  },
  {
   "id": "HA09",
   "tema": "hashing",
   "pagina": "hashing",
   "texto": "Las funciones de hashing no poseen funciones inversas.",
   "respuesta": "V",
   "estado": "razonada",
   "justificacion": "Muchas claves van a la misma posición (no es inyectiva): desde la posición no se puede saber de qué clave vino.",
   "polemica": "Teóricas, el Resumen y Reinosa dicen V; un banco dice F («hay funciones invertibles»).",
   "finales": [
    "18/10/2024"
   ],
   "fuentes": [
    "Teóricas GDD",
    "Resumen GGDD",
    "banco de Reinosa"
   ]
  },
  {
   "id": "HA10",
   "tema": "hashing",
   "pagina": "hashing",
   "texto": "La técnica de hash abierto puede generar muchas lecturas secuenciales para un valor de clave hash cuando hay alto grado de repetición de claves.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Con direccionamiento abierto, cada colisión se resuelve probando la posición siguiente: muchas colisiones = muchas lecturas.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "HA11",
   "tema": "hashing",
   "pagina": "hashing",
   "texto": "Una tabla de hash permite desarrollar un mecanismo indexado para recuperar claves únicas a alta velocidad.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Búsqueda por igualdad de una clave única: es su mejor caso.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD (dos variantes)"
   ]
  },
  {
   "id": "HA12",
   "tema": "hashing",
   "pagina": "hashing",
   "texto": "Todos los motores de bases de datos utilizan hashing para el armado de sus índices.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Los índices de uso general son árboles B/B+ (SQL Server usa B+ para sus índices).",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "HA13",
   "tema": "hashing",
   "pagina": "hashing",
   "texto": "El método de hashing resuelve más eficientemente las búsquedas con rangos de claves.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "La función dispersa: claves vecinas quedan en posiciones lejanas. Para rangos, árbol B+ (hojas encadenadas en orden).",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "HA14",
   "tema": "hashing",
   "pagina": "hashing",
   "texto": "La cantidad de entradas de una tabla de hash es dinámica.",
   "respuesta": "F",
   "estado": "razonada",
   "justificacion": "En el hashing que se ve en la materia el tamaño M se fija de antemano (la función es k mod M). Cambiarlo obliga a recalcular todas las posiciones.",
   "polemica": "Existen variantes dinámicas (hashing extensible o lineal), pero no se ven en la materia.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "HA15",
   "tema": "hashing",
   "pagina": "hashing",
   "texto": "Los árboles B garantizan mayor velocidad que hashing para el acceso a los datos.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Para buscar una clave puntual, hashing es más rápido (acceso directo). El árbol B gana en rangos y orden, pero «garantizan mayor velocidad» es falso.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD",
    "banco de Reinosa"
   ]
  },
  {
   "id": "HA16",
   "tema": "hashing",
   "pagina": "hashing",
   "texto": "El árbol B es más óptimo que el hashing para la búsqueda de claves puntuales.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Por igualdad, hashing: O(1) contra O(log n).",
   "finales": [],
   "fuentes": [
    "Resumen GGDD (dos veces)"
   ]
  },
  {
   "id": "HA17",
   "tema": "hashing",
   "pagina": "hashing",
   "texto": "En una base de datos relacional, los índices garantizan la unicidad de claves.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Un índice común admite valores repetidos. La unicidad la garantizan la PK y UNIQUE (que el motor implementa con un índice único).",
   "finales": [],
   "fuentes": [
    "banco de Reinosa (tres veces)"
   ]
  },
  {
   "id": "HA18",
   "tema": "hashing",
   "pagina": "hashing",
   "texto": "Los índices en una base de datos relacional solo sirven para aumentar la velocidad de acceso a los datos.",
   "respuesta": "F",
   "estado": "razonada",
   "justificacion": "También sirven para ordenar, agrupar y hacer joins, y SQL Server implementa PRIMARY KEY y UNIQUE con índices únicos.",
   "polemica": "Reinosa dice V («solo sirven para evitar el acceso secuencial»); el Resumen dice F. El «solo» la hace falsa.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD (dice F)",
    "banco de Reinosa (dice V)"
   ]
  },
  {
   "id": "HA19",
   "tema": "hashing",
   "pagina": "hashing",
   "texto": "El checksum es una de las técnicas utilizadas para corroborar la integridad de los datos.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Se calcula un valor resumen (como un hash) de los datos; si al releerlos no coincide, hubo corrupción.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "OR01",
   "tema": "ordenamiento",
   "pagina": "ordenamiento",
   "texto": "El heap es un árbol n-ario que debe cumplir la norma de que el padre sea mayor que sus hijos en todos los niveles.",
   "respuesta": "F",
   "estado": "oficial",
   "justificacion": "El heap es un árbol BINARIO (completo, cargado por niveles de izquierda a derecha) donde cada padre es mayor o igual que sus hijos.",
   "finales": [
    "22/06/2021"
   ],
   "fuentes": [
    "Moodle (clave oficial)",
    "banco de Reinosa"
   ]
  },
  {
   "id": "OR02",
   "tema": "ordenamiento",
   "pagina": "ordenamiento",
   "texto": "El algoritmo QuickSort tiene un orden de complejidad que varía según cómo vengan ordenados los datos.",
   "respuesta": "V",
   "estado": "oficial",
   "justificacion": "O(n log n) en promedio; O(n²) en el peor caso (por ejemplo, datos ya ordenados con el primer elemento como pivote).",
   "finales": [
    "02/08/2021"
   ],
   "fuentes": [
    "Moodle (comentario oficial)"
   ]
  },
  {
   "id": "OR03",
   "tema": "ordenamiento",
   "pagina": "ordenamiento",
   "texto": "El método Heapsort siempre es más rápido que el método de la burbuja para ordenar un conjunto de datos desordenados.",
   "respuesta": "V",
   "estado": "razonada",
   "justificacion": "Heapsort es O(n log n) en todos los casos; burbuja es O(n²). Con datos desordenados, Heapsort gana.",
   "polemica": "Todas las fuentes dicen V. Hay quien la marca F por el «siempre»: con muy pocos datos o datos casi ordenados, la burbuja con bandera puede ganar. Pero la frase dice «desordenados».",
   "finales": [
    "02/03/2022"
   ],
   "fuentes": [
    "Resumen GGDD",
    "Teóricas GDD"
   ]
  },
  {
   "id": "OR04",
   "tema": "ordenamiento",
   "pagina": "ordenamiento",
   "texto": "El método de ordenamiento QuickSort tiene siempre el mismo orden de complejidad; es decir, su complejidad computacional es constante.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "O(n log n) en promedio y O(n²) en el peor caso.",
   "finales": [
    "2022 (s/f, B)"
   ],
   "fuentes": [
    "Teóricas GDD"
   ]
  },
  {
   "id": "OR05",
   "tema": "ordenamiento",
   "pagina": "ordenamiento",
   "texto": "El tiempo de ejecución de cualquier algoritmo de clasificación es directamente proporcional a la cantidad de elementos a ordenar.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Crece como n log n o como n², no en forma lineal. Duplicar los datos no duplica el tiempo.",
   "finales": [
    "20/02/2024"
   ],
   "fuentes": [
    "Teóricas GDD"
   ]
  },
  {
   "id": "OR06",
   "tema": "ordenamiento",
   "pagina": "ordenamiento",
   "texto": "La complejidad computacional de los métodos de ordenamiento depende del espacio ocupado por las estructuras que se usan.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "La complejidad (temporal) depende de la cantidad de elementos y de cómo vienen ordenados, no del espacio.",
   "finales": [
    "10/12/2024"
   ],
   "fuentes": [
    "foto del examen"
   ]
  },
  {
   "id": "OR07",
   "tema": "ordenamiento",
   "pagina": "ordenamiento",
   "texto": "El algoritmo QuickSort utiliza la técnica de «divide y vencerás».",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Elige un pivote, parte en menores y mayores y ordena cada parte recursivamente.",
   "finales": [
    "29/07/2025"
   ],
   "fuentes": [
    "hilo de UTNianos"
   ]
  },
  {
   "id": "OR08",
   "tema": "ordenamiento",
   "pagina": "ordenamiento",
   "texto": "El tiempo de ejecución de cualquier algoritmo de clasificación siempre depende, aunque sea en parte, de la cantidad de elementos a ordenar.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Más elementos = más comparaciones, en cualquier método. Compará con la del 20/02/2024: «directamente proporcional» es F.",
   "finales": [],
   "fuentes": [
    "banco de Reinosa"
   ]
  },
  {
   "id": "OR09",
   "tema": "ordenamiento",
   "pagina": "ordenamiento",
   "texto": "El algoritmo Heapsort siempre tiene el mismo orden de complejidad, para cualquier orden en que ingresen los datos.",
   "respuesta": "V",
   "estado": "razonada",
   "justificacion": "Arma el heap (O(n)) y saca n veces la raíz reacomodando (O(log n) cada una): O(n log n) en el mejor, promedio y peor caso.",
   "polemica": "El Resumen la tiene dos veces: una dice F y otra V. El orden de complejidad no cambia; lo que puede variar un poco es el tiempo real.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD (dice F y V)"
   ]
  },
  {
   "id": "OR10",
   "tema": "ordenamiento",
   "pagina": "ordenamiento",
   "texto": "En Heapsort, el tiempo de ejecución solo depende del número de elementos a ordenar.",
   "respuesta": "V",
   "estado": "razonada",
   "justificacion": "En orden de complejidad, sí: O(n log n) sin importar cómo vienen los datos.",
   "polemica": "El Resumen dice F («si está semiordenado será más óptimo»), lo que contradice su propia respuesta V de la frase anterior. Si te la toman, justificá con el orden de complejidad.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD (dice F)"
   ]
  },
  {
   "id": "OR11",
   "tema": "ordenamiento",
   "pagina": "ordenamiento",
   "texto": "El Heapsort tiene peor rendimiento si los datos ya vienen ordenados.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Su orden es O(n log n) en todos los casos. El que empeora con datos ordenados es QuickSort (con pivote en un extremo).",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "OR12",
   "tema": "ordenamiento",
   "pagina": "ordenamiento",
   "texto": "El algoritmo QuickSort es siempre más rápido (más performante) que HeapSort.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "En promedio suele ganar QuickSort, pero en su peor caso es O(n²) y Heapsort sigue en O(n log n).",
   "finales": [],
   "fuentes": [
    "Resumen GGDD (dos variantes)"
   ]
  },
  {
   "id": "OR13",
   "tema": "ordenamiento",
   "pagina": "ordenamiento",
   "texto": "En el peor de los casos, el algoritmo QuickSort es igual a Heapsort.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Peor caso: QuickSort O(n²), Heapsort O(n log n).",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "OR14",
   "tema": "ordenamiento",
   "pagina": "ordenamiento",
   "texto": "Si tengo un conjunto de datos tendiendo a ordenados, QuickSort es el algoritmo más eficiente para ordenarlo.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Con datos casi ordenados y pivote en un extremo, QuickSort se acerca a su peor caso O(n²). Inserción o burbuja con bandera andan muy bien ahí.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "OR15",
   "tema": "ordenamiento",
   "pagina": "ordenamiento",
   "texto": "QuickSort tiene en promedio complejidad O(n log n), pero en determinada circunstancia puede ser O(n²) y ser el peor de todos los métodos de clasificación.",
   "respuesta": "F",
   "estado": "razonada",
   "justificacion": "La primera parte es cierta. Pero en su peor caso empata con burbuja e inserción (O(n²)): no es «el peor de todos».",
   "polemica": "El texto del Resumen está cortado y su justificación no explica el F. Leé hasta el final de la frase.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "MR01",
   "tema": "relacional",
   "pagina": "modelo-relacional",
   "texto": "Las únicas restricciones posibles aplicables en el modelo relacional son por tabla.",
   "respuesta": "F",
   "estado": "oficial",
   "justificacion": "También hay restricciones por columna (NOT NULL, CHECK de columna, dominio) y entre tablas (FK).",
   "finales": [
    "10/03/2021",
    "22/06/2021"
   ],
   "fuentes": [
    "Moodle (clave oficial)",
    "banco de Reinosa"
   ]
  },
  {
   "id": "MR02",
   "tema": "relacional",
   "pagina": "modelo-relacional",
   "texto": "La normalización aplicada al diseño de un modelo relacional permite desarrollar el modelo de manera estructurada, independientemente de la performance que pueda llegar a obtener.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Normalizar parte los datos en más tablas: consultar exige más joins y puede perder performance. Por eso a veces se desnormaliza (como en OLAP).",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "MR03",
   "tema": "relacional",
   "pagina": "modelo-relacional",
   "texto": "Las claves alternas (o alternativas) son posibles claves foráneas que pertenecen al conjunto de las claves candidatas.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Alternas son las claves candidatas que NO se eligieron como primaria. Foránea es otra cosa: columnas que referencian la clave de otra tabla.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "MR04",
   "tema": "relacional",
   "pagina": "modelo-relacional",
   "texto": "A veces una primary key de una tabla puede permitir valores repetidos.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "La PK identifica cada fila: es única y no admite NULL (integridad de entidad).",
   "finales": [],
   "fuentes": [
    "banco de Reinosa (dos veces)"
   ]
  },
  {
   "id": "MR05",
   "tema": "relacional",
   "pagina": "modelo-relacional",
   "texto": "Una tabla sin primary key no puede tener una foreign key.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "La FK necesita que la tabla REFERENCIADA tenga PK o UNIQUE. La tabla que tiene la FK puede no tener PK.",
   "finales": [],
   "fuentes": [
    "banco de Reinosa (dos veces)"
   ]
  },
  {
   "id": "MR06",
   "tema": "relacional",
   "pagina": "modelo-relacional",
   "texto": "En una base de datos relacional, una tabla siempre debe tener una PK.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Es lo recomendable, pero SQL Server permite crear tablas sin PK (por ejemplo, una tabla de log).",
   "finales": [],
   "fuentes": [
    "banco de Reinosa"
   ]
  },
  {
   "id": "MR07",
   "tema": "relacional",
   "pagina": "modelo-relacional",
   "texto": "Una foreign key es una relación entre uno o más campos de una tabla con uno o más campos de otra, de igual tipo.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "No con cualquier campo: tiene que referenciar la PK o una UNIQUE de la otra tabla. Y puede ser de la misma tabla (Persona.su_padre_es).",
   "finales": [],
   "fuentes": [
    "banco de Reinosa"
   ]
  },
  {
   "id": "MR08",
   "tema": "relacional",
   "pagina": "modelo-relacional",
   "texto": "El CHECK es una restricción al modelo.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Es una constraint: el motor rechaza cualquier fila que no cumpla la condición.",
   "finales": [],
   "fuentes": [
    "banco de Reinosa (dos veces)"
   ]
  },
  {
   "id": "MR09",
   "tema": "relacional",
   "pagina": "modelo-relacional",
   "texto": "Una foreign key es una restricción al modelo.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Implementa la integridad referencial: no deja cargar ni dejar valores que no existan en la tabla referenciada.",
   "finales": [],
   "fuentes": [
    "banco de Reinosa"
   ]
  },
  {
   "id": "MR10",
   "tema": "relacional",
   "pagina": "modelo-relacional",
   "texto": "La integridad referencial en un sistema de gestión de bases de datos relacional es la restricción que garantiza la no duplicidad de filas.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Eso es la integridad de entidad (PK). La referencial garantiza que cada FK apunte a una fila que existe.",
   "finales": [],
   "fuentes": [
    "banco de Reinosa"
   ]
  },
  {
   "id": "MR11",
   "tema": "relacional",
   "pagina": "modelo-relacional",
   "texto": "Un motor de base de datos relacional utiliza los conceptos de álgebra relacional para la resolución de consultas.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "El optimizador traduce el SQL a operaciones de álgebra (selección, proyección, join…) y elige el plan más barato.",
   "finales": [],
   "fuentes": [
    "banco de Reinosa"
   ]
  },
  {
   "id": "MR12",
   "tema": "relacional",
   "pagina": "modelo-relacional",
   "texto": "En un modelo de datos, una entidad es independiente si y solo si no recibe una relación de otra entidad.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "No depende de otra para identificarse: su PK no incluye claves de otras entidades.",
   "finales": [],
   "fuentes": [
    "banco de Reinosa"
   ]
  },
  {
   "id": "MR13",
   "tema": "relacional",
   "pagina": "modelo-relacional",
   "texto": "Gracias a los índices se puede asegurar la integridad referencial.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "La integridad referencial la asegura la FOREIGN KEY. Un índice sobre la FK solo acelera los joins y los controles.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "MR14",
   "tema": "relacional",
   "pagina": "modelo-relacional",
   "texto": "La única manera de asegurar la unicidad de los campos es con una primary key o con UNIQUE.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "También se puede con un trigger que rechace repetidos (por ejemplo, para valores no nulos únicos, que UNIQUE no resuelve en SQL Server).",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "AQ01",
   "tema": "relacional",
   "pagina": "arquitectura",
   "texto": "Un motor de base de datos cuenta con su propio User Manager, File Manager y Disk Manager, por lo cual no tiene contacto con el sistema operativo sobre el cual corre.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Tiene esos componentes, pero para leer y escribir en disco, usar memoria y red le pide servicios al sistema operativo.",
   "finales": [],
   "fuentes": [
    "banco de Reinosa (dos veces)"
   ]
  },
  {
   "id": "AQ02",
   "tema": "relacional",
   "pagina": "arquitectura",
   "texto": "Un motor de base de datos relacional se construye sobre tres niveles: físico, conceptual y externo.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Es la arquitectura ANSI/SPARC: nivel interno (físico), conceptual (lógico) y externo (vistas de los usuarios).",
   "finales": [],
   "fuentes": [
    "banco de Reinosa (dos veces)"
   ]
  },
  {
   "id": "AQ03",
   "tema": "relacional",
   "pagina": "arquitectura",
   "texto": "La independencia lógica de los datos permite cambiar el esquema conceptual sin modificar los esquemas externos ni las aplicaciones.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Agregar una columna o una tabla no rompe las vistas ni los programas que no la usan. La física es lo mismo un nivel más abajo: cambiar índices o archivos sin tocar el esquema conceptual.",
   "finales": [],
   "fuentes": [
    "práctica de la guía (no salió)"
   ]
  },
  {
   "id": "AQ04",
   "tema": "relacional",
   "pagina": "arquitectura",
   "texto": "El diccionario de datos (catálogo) guarda los datos de los usuarios de la base.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Guarda metadatos: qué tablas, columnas, tipos, constraints, índices, usuarios y permisos existen.",
   "finales": [],
   "fuentes": [
    "práctica de la guía (no salió)"
   ]
  },
  {
   "id": "OB01",
   "tema": "integridad",
   "pagina": "objetos",
   "texto": "Si se desea que no se puedan eliminar registros de una tabla de auditoría, una opción es crear un trigger que lo impida.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Un INSTEAD OF DELETE que no borre nada, o un AFTER DELETE con ROLLBACK. (También se pueden quitar permisos con DENY/REVOKE.)",
   "finales": [
    "12/03/2018"
   ],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "OB02",
   "tema": "integridad",
   "pagina": "objetos",
   "texto": "Un constraint de tipo CHECK siempre puede ser reemplazado por un trigger.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Todo lo que valida un CHECK (una condición sobre la fila) lo puede validar un trigger. Al revés no: el trigger puede mirar otras tablas.",
   "finales": [
    "12/02/2019",
    "05/03/2024",
    "18/10/2024"
   ],
   "fuentes": [
    "Teóricas GDD",
    "banco de Reinosa"
   ]
  },
  {
   "id": "OB03",
   "tema": "integridad",
   "pagina": "objetos",
   "texto": "Si una columna posee la constraint UNIQUE, entonces una sola fila como máximo puede contener NULL en dicha columna.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "En SQL Server (el motor de la cátedra) UNIQUE trata a los NULL como iguales: admite uno solo.",
   "polemica": "En Oracle o PostgreSQL admite varios NULL. El Resumen dice «tantos como se quiera»: está pensando en otro motor.",
   "finales": [
    "26/02/2019",
    "05/12/2023"
   ],
   "fuentes": [
    "Teóricas GDD",
    "banco de Reinosa"
   ]
  },
  {
   "id": "OB04",
   "tema": "integridad",
   "pagina": "objetos",
   "texto": "Una columna afectada por una constraint UNIQUE no puede almacenar valores repetidos ni NULL.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "No admite repetidos, pero sí un NULL (en SQL Server).",
   "finales": [
    "04/12/2019"
   ],
   "fuentes": [
    "Teóricas GDD"
   ]
  },
  {
   "id": "OB05",
   "tema": "integridad",
   "pagina": "objetos",
   "texto": "Si una columna posee la constraint UNIQUE, entonces ninguna fila acepta NULL en dicha columna.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Acepta un NULL en SQL Server.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "OB06",
   "tema": "integridad",
   "pagina": "objetos",
   "texto": "En una base de datos relacional las vistas pueden ser utilizadas para brindar consistencia de datos.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "La consistencia la dan las transacciones y las constraints. Las vistas sirven para seguridad y para simplificar consultas.",
   "polemica": "Matiz: una vista WITH CHECK OPTION impide insertar por ella filas que no cumplan su WHERE; la cátedra la aceptó como objeto de integridad el 30/07/2024. Para este V/F, la respuesta de todas las fuentes es F.",
   "finales": [
    "25/09/2019"
   ],
   "fuentes": [
    "Teóricas GDD"
   ]
  },
  {
   "id": "OB07",
   "tema": "integridad",
   "pagina": "objetos",
   "texto": "En una vista nunca se pueden realizar inserts de registros.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Se puede si la vista es actualizable (una sola tabla base, sin agregados, DISTINCT ni GROUP BY) o con un trigger INSTEAD OF INSERT.",
   "finales": [
    "26/02/2020",
    "07/03/2023"
   ],
   "fuentes": [
    "Teóricas GDD"
   ]
  },
  {
   "id": "OB08",
   "tema": "integridad",
   "pagina": "objetos",
   "texto": "No es posible realizar [palabra ilegible] a través de una vista.",
   "respuesta": "?",
   "estado": "sin_resolver",
   "justificacion": "El enunciado de la foto está incompleto. Si la palabra era «inserts», es F.",
   "finales": [
    "12/12/2023"
   ],
   "fuentes": [
    "foto del examen"
   ]
  },
  {
   "id": "OB09",
   "tema": "integridad",
   "pagina": "objetos",
   "texto": "La ejecución sin filas de resultado de una query dentro de un trigger en SQL Server genera la cancelación de la transacción.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Una consulta sin filas no es un error: el trigger sigue y la transacción también.",
   "finales": [
    "09/09/2022"
   ],
   "fuentes": [
    "Teóricas GDD",
    "banco de Reinosa"
   ]
  },
  {
   "id": "OB10",
   "tema": "integridad",
   "pagina": "objetos",
   "texto": "Es lo mismo usar una UNIQUE constraint sobre el campo identificador de una tabla que una primary key, dado que ambas ofrecen el mismo concepto y funcionalidad.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "UNIQUE admite un NULL; la PK no (integridad de entidad). Además hay una sola PK por tabla y es la que se referencia por defecto desde las FK.",
   "finales": [
    "06/12/2022"
   ],
   "fuentes": [
    "Teóricas GDD"
   ]
  },
  {
   "id": "OB11",
   "tema": "integridad",
   "pagina": "objetos",
   "texto": "Para una misma tabla y evento, solo puede haber un trigger AFTER.",
   "respuesta": "F",
   "estado": "oficial",
   "justificacion": "Puede haber varios AFTER por evento. El que es único por evento es el INSTEAD OF.",
   "finales": [
    "22/12/2022"
   ],
   "fuentes": [
    "nota del examen corregido (el alumno puso V y le restaron)"
   ]
  },
  {
   "id": "OB12",
   "tema": "integridad",
   "pagina": "objetos",
   "texto": "En una tabla de una base de datos relacional no se puede definir más de un trigger por cada evento (insert, update, delete).",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Varios AFTER por evento; INSTEAD OF, uno solo.",
   "finales": [
    "20/02/2024",
    "11/02/2025"
   ],
   "fuentes": [
    "Teóricas GDD",
    "banco de Reinosa"
   ]
  },
  {
   "id": "OB13",
   "tema": "integridad",
   "pagina": "objetos",
   "texto": "Una constraint CHECK puede evaluar campos de distintas tablas.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Solo columnas de la misma fila. Para comparar con otra tabla hace falta un trigger.",
   "polemica": "En SQL Server se podría «hacer trampa» con un CHECK que llama a una función que consulta otra tabla. La respuesta esperada es F.",
   "finales": [
    "23/05/2023"
   ],
   "fuentes": [
    "Teóricas GDD"
   ]
  },
  {
   "id": "OB14",
   "tema": "integridad",
   "pagina": "objetos",
   "texto": "Una view puede utilizarse para brindar seguridad.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Se da permiso sobre la vista y no sobre la tabla: el usuario ve solo las filas y columnas que la vista muestra.",
   "finales": [
    "25/07/2023"
   ],
   "fuentes": [
    "Teóricas GDD"
   ]
  },
  {
   "id": "OB15",
   "tema": "integridad",
   "pagina": "objetos",
   "texto": "Una función escalar no puede retornar NULL.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "RETURN NULL es válido; además, cualquier cálculo con un NULL devuelve NULL.",
   "finales": [
    "27/09/2023"
   ],
   "fuentes": [
    "Teóricas GDD"
   ]
  },
  {
   "id": "OB16",
   "tema": "integridad",
   "pagina": "objetos",
   "texto": "Una tabla no puede tener dos claves foráneas que referencien a la misma tabla.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Ejemplos: Persona con FK a su padre y a su madre; Mundial con PaisCampeon y PaisSubCampeon apuntando a País.",
   "finales": [
    "05/12/2023"
   ],
   "fuentes": [
    "Teóricas GDD"
   ]
  },
  {
   "id": "OB17",
   "tema": "integridad",
   "pagina": "objetos",
   "texto": "Una de las ventajas de los stored procedures es que se utilizan para manejar la seguridad en la base de datos.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Se da permiso EXECUTE sobre el SP sin dar permisos sobre las tablas: el usuario solo puede hacer lo que el SP hace.",
   "finales": [
    "12/12/2023"
   ],
   "fuentes": [
    "Teóricas GDD"
   ]
  },
  {
   "id": "OB18",
   "tema": "integridad",
   "pagina": "objetos",
   "texto": "Las funciones creadas por el usuario en T-SQL no permiten sentencias INSERT, DELETE o UPDATE en su cuerpo.",
   "respuesta": "V",
   "estado": "oficial",
   "justificacion": "Una función no puede modificar tablas de la base (no puede tener efectos laterales). Para eso está el SP.",
   "polemica": "Matiz: sí permiten INSERT/UPDATE/DELETE sobre variables de tipo tabla declaradas dentro de la función.",
   "finales": [
    "23/07/2024"
   ],
   "fuentes": [
    "nota del examen corregido"
   ]
  },
  {
   "id": "OB19",
   "tema": "integridad",
   "pagina": "objetos",
   "texto": "Dada una tabla con un trigger de INSERT, si al insertar una fila (sin transacción iniciada) la acción del trigger falla, la fila no queda insertada.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "El INSERT y su trigger forman una sola transacción: si el trigger falla o hace ROLLBACK, se deshace también el INSERT.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "OB20",
   "tema": "integridad",
   "pagina": "objetos",
   "texto": "La acción que ejecuta un trigger y el evento que lo dispara siempre se ejecutan de manera atómica.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "El trigger corre dentro de la misma transacción que la sentencia: se confirman o se deshacen juntos.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "SQ01",
   "tema": "relacional",
   "pagina": "sql",
   "texto": "Luego de CREATE TABLE tablitaFinal (campo1 VARCHAR(5)) y de poblar la tabla, para cualquier set de datos se cumple SELECT COUNT(campo1) = SELECT COUNT(*).",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "COUNT(campo1) no cuenta los NULL; COUNT(*) cuenta filas. Con un NULL cargado, difieren.",
   "polemica": "El enunciado original decía VARCHAR2 (tipo de Oracle). En SQL Server es VARCHAR; la idea es la misma.",
   "finales": [
    "22/02/2023"
   ],
   "fuentes": [
    "Teóricas GDD"
   ]
  },
  {
   "id": "SQ02",
   "tema": "relacional",
   "pagina": "sql",
   "texto": "Toda consulta que utilice al menos una función de grupo debe ir acompañada de la cláusula GROUP BY.",
   "respuesta": "F",
   "estado": "oficial",
   "justificacion": "SELECT COUNT(*) FROM t no lleva GROUP BY: toda la tabla es un solo grupo. GROUP BY hace falta si además hay columnas sin agregar.",
   "finales": [
    "04/2024 (especial)"
   ],
   "fuentes": [
    "nota del examen corregido"
   ]
  },
  {
   "id": "SQ03",
   "tema": "relacional",
   "pagina": "sql",
   "texto": "El análisis del plan de consulta permite detectar la operatoria interna desarrollada por un RDBMS para procesar la consulta.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "El plan muestra qué operadores usa (scan, seek, tipo de join, sort), en qué orden y con qué costo.",
   "finales": [
    "03/12/2024"
   ],
   "fuentes": [
    "foto del examen"
   ]
  },
  {
   "id": "SQ04",
   "tema": "relacional",
   "pagina": "sql",
   "texto": "En SQL, una subconsulta en el WHERE siempre debe retornar una columna.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Con EXISTS la subconsulta puede devolver cualquier cantidad de columnas (solo importa si hay filas). Con IN o con un comparador, sí tiene que devolver una.",
   "finales": [
    "11/02/2025"
   ],
   "fuentes": [
    "hilo de UTNianos"
   ]
  },
  {
   "id": "SQ05",
   "tema": "relacional",
   "pagina": "sql",
   "texto": "Una subconsulta ubicada en un WHERE siempre debe retornar al menos una fila.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Puede no devolver filas: NOT EXISTS lo usa a propósito, y una subconsulta escalar vacía vale NULL.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "SQ06",
   "tema": "relacional",
   "pagina": "sql",
   "texto": "Si existe un SELECT dentro de una cláusula HAVING, este debe devolver una fila y una columna.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Con IN, ANY o ALL puede devolver varias filas.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD",
    "banco de Reinosa"
   ]
  },
  {
   "id": "SQ07",
   "tema": "relacional",
   "pagina": "sql",
   "texto": "En SQL, una subconsulta en el SELECT siempre debe retornar una fila y una columna.",
   "respuesta": "F",
   "estado": "razonada",
   "justificacion": "Debe devolver una columna y A LO SUMO una fila. Si no devuelve ninguna, el valor es NULL; si devuelve dos, da error.",
   "polemica": "Reinosa la tiene dos veces como V. La palabra «siempre» con «una fila» la hace falsa: cero filas es válido.",
   "finales": [],
   "fuentes": [
    "banco de Reinosa (dice V)"
   ]
  },
  {
   "id": "SQ08",
   "tema": "relacional",
   "pagina": "sql",
   "texto": "En SQL, la cláusula HAVING solo puede usarse acompañada por un GROUP BY.",
   "respuesta": "F",
   "estado": "razonada",
   "justificacion": "En SQL Server, SELECT COUNT(*) FROM t HAVING COUNT(*) > 10 es válido: toda la tabla forma un solo grupo.",
   "polemica": "Reinosa dice V. Es poco común, pero el motor de la cátedra lo acepta.",
   "finales": [],
   "fuentes": [
    "banco de Reinosa (dice V)"
   ]
  },
  {
   "id": "SQ09",
   "tema": "relacional",
   "pagina": "sql",
   "texto": "Un comando SELECT no acepta más de tres niveles de subconsultas anidadas.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "SQL Server admite hasta 32 niveles de anidamiento.",
   "finales": [],
   "fuentes": [
    "banco de Reinosa"
   ]
  },
  {
   "id": "SQ10",
   "tema": "relacional",
   "pagina": "sql",
   "texto": "No se puede hacer un OUTER JOIN (LEFT o RIGHT) entre dos tablas si no existe entre ellas una relación física (FK).",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Cualquier JOIN usa la condición del ON, haya o no FK. La FK es una constraint, no un requisito para combinar.",
   "finales": [],
   "fuentes": [
    "banco de Reinosa"
   ]
  },
  {
   "id": "SQ11",
   "tema": "relacional",
   "pagina": "sql",
   "texto": "En T-SQL, la condición WHERE a = 1 OR b = 2 AND c = 3 se evalúa como (a = 1 OR b = 2) AND c = 3.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "AND se evalúa antes que OR: es a = 1 OR (b = 2 AND c = 3). Es la trampa de los prácticos del 22/02/2023 y del 18/02/2025.",
   "finales": [],
   "fuentes": [
    "práctica de la guía (trampa de los prácticos)"
   ]
  },
  {
   "id": "SQ12",
   "tema": "relacional",
   "pagina": "sql",
   "texto": "La condición WHERE columna = NULL devuelve las filas donde la columna es NULL.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "Cualquier comparación con NULL da «desconocido» y la fila no pasa. Se escribe IS NULL.",
   "finales": [],
   "fuentes": [
    "práctica de la guía"
   ]
  },
  {
   "id": "OL01",
   "tema": "olap",
   "pagina": "olap",
   "texto": "Las técnicas más comunes utilizadas en Data Mining son las redes neuronales, los árboles de decisión y los algoritmos genéticos.",
   "respuesta": "V",
   "estado": "oficial",
   "justificacion": "Clave oficial de Moodle.",
   "finales": [
    "10/03/2021"
   ],
   "fuentes": [
    "Moodle (clave oficial)"
   ]
  },
  {
   "id": "OL02",
   "tema": "olap",
   "pagina": "olap",
   "texto": "Las técnicas más comunes utilizadas en Data Mining son las redes neuronales, los árboles de decisión y las reglas de inducción.",
   "respuesta": "F",
   "estado": "razonada",
   "justificacion": "El comentario oficial de Moodle sobre la pregunta anterior dice: «las reglas de inducción no son técnicas de DataMining».",
   "polemica": "Reinosa la marca V dos veces. Fijate en el último elemento de la lista: con «algoritmos genéticos» es V; con «reglas de inducción», F según la cátedra.",
   "finales": [],
   "fuentes": [
    "comentario oficial de Moodle (10/03/2021)",
    "banco de Reinosa (dice V)"
   ]
  },
  {
   "id": "OL03",
   "tema": "olap",
   "pagina": "olap",
   "texto": "Un sistema de Data Warehousing no permite la integración de bases de datos heterogéneas (relacionales, documentales, geográficas, archivos, etc.).",
   "respuesta": "F",
   "estado": "oficial",
   "justificacion": "Integrar fuentes heterogéneas es justamente lo que hace el DW (con el proceso ETL).",
   "finales": [
    "23/09/2021"
   ],
   "fuentes": [
    "Moodle (clave oficial)",
    "banco de Reinosa"
   ]
  },
  {
   "id": "OL04",
   "tema": "olap",
   "pagina": "olap",
   "texto": "Un Data Mart es un Data Warehouse afectado a un departamento o sector de la empresa.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Es un DW más chico, enfocado en un área (ventas, finanzas…).",
   "finales": [],
   "fuentes": [
    "banco de Reinosa"
   ]
  },
  {
   "id": "OL05",
   "tema": "olap",
   "pagina": "olap",
   "texto": "En el modelo estrella, primero se deben cargar las tablas de dimensiones y luego la tabla de hechos.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Cada fila de hechos tiene FK a las dimensiones: las dimensiones tienen que existir antes.",
   "finales": [],
   "fuentes": [
    "banco de Reinosa"
   ]
  },
  {
   "id": "OL06",
   "tema": "olap",
   "pagina": "olap",
   "texto": "Una tabla de dimensión en el modelo estrella es el equivalente a una cara de un cubo de información multidimensional.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Cada dimensión es un eje (una cara) del cubo; los hechos son las celdas de adentro.",
   "finales": [],
   "fuentes": [
    "banco de Reinosa"
   ]
  },
  {
   "id": "OL07",
   "tema": "olap",
   "pagina": "olap",
   "texto": "Un modelo OLAP solo puede ser implementado en una base de datos multidimensional.",
   "respuesta": "F",
   "estado": "consenso",
   "justificacion": "También sobre una base relacional (ROLAP), con el modelo estrella. Multidimensional es MOLAP; la mezcla, HOLAP.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "OL08",
   "tema": "olap",
   "pagina": "olap",
   "texto": "En un modelo OLAP se puede aplicar normalización en cualquier tabla de dimensión.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Se puede, y el resultado es el modelo copo de nieve (snowflake). Se pierde algo de velocidad por los joins extra.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "OL09",
   "tema": "olap",
   "pagina": "olap",
   "texto": "Un modelo OLAP posee al menos una tabla de hechos (fact table) con campos precalculados.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "La tabla de hechos guarda las medidas (cantidades, importes, totales) listas para sumar por dimensión.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "OL10",
   "tema": "olap",
   "pagina": "olap",
   "texto": "Las dimensiones de una base multidimensional indican la forma de acceder a la información que se encuentra en la intersección de dichas dimensiones.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Cada celda del cubo (el hecho) se ubica dando un valor de cada dimensión: producto, fecha, sucursal.",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  },
  {
   "id": "OL11",
   "tema": "olap",
   "pagina": "olap",
   "texto": "Data Mining son las técnicas y algoritmos utilizados para encontrar información y relaciones ocultas en un Data Warehouse.",
   "respuesta": "V",
   "estado": "consenso",
   "justificacion": "Busca patrones que nadie pidió explícitamente (qué productos se compran juntos, qué clientes se van a ir).",
   "finales": [],
   "fuentes": [
    "Resumen GGDD"
   ]
  }
 ]
};
