import { defineMessages } from "./catalog.ts";

// Original display labels drafted from repository English names. Canonical
// tool and fictional-language names are retained in stored sheets and APIs.
export const CHARACTER_TRAINING_NAMES = [
  {
    "type": "tool",
    "name": "alchemist's supplies",
    "key": "training.tool.alchemist_s_supplies"
  },
  {
    "type": "tool",
    "name": "brewer's supplies",
    "key": "training.tool.brewer_s_supplies"
  },
  {
    "type": "tool",
    "name": "calligrapher's supplies",
    "key": "training.tool.calligrapher_s_supplies"
  },
  {
    "type": "tool",
    "name": "carpenter's tools",
    "key": "training.tool.carpenter_s_tools"
  },
  {
    "type": "tool",
    "name": "cartographer's tools",
    "key": "training.tool.cartographer_s_tools"
  },
  {
    "type": "tool",
    "name": "cobbler's tools",
    "key": "training.tool.cobbler_s_tools"
  },
  {
    "type": "tool",
    "name": "cook's utensils",
    "key": "training.tool.cook_s_utensils"
  },
  {
    "type": "tool",
    "name": "glassblower's tools",
    "key": "training.tool.glassblower_s_tools"
  },
  {
    "type": "tool",
    "name": "jeweler's tools",
    "key": "training.tool.jeweler_s_tools"
  },
  {
    "type": "tool",
    "name": "leatherworker's tools",
    "key": "training.tool.leatherworker_s_tools"
  },
  {
    "type": "tool",
    "name": "mason's tools",
    "key": "training.tool.mason_s_tools"
  },
  {
    "type": "tool",
    "name": "painter's supplies",
    "key": "training.tool.painter_s_supplies"
  },
  {
    "type": "tool",
    "name": "potter's tools",
    "key": "training.tool.potter_s_tools"
  },
  {
    "type": "tool",
    "name": "smith's tools",
    "key": "training.tool.smith_s_tools"
  },
  {
    "type": "tool",
    "name": "tinker's tools",
    "key": "training.tool.tinker_s_tools"
  },
  {
    "type": "tool",
    "name": "weaver's tools",
    "key": "training.tool.weaver_s_tools"
  },
  {
    "type": "tool",
    "name": "woodcarver's tools",
    "key": "training.tool.woodcarver_s_tools"
  },
  {
    "type": "tool",
    "name": "bagpipes",
    "key": "training.tool.bagpipes"
  },
  {
    "type": "tool",
    "name": "drum",
    "key": "training.tool.drum"
  },
  {
    "type": "tool",
    "name": "dulcimer",
    "key": "training.tool.dulcimer"
  },
  {
    "type": "tool",
    "name": "flute",
    "key": "training.tool.flute"
  },
  {
    "type": "tool",
    "name": "lute",
    "key": "training.tool.lute"
  },
  {
    "type": "tool",
    "name": "lyre",
    "key": "training.tool.lyre"
  },
  {
    "type": "tool",
    "name": "horn",
    "key": "training.tool.horn"
  },
  {
    "type": "tool",
    "name": "pan flute",
    "key": "training.tool.pan_flute"
  },
  {
    "type": "tool",
    "name": "shawm",
    "key": "training.tool.shawm"
  },
  {
    "type": "tool",
    "name": "viol",
    "key": "training.tool.viol"
  },
  {
    "type": "tool",
    "name": "dice set",
    "key": "training.tool.dice_set"
  },
  {
    "type": "tool",
    "name": "dragonchess set",
    "key": "training.tool.dragonchess_set"
  },
  {
    "type": "tool",
    "name": "playing card set",
    "key": "training.tool.playing_card_set"
  },
  {
    "type": "tool",
    "name": "three-dragon ante set",
    "key": "training.tool.three_dragon_ante_set"
  },
  {
    "type": "tool",
    "name": "thieves' tools",
    "key": "training.tool.thieves_tools"
  },
  {
    "type": "tool",
    "name": "herbalism kit",
    "key": "training.tool.herbalism_kit"
  },
  {
    "type": "tool",
    "name": "disguise kit",
    "key": "training.tool.disguise_kit"
  },
  {
    "type": "tool",
    "name": "forgery kit",
    "key": "training.tool.forgery_kit"
  },
  {
    "type": "tool",
    "name": "navigator's tools",
    "key": "training.tool.navigator_s_tools"
  },
  {
    "type": "tool",
    "name": "vehicles (land)",
    "key": "training.tool.vehicles_land"
  },
  {
    "type": "tool",
    "name": "vehicles (water)",
    "key": "training.tool.vehicles_water"
  },
  {
    "type": "language",
    "name": "Common",
    "key": "training.language.common"
  },
  {
    "type": "language",
    "name": "Dwarvish",
    "key": "training.language.dwarvish"
  },
  {
    "type": "language",
    "name": "Elvish",
    "key": "training.language.elvish"
  },
  {
    "type": "language",
    "name": "Giant",
    "key": "training.language.giant"
  },
  {
    "type": "language",
    "name": "Gnomish",
    "key": "training.language.gnomish"
  },
  {
    "type": "language",
    "name": "Goblin",
    "key": "training.language.goblin"
  },
  {
    "type": "language",
    "name": "Halfling",
    "key": "training.language.halfling"
  },
  {
    "type": "language",
    "name": "Orc",
    "key": "training.language.orc"
  },
  {
    "type": "language",
    "name": "Abyssal",
    "key": "training.language.abyssal"
  },
  {
    "type": "language",
    "name": "Celestial",
    "key": "training.language.celestial"
  },
  {
    "type": "language",
    "name": "Draconic",
    "key": "training.language.draconic"
  },
  {
    "type": "language",
    "name": "Deep Speech",
    "key": "training.language.deep_speech"
  },
  {
    "type": "language",
    "name": "Infernal",
    "key": "training.language.infernal"
  },
  {
    "type": "language",
    "name": "Primordial",
    "key": "training.language.primordial"
  },
  {
    "type": "language",
    "name": "Sylvan",
    "key": "training.language.sylvan"
  },
  {
    "type": "language",
    "name": "Undercommon",
    "key": "training.language.undercommon"
  },
  {
    "type": "language",
    "name": "Auran",
    "key": "training.language.auran"
  },
  {
    "type": "language",
    "name": "Aquan",
    "key": "training.language.aquan"
  },
  {
    "type": "language",
    "name": "Ignan",
    "key": "training.language.ignan"
  },
  {
    "type": "language",
    "name": "Terran",
    "key": "training.language.terran"
  },
  {
    "type": "language",
    "name": "Druidic",
    "key": "training.language.druidic"
  },
  {
    "type": "language",
    "name": "Thieves' Cant",
    "key": "training.language.thieves_cant"
  },
  {
    "type": "toolCategory",
    "name": "tool",
    "key": "training.toolCategory.tool"
  },
  {
    "type": "toolCategory",
    "name": "artisan's tools",
    "key": "training.toolCategory.artisan_s_tools"
  },
  {
    "type": "toolCategory",
    "name": "musical instrument",
    "key": "training.toolCategory.musical_instrument"
  },
  {
    "type": "toolCategory",
    "name": "artisan's tools or musical instrument",
    "key": "training.toolCategory.artisan_s_tools_or_musical_instrument"
  },
  {
    "type": "toolCategory",
    "name": "gaming set",
    "key": "training.toolCategory.gaming_set"
  },
  {
    "type": "toolCategory",
    "name": "artisan's tools or gaming set",
    "key": "training.toolCategory.artisan_s_tools_or_gaming_set"
  },
  {
    "type": "toolCategory",
    "name": "musical instrument or gaming set",
    "key": "training.toolCategory.musical_instrument_or_gaming_set"
  },
  {
    "type": "toolCategory",
    "name": "artisan's tools or musical instrument or gaming set",
    "key": "training.toolCategory.artisan_s_tools_or_musical_instrument_or_gaming_set"
  }
] as const;

