"use strict";
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
    phone ? 'Mi teléfono es ' + phone + '.' : '', email ? 'Mi email es ' + email + '.' : ''].filter(Boolean).join('\n');
  window.location.assign('https://wa.me/5491125205234?text=' + encodeURIComponent(text));
});
document.querySelectorAll('#contact-form input, #contact-form textarea').forEach(function (field) {
  field.addEventListener('input', function () { this.setCustomValidity(''); });
});
