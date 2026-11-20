"""Copia los datos de guia/datos/*.json a guia/assets/datos.js para que las páginas los usen.

Uso (desde la carpeta guia):
    python herramientas/generar_datos_js.py

¿Por qué? Una página abierta con doble clic (file://) no puede leer archivos .json,
pero sí puede cargar un .js. Este script deja los mismos datos dentro de
window.GUIA = {...}. Corrélo cada vez que cambies algo en datos/.
"""

import json
from pathlib import Path

GUIA = Path(__file__).resolve().parent.parent
FINALES = GUIA / "datos" / "finales.json"
VF = GUIA / "datos" / "vf.json"
SALIDA = GUIA / "assets" / "datos.js"


def main():
    finales = json.loads(FINALES.read_text(encoding="utf-8"))
    vf = json.loads(VF.read_text(encoding="utf-8"))
    datos = {
        "temas": finales["meta"]["temas"],
        "tipos_practica": finales["meta"]["tipos_practica"],
        "unidades": finales["meta"]["unidades"],
        "tema_unidad": finales["meta"]["tema_unidad"],
        "finales": finales["finales"],
        "vf": vf["items"],
    }
    texto = (
        "// Archivo generado por herramientas/generar_datos_js.py a partir de datos/*.json.\n"
        "// No lo edites a mano: cambiá los .json y volvé a correr el script.\n"
        "window.GUIA = " + json.dumps(datos, ensure_ascii=False, indent=1) + ";\n"
    )
    SALIDA.parent.mkdir(parents=True, exist_ok=True)
    SALIDA.write_text(texto, encoding="utf-8", newline="\n")
    print(f"OK: {SALIDA.relative_to(GUIA)} ({len(datos['finales'])} finales, {len(datos['vf'])} V/F)")


if __name__ == "__main__":
    main()
