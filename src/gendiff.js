import readFile from './readFile.js';
import getDiff from './getdiff.js';
import format from './format.js';

const gendiff = (filepath1, filepath2) => {
  const obj1 = readFile(filepath1);
  const obj2 = readFile(filepath2);
  const diff = getDiff(obj1, obj2);
  return format(diff);
};

export default gendiff;
