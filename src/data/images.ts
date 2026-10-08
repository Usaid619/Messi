import type { ImageKey } from '../types/content';

const getImg = (name: string) => import.meta.env.BASE_URL + name;

// Atmospheric imagery only. None of these depict Lionel Messi.
// Frames that should show him carry a visible "Placeholder" label for licensed photography.
export const images: Record<ImageKey, string> = {
  stadium: getImg("1e66a8ec-48f8-4763-8637-c0b624ed74af.jpg"),
  silhouette: getImg("e5cca05f-52ae-4eff-b589-daa2926f0d4b.jpg"),
  rosario: getImg("70a4a439-7013-43b4-828e-9f15c68684d7.jpg"),
  crowd: getImg("3e0c58aa-d670-4c81-b7d6-b2b053e39b63.jpg"),
  trophy: getImg("92e4796d-c509-421c-9752-7d9fd6a688e6.jpg"),
  barcelona: getImg("f6feaa7d-8fba-42ca-b96d-9512c2a444e0.jpg"),
  tunnel: getImg("d5d5690a-e6b1-4939-9cdc-ad22adee9575.jpg"),
  ball: getImg("c17a3da5-20df-4bbd-a1dc-44f770007c3d.jpg"),
  flashes: getImg("db656d30-fefa-4de0-8fb4-d9fc4d1fea06.jpg"),
  grass: getImg("da8f4eab-f646-4ef3-bca2-98420e227391.jpg")
};