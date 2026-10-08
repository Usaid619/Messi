import type { Trophy } from '../types/content';

export const trophyRoom: Trophy[] = [
{ id: 'ballon', name: 'Ballon d’Or', count: 8, years: ['2009', '2010', '2011', '2012', '2015', '2019', '2021', '2023'], team: 'Individual', competition: 'France Football', shape: 'ballon' },
{ id: 'worldcup', name: 'FIFA World Cup', count: 1, years: ['2022'], team: 'Argentina', competition: 'Qatar 2022', shape: 'world' },
{ id: 'ucl', name: 'Champions League', count: 4, years: ['2006', '2009', '2011', '2015'], team: 'FC Barcelona', competition: 'UEFA', shape: 'bigEars' },
{ id: 'liga', name: 'La Liga', count: 10, years: ['2005', '2006', '2009', '2010', '2011', '2013', '2015', '2016', '2018', '2019'], team: 'FC Barcelona', competition: 'Spanish league', shape: 'league' },
{ id: 'copa', name: 'Copa América', count: 2, years: ['2021', '2024'], team: 'Argentina', competition: 'CONMEBOL', shape: 'continental' },
{ id: 'rey', name: 'Copa del Rey', count: 7, years: ['2009', '2012', '2015', '2016', '2017', '2018', '2021'], team: 'FC Barcelona', competition: 'Spanish cup', shape: 'cup' },
{ id: 'finalissima', name: 'Finalissima', count: 1, years: ['2022'], team: 'Argentina', competition: 'CONMEBOL–UEFA', shape: 'cup' },
{ id: 'ligue1', name: 'Ligue 1', count: 2, years: ['2022', '2023'], team: 'Paris Saint-Germain', competition: 'French league', shape: 'plate' },
{ id: 'olympic', name: 'Olympic Gold', count: 1, years: ['2008'], team: 'Argentina', competition: 'Beijing 2008', shape: 'medal' },
{ id: 'u20', name: 'U-20 World Cup', count: 1, years: ['2005'], team: 'Argentina', competition: 'FIFA', shape: 'world' }];


export const otherHonours: Trophy[] = [
{ id: 'supercopa', name: 'Supercopa de España', count: 8, years: ['2005', '2006', '2009', '2010', '2011', '2013', '2016', '2018'], team: 'FC Barcelona', competition: 'RFEF', shape: 'cup' },
{ id: 'cwc', name: 'FIFA Club World Cup', count: 3, years: ['2009', '2011', '2015'], team: 'FC Barcelona', competition: 'FIFA', shape: 'world' },
{ id: 'usc', name: 'UEFA Super Cup', count: 3, years: ['2009', '2011', '2015'], team: 'FC Barcelona', competition: 'UEFA', shape: 'cup' },
{ id: 'tdc', name: 'Trophée des Champions', count: 1, years: ['2022'], team: 'Paris Saint-Germain', competition: 'LFP', shape: 'plate' },
{ id: 'leaguescup', name: 'Leagues Cup', count: 1, years: ['2023'], team: 'Inter Miami', competition: 'MLS · Liga MX', shape: 'cup' },
{ id: 'shield', name: 'Supporters’ Shield', count: 1, years: ['2024'], team: 'Inter Miami', competition: 'MLS', shape: 'plate' }];