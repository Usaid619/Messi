import type { NavRoute } from '../types/content';

export const primaryNav = [
{ label: 'Story', to: '/story' },
{ label: 'Career', to: '/career' },
{ label: 'Moments', to: '/moments' },
{ label: 'Trophies', to: '/trophies' },
{ label: 'Argentina', to: '/argentina' },
{ label: 'Barcelona', to: '/barcelona' },
{ label: 'Numbers', to: '/statistics' },
{ label: 'Legacy', to: '/legacy' }];


// Ordered as the film plays — also drives the "next chapter" link at the end of each page.
export const allRoutes: NavRoute[] = [
{ label: 'Prologue', to: '/', chapter: 'A story written in motion', image: 'silhouette' },
{ label: 'Story', to: '/story', chapter: 'The boy from Rosario', image: 'rosario' },
{ label: 'Career', to: '/career', chapter: 'Four shirts, one game', image: 'tunnel' },
{ label: 'Barcelona', to: '/barcelona', chapter: 'The era that changed football', image: 'barcelona' },
{ label: 'Argentina', to: '/argentina', chapter: 'The story was never complete', image: 'crowd' },
{ label: 'Moments', to: '/moments', chapter: 'Where time stopped', image: 'flashes' },
{ label: 'Trophies', to: '/trophies', chapter: 'The trophy room', image: 'trophy' },
{ label: 'Numbers', to: '/statistics', chapter: 'What can be counted', image: 'grass' },
{ label: 'Timeline', to: '/timeline', chapter: 'Every year, end to end', image: 'stadium' },
{ label: 'Gallery', to: '/gallery', chapter: 'Frames', image: 'ball' },
{ label: 'Legacy', to: '/legacy', chapter: 'What it meant', image: 'crowd' }];