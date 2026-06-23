import { createServer, type Server } from "node:http";
import next from "next";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  MainLayout,
  MainLayoutFooter,
  MainLayoutHeader,
  MainLayoutMain,
} from "../src/components/main-layout";

let server: Server | undefined;
let baseUrl: string;
let nextApp: ReturnType<typeof next> | undefined;

describe("main layout component exports", () => {
  it("exposes the shell and semantic subcomponents", () => {
    expect(MainLayout).toBeTypeOf("function");
    expect(MainLayoutHeader).toBeTypeOf("function");
    expect(MainLayoutMain).toBeTypeOf("function");
    expect(MainLayoutFooter).toBeTypeOf("function");
  });
});

describe("home route response", () => {
  beforeAll(async () => {
    const existingBaseUrls = process.env.AGENTCLINIC_BASE_URL
      ? [process.env.AGENTCLINIC_BASE_URL]
      : ["http://localhost:3000", "http://127.0.0.1:3000"];

    for (const existingBaseUrl of existingBaseUrls) {
      if (await canReach(existingBaseUrl)) {
        baseUrl = existingBaseUrl;
        return;
      }
    }

    nextApp = next({
      conf: {
        distDir: ".next-vitest",
      },
      dev: true,
      dir: process.cwd(),
    });

    await nextApp.prepare();

    const handle = nextApp.getRequestHandler();

    server = createServer((request, response) => {
      void handle(request, response);
    });

    await new Promise<void>((resolve) => {
      server.listen(0, "127.0.0.1", resolve);
    });

    const address = server.address();

    if (!address || typeof address === "string") {
      throw new Error("Expected HTTP server to listen on a TCP address.");
    }

    baseUrl = `http://127.0.0.1:${address.port}`;
  }, 60000);

  afterAll(async () => {
    if (!server || !nextApp) {
      return;
    }

    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });

    await nextApp.close();
  });

  it("serves / as HTML", async () => {
    const response = await fetch(`${baseUrl}/`);

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/html");
  }, 60000);
});

async function canReach(url: string) {
  try {
    const response = await fetch(url);

    return response.ok;
  } catch {
    return false;
  }
}
