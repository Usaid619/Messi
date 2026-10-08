import type { ArgentinaChapter, Heartbreak, WorldCupMatch } from '../types/content';

export const earlyTriumphs: ArgentinaChapter[] = [
{ year: '2005', title: 'FIFA U-20 World Cup', place: 'Netherlands', result: 'Champions', body: 'Golden Ball and Golden Boot. Both penalties in the final. The country starts to whisper his name.' },
{ year: '2008', title: 'Olympic Games', place: 'Beijing', result: 'Gold medal', body: 'He fought his club to be allowed to go. Argentina beat Nigeria 1–0 in the final.' }];


export const heartbreaks: Heartbreak[] = [
{ year: '2007', title: 'Copa América final', score: '0 — 3', opponent: 'Brazil' },
{ year: '2014', title: 'World Cup final', score: '0 — 1 aet', opponent: 'Germany' },
{ year: '2015', title: 'Copa América final', score: '0 — 0 · 1–4 pens', opponent: 'Chile' },
{ year: '2016', title: 'Copa América final', score: '0 — 0 · 2–4 pens', opponent: 'Chile' }];


export const redemption: ArgentinaChapter[] = [
{ year: '2021', title: 'Copa América', place: 'Maracanã, Rio de Janeiro', result: '1 — 0 Brazil', body: 'Twenty-eight years without a senior title end in the stadium where 2014 was lost. His teammates throw him into the air.' },
{ year: '2022', title: 'Finalissima', place: 'Wembley, London', result: '3 — 0 Italy', body: 'Champions of South America against champions of Europe. It feels like a rehearsal for something larger.' }];


export const worldCupMatches: WorldCupMatch[] = [
{ stage: 'Group stage', opponent: 'Saudi Arabia', score: '1 — 2', outcome: 'L', date: '22 Nov', note: 'The shock. The doubts arrive before the tournament has begun.' },
{ stage: 'Group stage', opponent: 'Mexico', score: '2 — 0', outcome: 'W', date: '26 Nov', note: 'A low strike from distance. A tournament saved in one swing of the left foot.' },
{ stage: 'Group stage', opponent: 'Poland', score: '2 — 0', outcome: 'W', date: '30 Nov', note: 'Group won. Belief returns.' },
{ stage: 'Round of 16', opponent: 'Australia', score: '2 — 1', outcome: 'W', date: '3 Dec', note: 'His thousandth senior game. He scores in it.' },
{ stage: 'Quarter-final', opponent: 'Netherlands', score: '2 — 2 · 4–3 pens', outcome: 'W', date: '9 Dec', note: 'A no-look pass to Molina. A shootout in Lusail.' },
{ stage: 'Semi-final', opponent: 'Croatia', score: '3 — 0', outcome: 'W', date: '13 Dec', note: 'At thirty-five, a run along the touchline that undoes the tournament’s best defender.' }];


// France kicked first. true = scored.
export const shootout = {
  argentina: [true, true, true, true],
  france: [true, false, false, true]
};