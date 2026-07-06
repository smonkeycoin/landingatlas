# ATLAS OS Experience

Home de producto para ATLAS OS, creada en HTML, CSS y JavaScript vanilla. Ya no funciona como landing tradicional: primero presenta la vision y despues abre el Workspace del producto.

## Como correr local

Opcion 1: abrir `index.html` directamente en el navegador.

Opcion 2: servir la carpeta en un puerto local:

```bash
cd /Users/smonkeycoin/Desktop/landingatlas
python3 -m http.server 5510 --bind 127.0.0.1
```

Luego abrir:

```text
http://127.0.0.1:5510
```

## Estructura actual

- `index.html`: dos experiencias 100vh con CSS Scroll Snap: `Atlas Experience` y `Workspace Experience`.
- `app.js`: controla el Workspace unico, sus vistas internas y el flujo Founder mock.
- `styles.css`: estilos de Atlas Experience, Workspace Experience, dashboard, responsive y fallback visual.
- `story.html`: landing storytelling larga preservada.
- `story.js`: interacciones de la landing storytelling preservada.

## Filosofia

- `Atlas Experience`: primera pantalla 100vh, cinematografica, con brand, mensaje y dos CTAs.
- `Workspace Experience`: segunda pantalla 100vh, se siente como abrir la app.
- CSS Scroll Snap conecta ambas experiencias con una transicion vertical.
- No hay secciones repetidas debajo, grid externo de modulos ni demos apiladas.
- Todos los modulos viven dentro del mismo Workspace mediante el sidebar: Property Engine, CRM, Kanban, WhatsApp, Automation, Analytics, Docs y Marketplace.
- Las vistas cambian dentro del mismo Workspace con transicion suave.

## CTAs

- `Solicitar acceso Founder` abre un flujo Founder mock en modal.
- `Quiero saber mas` lleva a `story.html`.
- En `story.html`, los botones `Entrar a Atlas` vuelven a `index.html#workspace` para abrir directamente la experiencia de producto.
- No hay Stripe, backend, auth ni APIs reales conectadas en esta home.

## Demo local

- Dashboard funciona como Mission Control con KPIs, Atlas Intelligence, Live Activity, agenda, workflows, Web Sync Queue, alertas, asesor top y notificaciones.
- Property Engine muestra `Penthouse Arcos Vallarta` con imagen, ubicación, precio, score, media, interest, status, owner y acciones rápidas.
- CRM incluye Lead Intelligence, score, temperatura, siguiente mejor acción, propiedades sugeridas, timeline, fuente, último contacto y botones IA.
- Kanban permite mover deals por drag and drop en desktop y con boton en mobile, con lenguaje visual por etapa.
- WhatsApp OS opera como centro conversacional con lista, chat, burbujas, ficha de propiedad, respuesta IA y panel de contexto.
- Automation muestra workflow activo, nodos, checks, timeline, última ejecución, tiempo, próxima ejecución e historial.
- Docs funciona como expediente digital con documentos, estados y relaciones a Lead, Property, Deal, Cliente y Asesor.
- Marketplace se presenta como App Store de integraciones con estados y acciones.
- Analytics incluye mini gráficas, embudo, leads, comisiones, asesor top, inventario, ciudades y tiempo de respuesta.

## Nota de alcance

Este proyecto es independiente de `/Users/smonkeycoin/Desktop/atlasos`. No toca backend, auth, Stripe real ni APIs reales.
