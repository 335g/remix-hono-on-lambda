import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import { remix } from "remix-hono/handler";
import { serve } from "@hono/node-server";

const app = new Hono();
app.all("*", async (c) => {
  const build = await import("virtual:remix/server-build");
  const { createRequestHandler } = await import("@remix-run/node");
  const handler = createRequestHandler(build, "development");
  return handler(c.req.raw, {});
});

export default app;
