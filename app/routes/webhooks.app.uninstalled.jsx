import db from "../db.server";
import { json } from "@remix-run/node";
import { verifyShopifyWebhook } from "../utils/verifyWebhook";

export const action = async ({ request }) => {
  const { ok, body } = await verifyShopifyWebhook(request);
  if (!ok) return new Response("Unauthorized", { status: 401 });

  const shop = body.shop_domain;

  console.log("Received APP_UNINSTALLED webhook for", shop);

  // Delete all sessions for the shop
  await db.session.deleteMany({ where: { shop } });

  return json({ success: true });
};
