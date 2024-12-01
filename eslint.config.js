import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import leonard from "eslint-config-leonardjouve"

export default [
    {languageOptions: {globals: globals.browser}},
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...leonard.configs.recommended,
];
