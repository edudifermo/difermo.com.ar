# Trabajar el sitio con VS Code y Codex

## 1. Abrir el proyecto

1. Descomprimir el ZIP en una carpeta de trabajo.
2. Abrir VS Code.
3. Elegir **Archivo > Abrir carpeta** y seleccionar `difermo-seguros`.
4. Abrir una terminal integrada desde **Terminal > Nueva terminal**.

## 2. Instalar y ejecutar

El proyecto requiere Node.js 22.13 o posterior.

```bash
npm install
npm run dev
```

La terminal mostrará la dirección local para abrir la web en el navegador.

## 3. Archivos principales

- `app/page.tsx`: contenido y estructura de la página principal.
- `app/globals.css`: colores, tipografías, espacios y diseño adaptable.
- `app/contact-form.tsx`: formulario y envío de consultas por WhatsApp.
- `app/layout.tsx`: metadatos generales del sitio.
- `public/images/`: imágenes propias del sitio.

## 4. Pedir cambios a Codex

Abrir la carpeta completa en VS Code y describir el cambio indicando qué debe conservarse. Ejemplo:

> Agregá una sección llamada Oficina Digital debajo de Servicios. Debe tener cuatro accesos: Cotizar, Gestionar mi póliza, Tuve un siniestro y Revisar mis riesgos. Conservá el estilo, los colores y el funcionamiento actual. Antes de terminar, ejecutá la compilación y corregí cualquier error.

## 5. Verificar antes de publicar

```bash
npm run build
```

No subir la carpeta `node_modules`; se regenera con `npm install`.
