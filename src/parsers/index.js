import yaml from 'js-yaml';

const parseJSON = (str) => JSON.parse(str);

const parseYML = (str) => yaml.load(str);

const parseData = (data, format) => {
  switch (format.toLowerCase()) {
    case '.yml':
    case '.yaml':
      return parseYML(data);
    case '.json':
      return parseJSON(data);
    default:
      throw new Error('Unknown data type');
  }
};

export default parseData;
