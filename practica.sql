/* =============================================================================
   GUÍA PARA EL FINAL DE BASES DE DATOS (UTN FRBA) — PRÁCTICA EN T-SQL
   Motor: SQL Server (T-SQL). Probado de memoria contra la sintaxis de SQL Server
   2016 o posterior (usa DROP ... IF EXISTS y THROW).

   Cómo usarlo:
     1. Abrí este archivo en SQL Server Management Studio o Azure Data Studio.
     2. Ejecutá la PARTE 1 completa: crea la base GuiaFinal, las tablas de los
        modelos que se repiten en los finales y datos de prueba.
     3. Después ejecutá cada ejercicio de a uno (seleccionalo y F5).

   Partes:
     1. Modelos de los finales (tablas + datos de prueba)
     2. Plantillas: trigger AFTER, INSTEAD OF DELETE, SP con transacción,
        cursor, CTE recursiva, vista
     3. Soluciones de los prácticos 2023–2025 (y los clásicos que se repiten)

   Los nombres de columnas siguen los enunciados; cuando el enunciado no los
   daba, están elegidos acá y se aclara.
   ============================================================================= */


/* =============================================================================
   PARTE 1 — MODELOS Y DATOS DE PRUEBA
   ============================================================================= */
IF DB_ID('GuiaFinal') IS NULL CREATE DATABASE GuiaFinal;
GO
USE GuiaFinal;
GO

-- Se borran en orden inverso a las FK para poder volver a correr el script
DROP TABLE IF EXISTS Login, Usuario, Ciudad, Provincia, Pais, Persona, Numeros,
                     TablitaFinal, Secuencias, Parametros, Stock, Deposito, Producto,
                     MundialFutbol, Horario, Materia, Dia, Empleado, Juego,
                     Alojamientos, Feriados, Entrenador, Prueba;
GO

/* ---------- País → Provincia → Ciudad (el modelo más repetido) ---------- */
CREATE TABLE Pais (
  idpais  INT         NOT NULL CONSTRAINT pk_pais PRIMARY KEY,
  detalle VARCHAR(50) NOT NULL
);
CREATE TABLE Provincia (
  idpcia     INT         NOT NULL CONSTRAINT pk_provincia PRIMARY KEY,
  idpais     INT         NOT NULL CONSTRAINT fk_provincia_pais REFERENCES Pais (idpais),
  detalle    VARCHAR(50) NOT NULL,
  habitantes INT         NULL
);
CREATE TABLE Ciudad (
  idciudad INT         NOT NULL CONSTRAINT pk_ciudad PRIMARY KEY,
  idpcia   INT         NOT NULL CONSTRAINT fk_ciudad_provincia REFERENCES Provincia (idpcia),
  detalle  VARCHAR(50) NOT NULL
);
INSERT INTO Pais VALUES (54, 'ARGENTINA'), (56, 'CHILE'), (598, 'URUGUAY');
INSERT INTO Provincia VALUES (1, 54, 'BUENOS AIRES', 17000000), (2, 54, 'CORDOBA', 3800000),
                             (3, 598, 'ARTIGAS', NULL);
INSERT INTO Ciudad VALUES (1, 1, 'LA PLATA'), (2, 1, 'MAR DEL PLATA'), (3, 2, 'RIO CUARTO');
-- Chile no tiene provincias; Artigas no tiene ciudades.
GO

/* ---------- Persona con su_padre_es (self-join y recursión) ---------- */
CREATE TABLE Persona (
  id               INT         NOT NULL CONSTRAINT pk_persona PRIMARY KEY,
  fecha_nacimiento DATE        NULL,
  apellido         VARCHAR(50) NOT NULL,
  nombre           VARCHAR(50) NOT NULL,
  su_padre_es      INT         NULL CONSTRAINT fk_persona_padre REFERENCES Persona (id)
);
INSERT INTO Persona VALUES (1, '1930-01-01', 'PEREZ', 'JUAN',   NULL),
                           (2, '1960-01-01', 'PEREZ', 'CARLOS', 1),
                           (3, '1962-01-01', 'PEREZ', 'LUIS',   1),
                           (4, '1990-01-01', 'PEREZ', 'ANA',    2),
                           (5, '1992-01-01', 'PEREZ', 'MARTIN', 2),
                           (6, '1995-01-01', 'GOMEZ', 'SOFIA',  NULL);
GO

/* ---------- Tablas de números ---------- */
CREATE TABLE Numeros (
  clave INT NOT NULL CONSTRAINT pk_numeros PRIMARY KEY,
  valor INT NULL
);
CREATE TABLE TablitaFinal (
  numero INT NULL CONSTRAINT uq_tablitafinal_numero UNIQUE
);
CREATE TABLE Secuencias (
  clave INT NOT NULL            -- sin PK: el enunciado tiene un valor duplicado
);
CREATE TABLE Parametros (
  clave INT         NOT NULL CONSTRAINT pk_parametros PRIMARY KEY,
  valor VARCHAR(20) NULL
);
CREATE TABLE Prueba (
  col1 INT NOT NULL
);
INSERT INTO Numeros VALUES (1, 10), (2, NULL), (3, 30), (5, 50), (6, NULL);
INSERT INTO Secuencias VALUES (1),(2),(3),(4),(5),(6),(7),(8),(9),(10),
                              (11),(12),(13),(14),(14),(15),(16),(17),(18),(19);
