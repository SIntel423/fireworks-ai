import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: 'pv37i0yn',
    dataset: 'production',
  },
  vite: {
    resolve: {
      alias: {
        '@': __dirname,
      },
    },
  },
});
