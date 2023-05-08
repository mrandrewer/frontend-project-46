import formatStylish from './stylish.js';

const format = (diff, type) => {
  switch (type.toLowerCase()) {
    case 'stylish':
      return formatStylish(diff);
    default:
      throw new Error('Unknown format');
  }
};

export default format;
