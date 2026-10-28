# Patrón visual de Petrotekno

Los valores compartidos están en `src/index.css`. Las vistas públicas deben usar estos valores y los componentes siguientes para evitar variantes accidentales por sección.

## Acciones

`Button` acepta `to` para rutas, `href` para descargas/enlaces y `type="submit"` para formularios.

- `primary`: amarillo con texto azul marino para la acción principal.
- `secondary`: borde y texto azul marino sobre superficies claras. Usado en ambos botones «Ver todos» y en la consulta sobre ahulados.
- `inverse`: borde y texto blanco sobre fotografías o azul marino.
- La altura regular mínima es 56 px; `compact` usa 44 px en la navegación.
- Todos comparten tipografía, centrado vertical, foco, estados deshabilitados y transición. `arrow` añade la misma flecha a la derecha.
- Los botones de catálogo se colocan en `.section-actions`: centrados, con la misma separación y un ancho mínimo de 280 px que se adapta a pantallas menores.

## Encabezados

`SectionHeading` mantiene la tipografía, interlineado, color y separación entre etiqueta, título y descripción.

- `size="page"` y `as="h1"`: encabezados de catálogos y contacto.
- Tamaño predeterminado: encabezados de sección en el inicio y proceso.
- `size="content"`: encabezados de contenido en detalles y contacto.
- `align="start"`: contenido alineado a la izquierda; predeterminado centrado.
- `inverse`: texto blanco y acento amarillo sobre azul marino.
- `section-heading__accent`: dorado para destacar una parte del título en superficies claras. Las etiquetas superiores comparten ese mismo dorado.
- Las portadas con foto o video comparten `--text-hero-title`. Los títulos de tarjetas comparten `--text-card-title`.

`BackLink` se usa para los enlaces de regreso, con una misma flecha, color azul y área táctil mínima de 44 px.

## Paleta y superficies

- Azul marino: `--secondary`, `#0A192F`.
- Amarillo: `--primary`, `#F0C400`, para acciones principales y acentos sobre fondos oscuros.
- Dorado: `--color-gold`, `#8A6700`, para palabras destacadas y etiquetas de encabezados sobre blanco o gris claro.
- Azul de acento: `--color-accent`, `#24598A`, para enlaces, mapa y detalles técnicos sobre superficies claras.
- Texto: `--color-body`, `#536273`; en superficies oscuras `--color-body-inverse`.
- Fondos claros: `--white` y `--bg-soft`; separadores: `--color-border`.
- Inicio: servicios, ahulados y capacidad en blanco; proceso en azul marino; mapa y obras en gris azulado; pie en azul marino.

Los cambios de color o escala deben hacerse en estos valores compartidos. Las hojas de cada sección deben contener principalmente su distribución y comportamiento responsive.
