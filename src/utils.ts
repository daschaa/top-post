import axios from 'axios';

export const fetchTopStories = async () => {
  return await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
};

export const getItem = async (itemId: string) => {
  return await axios.get(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`);
};

export const getMultipleItems = async (itemIds: string) => {
  const items = [];
  for (const itemId of itemIds) {
    const { data } = await getItem(itemId);
    items.push(data);
  }
  return items;
};
