const storageKey = "istanbul-html-report-theme";
const themes = ["light", "dark", "legacy"];
const root = document.documentElement;
const media = window.matchMedia("(prefers-color-scheme: dark)");

// A same-origin page embedding the report, like Vitest UI, owns the theme
const embedder = findEmbedder();

if (embedder) {
  // hides the theme picker
  root.dataset.themeEmbedded = "";
}

// Firefox gives every file:// page its own localStorage, but shares cookies
// between them. Chromium shares localStorage, but doesn't keep file://
// cookies. So file:// pages keep the theme in a cookie where cookies work,
// and never read localStorage there, which could be a stale per-page value.
const useCookie = location.protocol === "file:" && cookiesWork();
const cookiePattern = new RegExp(`(?:^|; )${storageKey}=(\\w+)`);

// Tracked separately from data-theme, which a view transition updates
// asynchronously, so a change reported twice (Firefox fires both the media
// query and the embedder mutation) starts only one transition.
let shownTheme = root.dataset.theme ?? null;

const syncAnimated = () => sync(true);
sync();

document.addEventListener("DOMContentLoaded", () => {
  sync();

  document.getElementById("themeSelect")?.addEventListener("change", (event) => {
    storeTheme(event.target.value);
    showTheme(event.target.value, true);
  });
});

window.addEventListener("pageshow", () => sync());
window.addEventListener("storage", syncAnimated);
media.addEventListener("change", syncAnimated);

if (embedder) {
  // follows the embedding page's theme toggle, e.g. a class on its <html>
  new MutationObserver(syncAnimated).observe(embedder, { attributes: true });
}

function findEmbedder() {
  const ancestor = location.ancestorOrigins?.[0];

  if (
    window.parent === window ||
    location.protocol === "file:" ||
    (ancestor && ancestor !== location.origin)
  ) {
    return null;
  }

  try {
    return window.frameElement ? window.parent.document.documentElement : null;
  } catch {
    // a cross-origin parent can't be read, so the OS preference applies
    return null;
  }
}

function embedderTheme() {
  if (!embedder) {
    return null;
  }

  const scheme = window.parent.getComputedStyle(embedder).colorScheme;
  const dark = /\bdark\b/.test(scheme);
  const light = /\blight\b/.test(scheme);

  // "normal" or "light dark" leave the choice to the OS preference
  return dark === light ? null : dark ? "dark" : "light";
}

function cookiesWork() {
  const probe = `${storageKey}-probe=1`;
  document.cookie = `${probe}; path=/; SameSite=Lax`;

  const works = document.cookie.includes(probe);
  document.cookie = `${probe}; path=/; max-age=0; SameSite=Lax`;

  return works;
}

function storedTheme() {
  let stored = null;

  if (useCookie) {
    stored = document.cookie.match(cookiePattern)?.[1];
  } else {
    try {
      stored = localStorage.getItem(storageKey);
    } catch {
      // storage may be unavailable
    }
  }

  return themes.includes(stored) ? stored : null;
}

function storeTheme(theme) {
  if (useCookie) {
    document.cookie = `${storageKey}=${theme}; path=/; max-age=31536000; SameSite=Lax`;

    return;
  }

  try {
    localStorage.setItem(storageKey, theme);
  } catch {
    // the theme still applies to the current page
  }
}

function showTheme(theme, animate) {
  shownTheme = theme;

  const update = () => {
    if (theme) {
      root.dataset.theme = theme;
    } else {
      delete root.dataset.theme;
    }
  };

  if (animate && document.startViewTransition) {
    document.startViewTransition(update);
  } else {
    update();
  }
}

function sync(animate = false) {
  const theme = embedder ? embedderTheme() : storedTheme();

  if (theme !== shownTheme) {
    showTheme(theme, animate);
  }

  const select = document.getElementById("themeSelect");

  if (select) {
    select.value = theme || (media.matches ? "dark" : "light");
  }
}
