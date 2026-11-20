"""Genera guia/analisis-finales.md a partir de guia/datos/finales.json.

Uso (desde la carpeta guia):
    python herramientas/generar_analisis.py

- Los datos (finales, preguntas, respuestas) viven en datos/finales.json.
- El texto fijo (explicaciones, patrones, polémicas) vive en
  herramientas/plantilla-analisis.md, con marcadores {{ASI}} que este
  script reemplaza por tablas y conteos calculados.
- No hace falta correrlo para estudiar: el .md ya está generado.
"""

import json
import re
from collections import Counter, defaultdict
from datetime import date
from pathlib import Path

GUIA = Path(__file__).resolve().parent.parent
DATOS = GUIA / "datos" / "finales.json"
PLANTILLA = GUIA / "herramientas" / "plantilla-analisis.md"
SALIDA = GUIA / "analisis-finales.md"

TEMAS_CORTOS = {
    "transacciones": "Transacciones",
    "hashing": "Hash/índices",
    "integridad": "Objetos BD",
    "olap": "OLAP/DW",
    "grafos": "Grafos",
    "arboles": "Árboles",
    "ordenamiento": "Ordenamiento",
    "relacional": "Relacional/SQL",
}

MODELOS = {
    "numeros": "Tabla de números (Numeros, Parametros, Secuencias, Tablita)",
    "producto-stock": "Producto / Stock / Depósito / Envase / Composición",
    "pais-provincia-ciudad": "País → Provincia → Ciudad",
    "persona": "Persona con su_padre_es",
    "empleado-jefe": "Empleado con jefe (autorreferencia)",
    "usuarios-ingresos": "Usuarios / Ingresos (vista vw_final)",
    "producto-concurrencia": "Producto (procesos A y B en paralelo)",
    "entrenador": "Entrenador / Especialidad",
    "empresa-area-empleado": "Empresa / Área / Empleado",
    "tablas-genericas": "tabla1 / tabla2 / Persons",
    "carreras-caballos": "Carreras / Caballos",
    "t1-t2": "T1 / T2",
    "t1-t2-t3": "T1 / T2 / T3",
    "mundial": "MundialFutbol",
    "juego": "Juego de cartas",
    "alojamientos-feriados": "Alojamientos / Feriados",
    "usuario-login": "Usuario / Perfil / Login",
    "usuario-perfil": "Usuario / Perfil / Log_Asignaciones",
    "laboratorio": "Laboratorio / Horario / Materia",
    "prueba": "prueba (una columna)",
}

MODELOS_CORTOS = {
    "numeros": "Números",
    "producto-stock": "Producto-Stock",
    "pais-provincia-ciudad": "País-Prov-Ciudad",
    "persona": "Persona",
    "empleado-jefe": "Empleado-jefe",
    "usuarios-ingresos": "Usuarios-Ingresos",
    "producto-concurrencia": "Producto A/B",
    "entrenador": "Entrenador",
    "empresa-area-empleado": "Empresa-Área",
    "tablas-genericas": "Tablas genéricas",
    "carreras-caballos": "Caballos",
    "t1-t2": "T1-T2",
    "t1-t2-t3": "T1-T2-T3",
    "mundial": "Mundial",
    "juego": "Juego",
    "alojamientos-feriados": "Feriados",
    "usuario-login": "Login",
    "usuario-perfil": "Perfiles",
    "laboratorio": "Laboratorio",
    "prueba": "prueba",
}

ESTADOS = {
    "oficial": "✅ oficial",
    "consenso": "✔",
    "razonada": "⚠️ polémica",
    "sin_resolver": "⬜ en blanco",
}

# Palabras absolutas típicas de los V/F. "único" solo cuenta como "el único" / "las únicas"
# (así "clave única" no entra).
ABSOLUTOS = re.compile(
    r"\b(siempre|nunca|todo|toda|todos|todas|cualquier|solo|sólo)\b|\b(el|la|los|las) únic[oa]s?\b",
    re.IGNORECASE,
)


def celda(texto):
    """Escapa un texto para que no rompa una tabla Markdown."""
    return str(texto).replace("|", "\\|").replace("\n", " ")


