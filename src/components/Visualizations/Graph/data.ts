type HeroLevel = {
  level: number;
  totalXp: number;
  xpToNextLevel: number | null;
};

/**
 * Hero level XP thresholds derived from Liquipedia's Dota 2 Experience page.
 * @see https://liquipedia.net/dota2/Experience
 */
const heroLevels: HeroLevel[] = [
  { level: 1, totalXp: 0, xpToNextLevel: 240 },
  { level: 2, totalXp: 240, xpToNextLevel: 400 },
  { level: 3, totalXp: 640, xpToNextLevel: 520 },
  { level: 4, totalXp: 1160, xpToNextLevel: 600 },
  { level: 5, totalXp: 1760, xpToNextLevel: 680 },
  { level: 6, totalXp: 2440, xpToNextLevel: 760 },
  { level: 7, totalXp: 3200, xpToNextLevel: 800 },
  { level: 8, totalXp: 4000, xpToNextLevel: 900 },
  { level: 9, totalXp: 4900, xpToNextLevel: 1000 },
  { level: 10, totalXp: 5900, xpToNextLevel: 1100 },
  { level: 11, totalXp: 7000, xpToNextLevel: 1200 },
  { level: 12, totalXp: 8200, xpToNextLevel: 1300 },
  { level: 13, totalXp: 9500, xpToNextLevel: 1400 },
  { level: 14, totalXp: 10900, xpToNextLevel: 1500 },
  { level: 15, totalXp: 12400, xpToNextLevel: 1600 },
  { level: 16, totalXp: 14000, xpToNextLevel: 1700 },
  { level: 17, totalXp: 15700, xpToNextLevel: 1800 },
  { level: 18, totalXp: 17500, xpToNextLevel: 1900 },
  { level: 19, totalXp: 19400, xpToNextLevel: 2000 },
  { level: 20, totalXp: 21400, xpToNextLevel: 2200 },
  { level: 21, totalXp: 23600, xpToNextLevel: 2400 },
  { level: 22, totalXp: 26000, xpToNextLevel: 2600 },
  { level: 23, totalXp: 28600, xpToNextLevel: 2800 },
  { level: 24, totalXp: 31400, xpToNextLevel: 3000 },
  { level: 25, totalXp: 34400, xpToNextLevel: 4000 },
  { level: 26, totalXp: 38400, xpToNextLevel: 5000 },
  { level: 27, totalXp: 43400, xpToNextLevel: 6000 },
  { level: 28, totalXp: 49400, xpToNextLevel: 7000 },
  { level: 29, totalXp: 56400, xpToNextLevel: 8000 },
  { level: 30, totalXp: 64400, xpToNextLevel: null },
];

const getHeroLevel = (totalXp: number): number => {
  let level = 1;
  for (const threshold of heroLevels) {
    if (totalXp < threshold.totalXp) break;
    level = threshold.level;
  }
  return level;
};

export { heroLevels, getHeroLevel };
