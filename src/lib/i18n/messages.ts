import { MAP_INSPECTION_MESSAGES } from "./map-inspection-messages.ts";
import { MAP_EDITOR_MESSAGES } from "./map-editor-messages.ts";
import { MAP_SCENE_MESSAGES } from "./map-scene-messages.ts";
import { REGION_MESSAGES } from "./region-messages.ts";
import { BOARD_TOOL_MESSAGES } from "./board-tool-messages.ts";
import { BOARD_CONTROL_MESSAGES } from "./board-control-messages.ts";
import { DICE_CONTROL_MESSAGES } from "./dice-control-messages.ts";
import { FEED_MESSAGES } from "./feed-messages.ts";
import { CHAT_MESSAGES } from "./chat-messages.ts";
import { ENTRY_CHARACTER_MESSAGES } from "./entry-character-messages.ts";
import { PASSAGE_MESSAGES } from "./passage-messages.ts";
import { MEMORY_MESSAGES } from "./memory-messages.ts";
import { RECORD_MESSAGES } from "./record-messages.ts";
import { LEAD_MESSAGES } from "./lead-messages.ts";
import { MARKET_MESSAGES } from "./market-messages.ts";
import { STORY_CONTROL_MESSAGES } from "./story-control-messages.ts";
import { STORY_MESSAGES } from "./story-messages.ts";
import { APP_HELP_MESSAGES } from "./app-help-messages.ts";
import { FEAT_CHOICE_MESSAGES } from "./feat-choice-messages.ts";
import { FEATURE_MATERIAL_MESSAGES } from "./feature-material-messages.ts";
import { CLASS_OPTION_MESSAGES } from "./class-option-messages.ts";
import { LEVEL_UP_MESSAGES } from "./level-up-messages.ts";
import { registerMessages } from "./translator.ts";
import { ABILITY_UI_MESSAGES } from "./ability-ui-messages.ts";
import { SPELL_UI_MESSAGES } from "./spell-ui-messages.ts";
import { SPELL_NAME_MESSAGES } from "./spell-name-messages.ts";
import { SPELL_MATERIAL_MESSAGES } from "./spell-material-messages.ts";
import { GEAR_UI_MESSAGES } from "./gear-ui-messages.ts";
import { EQUIPMENT_NAME_MESSAGES } from "./equipment-name-messages.ts";
import { EQUIPMENT_HELP_MESSAGES } from "./equipment-help-messages.ts";
import { BUILDER_IDENTITY_MESSAGES } from "./builder-identity-messages.ts";
import { LINEAGE_UI_MESSAGES } from "./lineage-ui-messages.ts";
import { LINEAGE_MATERIAL_MESSAGES } from "./lineage-material-messages.ts";
import { RACIAL_UI_MESSAGES } from "./racial-ui-messages.ts";
import { GAME_HELP_MESSAGES } from "./game-help-messages.ts";
import { CLOSED_GAME_HELP_MESSAGES } from "./closed-game-help-messages.ts";
import { CALLING_UI_MESSAGES } from "./calling-ui-messages.ts";
import { CALLING_MATERIAL_MESSAGES } from "./calling-material-messages.ts";
import { BUILDER_PICKER_MESSAGES } from "./builder-picker-messages.ts";
import { BUILDER_MESSAGES } from "./builder-messages.ts";
import { CHARACTER_SPELL_GEAR_NAME_MESSAGES } from "./character-spell-gear-name-messages.ts";
import { CHARACTER_FEAT_NAME_MESSAGES } from "./character-feat-name-messages.ts";
import type { AppLocale } from "./locales.ts";
import { AUTH_MESSAGES } from "./auth-messages.ts";
import { ONBOARDING_MESSAGES } from "./onboarding-messages.ts";
import { HOME_MESSAGES } from "./home-messages.ts";
import { SETTINGS_MESSAGES } from "./settings-messages.ts";
import { CREATION_MESSAGES } from "./creation-messages.ts";
import { TABLE_MESSAGES } from "./table-messages.ts";
import { LOBBY_MESSAGES } from "./lobby-messages.ts";
import { CHARACTER_RULE_MESSAGES } from "./character-rule-messages.ts";
import { CHARACTER_TRAINING_NAME_MESSAGES } from "./character-training-name-messages.ts";
import { CHARACTER_UI_MESSAGES } from "./character-ui-messages.ts";
import { CHARACTER_EXTRA_NAME_MESSAGES } from "./character-extra-name-messages.ts";
import { CHARACTER_NAME_MESSAGES } from "./character-name-messages.ts";
import { PANEL_MESSAGES } from "./panel-messages.ts";
import { PANEL_METADATA_MESSAGES } from "./panel-metadata-messages.ts";
import { ACCOUNT_MESSAGES } from "./account-messages.ts";
import { VOICE_MESSAGES } from "./voice-messages.ts";
import { PREP_MESSAGES } from "./prep-messages.ts";
import { WORLD_MESSAGES } from "./world-messages.ts";
import { COMBAT_UI_MESSAGES } from "./combat-ui-messages.ts";
import { CONDITION_UI_MESSAGES } from "./condition-ui-messages.ts";
import { ROLL_PRESENTATION_MESSAGES } from "./roll-presentation-messages.ts";
import { CONDITION_MATERIAL_MESSAGES } from "./condition-material-messages.ts";

