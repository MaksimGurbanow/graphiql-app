import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    reporters: ["default", "verbose"],
    coverage: {
      exclude: [
        'app/types/types.ts',
        'vite.config.cjs',
        'vitest.config.ts',
        'i18next.d.ts',
        'vite.config.ts',
        '.eslintrc.cjs',
        'graphiql-app/app/types/index.d.ts',
        'app/types/index.d.ts',
        '**/*.d.ts'
      ],
    },
  },
});
