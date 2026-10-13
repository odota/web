import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.{ts,tsx}"],
    environment: "jsdom",
    // React 17 has no package "exports", so Node can't resolve the
    // `react/jsx-runtime` import inside MUI's ESM build; let Vite handle it.
    server: { deps: { inline: [/@mui/] } },
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/*.test.{ts,tsx}", "src/**/*.d.ts", "src/lang/**"],
      reporter: ["text-summary", "html"],
    },
  },
});