import { SPECIAL_ROLL_MESSAGES } from "./special-roll-messages.ts";

import { CHECK_ROLL_MESSAGES } from "./check-roll-messages.ts";

import { CINEMATIC_MESSAGES } from "./cinematic-messages.ts";
import { SHEET_PLAY_MESSAGES } from "./sheet-play-messages.ts";
import { SHEET_DIALOG_MESSAGES } from "./sheet-dialog-messages.ts";
import { SHEET_RESOURCE_HELP_MESSAGES } from "./sheet-resource-help-messages.ts";
import { AUTHORED_RESOURCE_MESSAGES } from "./authored-resource-messages.ts";
import { ADDITIONAL_RESOURCE_MESSAGES } from "./additional-resource-messages.ts";
import { TURN_CONTROL_MESSAGES } from "./turn-control-messages.ts";
import { JOURNAL_MESSAGES } from "./journal-messages.ts";
import { COMPOSE_MESSAGES } from "./compose-messages.ts";
import { SESSION_MESSAGES } from "./session-messages.ts";
import { HAND_MESSAGES } from "./hand-messages.ts";
import { HAND_MATERIAL_MESSAGES } from "./hand-material-messages.ts";
import { HAND_SPELL_MESSAGES } from "./hand-spell-messages.ts";
import { HAND_FEATURE_MESSAGES } from "./hand-feature-messages.ts";
import { HAND_CASTING_MESSAGES } from "./hand-casting-messages.ts";

import { PROPOSAL_MESSAGES } from "./proposal-messages.ts";
import { PLAY_EDIT_MESSAGES } from "./play-edit-messages.ts";