INSERT INTO Parametros VALUES (1, '100'), (2, '7');
GO

/* ---------- Producto / Depósito / Stock ----------
   En los enunciados las columnas se llaman stoc_producto, stoc_deposito,
   stoc_cantidad; acá se usan nombres cortos. Stock no tiene PK a propósito:
   así se puede reproducir el ejercicio de los duplicados (2023).            */
CREATE TABLE Producto (
  prod_codigo  CHAR(8)       NOT NULL CONSTRAINT pk_producto PRIMARY KEY,
  prod_detalle VARCHAR(50)   NOT NULL,
  prod_precio  DECIMAL(12,2) NOT NULL
);
CREATE TABLE Deposito (
  depo_codigo  INT         NOT NULL CONSTRAINT pk_deposito PRIMARY KEY,
  depo_detalle VARCHAR(50) NOT NULL
);
CREATE TABLE Stock (
  id_producto CHAR(8) NOT NULL CONSTRAINT fk_stock_producto REFERENCES Producto (prod_codigo),
  id_deposito INT     NOT NULL CONSTRAINT fk_stock_deposito REFERENCES Deposito (depo_codigo),
  cantidad    INT     NOT NULL
);
INSERT INTO Producto VALUES ('00000001', 'YERBA', 1500), ('00000002', 'AZUCAR', 900),
                            ('00000003', 'CAFE', 4000);
INSERT INTO Deposito VALUES (1, 'CENTRAL'), (2, 'NORTE'), (3, 'SUR');
INSERT INTO Stock VALUES ('00000001', 1, 100), ('00000001', 2, 40), ('00000001', 3, 5),
                         ('00000002', 1, 10),  ('00000002', 1, 15),          -- duplicado
                         ('00000003', 2, 0),   ('00000003', 3, 8);
GO

/* ---------- Otros modelos que aparecen ---------- */
CREATE TABLE MundialFutbol (
  IdMundial      INT         NOT NULL CONSTRAINT pk_mundial PRIMARY KEY,
  Anio           INT         NOT NULL,
  PaisCampeon    VARCHAR(50) NOT NULL,
  PaisSubCampeon VARCHAR(50) NOT NULL
);
INSERT INTO MundialFutbol VALUES (1, 1978, 'ARGENTINA', 'HOLANDA'), (2, 1986, 'ARGENTINA', 'ALEMANIA'),
                                 (3, 1998, 'FRANCIA', 'BRASIL'),   (4, 2010, 'ESPAÑA', 'HOLANDA'),
                                 (5, 2022, 'ARGENTINA', 'FRANCIA');

CREATE TABLE Dia (
  dia_id     INT         NOT NULL CONSTRAINT pk_dia PRIMARY KEY,
  dia_nombre VARCHAR(10) NOT NULL
);
CREATE TABLE Materia (
  materia_id INT         NOT NULL CONSTRAINT pk_materia PRIMARY KEY,
  detalle    VARCHAR(50) NOT NULL
);
CREATE TABLE Horario (                       -- columnas elegidas acá
  labo_id    INT NOT NULL,
  dia_id     INT NOT NULL CONSTRAINT fk_horario_dia REFERENCES Dia (dia_id),
  turno      INT NOT NULL,                   -- 0 = mañana, 1 = tarde
  materia_id INT NOT NULL CONSTRAINT fk_horario_materia REFERENCES Materia (materia_id),
  CONSTRAINT pk_horario PRIMARY KEY (labo_id, dia_id, turno)
);
INSERT INTO Dia VALUES (1, 'LUNES'), (2, 'MARTES'), (3, 'MIERCOLES');
INSERT INTO Materia VALUES (10, 'BASES DE DATOS'), (20, 'SISTEMAS OPERATIVOS');
INSERT INTO Horario VALUES (401, 1, 0, 10), (401, 1, 1, 20), (401, 2, 0, 20);

CREATE TABLE Empleado (
  empl_id    INT         NOT NULL CONSTRAINT pk_empleado PRIMARY KEY,
  empl_descr VARCHAR(50) NOT NULL,
  empl_jefe  INT         NULL CONSTRAINT fk_empleado_jefe REFERENCES Empleado (empl_id)
);
INSERT INTO Empleado VALUES (1, 'DIRECTORA', NULL);
INSERT INTO Empleado VALUES (2, 'EMP 2', 1), (3, 'EMP 3', 1), (4, 'EMP 4', 1),
                            (5, 'EMP 5', 1), (6, 'EMP 6', 1), (7, 'EMP 7', 1), (8, 'EMP 8', 2);

