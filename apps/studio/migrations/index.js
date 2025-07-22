import generateSanityRecords from '../migrations/scripts/generateSanityRecords.js';

const run = async () => {
  const models = await fetch('https://fireworks.ai/api/models').then(res => res.json());
  generateSanityRecords(models, false);
};

run();
