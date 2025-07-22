import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import client from '../lib/client.js';

const __filename = fileURLToPath(import.meta.url),
  __dirname = path.dirname(__filename),
  POSTS_DIR = path.join(__dirname, '..', 'olderPosts');

const uploadImage = async imagePath => {
  if (!imagePath) {
    console.log('no image path provided');

    return null;
  }

  const filename = path.basename(imagePath),
    image = await client.fetch(`*[_type == "sanity.imageAsset" && originalFilename == "${filename}"][0]`);

  if (image) {
    return image;
  }

  console.log('uploading image', imagePath);

  try {
    // Decode the URL-encoded path
    const decodedPath = decodeURIComponent(imagePath),
      fullPath = path.join(POSTS_DIR, decodedPath),
      buffer = await fs.readFile(fullPath);

    return client.assets.upload('image', buffer, {
      preserveFilename: true,
      filename,
    });
  } catch (err) {
    console.error(`Error reading image file ${imagePath}:`, err);

    return null;
  }
};

export default uploadImage;
