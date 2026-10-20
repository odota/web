/**
 * @file Hero Select.
 * @description Custom hero menu with icons, role positions, player names, and keyboard navigation.
 */

import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckIcon from "@mui/icons-material/Check";
import { heroes, player_colors as playerColors } from "dotaconstants";
import config from "../../../config";
import { getPlayerIdentity, getRoleLabels, LaneRole, rolePositions } from "./laning.utils";
import useStrings from "../../../hooks/useStrings.hook";


import { HeroSelectButton, HeroOption } from "./StyledHeroComparison";
import constants from "../../constants";

type HeroSelectProps = {
  team: string;
  players: MatchPlayer[];
  selected?: MatchPlayer;
  roles: Map<number, LaneRole>;
  onChange: (slot: number) => void;
};

/**
 * Provides a custom hero menu with icons, player names, and inferred role positions.
 * The menu supports keyboard navigation and returns focus to its trigger when closed.
 * @param props Team label, ordered options, selected player, role map, and selection callback.
 * @returns A menu trigger and its anchored menu; the parent owns the selected slot.
 */
const HeroSelect = ({ team, players, selected, roles, onChange }: HeroSelectProps) => {
  const strings = useStrings();
  const labels = getRoleLabels(strings);
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
  /**
   * Builds the icon, hero name, role position, and player identity for a menu entry.
   * @param player Player represented by the entry.
   * @returns Shared content for the selected trigger and menu options.
   */
  const renderHero = (player: MatchPlayer) => {
    const hero = heroes[player.hero_id];
    const role = roles.get(player.player_slot);
    return (
      <HeroOption>
        {hero && <img src={config.VITE_IMAGE_CDN + hero.icon} alt="" width={36} height={36} />}
        <span>
          <strong style={{ color: playerColors[player.player_slot as unknown as keyof typeof playerColors] }}>
            {hero?.localized_name ?? strings.general_no_hero}
          </strong>
          <small>{role ? `${rolePositions[role]} · ${labels[role]}` : strings.laning_unknown_role} • {getPlayerIdentity(player, strings).playerName}</small>
        </span>
      </HeroOption>
    );
  };
  return (
    <>
      <HeroSelectButton
        type="button"
        disabled={!players.length}
        aria-label={`${team}: ${selected ? heroes[selected.hero_id]?.localized_name ?? strings.general_no_hero : strings.laning_unavailable}`}
        aria-haspopup="menu"
        aria-expanded={Boolean(anchor)}
        onClick={(event) => setAnchor(event.currentTarget)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            setAnchor(event.currentTarget);
          }
        }}
      >
        {selected ? renderHero(selected) : strings.laning_unavailable}
        <KeyboardArrowDownIcon fontSize="small" />
      </HeroSelectButton>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        slotProps={{
          paper: { sx: {
            mt: 1, p: 0.5, borderRadius: "10px", width: anchor?.offsetWidth,
            maxWidth: "calc(100vw - 32px)",
            bgcolor: constants.secondarySurfaceColor, color: constants.textColorPrimary,
            border: `1px solid ${constants.dividerColor}`,
            boxShadow: "0 12px 32px rgba(0,0,0,0.28)",
          } },
        }}
        MenuListProps={{ "aria-label": team }}
      >
        {players.map((player) => (
          <MenuItem
            key={player.player_slot}
            selected={player.player_slot === selected?.player_slot}
            onClick={() => { onChange(player.player_slot); setAnchor(null); }}
            sx={{ borderRadius: "6px", py: 1.25, px: 1.5, gap: 1 }}
          >
            {renderHero(player)}
            {player.player_slot === selected?.player_slot && <CheckIcon fontSize="small" sx={{ color: constants.primaryLinkColor, ml: "auto" }} />}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default HeroSelect;
