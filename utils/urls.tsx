const SESSION_URL = 'https://thesession.org/tunes/popular?format=json&page=';
export const POPULAR_URL = (slug: any) => `${SESSION_URL}${slug}`;
export const TUNE_URL = (slug: any) =>
  `https://thesession.org/tunes/${slug}?format=json`;
