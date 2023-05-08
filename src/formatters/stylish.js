import _ from 'lodash';

const getPrefix = (level, type = null) => {
  switch (type) {
    case 'add':
      return `${' '.repeat(level * 4 - 2)}+ `;
    case 'remove':
      return `${' '.repeat(level * 4 - 2)}- `;
    default:
      return ' '.repeat(level * 4);
  }
};

const getValueStr = (value, indent) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const str = _.orderBy(_.keys(value))
    .map((key) => `${getPrefix(indent + 1)}${key}: ${getValueStr(value[key], indent + 1)}`);
  return ['{', ...str, `${getPrefix(indent)}}`].join('\n');
};

const getLine = (indent, type, key, value) => `${getPrefix(indent, type)}${key}: ${getValueStr(value, indent)}`;

const formatStylish = (diff) => {
  const iter = (records, indent) => {
    const str = _.orderBy(records, ['key'])
      .flatMap((elem) => {
        switch (elem.type) {
          case 'add':
          case 'equal':
            return getLine(indent, elem.type, elem.key, elem.newValue);
          case 'remove':
            return getLine(indent, elem.type, elem.key, elem.oldValue);
          case 'update':
            return [
              getLine(indent, 'remove', elem.key, elem.oldValue),
              getLine(indent, 'add', elem.key, elem.newValue),
            ];
          case 'nested':
            return getLine(indent, elem.type, elem.key, iter(elem.children, indent + 1));
          default:
            throw new Error('Unknown record type in diff');
        }
      });
    return ['{', ...str, `${getPrefix(indent - 1)}}`].join('\n');
  };

  return iter(diff, 1);
};

export default formatStylish;
