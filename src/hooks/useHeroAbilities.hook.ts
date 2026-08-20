import { useEffect, useState } from "react";

let data: Record<string, any>;

export const useHeroAbilities = () => {
  const [heroAbilities, setHeroAbilities] = useState(data);
  useEffect(() => {
    const loadHeroAbilities = async () => {
      const imp =
        await import("../../node_modules/dotaconstants/build/hero_abilities.json");
      const def = imp.default;
      setHeroAbilities(def);
      data = def;
    };
    void loadHeroAbilities();
  }, []);
  return heroAbilities;
};
