import path from 'node:path';
import readFile from './readFile.js';
import parseData from './parsers/index.js';
import getDiff from './getdiff.js';
import format from './formatters/index.js';

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const obj1 = parseData(readFile(filepath1), path.extname(filepath1));
  const obj2 = parseData(readFile(filepath2), path.extname(filepath2));
  const diff = getDiff(obj1, obj2);
  return format(diff, formatName);
};

export default gendiff;
