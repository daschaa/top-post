#!/usr/bin/env node
import axios from "axios";
import {createSpinner} from 'nanospinner';
import chalk from "chalk";
import commandLineArgs from 'command-line-args'

const fetchTopStories = async () => {
    return await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
};

const getItem = async (itemId) => {
    return await axios.get(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`);
};

const getMultipleItems = async (itemIds) => {
    let items = [];
    for (const itemId of itemIds) {
        const {data} = await getItem(itemId);
        items.push(data);
    }
    return items;
}

async function prettyPrintTopItems(start, end) {
    if(start >= end) {
        console.error("Start parameter must be less than end parameter");
        return;
    }
    let spinner = createSpinner("🛫 Fetching data...");
    spinner.start();
    const {data} = await fetchTopStories();
    const slicedItems = await getMultipleItems(data.slice(start, end));
    spinner.clear();
    spinner.reset();
    for (let i = start; i < end; i++) {
        console.log(`${chalk.bgGreen(`Number ${i + 1}`)}`);
        console.log(`Title: ${slicedItems[i].title}`);
        console.log(`URL: ${slicedItems[i].url}`);
    }
}
const optionDefinitions = [
    { name: 'start', alias: 's', type: Number, defaultValue: 0 },
    { name: 'end', alias: 'e', type: Number, defaultValue: 1 }
]
const {start, end} = commandLineArgs(optionDefinitions)
await prettyPrintTopItems(start, end);
