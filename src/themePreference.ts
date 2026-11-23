export type SiteTheme = "black" | "blue";

const storageKey = "opendota-theme";

export function readTheme(): SiteTheme {
  try {
    const savedTheme = window.localStorage.getItem(storageKey);
    return savedTheme === "black" ? savedTheme : "blue";
  } catch {
    return "blue";
  }
}

export function saveTheme(theme: SiteTheme) {
  try {
    window.localStorage.setItem(storageKey, theme);
  } catch {
    // The current theme still applies when storage is unavailable.
  }
}
