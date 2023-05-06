import { test, expect } from '@jest/globals';
import gendiff from '../index.js';

test('compare flat files', () => {
  expect(gendiff('samples/file1.json', 'samples/file2.json')).toBe(
`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});
