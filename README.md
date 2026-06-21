# Keno-Shopy — Propuesta Técnica (GitHub Pages)

Repositorio independiente del sitio de análisis. Contiene la propuesta técnica y comercial dirigida a Amado Rodriguez (Lumo), con dos opciones de arquitectura interactivas (Opción A / Opción B) y descarga directa del PDF correspondiente.

## Archivos

- `index.html` — sitio web interactivo de la propuesta. Las tarjetas "Opción A" / "Opción B" controlan el resto de la página: Gantt, tabla de inversión y el PDF que se descarga.
- `styles.css` — diseño del sitio web (incluye `@font-face` para las fuentes locales — no depende de Google Fonts)
- `print.css` — ajustes de paginación usados solo para generar los PDFs (no se carga en el sitio web público)
- `script.js` — controla qué opción está seleccionada y actualiza el Gantt, la inversión y el botón de descarga
- `SpaceGrotesk.ttf`, `IBMPlexSans.ttf`, `IBMPlexMono-*.ttf` — fuentes embebidas, deben estar en la misma carpeta que `index.html` y `styles.css` (raíz del repo)
- `Keno-Shopy-Propuesta-Tecnica-OpcionA.pdf` — versión descargable enfocada solo en la Opción A (color dentro del padre)
- `Keno-Shopy-Propuesta-Tecnica-OpcionB.pdf` — versión descargable enfocada solo en la Opción B (color como variante)

## Cómo funciona la interactividad

Al cargar, el sitio muestra la Opción A seleccionada por defecto. Al hacer clic en cualquiera de las dos tarjetas de la sección "Decisión de arquitectura":

- La tarjeta elegida se resalta (borde de color + badge "✓ Seleccionada"); la otra se atenúa.
- El bloque de Cronograma muestra solo el Gantt de la opción elegida.
- El bloque de Inversión muestra solo la tabla de horas/costos de la opción elegida.
- El botón "Descargar PDF" del encabezado cambia su destino y etiqueta para apuntar al PDF de la opción activa.

## Publicar en GitHub Pages

1. Sube **todo el contenido de esta carpeta tal cual está** (incluyendo todos los archivos `.ttf` y ambos PDFs) a un repositorio nuevo, todos en la misma carpeta raíz.
2. En GitHub: **Settings → Pages → Source** → selecciona la rama (`main`) y la carpeta `/ (root)`.
3. La URL pública queda como `https://<usuario-u-org>.github.io/<repo>/`.

## Regenerar los PDFs si cambia el contenido

Si editas `index.html` o `styles.css`, los PDFs no se actualizan solos. Desde un entorno con Python y weasyprint instalado:

```bash
pip install weasyprint

python3 -c "
import re

def make_print_version(option):
    html = open('index.html').read()
    html = re.sub(r'<header class=\"topbar\">.*?</header>', '', html, flags=re.DOTALL)
    html = html.replace('<html lang=\"es\">', f'<html lang=\"es\" data-option=\"{option}\">')
    html = html.replace('<link rel=\"stylesheet\" href=\"styles.css\">', '<link rel=\"stylesheet\" href=\"styles.css\"><link rel=\"stylesheet\" href=\"print.css\">')
    html = re.sub(r'<script src=\"script.js\"></script>', '', html)
    # Los <button> de opción se reemplazan por <div> — weasyprint pierde contenido
    # dentro de <button> al combinarlo con saltos de página forzados.
    html = re.sub(r'<button type=\"button\" class=\"option-card([^\"]*)\" data-option=\"(a|b)\">', r'<div class=\"option-card\1\" data-option=\"\2\">', html)
    return html.replace('</button>', '</div>')

open('print-a.html', 'w').write(make_print_version('a'))
open('print-b.html', 'w').write(make_print_version('b'))
"

python3 -c "
import weasyprint
weasyprint.HTML('print-a.html').write_pdf('Keno-Shopy-Propuesta-Tecnica-OpcionA.pdf')
weasyprint.HTML('print-b.html').write_pdf('Keno-Shopy-Propuesta-Tecnica-OpcionB.pdf')
"
```

`print-a.html` y `print-b.html` son archivos intermedios — no hace falta subirlos a GitHub Pages, solo usarlos localmente para regenerar los PDFs.

**Nota importante:** en la versión imprimible, las tarjetas de opción se reemplazan de `<button>` a `<div>` antes de generar el PDF. Esto es necesario porque weasyprint pierde contenido dentro de elementos `<button>` cuando se combinan con reglas de salto de página — si se omite este paso, la tarjeta de la opción seleccionada aparece vacía en el PDF.
