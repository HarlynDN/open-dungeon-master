import { defineMessages } from "./catalog.ts";

export const CHARACTER_UI_MESSAGES = /*#__PURE__*/ defineMessages({
  "characterHost.alliesHidden": {"en": "{count} DM-controlled allies are not listed here. The story authority can add them through Build a companion in the party panel.", "zh-CN": "此处不显示 {count} 名由 DM 扮演的盟友。负责故事的人可在队伍面板通过“创建伙伴”将其加入。"},
  "library.duplicateEdit": {"en": "Duplicate and edit", "zh-CN": "复制并编辑"},
  "library.editBuild": {"en": "Edit build", "zh-CN": "编辑构筑"},
  "seat.joinParty": {"en": "Join the party", "zh-CN": "加入队伍"},
  "seat.allyHint": {"en": "The table gets a copy as a party companion played by the DM, at the party level. Only the story authority can bring one in where companions are allowed. Your library copy stays unchanged.", "zh-CN": "此战役会按队伍等级创建一份角色副本，作为由 DM 扮演的队伍伙伴。只有负责故事的人能在允许伙伴的战役中带入盟友。角色库中的原件不变。"},
  "seat.allyTitle": {"en": "Bring {name} to a campaign as an ally", "zh-CN": "将{name}作为盟友带入战役"},
  "seat.allyAction": {"en": "Bring to a campaign", "zh-CN": "带入战役"},
  "library.backWorkshop": {"en": "Back to the workshop", "zh-CN": "返回工坊"},
  "library.title": {
    "en": "Your characters",
    "zh-CN": "你的角色"
  },
  "library.hint": {
    "en": "Saved to your profile; bring them into any campaign.",
    "zh-CN": "保存在你的个人资料中，可带入任意战役。"
  },
  "library.login": {
    "en": "Log in",
    "zh-CN": "登录"
  },
  "library.loginHint": {
    "en": "to see your character library.",
    "zh-CN": "后即可查看你的角色库。"
  },
  "library.importHint": {
    "en": "Import a character file exported from this or another server",
    "zh-CN": "导入从本服务器或其他服务器导出的角色文件"
  },
  "library.import": {
    "en": "Import character",
    "zh-CN": "导入角色"
  },
  "library.new": {
    "en": "New character",
    "zh-CN": "新建角色"
  },
  "library.empty": {
    "en": "No heroes in the roster yet.",
    "zh-CN": "角色库中还没有英雄。"
  },
  "library.emptyHint": {
    "en": "Create one here, or one is saved automatically when you join a campaign.",
    "zh-CN": "可在这里创建；加入战役时创建的角色也会自动保存。"
  },
  "library.roster": {
    "en": "Roster · {count}",
    "zh-CN": "角色库 · {count}"
  },
  "library.noCampaign": {
    "en": "Not in a campaign yet.",
    "zh-CN": "尚未加入战役。"
  },
  "library.levelClass": {
    "en": "Level {level} {class}",
    "zh-CN": "{level} 级{class}"
  },
  "library.level": {
    "en": "Level {level}",
    "zh-CN": "{level} 级"
  },
  "library.actions": {
    "en": "Actions for {name}",
    "zh-CN": "{name}的操作"
  },
  "library.moreActions": {
    "en": "More actions for {name}",
    "zh-CN": "{name}的更多操作"
  },
  "library.open": {
    "en": "Open",
    "zh-CN": "打开"
  },
  "library.upload": {
    "en": "Upload portrait",
    "zh-CN": "上传立绘"
  },
  "library.duplicate": {
    "en": "Duplicate",
    "zh-CN": "创建副本"
  },
  "library.delete": {
    "en": "Delete",
    "zh-CN": "删除"
  },
  "library.goTo": {
    "en": "Go to {title}",
    "zh-CN": "前往{title}"
  },
  "library.deleteConfirm": {
    "en": "Delete {name} from your library? This cannot be undone.",
    "zh-CN": "要从角色库中删除{name}吗？此操作无法撤销。"
  },
  "library.portraitTitle": {
    "en": "Portrait for {name}",
    "zh-CN": "{name}的立绘"
  },
  "library.paintingPortrait": {
    "en": "Painting portrait...",
    "zh-CN": "正在绘制立绘…"
  },
  "library.portraitFailed": {
    "en": "Portrait generation failed",
    "zh-CN": "立绘生成失败"
  },
  "library.portraitFailedHint": {
    "en": "Portrait couldn't be generated.",
    "zh-CN": "未能生成立绘。"
  },
  "library.back": {
    "en": "Back to your characters",
    "zh-CN": "返回你的角色"
  },
  "library.backLibrary": {
    "en": "Back to your library",
    "zh-CN": "返回角色库"
  },
  "library.notFound": {
    "en": "Character not found.",
    "zh-CN": "找不到该角色。"
  },
  "library.loadError": {
    "en": "Your character library could not be read. Try again.",
    "zh-CN": "无法读取角色库，请重试。"
  },
  "library.detailError": {
    "en": "This character could not be read. Try again.",
    "zh-CN": "无法读取该角色，请重试。"
  },
  "library.pollError": {
    "en": "Portrait progress could not be read. Try again.",
    "zh-CN": "无法读取立绘进度，请重试。"
  },
  "library.importError": {
    "en": "Import failed.",
    "zh-CN": "导入失败。"
  },
  "library.importJson": {
    "en": "{name} is not a JSON file.",
    "zh-CN": "{name}不是有效的 JSON 文件。"
  },
  "library.cloneError": {
    "en": "Could not copy the character.",
    "zh-CN": "无法复制该角色。"
  },
  "library.deleteError": {
    "en": "Could not delete the character.",
    "zh-CN": "无法删除该角色。"
  },
  "library.portraitError": {
    "en": "Could not save the portrait.",
    "zh-CN": "无法保存立绘。"
  },
  "library.copyName": {
    "en": "{name} (copy)",
    "zh-CN": "{name}（副本）"
  },
  "characterActions.pdf": {
    "en": "Download PDF",
    "zh-CN": "下载 PDF"
  },
  "characterActions.pdfBusy": {
    "en": "Preparing...",
    "zh-CN": "正在准备…"
  },
  "characterActions.pdfHint": {
    "en": "Download this character sheet as a fillable PDF",
    "zh-CN": "将此角色卡下载为可填写的 PDF"
  },
  "characterActions.pdfStatus": {
    "en": "Preparing the PDF...",
    "zh-CN": "正在准备 PDF…"
  },
  "characterActions.pdfError": {
    "en": "Could not prepare the PDF.",
    "zh-CN": "无法准备 PDF。"
  },
  "characterActions.export": {
    "en": "Export",
    "zh-CN": "导出"
  },
  "characterActions.exportBusy": {
    "en": "Exporting...",
    "zh-CN": "正在导出…"
  },
  "characterActions.exportHint": {
    "en": "Save this character as a file you can import on another device or server",
    "zh-CN": "将此角色保存为文件，以便导入其他设备或服务器"
  },
  "characterActions.exportError": {
    "en": "Export failed.",
    "zh-CN": "导出失败。"
  },
  "characterActions.copyBusy": {
    "en": "Copying...",
    "zh-CN": "正在复制…"
  },
  "characterActions.copyHint": {
    "en": "Save a second copy of this character to your library",
    "zh-CN": "在角色库中保存此角色的另一份副本"
  },
  "characterActions.replacePortrait": {
    "en": "Replace portrait",
    "zh-CN": "替换立绘"
  },
  "characterActions.replaceHint": {
    "en": "Replace the portrait with a photo",
    "zh-CN": "用图片替换当前立绘"
  },
  "characterActions.uploadHint": {
    "en": "Upload a portrait",
    "zh-CN": "上传一张立绘"
  },
  "characterActions.paintBusy": {
    "en": "Painting...",
    "zh-CN": "正在绘制…"
  },
  "characterActions.paint": {
    "en": "Paint one",
    "zh-CN": "生成立绘"
  },
  "characterActions.paintHint": {
    "en": "Paint a new portrait on this server's image model",
    "zh-CN": "使用本服务器的图像模型绘制新立绘"
  },
  "characterActions.paintStatus": {
    "en": "Painting the portrait...",
    "zh-CN": "正在绘制立绘…"
  },
  "characterActions.portraitSaving": {
    "en": "Saving the portrait...",
    "zh-CN": "正在保存立绘…"
  },
  "characterActions.paintError": {
    "en": "Could not queue the portrait.",
    "zh-CN": "无法提交立绘生成任务。"
  },
  "characterActions.placeholder": {
    "en": "Use placeholder",
    "zh-CN": "使用默认图像"
  },
  "characterActions.placeholderHint": {
    "en": "Take the picture away and show the stand-in for this class or race",
    "zh-CN": "移除立绘，改为显示此职业或种族的默认图像"
  },
  "seat.title": {
    "en": "Use {name} in a campaign",
    "zh-CN": "将{name}用于战役"
  },
  "seat.action": {
    "en": "Use in a campaign",
    "zh-CN": "用于战役"
  },
  "seat.hint": {
    "en": "The table gets its own copy of the sheet, adapted to its starting level. Your library keeps this one as it is.",
    "zh-CN": "战役会获得一份按起始等级调整的角色卡副本，角色库中的原角色保持不变。"
  },
  "seat.loadError": {
    "en": "Your campaigns could not be read. Try again.",
    "zh-CN": "无法读取你的战役，请重试。"
  },
  "seat.loading": {
    "en": "Loading your campaigns",
    "zh-CN": "正在读取你的战役"
  },
  "seat.empty": {
    "en": "No tables to bring them to yet.",
    "zh-CN": "目前还没有可加入的战役。"
  },
  "seat.emptyHint": {
    "en": "Start a campaign or join one with a room code, then come back.",
    "zh-CN": "先创建战役或通过房间码加入战役，再回到这里。"
  },
  "seat.home": {
    "en": "To your campaigns",
    "zh-CN": "前往你的战役"
  },
  "seat.already": {
    "en": "Already at this table",
    "zh-CN": "已在此战役中"
  },
  "seat.lobby": {
    "en": "In the lobby",
    "zh-CN": "在大厅中"
  },
  "seat.play": {
    "en": "In play",
    "zh-CN": "正在游玩"
  },
  "seat.level": {
    "en": " · plays at level {level}",
    "zh-CN": " · 使用 {level} 级角色"
  },
  "seat.down": {
    "en": "{name} joins as level {level}, not {old}: hit points, slots, improvements and spells above that level are left behind.",
    "zh-CN": "{name}将以 {level} 级加入，原等级为 {old} 级；超出该等级的生命值、法术位、提升和法术不会带入战役。"
  },
  "seat.up": {
    "en": "{name} joins as level {level}, not {old}: the sheet is raised to that level; choose the extra spells from the sheet.",
    "zh-CN": "{name}将以 {level} 级加入，原等级为 {old} 级；角色卡会提升至该等级，请在角色卡中选择新增的法术。"
  },
  "seat.take": {
    "en": "Take a seat",
    "zh-CN": "加入战役"
  },
  "seat.error": {
    "en": "Could not bring the character to that table.",
    "zh-CN": "无法将该角色带入这个战役。"
  },
  "seat.swap": {
    "en": "Swap characters in its lobby",
    "zh-CN": "在战役大厅中更换角色"
  },
  "seat.taken": {
    "en": "You already have a character in this campaign.",
    "zh-CN": "你在这个战役中已经有角色。"
  },
  "seat.lobbyOnly": {
    "en": "Characters can only be changed in the lobby.",
    "zh-CN": "只能在战役大厅中更换角色。"
  },
  "seat.libraryMissing": {
    "en": "Character not found in your library.",
    "zh-CN": "角色库中找不到该角色。"
  },
  "seat.noImage": {
    "en": "This server has no image model to paint with. Upload a portrait instead.",
    "zh-CN": "本服务器未配置图像模型，请上传立绘。"
  },
  "characterHost.new": {
    "en": "Create a character",
    "zh-CN": "创建角色"
  },
  "characterHost.newHint": {
    "en": "Saved to your library; bring them into any campaign later.",
    "zh-CN": "保存到角色库，之后可带入任意战役。"
  },
  "characterHost.save": {
    "en": "Save to library",
    "zh-CN": "保存到角色库"
  },
  "characterHost.saveError": {
    "en": "Could not save the character.",
    "zh-CN": "无法保存该角色，请检查角色选择后重试。"
  },
  "characterHost.backLobby": {
    "en": "Back to the lobby",
    "zh-CN": "返回大厅"
  },
  "characterHost.edit": {
    "en": "Edit your character",
    "zh-CN": "编辑你的角色"
  },
  "characterHost.switch": {
    "en": "Switch your character",
    "zh-CN": "更换你的角色"
  },
  "characterHost.choose": {
    "en": "Choose your character",
    "zh-CN": "选择你的角色"
  },
  "characterHost.create": {
    "en": "Create your character",
    "zh-CN": "创建你的角色"
  },
  "characterHost.level": {
    "en": "This campaign starts at level {level}.",
    "zh-CN": "此战役的起始等级为 {level} 级。"
  },
  "characterHost.clearReady": {
    "en": "Changing your character clears your ready status.",
    "zh-CN": "修改或更换角色会取消你的就绪状态。"
  },
  "characterHost.keepLevel": {
    "en": "{name} stays level {level} in your library; these changes are for this table.",
    "zh-CN": "角色库中的{name}仍为 {level} 级，这些修改仅用于当前战役。"
  },
  "characterHost.fromLibrary": {
    "en": "From your library",
    "zh-CN": "从角色库选择"
  },
  "characterHost.current": {
    "en": "current",
    "zh-CN": "当前角色"
  },
  "characterHost.adapt": {
    "en": "Will be adapted to level {level}",
    "zh-CN": "将调整至 {level} 级"
  },
  "characterHost.newInstead": {
    "en": "Create a new character instead",
    "zh-CN": "改为创建新角色"
  },
  "characterHost.pickInstead": {
    "en": "Or pick one from your library",
    "zh-CN": "或从角色库选择"
  },
  "characterHost.saveChanges": {
    "en": "Save changes",
    "zh-CN": "保存更改"
  },
  "characterHost.replace": {
    "en": "Replace your character",
    "zh-CN": "替换你的角色"
  },
  "characterHost.join": {
    "en": "Join the party",
    "zh-CN": "加入队伍"
  },
  "characterHost.loadError": {
    "en": "Character creation data could not be read. Try again.",
    "zh-CN": "无法读取角色创建所需资料，请重试。"
  },
  "sheet.abilities": {
    "en": "Abilities",
    "zh-CN": "属性"
  },
  "sheet.hitPoints": {
    "en": "Hit points",
    "zh-CN": "生命值"
  },
  "sheet.ac": {
    "en": "Armor class",
    "zh-CN": "护甲等级"
  },
  "sheet.speed": {
    "en": "Speed",
    "zh-CN": "速度"
  },
  "sheet.feet": {
    "en": "{value} ft",
    "zh-CN": "{value} 英尺"
  },
  "sheet.speedHint": {
    "en": "Their walking speed.",
    "zh-CN": "该角色的步行速度。"
  },
  "sheet.speedChanged": {
    "en": "Base {value} ft, changed by what they wear and their features.",
    "zh-CN": "基础速度为 {value} 英尺，穿戴的装备和特性会对其进行调整。"
  },
  "sheet.gold": {
    "en": "Gold",
    "zh-CN": "金币"
  },
  "sheet.gp": {
    "en": "{value} gp",
    "zh-CN": "{value} 金币"
  },
  "sheet.initiative": {
    "en": "Initiative",
    "zh-CN": "先攻"
  },
  "sheet.passive": {
    "en": "Passive perception",
    "zh-CN": "被动察觉"
  },
  "sheet.proficiency": {
    "en": "Proficiency",
    "zh-CN": "熟练加值"
  },
  "sheet.spellDc": {
    "en": "Spell save DC",
    "zh-CN": "法术豁免难度"
  },
  "sheet.skills": {
    "en": "Skills",
    "zh-CN": "技能"
  },
  "sheet.training": {
    "en": "Languages and training",
    "zh-CN": "语言与熟练项"
  },
  "sheet.spells": {
    "en": "Spells",
    "zh-CN": "法术"
  },
  "sheet.equipment": {
    "en": "Equipment",
    "zh-CN": "装备"
  },
  "sheet.features": {
    "en": "Features and traits",
    "zh-CN": "特性与特质"
  },
  "sheet.feats": {
    "en": "Feats",
    "zh-CN": "专长"
  },
  "sheet.backstory": {
    "en": "Backstory",
    "zh-CN": "背景故事"
  },
  "sheet.story": {
    "en": "Story so far",
    "zh-CN": "历程"
  },
  "sheet.noEvents": {
    "en": "Nothing recorded yet. Milestones from campaigns land here: victories, treasures, bonds, and worse.",
    "zh-CN": "尚无记录。战役中的里程碑会保存在这里，包括胜利、宝物、羁绊，以及不幸。"
  },
  "sheet.save": {
    "en": "Save {value}",
    "zh-CN": "豁免 {value}"
  },
  "sheet.hpTitle": {
    "en": "{current}{temporary} of {max} hit points{note}",
    "zh-CN": "生命值 {current}{temporary} / {max}{note}"
  },
  "sheet.tempHp": {
    "en": " +{value} temporary",
    "zh-CN": " +{value} 临时生命值"
  },
  "sheet.languages": {
    "en": "Languages",
    "zh-CN": "语言"
  },
  "sheet.tools": {
    "en": "Tools",
    "zh-CN": "工具"
  },
  "sheet.armor": {
    "en": "Armor",
    "zh-CN": "护甲"
  },
  "sheet.weapons": {
    "en": "Weapons",
    "zh-CN": "武器"
  },
  "sheet.none": {
    "en": "none",
    "zh-CN": "无"
  },
  "sheet.separator": {
    "en": ", ",
    "zh-CN": "、"
  },
  "sheet.worn": {
    "en": "worn",
    "zh-CN": "已穿戴"
  },
  "sheet.attuned": {
    "en": "attuned",
    "zh-CN": "已同调"
  },
  "sheet.attuning": {
    "en": "attunes at the next rest",
    "zh-CN": "将在下次休息时完成同调"
  },
  "sheet.itemQty": {
    "en": "{name} x{qty}",
    "zh-CN": "{name} ×{qty}"
  },
  "sheet.storySource": {
    "en": "(story)",
    "zh-CN": "（剧情）"
  },
  "sheet.event.achievement": {
    "en": "Achievement",
    "zh-CN": "成就"
  },
  "sheet.event.item": {
    "en": "Treasure",
    "zh-CN": "宝物"
  },
  "sheet.event.relationship": {
    "en": "Bond",
    "zh-CN": "羁绊"
  },
  "sheet.event.death": {
    "en": "Death",
    "zh-CN": "死亡"
  },
  "sheet.event.level_up": {
    "en": "Level up",
    "zh-CN": "升级"
  },
  "sheet.event.story": {
    "en": "Story",
    "zh-CN": "故事"
  },
  "sheet.ability.str": {
    "en": "Strength",
    "zh-CN": "力量"
  },
  "sheet.abilityShort.str": {
    "en": "str",
    "zh-CN": "力量"
  },
  "sheet.ability.dex": {
    "en": "Dexterity",
    "zh-CN": "敏捷"
  },
  "sheet.abilityShort.dex": {
    "en": "dex",
    "zh-CN": "敏捷"
  },
  "sheet.ability.con": {
    "en": "Constitution",
    "zh-CN": "体质"
  },
  "sheet.abilityShort.con": {
    "en": "con",
    "zh-CN": "体质"
  },
  "sheet.ability.int": {
    "en": "Intelligence",
    "zh-CN": "智力"
  },
  "sheet.abilityShort.int": {
    "en": "int",
    "zh-CN": "智力"
  },
  "sheet.ability.wis": {
    "en": "Wisdom",
    "zh-CN": "感知"
  },
  "sheet.abilityShort.wis": {
    "en": "wis",
    "zh-CN": "感知"
  },
  "sheet.ability.cha": {
    "en": "Charisma",
    "zh-CN": "魅力"
  },
  "sheet.abilityShort.cha": {
    "en": "cha",
    "zh-CN": "魅力"
  },
  "sheet.skill.acrobatics": {
    "en": "Acrobatics",
    "zh-CN": "特技"
  },
  "sheet.skill.animal_handling": {
    "en": "Animal Handling",
    "zh-CN": "驯兽"
  },
  "sheet.skill.arcana": {
    "en": "Arcana",
    "zh-CN": "奥秘"
  },
  "sheet.skill.athletics": {
    "en": "Athletics",
    "zh-CN": "运动"
  },
  "sheet.skill.deception": {
    "en": "Deception",
    "zh-CN": "欺瞒"
  },
  "sheet.skill.history": {
    "en": "History",
    "zh-CN": "历史"
  },
  "sheet.skill.insight": {
    "en": "Insight",
    "zh-CN": "洞悉"
  },
  "sheet.skill.intimidation": {
    "en": "Intimidation",
    "zh-CN": "威吓"
  },
  "sheet.skill.investigation": {
    "en": "Investigation",
    "zh-CN": "调查"
  },
  "sheet.skill.medicine": {
    "en": "Medicine",
    "zh-CN": "医药"
  },
  "sheet.skill.nature": {
    "en": "Nature",
    "zh-CN": "自然"
  },
  "sheet.skill.perception": {
    "en": "Perception",
    "zh-CN": "察觉"
  },
  "sheet.skill.performance": {
    "en": "Performance",
    "zh-CN": "表演"
  },
  "sheet.skill.persuasion": {
    "en": "Persuasion",
    "zh-CN": "游说"
  },
  "sheet.skill.religion": {
    "en": "Religion",
    "zh-CN": "宗教"
  },
  "sheet.skill.sleight_of_hand": {
    "en": "Sleight of Hand",
    "zh-CN": "巧手"
  },
  "sheet.skill.stealth": {
    "en": "Stealth",
    "zh-CN": "隐匿"
  },
  "sheet.skill.survival": {
    "en": "Survival",
    "zh-CN": "求生"
  },
  "sheet.derived.proficiency": {
    "en": "proficiency",
    "zh-CN": "熟练加值"
  },
  "sheet.derived.features": {
    "en": "features",
    "zh-CN": "特性"
  },
  "sheet.derived.subclass": {
    "en": "subclass features",
    "zh-CN": "子职业特性"
  },
  "sheet.derived.items": {
    "en": "magic items",
    "zh-CN": "魔法物品"
  },
  "sheet.derived.expertise": {
    "en": "expertise",
    "zh-CN": "专精"
  },
  "sheet.derived.half": {
    "en": "half proficiency",
    "zh-CN": "半数熟练加值"
  },
  "sheet.derived.untrained": {
    "en": "untrained",
    "zh-CN": "未熟练"
  },
  "sheet.derived.base": {
    "en": "base",
    "zh-CN": "基础值"
  },
  "sheet.derived.perception": {
    "en": "Perception",
    "zh-CN": "察觉"
  },
  "sheet.derived.investigation": {
    "en": "Investigation",
    "zh-CN": "调查"
  },
  "sheet.derived.ability": {
    "en": "{ability} modifier",
    "zh-CN": "{ability}调整值"
  }
});
