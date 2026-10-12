import { defineMessages } from "./catalog.ts";

// Original Chinese translations of bundled background introductions/help.
// Source identities and their existing attributions remain in src/lib/srd/backgrounds.json
// and src/lib/backgrounds/catalog.json. Full rulebooks are outside this catalog.
export const BACKGROUND_MATERIAL_MESSAGES = /*#__PURE__*/ defineMessages({
  "callingMaterial.background.frame": {
    "en": "**Feature: {feature}.**{description}",
    "zh-CN": "**特性：{feature}。**{description}"
  },
  "callingMaterial.background.acolyte.blurb": {
    "en": "You served in a temple, learning its rites and its politics, and the faithful still owe you shelter.",
    "zh-CN": "你曾在神殿侍奉，熟悉仪式与内部人情，信徒们仍愿为你提供庇护。"
  },
  "callingMaterial.background.acolyte.feature": {
    "en": "Shelter of the Faithful",
    "zh-CN": "信徒庇护"
  },
  "callingMaterial.background.acolyte.featureDesc": {
    "en": "As a servant of your faith, you and your companions can expect free healing and care at any temple, shrine or other establishment of your religion, though you must provide the material components for spells. Its priests will support you in ways that do not risk their lives, and you may have ties to one temple in particular.",
    "zh-CN": "作为信仰的侍奉者，你和同伴可在所属宗教的神殿、圣所等场所获得免费治疗和照料，但须自行提供法术的材料成分。祭司愿在不危及自身性命的前提下支持你，你也可能与某座神殿保持特别的联系。"
  },
  "callingMaterial.background.charlatan.blurb": {
    "en": "You lived by your wits and a hundred false faces, and you always have another identity ready.",
    "zh-CN": "你靠机智和百变假面谋生，随时准备着另一个身份。"
  },
  "callingMaterial.background.charlatan.feature": {
    "en": "False Identity",
    "zh-CN": "虚假身份"
  },
  "callingMaterial.background.charlatan.featureDesc": {
    "en": "You have a second identity with documents, established acquaintances and disguises to match. You can also forge documents, including official papers and personal letters, as long as you have seen an example of the kind you are trying to copy.",
    "zh-CN": "你拥有第二个身份，配有相应证件、熟人关系和伪装。只要见过同类样本，也能伪造文件，包括公文和私人信件。"
  },
  "callingMaterial.background.criminal.blurb": {
    "en": "You made your living breaking the law, and you still know who to call in the underworld.",
    "zh-CN": "你曾以违法手段谋生，至今仍知道该找哪位地下世界的熟人。"
  },
  "callingMaterial.background.criminal.feature": {
    "en": "Criminal Contact",
    "zh-CN": "犯罪联系人"
  },
  "callingMaterial.background.criminal.featureDesc": {
    "en": "You have a reliable and trustworthy contact in the criminal underworld. You know how to get messages to and from them, even over great distances, through the local messengers, corrupt caravan masters and seedy sailors who carry them.",
    "zh-CN": "你在地下世界拥有可靠、可信的联系人。即使相隔遥远，也知道如何借助当地信使、腐败的商队首领和可疑水手，与对方传递消息。"
  },
  "callingMaterial.background.entertainer.blurb": {
    "en": "You performed for crowds and courts, and any tavern will trade a bed for a show.",
    "zh-CN": "你曾为人群和宫廷表演，酒馆也愿用一张床换取你的节目。"
  },
  "callingMaterial.background.entertainer.feature": {
    "en": "By Popular Demand",
    "zh-CN": "广受欢迎"
  },
  "callingMaterial.background.entertainer.featureDesc": {
    "en": "You can always find a place to perform, usually an inn or tavern but sometimes a circus, a theater or a noble's court. In return you receive free lodging and food of a modest standard for as long as you perform each night, and your performance makes you a local figure whom strangers tend to like.",
    "zh-CN": "你总能找到表演场所，通常是旅店或酒馆，也可能是马戏团、剧院或贵族宫廷。只要每晚演出，就能获得朴素标准的免费食宿；表演也使你成为当地名人，陌生人往往对你抱有好感。"
  },
  "callingMaterial.background.folk_hero.blurb": {
    "en": "You stood up for the common folk when it mattered, and they remember.",
    "zh-CN": "在最需要有人挺身而出时，你站在了普通人一边，他们至今记得。"
  },
  "callingMaterial.background.folk_hero.feature": {
    "en": "Rustic Hospitality",
    "zh-CN": "乡民款待"
  },
  "callingMaterial.background.folk_hero.featureDesc": {
    "en": "Since you come from the ranks of the common folk, you fit in among them with ease. You can find a place to hide, rest or recuperate among other commoners unless you have shown yourself to be a danger to them. They will shield you from the law or anyone else searching for you, though they will not risk their lives for you.",
    "zh-CN": "你出身平民，容易融入他们。只要未表现出对他们的威胁，就能在普通人中找到藏身、休息或疗养之处。他们愿帮你躲避追捕，但不会为你冒生命危险。"
  },
  "callingMaterial.background.guild_artisan.blurb": {
    "en": "You are a member in good standing of a craft guild, with its workshops and its lawyers behind you.",
    "zh-CN": "你是工匠公会的正式成员，背后有作坊与法律援助作为支持。"
  },
  "callingMaterial.background.guild_artisan.feature": {
    "en": "Guild Membership",
    "zh-CN": "公会成员资格"
  },
  "callingMaterial.background.guild_artisan.featureDesc": {
    "en": "Your guild will provide you with lodging and food if necessary and pay for your funeral if needed. In some cities a guildhall offers a central place to meet other members. Guilds wield political power: if you are accused of a crime, your guild will support you if a good case can be made, and it can help you gain access to powerful people. Membership costs 5 gp a month in dues.",
    "zh-CN": "必要时，公会会提供食宿，甚至承担葬礼费用。有些城市的公会大厅可供成员聚会。公会拥有政治影响力：若你被指控犯罪且有合理辩护，它会支持你，也能帮助你接触权贵。会费为每月 5 金币。"
  },
  "callingMaterial.background.hermit.blurb": {
    "en": "You lived apart from the world in seclusion, and came back with a discovery.",
    "zh-CN": "你曾远离尘世隐居，归来时带着一项发现。"
  },
  "callingMaterial.background.hermit.feature": {
    "en": "Discovery",
    "zh-CN": "重大发现"
  },
  "callingMaterial.background.hermit.featureDesc": {
    "en": "The quiet seclusion of your hermitage gave you access to a unique and powerful discovery: a great truth, a hidden site, a lost fact, or a secret whose reveal could shake the powerful. Work with the DM to determine what it is and what it means for the campaign.",
    "zh-CN": "隐居的宁静让你获得独特而重要的发现，可能是真理、隐藏地点、遗失知识，或足以动摇权贵的秘密。与 DM 一起决定发现的内容，以及它对战役的意义。"
  },
  "callingMaterial.background.noble.blurb": {
    "en": "You were born to rank and privilege, and doors open for you that stay shut to others.",
    "zh-CN": "你生来拥有地位与特权，别人推不开的门会为你敞开。"
  },
  "callingMaterial.background.noble.feature": {
    "en": "Position of Privilege",
    "zh-CN": "特权地位"
  },
  "callingMaterial.background.noble.featureDesc": {
    "en": "Thanks to your noble birth, people are inclined to think the best of you. You are welcome in high society, and people assume you have the right to be wherever you are. The common folk make every effort to accommodate you, other people of high birth treat you as a member of the same social sphere, and you can secure an audience with a local noble if you need to.",
    "zh-CN": "高贵出身使人们倾向于善意看待你。上流社会欢迎你，并认为你有权出现在所在之处。平民尽力照顾你的要求，同阶层的人视你为同伴；需要时，你可以获得当地贵族的接见。"
  },
  "callingMaterial.background.outlander.blurb": {
    "en": "You grew up in the wilds far from civilization, and the land still feeds you.",
    "zh-CN": "你在远离文明的荒野长大，土地至今仍能养活你。"
  },
  "callingMaterial.background.outlander.feature": {
    "en": "Wanderer",
    "zh-CN": "荒野漫游者"
  },
  "callingMaterial.background.outlander.featureDesc": {
    "en": "You have an excellent memory for maps and geography, and you can always recall the general layout of terrain, settlements and other features around you. In addition, you can find food and fresh water for yourself and up to five other people each day, provided the land offers berries, small game, water and so forth.",
    "zh-CN": "你对地图和地理有极好的记忆，总能回想周围地形、聚居地和其他地貌的大致布局。只要当地有浆果、小型猎物、水源等，每天还能为自己及至多五人找到食物和饮水。"
  },
  "callingMaterial.background.sage.blurb": {
    "en": "You spent years among books and scholars, and you know where every answer is kept.",
    "zh-CN": "你在书籍与学者之间度过多年，知道该到哪里寻找答案。"
  },
  "callingMaterial.background.sage.feature": {
    "en": "Researcher",
    "zh-CN": "研究者"
  },
  "callingMaterial.background.sage.featureDesc": {
    "en": "When you attempt to learn or recall a piece of lore, if you do not know it, you often know where and from whom you can obtain it: a library, scriptorium, university, a sage or another learned person or creature. The DM might rule that the knowledge is secret or found only in a hard to reach place.",
    "zh-CN": "尝试了解或回忆知识时，即使不知道答案，你通常也知道该去哪里、向谁求助，例如图书馆、抄写室、大学、贤者或其他博学者。DM 可能判定该知识属于秘密，或只能在难以抵达的地方找到。"
  },
  "callingMaterial.background.sailor.blurb": {
    "en": "You worked the decks of a ship, and captains will take you and your friends aboard for a hand's work.",
    "zh-CN": "你曾在船上工作，船长愿让你和朋友以帮工换取船位。"
  },
  "callingMaterial.background.sailor.feature": {
    "en": "Ship's Passage",
    "zh-CN": "搭船通行"
  },
  "callingMaterial.background.sailor.featureDesc": {
    "en": "When you need to, you can secure free passage on a sailing ship for yourself and your companions. You might sail on the ship you served on or another you have good relations with. Because you are calling in a favor, the ship's schedule and route cannot be guaranteed, and you and your companions are expected to help the crew during the voyage.",
    "zh-CN": "需要时，你能为自己和同伴争取免费的船位，可能来自曾服役的船只或关系良好的其他船只。这是人情，因此无法保证航期与路线，你们也须在航行期间协助船员。"
  },
  "callingMaterial.background.soldier.blurb": {
    "en": "You served in an army, and those who served with you still recognize your rank.",
    "zh-CN": "你曾在军队服役，旧战友至今仍认可你的军阶。"
  },
  "callingMaterial.background.soldier.feature": {
    "en": "Military Rank",
    "zh-CN": "军阶"
  },
  "callingMaterial.background.soldier.featureDesc": {
    "en": "You have a military rank from your career as a soldier. Soldiers loyal to your former organization still recognize your authority and influence, and they defer to you if they are of a lower rank. You can invoke your rank to exert influence over other soldiers and requisition simple equipment or horses for temporary use, and you can usually gain access to friendly military encampments and fortresses where your rank is recognized.",
    "zh-CN": "你拥有服役时期的军阶。忠于旧组织的士兵仍认可你的权威，低阶士兵会服从你。你可借军阶影响其他士兵，临时征用简单装备或马匹，也通常能进入认可你军阶的友军营地和堡垒。"
  },
  "callingMaterial.background.urchin.blurb": {
    "en": "You grew up alone on the streets, and you know the city's hidden ways better than anyone.",
    "zh-CN": "你独自在街头长大，比任何人都熟悉城市的隐秘通道。"
  },
  "callingMaterial.background.urchin.feature": {
    "en": "City Secrets",
    "zh-CN": "城市秘径"
  },
  "callingMaterial.background.urchin.featureDesc": {
    "en": "You know the secret patterns and flow to cities and can find passages through the urban sprawl that others would miss. When you are not in combat, you and companions you lead can travel between any two locations in a city twice as fast as your speed would normally allow.",
    "zh-CN": "你了解城市隐秘的结构与流动，能找到他人忽略的通路。非战斗时，你带领的同伴在城内两地之间移动，所需时间可缩短一半。"
  },
  "callingMaterial.background.corpo_dropout.blurb": {
    "en": "You walked out of a megacorp tower with insider skills, a few secrets, and a target on your back.",
    "zh-CN": "你带着内部技能、几项秘密和追捕者的目光，走出了巨型企业大楼。"
  },
  "callingMaterial.background.corpo_dropout.feature": {
    "en": "Severance Package",
    "zh-CN": "离职遗产"
  },
  "callingMaterial.background.corpo_dropout.featureDesc": {
    "en": "You still hold a valid corporate ID from your old employer. It gets you past lobby security and into the lower floors of any megacorp tower, and a former colleague will still take your call, though not risk their job for you.",
    "zh-CN": "你仍持有旧雇主的有效企业证件，能通过大厅安保，进入巨型企业大楼的低层。一位旧同事仍愿接你的电话，但不会为你冒丢掉工作的风险。"
  },
  "callingMaterial.background.street_doc.blurb": {
    "en": "You patch up runners in an unlicensed clinic. No questions, credits up front, favors remembered.",
    "zh-CN": "你在无证诊所为街头行动者治伤，不问来历，先收报酬，也记得人情。"
  },
  "callingMaterial.background.street_doc.feature": {
    "en": "Back-Alley Clinic",
    "zh-CN": "后巷诊所"
  },
  "callingMaterial.background.street_doc.featureDesc": {
    "en": "You know where to find unlicensed care in any district, and its staff will treat you and your crew first, discreetly, and on credit. In return you are expected to bring business and keep quiet about what you see.",
    "zh-CN": "你知道各区哪里有无证医疗服务。工作人员会优先、保密地治疗你和同伴，也允许赊账；作为交换，你须带来生意，并对所见之事守口如瓶。"
  },
  "callingMaterial.background.fixers_runner.blurb": {
    "en": "You moved packages and secrets for a fixer; half the undercity owes you or is owed by you.",
    "zh-CN": "你替中间人运送包裹和秘密，地下城有一半的人与你互欠人情。"
  },
  "callingMaterial.background.fixers_runner.feature": {
    "en": "Favor Network",
    "zh-CN": "人情网络"
  },
  "callingMaterial.background.fixers_runner.featureDesc": {
    "en": "Half the undercity owes you a small favor or is owed one. Once per session you can call one in: a safe room for the night, a name, a ride, or a package moved without questions.",
    "zh-CN": "地下城有一半的人与你互欠小人情。每场游戏可兑现一次，例如一晚安全住处、一个名字、一趟车，或一次不问缘由的包裹递送。"
  },
  "callingMaterial.background.arcology_rat.blurb": {
    "en": "You grew up in the maintenance ducts of an arcology and know every vent, camera blind spot, and cargo lift.",
    "zh-CN": "你在生态城的维护管道中长大，熟悉通风口、监控盲区和货运升降机。"
  },
  "callingMaterial.background.arcology_rat.feature": {
    "en": "Service Tunnels",
    "zh-CN": "维护通道"
  },
  "callingMaterial.background.arcology_rat.featureDesc": {
    "en": "You can find a maintenance route into or through any arcology or corporate block that others would miss. When you lead the party through the ducts, you travel between two points in the structure twice as fast.",
    "zh-CN": "你能找到他人忽略的维护路线，进入或穿过生态城和企业街区。带领队伍穿行管道时，在建筑内两点之间移动的时间可缩短一半。"
  },
  "callingMaterial.background.chrome_pit_fighter.blurb": {
    "en": "You fought augmented brawlers in the cage circuit, and the crowds still chant your handle.",
    "zh-CN": "你曾在笼斗赛场与改造斗士搏杀，观众至今仍高呼你的绰号。"
  },
  "callingMaterial.background.chrome_pit_fighter.feature": {
    "en": "Ring Reputation",
    "zh-CN": "擂台名声"
  },
  "callingMaterial.background.chrome_pit_fighter.featureDesc": {
    "en": "Fight crowds remember your handle. In any gym, cage or betting den you can find a place to sleep, a meal and a sparring partner, and a promoter will always have work for a fighter with a name.",
    "zh-CN": "格斗观众记得你的绰号。在健身房、笼斗场或赌档，你能找到住处、饭食和陪练；对于有名气的斗士，赛事组织者总有工作可给。"
  },
  "callingMaterial.background.data_courier.blurb": {
    "en": "You carried encrypted payloads through hostile grid sectors, sometimes in your own headware.",
    "zh-CN": "你曾穿过敌对网络区域运送加密数据，有时把它藏在自己的脑内设备中。"
  },
  "callingMaterial.background.data_courier.feature": {
    "en": "Dead Drop Protocol",
    "zh-CN": "死信箱协议"
  },
  "callingMaterial.background.data_courier.featureDesc": {
    "en": "You know the couriers' dead drops and handshakes. You can leave or collect a message or a small package in any city without meeting the other party, and no one can trace it to you.",
    "zh-CN": "你了解信使的秘密投递点与接头方式。在任何城市，都能不与对方见面就留下或收取消息、小包裹，而且不会有人追溯到你。"
  },
  "callingMaterial.background.guild_engineer.blurb": {
    "en": "A certified member of the engineers' guild, welcome in any workshop and fluent in blueprints.",
    "zh-CN": "你是工程师公会认证的成员，任何作坊都欢迎你，也精通图纸。"
  },
  "callingMaterial.background.guild_engineer.feature": {
    "en": "Guild Credentials",
    "zh-CN": "公会资质"
  },
  "callingMaterial.background.guild_engineer.featureDesc": {
    "en": "Your guild card is honored in any workshop, foundry or engineering hall. You can borrow tools and a bench, read the guild's blueprints, and expect lodging from a fellow member, provided your dues are paid.",
    "zh-CN": "你的公会证在作坊、铸造厂和工程大厅都受认可。只要缴清会费，就能借用工具和工作台、查阅公会图纸，并得到其他成员提供的住处。"
  },
  "callingMaterial.background.airship_deckhand.blurb": {
    "en": "You crewed a trade airship, splicing rigging in gales and trading gossip in every port tower.",
    "zh-CN": "你曾在商用飞艇上服役，在狂风中修补索具，也在各港口塔交换消息。"
  },
  "callingMaterial.background.airship_deckhand.feature": {
    "en": "Skyline Contacts",
    "zh-CN": "空港人脉"
  },
  "callingMaterial.background.airship_deckhand.featureDesc": {
    "en": "Every port tower has someone who crewed with you. You can secure passage on an airship for yourself and your companions in exchange for working the rigging, and you hear the gossip of the docks before it reaches the ground.",
    "zh-CN": "每座港口塔都有与你共事过的人。你和同伴可用维护索具换取飞艇船位，也能比地面上的人更早听到码头消息。"
  },
  "callingMaterial.background.clockwork_apprentice.blurb": {
    "en": "You served a master artificer, winding automata and learning which gears hide the maker's tricks.",
    "zh-CN": "你曾侍奉奇械大师，为自动机械上发条，并学习辨认藏在齿轮间的巧思。"
  },
  "callingMaterial.background.clockwork_apprentice.feature": {
    "en": "Tinker's Eye",
    "zh-CN": "巧匠之眼"
  },
  "callingMaterial.background.clockwork_apprentice.featureDesc": {
    "en": "Having wound and repaired a master's automata, you can tell at a glance how a clockwork device is meant to work, where its maker hid the override, and whether it has been tampered with.",
    "zh-CN": "你曾为大师的自动机械上发条、维修。如今一眼就能看出发条装置的用途、制作者藏下的控制机关，以及它是否被人改动过。"
  },
  "callingMaterial.background.union_stoker.blurb": {
    "en": "You shoveled coal in the great engine halls, and the laborers' union still counts you as family.",
    "zh-CN": "你曾在大型机房铲煤，劳工工会至今仍把你当作自己人。"
  },
  "callingMaterial.background.union_stoker.feature": {
    "en": "Boiler Room Brotherhood",
    "zh-CN": "锅炉房兄弟会"
  },
  "callingMaterial.background.union_stoker.featureDesc": {
    "en": "The laborers' union counts you as family. Its halls will feed and hide you, its stokers pass you word of what moves through the engine rooms, and a picket line will open for you.",
    "zh-CN": "劳工工会把你当作家人。工会大厅愿提供饭食和藏身处，司炉工会传来机房里的消息，纠察线也会为你放行。"
  },
  "callingMaterial.background.aether_scholar.blurb": {
    "en": "You studied the aether sciences at a famous academy and can talk your way into any symposium.",
    "zh-CN": "你曾在著名学府研究以太科学，凭口才就能进入任何研讨会。"
  },
  "callingMaterial.background.aether_scholar.feature": {
    "en": "Lecture Circuit",
    "zh-CN": "学术巡讲"
  },
  "callingMaterial.background.aether_scholar.featureDesc": {
    "en": "Your academy name gets you into any symposium, salon or laboratory. Scholars will hear you out, share their notes, and put you up for a night, expecting a lecture in return.",
    "zh-CN": "学院名声能让你进入研讨会、沙龙和实验室。学者愿听取你的观点、分享笔记，也能让你留宿一晚，但会期待一场讲座作为回报。"
  },
  "callingMaterial.background.constabulary_inspector.blurb": {
    "en": "You walked a beat and closed cases for the city constabulary before turning in your badge.",
    "zh-CN": "你曾在城市警队巡街、破案，后来交还了警徽。"
  },
  "callingMaterial.background.constabulary_inspector.feature": {
    "en": "Old Warrant Card",
    "zh-CN": "旧警官证"
  },
  "callingMaterial.background.constabulary_inspector.featureDesc": {
    "en": "Your retired warrant card still turns heads. Constables will speak to you as a colleague, show you a case file if asked quietly, and overlook a minor infraction, unless their captain is watching.",
    "zh-CN": "你的退休警官证仍有分量。警员会把你当作同事，私下给你看卷宗，也愿忽略轻微违规，只要队长不在旁边。"
  },
  "callingMaterial.background.vault_born.blurb": {
    "en": "Raised in a sealed shelter on old-world books and drills, you stepped outside knowing everything but the wasteland.",
    "zh-CN": "你在密封避难所中研读旧世界书籍、接受训练，走出时熟悉一切，唯独不懂荒原。"
  },
  "callingMaterial.background.vault_born.feature": {
    "en": "Vault Schooling",
    "zh-CN": "避难所教育"
  },
  "callingMaterial.background.vault_born.featureDesc": {
    "en": "You were taught from the old world's books. You can read pre-war signage, manuals and maps, and you know what a ruin was for and where its stores, generators and exits should be.",
    "zh-CN": "你从旧世界书籍中学习，能阅读战前标识、手册和地图，也知道遗迹原本的用途，以及仓库、发电机和出口应在何处。"
  },
  "callingMaterial.background.wasteland_scavenger.blurb": {
    "en": "You strip ruins for parts and provisions, and you can tell worthwhile salvage from scrap at a glance.",
    "zh-CN": "你在废墟中寻找零件和物资，一眼就能分辨值得回收的东西与废料。"
  },
  "callingMaterial.background.wasteland_scavenger.feature": {
    "en": "Salvager's Nose",
    "zh-CN": "拾荒嗅觉"
  },
  "callingMaterial.background.wasteland_scavenger.featureDesc": {
    "en": "You can tell worthwhile salvage from scrap at a glance. When you search a ruin, you find the parts, fuel and provisions others overlook, and you know which merchant will pay for them.",
    "zh-CN": "你一眼就能分辨有价值的回收物与废料。搜索遗迹时，能找到他人漏掉的零件、燃料和补给，也知道谁愿意收购它们。"
  },
  "callingMaterial.background.caravan_guard.blurb": {
    "en": "You escorted traders between settlements, and every waystation on the route knows your face.",
    "zh-CN": "你曾护送商人穿行聚居地之间，沿途每座驿站都认识你。"
  },
  "callingMaterial.background.caravan_guard.feature": {
    "en": "Trade Road Contacts",
    "zh-CN": "商路人脉"
  },
  "callingMaterial.background.caravan_guard.featureDesc": {
    "en": "Every waystation and caravanserai on the routes you guarded knows your face. You and your companions can expect a meal, a bunk and the latest news of the road wherever a caravan stops.",
    "zh-CN": "你护送过的商路上，驿站和商队旅舍都认识你。你和同伴在商队停靠处可获得饭食、床铺和最新的路上消息。"
  },
  "callingMaterial.background.cult_escapee.blurb": {
    "en": "You fled a doomsday congregation and can still recite its liturgy well enough to pass as faithful.",
    "zh-CN": "你逃离了末日教团，至今仍能熟练背诵祷文，伪装成信徒。"
  },
  "callingMaterial.background.cult_escapee.feature": {
    "en": "Doctrine Fluency",
    "zh-CN": "教义精通"
  },
  "callingMaterial.background.cult_escapee.featureDesc": {
    "en": "You can recite the congregation's liturgy and signs well enough to pass as one of the faithful. Cultists take you for a believer until you give them reason not to.",
    "zh-CN": "你熟悉教团的祷文和暗号，足以假扮信徒。在你露出破绽之前，教徒会将你视为自己人。"
  },
  "callingMaterial.background.rad_zone_guide.blurb": {
    "en": "You lead travelers through glowing craters and storm fronts, reading hazards the way sailors read weather.",
    "zh-CN": "你带人穿越发光的陨坑与风暴前沿，像水手识天气一样辨认危险。"
  },
  "callingMaterial.background.rad_zone_guide.feature": {
    "en": "Safe Passage",
    "zh-CN": "安全通行"
  },
  "callingMaterial.background.rad_zone_guide.featureDesc": {
    "en": "You read the wasteland the way sailors read weather. When you lead the party, you sense storms, radiation and hostile ground before they reach you, and you can always find a route around them.",
    "zh-CN": "你解读荒原，就像水手解读天气。带领队伍时，能在风暴、辐射和危险地形逼近前察觉，并总能找到绕行路线。"
  },
  "callingMaterial.background.settlement_medic.blurb": {
    "en": "You kept a settlement alive with scavenged medicine and steady hands when the raiders came.",
    "zh-CN": "掠夺者来袭时，你靠搜集来的药品与稳定的双手，维系了一座聚居地的生命。"
  },
  "callingMaterial.background.settlement_medic.feature": {
    "en": "Triage Instinct",
    "zh-CN": "分诊直觉"
  },
  "callingMaterial.background.settlement_medic.featureDesc": {
    "en": "You can tell at a glance who is dying, who is faking and what killed the ones who did not make it. Settlements will shelter a medic, and their people will bring you what supplies they have.",
    "zh-CN": "你一眼就能看出谁濒死、谁在装病，以及没能活下来的人死于什么。聚居地愿庇护医者，居民也会把仅有的医疗物资交给你。"
  },
  "callingMaterial.background.grave_digger.blurb": {
    "en": "You tend the churchyard and its dead, and you know which graves are best left undisturbed.",
    "zh-CN": "你照料教堂墓地与死者，知道哪些坟墓最好别动。"
  },
  "callingMaterial.background.grave_digger.feature": {
    "en": "Consecrated Ground",
    "zh-CN": "祝圣之地"
  },
  "callingMaterial.background.grave_digger.featureDesc": {
    "en": "You know every graveyard's layout and which graves are best left alone. The dead do not rise on ground you have tended, and church wardens will shelter you among the tombs.",
    "zh-CN": "你熟悉墓地布局，知道哪些坟墓不应打扰。经你照料的土地上，死者不会复起；教堂守墓人也愿让你在墓间避宿。"
  },
  "callingMaterial.background.asylum_survivor.blurb": {
    "en": "They locked you away for what you claimed to see. You were right, and you learned to read people to get out.",
    "zh-CN": "你因声称看见某些事物而被囚禁。你说的是真的，也为逃离学会了察言观色。"
  },
  "callingMaterial.background.asylum_survivor.feature": {
    "en": "Seen Behind the Veil",
    "zh-CN": "窥见帷幕后"
  },
  "callingMaterial.background.asylum_survivor.featureDesc": {
    "en": "Having been locked away for telling the truth, you can tell when someone is lying about what they have seen, and other survivors of the veil will speak with you when they will speak with no one else.",
    "zh-CN": "你曾因说出真相而被囚禁，能够辨认人们何时在隐瞒所见。其他见过帷幕后事物的幸存者，愿对你诉说不肯告诉旁人的秘密。"
  },
  "callingMaterial.background.occult_librarian.blurb": {
    "en": "You catalogued books that should not exist and remember exactly where the worst ones are shelved.",
    "zh-CN": "你编目过本不该存在的书籍，清楚记得最危险的书放在哪一架。"
  },
  "callingMaterial.background.occult_librarian.feature": {
    "en": "Forbidden Stacks",
    "zh-CN": "禁书书库"
  },
  "callingMaterial.background.occult_librarian.featureDesc": {
    "en": "You remember where the worst books are shelved. In any library or archive you can find the restricted collection, and you know which volume holds the answer, though not always the cost of reading it.",
    "zh-CN": "你记得最危险的书放在哪里。在图书馆或档案馆中，能找到受限馆藏，知道哪册书藏着答案，却未必知道阅读的代价。"
  },
  "callingMaterial.background.seance_medium.blurb": {
    "en": "You hold sittings for the grieving. Most nights it is theater; some nights something answers.",
    "zh-CN": "你为哀悼者主持降灵会。多数夜晚只是表演，少数夜晚却真有回应。"
  },
  "callingMaterial.background.seance_medium.feature": {
    "en": "Voices Beyond",
    "zh-CN": "彼岸之声"
  },
  "callingMaterial.background.seance_medium.featureDesc": {
    "en": "You can hold a sitting for the grieving. Usually it is theater, and it pays. Sometimes something answers, and when it does, you are the one it speaks through.",
    "zh-CN": "你能为哀悼者主持降灵会。通常只是谋生的表演，偶尔却有东西回应；那时，你就是它开口的媒介。"
  },
  "callingMaterial.background.cursed_bloodline.blurb": {
    "en": "Your family name opens doors and ends conversations; everyone has heard what happens to your kin.",
    "zh-CN": "你的姓氏能打开门，也能让交谈戛然而止；人人都听过你家族的遭遇。"
  },
  "callingMaterial.background.cursed_bloodline.feature": {
    "en": "Family Secret",
    "zh-CN": "家族秘密"
  },
  "callingMaterial.background.cursed_bloodline.featureDesc": {
    "en": "Your family name is known. It opens doors among those who fear it and closes them among those who know what it means, and once per session it turns aside a threat that would rather not cross your kin.",
    "zh-CN": "你的姓氏广为人知，会使畏惧它的人开门，也使知晓其含义的人关门。每场游戏一次，它能使不愿得罪你家族的威胁退却。"
  },
  "callingMaterial.background.night_watchman.blurb": {
    "en": "You walked the town's streets after dark with a lantern and a ring of keys, and you noticed things.",
    "zh-CN": "你提着灯笼、带着钥匙在夜间巡街，也留意到了许多事情。"
  },
  "callingMaterial.background.night_watchman.feature": {
    "en": "Keys to the Town",
    "zh-CN": "城镇钥匙"
  },
  "callingMaterial.background.night_watchman.featureDesc": {
    "en": "You still carry a ring of keys and know which doors they open. After dark you can move through the town unchallenged, and you notice what has changed since your last round.",
    "zh-CN": "你仍带着一串钥匙，知道它们能开哪些门。入夜后能不受盘问地穿行城镇，并察觉自上次巡逻以来的变化。"
  },
  "callingMaterial.background.private_inquiry_agent.blurb": {
    "en": "You take discreet cases for paying clients, and your ledger holds half the town's secrets.",
    "zh-CN": "你替付费客户秘密办案，账本记着半座城镇的秘密。"
  },
  "callingMaterial.background.private_inquiry_agent.feature": {
    "en": "Client Ledger",
    "zh-CN": "客户账簿"
  },
  "callingMaterial.background.private_inquiry_agent.featureDesc": {
    "en": "Your ledger holds half the town's secrets. Once per session you can consult it for a fact about a local person of standing: a debt, an affair, a grudge, or who they were seen with.",
    "zh-CN": "你的账本记着半座城镇的秘密。每场游戏可查阅一次，获知当地有地位者的一项信息，例如债务、私情、积怨，或曾与谁见面。"
  },
  "callingMaterial.background.beat_reporter.blurb": {
    "en": "You chase stories for the local paper, and a press card opens doors that stay shut to strangers.",
    "zh-CN": "你为本地报纸追踪新闻，记者证能打开陌生人推不开的门。"
  },
  "callingMaterial.background.beat_reporter.feature": {
    "en": "Press Credentials",
    "zh-CN": "记者资质"
  },
  "callingMaterial.background.beat_reporter.featureDesc": {
    "en": "A press card opens doors that stay shut to strangers. Officials, witnesses and the wealthy will grant you an interview, and printers will run what you bring them.",
    "zh-CN": "记者证能打开陌生人推不开的门。官员、证人和富人愿接受采访，印刷者也会刊载你提供的材料。"
  },
  "callingMaterial.background.reformed_burglar.blurb": {
    "en": "You went straight years ago, but you still see every house as a puzzle of latches and sight lines.",
    "zh-CN": "你多年前已金盆洗手，却仍把每栋房子看作门锁与视线组成的谜题。"
  },
  "callingMaterial.background.reformed_burglar.feature": {
    "en": "Knows the Locks",
    "zh-CN": "识锁之道"
  },
  "callingMaterial.background.reformed_burglar.featureDesc": {
    "en": "You see every building as a puzzle of latches and sight lines. Given a minute to look, you can say how a place is secured, where its blind spots are, and how you would have gotten in.",
    "zh-CN": "你把建筑看作门锁与视线的谜题。观察一分钟，就能说出防护方式、盲区所在，以及你当年会怎样潜入。"
  },
  "callingMaterial.background.courtroom_clerk.blurb": {
    "en": "You filed the town's suits and wills for years, and you know where every record is buried.",
    "zh-CN": "你多年整理城镇诉讼和遗嘱，知道每份记录藏在哪里。"
  },
  "callingMaterial.background.courtroom_clerk.feature": {
    "en": "Paper Trail",
    "zh-CN": "文书踪迹"
  },
  "callingMaterial.background.courtroom_clerk.featureDesc": {
    "en": "You know where every record is buried. In any courthouse, registry or archive you can find the deed, the will or the filing that matters, and the clerks let you look.",
    "zh-CN": "你知道记录藏在哪里。在法院、登记处或档案馆中，能找到关键的契据、遗嘱或文书，办事员也愿让你查阅。"
  },
  "callingMaterial.background.disgraced_socialite.blurb": {
    "en": "Scandal cost you your standing, but you still know the guest lists, the grudges, and the back stairs.",
    "zh-CN": "丑闻使你失去地位，但你仍熟悉宾客名单、旧怨和后楼梯。"
  },
  "callingMaterial.background.disgraced_socialite.feature": {
    "en": "Old Invitations",
    "zh-CN": "旧日请柬"
  },
  "callingMaterial.background.disgraced_socialite.featureDesc": {
    "en": "Scandal cost you your standing, not your memory. You know the guest lists, the grudges and the back stairs of every great house, and a servant or a faded friend will still let you in.",
    "zh-CN": "丑闻夺走了你的地位，却没夺走记忆。你熟悉名门的宾客名单、旧怨与后楼梯，仆人或旧友仍会放你进去。"
  },
  "callingMaterial.background.police_informant.blurb": {
    "en": "You traded whispers to the law to stay free, and both the precinct and the street think you are theirs.",
    "zh-CN": "你向执法者提供消息换取自由，警署与街头都以为你站在自己一边。"
  },
  "callingMaterial.background.police_informant.feature": {
    "en": "Both Sides of the Badge",
    "zh-CN": "警徽两面"
  },
  "callingMaterial.background.police_informant.featureDesc": {
    "en": "The precinct and the street both think you are theirs. You can get a message to either side, and each will tell you what the other is planning, as long as neither learns you asked.",
    "zh-CN": "警署与街头都认为你是自己人。你能给任一方传话，也能打听另一方的计划，前提是双方都不知道你向对方询问过。"
  },
  "callingMaterial.background.plague_doctor.blurb": {
    "en": "You walked sealed districts in beak and wax, and guards still let your mask through the barricades.",
    "zh-CN": "你戴着鸟嘴面具、裹着蜡衣走过封锁区，守卫至今仍愿让你的面具通过路障。"
  },
  "callingMaterial.background.plague_doctor.feature": {
    "en": "Quarantine Pass",
    "zh-CN": "隔离区通行证"
  },
  "callingMaterial.background.plague_doctor.featureDesc": {
    "en": "Guards still let your mask through the barricades. You can enter and leave sealed districts, and the sick and their families will tell a plague doctor what they tell no one else.",
    "zh-CN": "守卫仍愿让你的面具通过路障。你可出入封锁区，病人和家属也愿向瘟疫医者诉说不肯告诉他人的事情。"
  },
  "callingMaterial.background.witch_hunters_ward.blurb": {
    "en": "Raised by an order that burns the unclean, you can read their trail signs and their warrants.",
    "zh-CN": "你由焚烧不洁之物的组织养大，能够解读他们的路标和通缉令。"
  },
  "callingMaterial.background.witch_hunters_ward.feature": {
    "en": "Hunter's Marks",
    "zh-CN": "猎人标记"
  },
  "callingMaterial.background.witch_hunters_ward.featureDesc": {
    "en": "You can read the order's trail signs and warrants. You know where the hunters have been, whom they are after, and how to pass yourself off as one of their wards when it counts.",
    "zh-CN": "你能读懂该组织的路标和通缉令，知道猎人到过哪里、追捕谁，也知道如何在紧要关头假扮其受庇护者。"
  },
  "callingMaterial.background.penitent_pilgrim.blurb": {
    "en": "You walk the old pilgrim roads atoning for something, and keepers of wayside shrines shelter you.",
    "zh-CN": "你为某件往事赎罪，走在古老朝圣路上，路旁圣所的看守愿庇护你。"
  },
  "callingMaterial.background.penitent_pilgrim.feature": {
    "en": "Roadside Shrines",
    "zh-CN": "路旁圣所"
  },
  "callingMaterial.background.penitent_pilgrim.featureDesc": {
    "en": "Keepers of wayside shrines shelter penitents. On any pilgrim road you can find a shrine that offers you and your companions food, a roof, and word of who passed before you.",
    "zh-CN": "路旁圣所的看守愿庇护悔罪者。在朝圣路上，你总能找到为你和同伴提供食物、屋檐和过客消息的圣所。"
  },
  "callingMaterial.background.sellsword_deserter.blurb": {
    "en": "You abandoned a mercenary company that does not forgive. You know their ways, and they know your name.",
    "zh-CN": "你逃离了一支不肯宽恕逃兵的佣兵团。你熟悉他们的作风，他们也记得你的名字。"
  },
  "callingMaterial.background.sellsword_deserter.feature": {
    "en": "Company Tattoos",
    "zh-CN": "佣兵团纹身"
  },
  "callingMaterial.background.sellsword_deserter.featureDesc": {
    "en": "You know your old company's signs, camps and habits. You can spot its members, predict how it fights, and find its quartermasters, but they know your name and want the desertion settled.",
    "zh-CN": "你了解旧佣兵团的标志、营地和习惯，能认出成员、预测其战法并找到军需官；但他们也认得你，想清算逃兵之事。"
  },
  "callingMaterial.background.crypt_scribe.blurb": {
    "en": "You copied epitaphs and funerary rites in the great necropolis, and its wardens still admit you.",
    "zh-CN": "你曾在大墓园抄写墓志与葬仪，守卫至今仍准许你进入。"
  },
  "callingMaterial.background.crypt_scribe.feature": {
    "en": "Necropolis Access",
    "zh-CN": "墓园通行"
  },
  "callingMaterial.background.crypt_scribe.featureDesc": {
    "en": "The wardens of the great necropolis still admit you. You can enter the tombs, read the funerary rites carved there, and learn what the dead were buried with and why.",
    "zh-CN": "大墓园守卫仍准许你进入。你能走进墓穴，阅读刻在其中的葬仪，并查明死者为何与哪些物品合葬。"
  },
  "callingMaterial.background.beggar_prophet.blurb": {
    "en": "You preach doom on street corners, and the desperate who listen bring you rumors and bread.",
    "zh-CN": "你在街角宣讲末日，绝望的听众带来流言与面包。"
  },
  "callingMaterial.background.beggar_prophet.feature": {
    "en": "Street Congregation",
    "zh-CN": "街头教众"
  },
  "callingMaterial.background.beggar_prophet.featureDesc": {
    "en": "The desperate who hear you preach bring you rumors and bread. In any city you can gather a small congregation within a day, and they will pass you what the streets are saying.",
    "zh-CN": "听你宣讲的绝望者会带来流言和面包。在任何城市，你都能在一天内聚起一小群教众，让他们传来街上的消息。"
  }
});
