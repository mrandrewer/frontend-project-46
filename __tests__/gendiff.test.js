import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import { readFileSync } from 'node:fs';
import path from 'path';
import gendiff from '../index.js';

// [Crutch]
// Линтер hexlet-check на гитхабе запрещает переменные даже в тестах
// Использование beforeAll поломало проверку, хотя в теории пример приводится как раз через let
// https://ru.hexlet.io/courses/js-testing/lessons/setup/theory_unit

describe('test gendiff', () => {
  const getFixturePath = (filename) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    return path.join(__dirname, '..', '__fixtures__', filename);
  };

  const file1json = getFixturePath('file1.json');
  const file2json = getFixturePath('file2.json');
  const file1yaml = getFixturePath('file1.yml');
  const file2yaml = getFixturePath('file2.yaml');
  const file2txt = getFixturePath('file2.txt');

  const expectedStylish = readFileSync(getFixturePath('resultStylish.txt'), 'utf8').trimEnd();
  const expectedPlain = readFileSync(getFixturePath('resultPlain.txt'), 'utf8').trimEnd();
  const expectedJSON = readFileSync(getFixturePath('resultJSON.txt'), 'utf8').trimEnd();

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

  test('compare yaml files with json format', () => {
    expect(gendiff(file1yaml, file2yaml, 'json')).toBe(expectedJSON);
  });

  test('compare files with default format', () => {
    expect(gendiff(file1json, file2json)).toBe(expectedStylish);
  });

  test('check error on unknown data type', () => {
    expect(() => gendiff(file1json, file2txt)).toThrow('Unknown data type .txt');
  });

  test('check error on unknown format', () => {
    expect(() => gendiff(file1json, file2json, 'formatDoesNotExist')).toThrow('Unknown format formatDoesNotExist');
  });
});
