import { useEffect, useState } from "react";

let data: Record<string, any>;

export const useAbilities = () => {
  const [abilities, setAbilities] = useState(data);
  useEffect(() => {
    const loadAbilities = async () => {
      const imp =
        await import("../../node_modules/dotaconstants/build/abilities.json");
      const def = imp.default;
      setAbilities(def);
      data = def;
    };
    void loadAbilities();
  }, []);
  return abilities;
};
