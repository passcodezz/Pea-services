import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      exportAsDefault: false,
      svgrOptions: {},
      esbuildOptions: {},
      include: "**/*.svg",
      exclude: "",
    }),
  ],
  envDir: "./src/config/environments",
  envPrefix: "PUBLIC",
  resolve: {
    alias: [
      {
        find: "@elements",
        replacement: path.resolve(__dirname, "src/components/elements"),
      },
      {
        find: "@layouts",
        replacement: path.resolve(__dirname, "src/components/layouts"),
      },
      {
        find: "@config",
        replacement: path.resolve(__dirname, "src/config"),
      },
      {
        find: "@pages",
        replacement: path.resolve(__dirname, "src/pages"),
      },
      {
        find: "@assets",
        replacement: path.resolve(__dirname, "src/assets"),
      },
      {
        find: "@constants",
        replacement: path.resolve(__dirname, "src/constants"),
      },
      {
        find: "@store",
        replacement: path.resolve(__dirname, "src/redux/store"),
      },
      {
        find: "@api",
        replacement: path.resolve(__dirname, "src/redux/api"),
      },
      {
        find: "@utils",
        replacement: path.resolve(__dirname, "src/utils"),
      },
      {
        find: "@modals",
        replacement: path.resolve(__dirname, "src/modals"),
      },
      {
        find: "@modules",
        replacement: path.resolve(__dirname, "src/components/modules"),
      },
      {
        find: "@contexts",
        replacement: path.resolve(__dirname, "src/contexts"),
      },
      {
        find: "@hooks",
        replacement: path.resolve(__dirname, "src/hooks"),
      },
      {
        find: "@hoc",
        replacement: path.resolve(__dirname, "src/hoc"),
      },
      {
        find: "@redux",
        replacement: path.resolve(__dirname, "src/redux"),
      },
    ],
  },
});
