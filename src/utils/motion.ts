export const easeOut: [number, number, number, number] = [0.23, 1, 0.32, 1];
export const easeInOut: [number, number, number, number] = [0.65, 0, 0.35, 1];

export function wrap(min: number, max: number, v: number): number {
  const range = max - min;
  return ((v - min) % range + range) % range + min;
}