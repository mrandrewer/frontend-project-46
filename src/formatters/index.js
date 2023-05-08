import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const getFormatter = (formatName) => {
  switch (formatName.toLowerCase()) {
    case 'stylish':
      return formatStylish;
    case 'plain':
      return formatPlain;
    default:
      throw new Error('Unknown format');
  }
};

export default getFormatter;
