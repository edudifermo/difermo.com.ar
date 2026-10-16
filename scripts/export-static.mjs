import { readFileSync, writeFileSync, mkdirSync, cpSync } from 'node:fs';

// One-time migration helper. The exported site can be edited and hosted without Node.
const read = (path) => readFileSync(path, 'utf8');
const out = 'hosting-estatico';
mkdirSync(out, { recursive: true });
const source = read('app/page.tsx');
let body = source.slice(source.indexOf('    <main>'), source.lastIndexOf('</main>') + 7);
for (const name of ['personalLines', 'commercialLines', 'corporateLines']) {
  const values = JSON.parse(source.match(new RegExp(`const ${name} = (\\[[\\s\\S]*?\\]);`))[1].replace(/,\s*\]/g, ']'));
  body = body.replace(`{${name}.map((line) => <li key={line}>{line}</li>)}`, values.map(value => `<li>${value}</li>`).join(''));
}
const formSource = read('app/contact-form.tsx');
let form = formSource.slice(formSource.indexOf('    <form'), formSource.lastIndexOf('</form>') + 7)
  .replace('onSubmit={handleSubmit}', 'id="contact-form"')
  .replace('rows={5}', 'rows="5"').replace('<textarea ', '<textarea ')
  .replace(/(<textarea[^>]*?)\s*\/>/, '$1></textarea>');
body = body.replace('<ContactForm />', form)
  .replaceAll('<ArrowIcon />', '<span aria-hidden="true">↗</span>')
  .replace('{new Date().getFullYear()}', `<span id="year">${new Date().getFullYear()}</span>`)
  .replaceAll('className=', 'class=').replaceAll('autoComplete=', 'autocomplete=')
  .replaceAll('src="/images/', 'src="images/');
if (/\{[^}]*\}|className|<ContactForm|<ArrowIcon/.test(body)) throw new Error('Unconverted JSX');
writeFileSync(`${out}/index.html`, `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Eduardo Di Fermo | Análisis de Riesgos y Seguros</title>
  <meta name="description" content="Asesoramiento personalizado en seguros para personas, comercios y empresas. Análisis de riesgos con el respaldo de Valcarce-Deve Brokers.">
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="styles.css">
  <script src="contacto.js" defer></script>
</head>
<body>
${body}
</body>
</html>
`);
const reset = `*,::before,::after{box-sizing:border-box;border:0 solid}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:Arial,sans-serif}h1,h2,h3,p,figure,ol,ul{margin:0}ol,ul{padding:0;list-style:none}img{display:block;max-width:100%;height:auto}button,input,textarea{font:inherit;color:inherit}button{cursor:pointer} :root{--font-sans:Manrope} section[id]{scroll-margin-top:150px}\n`;
const fontDir = '.vinext/fonts/manrope-76eca2803f7f';
cpSync(fontDir, `${out}/fonts`, { recursive: true });
const fonts = read(`${fontDir}/style.css`).replace(/url\([^)]*\/(manrope-[^/)]+\.woff2)\)/g, 'url(fonts/$1)');
writeFileSync(`${out}/styles.css`, fonts + '\n' + reset + read('app/globals.css').replace('@import "tailwindcss";', ''));
cpSync('public/images', `${out}/images`, { recursive: true });
cpSync('public/favicon.svg', `${out}/favicon.svg`);
writeFileSync(`${out}/contacto.js`, `"use strict";
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('contact-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const data = new FormData(this);
  const name = String(data.get('name') || '').trim();
  const message = String(data.get('message') || '').trim();
  this.elements.name.setCustomValidity(name ? '' : 'Ingresá tu nombre.');
  this.elements.message.setCustomValidity(message ? '' : 'Escribí tu consulta.');
  if (!this.reportValidity()) return;
  const phone = String(data.get('phone') || '').trim();
  const email = String(data.get('email') || '').trim();
  const text = ['Hola Eduardo, mi nombre es ' + name + '.', 'Quisiera consultarte: ' + message,
    phone ? 'Mi teléfono es ' + phone + '.' : '', email ? 'Mi email es ' + email + '.' : ''].filter(Boolean).join('\\n');
  window.location.assign('https://wa.me/5491125205234?text=' + encodeURIComponent(text));
});
document.querySelectorAll('#contact-form input, #contact-form textarea').forEach(function (field) {
  field.addEventListener('input', function () { this.setCustomValidity(''); });
});
`);
console.log(`Exported to ${out}`);
