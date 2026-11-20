/* ==========================================================================
   Guía para el final de Bases de Datos — comportamiento compartido.
   Funciona abriendo los .html con doble clic (sin servidor).
   Los datos vienen de assets/datos.js (window.GUIA).
   ========================================================================== */
(function () {
  "use strict";

  var cuerpo = document.body;
  var RAIZ = cuerpo.getAttribute("data-raiz") || "";
  var PAGINA = cuerpo.getAttribute("data-pagina") || "";
  var DATOS = window.GUIA || { finales: [], vf: [], temas: {} };

  /* ---------- Almacenamiento local (puede no estar disponible) ---------- */
  var almacen = {
    leer: function (clave, porDefecto) {
      try {
        var v = localStorage.getItem("guiabd:" + clave);
        return v === null ? porDefecto : JSON.parse(v);
      } catch (e) { return porDefecto; }
    },
    guardar: function (clave, valor) {
      try { localStorage.setItem("guiabd:" + clave, JSON.stringify(valor)); } catch (e) { /* sin almacenamiento */ }
    }
  };

  /* ---------- Mapa del sitio (orden de estudio) ---------- */
  var SITIO = [
    { grupo: "Empezar", paginas: [
      { id: "inicio", titulo: "Inicio", ruta: "index.html", listo: true },
      { id: "plan", titulo: "Plan de estudio", ruta: "plan.html", listo: true }
    ] },
    { grupo: "Unidad 1: Estructuras de datos", paginas: [
      { id: "grafos", titulo: "Grafos", ruta: "unidad-1/grafos.html", listo: true },
      { id: "estructuras", titulo: "Pilas, colas, listas y su representación", ruta: "unidad-1/estructuras.html", listo: true }
    ] },
    { grupo: "Unidad 2: Manipulación de datos", paginas: [
      { id: "arboles", titulo: "Árboles binarios y barridos", ruta: "unidad-2/arboles.html", listo: true },
      { id: "arbol-b", titulo: "Árbol B y B+", ruta: "unidad-2/arbol-b.html", listo: true },
      { id: "hashing", titulo: "Hashing e índices", ruta: "unidad-2/hashing.html", listo: true },
      { id: "huffman", titulo: "Huffman", ruta: "unidad-2/huffman.html", listo: true },
      { id: "ordenamiento", titulo: "Ordenamiento", ruta: "unidad-2/ordenamiento.html", listo: true }
    ] },
    { grupo: "Unidad 3: Diseño de datos", paginas: [
      { id: "modelo-relacional", titulo: "Modelo relacional e integridad", ruta: "unidad-3/modelo-relacional.html", listo: true },
      { id: "arquitectura", titulo: "Arquitectura ANSI/SPARC", ruta: "unidad-3/arquitectura.html", listo: true }
    ] },
    { grupo: "Unidad 4: Bases de datos", paginas: [
      { id: "transacciones", titulo: "Transacciones y concurrencia", ruta: "unidad-4/transacciones.html", listo: true },
      { id: "objetos", titulo: "Constraints, triggers, vistas y SP", ruta: "unidad-4/objetos.html", listo: true },
      { id: "sql", titulo: "SQL: joins, NULL y plan de ejecución", ruta: "unidad-4/sql.html", listo: true },
      { id: "olap", titulo: "OLTP, OLAP y Data Warehouse", ruta: "unidad-4/olap.html", listo: true }
    ] },
    { grupo: "Practicar", paginas: [
      { id: "practica-sql", titulo: "Práctica SQL y plantillas", ruta: "practica/sql.html", listo: true },
      { id: "finales", titulo: "Finales resueltos", ruta: "practica/finales.html", listo: true },
      { id: "banco-vf", titulo: "Banco de V/F", ruta: "practica/banco-vf.html", listo: true },
      { id: "simulacros", titulo: "Simulacros", ruta: "practica/simulacros.html", listo: true }
    ] }
  ];
  window.GUIA_SITIO = SITIO;

  function todasLasPaginas() {
    var lista = [];
    SITIO.forEach(function (g) { g.paginas.forEach(function (p) { lista.push(p); }); });
    return lista;
  }

  function el(etiqueta, atributos, hijos) {
    var nodo = document.createElement(etiqueta);
    if (atributos) {
      Object.keys(atributos).forEach(function (k) {
        if (k === "texto") nodo.textContent = atributos[k];
        else if (k === "html") nodo.innerHTML = atributos[k];
        else if (k === "clase") nodo.className = atributos[k];
        else nodo.setAttribute(k, atributos[k]);
      });
    }
    (hijos || []).forEach(function (h) { if (h) nodo.appendChild(h); });
    return nodo;
  }

  /* ---------- Tema claro / oscuro ---------- */
  var ESTADOS_TEMA = ["auto", "claro", "oscuro"];
  var NOMBRE_TEMA = { auto: "Tema: auto", claro: "Tema: claro", oscuro: "Tema: oscuro" };

  function aplicarTema(tema) {
    if (tema === "auto") document.documentElement.removeAttribute("data-tema");
    else document.documentElement.setAttribute("data-tema", tema);
    var boton = document.getElementById("boton-tema");
    if (boton) boton.textContent = NOMBRE_TEMA[tema];
  }

  function iniciarTema() {
    var tema = almacen.leer("tema", "auto");
    aplicarTema(tema);
    var boton = document.getElementById("boton-tema");
    if (!boton) return;
    boton.addEventListener("click", function () {
      var actual = almacen.leer("tema", "auto");
      var siguiente = ESTADOS_TEMA[(ESTADOS_TEMA.indexOf(actual) + 1) % ESTADOS_TEMA.length];
      almacen.guardar("tema", siguiente);
      aplicarTema(siguiente);
    });
  }

  /* ---------- Navegación lateral ---------- */
  function iniciarNav() {
    var nav = document.getElementById("nav");
    if (!nav) return;
    var estudiados = almacen.leer("estudiados", {});
    SITIO.forEach(function (grupo) {
      var lista = el("ul");
      grupo.paginas.forEach(function (p) {
        var item = el("li");
        if (p.listo) {
          var a = el("a", { href: RAIZ + p.ruta }, [el("span", { texto: p.titulo })]);
          if (p.id === PAGINA) a.setAttribute("aria-current", "page");
          if (estudiados[p.id]) a.appendChild(el("span", { clase: "nav__estado", texto: "✓", title: "Estudiado" }));
          item.appendChild(a);
        } else {
          item.appendChild(el("span", { clase: "nav__pendiente" }, [
            el("span", { texto: p.titulo }), el("span", { clase: "nav__pronto", texto: "pronto" })
          ]));
        }
        lista.appendChild(item);
      });
      nav.appendChild(el("div", { clase: "nav__grupo" }, [el("p", { clase: "nav__titulo", texto: grupo.grupo }), lista]));
    });

    var botonMenu = document.getElementById("boton-menu");
    if (botonMenu) {
      botonMenu.addEventListener("click", function () {
        var abierta = cuerpo.classList.toggle("nav-abierta");
        botonMenu.setAttribute("aria-expanded", abierta ? "true" : "false");
      });
    }
  }

  /* ---------- Marcar página como estudiada ---------- */
  function iniciarEstudiado() {
    var boton = document.querySelector(".estudiado");
    if (!boton) return;
    var estudiados = almacen.leer("estudiados", {});
    function pintar() {
      var hecho = !!estudiados[PAGINA];
      boton.setAttribute("aria-pressed", hecho ? "true" : "false");
      boton.textContent = hecho ? "✓ Estudiado" : "Marcar como estudiado";
    }
    pintar();
    boton.addEventListener("click", function () {
      estudiados[PAGINA] = !estudiados[PAGINA];
      almacen.guardar("estudiados", estudiados);
      pintar();
    });
  }

  /* ---------- Anterior / siguiente ---------- */
  function iniciarPie() {
    var pie = document.querySelector(".pie-tema");
    if (!pie) return;
    var lista = todasLasPaginas();
    var i = lista.findIndex(function (p) { return p.id === PAGINA; });
    if (i < 0) return;
    function enlace(p, rotulo) {
      if (!p) return el("span");
      if (!p.listo) return el("span", {}, [el("small", { texto: rotulo }), el("span", { texto: p.titulo + " (pronto)" })]);
      return el("a", { href: RAIZ + p.ruta }, [el("small", { texto: rotulo }), el("span", { texto: p.titulo })]);
    }
    pie.appendChild(enlace(lista[i - 1], "Anterior"));
    pie.appendChild(enlace(lista[i + 1], "Siguiente"));
  }

  /* ---------- Conteos de una página (cuánto sale en los finales) ----------
     data-estadisticas = id de la página (los V/F salen de vf.json por "pagina")
     data-teoria = "tema" o "tema:clave1|clave2", varios separados por ";"
     data-tipos  = tipos de práctica que cuenta (ej. "D")                       */
  function deLaPagina(item, pagina) { return (item.pagina || item.tema) === pagina; }

  function contarPagina(pagina, teoriaFiltro, tipos) {
    var teoria = 0, vf = 0, practica = 0, fechas = {};
    var filtros = (teoriaFiltro === null ? pagina : teoriaFiltro).split(";").filter(Boolean).map(function (t) {
      var partes = t.split(":");
      return { tema: partes[0], claves: partes[1] ? partes[1].split("|") : null };
    });
    function teoriaCuenta(x) {
      return filtros.some(function (fi) { return x.tema === fi.tema && (!fi.claves || fi.claves.indexOf(x.clave) >= 0); });
    }
    DATOS.finales.forEach(function (f) {
      if (f.id === "moodle-sf") return;
      f.teoria.forEach(function (x) { if (teoriaCuenta(x)) { teoria++; fechas[f.fecha] = 1; } });
      f.practica.forEach(function (x) { if (tipos && tipos.indexOf(x.tipo) >= 0) { practica++; fechas[f.fecha] = 1; } });
    });
    DATOS.vf.forEach(function (x) {
      if (!deLaPagina(x, pagina)) return;
      (x.finales || []).forEach(function (d) { if (d.indexOf("Moodle") < 0) { vf++; fechas[d] = 1; } });
    });
    var total = DATOS.finales.filter(function (f) { return f.id !== "moodle-sf"; }).length;
    return { teoria: teoria, vf: vf, practica: practica, finales: Object.keys(fechas).length, total: total };
  }

  function iniciarEstadisticas() {
    document.querySelectorAll("[data-estadisticas]").forEach(function (caja) {
      var pagina = caja.getAttribute("data-estadisticas");
      var tipos = (caja.getAttribute("data-tipos") || "").split("").filter(Boolean);
      var c = contarPagina(pagina, caja.getAttribute("data-teoria"), tipos);
      function dato(numero, texto) {
        return el("div", { clase: "dato" }, [el("b", { texto: String(numero) }), el("span", { texto: texto })]);
      }
      caja.appendChild(dato(c.finales + " de " + c.total, "finales lo tomaron"));
      caja.appendChild(dato(c.teoria, c.teoria === 1 ? "pregunta de teoría" : "preguntas de teoría"));
      caja.appendChild(dato(c.vf, "V/F"));
      if (tipos.length) caja.appendChild(dato(c.practica, caja.getAttribute("data-rotulo-practica") || "prácticos"));
    });
  }

  /* ---------- Trampas: V/F que salieron en finales, con respuesta ---------- */
  function fechaOrdenable(fecha) {
    var m = /(\d{2})\/(\d{2})\/(\d{4})/.exec(fecha);
    if (m) return m[3] + m[2] + m[1];
    var a = /(\d{4})/.exec(fecha);
    return a ? a[1] + "0000" : "0";
  }

  function nodoRespuesta(item) {
    var resp = el("p", { clase: "trampa__resp" }, [
      el("span", { clase: "letra letra--" + item.respuesta, texto: item.respuesta, "aria-label": item.respuesta === "V" ? "Verdadero" : (item.respuesta === "F" ? "Falso" : "Sin respuesta segura") }),
      el("span", { clase: "trampa__por", texto: item.justificacion })
    ]);
    return resp;
  }

  function iniciarTrampas() {
    document.querySelectorAll("[data-trampas]").forEach(function (lista) {
      var pagina = lista.getAttribute("data-trampas");
      var items = DATOS.vf.filter(function (x) { return deLaPagina(x, pagina) && x.finales && x.finales.length; });
      items.sort(function (a, b) {
        return fechaOrdenable(b.finales[b.finales.length - 1]).localeCompare(fechaOrdenable(a.finales[a.finales.length - 1]));
      });
      items.forEach(function (item) {
        var meta = el("p", { clase: "trampa__meta" });
        meta.appendChild(document.createTextNode("Salió: " + item.finales.join(", ") + " "));
        if (item.estado === "oficial") meta.appendChild(el("span", { clase: "sello sello--oficial", texto: "✓ oficial" }));
        if (item.estado === "razonada") meta.appendChild(el("span", { clase: "sello sello--polemica", texto: "⚠️ polémica" }));
        lista.appendChild(nodoTrampa(item, meta));
      });
      if (!items.length) lista.appendChild(el("li", { clase: "trampa", texto: "Todavía no salió como V/F en un final. Los de práctica están en «Ejercitá»." }));
    });
  }

  function nodoTrampa(item, meta) {
    var li = el("li", { clase: "trampa" }, [el("p", { clase: "trampa__texto", texto: "«" + item.texto + "»" }), nodoRespuesta(item), meta]);
    if (item.polemica) li.appendChild(el("p", { clase: "polemica", texto: "⚠️ " + item.polemica }));
    return li;
  }

  /* ---------- Quiz de V/F con la regla del final (+1 / −1 / 0) ---------- */
  function mezclar(lista) {
    var a = lista.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function iniciarQuiz() {
    document.querySelectorAll("[data-quiz]").forEach(function (caja) {
      var pagina = caja.getAttribute("data-quiz");
      armarQuiz(caja, DATOS.vf.filter(function (x) { return pagina === "todos" || deLaPagina(x, pagina); }));
    });
  }

  /* Arma un quiz de V/F dentro de "caja" con los items dados (los "?" se excluyen). */
  function armarQuiz(caja, items) {
    caja.innerHTML = "";
    (function () {
      var base = items.filter(function (x) { return x.respuesta !== "?"; });
      var puntos = 0, respondidas = 0, total = base.length;

      var marcador = el("div", { clase: "quiz__marcador", "aria-live": "polite" });
      var nPuntos = el("span", { clase: "quiz__puntos", texto: "0" });
      var nResp = el("span", { texto: "0 de " + total + " respondidas" });
      var reiniciar = el("button", { clase: "quiz__boton", type: "button", texto: "Reiniciar y mezclar" });
      marcador.appendChild(el("span", {}, [document.createTextNode("Puntaje: "), nPuntos]));
      marcador.appendChild(nResp);
      marcador.appendChild(reiniciar);
      var lista = el("div");
      caja.appendChild(marcador);
      caja.appendChild(lista);

      function actualizar() {
        nPuntos.textContent = (puntos > 0 ? "+" : "") + puntos;
        nResp.textContent = respondidas + " de " + total + " respondidas";
      }

      function dibujar() {
        puntos = 0; respondidas = 0; lista.innerHTML = "";
        mezclar(base).forEach(function (item, i) {
          var resultado = el("p", { clase: "quiz__resultado" });
          var botones = el("div", { clase: "quiz__botones", role: "group", "aria-label": "Respuesta" });
          var nodo = el("div", { clase: "quiz__item" }, [el("p", { texto: (i + 1) + ". " + item.texto }), botones, resultado]);
          [["V", "V"], ["F", "F"], ["B", "En blanco"]].forEach(function (op) {
            var b = el("button", { clase: "quiz__boton", type: "button", texto: op[1], "aria-pressed": "false" });
            b.addEventListener("click", function () {
              botones.querySelectorAll("button").forEach(function (x) { x.disabled = true; });
              b.setAttribute("aria-pressed", "true");
              respondidas++;
              var texto;
              if (op[0] === "B") {
                resultado.className = "quiz__resultado visible quiz__resultado--blanco";
                texto = "En blanco (0). Era " + (item.respuesta === "V" ? "Verdadero" : "Falso") + ". ";
              } else if (op[0] === item.respuesta) {
                puntos++;
                resultado.className = "quiz__resultado visible quiz__resultado--bien";
                texto = "Bien (+1). ";
              } else {
                puntos--;
                resultado.className = "quiz__resultado visible quiz__resultado--mal";
                texto = "Mal (−1). Era " + (item.respuesta === "V" ? "Verdadero" : "Falso") + ". ";
              }
              resultado.textContent = "";
              resultado.appendChild(document.createTextNode(texto));
              resultado.appendChild(el("span", { clase: "trampa__por", texto: item.justificacion }));
              if (item.polemica) resultado.appendChild(el("span", { clase: "polemica", style: "display:block", texto: "⚠️ " + item.polemica }));
              actualizar();
            });
            botones.appendChild(b);
          });
          lista.appendChild(nodo);
        });
        actualizar();
      }

      reiniciar.addEventListener("click", dibujar);
      dibujar();
    })();
  }

  /* ---------- Banco de V/F: filtros por unidad/tema, quiz o lista ---------- */
  function iniciarBanco() {
    var caja = document.getElementById("banco");
    if (!caja) return;
    var selTema = document.getElementById("banco-tema");
    var chkFinal = document.getElementById("banco-finales");
    var chkPolemica = document.getElementById("banco-polemicas");
    var modo = document.getElementById("banco-modo");
    var resumen = document.getElementById("banco-resumen");

    SITIO.forEach(function (g) {
      var hay = g.paginas.filter(function (p) { return DATOS.vf.some(function (x) { return deLaPagina(x, p.id); }); });
      if (!hay.length) return;
      var grupo = el("optgroup", { label: g.grupo });
      hay.forEach(function (p) {
        var n = DATOS.vf.filter(function (x) { return deLaPagina(x, p.id); }).length;
        grupo.appendChild(el("option", { value: p.id, texto: p.titulo + " (" + n + ")" }));
      });
      selTema.appendChild(grupo);
    });

    var guardado = almacen.leer("banco", {});
    if (guardado.tema) selTema.value = guardado.tema;
    chkFinal.checked = !!guardado.finales;
    chkPolemica.checked = !!guardado.polemicas;
    if (guardado.modo) modo.value = guardado.modo;

    function filtrar() {
      almacen.guardar("banco", { tema: selTema.value, finales: chkFinal.checked, polemicas: chkPolemica.checked, modo: modo.value });
      var items = DATOS.vf.filter(function (x) {
        if (selTema.value !== "todos" && !deLaPagina(x, selTema.value)) return false;
        if (chkFinal.checked && !(x.finales && x.finales.length)) return false;
        if (chkPolemica.checked && !x.polemica && x.respuesta !== "?") return false;
        return true;
      });
      var enBlanco = items.filter(function (x) { return x.respuesta === "?"; }).length;
      resumen.textContent = items.length + (items.length === 1 ? " afirmación" : " afirmaciones") +
        (enBlanco ? " (" + enBlanco + " sin respuesta segura: solo aparecen en la lista)" : "") + ".";
      if (modo.value === "lista") {
        caja.innerHTML = "";
        var ul = el("ul", { clase: "trampas" });
        items.forEach(function (item) {
          var meta = el("p", { clase: "trampa__meta" });
          meta.appendChild(document.createTextNode(item.finales && item.finales.length ? "Salió: " + item.finales.join(", ") + " " : "No salió en finales (" + item.fuentes.join(", ") + ") "));
          if (item.estado === "oficial") meta.appendChild(el("span", { clase: "sello sello--oficial", texto: "✓ oficial" }));
          if (item.estado === "razonada") meta.appendChild(el("span", { clase: "sello sello--polemica", texto: "⚠️ polémica" }));
          if (item.estado === "sin_resolver") meta.appendChild(el("span", { clase: "sello sello--polemica", texto: "⬜ en blanco" }));
          ul.appendChild(nodoTrampa(item, meta));
        });
        caja.appendChild(ul);
      } else {
        armarQuiz(caja, items);
      }
    }
    [selTema, chkFinal, chkPolemica, modo].forEach(function (c) { c.addEventListener("change", filtrar); });
    filtrar();
  }

  /* ---------- Simulacros: V/F con +1/−1/0 y autocorrección de teoría y práctica ---------- */
  function iniciarSimulacros() {
    document.querySelectorAll(".simulacro").forEach(function (sim) {
      var total = sim.querySelector(".sim-total");
      var veredicto = sim.querySelector(".sim-veredicto");
      function mostrar(v) { return String(v).replace(".", ",").replace("-", "−"); }
      function calcular() {
        var suma = 0, practicoCompleto = false, faltan = 0;
        sim.querySelectorAll(".sim-vf").forEach(function (v) { suma += parseFloat(v.getAttribute("data-puntos") || "0"); if (!v.hasAttribute("data-puntos")) faltan++; });
        sim.querySelectorAll("select.sim-nota").forEach(function (s) {
          if (s.value === "") { faltan++; return; }
          var n = parseFloat(s.value);
          suma += n;
          if (s.getAttribute("data-practico") === "si" && n === 2) practicoCompleto = true;
        });
        total.textContent = mostrar(suma);
        var falta = Math.round((6 - suma) * 10) / 10;
        if (faltan) veredicto.textContent = (faltan === 1 ? "Falta corregir 1 pregunta" : "Faltan corregir " + faltan + " preguntas") + " del examen.";
        else if (suma >= 6 && practicoCompleto) veredicto.textContent = "Aprobado: llegás a 6 y tenés un práctico completo.";
        else if (suma >= 6) veredicto.textContent = "Desaprobado: sumás 6 o más, pero ningún práctico tiene 2 puntos.";
        else veredicto.textContent = "Desaprobado: te " + (falta === 1 ? "falta 1 punto." : "faltan " + mostrar(falta) + " puntos.");
      }
      sim.querySelectorAll(".sim-vf").forEach(function (v) {
        var correcta = v.getAttribute("data-respuesta");
        var res = v.querySelector(".quiz__resultado");
        v.querySelectorAll(".quiz__boton").forEach(function (b) {
          b.addEventListener("click", function () {
            v.querySelectorAll(".quiz__boton").forEach(function (x) { x.disabled = true; });
            b.setAttribute("aria-pressed", "true");
            var op = b.getAttribute("data-op");
            var puntos = op === "B" ? 0 : (op === correcta ? 1 : -1);
            v.setAttribute("data-puntos", puntos);
            res.className = "quiz__resultado visible quiz__resultado--" + (puntos > 0 ? "bien" : (puntos < 0 ? "mal" : "blanco"));
            res.insertBefore(document.createTextNode(puntos > 0 ? "Bien (+1). " : (puntos < 0 ? "Mal (−1). " : "En blanco (0). ")), res.firstChild);
            calcular();
          });
        });
      });
      sim.querySelectorAll("select.sim-nota").forEach(function (s) { s.addEventListener("change", calcular); });
      var reiniciar = sim.querySelector(".sim-reiniciar");
      if (reiniciar) reiniciar.addEventListener("click", function () {
        sim.querySelectorAll(".sim-vf").forEach(function (v) {
          v.removeAttribute("data-puntos");
          v.querySelectorAll(".quiz__boton").forEach(function (x) { x.disabled = false; x.setAttribute("aria-pressed", "false"); });
          var res = v.querySelector(".quiz__resultado");
          if (res.firstChild && res.firstChild.nodeType === 3) res.removeChild(res.firstChild);
          res.className = "quiz__resultado";
        });
        sim.querySelectorAll("select.sim-nota").forEach(function (s) { s.value = ""; });
        sim.querySelectorAll("details").forEach(function (d) { d.open = false; });
        calcular();
      });
      calcular();
    });
  }

  /* ---------- Ejercicios de opción múltiple escritos en el HTML ---------- */
  function iniciarOpciones() {
    document.querySelectorAll(".ejercicio[data-correcta]").forEach(function (ej) {
      var correcta = ej.getAttribute("data-correcta");
      var explicacion = ej.querySelector(".explicacion");
      ej.querySelectorAll(".opcion").forEach(function (op) {
        op.addEventListener("click", function () {
          ej.querySelectorAll(".opcion").forEach(function (o) {
            o.removeAttribute("data-resultado");
            if (o.getAttribute("data-op") === correcta) o.setAttribute("data-resultado", "bien");
          });
          if (op.getAttribute("data-op") !== correcta) op.setAttribute("data-resultado", "mal");
          if (explicacion) explicacion.classList.add("visible");
        });
      });
    });
  }

  /* ---------- Resaltado de SQL (sin dependencias) ---------- */
  var PALABRAS = ("SELECT FROM WHERE AND OR NOT IN EXISTS JOIN INNER LEFT RIGHT FULL OUTER CROSS ON GROUP BY HAVING ORDER ASC DESC " +
    "INSERT INTO VALUES UPDATE SET DELETE CREATE ALTER DROP TABLE VIEW TRIGGER PROCEDURE PROC FUNCTION RETURNS RETURN AS BEGIN END " +
    "IF ELSE WHILE DECLARE CURSOR FOR OPEN FETCH NEXT CLOSE DEALLOCATE TRANSACTION TRAN COMMIT ROLLBACK SAVE AFTER INSTEAD OF " +
    "PRIMARY KEY FOREIGN REFERENCES UNIQUE CHECK DEFAULT NULL IS LIKE BETWEEN DISTINCT TOP WITH TIES UNION ALL CASE WHEN THEN " +
    "ISOLATION LEVEL READ UNCOMMITTED COMMITTED REPEATABLE SERIALIZABLE TRY CATCH THROW RAISERROR EXEC EXECUTE GO CONSTRAINT " +
    "INT INTEGER VARCHAR CHAR DECIMAL NUMERIC DATE SMALLDATETIME DATETIME BIT OUTPUT NOCOUNT XACT_ABORT RECURSIVE OVER PARTITION").split(" ");
  var FUNCIONES = "COUNT SUM AVG MIN MAX ISNULL COALESCE CAST CONVERT GETDATE YEAR MONTH DAY ABS LEN RTRIM LTRIM ROW_NUMBER ERROR_MESSAGE @@ROWCOUNT @@TRANCOUNT @@FETCH_STATUS".split(" ");

  function escapar(t) {
    return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function resaltar(codigo) {
    var token = /(--[^\n]*)|('(?:[^']|'')*')|(@@?[A-Za-z_]+)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_][A-Za-z_0-9]*)|([\s\S])/g;
    var salida = "", m;
    while ((m = token.exec(codigo)) !== null) {
      if (m[1]) salida += '<span class="sql-com">' + escapar(m[1]) + "</span>";
      else if (m[2]) salida += '<span class="sql-str">' + escapar(m[2]) + "</span>";
      else if (m[3]) salida += FUNCIONES.indexOf(m[3].toUpperCase()) >= 0 ? '<span class="sql-fn">' + m[3] + "</span>" : escapar(m[3]);
      else if (m[4]) salida += '<span class="sql-num">' + m[4] + "</span>";
      else if (m[5]) {
        var mayus = m[5].toUpperCase();
        if (PALABRAS.indexOf(mayus) >= 0) salida += '<span class="sql-kw">' + m[5] + "</span>";
        else if (FUNCIONES.indexOf(mayus) >= 0) salida += '<span class="sql-fn">' + m[5] + "</span>";
        else salida += m[5];
      } else salida += escapar(m[6]);
    }
    return salida;
  }

  function iniciarCodigo() {
    document.querySelectorAll("pre > code.sql").forEach(function (code) {
      var fuente = code.textContent.replace(/^\n/, "");
      code.innerHTML = resaltar(fuente);
      var pre = code.parentNode;
      var caja = pre.parentNode.classList.contains("codigo") ? pre.parentNode : null;
      if (!caja) return;
      var boton = el("button", { clase: "codigo__copiar", type: "button", texto: "Copiar" });
      boton.addEventListener("click", function () {
        function listo() { boton.textContent = "Copiado"; setTimeout(function () { boton.textContent = "Copiar"; }, 1500); }
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(fuente).then(listo, function () { copiarViejo(fuente); listo(); });
        } else { copiarViejo(fuente); listo(); }
      });
      caja.appendChild(boton);
    });
  }

  function copiarViejo(texto) {
    var area = el("textarea", { style: "position:fixed;left:-9999px" });
    area.value = texto;
    document.body.appendChild(area);
    area.select();
    try { document.execCommand("copy"); } catch (e) { /* nada */ }
    document.body.removeChild(area);
  }

  /* ---------- Inicio: gráficos de barras (tabla con barras) ---------- */
  function filasBarras(conteo, etiquetas, extra) {
    var claves = Object.keys(conteo).sort(function (a, b) { return conteo[b] - conteo[a]; });
    var maximo = Math.max.apply(null, claves.map(function (k) { return conteo[k]; }));
    var cuerpoTabla = el("tbody");
    claves.forEach(function (k) {
      var ancho = Math.round((conteo[k] / maximo) * 100);
      var fila = el("tr", { title: etiquetas[k] + ": " + conteo[k] + (extra ? " (" + extra.rotulo + ": " + (extra.conteo[k] || 0) + ")" : "") }, [
        el("th", { scope: "row", texto: etiquetas[k] }),
        el("td", { clase: "barras__pista" }, [el("div", { clase: "barras__barra", style: "width:" + ancho + "%" })]),
        el("td", { clase: "barras__valor", texto: String(conteo[k]) })
      ]);
      if (extra) fila.appendChild(el("td", { clase: "barras__extra", texto: String(extra.conteo[k] || 0) }));
      cuerpoTabla.appendChild(fila);
    });
    return cuerpoTabla;
  }

  function cabeceraBarras(columnas) {
    var fila = el("tr");
    columnas.forEach(function (c, i) {
      fila.appendChild(el("th", { scope: "col", texto: c, style: i === columnas.length - 1 && columnas.length === 4 ? "text-align:right" : "" }));
    });
    return el("thead", {}, [fila]);
  }

  var TEMAS_CORTOS = {
    transacciones: "Transacciones y aislamiento", hashing: "Hashing e índices", integridad: "Objetos de BD (constraints, triggers, vistas)",
    olap: "OLTP, OLAP y Data Warehouse", grafos: "Grafos", arboles: "Árboles y Huffman", ordenamiento: "Ordenamiento",
    relacional: "Modelo relacional, ANSI/SPARC, joins y SQL"
  };
  window.GUIA_TEMAS_CORTOS = TEMAS_CORTOS;

  function anioDe(f) { return /^\d{4}/.test(f.id) ? f.id.slice(0, 4) : "2021"; }

  function iniciarBarras() {
    document.querySelectorAll("[data-barras]").forEach(function (tabla) {
      var cual = tabla.getAttribute("data-barras");
      var conteo = {}, reciente = {};
      if (cual === "teoria" || cual === "vf") {
        DATOS.finales.forEach(function (f) {
          f[cual].forEach(function (x) {
            conteo[x.tema] = (conteo[x.tema] || 0) + 1;
            if (["2023", "2024", "2025"].indexOf(anioDe(f)) >= 0) reciente[x.tema] = (reciente[x.tema] || 0) + 1;
          });
        });
        if (cual === "teoria") {
          tabla.appendChild(cabeceraBarras(["Tema", "", "Total", "2023–2025"]));
          tabla.appendChild(filasBarras(conteo, TEMAS_CORTOS, { rotulo: "2023–2025", conteo: reciente }));
        } else {
          tabla.appendChild(cabeceraBarras(["Tema", "", "Total"]));
          tabla.appendChild(filasBarras(conteo, TEMAS_CORTOS));
        }
      } else if (cual === "practica") {
        var nombres = {};
        DATOS.finales.forEach(function (f) {
          f.practica.forEach(function (x) { conteo[x.tipo] = (conteo[x.tipo] || 0) + 1; });
        });
        Object.keys(DATOS.tipos_practica).forEach(function (t) { nombres[t] = t + ". " + DATOS.tipos_practica[t]; });
        tabla.appendChild(cabeceraBarras(["Tipo", "", "Total"]));
        tabla.appendChild(filasBarras(conteo, nombres));
      }
    });
    document.querySelectorAll("[data-total]").forEach(function (n) {
      var cual = n.getAttribute("data-total");
      if (cual === "finales") n.textContent = DATOS.finales.filter(function (f) { return f.id !== "moodle-sf"; }).length;
      else {
        var t = 0;
        DATOS.finales.forEach(function (f) { t += f[cual].length; });
        n.textContent = t;
      }
    });
  }

  /* ---------- Inicio: temas de cada unidad (salen del mismo mapa que el menú) ---------- */
  function iniciarTemasUnidad() {
    var estudiados = almacen.leer("estudiados", {});
    document.querySelectorAll("[data-temas-grupo]").forEach(function (ul) {
      var grupo = SITIO[parseInt(ul.getAttribute("data-temas-grupo"), 10)];
      if (!grupo) return;
      grupo.paginas.forEach(function (p) {
        var li = el("li");
        if (p.listo) li.appendChild(el("a", { href: RAIZ + p.ruta, texto: (estudiados[p.id] ? "✓ " : "") + p.titulo }));
        else li.appendChild(el("span", { clase: "pendiente", texto: p.titulo + " (pronto)" }));
        ul.appendChild(li);
      });
    });
  }

  /* ---------- Inicio: cuánto pesa cada unidad del programa ---------- */
  function unidadDe(item) {
    return String(item.unidad || (DATOS.tema_unidad || {})[item.tema] || "");
  }

  function iniciarPesoUnidades() {
    document.querySelectorAll("[data-peso-unidad]").forEach(function (p) {
      var u = p.getAttribute("data-peso-unidad");
      var teoria = 0, vf = 0, practica = 0;
      DATOS.finales.forEach(function (f) {
        f.teoria.forEach(function (x) { if (unidadDe(x) === u) teoria++; });
        f.vf.forEach(function (x) { if (unidadDe(x) === u) vf++; });
        if (u === "4") practica += f.practica.length;
      });
      var partes = [teoria + (teoria === 1 ? " pregunta de teoría" : " preguntas de teoría"), vf + " V/F"];
      if (practica) partes.push("los " + practica + " prácticos");
      p.textContent = "En los finales: " + partes.join(", ") + ".";
    });
  }

  /* ---------- Inicio: la grilla de notas del examen ---------- */
  function iniciarGrilla() {
    var grilla = document.getElementById("grilla-nota");
    if (!grilla) return;
    var celdas = Array.prototype.slice.call(grilla.querySelectorAll(".nota-celda"));
    var total = document.getElementById("nota-total");
    var texto = document.getElementById("nota-texto");
    var detalle = document.getElementById("nota-detalle");
    var guardado = almacen.leer("grilla", null);

    function valores(celda) {
      return celda.getAttribute("data-tipo") === "vf" ? [1, 0, -1] : [2, 1.5, 1, 0.5, 0];
    }
    function mostrar(v) { return v === 0 ? "0" : String(v).replace(".", ",").replace("-", "−"); }

    celdas.forEach(function (c, i) {
      var v = guardado && guardado[i] !== undefined ? guardado[i] : parseFloat(c.getAttribute("data-inicial"));
      c.setAttribute("data-valor", v);
      c.textContent = mostrar(v);
      c.addEventListener("click", function () {
        var lista = valores(c);
        var actual = parseFloat(c.getAttribute("data-valor"));
        var siguiente = lista[(lista.indexOf(actual) + 1) % lista.length];
        c.setAttribute("data-valor", siguiente);
        c.textContent = mostrar(siguiente);
        c.setAttribute("aria-label", c.getAttribute("data-nombre") + ": " + mostrar(siguiente) + " puntos");
        calcular();
      });
      c.setAttribute("aria-label", c.getAttribute("data-nombre") + ": " + mostrar(v) + " puntos");
    });

    function calcular() {
      var vals = celdas.map(function (c) { return parseFloat(c.getAttribute("data-valor")); });
      almacen.guardar("grilla", vals);
      var suma = vals.reduce(function (a, b) { return a + b; }, 0);
      var practicoCompleto = vals[4] === 2 || vals[5] === 2;
      total.textContent = mostrar(suma);
      if (suma >= 6 && practicoCompleto) {
        texto.textContent = "Aprobado";
        detalle.textContent = "Llegás a 6 y tenés un práctico completo.";
      } else if (suma >= 6) {
        texto.textContent = "Desaprobado";
        detalle.textContent = "Sumás " + mostrar(suma) + ", pero ningún práctico está completo: hace falta al menos uno con 2 puntos.";
      } else {
        texto.textContent = "Desaprobado";
        var resta = Math.round((6 - suma) * 10) / 10;
        detalle.textContent = (resta === 1 ? "Te falta 1 punto" : "Te faltan " + mostrar(resta) + " puntos") + " para llegar a 6." + (practicoCompleto ? "" : " Y necesitás un práctico completo.");
      }
    }
    calcular();
  }

  /* ---------- Plan de estudio: tareas, progreso y cuenta regresiva ---------- */
  function iniciarPlan() {
    var tareas = document.querySelectorAll(".tarea input[type=checkbox]");
    if (!tareas.length) return;
    var hechas = almacen.leer("plan", {});

    function actualizarProgreso() {
      document.querySelectorAll(".semana").forEach(function (s) {
        var cajas = s.querySelectorAll(".tarea input[type=checkbox]");
        var listas = Array.prototype.filter.call(cajas, function (c) { return c.checked; }).length;
        var barra = s.querySelector(".progreso > div");
        var rotulo = s.querySelector(".semana__avance");
        if (barra) barra.style.width = (cajas.length ? Math.round(100 * listas / cajas.length) : 0) + "%";
        if (rotulo) rotulo.textContent = listas + " de " + cajas.length;
      });
      var todas = document.querySelectorAll(".tarea input[type=checkbox]");
      var hechasN = Array.prototype.filter.call(todas, function (c) { return c.checked; }).length;
      var general = document.getElementById("avance-general");
      if (general) general.textContent = hechasN + " de " + todas.length + " tareas";
    }

    tareas.forEach(function (c) {
      c.checked = !!hechas[c.id];
      c.addEventListener("change", function () {
        hechas[c.id] = c.checked;
        almacen.guardar("plan", hechas);
        actualizarProgreso();
      });
    });
    actualizarProgreso();

    var fecha = document.getElementById("fecha-examen");
    var dias = document.getElementById("dias-restantes");
    var texto = document.getElementById("texto-restantes");
    if (fecha && dias) {
      fecha.value = almacen.leer("fecha-examen", fecha.value);
      function contar() {
        almacen.guardar("fecha-examen", fecha.value);
        var objetivo = new Date(fecha.value + "T00:00:00");
        var hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        var diff = Math.round((objetivo - hoy) / 86400000);
        if (isNaN(diff)) { dias.textContent = "?"; texto.textContent = "Elegí la fecha de tu mesa."; return; }
        dias.textContent = diff > 0 ? String(diff) : "0";
        texto.textContent = diff > 1 ? "días para el final" : (diff === 1 ? "día para el final: mañana" : "Es hoy (o ya pasó). ¡Éxitos!");
      }
      fecha.addEventListener("change", contar);
      contar();
    }
  }

  /* ---------- Arranque ---------- */
  iniciarTema();
  iniciarNav();
  iniciarEstudiado();
  iniciarPie();
  iniciarEstadisticas();
  iniciarTrampas();
  iniciarQuiz();
  iniciarBanco();
  iniciarSimulacros();
  iniciarOpciones();
  iniciarCodigo();
  iniciarBarras();
  iniciarTemasUnidad();
  iniciarPesoUnidades();
  iniciarGrilla();
  iniciarPlan();
})();
