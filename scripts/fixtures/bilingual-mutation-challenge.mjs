// Supplemental challenge, authored after the first fixed-fixture run.
// Never used to tune thresholds. A failure disables a mutation shortcut;
// passing these examples still does not prove semantic identity in general.
export const mutationChallenge = [
  ["fact", "The party paid the eastern gate guard ten gold coins to enter the city and continue searching for the missing children.", "The party paid the eastern gate guard twenty gold coins to enter the city and continue searching for the missing children."],
  ["fact", "队伍在东门交给守卫十枚金币，以便进入城市并继续寻找失踪的孩子。", "队伍在东门交给守卫二十枚金币，以便进入城市并继续寻找失踪的孩子。"],
  ["fact", "马拉把金库的钥匙交给托文后，队伍离开港口前往北方寻找失踪的村民。", "马拉没有把金库的钥匙交给托文，队伍离开港口前往北方寻找失踪的村民。"],
  ["fact", "The knight Serin promised to defend the village while the party looked for the children.", "The knight Serin refused to defend the village while the party looked for the children."],
  ["waypoint", "找到东侧矿井里的失踪孩子", "找到西侧矿井里的失踪孩子"],
].map(([use, a, b], index) => ({ id: `challenge-${index}`, use, same: false, a, b }));
