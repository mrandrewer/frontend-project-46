import yaml from 'js-yaml';

const parseJSON = (data) => JSON.parse(data);

const parseYML = (data) => yaml.load(data);

const getParser = (format) => {
  switch (format.toLowerCase()) {
    case '.yml':
    case '.yaml':
      return parseYML;
    case '.json':
      return parseJSON;
    default:
      throw new Error(`Unknown data type ${format}`);
  }
};

export default getParser;
