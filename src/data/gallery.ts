import type { GalleryItem } from '../types/content';

// Atmospheric frames — each is reserved for a licensed photograph described in `context`.
export const galleryItems: GalleryItem[] = [
{ id: 'g1', title: 'The walk out', year: '2004 —', location: 'Camp Nou, Barcelona', context: 'Reserved for: a portrait in the tunnel before a night match.', image: 'tunnel', ratio: 'tall' },
{ id: 'g2', title: 'Night match', year: '2011', location: 'Barcelona', context: 'Reserved for: a wide shot of a European night under floodlights.', image: 'stadium', ratio: 'landscape' },
{ id: 'g3', title: 'Albiceleste', year: '2022', location: 'Lusail, Qatar', context: 'Reserved for: supporters in sky blue and white on the night of the final.', image: 'crowd', ratio: 'landscape' },
{ id: 'g4', title: 'The ball', year: '—', location: 'Training ground', context: 'Reserved for: a training-session detail, ball at his feet.', image: 'ball', ratio: 'square' },
{ id: 'g5', title: 'Where it began', year: '1990s', location: 'Rosario, Argentina', context: 'Reserved for: archival childhood photography, used with permission.', image: 'rosario', ratio: 'portrait' },
{ id: 'g6', title: 'Gold', year: '2022', location: 'Lusail, Qatar', context: 'Reserved for: the trophy lift.', image: 'trophy', ratio: 'tall' },
{ id: 'g7', title: 'Flashes', year: '2009 — 2023', location: 'Paris', context: 'Reserved for: a Ballon d’Or ceremony portrait.', image: 'flashes', ratio: 'landscape' },
{ id: 'g8', title: 'The city', year: '2000 — 2021', location: 'Barcelona', context: 'Reserved for: the city that raised him, seen from Montjuïc.', image: 'barcelona', ratio: 'landscape' },
{ id: 'g9', title: 'Chalk line', year: '—', location: 'Any pitch, any night', context: 'Reserved for: a low-angle match action frame.', image: 'grass', ratio: 'square' },
{ id: 'g10', title: 'Alone', year: '2014', location: 'Rio de Janeiro', context: 'Reserved for: the quiet walk past the trophy after the final.', image: 'silhouette', ratio: 'portrait' },
{ id: 'g11', title: 'Floodlights', year: '2017', location: 'Madrid', context: 'Reserved for: the Bernabéu celebration.', image: 'stadium', ratio: 'portrait' },
{ id: 'g12', title: 'Sky and white', year: '2021', location: 'Rio de Janeiro', context: 'Reserved for: teammates lifting him at the Maracanã.', image: 'crowd', ratio: 'square' }];