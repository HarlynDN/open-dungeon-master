import { defineMessages } from "./catalog.ts";

// Original translations of native table names. Values handed to the rules and
// callbacks stay canonical; homebrew names retain their author wording.
export const EQUIPMENT_NAMES = [
  {
    "name": "Abacus",
    "key": "equipmentName.0"
  },
  {
    "name": "Acid (vial)",
    "key": "equipmentName.1"
  },
  {
    "name": "Alchemist's Fire (flask)",
    "key": "equipmentName.2"
  },
  {
    "name": "Alchemist's Supplies",
    "key": "equipmentName.3"
  },
  {
    "name": "Alms Box",
    "key": "equipmentName.4"
  },
  {
    "name": "Antitoxin (vial)",
    "key": "equipmentName.5"
  },
  {
    "name": "Arcane Focus",
    "key": "equipmentName.6"
  },
  {
    "name": "Armorweave Vest",
    "key": "equipmentName.7"
  },
  {
    "name": "Arrows",
    "key": "equipmentName.8"
  },
  {
    "name": "Backpack",
    "key": "equipmentName.9"
  },
  {
    "name": "Bagpipes",
    "key": "equipmentName.10"
  },
  {
    "name": "Ball Bearings (bag of 1000)",
    "key": "equipmentName.11"
  },
  {
    "name": "Ballistic Shield",
    "key": "equipmentName.12"
  },
  {
    "name": "Barrel",
    "key": "equipmentName.13"
  },
  {
    "name": "Basket",
    "key": "equipmentName.14"
  },
  {
    "name": "Battleaxe",
    "key": "equipmentName.15"
  },
  {
    "name": "Bedroll",
    "key": "equipmentName.16"
  },
  {
    "name": "Bell",
    "key": "equipmentName.17"
  },
  {
    "name": "Blanket",
    "key": "equipmentName.18"
  },
  {
    "name": "Block and Tackle",
    "key": "equipmentName.19"
  },
  {
    "name": "Block of Incense",
    "key": "equipmentName.20"
  },
  {
    "name": "Blowgun",
    "key": "equipmentName.21"
  },
  {
    "name": "Book",
    "key": "equipmentName.22"
  },
  {
    "name": "Bottle, Glass",
    "key": "equipmentName.23"
  },
  {
    "name": "Brass Carapace",
    "key": "equipmentName.24"
  },
  {
    "name": "Breastplate",
    "key": "equipmentName.25"
  },
  {
    "name": "Brewer's Supplies",
    "key": "equipmentName.26"
  },
  {
    "name": "Bucket",
    "key": "equipmentName.27"
  },
  {
    "name": "Bullets",
    "key": "equipmentName.28"
  },
  {
    "name": "Calligrapher's Supplies",
    "key": "equipmentName.29"
  },
  {
    "name": "Caltrops (bag of 20)",
    "key": "equipmentName.30"
  },
  {
    "name": "Candle",
    "key": "equipmentName.31"
  },
  {
    "name": "Carpenter's Tools",
    "key": "equipmentName.32"
  },
  {
    "name": "Cartographer's Tools",
    "key": "equipmentName.33"
  },
  {
    "name": "Case, Crossbow Bolt",
    "key": "equipmentName.34"
  },
  {
    "name": "Case, Map or Scroll",
    "key": "equipmentName.35"
  },
  {
    "name": "Censer",
    "key": "equipmentName.36"
  },
  {
    "name": "Censer Mace",
    "key": "equipmentName.37"
  },
  {
    "name": "Chain (10 feet)",
    "key": "equipmentName.38"
  },
  {
    "name": "Chain Mail",
    "key": "equipmentName.39"
  },
  {
    "name": "Chain Shirt",
    "key": "equipmentName.40"
  },
  {
    "name": "Chainblade",
    "key": "equipmentName.41"
  },
  {
    "name": "Chalk (1 piece)",
    "key": "equipmentName.42"
  },
  {
    "name": "Chest",
    "key": "equipmentName.43"
  },
  {
    "name": "Climber's Kit",
    "key": "equipmentName.44"
  },
  {
    "name": "Clothes, Common",
    "key": "equipmentName.45"
  },
  {
    "name": "Clothes, Costume",
    "key": "equipmentName.46"
  },
  {
    "name": "Clothes, Fine",
    "key": "equipmentName.47"
  },
  {
    "name": "Clothes, Traveler's",
    "key": "equipmentName.48"
  },
  {
    "name": "Club",
    "key": "equipmentName.49"
  },
  {
    "name": "Cobbler's Tools",
    "key": "equipmentName.50"
  },
  {
    "name": "Component Pouch",
    "key": "equipmentName.51"
  },
  {
    "name": "Cook's Utensils",
    "key": "equipmentName.52"
  },
  {
    "name": "Crossbow Bolts",
    "key": "equipmentName.53"
  },
  {
    "name": "Crowbar",
    "key": "equipmentName.54"
  },
  {
    "name": "Dagger",
    "key": "equipmentName.55"
  },
  {
    "name": "Dart",
    "key": "equipmentName.56"
  },
  {
    "name": "Dice Set",
    "key": "equipmentName.57"
  },
  {
    "name": "Disguise Kit",
    "key": "equipmentName.58"
  },
  {
    "name": "Drone Controls",
    "key": "equipmentName.59"
  },
  {
    "name": "Druidic Focus",
    "key": "equipmentName.60"
  },
  {
    "name": "Drum",
    "key": "equipmentName.61"
  },
  {
    "name": "Dulcimer",
    "key": "equipmentName.62"
  },
  {
    "name": "Field Instruments",
    "key": "equipmentName.63"
  },
  {
    "name": "Fishing Tackle",
    "key": "equipmentName.64"
  },
  {
    "name": "Flail",
    "key": "equipmentName.65"
  },
  {
    "name": "Flask",
    "key": "equipmentName.66"
  },
  {
    "name": "Flute",
    "key": "equipmentName.67"
  },
  {
    "name": "Forgery Kit",
    "key": "equipmentName.68"
  },
  {
    "name": "Glaive",
    "key": "equipmentName.69"
  },
  {
    "name": "Glassblower's Tools",
    "key": "equipmentName.70"
  },
  {
    "name": "Grappling Hook",
    "key": "equipmentName.71"
  },
  {
    "name": "Greataxe",
    "key": "equipmentName.72"
  },
  {
    "name": "Greatclub",
    "key": "equipmentName.73"
  },
  {
    "name": "Greatsword",
    "key": "equipmentName.74"
  },
  {
    "name": "Hacking Rig",
    "key": "equipmentName.75"
  },
  {
    "name": "Halberd",
    "key": "equipmentName.76"
  },
  {
    "name": "Half Plate",
    "key": "equipmentName.77"
  },
  {
    "name": "Hammer",
    "key": "equipmentName.78"
  },
  {
    "name": "Hammer, Sledge",
    "key": "equipmentName.79"
  },
  {
    "name": "Hand Cannon",
    "key": "equipmentName.80"
  },
  {
    "name": "Hand Crossbow",
    "key": "equipmentName.81"
  },
  {
    "name": "Handaxe",
    "key": "equipmentName.82"
  },
  {
    "name": "Healer's Kit",
    "key": "equipmentName.83"
  },
  {
    "name": "Heavy Crossbow",
    "key": "equipmentName.84"
  },
  {
    "name": "Heavy Spanner",
    "key": "equipmentName.85"
  },
  {
    "name": "Herbalism Kit",
    "key": "equipmentName.86"
  },
  {
    "name": "Hide",
    "key": "equipmentName.87"
  },
  {
    "name": "Holy Symbol",
    "key": "equipmentName.88"
  },
  {
    "name": "Holy Water (flask)",
    "key": "equipmentName.89"
  },
  {
    "name": "Horn",
    "key": "equipmentName.90"
  },
  {
    "name": "Hourglass",
    "key": "equipmentName.91"
  },
  {
    "name": "Hunting Rifle",
    "key": "equipmentName.92"
  },
  {
    "name": "Hunting Trap",
    "key": "equipmentName.93"
  },
  {
    "name": "Hurled Vial",
    "key": "equipmentName.94"
  },
  {
    "name": "Ink (1 ounce bottle)",
    "key": "equipmentName.95"
  },
  {
    "name": "Ink Pen",
    "key": "equipmentName.96"
  },
  {
    "name": "Investigator's Kit",
    "key": "equipmentName.97"
  },
  {
    "name": "Javelin",
    "key": "equipmentName.98"
  },
  {
    "name": "Jeweler's Tools",
    "key": "equipmentName.99"
  },
  {
    "name": "Jug",
    "key": "equipmentName.100"
  },
  {
    "name": "Kevlar Vest",
    "key": "equipmentName.101"
  },
  {
    "name": "Ladder (10-foot)",
    "key": "equipmentName.102"
  },
  {
    "name": "Lamp",
    "key": "equipmentName.103"
  },
  {
    "name": "Lance",
    "key": "equipmentName.104"
  },
  {
    "name": "Lantern, Bullseye",
    "key": "equipmentName.105"
  },
  {
    "name": "Lantern, Hooded",
    "key": "equipmentName.106"
  },
  {
    "name": "Leather",
    "key": "equipmentName.107"
  },
  {
    "name": "Leatherworker's Tools",
    "key": "equipmentName.108"
  },
  {
    "name": "Light Crossbow",
    "key": "equipmentName.109"
  },
  {
    "name": "Light Hammer",
    "key": "equipmentName.110"
  },
  {
    "name": "Little Bag of Sand",
    "key": "equipmentName.111"
  },
  {
    "name": "Lock",
    "key": "equipmentName.112"
  },
  {
    "name": "Longbow",
    "key": "equipmentName.113"
  },
  {
    "name": "Longsword",
    "key": "equipmentName.114"
  },
  {
    "name": "Lute",
    "key": "equipmentName.115"
  },
  {
    "name": "Lyre",
    "key": "equipmentName.116"
  },
  {
    "name": "Mace",
    "key": "equipmentName.117"
  },
  {
    "name": "Machete",
    "key": "equipmentName.118"
  },
  {
    "name": "Magnifying Glass",
    "key": "equipmentName.119"
  },
  {
    "name": "Manacles",
    "key": "equipmentName.120"
  },
  {
    "name": "Mason's Tools",
    "key": "equipmentName.121"
  },
  {
    "name": "Maul",
    "key": "equipmentName.122"
  },
  {
    "name": "Medic's Kit",
    "key": "equipmentName.123"
  },
  {
    "name": "Mess Kit",
    "key": "equipmentName.124"
  },
  {
    "name": "Mirror, Steel",
    "key": "equipmentName.125"
  },
  {
    "name": "Monoblade",
    "key": "equipmentName.126"
  },
  {
    "name": "Morningstar",
    "key": "equipmentName.127"
  },
  {
    "name": "Musket",
    "key": "equipmentName.128"
  },
  {
    "name": "Navigator's Tools",
    "key": "equipmentName.129"
  },
  {
    "name": "Net",
    "key": "equipmentName.130"
  },
  {
    "name": "Oil (flask)",
    "key": "equipmentName.131"
  },
  {
    "name": "Padded",
    "key": "equipmentName.132"
  },
  {
    "name": "Painter's Supplies",
    "key": "equipmentName.133"
  },
  {
    "name": "Pan Flute",
    "key": "equipmentName.134"
  },
  {
    "name": "Paper (one sheet)",
    "key": "equipmentName.135"
  },
  {
    "name": "Parchment (one sheet)",
    "key": "equipmentName.136"
  },
  {
    "name": "Perfume (vial)",
    "key": "equipmentName.137"
  },
  {
    "name": "Photographer's Kit",
    "key": "equipmentName.138"
  },
  {
    "name": "Pick, Miner's",
    "key": "equipmentName.139"
  },
  {
    "name": "Pike",
    "key": "equipmentName.140"
  },
  {
    "name": "Pistol",
    "key": "equipmentName.141"
  },
  {
    "name": "Piton",
    "key": "equipmentName.142"
  },
  {
    "name": "Plate",
    "key": "equipmentName.143"
  },
  {
    "name": "Playing Card Set",
    "key": "equipmentName.144"
  },
  {
    "name": "Poison, Basic (vial)",
    "key": "equipmentName.145"
  },
  {
    "name": "Poisoner's Kit",
    "key": "equipmentName.146"
  },
  {
    "name": "Pole (10-foot)",
    "key": "equipmentName.147"
  },
  {
    "name": "Pot, Iron",
    "key": "equipmentName.148"
  },
  {
    "name": "Potion of Healing",
    "key": "equipmentName.149"
  },
  {
    "name": "Potter's Tools",
    "key": "equipmentName.150"
  },
  {
    "name": "Pouch",
    "key": "equipmentName.151"
  },
  {
    "name": "Quarterstaff",
    "key": "equipmentName.152"
  },
  {
    "name": "Quiver",
    "key": "equipmentName.153"
  },
  {
    "name": "Ram, Portable",
    "key": "equipmentName.154"
  },
  {
    "name": "Rapier",
    "key": "equipmentName.155"
  },
  {
    "name": "Rations (1 day)",
    "key": "equipmentName.156"
  },
  {
    "name": "Revolver",
    "key": "equipmentName.157"
  },
  {
    "name": "Ring Mail",
    "key": "equipmentName.158"
  },
  {
    "name": "Riot Plating",
    "key": "equipmentName.159"
  },
  {
    "name": "Ripper Gauntlet",
    "key": "equipmentName.160"
  },
  {
    "name": "Robes",
    "key": "equipmentName.161"
  },
  {
    "name": "Rope, Hempen (50 feet)",
    "key": "equipmentName.162"
  },
  {
    "name": "Rope, Silk (50 feet)",
    "key": "equipmentName.163"
  },
  {
    "name": "Sack",
    "key": "equipmentName.164"
  },
  {
    "name": "Sawed-off Scattergun",
    "key": "equipmentName.165"
  },
  {
    "name": "Scale Mail",
    "key": "equipmentName.166"
  },
  {
    "name": "Scale, Merchant's",
    "key": "equipmentName.167"
  },
  {
    "name": "Scimitar",
    "key": "equipmentName.168"
  },
  {
    "name": "Scrap Plate",
    "key": "equipmentName.169"
  },
  {
    "name": "Sealing Wax",
    "key": "equipmentName.170"
  },
  {
    "name": "Seance Kit",
    "key": "equipmentName.171"
  },
  {
    "name": "Shawm",
    "key": "equipmentName.172"
  },
  {
    "name": "Shield",
    "key": "equipmentName.173"
  },
  {
    "name": "Shock Baton",
    "key": "equipmentName.174"
  },
  {
    "name": "Shortbow",
    "key": "equipmentName.175"
  },
  {
    "name": "Shortsword",
    "key": "equipmentName.176"
  },
  {
    "name": "Shovel",
    "key": "equipmentName.177"
  },
  {
    "name": "Sickle",
    "key": "equipmentName.178"
  },
  {
    "name": "Signal Whistle",
    "key": "equipmentName.179"
  },
  {
    "name": "Signet Ring",
    "key": "equipmentName.180"
  },
  {
    "name": "Silvered Stake",
    "key": "equipmentName.181"
  },
  {
    "name": "Sling",
    "key": "equipmentName.182"
  },
  {
    "name": "Small Knife",
    "key": "equipmentName.183"
  },
  {
    "name": "Smith's Tools",
    "key": "equipmentName.184"
  },
  {
    "name": "Soap",
    "key": "equipmentName.185"
  },
  {
    "name": "Spear",
    "key": "equipmentName.186"
  },
  {
    "name": "Spellbook",
    "key": "equipmentName.187"
  },
  {
    "name": "Spikes, Iron (10)",
    "key": "equipmentName.188"
  },
  {
    "name": "Splint",
    "key": "equipmentName.189"
  },
  {
    "name": "Spyglass",
    "key": "equipmentName.190"
  },
  {
    "name": "String (10 feet)",
    "key": "equipmentName.191"
  },
  {
    "name": "Studded Leather",
    "key": "equipmentName.192"
  },
  {
    "name": "Sword Cane",
    "key": "equipmentName.193"
  },
  {
    "name": "Tent, Two-Person",
    "key": "equipmentName.194"
  },
  {
    "name": "Thieves' Tools",
    "key": "equipmentName.195"
  },
  {
    "name": "Tinderbox",
    "key": "equipmentName.196"
  },
  {
    "name": "Tinker's Tools",
    "key": "equipmentName.197"
  },
  {
    "name": "Torch",
    "key": "equipmentName.198"
  },
  {
    "name": "Trident",
    "key": "equipmentName.199"
  },
  {
    "name": "Vestments",
    "key": "equipmentName.200"
  },
  {
    "name": "Vial",
    "key": "equipmentName.201"
  },
  {
    "name": "Vibroknife",
    "key": "equipmentName.202"
  },
  {
    "name": "Viol",
    "key": "equipmentName.203"
  },
  {
    "name": "War Pick",
    "key": "equipmentName.204"
  },
  {
    "name": "Warhammer",
    "key": "equipmentName.205"
  },
  {
    "name": "Waterskin",
    "key": "equipmentName.206"
  },
  {
    "name": "Weaver's Tools",
    "key": "equipmentName.207"
  },
  {
    "name": "Whetstone",
    "key": "equipmentName.208"
  },
  {
    "name": "Whip",
    "key": "equipmentName.209"
  },
  {
    "name": "Woodcarver's Tools",
    "key": "equipmentName.210"
  },
  {
    "name": "Wooden Shield",
    "key": "equipmentName.211"
  },
  {
    "name": "5 sticks of incense",
    "key": "equipmentName.212"
  },
  {
    "name": "Con tools",
    "key": "equipmentName.213"
  },
  {
    "name": "Musical instrument",
    "key": "equipmentName.214"
  },
  {
    "name": "Favor of an admirer",
    "key": "equipmentName.215"
  },
  {
    "name": "Artisan's tools",
    "key": "equipmentName.216"
  },
  {
    "name": "Letter of introduction from your guild",
    "key": "equipmentName.217"
  },
  {
    "name": "Scroll of pedigree",
    "key": "equipmentName.218"
  },
  {
    "name": "Trophy from an animal you killed",
    "key": "equipmentName.219"
  },
  {
    "name": "Letter from a dead colleague",
    "key": "equipmentName.220"
  },
  {
    "name": "Lucky charm",
    "key": "equipmentName.221"
  },
  {
    "name": "Insignia of rank",
    "key": "equipmentName.222"
  },
  {
    "name": "Trophy from a fallen enemy",
    "key": "equipmentName.223"
  },
  {
    "name": "Gaming set",
    "key": "equipmentName.224"
  },
  {
    "name": "Map of your home city",
    "key": "equipmentName.225"
  },
  {
    "name": "Pet mouse",
    "key": "equipmentName.226"
  },
  {
    "name": "Token of your parents",
    "key": "equipmentName.227"
  }
] as const;

