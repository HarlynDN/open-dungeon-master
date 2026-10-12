import { defineMessages } from "./catalog.ts";

// Original Chinese names for SRD 5.1 item titles and exact native variants.
// IDs/names stay canonical in inventories, lookups, tool calls and history.
export const MAGIC_ITEM_NAMES = [
  {
    "id": "adamantine-armor",
    "name": "Adamantine Armor",
    "key": "magicItemName.adamantine-armor"
  },
  {
    "id": "ammunition-1-2-or-3",
    "name": "Ammunition, +1, +2, or +3",
    "key": "magicItemName.ammunition-1-2-or-3"
  },
  {
    "id": "amulet-of-health",
    "name": "Amulet of Health",
    "key": "magicItemName.amulet-of-health"
  },
  {
    "id": "amulet-of-proof-against-detection-and-location",
    "name": "Amulet of Proof Against Detection and Location",
    "key": "magicItemName.amulet-of-proof-against-detection-and-location"
  },
  {
    "id": "amulet-of-the-planes",
    "name": "Amulet of the Planes",
    "key": "magicItemName.amulet-of-the-planes"
  },
  {
    "id": "animated-shield",
    "name": "Animated Shield",
    "key": "magicItemName.animated-shield"
  },
  {
    "id": "apparatus-of-the-crab",
    "name": "Apparatus of the Crab",
    "key": "magicItemName.apparatus-of-the-crab"
  },
  {
    "id": "armor-of-invulnerability",
    "name": "Armor of Invulnerability",
    "key": "magicItemName.armor-of-invulnerability"
  },
  {
    "id": "armor-of-resistance",
    "name": "Armor of Resistance",
    "key": "magicItemName.armor-of-resistance"
  },
  {
    "id": "armor-of-vulnerability",
    "name": "Armor of Vulnerability",
    "key": "magicItemName.armor-of-vulnerability"
  },
  {
    "id": "armor-1-2-or-3",
    "name": "Armor, +1, +2, or +3",
    "key": "magicItemName.armor-1-2-or-3"
  },
  {
    "id": "arrow-of-slaying",
    "name": "Arrow of Slaying",
    "key": "magicItemName.arrow-of-slaying"
  },
  {
    "id": "arrow-catching-shield",
    "name": "Arrow-Catching Shield",
    "key": "magicItemName.arrow-catching-shield"
  },
  {
    "id": "bag-of-beans",
    "name": "Bag of Beans",
    "key": "magicItemName.bag-of-beans"
  },
  {
    "id": "bag-of-devouring",
    "name": "Bag of Devouring",
    "key": "magicItemName.bag-of-devouring"
  },
  {
    "id": "bag-of-holding",
    "name": "Bag of Holding",
    "key": "magicItemName.bag-of-holding"
  },
  {
    "id": "bag-of-tricks",
    "name": "Bag of Tricks",
    "key": "magicItemName.bag-of-tricks"
  },
  {
    "id": "bead-of-force",
    "name": "Bead of Force",
    "key": "magicItemName.bead-of-force"
  },
  {
    "id": "belt-of-dwarvenkind",
    "name": "Belt of Dwarvenkind",
    "key": "magicItemName.belt-of-dwarvenkind"
  },
  {
    "id": "belt-of-giant-strength",
    "name": "Belt of Giant Strength",
    "key": "magicItemName.belt-of-giant-strength"
  },
  {
    "id": "berserker-axe",
    "name": "Berserker Axe",
    "key": "magicItemName.berserker-axe"
  },
  {
    "id": "boots-of-elvenkind",
    "name": "Boots of Elvenkind",
    "key": "magicItemName.boots-of-elvenkind"
  },
  {
    "id": "boots-of-levitation",
    "name": "Boots of Levitation",
    "key": "magicItemName.boots-of-levitation"
  },
  {
    "id": "boots-of-speed",
    "name": "Boots of Speed",
    "key": "magicItemName.boots-of-speed"
  },
  {
    "id": "boots-of-striding-and-springing",
    "name": "Boots of Striding and Springing",
    "key": "magicItemName.boots-of-striding-and-springing"
  },
  {
    "id": "boots-of-the-winterlands",
    "name": "Boots of the Winterlands",
    "key": "magicItemName.boots-of-the-winterlands"
  },
  {
    "id": "bowl-of-commanding-water-elementals",
    "name": "Bowl of Commanding Water Elementals",
    "key": "magicItemName.bowl-of-commanding-water-elementals"
  },
  {
    "id": "bracers-of-archery",
    "name": "Bracers of Archery",
    "key": "magicItemName.bracers-of-archery"
  },
  {
    "id": "bracers-of-defense",
    "name": "Bracers of Defense",
    "key": "magicItemName.bracers-of-defense"
  },
  {
    "id": "brazier-of-commanding-fire-elementals",
    "name": "Brazier of Commanding Fire Elementals",
    "key": "magicItemName.brazier-of-commanding-fire-elementals"
  },
  {
    "id": "brooch-of-shielding",
    "name": "Brooch of Shielding",
    "key": "magicItemName.brooch-of-shielding"
  },
  {
    "id": "broom-of-flying",
    "name": "Broom of Flying",
    "key": "magicItemName.broom-of-flying"
  },
  {
    "id": "candle-of-invocation",
    "name": "Candle of Invocation",
    "key": "magicItemName.candle-of-invocation"
  },
  {
    "id": "cape-of-the-mountebank",
    "name": "Cape of the Mountebank",
    "key": "magicItemName.cape-of-the-mountebank"
  },
  {
    "id": "carpet-of-flying",
    "name": "Carpet of Flying",
    "key": "magicItemName.carpet-of-flying"
  },
  {
    "id": "censer-of-controlling-air-elementals",
    "name": "Censer of Controlling Air Elementals",
    "key": "magicItemName.censer-of-controlling-air-elementals"
  },
  {
    "id": "chime-of-opening",
    "name": "Chime of Opening",
    "key": "magicItemName.chime-of-opening"
  },
  {
    "id": "circlet-of-blasting",
    "name": "Circlet of Blasting",
    "key": "magicItemName.circlet-of-blasting"
  },
  {
    "id": "cloak-of-arachnida",
    "name": "Cloak of Arachnida",
    "key": "magicItemName.cloak-of-arachnida"
  },
  {
    "id": "cloak-of-displacement",
    "name": "Cloak of Displacement",
    "key": "magicItemName.cloak-of-displacement"
  },
  {
    "id": "cloak-of-elvenkind",
    "name": "Cloak of Elvenkind",
    "key": "magicItemName.cloak-of-elvenkind"
  },
  {
    "id": "cloak-of-protection",
    "name": "Cloak of Protection",
    "key": "magicItemName.cloak-of-protection"
  },
  {
    "id": "cloak-of-the-bat",
    "name": "Cloak of the Bat",
    "key": "magicItemName.cloak-of-the-bat"
  },
  {
    "id": "cloak-of-the-manta-ray",
    "name": "Cloak of the Manta Ray",
    "key": "magicItemName.cloak-of-the-manta-ray"
  },
  {
    "id": "crystal-ball",
    "name": "Crystal Ball",
    "key": "magicItemName.crystal-ball"
  },
  {
    "id": "cube-of-force",
    "name": "Cube of Force",
    "key": "magicItemName.cube-of-force"
  },
  {
    "id": "cubic-gate",
    "name": "Cubic Gate",
    "key": "magicItemName.cubic-gate"
  },
  {
    "id": "dagger-of-venom",
    "name": "Dagger of Venom",
    "key": "magicItemName.dagger-of-venom"
  },
  {
    "id": "dancing-sword",
    "name": "Dancing Sword",
    "key": "magicItemName.dancing-sword"
  },
  {
    "id": "decanter-of-endless-water",
    "name": "Decanter of Endless Water",
    "key": "magicItemName.decanter-of-endless-water"
  },
  {
    "id": "deck-of-illusions",
    "name": "Deck of Illusions",
    "key": "magicItemName.deck-of-illusions"
  },
  {
    "id": "deck-of-many-things",
    "name": "Deck of Many Things",
    "key": "magicItemName.deck-of-many-things"
  },
  {
    "id": "defender",
    "name": "Defender",
    "key": "magicItemName.defender"
  },
  {
    "id": "demon-armor",
    "name": "Demon Armor",
    "key": "magicItemName.demon-armor"
  },
  {
    "id": "dimensional-shackles",
    "name": "Dimensional Shackles",
    "key": "magicItemName.dimensional-shackles"
  },
  {
    "id": "dragon-scale-mail",
    "name": "Dragon Scale Mail",
    "key": "magicItemName.dragon-scale-mail"
  },
  {
    "id": "dragon-slayer",
    "name": "Dragon Slayer",
    "key": "magicItemName.dragon-slayer"
  },
  {
    "id": "dust-of-disappearance",
    "name": "Dust of Disappearance",
    "key": "magicItemName.dust-of-disappearance"
  },
  {
    "id": "dust-of-dryness",
    "name": "Dust of Dryness",
    "key": "magicItemName.dust-of-dryness"
  },
  {
    "id": "dust-of-sneezing-and-choking",
    "name": "Dust of Sneezing and Choking",
    "key": "magicItemName.dust-of-sneezing-and-choking"
  },
  {
    "id": "dwarven-plate",
    "name": "Dwarven Plate",
    "key": "magicItemName.dwarven-plate"
  },
  {
    "id": "dwarven-thrower",
    "name": "Dwarven Thrower",
    "key": "magicItemName.dwarven-thrower"
  },
  {
    "id": "efficient-quiver",
    "name": "Efficient Quiver",
    "key": "magicItemName.efficient-quiver"
  },
  {
    "id": "efreeti-bottle",
    "name": "Efreeti Bottle",
    "key": "magicItemName.efreeti-bottle"
  },
  {
    "id": "elemental-gem",
    "name": "Elemental Gem",
    "key": "magicItemName.elemental-gem"
  },
  {
    "id": "elven-chain",
    "name": "Elven Chain",
    "key": "magicItemName.elven-chain"
  },
  {
    "id": "eversmoking-bottle",
    "name": "Eversmoking Bottle",
    "key": "magicItemName.eversmoking-bottle"
  },
  {
    "id": "eyes-of-charming",
    "name": "Eyes of Charming",
    "key": "magicItemName.eyes-of-charming"
  },
  {
    "id": "eyes-of-minute-seeing",
    "name": "Eyes of Minute Seeing",
    "key": "magicItemName.eyes-of-minute-seeing"
  },
  {
    "id": "eyes-of-the-eagle",
    "name": "Eyes of the Eagle",
    "key": "magicItemName.eyes-of-the-eagle"
  },
  {
    "id": "feather-token",
    "name": "Feather Token",
    "key": "magicItemName.feather-token"
  },
  {
    "id": "figurine-of-wondrous-power",
    "name": "Figurine of Wondrous Power",
    "key": "magicItemName.figurine-of-wondrous-power"
  },
  {
    "id": "flame-tongue",
    "name": "Flame Tongue",
    "key": "magicItemName.flame-tongue"
  },
  {
    "id": "folding-boat",
    "name": "Folding Boat",
    "key": "magicItemName.folding-boat"
  },
  {
    "id": "frost-brand",
    "name": "Frost Brand",
    "key": "magicItemName.frost-brand"
  },
  {
    "id": "gauntlets-of-ogre-power",
    "name": "Gauntlets of Ogre Power",
    "key": "magicItemName.gauntlets-of-ogre-power"
  },
  {
    "id": "gem-of-brightness",
    "name": "Gem of Brightness",
    "key": "magicItemName.gem-of-brightness"
  },
  {
    "id": "gem-of-seeing",
    "name": "Gem of Seeing",
    "key": "magicItemName.gem-of-seeing"
  },
  {
    "id": "giant-slayer",
    "name": "Giant Slayer",
    "key": "magicItemName.giant-slayer"
  },
  {
    "id": "glamoured-studded-leather",
    "name": "Glamoured Studded Leather",
    "key": "magicItemName.glamoured-studded-leather"
  },
  {
    "id": "gloves-of-missile-snaring",
    "name": "Gloves of Missile Snaring",
    "key": "magicItemName.gloves-of-missile-snaring"
  },
  {
    "id": "gloves-of-swimming-and-climbing",
    "name": "Gloves of Swimming and Climbing",
    "key": "magicItemName.gloves-of-swimming-and-climbing"
  },
  {
    "id": "goggles-of-night",
    "name": "Goggles of Night",
    "key": "magicItemName.goggles-of-night"
  },
  {
    "id": "hammer-of-thunderbolts",
    "name": "Hammer of Thunderbolts",
    "key": "magicItemName.hammer-of-thunderbolts"
  },
  {
    "id": "handy-haversack",
    "name": "Handy Haversack",
    "key": "magicItemName.handy-haversack"
  },
  {
    "id": "hat-of-disguise",
    "name": "Hat of Disguise",
    "key": "magicItemName.hat-of-disguise"
  },
  {
    "id": "headband-of-intellect",
    "name": "Headband of Intellect",
    "key": "magicItemName.headband-of-intellect"
  },
  {
    "id": "helm-of-brilliance",
    "name": "Helm of Brilliance",
    "key": "magicItemName.helm-of-brilliance"
  },
  {
    "id": "helm-of-comprehending-languages",
    "name": "Helm of Comprehending Languages",
    "key": "magicItemName.helm-of-comprehending-languages"
  },
  {
    "id": "helm-of-telepathy",
    "name": "Helm of Telepathy",
    "key": "magicItemName.helm-of-telepathy"
  },
  {
    "id": "helm-of-teleportation",
    "name": "Helm of Teleportation",
    "key": "magicItemName.helm-of-teleportation"
  },
  {
    "id": "holy-avenger",
    "name": "Holy Avenger",
    "key": "magicItemName.holy-avenger"
  },
  {
    "id": "horn-of-blasting",
    "name": "Horn of Blasting",
    "key": "magicItemName.horn-of-blasting"
  },
  {
    "id": "horn-of-valhalla",
    "name": "Horn of Valhalla",
    "key": "magicItemName.horn-of-valhalla"
  },
  {
    "id": "horseshoes-of-a-zephyr",
    "name": "Horseshoes of a Zephyr",
    "key": "magicItemName.horseshoes-of-a-zephyr"
  },
  {
    "id": "horseshoes-of-speed",
    "name": "Horseshoes of Speed",
    "key": "magicItemName.horseshoes-of-speed"
  },
  {
    "id": "immovable-rod",
    "name": "Immovable Rod",
    "key": "magicItemName.immovable-rod"
  },
  {
    "id": "instant-fortress",
    "name": "Instant Fortress",
    "key": "magicItemName.instant-fortress"
  },
  {
    "id": "ioun-stone",
    "name": "Ioun Stone",
    "key": "magicItemName.ioun-stone"
  },
  {
    "id": "iron-bands-of-binding",
    "name": "Iron Bands of Binding",
    "key": "magicItemName.iron-bands-of-binding"
  },
  {
    "id": "iron-flask",
    "name": "Iron Flask",
    "key": "magicItemName.iron-flask"
  },
  {
    "id": "javelin-of-lightning",
    "name": "Javelin of Lightning",
    "key": "magicItemName.javelin-of-lightning"
  },
  {
    "id": "lantern-of-revealing",
    "name": "Lantern of Revealing",
    "key": "magicItemName.lantern-of-revealing"
  },
  {
    "id": "luck-blade",
    "name": "Luck Blade",
    "key": "magicItemName.luck-blade"
  },
  {
    "id": "mace-of-disruption",
    "name": "Mace of Disruption",
    "key": "magicItemName.mace-of-disruption"
  },
  {
    "id": "mace-of-smiting",
    "name": "Mace of Smiting",
    "key": "magicItemName.mace-of-smiting"
  },
  {
    "id": "mace-of-terror",
    "name": "Mace of Terror",
    "key": "magicItemName.mace-of-terror"
  },
  {
    "id": "mantle-of-spell-resistance",
    "name": "Mantle of Spell Resistance",
    "key": "magicItemName.mantle-of-spell-resistance"
  },
  {
    "id": "manual-of-bodily-health",
    "name": "Manual of Bodily Health",
    "key": "magicItemName.manual-of-bodily-health"
  },
  {
    "id": "manual-of-gainful-exercise",
    "name": "Manual of Gainful Exercise",
    "key": "magicItemName.manual-of-gainful-exercise"
  },
  {
    "id": "manual-of-golems",
    "name": "Manual of Golems",
    "key": "magicItemName.manual-of-golems"
  },
  {
    "id": "manual-of-quickness-of-action",
    "name": "Manual of Quickness of Action",
    "key": "magicItemName.manual-of-quickness-of-action"
  },
  {
    "id": "marvelous-pigments",
    "name": "Marvelous Pigments",
    "key": "magicItemName.marvelous-pigments"
  },
  {
    "id": "medallion-of-thoughts",
    "name": "Medallion of Thoughts",
    "key": "magicItemName.medallion-of-thoughts"
  },
  {
    "id": "mirror-of-life-trapping",
    "name": "Mirror of Life Trapping",
    "key": "magicItemName.mirror-of-life-trapping"
  },
  {
    "id": "mithral-armor",
    "name": "Mithral Armor",
    "key": "magicItemName.mithral-armor"
  },
  {
    "id": "necklace-of-adaptation",
    "name": "Necklace of Adaptation",
    "key": "magicItemName.necklace-of-adaptation"
  },
  {
    "id": "necklace-of-fireballs",
    "name": "Necklace of Fireballs",
    "key": "magicItemName.necklace-of-fireballs"
  },
  {
    "id": "necklace-of-prayer-beads",
    "name": "Necklace of Prayer Beads",
    "key": "magicItemName.necklace-of-prayer-beads"
  },
  {
    "id": "nine-lives-stealer",
    "name": "Nine Lives Stealer",
    "key": "magicItemName.nine-lives-stealer"
  },
  {
    "id": "oathbow",
    "name": "Oathbow",
    "key": "magicItemName.oathbow"
  },
  {
    "id": "oil-of-etherealness",
    "name": "Oil of Etherealness",
    "key": "magicItemName.oil-of-etherealness"
  },
  {
    "id": "oil-of-sharpness",
    "name": "Oil of Sharpness",
    "key": "magicItemName.oil-of-sharpness"
  },
  {
    "id": "oil-of-slipperiness",
    "name": "Oil of Slipperiness",
    "key": "magicItemName.oil-of-slipperiness"
  },
  {
    "id": "pearl-of-power",
    "name": "Pearl of Power",
    "key": "magicItemName.pearl-of-power"
  },
  {
    "id": "periapt-of-health",
    "name": "Periapt of Health",
    "key": "magicItemName.periapt-of-health"
  },
  {
    "id": "periapt-of-proof-against-poison",
    "name": "Periapt of Proof against Poison",
    "key": "magicItemName.periapt-of-proof-against-poison"
  },
  {
    "id": "periapt-of-wound-closure",
    "name": "Periapt of Wound Closure",
    "key": "magicItemName.periapt-of-wound-closure"
  },
  {
    "id": "philter-of-love",
    "name": "Philter of Love",
    "key": "magicItemName.philter-of-love"
  },
  {
    "id": "pipes-of-haunting",
    "name": "Pipes of Haunting",
    "key": "magicItemName.pipes-of-haunting"
  },
  {
    "id": "pipes-of-the-sewers",
    "name": "Pipes of the Sewers",
    "key": "magicItemName.pipes-of-the-sewers"
  },
  {
    "id": "plate-armor-of-etherealness",
    "name": "Plate Armor of Etherealness",
    "key": "magicItemName.plate-armor-of-etherealness"
  },
  {
    "id": "portable-hole",
    "name": "Portable Hole",
    "key": "magicItemName.portable-hole"
  },
  {
    "id": "potion-of-animal-friendship",
    "name": "Potion of Animal Friendship",
    "key": "magicItemName.potion-of-animal-friendship"
  },
  {
    "id": "potion-of-clairvoyance",
    "name": "Potion of Clairvoyance",
    "key": "magicItemName.potion-of-clairvoyance"
  },
  {
    "id": "potion-of-climbing",
    "name": "Potion of Climbing",
    "key": "magicItemName.potion-of-climbing"
  },
  {
    "id": "potion-of-diminution",
    "name": "Potion of Diminution",
    "key": "magicItemName.potion-of-diminution"
  },
  {
    "id": "potion-of-flying",
    "name": "Potion of Flying",
    "key": "magicItemName.potion-of-flying"
  },
  {
    "id": "potion-of-gaseous-form",
    "name": "Potion of Gaseous Form",
    "key": "magicItemName.potion-of-gaseous-form"
  },
  {
    "id": "potion-of-giant-strength",
    "name": "Potion of Giant Strength",
    "key": "magicItemName.potion-of-giant-strength"
  },
  {
    "id": "potion-of-growth",
    "name": "Potion of Growth",
    "key": "magicItemName.potion-of-growth"
  },
  {
    "id": "potion-of-healing",
    "name": "Potion of Healing",
    "key": "magicItemName.potion-of-healing"
  },
  {
    "id": "potion-of-heroism",
    "name": "Potion of Heroism",
    "key": "magicItemName.potion-of-heroism"
  },
  {
    "id": "potion-of-invisibility",
    "name": "Potion of Invisibility",
    "key": "magicItemName.potion-of-invisibility"
  },
  {
    "id": "potion-of-mind-reading",
    "name": "Potion of Mind Reading",
    "key": "magicItemName.potion-of-mind-reading"
  },
  {
    "id": "potion-of-poison",
    "name": "Potion of Poison",
    "key": "magicItemName.potion-of-poison"
  },
  {
    "id": "potion-of-resistance",
    "name": "Potion of Resistance",
    "key": "magicItemName.potion-of-resistance"
  },
  {
    "id": "potion-of-speed",
    "name": "Potion of Speed",
    "key": "magicItemName.potion-of-speed"
  },
  {
    "id": "potion-of-water-breathing",
    "name": "Potion of Water Breathing",
    "key": "magicItemName.potion-of-water-breathing"
  },
  {
    "id": "restorative-ointment",
    "name": "Restorative Ointment",
    "key": "magicItemName.restorative-ointment"
  },
  {
    "id": "ring-of-animal-influence",
    "name": "Ring of Animal Influence",
    "key": "magicItemName.ring-of-animal-influence"
  },
  {
    "id": "ring-of-djinni-summoning",
    "name": "Ring of Djinni Summoning",
    "key": "magicItemName.ring-of-djinni-summoning"
  },
  {
    "id": "ring-of-elemental-command",
    "name": "Ring of Elemental Command",
    "key": "magicItemName.ring-of-elemental-command"
  },
  {
    "id": "ring-of-evasion",
    "name": "Ring of Evasion",
    "key": "magicItemName.ring-of-evasion"
  },
  {
    "id": "ring-of-feather-falling",
    "name": "Ring of Feather Falling",
    "key": "magicItemName.ring-of-feather-falling"
  },
  {
    "id": "ring-of-free-action",
    "name": "Ring of Free Action",
    "key": "magicItemName.ring-of-free-action"
  },
  {
    "id": "ring-of-invisibility",
    "name": "Ring of Invisibility",
    "key": "magicItemName.ring-of-invisibility"
  },
  {
    "id": "ring-of-jumping",
    "name": "Ring of Jumping",
    "key": "magicItemName.ring-of-jumping"
  },
  {
    "id": "ring-of-mind-shielding",
    "name": "Ring of Mind Shielding",
    "key": "magicItemName.ring-of-mind-shielding"
  },
  {
    "id": "ring-of-protection",
    "name": "Ring of Protection",
    "key": "magicItemName.ring-of-protection"
  },
  {
    "id": "ring-of-regeneration",
    "name": "Ring of Regeneration",
    "key": "magicItemName.ring-of-regeneration"
  },
  {
    "id": "ring-of-resistance",
    "name": "Ring of Resistance",
    "key": "magicItemName.ring-of-resistance"
  },
  {
    "id": "ring-of-shooting-stars",
    "name": "Ring of Shooting Stars",
    "key": "magicItemName.ring-of-shooting-stars"
  },
  {
    "id": "ring-of-spell-storing",
    "name": "Ring of Spell Storing",
    "key": "magicItemName.ring-of-spell-storing"
  },
  {
    "id": "ring-of-spell-turning",
    "name": "Ring of Spell Turning",
    "key": "magicItemName.ring-of-spell-turning"
  },
  {
    "id": "ring-of-swimming",
    "name": "Ring of Swimming",
    "key": "magicItemName.ring-of-swimming"
  },
  {
    "id": "ring-of-telekinesis",
    "name": "Ring of Telekinesis",
    "key": "magicItemName.ring-of-telekinesis"
  },
  {
    "id": "ring-of-the-ram",
    "name": "Ring of the Ram",
    "key": "magicItemName.ring-of-the-ram"
  },
  {
    "id": "ring-of-three-wishes",
    "name": "Ring of Three Wishes",
    "key": "magicItemName.ring-of-three-wishes"
  },
  {
    "id": "ring-of-warmth",
    "name": "Ring of Warmth",
    "key": "magicItemName.ring-of-warmth"
  },
  {
    "id": "ring-of-water-walking",
    "name": "Ring of Water Walking",
    "key": "magicItemName.ring-of-water-walking"
  },
  {
    "id": "ring-of-x-ray-vision",
    "name": "Ring of X-ray Vision",
    "key": "magicItemName.ring-of-x-ray-vision"
  },
  {
    "id": "robe-of-eyes",
    "name": "Robe of Eyes",
    "key": "magicItemName.robe-of-eyes"
  },
  {
    "id": "robe-of-scintillating-colors",
    "name": "Robe of Scintillating Colors",
    "key": "magicItemName.robe-of-scintillating-colors"
  },
  {
    "id": "robe-of-stars",
    "name": "Robe of Stars",
    "key": "magicItemName.robe-of-stars"
  },
  {
    "id": "robe-of-the-archmagi",
    "name": "Robe of the Archmagi",
    "key": "magicItemName.robe-of-the-archmagi"
  },
  {
    "id": "robe-of-useful-items",
    "name": "Robe of Useful Items",
    "key": "magicItemName.robe-of-useful-items"
  },
  {
    "id": "rod-of-absorption",
    "name": "Rod of Absorption",
    "key": "magicItemName.rod-of-absorption"
  },
  {
    "id": "rod-of-alertness",
    "name": "Rod of Alertness",
    "key": "magicItemName.rod-of-alertness"
  },
  {
    "id": "rod-of-lordly-might",
    "name": "Rod of Lordly Might",
    "key": "magicItemName.rod-of-lordly-might"
  },
  {
    "id": "rod-of-rulership",
    "name": "Rod of Rulership",
    "key": "magicItemName.rod-of-rulership"
  },
  {
    "id": "rod-of-security",
    "name": "Rod of Security",
    "key": "magicItemName.rod-of-security"
  },
  {
    "id": "rope-of-climbing",
    "name": "Rope of Climbing",
    "key": "magicItemName.rope-of-climbing"
  },
  {
    "id": "rope-of-entanglement",
    "name": "Rope of Entanglement",
    "key": "magicItemName.rope-of-entanglement"
  },
  {
    "id": "scarab-of-protection",
    "name": "Scarab of Protection",
    "key": "magicItemName.scarab-of-protection"
  },
  {
    "id": "scimitar-of-speed",
    "name": "Scimitar of Speed",
    "key": "magicItemName.scimitar-of-speed"
  },
  {
    "id": "shield-of-missile-attraction",
    "name": "Shield of Missile Attraction",
    "key": "magicItemName.shield-of-missile-attraction"
  },
  {
    "id": "shield-1-2-or-3",
    "name": "Shield, +1, +2, or +3",
    "key": "magicItemName.shield-1-2-or-3"
  },
  {
    "id": "slippers-of-spider-climbing",
    "name": "Slippers of Spider Climbing",
    "key": "magicItemName.slippers-of-spider-climbing"
  },
  {
    "id": "sovereign-glue",
    "name": "Sovereign Glue",
    "key": "magicItemName.sovereign-glue"
  },
  {
    "id": "spell-scroll",
    "name": "Spell Scroll",
    "key": "magicItemName.spell-scroll"
  },
  {
    "id": "spellguard-shield",
    "name": "Spellguard Shield",
    "key": "magicItemName.spellguard-shield"
  },
  {
    "id": "sphere-of-annihilation",
    "name": "Sphere of Annihilation",
    "key": "magicItemName.sphere-of-annihilation"
  },
  {
    "id": "staff-of-charming",
    "name": "Staff of Charming",
    "key": "magicItemName.staff-of-charming"
  },
  {
    "id": "staff-of-fire",
    "name": "Staff of Fire",
    "key": "magicItemName.staff-of-fire"
  },
  {
    "id": "staff-of-frost",
    "name": "Staff of Frost",
    "key": "magicItemName.staff-of-frost"
  },
  {
    "id": "staff-of-healing",
    "name": "Staff of Healing",
    "key": "magicItemName.staff-of-healing"
  },
  {
    "id": "staff-of-power",
    "name": "Staff of Power",
    "key": "magicItemName.staff-of-power"
  },
  {
    "id": "staff-of-striking",
    "name": "Staff of Striking",
    "key": "magicItemName.staff-of-striking"
  },
  {
    "id": "staff-of-swarming-insects",
    "name": "Staff of Swarming Insects",
    "key": "magicItemName.staff-of-swarming-insects"
  },
  {
    "id": "staff-of-the-magi",
    "name": "Staff of the Magi",
    "key": "magicItemName.staff-of-the-magi"
  },
  {
    "id": "staff-of-the-python",
    "name": "Staff of the Python",
    "key": "magicItemName.staff-of-the-python"
  },
  {
    "id": "staff-of-the-woodlands",
    "name": "Staff of the Woodlands",
    "key": "magicItemName.staff-of-the-woodlands"
  },
  {
    "id": "staff-of-thunder-and-lightning",
    "name": "Staff of Thunder and Lightning",
    "key": "magicItemName.staff-of-thunder-and-lightning"
  },
  {
    "id": "staff-of-withering",
    "name": "Staff of Withering",
    "key": "magicItemName.staff-of-withering"
  },
  {
    "id": "stone-of-controlling-earth-elementals",
    "name": "Stone of Controlling Earth Elementals",
    "key": "magicItemName.stone-of-controlling-earth-elementals"
  },
  {
    "id": "stone-of-good-luck-luckstone",
    "name": "Stone of Good Luck (Luckstone)",
    "key": "magicItemName.stone-of-good-luck-luckstone"
  },
  {
    "id": "sun-blade",
    "name": "Sun Blade",
    "key": "magicItemName.sun-blade"
  },
  {
    "id": "sword-of-life-stealing",
    "name": "Sword of Life Stealing",
    "key": "magicItemName.sword-of-life-stealing"
  },
  {
    "id": "sword-of-sharpness",
    "name": "Sword of Sharpness",
    "key": "magicItemName.sword-of-sharpness"
  },
  {
    "id": "sword-of-wounding",
    "name": "Sword of Wounding",
    "key": "magicItemName.sword-of-wounding"
  },
  {
    "id": "talisman-of-pure-good",
    "name": "Talisman of Pure Good",
    "key": "magicItemName.talisman-of-pure-good"
  },
  {
    "id": "talisman-of-the-sphere",
    "name": "Talisman of the Sphere",
    "key": "magicItemName.talisman-of-the-sphere"
  },
  {
    "id": "talisman-of-ultimate-evil",
    "name": "Talisman of Ultimate Evil",
    "key": "magicItemName.talisman-of-ultimate-evil"
  },
  {
    "id": "tome-of-clear-thought",
    "name": "Tome of Clear Thought",
    "key": "magicItemName.tome-of-clear-thought"
  },
  {
    "id": "tome-of-leadership-and-influence",
    "name": "Tome of Leadership and Influence",
    "key": "magicItemName.tome-of-leadership-and-influence"
  },
  {
    "id": "tome-of-understanding",
    "name": "Tome of Understanding",
    "key": "magicItemName.tome-of-understanding"
  },
  {
    "id": "trident-of-fish-command",
    "name": "Trident of Fish Command",
    "key": "magicItemName.trident-of-fish-command"
  },
  {
    "id": "universal-solvent",
    "name": "Universal Solvent",
    "key": "magicItemName.universal-solvent"
  },
  {
    "id": "vicious-weapon",
    "name": "Vicious Weapon",
    "key": "magicItemName.vicious-weapon"
  },
  {
    "id": "vorpal-sword",
    "name": "Vorpal Sword",
    "key": "magicItemName.vorpal-sword"
  },
  {
    "id": "wand-of-binding",
    "name": "Wand of Binding",
    "key": "magicItemName.wand-of-binding"
  },
  {
    "id": "wand-of-enemy-detection",
    "name": "Wand of Enemy Detection",
    "key": "magicItemName.wand-of-enemy-detection"
  },
  {
    "id": "wand-of-fear",
    "name": "Wand of Fear",
    "key": "magicItemName.wand-of-fear"
  },
  {
    "id": "wand-of-fireballs",
    "name": "Wand of Fireballs",
    "key": "magicItemName.wand-of-fireballs"
  },
  {
    "id": "wand-of-lightning-bolts",
    "name": "Wand of Lightning Bolts",
    "key": "magicItemName.wand-of-lightning-bolts"
  },
  {
    "id": "wand-of-magic-detection",
    "name": "Wand of Magic Detection",
    "key": "magicItemName.wand-of-magic-detection"
  },
  {
    "id": "wand-of-magic-missiles",
    "name": "Wand of Magic Missiles",
    "key": "magicItemName.wand-of-magic-missiles"
  },
  {
    "id": "wand-of-paralysis",
    "name": "Wand of Paralysis",
    "key": "magicItemName.wand-of-paralysis"
  },
  {
    "id": "wand-of-polymorph",
    "name": "Wand of Polymorph",
    "key": "magicItemName.wand-of-polymorph"
  },
  {
    "id": "wand-of-secrets",
    "name": "Wand of Secrets",
    "key": "magicItemName.wand-of-secrets"
  },
  {
    "id": "wand-of-the-war-mage-1-2-or-3",
    "name": "Wand of the War Mage, +1, +2, or +3",
    "key": "magicItemName.wand-of-the-war-mage-1-2-or-3"
  },
  {
    "id": "wand-of-web",
    "name": "Wand of Web",
    "key": "magicItemName.wand-of-web"
  },
  {
    "id": "wand-of-wonder",
    "name": "Wand of Wonder",
    "key": "magicItemName.wand-of-wonder"
  },
  {
    "id": "weapon-1-2-or-3",
    "name": "Weapon, +1, +2, or +3",
    "key": "magicItemName.weapon-1-2-or-3"
  },
  {
    "id": "well-of-many-worlds",
    "name": "Well of Many Worlds",
    "key": "magicItemName.well-of-many-worlds"
  },
  {
    "id": "wind-fan",
    "name": "Wind Fan",
    "key": "magicItemName.wind-fan"
  },
  {
    "id": "winged-boots",
    "name": "Winged Boots",
    "key": "magicItemName.winged-boots"
  },
  {
    "id": "wings-of-flying",
    "name": "Wings of Flying",
    "key": "magicItemName.wings-of-flying"
  },
  {
    "id": "variant-armor-of-acid-resistance",
    "name": "Armor of Acid Resistance",
    "key": "magicItemName.variant-armor-of-acid-resistance"
  },
  {
    "id": "variant-armor-of-cold-resistance",
    "name": "Armor of Cold Resistance",
    "key": "magicItemName.variant-armor-of-cold-resistance"
  },
  {
    "id": "variant-armor-of-fire-resistance",
    "name": "Armor of Fire Resistance",
    "key": "magicItemName.variant-armor-of-fire-resistance"
  },
  {
    "id": "variant-armor-of-force-resistance",
    "name": "Armor of Force Resistance",
    "key": "magicItemName.variant-armor-of-force-resistance"
  },
  {
    "id": "variant-armor-of-lightning-resistance",
    "name": "Armor of Lightning Resistance",
    "key": "magicItemName.variant-armor-of-lightning-resistance"
  },
  {
    "id": "variant-armor-of-necrotic-resistance",
    "name": "Armor of Necrotic Resistance",
    "key": "magicItemName.variant-armor-of-necrotic-resistance"
  },
  {
    "id": "variant-armor-of-poison-resistance",
    "name": "Armor of Poison Resistance",
    "key": "magicItemName.variant-armor-of-poison-resistance"
  },
  {
    "id": "variant-armor-of-psychic-resistance",
    "name": "Armor of Psychic Resistance",
    "key": "magicItemName.variant-armor-of-psychic-resistance"
  },
  {
    "id": "variant-armor-of-radiant-resistance",
    "name": "Armor of Radiant Resistance",
    "key": "magicItemName.variant-armor-of-radiant-resistance"
  },
  {
    "id": "variant-armor-of-thunder-resistance",
    "name": "Armor of Thunder Resistance",
    "key": "magicItemName.variant-armor-of-thunder-resistance"
  },
  {
    "id": "variant-belt-of-cloud-giant-strength",
    "name": "Belt of Cloud Giant Strength",
    "key": "magicItemName.variant-belt-of-cloud-giant-strength"
  },
  {
    "id": "variant-belt-of-fire-giant-strength",
    "name": "Belt of Fire Giant Strength",
    "key": "magicItemName.variant-belt-of-fire-giant-strength"
  },
  {
    "id": "variant-belt-of-frost-giant-strength",
    "name": "Belt of Frost Giant Strength",
    "key": "magicItemName.variant-belt-of-frost-giant-strength"
  },
  {
    "id": "variant-belt-of-hill-giant-strength",
    "name": "Belt of Hill Giant Strength",
    "key": "magicItemName.variant-belt-of-hill-giant-strength"
  },
  {
    "id": "variant-belt-of-stone-giant-strength",
    "name": "Belt of Stone Giant Strength",
    "key": "magicItemName.variant-belt-of-stone-giant-strength"
  },
  {
    "id": "variant-belt-of-storm-giant-strength",
    "name": "Belt of Storm Giant Strength",
    "key": "magicItemName.variant-belt-of-storm-giant-strength"
  },
  {
    "id": "variant-black-dragon-scale-mail",
    "name": "Black Dragon Scale Mail",
    "key": "magicItemName.variant-black-dragon-scale-mail"
  },
  {
    "id": "variant-blue-dragon-scale-mail",
    "name": "Blue Dragon Scale Mail",
    "key": "magicItemName.variant-blue-dragon-scale-mail"
  },
  {
    "id": "variant-brass-dragon-scale-mail",
    "name": "Brass Dragon Scale Mail",
    "key": "magicItemName.variant-brass-dragon-scale-mail"
  },
  {
    "id": "variant-bronze-dragon-scale-mail",
    "name": "Bronze Dragon Scale Mail",
    "key": "magicItemName.variant-bronze-dragon-scale-mail"
  },
  {
    "id": "variant-copper-dragon-scale-mail",
    "name": "Copper Dragon Scale Mail",
    "key": "magicItemName.variant-copper-dragon-scale-mail"
  },
  {
    "id": "variant-gold-dragon-scale-mail",
    "name": "Gold Dragon Scale Mail",
    "key": "magicItemName.variant-gold-dragon-scale-mail"
  },
  {
    "id": "variant-green-dragon-scale-mail",
    "name": "Green Dragon Scale Mail",
    "key": "magicItemName.variant-green-dragon-scale-mail"
  },
  {
    "id": "variant-ioun-stone-of-protection",
    "name": "Ioun Stone of Protection",
    "key": "magicItemName.variant-ioun-stone-of-protection"
  },
  {
    "id": "variant-red-dragon-scale-mail",
    "name": "Red Dragon Scale Mail",
    "key": "magicItemName.variant-red-dragon-scale-mail"
  },
  {
    "id": "variant-ring-of-acid-resistance",
    "name": "Ring of Acid Resistance",
    "key": "magicItemName.variant-ring-of-acid-resistance"
  },
  {
    "id": "variant-ring-of-cold-resistance",
    "name": "Ring of Cold Resistance",
    "key": "magicItemName.variant-ring-of-cold-resistance"
  },
  {
    "id": "variant-ring-of-fire-resistance",
    "name": "Ring of Fire Resistance",
    "key": "magicItemName.variant-ring-of-fire-resistance"
  },
  {
    "id": "variant-ring-of-force-resistance",
    "name": "Ring of Force Resistance",
    "key": "magicItemName.variant-ring-of-force-resistance"
  },
  {
    "id": "variant-ring-of-lightning-resistance",
    "name": "Ring of Lightning Resistance",
    "key": "magicItemName.variant-ring-of-lightning-resistance"
  },
  {
    "id": "variant-ring-of-necrotic-resistance",
    "name": "Ring of Necrotic Resistance",
    "key": "magicItemName.variant-ring-of-necrotic-resistance"
  },
  {
    "id": "variant-ring-of-poison-resistance",
    "name": "Ring of Poison Resistance",
    "key": "magicItemName.variant-ring-of-poison-resistance"
  },
  {
    "id": "variant-ring-of-psychic-resistance",
    "name": "Ring of Psychic Resistance",
    "key": "magicItemName.variant-ring-of-psychic-resistance"
  },
  {
    "id": "variant-ring-of-radiant-resistance",
    "name": "Ring of Radiant Resistance",
    "key": "magicItemName.variant-ring-of-radiant-resistance"
  },
  {
    "id": "variant-ring-of-thunder-resistance",
    "name": "Ring of Thunder Resistance",
    "key": "magicItemName.variant-ring-of-thunder-resistance"
  },
  {
    "id": "variant-silver-dragon-scale-mail",
    "name": "Silver Dragon Scale Mail",
    "key": "magicItemName.variant-silver-dragon-scale-mail"
  },
  {
    "id": "variant-white-dragon-scale-mail",
    "name": "White Dragon Scale Mail",
    "key": "magicItemName.variant-white-dragon-scale-mail"
  },
  {
    "id": "wand-of-the-war-mage-1",
    "name": "Wand of the War Mage +1",
    "key": "magicItemName.wand-of-the-war-mage-1",
    "aliases": [
      "Wand of the War Mage, +1"
    ]
  },
  {
    "id": "wand-of-the-war-mage-2",
    "name": "Wand of the War Mage +2",
    "key": "magicItemName.wand-of-the-war-mage-2",
    "aliases": [
      "Wand of the War Mage, +2"
    ]
  },
  {
    "id": "wand-of-the-war-mage-3",
    "name": "Wand of the War Mage +3",
    "key": "magicItemName.wand-of-the-war-mage-3",
    "aliases": [
      "Wand of the War Mage, +3"
    ]
  },
  {
    "id": "armor-1",
    "name": "Armor +1",
    "key": "magicItemName.armor-1",
    "aliases": [
      "Armor, +1"
    ]
  },
  {
    "id": "armor-2",
    "name": "Armor +2",
    "key": "magicItemName.armor-2",
    "aliases": [
      "Armor, +2"
    ]
  },
  {
    "id": "armor-3",
    "name": "Armor +3",
    "key": "magicItemName.armor-3",
    "aliases": [
      "Armor, +3"
    ]
  },
  {
    "id": "shield-1",
    "name": "Shield +1",
    "key": "magicItemName.shield-1",
    "aliases": [
      "Shield, +1"
    ]
  },
  {
    "id": "shield-2",
    "name": "Shield +2",
    "key": "magicItemName.shield-2",
    "aliases": [
      "Shield, +2"
    ]
  },
  {
    "id": "shield-3",
    "name": "Shield +3",
    "key": "magicItemName.shield-3",
    "aliases": [
      "Shield, +3"
    ]
  },
  {
    "id": "weapon-1",
    "name": "Weapon +1",
    "key": "magicItemName.weapon-1",
    "aliases": [
      "Weapon, +1"
    ]
  },
  {
    "id": "weapon-2",
    "name": "Weapon +2",
    "key": "magicItemName.weapon-2",
    "aliases": [
      "Weapon, +2"
    ]
  },
  {
    "id": "weapon-3",
    "name": "Weapon +3",
    "key": "magicItemName.weapon-3",
    "aliases": [
      "Weapon, +3"
    ]
  },
  {
    "id": "ammunition-1",
    "name": "Ammunition +1",
    "key": "magicItemName.ammunition-1",
    "aliases": [
      "Ammunition, +1"
    ]
  },
  {
    "id": "ammunition-2",
    "name": "Ammunition +2",
    "key": "magicItemName.ammunition-2",
    "aliases": [
      "Ammunition, +2"
    ]
  },
  {
    "id": "ammunition-3",
    "name": "Ammunition +3",
    "key": "magicItemName.ammunition-3",
    "aliases": [
      "Ammunition, +3"
    ]
  }
] as const;

