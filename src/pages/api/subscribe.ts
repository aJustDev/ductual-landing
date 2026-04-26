import type { APIRoute } from "astro";

export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
  let body: { email?: string; consent?: boolean };
  try {
    body = await request.json();
  } catch {
    return json({ error: "Cuerpo invalido" }, 400);
  }

  const { email, consent } = body;

  if (!email || !EMAIL_RE.test(email)) {
    return json({ error: "Email no valido" }, 422);
  }
  if (!consent) {
    return json({ error: "Consentimiento requerido" }, 422);
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  const audienceId = import.meta.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    return json({ error: "Servicio no configurado" }, 503);
  }

  const res = await fetch(
    `https://api.resend.com/audiences/${audienceId}/contacts`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, unsubscribed: false }),
    },
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const msg = (err as { message?: string }).message ?? "Error al registrar";
    return json({ error: msg }, res.status);
  }

  return json({ ok: true }, 200);
};

function json(data: unknown, status: number) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
