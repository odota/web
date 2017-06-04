export default function transformRankings(json) {
  return json.filter(ranking => ranking.rank).sort((a, b) => (b.rank / b.card) - (a.rank / a.card));
}
