import commandLineUsage from 'command-line-usage';
const sections = [
  {
    header: 'top-post',
    content: 'Show top hacker news articles',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'from',
        type: Number,
        alias: 'f',
        description: 'Offset from which to start',
      },
      {
        name: 'to',
        type: Number,
        alias: 't',
        description: 'To which article rank to fetch',
      },
      {
        name: 'table',
        type: Boolean,
        alias: 'b',
        description: 'Prints articles in a table design',
      },
      {
        name: 'help',
        description: 'Display this usage guide.',
        alias: 'h',
        type: Boolean,
      },
    ],
  },
  {
    content: 'Project home: {underline https://github.com/daschaa/top-post}',
  },
];
export const usage = commandLineUsage(sections);
