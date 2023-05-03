import path from 'node:path';
import { readFileSync } from 'node:fs';
import _ from 'lodash';

const removePrefix = '-';
const addPrefix = '+';
const equalPrefix = ' ';

const getFileFields = (filePath, prefix) => {
  const json = JSON.parse(readFileSync(path.resolve(filePath), 'utf8'));
  return Object.entries(json).map((e) => ({ key: e[0], value: e[1], prefix }));
};

const gendiff = (filepath1, filepath2) => {
  const fields1 = getFileFields(filepath1, removePrefix);
  const fields2 = getFileFields(filepath2, addPrefix);
  const diff = _.orderBy(
    [...new Set([...fields1, ...fields2])],
    ['key', 'prefix'],
    ['asc', 'desc'],
  )
    .reduce((acc, elem) => {
      const lastItem = acc.at(-1);
      if (lastItem === undefined
        || lastItem.key !== elem.key
        || (lastItem.key === elem.key && lastItem.value !== elem.value)) {
        return [...acc, elem];
      }
      lastItem.prefix = equalPrefix;
      return [...acc];
    }, [])
    .map((elem) => `  ${elem.prefix} ${elem.key}: ${elem.value}`);
  return ['{', ...diff, '}'].join('\n');
};

export default gendiff;
