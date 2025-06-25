import crypto from "crypto";

export async function verifyShopifyWebhook(request) {
  const hmacHeader = request.headers.get("X-Shopify-Hmac-Sha256");
  if (!hmacHeader) return { ok: false };

  const rawBody = await request.text();

  const generatedHmac = crypto
    .createHmac("sha256", process.env.SHOPIFY_API_SECRET || "")
    .update(rawBody, "utf8")
    .digest("base64");

  const valid =
    generatedHmac.length === hmacHeader.length &&
    crypto.timingSafeEqual(
      Buffer.from(generatedHmac, "utf8"),
      Buffer.from(hmacHeader, "utf8"),
    );

  let json;
  try {
    json = JSON.parse(rawBody);
  } catch {
    return { ok: false };
  }

  return { ok: valid, body: json };
}
