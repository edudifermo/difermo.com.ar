# Eduardo Di Fermo — sitio estático Next.js

La fuente de la web está en `app/` y los recursos en `public/`. Next.js genera
HTML, CSS y JavaScript para Apache/cPanel. El servidor de producción no necesita
Node.js, PHP ni base de datos.

## Desarrollo y verificación

Requisitos locales: Node.js >=22.13 y npm. La compilación necesita acceso a
Google Fonts para descargar Manrope; Next.js incluye la fuente en el resultado.

```sh
npm ci
npm run dev
```

Antes de publicar, ejecutar en este orden:

```sh
npm run typecheck
npm run build
npm run validate:artifact
npm test
```

`npm test` verifica el artefacto existente; ejecutar `build` después de modificar
la web. Las pruebas comprueban recursos, navegación, campos del formulario y el
manejador real de contacto (mensaje, acentos y datos opcionales de WhatsApp).
No envían consultas reales. No se ignoran errores de TypeScript.

## Publicación manual en Apache/cPanel

Guardar una copia del sitio actual. Subir todo el CONTENIDO de `out/` al directorio
público del dominio, habitualmente `public_html`. Incluir `_next/`, imágenes,
fuentes y todos los archivos generados. No subir el proyecto ni `node_modules`.
Revisar reglas anteriores de `.htaccess` y si un `index.php` tiene prioridad sobre
`index.html`. No se necesita una regla SPA que redirija todo a index.html.
`trailingSlash: true` permite servir futuras páginas como carpetas con index.html.

El formulario abre WhatsApp con el mensaje para revisar: el usuario confirma el
envío. Email y teléfono son enlaces a las aplicaciones del visitante. El año
del pie corresponde al momento de la compilación. No hay backend activo.

Esta normalización no configura DNS, hosting, credenciales, despliegue ni CI.

## Infraestructura anterior

`vite.config.ts`, `worker/`, `build/`, `db/`, `drizzle.config.ts`, `examples/`
y `.openai/` se conservan como referencia del despliegue anterior. No forman
parte del flujo Next.js estático; sus dependencias exclusivas fueron retiradas.
TypeScript incluye solamente la aplicación, next.config.ts y los tipos de Next.
`app/chatgpt-auth.ts` no se utiliza en la web pública; activar autenticación de
servidor exigiría revisar la arquitectura estática.

`hosting-estatico/` es la conversión HTML manual anterior y no es la salida de
Next.js. Para esta versión publicar siempre `out/`; no combinar ambas carpetas.