def barra(valor, maximo, ancho=20):
    largo = max(1, round(valor * ancho / maximo)) if valor else 0
    return "█" * largo


def tema_corto(item):
    if item.get("subtema") == "huffman":
        return "Huffman"
    return TEMAS_CORTOS[item["tema"]]


def anio(final):
    return final["id"][:4] if final["id"][:4].isdigit() else "2021"


def tabla_fuentes(finales):
    por_anio = defaultdict(list)
    for f in finales:
        por_anio[anio(f)].append(f)
    filas = ["| Año | Finales | Formato | De dónde salen |", "|---|---|---|---|"]
    for a in sorted(por_anio):
        lista = por_anio[a]
        fechas = ", ".join(f["fecha"] for f in lista)
        formatos = sorted({f["formato"] for f in lista})
        fuentes = sorted({f["fuente"].split(" (")[0].split("/")[0] for f in lista})
        filas.append(
            f"| {a} | {len(lista)}: {celda(fechas)} | {', '.join(formatos)} | {celda(', '.join(fuentes))} |"
        )
    return "\n".join(filas)


def ranking(items, recientes=None, titulo_extra="2023–2024"):
    conteo = Counter(i["tema"] for i in items)
    total = sum(conteo.values())
    maximo = max(conteo.values())
    conteo_rec = Counter(i["tema"] for i in recientes) if recientes is not None else None
    cab = "| # | Tema | 2018–2024 | % |"
    sep = "|---|---|---|---|"
    if conteo_rec is not None:
        cab += f" {titulo_extra} |"
        sep += "---|"
    filas = [cab, sep]
    meta_temas = DATA["meta"]["temas"]
    for pos, (tema, n) in enumerate(conteo.most_common(), start=1):
        fila = f"| {pos} | {meta_temas[tema]} | {barra(n, maximo)} {n} | {round(100 * n / total)}% |"
        if conteo_rec is not None:
            fila += f" {conteo_rec.get(tema, 0)} |"
        filas.append(fila)
    return "\n".join(filas)


def ranking_practica(finales):
    items = [(anio(f), p) for f in finales for p in f["practica"]]
    conteo = Counter(p["tipo"] for _, p in items)
    maximo = max(conteo.values())
    total = sum(conteo.values())
    anios = sorted({a for a, _ in items})
    cab = "| Tipo | Qué es | Total | % | " + " | ".join(anios) + " |"
    sep = "|---|---|---|---|" + "---|" * len(anios)
    filas = [cab, sep]
    for tipo in ["A", "B", "C", "D"]:
        por_anio = Counter(a for a, p in items if p["tipo"] == tipo)
        fila = (
            f"| **{tipo}** | {DATA['meta']['tipos_practica'][tipo]} | {barra(conteo[tipo], maximo)} {conteo[tipo]} "
            f"| {round(100 * conteo[tipo] / total)}% | "
            + " | ".join(str(por_anio.get(a, 0)) for a in anios)
            + " |"
        )
        filas.append(fila)
    return "\n".join(filas)


def tabla_modelos(finales):
    usos = defaultdict(list)
    for f in finales:
        for p in f["practica"]:
            usos[p["modelo"]].append((f["fecha"], p["n"]))
    filas = ["| Modelo | Finales | Ejercicios | Fechas |", "|---|---|---|---|"]
    for modelo, lista in sorted(usos.items(), key=lambda kv: -len(kv[1])):
        fechas = []
        for fecha, _ in lista:
            if fecha not in fechas:
                fechas.append(fecha)
        if len(fechas) < 2:  # solo los modelos que vuelven en finales distintos
            continue
        filas.append(f"| {MODELOS[modelo]} | {len(fechas)} | {len(lista)} | {celda(', '.join(fechas))} |")
    return "\n".join(filas)


