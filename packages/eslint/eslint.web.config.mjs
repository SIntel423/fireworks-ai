import baseConfig from './eslint.base.config.mjs';
import tseslint from 'typescript-eslint';
// import compat from './compat.mjs';

export default tseslint.config(
  ...[
    ...baseConfig,
    // ...compat.config({
    //   extends: ['plugin:@next/next/recommended'],
    // }),
  ],
);
