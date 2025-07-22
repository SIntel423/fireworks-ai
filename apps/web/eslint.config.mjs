import eslintConfig from '@packages/eslint/web';

/** @type {import("eslint").Linter.Config} */
export default [
  ...eslintConfig,
  {
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
          pathGroups: [
            { pattern: '@packages/**', group: 'internal', position: 'after' },
            { pattern: 'assets/**', group: 'internal', position: 'after' },
            { pattern: 'atoms/**', group: 'internal', position: 'after' },
            { pattern: 'molecules/**', group: 'internal', position: 'after' },
            { pattern: 'organisms/**', group: 'internal', position: 'after' },
            { pattern: 'components/**', group: 'internal', position: 'after' },
            { pattern: 'layout/**', group: 'internal', position: 'after' },
            { pattern: 'global/**', group: 'internal', position: 'after' },
            { pattern: 'templates/**', group: 'internal', position: 'after' },
            { pattern: 'lib/**', group: 'internal', position: 'after' },
            { pattern: 'utils/**', group: 'internal', position: 'after' },
            { pattern: 'constants/**', group: 'internal', position: 'after' },
            { pattern: 'data/**', group: 'internal', position: 'after' },
            { pattern: 'theme/**', group: 'internal', position: 'after' },
          ],
          pathGroupsExcludedImportTypes: ['builtin', 'type'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
          },
        },
      ],
    },
  },
];
