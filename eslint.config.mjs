import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    ".kiro/**",
    ".playwright-mcp/**",
    "infra/**",
  ]),
  {
    rules: {
      // Allow setState in effects for client-side initialization patterns
      "react-hooks/set-state-in-effect": "off",
      // Allow Math.random in useMemo for Three.js particle generation
      "react-hooks/purity": "off",
    },
  },
]);

export default eslintConfig;
