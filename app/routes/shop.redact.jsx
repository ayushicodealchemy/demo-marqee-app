import { json } from "@remix-run/node";
import { verifyShopifyWebhook } from "../utils/verifyWebhook";

export const loader = () => {
  return json({ status: "Webhook route. Use POST method." }, { status: 405 });
};

export const action = async ({ request }) => {
  const { ok, body, topic, shop, payload } =
    await verifyShopifyWebhook(request);
  if (!ok) return new Response("Unauthorized", { status: 401 });

  console.log("🔔 Webhook received: shop/redact");
  console.log("Payload:", body);

  console.log("SHOPIFY WEBHOOK RECEIVED:", {
    topic,
    shop,
    payload,
  });

  // TODO: Wipe all shop-specific data from your database

  return json({ success: true });
};
