/* eslint-disable no-console */

import { writeFile } from 'fs';

const writeToFile = ({ filename, sanityDocuments, outputPath }) => {
  const path = `file:///Users/webstacks/Documents/GitHub/fireworks-ai/${outputPath}/${filename.split('.ndjson')[0]}`;

  const preparedDocument = sanityDocuments.reduce((acc, doc) => `${acc}${JSON.stringify(doc)}\n`, '');

  return writeFile(`${path}.ndjson`, preparedDocument, err => {
    if (err) {
      throw new Error(err);
    }
    console.log(`Wrote ${sanityDocuments.length} documents to ${filename}.ndjson`);
  });
};

export default writeToFile;
