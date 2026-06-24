# Keno-Shopy — Propuesta Técnica (GitHub Pages)

Repositorio independiente del sitio de análisis. Contiene la propuesta técnica y comercial definitiva dirigida a Amado Rodriguez (Lumo) — alcance único (color y talla como variantes reales en Shopify), con descarga directa del PDF.

## Archivos

- `index.html` — sitio web de la propuesta (estático, sin JavaScript — ya no hay selección de opciones que interactuar)
- `styles.css` — diseño del sitio (incluye `@font-face` para las fuentes locales — no depende de Google Fonts)
- `print.css` — ajustes de paginación usados solo para generar el PDF (no se carga en el sitio web público)
- `SpaceGrotesk.ttf`, `IBMPlexSans.ttf`, `IBMPlexMono-*.ttf` — fuentes embebidas, deben estar en la misma carpeta que `index.html` y `styles.css` (raíz del repo)
- `Keno-Shopy-Propuesta-Tecnica.pdf` — versión descargable, generada a partir del mismo HTML/CSS

## Modelo comercial de esta versión

- **Pago único de $1,600** (64 horas a $25/hora: 12h de análisis + 52h de desarrollo) — sin cuota mensual recurrente.
- **Tarifa de desarrollo:** $25/hora — descuento sobre la tarifa estándar de Kenocia ($30-35/hora) por dos razones: pago fijo único sin recurrencia que administrar, y 2 recursos (Jefree Gómez, Gilberto Salguero) trabajando en paralelo.
- **Soporte y mantenimiento posteriores a la entrega:** $35/hora, facturado solo cuando se solicita — no hay cuota fija.
- **Entrega comprometida:** sábado 27 de junio de 2026.

## Publicar en GitHub Pages

1. Sube todo el contenido de esta carpeta (incluyendo los `.ttf` y el PDF) a un repositorio nuevo, todos en la raíz.
2. **Settings → Pages → Source** → rama `main`, carpeta `/ (root)`.
3. URL pública: `https://<usuario-u-org>.github.io/<repo>/`.

## Regenerar el PDF si cambia el contenido

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