CREATE TABLE Juego (
  jugada  INT NOT NULL,
  jugador INT NOT NULL,                      -- 1 o 2
  carta   INT NOT NULL,
  CONSTRAINT pk_juego PRIMARY KEY (jugada, jugador)
);
INSERT INTO Juego VALUES (1, 1, 7), (1, 2, 9), (2, 1, 4), (2, 2, 4), (3, 1, 12), (3, 2, 3);

CREATE TABLE Feriados (
  Fecha DATE NOT NULL CONSTRAINT pk_feriados PRIMARY KEY,
  anio  INT  NOT NULL
);
CREATE TABLE Alojamientos (
  id            INT  NOT NULL CONSTRAINT pk_alojamientos PRIMARY KEY,
  FechaCheckOut DATE NOT NULL
);
INSERT INTO Feriados VALUES ('2012-05-25', 2012), ('2012-07-09', 2012), ('2013-05-25', 2013);
INSERT INTO Alojamientos VALUES (1, '2012-05-25'), (2, '2012-05-25'), (3, '2012-08-01');

CREATE TABLE Entrenador (                    -- columnas elegidas acá (finales 2021)
  entr_id              CHAR(10)    NOT NULL CONSTRAINT pk_entrenador PRIMARY KEY,
  entr_apellido        VARCHAR(50) NOT NULL,
  entr_nombre          VARCHAR(50) NOT NULL,
  entr_horas_semanales INT         NOT NULL,
  entrenado_por_id     CHAR(10)    NULL CONSTRAINT fk_entrenador_jefe REFERENCES Entrenador (entr_id)
);
INSERT INTO Entrenador VALUES ('E1', 'LOPEZ', 'ANA', 10, NULL), ('E2', 'DIAZ', 'LUIS', 6, 'E1'),
                              ('E3', 'SOSA', 'EVA', 4, 'E2'),   ('E4', 'RUIZ', 'JOSE', 3, 'E2');

CREATE TABLE Usuario (                       -- columnas elegidas acá (23/07/2024)
  usua_id         INT         NOT NULL CONSTRAINT pk_usuario PRIMARY KEY,
  usua_nombre     VARCHAR(50) NOT NULL,
  usua_fecha_alta DATE        NOT NULL,
  usua_estado     CHAR(1)     NOT NULL       -- 'A' activo, 'B' bloqueado, 'I' inactivo
);
CREATE TABLE Login (
  logi_id      INT IDENTITY(1,1) NOT NULL CONSTRAINT pk_login PRIMARY KEY,
  logi_usuario INT          NOT NULL CONSTRAINT fk_login_usuario REFERENCES Usuario (usua_id),
  logi_fecha   DATETIME     NOT NULL,
  logi_password VARCHAR(50) NOT NULL,
  logi_exitoso BIT          NOT NULL,
  logi_detalle VARCHAR(50)  NULL
);
INSERT INTO Usuario VALUES (1, 'jperez', '2024-01-10', 'A'), (2, 'mgomez', '2024-02-01', 'I');
GO


/* =============================================================================
   PARTE 2 — PLANTILLAS
   ============================================================================= */

/* ---------- 2.1 Trigger AFTER que valida una regla y deshace (multifila) ----------
   Final 22/12/2022: campeón ≠ subcampeón y al menos 4 años entre mundiales.      */
CREATE OR ALTER TRIGGER tr_mundial_reglas ON MundialFutbol
AFTER INSERT, UPDATE
AS
BEGIN
  SET NOCOUNT ON;

  IF EXISTS (SELECT 1 FROM inserted WHERE PaisCampeon = PaisSubCampeon)
  BEGIN
    ROLLBACK TRANSACTION;
    THROW 50001, 'El campeón y el subcampeón no pueden ser el mismo país.', 1;
  END

  IF EXISTS (SELECT 1
               FROM inserted i
               JOIN MundialFutbol m
                 ON m.IdMundial <> i.IdMundial
                AND ABS(m.Anio - i.Anio) < 4)
  BEGIN
    ROLLBACK TRANSACTION;
    THROW 50002, 'Entre dos mundiales tiene que haber al menos 4 años.', 1;
  END
END;
GO
-- Prueba (tiene que fallar):
-- INSERT INTO MundialFutbol VALUES (6, 2024, 'BRASIL', 'URUGUAY');


/* ---------- 2.2 Trigger INSTEAD OF DELETE (multifila) ----------
   Final 30/07/2024 (respuesta de la cátedra): borrar una provincia con DELETE
   aunque tenga ciudades.                                                       */
CREATE OR ALTER TRIGGER tr_provincia_borrar ON Provincia
INSTEAD OF DELETE
AS
BEGIN
  SET NOCOUNT ON;
  DELETE FROM Ciudad    WHERE idpcia IN (SELECT idpcia FROM deleted);
  DELETE FROM Provincia WHERE idpcia IN (SELECT idpcia FROM deleted);  -- no vuelve a disparar el trigger
END;
GO
-- Prueba (dentro de una transacción para no perder los datos):
-- BEGIN TRAN; DELETE FROM Provincia WHERE idpais = 54; SELECT * FROM Ciudad; ROLLBACK;


