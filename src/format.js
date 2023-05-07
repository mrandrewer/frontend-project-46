import _ from 'lodash';

const getIndent = (indent) => ' '.repeat(indent * 4);

const getTypeStr = (elem) => {
  switch (elem.type) {
    case 'add':
      return '+';
    case 'remove':
      return '-';
    default:
      return ' ';
  }
};

const getValueStr = (value, indent) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const str = _.orderBy(_.keys(value))
    .map((key) => `${getIndent(indent + 1)}${key}: ${getValueStr(value[key], indent + 1)}`);
  return ['{', ...str, `${getIndent(indent)}}`].join('\n');
};

const formatStylish = (diff, indent = 0) => {
  const str = _.orderBy(diff, ['key', 'type'], ['asc', 'desc'])
    .map((elem) => {
      const valueStr = elem.children !== null
        ? formatStylish(elem.children, indent + 1)
        : getValueStr(elem.value, indent + 1);
      return `${getIndent(indent)}  ${getTypeStr(elem)} ${elem.key}: ${valueStr}`;
    });
  return ['{', ...str, `${getIndent(indent)}}`].join('\n');
};

const format = (diff, type = 'stylish') => {
  switch (type.toLowerCase()) {
    case 'stylish':
      return formatStylish(diff);
    default:
      throw new Error('Unknown format type');
  }
};

export default format;
