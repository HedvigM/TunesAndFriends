/* export const POPULAR_URL =
  'https://thesession.org/tunes/popular?format=json&page=1'; */

const SESSION_URL = 'https://thesession.org/tunes/popular?format=json&page=';
export const POPULAR_URL = (slug) => `${SESSION_URL}${slug}`;
