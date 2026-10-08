export type ImageKey =
'stadium' |
'silhouette' |
'rosario' |
'crowd' |
'trophy' |
'barcelona' |
'tunnel' |
'ball' |
'flashes' |
'grass';

export interface NavRoute {
  label: string;
  to: string;
  chapter: string;
  image: ImageKey;
}

export interface Chapter {
  index: string;
  title: string;
  years: string;
  line: string;
  image: ImageKey;
  to: string;
}

export interface Milestone {
  year: string;
  date?: string;
  title: string;
  body: string;
}

export interface Era {
  year: string;
  title: string;
  subtitle: string;
  body: string;
  image: ImageKey;
  placeholder: string;
  stat: {value: string;label: string;};
}

export interface ArgentinaChapter {
  year: string;
  title: string;
  place: string;
  result: string;
  body: string;
}

export interface Heartbreak {
  year: string;
  title: string;
  score: string;
  opponent: string;
}

export interface WorldCupMatch {
  stage: string;
  opponent: string;
  score: string;
  outcome: 'W' | 'L' | 'D';
  date: string;
  note: string;
}

export interface Moment {
  id: string;
  title: string;
  year: string;
  date: string;
  competition: string;
  opponent: string;
  venue: string;
  description: string;
  image: ImageKey;
  placeholder: string;
}

export type TrophyShape = 'ballon' | 'bigEars' | 'league' | 'cup' | 'world' | 'continental' | 'medal' | 'plate';

export interface Trophy {
  id: string;
  name: string;
  count: number;
  years: string[];
  team: string;
  competition: string;
  shape: TrophyShape;
}

export interface Season {
  label: string;
  goals: number;
  assists?: number;
  team: string;
  note?: string;
}

export interface CompetitionShare {
  name: string;
  goals: number;
}

export interface HeadlineStat {
  value: number;
  suffix?: string;
  label: string;
  note: string;
  gold?: boolean;
}

export interface TimelineEvent {
  year: string;
  date: string;
  title: string;
  competition: string;
  description: string;
  image: ImageKey;
}

export interface GalleryItem {
  id: string;
  title: string;
  year: string;
  location: string;
  context: string;
  image: ImageKey;
  ratio: 'portrait' | 'landscape' | 'square' | 'tall';
}

export interface CareerClub {
  name: string;
  years: string;
  figure: string;
  figureLabel: string;
  line: string;
  honours: string;
  image: ImageKey;
  accent: string;
}