import path from 'node:path';
import readFile from './readFile.js';
import getParser from './parsers/index.js';
import getDiff from './getdiff.js';
import getFormatter from './formatters/index.js';

const readData = (filepath) => {
  const parser = getParser(path.extname(filepath));
  return parser(readFile(filepath))
}

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const obj1 = readData(filepath1);
  const obj2 = readData(filepath2);
  const diff = getDiff(obj1, obj2);
  const formatter = getFormatter(formatName)
  return formatter(diff);
};

export default gendiff;
