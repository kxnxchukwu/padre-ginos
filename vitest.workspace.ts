import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    extends: "vite.config.ts",
    test: {
      environment: "happy-dom",
      name: "happy-dom",
      include: ["**/*.node.test.(ts|tsx)"],
    },
  },
  {
    extends: "vite.config.ts",
    test: {
      setupFiles: ["vitest-browser-react"],
      name: "browser",
      include: ["**/*.browser.test.(ts|tsx)"],
      browser: {
        provider: "playwright",
        enabled: true,
        name: "chromium",
      },
    },
  },
]);
