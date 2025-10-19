import { useEffect, useState } from 'react';

let data: Record<string, any>;

export const useHeroAbilities = () => {
  const [heroAbilities, setHeroAbilities] = useState(data);
  useEffect(() => {
    import('../../node_modules/dotaconstants/build/hero_abilities.json').then(
      (imp) => {
        const def = imp.default;
        setHeroAbilities(def);
        data = def;
      },
    );
  }, []);
  return heroAbilities;
};