/* ---------- 2.3 Stored procedure con transacción y TRY/CATCH ----------
   Finales 28/02/2023 y 01/08/2023: descontar stock sin que quede negativo.
   Clave: validar y descontar en UNA sola sentencia.                            */
CREATE OR ALTER PROCEDURE sp_descontar_stock
  @prod_id CHAR(8), @depo_id INT, @cant INT
AS
BEGIN
  SET NOCOUNT ON;
  BEGIN TRY
    BEGIN TRANSACTION;

    UPDATE Stock
       SET cantidad = cantidad - @cant
     WHERE id_producto = @prod_id
       AND id_deposito = @depo_id
       AND cantidad >= @cant;

    IF @@ROWCOUNT = 0
      THROW 50003, 'No hay stock suficiente en ese depósito.', 1;

    COMMIT TRANSACTION;
  END TRY
  BEGIN CATCH
    IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
    THROW;
  END CATCH
END;
GO
-- Red de seguridad: el motor rechaza cualquier stock negativo
ALTER TABLE Stock ADD CONSTRAINT ck_stock_no_negativo CHECK (cantidad >= 0);
GO
-- Prueba: EXEC sp_descontar_stock '00000001', 1, 30;   (funciona)
--         EXEC sp_descontar_stock '00000001', 3, 30;   (error: no alcanza)


/* ---------- 2.4 Cursor (recorrer filas de a una) ----------
   Ejemplo: listar el stock total de cada producto con PRINT.
   En un trigger se usa igual, con "FROM inserted".                           */
DECLARE @prod CHAR(8), @total INT;
DECLARE c_productos CURSOR LOCAL FAST_FORWARD FOR
  SELECT id_producto, SUM(cantidad) FROM Stock GROUP BY id_producto;
OPEN c_productos;
FETCH NEXT FROM c_productos INTO @prod, @total;
WHILE @@FETCH_STATUS = 0
BEGIN
  PRINT @prod + ': ' + CAST(@total AS VARCHAR(10));
  FETCH NEXT FROM c_productos INTO @prod, @total;
END
CLOSE c_productos;
DEALLOCATE c_productos;
GO


/* ---------- 2.5 CTE recursiva (jerarquías de profundidad desconocida) ----------
   Todos los descendientes de JUAN PEREZ (id 1), con su nivel.                  */
WITH descendientes (id, nombre, nivel) AS (
  SELECT id, nombre, 1                      -- ancla: los hijos directos
    FROM Persona
   WHERE su_padre_es = 1
  UNION ALL
  SELECT p.id, p.nombre, d.nivel + 1        -- paso recursivo: los hijos de los anteriores
    FROM Persona p
    JOIN descendientes d ON p.su_padre_es = d.id
)
SELECT id, nombre, nivel FROM descendientes ORDER BY nivel, id;
GO


/* ---------- 2.6 Vista con WITH CHECK OPTION ----------
   Por esta vista no se puede insertar ni dejar un stock negativo.            */
CREATE OR ALTER VIEW vw_stock_positivo AS
SELECT id_producto, id_deposito, cantidad
  FROM Stock
 WHERE cantidad >= 0
WITH CHECK OPTION;
GO


/* =============================================================================
   PARTE 3 — SOLUCIONES DE LOS PRÁCTICOS
   Ordenadas por fecha. Tipo A = ¿qué devuelve?; B = escribir la consulta;
   C = implementar una regla; D = concurrencia.
   ============================================================================= */

/* ---------- 22/02/2023 3a (A) — script sobre TablitaFinal ----------
   Ejecutalo y mirá: todo funciona salvo el COMMIT (no hay BEGIN TRAN).
   AND se evalúa antes que OR: el WHERE es siempre verdadero.
   Resultado: NULL, 2, 4, 6.                                                   */
DELETE FROM TablitaFinal;
INSERT INTO TablitaFinal VALUES (1);
INSERT INTO TablitaFinal VALUES (3);
INSERT INTO TablitaFinal VALUES (NULL);
UPDATE TablitaFinal SET numero = ISNULL(numero, 5) + 1
 WHERE 1 = 1 OR numero IS NOT NULL AND numero > 0;
INSERT INTO TablitaFinal VALUES (NULL);
-- COMMIT;   -- descomentalo para ver el error 3902: no hay transacción abierta
SELECT numero FROM TablitaFinal ORDER BY numero;
GO

/* ---------- 28/02/2023 3b y 01/08/2023 3b (C) — duplicados en Stock ----------
   1) consolidar los duplicados en una transacción; 2) impedir que vuelva a pasar. */
