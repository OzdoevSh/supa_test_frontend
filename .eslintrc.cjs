module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended', // Рекомендации для TypeScript
    'plugin:react/recommended',              // Рекомендации для React
    'prettier/@typescript-eslint',           // Для совместимости с Prettier
    'plugin:import/typescript',              // Правила импорта для TypeScript
  ],
  parser: '@typescript-eslint/parser',       // Парсер для TypeScript
  parserOptions: {
    ecmaFeatures: {
      jsx: true,                             // Поддержка JSX
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react'],  // Плагины для TypeScript и React
  settings: {
    'import/resolver': {                     // Настройки для разрешения импортируемых модулей
      typescript: {},
    },
    react: {
      version: 'detect',                     // Автоматическое определение версии React
    },
  },
  rules: {
    // Здесь вы можете добавить свои правила или переопределить существующие
    // Например, отключаем принудительное использование 'React.FC'
    'react/function-component-definition': 'off',
  },
};