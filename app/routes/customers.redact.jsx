import { json } from "@remix-run/node";
import { verifyShopifyWebhook } from "../utils/verifyWebhook";

export const loader = () => {
  return json({ status: "Webhook route. Use POST method." }, { status: 405 });
};

export const action = async ({ request }) => {
  const { ok, body } = await verifyShopifyWebhook(request);
  if (!ok) return new Response("Unauthorized", { status: 401 });

  console.log("🔔 Webhook received: customers/redact");
  console.log("Payload:", body);

  // TODO: Delete customer PII (personally identifiable information)

  return json({ success: true });
};
