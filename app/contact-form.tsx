"use client";

import { FormEvent } from "react";

export default function ContactForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const text = [
      `Hola Eduardo, mi nombre es ${name}.`,
      `Quisiera consultarte: ${message}`,
      phone ? `Mi teléfono es ${phone}.` : "",
      email ? `Mi email es ${email}.` : "",
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/5491125205234?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Nombre completo<input name="name" autoComplete="name" required placeholder="Tu nombre" /></label>
        <label>Teléfono<input name="phone" autoComplete="tel" type="tel" placeholder="11 0000 0000" /></label>
      </div>
      <label>Email<input name="email" autoComplete="email" type="email" placeholder="nombre@correo.com" /></label>
      <label>¿En qué puedo ayudarte?<textarea name="message" required rows={5} placeholder="Quisiera asesoramiento sobre..." /></label>
      <button className="button button-primary" type="submit">Enviar consulta por WhatsApp <span aria-hidden="true">↗</span></button>
      <small>Al enviar, se abrirá WhatsApp con tu mensaje listo para revisar.</small>
    </form>
  );
}