def tabla_recicladas(finales):
    grupos = defaultdict(list)
    for f in finales:
        for seccion, nombre in (("vf", "V/F"), ("teoria", "Teoría"), ("practica", "Práctica")):
            for item in f[seccion]:
                if "clave" in item:
                    grupos[(nombre, item["clave"])].append((f["fecha"], item))
    filas = [
        "| Sección | Qué se pregunta (texto de la primera vez; después puede cambiar la redacción) | Veces | Fechas |",
        "|---|---|---|---|",
    ]
    orden = sorted(grupos.items(), key=lambda kv: (-len({x[0] for x in kv[1]}), kv[0][0]))
    for (nombre, _), lista in orden:
        fechas = []
        for fecha, _ in lista:
            if fecha not in fechas:
                fechas.append(fecha)
        if len(fechas) < 2:
            continue
        texto = lista[0][1]["texto"]
        if len(texto) > 120:
            texto = texto[:117].rstrip() + "…"
        filas.append(f"| {nombre} | {celda(texto)} | {len(fechas)} | {celda(', '.join(fechas))} |")
    return "\n".join(filas)


def tabla_resumen(finales):
    filas = [
        "| Fecha | V/F (tema → respuesta) | Teoría (2.a · 2.b) | Práctica (tipo · modelo) |",
        "|---|---|---|---|",
    ]
    for f in finales:
        vf = " · ".join(f"{tema_corto(x)} → **{x['respuesta']}**" for x in f["vf"]) or "—"
        te = " · ".join(TEMAS_CORTOS[x["tema"]] for x in f["teoria"]) or "— (sin desarrollo)"
        pr = " · ".join(f"**{x['tipo']}** {MODELOS_CORTOS[x['modelo']]}" for x in f["practica"])
        filas.append(f"| [{f['fecha']}](#{ancla(f)}) | {vf} | {te} | {pr} |")
    return "\n".join(filas)


def ancla(f):
    return "final-" + f["id"].lower()


def detalle(finales):
    bloques = []
    for f in finales:
        lineas = [
            f'<a id="{ancla(f)}"></a>',
            f"### {f['fecha']} · {f['formato']}",
            "",
            f"Fuente: `{f['fuente']}`" + (f"  \n{f['notas']}" if f.get("notas") else ""),
            "",
            "| # | Pregunta | Tema · tipo | Respuesta |",
            "|---|---|---|---|",
        ]
        for x in f["vf"]:
            resp = f"**{x['respuesta']}** {ESTADOS[x['estado']]}"
            if x.get("nota") and x["estado"] != "consenso":
                resp += f"<br><sub>{celda(x['nota'])}</sub>"
            lineas.append(f"| {x['n']} | {celda(x['texto'])} | V/F · {tema_corto(x)} | {resp} |")
        for x in f["teoria"]:
            extra = f"<br><sub>{celda(x['nota'])}</sub>" if x.get("nota") else ""
            lineas.append(
                f"| {x['n']} | {celda(x['texto'])} | Teoría · {TEMAS_CORTOS[x['tema']]} | desarrollo{extra} |"
            )
        for x in f["practica"]:
            resp = f"{celda(x['respuesta'])} {ESTADOS[x['estado']]}"
            if x.get("nota") and x["estado"] != "consenso":
                resp += f"<br><sub>{celda(x['nota'])}</sub>"
            lineas.append(
                f"| {x['n']} | {celda(x['texto'])} | **{x['tipo']}** · {MODELOS_CORTOS[x['modelo']]} | {resp} |"
            )
        bloques.append("\n".join(lineas))
    return "\n\n".join(bloques)


DATA = json.loads(DATOS.read_text(encoding="utf-8"))

ANIOS_RECIENTES = ("2023", "2024", "2025")


def unidad(item):
    """Unidad del programa (1-4) a la que pertenece una pregunta de teoría o V/F."""
    return int(item.get("unidad") or DATA["meta"]["tema_unidad"][item["tema"]])


def tabla_unidades(teoria, vf, teoria_rec):
    nombres = DATA["meta"]["unidades"]
    t, v, r = Counter(map(unidad, teoria)), Counter(map(unidad, vf)), Counter(map(unidad, teoria_rec))
    filas = [
        "| Unidad del programa | Teoría 2018–2025 | Teoría 2023–2025 | V/F |",
        "|---|---|---|---|",
    ]
    for u in ("1", "2", "3", "4"):
        n = int(u)
        filas.append(f"| **{u}.** {nombres[u]} | {t[n]} | {r[n]} | {v[n]} |")
    return "\n".join(filas)