CREATE OR ALTER PROCEDURE sp_consolidar_stock
AS
BEGIN
  SET NOCOUNT ON;
  BEGIN TRY
    BEGIN TRANSACTION;

    SELECT id_producto, id_deposito, SUM(cantidad) AS cantidad
      INTO #consolidado
      FROM Stock WITH (TABLOCKX)          -- nadie toca Stock mientras se consolida
     GROUP BY id_producto, id_deposito
    HAVING COUNT(*) > 1;

    DELETE s
      FROM Stock s
      JOIN #consolidado c
        ON c.id_producto = s.id_producto
       AND c.id_deposito = s.id_deposito;

    INSERT INTO Stock (id_producto, id_deposito, cantidad)
    SELECT id_producto, id_deposito, cantidad FROM #consolidado;

    COMMIT TRANSACTION;
  END TRY
  BEGIN CATCH
    IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
    THROW;
  END CATCH
END;
GO
EXEC sp_consolidar_stock;
ALTER TABLE Stock ADD CONSTRAINT uq_stock_producto_deposito UNIQUE (id_producto, id_deposito);
GO

/* ---------- 07/03/2023 3a (A) — TOP 5 menores y mayores con un duplicado ----------
   No da error. Devuelve entre 10 y 11 filas: 11 si el duplicado cae justo
   en el borde de un TOP 5 (entran las dos copias por el IN).                  */
SELECT clave
  FROM Secuencias
 WHERE clave IN (SELECT TOP 5 clave FROM Secuencias ORDER BY clave)
    OR clave IN (SELECT TOP 5 clave FROM Secuencias ORDER BY clave DESC)
 ORDER BY 1;
GO

/* ---------- 07/03/2023 3b (B) — borrar los 2 registros duplicados en una sola DML ---------- */
-- BEGIN TRAN;
DELETE FROM Secuencias
 WHERE clave IN (SELECT clave FROM Secuencias GROUP BY clave HAVING COUNT(*) > 1);
-- ROLLBACK;
GO

/* ---------- 25/07/2023 3a (B) — primer hueco de clave (o el siguiente al máximo) ----------
   Con los datos de prueba (1, 2, 3, 5, 6) devuelve 4.                          */
SELECT CASE
         WHEN NOT EXISTS (SELECT 1 FROM Numeros WHERE clave = 1) THEN 1
         ELSE (SELECT MIN(n.clave) + 1
                 FROM Numeros n
                WHERE NOT EXISTS (SELECT 1 FROM Numeros m WHERE m.clave = n.clave + 1))
       END AS primer_libre;
GO

/* ---------- 25/07/2023 3b (B) — insertar usando la consulta anterior ----------
   Puede fallar: dos ejecuciones concurrentes calculan el mismo hueco y la
   segunda viola la PK.                                                         */
INSERT INTO Numeros (clave, valor)
SELECT CASE
         WHEN NOT EXISTS (SELECT 1 FROM Numeros WHERE clave = 1) THEN 1
         ELSE (SELECT MIN(n.clave) + 1
                 FROM Numeros n
                WHERE NOT EXISTS (SELECT 1 FROM Numeros m WHERE m.clave = n.clave + 1))
       END,
       NULL;
GO

/* ---------- 27/09/2023 3b (A) y 05/03/2024 3b (B) — segundo menor y segundo mayor ----------
   Original con producto cartesiano, y la reescritura con una sola tabla en el FROM. */
SELECT MIN(t1.clave) AS valor1, MAX(t2.clave) AS valor2
  FROM Numeros t1, Numeros t2
 WHERE t1.clave > t2.clave;

SELECT MIN(clave) AS valor1,
       (SELECT MAX(clave) FROM Numeros
         WHERE clave < (SELECT MAX(clave) FROM Numeros)) AS valor2
  FROM Numeros
 WHERE clave > (SELECT MIN(clave) FROM Numeros);
GO

/* ---------- 05/12/2023 3b (B) — mayor carta de cada jugador ---------- */
SELECT jugador, MAX(carta) AS mayor_carta
  FROM Juego
 GROUP BY jugador
 ORDER BY MAX(carta) DESC, jugador;     -- empate: primero el jugador 1
GO

/* ---------- 12/12/2023 3a (C) — claves consecutivas desde 1 ----------
   Ya hay un INSTEAD OF INSERT (no se puede crear otro): AFTER.
   Con claves positivas y únicas, 1..n sin huecos  <=>  MAX = COUNT.          */
CREATE OR ALTER TRIGGER tr_numeros_consecutivos ON Numeros
AFTER INSERT
AS
BEGIN
  SET NOCOUNT ON;
  IF (SELECT MAX(clave) FROM Numeros) <> (SELECT COUNT(*) FROM Numeros)
  BEGIN
    ROLLBACK TRANSACTION;
    THROW 50004, 'Las claves tienen que ser consecutivas desde 1.', 1;
  END
END;
GO

/* ---------- 12/12/2023 3b (C) — valores no nulos únicos ----------
   UNIQUE no sirve: en SQL Server admite un solo NULL.                         */
CREATE OR ALTER TRIGGER tr_numeros_valor_unico ON Numeros
AFTER INSERT, UPDATE
AS
BEGIN
  SET NOCOUNT ON;
  IF EXISTS (SELECT valor
               FROM Numeros
              WHERE valor IS NOT NULL
              GROUP BY valor
             HAVING COUNT(*) > 1)
  BEGIN
    ROLLBACK TRANSACTION;
    THROW 50005, 'Los valores no nulos no se pueden repetir.', 1;
  END
