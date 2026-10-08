import type { CompetitionShare, HeadlineStat, Season } from '../types/content';

// Figures compiled from public records (all competitions). Verify against an official source before publication.
export const headlineStats: HeadlineStat[] = [
{ value: 800, suffix: '+', label: 'Goals', note: 'Career, club and country' },
{ value: 8, label: 'Ballon d’Or', note: 'More than any player in history', gold: true },
{ value: 4, label: 'Champions Leagues', note: '2006 · 2009 · 2011 · 2015' },
{ value: 1, label: 'World Cup', note: 'Lusail, 18 December 2022', gold: true },
{ value: 672, label: 'For Barcelona', note: 'The most by any player for a single club' },
{ value: 91, label: 'In one year', note: 'Calendar 2012 — a world record' }];


export const clubSeasons: Season[] = [
{ label: '04–05', goals: 1, assists: 0, team: 'Barcelona', note: 'Debut season' },
{ label: '05–06', goals: 8, assists: 3, team: 'Barcelona' },
{ label: '06–07', goals: 17, assists: 3, team: 'Barcelona', note: 'Getafe' },
{ label: '07–08', goals: 16, assists: 13, team: 'Barcelona' },
{ label: '08–09', goals: 38, assists: 18, team: 'Barcelona', note: 'First treble' },
{ label: '09–10', goals: 47, assists: 11, team: 'Barcelona' },
{ label: '10–11', goals: 53, assists: 24, team: 'Barcelona', note: 'Wembley' },
{ label: '11–12', goals: 73, assists: 29, team: 'Barcelona', note: 'Record season' },
{ label: '12–13', goals: 60, assists: 16, team: 'Barcelona' },
{ label: '13–14', goals: 41, assists: 14, team: 'Barcelona' },
{ label: '14–15', goals: 58, assists: 27, team: 'Barcelona', note: 'MSN treble' },
{ label: '15–16', goals: 41, assists: 23, team: 'Barcelona' },
{ label: '16–17', goals: 54, assists: 16, team: 'Barcelona' },
{ label: '17–18', goals: 45, assists: 18, team: 'Barcelona' },
{ label: '18–19', goals: 51, assists: 19, team: 'Barcelona' },
{ label: '19–20', goals: 31, assists: 25, team: 'Barcelona' },
{ label: '20–21', goals: 38, assists: 14, team: 'Barcelona', note: 'Final season' },
{ label: '21–22', goals: 11, assists: 15, team: 'PSG' },
{ label: '22–23', goals: 21, assists: 20, team: 'PSG' }];


export const countryYears: Season[] = [
{ label: '2006', goals: 2, team: 'Argentina' },
{ label: '2007', goals: 6, team: 'Argentina' },
{ label: '2008', goals: 2, team: 'Argentina' },
{ label: '2009', goals: 3, team: 'Argentina' },
{ label: '2010', goals: 2, team: 'Argentina' },
{ label: '2011', goals: 4, team: 'Argentina' },
{ label: '2012', goals: 12, team: 'Argentina' },
{ label: '2013', goals: 6, team: 'Argentina' },
{ label: '2014', goals: 8, team: 'Argentina', note: 'World Cup final' },
{ label: '2015', goals: 4, team: 'Argentina' },
{ label: '2016', goals: 8, team: 'Argentina' },
{ label: '2017', goals: 4, team: 'Argentina' },
{ label: '2018', goals: 4, team: 'Argentina' },
{ label: '2019', goals: 5, team: 'Argentina' },
{ label: '2020', goals: 1, team: 'Argentina' },
{ label: '2021', goals: 9, team: 'Argentina', note: 'Copa América' },
{ label: '2022', goals: 18, team: 'Argentina', note: 'World champion' },
{ label: '2023', goals: 8, team: 'Argentina' },
{ label: '2024', goals: 6, team: 'Argentina', note: 'Copa América' }];


export const barcelonaCompetitions: CompetitionShare[] = [
{ name: 'La Liga', goals: 474 },
{ name: 'Champions League', goals: 120 },
{ name: 'Copa del Rey', goals: 56 },
{ name: 'Supercopa', goals: 14 },
{ name: 'Club World Cup', goals: 5 },
{ name: 'UEFA Super Cup', goals: 3 }];