export const CHARACTER_TRAINING_NAME_MESSAGES = /*#__PURE__*/ defineMessages({
  "training.tool.alchemist_s_supplies": {
    "en": "alchemist's supplies",
    "zh-CN": "炼金工具"
  },
  "training.tool.brewer_s_supplies": {
    "en": "brewer's supplies",
    "zh-CN": "酿造工具"
  },
  "training.tool.calligrapher_s_supplies": {
    "en": "calligrapher's supplies",
    "zh-CN": "书法工具"
  },
  "training.tool.carpenter_s_tools": {
    "en": "carpenter's tools",
    "zh-CN": "木工工具"
  },
  "training.tool.cartographer_s_tools": {
    "en": "cartographer's tools",
    "zh-CN": "制图工具"
  },
  "training.tool.cobbler_s_tools": {
    "en": "cobbler's tools",
    "zh-CN": "制鞋工具"
  },
  "training.tool.cook_s_utensils": {
    "en": "cook's utensils",
    "zh-CN": "烹饪用具"
  },
  "training.tool.glassblower_s_tools": {
    "en": "glassblower's tools",
    "zh-CN": "吹制玻璃工具"
  },
  "training.tool.jeweler_s_tools": {
    "en": "jeweler's tools",
    "zh-CN": "珠宝工具"
  },
  "training.tool.leatherworker_s_tools": {
    "en": "leatherworker's tools",
    "zh-CN": "皮革加工工具"
  },
  "training.tool.mason_s_tools": {
    "en": "mason's tools",
    "zh-CN": "石匠工具"
  },
  "training.tool.painter_s_supplies": {
    "en": "painter's supplies",
    "zh-CN": "绘画工具"
  },
  "training.tool.potter_s_tools": {
    "en": "potter's tools",
    "zh-CN": "制陶工具"
  },
  "training.tool.smith_s_tools": {
    "en": "smith's tools",
    "zh-CN": "铁匠工具"
  },
  "training.tool.tinker_s_tools": {
    "en": "tinker's tools",
    "zh-CN": "修补匠工具"
  },
  "training.tool.weaver_s_tools": {
    "en": "weaver's tools",
    "zh-CN": "织布工具"
  },
  "training.tool.woodcarver_s_tools": {
    "en": "woodcarver's tools",
    "zh-CN": "木雕工具"
  },
  "training.tool.bagpipes": {
    "en": "bagpipes",
    "zh-CN": "风笛"
  },
  "training.tool.drum": {
    "en": "drum",
    "zh-CN": "鼓"
  },
  "training.tool.dulcimer": {
    "en": "dulcimer",
    "zh-CN": "扬琴"
  },
  "training.tool.flute": {
    "en": "flute",
    "zh-CN": "长笛"
  },
  "training.tool.lute": {
    "en": "lute",
    "zh-CN": "鲁特琴"
  },
  "training.tool.lyre": {
    "en": "lyre",
    "zh-CN": "里拉琴"
  },
  "training.tool.horn": {
    "en": "horn",
    "zh-CN": "号角"
  },
  "training.tool.pan_flute": {
    "en": "pan flute",
    "zh-CN": "排箫"
  },
  "training.tool.shawm": {
    "en": "shawm",
    "zh-CN": "肖姆管"
  },
  "training.tool.viol": {
    "en": "viol",
    "zh-CN": "维奥尔琴"
  },
  "training.tool.dice_set": {
    "en": "dice set",
    "zh-CN": "骰子组"
  },
  "training.tool.dragonchess_set": {
    "en": "dragonchess set",
    "zh-CN": "龙棋组"
  },
  "training.tool.playing_card_set": {
    "en": "playing card set",
    "zh-CN": "纸牌组"
  },
  "training.tool.three_dragon_ante_set": {
    "en": "three-dragon ante set",
    "zh-CN": "三龙赌牌组"
  },
  "training.tool.thieves_tools": {
    "en": "thieves' tools",
    "zh-CN": "盗贼工具"
  },
  "training.tool.herbalism_kit": {
    "en": "herbalism kit",
    "zh-CN": "草药工具"
  },
  "training.tool.disguise_kit": {
    "en": "disguise kit",
    "zh-CN": "易容工具"
  },
  "training.tool.forgery_kit": {
    "en": "forgery kit",
    "zh-CN": "伪造工具"
  },
  "training.tool.navigator_s_tools": {
    "en": "navigator's tools",
    "zh-CN": "导航工具"
  },
  "training.tool.vehicles_land": {
    "en": "vehicles (land)",
    "zh-CN": "陆地载具"
  },
  "training.tool.vehicles_water": {
    "en": "vehicles (water)",
    "zh-CN": "水上载具"
  },
  "training.language.common": {
    "en": "Common",
    "zh-CN": "通用语"
  },
  "training.language.dwarvish": {
    "en": "Dwarvish",
    "zh-CN": "矮人语"
  },
  "training.language.elvish": {
    "en": "Elvish",
    "zh-CN": "精灵语"
  },
  "training.language.giant": {
    "en": "Giant",
    "zh-CN": "巨人语"
  },
  "training.language.gnomish": {
    "en": "Gnomish",
    "zh-CN": "侏儒语"
  },
  "training.language.goblin": {
    "en": "Goblin",
    "zh-CN": "哥布林语"
  },
  "training.language.halfling": {
    "en": "Halfling",
    "zh-CN": "半身人语"
  },
  "training.language.orc": {
    "en": "Orc",
    "zh-CN": "兽人语"
  },
  "training.language.abyssal": {
    "en": "Abyssal",
    "zh-CN": "深渊语"
  },
  "training.language.celestial": {
    "en": "Celestial",
    "zh-CN": "天界语"
  },
  "training.language.draconic": {
    "en": "Draconic",
    "zh-CN": "龙语"
  },
  "training.language.deep_speech": {
    "en": "Deep Speech",
    "zh-CN": "深层语"
  },
  "training.language.infernal": {
    "en": "Infernal",
    "zh-CN": "炼狱语"
  },
  "training.language.primordial": {
    "en": "Primordial",
    "zh-CN": "原初语"
  },
  "training.language.sylvan": {
    "en": "Sylvan",
    "zh-CN": "林地语"
  },
  "training.language.undercommon": {
    "en": "Undercommon",
    "zh-CN": "地底通用语"
  },
  "training.language.auran": {
    "en": "Auran",
    "zh-CN": "气族语"
  },
  "training.language.aquan": {
    "en": "Aquan",
    "zh-CN": "水族语"
  },
  "training.language.ignan": {
    "en": "Ignan",
    "zh-CN": "火族语"
  },
  "training.language.terran": {
    "en": "Terran",
    "zh-CN": "土族语"
  },
  "training.language.druidic": {
    "en": "Druidic",
    "zh-CN": "德鲁伊语"
  },
  "training.language.thieves_cant": {
    "en": "Thieves' Cant",
    "zh-CN": "盗贼暗语"
  },
  "training.toolCategory.tool": {
    "en": "tool",
    "zh-CN": "工具"
  },
  "training.toolCategory.artisan_s_tools": {
    "en": "artisan's tools",
    "zh-CN": "工匠工具"
  },
  "training.toolCategory.musical_instrument": {
    "en": "musical instrument",
    "zh-CN": "乐器"
  },
  "training.toolCategory.artisan_s_tools_or_musical_instrument": {
    "en": "artisan's tools or musical instrument",
    "zh-CN": "工匠工具或乐器"
  },
  "training.toolCategory.gaming_set": {
    "en": "gaming set",
    "zh-CN": "游戏用具"
  },
  "training.toolCategory.artisan_s_tools_or_gaming_set": {
    "en": "artisan's tools or gaming set",
    "zh-CN": "工匠工具或游戏用具"
  },
  "training.toolCategory.musical_instrument_or_gaming_set": {
    "en": "musical instrument or gaming set",
    "zh-CN": "乐器或游戏用具"
  },
  "training.toolCategory.artisan_s_tools_or_musical_instrument_or_gaming_set": {
    "en": "artisan's tools or musical instrument or gaming set",
    "zh-CN": "工匠工具或乐器或游戏用具"
  }
});
