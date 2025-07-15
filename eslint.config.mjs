import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import nextPlugin from "@next/eslint-plugin-next"; // Next.jsプラグインをインポート

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
    // ここで無視するパスを指定します
    ignores: [
      "lib/generated/prisma/", // Prisma の自動生成ファイルを無視
      // "app/components/formSchema.tsx" // もしファイル削除後にまだパスが残るようなら一時的に追加
    ],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  // Next.js の推奨設定を追加
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      // 必要に応じて ESLint ルールをカスタマイズ
      "@typescript-eslint/no-unused-vars": [
        "warn", // エラーではなく警告にする
        {
          "argsIgnorePattern": "^_", // アンダースコアで始まる引数は無視
          "varsIgnorePattern": "^_" // アンダースコアで始まる変数は無視
        }
      ],
      "react/react-in-jsx-scope": "off" // Next.js 15+では不要なので無効
    }
  }
];