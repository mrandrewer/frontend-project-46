import path from 'node:path';
import { readFileSync } from 'node:fs';

const gendiff = (filepath1, filepath2) => {
  const json1 = readFileSync(path.resolve(filepath1), 'utf8');
  const json2 = readFileSync(path.resolve(filepath2), 'utf8');
  console.log(json1);
  console.log(json2);
};

export default gendiff;
