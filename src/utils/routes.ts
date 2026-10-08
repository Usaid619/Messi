import { allRoutes } from '../data/navigation';
import type { NavRoute } from '../types/content';

export function getNextRoute(path: string): NavRoute {
  const i = allRoutes.findIndex((r) => r.to === path);
  return allRoutes[(i + 1) % allRoutes.length];
}

export function getRouteIndex(path: string): string {
  const i = allRoutes.findIndex((r) => r.to === path);
  return String(Math.max(i, 0)).padStart(2, '0');
}