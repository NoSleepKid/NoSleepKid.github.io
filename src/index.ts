export default {
  async fetch(request: Request) {
    return new Response("hello from worker! 👋", {
      headers: { "content-type": "text/plain" },
    });
  },
};
