/**
 * @file esports.ts
 * @description Tests Esports navigation, tier filtering, historical series, and logo fallbacks using mocked API responses.
 */

import { RequestMock, Selector } from "testcafe";

const game = {
  match_id: 101, series_id: 7, series_type: 1, leagueid: 42, league_name: "Test Championship",
  start_time: 1792535959, duration: 2400, radiant_team_id: 1, dire_team_id: 2,
  radiant_name: "Alpha", dire_name: "Beta", radiant_win: true,
};
const detailLogo = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="32" height="32"%3E%3Ccircle cx="16" cy="16" r="12" fill="green"/%3E%3C/svg%3E';
const responses: Record<string, unknown> = {
  leagues: [
    { leagueid: 42, name: "Test Championship", tier: "premium" },
    { leagueid: 43, name: "Professional Cup", tier: "professional" },
    { leagueid: 44, name: "Amateur Cup", tier: "amateur" },
  ],
  proMatches: [game, { ...game, match_id: 102, radiant_team_id: 2, dire_team_id: 1, radiant_name: "Beta", dire_name: "Alpha", radiant_win: false }],
  teams: [{ team_id: 1, name: "Alpha", rating: 1900, last_match_time: Date.now() / 1000 }],
  "teams/1": { team_id: 1, name: "Alpha", logo_url: detailLogo },
  proPlayers: [{ account_id: 5, name: "Test Pro", team_name: "Alpha", avatar: "" }],
  heroStats: [{ id: 1, localized_name: "Anti-Mage", pro_pick: 10, pro_ban: 20, pro_win: 6 }],
  "leagues/43/matches": [
    { ...game, match_id: 201, series_id: 8, leagueid: 43, league_name: "Professional Cup", start_time: game.start_time - 864000, radiant_team_name: "Alpha", dire_team_name: "Beta" },
    { ...game, match_id: 202, series_id: 8, leagueid: 43, league_name: "Professional Cup", start_time: game.start_time - 860000, radiant_team_id: 2, dire_team_id: 1, radiant_team_name: "Beta", dire_team_name: "Alpha", radiant_win: false },
  ],
  "leagues/42/matches": [{ ...game, radiant_team_name: "Alpha", dire_team_name: "Beta" }],
};
const mock = RequestMock().onRequestTo(/api.opendota.com\/api\//).respond((req, res) => {
  const path = new URL(req.url).pathname.replace("/api/", "");
  res.headers["Access-Control-Allow-Origin"] = "*";
  res.setBody(JSON.stringify(responses[path] || []));
});

fixture`Esports hub`.page`http://localhost:5000/esports`.requestHooks(mock);

test("overview combines professional data and links to tournament history", async (t) => {
  await t.expect(Selector(".top-heading .title").innerText).eql("Esports");
  await t.expect(Selector("a").withText("Test Championship").exists).ok();
  await t.expect(Selector("td").withText("2 – 0").exists).ok();
  await t.expect(Selector("a").withText("Test Pro").exists).notOk();
  await t.expect(Selector("a").withText("Anti-Mage").exists).ok();
  await t.click(Selector("a").withAttribute("href", "/esports/leagues/42").nth(0));
  await t.expect(Selector(".top-heading .title").innerText).eql("Test Championship");
  await t.expect(Selector("a").withAttribute("href", "/matches/101").exists).ok();
  await t.expect(Selector(".series-games").withText("#7").exists).ok();
  await t.expect(Selector("summary").withText("BO3").exists).ok();
  await t.expect(Selector(".series-games a").withText("Game 1").visible).ok();
});

test.page`http://localhost:5000/esports/tournaments`("directory displays all tiers and filters by name and tier", async (t) => {
  await t.expect(Selector("td").withText("Test Championship").exists).ok();
  await t.expect(Selector("td").withText("Professional Cup").exists).ok();
  await t.expect(Selector("td").withText("Amateur Cup").exists).ok();
  await t.click(Selector("select")).click(Selector("option").withAttribute("value", "premium"));
  await t.expect(Selector("td").withText("Professional Cup").exists).notOk();
  await t.typeText(Selector("input").withAttribute("type", "text").nth(-1), "nonexistent tournament");
  await t.expect(Selector("p").withText("No results found.").exists).ok();
});

test.page`http://localhost:5000/esports/players`("professional player directory links to profiles", async (t) => {
  await t.expect(Selector("a").withAttribute("href", "/players/5").innerText).eql("Test Pro");
});

test("series logos fall back to the team detail endpoint", async (t) => {
  const seriesPanel = Selector("section").withText("Recent series");
  await t.expect(seriesPanel.find("img").withAttribute("src", detailLogo).exists).ok();
});

test.page`http://localhost:5000/esports/leagues/43`("historical tournaments use league history and show tournament details", async (t) => {
  await t.expect(Selector(".top-heading .title").innerText).eql("Professional Cup");
  await t.expect(Selector("h2").withText("Professional Cup").exists).ok();
  await t.expect(Selector("dt").withText("First recorded match").exists).ok();
  await t.expect(Selector("h2").withText("Participating teams").exists).ok();
  await t.expect(Selector("summary strong").withText("2 – 0").exists).ok();
  await t.expect(Selector(".series-games a").withText("Game 1 · 201").visible).ok();
  await t.expect(Selector(".series-games a").withText("Game 2 · 202").visible).ok();
});
