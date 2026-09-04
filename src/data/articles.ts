import { Article } from '../types';
import { definitionArticles } from './articles/definition';
import { activitiesArticles } from './articles/activities';
import { workArticles } from './articles/work';
import { fitnessArticles } from './articles/fitness';
import { lifestyleArticles } from './articles/lifestyle';
import { navigationArticles } from './articles/navigation';

export const ARTICLES: Article[] = [
  ...definitionArticles,
  ...activitiesArticles,
  ...workArticles,
  ...fitnessArticles,
  ...lifestyleArticles,
  ...navigationArticles,
];