const en = {
  ...PROPOSAL_MESSAGES.en,
    ...LEVEL_UP_MESSAGES.en,
    ...CLASS_OPTION_MESSAGES.en,
    ...FEATURE_MATERIAL_MESSAGES.en,
    ...FEAT_CHOICE_MESSAGES.en,
    ...APP_HELP_MESSAGES.en,
    ...STORY_MESSAGES.en,
    ...STORY_CONTROL_MESSAGES.en,
    ...MARKET_MESSAGES.en,
    ...LEAD_MESSAGES.en,
  ...RECORD_MESSAGES.en,
  ...MEMORY_MESSAGES.en,
  ...PASSAGE_MESSAGES.en,
  ...ENTRY_CHARACTER_MESSAGES.en,
  ...CHAT_MESSAGES.en,
  ...FEED_MESSAGES.en,
  ...DICE_CONTROL_MESSAGES.en,
  ...BOARD_CONTROL_MESSAGES.en,
    ...BOARD_TOOL_MESSAGES.en,
    ...REGION_MESSAGES.en,
    ...MAP_SCENE_MESSAGES.en,
    ...MAP_EDITOR_MESSAGES.en,
    ...MAP_INSPECTION_MESSAGES.en,
  ...PLAY_EDIT_MESSAGES.en,
  ...HAND_CASTING_MESSAGES.en,
  ...HAND_FEATURE_MESSAGES.en,
  ...HAND_SPELL_MESSAGES.en,
  ...HAND_MATERIAL_MESSAGES.en,
  ...HAND_MESSAGES.en,
  ...SESSION_MESSAGES.en,
  ...COMPOSE_MESSAGES.en,
  ...JOURNAL_MESSAGES.en,
  ...TURN_CONTROL_MESSAGES.en,
  ...ADDITIONAL_RESOURCE_MESSAGES.en,
  ...AUTHORED_RESOURCE_MESSAGES.en,
  ...SHEET_RESOURCE_HELP_MESSAGES.en,
  ...SHEET_DIALOG_MESSAGES.en,
  ...SHEET_PLAY_MESSAGES.en,
  ...AUTH_MESSAGES.en,
  ...COMBAT_UI_MESSAGES.en,
  ...CONDITION_UI_MESSAGES.en,
  ...ROLL_PRESENTATION_MESSAGES.en,
  ...CHECK_ROLL_MESSAGES.en,
  ...SPECIAL_ROLL_MESSAGES.en,
  ...CINEMATIC_MESSAGES.en,
  ...CONDITION_MATERIAL_MESSAGES.en,
  ...ONBOARDING_MESSAGES.en,
  ...HOME_MESSAGES.en,
  ...SETTINGS_MESSAGES.en,
  ...CREATION_MESSAGES.en,
  ...WORLD_MESSAGES.en,
  ...TABLE_MESSAGES.en,
  ...LOBBY_MESSAGES.en,
  ...CHARACTER_NAME_MESSAGES.en,
  ...CHARACTER_EXTRA_NAME_MESSAGES.en,
  ...CHARACTER_UI_MESSAGES.en,
  ...BUILDER_MESSAGES.en,
  ...BUILDER_IDENTITY_MESSAGES.en,
  ...LINEAGE_UI_MESSAGES.en,
  ...LINEAGE_MATERIAL_MESSAGES.en,
  ...RACIAL_UI_MESSAGES.en,
  ...GAME_HELP_MESSAGES.en,
  ...CLOSED_GAME_HELP_MESSAGES.en,
  ...CALLING_UI_MESSAGES.en,
  ...CALLING_MATERIAL_MESSAGES.en,
  ...ABILITY_UI_MESSAGES.en,
  ...SPELL_UI_MESSAGES.en,
  ...SPELL_NAME_MESSAGES.en,
  ...SPELL_MATERIAL_MESSAGES.en,
  ...GEAR_UI_MESSAGES.en,
  ...EQUIPMENT_NAME_MESSAGES.en,
  ...EQUIPMENT_HELP_MESSAGES.en,
  ...BUILDER_PICKER_MESSAGES.en,
  ...CHARACTER_RULE_MESSAGES.en,
  ...CHARACTER_TRAINING_NAME_MESSAGES.en,
  ...CHARACTER_FEAT_NAME_MESSAGES.en,
  ...CHARACTER_SPELL_GEAR_NAME_MESSAGES.en,
  ...PANEL_MESSAGES.en,
  ...PANEL_METADATA_MESSAGES.en,
  ...PREP_MESSAGES.en,
  ...VOICE_MESSAGES.en,
  ...ACCOUNT_MESSAGES.en,
  "locale.interface": "Interface language",
  "locale.interfaceHint": "Menus follow your preference. Each campaign chooses its own story language.",
  "locale.campaign": "Campaign language",
  "locale.campaignHint": "New narration and game text follow this language. Existing history stays as written.",
  "locale.saveError": "Language changed on this device, but your account preference could not be saved.",
  "locale.saving": "Saving…",
  "account.menu": "Account and app menu",
  "account.label": "Account",
  "account.keeper": "Keeper of this server",
  "account.adventurer": "Adventurer",
  "nav.campaigns": "All campaigns",
  "nav.characters": "Characters",
  "nav.rulebook": "Rulebook",
  "nav.friends": "Friends",
  "nav.settings": "Settings",
  "nav.admin": "Admin panel",
  "nav.help": "Help",
  "nav.about": "About",
  "nav.aboutServer": "About this server",
  "nav.appHome": "App home",
  "nav.appHomeHint": "Back to the app's home screen",
  "nav.appSettings": "App settings",
  "nav.appGuide": "App guide",
  "nav.logout": "Log out",
  "theme.night": "Arcane night",
  "theme.day": "Parchment day",
} as const;

