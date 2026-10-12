import { defineMessages } from "./catalog.ts";

// Board display only. Movement modes, tile costs and camera commands stay canonical.
export const BOARD_CONTROL_MESSAGES = /*#__PURE__*/ defineMessages({
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
    "zh-CN": "{name}离开时，{enemy}发动借机攻击，{hit}造成 {amount} 点伤害{types}。{rider}"
  },
  "boardUi.note.hit": {
    "en": "hit for ",
    "zh-CN": "命中并"
  },
  "boardUi.note.crit": {
    "en": "a critical hit for ",
    "zh-CN": "重击并"
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
