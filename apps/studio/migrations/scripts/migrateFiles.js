import convertMDtoVFile from '../scripts/convertMDtoVFile.js';
import extractMDfromFile from '../scripts/extractMDfromFile.js';
import globMDFiles from '../scripts/globMDFiles.js';

const migrateFiles = async () => {
  const files = await globMDFiles(),
    mdDocuments = await Promise.all(files.map(extractMDfromFile)),
    vFiles = await Promise.all(mdDocuments.map(convertMDtoVFile));

  return vFiles;
};

export default migrateFiles;
