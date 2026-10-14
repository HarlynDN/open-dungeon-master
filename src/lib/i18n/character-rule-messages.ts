import { defineMessages } from "./catalog.ts";

// Original UI translations of the project’s rule refusals. Engine English
// strings are retained at their emitters; these keys carry display semantics.
export const CHARACTER_RULE_MESSAGES = /*#__PURE__*/ defineMessages({
  "ruleProblem.classDuplicate": {
    "en": "A character can hold each class only once. Remove the duplicate class.",
    "zh-CN": "同一个职业只能列出一次，请移除重复的职业。"
  },
  "ruleProblem.classLimit": {
    "en": "A character can hold at most {limit} classes; {count} are listed.",
    "zh-CN": "角色最多拥有 {limit} 个职业，当前列出了 {count} 个。"
  },
  "ruleProblem.classOrder": {
    "en": "The first class ({first}) must match the character’s primary class ({primary}).",
    "zh-CN": "职业列表中的第一个职业（{first}）必须与角色的主职业（{primary}）一致。"
  },
  "ruleProblem.classLevels": {
    "en": "The class levels total {total}, while the character level is {level}. They must match.",
    "zh-CN": "各职业等级合计为 {total}，角色等级为 {level}，两者必须一致。"
  },
  "ruleProblem.classUnknownSecond": {
    "en": "The server does not know the class “{class}”.",
    "zh-CN": "服务器没有名为“{class}”的职业。"
  },
  "ruleProblem.classUnearned": {
    "en": "Additional classes are earned through level-ups in play; {class} level {level} has not been earned.",
    "zh-CN": "额外职业需要在游玩中的升级时取得；角色尚未取得 {level} 级{class}。"
  },
  "ruleProblem.classPrerequisite": {
    "en": "Holding levels in {class} alongside another class requires {requirement}.",
    "zh-CN": "兼职{class}需要满足：{requirement}。"
  },
  "ruleProblem.subclassUnknown": {
    "en": "{subclass} is not a subclass of {class}. Choose from that class’s list.",
    "zh-CN": "“{subclass}”不属于{class}的子职业，请从该职业的列表中选择。"
  },
  "ruleProblem.racialIncrease": {
    "en": "{race} can increase {count} distinct eligible abilities ({choices}) that the race does not already raise; {ability} is not eligible.",
    "zh-CN": "{race}的自选属性提升必须分配给 {count} 项不同的属性（可选：{choices}），且不能选择种族已固定提升的属性；{ability}不符合要求。"
  },
  "ruleProblem.classUnknown": {
    "en": "The server does not know the class “{class}”. Choose from the builder’s list.",
    "zh-CN": "服务器没有名为“{class}”的职业，请从角色创建列表中选择。"
  },
  "ruleProblem.raceUnknown": {
    "en": "The server does not know the race “{race}”. Choose from the builder’s list.",
    "zh-CN": "服务器没有名为“{race}”的种族，请从角色创建列表中选择。"
  },
  "ruleProblem.backgroundUnknown": {
    "en": "The server does not know the background “{background}”. Choose from the builder’s list.",
    "zh-CN": "服务器没有名为“{background}”的背景，请从角色创建列表中选择。"
  },
  "ruleProblem.improvementCount": {
    "en": "This character has earned {earned} Ability Score Improvements, but {count} are recorded.",
    "zh-CN": "角色在当前等级共取得 {earned} 次属性提升，却记录了 {count} 次。"
  },
  "ruleProblem.racialFeatMissing": {
    "en": "{race} starts with {count} chosen feats. Choose them from the feat list.",
    "zh-CN": "{race}在创建时可以自选 {count} 项专长，请从专长列表中选足。"
  },
  "ruleProblem.hitPointRange": {
    "en": "A level {level} {class} with Constitution {constitution} has {min}–{max} hit points; the sheet records {actual}.",
    "zh-CN": "{level} 级{class}在体质为 {constitution} 时，生命值应为 {min} 至 {max}；角色卡记录的是 {actual}。"
  },
  "ruleProblem.racialCantrip": {
    "en": "{race} requires a {class} cantrip; {spell} does not qualify.",
    "zh-CN": "{race}的种族戏法必须来自{class}的戏法列表；“{spell}”不符合要求。"
  },
  "ruleProblem.ancestryInvalid": {
    "en": "“{choice}” is not a draconic ancestry. Choose black, blue, brass, bronze, copper, gold, green, red, silver or white.",
    "zh-CN": "“{choice}”不是可选的龙族血统。请选择黑、蓝、黄铜、青铜、赤铜、金、绿、红、银或白龙血统。"
  },
  "ruleProblem.ancestryMissing": {
    "en": "Choose a draconic ancestry: black, blue, brass, bronze, copper, gold, green, red, silver or white.",
    "zh-CN": "龙裔需要选择一种龙族血统：黑、蓝、黄铜、青铜、赤铜、金、绿、红、银或白龙。"
  },
  "ruleProblem.importGold": {
    "en": "A level {level} imported character can carry at most {limit} gp; the file records {actual}. Lower the amount and let the DM award the rest.",
    "zh-CN": "导入的 {level} 级角色最多携带 {limit} 金币，文件记录了 {actual} 金币。请降低数量，其余财富由地下城主在游玩中授予。"
  },
  "ruleProblem.importAttunement": {
    "en": "This character can attune to at most {limit} magic items; the file records {actual}.",
    "zh-CN": "此角色最多可同调 {limit} 件魔法物品，文件却记录了 {actual} 件。"
  },
  "ruleProblem.abilityCap": {
    "en": "{ability} is {actual}. Without a feature or item raising the cap, lower it to {limit} or less.",
    "zh-CN": "{ability}为 {actual}。若没有特性或物品提高其上限，请将其降至 {limit} 或以下。"
  },
  "ruleProblem.abilityBounds": {
    "en": "Before racial increases and earned improvements, the scores are {scores}. Every base score must be between {min} and {max}.",
    "zh-CN": "扣除种族加值和已取得的属性提升后，基础属性值为 {scores}。每项基础属性必须处于 {min} 至 {max} 之间。"
  },
  "ruleProblem.abilityMethod": {
    "en": "Before racial increases, the scores are {scores}. Use the standard array ({array}), a {budget}-point buy with base scores from {min} to {max}, or this character’s six server rolls.",
    "zh-CN": "扣除种族加值后，基础属性值为 {scores}。它们必须来自标准数组（{array}）、基础属性为 {min} 至 {max} 的 {budget} 点购点法，或服务器为此角色掷出的六项结果。"
  },
  "ruleProblem.trainingRacialToolOffered": {
    "en": "{tool} is not a tool {race} may choose. Choose one of {choices}.",
    "zh-CN": "“{tool}”不属于{race}可选的工具熟练项。请从以下工具中选择一项：{choices}。"
  },
  "ruleProblem.trainingRacialToolNone": {
    "en": "{race} grants no chosen tool proficiency; {tool} cannot be selected as a racial tool.",
    "zh-CN": "{race}不授予自选的工具熟练项，不能将“{tool}”选为种族工具熟练项。"
  },
  "ruleProblem.trainingToolNotOffered": {
    "en": "{tool} cannot answer an available tool choice. The choices are {offers}.",
    "zh-CN": "“{tool}”不能填入当前可选的工具熟练项：它不在可选范围内，或相应名额已用完。可选项为：{offers}。"
  },
  "ruleProblem.trainingToolsMissing": {
    "en": "Choose the remaining tools to be proficient with: {offers}.",
    "zh-CN": "还需要选择以下工具熟练项：{offers}。"
  },
  "ruleProblem.trainingSkillUnknown": {
    "en": "{skill} is not one of the {count} skills.",
    "zh-CN": "“{skill}”不属于规则中的 {count} 项技能。"
  },
  "ruleProblem.trainingSkillsOffered": {
    "en": "The chosen skills ({choices}) exceed the available count or range. {offers}",
    "zh-CN": "你选择的技能（{choices}）超出了角色可选的数量或范围。{offers}"
  },
  "ruleProblem.trainingExpertiseUntrained": {
    "en": "Expertise doubles an existing proficiency. The character is not proficient in {choices}.",
    "zh-CN": "专精只能使角色已取得的熟练加值翻倍；角色尚未取得以下熟练项：{choices}。"
  },
  "ruleProblem.trainingExpertiseLimit": {
    "en": "The character has earned {earned} expertise choices, but {count} are recorded.",
    "zh-CN": "角色共取得 {earned} 项专精，却记录了 {count} 项。"
  },
  "ruleProblem.trainingExpertiseNone": {
    "en": "This character has no expertise choices. Rogues gain them at levels 1 and 6, and bards at levels 3 and 10.",
    "zh-CN": "此角色尚未取得自选专精。游荡者在 1 级和 6 级取得专精，吟游诗人在 3 级和 10 级取得专精。"
  },
  "ruleProblem.trainingLanguageLimit": {
    "en": "{sources} grant {limit} chosen fictional languages; {count} were chosen ({choices}).",
    "zh-CN": "{sources}共授予 {limit} 项自选游戏内语言；你选择了 {count} 项（{choices}）。"
  },
  "ruleProblem.featureUnearned": {"en": "“{feature}” is an unearned {source} feature. Features come from class, race and background; these boons are granted by whoever runs the table. Remove it.", "zh-CN": "“{feature}”是尚未取得的{source}特性。角色的特性来自职业、种族和背景；此类恩赐须由主持游戏的人在游玩中授予，请移除。"},
  "ruleProblem.featLimit": {"en": "The character has {room} feat slots beyond recorded improvements, but {count} feats were chosen: {feats}.", "zh-CN": "除已记录的属性提升外，角色还有 {room} 个专长名额，却选择了 {count} 项专长（{feats}），请减少。"},
  "ruleProblem.featNoImprovement": {"en": "A feat replaces an Ability Score Improvement. These feats have no improvement behind them: {feats}.", "zh-CN": "专长需要替代一次属性提升；以下专长没有对应的属性提升名额：{feats}。"},
  "ruleProblem.featUnknown": {"en": "“{feat}” is not a feat the server knows. Choose from the feat list.", "zh-CN": "服务器没有名为“{feat}”的专长，请从专长列表中选择。"},
  "ruleProblem.featPrerequisite": {"en": "{feat} requires {requirement}; the character does not meet the prerequisite.", "zh-CN": "{feat}需要满足以下前置条件：{requirement}；此角色尚未满足。"},
  "ruleProblem.featAbilityMissing": {"en": "{feat} raises one of {choices} by {amount}. Choose an eligible ability.", "zh-CN": "{feat}可使以下一项属性提高 {amount} 点：{choices}。请选择一项符合要求的属性。"},
  "ruleProblem.featPicksMissing": {"en": "{feat}: choose {choices}.", "zh-CN": "{feat}：还需要选择{choices}。"},
  "ruleProblem.featDamageOffered": {"en": "“{damage}” is not a damage type {feat} offers. Choose from {choices}.", "zh-CN": "“{damage}”不属于{feat}可选的伤害类型，请从以下类型中选择：{choices}。"},
  "ruleProblem.featSkillRestricted": {"en": "{skill} is not a skill {feat} offers; pick from {choices}.", "zh-CN": "{feat}不授予{skill}，请选择以下技能：{choices}。"},
  "ruleProblem.featSkillUnknown": {"en": "“{skill}” is not a skill. Choose {feat}’s skill from the skill list.", "zh-CN": "“{skill}”不是规则中的技能，请从技能列表中选择{feat}授予的技能。"},
  "ruleProblem.featSkillDuplicate": {"en": "{feat} grants a new skill; the character is already proficient in {skill}.", "zh-CN": "{feat}授予一项新的技能熟练项；角色已熟练于{skill}，请选择另一项。"},
  "ruleProblem.featLanguageDuplicate": {"en": "{feat} grants new fictional languages; the character already speaks {language}.", "zh-CN": "{feat}授予新的游戏内语言；角色已会说{language}，请选择另一种。"},
  "ruleProblem.featExpertiseUntrained": {"en": "{feat} grants expertise in a trained skill; the character is not proficient in {skill}.", "zh-CN": "{feat}授予已熟练技能的专精；角色尚未熟练于{skill}，请选择已取得的技能熟练项。"},
  "ruleProblem.featExpertiseDuplicate": {"en": "The character already has expertise in {skill}. Choose another skill for {feat}.", "zh-CN": "角色已拥有{skill}专精，请为{feat}选择另一项技能。"},
  "ruleProblem.featToolOffered": {"en": "“{tool}” is not a tool {feat} offers. Choose from {choices}.", "zh-CN": "“{tool}”不属于{feat}可选的工具，请从以下工具中选择：{choices}。"},
  "ruleProblem.featToolDuplicate": {"en": "{feat} grants new tool training; the character is already proficient with {tool}.", "zh-CN": "{feat}授予新的工具熟练项；角色已熟练于{tool}，请选择另一项。"},
  "ruleProblem.featWeaponUnknown": {"en": "“{weapon}” is not a weapon on the table. Choose {feat}’s weapon from the weapon list.", "zh-CN": "“{weapon}”不是规则中的武器，请从武器列表中选择{feat}授予的武器熟练项。"},
  "ruleProblem.featWeaponOffered": {"en": "{weapon} is not a weapon {feat} offers. Choose from {choices}.", "zh-CN": "{weapon}不属于{feat}可选的武器，请从以下武器中选择：{choices}。"},
  "ruleProblem.featArmorOffered": {"en": "“{armor}” is not armor {feat} offers. Choose from {choices}.", "zh-CN": "“{armor}”不属于{feat}可选的护甲熟练项，请从以下项目中选择：{choices}。"},
  "ruleProblem.featArmorDuplicate": {"en": "{feat} grants new armor training; the character already has {armor}.", "zh-CN": "{feat}授予新的护甲熟练项；角色已取得{armor}，请选择另一项。"},
  "ruleDetail.requirementGroup": {"en": "({requirements})", "zh-CN": "（{requirements}）"},
  "ruleDetail.featArmorRequirement": {"en": "proficiency with {armor}", "zh-CN": "具有{armor}熟练项"},
  "ruleDetail.featCastingRequirement": {"en": "the ability to cast at least one spell", "zh-CN": "至少能施放一个法术"},
  "ruleDetail.featElfRequirement": {"en": "elf or half-elf", "zh-CN": "种族为精灵或半精灵"},
  "ruleDetail.featLevelRequirement": {"en": "level {minimum} or higher", "zh-CN": "至少达到 {minimum} 级"},
  "ruleDetail.featSkillsRequirement": {"en": "proficiency in at least one of {skills}", "zh-CN": "至少熟练于以下一项技能：{skills}"},
  "ruleDetail.featVehicleRequirement": {"en": "proficiency with at least one type of vehicle", "zh-CN": "至少具有一种载具的熟练项"},
  "ruleDetail.featWeaponsRequirement": {"en": "proficiency with a {category}{form} weapon", "zh-CN": "至少具有一种{category}{form}武器的熟练项"},
  "ruleDetail.featSourceRequirement": {"en": "untranslated prerequisite: {source}", "zh-CN": "前置条件（中文翻译待补）：{source}"},
  "ruleDetail.featPick": {"en": "{count} {kinds}", "zh-CN": " {count} 项{kinds}"},
  "ruleDetail.featPick.skills": {"en": "skills", "zh-CN": "技能熟练项"},
  "ruleDetail.featPick.languages": {"en": "fictional languages", "zh-CN": "游戏内语言"},
  "ruleDetail.featPick.tools": {"en": "tools", "zh-CN": "工具熟练项"},
  "ruleDetail.featPick.weapons": {"en": "weapons", "zh-CN": "武器熟练项"},
  "ruleDetail.featPick.armor": {"en": "armor", "zh-CN": "护甲熟练项"},
  "ruleDetail.featPick.expertise": {"en": "skill expertise choices", "zh-CN": "技能专精"},
  "ruleDetail.featPick.damage": {"en": "damage types", "zh-CN": "伤害类型"},
  "ruleDetail.weaponCategory.simple": {"en": "simple ", "zh-CN": "简易"},
  "ruleDetail.weaponCategory.martial": {"en": "martial ", "zh-CN": "军用"},
  "ruleDetail.weaponCategory.ranged": {"en": "ranged ", "zh-CN": "远程"},
  "ruleDetail.weaponCategory.melee": {"en": "melee ", "zh-CN": "近战"},
  "ruleDetail.weaponForm.ranged": {"en": "ranged ", "zh-CN": "远程"},
  "ruleDetail.weaponForm.melee": {"en": "melee ", "zh-CN": "近战"},
  "ruleProblem.spellUnknown": {"en": "“{spell}” is not a spell the server knows. Choose from the class spell list.", "zh-CN": "服务器没有名为“{spell}”的法术，请从职业法术列表中选择。"},
  "ruleProblem.spellNotCantrip": {"en": "{spell} is a level {level} spell, so it cannot be on the cantrip list.", "zh-CN": "{spell}是 {level} 环法术，不能放入戏法列表。"},
  "ruleProblem.spellCantripFiled": {"en": "{spell} is a cantrip. Put it on the cantrip list rather than among levelled spells.", "zh-CN": "{spell}是戏法，请将其放入戏法列表，而非有环阶的法术列表。"},
  "ruleProblem.spellRacialList": {"en": "{spell} is not a {list} cantrip, as the racial cantrip must be.", "zh-CN": "{spell}不属于{list}的戏法列表，不符合种族戏法的要求。"},
  "ruleProblem.spellClassList": {"en": "{spell} is not on the {list} list. A level {level} {class} cannot learn or prepare it.", "zh-CN": "{spell}不在{list}法术列表中，{level} 级{class}无法学习或准备它。"},
  "ruleProblem.spellLevel": {"en": "{spell} is a level {actual} spell. A level {level} {class} can cast up to level {top}.", "zh-CN": "{spell}是 {actual} 环法术；{level} 级{class}当前最高只能施放 {top} 环法术。"},
  "ruleProblem.spellKnownFiling": {"en": "A level {level} {class} knows spells and prepares none. Move {spells} to known spells or remove them.", "zh-CN": "{level} 级{class}直接学习法术，不使用准备法术的方式。请将{spells}放入已知法术列表，或从角色卡中移除。"},
  "ruleProblem.spellNoCasting": {"en": "{class} has no Spellcasting feature, so these spells cannot be on the sheet: {spells}.", "zh-CN": "{class}没有施法特性，角色卡不能持有以下法术：{spells}。"},
  "ruleProblem.spellCantripLimit": {"en": "A level {level} {class} knows {limit} cantrips; the list has {count}.", "zh-CN": "{level} 级{class}最多掌握 {limit} 个戏法，当前列表有 {count} 个。"},
  "ruleProblem.spellCountLimit": {"en": "A level {level} {class} may hold {limit} {kind}; the list has {count}.", "zh-CN": "{level} 级{class}最多拥有 {limit} 个{kind}，当前列表计入了 {count} 个。"},
  "ruleProblem.spellBookLimit": {"en": "A level {level} {class} starts with {limit} spells in the spellbook; the book has {count}.", "zh-CN": "{level} 级{class}在创建时的法术书最多包含 {limit} 个法术，当前记录了 {count} 个。"},
  "ruleProblem.spellNoSlots": {"en": "A level {level} {class} has no spell slots yet, so {spell} cannot be on the list.", "zh-CN": "{level} 级{class}尚未取得法术位，不能将{spell}加入法术列表。"},
  "ruleProblem.spellSchoolLimit": {"en": "A level {level} {subclass} learns spells from {choices} and {limit} from other schools; this list has {count} from other schools. Choose an allowed-school spell instead.", "zh-CN": "{level} 级{subclass}主要学习{choices}学派的法术，并可从其他学派学习 {limit} 个法术；当前其他学派的法术已有 {count} 个。请改选主要学派的法术。"},
  "ruleProblem.featSpellPicksMissing": {"en": "{feat}: choose {choices}.", "zh-CN": "{feat}：还需要选择{choices}。"},
  "ruleProblem.featSpellListOffered": {"en": "{feat} teaches from {choices}; {list} is not one of its lists.", "zh-CN": "{feat}的法术来自以下职业列表：{choices}；“{list}”不属于可选范围。"},
  "ruleProblem.featSpellUnknown": {"en": "“{spell}” is not a known spell. Choose {feat}’s {kind} from the spell list.", "zh-CN": "服务器没有名为“{spell}”的法术，请从法术列表中选择{feat}授予的{kind}。"},
  "ruleProblem.featSpellLevel": {"en": "{spell} is level {actual}; {feat}’s {kind} must be level {expected}.", "zh-CN": "{spell}的环阶为 {actual}，而{feat}授予的{kind}必须为 {expected} 环（0 环为戏法）。"},
  "ruleProblem.featSpellClassList": {"en": "{spell} is not on {choices}, which teach {feat}’s {kind}.", "zh-CN": "{spell}不在{choices}法术列表中，不符合{feat}授予的{kind}的要求。"},
  "ruleProblem.featSpellSchool": {"en": "{spell} belongs to {school}; choose {feat}’s spell from {choices}.", "zh-CN": "{spell}属于{school}学派；{feat}的法术必须来自以下学派：{choices}。"},
  "ruleProblem.featSpellRitual": {"en": "{spell} has no ritual tag; {feat}’s book holds rituals only.", "zh-CN": "{spell}没有仪式标签；{feat}的仪式书只能收录仪式法术。"},
  "ruleProblem.gearKitOptions": {"en": "{class}’s starting equipment offers {choices}. Choose one of them.", "zh-CN": "{class}的起始装备可选：{choices}。请选择其中一项。"},
  "ruleProblem.gearKitTraining": {"en": "{class} grants {option} only when proficient. Choose {choices}.", "zh-CN": "{class}的起始装备“{option}”要求相应的熟练项，角色尚未取得。请改选：{choices}。"},
  "ruleProblem.gearKitSlot": {"en": "{item} is not {slot}, as {class}’s “{option}” requires. Choose an eligible item.", "zh-CN": "“{item}”不符合{class}起始装备“{option}”的要求：{slot}。请选择符合要求的物品。"},
  "ruleProblem.gearBackgroundChoice": {"en": "The background’s kit offers {choices}; “{item}” is not one of them.", "zh-CN": "背景的起始装备可选：{choices}；“{item}”不属于可选范围。"},
  "ruleProblem.gearHomebrew": {"en": "{item} is homebrew gear, granted by the person running the table during play. A new character starts with listed gear.", "zh-CN": "{item}是自制装备，需要由主持游戏的人在游玩中授予；创建角色时只能选择规则中列出的装备。"},
  "ruleProblem.gearMagic": {"en": "{item} is a magic item found during play. A new character starts with mundane gear.", "zh-CN": "{item}是魔法物品，需要在游玩中取得；创建角色时只能携带普通装备。"},
  "ruleProblem.gearNoPrice": {"en": "{item} has no listed price, so it cannot be bought at creation. Ask the person running the table to grant it during play.", "zh-CN": "{item}没有列明价格，不能在创建时购买；请在游玩中向主持游戏的人请求授予。"},
  "ruleProblem.gearBudget": {"en": "Beyond the free kit, this gear costs {cost} gp and the purse is {purse} gp. Remove {remove} gp of gear.", "zh-CN": "除免费起始装备外，这些物品共需 {cost} 金币，角色只有 {purse} 金币可用。请移除价值至少 {remove} 金币的物品。"},
  "ruleDetail.featSpellListPick": {"en": "one class spell list", "zh-CN": "一个职业法术列表"},
  "ruleDetail.featSpellAbilityPick": {"en": "one spellcasting ability", "zh-CN": "一项施法属性"},
  "ruleDetail.featSpellCantripPick": {"en": "{count} {kind}", "zh-CN": " {count} 个{kind}"},
  "ruleDetail.featSpellLevelPick": {"en": "{count} level-{level} {schools}{ritual}spells", "zh-CN": " {count} 个 {level} 环{schools}{ritual}法术"},
  "ruleDetail.featSpellRitualWord": {"en": "ritual ", "zh-CN": "仪式"},
  "ruleDetail.featSpellSchoolsWord": {"en": "{schools} ", "zh-CN": "{schools}学派的"},
  "ruleDetail.listSeparator": {"en": ", ", "zh-CN": "、"},
  "ruleDetail.kitSlot.simple": {"en": "a simple weapon", "zh-CN": "一件简易武器"},
  "ruleDetail.kitSlot.simple-melee": {"en": "a simple melee weapon", "zh-CN": "一件简易近战武器"},
  "ruleDetail.kitSlot.martial": {"en": "a martial weapon", "zh-CN": "一件军用武器"},
  "ruleDetail.kitSlot.martial-melee": {"en": "a martial melee weapon", "zh-CN": "一件军用近战武器"},
  "ruleDetail.kitSlot.instrument": {"en": "a musical instrument", "zh-CN": "一件乐器"},
  "ruleDetail.kitSlotExcept": {"en": "{slot}, except {except}", "zh-CN": "{slot}（不能选择{except}）"},
  "ruleDetail.gearQuantity": {"en": "{item} × {count}", "zh-CN": "{item} × {count}"},
  "ruleDetail.gearToolChoice": {"en": "one of {choices}", "zh-CN": "以下工具中的一项：{choices}"},
  "ruleProblem.untranslated": {
    "en": "{source}",
    "zh-CN": "规则说明（中文翻译待补）：{source}"
  },
  "ruleDetail.requirementAnd": {
    "en": " and ",
    "zh-CN": "且"
  },
  "ruleDetail.requirementOr": {
    "en": " or ",
    "zh-CN": "或"
  },
  "ruleDetail.noPrerequisite": {
    "en": "no prerequisite",
    "zh-CN": "无属性前提"
  },
  "ruleDetail.skillOffer": {
    "en": "{source}: choose {count} skills ({choices}).",
    "zh-CN": "{source}：可选 {count} 项技能（{choices}）。"
  },
  "ruleDetail.anySkill": {
    "en": "any skill",
    "zh-CN": "任意技能"
  },
  "ruleDetail.noSkillChoice": {
    "en": "The character has no skills of their choice.",
    "zh-CN": "角色没有自选技能名额。"
  },
  "ruleDetail.repeatedSkill": {
    "en": "Replacement for a repeated grant",
    "zh-CN": "重复授予的技能所提供的替换名额"
  },
  "ruleDetail.fixedSkills": {
    "en": "{skills} are already granted by the background and race.",
    "zh-CN": "背景和种族已固定授予：{skills}。"
  },
  "ruleDetail.toolOffer": {
    "en": "{count} {category} ({choices})",
    "zh-CN": "{count} 项{category}（可选：{choices}）"
  }
});

export type CharacterRuleCode = Exclude<Extract<keyof typeof CHARACTER_RULE_MESSAGES.en, `ruleProblem.${string}`>, "ruleProblem.untranslated">;

export const CHARACTER_RULE_CODES = Object.keys(CHARACTER_RULE_MESSAGES.en)
  .filter(key => key.startsWith("ruleProblem.") && key !== "ruleProblem.untranslated") as CharacterRuleCode[];
