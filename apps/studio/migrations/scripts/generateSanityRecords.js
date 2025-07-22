import PQueue from 'p-queue';

import client from '../lib/client.js';
import convertToSanityDocument from '../scripts/convertToSanityDocument.js';

const queue = new PQueue({
  concurrency: 2,
  interval: 1000 / 25,
});

const createRecord = async (record, ind) => {
  const sanityRecord = await convertToSanityDocument(record, ind);

  client
    .createOrReplace(sanityRecord, { autoGenerateArrayKeys: true })
    .then(() => console.log(`Blog ${sanityRecord._id} created with title: ${sanityRecord.postTitle}`));
};

const generateSanityRecords = (data, test) => {
  const records = test ? [data.find(record => record.id === 'deepseek-r1')] : data;

  // console.log(data.filter(record => record.provider?.hf));
  // console.log([...new Set(data.filter(record => record.provider?.hf).map(record => record.provider.hf))]);
  // const allTags = data.reduce((acc, record) => [...acc, ...record.tags], []);
  // console.log([...new Set(allTags)]);
  // console.log(data.map(record => record.featured));

  records.forEach((record, ind) => queue.add(async () => await createRecord(record, ind)));
};

export default generateSanityRecords;
