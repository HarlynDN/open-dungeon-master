// Display keys and source bindings only; payloads live in scoped locale resources.
export const CORE_FEATURE_NAMES = [
  {
    "name": "Rage",
    "key": "callingMaterial.coreFeature.0.name"
  },
  {
    "name": "Danger Sense",
    "key": "callingMaterial.coreFeature.1.name"
  },
  {
    "name": "Fast Movement",
    "key": "callingMaterial.coreFeature.2.name"
  },
  {
    "name": "Brutal Critical (1 die)",
    "key": "callingMaterial.coreFeature.3.name"
  },
  {
    "name": "Relentless Rage",
    "key": "callingMaterial.coreFeature.4.name"
  },
  {
    "name": "Brutal Critical (2 dice)",
    "key": "callingMaterial.coreFeature.5.name"
  },
  {
    "name": "Persistent Rage",
    "key": "callingMaterial.coreFeature.6.name"
  },
  {
    "name": "Brutal Critical (3 dice)",
    "key": "callingMaterial.coreFeature.7.name"
  },
  {
    "name": "Bardic Inspiration (d6)",
    "key": "callingMaterial.coreFeature.8.name"
  },
  {
    "name": "Song of Rest (d6)",
    "key": "callingMaterial.coreFeature.9.name"
  },
  {
    "name": "Bardic Inspiration (d8)",
    "key": "callingMaterial.coreFeature.10.name"
  },
  {
    "name": "Song of Rest (d8)",
    "key": "callingMaterial.coreFeature.11.name"
  },
  {
    "name": "Bardic Inspiration (d10)",
    "key": "callingMaterial.coreFeature.12.name"
  },
  {
    "name": "Song of Rest (d10)",
    "key": "callingMaterial.coreFeature.13.name"
  },
  {
    "name": "Bardic Inspiration (d12)",
    "key": "callingMaterial.coreFeature.14.name"
  },
  {
    "name": "Song of Rest (d12)",
    "key": "callingMaterial.coreFeature.15.name"
  },
  {
    "name": "Channel Divinity (1/rest)",
    "key": "callingMaterial.coreFeature.16.name"
  },
  {
    "name": "Channel Divinity: Turn Undead",
    "key": "callingMaterial.coreFeature.17.name"
  },
  {
    "name": "Channel Divinity (2/rest)",
    "key": "callingMaterial.coreFeature.18.name"
  },
  {
    "name": "Channel Divinity (3/rest)",
    "key": "callingMaterial.coreFeature.19.name"
  },
  {
    "name": "Wild Shape",
    "key": "callingMaterial.coreFeature.20.name"
  },
  {
    "name": "Second Wind",
    "key": "callingMaterial.coreFeature.21.name"
  },
  {
    "name": "Action Surge (1 use)",
    "key": "callingMaterial.coreFeature.22.name"
  },
  {
    "name": "Extra Attack (2)",
    "key": "callingMaterial.coreFeature.23.name"
  },
  {
    "name": "Action Surge (2 uses)",
    "key": "callingMaterial.coreFeature.24.name"
  },
  {
    "name": "Extra Attack (3)",
    "key": "callingMaterial.coreFeature.25.name"
  },
  {
    "name": "Martial Arts",
    "key": "callingMaterial.coreFeature.26.name"
  },
  {
    "name": "Ki",
    "key": "callingMaterial.coreFeature.27.name"
  },
  {
    "name": "Unarmored Movement",
    "key": "callingMaterial.coreFeature.28.name"
  },
  {
    "name": "Ki-Empowered Strikes",
    "key": "callingMaterial.coreFeature.29.name"
  },
  {
    "name": "Evasion",
    "key": "callingMaterial.coreFeature.30.name"
  },
  {
    "name": "Unarmored Movement Improvement",
    "key": "callingMaterial.coreFeature.31.name"
  },
  {
    "name": "Divine Sense",
    "key": "callingMaterial.coreFeature.32.name"
  },
  {
    "name": "Lay on Hands",
    "key": "callingMaterial.coreFeature.33.name"
  },
  {
    "name": "Divine Smite",
    "key": "callingMaterial.coreFeature.34.name"
  },
  {
    "name": "Channel Divinity",
    "key": "callingMaterial.coreFeature.35.name"
  },
  {
    "name": "Aura of Protection",
    "key": "callingMaterial.coreFeature.36.name"
  },
  {
    "name": "Vanish",
    "key": "callingMaterial.coreFeature.37.name"
  },
  {
    "name": "Sneak Attack",
    "key": "callingMaterial.coreFeature.38.name"
  },
  {
    "name": "Reliable Talent",
    "key": "callingMaterial.coreFeature.39.name"
  },
  {
    "name": "Font of Magic",
    "key": "callingMaterial.coreFeature.40.name"
  },
  {
    "name": "Arcane Recovery",
    "key": "callingMaterial.coreFeature.41.name"
  },
  {
    "name": "Mindless Rage",
    "key": "callingMaterial.coreFeature.42.name"
  },
  {
    "name": "Channel Divinity: Preserve Life",
    "key": "callingMaterial.coreFeature.43.name"
  },
  {
    "name": "Natural Recovery",
    "key": "callingMaterial.coreFeature.44.name"
  },
  {
    "name": "Improved Critical",
    "key": "callingMaterial.coreFeature.45.name"
  },
  {
    "name": "Superior Critical",
    "key": "callingMaterial.coreFeature.46.name"
  },
  {
    "name": "Channel Divinity: Sacred Weapon",
    "key": "callingMaterial.coreFeature.47.name"
  },
  {
    "name": "Channel Divinity: Turn the Unholy",
    "key": "callingMaterial.coreFeature.48.name"
  }
] as const;

