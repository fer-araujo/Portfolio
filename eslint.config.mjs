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
  ]),
  // Test files: disable display-name for mock components
  {
    files: ["tests/**"],
    rules: {
      "react/display-name": "off",
      "@next/next/no-img-element": "off",
    },
  },
]);

export default eslintConfig;
