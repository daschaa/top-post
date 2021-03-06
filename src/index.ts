#!/usr/bin/env node
import { createSpinner } from 'nanospinner';
import chalk from 'chalk';
import commandLineArgs from 'command-line-args';
import { fetchTopStories, getMultipleItems } from './utils.js';
import { printTable } from 'console-table-printer';
import { usage } from './help.js';

const printItemsToConsole = (start: number, end: number, slicedItems: any[]) => {
  for (let i = start; i < end; i++) {
    const title = `${i + 1}. ${slicedItems[i].title}`;
    let content;
    if (slicedItems[i].url) {
      content = `${chalk.dim('URL: ')}${chalk.blueBright(slicedItems[i].url)}`;
    } else if (slicedItems[i].text) {
      content = `${chalk.dim('Text: ')}${slicedItems[i].text}`;
    }
    console.log(`${title} | ${content}`);
  }
};

const printTableToConsole = (start: number, end: number, slicedItems: any[]) => {
  const articles = [];
  for (let i = start; i < end; i++) {
    const title = slicedItems[i].title;
    let content;
    if (slicedItems[i].url) {
      content = `URL: ${slicedItems[i].url}`;
    } else if (slicedItems[i].text) {
      content = `Text: ${slicedItems[i].text}`;
    }
    articles.push({
      title,
      content,
    });
  }
  printTable(articles);
};

// @ts-ignore
const prettyPrintTopItems = async (start: number, end: number, tablePrint: boolean): Promise<any> => {
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
  if (tablePrint) {
    printTableToConsole(start, end, slicedItems);
  } else {
    printItemsToConsole(start, end, slicedItems);
  }
};
const optionDefinitions = [
  { name: 'from', alias: 'f', type: Number, defaultValue: 0 },
  { name: 'to', alias: 't', type: Number, defaultValue: 3 },
  { name: 'table', alias: 'b', type: Boolean, defaultValue: false },
  { name: 'help', alias: 'h', type: Boolean, defaultValue: false },
];

const { from, to, table, help } = commandLineArgs(optionDefinitions, {
  partial: true,
  caseInsensitive: true,
});
if (help) {
  console.log(usage);
} else {
  prettyPrintTopItems(from, to, table);
}
