import { defineMessages } from "./catalog.ts";

// Board display only. Movement modes, tile costs and camera commands stay canonical.
export const BOARD_CONTROL_MESSAGES = /*#__PURE__*/ defineMessages({
  "boardUi.area.centre": { "en": "Area centre, column", "zh-CN": "区域中心所在列" },
  "boardUi.area.toward": { "en": "Runs toward, column", "zh-CN": "指向位置所在列" },
  "boardUi.panel.view": {"en": "Board view. Scroll or pinch to zoom, drag or use the arrow keys to pan, plus and minus to zoom, 0 to fit.", "zh-CN": "地图视野。滚轮或双指缩放，拖动或方向键平移，加减号缩放，0 显示全图。"},
  "boardUi.panel.drawing": {"en": "Drawing surface", "zh-CN": "绘图区域"},
  "boardUi.panel.attackHint": {"en": "Tap the enemy you attack", "zh-CN": "点击要攻击的敌人"},
  "boardUi.panel.castHint": {"en": "Tap the enemy you cast at", "zh-CN": "点击施法目标"},
  "boardUi.panel.teleportHint": {"en": "Tap the tile it appears on", "zh-CN": "点击出现的位置"},
  "boardUi.panel.yourTurn": {"en": "Your turn", "zh-CN": "你的回合"},
  "boardUi.panel.yourTurnLive": {"en": "Your turn.", "zh-CN": "轮到你的回合。"},
  "boardUi.panel.turn": {"en": "{name}'s turn.", "zh-CN": "轮到{name}的回合。"},
  "boardUi.panel.turnShort": {"en": "{name}'s turn", "zh-CN": "{name}的回合"},
  "boardUi.panel.target": {"en": "{action} · pick a target", "zh-CN": "{action} · 选择目标"},
  "boardUi.panel.cancel": {"en": "Cancel aiming", "zh-CN": "取消瞄准"},
  "boardUi.panel.end": {"en": "End turn", "zh-CN": "结束回合"},
  "boardUi.panel.steering": {"en": "The DM is steering the view", "zh-CN": "DM 正在控制视野"},
  "boardUi.panel.release": {"en": "look around anyway", "zh-CN": "自由查看"},
  "boardUi.panel.explore": {"en": "Exploring", "zh-CN": "探索中"},
  "boardUi.panel.round": {"en": "Round {round}", "zh-CN": "第 {round} 轮"},
  "boardUi.panel.point": {"en": "Point at a tile", "zh-CN": "指示一格"},
  "boardUi.panel.draw": {"en": "Draw on the board", "zh-CN": "在地图上绘制"},
  "boardUi.panel.enlarge": {"en": "Enlarge battle map", "zh-CN": "放大战斗地图"},
  "boardUi.panel.fade": {"en": "fades next round", "zh-CN": "下一轮淡出"},
  "boardUi.panel.clearTip": {"en": "Clear every mark", "zh-CN": "清除所有标记"},
  "boardUi.panel.eraseTip": {"en": "Erase your marks", "zh-CN": "擦除自己的标记"},
  "boardUi.panel.clear": {"en": "Clear", "zh-CN": "清除"},
  "boardUi.panel.erase": {"en": "Erase mine", "zh-CN": "擦除我的标记"},
  "boardUi.panel.damage": {"en": "Damage {name}", "zh-CN": "对{name}造成伤害"},
  "boardUi.panel.heal": {"en": "Heal {name}", "zh-CN": "治疗{name}"},
  "boardUi.panel.condition": {"en": "Condition on {name}", "zh-CN": "设置{name}的状态"},
  "boardUi.panel.conditionLabel": {"en": "Condition", "zh-CN": "状态（中文译名、英文原名或自定义名称）"},
  "boardUi.panel.hp": {"en": "Hit points", "zh-CN": "生命值"},
  "boardUi.panel.deal": {"en": "Deal it", "zh-CN": "造成伤害"},
  "boardUi.panel.healSubmit": {"en": "Heal", "zh-CN": "治疗"},
  "boardUi.panel.apply": {"en": "Apply", "zh-CN": "应用"},
  "boardUi.panel.ground": {"en": "The ground here", "zh-CN": "当前场景地图"},
  "boardUi.panel.title": {"en": "Battle map, round {round}", "zh-CN": "战斗地图，第 {round} 轮"},
  "boardUi.panel.close": {"en": "Close the board", "zh-CN": "关闭地图"},
  "boardUi.panel.ink": {"en": "{tone} ink", "zh-CN": "{tone}画笔"},
  "boardUi.draw.stroke": {"en": "stroke", "zh-CN": "自由线"},
  "boardUi.draw.arrow": {"en": "arrow", "zh-CN": "箭头"},
  "boardUi.draw.rect": {"en": "rect", "zh-CN": "矩形"},
  "boardUi.draw.ellipse": {"en": "ellipse", "zh-CN": "椭圆"},
  "boardUi.tone.gold": {"en": "gold", "zh-CN": "金色"},
  "boardUi.tone.ember": {"en": "ember", "zh-CN": "橙红色"},
  "boardUi.tone.sky": {"en": "sky", "zh-CN": "天蓝色"},
  "boardUi.tone.moss": {"en": "moss", "zh-CN": "苔绿色"},
  "boardUi.tone.bone": {"en": "bone", "zh-CN": "骨白色"},
  "boardUi.error.allowed": {"en": "That was not allowed.", "zh-CN": "当前无法执行此操作。"},
  "boardUi.error.network": {"en": "Could not reach the table.", "zh-CN": "无法连接游戏服务器。"},
  "boardUi.error.end": {"en": "The turn could not be ended.", "zh-CN": "无法结束回合。"},
  "boardUi.error.erase": {"en": "Nothing to erase.", "zh-CN": "没有可擦除的标记。"},
  "boardUi.error.name": {"en": "Name it first.", "zh-CN": "请先输入名称。"},
  "boardUi.error.measure": {"en": "That area could not be measured.", "zh-CN": "无法测量该区域。"},
  "boardUi.error.enemy": {"en": "Pick an enemy.", "zh-CN": "请选择敌人。"},
  "boardUi.error.hp": {"en": "Give a number of hit points.", "zh-CN": "请输入大于 0 的生命值数值。"},
  "boardUi.area.hand": {"en": "{spell}: {hint}", "zh-CN": "{spell}：{hint}"},
  "boardUi.area.console": {"en": "Tap the square for {label}. Esc stops.", "zh-CN": "点击地图选择{label}所在格。按 Esc 取消。"},
  "boardUi.area.absent": {"en": "Open the battle map to pick, or type the numbers.", "zh-CN": "打开战斗地图选择位置，或直接输入坐标。"},
  "boardUi.area.tap": {"en": "Tap the square on the map.", "zh-CN": "点击地图上的格子。"},
  "boardUi.area.stop": {"en": "Stop", "zh-CN": "取消"},
  "boardUi.area.pick": {"en": "Pick on the board", "zh-CN": "在地图上选择"},
  "boardUi.hud.attack": {"en": "Attack", "zh-CN": "攻击"},
  "boardUi.hud.cast": {"en": "Cast", "zh-CN": "施法"},
  "boardUi.hud.dodge": {"en": "Dodge", "zh-CN": "闪避"},
  "boardUi.hud.dash": {"en": "Dash", "zh-CN": "疾走"},
  "boardUi.hud.disengage": {"en": "Disengage", "zh-CN": "撤离"},
  "boardUi.hud.help": {"en": "Help", "zh-CN": "协助"},
  "boardUi.hud.hold": {"en": "Pick up", "zh-CN": "拿起"},
  "boardUi.hud.teleport": {"en": "Teleport", "zh-CN": "传送"},
  "boardUi.hud.reveal": {"en": "Reveal", "zh-CN": "显示"},
  "boardUi.hud.hide": {"en": "Hide", "zh-CN": "隐藏"},
  "boardUi.hud.damage": {"en": "Damage", "zh-CN": "伤害"},
  "boardUi.hud.condition": {"en": "Condition", "zh-CN": "状态"},
  "boardUi.hud.heal": {"en": "Heal", "zh-CN": "治疗"},
  "boardUi.hud.remove": {"en": "Take off", "zh-CN": "移除"},
  "boardUi.hud.actions": {"en": "Actions for {name}", "zh-CN": "{name}的操作"},
  "boardUi.hud.close": {"en": "Close", "zh-CN": "关闭"},
  "boardUi.sent.attack": {"en": "I attack {name}.", "zh-CN": "我攻击{name}。"},
  "boardUi.sent.cast": {"en": "I cast  at {name}.", "zh-CN": "我对{name}施放  。"},
  "boardUi.sent.dodge": {"en": "I take the Dodge action.", "zh-CN": "我执行闪避动作。"},
  "boardUi.sent.dash": {"en": "I Dash.", "zh-CN": "我疾走。"},
  "boardUi.sent.disengage": {"en": "I Disengage and step away.", "zh-CN": "我撤离并走开。"},
  "boardUi.sent.help": {"en": "I take the Help action for ", "zh-CN": "我执行协助动作，帮助 "},

  "boardUi.note.evasionNo": { "en": "Evasion: {name} takes no damage.", "zh-CN": "闪避：{name}不受伤害。" },
  "boardUi.note.evasionHalf": { "en": "Evasion: {name} takes half damage.", "zh-CN": "闪避：{name}仅受一半伤害。" },
  "boardUi.note.landCheck": { "en": "{state} ({skill} {roll} against DC 10{terrain})", "zh-CN": "{state}（{skill}检定 {roll} 对 DC 10{terrain}）" },
  "boardUi.note.terrain": { "en": " in difficult terrain", "zh-CN": "，困难地形" },
  "boardUi.note.entering": { "en": "entering {spell}", "zh-CN": "进入{spell}" },
  "boardUi.note.through": { "en": "moving through {spell}", "zh-CN": "穿过{spell}" },
  "boardUi.move.walk": {
    "en": "Walk",
    "zh-CN": "步行"
  },
  "boardUi.move.walkNote": {
    "en": "Move square by square.",
    "zh-CN": "逐格移动。"
  },
  "boardUi.move.jump": {
    "en": "Jump",
    "zh-CN": "跳跃"
  },
  "boardUi.move.jumpNote": {
    "en": "A long jump of up to {long} feet; a high jump of {high}.",
    "zh-CN": "最多跳远 {long} 英尺、跳高 {high} 英尺。"
  },
  "boardUi.move.drag": {
    "en": "Drag",
    "zh-CN": "拖拽"
  },
  "boardUi.move.dragNote": {
    "en": "Take {names} with you.",
    "zh-CN": "带着{names}一起移动。"
  },
  "boardUi.move.group": {
    "en": "How you move",
    "zh-CN": "移动方式"
  },
  "boardUi.move.label": {
    "en": "Move",
    "zh-CN": "移动"
  },
  "boardUi.move.long": {
    "en": "Long jump: up to {feet} feet in a straight line, each foot a foot of movement. Tap where you land.",
    "zh-CN": "助跑跳远：直线最多 {feet} 英尺，每跳跃 1 英尺消耗 1 英尺移动距离。点击落点。"
  },
  "boardUi.move.standing": {
    "en": "Standing long jump: up to {feet} feet (twice that after a 10-foot run this turn). Tap where you land.",
    "zh-CN": "立定跳远：最多 {feet} 英尺（本回合助跑 10 英尺后可加倍）。点击落点。"
  },
  "boardUi.move.dragDouble": {
    "en": "Dragging {names}: every square costs double. Tap where you stop.",
    "zh-CN": "拖拽{names}：每格移动成本加倍。点击终点。"
  },
  "boardUi.move.dragSmall": {
    "en": "Dragging {names}: two sizes smaller, so it costs nothing extra. Tap where you stop.",
    "zh-CN": "拖拽{names}：对方小两个体型，因此不消耗额外移动距离。点击终点。"
  },
  "boardUi.and": {
    "en": " and ",
    "zh-CN": "与"
  },
  "boardUi.list": {
    "en": ", ",
    "zh-CN": "、"
  },
  "boardUi.caught": {
    "en": " Catches {names}.",
    "zh-CN": " 影响目标：{names}。"
  },
  "boardUi.keys.moveView": {
    "en": "Move the view",
    "zh-CN": "平移视野"
  },
  "boardUi.keys.zoom": {
    "en": "Zoom in and out",
    "zh-CN": "放大与缩小"
  },
  "boardUi.keys.fit": {
    "en": "Fit the whole board",
    "zh-CN": "显示整张地图"
  },
  "boardUi.keys.cancel": {
    "en": "Cancel an aim or a drag",
    "zh-CN": "取消瞄准或拖拽"
  },
  "boardUi.keys.pointer": {
    "en": "Zoom at the pointer",
    "zh-CN": "以指针位置为中心缩放"
  },
  "boardUi.keys.scroll": {
    "en": "Scroll",
    "zh-CN": "滚轮"
  },
  "boardUi.keys.drag": {
    "en": "Drag",
    "zh-CN": "拖动"
  },
  "boardUi.strip.move": {
    "en": " move",
    "zh-CN": " 平移"
  },
  "boardUi.strip.zoom": {
    "en": " zoom",
    "zh-CN": " 缩放"
  },
  "boardUi.strip.fit": {
    "en": " fit",
    "zh-CN": " 全图"
  },
  "boardUi.keys.title": {
    "en": "Board controls",
    "zh-CN": "地图操作"
  },
  "boardUi.keys.focus": {
    "en": "The keys work while the board is lit: click it, or Tab to it.",
    "zh-CN": "地图获得焦点后才能使用快捷键：点击地图，或按 Tab 切换到地图。"
  },
  "boardUi.keys.label": {
    "en": "Board keys and mouse controls",
    "zh-CN": "地图键盘与鼠标操作"
  },
  "boardUi.keys.tip": {
    "en": "Keys and mouse controls",
    "zh-CN": "键盘与鼠标操作"
  },
  "boardUi.camera.in": {
    "en": "Zoom in",
    "zh-CN": "放大"
  },
  "boardUi.camera.out": {
    "en": "Zoom out",
    "zh-CN": "缩小"
  },
  "boardUi.camera.fit": {
    "en": "Fit the board",
    "zh-CN": "显示整张地图"
  },
  "boardUi.camera.follow": {
    "en": "Follow the turn",
    "zh-CN": "跟随当前回合"
  },
  "boardUi.camera.pullTip": {
    "en": "Pull everyone here",
    "zh-CN": "将全桌视野拉到此处"
  },
  "boardUi.camera.pull": {
    "en": "Pull everyone to this view",
    "zh-CN": "将全桌视野拉到当前画面"
  },
  "boardUi.camera.lockTip": {
    "en": "Lock everyone to my view",
    "zh-CN": "将全桌视野锁定到我的画面"
  },
  "boardUi.camera.lock": {
    "en": "Lock everyone to this view",
    "zh-CN": "将全桌视野锁定到当前画面"
  },
  "boardUi.camera.free": {
    "en": "Free everyone's view",
    "zh-CN": "解除全桌视野锁定"
  },
  "boardUi.order.title": {
    "en": "Initiative, round {round}",
    "zh-CN": "先攻顺序，第 {round} 轮"
  },
  "boardUi.order.reflexTip": {
    "en": "Thief's Reflexes: a second turn this round",
    "zh-CN": "盗贼反射：本轮的第二个回合"
  },
  "boardUi.order.second": {
    "en": "2nd",
    "zh-CN": "第二次"
  },
  "boardUi.order.now": {
    "en": "up now",
    "zh-CN": "当前回合"
  },
  "boardUi.order.hidden": {
    "en": " (hidden)",
    "zh-CN": "（隐藏）"
  },
  "boardUi.hint.drawDm": {
    "en": "Drag to draw. Everyone sees it; it is a plan, not a fact.",
    "zh-CN": "拖动绘制。全桌都能看到；图画只是计划，不代表实际发生的事。"
  },
  "boardUi.hint.teleport": {
    "en": "Tap the tile it appears on. No path, no movement spent.",
    "zh-CN": "点击出现的位置。此操作不经过路径，也不消耗移动距离。"
  },
  "boardUi.hint.held": {
    "en": "Tap where it should stand. The round's movement is not charged for this.",
    "zh-CN": "点击要摆放的位置。此操作不扣除本回合移动距离。"
  },
  "boardUi.hint.direction": {
    "en": "Now tap where it points.",
    "zh-CN": "现在点击指向的位置。"
  },
  "boardUi.hint.origin": {
    "en": "Tap where the area starts.",
    "zh-CN": "点击区域的起点。"
  },
  "boardUi.hint.pointDm": {
    "en": "Tap a tile and everyone looks at it.",
    "zh-CN": "点击一格，让全桌注意那里。"
  },
  "boardUi.hint.place": {
    "en": "Name it, then tap a tile.",
    "zh-CN": "先输入名称，再点击一格。"
  },
  "boardUi.hint.dm": {
    "en": "Tap a piece for its actions. Nothing here is charged against the round.",
    "zh-CN": "点击棋子查看操作。这里的操作不计入本回合。"
  },
  "boardUi.hint.point": {
    "en": "Tap a tile to point at it.",
    "zh-CN": "点击一格来指示位置。"
  },
  "boardUi.hint.draw": {
    "en": "Drag to draw. The table sees it; erase it when the plan changes.",
    "zh-CN": "拖动绘制，全桌都能看到。计划改变时可擦除。"
  },
  "boardUi.hint.target": {
    "en": "Tap the enemy.",
    "zh-CN": "点击敌人。"
  },
  "boardUi.hint.scene": {
    "en": "Tap anywhere you can walk. Nothing is being counted out here.",
    "zh-CN": "点击可到达的位置。探索场景不按回合扣除移动距离。"
  },
  "boardUi.hint.move": {
    "en": "Tap a highlighted tile to move ({feet} ft left this turn). Tap your figure for actions.",
    "zh-CN": "点击高亮格移动（本回合剩余 {feet} 英尺）。点击自己的棋子查看操作。"
  },
  "boardUi.hint.wait": {
    "en": "You can move on your turn. The shroud shows what your character cannot see.",
    "zh-CN": "轮到你的回合时可以移动。迷雾覆盖角色看不到的区域。"
  },
  "boardUi.hint.noToken": {
    "en": "You have no token on this field.",
    "zh-CN": "你在这张地图上没有棋子。"
  },
  "boardUi.note.jump": {
    "en": "Jumped {feet} feet and landed {landed}.{high}",
    "zh-CN": "跳跃 {feet} 英尺，落地时{landed}。{high}"
  },
  "boardUi.note.high": {
    "en": " A high jump reaches {feet} feet.",
    "zh-CN": " 可跳高 {feet} 英尺。"
  },
  "boardUi.note.upright": {
    "en": "on their feet",
    "zh-CN": "站稳"
  },
  "boardUi.note.prone": {
    "en": "prone",
    "zh-CN": "倒地"
  },
  "boardUi.note.held": {
    "en": "It is held fast at ({x},{y}).",
    "zh-CN": "在（{x}，{y}）处被束缚住。"
  },
  "boardUi.note.push": {
    "en": "{name} is pushed to ({x},{y}).",
    "zh-CN": "{name}被推至（{x}，{y}）。"
  },
  "boardUi.note.retc": {
    "en": "{name} spends an action this turn retching.",
    "zh-CN": "{name}本回合的动作用于干呕。"
  },
  "boardUi.note.concentration": {
    "en": "{name} loses concentration on {spell}.",
    "zh-CN": "{name}失去对{spell}的专注。"
  },
  "boardUi.note.condition": {
    "en": "{name} is {condition} by {spell}.",
    "zh-CN": "{name}因{spell}陷入{condition}状态。"
  },
  "boardUi.note.knocked": {
    "en": "{name} is knocked prone by {spell}.",
    "zh-CN": "{name}被{spell}击倒。"
  },
  "boardUi.note.save": {
    "en": "{name} {result} a {ability} save against {spell} (DC {dc}).",
    "zh-CN": "{name}针对{spell}的{ability}豁免{result}（DC {dc}）。"
  },
  "boardUi.note.saveFail": {
    "en": "fails",
    "zh-CN": "失败"
  },
  "boardUi.note.savePass": {
    "en": "makes",
    "zh-CN": "成功"
  },
  "boardUi.note.damage": {
    "en": "{name} takes {amount} {type} damage from {source}.",
    "zh-CN": "{name}因{source}受到 {amount} 点{type}伤害。"
  },
  "boardUi.note.opMiss": {
    "en": "{enemy} takes an opportunity attack as {name} pulls away and misses ({roll} vs AC {ac}).",
    "zh-CN": "{name}离开时，{enemy}发动的借机攻击未命中（{roll} 对护甲等级 {ac}）。"
  },
  "boardUi.note.opHit": {
    "en": "{enemy} takes an opportunity attack as {name} pulls away: {hit}{amount} damage{types}.{rider}",
    "zh-CN": "{name}离开时，{enemy}发动借机攻击并{hit}，伤害掷骰为 {amount} 点{types}。{rider}"
  },
  "boardUi.note.hit": {
    "en": "hit for ",
    "zh-CN": "命中"
  },
  "boardUi.note.crit": {
    "en": "a critical hit for ",
    "zh-CN": "重击"
  },
  "boardUi.note.types": {
    "en": " ({types})",
    "zh-CN": "（{types}）"
  },
  "boardUi.note.rider": {
    "en": " {name} is {conditions}.",
    "zh-CN": " {name}陷入{conditions}状态。"
  },
  "boardUi.note.evade": {
    "en": "{enemy} gets no opportunity attack on {name}: {feature} (attacked in melee this turn).",
    "zh-CN": "{enemy}无法对{name}发动借机攻击：{feature}（本回合已在近战中攻击过对方）。"
  },
  "boardUi.ruler.feet": {
    "en": "{feet} ft",
    "zh-CN": "{feet} 英尺"
  },
  "boardUi.ruler.drag": {
    "en": "{feet} ft dragging",
    "zh-CN": "{feet} 英尺，拖拽"
  },
  "boardUi.ruler.jump": {
    "en": "{feet} ft jump",
    "zh-CN": "跳跃 {feet} 英尺"
  },
  "boardUi.ruler.unreachable": {
    "en": "out of reach",
    "zh-CN": "超出移动范围"
  }
});
