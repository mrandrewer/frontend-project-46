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
  return allKeys.reduce((acc, key) => {
    let record;
    if (!keys1.includes(key)) {
      record = createAddRecord(key, obj2[key]);
    } else if (!keys2.includes(key)) {
      record = createRemoveRecord(key, obj1[key]);
    } else if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      record = createNestedRecord(key, getDiff(obj1[key], obj2[key]));
    } else if (obj1[key] === obj2[key]) {
      record = createEqualRecord(key, obj1[key]);
    } else {
      record = createUpdateRecord(key, obj1[key], obj2[key]);
    }
    return [...acc, record];
  }, []);
};

export default getDiff;