def main():
    finales = DATA["finales"]
    completos = [f for f in finales if f["id"] != "moodle-sf"]
    vf = [x for f in finales for x in f["vf"]]
    teoria = [x for f in finales for x in f["teoria"]]
    teoria_rec = [x for f in finales if anio(f) in ANIOS_RECIENTES for x in f["teoria"]]
    practica = [x for f in finales for x in f["practica"]]

    absolutos = [x for x in vf if ABSOLUTOS.search(x["texto"])]
    conteo_teoria = Counter(x["tema"] for x in teoria)
    top4 = sum(n for _, n in conteo_teoria.most_common(4))

    vf_huffman = sum(1 for x in vf if x.get("subtema") == "huffman")

    # Conteos sueltos para usar dentro del texto de la plantilla: {{T_transacciones}}, {{VF_arboles}}, {{PR_A}}...
    conteos = {}
    for tema in DATA["meta"]["temas"]:
        conteos[f"T_{tema}"] = str(conteo_teoria.get(tema, 0))
        conteos[f"TR_{tema}"] = str(sum(1 for x in teoria_rec if x["tema"] == tema))
        conteos[f"VF_{tema}"] = str(sum(1 for x in vf if x["tema"] == tema))
    for tipo in "ABCD":
        conteos[f"PR_{tipo}"] = str(sum(1 for x in practica if x["tipo"] == tipo))
    conteos["N_PR_AB_PCT"] = str(round(100 * sum(1 for x in practica if x["tipo"] in "AB") / len(practica)))
    # Cuántos finales distintos repitieron cada pregunta reciclada: {{K_grafos_completo}}, {{K_acid}}...
    por_clave = defaultdict(set)
    for f in finales:
        for seccion in ("vf", "teoria", "practica"):
            for x in f[seccion]:
                if "clave" in x:
                    por_clave[x["clave"]].add(f["id"])
    for clave, ids in por_clave.items():
        conteos["K_" + clave.replace("-", "_")] = str(len(ids))
    conteos["N_FINALES_2025"] = str(sum(1 for f in finales if anio(f) == "2025"))
    conteos["N_SIN_TEXTO_VF"] = str(sum(1 for x in vf if x["respuesta"] == "?"))

    reemplazos = {
        **conteos,
        "GENERADO": date.today().strftime("%d/%m/%Y"),
        "N_FINALES": str(len(completos)),
        "N_VF": str(len(vf)),
        "N_TEORIA": str(len(teoria)),
        "N_TEORIA_FINALES": str(sum(1 for f in finales if f["teoria"])),
        "N_TEORIA_REC": str(len(teoria_rec)),
        "N_PRACTICA": str(len(practica)),
        "N_V": str(sum(1 for x in vf if x["respuesta"] == "V")),
        "N_F": str(sum(1 for x in vf if x["respuesta"] == "F")),
        "N_ABS": str(len(absolutos)),
        "N_ABS_F": str(sum(1 for x in absolutos if x["respuesta"] == "F")),
        "N_HUFFMAN": str(vf_huffman),
        "TOP4_TEORIA": f"{top4} de {len(teoria)} ({round(100 * top4 / len(teoria))}%)",
        "RESUMEN_FUENTES": tabla_fuentes(finales),
        "RANKING_TEORIA": ranking(teoria, teoria_rec, "2023–2025"),
        "TABLA_UNIDADES": tabla_unidades(teoria, vf, teoria_rec),
        "RANKING_VF": ranking(vf),
        "RANKING_PRACTICA": ranking_practica(finales),
        "MODELOS": tabla_modelos(finales),
        "RECICLADAS": tabla_recicladas(finales),
        "TABLA_RESUMEN": tabla_resumen(finales),
        "DETALLE": detalle(finales),
    }

    texto = PLANTILLA.read_text(encoding="utf-8")
    for clave, valor in reemplazos.items():
        texto = texto.replace("{{" + clave + "}}", valor)
    faltantes = re.findall(r"\{\{[A-Za-z_0-9]+\}\}", texto)
    if faltantes:
        raise SystemExit(f"Marcadores sin reemplazar: {faltantes}")
    SALIDA.write_text(texto, encoding="utf-8", newline="\n")
    print(f"OK: {SALIDA.relative_to(GUIA)} ({len(texto.splitlines())} líneas)")


if __name__ == "__main__":
    main()