export type MessageKey = keyof typeof en;
type Messages = Record<MessageKey, string>;

const zhCN: Messages = {
  ...PROPOSAL_MESSAGES["zh-CN"],
    ...LEVEL_UP_MESSAGES["zh-CN"],
    ...CLASS_OPTION_MESSAGES["zh-CN"],
    ...FEATURE_MATERIAL_MESSAGES["zh-CN"],
    ...FEAT_CHOICE_MESSAGES["zh-CN"],
    ...APP_HELP_MESSAGES["zh-CN"],
    ...STORY_MESSAGES["zh-CN"],
    ...STORY_CONTROL_MESSAGES["zh-CN"],
    ...MARKET_MESSAGES["zh-CN"],
    ...LEAD_MESSAGES["zh-CN"],
  ...RECORD_MESSAGES["zh-CN"],
  ...MEMORY_MESSAGES["zh-CN"],
  ...PASSAGE_MESSAGES["zh-CN"],
  ...ENTRY_CHARACTER_MESSAGES["zh-CN"],
  ...CHAT_MESSAGES["zh-CN"],
  ...FEED_MESSAGES["zh-CN"],
  ...DICE_CONTROL_MESSAGES["zh-CN"],
  ...BOARD_CONTROL_MESSAGES["zh-CN"],
    ...BOARD_TOOL_MESSAGES["zh-CN"],
    ...REGION_MESSAGES["zh-CN"],
    ...MAP_SCENE_MESSAGES["zh-CN"],
    ...MAP_EDITOR_MESSAGES["zh-CN"],
    ...MAP_INSPECTION_MESSAGES["zh-CN"],
  ...PLAY_EDIT_MESSAGES["zh-CN"],
  ...HAND_CASTING_MESSAGES["zh-CN"],
  ...HAND_FEATURE_MESSAGES["zh-CN"],
  ...HAND_SPELL_MESSAGES["zh-CN"],
  ...HAND_MATERIAL_MESSAGES["zh-CN"],
  ...HAND_MESSAGES["zh-CN"],
  ...SESSION_MESSAGES["zh-CN"],
  ...COMPOSE_MESSAGES["zh-CN"],
  ...JOURNAL_MESSAGES["zh-CN"],
  ...TURN_CONTROL_MESSAGES["zh-CN"],
  ...ADDITIONAL_RESOURCE_MESSAGES["zh-CN"],
  ...AUTHORED_RESOURCE_MESSAGES["zh-CN"],
  ...SHEET_RESOURCE_HELP_MESSAGES["zh-CN"],
  ...SHEET_DIALOG_MESSAGES["zh-CN"],
  ...SHEET_PLAY_MESSAGES["zh-CN"],
  ...AUTH_MESSAGES["zh-CN"],
  ...COMBAT_UI_MESSAGES["zh-CN"],
  ...CONDITION_UI_MESSAGES["zh-CN"],
  ...ROLL_PRESENTATION_MESSAGES["zh-CN"],
  ...CHECK_ROLL_MESSAGES["zh-CN"],
  ...SPECIAL_ROLL_MESSAGES["zh-CN"],
  ...CINEMATIC_MESSAGES["zh-CN"],
  ...CONDITION_MATERIAL_MESSAGES["zh-CN"],
  ...ONBOARDING_MESSAGES["zh-CN"],
  ...HOME_MESSAGES["zh-CN"],
  ...SETTINGS_MESSAGES["zh-CN"],
  ...CREATION_MESSAGES["zh-CN"],
  ...WORLD_MESSAGES["zh-CN"],
  ...TABLE_MESSAGES["zh-CN"],
  ...LOBBY_MESSAGES["zh-CN"],
  ...CHARACTER_NAME_MESSAGES["zh-CN"],
  ...CHARACTER_EXTRA_NAME_MESSAGES["zh-CN"],
  ...CHARACTER_UI_MESSAGES["zh-CN"],
  ...BUILDER_MESSAGES["zh-CN"],
  ...BUILDER_IDENTITY_MESSAGES["zh-CN"],
  ...LINEAGE_UI_MESSAGES["zh-CN"],
  ...LINEAGE_MATERIAL_MESSAGES["zh-CN"],
  ...RACIAL_UI_MESSAGES["zh-CN"],
  ...GAME_HELP_MESSAGES["zh-CN"],
  ...CLOSED_GAME_HELP_MESSAGES["zh-CN"],
  ...CALLING_UI_MESSAGES["zh-CN"],
  ...CALLING_MATERIAL_MESSAGES["zh-CN"],
  ...ABILITY_UI_MESSAGES["zh-CN"],
  ...SPELL_UI_MESSAGES["zh-CN"],
  ...SPELL_NAME_MESSAGES["zh-CN"],
  ...SPELL_MATERIAL_MESSAGES["zh-CN"],
  ...GEAR_UI_MESSAGES["zh-CN"],
  ...EQUIPMENT_NAME_MESSAGES["zh-CN"],
  ...EQUIPMENT_HELP_MESSAGES["zh-CN"],
  ...BUILDER_PICKER_MESSAGES["zh-CN"],
  ...CHARACTER_RULE_MESSAGES["zh-CN"],
  ...CHARACTER_TRAINING_NAME_MESSAGES["zh-CN"],
  ...CHARACTER_FEAT_NAME_MESSAGES["zh-CN"],
  ...CHARACTER_SPELL_GEAR_NAME_MESSAGES["zh-CN"],
  ...PANEL_MESSAGES["zh-CN"],
  ...PANEL_METADATA_MESSAGES["zh-CN"],
  ...PREP_MESSAGES["zh-CN"],
  ...VOICE_MESSAGES["zh-CN"],
  ...ACCOUNT_MESSAGES["zh-CN"],
  "locale.interface": "界面语言",
  "locale.interfaceHint": "菜单使用你的偏好语言。每个战役可单独选择故事语言。",
  "locale.campaign": "战役语言",
  "locale.campaignHint": "后续叙事和游戏文本使用此语言，已有历史保留原文。",
  "locale.saveError": "已切换此设备的语言，但未能保存到账户。",
  "locale.saving": "正在保存…",
  "account.menu": "账户与应用菜单",
  "account.label": "账户",
  "account.keeper": "服务器管理员",
  "account.adventurer": "冒险者",
  "nav.campaigns": "所有战役",
  "nav.characters": "角色",
  "nav.rulebook": "规则书",
  "nav.friends": "好友",
  "nav.settings": "设置",
  "nav.admin": "管理面板",
  "nav.help": "帮助",
  "nav.about": "关于",
  "nav.aboutServer": "关于此服务器",
  "nav.appHome": "应用首页",
  "nav.appHomeHint": "返回应用首页",
  "nav.appSettings": "应用设置",
  "nav.appGuide": "应用指南",
  "nav.logout": "退出登录",
  "theme.night": "奥术之夜",
  "theme.day": "羊皮纸之昼",
};

// Complete catalogs are a server/offline entry point. Client components use
// translator.ts and receive only their namespace's selected locale resources.
export const MESSAGE_CATALOGS: Record<AppLocale, Messages> = { en, "zh-CN": zhCN };
registerMessages(MESSAGE_CATALOGS);
export { createTranslator, messageTemplate } from "./translator.ts";
