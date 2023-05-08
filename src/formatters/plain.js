import _ from 'lodash';

const getFullPath = (key, parent) => (parent === '' ? key : `${parent}.${key}`);

const getValueStr = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return `${value}`;
};

const formatPlain = (diff) => {
  const iter = (records, parent = '') => _.orderBy(records, ['key'])
    .map((elem) => {
      switch (elem.type) {
        case 'add':
          return `Property '${getFullPath(elem.key, parent)}' was added `
            + `with value: ${getValueStr(elem.newValue)}`;
        case 'remove':
          return `Property '${getFullPath(elem.key, parent)}' was removed`;
        case 'equal':
          return null;
        case 'update':
          return `Property '${getFullPath(elem.key, parent)}' was updated. `
            + `From ${getValueStr(elem.oldValue)} to ${getValueStr(elem.newValue)}`;
        case 'nested':
          return iter(elem.children, getFullPath(elem.key, parent));
        default:
          throw new Error('Unknown record type in diff');
      }
    })
    .flat(Infinity)
    .filter((e) => e !== null)
    .join('\n');

  return iter(diff);
};

export default formatPlain;
