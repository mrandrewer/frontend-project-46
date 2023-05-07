import path from 'node:path';
import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';

const parseJSON = (str) => JSON.parse(str);

const parseYML = (str) => yaml.load(str);

const getData = (filePath) => readFileSync(filePath, 'utf8');

const readFile = (filePath) => {
  const normalizedPath = path.resolve(filePath);
  switch (path.extname(normalizedPath).toLowerCase()) {
    case '.yml':
    case '.yaml':
      return parseYML(getData(normalizedPath));
    case '.json':
      return parseJSON(getData(normalizedPath));
    default:
      throw new Error('Unknown file format');
  }
};

export default readFile;
