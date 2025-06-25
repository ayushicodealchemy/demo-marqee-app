
import express from "express";
import compression from "compression";
import shopify from "./app/shopify.server.js"; 
import { createRequestHandler } from "@remix-run/express";

const app = express();

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static("public"));

// Shopify auth/session/webhook middleware
app.use(shopify);

// Remix request handler (must be last)
app.all(
  "*",
  createRequestHandler({
    build: require("./build"),
    mode: process.env.NODE_ENV,
  })
);

export default app;
