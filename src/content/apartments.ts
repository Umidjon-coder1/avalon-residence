/**
 * Xonadon rejalari. Manba: Tilda "Xonadonlar" bloki, 2026-11-05.
 * Tilda'da 25 ta noyob reja bor: 21 ta 2 xonali, 4 ta 3 xonali.
 * "Jami" tabi shu 25 ta rejani ko'rsatadi, "2" va "3" tablari xona soni bo'yicha filtr. "1" tabi bo'sh.
 * Ko'p rejalar juft (oynali) ko'rinishda: `mirrorOf` shu juftni bildiradi.
 */
export type Apartment = {
  id: string;
  rooms: 1 | 2 | 3;
  /** m², Tilda kartasidagi qiymat */
  area: number;
  plan: string;
  mirrorOf?: string;
};

const two: Array<[number, number]> = [
  [1, 49.8],
  [2, 60.2],
  [3, 56.5],
  [4, 56.1],
  [5, 52.2],
  [6, 63.6],
  [7, 50.35],
  [8, 55.7],
  [9, 55.8],
  [10, 55.9],
  [11, 48.8],
  [12, 55.9],
  [13, 55.8],
  [14, 55.7],
  [15, 50.35],
  [16, 63.6],
  [17, 52.2],
  [18, 56.1],
  [19, 56.5],
  [20, 60.2],
  [21, 49.8],
];

const three: Array<[number, number]> = [
  [1, 76.6],
  [2, 89.3],
  [3, 89.3],
  [4, 76.6],
];

const pad = (n: number) => String(n).padStart(2, "0");

function build(rooms: 2 | 3, list: Array<[number, number]>): Apartment[] {
  const total = list.length;
  return list.map(([n, area]) => {
    const mirror = total + 1 - n;
    return {
      id: `${rooms}-${pad(n)}`,
      rooms,
      area,
      plan: `/images/plans/${rooms}-${pad(n)}.png`,
      ...(mirror !== n ? { mirrorOf: `${rooms}-${pad(mirror)}` } : {}),
    };
  });
}

export const apartments: Apartment[] = [...build(2, two), ...build(3, three)];

export const areaRange = {
  min: Math.min(...apartments.map((a) => a.area)),
  max: Math.max(...apartments.map((a) => a.area)),
};
