import db from "../db.server";
import { json } from "@remix-run/node";
import { verifyShopifyWebhook } from "../utils/verifyWebhook";

export const action = async ({ request }) => {
  const { ok } = await verifyShopifyWebhook(request);
  if (!ok) return new Response("Unauthorized", { status: 401 });

  const topic = request.headers.get("x-shopify-topic");
  const shop = request.headers.get("x-shopify-shop-domain");

  console.log(`📩 Webhook received: ${topic} from ${shop}`);

  switch (topic) {
    case "APP_UNINSTALLED":
      await db.session.deleteMany({ where: { shop } });
      break;

    case "CUSTOMERS_DATA_REQUEST":
    case "CUSTOMERS_REDACT":
    case "SHOP_REDACT":
      console.log(`📦 GDPR Webhook: ${topic}`);
      break;

    default:
      console.warn("⚠️ Unhandled webhook topic:", topic);
      break;
  }

  return json({ success: true });
};
