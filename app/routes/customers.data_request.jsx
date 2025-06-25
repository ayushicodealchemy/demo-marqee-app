import { json } from "@remix-run/node";
import { verifyShopifyWebhook } from "../utils/verifyWebhook";

export const action = async ({ request }) => {
  const { ok, body } = await verifyShopifyWebhook(request);
  if (!ok) return new Response("Unauthorized", { status: 401 });

  console.log("Customers Data Request Webhook received:", body);

  // TODO: Process customer data request here

  return json({ success: true });
};
