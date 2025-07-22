module.exports = {
  extends: ['@commitlint/config-conventional'],
  ignores: [message => message.startsWith('WIP')],
   rules: {
    'footer-max-line-length': [0, 'always'],
  },
};
