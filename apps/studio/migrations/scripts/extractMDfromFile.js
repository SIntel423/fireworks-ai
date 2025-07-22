import { readFile } from 'fs';

const extractMDfromFile = async filePath => {
  const mdContent = await new Promise((resolve, _) =>
    readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        throw Error(err);
      }

      return resolve(data);
    }),
  );

  return mdContent;
};

export default extractMDfromFile;
