import path from 'node:path';
import { readFileSync } from 'node:fs';

const readFile = (filePath) => {
  const normalizedPath = path.resolve(filePath);
  return readFileSync(normalizedPath, 'utf8');
};

export default readFile;
