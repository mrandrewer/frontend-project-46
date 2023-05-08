import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const file1 = getFixturePath('file1.yml');
const file2 = getFixturePath('file2.txt');

test('check error on unknown file type', () => {
  expect(() => gendiff(file1, file2)).toThrow('Unknown data type');
});
