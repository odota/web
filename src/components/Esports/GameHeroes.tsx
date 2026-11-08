import React, { useEffect, useState } from "react";
import { heroes } from "dotaconstants";
import config from "../../config";
import useStrings from "../../hooks/useStrings.hook";
import { ProfessionalMatch } from "../Matches/series";
import { SeriesTeam } from "../Matches/Matches";
import TeamLogo from "../TeamLogo/TeamLogo";
import HeroImage from "../Visualizations/HeroImage";

type PlayerHero = { player_slot: number; hero_id: number };
const requests = new Map<number, Promise<PlayerHero[]>>();

// Share match requests when a series is reopened or appears more than once.
function loadHeroes(matchId: number) {
  let request = requests.get(matchId);
  if (!request) {
    request = fetch(`${config.VITE_API_HOST}/api/matches/${matchId}`, { credentials: "include" })
      .then(async (response) => {
        if (!response.ok) throw new Error(String(response.status));
        const match = await response.json();
        return (match.players || []) as PlayerHero[];
      })
      .catch((error) => { requests.delete(matchId); throw error; });
    requests.set(matchId, request);
  }
  return request;
}

/** Loads hero lineups only while the containing series is expanded. */
export default function GameHeroes({ game, teams }: { game: ProfessionalMatch; teams: SeriesTeam[] }) {
  const matchId = game.match_id;
  const strings = useStrings();
  const [players, setPlayers] = useState<PlayerHero[] | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let active = true;
    setPlayers(null);
    setFailed(false);
    loadHeroes(matchId).then((data) => {
      if (active) setPlayers(data);
    }).catch(() => { if (active) setFailed(true); });
    return () => { active = false; };
  }, [matchId]);

  return (
    <span className="game-heroes" aria-busy={!players && !failed}>
      {[
        { id: game.radiant_team_id, name: game.radiant_name, won: game.radiant_win === true },
        { id: game.dire_team_id, name: game.dire_name, won: game.radiant_win === false },
      ].map((side, index) => (
        <span className="hero-lineup" key={index}>
          <span className={`game-team${side.won ? " game-winner" : ""}`}>
            <TeamLogo teamId={side.id} src={teams.find((item) => item.team_id === side.id)?.logo_url} style={{ width: 22, height: 22, flexShrink: 0, objectFit: "contain" }} />
            <span>{side.name || strings.general_unknown}</span>
            {side.won && <small className="winner-label" title={strings.th_winner}>✓ {strings.th_winner}</small>}
          </span>
          <span className="hero-portraits">
            {players ? players.filter((player) => (player.player_slot < 128) === (index === 0))
              .sort((a, b) => a.player_slot - b.player_slot)
              .map((player) => {
                const hero = heroes[player.hero_id as unknown as keyof Heroes];
                return hero ? <HeroImage key={player.player_slot} id={String(player.hero_id)} alt={hero.localized_name} heroImageEventProps={{ title: hero.localized_name }} /> : null;
              }) : failed ? <small>{strings.general_unknown}</small> : Array.from({ length: 5 }, (_, slot) => <span className="hero-placeholder" key={slot} />)}
          </span>
        </span>
      ))}
    </span>
  );
}