export const EQUIPMENT_NAME_MESSAGES = /*#__PURE__*/ defineMessages({
  "equipmentName.0": {
    "en": "Abacus",
    "zh-CN": "算盘"
  },
  "equipmentName.1": {
    "en": "Acid (vial)",
    "zh-CN": "强酸（小瓶）"
  },
  "equipmentName.2": {
    "en": "Alchemist's Fire (flask)",
    "zh-CN": "炼金火（扁瓶）"
  },
  "equipmentName.3": {
    "en": "Alchemist's Supplies",
    "zh-CN": "炼金工具"
  },
  "equipmentName.4": {
    "en": "Alms Box",
    "zh-CN": "施舍箱"
  },
  "equipmentName.5": {
    "en": "Antitoxin (vial)",
    "zh-CN": "抗毒剂（小瓶）"
  },
  "equipmentName.6": {
    "en": "Arcane Focus",
    "zh-CN": "奥术法器"
  },
  "equipmentName.7": {
    "en": "Armorweave Vest",
    "zh-CN": "护甲编织背心"
  },
  "equipmentName.8": {
    "en": "Arrows",
    "zh-CN": "箭矢"
  },
  "equipmentName.9": {
    "en": "Backpack",
    "zh-CN": "背包"
  },
  "equipmentName.10": {
    "en": "Bagpipes",
    "zh-CN": "风笛"
  },
  "equipmentName.11": {
    "en": "Ball Bearings (bag of 1000)",
    "zh-CN": "滚珠（1000 颗一袋）"
  },
  "equipmentName.12": {
    "en": "Ballistic Shield",
    "zh-CN": "防弹盾"
  },
  "equipmentName.13": {
    "en": "Barrel",
    "zh-CN": "大桶"
  },
  "equipmentName.14": {
    "en": "Basket",
    "zh-CN": "篮子"
  },
  "equipmentName.15": {
    "en": "Battleaxe",
    "zh-CN": "战斧"
  },
  "equipmentName.16": {
    "en": "Bedroll",
    "zh-CN": "铺盖卷"
  },
  "equipmentName.17": {
    "en": "Bell",
    "zh-CN": "铃铛"
  },
  "equipmentName.18": {
    "en": "Blanket",
    "zh-CN": "毯子"
  },
  "equipmentName.19": {
    "en": "Block and Tackle",
    "zh-CN": "滑轮组"
  },
  "equipmentName.20": {
    "en": "Block of Incense",
    "zh-CN": "香块"
  },
  "equipmentName.21": {
    "en": "Blowgun",
    "zh-CN": "吹箭筒"
  },
  "equipmentName.22": {
    "en": "Book",
    "zh-CN": "书"
  },
  "equipmentName.23": {
    "en": "Bottle, Glass",
    "zh-CN": "玻璃瓶"
  },
  "equipmentName.24": {
    "en": "Brass Carapace",
    "zh-CN": "黄铜外甲"
  },
  "equipmentName.25": {
    "en": "Breastplate",
    "zh-CN": "胸甲"
  },
  "equipmentName.26": {
    "en": "Brewer's Supplies",
    "zh-CN": "酿造工具"
  },
  "equipmentName.27": {
    "en": "Bucket",
    "zh-CN": "水桶"
  },
  "equipmentName.28": {
    "en": "Bullets",
    "zh-CN": "子弹"
  },
  "equipmentName.29": {
    "en": "Calligrapher's Supplies",
    "zh-CN": "书法工具"
  },
  "equipmentName.30": {
    "en": "Caltrops (bag of 20)",
    "zh-CN": "铁蒺藜（20 个一袋）"
  },
  "equipmentName.31": {
    "en": "Candle",
    "zh-CN": "蜡烛"
  },
  "equipmentName.32": {
    "en": "Carpenter's Tools",
    "zh-CN": "木工工具"
  },
  "equipmentName.33": {
    "en": "Cartographer's Tools",
    "zh-CN": "制图工具"
  },
  "equipmentName.34": {
    "en": "Case, Crossbow Bolt",
    "zh-CN": "弩矢盒"
  },
  "equipmentName.35": {
    "en": "Case, Map or Scroll",
    "zh-CN": "地图或卷轴筒"
  },
  "equipmentName.36": {
    "en": "Censer",
    "zh-CN": "香炉"
  },
  "equipmentName.37": {
    "en": "Censer Mace",
    "zh-CN": "香炉钉头锤"
  },
  "equipmentName.38": {
    "en": "Chain (10 feet)",
    "zh-CN": "锁链（10 英尺）"
  },
  "equipmentName.39": {
    "en": "Chain Mail",
    "zh-CN": "链甲"
  },
  "equipmentName.40": {
    "en": "Chain Shirt",
    "zh-CN": "链甲衫"
  },
  "equipmentName.41": {
    "en": "Chainblade",
    "zh-CN": "链刃"
  },
  "equipmentName.42": {
    "en": "Chalk (1 piece)",
    "zh-CN": "粉笔（1 支）"
  },
  "equipmentName.43": {
    "en": "Chest",
    "zh-CN": "箱子"
  },
  "equipmentName.44": {
    "en": "Climber's Kit",
    "zh-CN": "攀爬工具包"
  },
  "equipmentName.45": {
    "en": "Clothes, Common",
    "zh-CN": "普通服装"
  },
  "equipmentName.46": {
    "en": "Clothes, Costume",
    "zh-CN": "戏服"
  },
  "equipmentName.47": {
    "en": "Clothes, Fine",
    "zh-CN": "精制服装"
  },
  "equipmentName.48": {
    "en": "Clothes, Traveler's",
    "zh-CN": "旅行服装"
  },
  "equipmentName.49": {
    "en": "Club",
    "zh-CN": "短棒"
  },
  "equipmentName.50": {
    "en": "Cobbler's Tools",
    "zh-CN": "制鞋工具"
  },
  "equipmentName.51": {
    "en": "Component Pouch",
    "zh-CN": "施法材料包"
  },
  "equipmentName.52": {
    "en": "Cook's Utensils",
    "zh-CN": "烹饪用具"
  },
  "equipmentName.53": {
    "en": "Crossbow Bolts",
    "zh-CN": "弩矢"
  },
  "equipmentName.54": {
    "en": "Crowbar",
    "zh-CN": "撬棍"
  },
  "equipmentName.55": {
    "en": "Dagger",
    "zh-CN": "匕首"
  },
  "equipmentName.56": {
    "en": "Dart",
    "zh-CN": "飞镖"
  },
  "equipmentName.57": {
    "en": "Dice Set",
    "zh-CN": "骰子组"
  },
  "equipmentName.58": {
    "en": "Disguise Kit",
    "zh-CN": "易容工具"
  },
  "equipmentName.59": {
    "en": "Drone Controls",
    "zh-CN": "无人机控制器"
  },
  "equipmentName.60": {
    "en": "Druidic Focus",
    "zh-CN": "德鲁伊法器"
  },
  "equipmentName.61": {
    "en": "Drum",
    "zh-CN": "鼓"
  },
  "equipmentName.62": {
    "en": "Dulcimer",
    "zh-CN": "扬琴"
  },
  "equipmentName.63": {
    "en": "Field Instruments",
    "zh-CN": "野外仪器"
  },
  "equipmentName.64": {
    "en": "Fishing Tackle",
    "zh-CN": "钓具"
  },
  "equipmentName.65": {
    "en": "Flail",
    "zh-CN": "链枷"
  },
  "equipmentName.66": {
    "en": "Flask",
    "zh-CN": "扁瓶"
  },
  "equipmentName.67": {
    "en": "Flute",
    "zh-CN": "长笛"
  },
  "equipmentName.68": {
    "en": "Forgery Kit",
    "zh-CN": "伪造工具"
  },
  "equipmentName.69": {
    "en": "Glaive",
    "zh-CN": "长柄刀"
  },
  "equipmentName.70": {
    "en": "Glassblower's Tools",
    "zh-CN": "吹制玻璃工具"
  },
  "equipmentName.71": {
    "en": "Grappling Hook",
    "zh-CN": "抓钩"
  },
  "equipmentName.72": {
    "en": "Greataxe",
    "zh-CN": "巨斧"
  },
  "equipmentName.73": {
    "en": "Greatclub",
    "zh-CN": "巨棒"
  },
  "equipmentName.74": {
    "en": "Greatsword",
    "zh-CN": "巨剑"
  },
  "equipmentName.75": {
    "en": "Hacking Rig",
    "zh-CN": "骇入设备"
  },
  "equipmentName.76": {
    "en": "Halberd",
    "zh-CN": "戟"
  },
  "equipmentName.77": {
    "en": "Half Plate",
    "zh-CN": "半身板甲"
  },
  "equipmentName.78": {
    "en": "Hammer",
    "zh-CN": "锤子"
  },
  "equipmentName.79": {
    "en": "Hammer, Sledge",
    "zh-CN": "大锤"
  },
  "equipmentName.80": {
    "en": "Hand Cannon",
    "zh-CN": "手炮"
  },
  "equipmentName.81": {
    "en": "Hand Crossbow",
    "zh-CN": "手弩"
  },
  "equipmentName.82": {
    "en": "Handaxe",
    "zh-CN": "手斧"
  },
  "equipmentName.83": {
    "en": "Healer's Kit",
    "zh-CN": "治疗工具包"
  },
  "equipmentName.84": {
    "en": "Heavy Crossbow",
    "zh-CN": "重弩"
  },
  "equipmentName.85": {
    "en": "Heavy Spanner",
    "zh-CN": "重型扳手"
  },
  "equipmentName.86": {
    "en": "Herbalism Kit",
    "zh-CN": "草药工具"
  },
  "equipmentName.87": {
    "en": "Hide",
    "zh-CN": "兽皮甲"
  },
  "equipmentName.88": {
    "en": "Holy Symbol",
    "zh-CN": "圣徽"
  },
  "equipmentName.89": {
    "en": "Holy Water (flask)",
    "zh-CN": "圣水（扁瓶）"
  },
  "equipmentName.90": {
    "en": "Horn",
    "zh-CN": "号角"
  },
  "equipmentName.91": {
    "en": "Hourglass",
    "zh-CN": "沙漏"
  },
  "equipmentName.92": {
    "en": "Hunting Rifle",
    "zh-CN": "猎枪"
  },
  "equipmentName.93": {
    "en": "Hunting Trap",
    "zh-CN": "捕猎陷阱"
  },
  "equipmentName.94": {
    "en": "Hurled Vial",
    "zh-CN": "投掷小瓶"
  },
  "equipmentName.95": {
    "en": "Ink (1 ounce bottle)",
    "zh-CN": "墨水（1 盎司瓶）"
  },
  "equipmentName.96": {
    "en": "Ink Pen",
    "zh-CN": "墨水笔"
  },
  "equipmentName.97": {
    "en": "Investigator's Kit",
    "zh-CN": "调查工具包"
  },
  "equipmentName.98": {
    "en": "Javelin",
    "zh-CN": "标枪"
  },
  "equipmentName.99": {
    "en": "Jeweler's Tools",
    "zh-CN": "珠宝工具"
  },
  "equipmentName.100": {
    "en": "Jug",
    "zh-CN": "壶"
  },
  "equipmentName.101": {
    "en": "Kevlar Vest",
    "zh-CN": "凯夫拉背心"
  },
  "equipmentName.102": {
    "en": "Ladder (10-foot)",
    "zh-CN": "梯子（10 英尺）"
  },
  "equipmentName.103": {
    "en": "Lamp",
    "zh-CN": "油灯"
  },
  "equipmentName.104": {
    "en": "Lance",
    "zh-CN": "骑枪"
  },
  "equipmentName.105": {
    "en": "Lantern, Bullseye",
    "zh-CN": "聚光灯笼"
  },
  "equipmentName.106": {
    "en": "Lantern, Hooded",
    "zh-CN": "遮光灯笼"
  },
  "equipmentName.107": {
    "en": "Leather",
    "zh-CN": "皮甲"
  },
  "equipmentName.108": {
    "en": "Leatherworker's Tools",
    "zh-CN": "皮革加工工具"
  },
  "equipmentName.109": {
    "en": "Light Crossbow",
    "zh-CN": "轻弩"
  },
  "equipmentName.110": {
    "en": "Light Hammer",
    "zh-CN": "轻锤"
  },
  "equipmentName.111": {
    "en": "Little Bag of Sand",
    "zh-CN": "小沙袋"
  },
  "equipmentName.112": {
    "en": "Lock",
    "zh-CN": "锁"
  },
  "equipmentName.113": {
    "en": "Longbow",
    "zh-CN": "长弓"
  },
  "equipmentName.114": {
    "en": "Longsword",
    "zh-CN": "长剑"
  },
  "equipmentName.115": {
    "en": "Lute",
    "zh-CN": "鲁特琴"
  },
  "equipmentName.116": {
    "en": "Lyre",
    "zh-CN": "里拉琴"
  },
  "equipmentName.117": {
    "en": "Mace",
    "zh-CN": "钉头锤"
  },
  "equipmentName.118": {
    "en": "Machete",
    "zh-CN": "砍刀"
  },
  "equipmentName.119": {
    "en": "Magnifying Glass",
    "zh-CN": "放大镜"
  },
  "equipmentName.120": {
    "en": "Manacles",
    "zh-CN": "镣铐"
  },
  "equipmentName.121": {
    "en": "Mason's Tools",
    "zh-CN": "石匠工具"
  },
  "equipmentName.122": {
    "en": "Maul",
    "zh-CN": "巨锤"
  },
  "equipmentName.123": {
    "en": "Medic's Kit",
    "zh-CN": "医疗工具包"
  },
  "equipmentName.124": {
    "en": "Mess Kit",
    "zh-CN": "餐具套装"
  },
  "equipmentName.125": {
    "en": "Mirror, Steel",
    "zh-CN": "钢镜"
  },
  "equipmentName.126": {
    "en": "Monoblade",
    "zh-CN": "单分子刃"
  },
  "equipmentName.127": {
    "en": "Morningstar",
    "zh-CN": "刺头锤"
  },
  "equipmentName.128": {
    "en": "Musket",
    "zh-CN": "火枪"
  },
  "equipmentName.129": {
    "en": "Navigator's Tools",
    "zh-CN": "导航工具"
  },
  "equipmentName.130": {
    "en": "Net",
    "zh-CN": "捕网"
  },
  "equipmentName.131": {
    "en": "Oil (flask)",
    "zh-CN": "油（扁瓶）"
  },
  "equipmentName.132": {
    "en": "Padded",
    "zh-CN": "衬垫甲"
  },
  "equipmentName.133": {
    "en": "Painter's Supplies",
    "zh-CN": "绘画工具"
  },
  "equipmentName.134": {
    "en": "Pan Flute",
    "zh-CN": "排箫"
  },
  "equipmentName.135": {
    "en": "Paper (one sheet)",
    "zh-CN": "纸（1 张）"
  },
  "equipmentName.136": {
    "en": "Parchment (one sheet)",
    "zh-CN": "羊皮纸（1 张）"
  },
  "equipmentName.137": {
    "en": "Perfume (vial)",
    "zh-CN": "香水（小瓶）"
  },
  "equipmentName.138": {
    "en": "Photographer's Kit",
    "zh-CN": "摄影工具包"
  },
  "equipmentName.139": {
    "en": "Pick, Miner's",
    "zh-CN": "矿工镐"
  },
  "equipmentName.140": {
    "en": "Pike",
    "zh-CN": "长矛"
  },
  "equipmentName.141": {
    "en": "Pistol",
    "zh-CN": "手枪"
  },
  "equipmentName.142": {
    "en": "Piton",
    "zh-CN": "岩钉"
  },
  "equipmentName.143": {
    "en": "Plate",
    "zh-CN": "全身板甲"
  },
  "equipmentName.144": {
    "en": "Playing Card Set",
    "zh-CN": "纸牌组"
  },
  "equipmentName.145": {
    "en": "Poison, Basic (vial)",
    "zh-CN": "基础毒药（小瓶）"
  },
  "equipmentName.146": {
    "en": "Poisoner's Kit",
    "zh-CN": "制毒工具"
  },
  "equipmentName.147": {
    "en": "Pole (10-foot)",
    "zh-CN": "长杆（10 英尺）"
  },
  "equipmentName.148": {
    "en": "Pot, Iron",
    "zh-CN": "铁锅"
  },
  "equipmentName.149": {
    "en": "Potion of Healing",
    "zh-CN": "治疗药水"
  },
  "equipmentName.150": {
    "en": "Potter's Tools",
    "zh-CN": "制陶工具"
  },
  "equipmentName.151": {
    "en": "Pouch",
    "zh-CN": "小袋"
  },
  "equipmentName.152": {
    "en": "Quarterstaff",
    "zh-CN": "长棍"
  },
  "equipmentName.153": {
    "en": "Quiver",
    "zh-CN": "箭袋"
  },
  "equipmentName.154": {
    "en": "Ram, Portable",
    "zh-CN": "便携撞锤"
  },
  "equipmentName.155": {
    "en": "Rapier",
    "zh-CN": "刺剑"
  },
  "equipmentName.156": {
    "en": "Rations (1 day)",
    "zh-CN": "口粮（1 天）"
  },
  "equipmentName.157": {
    "en": "Revolver",
    "zh-CN": "左轮手枪"
  },
  "equipmentName.158": {
    "en": "Ring Mail",
    "zh-CN": "环甲"
  },
  "equipmentName.159": {
    "en": "Riot Plating",
    "zh-CN": "防暴护板"
  },
  "equipmentName.160": {
    "en": "Ripper Gauntlet",
    "zh-CN": "撕裂拳套"
  },
  "equipmentName.161": {
    "en": "Robes",
    "zh-CN": "长袍"
  },
  "equipmentName.162": {
    "en": "Rope, Hempen (50 feet)",
    "zh-CN": "麻绳（50 英尺）"
  },
  "equipmentName.163": {
    "en": "Rope, Silk (50 feet)",
    "zh-CN": "丝绳（50 英尺）"
  },
  "equipmentName.164": {
    "en": "Sack",
    "zh-CN": "麻袋"
  },
  "equipmentName.165": {
    "en": "Sawed-off Scattergun",
    "zh-CN": "短管霰弹枪"
  },
  "equipmentName.166": {
    "en": "Scale Mail",
    "zh-CN": "鳞甲"
  },
  "equipmentName.167": {
    "en": "Scale, Merchant's",
    "zh-CN": "商用秤"
  },
  "equipmentName.168": {
    "en": "Scimitar",
    "zh-CN": "弯刀"
  },
  "equipmentName.169": {
    "en": "Scrap Plate",
    "zh-CN": "废料板甲"
  },
  "equipmentName.170": {
    "en": "Sealing Wax",
    "zh-CN": "封蜡"
  },
  "equipmentName.171": {
    "en": "Seance Kit",
    "zh-CN": "降灵工具包"
  },
  "equipmentName.172": {
    "en": "Shawm",
    "zh-CN": "肖姆管"
  },
  "equipmentName.173": {
    "en": "Shield",
    "zh-CN": "盾牌"
  },
  "equipmentName.174": {
    "en": "Shock Baton",
    "zh-CN": "电击警棍"
  },
  "equipmentName.175": {
    "en": "Shortbow",
    "zh-CN": "短弓"
  },
  "equipmentName.176": {
    "en": "Shortsword",
    "zh-CN": "短剑"
  },
  "equipmentName.177": {
    "en": "Shovel",
    "zh-CN": "铲子"
  },
  "equipmentName.178": {
    "en": "Sickle",
    "zh-CN": "镰刀"
  },
  "equipmentName.179": {
    "en": "Signal Whistle",
    "zh-CN": "信号哨"
  },
  "equipmentName.180": {
    "en": "Signet Ring",
    "zh-CN": "印章戒指"
  },
  "equipmentName.181": {
    "en": "Silvered Stake",
    "zh-CN": "镀银桩"
  },
  "equipmentName.182": {
    "en": "Sling",
    "zh-CN": "投石索"
  },
  "equipmentName.183": {
    "en": "Small Knife",
    "zh-CN": "小刀"
  },
  "equipmentName.184": {
    "en": "Smith's Tools",
    "zh-CN": "铁匠工具"
  },
  "equipmentName.185": {
    "en": "Soap",
    "zh-CN": "肥皂"
  },
  "equipmentName.186": {
    "en": "Spear",
    "zh-CN": "矛"
  },
  "equipmentName.187": {
    "en": "Spellbook",
    "zh-CN": "法术书"
  },
  "equipmentName.188": {
    "en": "Spikes, Iron (10)",
    "zh-CN": "铁钉（10 根）"
  },
  "equipmentName.189": {
    "en": "Splint",
    "zh-CN": "夹板甲"
  },
  "equipmentName.190": {
    "en": "Spyglass",
    "zh-CN": "单筒望远镜"
  },
  "equipmentName.191": {
    "en": "String (10 feet)",
    "zh-CN": "细绳（10 英尺）"
  },
  "equipmentName.192": {
    "en": "Studded Leather",
    "zh-CN": "镶钉皮甲"
  },
  "equipmentName.193": {
    "en": "Sword Cane",
    "zh-CN": "杖剑"
  },
  "equipmentName.194": {
    "en": "Tent, Two-Person",
    "zh-CN": "双人帐篷"
  },
  "equipmentName.195": {
    "en": "Thieves' Tools",
    "zh-CN": "盗贼工具"
  },
  "equipmentName.196": {
    "en": "Tinderbox",
    "zh-CN": "火绒盒"
  },
  "equipmentName.197": {
    "en": "Tinker's Tools",
    "zh-CN": "修补匠工具"
  },
  "equipmentName.198": {
    "en": "Torch",
    "zh-CN": "火把"
  },
  "equipmentName.199": {
    "en": "Trident",
    "zh-CN": "三叉戟"
  },
  "equipmentName.200": {
    "en": "Vestments",
    "zh-CN": "祭服"
  },
  "equipmentName.201": {
    "en": "Vial",
    "zh-CN": "小瓶"
  },
  "equipmentName.202": {
    "en": "Vibroknife",
    "zh-CN": "振动匕首"
  },
  "equipmentName.203": {
    "en": "Viol",
    "zh-CN": "维奥尔琴"
  },
  "equipmentName.204": {
    "en": "War Pick",
    "zh-CN": "战镐"
  },
  "equipmentName.205": {
    "en": "Warhammer",
    "zh-CN": "战锤"
  },
  "equipmentName.206": {
    "en": "Waterskin",
    "zh-CN": "水袋"
  },
  "equipmentName.207": {
    "en": "Weaver's Tools",
    "zh-CN": "织布工具"
  },
  "equipmentName.208": {
    "en": "Whetstone",
    "zh-CN": "磨刀石"
  },
  "equipmentName.209": {
    "en": "Whip",
    "zh-CN": "鞭子"
  },
  "equipmentName.210": {
    "en": "Woodcarver's Tools",
    "zh-CN": "木雕工具"
  },
  "equipmentName.211": {
    "en": "Wooden Shield",
    "zh-CN": "木盾"
  },
  "equipmentName.212": {
    "en": "5 sticks of incense",
    "zh-CN": "5 支香"
  },
  "equipmentName.213": {
    "en": "Con tools",
    "zh-CN": "骗术道具"
  },
  "equipmentName.214": {
    "en": "Musical instrument",
    "zh-CN": "乐器"
  },
  "equipmentName.215": {
    "en": "Favor of an admirer",
    "zh-CN": "仰慕者的信物"
  },
  "equipmentName.216": {
    "en": "Artisan's tools",
    "zh-CN": "工匠工具"
  },
  "equipmentName.217": {
    "en": "Letter of introduction from your guild",
    "zh-CN": "公会介绍信"
  },
  "equipmentName.218": {
    "en": "Scroll of pedigree",
    "zh-CN": "家谱卷轴"
  },
  "equipmentName.219": {
    "en": "Trophy from an animal you killed",
    "zh-CN": "猎获动物的纪念品"
  },
  "equipmentName.220": {
    "en": "Letter from a dead colleague",
    "zh-CN": "已故同事的来信"
  },
  "equipmentName.221": {
    "en": "Lucky charm",
    "zh-CN": "幸运符"
  },
  "equipmentName.222": {
    "en": "Insignia of rank",
    "zh-CN": "军衔徽记"
  },
  "equipmentName.223": {
    "en": "Trophy from a fallen enemy",
    "zh-CN": "战胜敌人所得的纪念品"
  },
  "equipmentName.224": {
    "en": "Gaming set",
    "zh-CN": "游戏用具"
  },
  "equipmentName.225": {
    "en": "Map of your home city",
    "zh-CN": "家乡城市的地图"
  },
  "equipmentName.226": {
    "en": "Pet mouse",
    "zh-CN": "宠物老鼠"
  },
  "equipmentName.227": {
    "en": "Token of your parents",
    "zh-CN": "父母留下的信物"
  }
});
