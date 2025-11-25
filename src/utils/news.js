// src/utils/news.js

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const newsDirectory = path.join(process.cwd(), 'data', 'news');

const getTeaser = (text) => {
  //const maxLength = 100;
  const cleanText = text.replace(/<[^>]*>?/gm, '');
  return cleanText;
  //if (cleanText.length <= maxLength) return cleanText;
  //return cleanText.substring(0, maxLength) + '...';
};

export function getAllNewsSlugs() {
  const filenames = fs.readdirSync(newsDirectory);

  const allNewsData = filenames.map((filename) => {
    const slug = filename.replace(/\.md$/, '');
    const fullPath = path.join(newsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data, content } = matter(fileContents);

    const processedContent = remark().use(html).processSync(content);
    const contentHtml = processedContent.toString();

    const formattedDate = new Date(data.createdAt).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Europe/Moscow'
    });

    return {
      slug,
      ...data,
      __sortableDate: data.createdAt,
      createdAt: formattedDate,
      teaser: getTeaser(contentHtml),
    };
  });

  return allNewsData.sort((a, b) => new Date(b.__sortableDate) - new Date(a.__sortableDate));
}

export async function getNewsData(slug) {
  const fullPath = path.join(newsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();

  const formattedDate = new Date(data.createdAt).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Moscow'
  });

  return {
    slug,
    contentHtml,
    ...data,
    createdAt: formattedDate,
  };
}