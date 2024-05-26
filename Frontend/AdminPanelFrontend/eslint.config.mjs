import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
	{
		ignores: ['./node_modules/*', 'eslint.config.mjs', 'src/presets/*'],
	},
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	...pluginVue.configs['flat/recommended'],
	eslintConfigPrettier,
	{
		plugins: {
			'typescript-eslint': tseslint.plugin,
		},
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser,
				extraFileExtensions: ['.vue'],
				sourceType: 'module',
			},
		},
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			'no-dupe-keys': 'off',
		},
	}
);
