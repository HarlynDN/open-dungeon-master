// Exact repository-owned catalog captions; canonical action/field IDs are unchanged.
export const DM_ACTION_METADATA = [
  {
    "name": "start_encounter",
    "label": "Start a fight",
    "summary": "Rolls initiative for everyone and opens the encounter.",
    "labelKey": "dmAction.label.start_encounter",
    "summaryKey": "dmAction.summary.start_encounter"
  },
  {
    "name": "add_enemies",
    "label": "Reinforcements",
    "summary": "Adds enemies to the fight already running, rolling their initiative in.",
    "labelKey": "dmAction.label.add_enemies",
    "summaryKey": "dmAction.summary.add_enemies"
  },
  {
    "name": "pc_attack",
    "label": "Player attacks",
    "summary": "Resolves a player's swing: to hit, damage, crits, riders, all from their sheet.",
    "labelKey": "dmAction.label.pc_attack",
    "summaryKey": "dmAction.summary.pc_attack"
  },
  {
    "name": "enemy_attack",
    "label": "Enemy attacks",
    "summary": "Rolls one enemy attack against a player and applies whatever lands.",
    "labelKey": "dmAction.label.enemy_attack",
    "summaryKey": "dmAction.summary.enemy_attack"
  },
  {
    "name": "damage_enemy",
    "label": "Damage an enemy",
    "summary": "Applies damage straight to an enemy, resistances and immunities included.",
    "labelKey": "dmAction.label.damage_enemy",
    "summaryKey": "dmAction.summary.damage_enemy"
  },
  {
    "name": "cast_at_enemy",
    "label": "Cast at an enemy",
    "summary": "A player's save spell against one enemy: the DC comes from the sheet, the dice from the pack when it knows the spell.",
    "labelKey": "dmAction.label.cast_at_enemy",
    "summaryKey": "dmAction.summary.cast_at_enemy"
  },
  {
    "name": "cast_at_player",
    "label": "Cast at a player",
    "summary": "An enemy's spell or a trap on one character: the save from their sheet, then the damage or the condition.",
    "labelKey": "dmAction.label.cast_at_player",
    "summaryKey": "dmAction.summary.cast_at_player"
  },
  {
    "name": "cast_buff",
    "label": "Cast a buff",
    "summary": "A helpful spell on the party: the effect lands as a real condition with its duration.",
    "labelKey": "dmAction.label.cast_buff",
    "summaryKey": "dmAction.summary.cast_buff"
  },
  {
    "name": "aoe_damage",
    "label": "Area of effect",
    "summary": "One save, many targets: each rolls, and the halves and evasions resolve themselves.",
    "labelKey": "dmAction.label.aoe_damage",
    "summaryKey": "dmAction.summary.aoe_damage"
  },
  {
    "name": "split_damage",
    "label": "Damage tray",
    "summary": "One rolled total on several creatures, each at full, half, double or none.",
    "labelKey": "dmAction.label.split_damage",
    "summaryKey": "dmAction.summary.split_damage"
  },
  {
    "name": "set_enemy_condition",
    "label": "Condition on an enemy",
    "summary": "Puts a condition on an enemy, with its duration or its save to end.",
    "labelKey": "dmAction.label.set_enemy_condition",
    "summaryKey": "dmAction.summary.set_enemy_condition"
  },
  {
    "name": "clear_enemy_condition",
    "label": "Clear an enemy condition",
    "summary": "Takes a condition back off an enemy.",
    "labelKey": "dmAction.label.clear_enemy_condition",
    "summaryKey": "dmAction.summary.clear_enemy_condition"
  },
  {
    "name": "enemy_flees",
    "label": "An enemy flees",
    "summary": "Takes an enemy out of the fight alive; the party still earns it.",
    "labelKey": "dmAction.label.enemy_flees",
    "summaryKey": "dmAction.summary.enemy_flees"
  },
  {
    "name": "take_action",
    "label": "Action",
    "summary": "Dodge, Dash, Disengage, Hide, Help, Grapple, Shove, Ready, Search, Use an Object or Escape, with its real contest and effect.",
    "labelKey": "dmAction.label.take_action",
    "summaryKey": "dmAction.summary.take_action"
  },
  {
    "name": "use_reaction",
    "label": "Reaction",
    "summary": "Spends a character's reaction on a named feature and applies what it does.",
    "labelKey": "dmAction.label.use_reaction",
    "summaryKey": "dmAction.summary.use_reaction"
  },
  {
    "name": "apply_hazard",
    "label": "Hazard",
    "summary": "A fall, a trap, drowning or extreme weather, with the book's damage and saves.",
    "labelKey": "dmAction.label.apply_hazard",
    "summaryKey": "dmAction.summary.apply_hazard"
  },
  {
    "name": "end_turn",
    "label": "End a turn",
    "summary": "Ends a character's turn and moves the initiative pointer to the next one.",
    "labelKey": "dmAction.label.end_turn",
    "summaryKey": "dmAction.summary.end_turn"
  },
  {
    "name": "end_encounter",
    "label": "End the fight",
    "summary": "Closes the encounter, awards XP and hands back half the spent ammunition.",
    "labelKey": "dmAction.label.end_encounter",
    "summaryKey": "dmAction.summary.end_encounter"
  },
  {
    "name": "summon_pet",
    "label": "Summon a pet",
    "summary": "Gives a character the creature a feature grants them, with its own stat block.",
    "labelKey": "dmAction.label.summon_pet",
    "summaryKey": "dmAction.summary.summon_pet"
  },
  {
    "name": "pet_attack",
    "label": "Pet attacks",
    "summary": "Resolves a pet's attack the same way a player's is resolved.",
    "labelKey": "dmAction.label.pet_attack",
    "summaryKey": "dmAction.summary.pet_attack"
  },
  {
    "name": "damage_pet",
    "label": "Damage a pet",
    "summary": "Applies damage to a companion creature.",
    "labelKey": "dmAction.label.damage_pet",
    "summaryKey": "dmAction.summary.damage_pet"
  },
  {
    "name": "dismiss_pet",
    "label": "Dismiss a pet",
    "summary": "Sends a companion creature away.",
    "labelKey": "dmAction.label.dismiss_pet",
    "summaryKey": "dmAction.summary.dismiss_pet"
  },
  {
    "name": "move_token",
    "label": "Move a token",
    "summary": "Moves a combatant on the map; walls, occupancy and speed still apply.",
    "labelKey": "dmAction.label.move_token",
    "summaryKey": "dmAction.summary.move_token"
  },
  {
    "name": "teleport_token",
    "label": "Teleport a token",
    "summary": "Puts a combatant on a tile without a path: Misty Step, a portal, a trap door.",
    "labelKey": "dmAction.label.teleport_token",
    "summaryKey": "dmAction.summary.teleport_token"
  },
  {
    "name": "legendary_action",
    "label": "Legendary action",
    "summary": "A legendary creature spends legendary actions at the end of someone else's turn. The pool refills on its own turn.",
    "labelKey": "dmAction.label.legendary_action",
    "summaryKey": "dmAction.summary.legendary_action"
  },
  {
    "name": "declare_intent",
    "label": "Declare intent",
    "summary": "Telegraph what an enemy is about to do; the board shows it over that enemy for the rest of the round.",
    "labelKey": "dmAction.label.declare_intent",
    "summaryKey": "dmAction.summary.declare_intent"
  },
  {
    "name": "legendary_resist",
    "label": "Legendary resistance",
    "summary": "Turn a failed save into a success while the creature has resistances left.",
    "labelKey": "dmAction.label.legendary_resist",
    "summaryKey": "dmAction.summary.legendary_resist"
  },
  {
    "name": "lair_action",
    "label": "Lair action",
    "summary": "On initiative 20 the lair itself acts once a round. The fight has to have been started in a lair.",
    "labelKey": "dmAction.label.lair_action",
    "summaryKey": "dmAction.summary.lair_action"
  },
  {
    "name": "set_movement",
    "label": "Flying or burrowing",
    "summary": "Marks a combatant as flying, burrowing or back on foot; the board draws it and tremorsense reads it.",
    "labelKey": "dmAction.label.set_movement",
    "summaryKey": "dmAction.summary.set_movement"
  },
  {
    "name": "apply_damage",
    "label": "Damage a character",
    "summary": "Temp hit points absorb first, hit points floor at zero, death saves start themselves.",
    "labelKey": "dmAction.label.apply_damage",
    "summaryKey": "dmAction.summary.apply_damage"
  },
  {
    "name": "heal",
    "label": "Heal",
    "summary": "Flat hit points, or a healing spell the server rolls with the caster's modifier.",
    "labelKey": "dmAction.label.heal",
    "summaryKey": "dmAction.summary.heal"
  },
  {
    "name": "stabilize",
    "label": "Stabilize",
    "summary": "Ends a dying character's death saves without healing them. It takes the helper's action.",
    "labelKey": "dmAction.label.stabilize",
    "summaryKey": "dmAction.summary.stabilize"
  },
  {
    "name": "award_xp",
    "label": "Award XP",
    "summary": "Gives XP to whoever earned it; levels follow on their own.",
    "labelKey": "dmAction.label.award_xp",
    "summaryKey": "dmAction.summary.award_xp"
  },
  {
    "name": "party_stash",
    "label": "The party's pack and purse",
    "summary": "Moves an item or coin between one character and the party's shared kit.",
    "labelKey": "dmAction.label.party_stash",
    "summaryKey": "dmAction.summary.party_stash"
  },
  {
    "name": "party_award",
    "label": "Award the party",
    "summary": "XP each, a purse split evenly, and one item to the finder, in a single action.",
    "labelKey": "dmAction.label.party_award",
    "summaryKey": "dmAction.summary.party_award"
  },
  {
    "name": "modify_gold",
    "label": "Gold",
    "summary": "Adds or removes coin; a negative number spends it.",
    "labelKey": "dmAction.label.modify_gold",
    "summaryKey": "dmAction.summary.modify_gold"
  },
  {
    "name": "grant_item",
    "label": "Give an item",
    "summary": "Puts an item in a character's hands, weight and all.",
    "labelKey": "dmAction.label.grant_item",
    "summaryKey": "dmAction.summary.grant_item"
  },
  {
    "name": "reveal_item",
    "label": "Name a mystery item",
    "summary": "Turns an unidentified item into what it actually is, on the sheet and in the log.",
    "labelKey": "dmAction.label.reveal_item",
    "summaryKey": "dmAction.summary.reveal_item"
  },
  {
    "name": "remove_item",
    "label": "Take an item",
    "summary": "Lost, stolen or destroyed. Consumables being used go through Use an item.",
    "labelKey": "dmAction.label.remove_item",
    "summaryKey": "dmAction.summary.remove_item"
  },
  {
    "name": "use_item",
    "label": "Use an item",
    "summary": "Spends a consumable and applies what it does, potions rolled properly.",
    "labelKey": "dmAction.label.use_item",
    "summaryKey": "dmAction.summary.use_item"
  },
  {
    "name": "purchase",
    "label": "Buy or sell",
    "summary": "Moves the coin and the goods in one action.",
    "labelKey": "dmAction.label.purchase",
    "summaryKey": "dmAction.summary.purchase"
  },
  {
    "name": "use_resource",
    "label": "Spend a resource",
    "summary": "Rage, Ki, Bardic Inspiration, Wild Shape: the counter moves and the effect lands.",
    "labelKey": "dmAction.label.use_resource",
    "summaryKey": "dmAction.summary.use_resource"
  },
  {
    "name": "set_condition",
    "label": "Condition",
    "summary": "Applies a condition, with rounds or a save that ends it; the server re-rolls both.",
    "labelKey": "dmAction.label.set_condition",
    "summaryKey": "dmAction.summary.set_condition"
  },
  {
    "name": "set_effect",
    "label": "A lasting effect",
    "summary": "A blessing, curse or potion that moves real numbers until it runs out.",
    "labelKey": "dmAction.label.set_effect",
    "summaryKey": "dmAction.summary.set_effect"
  },
  {
    "name": "clear_effect",
    "label": "Lift an effect",
    "summary": "Ends a lasting effect early: dispelled, cured, or the curse broken.",
    "labelKey": "dmAction.label.clear_effect",
    "summaryKey": "dmAction.summary.clear_effect"
  },
  {
    "name": "clear_condition",
    "label": "Clear a condition",
    "summary": "Cured, dispelled, rested off or shaken off.",
    "labelKey": "dmAction.label.clear_condition",
    "summaryKey": "dmAction.summary.clear_condition"
  },
  {
    "name": "use_spell_slot",
    "label": "Spend a slot",
    "summary": "Marks a spell slot used and starts concentration when the spell needs it.",
    "labelKey": "dmAction.label.use_spell_slot",
    "summaryKey": "dmAction.summary.use_spell_slot"
  },
  {
    "name": "learn_spell",
    "label": "Learn a spell",
    "summary": "Adds a spell to what a character knows, or takes one away.",
    "labelKey": "dmAction.label.learn_spell",
    "summaryKey": "dmAction.summary.learn_spell"
  },
  {
    "name": "update_sheet",
    "label": "Correct a sheet",
    "summary": "For what the other actions do not cover. Everything is audited and undoable.",
    "labelKey": "dmAction.label.update_sheet",
    "summaryKey": "dmAction.summary.update_sheet"
  },
  {
    "name": "take_rest",
    "label": "Rest",
    "summary": "A short or long rest for the whole party, on the table's rest variant.",
    "labelKey": "dmAction.label.take_rest",
    "summaryKey": "dmAction.summary.take_rest"
  },
  {
    "name": "add_companion",
    "label": "Add a companion",
    "summary": "Builds an AI-played party member or scene ally with a real sheet.",
    "labelKey": "dmAction.label.add_companion",
    "summaryKey": "dmAction.summary.add_companion"
  },
  {
    "name": "dismiss_companion",
    "label": "Dismiss a companion",
    "summary": "Writes an AI-played ally out of the party.",
    "labelKey": "dmAction.label.dismiss_companion",
    "summaryKey": "dmAction.summary.dismiss_companion"
  },
  {
    "name": "move_party",
    "label": "Move the party",
    "summary": "Takes the party somewhere, making the place if it is new and mapping it if they can see.",
    "labelKey": "dmAction.label.move_party",
    "summaryKey": "dmAction.summary.move_party"
  },
  {
    "name": "update_location",
    "label": "Change the place",
    "summary": "Rewrites where the party already is and redraws the map when the layout moved.",
    "labelKey": "dmAction.label.update_location",
    "summaryKey": "dmAction.summary.update_location"
  },
  {
    "name": "travel",
    "label": "Travel",
    "summary": "Hours (or miles) on the road at a pace, with the distance covered and the forced-march saves that come with it.",
    "labelKey": "dmAction.label.travel",
    "summaryKey": "dmAction.summary.travel"
  },
  {
    "name": "start_scene",
    "label": "Start a structured scene",
    "summary": "A clock for a chase, a negotiation or a crossing: N successes before M failures.",
    "labelKey": "dmAction.label.start_scene",
    "summaryKey": "dmAction.summary.start_scene"
  },
  {
    "name": "scene_check",
    "label": "One attempt in the scene",
    "summary": "Rolls a character's check and moves the scene's clock.",
    "labelKey": "dmAction.label.scene_check",
    "summaryKey": "dmAction.summary.scene_check"
  },
  {
    "name": "end_scene",
    "label": "Call off the scene",
    "summary": "Ends a structured scene that stopped mattering. One that resolves ends itself.",
    "labelKey": "dmAction.label.end_scene",
    "summaryKey": "dmAction.summary.end_scene"
  },
  {
    "name": "mount_up",
    "label": "Get on a mount",
    "summary": "Puts a character on a mount, at the mount's speed and half their movement.",
    "labelKey": "dmAction.label.mount_up",
    "summaryKey": "dmAction.summary.mount_up"
  },
  {
    "name": "dismount",
    "label": "Get off a mount",
    "summary": "Deliberately, or thrown: then it calls for the DC 10 Dexterity save.",
    "labelKey": "dmAction.label.dismount",
    "summaryKey": "dmAction.summary.dismount"
  },
  {
    "name": "set_weather",
    "label": "Set the weather",
    "summary": "Overrules the sky the server rolled; light, Perception, ranged attacks and travel follow it.",
    "labelKey": "dmAction.label.set_weather",
    "summaryKey": "dmAction.summary.set_weather"
  },
  {
    "name": "pass_time",
    "label": "Time passes",
    "summary": "Moves the in-world clock forward. Travel and rests move it themselves.",
    "labelKey": "dmAction.label.pass_time",
    "summaryKey": "dmAction.summary.pass_time"
  },
  {
    "name": "roll_treasure",
    "label": "Roll treasure",
    "summary": "Rolls a hoard on the DMG tables for a challenge rating and hands it out.",
    "labelKey": "dmAction.label.roll_treasure",
    "summaryKey": "dmAction.summary.roll_treasure"
  },
  {
    "name": "damage_object",
    "label": "Break something",
    "summary": "Doors, chests and chains with real AC and hit points for their material.",
    "labelKey": "dmAction.label.damage_object",
    "summaryKey": "dmAction.summary.damage_object"
  },
  {
    "name": "group_check",
    "label": "Group check",
    "summary": "Everyone rolls the same check at once and the server totals who made it.",
    "labelKey": "dmAction.label.group_check",
    "summaryKey": "dmAction.summary.group_check"
  },
  {
    "name": "check_notice",
    "label": "Passive notice",
    "summary": "Compares passive Perception, Insight or Investigation against a DC without anyone rolling.",
    "labelKey": "dmAction.label.check_notice",
    "summaryKey": "dmAction.summary.check_notice"
  },
  {
    "name": "set_npc",
    "label": "Write an NPC",
    "summary": "Creates or updates a person the party can deal with, and how they feel about them.",
    "labelKey": "dmAction.label.set_npc",
    "summaryKey": "dmAction.summary.set_npc"
  },
  {
    "name": "npc_reaction",
    "label": "Reaction roll",
    "summary": "Rolls how an NPC takes the party on the DMG reaction table.",
    "labelKey": "dmAction.label.npc_reaction",
    "summaryKey": "dmAction.summary.npc_reaction"
  },
  {
    "name": "social_check",
    "label": "Social check",
    "summary": "Persuade, deceive or intimidate, against a DC set by how the NPC already feels.",
    "labelKey": "dmAction.label.social_check",
    "summaryKey": "dmAction.summary.social_check"
  },
  {
    "name": "relationship_beat",
    "label": "Relationship beat",
    "summary": "Moves a bond between a character and an NPC forward or back.",
    "labelKey": "dmAction.label.relationship_beat",
    "summaryKey": "dmAction.summary.relationship_beat"
  },
  {
    "name": "romance_advance",
    "label": "Romance",
    "summary": "Advances a romance a stage, within the table's own limits.",
    "labelKey": "dmAction.label.romance_advance",
    "summaryKey": "dmAction.summary.romance_advance"
  },
  {
    "name": "relationship_end",
    "label": "End a relationship",
    "summary": "A falling out, a parting, a betrayal or a death.",
    "labelKey": "dmAction.label.relationship_end",
    "summaryKey": "dmAction.summary.relationship_end"
  },
  {
    "name": "request_roll",
    "label": "Ask for a roll",
    "summary": "Asks a player for a check, save or attack; the modifier comes from their sheet.",
    "labelKey": "dmAction.label.request_roll",
    "summaryKey": "dmAction.summary.request_roll"
  },
  {
    "name": "request_player_input",
    "label": "Give the floor",
    "summary": "Hands the moment to named players and waits for them.",
    "labelKey": "dmAction.label.request_player_input",
    "summaryKey": "dmAction.summary.request_player_input"
  },
  {
    "name": "send_whisper",
    "label": "Whisper",
    "summary": "A private line to one player or several; nobody else sees it.",
    "labelKey": "dmAction.label.send_whisper",
    "summaryKey": "dmAction.summary.send_whisper"
  },
  {
    "name": "record_event",
    "label": "Record a milestone",
    "summary": "Something worth remembering months later; it survives every compaction.",
    "labelKey": "dmAction.label.record_event",
    "summaryKey": "dmAction.summary.record_event"
  },
  {
    "name": "complete_beat",
    "label": "Beat achieved",
    "summary": "Marks the arc's current beat done, which is what closes a chapter.",
    "labelKey": "dmAction.label.complete_beat",
    "summaryKey": "dmAction.summary.complete_beat"
  },
  {
    "name": "write_campaign_note",
    "label": "Campaign note",
    "summary": "Proposes a note for the table; the lead approves it.",
    "labelKey": "dmAction.label.write_campaign_note",
    "summaryKey": "dmAction.summary.write_campaign_note"
  },
  {
    "name": "recall_story",
    "label": "Recall a chapter",
    "summary": "Pulls a sealed chapter back up, by number or by what you remember of it.",
    "labelKey": "dmAction.label.recall_story",
    "summaryKey": "dmAction.summary.recall_story"
  },
  {
    "name": "search_lore",
    "label": "Search lore",
    "summary": "Searches the campaign's own lore entries.",
    "labelKey": "dmAction.label.search_lore",
    "summaryKey": "dmAction.summary.search_lore"
  },
  {
    "name": "generate_image",
    "label": "Illustrate",
    "summary": "Draws the scene, and hangs it under your latest passage.",
    "labelKey": "dmAction.label.generate_image",
    "summaryKey": "dmAction.summary.generate_image"
  },
  {
    "name": "set_ambience",
    "label": "Set the sound",
    "summary": "Changes the ambience bed, the music, or both. Leave a layer blank to keep it.",
    "labelKey": "dmAction.label.set_ambience",
    "summaryKey": "dmAction.summary.set_ambience"
  },
  {
    "name": "show_title",
    "label": "Show a title card",
    "summary": "A few words on every screen for a moment: a chapter, a place, a reveal.",
    "labelKey": "dmAction.label.show_title",
    "summaryKey": "dmAction.summary.show_title"
  },
  {
    "name": "play_sting",
    "label": "Play a sound",
    "summary": "One sound, once, over whatever is playing. Changes nothing else.",
    "labelKey": "dmAction.label.play_sting",
    "summaryKey": "dmAction.summary.play_sting"
  },
  {
    "name": "show_handout",
    "label": "Show a handout",
    "summary": "Put a lore entry or a picture on every player's screen until you take it down.",
    "labelKey": "dmAction.label.show_handout",
    "summaryKey": "dmAction.summary.show_handout"
  },
  {
    "name": "dismiss_handout",
    "label": "Take the handout down",
    "summary": "Clears the handout from every screen.",
    "labelKey": "dmAction.label.dismiss_handout",
    "summaryKey": "dmAction.summary.dismiss_handout"
  },
  {
    "name": "set_quest",
    "label": "Write a quest",
    "summary": "Add a quest to the party's log, or change one: its title, objectives and status.",
    "labelKey": "dmAction.label.set_quest",
    "summaryKey": "dmAction.summary.set_quest"
  },
  {
    "name": "tick_objective",
    "label": "Tick an objective",
    "summary": "Mark one step of a quest done. When every step is done the quest is.",
    "labelKey": "dmAction.label.tick_objective",
    "summaryKey": "dmAction.summary.tick_objective"
  },
  {
    "name": "adjust_reputation",
    "label": "Adjust standing with a faction",
    "summary": "Move the party's reputation with a faction a step or two, minus five to five. Their members' social checks lean on it.",
    "labelKey": "dmAction.label.adjust_reputation",
    "summaryKey": "dmAction.summary.adjust_reputation"
  },
  {
    "name": "faction_note",
    "label": "Note a faction move",
    "summary": "Record what a faction did or holds as a world fact.",
    "labelKey": "dmAction.label.faction_note",
    "summaryKey": "dmAction.summary.faction_note"
  },
  {
    "name": "generate_settlement",
    "label": "Populate this place",
    "summary": "Invent the people, shops, rumours and a hook for the party's current place.",
    "labelKey": "dmAction.label.generate_settlement",
    "summaryKey": "dmAction.summary.generate_settlement"
  },
  {
    "name": "open_shop",
    "label": "Open a shop here",
    "summary": "Stock a shop at the party's place from the content pack, at the settlement's markup.",
    "labelKey": "dmAction.label.open_shop",
    "summaryKey": "dmAction.summary.open_shop"
  },
  {
    "name": "buy_item",
    "label": "Buy from a shop",
    "summary": "The shelf sets the price; the purse decides.",
    "labelKey": "dmAction.label.buy_item",
    "summaryKey": "dmAction.summary.buy_item"
  },
  {
    "name": "sell_item",
    "label": "Sell to a shop",
    "summary": "The keeper pays half list; name a price only for what the pack does not know.",
    "labelKey": "dmAction.label.sell_item",
    "summaryKey": "dmAction.summary.sell_item"
  },
  {
    "name": "haggle",
    "label": "Haggle",
    "summary": "A Persuasion check: win and every price drops a step, lose and they rise one. Once per character per shop.",
    "labelKey": "dmAction.label.haggle",
    "summaryKey": "dmAction.summary.haggle"
  },
  {
    "name": "lift",
    "label": "Lift, push or drag",
    "summary": "Checks a heavy load against the character's Strength: 30 x Strength at most, 5 feet of speed past their carrying capacity.",
    "labelKey": "dmAction.label.lift",
    "summaryKey": "dmAction.summary.lift"
  },
  {
    "name": "set_lifestyle",
    "label": "Set lifestyle",
    "summary": "The lifestyle characters live in town; each dawn that passes there and each day of downtime is charged to their purse.",
    "labelKey": "dmAction.label.set_lifestyle",
    "summaryKey": "dmAction.summary.set_lifestyle"
  },
  {
    "name": "downtime",
    "label": "Downtime",
    "summary": "Days between adventures on one activity: crafting, a profession, recuperating, research or training. Moves the clock, charges the costs, keeps the progress.",
    "labelKey": "dmAction.label.downtime",
    "summaryKey": "dmAction.summary.downtime"
  },
  {
    "name": "afflict",
    "label": "Disease, madness or poison",
    "summary": "Lays a disease, madness or poison on a character, the SRD's or one from this table's workshop: the server rolls the save and holds what follows.",
    "labelKey": "dmAction.label.afflict",
    "summaryKey": "dmAction.summary.afflict"
  }
] as const;
