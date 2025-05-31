export default {
  async fetch(request: Request) {
    const url = new URL(request.url);
    let path = url.pathname;

    // GitHub raw base URL - replace USER and REPO
    const githubRawBase = "https://raw.githubusercontent.com/NoSleepKid/nukstudios/main";

    // Remove leading slash
    if (path.startsWith("/")) path = path.slice(1);

    // Handle empty path => serve index.html at root
    if (path === "") path = "index.html";

    // If path ends with slash, add index.html
    if (path.endsWith("/")) path += "index.html";

    // If path has no extension, add /index.html (for directories)
    if (!path.includes('.') && path !== "404.html") {
      path += "/index.html";
    }

    const fetchUrl = `${githubRawBase}/${path}`;

    const resp = await fetch(fetchUrl);

    if (!resp.ok) {
      // On 404 serve root 404.html
      const fallbackResp = await fetch(`${githubRawBase}/404.html`);
      if (fallbackResp.ok) {
        return new Response(await fallbackResp.arrayBuffer(), {
          status: 404,
          headers: { "content-type": "text/html" },
        });
      }
      return new Response("File not found", { status: 404 });
    }

    // Content types by extension
    const ext = path.split('.').pop() || "";
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

    const contentType = contentTypes[ext] || "application/octet-stream";
    const body = await resp.arrayBuffer();

    return new Response(body, {
      headers: { "content-type": contentType },
    });
  },
};
