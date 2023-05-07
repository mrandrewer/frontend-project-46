import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { readFileSync } from 'node:fs';
import path from 'path';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const file1 = getFixturePath('flatFile1.json');
const file2 = getFixturePath('flatFile2.json');
const expected1 = readFileSync(getFixturePath('flatResult.txt'), 'utf8').trimEnd();

test('compare flat json files', () => {
  expect(gendiff(file1, file2)).toBe(expected1);
});
