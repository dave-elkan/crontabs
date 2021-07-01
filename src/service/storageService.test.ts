const storedTabs = [
  {
    url: "https://www.news.com.au",
    crons: [
      { type: "cron", operation: "open", expression: "0 0 0 * * SUN,FRI" },
    ],
  },
  {
    url: "https://www.smh.com.au",
    crons: [
      { type: "cron", expression: "0 0 0 * * SUN,THU", operation: "show" },
      { type: "cron", expression: "0 0 1 * * SUN,THU", operation: "close" },
    ],
  },
  {
    url: "https://www.edave.net",
    crons: [
      { type: "cron", expression: "0 0 6 * * MON,TUE,THU", operation: "show" },
      { type: "cron", expression: "0 0 7 * * MON,TUE,THU", operation: "close" },
    ],
  },
];
