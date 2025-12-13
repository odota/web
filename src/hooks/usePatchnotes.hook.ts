import { useEffect, useState } from "react";

let data: PatchNotes;

export const usePatchnotes = () => {
  const [patchnotes, setPatchnotes] = useState(data);
  useEffect(() => {
    import("../../node_modules/dotaconstants/build/patchnotes.json").then(
      (imp) => {
        const def = imp.default;
        setPatchnotes(def);
        data = def;
      },
    );
  }, []);
  return patchnotes;
};
