import { useEffect, useState } from "react";

let data: PatchNotes;

export const usePatchnotes = () => {
  const [patchnotes, setPatchnotes] = useState(data);
  useEffect(() => {
    const loadPatchnotes = async () => {
      const imp =
        await import("../../node_modules/dotaconstants/build/patchnotes.json");
      const def = imp.default;
      setPatchnotes(def);
      data = def;
    };
    void loadPatchnotes();
  }, []);
  return patchnotes;
};
