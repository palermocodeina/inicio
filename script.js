export default async function handler(req, res) {
  const metadata = {
    timestamp: new Date().toISOString(),

    // IP real
    ip:
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket?.remoteAddress ||
      "unknown",

    // Navegador / sistema
    userAgent: req.headers["user-agent"] || "unknown",

    // Idioma del navegador
    acceptLanguage: req.headers["accept-language"] || "unknown",

    // Headers geo que expone Vercel (sin lógica)
    country: req.headers["x-vercel-ip-country"] || "unknown",
    region: req.headers["x-vercel-ip-country-region"] || "unknown",
    city: req.headers["x-vercel-ip-city"] || "unknown",
    latitude: req.headers["x-vercel-ip-latitude"] || "unknown",
    longitude: req.headers["x-vercel-ip-longitude"] || "unknown",

    // Infra
    referer: req.headers["referer"] || "unknown",
    forwardedFor: req.headers["x-forwarded-for"] || "unknown"
  };

  // Log crudo → Vercel Logs / exportable luego
  console.log("PALERMO_CODEINA_CLICK", metadata);

  // Redirect fijo (sin condiciones)
  res.writeHead(302, {
    Location: "https://palermocodeina.vercel.app/"
  });
  res.end();
}
