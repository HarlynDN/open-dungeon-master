import { defineMessages } from "./catalog.ts";

// Original ODM pregen text and entry UI; proper names and mechanics stay canonical.
export const ENTRY_CHARACTER_MESSAGES = /*#__PURE__*/ defineMessages({
  "entryCharacter.companion.title": {
    "en": "Build a companion",
    "zh-CN": "创建同伴"
  },
  "entryCharacter.companion.human": {
    "en": "This ally joins the party as a character you play from the DM console. In combat their turn waits for you: act for them, then end the turn. They start at the party's level.",
    "zh-CN": "这位同伴加入队伍后，由你在 DM 控制台操控。战斗轮到他们时，需要你代为行动并结束回合。他们的起始等级与队伍一致。"
  },
  "entryCharacter.companion.ai": {
    "en": "This ally joins the party as an AI companion the DM plays. They start at the party's level.",
    "zh-CN": "这位同伴加入队伍后，由 AI DM 操控。他们的起始等级与队伍一致。"
  },
  "entryCharacter.companion.library": {
    "en": "From your library",
    "zh-CN": "从你的角色库选择"
  },
  "entryCharacter.companion.level": {
    "en": "level {level}",
    "zh-CN": "等级 {level}"
  },
  "entryCharacter.companion.adapt": {
    "en": "They arrive at level {level}, adapted the same way a player character is.",
    "zh-CN": "他们将以 {level} 级加入，等级调整方式与玩家角色相同。"
  },
  "entryCharacter.companion.add": {
    "en": "Add companion",
    "zh-CN": "添加同伴"
  },
  "entryCharacter.close": {
    "en": "Close",
    "zh-CN": "关闭"
  },
  "entryCharacter.retry": {
    "en": "Try again",
    "zh-CN": "重试"
  },
  "entryCharacter.gate.title": {
    "en": "The adventure is underway.",
    "zh-CN": "冒险已经开始。"
  },
  "entryCharacter.gate.description": {
    "en": "Create your character to step into the scene. You can bring one from your library or build a new one.",
    "zh-CN": "创建角色后即可加入故事。你可以使用角色库中的角色，也可以创建新角色。"
  },
  "entryCharacter.gate.create": {
    "en": "Create your character",
    "zh-CN": "创建角色"
  },
  "entryCharacter.error.create": {
    "en": "Could not create the companion.",
    "zh-CN": "未能创建同伴。"
  },
  "entryCharacter.error.library": {
    "en": "Could not load your companions.",
    "zh-CN": "未能加载角色库中的同伴。"
  },
  "entryCharacter.error.heroes": {
    "en": "Could not load the ready-made heroes.",
    "zh-CN": "未能加载预设英雄。"
  },
  "entryCharacter.error.unavailable": {
    "en": "Building a party companion is not available at this table.",
    "zh-CN": "这张游戏桌不允许创建队伍同伴。"
  },
  "entryCharacter.error.full": {
    "en": "The party already has its full number of companions.",
    "zh-CN": "队伍同伴数量已达上限。"
  },
  "entryCharacter.error.invalid": {
    "en": "Invalid companion sheet.",
    "zh-CN": "同伴角色卡无效。"
  },
  "entryCharacter.error.missing": {
    "en": "That companion is not in your library.",
    "zh-CN": "你的角色库中没有这位同伴。"
  },
  "entryCharacter.error.noHero": {
    "en": "No such hero.",
    "zh-CN": "找不到该预设英雄。"
  },
  "entryCharacter.error.dmSeat": {
    "en": "The DM seat plays no character.",
    "zh-CN": "DM 席位不使用玩家角色。"
  },
  "entryCharacter.pregen.brakk.tagline": {
    "en": "Brakk, human barbarian",
    "zh-CN": "Brakk，人类野蛮人"
  },
  "entryCharacter.pregen.brakk.blurb": {
    "en": "Hits first and asks later. Swing the greataxe, shrug off blows, and keep the others alive by standing in front of them.",
    "zh-CN": "先动手，后问话。挥舞巨斧，扛下攻击，挡在同伴身前保护他们。"
  },
  "entryCharacter.pregen.brakk.backstory": {
    "en": "Raised in the high passes, Brakk came down to the lowlands when the herds died, and has not found a reason to go back.",
    "zh-CN": "Brakk 在高山隘口长大。牲畜死去后，Brakk 来到低地，此后一直没有找到回去的理由。"
  },
  "entryCharacter.pregen.kara.tagline": {
    "en": "Kara, human fighter",
    "zh-CN": "Kara，人类战士"
  },
  "entryCharacter.pregen.kara.blurb": {
    "en": "Shield, sword and chain mail. The steadiest hand at the table: hard to hit, harder to move, and always has a plan for the door.",
    "zh-CN": "盾牌、长剑与链甲。队伍中最稳健的成员：难以击中，更难撼动，面对紧闭的大门总有办法。"
  },
  "entryCharacter.pregen.kara.backstory": {
    "en": "Ten years in a river baron's guard, mustered out when the baron ran out of money. Still salutes by habit.",
    "zh-CN": "Kara 曾在一位河畔领主的卫队服役十年，直到领主无力支付军饷才被遣散。Kara 至今仍习惯性地敬礼。"
  },
  "entryCharacter.pregen.vex.tagline": {
    "en": "Vex, human rogue",
    "zh-CN": "Vex，人类游荡者"
  },
  "entryCharacter.pregen.vex.blurb": {
    "en": "Locks, shadows and a rapier. Scout ahead, find the trap before it finds you, and strike where it hurts.",
    "zh-CN": "锁具、阴影与刺剑。向前侦察，抢先发现陷阱，攻击敌人的要害。"
  },
  "entryCharacter.pregen.vex.backstory": {
    "en": "Left a city guild one step ahead of a debt. Keeps a list of people who are owed, and a shorter list of people who are owed by Vex.",
    "zh-CN": "Vex 为躲避债务，抢先一步离开了城里的公会。Vex 记着谁有债要收，也记着自己欠了谁——后一份名单要短得多。"
  },
  "entryCharacter.pregen.sera.tagline": {
    "en": "Sera, human cleric of life",
    "zh-CN": "Sera，人类生命领域牧师"
  },
  "entryCharacter.pregen.sera.blurb": {
    "en": "Mace, shield and a healer's hands. Keeps the party standing with Cure Wounds and Bless, and can hold a line herself.",
    "zh-CN": "钉头锤、盾牌与善于治疗的双手。用治疗伤口和祝福术支援队伍，自己也能守住战线。"
  },
  "entryCharacter.pregen.sera.backstory": {
    "en": "A chapel orphan who learned that a steady voice and a steadier hand do more good than a sermon.",
    "zh-CN": "Sera 是在礼拜堂长大的孤儿。她学会了：沉稳的话语和更稳的双手，比一场布道更能帮到别人。"
  }
});
