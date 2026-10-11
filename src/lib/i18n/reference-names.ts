import type { AppLocale } from "./locales.ts";
import { EQUIPMENT_NAMES, EQUIPMENT_NAME_MESSAGES } from "./equipment-name-messages.ts";
import { SPELL_NAMES, SPELL_NAME_MESSAGES } from "./spell-name-messages.ts";
import { terminologyAliases } from "./terminology.ts";

export type ReferenceKind = "spell" | "monster" | "equipment";
type ReferenceNames = Partial<Record<ReferenceKind, Record<string, readonly string[]>>>;

// Original terminology draft based on canonical source names. These are
// display/search aliases, never replacements for rules-engine identifiers.
// The first alias is the display name. Full descriptions and their source
// hashes/review records are maintained separately in the content phase.
export const REFERENCE_NAMES: Record<AppLocale, ReferenceNames> = {
  en: {},
  "zh-CN": {
    monster: terminologyAliases("monster", "zh-CN"),
    equipment: {
      ...Object.fromEntries(EQUIPMENT_NAMES.map(row => [row.name.toLowerCase(), [EQUIPMENT_NAME_MESSAGES["zh-CN"][row.key]]])),
      club: ["短棒"], dagger: ["匕首"], greatclub: ["巨棒"], handaxe: ["手斧"],
      javelin: ["标枪"], "light hammer": ["轻锤"], mace: ["钉头锤"], quarterstaff: ["长棍"],
      sickle: ["镰刀"], spear: ["矛"], "light crossbow": ["轻弩"], dart: ["飞镖"],
      shortbow: ["短弓"], sling: ["投石索"], battleaxe: ["战斧"], flail: ["链枷"],
      glaive: ["长柄刀"], greataxe: ["巨斧"], greatsword: ["巨剑"], halberd: ["戟"],
      lance: ["骑枪"], longsword: ["长剑"], maul: ["巨锤"], morningstar: ["刺头锤"],
      pike: ["长矛"], rapier: ["刺剑"], scimitar: ["弯刀"], shortsword: ["短剑"],
      trident: ["三叉戟"], "war pick": ["战镐"], warhammer: ["战锤"], whip: ["鞭子"],
      blowgun: ["吹箭筒"], "hand crossbow": ["手弩"], "heavy crossbow": ["重弩"],
      longbow: ["长弓"], net: ["捕网"], "unarmed strike": ["徒手攻击", "拳击", "踢击"],
      pistol: ["手枪"], revolver: ["左轮手枪"], musket: ["火枪"], "hunting rifle": ["猎枪"],
      "padded armor": ["衬垫甲"], "leather armor": ["皮甲"], "studded leather": ["镶钉皮甲"],
      "hide armor": ["兽皮甲"], "chain shirt": ["链甲衫"], "scale mail": ["鳞甲"],
      breastplate: ["胸甲"], "half plate": ["半身板甲"], "ring mail": ["环甲"],
      "chain mail": ["链甲"], splint: ["夹板甲"], "plate armor": ["全身板甲"], shield: ["盾牌"],
      "potion of healing": ["治疗药水"], "potion of greater healing": ["强效治疗药水"],
      "potion of superior healing": ["高效治疗药水"], "potion of supreme healing": ["特效治疗药水"],
      rope: ["绳索"], "rope, hempen (50 feet)": ["麻绳（50 英尺）"], "rope, silk (50 feet)": ["丝绳（50 英尺）"],
      torch: ["火把"], rations: ["口粮"], "rations (1 day)": ["口粮（1 天）"],
      waterskin: ["水袋"], backpack: ["背包"], arrows: ["箭矢"], "crossbow bolts": ["弩矢"],
      "healer's kit": ["治疗工具包"], "spellbook": ["法术书"], "component pouch": ["施法材料包"],
      "bag of holding": ["容纳袋"], "wand of fireballs": ["火球魔杖"],
    },
    spell: {
      ...Object.fromEntries(SPELL_NAMES.flatMap(row => [row.name, ...row.aliases].map(name => [name.toLowerCase(), [SPELL_NAME_MESSAGES["zh-CN"][row.key]]]))),
      "acid splash": ["酸液飞溅"], "chill touch": ["冻寒之触"], "dancing lights": ["舞光术"],
      druidcraft: ["德鲁伊伎俩"], "eldritch blast": ["魔能爆"], "fire bolt": ["火焰箭"],
      guidance: ["指引术"], light: ["光亮术"], "mage hand": ["法师之手"], mending: ["修复术"],
      message: ["传讯术"], "minor illusion": ["次级幻象"], "poison spray": ["毒气喷溅"],
      prestidigitation: ["魔法伎俩"], "produce flame": ["燃火术"], "ray of frost": ["寒霜射线"],
      resistance: ["抵抗术"], "sacred flame": ["圣火术"], shillelagh: ["橡棍术"],
      "shocking grasp": ["电爪术"], "spare the dying": ["维生术"], thaumaturgy: ["奇术"],
      "true strike": ["克敌先机"], "vicious mockery": ["恶毒嘲讽"],
      alarm: ["警报术"], "animal friendship": ["动物友谊"], "color spray": ["七彩喷射"],
      command: ["命令术"], "comprehend languages": ["通晓语言"],
      "create or destroy water": ["造水或毁水"], "detect evil and good": ["侦测邪恶与善良"],
      "detect poison and disease": ["侦测毒素与疾病"], "divine favor": ["神恩术"], entangle: ["纠缠术"],
      "expeditious retreat": ["迅捷撤离"], "floating disk": ["浮碟术"], goodberry: ["神莓术"],
      grease: ["油腻术"], "guiding bolt": ["曳光弹"], heroism: ["英雄气概"],
      "hideous laughter": ["狂笑术"], "illusory script": ["幻象文字"], jump: ["跳跃术"],
      longstrider: ["大步奔行"], "purify food and drink": ["净化饮食"], sanctuary: ["庇护术"],
      shield: ["护盾术"], "silent image": ["无声幻象"], "speak with animals": ["动物交谈"],
      "unseen servant": ["隐形仆役"],
      "burning hands": ["燃烧之手"], "charm person": ["魅惑人类"], "cure wounds": ["治疗伤口"],
      "detect magic": ["侦测魔法"], "disguise self": ["自我伪装"], "faerie fire": ["精灵之火"],
      "false life": ["虚假生命"], "feather fall": ["羽落术"], "find familiar": ["召唤魔宠"],
      "fog cloud": ["雾云术"], "healing word": ["治愈真言"], "hellish rebuke": ["炼狱斥责"],
      hex: ["咒缚术"], "hunter's mark": ["猎人印记"], identify: ["鉴定术"],
      "inflict wounds": ["造成伤口"], "magic missile": ["魔法飞弹"], "mage armor": ["法师护甲"],
      "protection from evil and good": ["防护邪恶与善良"], "shield of faith": ["信仰之盾"],
      sleep: ["睡眠术"], thunderwave: ["雷鸣波"], bless: ["祝福术"], bane: ["灾祸术"],
      aid: ["援助术"], blur: ["朦胧术"], darkness: ["黑暗术"], "enhance ability": ["增强属性"],
      "hold person": ["定身人类"], invisibility: ["隐身术"], "lesser restoration": ["次级复原术"],
      levitate: ["浮空术"], "mirror image": ["镜像术"], "misty step": ["迷雾步"],
      moonbeam: ["月光束"], "pass without trace": ["无踪行走"], "scorching ray": ["灼热射线"],
      shatter: ["粉碎术"], silence: ["沉默术"], "spike growth": ["尖刺生长"],
      "spiritual weapon": ["灵体武器"], suggestion: ["暗示术"], web: ["蛛网术"],
      "animate dead": ["操纵亡者"], "bestow curse": ["施加诅咒"], "call lightning": ["召雷术"],
      counterspell: ["反制法术"], "dispel magic": ["解除魔法"], fear: ["恐惧术"],
      fireball: ["火球术"], fly: ["飞行术"], haste: ["加速术"], "hypnotic pattern": ["催眠图纹"],
      "lightning bolt": ["闪电束"], "mass healing word": ["群体治愈真言"], revivify: ["回生术"],
      "sleet storm": ["雨雪风暴"], slow: ["缓慢术"], "spirit guardians": ["灵体守卫"],
      "stinking cloud": ["恶臭云"], "vampiric touch": ["吸血鬼之触"], banishment: ["放逐术"],
      blight: ["枯萎术"], confusion: ["困惑术"], "dimension door": ["次元门"],
      "greater invisibility": ["高等隐身术"], "ice storm": ["冰风暴"], polymorph: ["变形术"],
      "wall of fire": ["火墙术"], cloudkill: ["死云术"], "cone of cold": ["寒冰锥"],
      "dominate person": ["支配人类"], "flame strike": ["焰击术"], "hold monster": ["定身怪物"],
      "mass cure wounds": ["群体治疗伤口"], "raise dead": ["唤回死者"], "wall of force": ["力场墙"],
      "chain lightning": ["连锁闪电"], disintegrate: ["解离术"], sunbeam: ["阳光束"],
      "true seeing": ["真知术"], "finger of death": ["死亡一指"], "plane shift": ["位面转移"],
      resurrection: ["复活术"], teleport: ["传送术"], "dominate monster": ["支配怪物"],
      "power word stun": ["震慑真言"], sunburst: ["阳炎爆"], "meteor swarm": ["流星群"],
      "power word kill": ["死亡真言"], "time stop": ["时间停止"], wish: ["祈愿术"],
    },
  },
};

export function referenceAliases(kind: ReferenceKind, canonicalName: string, locale: AppLocale): readonly string[] {
  return REFERENCE_NAMES[locale]?.[kind]?.[canonicalName.toLowerCase().replace(/[‘’]/g, "'").trim()] ?? [];
}