END;
GO
-- Fuera del examen, lo mismo con un índice único filtrado:
-- CREATE UNIQUE INDEX ux_numeros_valor ON Numeros (valor) WHERE valor IS NOT NULL;

/* ---------- 20/02/2024 3a y 3b (A) — RIGHT/LEFT JOIN con feriados ----------
   Como máximo N + 1 filas: hasta N fechas que coinciden y un grupo NULL.      */
SELECT COUNT(*), FechaCheckOut
  FROM Alojamientos
 RIGHT JOIN Feriados ON FechaCheckOut = Fecha AND anio = 2012
 GROUP BY FechaCheckOut
 ORDER BY 2;

SELECT COUNT(*), Fecha
  FROM Alojamientos
  LEFT JOIN Feriados ON FechaCheckOut = Fecha AND anio = 2012
 GROUP BY Fecha
 ORDER BY 2;
GO

/* ---------- 27/02/2024 3b (B) — total de provincias y de ciudades por país ---------- */
SELECT pa.idpais, pa.detalle,
       COUNT(DISTINCT pr.idpcia) AS provincias,
       COUNT(c.idciudad)         AS ciudades
  FROM Pais pa
  LEFT JOIN Provincia pr ON pr.idpais = pa.idpais
  LEFT JOIN Ciudad c     ON c.idpcia  = pr.idpcia
 GROUP BY pa.idpais, pa.detalle;
GO

/* ---------- 04/2024, 18/10/2024 3a (B) — personas con su abuelo paterno ---------- */
SELECT h.nombre, h.apellido,
       a.nombre AS abuelo_nombre, a.apellido AS abuelo_apellido
  FROM Persona h
  JOIN Persona p ON h.su_padre_es = p.id
  JOIN Persona a ON p.su_padre_es = a.id;
GO

/* ---------- 04/2024, 18/10/2024 3b (B) — padres y cantidad de hijos ---------- */
SELECT p.id, p.nombre, p.apellido, COUNT(*) AS cantidad_hijos
  FROM Persona p
  JOIN Persona h ON h.su_padre_es = p.id
 GROUP BY p.id, p.nombre, p.apellido;      -- agrupar por id: puede haber homónimos
GO

/* ---------- 23/07/2024 3b (C) — logins fallidos y reactivación ----------
   Columnas elegidas acá (ver Usuario y Login en la parte 1).
   - 3 fallidos el mismo día → usuario 'B' y no se graban más fallidos.
   - password genérica '00x@T3st' con usuario 'B' o 'I' → 'A' y 'Primer ingreso'.
   - Concurrencia: UPDLOCK + HOLDLOCK pone en fila a dos logins del mismo usuario. */
CREATE OR ALTER TRIGGER tr_login_reglas ON Login
INSTEAD OF INSERT
AS
BEGIN
  SET NOCOUNT ON;
  DECLARE @usuario INT, @fecha DATETIME, @password VARCHAR(50), @exitoso BIT,
          @estado CHAR(1), @fallidos INT;

  DECLARE c_login CURSOR LOCAL FAST_FORWARD FOR
    SELECT logi_usuario, logi_fecha, logi_password, logi_exitoso
      FROM inserted
     ORDER BY logi_fecha;
  OPEN c_login;
  FETCH NEXT FROM c_login INTO @usuario, @fecha, @password, @exitoso;
  WHILE @@FETCH_STATUS = 0
  BEGIN
    SELECT @estado = usua_estado
      FROM Usuario WITH (UPDLOCK, HOLDLOCK)
     WHERE usua_id = @usuario;

    IF @password = '00x@T3st' AND @estado IN ('B', 'I')
    BEGIN
      UPDATE Usuario SET usua_estado = 'A' WHERE usua_id = @usuario;
      INSERT INTO Login (logi_usuario, logi_fecha, logi_password, logi_exitoso, logi_detalle)
      VALUES (@usuario, @fecha, @password, 1, 'Primer ingreso');
    END
    ELSE IF @exitoso = 0
    BEGIN
      IF @estado <> 'B'                       -- bloqueado: el fallido se descarta
      BEGIN
        INSERT INTO Login (logi_usuario, logi_fecha, logi_password, logi_exitoso, logi_detalle)
        VALUES (@usuario, @fecha, @password, 0, NULL);

        SELECT @fallidos = COUNT(*)
          FROM Login
         WHERE logi_usuario = @usuario
           AND logi_exitoso = 0
           AND CAST(logi_fecha AS DATE) = CAST(@fecha AS DATE);

        IF @fallidos >= 3
          UPDATE Usuario SET usua_estado = 'B' WHERE usua_id = @usuario;
      END
    END
    ELSE
      INSERT INTO Login (logi_usuario, logi_fecha, logi_password, logi_exitoso, logi_detalle)
      VALUES (@usuario, @fecha, @password, @exitoso, NULL);

    FETCH NEXT FROM c_login INTO @usuario, @fecha, @password, @exitoso;
  END
  CLOSE c_login;
  DEALLOCATE c_login;
