const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Env {
  RESEND_API_KEY: string;
  RESEND_AUDIENCE_ID: string;
  RESEND_AUDIENCE_ID_CA?: string;
}

type Locale = "es" | "ca";

export const onRequestPost = async ({
  request,
  env,
}: {
  request: Request;
  env: Env;
}) => {
  let body: { email?: string; consent?: boolean; locale?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid_body" }, 400);
  }

  const { email, consent } = body;
  const locale: Locale = body.locale === "ca" ? "ca" : "es";

  if (!email || !EMAIL_RE.test(email)) {
    return json({ error: "invalid_email" }, 422);
  }
  if (!consent) {
    return json({ error: "consent_required" }, 422);
  }

  const apiKey = env.RESEND_API_KEY;
  const audienceId =
    locale === "ca" ? env.RESEND_AUDIENCE_ID_CA : env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    console.error("subscribe: missing env vars", {
      locale,
      hasKey: Boolean(apiKey),
      hasAudience: Boolean(audienceId),
    });
    return json({ error: "service_unavailable" }, 503);
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
    return json({ error: "network_error" }, 502);
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

  return json({ error: "resend_error" }, res.status);
};

function json(data: unknown, status: number) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
