import db from "../db.server";
import { json } from "@remix-run/node";
import { verifyShopifyWebhook } from "../utils/verifyWebhook";

export const action = async ({ request }) => {
  const { ok, body } = await verifyShopifyWebhook(request);
  if (!ok) return new Response("Unauthorized", { status: 401 });

  const shop = body.shop_domain;
  const current = body.current;

  console.log("Received APP_SCOPES_UPDATE webhook for", shop);

  // Update the scopes if a session exists
  await db.session.updateMany({
    where: { shop },
    data: { scope: current.toString() },
  });

  return json({ success: true });
};
