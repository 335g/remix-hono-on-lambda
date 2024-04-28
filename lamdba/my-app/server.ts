import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import { remix } from "remix-hono/handler";
import { serve } from "@hono/node-server";

const app = new Hono();
if (process.env.NODE_ENV !== "development" || import.meta.env.PROD) {
  app.use("/assets/*", serveStatic({ root: "./build/client" }));
  app.use(async (c, next) => {
    const serverBuild = await import("./build/server/index.js");
    return remix({
      build: serverBuild,
      mode: "production",
    });
  });

  serve({
    fetch: app.fetch,
    port: 8080,
  });
} else {
  app.use(async (c, next) => {
    const build = await import("virtual:remix/server-build");
    const { createRequestHandler } = await import("@remix-run/node");
    const handler = createRequestHandler(build, "development");
    return handler(c.req.raw, {});
  });
}

export default app;
