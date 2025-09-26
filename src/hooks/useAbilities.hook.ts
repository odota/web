import { useEffect, useState } from "react";

let data: Record<string, any>;

export const useAbilities = () => {
  const [abilities, setAbilities] = useState(data);
  useEffect(() => {
    import('../../node_modules/dotaconstants/build/abilities.json').then(imp => {
        const def = imp.default;
        setAbilities(def);
        data = def;
    });
  }, []);
  return abilities;
}

