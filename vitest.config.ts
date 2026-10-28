import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.{ts,tsx}"],
    environment: "jsdom",
    // React 17 has no package "exports", needed for MUI
    server: { deps: { inline: [/@mui/] } },
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/*.test.{ts,tsx}", "src/**/*.d.ts", "src/lang/**"],
      reporter: ["text-summary", "html"],
    },
  },
});
