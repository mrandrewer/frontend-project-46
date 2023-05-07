import path from 'node:path';
import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';

const readJSON = (filePath) => JSON.parse(readFileSync(filePath, 'utf8'));

const readYML = (filePath) => yaml.load(readFileSync(filePath, 'utf8'));

const readFile = (filePath) => {
  const normalizedPath = path.resolve(filePath);
  switch (path.extname(normalizedPath).toLowerCase()) {
    case '.yml':
    case '.yaml':
      return readYML(normalizedPath);
    case '.json':
      return readJSON(normalizedPath);
    default:
      throw new Error('Unknown file format');
  }
};

export default readFile;
