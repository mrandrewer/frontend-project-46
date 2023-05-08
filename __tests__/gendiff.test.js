import { test, expect, beforeAll } from '@jest/globals';
import { fileURLToPath } from 'url';
import { readFileSync } from 'node:fs';
import path from 'path';
import gendiff from '../index.js';

// [Crutch]
// Линтер hexlet-check на гитхабе запрещает переменные даже в тестах
// Использование beforeAll поломало проверку, хотя в теории пример приводится как раз через let
// https://ru.hexlet.io/courses/js-testing/lessons/setup/theory_unit
const testData = {};

beforeAll(() => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

  testData.file1json = getFixturePath('file1.json');
  testData.file2json = getFixturePath('file2.json');
  testData.file1yaml = getFixturePath('file1.yml');
  testData.file2yaml = getFixturePath('file2.yaml');
  testData.file2txt = getFixturePath('file2.txt');
  testData.expectedStylish = readFileSync(getFixturePath('resultStylish.txt'), 'utf8').trimEnd();
  testData.expectedPlain = readFileSync(getFixturePath('resultPlain.txt'), 'utf8').trimEnd();
  testData.expectedJSON = readFileSync(getFixturePath('resultJSON.txt'), 'utf8').trimEnd();
});

test('compare json files with stylish format', () => {
  expect(gendiff(testData.file1json, testData.file2json, 'stylish')).toBe(testData.expectedStylish);
});

test('compare json files with plain format', () => {
  expect(gendiff(testData.file1json, testData.file2json, 'plain')).toBe(testData.expectedPlain);
});

test('compare json files with json format', () => {
  expect(gendiff(testData.file1json, testData.file2json, 'json')).toBe(testData.expectedJSON);
});

test('compare yaml files with stylish format', () => {
  expect(gendiff(testData.file1yaml, testData.file2yaml, 'stylish')).toBe(testData.expectedStylish);
});

test('compare yaml files with plain format', () => {
  expect(gendiff(testData.file1yaml, testData.file2yaml, 'plain')).toBe(testData.expectedPlain);
});

test('compare yaml files with json format', () => {
  expect(gendiff(testData.file1yaml, testData.file2yaml, 'json')).toBe(testData.expectedJSON);
});

test('compare files with default format', () => {
  expect(gendiff(testData.file1json, testData.file2json)).toBe(testData.expectedStylish);
});

test('check error on unknown file type', () => {
  expect(() => gendiff(testData.file1json, testData.file2txt)).toThrow('Unknown data type');
});

test('check error on unknown format', () => {
  expect(() => gendiff(testData.file1json, testData.file2json, 'formatDoesNotExist')).toThrow('Unknown format');
});
