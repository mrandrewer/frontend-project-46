import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { readFileSync } from 'node:fs';
import path from 'path';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const file1 = getFixturePath('file1.yml');
const file2 = getFixturePath('file2.yaml');
const expected1 = readFileSync(getFixturePath('result.txt'), 'utf8').trimEnd();

test('compare yaml files', () => {
  expect(gendiff(file1, file2)).toBe(expected1);
});
