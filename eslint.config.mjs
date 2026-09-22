import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendor edilmiş araç kurulumları (ör. Impeccable): kendi paket
    // dosyaları bizim kod standardımıza tabi değil.
    ".claude/**",
    ".github/skills/**",
    ".github/agents/**",
    ".github/hooks/**",
    ".impeccable/**",
  ]),
]);

export default eslintConfig;
