import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import { remix } from "remix-hono/handler";
import { serve } from "@hono/node-server";
import * as build from "./build/server/index.js";

const app = new Hono();
app.use("/assets/*", serveStatic({ root: "./build/client" }));
app.use(
  remix({
    build,
    mode: "production",
  }),
);

serve({
  fetch: app.fetch,
  port: 8080,
});
