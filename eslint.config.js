// eslint.config.js
import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import tseslint from 'typescript-eslint'
import importX from 'eslint-plugin-import-x'
import unusedImports from 'eslint-plugin-unused-imports'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  // Ignorar pasta de build/cache
  { ignores: ['dist', 'node_modules', 'coverage'] },

  // Base JS recomendada
  js.configs.recommended,

  // Config principal para TS + Vue
  {
    files: ['**/*.{ts,js,vue}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
        // Ative estas 2 linhas **DEPOIS** de tudo estável para regras type-aware:
        // project: './tsconfig.json',
        // tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
      },
    },
    plugins: {
      vue,
      '@typescript-eslint': tseslint.plugin,
      'import-x': importX,
      'unused-imports': unusedImports,
    },
    settings: {
      // Resolve alias @ e extensões .vue
      'import-x/resolver': {
        typescript: { project: './tsconfig.json' },
        node: { extensions: ['.js', '.ts', '.vue'] },
      },
    },
    rules: {
      // TS/JS
      ...tseslint.configs.recommended[0].rules,
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],

      // Vue 3
      ...vue.configs['vue3-recommended'].rules,
      'vue/multi-word-component-names': 'off', // nomes de componentes em pt podem ser 1 palavra (App, etc.)
      'vue/require-prop-types': 'off',         // usamos TS para tipagem de props
      'vue/no-mutating-props': 'error',
      'vue/no-unused-components': 'warn',

      // Imports
      'import-x/no-unresolved': 'error',
      'import-x/no-duplicates': 'warn',
      'import-x/order': ['warn', {
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
        alphabetize: { order: 'asc', caseInsensitive: true },
      }],

      // Limpeza de imports
      'unused-imports/no-unused-imports': 'warn',
    },
  },

  // Desabilita qualquer regra de formatação que conflite com Prettier
  eslintConfigPrettier,
]
