#!/usr/bin/env node
import { program } from 'commander';
import path from 'node:path';
import { readFileSync } from 'node:fs';

const gendiff = (filepath1, filepath2) => {
  const json1 = readFileSync(filepath1, 'utf8');
  const json2 = readFileSync(filepath2, 'utf8');
  console.log(json1);
  console.log(json2);
};

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    gendiff(
      path.resolve(filepath1),
      path.resolve(filepath2),
    );
  });

program.parse();

export default gendiff;