export const CORE_FEATURE_HELP = [
  {
    "classId": "barbarian",
    "name": "Rage",
    "description": "A bonus action. Raging for up to 1 minute: resistance to bludgeoning, piercing, and slashing damage, bonus damage on melee Strength attacks, and advantage on Strength checks and saves, none of it while wearing heavy armor. The server applies all of it; the rage ends early if they end it, fall unconscious, or end a turn without having attacked or taken damage since their last one.",
    "descriptionKey": "sheetDialog.resourceHelp.rage"
  },
  {
    "classId": "barbarian",
    "name": "Danger Sense",
    "description": "advantage on Dexterity saving throws against effects they can see, such as traps and spells, but not while blinded, deafened or incapacitated. The server applies it.",
    "descriptionKey": "callingMaterial.coreHelp.1"
  },
  {
    "classId": "barbarian",
    "name": "Fast Movement",
    "description": "+10 feet of speed while not wearing heavy armor.",
    "descriptionKey": "callingMaterial.coreHelp.2"
  },
  {
    "classId": "barbarian",
    "name": "Brutal Critical (1 die)",
    "description": "Brutal Critical: extra weapon damage dice on a critical hit. The server rolls them.",
    "descriptionKey": "callingMaterial.coreHelp.3"
  },
  {
    "classId": "barbarian",
    "name": "Relentless Rage",
    "description": "Not spent by choice: while raging, damage that drops them to 0 (and does not kill them outright) forces a CON save, DC 10 plus 5 for every use since their last rest, and a success leaves them at 1 hit point. The server rolls it.",
    "descriptionKey": "sheetDialog.resourceHelp.relentless_rage"
  },
  {
    "classId": "barbarian",
    "name": "Brutal Critical (2 dice)",
    "description": "Brutal Critical: extra weapon damage dice on a critical hit. The server rolls them.",
    "descriptionKey": "callingMaterial.coreHelp.3"
  },
  {
    "classId": "barbarian",
    "name": "Persistent Rage",
    "description": "A bonus action. Raging for up to 1 minute: resistance to bludgeoning, piercing, and slashing damage, bonus damage on melee Strength attacks, and advantage on Strength checks and saves, none of it while wearing heavy armor. The server applies all of it; the rage ends early if they end it, fall unconscious, or end a turn without having attacked or taken damage since their last one.",
    "descriptionKey": "sheetDialog.resourceHelp.rage"
  },
  {
    "classId": "barbarian",
    "name": "Brutal Critical (3 dice)",
    "description": "Brutal Critical: extra weapon damage dice on a critical hit. The server rolls them.",
    "descriptionKey": "callingMaterial.coreHelp.3"
  },
  {
    "classId": "bard",
    "name": "Bardic Inspiration (d6)",
    "description": "The target keeps the inspiration die for up to 10 minutes and adds it to one ability check, attack roll, or saving throw. The server hands it to them and spends it on their next roll automatically. From bard 5 (Font of Inspiration) the uses come back on a short rest too.",
    "descriptionKey": "sheetDialog.resourceHelp.bardic_inspiration"
  },
  {
    "classId": "bard",
    "name": "Song of Rest (d6)",
    "description": "Song of Rest: at the end of a short rest, every friendly creature who spent at least one Hit Die regains an extra die of hit points from the bard's performance. It has no daily limit.",
    "descriptionKey": "callingMaterial.coreHelp.6"
  },
  {
    "classId": "bard",
    "name": "Bardic Inspiration (d8)",
    "description": "The target keeps the inspiration die for up to 10 minutes and adds it to one ability check, attack roll, or saving throw. The server hands it to them and spends it on their next roll automatically. From bard 5 (Font of Inspiration) the uses come back on a short rest too.",
    "descriptionKey": "sheetDialog.resourceHelp.bardic_inspiration"
  },
  {
    "classId": "bard",
    "name": "Song of Rest (d8)",
    "description": "Song of Rest: at the end of a short rest, every friendly creature who spent at least one Hit Die regains an extra die of hit points from the bard's performance. It has no daily limit.",
    "descriptionKey": "callingMaterial.coreHelp.6"
  },
  {
    "classId": "bard",
    "name": "Bardic Inspiration (d10)",
    "description": "The target keeps the inspiration die for up to 10 minutes and adds it to one ability check, attack roll, or saving throw. The server hands it to them and spends it on their next roll automatically. From bard 5 (Font of Inspiration) the uses come back on a short rest too.",
    "descriptionKey": "sheetDialog.resourceHelp.bardic_inspiration"
  },
  {
    "classId": "bard",
    "name": "Song of Rest (d10)",
    "description": "Song of Rest: at the end of a short rest, every friendly creature who spent at least one Hit Die regains an extra die of hit points from the bard's performance. It has no daily limit.",
    "descriptionKey": "callingMaterial.coreHelp.6"
  },
  {
    "classId": "bard",
    "name": "Bardic Inspiration (d12)",
    "description": "The target keeps the inspiration die for up to 10 minutes and adds it to one ability check, attack roll, or saving throw. The server hands it to them and spends it on their next roll automatically. From bard 5 (Font of Inspiration) the uses come back on a short rest too.",
    "descriptionKey": "sheetDialog.resourceHelp.bardic_inspiration"
  },
  {
    "classId": "bard",
    "name": "Song of Rest (d12)",
    "description": "Song of Rest: at the end of a short rest, every friendly creature who spent at least one Hit Die regains an extra die of hit points from the bard's performance. It has no daily limit.",
    "descriptionKey": "callingMaterial.coreHelp.6"
  },
  {
    "classId": "cleric",
    "name": "Channel Divinity (1/rest)",
    "description": "Divine power channelled into a subclass effect. Pass variant to have the server resolve it: 'turn undead' (every undead within 30 feet makes a WIS save against the spell DC; a failure is turned for a minute, and from cleric 5 an undead at or under the Destroy Undead CR is destroyed instead), 'sacred weapon' (Oath of Devotion: +CHA to weapon attack rolls for a minute), 'preserve life' (Life Domain: heals up to 5 x cleric level split among targetCharacterIds, none past half their maximum). Never apply turned or frightened by hand: the save decides it.",
    "descriptionKey": "sheetDialog.resourceHelp.channel_divinity"
  },
  {
    "classId": "cleric",
    "name": "Channel Divinity: Turn Undead",
    "description": "Divine power channelled into a subclass effect. Pass variant to have the server resolve it: 'turn undead' (every undead within 30 feet makes a WIS save against the spell DC; a failure is turned for a minute, and from cleric 5 an undead at or under the Destroy Undead CR is destroyed instead), 'sacred weapon' (Oath of Devotion: +CHA to weapon attack rolls for a minute), 'preserve life' (Life Domain: heals up to 5 x cleric level split among targetCharacterIds, none past half their maximum). Never apply turned or frightened by hand: the save decides it.",
    "descriptionKey": "sheetDialog.resourceHelp.channel_divinity"
  },
  {
    "classId": "cleric",
    "name": "Channel Divinity (2/rest)",
    "description": "Divine power channelled into a subclass effect. Pass variant to have the server resolve it: 'turn undead' (every undead within 30 feet makes a WIS save against the spell DC; a failure is turned for a minute, and from cleric 5 an undead at or under the Destroy Undead CR is destroyed instead), 'sacred weapon' (Oath of Devotion: +CHA to weapon attack rolls for a minute), 'preserve life' (Life Domain: heals up to 5 x cleric level split among targetCharacterIds, none past half their maximum). Never apply turned or frightened by hand: the save decides it.",
    "descriptionKey": "sheetDialog.resourceHelp.channel_divinity"
  },
  {
    "classId": "cleric",
    "name": "Channel Divinity (3/rest)",
    "description": "Divine power channelled into a subclass effect. Pass variant to have the server resolve it: 'turn undead' (every undead within 30 feet makes a WIS save against the spell DC; a failure is turned for a minute, and from cleric 5 an undead at or under the Destroy Undead CR is destroyed instead), 'sacred weapon' (Oath of Devotion: +CHA to weapon attack rolls for a minute), 'preserve life' (Life Domain: heals up to 5 x cleric level split among targetCharacterIds, none past half their maximum). Never apply turned or frightened by hand: the save decides it.",
    "descriptionKey": "sheetDialog.resourceHelp.channel_divinity"
  },
  {
    "classId": "druid",
    "name": "Wild Shape",
    "description": "The druid takes on a beast's form: its hit points, AC, and natural attacks, keeping their own mind. Damage spills back to their own hit points when the form drops.",
    "descriptionKey": "sheetDialog.resourceHelp.wild_shape"
  },
  {
    "classId": "fighter",
    "name": "Second Wind",
    "description": "A bonus action that restores 1d10 + fighter level hit points to the fighter.",
    "descriptionKey": "sheetDialog.resourceHelp.second_wind"
  },
  {
    "classId": "fighter",
    "name": "Action Surge (1 use)",
    "description": "One additional action this turn, on top of the regular one. Resolve the extra action with its own tool call (a second pc_attack, a cast, a Dash).",
    "descriptionKey": "sheetDialog.resourceHelp.action_surge"
  },
  {
    "classId": "fighter",
    "name": "Extra Attack (2)",
    "description": "Extra Attack: three attacks per Attack action, one pc_attack call each.",
    "descriptionKey": "callingMaterial.coreHelp.11"
  },
  {
    "classId": "fighter",
    "name": "Action Surge (2 uses)",
    "description": "One additional action this turn, on top of the regular one. Resolve the extra action with its own tool call (a second pc_attack, a cast, a Dash).",
    "descriptionKey": "sheetDialog.resourceHelp.action_surge"
  },
  {
    "classId": "fighter",
    "name": "Extra Attack (3)",
    "description": "Extra Attack: four attacks per Attack action, one pc_attack call each.",
    "descriptionKey": "callingMaterial.coreHelp.12"
  },
  {
    "classId": "monk",
    "name": "Martial Arts",
    "description": "unarmed strikes and monk weapons use DEX and a growing damage die, with a bonus-action unarmed strike after the Attack action.",
    "descriptionKey": "callingMaterial.coreHelp.13"
  },
  {
    "classId": "monk",
    "name": "Ki",
    "description": "Ki fuels Flurry of Blows (a bonus-action pair of unarmed strikes: resolve each with pc_attack), Patient Defense (Dodge), and Step of the Wind (Dash or Disengage, doubled jump).",
    "descriptionKey": "sheetDialog.resourceHelp.ki"
  },
  {
    "classId": "monk",
    "name": "Unarmored Movement",
    "description": "extra speed while wearing no armor and no shield, and from 9th level they run up walls and across water.",
    "descriptionKey": "callingMaterial.coreHelp.15"
  },
  {
    "classId": "monk",
    "name": "Ki-Empowered Strikes",
    "description": "Ki fuels Flurry of Blows (a bonus-action pair of unarmed strikes: resolve each with pc_attack), Patient Defense (Dodge), and Step of the Wind (Dash or Disengage, doubled jump).",
    "descriptionKey": "sheetDialog.resourceHelp.ki"
  },
  {
    "classId": "monk",
    "name": "Evasion",
    "description": "on a Dexterity save for half damage they instead take none on a success and half on a failure. The server applies it on aoe_damage, cast_at_player and apply_hazard; send the full damage and halfOnSave.",
    "descriptionKey": "callingMaterial.coreHelp.16"
  },
  {
    "classId": "monk",
    "name": "Unarmored Movement Improvement",
    "description": "Unarmored Movement: extra speed while wearing no armor and no shield, and from 9th level they run up walls and across water.",
    "descriptionKey": "callingMaterial.coreHelp.17"
  },
  {
    "classId": "paladin",
    "name": "Divine Sense",
    "description": "Until the end of their next turn the paladin knows the location of any celestial, fiend, or undead within 60 feet that is not behind total cover, and of consecrated or desecrated ground.",
    "descriptionKey": "sheetDialog.resourceHelp.divine_sense"
  },
  {
    "classId": "paladin",
    "name": "Lay on Hands",
    "description": "A touch that restores hit points straight from the paladin's pool: the amount spent is the amount healed. Spend 5 instead to cure one disease or neutralize one poison.",
    "descriptionKey": "sheetDialog.resourceHelp.lay_on_hands"
  },
  {
    "classId": "paladin",
    "name": "Divine Smite",
    "description": "after a melee weapon hit, spend a spell slot for 2d8 radiant damage, +1d8 per slot level above 1st and +1d8 against undead or fiends. Call pc_attack with smite set so the server spends the slot and rolls it.",
    "descriptionKey": "callingMaterial.coreHelp.20"
  },
  {
    "classId": "paladin",
    "name": "Channel Divinity",
    "description": "Divine power channelled into a subclass effect. Pass variant to have the server resolve it: 'turn undead' (every undead within 30 feet makes a WIS save against the spell DC; a failure is turned for a minute, and from cleric 5 an undead at or under the Destroy Undead CR is destroyed instead), 'sacred weapon' (Oath of Devotion: +CHA to weapon attack rolls for a minute), 'preserve life' (Life Domain: heals up to 5 x cleric level split among targetCharacterIds, none past half their maximum). Never apply turned or frightened by hand: the save decides it.",
    "descriptionKey": "sheetDialog.resourceHelp.channel_divinity"
  },
  {
    "classId": "paladin",
    "name": "Aura of Protection",
    "description": "the paladin and every ally within 10 feet (30 from paladin 18) add the paladin's Charisma modifier (minimum +1) to their saving throws while the paladin is conscious. The server applies it to every save it rolls: from token positions on a battle map, and to the whole party off the map. Never add it yourself.",
    "descriptionKey": "callingMaterial.coreHelp.21"
  },
  {
    "classId": "ranger",
    "name": "Vanish",
    "description": "Hide as a bonus action even in plain sight, 3/long rest.",
    "descriptionKey": "sheetDialog.resourceHelp.mystery_vanish"
  },
  {
    "classId": "rogue",
    "name": "Sneak Attack",
    "description": "extra d6s once per turn on a finesse or ranged attack made with advantage, or while an ally is adjacent to the target and the attack is not at disadvantage. The server checks the conditions and adds the dice.",
    "descriptionKey": "callingMaterial.coreHelp.23"
  },
  {
    "classId": "rogue",
    "name": "Evasion",
    "description": "on a Dexterity save for half damage they instead take none on a success and half on a failure. The server applies it on aoe_damage, cast_at_player and apply_hazard; send the full damage and halfOnSave.",
    "descriptionKey": "callingMaterial.coreHelp.16"
  },
  {
    "classId": "rogue",
    "name": "Reliable Talent",
    "description": "for any ability check they are proficient in, a d20 roll of 9 or lower counts as a 10. The server applies it.",
    "descriptionKey": "callingMaterial.coreHelp.24"
  },
  {
    "classId": "sorcerer",
    "name": "Font of Magic",
    "description": "Sorcery points buy Metamagic on a spell being cast (spend with amount), or convert to and from spell slots: call use_resource with variant like 'create a 2nd-level slot' (costs 2/3/5/6/7 points for levels 1-5) or 'convert my 3rd-level slot into points' and the server moves the points and slots. Created slots vanish on a long rest. Quickened Spell: call use_resource with variant 'Quickened Spell' before the cast; the server spends 2 points and the next spell of one action this turn takes the bonus action. The spell itself still goes through use_spell_slot or cast_at_enemy as normal.",
    "descriptionKey": "sheetDialog.resourceHelp.sorcery_points"
  },
  {
    "classId": "wizard",
    "name": "Arcane Recovery",
    "description": "Once a day, on a short rest, the wizard recovers expended spell slots totalling half their level (rounded up), none of them 6th level or higher.",
    "descriptionKey": "sheetDialog.resourceHelp.arcane_recovery"
  },
  {
    "classId": "barbarian",
    "name": "Mindless Rage",
    "description": "A bonus action. Raging for up to 1 minute: resistance to bludgeoning, piercing, and slashing damage, bonus damage on melee Strength attacks, and advantage on Strength checks and saves, none of it while wearing heavy armor. The server applies all of it; the rage ends early if they end it, fall unconscious, or end a turn without having attacked or taken damage since their last one.",
    "descriptionKey": "sheetDialog.resourceHelp.rage"
  },
  {
    "classId": "cleric",
    "name": "Channel Divinity: Preserve Life",
    "description": "Divine power channelled into a subclass effect. Pass variant to have the server resolve it: 'turn undead' (every undead within 30 feet makes a WIS save against the spell DC; a failure is turned for a minute, and from cleric 5 an undead at or under the Destroy Undead CR is destroyed instead), 'sacred weapon' (Oath of Devotion: +CHA to weapon attack rolls for a minute), 'preserve life' (Life Domain: heals up to 5 x cleric level split among targetCharacterIds, none past half their maximum). Never apply turned or frightened by hand: the save decides it.",
    "descriptionKey": "sheetDialog.resourceHelp.channel_divinity"
  },
  {
    "classId": "druid",
    "name": "Natural Recovery",
    "description": "Once a day, on a short rest, the druid recovers expended spell slots totalling half their druid level (rounded up), none of them 6th level or higher.",
    "descriptionKey": "callingMaterial.coreHelp.NaturalRecovery"
  },
  {
    "classId": "fighter",
    "name": "Improved Critical",
    "description": "their weapon attacks crit on a natural 19 or 20.",
    "descriptionKey": "callingMaterial.coreHelp.ImprovedCritical"
  },
  {
    "classId": "fighter",
    "name": "Superior Critical",
    "description": "their weapon attacks crit on a natural 18, 19, or 20.",
    "descriptionKey": "callingMaterial.coreHelp.SuperiorCritical"
  },
  {
    "classId": "paladin",
    "name": "Channel Divinity: Sacred Weapon",
    "description": "Divine power channelled into a subclass effect. Pass variant to have the server resolve it: 'turn undead' (every undead within 30 feet makes a WIS save against the spell DC; a failure is turned for a minute, and from cleric 5 an undead at or under the Destroy Undead CR is destroyed instead), 'sacred weapon' (Oath of Devotion: +CHA to weapon attack rolls for a minute), 'preserve life' (Life Domain: heals up to 5 x cleric level split among targetCharacterIds, none past half their maximum). Never apply turned or frightened by hand: the save decides it.",
    "descriptionKey": "sheetDialog.resourceHelp.channel_divinity"
  },
  {
    "classId": "paladin",
    "name": "Channel Divinity: Turn the Unholy",
    "description": "Divine power channelled into a subclass effect. Pass variant to have the server resolve it: 'turn undead' (every undead within 30 feet makes a WIS save against the spell DC; a failure is turned for a minute, and from cleric 5 an undead at or under the Destroy Undead CR is destroyed instead), 'sacred weapon' (Oath of Devotion: +CHA to weapon attack rolls for a minute), 'preserve life' (Life Domain: heals up to 5 x cleric level split among targetCharacterIds, none past half their maximum). Never apply turned or frightened by hand: the save decides it.",
    "descriptionKey": "sheetDialog.resourceHelp.channel_divinity"
  }
] as const;
