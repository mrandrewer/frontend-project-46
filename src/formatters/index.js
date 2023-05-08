import formatStylish from './stylish.js';

const format = (diff, formatName) => {
  switch (formatName.toLowerCase()) {
    case 'stylish':
      return formatStylish(diff);
    case 'stylish':
      return formatStylish(diff);
    default:
      throw new Error('Unknown format');
  }
};

export default format;
