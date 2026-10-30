import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

// Static hosts may serve Astro's HTML redirect instead of the HTTP redirect
// rules. Meta refresh drops the old URL's fragment; carry it (and the query)
// to the destination so bookmarks to sections still reach that section.
const output = fileURLToPath(new URL("../dist/", import.meta.url));
let updated = 0;

async function updateRedirects(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await updateRedirects(path);
      continue;
    }
    if (!entry.name.endsWith(".html")) continue;

    const html = await readFile(path, "utf8");
    const refresh = html.match(/<meta http-equiv="refresh" content="0;url=([^"]+)">/i);
    if (!refresh || html.includes("data-preserve-redirect")) continue;

    // All configured destinations are site paths. Leave other redirects alone.
    const destination = refresh[1];
    if (!destination.startsWith("/") || destination.startsWith("//") || /[&<>]/.test(destination)) continue;
    const script = `<script data-preserve-redirect>const target=new URL(${JSON.stringify(destination)},location.href);if(!target.search)target.search=location.search;if(!target.hash)target.hash=location.hash;location.replace(target.href);</script>`;
    await writeFile(path, html.replace(refresh[0], script + refresh[0]));
    updated++;
  }
}

await updateRedirects(output);
console.log(`Preserved section links and queries in ${updated} static redirects.`);
