import _ from 'lodash';

const createAddRecord = (key, value) => ({
  type: 'add', key, newValue: value,
});

const createRemoveRecord = (key, value) => ({
  type: 'remove', key, oldValue: value,
});

const createUpdateRecord = (key, oldValue, newValue) => ({
  type: 'update', key, oldValue, newValue,
});

const createEqualRecord = (key, value) => ({
  type: 'equal', key, newValue: value, oldValue: value,
});

const createNestedRecord = (key, children) => ({
  type: 'nested', key, children,
});

const getDiff = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const allKeys = _.union(keys1, keys2);
  return allKeys.map((key) => {
    if (!keys1.includes(key)) {
      return createAddRecord(key, obj2[key]);
    }
    if (!keys2.includes(key)) {
      return createRemoveRecord(key, obj1[key]);
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return createNestedRecord(key, getDiff(obj1[key], obj2[key]));
    }
    if (obj1[key] === obj2[key]) {
      return createEqualRecord(key, obj1[key]);
    }
    return createUpdateRecord(key, obj1[key], obj2[key]);
  });
};

export default getDiff;
