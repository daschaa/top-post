#!/usr/bin/env node
import { createSpinner } from 'nanospinner';
import chalk from 'chalk';
import commandLineArgs from 'command-line-args';
import { fetchTopStories, getMultipleItems } from './utils.js';

// @ts-ignore
const prettyPrintTopItems = async (startNum: number, endNum: number): Promise<any> => {
  if (startNum >= endNum) {
    console.error('Start parameter must be less than end parameter');
    return;
  }
  const spinner = createSpinner('🛫 Fetching data...');
  spinner.start();
  const { data } = await fetchTopStories();
  const slicedItems = await getMultipleItems(data.slice(start, end));
  spinner.clear();
  spinner.reset();
  for (let i = startNum; i < endNum; i++) {
    console.log(`${chalk.bgGreen(`Number ${i + 1}`)}`);
    console.log(`Title: ${slicedItems[i].title}`);
    console.log(`URL: ${slicedItems[i].url}`);
  }
};
const optionDefinitions = [
  { name: 'start', alias: 's', type: Number, defaultValue: 0 },
  { name: 'end', alias: 'e', type: Number, defaultValue: 1 },
];
const { start, end } = commandLineArgs(optionDefinitions);
prettyPrintTopItems(start, end);
