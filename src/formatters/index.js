import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJSON from './json.js';

const getFormatter = (formatName) => {
  switch (formatName.toLowerCase()) {
    case 'stylish':
      return formatStylish;
    case 'plain':
      return formatPlain;
    case 'json':
      return formatJSON;
    default:
      throw new Error('Unknown format');
  }
};

export default getFormatter;
