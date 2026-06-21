# Keno-Shopy — Propuesta Técnica (GitHub Pages)

Repositorio independiente del sitio de análisis. Contiene la propuesta técnica y comercial dirigida a Amado Rodriguez (Lumo), con descarga directa del PDF formal.

## Archivos

- `index.html` — sitio web interactivo de la propuesta
- `styles.css` — diseño (incluye `@font-face` para las fuentes locales — no depende de Google Fonts)
- `fonts/` — Space Grotesk, IBM Plex Sans, IBM Plex Mono (embebidas localmente)
- `Keno-Shopy-Propuesta-Tecnica.pdf` — versión descargable, generada a partir del mismo HTML/CSS
- `print.css` — ajustes de paginación usados solo para generar el PDF (no se carga en el sitio web público)

## Publicar en GitHub Pages

1. Sube **todo el contenido de esta carpeta tal cual está** (incluyendo la carpeta `fonts/` completa y el PDF) a un repositorio nuevo.
2. En GitHub: **Settings → Pages → Source** → selecciona la rama y carpeta raíz.
3. La URL pública queda como `https://<usuario-u-org>.github.io/<repo>/`.

El botón "Descargar PDF" del sitio apunta a `Keno-Shopy-Propuesta-Tecnica.pdf` en la misma carpeta — si cambias la estructura de carpetas, ajusta esa ruta en `index.html`.

## Regenerar el PDF si cambia el contenido

Si editas `index.html` o `styles.css`, el PDF no se actualiza solo — hay que regenerarlo. Desde un entorno con Python y weasyprint instalado:

```bash
pip install weasyprint

python3 -c "
import re
html = open('index.html').read()
html = re.sub(r'<header class=\"topbar\">.*?</header>', '', html, flags=re.DOTALL)
html = html.replace('<link rel=\"stylesheet\" href=\"styles.css\">', '<link rel=\"stylesheet\" href=\"styles.css\"><link rel=\"stylesheet\" href=\"print.css\">')
open('print.html', 'w').write(html)
"

python3 -c "
import weasyprint
weasyprint.HTML('print.html').write_pdf('Keno-Shopy-Propuesta-Tecnica.pdf')
"
```

`print.html` es un archivo intermedio — no hace falta subirlo a GitHub Pages, solo usarlo localmente para regenerar el PDF.
