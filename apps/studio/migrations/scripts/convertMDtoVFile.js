import frontmatter from 'remark-frontmatter';
import gfm from 'remark-gfm';
import html from 'remark-html';
import markdown from 'remark-parse';
import { unified } from 'unified';
import { parse as yaml } from 'yaml';

const extractFrontmatter = () => (tree, file) => {
  const yamls = [];
  tree.children.forEach((node, index) => {
    if (node.type === 'yaml') {
      try {
        const processedYaml = node.value
          .split('\n')
          .map(line => {
            const [key, ...valueParts] = line.split(':');
            if (!key || !valueParts.length) return line;

            const value = valueParts.join(':').trim();
            if (value.includes(':') && !value.startsWith('"') && !value.startsWith("'")) {
              return `${key}: "${value.replace(/"/g, '\\"')}"`;
            }

            return line;
          })
          .join('\n');

        yamls.push(yaml(processedYaml));
        tree.children.splice(index, 1);
      } catch (err) {
        console.error('Error parsing frontmatter:', err);
        file.message('Error parsing frontmatter');
      }
    }
  });
  file.data.frontmatter = yamls[0] || {};
};

const convertMDtoVFile = async markdownContent => {
  const vfile = await unified()
    .use(markdown)
    .use(frontmatter, ['yaml'])
    .use(extractFrontmatter)
    .use(gfm)
    .use(html)
    .process(markdownContent);

  return {
    html: vfile.value,
    frontmatter: vfile.data.frontmatter,
  };
};

export default convertMDtoVFile;
