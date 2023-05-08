import _ from 'lodash';

const getValueStr = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return `${value}`;
};

const formatPlain = (diff) => {
  const iter = (records, parent = '') => _.orderBy(records, ['key'])
    .map((elem) => {
      const fullName = parent === '' ? elem.key : `${parent}.${elem.key}`;
      switch (elem.type) {
        case 'add':
          return `Property '${fullName}' was added with value: ${getValueStr(elem.children[0])}`;
        case 'remove':
          return `Property '${fullName}' was removed`;
        case 'none':
          return null;
        case 'update':
          return `Property '${fullName}' was updated. From ${getValueStr(elem.children[0])} to ${getValueStr(elem.children[1])}`;
        case 'nested':
          return iter(elem.children[0], fullName);
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
