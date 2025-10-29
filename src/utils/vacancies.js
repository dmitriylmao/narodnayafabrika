// src/utils/vacancies.js

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const vacanciesDirectory = path.join(process.cwd(), 'data', 'vacancies');

export function getAllVacanciesSlugs() {
  const filenames = fs.readdirSync(vacanciesDirectory);

  const allVacanciesData = filenames.map((filename) => {
    const slug = filename.replace(/\.md$/, '');
    const fullPath = path.join(vacanciesDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data } = matter(fileContents);

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
    };
  });

  return allVacanciesData.sort((a, b) => new Date(b.__sortableDate) - new Date(a.__sortableDate));
}

export async function getVacancyData(slug) {
  const fullPath = path.join(vacanciesDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(content);
  const conditionsHtml = processedContent.toString();

  const requirementsHtml = await remark().use(html).process(data.requirements || '');
  const dutiesHtml = await remark().use(html).process(data.duties || '');

  const formattedDate = new Date(data.createdAt).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Europe/Moscow'
  });

  return {
    slug,
    conditionsHtml,
    requirementsHtml: requirementsHtml.toString(),
    dutiesHtml: dutiesHtml.toString(),
    ...data,
    createdAt: formattedDate,
  };
}