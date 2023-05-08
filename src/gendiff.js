import path from 'node:path';
import readFile from './readFile.js';
import getParser from './parsers/index.js';
import getDiff from './getdiff.js';
import getFormatter from './formatters/index.js';

const readData = (filepath) => {
  const parse = getParser(path.extname(filepath));
  return parse(readFile(filepath));
};

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const obj1 = readData(filepath1);
  const obj2 = readData(filepath2);
  const diff = getDiff(obj1, obj2);
  const format = getFormatter(formatName);
  return format(diff);
};

export default gendiff;
