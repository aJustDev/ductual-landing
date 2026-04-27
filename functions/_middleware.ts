interface Env {
  ASSETS: { fetch: (req: Request) => Promise<Response> };
}

type Ctx = {
  request: Request;
  env: Env;
  next: () => Promise<Response>;
};

export const onRequest = async ({ request, env, next }: Ctx) => {
  const url = new URL(request.url);
  const hostname = url.hostname;
  const path = url.pathname;

  if (path.startsWith("/api/")) {
    return next();
  }

  const isCAT = hostname === "ductual.cat" || hostname.endsWith(".ductual.cat");
  const isES = hostname === "ductual.es" || hostname.endsWith(".ductual.es");

  if (isCAT) {
    if (path === "/privacidad" || path.startsWith("/privacidad/")) {
      return Response.redirect(`https://ductual.es${path}${url.search}`, 301);
    }
    if (path.startsWith("/es/")) {
      const rest = path.slice(3) || "/";
      return Response.redirect(`https://ductual.es${rest}${url.search}`, 301);
    }
    if (path.startsWith("/ca/")) {
      const rest = path.slice(3) || "/";
      return Response.redirect(`https://ductual.cat${rest}${url.search}`, 301);
    }

    const hasExtension = /\.[a-z0-9]+$/i.test(path);
    if (!hasExtension) {
      const withSlash = path.endsWith("/") ? path : `${path}/`;
      const newPath = withSlash === "/" ? "/ca/" : `/ca${withSlash}`;
      const rewritten = new URL(url.toString());
      rewritten.pathname = newPath;
      return env.ASSETS.fetch(new Request(rewritten.toString(), request));
    }
  } else if (isES) {
    if (path === "/privacitat" || path.startsWith("/privacitat/")) {
      return Response.redirect(`https://ductual.cat${path}${url.search}`, 301);
    }
    if (path.startsWith("/ca/")) {
      const rest = path.slice(3) || "/";
      return Response.redirect(`https://ductual.cat${rest}${url.search}`, 301);
    }
  }

  return next();
};
