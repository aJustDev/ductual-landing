const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Env {
  RESEND_API_KEY: string;
  RESEND_AUDIENCE_ID: string;
}

export const onRequestPost = async ({
  request,
  env,
}: {
  request: Request;
  env: Env;
}) => {
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

  const { RESEND_API_KEY: apiKey, RESEND_AUDIENCE_ID: audienceId } = env;
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
