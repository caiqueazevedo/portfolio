import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],

    server: { deps: { inline: ["next-intl"] } },
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["node_modules", ".next", ".open-next"],
    coverage: {
      provider: "v8",
      include: ["app/**", "components/**", "lib/**"],
      exclude: ["**/*.test.*", "**/layout.tsx"],
    },
  },
  resolve: {
    alias: [
      { find: "@", replacement: fileURLToPath(new URL(".", import.meta.url)) },

      { find: /^next\/navigation$/, replacement: "next/navigation.js" },
    ],
  },
});
