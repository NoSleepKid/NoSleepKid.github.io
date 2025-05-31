export default {
  async fetch(request: Request) {
    const url = new URL(request.url);
    let path = url.pathname;

    // Default to index.html
    if (path === "/") path = "/home/index.html";

    // GitHub raw base URL: replace USER and REPO with your own
    const githubRawBase = "https://raw.githubusercontent.com/NoSleepKid/nukstudios/main";

    // Fetch file from GitHub raw
    const fetchUrl = githubRawBase + path;

    const resp = await fetch(fetchUrl);

    if (!resp.ok) {
      return new Response("File not found", { status: 404 });
    }

    // Get content type from extension
    const ext = path.split('.').pop();
    const contentTypes: Record<string, string> = {
      html: "text/html",
      css: "text/css",
      js: "application/javascript",
      json: "application/json",
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      svg: "image/svg+xml",
      txt: "text/plain",
      wasm: "application/wasm",
    };

    const contentType = contentTypes[ext!] || "application/octet-stream";

    const body = await resp.arrayBuffer();

    return new Response(body, {
      headers: { "content-type": contentType },
    });
  },
};
