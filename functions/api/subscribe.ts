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
    return json({ error: "Cuerpo inválido" }, 400);
  }

  const { email, consent } = body;

  if (!email || !EMAIL_RE.test(email)) {
    return json({ error: "Email no válido" }, 422);
  }
  if (!consent) {
    return json({ error: "Consentimiento requerido" }, 422);
  }

  const { RESEND_API_KEY: apiKey, RESEND_AUDIENCE_ID: audienceId } = env;
  if (!apiKey || !audienceId) {
    console.error("subscribe: missing env vars", {
      hasKey: Boolean(apiKey),
      hasAudience: Boolean(audienceId),
    });
    return json({ error: "Servicio no configurado" }, 503);
  }

  let res: Response;
  try {
    res = await fetch(
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
  } catch (err) {
    console.error("subscribe: fetch failed", err);
    return json({ error: "Error de conexión con el servicio" }, 502);
  }

  if (res.ok) {
    return json({ ok: true }, 200);
  }

  const errData = (await res.json().catch(() => ({}))) as {
    name?: string;
    message?: string;
  };
  console.error("subscribe: resend error", {
    status: res.status,
    name: errData.name,
    message: errData.message,
  });

  const alreadyExists =
    res.status === 409 ||
    /already exists|ya existe|exists/i.test(errData.message ?? "");
  if (alreadyExists) {
    return json({ ok: true }, 200);
  }

  return json({ error: errData.message ?? "Error al registrar" }, res.status);
};

function json(data: unknown, status: number) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
