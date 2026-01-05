export default async function handler(req, res) {
  const metadata = {
    timestamp: new Date().toISOString(),
 // verificacion de undertrap argentino
    ip:
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket?.remoteAddress ||
      "unknown",

  
    userAgent: req.headers["user-agent"] || "unknown",

   
    acceptLanguage: req.headers["accept-language"] || "unknown",

    
    country: req.headers["x-vercel-ip-country"] || "unknown",
    region: req.headers["x-vercel-ip-country-region"] || "unknown",
    city: req.headers["x-vercel-ip-city"] || "unknown",
    latitude: req.headers["x-vercel-ip-latitude"] || "unknown",
    longitude: req.headers["x-vercel-ip-longitude"] || "unknown",

    // backend
    referer: req.headers["referer"] || "unknown",
    forwardedFor: req.headers["x-forwarded-for"] || "unknown"
  };

  
  console.log("PALERMO_CODEINA_CLICK", metadata);

  // Redirect fijo 
  res.writeHead(302, {
    Location: "https://palermocodeina.vercel.app/"
  });
  res.end();
}
