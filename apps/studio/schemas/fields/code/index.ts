import { defineField } from 'sanity';

const code = defineField({
  name: 'code',
  title: 'Code',
  type: 'code',
  options: {
    language: 'javascript',
    languageAlternatives: [
      { title: 'Javascript', value: 'javascript' },
      { title: 'Typescript', value: 'typescript' },
      { title: 'Python', value: 'python' },
      { title: 'Mermaid', value: 'mermaid' },
      { title: 'JSON', value: 'json' },
      { title: 'HTML', value: 'html' },
      { title: 'CSS', value: 'css' },
      { title: 'SQL', value: 'sql' },
      { title: 'Bash', value: 'bash' },
      { title: 'Text', value: 'text' },
    ],
  },
});

export default code;
