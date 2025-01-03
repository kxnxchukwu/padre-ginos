import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default ({ mode }: { mode: string }) => {
  const loadedEnv = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          changeOrigin: true,
        },
      },
    },
    plugins: [
      TanStackRouterVite(),
      react({
        babel: {
          plugins: [
            [
              "babel-plugin-react-compiler",
              {
                target: "19",
              },
            ],
          ],
        },
      }),
    ],
    define: {
      "import.meta.env.VITE_API_URL": JSON.stringify(loadedEnv.VITE_API_URL),
    },
  });
};
