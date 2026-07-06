# ATLAS OS Landing

Landing storytelling moderna para ATLAS OS, creada en HTML, CSS y JavaScript vanilla.

## Como correr local

Opcion 1: abrir `index.html` directamente en el navegador.

Opcion 2: servir la carpeta en el puerto 5500:

```bash
cd /Users/smonkeycoin/Desktop/landingatlas
python3 -m http.server 5500 --bind 127.0.0.1
```

Luego abrir:

```text
http://127.0.0.1:5500
```

## Secciones incluidas

- Intro oscura con caos de herramientas desconectadas.
- Problema operativo inmobiliario.
- Aparicion de ATLAS como nucleo operativo.
- Hero principal con mockup de dashboard.
- Demo interactivo con tabs: Kanban, Automation, WhatsApp y Web Sync.
- Comparativa antes / despues.
- Property Engine.
- Lead Engine.
- Automation Engine.
- WhatsApp OS.
- Web Engine.
- Atlas Intelligence.
- Analytics.
- Para quien es.
- Founder Launch / Pricing.
- CTA final y footer.

## Pricing propuesto

- Founder: `$1,490 MXN / mes`.
- Enterprise: `Contactanos`.
- Precio regular planeado: desde `$2,490 MXN / mes`.

## CTAs mock

Los botones de acceso y demo hacen scroll interno dentro de la landing.

El boton `Comenzar como Founder` abre un modal visual de checkout mock. No tiene URL real, no usa backend y no llama APIs externas.

## Demos interactivos V2

- Kanban: arrastra deals entre columnas en desktop. En mobile usa el boton `Mover`.
- Automation: activa/desactiva el workflow y corre `Run demo`.
- WhatsApp: cambia conversaciones y prueba generar respuesta, enviar ficha, crear deal y marcar caliente.
- Web Sync: prueba actualizar precio y publicar cambios.

Todo corre local con JavaScript vanilla.

## Pendiente para Stripe real

- Crear productos y precios reales en Stripe.
- Definir si se usara Stripe Checkout o Payment Links.
- Conectar el CTA a una URL real o a un endpoint backend.
- Agregar manejo de exito, cancelacion, webhooks y provisionamiento.
- Agregar analytics de conversion.

## Dominio y analytics

Para publicar, subir la carpeta a hosting estatico como Vercel, Netlify, Cloudflare Pages o un servidor propio. Despues conectar dominio, eventos de analytics y conversion tracking.

## Nota de alcance

Este proyecto es independiente de `/Users/smonkeycoin/Desktop/atlasos`. No toca backend, auth, Stripe real ni APIs reales.
