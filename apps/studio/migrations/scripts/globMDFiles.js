import { globby } from 'globby';

const globMDFiles = async () => {
  const files = await globby('migrations/olderPosts/content/**.md'),
    filteredFiles = files.filter(file => !file.includes('posts/Untitled'));

  return filteredFiles;
};

export default globMDFiles;
