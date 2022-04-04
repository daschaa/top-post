#!/usr/bin/env node
import { createSpinner } from 'nanospinner';
import chalk from 'chalk';
import commandLineArgs from 'command-line-args';
import { fetchTopStories, getMultipleItems } from './utils.js';

const printItemsToConsole = (start: number, end: number, slicedItems: any[]) => {
  console.log(`+---`);
  for (let i = start; i < end; i++) {
    const title = slicedItems[i].title;
    let content;
    if (slicedItems[i].url) {
      content = `URL: ${slicedItems[i].url}`;
    } else if (slicedItems[i].text) {
      content = `Text: ${slicedItems[i].text}`;
    }
    console.log(`${chalk.red(title)} | ${content}`);
    console.log(`+---`);
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
  { name: 'from', alias: 'f', type: Number, defaultValue: 0 },
  { name: 'to', alias: 't', type: Number, defaultValue: 3 },
];

const { from, to } = commandLineArgs(optionDefinitions, {
  partial: true,
  caseInsensitive: true,
});
prettyPrintTopItems(from, to);
