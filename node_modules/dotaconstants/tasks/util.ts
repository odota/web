export const HTML_REGEX = /(<([^>]+)>)/gi;

export const mapAbilities = (tokens: any) => {
  const tokenKeys = Object.keys(tokens);
  tokenKeys.forEach(
    (key) => (tokens[key] = tokens[key].replace(HTML_REGEX, "")),
  );
  return tokens;
};

export const removeExtraneousWhitespacesFromString = (string: string) => {
  if (!string) {
    return "";
  }

  return string.replace(/\s+/g, " ").trim();
};

export const cleanupArray = (array: string[]) => {
  if (!array) {
    return [];
  }

  return array.filter((n) => removeExtraneousWhitespacesFromString(n));
};

// NameAliases from a hero's npc file, the short names the game's own hero
// search accepts, e.g. "wr;Lyralei" or "sf,nevermore". A few heroes (Tusk,
// Skywrath Mage) repeat the key, which the vdf parser turns into an array
export const parseNameAliases = (value?: string | string[]) =>
  ([] as string[])
    .concat(value || [])
    .join(";")
    .split(/[,;]/)
    .map((alias) => alias.trim())
    .filter(Boolean);

export type SpecialBonusLookup = Record<string, Record<string, string>>;

export const abilityNameStrings = (tokens: Record<string, string>) =>
  Object.fromEntries(
    Object.entries(tokens).map(([key, value]) => [key.toLowerCase(), value]),
  );

// Collect before formatting so missing localization or adjacent upgrades cannot
// hide modifiers. For current talents, prefer hero-slot skills over other sources.
// Equal-priority and non-current candidates retain the existing tie behavior.
export const buildSpecialBonusLookup = (
  scripts: Record<string, any>,
  {
    currentTalents = new Set<string>(),
    preferredAbilities = new Set<string>(),
  }: {
    currentTalents?: Set<string>;
    preferredAbilities?: Set<string>;
  } = {},
): SpecialBonusLookup => {
  const lookup: SpecialBonusLookup = {};
  const priorities: Record<string, number> = {};
  const entries = (script: any): [string, any][] =>
    script.AbilitySpecial
      ? Object.values(script.AbilitySpecial).flatMap((entry: any) =>
          Object.entries(entry).filter(([key]) => key !== "var_type"),
        )
      : Object.entries(script.AbilityValues ?? {});
  for (const [ability, script] of Object.entries(scripts)) {
    for (const [attribute, value] of entries(script)) {
      if (!value || typeof value !== "object") continue;
      for (const [talent, modifier] of Object.entries(value)) {
        if (
          !talent.startsWith("special_bonus_") ||
          /^special_bonus_(facet|scepter|shard)(?:_|$)/.test(talent)
        )
          continue;
        // Preserve the existing nested Scepter modifier compatibility.
        const raw =
          typeof modifier === "string"
            ? modifier
            : (modifier as any)?.special_bonus_scepter;
        if (typeof raw !== "string") continue;
        const display = raw
          .trim()
          .split(/\s+/)
          .map((part) => part.replace(/^[+=x-]/, "").replace(/%$/, ""))
          .join(" ");
        const priority =
          currentTalents.has(talent) && preferredAbilities.has(ability) ? 1 : 0;
        lookup[talent] ??= {};
        for (const key of ["value", `bonus_${attribute.toLowerCase()}`]) {
          const group = `${talent}/${key}`;
          const previous = priorities[group] ?? -1;
          // The value alias keeps its first candidate; named bonuses keep their last.
          if (
            priority > previous ||
            (priority === previous && key !== "value")
          ) {
            lookup[talent][key] = display;
            priorities[group] = priority;
          }
        }
      }
    }
  }
  // A talent's own attributes override inferred modifier aliases.
  for (const [name, script] of Object.entries(scripts)) {
    if (!name.startsWith("special_bonus")) continue;
    lookup[name] ??= {};
    for (const [attribute, value] of entries(script)) {
      const raw = value && typeof value === "object" ? value.value : value;
      if (typeof raw === "string") lookup[name][attribute.toLowerCase()] = raw;
    }
  }
  return lookup;
};

export const resolveSpecialBonusPlaceholders = (
  abilities: Record<string, { dname?: string }>,
  lookup: SpecialBonusLookup,
  formatModifiers = true,
) => {
  Object.entries(abilities).forEach(([name, ability]) => {
    const values = lookup[name];
    if (!ability.dname || !values) {
      return;
    }

    ability.dname = ability.dname.replace(
      /\{s:([^}]+)\}/gi,
      (placeholder, key, offset: number, template: string) => {
        const value = values[key.toLowerCase()] ?? values[key];
        if (typeof value !== "string") return placeholder;
        // Own attributes keep their literal signs and level-value formatting.
        if (!formatModifiers) return value;
        const signedByTemplate = /[+-]\s*$/.test(template.slice(0, offset));
        return value
          .split(/\s+/)
          .map((part) => (signedByTemplate ? part.replace(/^[+-]/, "") : part))
          .join(" / ");
      },
    );
  });
};
