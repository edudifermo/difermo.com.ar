import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
import { parse } from 'parse5';
import { validateStatic } from '../scripts/validate-static.mjs';

function findElement(node, tagName, attributes = {}) {
 if (node.tagName === tagName && Object.entries(attributes).every(([name, value]) =>
  node.attrs.some(attribute => attribute.name === name && attribute.value === value))) return node;
 for (const child of node.childNodes ?? []) {
  const match = findElement(child, tagName, attributes);
  if (match) return match;
 }
}

test('export contains resources, navigation and contact form', () => {
 const html = validateStatic();
 for (const id of ['inicio','nosotros','servicios','contacto']) {
  assert.ok(html.includes(`id="${id}"`)); assert.ok(html.includes(`href="#${id}"`));
 }
 assert.match(html, /mailto:eduardo@difermo.com.ar/);
 assert.match(html, /tel:\+5491141753202/);
 const form = findElement(parse(html), 'form', { class: 'contact-form' });
 assert.ok(form, 'Contact form exists');
 for (const name of ['name','phone','email','message']) {
  const field = findElement(form, name === 'message' ? 'textarea' : 'input', { name });
  assert.ok(field, `Contact field exists: ${name}`);
  if (name === 'name' || name === 'message') {
   assert.ok(field.attrs.some(attribute => attribute.name === 'required'), `${name} is required`);
  }
  if (name === 'email') assert.ok(field.attrs.some(attribute => attribute.name === 'type' && attribute.value === 'email'));
 }
});
test('actual contact component opens WhatsApp with accents and optional fields', () => {
 const source = readFileSync(new URL('../app/contact-form.tsx', import.meta.url),'utf8');
 const compiled = ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}}).outputText;
 const exports = {};
 let values, opened, prevented;
 vm.runInNewContext(compiled, {exports,require:createRequire(import.meta.url),FormData:class{get(key){return values[key] ?? null;}},window:{open(...args){opened=args;}}});
 const form = exports.default();
 for (const optional of [true,false]) {
  values={name:' José Pérez ',message:' Auto & hogar?\nCotización '};
  if(optional) Object.assign(values,{phone:' 1123456789 ',email:' jose@example.com '});
  form.props.onSubmit({currentTarget:{},preventDefault(){prevented=true;}});
  assert.ok(prevented);
  const url=new URL(opened[0]);
  assert.equal(url.origin,'https://wa.me'); assert.equal(url.pathname,'/5491125205234');
  const message=url.searchParams.get('text');
  assert.ok(message.includes('Hola Eduardo, mi nombre es José Pérez.'));
  assert.ok(message.includes('Auto & hogar?\nCotización'));
  assert.equal(message.includes('Mi teléfono es 1123456789.'),optional);
  assert.equal(message.includes('Mi email es jose@example.com.'),optional);
  assert.equal(opened[1],'_blank'); assert.equal(opened[2],'noopener,noreferrer');
 }
});
