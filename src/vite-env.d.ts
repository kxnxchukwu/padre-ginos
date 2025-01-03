declare module "@tanstack/router-plugin/vite";
declare module "@tanstack/react-router";
declare module "@tanstack/router-devtools";

interface ImportMeta {
  env: {
    VITE_API_URL: string;
  };
}
