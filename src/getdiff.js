import _ from 'lodash';

const createDiffRecord = (type, key, value, children = null) => ({
  type, key, value, children,
});

const getDiff = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const allKeys = _.union(keys1, keys2);
  return allKeys.reduce((acc, elem) => {
    if (!keys2.includes(elem)) {
      return [...acc, createDiffRecord('remove', elem, obj1[elem])];
    }
    if (!keys1.includes(elem)) {
      return [...acc, createDiffRecord('add', elem, obj2[elem])];
    }
    if (_.isObject(obj1[elem]) && _.isObject(obj2[elem])) {
      return [...acc, createDiffRecord('none', elem, null, getDiff(obj1[elem], obj2[elem]))];
    }
    if (obj1[elem] === obj2[elem]) {
      return [...acc, createDiffRecord('none', elem, obj1[elem])];
    }
    return [...acc,
      createDiffRecord('remove', elem, obj1[elem]),
      createDiffRecord('add', elem, obj2[elem])];
  }, []);
};

export default getDiff;
