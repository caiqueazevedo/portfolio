import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Fully static site with one route handler: no incremental cache, no queue, no tag cache.
export default defineCloudflareConfig({});
