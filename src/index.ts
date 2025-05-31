// src/index.ts
export default {
  async fetch(request: Request): Promise<Response> {
    return new Response("Hello from my Cloudflare Worker! 🎉", {
      headers: { "content-type": "text/plain" },
    });
  },
};
