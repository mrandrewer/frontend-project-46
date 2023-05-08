import { test, expect, beforeAll } from '@jest/globals';
import { fileURLToPath } from 'url';
import { readFileSync } from 'node:fs';
import path from 'path';
import gendiff from '../index.js';

let file1json;
let file2json;
let file1yaml;
let file2yaml;
let file2txt;
let expectedStylish;
let expectedPlain;
let expectedJSON;

beforeAll(() => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

  file1json = getFixturePath('file1.json');
  file2json = getFixturePath('file2.json');
  file1yaml = getFixturePath('file1.yml');
  file2yaml = getFixturePath('file2.yaml');
  file2txt = getFixturePath('file2.txt');
  expectedStylish = readFileSync(getFixturePath('resultStylish.txt'), 'utf8').trimEnd();
  expectedPlain = readFileSync(getFixturePath('resultPlain.txt'), 'utf8').trimEnd();
  expectedJSON = readFileSync(getFixturePath('resultJSON.txt'), 'utf8').trimEnd();
});

test('compare json files with stylish format', () => {
  expect(gendiff(file1json, file2json, 'stylish')).toBe(expectedStylish);
});

test('compare json files with plain format', () => {
  expect(gendiff(file1json, file2json, 'plain')).toBe(expectedPlain);
});

test('compare json files with json format', () => {
  expect(gendiff(file1json, file2json, 'json')).toBe(expectedJSON);
});

test('compare yaml files with stylish format', () => {
  expect(gendiff(file1yaml, file2yaml, 'stylish')).toBe(expectedStylish);
});

test('compare yaml files with plain format', () => {
  expect(gendiff(file1yaml, file2yaml, 'plain')).toBe(expectedPlain);
});

test('compare yaml files with plain format', () => {
  expect(gendiff(file1yaml, file2yaml, 'json')).toBe(expectedJSON);
});

test('compare files with default format', () => {
  expect(gendiff(file1json, file2json)).toBe(expectedStylish);
});

test('check error on unknown file type', () => {
  expect(() => gendiff(file1json, file2txt)).toThrow('Unknown data type');
});

test('check error on unknown format', () => {
  expect(() => gendiff(file1json, file2json, 'formatDoesNotExist')).toThrow('Unknown format');
});