export const MAGIC_ITEM_NAME_MESSAGES = /*#__PURE__*/ defineMessages({
  "magicItemName.adamantine-armor": {
    "en": "Adamantine Armor",
    "zh-CN": "精金护甲"
  },
  "magicItemName.ammunition-1-2-or-3": {
    "en": "Ammunition, +1, +2, or +3",
    "zh-CN": "弹药（+1、+2 或 +3）"
  },
  "magicItemName.amulet-of-health": {
    "en": "Amulet of Health",
    "zh-CN": "健康护符"
  },
  "magicItemName.amulet-of-proof-against-detection-and-location": {
    "en": "Amulet of Proof Against Detection and Location",
    "zh-CN": "防侦测定位护符"
  },
  "magicItemName.amulet-of-the-planes": {
    "en": "Amulet of the Planes",
    "zh-CN": "位面护符"
  },
  "magicItemName.animated-shield": {
    "en": "Animated Shield",
    "zh-CN": "活化盾"
  },
  "magicItemName.apparatus-of-the-crab": {
    "en": "Apparatus of the Crab",
    "zh-CN": "机械蟹装置"
  },
  "magicItemName.armor-of-invulnerability": {
    "en": "Armor of Invulnerability",
    "zh-CN": "无敌护甲"
  },
  "magicItemName.armor-of-resistance": {
    "en": "Armor of Resistance",
    "zh-CN": "抗性护甲"
  },
  "magicItemName.armor-of-vulnerability": {
    "en": "Armor of Vulnerability",
    "zh-CN": "易伤护甲"
  },
  "magicItemName.armor-1-2-or-3": {
    "en": "Armor, +1, +2, or +3",
    "zh-CN": "护甲（+1、+2 或 +3）"
  },
  "magicItemName.arrow-of-slaying": {
    "en": "Arrow of Slaying",
    "zh-CN": "杀戮箭"
  },
  "magicItemName.arrow-catching-shield": {
    "en": "Arrow-Catching Shield",
    "zh-CN": "捕箭盾"
  },
  "magicItemName.bag-of-beans": {
    "en": "Bag of Beans",
    "zh-CN": "魔豆袋"
  },
  "magicItemName.bag-of-devouring": {
    "en": "Bag of Devouring",
    "zh-CN": "吞噬袋"
  },
  "magicItemName.bag-of-holding": {
    "en": "Bag of Holding",
    "zh-CN": "容纳袋"
  },
  "magicItemName.bag-of-tricks": {
    "en": "Bag of Tricks",
    "zh-CN": "戏法袋"
  },
  "magicItemName.bead-of-force": {
    "en": "Bead of Force",
    "zh-CN": "力场珠"
  },
  "magicItemName.belt-of-dwarvenkind": {
    "en": "Belt of Dwarvenkind",
    "zh-CN": "矮人族腰带"
  },
  "magicItemName.belt-of-giant-strength": {
    "en": "Belt of Giant Strength",
    "zh-CN": "巨人力量腰带"
  },
  "magicItemName.berserker-axe": {
    "en": "Berserker Axe",
    "zh-CN": "狂战士斧"
  },
  "magicItemName.boots-of-elvenkind": {
    "en": "Boots of Elvenkind",
    "zh-CN": "精灵靴"
  },
  "magicItemName.boots-of-levitation": {
    "en": "Boots of Levitation",
    "zh-CN": "浮空靴"
  },
  "magicItemName.boots-of-speed": {
    "en": "Boots of Speed",
    "zh-CN": "速度靴"
  },
  "magicItemName.boots-of-striding-and-springing": {
    "en": "Boots of Striding and Springing",
    "zh-CN": "健步跳跃靴"
  },
  "magicItemName.boots-of-the-winterlands": {
    "en": "Boots of the Winterlands",
    "zh-CN": "冬境之靴"
  },
  "magicItemName.bowl-of-commanding-water-elementals": {
    "en": "Bowl of Commanding Water Elementals",
    "zh-CN": "水元素统御碗"
  },
  "magicItemName.bracers-of-archery": {
    "en": "Bracers of Archery",
    "zh-CN": "箭术护腕"
  },
  "magicItemName.bracers-of-defense": {
    "en": "Bracers of Defense",
    "zh-CN": "防御护腕"
  },
  "magicItemName.brazier-of-commanding-fire-elementals": {
    "en": "Brazier of Commanding Fire Elementals",
    "zh-CN": "火元素统御火盆"
  },
  "magicItemName.brooch-of-shielding": {
    "en": "Brooch of Shielding",
    "zh-CN": "护盾胸针"
  },
  "magicItemName.broom-of-flying": {
    "en": "Broom of Flying",
    "zh-CN": "飞行扫帚"
  },
  "magicItemName.candle-of-invocation": {
    "en": "Candle of Invocation",
    "zh-CN": "祈唤蜡烛"
  },
  "magicItemName.cape-of-the-mountebank": {
    "en": "Cape of the Mountebank",
    "zh-CN": "戏法师斗篷"
  },
  "magicItemName.carpet-of-flying": {
    "en": "Carpet of Flying",
    "zh-CN": "飞毯"
  },
  "magicItemName.censer-of-controlling-air-elementals": {
    "en": "Censer of Controlling Air Elementals",
    "zh-CN": "气元素统御香炉"
  },
  "magicItemName.chime-of-opening": {
    "en": "Chime of Opening",
    "zh-CN": "开锁钟铃"
  },
  "magicItemName.circlet-of-blasting": {
    "en": "Circlet of Blasting",
    "zh-CN": "轰击头环"
  },
  "magicItemName.cloak-of-arachnida": {
    "en": "Cloak of Arachnida",
    "zh-CN": "蛛形披风"
  },
  "magicItemName.cloak-of-displacement": {
    "en": "Cloak of Displacement",
    "zh-CN": "移位披风"
  },
  "magicItemName.cloak-of-elvenkind": {
    "en": "Cloak of Elvenkind",
    "zh-CN": "精灵披风"
  },
  "magicItemName.cloak-of-protection": {
    "en": "Cloak of Protection",
    "zh-CN": "防护披风"
  },
  "magicItemName.cloak-of-the-bat": {
    "en": "Cloak of the Bat",
    "zh-CN": "蝙蝠披风"
  },
  "magicItemName.cloak-of-the-manta-ray": {
    "en": "Cloak of the Manta Ray",
    "zh-CN": "蝠鲼披风"
  },
  "magicItemName.crystal-ball": {
    "en": "Crystal Ball",
    "zh-CN": "水晶球"
  },
  "magicItemName.cube-of-force": {
    "en": "Cube of Force",
    "zh-CN": "力场方块"
  },
  "magicItemName.cubic-gate": {
    "en": "Cubic Gate",
    "zh-CN": "位面门方块"
  },
  "magicItemName.dagger-of-venom": {
    "en": "Dagger of Venom",
    "zh-CN": "毒液匕首"
  },
  "magicItemName.dancing-sword": {
    "en": "Dancing Sword",
    "zh-CN": "舞空剑"
  },
  "magicItemName.decanter-of-endless-water": {
    "en": "Decanter of Endless Water",
    "zh-CN": "无尽水瓶"
  },
  "magicItemName.deck-of-illusions": {
    "en": "Deck of Illusions",
    "zh-CN": "幻象牌组"
  },
  "magicItemName.deck-of-many-things": {
    "en": "Deck of Many Things",
    "zh-CN": "万象无常牌"
  },
  "magicItemName.defender": {
    "en": "Defender",
    "zh-CN": "守护之剑"
  },
  "magicItemName.demon-armor": {
    "en": "Demon Armor",
    "zh-CN": "恶魔护甲"
  },
  "magicItemName.dimensional-shackles": {
    "en": "Dimensional Shackles",
    "zh-CN": "次元镣铐"
  },
  "magicItemName.dragon-scale-mail": {
    "en": "Dragon Scale Mail",
    "zh-CN": "龙鳞甲"
  },
  "magicItemName.dragon-slayer": {
    "en": "Dragon Slayer",
    "zh-CN": "屠龙剑"
  },
  "magicItemName.dust-of-disappearance": {
    "en": "Dust of Disappearance",
    "zh-CN": "消失尘"
  },
  "magicItemName.dust-of-dryness": {
    "en": "Dust of Dryness",
    "zh-CN": "干燥尘"
  },
  "magicItemName.dust-of-sneezing-and-choking": {
    "en": "Dust of Sneezing and Choking",
    "zh-CN": "喷嚏窒息尘"
  },
  "magicItemName.dwarven-plate": {
    "en": "Dwarven Plate",
    "zh-CN": "矮人板甲"
  },
  "magicItemName.dwarven-thrower": {
    "en": "Dwarven Thrower",
    "zh-CN": "矮人飞锤"
  },
  "magicItemName.efficient-quiver": {
    "en": "Efficient Quiver",
    "zh-CN": "便捷箭袋"
  },
  "magicItemName.efreeti-bottle": {
    "en": "Efreeti Bottle",
    "zh-CN": "火巨灵瓶"
  },
  "magicItemName.elemental-gem": {
    "en": "Elemental Gem",
    "zh-CN": "元素宝石"
  },
  "magicItemName.elven-chain": {
    "en": "Elven Chain",
    "zh-CN": "精灵链甲"
  },
  "magicItemName.eversmoking-bottle": {
    "en": "Eversmoking Bottle",
    "zh-CN": "不息烟瓶"
  },
  "magicItemName.eyes-of-charming": {
    "en": "Eyes of Charming",
    "zh-CN": "魅惑镜片"
  },
  "magicItemName.eyes-of-minute-seeing": {
    "en": "Eyes of Minute Seeing",
    "zh-CN": "细察镜片"
  },
  "magicItemName.eyes-of-the-eagle": {
    "en": "Eyes of the Eagle",
    "zh-CN": "鹰眼镜片"
  },
  "magicItemName.feather-token": {
    "en": "Feather Token",
    "zh-CN": "羽毛符饰"
  },
  "magicItemName.figurine-of-wondrous-power": {
    "en": "Figurine of Wondrous Power",
    "zh-CN": "奇力雕像"
  },
  "magicItemName.flame-tongue": {
    "en": "Flame Tongue",
    "zh-CN": "焰舌剑"
  },
  "magicItemName.folding-boat": {
    "en": "Folding Boat",
    "zh-CN": "折叠船"
  },
  "magicItemName.frost-brand": {
    "en": "Frost Brand",
    "zh-CN": "霜铭剑"
  },
  "magicItemName.gauntlets-of-ogre-power": {
    "en": "Gauntlets of Ogre Power",
    "zh-CN": "食人魔力量手套"
  },
  "magicItemName.gem-of-brightness": {
    "en": "Gem of Brightness",
    "zh-CN": "光耀宝石"
  },
  "magicItemName.gem-of-seeing": {
    "en": "Gem of Seeing",
    "zh-CN": "真视宝石"
  },
  "magicItemName.giant-slayer": {
    "en": "Giant Slayer",
    "zh-CN": "巨人杀手"
  },
  "magicItemName.glamoured-studded-leather": {
    "en": "Glamoured Studded Leather",
    "zh-CN": "幻饰镶钉皮甲"
  },
  "magicItemName.gloves-of-missile-snaring": {
    "en": "Gloves of Missile Snaring",
    "zh-CN": "捕弹手套"
  },
  "magicItemName.gloves-of-swimming-and-climbing": {
    "en": "Gloves of Swimming and Climbing",
    "zh-CN": "游泳攀爬手套"
  },
  "magicItemName.goggles-of-night": {
    "en": "Goggles of Night",
    "zh-CN": "夜视镜"
  },
  "magicItemName.hammer-of-thunderbolts": {
    "en": "Hammer of Thunderbolts",
    "zh-CN": "雷霆之锤"
  },
  "magicItemName.handy-haversack": {
    "en": "Handy Haversack",
    "zh-CN": "便利背包"
  },
  "magicItemName.hat-of-disguise": {
    "en": "Hat of Disguise",
    "zh-CN": "易容帽"
  },
  "magicItemName.headband-of-intellect": {
    "en": "Headband of Intellect",
    "zh-CN": "智力头带"
  },
  "magicItemName.helm-of-brilliance": {
    "en": "Helm of Brilliance",
    "zh-CN": "光辉头盔"
  },
  "magicItemName.helm-of-comprehending-languages": {
    "en": "Helm of Comprehending Languages",
    "zh-CN": "通晓语言头盔"
  },
  "magicItemName.helm-of-telepathy": {
    "en": "Helm of Telepathy",
    "zh-CN": "心灵感应头盔"
  },
  "magicItemName.helm-of-teleportation": {
    "en": "Helm of Teleportation",
    "zh-CN": "传送头盔"
  },
  "magicItemName.holy-avenger": {
    "en": "Holy Avenger",
    "zh-CN": "神圣复仇者"
  },
  "magicItemName.horn-of-blasting": {
    "en": "Horn of Blasting",
    "zh-CN": "轰鸣号角"
  },
  "magicItemName.horn-of-valhalla": {
    "en": "Horn of Valhalla",
    "zh-CN": "瓦尔哈拉号角"
  },
  "magicItemName.horseshoes-of-a-zephyr": {
    "en": "Horseshoes of a Zephyr",
    "zh-CN": "轻风马蹄铁"
  },
  "magicItemName.horseshoes-of-speed": {
    "en": "Horseshoes of Speed",
    "zh-CN": "速度马蹄铁"
  },
  "magicItemName.immovable-rod": {
    "en": "Immovable Rod",
    "zh-CN": "不动权杖"
  },
  "magicItemName.instant-fortress": {
    "en": "Instant Fortress",
    "zh-CN": "速成堡垒"
  },
  "magicItemName.ioun-stone": {
    "en": "Ioun Stone",
    "zh-CN": "艾恩石"
  },
  "magicItemName.iron-bands-of-binding": {
    "en": "Iron Bands of Binding",
    "zh-CN": "束缚铁带"
  },
  "magicItemName.iron-flask": {
    "en": "Iron Flask",
    "zh-CN": "铁魔瓶"
  },
  "magicItemName.javelin-of-lightning": {
    "en": "Javelin of Lightning",
    "zh-CN": "闪电标枪"
  },
  "magicItemName.lantern-of-revealing": {
    "en": "Lantern of Revealing",
    "zh-CN": "显形提灯"
  },
  "magicItemName.luck-blade": {
    "en": "Luck Blade",
    "zh-CN": "幸运之刃"
  },
  "magicItemName.mace-of-disruption": {
    "en": "Mace of Disruption",
    "zh-CN": "破邪钉头锤"
  },
  "magicItemName.mace-of-smiting": {
    "en": "Mace of Smiting",
    "zh-CN": "破击钉头锤"
  },
  "magicItemName.mace-of-terror": {
    "en": "Mace of Terror",
    "zh-CN": "恐怖钉头锤"
  },
  "magicItemName.mantle-of-spell-resistance": {
    "en": "Mantle of Spell Resistance",
    "zh-CN": "法术抗性斗篷"
  },
  "magicItemName.manual-of-bodily-health": {
    "en": "Manual of Bodily Health",
    "zh-CN": "健体手册"
  },
  "magicItemName.manual-of-gainful-exercise": {
    "en": "Manual of Gainful Exercise",
    "zh-CN": "强身手册"
  },
  "magicItemName.manual-of-golems": {
    "en": "Manual of Golems",
    "zh-CN": "魔像手册"
  },
  "magicItemName.manual-of-quickness-of-action": {
    "en": "Manual of Quickness of Action",
    "zh-CN": "迅捷手册"
  },
  "magicItemName.marvelous-pigments": {
    "en": "Marvelous Pigments",
    "zh-CN": "奇妙颜料"
  },
  "magicItemName.medallion-of-thoughts": {
    "en": "Medallion of Thoughts",
    "zh-CN": "思想勋章"
  },
  "magicItemName.mirror-of-life-trapping": {
    "en": "Mirror of Life Trapping",
    "zh-CN": "囚魂镜"
  },
  "magicItemName.mithral-armor": {
    "en": "Mithral Armor",
    "zh-CN": "秘银护甲"
  },
  "magicItemName.necklace-of-adaptation": {
    "en": "Necklace of Adaptation",
    "zh-CN": "适应项链"
  },
  "magicItemName.necklace-of-fireballs": {
    "en": "Necklace of Fireballs",
    "zh-CN": "火球项链"
  },
  "magicItemName.necklace-of-prayer-beads": {
    "en": "Necklace of Prayer Beads",
    "zh-CN": "祈祷念珠项链"
  },
  "magicItemName.nine-lives-stealer": {
    "en": "Nine Lives Stealer",
    "zh-CN": "九命夺魂剑"
  },
  "magicItemName.oathbow": {
    "en": "Oathbow",
    "zh-CN": "誓言弓"
  },
  "magicItemName.oil-of-etherealness": {
    "en": "Oil of Etherealness",
    "zh-CN": "以太油"
  },
  "magicItemName.oil-of-sharpness": {
    "en": "Oil of Sharpness",
    "zh-CN": "锋锐油"
  },
  "magicItemName.oil-of-slipperiness": {
    "en": "Oil of Slipperiness",
    "zh-CN": "滑溜油"
  },
  "magicItemName.pearl-of-power": {
    "en": "Pearl of Power",
    "zh-CN": "能量珍珠"
  },
  "magicItemName.periapt-of-health": {
    "en": "Periapt of Health",
    "zh-CN": "健康符坠"
  },
  "magicItemName.periapt-of-proof-against-poison": {
    "en": "Periapt of Proof against Poison",
    "zh-CN": "防毒符坠"
  },
  "magicItemName.periapt-of-wound-closure": {
    "en": "Periapt of Wound Closure",
    "zh-CN": "愈伤符坠"
  },
  "magicItemName.philter-of-love": {
    "en": "Philter of Love",
    "zh-CN": "爱情灵药"
  },
  "magicItemName.pipes-of-haunting": {
    "en": "Pipes of Haunting",
    "zh-CN": "惊惧风笛"
  },
  "magicItemName.pipes-of-the-sewers": {
    "en": "Pipes of the Sewers",
    "zh-CN": "下水道风笛"
  },
  "magicItemName.plate-armor-of-etherealness": {
    "en": "Plate Armor of Etherealness",
    "zh-CN": "以太板甲"
  },
  "magicItemName.portable-hole": {
    "en": "Portable Hole",
    "zh-CN": "便携洞穴"
  },
  "magicItemName.potion-of-animal-friendship": {
    "en": "Potion of Animal Friendship",
    "zh-CN": "动物友谊药水"
  },
  "magicItemName.potion-of-clairvoyance": {
    "en": "Potion of Clairvoyance",
    "zh-CN": "千里感知药水"
  },
  "magicItemName.potion-of-climbing": {
    "en": "Potion of Climbing",
    "zh-CN": "攀爬药水"
  },
  "magicItemName.potion-of-diminution": {
    "en": "Potion of Diminution",
    "zh-CN": "缩小药水"
  },
  "magicItemName.potion-of-flying": {
    "en": "Potion of Flying",
    "zh-CN": "飞行药水"
  },
  "magicItemName.potion-of-gaseous-form": {
    "en": "Potion of Gaseous Form",
    "zh-CN": "气化形体药水"
  },
  "magicItemName.potion-of-giant-strength": {
    "en": "Potion of Giant Strength",
    "zh-CN": "巨人力量药水"
  },
  "magicItemName.potion-of-growth": {
    "en": "Potion of Growth",
    "zh-CN": "变巨药水"
  },
  "magicItemName.potion-of-healing": {
    "en": "Potion of Healing",
    "zh-CN": "治疗药水"
  },
  "magicItemName.potion-of-heroism": {
    "en": "Potion of Heroism",
    "zh-CN": "英雄气概药水"
  },
  "magicItemName.potion-of-invisibility": {
    "en": "Potion of Invisibility",
    "zh-CN": "隐形药水"
  },
  "magicItemName.potion-of-mind-reading": {
    "en": "Potion of Mind Reading",
    "zh-CN": "读心药水"
  },
  "magicItemName.potion-of-poison": {
    "en": "Potion of Poison",
    "zh-CN": "毒药水"
  },
  "magicItemName.potion-of-resistance": {
    "en": "Potion of Resistance",
    "zh-CN": "抗性药水"
  },
  "magicItemName.potion-of-speed": {
    "en": "Potion of Speed",
    "zh-CN": "速度药水"
  },
  "magicItemName.potion-of-water-breathing": {
    "en": "Potion of Water Breathing",
    "zh-CN": "水下呼吸药水"
  },
  "magicItemName.restorative-ointment": {
    "en": "Restorative Ointment",
    "zh-CN": "复原药膏"
  },
  "magicItemName.ring-of-animal-influence": {
    "en": "Ring of Animal Influence",
    "zh-CN": "动物影响戒指"
  },
  "magicItemName.ring-of-djinni-summoning": {
    "en": "Ring of Djinni Summoning",
    "zh-CN": "风巨灵召唤戒指"
  },
  "magicItemName.ring-of-elemental-command": {
    "en": "Ring of Elemental Command",
    "zh-CN": "元素统御戒指"
  },
  "magicItemName.ring-of-evasion": {
    "en": "Ring of Evasion",
    "zh-CN": "闪避戒指"
  },
  "magicItemName.ring-of-feather-falling": {
    "en": "Ring of Feather Falling",
    "zh-CN": "羽落戒指"
  },
  "magicItemName.ring-of-free-action": {
    "en": "Ring of Free Action",
    "zh-CN": "自由行动戒指"
  },
  "magicItemName.ring-of-invisibility": {
    "en": "Ring of Invisibility",
    "zh-CN": "隐形戒指"
  },
  "magicItemName.ring-of-jumping": {
    "en": "Ring of Jumping",
    "zh-CN": "跳跃戒指"
  },
  "magicItemName.ring-of-mind-shielding": {
    "en": "Ring of Mind Shielding",
    "zh-CN": "心灵屏蔽戒指"
  },
  "magicItemName.ring-of-protection": {
    "en": "Ring of Protection",
    "zh-CN": "防护戒指"
  },
  "magicItemName.ring-of-regeneration": {
    "en": "Ring of Regeneration",
    "zh-CN": "再生戒指"
  },
  "magicItemName.ring-of-resistance": {
    "en": "Ring of Resistance",
    "zh-CN": "抗性戒指"
  },
  "magicItemName.ring-of-shooting-stars": {
    "en": "Ring of Shooting Stars",
    "zh-CN": "流星戒指"
  },
  "magicItemName.ring-of-spell-storing": {
    "en": "Ring of Spell Storing",
    "zh-CN": "储法戒指"
  },
  "magicItemName.ring-of-spell-turning": {
    "en": "Ring of Spell Turning",
    "zh-CN": "法术反转戒指"
  },
  "magicItemName.ring-of-swimming": {
    "en": "Ring of Swimming",
    "zh-CN": "游泳戒指"
  },
  "magicItemName.ring-of-telekinesis": {
    "en": "Ring of Telekinesis",
    "zh-CN": "心灵遥控戒指"
  },
  "magicItemName.ring-of-the-ram": {
    "en": "Ring of the Ram",
    "zh-CN": "公羊戒指"
  },
  "magicItemName.ring-of-three-wishes": {
    "en": "Ring of Three Wishes",
    "zh-CN": "三愿戒指"
  },
  "magicItemName.ring-of-warmth": {
    "en": "Ring of Warmth",
    "zh-CN": "保暖戒指"
  },
  "magicItemName.ring-of-water-walking": {
    "en": "Ring of Water Walking",
    "zh-CN": "水上行走戒指"
  },
  "magicItemName.ring-of-x-ray-vision": {
    "en": "Ring of X-ray Vision",
    "zh-CN": "透视戒指"
  },
  "magicItemName.robe-of-eyes": {
    "en": "Robe of Eyes",
    "zh-CN": "百眼法袍"
  },
  "magicItemName.robe-of-scintillating-colors": {
    "en": "Robe of Scintillating Colors",
    "zh-CN": "炫彩法袍"
  },
  "magicItemName.robe-of-stars": {
    "en": "Robe of Stars",
    "zh-CN": "星辰法袍"
  },
  "magicItemName.robe-of-the-archmagi": {
    "en": "Robe of the Archmagi",
    "zh-CN": "大法师法袍"
  },
  "magicItemName.robe-of-useful-items": {
    "en": "Robe of Useful Items",
    "zh-CN": "实用物品法袍"
  },
  "magicItemName.rod-of-absorption": {
    "en": "Rod of Absorption",
    "zh-CN": "吸收权杖"
  },
  "magicItemName.rod-of-alertness": {
    "en": "Rod of Alertness",
    "zh-CN": "警戒权杖"
  },
  "magicItemName.rod-of-lordly-might": {
    "en": "Rod of Lordly Might",
    "zh-CN": "威权之杖"
  },
  "magicItemName.rod-of-rulership": {
    "en": "Rod of Rulership",
    "zh-CN": "统御权杖"
  },
  "magicItemName.rod-of-security": {
    "en": "Rod of Security",
    "zh-CN": "庇护权杖"
  },
  "magicItemName.rope-of-climbing": {
    "en": "Rope of Climbing",
    "zh-CN": "攀爬绳"
  },
  "magicItemName.rope-of-entanglement": {
    "en": "Rope of Entanglement",
    "zh-CN": "纠缠绳"
  },
  "magicItemName.scarab-of-protection": {
    "en": "Scarab of Protection",
    "zh-CN": "防护圣甲虫"
  },
  "magicItemName.scimitar-of-speed": {
    "en": "Scimitar of Speed",
    "zh-CN": "迅捷弯刀"
  },
  "magicItemName.shield-of-missile-attraction": {
    "en": "Shield of Missile Attraction",
    "zh-CN": "吸弹盾"
  },
  "magicItemName.shield-1-2-or-3": {
    "en": "Shield, +1, +2, or +3",
    "zh-CN": "盾牌（+1、+2 或 +3）"
  },
  "magicItemName.slippers-of-spider-climbing": {
    "en": "Slippers of Spider Climbing",
    "zh-CN": "蛛行便鞋"
  },
  "magicItemName.sovereign-glue": {
    "en": "Sovereign Glue",
    "zh-CN": "万能胶"
  },
  "magicItemName.spell-scroll": {
    "en": "Spell Scroll",
    "zh-CN": "法术卷轴"
  },
  "magicItemName.spellguard-shield": {
    "en": "Spellguard Shield",
    "zh-CN": "法术防护盾"
  },
  "magicItemName.sphere-of-annihilation": {
    "en": "Sphere of Annihilation",
    "zh-CN": "湮灭球"
  },
  "magicItemName.staff-of-charming": {
    "en": "Staff of Charming",
    "zh-CN": "魅惑法杖"
  },
  "magicItemName.staff-of-fire": {
    "en": "Staff of Fire",
    "zh-CN": "火焰法杖"
  },
  "magicItemName.staff-of-frost": {
    "en": "Staff of Frost",
    "zh-CN": "寒霜法杖"
  },
  "magicItemName.staff-of-healing": {
    "en": "Staff of Healing",
    "zh-CN": "治疗法杖"
  },
  "magicItemName.staff-of-power": {
    "en": "Staff of Power",
    "zh-CN": "威力法杖"
  },
  "magicItemName.staff-of-striking": {
    "en": "Staff of Striking",
    "zh-CN": "强击法杖"
  },
  "magicItemName.staff-of-swarming-insects": {
    "en": "Staff of Swarming Insects",
    "zh-CN": "虫群法杖"
  },
  "magicItemName.staff-of-the-magi": {
    "en": "Staff of the Magi",
    "zh-CN": "法师之杖"
  },
  "magicItemName.staff-of-the-python": {
    "en": "Staff of the Python",
    "zh-CN": "巨蟒法杖"
  },
  "magicItemName.staff-of-the-woodlands": {
    "en": "Staff of the Woodlands",
    "zh-CN": "林地法杖"
  },
  "magicItemName.staff-of-thunder-and-lightning": {
    "en": "Staff of Thunder and Lightning",
    "zh-CN": "雷电法杖"
  },
  "magicItemName.staff-of-withering": {
    "en": "Staff of Withering",
    "zh-CN": "枯萎法杖"
  },
  "magicItemName.stone-of-controlling-earth-elementals": {
    "en": "Stone of Controlling Earth Elementals",
    "zh-CN": "土元素统御石"
  },
  "magicItemName.stone-of-good-luck-luckstone": {
    "en": "Stone of Good Luck (Luckstone)",
    "zh-CN": "幸运石"
  },
  "magicItemName.sun-blade": {
    "en": "Sun Blade",
    "zh-CN": "阳炎剑"
  },
  "magicItemName.sword-of-life-stealing": {
    "en": "Sword of Life Stealing",
    "zh-CN": "夺命剑"
  },
  "magicItemName.sword-of-sharpness": {
    "en": "Sword of Sharpness",
    "zh-CN": "锋锐剑"
  },
  "magicItemName.sword-of-wounding": {
    "en": "Sword of Wounding",
    "zh-CN": "创伤剑"
  },
  "magicItemName.talisman-of-pure-good": {
    "en": "Talisman of Pure Good",
    "zh-CN": "纯善护符"
  },
  "magicItemName.talisman-of-the-sphere": {
    "en": "Talisman of the Sphere",
    "zh-CN": "湮灭球护符"
  },
  "magicItemName.talisman-of-ultimate-evil": {
    "en": "Talisman of Ultimate Evil",
    "zh-CN": "极恶护符"
  },
  "magicItemName.tome-of-clear-thought": {
    "en": "Tome of Clear Thought",
    "zh-CN": "明思之书"
  },
  "magicItemName.tome-of-leadership-and-influence": {
    "en": "Tome of Leadership and Influence",
    "zh-CN": "领袖魅力之书"
  },
  "magicItemName.tome-of-understanding": {
    "en": "Tome of Understanding",
    "zh-CN": "洞察之书"
  },
  "magicItemName.trident-of-fish-command": {
    "en": "Trident of Fish Command",
    "zh-CN": "御鱼三叉戟"
  },
  "magicItemName.universal-solvent": {
    "en": "Universal Solvent",
    "zh-CN": "万能溶剂"
  },
  "magicItemName.vicious-weapon": {
    "en": "Vicious Weapon",
    "zh-CN": "凶残武器"
  },
  "magicItemName.vorpal-sword": {
    "en": "Vorpal Sword",
    "zh-CN": "斩首剑"
  },
  "magicItemName.wand-of-binding": {
    "en": "Wand of Binding",
    "zh-CN": "束缚魔杖"
  },
  "magicItemName.wand-of-enemy-detection": {
    "en": "Wand of Enemy Detection",
    "zh-CN": "侦敌魔杖"
  },
  "magicItemName.wand-of-fear": {
    "en": "Wand of Fear",
    "zh-CN": "恐惧魔杖"
  },
  "magicItemName.wand-of-fireballs": {
    "en": "Wand of Fireballs",
    "zh-CN": "火球魔杖"
  },
  "magicItemName.wand-of-lightning-bolts": {
    "en": "Wand of Lightning Bolts",
    "zh-CN": "闪电束魔杖"
  },
  "magicItemName.wand-of-magic-detection": {
    "en": "Wand of Magic Detection",
    "zh-CN": "侦测魔法魔杖"
  },
  "magicItemName.wand-of-magic-missiles": {
    "en": "Wand of Magic Missiles",
    "zh-CN": "魔法飞弹魔杖"
  },
  "magicItemName.wand-of-paralysis": {
    "en": "Wand of Paralysis",
    "zh-CN": "麻痹魔杖"
  },
  "magicItemName.wand-of-polymorph": {
    "en": "Wand of Polymorph",
    "zh-CN": "变形魔杖"
  },
  "magicItemName.wand-of-secrets": {
    "en": "Wand of Secrets",
    "zh-CN": "探秘魔杖"
  },
  "magicItemName.wand-of-the-war-mage-1-2-or-3": {
    "en": "Wand of the War Mage, +1, +2, or +3",
    "zh-CN": "战法师魔杖（+1、+2 或 +3）"
  },
  "magicItemName.wand-of-web": {
    "en": "Wand of Web",
    "zh-CN": "蛛网魔杖"
  },
  "magicItemName.wand-of-wonder": {
    "en": "Wand of Wonder",
    "zh-CN": "奇迹魔杖"
  },
  "magicItemName.weapon-1-2-or-3": {
    "en": "Weapon, +1, +2, or +3",
    "zh-CN": "武器（+1、+2 或 +3）"
  },
  "magicItemName.well-of-many-worlds": {
    "en": "Well of Many Worlds",
    "zh-CN": "万界之井"
  },
  "magicItemName.wind-fan": {
    "en": "Wind Fan",
    "zh-CN": "风扇"
  },
  "magicItemName.winged-boots": {
    "en": "Winged Boots",
    "zh-CN": "飞翼靴"
  },
  "magicItemName.wings-of-flying": {
    "en": "Wings of Flying",
    "zh-CN": "飞行之翼"
  },
  "magicItemName.variant-armor-of-acid-resistance": {
    "en": "Armor of Acid Resistance",
    "zh-CN": "强酸抗性护甲"
  },
  "magicItemName.variant-armor-of-cold-resistance": {
    "en": "Armor of Cold Resistance",
    "zh-CN": "寒冷抗性护甲"
  },
  "magicItemName.variant-armor-of-fire-resistance": {
    "en": "Armor of Fire Resistance",
    "zh-CN": "火焰抗性护甲"
  },
  "magicItemName.variant-armor-of-force-resistance": {
    "en": "Armor of Force Resistance",
    "zh-CN": "力场抗性护甲"
  },
  "magicItemName.variant-armor-of-lightning-resistance": {
    "en": "Armor of Lightning Resistance",
    "zh-CN": "闪电抗性护甲"
  },
  "magicItemName.variant-armor-of-necrotic-resistance": {
    "en": "Armor of Necrotic Resistance",
    "zh-CN": "黯蚀抗性护甲"
  },
  "magicItemName.variant-armor-of-poison-resistance": {
    "en": "Armor of Poison Resistance",
    "zh-CN": "毒素抗性护甲"
  },
  "magicItemName.variant-armor-of-psychic-resistance": {
    "en": "Armor of Psychic Resistance",
    "zh-CN": "心灵抗性护甲"
  },
  "magicItemName.variant-armor-of-radiant-resistance": {
    "en": "Armor of Radiant Resistance",
    "zh-CN": "光耀抗性护甲"
  },
  "magicItemName.variant-armor-of-thunder-resistance": {
    "en": "Armor of Thunder Resistance",
    "zh-CN": "雷鸣抗性护甲"
  },
  "magicItemName.variant-belt-of-cloud-giant-strength": {
    "en": "Belt of Cloud Giant Strength",
    "zh-CN": "云巨人力量腰带"
  },
  "magicItemName.variant-belt-of-fire-giant-strength": {
    "en": "Belt of Fire Giant Strength",
    "zh-CN": "火巨人力量腰带"
  },
  "magicItemName.variant-belt-of-frost-giant-strength": {
    "en": "Belt of Frost Giant Strength",
    "zh-CN": "霜巨人力量腰带"
  },
  "magicItemName.variant-belt-of-hill-giant-strength": {
    "en": "Belt of Hill Giant Strength",
    "zh-CN": "山丘巨人力量腰带"
  },
  "magicItemName.variant-belt-of-stone-giant-strength": {
    "en": "Belt of Stone Giant Strength",
    "zh-CN": "石巨人力量腰带"
  },
  "magicItemName.variant-belt-of-storm-giant-strength": {
    "en": "Belt of Storm Giant Strength",
    "zh-CN": "风暴巨人力量腰带"
  },
  "magicItemName.variant-black-dragon-scale-mail": {
    "en": "Black Dragon Scale Mail",
    "zh-CN": "黑龙鳞甲"
  },
  "magicItemName.variant-blue-dragon-scale-mail": {
    "en": "Blue Dragon Scale Mail",
    "zh-CN": "蓝龙鳞甲"
  },
  "magicItemName.variant-brass-dragon-scale-mail": {
    "en": "Brass Dragon Scale Mail",
    "zh-CN": "黄铜龙鳞甲"
  },
  "magicItemName.variant-bronze-dragon-scale-mail": {
    "en": "Bronze Dragon Scale Mail",
    "zh-CN": "青铜龙鳞甲"
  },
  "magicItemName.variant-copper-dragon-scale-mail": {
    "en": "Copper Dragon Scale Mail",
    "zh-CN": "赤铜龙鳞甲"
  },
  "magicItemName.variant-gold-dragon-scale-mail": {
    "en": "Gold Dragon Scale Mail",
    "zh-CN": "金龙鳞甲"
  },
  "magicItemName.variant-green-dragon-scale-mail": {
    "en": "Green Dragon Scale Mail",
    "zh-CN": "绿龙鳞甲"
  },
  "magicItemName.variant-ioun-stone-of-protection": {
    "en": "Ioun Stone of Protection",
    "zh-CN": "防护艾恩石"
  },
  "magicItemName.variant-red-dragon-scale-mail": {
    "en": "Red Dragon Scale Mail",
    "zh-CN": "红龙鳞甲"
  },
  "magicItemName.variant-ring-of-acid-resistance": {
    "en": "Ring of Acid Resistance",
    "zh-CN": "强酸抗性戒指"
  },
  "magicItemName.variant-ring-of-cold-resistance": {
    "en": "Ring of Cold Resistance",
    "zh-CN": "寒冷抗性戒指"
  },
  "magicItemName.variant-ring-of-fire-resistance": {
    "en": "Ring of Fire Resistance",
    "zh-CN": "火焰抗性戒指"
  },
  "magicItemName.variant-ring-of-force-resistance": {
    "en": "Ring of Force Resistance",
    "zh-CN": "力场抗性戒指"
  },
  "magicItemName.variant-ring-of-lightning-resistance": {
    "en": "Ring of Lightning Resistance",
    "zh-CN": "闪电抗性戒指"
  },
  "magicItemName.variant-ring-of-necrotic-resistance": {
    "en": "Ring of Necrotic Resistance",
    "zh-CN": "黯蚀抗性戒指"
  },
  "magicItemName.variant-ring-of-poison-resistance": {
    "en": "Ring of Poison Resistance",
    "zh-CN": "毒素抗性戒指"
  },
  "magicItemName.variant-ring-of-psychic-resistance": {
    "en": "Ring of Psychic Resistance",
    "zh-CN": "心灵抗性戒指"
  },
  "magicItemName.variant-ring-of-radiant-resistance": {
    "en": "Ring of Radiant Resistance",
    "zh-CN": "光耀抗性戒指"
  },
  "magicItemName.variant-ring-of-thunder-resistance": {
    "en": "Ring of Thunder Resistance",
    "zh-CN": "雷鸣抗性戒指"
  },
  "magicItemName.variant-silver-dragon-scale-mail": {
    "en": "Silver Dragon Scale Mail",
    "zh-CN": "银龙鳞甲"
  },
  "magicItemName.variant-white-dragon-scale-mail": {
    "en": "White Dragon Scale Mail",
    "zh-CN": "白龙鳞甲"
  },
  "magicItemName.wand-of-the-war-mage-1": {
    "en": "Wand of the War Mage +1",
    "zh-CN": "战法师魔杖 +1"
  },
  "magicItemName.wand-of-the-war-mage-2": {
    "en": "Wand of the War Mage +2",
    "zh-CN": "战法师魔杖 +2"
  },
  "magicItemName.wand-of-the-war-mage-3": {
    "en": "Wand of the War Mage +3",
    "zh-CN": "战法师魔杖 +3"
  },
  "magicItemName.armor-1": {
    "en": "Armor +1",
    "zh-CN": "护甲 +1"
  },
  "magicItemName.armor-2": {
    "en": "Armor +2",
    "zh-CN": "护甲 +2"
  },
  "magicItemName.armor-3": {
    "en": "Armor +3",
    "zh-CN": "护甲 +3"
  },
  "magicItemName.shield-1": {
    "en": "Shield +1",
    "zh-CN": "盾牌 +1"
  },
  "magicItemName.shield-2": {
    "en": "Shield +2",
    "zh-CN": "盾牌 +2"
  },
  "magicItemName.shield-3": {
    "en": "Shield +3",
    "zh-CN": "盾牌 +3"
  },
  "magicItemName.weapon-1": {
    "en": "Weapon +1",
    "zh-CN": "武器 +1"
  },
  "magicItemName.weapon-2": {
    "en": "Weapon +2",
    "zh-CN": "武器 +2"
  },
  "magicItemName.weapon-3": {
    "en": "Weapon +3",
    "zh-CN": "武器 +3"
  },
  "magicItemName.ammunition-1": {
    "en": "Ammunition +1",
    "zh-CN": "弹药 +1"
  },
  "magicItemName.ammunition-2": {
    "en": "Ammunition +2",
    "zh-CN": "弹药 +2"
  },
  "magicItemName.ammunition-3": {
    "en": "Ammunition +3",
    "zh-CN": "弹药 +3"
  }
});
