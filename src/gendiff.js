import _ from 'lodash';
import readFile from './readFile.js';

const removePrefix = '-';
const addPrefix = '+';
const equalPrefix = ' ';

const getFields = (filePath, prefix) => Object.entries(readFile(filePath))
  .map((e) => ({ key: e[0], value: e[1], prefix }));

const gendiff = (filepath1, filepath2) => {
  const fields1 = getFields(filepath1, removePrefix);
  const fields2 = getFields(filepath2, addPrefix);
  const diff = _.orderBy(
    [...new Set([...fields1, ...fields2])],
    ['key', 'prefix'],
    ['asc', 'desc'],
  )
    .reduce((acc, elem) => {
      const last = acc.at(-1);
      if (last === undefined
        || last.key !== elem.key
        || (last.key === elem.key && last.value !== elem.value)) {
        return [...acc, elem];
      }
      return [...acc.slice(0, -1), { key: last.key, value: last.value, prefix: equalPrefix }];
    }, [])
    .map((elem) => `  ${elem.prefix} ${elem.key}: ${elem.value}`);
  return ['{', ...diff, '}'].join('\n');
};

export default gendiff;
