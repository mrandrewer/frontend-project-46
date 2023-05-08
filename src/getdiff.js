import _ from 'lodash';

const createDiffRecord = (type, key, ...children) => ({
  type, key, children,
});

const getDiff = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const allKeys = _.union(keys1, keys2);
  return allKeys.reduce((acc, key) => {
    let record;
    if (!keys2.includes(key)) {
      record = createDiffRecord('remove', key, obj1[key]);
    } else if (!keys1.includes(key)) {
      record = createDiffRecord('add', key, obj2[key]);
    } else if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      record = createDiffRecord('nested', key, getDiff(obj1[key], obj2[key]));
    } else if (obj1[key] === obj2[key]) {
      record = createDiffRecord('none', key, obj1[key]);
    } else {
      record = createDiffRecord('update', key, obj1[key], obj2[key]);
    }
    return [...acc, record];
  }, []);
};

export default getDiff;
