import { json } from "@remix-run/node";
import { verifyShopifyWebhook } from "../utils/verifyWebhook";

export const action = async ({ request }) => {
  const { ok, body } = await verifyShopifyWebhook(request);
  if (!ok) return new Response("Unauthorized", { status: 401 });

  console.log("Customer Redact Webhook received:", body);

  // TODO: Delete customer PII (personally identifiable information)

  return json({ success: true });
};
