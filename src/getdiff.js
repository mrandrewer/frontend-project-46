import _ from 'lodash';

const createDiffRecord = (type, key, ...children) => ({
  type, key, children,
});

const getDiff = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const allKeys = _.union(keys1, keys2);
  return allKeys.reduce((acc, key) => {
    if (!keys2.includes(key)) {
      return [...acc, createDiffRecord('remove', key, obj1[key])];
    }
    if (!keys1.includes(key)) {
      return [...acc, createDiffRecord('add', key, obj2[key])];
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return [...acc, createDiffRecord('nested', key, getDiff(obj1[key], obj2[key]))];
    }
    if (obj1[key] === obj2[key]) {
      return [...acc, createDiffRecord('none', key, obj1[key])];
    }
    return [...acc, createDiffRecord('update', key, obj1[key], obj2[key])];
  }, []);
};

export default getDiff;