END;
GO

/* ---------- 03/12/2024 3a (A) — el LEFT JOIN anulado, corregido ----------
   En el examen los JOIN con Materia eran INNER: anulaban el LEFT JOIN y nunca
   aparecía 'LIBRE'. Así sí devuelve lo pedido.                                */
SELECT d.dia_nombre,
       ISNULL(m1.detalle, 'LIBRE') AS turno_manana,
       ISNULL(m2.detalle, 'LIBRE') AS turno_tarde
  FROM Dia d
  LEFT JOIN Horario h1 ON h1.dia_id = d.dia_id AND h1.labo_id = 401 AND h1.turno = 0
  LEFT JOIN Materia m1 ON m1.materia_id = h1.materia_id
  LEFT JOIN Horario h2 ON h2.dia_id = d.dia_id AND h2.labo_id = 401 AND h2.turno = 1
  LEFT JOIN Materia m2 ON m2.materia_id = h2.materia_id
 ORDER BY d.dia_id;
GO

/* ---------- 03/12/2024 3b (C) — una materia, un solo laboratorio por día ---------- */
CREATE OR ALTER TRIGGER tr_horario_un_labo_por_dia ON Horario
AFTER INSERT, UPDATE
AS
BEGIN
  SET NOCOUNT ON;
  IF EXISTS (SELECT 1
               FROM inserted i
               JOIN Horario h
                 ON h.materia_id = i.materia_id
                AND h.dia_id     = i.dia_id
                AND h.labo_id   <> i.labo_id)
  BEGIN
    ROLLBACK TRANSACTION;
    THROW 50006, 'La materia ya está asignada ese día en otro laboratorio.', 1;
  END
END;
GO

/* ---------- 10/12/2024 3a (A) — persona, padre y abuelo con LEFT JOIN ----------
   Todas las personas (c); NULL donde no hay padre o abuelo.                    */
SELECT a.nombre AS abuelo, b.nombre AS padre, c.nombre AS persona
  FROM Persona c
  LEFT JOIN Persona b ON c.su_padre_es = b.id
  LEFT JOIN Persona a ON b.su_padre_es = a.id;
GO

/* ---------- 10/12/2024 3b (C) — nadie puede ser ancestro de sí mismo ----------
   Desde cada fila de inserted se sube por su_padre_es; si se vuelve a la
   misma persona, hay un ciclo.                                                 */
CREATE OR ALTER TRIGGER tr_persona_sin_ciclos ON Persona
AFTER INSERT, UPDATE
AS
BEGIN
  SET NOCOUNT ON;
  DECLARE @ciclos INT;

  WITH ancestros (origen, id, nivel) AS (
    SELECT i.id, i.su_padre_es, 1
      FROM inserted i
     WHERE i.su_padre_es IS NOT NULL
    UNION ALL
    SELECT a.origen, p.su_padre_es, a.nivel + 1
      FROM ancestros a
      JOIN Persona p ON p.id = a.id
     WHERE p.su_padre_es IS NOT NULL
       AND a.id <> a.origen               -- si ya volvió al origen, no sigue
       AND a.nivel < 1000                 -- tope de seguridad
  )
  SELECT @ciclos = COUNT(*)
    FROM ancestros
   WHERE id = origen
  OPTION (MAXRECURSION 0);

  IF @ciclos > 0
  BEGIN
    ROLLBACK TRANSACTION;
    THROW 50007, 'Una persona no puede ser ancestro de sí misma.', 1;
  END
END;
GO
-- Prueba (tiene que fallar): UPDATE Persona SET su_padre_es = 4 WHERE id = 1;

/* ---------- 2022 y 17/12/2024 3a (B) — 5 primeros y 5 últimos países ---------- */
SELECT idpais, detalle
  FROM Pais
 WHERE idpais IN (SELECT TOP 5 idpais FROM Pais ORDER BY detalle)
    OR idpais IN (SELECT TOP 5 idpais FROM Pais ORDER BY detalle DESC)
 ORDER BY detalle;
GO

/* ---------- 2022 y 17/12/2024 3b (A) — habitantes y provincias por país ----------
   1 fila por país con al menos una provincia; suma de habitantes; cantidad.   */
SELECT pa.idpais, SUM(pro.habitantes) AS habitantes, COUNT(*) AS provincias
  FROM Pais pa
 INNER JOIN Provincia pro ON pa.idpais = pro.idpais
 GROUP BY pa.idpais;
GO

/* ---------- 11/02/2025 3a (A) — producto cartesiano con una tabla vacía ---------- */
SELECT p.prod_codigo, COUNT(*)
  FROM Producto p, Deposito d
 WHERE 1 = 0                               -- simula Deposito vacía: conjunto vacío
 GROUP BY p.prod_codigo
HAVING COUNT(*) > 0;
GO

