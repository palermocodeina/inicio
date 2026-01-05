/**
 * Entry event handler
 *
 * Certified purpose:
 *
 * - Emit lightweight operational notification
 * - Redirect user without introducing latency or friction
 *
 * Design principles:
 * - Privacy-first: no cookies, no client storage, no fingerprinting
 * - Resilient: external services must never block user flow
 * - Observable: minimal signal for traffic validation and ops awareness
 */

    // --- Configuration ---
    // Notification channel is abstracted via environment variables
    // to avoid coupling core logic to any specific provider.

  // --- Request context extraction ---
    // Only standard HTTP metadata is used.
    // No identifiers are generated or persisted.

 // Message is intended for operational awareness only.
    // Data is ephemeral and not stored server-side.

  // --- Non-blocking notification ---
    // External delivery failures must not affect UX.
    // This call is best-effort and intentionally isolated.

  // Errors are logged for diagnostics but intentionally ignored
    // to preserve the primary redirect behavior.

 // --- Primary user flow ---
  // Redirect is unconditional and cache is disabled
  // to ensure consistent behavior across repeated visits.

export default async function handler(req, res) {
  try {
    const BOT_TOKEN = process.env.TG_TOKEN;
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

    // 🔒 Enviar mensaje (no bloquea el redirect)
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message
      })
    });

    res.writeHead(302, {
      Location: "https://palermocodeina.vercel.app/",
      "Cache-Control": "no-store"
    });
    res.end();

  } catch (err) {
    console.error("ENTER ERROR:", err);

    // ⚠️ Aunque falle Telegram, redirigimos igual
    res.writeHead(302, {
      Location: "https://palermocodeina.vercel.app/"
    });
    res.end();
  }
}
