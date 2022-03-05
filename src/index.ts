#!/usr/bin/env node
import { createSpinner } from 'nanospinner';
import chalk from 'chalk';
import commandLineArgs from 'command-line-args';
import { fetchTopStories, getMultipleItems } from './utils.js';

const printItemsToConsole = (start: number, end: number, slicedItems: any[]) => {
  for (let i = start; i < end; i++) {
    console.log(`${chalk.green(`Number ${i + 1}`)}`);
    console.log(`Title: ${slicedItems[i].title}`);
    if (slicedItems[i].url) {
      console.log(`URL: ${slicedItems[i].url}`);
    } else if (slicedItems[i].text) {
      console.log(`Text: ${slicedItems[i].text}`);
    }
  }
};

// @ts-ignore
const prettyPrintTopItems = async (start: number, end: number): Promise<any> => {
  if (start >= end) {
    console.error('Start parameter must be less than end parameter');
    return;
  }
  const spinner = createSpinner('🛫 Fetching data...');
  spinner.start();
  const { data } = await fetchTopStories();
  const slicedItems = await getMultipleItems(data.slice(start, end));
  spinner.clear();
  spinner.reset();
  printItemsToConsole(start, end, slicedItems);
};
const optionDefinitions = [
  { name: 'start', alias: 's', type: Number, defaultValue: 0 },
  { name: 'end', alias: 'e', type: Number, defaultValue: 1 },
];

const { start, end } = commandLineArgs(optionDefinitions, {
  partial: true,
  caseInsensitive: true,
});
prettyPrintTopItems(start, end);