/* ---------- 11/02/2025 3b (B) — vista de jefes con más de 5 empleados ---------- */
CREATE OR ALTER VIEW vw_jefes_con_mas_de_5 AS
SELECT j.empl_id    AS jefe_codigo,
       j.empl_descr AS jefe_nombre,
       e.empl_id    AS empleado_codigo,
       e.empl_descr AS empleado_nombre,
       (SELECT COUNT(*) FROM Empleado x WHERE x.empl_jefe = j.empl_id) AS cantidad_a_cargo
  FROM Empleado j
  JOIN Empleado e ON e.empl_jefe = j.empl_id
 WHERE (SELECT COUNT(*) FROM Empleado x WHERE x.empl_jefe = j.empl_id) > 5;
GO
SELECT * FROM vw_jefes_con_mas_de_5;
GO

/* ---------- 18/02/2025 3b (A) — el mayor y el segundo mayor ---------- */
SELECT MAX(t1.clave) AS mayor, MAX(t2.clave) AS segundo
  FROM Numeros t1, Numeros t2
 WHERE t1.clave > t2.clave;
GO

/* ---------- 29/07/2025 3a (B) — países sin ciudades cargadas ---------- */
SELECT p.idpais, p.detalle
  FROM Pais p
 WHERE NOT EXISTS (SELECT 1
                     FROM Provincia pr
                     JOIN Ciudad c ON c.idpcia = pr.idpcia
                    WHERE pr.idpais = p.idpais);
GO

/* ---------- Clásicos que se repiten ---------- */

-- 22/12/2022 3a (B): el último país en ganar un mundial por primera vez
SELECT TOP 1 PaisCampeon
  FROM MundialFutbol
 GROUP BY PaisCampeon
 ORDER BY MIN(Anio) DESC;
GO

-- 06/12/2022 3a (B): productos con stock > 0 en más de la mitad de los depósitos
SELECT s.id_producto,
       (SELECT TOP 1 s2.id_deposito
          FROM Stock s2
         WHERE s2.id_producto = s.id_producto
         ORDER BY s2.cantidad DESC)          AS deposito_con_mas_stock,
       SUM(s.cantidad)                        AS stock_total
  FROM Stock s
 GROUP BY s.id_producto
HAVING SUM(CASE WHEN s.cantidad > 0 THEN 1 ELSE 0 END) > (SELECT COUNT(*) FROM Deposito) / 2.0
 ORDER BY CASE WHEN SUM(CASE WHEN s.cantidad > 0 THEN 1 ELSE 0 END) = (SELECT COUNT(*) FROM Deposito)
               THEN 0 ELSE 1 END,
          s.id_producto;
GO

-- 02/08/2021 (C): entrenador, cantidad de dependientes y horas (recursión)
CREATE OR ALTER PROCEDURE sp_resumen_entrenador
  @entr_id CHAR(10), @texto VARCHAR(300) OUTPUT
AS
BEGIN
  SET NOCOUNT ON;
  DECLARE @nivel INT, @horas INT;

  WITH dependientes (entr_id, horas) AS (
    SELECT entr_id, entr_horas_semanales
      FROM Entrenador
     WHERE entrenado_por_id = @entr_id
    UNION ALL
    SELECT e.entr_id, e.entr_horas_semanales
      FROM Entrenador e
      JOIN dependientes d ON e.entrenado_por_id = d.entr_id
  )
  SELECT @nivel = COUNT(*), @horas = ISNULL(SUM(horas), 0) FROM dependientes;

  SELECT @texto = 'El entrenador ' + RTRIM(entr_apellido) + ', ' + RTRIM(entr_nombre)
                + ' tiene un nivel ' + CAST(@nivel AS VARCHAR(10))
                + ' y sus dependientes acumulan ' + CAST(@horas AS VARCHAR(10))
                + ' horas semanales'
    FROM Entrenador
   WHERE entr_id = @entr_id;
END;
GO
DECLARE @t VARCHAR(300);
EXEC sp_resumen_entrenador 'E1', @t OUTPUT;
PRINT @t;   -- El entrenador LOPEZ, ANA tiene un nivel 3 y sus dependientes acumulan 13 horas semanales
GO

/* ---------- Concurrencia (tipo D) ----------
   Necesitan dos sesiones: abrí dos ventanas de consulta y ejecutá cada
   tiempo T1…Tn alternando. Ejemplo: final 06/12/2022 (deadlock).

   -- Ventana A                                   -- Ventana B
   BEGIN TRANSACTION;                             BEGIN TRANSACTION;
   SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;  SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
   SELECT * FROM Producto WHERE prod_codigo = '00000001';
                                                  SELECT * FROM Producto WHERE prod_codigo = '00000001';
   UPDATE Producto SET prod_detalle = 'PROCESO A' WHERE prod_codigo = '00000001';   -- espera
                                                  UPDATE Producto SET prod_detalle = 'PROCESO B' WHERE prod_codigo = '00000001';
                                                  -- error 1205: una de las dos es la víctima del deadlock
   COMMIT;                                        COMMIT;
*/
