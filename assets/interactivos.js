/* ==========================================================================
   Laboratorios interactivos: se activan con <div class="lab" data-lab="...">.
     data-lab="abb"      → armar un árbol binario de búsqueda y ver barridos
     data-lab="huffman"  → construir el árbol y los códigos de un texto
     data-lab="hash"     → cargar claves en una tabla de hash (k mod M)
   No usa librerías. Los dibujos usan las clases dg-* de estilos.css.
   ========================================================================== */
(function () {
  "use strict";

  var SVGNS = "http://www.w3.org/2000/svg";

  function svgEl(etiqueta, atributos, texto) {
    var n = document.createElementNS(SVGNS, etiqueta);
    Object.keys(atributos || {}).forEach(function (k) { n.setAttribute(k, atributos[k]); });
    if (texto !== undefined) n.textContent = texto;
    return n;
  }
  function el(etiqueta, clase, texto) {
    var n = document.createElement(etiqueta);
    if (clase) n.className = clase;
    if (texto !== undefined) n.textContent = texto;
    return n;
  }

  /* ---------- Dibujo de un árbol binario {etiqueta, izq, der, arcoIzq, arcoDer} ---------- */
  function dibujarArbol(raiz, titulo) {
    var nodos = [], x = 0, profMax = 0;
    (function recorrer(n, prof) {
      if (!n) return;
      recorrer(n.izq, prof + 1);
      n._x = x++; n._y = prof; profMax = Math.max(profMax, prof);
      nodos.push(n);
      recorrer(n.der, prof + 1);
    })(raiz, 0);
    var paso = 46, alto = 64, margen = 30;
    var ancho = Math.max(1, nodos.length) * paso + margen * 2;
    var altoTotal = (profMax + 1) * alto + margen;
    var svg = svgEl("svg", { viewBox: "0 0 " + ancho + " " + altoTotal, role: "img", "aria-label": titulo });
    svg.style.maxWidth = Math.round(ancho * 1.25) + "px";
    svg.style.display = "block";
    svg.style.margin = "0 auto";
    svg.appendChild(svgEl("title", {}, titulo));
    function pos(n) { return { x: margen + n._x * paso + paso / 2, y: margen + n._y * alto }; }
    nodos.forEach(function (n) {
      [["izq", "arcoIzq"], ["der", "arcoDer"]].forEach(function (h) {
        var hijo = n[h[0]];
        if (!hijo) return;
        var a = pos(n), b = pos(hijo);
        svg.appendChild(svgEl("line", { "class": "dg-linea", x1: a.x, y1: a.y, x2: b.x, y2: b.y }));
        if (n[h[1]] !== undefined) {
          svg.appendChild(svgEl("text", { "class": "dg-texto dg-texto--chico", x: (a.x + b.x) / 2 + (h[0] === "izq" ? -10 : 10), y: (a.y + b.y) / 2, "text-anchor": "middle" }, n[h[1]]));
        }
      });
    });
    nodos.forEach(function (n) {
      var p = pos(n);
      var r = n.hoja === false ? 15 : 17;
      svg.appendChild(svgEl("circle", { "class": n.marca ? "dg-caja dg-caja--bien" : "dg-caja", cx: p.x, cy: p.y, r: r }));
      svg.appendChild(svgEl("text", { "class": "dg-texto dg-texto--chico", x: p.x, y: p.y + 4, "text-anchor": "middle" }, n.etiqueta));
    });
    var caja = el("div", "figura");
    caja.appendChild(svg);
    return caja;
  }

  /* ---------- Propiedades con las definiciones del libro de la cátedra ---------- */
  function contar(n) { return n ? 1 + contar(n.izq) + contar(n.der) : 0; }
  function altura(n) { return n ? 1 + Math.max(altura(n.izq), altura(n.der)) : 0; }
  function esCompleto(n) { // cada nodo con 0 o 2 hijos
    if (!n) return true;
    if (!n.izq !== !n.der) return false;
    return esCompleto(n.izq) && esCompleto(n.der);
  }
  function profundidadesHojas(n, p, lista) {
    if (!n) return lista;
    if (!n.izq && !n.der) lista.push(p);
    profundidadesHojas(n.izq, p + 1, lista); profundidadesHojas(n.der, p + 1, lista);
    return lista;
  }
  function esBalanceado(n) { // cantidad de nodos de los subárboles difiere ≤ 1 en cada nodo
    if (!n) return true;
    return Math.abs(contar(n.izq) - contar(n.der)) <= 1 && esBalanceado(n.izq) && esBalanceado(n.der);
  }
  function esAVL(n) { // alturas difieren ≤ 1 en cada nodo
    if (!n) return true;
    return Math.abs(altura(n.izq) - altura(n.der)) <= 1 && esAVL(n.izq) && esAVL(n.der);
  }

  /* ---------- Laboratorio ABB ---------- */
  function labABB(caja) {
    var entrada = caja.querySelector("input");
    var boton = caja.querySelector("button");
    var salida = caja.querySelector(".lab__salida");

    function armar() {
      salida.innerHTML = "";
      var claves = entrada.value.split(/[\s,;]+/).filter(Boolean).map(Number);
      if (!claves.length || claves.some(isNaN)) {
        salida.appendChild(el("p", "lab__error", "Escribí números separados por comas o espacios."));
        return;
      }
      if (claves.length > 31) { salida.appendChild(el("p", "lab__error", "Usá hasta 31 claves para que el dibujo entre.")); return; }
      var raiz = null, repetidas = [];
      claves.forEach(function (k) {
        if (!raiz) { raiz = { etiqueta: String(k), clave: k }; return; }
        var n = raiz;
        while (true) {
          if (k === n.clave) { repetidas.push(k); return; }
          var lado = k < n.clave ? "izq" : "der";
          if (!n[lado]) { n[lado] = { etiqueta: String(k), clave: k }; return; }
          n = n[lado];
        }
      });
      var pre = [], sim = [], post = [], niveles = [];
      (function r(n) { if (!n) return; pre.push(n.clave); r(n.izq); r(n.der); })(raiz);
      (function r(n) { if (!n) return; r(n.izq); sim.push(n.clave); r(n.der); })(raiz);
      (function r(n) { if (!n) return; r(n.izq); r(n.der); post.push(n.clave); })(raiz);
      var cola = [raiz];
      while (cola.length) { var n = cola.shift(); niveles.push(n.clave); if (n.izq) cola.push(n.izq); if (n.der) cola.push(n.der); }

      salida.appendChild(dibujarArbol(raiz, "Árbol binario de búsqueda con las claves " + claves.join(", ")));
      if (repetidas.length) salida.appendChild(el("p", "lab__error", "Repetidas (un ABB no las guarda dos veces): " + repetidas.join(", ")));
      [["Preorden (raíz, izq, der)", pre], ["Simétrico (izq, raíz, der)", sim], ["Postorden (izq, der, raíz)", post], ["Por niveles", niveles]].forEach(function (b) {
        var p = el("p"); p.appendChild(el("strong", "", b[0] + ": ")); p.appendChild(document.createTextNode(b[1].join(", "))); salida.appendChild(p);
      });
      var hojas = profundidadesHojas(raiz, 1, []);
      var completo = esCompleto(raiz);
      var lleno = completo && hojas.every(function (h) { return h === hojas[0]; });
      var fila = el("div", "lab__fila");
      [["Nodos: " + contar(raiz), null], ["Niveles: " + altura(raiz), null],
       ["Completo (0 o 2 hijos)", completo], ["Lleno", lleno], ["Balanceado (cant. de nodos)", esBalanceado(raiz)], ["AVL (alturas)", esAVL(raiz)]
      ].forEach(function (d) {
        fila.appendChild(el("span", "ficha" + (d[1] === null ? "" : (d[1] ? " ficha--bien" : " ficha--mal")), d[1] === null ? d[0] : (d[1] ? "✓ " : "✗ ") + d[0]));
      });
      salida.appendChild(fila);
      salida.appendChild(el("p", "", "Buscar una clave que no está cuesta, como máximo, " + altura(raiz) + " lecturas (una por nivel)."));
    }
    boton.addEventListener("click", armar);
    entrada.addEventListener("keydown", function (e) { if (e.key === "Enter") armar(); });
    armar();
  }

  /* ---------- Laboratorio Huffman ---------- */
  function construirHuffman(texto) {
    var frec = {};
    Array.from(texto).forEach(function (c) { frec[c] = (frec[c] || 0) + 1; });
    var orden = 0;
    var cola = Object.keys(frec).map(function (c) { return { simbolo: c, peso: frec[c], orden: orden++ }; });
    // desempate fijo: menor peso, y a igual peso el creado antes
    function ordenar() { cola.sort(function (a, b) { return a.peso - b.peso || a.orden - b.orden; }); }
    if (cola.length === 1) {
      var unico = cola[0];
      return { raiz: { peso: unico.peso, izq: unico, orden: orden }, frec: frec };
    }
    while (cola.length > 1) {
      ordenar();
      var a = cola.shift(), b = cola.shift();
      cola.push({ peso: a.peso + b.peso, izq: a, der: b, orden: orden++ });
    }
    return { raiz: cola[0], frec: frec };
  }

  function nombreSimbolo(c) { return c === " " ? "␣" : (c === "\n" ? "↵" : c); }

  function labHuffman(caja) {
    var entrada = caja.querySelector("input");
    var boton = caja.querySelector("button");
    var salida = caja.querySelector(".lab__salida");

    function armar() {
      salida.innerHTML = "";
      var texto = entrada.value;
      if (!texto) { salida.appendChild(el("p", "lab__error", "Escribí una palabra o una frase.")); return; }
      var r = construirHuffman(texto);
      var simbolos = Object.keys(r.frec);
      if (simbolos.length > 16) { salida.appendChild(el("p", "lab__error", "Probá con hasta 16 caracteres distintos para que el dibujo entre.")); return; }
      var codigos = {};
      (function marcar(n, cod) {
        if (n.simbolo !== undefined) { codigos[n.simbolo] = cod || "0"; return; }
        if (n.izq) marcar(n.izq, cod + "0");
        if (n.der) marcar(n.der, cod + "1");
      })(r.raiz, "");
      function aDibujo(n) {
        if (!n) return null;
        var d = { etiqueta: n.simbolo !== undefined ? nombreSimbolo(n.simbolo) + ":" + n.peso : String(n.peso), hoja: n.simbolo !== undefined, marca: n.simbolo !== undefined };
        d.izq = aDibujo(n.izq); d.der = aDibujo(n.der);
        if (d.izq) d.arcoIzq = "0";
        if (d.der) d.arcoDer = "1";
        return d;
      }
      salida.appendChild(dibujarArbol(aDibujo(r.raiz), "Árbol de Huffman de «" + texto + "»"));

      var envoltura = el("div", "tabla-envoltura");
      var tabla = el("table");
      tabla.innerHTML = "<thead><tr><th scope=\"col\">Carácter</th><th scope=\"col\">Veces</th><th scope=\"col\">Código</th><th scope=\"col\">Bits</th></tr></thead>";
      var cuerpo = el("tbody");
      simbolos.sort(function (a, b) { return r.frec[b] - r.frec[a] || (a < b ? -1 : 1); }).forEach(function (s) {
        var tr = el("tr");
        tr.appendChild(el("th", "", nombreSimbolo(s)));
        tr.appendChild(el("td", "", String(r.frec[s])));
        var td = el("td"); td.appendChild(el("code", "", codigos[s])); tr.appendChild(td);
        tr.appendChild(el("td", "", String(r.frec[s] * codigos[s].length)));
        cuerpo.appendChild(tr);
      });
      tabla.appendChild(cuerpo);
      envoltura.appendChild(tabla);
      salida.appendChild(envoltura);

      var bits = simbolos.reduce(function (t, s) { return t + r.frec[s] * codigos[s].length; }, 0);
      var original = Array.from(texto).length * 8;
      var masLargo = Math.max.apply(null, simbolos.map(function (s) { return codigos[s].length; }));
      var hojas = simbolos.length;
      var fila = el("div", "lab__fila");
      ["Original: " + original + " bits (8 por carácter)", "Con Huffman: " + bits + " bits", "Ahorro: " + Math.round(100 * (1 - bits / original)) + " %",
       "Hojas: " + hojas, "Nodos: " + (hojas > 1 ? 2 * hojas - 1 : 2) + (hojas > 1 ? " = 2·" + hojas + " − 1" : ""),
       "Código más largo: " + masLargo + " bits → " + (masLargo + 1) + " niveles"].forEach(function (t) { fila.appendChild(el("span", "ficha", t)); });
      salida.appendChild(fila);
      var cifrado = Array.from(texto).map(function (c) { return codigos[c]; }).join(" ");
      var p = el("p"); p.appendChild(el("strong", "", "Texto codificado: ")); p.appendChild(el("code", "", cifrado)); salida.appendChild(p);
      if (hojas === 1) salida.appendChild(el("p", "", "Con un solo carácter distinto no hay nada que comprimir: se le asigna un bit."));
      salida.appendChild(el("p", "", "Con otra forma de desempatar los pesos iguales el árbol puede cambiar, pero el total de bits es el mismo."));
    }
    boton.addEventListener("click", armar);
    entrada.addEventListener("keydown", function (e) { if (e.key === "Enter") armar(); });
    armar();
  }

  /* ---------- Laboratorio hashing ---------- */
  function labHash(caja) {
    var entradaClaves = caja.querySelector("input[name=claves]");
    var entradaM = caja.querySelector("input[name=m]");
    var metodo = caja.querySelector("select");
    var boton = caja.querySelector("button");
    var salida = caja.querySelector(".lab__salida");

    function armar() {
      salida.innerHTML = "";
      var M = parseInt(entradaM.value, 10);
      var claves = entradaClaves.value.split(/[\s,;]+/).filter(Boolean).map(Number);
      if (!(M >= 2 && M <= 23) || !claves.length || claves.some(function (k) { return isNaN(k) || k < 0 || k % 1; })) {
        salida.appendChild(el("p", "lab__error", "Usá un tamaño M entre 2 y 23 y claves enteras positivas."));
        return;
      }
      var tabla = [], lecturas = [], colisiones = 0, sinLugar = [];
      for (var i = 0; i < M; i++) tabla.push([]);
      claves.forEach(function (k) {
        var h = k % M;
        if (metodo.value === "encadenamiento") {
          if (tabla[h].length) colisiones++;
          tabla[h].push(k);
          lecturas.push(k + " → posición " + h + (tabla[h].length > 1 ? " (choca: va a la lista, lugar " + tabla[h].length + ")" : ""));
        } else {
          var intentos = 0, pos = h;
          while (tabla[pos].length && intentos < M) { pos = (pos + 1) % M; intentos++; }
          if (intentos) colisiones++;
          if (intentos === M) { sinLugar.push(k); lecturas.push(k + " → posición " + h + ": la tabla está llena"); return; }
          tabla[pos].push(k);
          lecturas.push(k + " → posición " + h + (intentos ? " ocupada; prueba " + intentos + " lugar" + (intentos > 1 ? "es" : "") + " más: queda en " + pos : ""));
        }
      });
      var envoltura = el("div", "tabla-envoltura");
      var t = el("table", "tabla-hash");
      var cab = el("tr"); cab.appendChild(el("th", "", "Posición"));
      var fil = el("tr"); fil.appendChild(el("th", "", "Contenido"));
      tabla.forEach(function (lugar, i) {
        cab.appendChild(el("th", "", String(i)));
        var td = el("td", lugar.length ? (lugar.length > 1 ? "choque" : "") : "vacia", lugar.length ? lugar.join(" → ") : "·");
        fil.appendChild(td);
      });
      var thead = el("thead"); thead.appendChild(cab); t.appendChild(thead);
      var tbody = el("tbody"); tbody.appendChild(fil); t.appendChild(tbody);
      envoltura.appendChild(t);
      salida.appendChild(envoltura);
      var lista = el("ol");
      lecturas.forEach(function (l) { lista.appendChild(el("li", "", l)); });
      salida.appendChild(lista);
      var ocupadas = tabla.filter(function (l) { return l.length; }).length;
      var fila = el("div", "lab__fila");
      ["h(k) = k mod " + M, "Colisiones: " + colisiones, "Densidad n/M: " + (claves.length - sinLugar.length) + "/" + M + " = " + ((claves.length - sinLugar.length) / M).toFixed(2), "Posiciones usadas: " + ocupadas + " de " + M].forEach(function (x) { fila.appendChild(el("span", "ficha", x)); });
      salida.appendChild(fila);
    }
    [entradaClaves, entradaM].forEach(function (c) { c.addEventListener("keydown", function (e) { if (e.key === "Enter") armar(); }); });
    metodo.addEventListener("change", armar);
    boton.addEventListener("click", armar);
    armar();
  }

  document.querySelectorAll(".lab[data-lab]").forEach(function (caja) {
    var tipo = caja.getAttribute("data-lab");
    if (tipo === "abb") labABB(caja);
    else if (tipo === "huffman") labHuffman(caja);
    else if (tipo === "hash") labHash(caja);
  });

  window.GUIA_LAB = { construirHuffman: construirHuffman, esCompleto: esCompleto, esBalanceado: esBalanceado };
})();
