import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { readFileSync } from 'node:fs';
import path from 'path';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const file1json = getFixturePath('file1.json');
const file2json = getFixturePath('file2.json');
const file1yaml = getFixturePath('file1.yml');
const file2yaml = getFixturePath('file2.yaml');
const expectedStylish = readFileSync(getFixturePath('resultStylish.txt'), 'utf8').trimEnd();
const expectedPlain = readFileSync(getFixturePath('resultPlain.txt'), 'utf8').trimEnd();

test('compare json files with stylish format', () => {
  expect(gendiff(file1json, file2json, 'stylish')).toBe(expectedStylish);
});

test('compare json files with plain format', () => {
  expect(gendiff(file1json, file2json, 'plain')).toBe(expectedPlain);
});

test('compare yaml files with stylish format', () => {
  expect(gendiff(file1yaml, file2yaml, 'stylish')).toBe(expectedStylish);
});

test('compare yaml files with plain format', () => {
  expect(gendiff(file1yaml, file2yaml, 'plain')).toBe(expectedPlain);
});
