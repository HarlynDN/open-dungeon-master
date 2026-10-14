import { defineMessages } from "./catalog.ts";

export const UPSTREAM_UI_MESSAGES = /*#__PURE__*/ defineMessages({
  "upstreamUi.native.comfyBetter": {"en": "Measured best on {hardware}: {model}, about {seconds} s a picture. This ComfyUI lacks its files ({gb} GB); Admin > Images lists them.", "zh-CN": "在{hardware}上的实测最佳模型是 {model}，每张约 {seconds} 秒。此 ComfyUI 缺少所需文件（{gb} GB）；可在“管理 > 图像”中查看。"},
  "upstreamUi.native.comfyAddress": {"en": "Could not check ComfyUI. Check its address.", "zh-CN": "无法检查 ComfyUI，请确认服务地址。"},

  "upstreamUi.native.coorda61759020289": {"en": "Front", "zh-CN": "队首"},
  "upstreamUi.native.coord3762bba2101e": {"en": "Rear", "zh-CN": "队尾"},
  "upstreamUi.native.coordd93006ec2e43": {"en": "Middle", "zh-CN": "中间"},
  "upstreamUi.native.coordee2214a6d6f4": {"en": "ally the DM plays", "zh-CN": "地下城主控制的盟友"},
  "upstreamUi.native.coord5eb2da9c26b6": {"en": "yours", "zh-CN": "你的角色"},
  "upstreamUi.native.coord3889bfeaf3c0": {"en": "Could not change the formation.", "zh-CN": "无法更改队形。"},
  "upstreamUi.native.coord111ff6e1879b": {"en": "Could not reach the server.", "zh-CN": "无法连接服务器。"},
  "upstreamUi.native.coorded7e0644949e": {"en": "Whoever steers the story opens a coordinated plan.", "zh-CN": "只有主持故事的人可以发起协同行动。"},
  "upstreamUi.native.coordb76bc5e07a17": {"en": "Whoever steers the story sets the plan's order.", "zh-CN": "只有主持故事的人可以设置计划顺序。"},
  "upstreamUi.native.coorda93b8c694edb": {"en": "Only the lead resolves the plan early.", "zh-CN": "只有队长可以提前执行计划。"},
  "upstreamUi.native.coorde6e815897b71": {"en": "The party is not coordinating right now.", "zh-CN": "队伍目前没有进行协同行动。"},
  "upstreamUi.native.coord4b931d93ca38": {"en": "Only the lead sets the plan aside.", "zh-CN": "只有队长可以搁置计划。"},
  "upstreamUi.native.coorda12a76346946": {"en": "Say what to change about the formation.", "zh-CN": "请说明要如何调整队形。"},
  "upstreamUi.native.coordae4c77b505cc": {"en": "Only the party lead arranges the travel formation. Ask for a change on your own character instead.", "zh-CN": "只有队长可以安排行进队形。你可以为自己的角色请求调整。"},
  "upstreamUi.native.coordc7a0f2231e69": {"en": "That is not one of your characters.", "zh-CN": "这不是你的角色。"},
  "upstreamUi.native.coord84d053d4e49a": {"en": "Put at least one character in the formation.", "zh-CN": "队形中至少需要一名角色。"},
  "upstreamUi.native.coordba404379f60f": {"en": "A character holds one place in the formation; that order names one twice.", "zh-CN": "每名角色只能占据一个位置；此队形中有重复角色。"},
  "upstreamUi.native.coord166971c3f66e": {"en": "That order names a character who is not in this party. Reload the Party panel and arrange it again.", "zh-CN": "此队形中有不属于本队伍的角色。请重新加载队伍面板后再安排。"},
  "upstreamUi.native.coord6bc48027f772": {"en": "That is the formation already.", "zh-CN": "当前已经是这个队形。"},
  "upstreamUi.native.coord0200858c7179": {"en": "There is no formation change to answer.", "zh-CN": "没有需要回应的队形调整。"},
  "upstreamUi.native.coord063f335e6ab2": {"en": "That change does not move this character, so there is nothing to answer for them.", "zh-CN": "此次调整不移动这名角色，因此无需回应。"},
  "upstreamUi.native.coord5d63cd40c8de": {"en": "There is no proposed formation to make active.", "zh-CN": "没有待启用的队形提案。"},
  "upstreamUi.native.coorde9a6111bd2bd": {"en": "There is no formation change to withdraw.", "zh-CN": "没有可撤回的队形调整。"},
  "upstreamUi.native.coord9a7c46c8ac06": {"en": "Coordinated actions are for a table the AI narrates; a DM in the seat already takes the party's moves together.", "zh-CN": "协同行动用于 AI 叙事的游戏；真人地下城主已能统一处理队伍的行动。"},
  "upstreamUi.native.coordd57989e7366d": {"en": "The adventure has not started yet.", "zh-CN": "冒险尚未开始。"},
  "upstreamUi.native.coordf61b4ffc87b2": {"en": "A fight is running; the initiative order takes the turns now.", "zh-CN": "战斗正在进行，目前按先攻顺序行动。"},
  "upstreamUi.native.coord948b6e356a06": {"en": "The party is already coordinating; resolve or set aside that plan first.", "zh-CN": "队伍已在协同行动中；请先执行或搁置当前计划。"},
  "upstreamUi.native.coord8acf0add7680": {"en": "Pick at least one player's character to coordinate.", "zh-CN": "请至少选择一名玩家角色参与协同行动。"},
  "upstreamUi.native.coordea5a09bbc6c4": {"en": "The order must name each character in the plan once.", "zh-CN": "行动顺序必须包含计划中的每名角色，且各出现一次。"},
  "upstreamUi.native.coord7218c8804ad8": {"en": "Only a player in the plan may ask a companion for something.", "zh-CN": "只有参与计划的玩家可以向同伴提出请求。"},
  "upstreamUi.native.coord78d57f26440d": {"en": "This plan has already been resolved or set aside.", "zh-CN": "此计划已执行或搁置。"},
  "upstreamUi.native.coord0c7fb530eb2c": {"en": "The lead has just changed the order. Look at where your character stands now, then mark it Ready.", "zh-CN": "队长刚更改了顺序。请确认角色的新位置，再标记为准备就绪。"},
  "upstreamUi.native.coord790fd07657be": {"en": "That character is not part of this plan.", "zh-CN": "该角色未参与此计划。"},
  "upstreamUi.native.coordc34a89ec72e0": {"en": "Requests are for the AI companions in the plan.", "zh-CN": "请求只能发送给计划中的 AI 同伴。"},

  "upstreamUi.native.comfyCopydacb425d9f7f": {"en": "6B, distilled to 8 steps. Quick, sharp, photographic; writes legible text.", "zh-CN": "6B，蒸馏至 8 步。快速、清晰、偏摄影风格，可生成可读文字。"},
  "upstreamUi.native.comfyCopy30aefb76ceae": {"en": "The undistilled 6B base: 25 steps with a real negative prompt.", "zh-CN": "未蒸馏的 6B 基础版：25 步，支持真正的负面提示词。"},
  "upstreamUi.native.comfyCopy1f09190c8325": {"en": "Qwen's 2026 model in int8: strong composition and prompt following, 25 steps.", "zh-CN": "千问 2026 年模型的 int8 版本：构图和提示词遵循能力强，25 步。"},
  "upstreamUi.native.comfyCopya682c745ecbb": {"en": "Qwen Image 2.1 distilled to 8 steps: the same encoder at a third of the time.", "zh-CN": "Qwen Image 2.1 蒸馏至 8 步：使用同一编码器，耗时约为三分之一。"},
  "upstreamUi.native.comfyCopy9908d9f62a09": {"en": "The 20B Qwen-Image, December 2025 weights, with a real negative prompt.", "zh-CN": "20B Qwen-Image，采用 2025 年 12 月权重，支持真正的负面提示词。"},
  "upstreamUi.native.comfyCopy8e00ceed3a38": {"en": "Qwen-Image 2512 with the 4-step Lightning LoRA: the 20B model at turbo speed.", "zh-CN": "Qwen-Image 2512 搭配 4 步 Lightning LoRA：以 Turbo 速度运行 20B 模型。"},
  "upstreamUi.native.comfyCopy8664732ec5ad": {"en": "Krea's 2026 model distilled to 8 steps: painterly, strong on style.", "zh-CN": "Krea 2026 年模型，蒸馏至 8 步：偏绘画风格，风格表现力强。"},
  "upstreamUi.native.comfyCopy11f990b2d478": {"en": "12B, 4 steps. The painter behind ODM's own map and token art.", "zh-CN": "12B，4 步。ODM 自带地图与棋子美术所用的模型。"},
  "upstreamUi.native.comfyCopyb86ac6145a3b": {"en": "12B guidance-distilled, 20 steps. Detailed; non-commercial weights.", "zh-CN": "12B 引导蒸馏模型，20 步。细节丰富；权重限非商业使用。"},
  "upstreamUi.native.comfyCopya42601366211": {"en": "{model} retrained by Krea for natural, less glossy pictures.", "zh-CN": "Krea 重新训练的 {model}，画面更自然、光泽感更弱。"},
  "upstreamUi.native.comfyCopy0afdc9f6408a": {"en": "32B with a 24B Mistral encoder, 20 steps. The heaviest model here.", "zh-CN": "32B，搭配 24B Mistral 编码器，20 步。这里资源需求最大的模型。"},
  "upstreamUi.native.comfyCopyaa99c43eddaf": {"en": "4B distilled to 4 steps, on the same Qwen 3 4B encoder as Z-Image.", "zh-CN": "4B，蒸馏至 4 步，使用与 Z-Image 相同的 Qwen 3 4B 编码器。"},
  "upstreamUi.native.comfyCopyac68ab70d122": {"en": "The undistilled klein 4B: 20 steps with a real negative prompt.", "zh-CN": "未蒸馏的 klein 4B：20 步，支持真正的负面提示词。"},
  "upstreamUi.native.comfyCopy3492d70f16dc": {"en": "9B distilled to 4 steps on a Qwen 3 8B encoder; non-commercial weights.", "zh-CN": "9B，蒸馏至 4 步，搭配 Qwen 3 8B 编码器；权重限非商业使用。"},
  "upstreamUi.native.comfyCopyfa1bdea8d31b": {"en": "8.9B {model} derivative, uncensored, 26 steps with a real negative.", "zh-CN": "8.9B {model} 衍生模型，无内容审查，26 步，支持真正的负面提示词。"},
  "upstreamUi.native.comfyCopy2a13c11e93a6": {"en": "Chroma painting pixels directly, no VAE: 30 steps.", "zh-CN": "Chroma 直接在像素空间绘制，无需 VAE：30 步。"},
  "upstreamUi.native.comfyCopyf148a97a49b7": {"en": "17B with four encoders (Llama 3.1 8B among them), 16 steps.", "zh-CN": "17B，使用四个编码器（包括 Llama 3.1 8B），16 步。"},
  "upstreamUi.native.comfyCopydfc2f887d0bf": {"en": "HiDream-I1 at 28 steps: more detail than Fast at nearly twice the time.", "zh-CN": "HiDream-I1，28 步：细节比 Fast 更多，耗时接近两倍。"},
  "upstreamUi.native.comfyCopyc62709ef6f8d": {"en": "The undistilled HiDream-I1: 50 steps with a real negative prompt.", "zh-CN": "未蒸馏的 HiDream-I1：50 步，支持真正的负面提示词。"},
  "upstreamUi.native.comfyCopy46fab06245f4": {"en": "8B in one checkpoint with its three encoders, 20 steps with a real negative.", "zh-CN": "8B，三个编码器与模型封装在同一权重文件中，20 步，支持真正的负面提示词。"},
  "upstreamUi.native.comfyCopy13d704dd8b9d": {"en": "2.5B in one checkpoint: small enough for an 8 GB card.", "zh-CN": "2.5B，单一权重文件：8 GB 显卡即可容纳。"},
  "upstreamUi.native.comfyCopy3516946ab629": {"en": "The SDXL fine-tune for stylised characters; ODM adds its score tags.", "zh-CN": "面向风格化角色的 SDXL 微调版；ODM 会加入评分标签。"},
  "upstreamUi.native.comfyCopy495d0122e42f": {"en": "Any SDXL checkpoint, CyberRealistic XL included. 7 GB, 25 steps.", "zh-CN": "任意 SDXL 权重，包括 CyberRealistic XL。7 GB，25 步。"},
  "upstreamUi.native.comfyCopy69c80d7bd3c6": {"en": "17B made for 2K pictures, distilled to 8 steps.", "zh-CN": "面向 2K 图像的 17B 模型，蒸馏至 8 步。"},
  "upstreamUi.native.comfyCopy87a112fcb860": {"en": "Baidu's 8B distilled to 8 steps on a Ministral 3B encoder.", "zh-CN": "百度的 8B 模型，蒸馏至 8 步，搭配 Ministral 3B 编码器。"},
  "upstreamUi.native.comfyCopy0fde5921e775": {"en": "Baidu's 8B base: 20 steps with a real negative prompt.", "zh-CN": "百度的 8B 基础模型：20 步，支持真正的负面提示词。"},
  "upstreamUi.native.comfyCopyc323599eb27a": {"en": "6B on a Qwen 2.5 VL encoder, 20 steps with a real negative.", "zh-CN": "6B，搭配 Qwen 2.5 VL 编码器，20 步，支持真正的负面提示词。"},
  "upstreamUi.native.comfyCopyfb2537567887": {"en": "7B tuned for text in pictures, 20 steps with a real negative.", "zh-CN": "7B，针对图中文字优化，20 步，支持真正的负面提示词。"},
  "upstreamUi.native.comfyCopyd9a4a7e5329e": {"en": "Microsoft's model at 4 steps, on a GPT-OSS 20B encoder.", "zh-CN": "微软的模型，4 步，搭配 GPT-OSS 20B 编码器。"},
  "upstreamUi.native.comfyCopy30bd3121a436": {"en": "Microsoft's model at 20 steps with a real negative prompt.", "zh-CN": "微软的模型，20 步，支持真正的负面提示词。"},
  "upstreamUi.native.comfyCopyec359b02cf84": {"en": "4 steps on a Qwen 3 VL 8B encoder.", "zh-CN": "4 步，搭配 Qwen 3 VL 8B 编码器。"},
  "upstreamUi.native.comfyCopyb6bea69d589d": {"en": "A small int8 model at 4 steps on a Qwen 3 VL 4B encoder.", "zh-CN": "小型 int8 模型，4 步，搭配 Qwen 3 VL 4B 编码器。"},
  "upstreamUi.native.comfyCopy66bd266a1e0e": {"en": "Mage-Flow at 30 steps with a real negative prompt.", "zh-CN": "Mage-Flow，30 步，支持真正的负面提示词。"},
  "upstreamUi.native.comfyCopy22c7869b5a61": {"en": "A picture model built on HunyuanVideo 1.5, 20 steps with a real negative.", "zh-CN": "基于 HunyuanVideo 1.5 的图像模型，20 步，支持真正的负面提示词。"},
  "upstreamUi.native.comfyCopy19fcc263f09e": {"en": "Ideogram's open weights: two models, design and typography first, 20 steps.", "zh-CN": "Ideogram 的开放权重：两个模型，以设计和字体排版为重点，20 步。"},
  "upstreamUi.native.comfyCopyba6007acce12": {"en": "A layout and graphic-design model on a Ling mini encoder, 12 steps.", "zh-CN": "布局与平面设计模型，搭配 Ling mini 编码器，12 步。"},
  "upstreamUi.native.comfyCopyecb90e7abdfc": {"en": "6B on Qwen 2.5 VL plus CLIP-L, 50 steps with a real negative.", "zh-CN": "6B，搭配 Qwen 2.5 VL 和 CLIP-L，50 步，支持真正的负面提示词。"},
  "upstreamUi.native.comfyCopyb7b8817a6417": {"en": "A 4B generalist on a Qwen 2.5 VL 3B encoder, 20 steps with a real negative.", "zh-CN": "通用 4B 模型，搭配 Qwen 2.5 VL 3B 编码器，20 步，支持真正的负面提示词。"},
  "upstreamUi.native.comfyCopycb7102d1680b": {"en": "A small pixel-space model with no VAE, 30 steps with a real negative.", "zh-CN": "小型像素空间模型，无需 VAE，30 步，支持真正的负面提示词。"},
  "upstreamUi.native.comfyCopye5be0a9eabd2": {"en": "HiDream's 2026 pixel model in one checkpoint, 28 steps, made for 2K.", "zh-CN": "HiDream 2026 年像素模型，单一权重文件，28 步，面向 2K 图像。"},
  "upstreamUi.native.comfyCopy19406a504d92": {"en": "Anime on Lumina Image 2.0, one checkpoint, 30 steps.", "zh-CN": "基于 Lumina Image 2.0 的动漫模型，单一权重文件，30 步。"},
  "upstreamUi.native.comfyCopy2f910efea474": {"en": "A 2B anime model on Cosmos Predict2, 30 steps with a real negative.", "zh-CN": "基于 Cosmos Predict2 的 2B 动漫模型，30 步，支持真正的负面提示词。"},
  "upstreamUi.native.comfyCopy1d5a8ce87cea": {"en": "A 3.5B anime model on Gemma 3 4B and Jina CLIP, 20 steps.", "zh-CN": "3.5B 动漫模型，搭配 Gemma 3 4B 和 Jina CLIP，20 步。"},
  "upstreamUi.native.comfyCopy40e722ec0041": {"en": "Any checkpoint ComfyUI lists, with SDXL-era settings.", "zh-CN": "ComfyUI 列出的任意权重文件，使用 SDXL 时代的设置。"},
  "upstreamUi.native.comfyCopy65d83e7e9fe8": {"en": "Light (12 GB) and tidy, with clean bust portraits on black, but over two minutes a picture; the owlbear is a bear with an owl's face pasted on, and the forge is a lava canyon without anvils. Non-commercial licence.", "zh-CN": "轻量（12 GB）、画面整洁，黑底半身像清晰，但每张超过两分钟；枭熊像贴上猫头鹰脸的熊，锻造厂成了没有铁砧的熔岩峡谷。非商业许可。"},
  "upstreamUi.native.comfyCopy4f0dcf03f534": {"en": "Clean tabletop game art in half a minute: a stout dwarf without elf ears, a true owlbear, a forge full of dwarves at their anvils. Different seeds gave nearly the same portrait. Apache-2.0.", "zh-CN": "半分钟即可生成干净的桌游美术：矮人敦实且没有精灵耳，枭熊形态正确，锻造厂里有在铁砧旁工作的矮人。不同种子生成的肖像几乎相同。Apache-2.0。"},
  "upstreamUi.native.comfyCopy67fa57a482b7": {"en": "A clean cartoon-game style with a fine owlbear and a busy forge, but over three minutes a picture; big elf ears on the dwarves. ComfyUI ran out of memory switching to it once.", "zh-CN": "干净的卡通游戏风格，枭熊不错，锻造厂繁忙，但每张超过三分钟；矮人有大精灵耳。切换模型时 ComfyUI 曾发生一次内存不足。"},
  "upstreamUi.native.comfyCopyb96341f6562a": {"en": "Decent painterly pictures with a real negative prompt, but about six minutes each (26 steps, two passes per step); dwarves get elf ears, one portrait came on a grey vignette.", "zh-CN": "绘画效果尚可，支持真正的负面提示词，但每张约六分钟（26 步，每步两次计算）；矮人有精灵耳，一张肖像出现灰色暗角。"},
  "upstreamUi.native.comfyCopy8423462ca54f": {"en": "Polished game-art pictures, but over eight minutes each; the owlbear is a bear with a beak and dwarves get elf ears.", "zh-CN": "精致的游戏美术，但每张超过八分钟；枭熊像长着鸟喙的熊，矮人有精灵耳。"},
  "upstreamUi.native.comfyCopy270114ed5514": {"en": "Pictures much like ERNIE-Image Turbo (a fine owlbear and forge) at five times the time, about five and a half minutes each; worth it only for the real negative prompt.", "zh-CN": "画面与 ERNIE-Image Turbo 相近（枭熊和锻造厂不错），耗时却是五倍，每张约五分半；仅在需要真正的负面提示词时才值得考虑。"},
  "upstreamUi.native.comfyCopyf25dd7065d3a": {"en": "Rich painterly fantasy: a true owlbear, a crowded forge with adventurers on the bridge, stout portraits (with elf ears). About a minute a picture, 34 GB peak. Apache-2.0.", "zh-CN": "丰富的奇幻绘画：枭熊形态正确，锻造厂拥挤，桥上有冒险者，肖像敦实（带精灵耳）。每张约一分钟，峰值 34 GB。Apache-2.0。"},
  "upstreamUi.native.comfyCopy09264e7772ee": {"en": "A good owlbear, but two and a half minutes a picture; dwarves come out as elves, the forge misses its anvils, and a fake signature appears in corners. Non-commercial licence.", "zh-CN": "枭熊不错，但每张两分半；矮人成了精灵，锻造厂缺少铁砧，角落出现假签名。非商业许可。"},
  "upstreamUi.native.comfyCopy743d2fcdafc2": {"en": "A fine owlbear and oil-painting look, but two and a half minutes a picture; paints dwarves as elves and signs most pictures with a fake artist signature. Non-commercial licence.", "zh-CN": "枭熊不错，呈油画风格，但每张两分半；把矮人画成精灵，大多数图像带有虚假的艺术家签名。非商业许可。"},
  "upstreamUi.native.comfyCopyd7803acf0dce": {"en": "Paints dwarves as elves, the owlbear as a plain owl, and scribbles signature-like text into corners.", "zh-CN": "把矮人画成精灵、枭熊画成普通猫头鹰，并在角落涂上类似签名的文字。"},
  "upstreamUi.native.comfyCopy000faa1eaa66": {"en": "Ran out of memory twice from a freshly restarted ComfyUI: the 35 GB model and 18 GB Mistral encoder do not fit beside this box's other services (about 40 GB, with swap full).", "zh-CN": "从刚重启的 ComfyUI 开始运行，两次内存不足：35 GB 模型加上 18 GB Mistral 编码器，无法与本机其他服务（约 40 GB，交换空间已满）共存。"},
  "upstreamUi.native.comfyCopye7ddf44f5ffb": {"en": "Among the best and quickest: stocky dwarves without elf ears, a true owlbear, a detailed forge. Apache-2.0. Can leave a faint logo mark in a corner.", "zh-CN": "效果和速度都名列前茅：敦实的矮人没有精灵耳，枭熊形态正确，锻造厂细节丰富。Apache-2.0。角落可能残留淡淡的标志。"},
  "upstreamUi.native.comfyCopyb64c5c967c27": {"en": "Pictures much like the distilled klein 4B at eight times the time; worth it only for its real negative prompt.", "zh-CN": "画面与蒸馏版 klein 4B 相近，耗时却是八倍；仅在需要真正的负面提示词时才值得考虑。"},
  "upstreamUi.native.comfyCopy6c49bab4aeff": {"en": "Much like Fast at nearly twice the time (over three minutes, 55 GB peak): human-looking dwarves, a fierce owlbear, a teal-lit forge. ComfyUI ran out of memory switching to it once.", "zh-CN": "与 Fast 相近，但耗时接近两倍（超过三分钟，峰值 55 GB）：矮人像人类，枭熊凶猛，锻造厂泛青光。切换模型时 ComfyUI 曾发生一次内存不足。"},
  "upstreamUi.native.comfyCopy64afd69bfa91": {"en": "Clean game-art portraits and a good owlbear, but two minutes a picture and a 50 GB peak (four text encoders); dwarves come out as young humans and the forge turned teal.", "zh-CN": "游戏美术肖像干净，枭熊不错，但每张两分钟，峰值 50 GB（四个文本编码器）；矮人像年轻人类，锻造厂变成青色。"},
  "upstreamUi.native.comfyCopy7681e7955186": {"en": "The best HiDream pictures (a true owlbear, a forge with anvil and bridge) but over eleven minutes each and a 55 GB peak; one portrait came as a round sticker on white. ComfyUI ran out of memory switching to it once.", "zh-CN": "HiDream 中画面最佳（枭熊形态正确，锻造厂有铁砧和桥），但每张超过十一分钟，峰值 55 GB；一张肖像变成白底圆形贴纸。切换模型时 ComfyUI 曾发生一次内存不足。"},
  "upstreamUi.native.comfyCopyf617ed9035f6": {"en": "Clean painted game art from one 8 GB checkpoint at a 14 GB peak: real dwarves, a true owlbear, a working forge. About a minute a picture; read the female dwarf as a bearded man. MIT.", "zh-CN": "单个 8 GB 权重文件即可生成干净的游戏绘画，峰值 14 GB：矮人与枭熊形态正确，锻造厂正常运作。每张约一分钟；把女性矮人画成了有胡须的男性。MIT。"},
  "upstreamUi.native.comfyCopy559b81244911": {"en": "Quick and unmistakably fantasy: real dwarves, an owl-faced bear, a forge with anvils and a bridge. Heavy (45 GB peak, twice the other quick models) and read the female dwarf as a bearded man.", "zh-CN": "快速且有鲜明奇幻感：矮人形态正确，熊有猫头鹰脸，锻造厂有铁砧和桥。资源需求高（峰值 45 GB，是其他快速模型的两倍），把女性矮人画成了有胡须的男性。"},
  "upstreamUi.native.comfyCopy70fa91096f8e": {"en": "Ideogram's built-in safety filter returned its 'Image blocked by safety filter' card for every ODM prompt, plain text or wrapped in its JSON caption format (Ideogram documents a high false-positive rate). Over four minutes per blocked card.", "zh-CN": "Ideogram 内置安全过滤器对每条 ODM 提示词都返回“Image blocked by safety filter”卡片，无论使用纯文本还是其 JSON 描述格式（Ideogram 文档说明误报率较高）。每张拦截卡片超过四分钟。"},
  "upstreamUi.native.comfyCopyf1d650a9fe4f": {"en": "The best owlbear measured and a fine forge, but nearly eight minutes a picture (50 steps); a portrait came with a garbled poster title painted across the top.", "zh-CN": "本次测量中枭熊效果最佳，锻造厂也不错，但每张接近八分钟（50 步）；一张肖像顶部绘有乱码海报标题。"},
  "upstreamUi.native.comfyCopy7fd347fefaae": {"en": "The most tabletop-looking pictures measured: a stout dwarf cleric, a true owlbear, a forge with anvils, bridge and adventurers. Slower than klein or Z-Image Turbo. Krea-2 Community License; check its terms before commercial use.", "zh-CN": "本次测量中最有桌游感：敦实的矮人牧师、形态正确的枭熊，以及有铁砧、桥和冒险者的锻造厂。比 klein 或 Z-Image Turbo 慢。采用 Krea-2 Community License；商业使用前需查阅条款。"},
  "upstreamUi.native.comfyCopy2bf79d900856": {"en": "A warmer painted look than Lens Turbo with a great owlbear and forge, but ten times the time (about a minute and a half); faces read young and the scars look painted on.", "zh-CN": "比 Lens Turbo 更温暖的绘画风格，枭熊和锻造厂很好，但耗时是十倍（约一分半）；脸显得年轻，疤痕像画上去的。"},
  "upstreamUi.native.comfyCopy8319ab10307f": {"en": "Under ten seconds a picture: a real owlbear, a forge with anvils, bridge and adventurers, dwarves without elf ears. A glossy 3D-render look with slightly noisy skin; 38 GB peak (its GPT-OSS 20B encoder). MIT.", "zh-CN": "每张不到十秒：枭熊形态正确，锻造厂有铁砧、桥和冒险者，矮人没有精灵耳。偏光亮的 3D 渲染风格，皮肤略有噪点；峰值 38 GB（使用 GPT-OSS 20B 编码器）。MIT。"},
  "upstreamUi.native.comfyCopy0686204fe9cd": {"en": "Rich, detailed fantasy scenes and gear, but over two and a half minutes a picture; ignores the plain dark background, paints the owlbear as a feathered bear, and dwarves as tall humans.", "zh-CN": "奇幻场景和装备丰富细致，但每张超过两分半；忽略纯暗色背景，把枭熊画成羽毛熊、矮人画成高个人类。"},
  "upstreamUi.native.comfyCopyd226ba24ec48": {"en": "Much the same pictures as Mage-Flow Turbo (a clean owl-faced bear, an anvil-lined forge) at eighteen times the time; elf ears and sigil scars here too.", "zh-CN": "画面与 Mage-Flow Turbo 基本相同（干净的猫头鹰脸熊、排列着铁砧的锻造厂），耗时却是十八倍；同样有精灵耳和符印状疤痕。"},
  "upstreamUi.native.comfyCopyb04c8a70052a": {"en": "The fastest and lightest measured, under five seconds a picture at a 12 GB peak, in an oil-painted fantasy look: an owl-faced bear, a forge with anvils and a bridge. Dwarves get elf ears and scars come out as sigils. MIT.", "zh-CN": "本次测量中最快最轻量：每张不到五秒，峰值 12 GB，呈奇幻油画风格；熊有猫头鹰脸，锻造厂有铁砧和桥。矮人有精灵耳，疤痕变成符印。MIT。"},
  "upstreamUi.native.comfyCopy0f749c23182e": {"en": "Superb dark oil-painting fantasy (the best-built owlbear, a forge full of dwarves), about a minute a picture, but a 47 GB peak from its 19.5 GB encoder; elf ears, and a signature mark in a corner.", "zh-CN": "出色的暗色奇幻油画（枭熊结构最佳，锻造厂满是矮人），每张约一分钟，但 19.5 GB 编码器使峰值达到 47 GB；有精灵耳，角落带签名标记。"},
  "upstreamUi.native.comfyCopyb9939bbecb33": {"en": "Despite its anime training, a clean cartoon-game look on ODM's prompts with a decent forge, but two minutes a picture; the owlbear is an owl and portraits are plain.", "zh-CN": "虽然接受动漫训练，使用 ODM 提示词时呈干净的卡通游戏风格，锻造厂尚可，但每张两分钟；枭熊成了猫头鹰，肖像较平淡。"},
  "upstreamUi.native.comfyCopyd8cf99e75d47": {"en": "Murky, mostly black pictures with small subjects (a toy-like owlbear, a cut-out forge); trained on XML anime captions, not plain prompts. Two minutes each. Non-commercial licence.", "zh-CN": "画面昏暗、几乎全黑，主体很小（玩具般的枭熊、剪贴般的锻造厂）；训练使用 XML 动漫描述，而非普通提示词。每张两分钟。非商业许可。"},
  "upstreamUi.native.comfyCopy5049ea8c19af": {"en": "Blurry, dim pictures: a muddled owlbear and an empty, murky forge, nearly four minutes each.", "zh-CN": "画面模糊昏暗：枭熊混乱不清，锻造厂空荡而阴暗，每张接近四分钟。"},
  "upstreamUi.native.comfyCopy69f0bf213f56": {"en": "Soft painterly pictures, but three and a half minutes each; dwarves come out as tall humans, the owlbear is a bear, and the forge has its adventurers but few anvils.", "zh-CN": "柔和的绘画风格，但每张三分半；矮人变成高个人类，枭熊变成普通熊，锻造厂有冒险者但缺少铁砧。"},
  "upstreamUi.native.comfyCopy307e3067ad10": {"en": "Lively stylised game art on only 9 GB, under a minute a picture, but it ignores the dark backgrounds, turns the forge purple, and gives dwarves elf ears. NVIDIA non-commercial licence.", "zh-CN": "仅需 9 GB 即可生成生动的风格化游戏美术，每张不到一分钟，但忽略暗色背景、把锻造厂变成紫色，并给矮人画上精灵耳。NVIDIA 非商业许可。"},
  "upstreamUi.native.comfyCopydd988d7699cb": {"en": "Drifts to anime faces and light backgrounds, misses the scene and paints the owlbear as an owl.", "zh-CN": "容易偏向动漫脸和浅色背景，偏离场景要求，把枭熊画成猫头鹰。"},
  "upstreamUi.native.comfyCopyab6e68bb622b": {"en": "The best forge scene measured (anvils, bridge, adventurers), but five minutes a picture and a 48 GB peak; portraits lean photographic with elf ears and the owlbear is mostly bear.", "zh-CN": "本次测量中锻造厂场景最佳（有铁砧、桥和冒险者），但每张五分钟，峰值 48 GB；肖像偏摄影风格且带精灵耳，枭熊更像普通熊。"},
  "upstreamUi.native.comfyCopya04896bc6c5d": {"en": "The most faithful pictures measured, but over two minutes each; the Turbo build looks almost the same.", "zh-CN": "本次测量中最忠实于提示词，但每张超过两分钟；Turbo 版本看起来几乎相同。"},
  "upstreamUi.native.comfyCopy398c07441ecd": {"en": "Nearly the base model's pictures at a third of the time: right dwarf, right owlbear, readable scene.", "zh-CN": "仅用基础版三分之一的时间即可生成近似画面：矮人正确，枭熊正确，场景清晰易辨。"},
  "upstreamUi.native.comfyCopy058bae087b36": {"en": "Qwen-Image 2512's forge at under a minute, but photographic rather than painted, the owlbear is a plain bear, and the LoRA unpacks the 20B model to a 77 GB peak. Qwen Image 2.1 Turbo paints better in less memory.", "zh-CN": "不到一分钟即可画出 Qwen-Image 2512 的锻造厂，但偏摄影而非绘画风格，枭熊变成普通熊，LoRA 将 20B 模型展开后峰值达 77 GB。Qwen Image 2.1 Turbo 画得更好且内存更省。"},
  "upstreamUi.native.comfyCopy91fdcaa924f9": {"en": "A dramatic forge, but two and a half minutes a picture; portraits are close-up young humans rather than dwarves and the owlbear is a plain owl.", "zh-CN": "锻造厂富有戏剧性，但每张两分半；肖像是年轻人类的面部特写而非矮人，枭熊变成普通猫头鹰。"},
  "upstreamUi.native.comfyCopy7d85a7a93466": {"en": "Painterly and fairly quick for its size, but the owlbear is a plain owl, faces have odd marks, and one portrait came on a white sketch ground.", "zh-CN": "偏绘画风格，就其规模而言较快，但枭熊变成普通猫头鹰，脸上有奇怪标记，一张肖像出现白色素描底。"},
  "upstreamUi.native.comfyCopy27ff18e217a7": {"en": "ODM's default CyberRealistic XL: dwarves come out human and the owlbear as an owl.", "zh-CN": "ODM 默认的 CyberRealistic XL：矮人像人类，枭熊像猫头鹰。"},
  "upstreamUi.native.comfyCopy57bc2c7496a7": {"en": "Good owlbear and scene, but three and a half minutes a picture with the int8 weights; one portrait came out as a framed print on a mat.", "zh-CN": "枭熊和场景不错，但使用 int8 权重每张需三分半；一张肖像变成带衬纸和画框的印刷品。"},
  "upstreamUi.native.comfyCopyc48840361d73": {"en": "Clean painterly portraits and a true owl-bear in under 20 seconds. Dwarves can come out with elf ears.", "zh-CN": "不到 20 秒即可生成干净的绘画肖像和形态正确的枭熊。矮人可能有精灵耳。"},

  "upstreamUi.lengthMax": {
    "en": "Up to {max} characters.",
    "zh-CN": "最多 {max} 个字符。"
  },
  "upstreamUi.lengthOver": {
    "en": "{over} over the limit: shorten it to send.",
    "zh-CN": "超出 {over} 个字符，请缩短后发送。"
  },
  "upstreamUi.setupOff": {
    "en": "Turn off AI Story Setup",
    "zh-CN": "关闭 AI 故事准备"
  },
  "upstreamUi.setupKeep": {
    "en": "Keep it on",
    "zh-CN": "保持开启"
  },
  "upstreamUi.concentrationBody": {
    "en": "Casting {next} will end {who} concentration on {current}, and its effects end with it. Cancel to keep {current}; nothing is spent.",
    "zh-CN": "施放「{next}」将结束{who}对「{current}」的专注及其效果。取消可保留「{current}」，不会消耗资源。"
  },
  "upstreamUi.concentrationWho": {
    "en": "{name}'s",
    "zh-CN": "{name}"
  },
  "upstreamUi.concentrationYou": {
    "en": "your",
    "zh-CN": "你"
  },
  "upstreamUi.concentrationTitle": {
    "en": "Replace {current}?",
    "zh-CN": "替换「{current}」的专注？"
  },
  "upstreamUi.concentrationCast": {
    "en": "Cast {next}",
    "zh-CN": "施放「{next}」"
  },
  "upstreamUi.dictationHeading": {
    "en": "Dictation key",
    "zh-CN": "听写快捷键"
  },
  "upstreamUi.dictationIntro": {
    "en": "Kept on this device. A key you hold to speak into the table's message box instead of holding the mic. Nothing is sent until you press Send.",
    "zh-CN": "保存在此设备上。按住快捷键即可向桌面消息框听写，无需按住麦克风按钮。点击发送前不会发出消息。"
  },
  "upstreamUi.pressKeys": {
    "en": "Press the keys...",
    "zh-CN": "请按快捷键…"
  },
  "upstreamUi.noneSet": {
    "en": "None set",
    "zh-CN": "尚未设置"
  },
  "upstreamUi.cancel": {
    "en": "Cancel",
    "zh-CN": "取消"
  },
  "upstreamUi.change": {
    "en": "Change",
    "zh-CN": "更改"
  },
  "upstreamUi.setKey": {
    "en": "Set a key",
    "zh-CN": "设置快捷键"
  },
  "upstreamUi.clear": {
    "en": "Clear",
    "zh-CN": "清除"
  },
  "upstreamUi.savedDevice": {
    "en": "Saved on this device",
    "zh-CN": "已保存到此设备"
  },
  "upstreamUi.dictationChoose": {
    "en": "Hold Ctrl or Alt with a letter, or press a key that does not type, such as F8 or F9. Escape stops listening.",
    "zh-CN": "按住 Ctrl 或 Alt 加字母键，或使用 F8、F9 等不输入文字的按键。按 Esc 取消设置。"
  },
  "upstreamUi.dictationUse": {
    "en": "Hold it at the table, in the message box or anywhere outside another field, to speak as the mic button does. Let go and the words wait in the box; only Send sends them.",
    "zh-CN": "在消息框中，或桌面上其他输入框之外按住快捷键即可听写，效果与麦克风按钮相同。松开后文字留在消息框中，点击发送才会发出。"
  },
  "upstreamUi.689c0f1155bb": {
    "en": "No model is picked, so nothing is painted until you pick one.",
    "zh-CN": "尚未选择模型，请先选择模型以生成图像。"
  },
  "upstreamUi.c1329b9fbe25": {
    "en": "Image model",
    "zh-CN": "图像模型"
  },
  "upstreamUi.0e9161011702": {
    "en": "Refresh",
    "zh-CN": "刷新"
  },
  "upstreamUi.22f5ebc3ad3f": {
    "en": "Server URL",
    "zh-CN": "服务地址"
  },
  "upstreamUi.79de1abc9613": {
    "en": "Worker URL",
    "zh-CN": "工作服务地址"
  },
  "upstreamUi.19a2455e9ca1": {
    "en": "Server base URL",
    "zh-CN": "服务基础地址"
  },
  "upstreamUi.010648e5997a": {
    "en": "OpenAI itself, or any server with OpenAI's /v1/images/generations. Blank = api.openai.com.",
    "zh-CN": "OpenAI 或任何支持 /v1/images/generations 的兼容服务。留空使用 api.openai.com。"
  },
  "upstreamUi.5e2c614c23f0": {
    "en": "Model",
    "zh-CN": "模型"
  },
  "upstreamUi.a0395d2cafbe": {
    "en": "The picture models the server lists.",
    "zh-CN": "服务提供的图像模型。"
  },
  "upstreamUi.16f0ee47f993": {
    "en": "API key",
    "zh-CN": "API 密钥"
  },
  "upstreamUi.8c556fb0d927": {
    "en": "An env-var key is also set; this one wins when filled.",
    "zh-CN": "环境变量中也已配置密钥；填写此处后将优先使用此密钥。"
  },
  "upstreamUi.6fcf0818e101": {
    "en": "Billed to whoever owns the key. Used only when a campaign's backend is this API.",
    "zh-CN": "由密钥所属账号付费，仅在战役选择此 API 时使用。"
  },
  "upstreamUi.861bcd854c7e": {
    "en": "Default backend",
    "zh-CN": "默认服务"
  },
  "upstreamUi.f307867c22ba": {
    "en": "For new campaigns. The OpenAI-compatible API renders on another machine with the key below and needs no GPU here.",
    "zh-CN": "用于新战役。OpenAI 兼容 API 使用下方密钥在远程生成图像，本机无需 GPU。"
  },
  "upstreamUi.9ed7cf36ecaf": {
    "en": "For new campaigns; a campaign can pick any backend that is set up below. ComfyUI and the FLUX workers run on this machine; an OpenAI-compatible API renders wherever its address points.",
    "zh-CN": "用于新战役；各战役也可选择下方已配置的服务。ComfyUI 和 FLUX 工作服务在本机运行，OpenAI 兼容 API 在指定服务地址生成图像。"
  },
  "upstreamUi.41fc85ad680e": {
    "en": "ComfyUI (local)",
    "zh-CN": "ComfyUI（本地）"
  },
  "upstreamUi.982ea3687458": {
    "en": "OpenAI-compatible images API",
    "zh-CN": "OpenAI 兼容图像 API"
  },
  "upstreamUi.3434a7b5d41e": {
    "en": "FLUX worker: mflux (Apple Silicon)",
    "zh-CN": "FLUX 工作服务：mflux（Apple 芯片）"
  },
  "upstreamUi.0c3ba0c77f22": {
    "en": "FLUX worker: sdnq (CUDA/ROCm)",
    "zh-CN": "FLUX 工作服务：sdnq（CUDA/ROCm）"
  },
  "upstreamUi.32ab54d0fc3c": {
    "en": "The agent program's own pictures",
    "zh-CN": "代理程序自带生图功能"
  },
  "upstreamUi.fbe6f2e01c6b": {
    "en": "Pictures come from the agent program set up in the Agent section; it has no address or key of its own.",
    "zh-CN": "由「代理」区域配置的代理程序生成图像，无需单独设置地址或密钥。"
  },
  "upstreamUi.3c62c1dfd039": {
    "en": "Other backends a campaign can pick:",
    "zh-CN": "战役可选择的其他服务："
  },
  "upstreamUi.c75f9c7542b5": {
    "en": "A Whisper service answers, but no model is picked for it and it doesn't list exactly one, so dictation skips it. Pick its model in the Whisper model field.",
    "zh-CN": "Whisper 服务可访问，但尚未选择模型，且服务未返回唯一模型，因此暂不用于听写。请在 Whisper 模型栏选择模型。"
  },
  "upstreamUi.5cfd65ce18db": {
    "en": "An OpenAI key is saved, but no transcription model is picked, so nothing is heard until you pick one under OpenAI transcription in Admin > Speech.",
    "zh-CN": "已保存 OpenAI 密钥，但尚未选择转录模型。请在「管理 > 语音 > OpenAI 转录」中选择模型。"
  },
  "upstreamUi.d70604e84304": {
    "en": "Recommended",
    "zh-CN": "推荐"
  },
  "upstreamUi.3eac161518fc": {
    "en": "Anime",
    "zh-CN": "动漫"
  },
  "upstreamUi.750af77aa42e": {
    "en": "In use",
    "zh-CN": "正在使用"
  },
  "upstreamUi.f8b32f4e92bd": {
    "en": "Installed",
    "zh-CN": "已安装"
  },
  "upstreamUi.b25b0e621bc9": {
    "en": "Not measured yet.",
    "zh-CN": "尚未测试。"
  },
  "upstreamUi.418d4f5af0df": {
    "en": "Files to add",
    "zh-CN": "需要添加的文件"
  },
  "upstreamUi.1f2ba25aaafe": {
    "en": "Use this model",
    "zh-CN": "使用此模型"
  },
  "upstreamUi.d17d2d78d76e": {
    "en": "Models",
    "zh-CN": "模型"
  },
  "upstreamUi.51cb6a5eff02": {
    "en": "More GPU memory than this one has",
    "zh-CN": "所需显存超过当前 GPU 容量"
  },
  "upstreamUi.61e01c4bcdfa": {
    "en": "Image models for this machine",
    "zh-CN": "适合本机的图像模型"
  },
  "upstreamUi.0cfd98a25571": {
    "en": "Every model ODM can paint with on ComfyUI. Times are per picture once the model is loaded, timed with ODM's own portrait, creature and scene prompts at 1024 px; the first picture after switching models also loads it from disk. Add a model's files to ComfyUI, then Refresh.",
    "zh-CN": "ODM 支持通过 ComfyUI 使用的所有图像模型。耗时为模型加载后，使用 ODM 人物、怪物和场景提示词生成 1024 像素图像的单张耗时；切换模型后的首次生图还需从磁盘加载模型。将模型文件添加到 ComfyUI 后点击刷新。"
  },
  "upstreamUi.2012d97a1eb9": {
    "en": "Hide them",
    "zh-CN": "隐藏这些模型"
  },
  "upstreamUi.cab88e281cc4": {
    "en": "Show them",
    "zh-CN": "显示这些模型"
  },
  "upstreamUi.1185133b5b89": {
    "en": "(recommended)",
    "zh-CN": "（推荐）"
  },
  "upstreamUi.99087a0baccc": {
    "en": "(not listed)",
    "zh-CN": "（未列出）"
  },
  "upstreamUi.974fe3cc2ab7": {
    "en": "(unfit)",
    "zh-CN": "（不适用）"
  },
  "upstreamUi.9cb913980117": {
    "en": "Type a model id…",
    "zh-CN": "输入模型 ID…"
  },
  "upstreamUi.c89710d5b5b0": {
    "en": "List the backend's models again",
    "zh-CN": "重新获取服务模型列表"
  },
  "upstreamUi.d36feef04807": {
    "en": "Look again",
    "zh-CN": "重新检查"
  },
  "upstreamUi.b12ef70e22b6": {
    "en": "The backend did not answer.",
    "zh-CN": "服务未响应。"
  },
  "upstreamUi.f3a231e9dac9": {
    "en": "Not in the catalog; ODM will try it as typed.",
    "zh-CN": "未收录于目录；ODM 将尝试使用输入的模型 ID。"
  },
  "upstreamUi.b25ce8a5e68e": {
    "en": "Showing every model the server lists.",
    "zh-CN": "显示服务列出的所有模型。"
  },
  "upstreamUi.2150d8df37e4": {
    "en": "Show all",
    "zh-CN": "显示全部"
  },
  "upstreamUi.35ef0314cf88": {
    "en": "Catalog:",
    "zh-CN": "目录："
  },
  "upstreamUi.215571c33ea7": {
    "en": "(bundled copy)",
    "zh-CN": "（内置副本）"
  },
  "upstreamUi.38ae74823bc4": {
    "en": "Playing as",
    "zh-CN": "当前角色"
  },
  "upstreamUi.fe47da1ec5f5": {
    "en": "New entries below: jump to the latest",
    "zh-CN": "下方有新内容：跳转到最新条目"
  },
  "upstreamUi.55282598bc8d": {
    "en": "Jump to the latest entry",
    "zh-CN": "跳转到最新条目"
  },
  "upstreamUi.55c9b0dcd41f": {
    "en": "New below",
    "zh-CN": "下方有新内容"
  },
  "upstreamUi.8730d3c2022a": {
    "en": "Latest",
    "zh-CN": "最新"
  },
  "upstreamUi.97fd65ddb4a9": {
    "en": "Story arc",
    "zh-CN": "剧情主线"
  },
  "upstreamUi.509cf3e5bed6": {
    "en": "No planned events pending.",
    "zh-CN": "没有待发生的计划事件。"
  },
  "upstreamUi.d6b818f31875": {
    "en": "World lore",
    "zh-CN": "世界设定"
  },
  "upstreamUi.e29aa97e1f8e": {
    "en": "(secret)",
    "zh-CN": "（秘密）"
  },
  "upstreamUi.3bb965d7e1ee": {
    "en": "No entry matched this moment.",
    "zh-CN": "没有与当前情境匹配的条目。"
  },
  "upstreamUi.bbd50729e5f9": {
    "en": "The plan did not change.",
    "zh-CN": "计划未能修改。"
  },
  "upstreamUi.a1b564859cbf": {
    "en": "Could not reach the table.",
    "zh-CN": "无法连接游戏桌。"
  },
  "upstreamUi.930ae61ee6b0": {
    "en": "AI companion · acts as they see fit",
    "zh-CN": "AI 同伴 · 自行决定行动"
  },
  "upstreamUi.3bda48dafb63": {
    "en": "Checking the new order",
    "zh-CN": "正在检查新顺序"
  },
  "upstreamUi.5fa7aac5375c": {
    "en": "Ready",
    "zh-CN": "准备完毕"
  },
  "upstreamUi.c8a8ad725e36": {
    "en": "Share draft",
    "zh-CN": "分享草稿"
  },
  "upstreamUi.ebdf8cc00bc4": {
    "en": "Pass",
    "zh-CN": "跳过"
  },
  "upstreamUi.c0bf75bd78bf": {
    "en": "Change",
    "zh-CN": "更改"
  },
  "upstreamUi.164546a9c548": {
    "en": "Withdraw",
    "zh-CN": "撤回"
  },
  "upstreamUi.ef1bb997e66c": {
    "en": "Coordinated plan",
    "zh-CN": "协同行动计划"
  },
  "upstreamUi.f59897ea0ab8": {
    "en": "The party acts together",
    "zh-CN": "队伍协同行动"
  },
  "upstreamUi.7c96df370ee0": {
    "en": "The lead has set the order: each step happens after the one before it, and characters in one step act at the same time. Write what your character does at their step. Nothing happens until every player is ready; then the DM resolves the plan as one scene, step by step.",
    "zh-CN": "队长已设置行动顺序：各步骤依次进行，同一步骤中的角色同时行动。请填写你的角色在对应步骤的行动。所有玩家准备完毕后，DM 才会按顺序将计划结算为一个场景。"
  },
  "upstreamUi.1d1f4d2e4da2": {
    "en": "Say what each character does in the same moment, with any \"while\", \"after\" or \"if\". Nothing happens until every player is ready; then the DM resolves the plan as one moment.",
    "zh-CN": "描述每位角色在同一时刻的行动，可使用「同时」「之后」「如果」等条件。所有玩家准备完毕后，DM 才会统一结算这一时刻的行动。"
  },
  "upstreamUi.c88b69013747": {
    "en": "The plan's order",
    "zh-CN": "计划行动顺序"
  },
  "upstreamUi.16630c2ae41d": {
    "en": "Put the characters in the order they act. Drag a name onto a step to act with it, or between steps for a step of its own; the arrows do the same. A player who is already Ready and whose place changes is asked to look again.",
    "zh-CN": "排列角色的行动顺序。拖到某一步骤可同时行动，拖到步骤之间可单独行动，也可使用箭头。已准备完毕的玩家若顺序改变，需要重新确认。"
  },
  "upstreamUi.dda7ee33137e": {
    "en": "The order the characters act in",
    "zh-CN": "角色行动顺序"
  },
  "upstreamUi.f2146e42a5bd": {
    "en": "Save the order",
    "zh-CN": "保存顺序"
  },
  "upstreamUi.8069fe4b1ec2": {
    "en": "Save: all at once",
    "zh-CN": "保存：同时行动"
  },
  "upstreamUi.f90683717cd2": {
    "en": "All at once",
    "zh-CN": "同时行动"
  },
  "upstreamUi.19766ed6ccb2": {
    "en": "Cancel",
    "zh-CN": "取消"
  },
  "upstreamUi.55e62a99425a": {
    "en": "Change the order",
    "zh-CN": "更改顺序"
  },
  "upstreamUi.f46da3257885": {
    "en": "Set an order",
    "zh-CN": "设置顺序"
  },
  "upstreamUi.786ba018b367": {
    "en": "Hand the plan to the DM now",
    "zh-CN": "立即将计划交给 DM"
  },
  "upstreamUi.2613894a1866": {
    "en": "Resolve now",
    "zh-CN": "立即结算"
  },
  "upstreamUi.c5b8d818139a": {
    "en": "Set aside",
    "zh-CN": "搁置"
  },
  "upstreamUi.737eb9506295": {
    "en": "Stats:",
    "zh-CN": "属性："
  },
  "upstreamUi.88db1243f93b": {
    "en": "For 4d6 ability scores rolled at this table: whether a player may throw the six again, and when. The server rolls the dice either way. Following the server's rule, a player's six here are the ones they rolled in their library; with a rule of its own the table keeps a separate six for each player. A character made here still joins its player's library like any other, and characters brought from the library keep the scores they were made with.",
    "zh-CN": "决定本桌以 4d6 生成的六项属性是否允许重掷，以及重掷条件。骰子均由服务器掷出。遵循服务器规则时，使用玩家在角色库掷出的六项数值；本桌自定规则时，为每位玩家单独保存一组数值。在此创建的角色仍会加入角色库，从角色库导入的角色则保留原有属性。"
  },
  "upstreamUi.98903bb2fd86": {
    "en": "Rolled stats",
    "zh-CN": "掷骰生成属性"
  },
  "upstreamUi.43824354fbdc": {
    "en": "Stats: the first roll stands",
    "zh-CN": "属性：保留首次结果"
  },
  "upstreamUi.4b284c253f2b": {
    "en": "Stats: reroll freely",
    "zh-CN": "属性：允许自由重掷"
  },
  "upstreamUi.a4bf297601ae": {
    "en": "In More",
    "zh-CN": "更多卡牌"
  },
  "upstreamUi.18fdd549b2ed": {
    "en": "New",
    "zh-CN": "新增"
  },
  "upstreamUi.088751951e98": {
    "en": "To More",
    "zh-CN": "移至更多卡牌"
  },
  "upstreamUi.33af3744f677": {
    "en": "To Hand",
    "zh-CN": "加入手牌"
  },
  "upstreamUi.504465b9aed9": {
    "en": "In your hand",
    "zh-CN": "当前手牌"
  },
  "upstreamUi.59e2db8ad989": {
    "en": "No cards chosen: only End turn sits in the hand. Add some below.",
    "zh-CN": "尚未选择卡牌，手牌中只有「结束回合」。请从下方添加卡牌。"
  },
  "upstreamUi.07ebe7056b5f": {
    "en": "Every card has a seat.",
    "zh-CN": "所有卡牌均已加入手牌。"
  },
  "upstreamUi.11a6767d5674": {
    "en": "Done",
    "zh-CN": "完成"
  },
  "upstreamUi.0c2860d83d0a": {
    "en": "Back to automatic",
    "zh-CN": "恢复自动排列"
  },
  "upstreamUi.f7d5f49d22ad": {
    "en": "Automatic until you change a card.",
    "zh-CN": "修改卡牌位置前会自动排列。"
  },
  "upstreamUi.40bff90a21a7": {
    "en": "Coordinate actions",
    "zh-CN": "协同行动"
  },
  "upstreamUi.4a0923a1c2df": {
    "en": "Each player stages what their characters do in the same moment, edits it until ready or passes, and the DM resolves the whole plan as one beat. Companions join without holding it up. Set an order when one move has to come before another.",
    "zh-CN": "每位玩家填写角色在同一时刻的行动，编辑后选择准备完毕或跳过。DM 将整个计划统一结算。同伴会参与，但不会阻塞计划。行动有先后依赖时可以设置顺序。"
  },
  "upstreamUi.c989edf18246": {
    "en": "companion",
    "zh-CN": "同伴"
  },
  "upstreamUi.736c88b52c61": {
    "en": "In order",
    "zh-CN": "依次行动"
  },
  "upstreamUi.6fd785aaa71b": {
    "en": ": off, everyone acts at once",
    "zh-CN": "：已关闭，所有人同时行动"
  },
  "upstreamUi.82e93bc52aa2": {
    "en": "Set the order they act in",
    "zh-CN": "设置行动顺序"
  },
  "upstreamUi.e5f41a01933d": {
    "en": "The moment you are planning (optional)",
    "zh-CN": "计划中的情境（可选）"
  },
  "upstreamUi.52bedcf09092": {
    "en": "Open a shared plan; nothing reaches the DM until the players are ready",
    "zh-CN": "发起共享计划；玩家准备完毕前不会提交给 DM"
  },
  "upstreamUi.bdc10f09365d": {
    "en": "Coordinate",
    "zh-CN": "发起协同"
  },
  "upstreamUi.d1bc03d6aeb0": {
    "en": "The party is coordinating. The plan, with Resolve now and Set aside, is above the box where everyone types.",
    "zh-CN": "队伍正在协同行动。计划位于消息框上方，可选择「立即结算」或「搁置」。"
  },
  "upstreamUi.68de19c37c64": {
    "en": "Could not change the setting.",
    "zh-CN": "无法修改设置。"
  },
  "upstreamUi.111ff6e1879b": {
    "en": "Could not reach the server.",
    "zh-CN": "无法连接服务器。"
  },
  "upstreamUi.300d052f22b0": {
    "en": "Your characters",
    "zh-CN": "你的角色"
  },
  "upstreamUi.84c6ca51dcc7": {
    "en": "Characters:",
    "zh-CN": "角色："
  },
  "upstreamUi.902dcdd05c6d": {
    "en": "Keep this order",
    "zh-CN": "保留此顺序"
  },
  "upstreamUi.5a8f7e793475": {
    "en": "Put the cards in your own order: it is yours alone, and changes nothing for the fight or the march",
    "zh-CN": "按自己的习惯排列卡片；仅影响你的显示，不改变战斗或行军顺序"
  },
  "upstreamUi.d557a972ab06": {
    "en": "Arrange",
    "zh-CN": "排列"
  },
  "upstreamUi.ca3e99078a66": {
    "en": "Back to the table's own order",
    "zh-CN": "恢复游戏桌默认顺序"
  },
  "upstreamUi.78643863b6f8": {
    "en": "Reset order",
    "zh-CN": "重置顺序"
  },
  "upstreamUi.c3aa70c6a710": {
    "en": "Drag a handle, or use the arrows.",
    "zh-CN": "拖动手柄，或使用箭头调整。"
  },
  "upstreamUi.c8f9f73a9012": {
    "en": "Drag to move; arrow keys move it up or down",
    "zh-CN": "拖动调整位置；方向键可上下移动"
  },
  "upstreamUi.c66feb5eb8f2": {
    "en": "Move up",
    "zh-CN": "上移"
  },
  "upstreamUi.40bb50da160c": {
    "en": "Move down",
    "zh-CN": "下移"
  },
  "upstreamUi.91ae59bece79": {
    "en": "Could not hand the character to the DM.",
    "zh-CN": "无法将角色交给 DM。"
  },
  "upstreamUi.26af080af5e7": {
    "en": "Open Game settings",
    "zh-CN": "打开游戏设置"
  },
  "upstreamUi.06b552098596": {
    "en": "Make this character a party companion: the sheet and its progress stay, the DM plays it from here",
    "zh-CN": "将此角色转为队伍同伴：保留角色卡和进度，由 DM 接手控制"
  },
  "upstreamUi.7cd22614c92f": {
    "en": "Hand to the DM",
    "zh-CN": "交给 DM"
  },
  "upstreamUi.212f40515eff": {
    "en": "Could not select the character.",
    "zh-CN": "无法选择角色。"
  },
  "upstreamUi.1f0e4e359dac": {
    "en": "Leave the table for now",
    "zh-CN": "暂时离开游戏桌"
  },
  "upstreamUi.e10ae9907401": {
    "en": "Earlier",
    "zh-CN": "提前"
  },
  "upstreamUi.73b6e48a1b55": {
    "en": "Later",
    "zh-CN": "延后"
  },
  "upstreamUi.f99822979710": {
    "en": "At the same time as the step above",
    "zh-CN": "与上一步骤同时行动"
  },
  "upstreamUi.8e8975816ea8": {
    "en": "A step of their own",
    "zh-CN": "单独行动"
  },
  "upstreamUi.280109143d47": {
    "en": "Bring in prep",
    "zh-CN": "导入备团资料"
  },
  "upstreamUi.50161f9bb184": {
    "en": "Copy maps, NPCs, lore, encounters and more from a workshop or another campaign. The source keeps its own version; name clashes get numbered rather than overwritten.",
    "zh-CN": "从工坊或其他战役复制地图、NPC、世界设定、遭遇等内容。来源保留原版，重名内容会添加编号，不会覆盖。"
  },
  "upstreamUi.b6dc05c45f5d": {
    "en": "This campaign has ended",
    "zh-CN": "此战役已结束"
  },
  "upstreamUi.40cd0376b71a": {
    "en": "Characters from a library took their progress home with them. The story stays here to read.",
    "zh-CN": "从角色库导入的角色已将进度带回角色库。故事仍可在此阅读。"
  },
  "upstreamUi.1e5673d84950": {
    "en": "End the campaign",
    "zh-CN": "结束战役"
  },
  "upstreamUi.2ded6d2c265d": {
    "en": "Could not end the campaign.",
    "zh-CN": "无法结束战役。"
  },
  "upstreamUi.e315efc6244e": {
    "en": "When the story is done: library characters take their progress home, and the table closes. The transcript stays readable.",
    "zh-CN": "故事结束后，角色库中的角色将带回进度，游戏桌关闭，文字记录仍可阅读。"
  },
  "upstreamUi.4ed111e75262": {
    "en": "The campaign has ended",
    "zh-CN": "战役已结束"
  },
  "upstreamUi.ffdb9c4496d2": {
    "en": "All campaigns",
    "zh-CN": "全部战役"
  },
  "upstreamUi.088efe1bd87b": {
    "en": "Every tab has a pane of its own. Put one back from its bar to see it here again.",
    "zh-CN": "所有标签页都已独立为面板。通过面板标题栏将其放回，即可在此重新显示。"
  },
  "upstreamUi.79f13b5b5116": {
    "en": "Held: the scene will not change this on its own.",
    "zh-CN": "已锁定：不会随场景自动切换。"
  },
  "upstreamUi.85cd61f8c3c8": {
    "en": "Held",
    "zh-CN": "已锁定"
  },
  "upstreamUi.6c61fe498281": {
    "en": "Silence",
    "zh-CN": "静音"
  },
  "upstreamUi.0f7667c26e82": {
    "en": "No audio for this cue on this server",
    "zh-CN": "服务器没有此音效的音频"
  },
  "upstreamUi.bfea5a135221": {
    "en": "Nothing is playing here.",
    "zh-CN": "当前没有播放内容。"
  },
  "upstreamUi.1ff57a29d7c9": {
    "en": "Next",
    "zh-CN": "下一首"
  },
  "upstreamUi.1709305c9fa9": {
    "en": "Level",
    "zh-CN": "音量"
  },
  "upstreamUi.a1d116e6a0e6": {
    "en": "Change the sound",
    "zh-CN": "更改声音"
  },
  "upstreamUi.3ec9177dabb3": {
    "en": "What to change",
    "zh-CN": "选择声音类别"
  },
  "upstreamUi.911ea89c43d9": {
    "en": "Room",
    "zh-CN": "环境音"
  },
  "upstreamUi.6eb00b4b2614": {
    "en": "Music",
    "zh-CN": "音乐"
  },
  "upstreamUi.6f305c4b1874": {
    "en": "Sounds",
    "zh-CN": "音效"
  },
  "upstreamUi.8e685d5409b3": {
    "en": "Hold",
    "zh-CN": "锁定"
  },
  "upstreamUi.9bb71f8207f6": {
    "en": "The scene will leave this alone until you change it.",
    "zh-CN": "保持当前声音，直到你主动修改。"
  },
  "upstreamUi.c5ece8d6bf9d": {
    "en": "The scene picks this on its own: a new place sets the room, a fight sets the music.",
    "zh-CN": "随场景自动选择：地点变化时更换环境音，战斗开始时更换音乐。"
  },
  "upstreamUi.d1f104711b0d": {
    "en": "The scene does not change the sound at this table; it stays until someone sets it.",
    "zh-CN": "本桌不会随场景自动更换声音，需要手动设置。"
  },
  "upstreamUi.053a23a9d89c": {
    "en": "One sound, once, over whatever is playing.",
    "zh-CN": "在当前播放内容上叠加一次音效。"
  },
  "upstreamUi.363714b20050": {
    "en": "This server has no sound library yet, so every cue is silence. The server admin can install it from the admin panel.",
    "zh-CN": "服务器尚未安装声音库，因此所有音效都没有声音。管理员可在管理面板中安装。"
  },
  "upstreamUi.3ca20f901376": {
    "en": "This server has no sound library yet, so every cue is silence. The rooms, music and sounds are a download of about 75 MB, kept across updates and credited on the licenses page.",
    "zh-CN": "服务器尚未安装声音库。环境音、音乐和音效约需下载 75 MB，更新后仍会保留，创作者信息见授权页面。"
  },
  "upstreamUi.92a46851201e": {
    "en": "Download the sound library",
    "zh-CN": "下载声音库"
  },
  "upstreamUi.46124e023603": {
    "en": "Sound",
    "zh-CN": "声音"
  },
  "upstreamUi.8c477e13ad00": {
    "en": "Sound on",
    "zh-CN": "声音已开启"
  },
  "upstreamUi.cef52cd9c332": {
    "en": "Sound off for you",
    "zh-CN": "已为你静音"
  },
  "upstreamUi.b10fb966d720": {
    "en": "Volume",
    "zh-CN": "音量"
  },
  "upstreamUi.30b92ce79166": {
    "en": "Sound volume",
    "zh-CN": "声音音量"
  },
  "upstreamUi.cda1a1d78ef0": {
    "en": "Your browser is holding the sound back until you tap something on the page.",
    "zh-CN": "请先点击页面上的任意位置，浏览器才允许播放声音。"
  },
  "upstreamUi.3c868309896f": {
    "en": "No picture model is saved on this device, so nothing is painted. Save your key again from Story AI on the app's home screen, which picks one from the key's list, or pick one in Admin > Image generation.",
    "zh-CN": "此设备尚未保存图像模型。请在应用首页的「故事 AI」重新保存密钥，以便从服务列表选择模型；也可在「管理 > 图像生成」中选择。"
  },
  "upstreamUi.efb7dc26117e": {
    "en": "No picture model is picked on this server, so nothing is painted. An admin picks one in Admin > Image generation.",
    "zh-CN": "服务器尚未选择图像模型。请管理员在「管理 > 图像生成」中选择。"
  },
  "upstreamUi.aa80bd7cf371": {
    "en": "No picture model is picked, so nothing is painted until one is. Pick it in Admin > Image generation.",
    "zh-CN": "尚未选择图像模型。请在「管理 > 图像生成」中选择后再生成图像。"
  },
  "upstreamUi.f1c953c6bae6": {
    "en": "Reading the summary",
    "zh-CN": "正在读取摘要"
  },
  "upstreamUi.2956e06ac065": {
    "en": "Resize",
    "zh-CN": "调整大小"
  },
  "upstreamUi.37f0f69cbd01": {
    "en": "Resize the chronicle",
    "zh-CN": "调整纪事面板大小"
  },
  "upstreamUi.21c3befcfb98": {
    "en": "Drag to resize it, or use the arrow keys",
    "zh-CN": "拖动调整大小，或使用方向键"
  },
  "upstreamUi.2d05e400b6c0": {
    "en": "Drag to move it, or use the arrow keys",
    "zh-CN": "拖动移动，或使用方向键"
  },
  "upstreamUi.da666c41e9b9": {
    "en": "Restore the layout",
    "zh-CN": "恢复布局"
  },
  "upstreamUi.81390b846e37": {
    "en": "Arrange the table",
    "zh-CN": "排列游戏桌"
  },
  "upstreamUi.f75f93e273dc": {
    "en": "Drag a panel by its bar: onto another panel's edge to sit beside it, onto its middle to swap the two, or to either end of the row. Drag the lines between panels to resize them. Everything keeps running while you do.",
    "zh-CN": "拖动面板标题栏：拖至另一面板边缘可并排放置，拖至中央可交换位置，也可拖至整行两端。拖动面板间的分隔线可调整大小。调整时游戏仍会继续运行。"
  },
  "upstreamUi.13df40bd2e32": {
    "en": "Give a tab its own pane",
    "zh-CN": "将标签页独立为面板"
  },
  "upstreamUi.0df6f1cad36c": {
    "en": "Show",
    "zh-CN": "显示"
  },
  "upstreamUi.daee7606b339": {
    "en": "Reset",
    "zh-CN": "重置"
  },
  "upstreamUi.26e45df117d1": {
    "en": "Arrange the table: move, resize and lock its panels",
    "zh-CN": "排列游戏桌：移动、调整大小或锁定面板"
  },
  "upstreamUi.b7e83409aa13": {
    "en": "Table layout",
    "zh-CN": "游戏桌布局"
  },
  "upstreamUi.601b2c716578": {
    "en": "Done arranging",
    "zh-CN": "完成排列"
  },
  "upstreamUi.6eeac5270ffe": {
    "en": "Lock layout",
    "zh-CN": "锁定布局"
  },
  "upstreamUi.2e2a17849c24": {
    "en": "Reset layout",
    "zh-CN": "重置布局"
  },
  "upstreamUi.d6210ef09e18": {
    "en": "Agreed",
    "zh-CN": "已同意"
  },
  "upstreamUi.c8781da41445": {
    "en": "Asked for a change",
    "zh-CN": "已请求修改"
  },
  "upstreamUi.6e293a8c009e": {
    "en": "Waiting",
    "zh-CN": "等待中"
  },
  "upstreamUi.726a1f4d03dc": {
    "en": "I would rather scout ahead.",
    "zh-CN": "我更想在前方侦察。"
  },
  "upstreamUi.f6f4688ff23d": {
    "en": "Send",
    "zh-CN": "发送"
  },
  "upstreamUi.da288642c92f": {
    "en": "Agree",
    "zh-CN": "同意"
  },
  "upstreamUi.f445fc4ffc97": {
    "en": "Ask for a change",
    "zh-CN": "请求修改"
  },
  "upstreamUi.c983ae1e9fb2": {
    "en": "Travel formation",
    "zh-CN": "行军队形"
  },
  "upstreamUi.a2b335608c6a": {
    "en": "Front first. The DM reads this order on every turn; it places the party and grants no bonus.",
    "zh-CN": "前排在上。DM 每回合都会读取此顺序，用于确定队伍位置，不提供数值加成。"
  },
  "upstreamUi.9a3c5460432b": {
    "en": "Out",
    "zh-CN": "移出"
  },
  "upstreamUi.3b426a0b9c81": {
    "en": "Not placed:",
    "zh-CN": "尚未安排："
  },
  "upstreamUi.b7d0a349ffa8": {
    "en": "Save now",
    "zh-CN": "立即保存"
  },
  "upstreamUi.63e10b7200a3": {
    "en": "Propose to the party",
    "zh-CN": "向队伍提议"
  },
  "upstreamUi.f4909f127444": {
    "en": "Save now puts it in force at once; Propose waits until the players it moves agree, or until you make it active. Either way they are asked.",
    "zh-CN": "「立即保存」会马上生效；「提议」会等待受影响玩家同意，或由你主动启用。两种方式都会征询他们的意见。"
  },
  "upstreamUi.aff7d74e18ff": {
    "en": "No travel formation yet.",
    "zh-CN": "尚未设置行军队形。"
  },
  "upstreamUi.b9c3215a2990": {
    "en": "Arrange one so the DM knows who walks first.",
    "zh-CN": "设置队形，让 DM 知道谁走在前面。"
  },
  "upstreamUi.68c16e7e09c9": {
    "en": "The party lead arranges it.",
    "zh-CN": "由队长设置队形。"
  },
  "upstreamUi.86c074919a17": {
    "en": "Not placed yet:",
    "zh-CN": "尚未安排："
  },
  "upstreamUi.5e576b60fb9f": {
    "en": "Make it active now",
    "zh-CN": "立即启用"
  },
  "upstreamUi.b2e4a8088c27": {
    "en": "Clear the answers",
    "zh-CN": "清除答复"
  },
  "upstreamUi.1b677e5e1c5c": {
    "en": "Rearrange the formation",
    "zh-CN": "重新排列队形"
  },
  "upstreamUi.228fa9f78a1c": {
    "en": "Arrange the formation",
    "zh-CN": "设置队形"
  },
  "upstreamUi.7d9eb7acb13e": {
    "en": "Close",
    "zh-CN": "关闭"
  },
  "upstreamUi.36df3b4f2726": {
    "en": "Back to the table",
    "zh-CN": "返回游戏桌"
  },
  "upstreamUi.087ff4b27d5d": {
    "en": "Edit build",
    "zh-CN": "编辑角色构筑"
  },
  "upstreamUi.1578114b6645": {
    "en": "Change this character's build choices in the library",
    "zh-CN": "在角色库中修改此角色的构筑选项"
  },
  "upstreamUi.cef1d2d07ff4": {
    "en": "Duplicate and edit",
    "zh-CN": "复制并编辑"
  },
  "upstreamUi.096a9cf641e8": {
    "en": "Save a second copy and open it in the build editor; this one stays as it is",
    "zh-CN": "保存副本并打开构筑编辑器，保留当前角色不变"
  },
  "upstreamUi.3a8ca059fe92": {
    "en": "(kept)",
    "zh-CN": "（保留）"
  },
  "upstreamUi.c35778982268": {
    "en": "Their levels are split between classes, which only a level-up in play changes. The split stays as it is.",
    "zh-CN": "此角色的等级分配在多个职业中，只能在游戏内升级时调整。当前分配会保留。"
  },
  "upstreamUi.b8025ffc0181": {
    "en": "The first roll stands",
    "zh-CN": "保留首次结果"
  },
  "upstreamUi.5b64526eef07": {
    "en": "Reroll as often as you like",
    "zh-CN": "允许自由重掷"
  },
  "upstreamUi.79acb842a996": {
    "en": "For 4d6 ability scores rolled here: whether a player may throw the six again. The server rolls them either way. Following the server, a player's six here are the ones from their library; a rule of the table's own gives each player a separate six here.",
    "zh-CN": "决定在此以 4d6 生成的六项属性是否允许重掷。骰子均由服务器掷出。遵循服务器规则时使用角色库中的六项数值；本桌自定规则时，为每位玩家单独保存一组数值。"
  },
  "upstreamUi.c6dbb0b1238b": {
    "en": "Not now, back to Open Dungeon Master",
    "zh-CN": "暂时不了，返回 Open Dungeon Master"
  },
  "upstreamUi.556a5d3b1f2d": {
    "en": "To wake this agent on its turn, play a character at that table first, then connect it again.",
    "zh-CN": "若要在轮到代理时唤醒它，请先在该游戏桌控制一个角色，再重新连接代理。"
  },
  "upstreamUi.19c6539d9ddb": {
    "en": "The receiver's HTTPS address",
    "zh-CN": "接收服务的 HTTPS 地址"
  },
  "upstreamUi.9bc348a5b4e1": {
    "en": "Local port",
    "zh-CN": "本地端口"
  },
  "upstreamUi.12a78fc1592b": {
    "en": "Seating more than one agent from the same computer? Give each its own local port (8787, 8788, 8789) and its own HTTPS port (Funnel takes 443, 8443 and 10000).",
    "zh-CN": "若同一电脑有多个代理入座，请为每个代理分配独立的本地端口（如 8787、8788、8789）和 HTTPS 端口（Funnel 支持 443、8443、10000）。"
  },
  "upstreamUi.f009eb8b75cb": {
    "en": "Checking whether this server may reach it…",
    "zh-CN": "正在检查服务器是否允许访问此地址…"
  },
  "upstreamUi.925dfda6738a": {
    "en": "Allow it under Admin > Player agents",
    "zh-CN": "在「管理 > 玩家代理」中允许此地址"
  },
  "upstreamUi.612d11a10934": {
    "en": "Ask its admin to allow it under Admin > Player agents",
    "zh-CN": "请管理员在「管理 > 玩家代理」中允许此地址"
  },
  "upstreamUi.d6eafe823591": {
    "en": "Download",
    "zh-CN": "下载"
  },
  "upstreamUi.61091668e560": {
    "en": "Keep it in a private folder of your own, outside the repository. Below, replace PATH with that folder.",
    "zh-CN": "将文件保存在仓库之外的私人文件夹中，并将下方 PATH 替换为该文件夹路径。"
  },
  "upstreamUi.d4543d35472c": {
    "en": "In the ODM repository on that computer, run the setup once. It asks for the token above.",
    "zh-CN": "在该电脑的 ODM 仓库中运行一次设置命令，按提示输入上方令牌。"
  },
  "upstreamUi.662308942546": {
    "en": "Start the receiver and keep it running.",
    "zh-CN": "启动接收服务，并保持运行。"
  },
  "upstreamUi.b9e7246ba09f": {
    "en": "Publish it at the address you gave, once.",
    "zh-CN": "将接收服务发布到填写的地址，只需执行一次。"
  },
  "upstreamUi.8f43585c74d8": {
    "en": "Picture model",
    "zh-CN": "图像模型"
  },
  "upstreamUi.60d9fa6a5193": {
    "en": "The picture models the key lists.",
    "zh-CN": "此密钥可使用的图像模型。"
  },
  "upstreamUi.8abd5fe18616": {
    "en": "Narration model",
    "zh-CN": "旁白模型"
  },
  "upstreamUi.a04630ef8bc3": {
    "en": "Gender",
    "zh-CN": "性别"
  },
  "upstreamUi.5b8aa0bf3c59": {
    "en": "Unspecified",
    "zh-CN": "未指定"
  },
  "upstreamUi.8b743ebe1a90": {
    "en": "Kind of ground",
    "zh-CN": "地形类型"
  },
  "upstreamUi.6f2a177b5b91": {
    "en": "Where the party is",
    "zh-CN": "队伍所在地"
  },
  "upstreamUi.0e68d8ef24ef": {
    "en": "Shorten it to save.",
    "zh-CN": "请缩短后保存。"
  },
  "upstreamUi.18a4846bff72": {
    "en": "This may read oddly:",
    "zh-CN": "以下文字可能不通顺："
  },
  "upstreamUi.a33cc1c643e6": {
    "en": "It may have been written this way; nothing is changed.",
    "zh-CN": "也可能是作者有意这样写，内容未被修改。"
  },
  "upstreamUi.48845bff334a": {
    "en": "Dismiss",
    "zh-CN": "忽略"
  },
  "upstreamUi.28958ab853b3": {
    "en": "Every line has a known weight.",
    "zh-CN": "每项物品都有已知重量。"
  },
  "upstreamUi.c9129025bd3f": {
    "en": "Sort by",
    "zh-CN": "排序依据"
  },
  "upstreamUi.ab8055a39c03": {
    "en": "Line total",
    "zh-CN": "单项总重"
  },
  "upstreamUi.8e3124f76797": {
    "en": "Weight each",
    "zh-CN": "单件重量"
  },
  "upstreamUi.6be090825c99": {
    "en": "Order",
    "zh-CN": "顺序"
  },
  "upstreamUi.9c8f331d4118": {
    "en": "Heaviest first",
    "zh-CN": "最重优先"
  },
  "upstreamUi.064c90680a48": {
    "en": "Lightest first",
    "zh-CN": "最轻优先"
  },
  "upstreamUi.652bcc3a4784": {
    "en": "Item",
    "zh-CN": "物品"
  },
  "upstreamUi.a9be9c3e9ab6": {
    "en": "Qty",
    "zh-CN": "数量"
  },
  "upstreamUi.a9531f640279": {
    "en": "Each",
    "zh-CN": "单件"
  },
  "upstreamUi.c9b3c38247f7": {
    "en": "Total",
    "zh-CN": "总计"
  },
  "upstreamUi.b23a6a8439c0": {
    "en": "unknown",
    "zh-CN": "未知"
  },
  "upstreamUi.7ae57d9d0e8c": {
    "en": "Coins",
    "zh-CN": "钱币"
  },
  "upstreamUi.4014b8870c71": {
    "en": "Carried",
    "zh-CN": "携带重量"
  },
  "upstreamUi.c2cfec66629a": {
    "en": "Concentration",
    "zh-CN": "专注"
  },
  "upstreamUi.7f6157469a3a": {
    "en": "Concentration: casting another concentration spell ends this one",
    "zh-CN": "专注：施放另一个需要专注的法术将结束此法术"
  },
  "upstreamUi.6b23c0d5f35d": {
    "en": "C",
    "zh-CN": "专"
  },
  "upstreamUi.handSeat": {
    "en": "In Hand · seat {seat}",
    "zh-CN": "手牌 · 第 {seat} 位"
  },
  "upstreamUi.handLeft": {
    "en": "Move {name} one seat left",
    "zh-CN": "将「{name}」向左移一位"
  },
  "upstreamUi.handRight": {
    "en": "Move {name} one seat right",
    "zh-CN": "将「{name}」向右移一位"
  },
  "upstreamUi.handCount": {
    "en": "{used} of {max} seats chosen",
    "zh-CN": "已选择 {used}/{max} 个手牌位"
  },
  "upstreamUi.handCountHint": {
    "en": "{used} of {max} seats chosen. End turn keeps the ninth.",
    "zh-CN": "已选择 {used}/{max} 个手牌位，第九位留给「结束回合」。"
  },
  "upstreamUi.handUrgentOne": {
    "en": "{names} takes a seat first while it matters{displaced}. Your arrangement stays as you set it.",
    "zh-CN": "需要时，「{names}」会优先占用手牌位{displaced}。你的排列设置会保留。"
  },
  "upstreamUi.handUrgentMany": {
    "en": "{names} take a seat first while they matter{displaced}. Your arrangement stays as you set it.",
    "zh-CN": "需要时，「{names}」会优先占用手牌位{displaced}。你的排列设置会保留。"
  },
  "upstreamUi.handDisplacedOne": {
    "en": "; {names} waits in More until then",
    "zh-CN": "；「{names}」暂时留在更多卡牌中"
  },
  "upstreamUi.handDisplacedMany": {
    "en": "; {names} wait in More until then",
    "zh-CN": "；「{names}」暂时留在更多卡牌中"
  },
  "upstreamUi.handMissingOne": {
    "en": "One card you chose is not in this hand now (no longer prepared or carried), so its seat is free.",
    "zh-CN": "有一张所选卡牌已不在当前手牌中（不再准备或携带），对应位置现已空出。"
  },
  "upstreamUi.handMissingMany": {
    "en": "{count} cards you chose are not in this hand now (no longer prepared or carried), so their seats are free.",
    "zh-CN": "有 {count} 张所选卡牌已不在当前手牌中（不再准备或携带），对应位置现已空出。"
  },
  "upstreamUi.spellConcentrationShort": {
    "en": "C",
    "zh-CN": "专"
  },
  "upstreamUi.helpLabel.layout": {"en": "layout", "zh-CN": "布局"},
  "upstreamUi.helpLabel.arrange": {"en": "Arrange the table", "zh-CN": "排列桌面"},
  "upstreamUi.helpLabel.lock": {"en": "Lock layout", "zh-CN": "锁定布局"},
  "upstreamUi.helpLabel.reset": {"en": "Reset layout", "zh-CN": "重置布局"},
  "upstreamUi.helpLabel.dictation": {"en": "Dictation key", "zh-CN": "听写快捷键"},
  "upstreamUi.helpLayout": {"en": "On a wide screen the table can be arranged your way. Drag the line between two panels to resize them. The {layout} button in the header opens {arrange}: give a tab such as Party, Story or Notes a pane of its own so several show at once, drag a panel by its bar to dock it beside another, float it over the table, maximize it (Escape puts it back) or set it aside and show it again later with whatever it held. {lock} keeps it as it is and {reset} brings back the table's own. Only this browser remembers it; a phone keeps its bottom bar.", "zh-CN": "在宽屏上，你可以自行排列桌面。拖动面板之间的分隔线即可调整大小。顶部的{layout}按钮会打开{arrange}：可为队伍、故事或笔记等标签单独安排面板，同时查看多项内容；拖动面板标题栏可停靠到其他面板旁、悬浮、最大化（按 Escape 还原），或暂时收起后恢复原有内容。{lock}固定当前布局，{reset}恢复默认布局。布局仅保存在此浏览器中，手机仍使用底部导航栏。"},
  "upstreamUi.levelTraining": {
    "en": "{subclass} trains {name} in more at this level.",
    "zh-CN": "{name}在此等级通过「{subclass}」获得额外训练。"
  },
  "upstreamUi.questionLimit": {
    "en": "Questions can be up to {max} characters",
    "zh-CN": "问题最多可输入 {max} 个字符"
  },
  "upstreamUi.arcBudget": {
    "en": "{shown}/{total} beats, {chars}/{budget} event chars",
    "zh-CN": "{shown}/{total} 个情节节点，事件字符 {chars}/{budget}"
  },
  "upstreamUi.loreBudget": {
    "en": "{shown}/{total} entries, {chars}/{budget} chars",
    "zh-CN": "{shown}/{total} 个条目，字符 {chars}/{budget}"
  },
  "upstreamUi.heldBack": {
    "en": "held back ({reason})",
    "zh-CN": "未纳入（{reason}）"
  },
  "upstreamUi.subclassTraining": {
    "en": "{subclass} trains {name} in more at this level.",
    "zh-CN": "{subclass}在此等级为{name}提供更多训练。"
  },
  "upstreamUi.theSubclass": {
    "en": "The subclass",
    "zh-CN": "此子职"
  },
  "upstreamUi.allySeated": {
    "en": "{name} is filed in the library as an ally the DM plays, but sits here as a player's character, so the DM takes no turns for them.",
    "zh-CN": "{name}在角色库中被标记为由地下城主操控的盟友，但在此战役中是玩家角色，因此地下城主不会代其行动。"
  },
  "upstreamUi.allCampaigns": {
    "en": "All campaigns",
    "zh-CN": "所有战役"
  },
  "upstreamUi.endCampaignConfirm": {
    "en": "End \"{title}\" for everyone? Every character brought in from a library takes its level, XP, gold, gear and spells home, and the story stays here to read, but nobody can play on and the room code stops working. This cannot be undone.",
    "zh-CN": "确定为所有人结束“{title}”吗？从角色库加入的角色会将等级、经验值、金币、装备和法术带回角色库。故事仍可阅读，但无法继续游玩，房间码也将失效。此操作无法撤销。"
  },
  "upstreamUi.endCampaign": {
    "en": "End the campaign",
    "zh-CN": "结束战役"
  },
  "upstreamUi.examplePrefix": {
    "en": "For example: {example}",
    "zh-CN": "例如：{example}"
  },
  "upstreamUi.statsRule": {
    "en": "Stats: {rule}",
    "zh-CN": "属性：{rule}"
  },
  "upstreamUi.statsLow": {
    "en": "Stats: reroll under {value}",
    "zh-CN": "属性：总和低于 {value} 时可重掷"
  },
  "upstreamUi.rerollLow": {
    "en": "Reroll a roll totalling under {value}",
    "zh-CN": "总和低于 {value} 时可重掷"
  },
  "upstreamUi.followReroll": {
    "en": "Follow the server's reroll rule{rule}",
    "zh-CN": "遵循服务器的重掷规则{rule}"
  },
  "upstreamUi.rerollKeep": {
    "en": "The first roll stands",
    "zh-CN": "保留首次掷骰结果"
  },
  "upstreamUi.rerollFree": {
    "en": "Reroll as often as you like",
    "zh-CN": "可不限次数重掷"
  },
  "upstreamUi.rerollServer": {
    "en": "The server's reroll rule",
    "zh-CN": "服务器的重掷规则"
  },
  "upstreamUi.rerollServerKnown": {
    "en": "The server's rule ({rule})",
    "zh-CN": "服务器规则（{rule}）"
  },
  "playReviewUi.tour.player.layout.title": {
    "en": "Arrange the table",
    "zh-CN": "调整桌面布局"
  },
  "playReviewUi.tour.player.layout.body": {
    "en": "On a wide screen this menu lets you move and resize the panels: drag the lines between them, give a tab such as Party, Story or Notes a pane of its own so several show at once, float one over the table or maximize it. Lock keeps it as it is, Reset brings back this arrangement. Only this browser keeps it; nothing changes for anyone else.",
    "zh-CN": "宽屏下可通过此菜单移动和调整面板：拖动面板之间的分隔线，将队伍、故事或笔记等标签独立成一个窗格，让多个面板同时显示，也可悬浮或最大化某个面板。锁定可保持当前布局，重置可恢复默认布局。设置仅保存在当前浏览器，不影响其他玩家。"
  },
  "playReviewUi.tour.dm.layout.title": {
    "en": "Arrange the table",
    "zh-CN": "调整桌面布局"
  },
  "playReviewUi.tour.dm.layout.body": {
    "en": "On a wide screen this menu lets you move and resize the panels: drag the lines between them, give a tab such as Party, Story or Notes a pane of its own so several show at once, float one over the table or maximize it. Lock keeps it as it is, Reset brings back this arrangement. Only this browser keeps it; nothing changes for anyone else.",
    "zh-CN": "宽屏下可通过此菜单移动和调整面板：拖动面板之间的分隔线，将队伍、故事或笔记等标签独立成一个窗格，让多个面板同时显示，也可悬浮或最大化某个面板。锁定可保持当前布局，重置可恢复默认布局。设置仅保存在当前浏览器，不影响其他玩家。"
  },
  "upstreamUi.coord.waiting": {
    "en": "Waiting",
    "zh-CN": "等待中"
  },
  "upstreamUi.coord.drafting": {
    "en": "Drafting",
    "zh-CN": "拟定中"
  },
  "upstreamUi.coord.ready": {
    "en": "Ready",
    "zh-CN": "已准备"
  },
  "upstreamUi.coord.pass": {
    "en": "Passed",
    "zh-CN": "已跳过"
  },
  "upstreamUi.coord.party": {
    "en": "the party",
    "zh-CN": "队伍"
  },
  "upstreamUi.coord.requested": {
    "en": "AI companion · asked by {who}",
    "zh-CN": "AI 同伴 · 由{who}请求"
  },
  "upstreamUi.coord.orderChanged": {
    "en": "The lead changed the order after you were ready: {place}. Check your part still fits, then mark it Ready again.",
    "zh-CN": "你准备好后，队长修改了行动顺序：{place}。请检查你的计划是否仍适用，然后再次标记为已准备。"
  },
  "upstreamUi.coord.nowAt": {
    "en": "{name} is now {place}",
    "zh-CN": "{name}现在位于{place}"
  },
  "upstreamUi.coord.allNow": {
    "en": "everyone now acts at once",
    "zh-CN": "现在所有人同时行动"
  },
  "upstreamUi.coord.stepPrompt": {
    "en": "What does {name} do at this step?",
    "zh-CN": "{name}在这一步做什么？"
  },
  "upstreamUi.coord.prompt": {
    "en": "What does {name} do? (\"While Brann talks to the guard, I slip past to the gate.\")",
    "zh-CN": "{name}打算做什么？（例如：“布兰和守卫交谈时，我悄悄溜到门边。”）"
  },
  "upstreamUi.coord.part": {
    "en": "{name}'s part in the plan",
    "zh-CN": "{name}在计划中的行动"
  },
  "upstreamUi.coord.askPrompt": {
    "en": "Ask {name} to... (optional)",
    "zh-CN": "请{name}……（可选）"
  },
  "upstreamUi.coord.askLabel": {
    "en": "Ask {name} to",
    "zh-CN": "请求{name}执行"
  },
  "upstreamUi.coord.waitingCount": {
    "en": "waiting on {count}",
    "zh-CN": "等待 {count} 人"
  },
  "upstreamUi.coord.afterStep": {
    "en": "After step {step}",
    "zh-CN": "在第 {step} 步之后"
  },
  "upstreamUi.coord.willPass": {
    "en": "{names} will pass",
    "zh-CN": "{names}将跳过行动"
  },
  "upstreamUi.coord.resolveNow": {
    "en": "Resolve now ({names} pass)",
    "zh-CN": "立即执行（{names}跳过）"
  },
  "upstreamUi.coord.ask": {
    "en": "Ask",
    "zh-CN": "请求"
  },
  "upstreamUi.coord.allReady": {
    "en": "all ready",
    "zh-CN": "所有人已准备"
  },
  "upstreamUi.coord.first": {
    "en": "First",
    "zh-CN": "首先"
  },
  "upstreamUi.coord.together": {
    "en": "· at the same time",
    "zh-CN": "· 同时行动"
  },
  "upstreamUi.coord.waitingAgain": {
    "en": "Waiting for {names} to look at the new order and mark it Ready again.",
    "zh-CN": "等待{names}查看新的顺序并再次标记为已准备。"
  },
  "upstreamUi.coord.place": {
    "en": "step {step} of {total}",
    "zh-CN": "第 {step}/{total} 步"
  },
  "upstreamUi.coord.afterNames": {
    "en": "after {names}",
    "zh-CN": "在{names}之后"
  },
  "upstreamUi.coord.alongside": {
    "en": "at the same time as {names}",
    "zh-CN": "与{names}同时行动"
  },
  "upstreamUi.coord.everyone": {
    "en": "everyone acts at once",
    "zh-CN": "所有人同时行动"
  },
  "upstreamUi.coord.someone": {
    "en": "someone",
    "zh-CN": "某人"
  },
  "upstreamUi.coord.moved": {
    "en": "{name}: step {step} of {total}{mates}.",
    "zh-CN": "{name}：第 {step}/{total} 步{mates}。"
  },
  "upstreamUi.coord.mates": {
    "en": ", with {count} more",
    "zh-CN": "，与另外 {count} 人同行"
  },
  "upstreamUi.coord.step": {
    "en": "Step {step}",
    "zh-CN": "第 {step} 步"
  },
  "upstreamUi.coord.after": {
    "en": " · after step {step}",
    "zh-CN": " · 在第 {step} 步之后"
  },
  "upstreamUi.coord.firstSuffix": {
    "en": " · first",
    "zh-CN": " · 首先"
  },
  "upstreamUi.coord.earlier": {
    "en": "Move {name} earlier",
    "zh-CN": "将{name}提前"
  },
  "upstreamUi.coord.later": {
    "en": "Move {name} later",
    "zh-CN": "将{name}后移"
  },
  "upstreamUi.coord.join": {
    "en": "{name} acts at the same time as step {step}",
    "zh-CN": "让{name}与第 {step} 步同时行动"
  },
  "upstreamUi.coord.own": {
    "en": "{name} takes a step of their own",
    "zh-CN": "让{name}独立成一步"
  },
  "upstreamUi.layoutResize": {
    "en": "Resize {label}",
    "zh-CN": "调整大小：{label}"
  },
  "upstreamUi.layoutMove": {
    "en": "Move {label}",
    "zh-CN": "移动：{label}"
  },
  "upstreamUi.layoutFloat": {
    "en": "Float {label}",
    "zh-CN": "悬浮：{label}"
  },
  "upstreamUi.layoutDock": {
    "en": "Dock {label}",
    "zh-CN": "停靠：{label}"
  },
  "upstreamUi.layoutMaximize": {
    "en": "Maximize {label}",
    "zh-CN": "最大化：{label}"
  },
  "upstreamUi.layoutHide": {
    "en": "Hide {label}",
    "zh-CN": "隐藏：{label}"
  },
  "upstreamUi.layoutReturn": {
    "en": "Put {label} back in the side panel",
    "zh-CN": "将{label}放回侧边面板"
  },
  "upstreamUi.pane.table": {
    "en": "Table",
    "zh-CN": "桌面"
  },
  "upstreamUi.pane.rail": {
    "en": "Party portraits",
    "zh-CN": "队伍肖像"
  },
  "upstreamUi.pane.panel": {
    "en": "Side panel",
    "zh-CN": "侧边面板"
  },
  "upstreamUi.resizePair": {
    "en": "Resize {first} and {second}",
    "zh-CN": "调整{first}和{second}的大小"
  },
  "upstreamUi.formationChange": {
    "en": "What to change for {name}",
    "zh-CN": "要如何调整{name}的位置"
  },
  "upstreamUi.formationFront": {
    "en": "Move {name} toward the front",
    "zh-CN": "将{name}向前移"
  },
  "upstreamUi.formationRear": {
    "en": "Move {name} toward the rear",
    "zh-CN": "将{name}向后移"
  },
  "upstreamUi.formationLeave": {
    "en": "Leave {name} out of the formation",
    "zh-CN": "将{name}移出队形"
  },
  "upstreamUi.formationAdd": {
    "en": "+ {name} at the rear",
    "zh-CN": "+ 将{name}加入队尾"
  },
  "upstreamUi.formationUnplaced": {
    "en": "Not placed: {names}. The DM places them where the story has them until the party does.",
    "zh-CN": "尚未安排位置：{names}。在队伍安排位置前，地下城主会根据故事情境放置这些角色。"
  },
  "upstreamUi.partyLead": {
    "en": "the party lead",
    "zh-CN": "队长"
  },
  "upstreamUi.partyLeadCapital": {
    "en": "The party lead",
    "zh-CN": "队长"
  },
  "upstreamUi.formationProposed": {
    "en": "Proposed by {who}, not in force yet",
    "zh-CN": "由{who}提出，尚未生效"
  },
  "upstreamUi.formationMoved": {
    "en": "{who} moved {names} in the formation in force.",
    "zh-CN": "{who}调整了当前队形中{names}的位置。"
  },
  "upstreamUi.receiverWake": {
    "en": "Wake {name}'s agent on its turn (Codex)",
    "zh-CN": "在{name}的回合唤醒其代理（Codex）"
  },
  "upstreamUi.receiverExplain": {
    "en": "A small receiver on the agent’s computer starts a Codex turn when the table needs {name}. It needs this repository, Node 22.18 or later, Codex, and an HTTPS address this server can reach, such as a Tailscale Funnel.",
    "zh-CN": "代理所在电脑上的小型接收程序会在游戏需要{name}时启动 Codex 回合。需要本仓库、Node 22.18 或更高版本、Codex，以及此服务器可访问的 HTTPS 地址（例如 Tailscale Funnel）。"
  },
  "upstreamUi.receiverHttps": {
    "en": "This page was opened at {url}, which is not HTTPS, and the receiver only talks to ODM over HTTPS. Open Settings through the server’s HTTPS address, then connect again, so the receiver file names that address.",
    "zh-CN": "当前页面地址为 {url}，并非 HTTPS。接收程序仅通过 HTTPS 与 ODM 通信。请通过服务器的 HTTPS 地址打开设置并重新连接，让接收程序配置使用该地址。"
  },
  "upstreamUi.receiverNoAddress": {
    "en": "This server has not allowed any receiver address yet. Its admin adds yours under Admin > Player agents.",
    "zh-CN": "此服务器尚未允许任何接收程序地址。管理员可在“管理 > 玩家代理”中添加你的地址。"
  },
  "upstreamUi.receiverAllowed": {
    "en": "This server may send to {origin}.",
    "zh-CN": "此服务器可以向 {origin} 发送请求。"
  },
  "upstreamUi.receiverNotAllowed": {
    "en": "This server does not send to {origin} yet.",
    "zh-CN": "此服务器尚不能向 {origin} 发送请求。"
  },
  "upstreamUi.receiverThen": {
    "en": ", then run the setup below.",
    "zh-CN": "，然后运行下面的设置命令。"
  },
  "upstreamUi.receiverSetupLabel": {
    "en": "the setup command",
    "zh-CN": "设置命令"
  },
  "upstreamUi.receiverListenLabel": {
    "en": "the receiver command",
    "zh-CN": "接收程序命令"
  },
  "upstreamUi.receiverTunnelLabel": {
    "en": "the Tailscale Funnel command",
    "zh-CN": "Tailscale Funnel 命令"
  },
  "upstreamUi.receiverTunnel": {
    "en": "Point your HTTPS tunnel at http://127.0.0.1:{port}, so the address you gave reaches it.",
    "zh-CN": "将 HTTPS 隧道指向 http://127.0.0.1:{port}，让填写的地址能够访问接收程序。"
  },
  "upstreamUi.receiverConfigError": {
    "en": "Check the address and port.",
    "zh-CN": "请检查地址和端口。"
  },
  "upstreamUi.receiverCheckError": {
    "en": "Could not check that address.",
    "zh-CN": "无法检查该地址。"
  },
  "upstreamUi.receiverNetworkError": {
    "en": "Could not reach the server.",
    "zh-CN": "无法连接服务器。"
  },
  "upstreamUi.loadTitle": {
    "en": "What {name} carries",
    "zh-CN": "{name}携带的物品"
  },
  "upstreamUi.loadCapacity": {
    "en": "of a {capacity} lb carrying capacity.",
    "zh-CN": "／负重上限 {capacity} 磅。"
  },
  "upstreamUi.loadCaption": {
    "en": "{name}'s carried load by line, sorted by {sort}, {order} first. Lines of unknown weight are listed last.",
    "zh-CN": "{name}的负重明细，按{sort}排列，{order}在前。重量未知的项目列在最后。"
  },
  "upstreamUi.loadCoins": {
    "en": "{coins} gp, {rate} to the pound",
    "zh-CN": "{coins} 金币，每 {rate} 枚重一磅"
  },
  "upstreamUi.loadSortTotal": {
    "en": "line total",
    "zh-CN": "每项总重"
  },
  "upstreamUi.loadSortEach": {
    "en": "weight each",
    "zh-CN": "单件重量"
  },
  "upstreamUi.loadHeavy": {
    "en": "heaviest",
    "zh-CN": "最重"
  },
  "upstreamUi.loadLight": {
    "en": "lightest",
    "zh-CN": "最轻"
  },
  "upstreamUi.loadAmmo": {
    "en": "per round",
    "zh-CN": "每发"
  },
  "upstreamUi.loadArmor": {
    "en": "from the SRD armor table",
    "zh-CN": "来自 SRD 护甲表"
  },
  "upstreamUi.loadGear": {
    "en": "from the SRD gear table",
    "zh-CN": "来自 SRD 装备表"
  },
  "upstreamUi.loadWeapon": {
    "en": "from the SRD weapon table",
    "zh-CN": "来自 SRD 武器表"
  },
  "upstreamUi.loadWorn": {
    "en": "worn",
    "zh-CN": "已装备"
  },
  "upstreamUi.soundCounts": {
    "en": "This server has audio for {beds} of {bedTotal} rooms, {music} of {musicTotal} moods and {stings} of {stingTotal} sounds.",
    "zh-CN": "服务器已安装场景音 {beds}/{bedTotal}、情绪音乐 {music}/{musicTotal}、音效 {stings}/{stingTotal}。"
  },
  "upstreamUi.soundDownloading": {
    "en": "Downloading {percent}%",
    "zh-CN": "正在下载 {percent}%"
  },
  "upstreamUi.soundInstalled": {
    "en": "{count} tracks installed",
    "zh-CN": "已安装 {count} 条音轨"
  },
  "upstreamUi.modelOnly": {
    "en": "Only {kind}",
    "zh-CN": "仅显示 {kind}"
  },
  "upstreamUi.modelHardware": {
    "en": "This machine: {hardware}. ",
    "zh-CN": "当前机器：{hardware}。"
  },
  "upstreamUi.modelListed": {
    "en": "{count} listed by the backend. ",
    "zh-CN": "后端列出 {count} 个模型。"
  },
  "upstreamUi.modelCatalogCount": {
    "en": "{count} models",
    "zh-CN": "{count} 个模型"
  },
  "upstreamUi.modelAsOf": {
    "en": " as of {date}",
    "zh-CN": "，截至 {date}"
  },
  "upstreamUi.modelRefreshError": {
    "en": "; last refresh failed: {error}",
    "zh-CN": "；上次刷新失败：{error}"
  },
  "upstreamUi.roleImage": {
    "en": "painter",
    "zh-CN": "绘图"
  },
  "upstreamUi.roleStory": {
    "en": "storyteller",
    "zh-CN": "叙事"
  },
  "upstreamUi.modelHiddenOne": {
    "en": " and is left off the list",
    "zh-CN": "，已从列表中隐藏"
  },
  "upstreamUi.modelHiddenMany": {
    "en": " and are left off the list",
    "zh-CN": "，已从列表中隐藏"
  },
  "upstreamUi.comfyMeasured": {
    "en": "{portrait} a portrait or creature, {scene} a scene",
    "zh-CN": "肖像或生物 {portrait}，场景 {scene}"
  },
  "upstreamUi.comfyCold": {
    "en": "{time} for the first after a switch",
    "zh-CN": "切换后首次生成 {time}"
  },
  "upstreamUi.comfyPeak": {
    "en": "peaks {gb} GB",
    "zh-CN": "峰值 {gb} GB"
  },
  "upstreamUi.comfySteps": {
    "en": "{count} steps",
    "zh-CN": "{count} 步"
  },
  "upstreamUi.comfyDownload": {
    "en": "{gb} GB to add",
    "zh-CN": "需下载 {gb} GB"
  },
  "upstreamUi.comfyFailed": {
    "en": "Did not run on {hardware}.",
    "zh-CN": "未能在{hardware}上运行。"
  },
  "upstreamUi.comfyElsewhere": {
    "en": "On {hardware}: {measurement}.",
    "zh-CN": "在 {hardware} 上：{measurement}。"
  },
  "upstreamUi.comfyTooBig": {
    "en": " Peaked at {gb} GB, more than this GPU has.",
    "zh-CN": " 峰值需要 {gb} GB，超过当前 GPU 显存。"
  },
  "upstreamUi.comfyFolder": {
    "en": "into ComfyUI/models/{folder} ({gb} GB)",
    "zh-CN": "放入 ComfyUI/models/{folder}（{gb} GB）"
  },
  "upstreamUi.comfyMeasuredOn": {
    "en": "Measured on {hardware}",
    "zh-CN": "已在 {hardware} 上测量"
  },
  "upstreamUi.comfyNotMeasured": {
    "en": "Not measured on {hardware} yet",
    "zh-CN": "尚未在 {hardware} 上测量"
  },
  "upstreamUi.comfyPoor": {
    "en": "Poor pictures on {hardware}",
    "zh-CN": "在 {hardware} 上图像质量较差"
  },
  "upstreamUi.comfyDidNotRun": {
    "en": "Did not run on {hardware}",
    "zh-CN": "未能在 {hardware} 上运行"
  },
  "upstreamUi.comfyDevice": {
    "en": "{device}, {gb} GB for the GPU. ",
    "zh-CN": "{device}，GPU 显存 {gb} GB。"
  },
  "upstreamUi.comfyInstalled": {
    "en": "{count} installed",
    "zh-CN": "已安装 {count} 个"
  },
  "upstreamUi.comfyMeasuredCount": {
    "en": ", {count} measured here",
    "zh-CN": "，已在此测量 {count} 个"
  },
  "upstreamUi.thisHardware": {
    "en": "this hardware",
    "zh-CN": "此硬件"
  },
  "upstreamUi.comfyUnfitShown": {
    "en": "cannot paint well here",
    "zh-CN": "无法在此良好绘图"
  },
  "upstreamUi.comfyUnfitHiddenOne": {
    "en": "that cannot paint well here is left off the list",
    "zh-CN": "无法在此良好绘图，已从列表中隐藏"
  },
  "upstreamUi.comfyUnfitHiddenMany": {
    "en": "that cannot paint well here are left off the list",
    "zh-CN": "无法在此良好绘图，已从列表中隐藏"
  },
  "upstreamUi.coord.passedOne": {
    "en": "{names} passed before this step; the DM will not count on it.",
    "zh-CN": "{names}已在此步骤之前跳过；地下城主不会将这些行动纳入计划。"
  },
  "upstreamUi.coord.passedMany": {
    "en": "{names} passed before this step; the DM will not count on them.",
    "zh-CN": "{names}已在此步骤之前跳过；地下城主不会将这些行动纳入计划。"
  },
  "upstreamUi.coord.reconfirmOne": {
    "en": "The order changed after {names} was ready; they mark it Ready again first",
    "zh-CN": "{names}准备好后顺序发生变化，需要先再次确认已准备"
  },
  "upstreamUi.coord.reconfirmMany": {
    "en": "The order changed after {names} were ready; they mark it Ready again first",
    "zh-CN": "{names}准备好后顺序发生变化，需要先再次确认已准备"
  },
  "upstreamUi.loadUnknownOne": {
    "en": "{count} line has no known weight and is not counted, so the load is at least this.",
    "zh-CN": "有 {count} 项重量未知，未计入，因此实际负重至少为此数值。"
  },
  "upstreamUi.loadUnknownMany": {
    "en": "{count} lines have no known weight and are not counted, so the load is at least this.",
    "zh-CN": "有 {count} 项重量未知，未计入，因此实际负重至少为此数值。"
  },
  "upstreamUi.loadPlusOne": {
    "en": "plus {count} line of unknown weight",
    "zh-CN": "另有 {count} 项重量未知"
  },
  "upstreamUi.loadPlusMany": {
    "en": "plus {count} lines of unknown weight",
    "zh-CN": "另有 {count} 项重量未知"
  },
  "upstreamUi.modelUnfitOne": {
    "en": "{count} model the backend lists cannot run the {role}{hidden}. ",
    "zh-CN": "后端列出的 {count} 个模型无法用于{role}{hidden}。"
  },
  "upstreamUi.modelUnfitMany": {
    "en": "{count} models the backend lists cannot run the {role}{hidden}. ",
    "zh-CN": "后端列出的 {count} 个模型无法用于{role}{hidden}。"
  },
  "upstreamUi.modelNarrowHiddenOne": {
    "en": "{count} more model the server lists does not look like {kind}. ",
    "zh-CN": "服务器还列出了 {count} 个看起来不属于 {kind} 的模型。"
  },
  "upstreamUi.modelNarrowHiddenMany": {
    "en": "{count} more models the server lists do not look like {kind}. ",
    "zh-CN": "服务器还列出了 {count} 个看起来不属于 {kind} 的模型。"
  },
  "upstreamUi.comfyUnfitOne": {
    "en": "{count} model {reason}. ",
    "zh-CN": "有 {count} 个模型{reason}。"
  },
  "upstreamUi.comfyUnfitMany": {
    "en": "{count} models {reason}. ",
    "zh-CN": "有 {count} 个模型{reason}。"
  },
  "upstreamUi.proseExample": {
    "en": " For example: {sample}",
    "zh-CN": " 例如：{sample}"
  },
  "upstreamUi.native.comfy0": {"en": "Paints every campaign's ComfyUI pictures with {files}. It runs without a negative prompt, so a table's boundary cannot keep anything out of its pictures.", "zh-CN": "使用 {files} 生成各战役的 ComfyUI 图像。此模型不使用负面提示词，因此无法通过战役边界设置排除图像内容。"},
  "upstreamUi.native.comfy1": {"en": "Recommended. {time} a picture, peaks {gb} GB on {hardware}.", "zh-CN": "推荐。每张图 {time}，在 {hardware} 上峰值占用 {gb} GB。"},
  "upstreamUi.native.comfy2": {"en": "Paints every campaign's ComfyUI pictures with {files}.", "zh-CN": "使用 {files} 生成各战役的 ComfyUI 图像。"},
  "upstreamUi.native.comfy3": {"en": "Runs on {hardware}, but its pictures were poor there.", "zh-CN": "可在 {hardware} 上运行，但该设备上的图像效果较差。"},
  "upstreamUi.native.comfy4": {"en": "Peaked at {gb} GB elsewhere, more than this GPU has.", "zh-CN": "在其他设备上峰值占用 {gb} GB，超过此 GPU 的显存。"},
  "upstreamUi.native.comfy5": {"en": "Saved selection; not reported by this ComfyUI.", "zh-CN": "已保存此选择，但当前 ComfyUI 未列出它。"},
  "upstreamUi.native.comfy6": {"en": "{time} a picture, peaks {gb} GB on {hardware}.", "zh-CN": "每张图 {time}，在 {hardware} 上峰值占用 {gb} GB。"},
  "upstreamUi.native.comfy7": {"en": "Its files are not all on this ComfyUI.", "zh-CN": "此 ComfyUI 尚未备齐所需文件。"},
  "upstreamUi.native.comfy8": {"en": "Installed checkpoints from ComfyUI.", "zh-CN": "ComfyUI 已安装的检查点。"},
  "upstreamUi.native.comfy9": {"en": "No checkpoints reported by ComfyUI.", "zh-CN": "ComfyUI 未返回任何检查点。"},
  "upstreamUi.native.comfy10": {"en": "Not measured on this hardware yet.", "zh-CN": "尚未在此硬件上测量。"},
  "upstreamUi.native.comfy11": {"en": "This ComfyUI is missing {files}.", "zh-CN": "此 ComfyUI 缺少 {files}。"},
  "upstreamUi.native.comfy12": {"en": "The server could not be reached.", "zh-CN": "无法连接服务器。"},
  "upstreamUi.native.comfy13": {"en": "Not measured on {hardware} yet.", "zh-CN": "尚未在 {hardware} 上测量。"},
  "upstreamUi.native.comfy14": {"en": "The server answered {status}.", "zh-CN": "服务器返回状态码 {status}。"},
  "upstreamUi.native.comfy15": {"en": "Checking installed models…", "zh-CN": "正在检查已安装模型……"},
  "upstreamUi.native.comfy16": {"en": "Did not run on {hardware}.", "zh-CN": "未能在 {hardware} 上运行。"},
  "upstreamUi.native.comfy17": {"en": "Could not check ComfyUI.", "zh-CN": "无法检查 ComfyUI。"},
  "upstreamUi.native.comfy18": {"en": "{label} (recommended)", "zh-CN": "{label}（推荐）"},
  "upstreamUi.native.comfy19": {"en": "{label} settings.", "zh-CN": "{label} 设置。"},
  "upstreamUi.native.comfy20": {"en": "Checkpoints", "zh-CN": "检查点"},
  "upstreamUi.native.comfy21": {"en": "Models", "zh-CN": "模型"},
  "upstreamUi.native.storySetup0": {"en": "AI Story Setup is on, and this campaign has a story arc from your Storyboard. When the adventure begins, Story Setup writes its own premise, opening scene and secret outline. It is given your arc to build from, but its opening can still differ from the one you prepared. Turn it off to begin from your imported story; the AI still narrates.", "zh-CN": "AI 故事初始化已开启，且此战役已从故事板导入故事线。冒险开始时，AI 会参考这条故事线，撰写自己的故事前提、开场和秘密大纲，因此开场仍可能与你准备的版本不同。关闭此设置即可从导入的故事开始；AI 仍会负责叙事。"},
  "upstreamUi.native.storySetup1": {"en": "This Storyboard writes the campaign's story arc, and AI Story Setup is on. When the adventure begins, Story Setup writes its own premise, opening scene and secret outline. It is given your arc to build from, but its opening can still differ from the one you prepared. Turn it off to begin from your imported story; the AI still narrates.", "zh-CN": "此故事板将写入战役故事线，而 AI 故事初始化已开启。冒险开始时，AI 会参考这条故事线，撰写自己的故事前提、开场和秘密大纲，因此开场仍可能与你准备的版本不同。关闭此设置即可从导入的故事开始；AI 仍会负责叙事。"},
  "upstreamUi.native.0": {
    "en": "Not in the model catalog.",
    "zh-CN": "未收录于模型目录。"
  },
  "upstreamUi.native.1": {
    "en": "Not listed by the server right now. Load it there, or pick one it lists.",
    "zh-CN": "服务器当前未列出此模型。请在服务器加载它，或选择列表中的模型。"
  },
  "upstreamUi.native.2": {
    "en": "Not in the catalog, and its name does not say it paints. ODM will try it as a picture model.",
    "zh-CN": "目录中没有此模型，其名称也未表明支持绘图。ODM 会尝试将其作为图像模型使用。"
  },
  "upstreamUi.native.3": {
    "en": "Too big for this machine: {size} GB of weights against {budget} GB of memory.",
    "zh-CN": "模型过大：权重 {size} GB，机器可用内存 {budget} GB。"
  },
  "upstreamUi.native.4": {
    "en": "Deprecated by its provider. It may stop answering; pick a newer model when you can.",
    "zh-CN": "供应商已弃用此模型，可能停止响应；请择机选择更新的模型。"
  },
  "upstreamUi.native.5": {
    "en": "Marked {status} by its provider; it may change or go away.",
    "zh-CN": "供应商将其标为 {status}；模型可能变动或下线。"
  },
  "upstreamUi.native.6": {
    "en": "Does not paint pictures: it answers in text only.",
    "zh-CN": "不支持绘图：只输出文本。"
  },
  "upstreamUi.native.7": {
    "en": "Does not write text, so it cannot narrate.",
    "zh-CN": "不输出文本，因此无法生成叙事。"
  },
  "upstreamUi.native.8": {
    "en": "The catalog's row for these weights takes no tool calls; test the backend to be sure.",
    "zh-CN": "目录中对应权重不支持工具调用；请测试后端以确认。"
  },
  "upstreamUi.native.9": {
    "en": "A {window} window is small for a campaign; the table will forget recent turns often.",
    "zh-CN": "{window} 的上下文窗口较小，战役可能频繁遗忘近期回合。"
  },
  "upstreamUi.native.10": {
    "en": "{count} context",
    "zh-CN": "{count} 上下文"
  },
  "upstreamUi.native.11": {
    "en": "paints pictures",
    "zh-CN": "生成图像"
  },
  "upstreamUi.native.12": {
    "en": "tool calls",
    "zh-CN": "工具调用"
  },
  "upstreamUi.native.13": {
    "en": "reasoning",
    "zh-CN": "推理"
  },
  "upstreamUi.native.14": {
    "en": "sees pictures",
    "zh-CN": "理解图像"
  },
  "upstreamUi.native.15": {
    "en": "open weights",
    "zh-CN": "开放权重"
  },
  "upstreamUi.native.16": {
    "en": "free",
    "zh-CN": "免费"
  },
  "upstreamUi.native.17": {
    "en": "cheap",
    "zh-CN": "低成本"
  },
  "upstreamUi.native.18": {
    "en": "{input} in / {output} out per M tokens",
    "zh-CN": "每百万 token：输入 {input}／输出 {output}"
  },
  "upstreamUi.native.19": {
    "en": "{value} (from {variable})",
    "zh-CN": "{value}（来自 {variable}）"
  },
  "upstreamUi.native.20": {
    "en": "{value} (the server's only model)",
    "zh-CN": "{value}（服务器唯一的模型）"
  },
  "upstreamUi.native.21": {
    "en": "Not chosen (the server's only model, once it answers)",
    "zh-CN": "未选择（等待服务器响应后使用其唯一模型）"
  },
  "upstreamUi.native.22": {
    "en": "Not chosen (the story model)",
    "zh-CN": "未选择（使用叙事模型）"
  },
  "upstreamUi.native.23": {
    "en": "Not chosen (the program's own default)",
    "zh-CN": "未选择（使用程序自身默认值）"
  },
  "upstreamUi.native.24": {
    "en": "None (no storyteller)",
    "zh-CN": "无（不启用叙事模型）"
  },
  "upstreamUi.native.25": {
    "en": "None (no pictures)",
    "zh-CN": "无（不生成图片）"
  },
  "upstreamUi.native.26": {
    "en": "None (no narration)",
    "zh-CN": "无（不启用旁白）"
  },
  "upstreamUi.native.27": {
    "en": "None (no Whisper dictation)",
    "zh-CN": "无（不启用 Whisper 听写）"
  },
  "upstreamUi.native.28": {
    "en": "None (no paid dictation)",
    "zh-CN": "无（不启用付费听写）"
  },
  "upstreamUi.native.29": {
    "en": "narration models",
    "zh-CN": "旁白模型"
  },
  "upstreamUi.native.30": {
    "en": "transcription models",
    "zh-CN": "转录模型"
  },
  "upstreamUi.native.31": {
    "en": "No agent program is chosen.",
    "zh-CN": "尚未选择代理程序。"
  },
  "upstreamUi.native.32": {
    "en": "{name} is not ready.",
    "zh-CN": "{name} 尚未就绪。"
  },
  "upstreamUi.native.33": {
    "en": "There is no character to arrange.",
    "zh-CN": "没有可整理手牌的角色。"
  },
  "upstreamUi.native.34": {
    "en": "Could not save your hand.",
    "zh-CN": "无法保存手牌布局。"
  },
  "upstreamUi.native.35": {
    "en": "Could not reach the server; your hand is as it was.",
    "zh-CN": "无法连接服务器，已恢复原来的手牌布局。"
  },
  "upstreamUi.native.36": {
    "en": "End turn always keeps the last seat of your hand.",
    "zh-CN": "“结束回合”始终保留在手牌最后一个位置。"
  },
  "upstreamUi.native.37": {
    "en": "Your hand is full: all {count} seats are taken (End turn keeps the ninth). Move a card to More first, then add {name}.",
    "zh-CN": "手牌已满：{count} 个位置均已占用（第九个位置留给“结束回合”）。请先将一张牌移至“更多”，再添加{name}。"
  },
  "upstreamUi.native.38": {
    "en": "The server answered {status}.",
    "zh-CN": "服务器返回状态 {status}。"
  },
  "upstreamUi.native.39": {
    "en": "The server could not be reached.",
    "zh-CN": "无法连接服务器。"
  },
  "upstreamUi.native.40": {
    "en": "The Windows, Command and Super keys belong to the system. Hold Ctrl or Alt instead.",
    "zh-CN": "Windows、Command 和 Super 键由系统使用。请改按 Ctrl 或 Alt。"
  },
  "upstreamUi.native.41": {
    "en": "` is voice chat's push-to-talk key. Pick another so the two never fight.",
    "zh-CN": "` 是语音聊天的按键通话键。请选择其他按键，避免冲突。"
  },
  "upstreamUi.native.42": {
    "en": "{name} moves, edits or sends in the message box. Pick another key.",
    "zh-CN": "{name} 用于在消息框中移动、编辑或发送。请选择其他按键。"
  },
  "upstreamUi.native.43": {
    "en": "{name} belongs to the browser or the app window (help, reload, full screen, developer tools). Pick another key, such as F8 or F9.",
    "zh-CN": "{name} 用于浏览器或应用窗口功能（帮助、刷新、全屏、开发者工具）。请选择其他按键，例如 F8 或 F9。"
  },
  "upstreamUi.native.44": {
    "en": "{name} closes the window or the tab. Pick another key.",
    "zh-CN": "{name} 会关闭窗口或标签页。请选择其他按键。"
  },
  "upstreamUi.native.45": {
    "en": "{name} types in the message box. Hold Ctrl or Alt with it, or pick a key that does not type, such as F8 or F9.",
    "zh-CN": "{name} 会在消息框中输入文字。请同时按住 Ctrl 或 Alt，或选择不输入文字的按键，例如 F8 或 F9。"
  },
  "upstreamUi.native.46": {
    "en": "{name} is a browser or system shortcut (copy, find, a new tab, zoom, the input language). Add Alt, or pick another key.",
    "zh-CN": "{name} 是浏览器或系统快捷键（复制、查找、新标签页、缩放、切换输入语言）。请增加 Alt，或选择其他按键。"
  },
  "upstreamUi.native.47": {
    "en": "{name} opens a browser menu, the address bar or the window menu. Pick another key.",
    "zh-CN": "{name} 会打开浏览器菜单、地址栏或窗口菜单。请选择其他按键。"
  },
  "upstreamUi.native.48": {
    "en": "{name} is a desktop shortcut on many systems (a terminal, the lock screen, the desktop). Pick another key.",
    "zh-CN": "{name} 在许多系统中用于桌面快捷操作（终端、锁屏、显示桌面）。请选择其他按键。"
  },
  "upstreamUi.native.49": {
    "en": "On this keyboard {name} types \"{typed}\". Pick another key so it keeps typing.",
    "zh-CN": "在此键盘上，{name} 会输入“{typed}”。请选择其他按键以保留该输入功能。"
  },
  "upstreamUi.native.50": {
    "en": "Tested here {date}: runs the storyteller loop.",
    "zh-CN": "本机测试 {date}：可运行叙事循环。"
  },
  "upstreamUi.native.51": {
    "en": "Tested here {date}: failed ({reasons}).",
    "zh-CN": "本机测试 {date}：失败（{reasons}）。"
  },
  "upstreamUi.native.52": {
    "en": "no stream",
    "zh-CN": "无流式输出"
  },
  "upstreamUi.native.53": {
    "en": "no tool call",
    "zh-CN": "未调用工具"
  },
  "upstreamUi.native.54": {
    "en": "no continuation",
    "zh-CN": "无法续接"
  },
  "upstreamUi.native.55": {
    "en": "Takes no tool calls, by the server's own account. The storyteller runs on them: dice, sheets and scenes are all tool calls.",
    "zh-CN": "服务器报告不支持工具调用。叙事运行依赖工具调用：掷骰、角色表和场景均通过工具操作。"
  },
  "upstreamUi.native.56": {
    "en": "Takes no tool calls, by the server's own account. Lore checks and bookkeeping that use them will fall back to plain text.",
    "zh-CN": "服务器报告不支持工具调用。需要工具调用的设定核查和记录工作将回退为纯文本。"
  },
  "upstreamUi.native.57": {
    "en": "Takes no tool calls. The storyteller runs on them: dice, sheets and scenes are all tool calls.",
    "zh-CN": "不支持工具调用。叙事运行依赖工具调用：掷骰、角色表和场景均通过工具操作。"
  },
  "upstreamUi.native.58": {
    "en": "Takes no tool calls. Lore checks and bookkeeping that use them will fall back to plain text.",
    "zh-CN": "不支持工具调用。需要工具调用的设定核查和记录工作将回退为纯文本。"
  },
  "upstreamUi.native.cue.dungeon.label": {
    "en": "Dungeon",
    "zh-CN": "地下城"
  },
  "upstreamUi.native.cue.dungeon.blurb": {
    "en": "Cold stone corridors, a far-off drip, the room breathing.",
    "zh-CN": "冰冷的石廊，远处的滴水声，房间仿佛在呼吸。"
  },
  "upstreamUi.native.cue.cave.label": {
    "en": "Cave",
    "zh-CN": "洞穴"
  },
  "upstreamUi.native.cue.cave.blurb": {
    "en": "Dripping water in a wide dark space, air moving through rock.",
    "zh-CN": "水滴落在宽阔黑暗的空间，空气穿过岩石。"
  },
  "upstreamUi.native.cue.crypt.label": {
    "en": "Crypt",
    "zh-CN": "墓穴"
  },
  "upstreamUi.native.cue.crypt.blurb": {
    "en": "Tomb silence with something shifting in it.",
    "zh-CN": "墓穴寂静无声，却有什么在其中挪动。"
  },
  "upstreamUi.native.cue.sewer.label": {
    "en": "Sewer",
    "zh-CN": "下水道"
  },
  "upstreamUi.native.cue.sewer.blurb": {
    "en": "Running filth, echoing brick, rats where you cannot see them.",
    "zh-CN": "污水流淌，砖墙回声，暗处有老鼠窜动。"
  },
  "upstreamUi.native.cue.mine.label": {
    "en": "Mine",
    "zh-CN": "矿洞"
  },
  "upstreamUi.native.cue.mine.blurb": {
    "en": "Timbers under strain, a pick working somewhere below.",
    "zh-CN": "木架承受重压，深处传来镐头敲击声。"
  },
  "upstreamUi.native.cue.ruins.label": {
    "en": "Ruins",
    "zh-CN": "废墟"
  },
  "upstreamUi.native.cue.ruins.blurb": {
    "en": "Wind through broken walls and whatever nests in them.",
    "zh-CN": "风穿过断墙，也掠过墙间筑巢的生物。"
  },
  "upstreamUi.native.cue.temple.label": {
    "en": "Temple",
    "zh-CN": "神殿"
  },
  "upstreamUi.native.cue.temple.blurb": {
    "en": "A high vaulted hush, distant voices at prayer.",
    "zh-CN": "高耸穹顶下寂静低沉，远处有人祷告。"
  },
  "upstreamUi.native.cue.forest.label": {
    "en": "Forest",
    "zh-CN": "森林"
  },
  "upstreamUi.native.cue.forest.blurb": {
    "en": "Birdsong, leaves moving, a wood going about its day.",
    "zh-CN": "鸟鸣与枝叶沙沙，林间如常的一天。"
  },
  "upstreamUi.native.cue.deep_forest.label": {
    "en": "Night forest",
    "zh-CN": "夜间森林"
  },
  "upstreamUi.native.cue.deep_forest.blurb": {
    "en": "Owls, insects, and branches that are probably the wind.",
    "zh-CN": "猫头鹰、虫鸣，还有大概是风吹动的树枝。"
  },
  "upstreamUi.native.cue.jungle.label": {
    "en": "Jungle",
    "zh-CN": "丛林"
  },
  "upstreamUi.native.cue.jungle.blurb": {
    "en": "Wet heat, insects in layers, birds that sound like screams.",
    "zh-CN": "湿热中层叠的虫鸣，鸟叫仿佛尖叫。"
  },
  "upstreamUi.native.cue.swamp.label": {
    "en": "Swamp",
    "zh-CN": "沼泽"
  },
  "upstreamUi.native.cue.swamp.blurb": {
    "en": "Frogs, flies, and water that will not hold your weight.",
    "zh-CN": "蛙鸣、飞虫，以及无法承载脚步的水面。"
  },
  "upstreamUi.native.cue.desert.label": {
    "en": "Desert",
    "zh-CN": "沙漠"
  },
  "upstreamUi.native.cue.desert.blurb": {
    "en": "Dry wind over sand and nothing else at all.",
    "zh-CN": "干燥的风掠过沙地，此外空无一物。"
  },
  "upstreamUi.native.cue.mountain.label": {
    "en": "Mountains",
    "zh-CN": "山脉"
  },
  "upstreamUi.native.cue.mountain.blurb": {
    "en": "Thin high wind over bare rock.",
    "zh-CN": "稀薄高处的风吹过裸露岩石。"
  },
  "upstreamUi.native.cue.tundra.label": {
    "en": "Frozen waste",
    "zh-CN": "冰冻荒原"
  },
  "upstreamUi.native.cue.tundra.blurb": {
    "en": "Driving snow and cold that has weight to it.",
    "zh-CN": "风雪扑面，寒冷沉重得仿佛有了重量。"
  },
  "upstreamUi.native.cue.plains.label": {
    "en": "Open country",
    "zh-CN": "开阔地"
  },
  "upstreamUi.native.cue.plains.blurb": {
    "en": "Grass moving, larks overhead, a long way to anywhere.",
    "zh-CN": "草叶摇动，云雀高鸣，四方皆是漫长路途。"
  },
  "upstreamUi.native.cue.river.label": {
    "en": "River",
    "zh-CN": "河流"
  },
  "upstreamUi.native.cue.river.blurb": {
    "en": "Water moving steadily past a bank.",
    "zh-CN": "流水不息，从岸边缓缓经过。"
  },
  "upstreamUi.native.cue.waterfall.label": {
    "en": "Waterfall",
    "zh-CN": "瀑布"
  },
  "upstreamUi.native.cue.waterfall.blurb": {
    "en": "Falling water loud enough to talk under.",
    "zh-CN": "水声轰鸣，足以掩盖交谈。"
  },
  "upstreamUi.native.cue.coast.label": {
    "en": "Coast",
    "zh-CN": "海岸"
  },
  "upstreamUi.native.cue.coast.blurb": {
    "en": "Surf on shingle and gulls arguing about it.",
    "zh-CN": "海浪拍打卵石，海鸥争鸣不休。"
  },
  "upstreamUi.native.cue.ship.label": {
    "en": "Aboard ship",
    "zh-CN": "船上"
  },
  "upstreamUi.native.cue.ship.blurb": {
    "en": "Timbers working, rigging, and the sea under everything.",
    "zh-CN": "船木吱呀、索具作响，一切声音下都是海浪。"
  },
  "upstreamUi.native.cue.underwater.label": {
    "en": "Underwater",
    "zh-CN": "水下"
  },
  "upstreamUi.native.cue.underwater.blurb": {
    "en": "Everything muffled, everything slow, bubbles going up.",
    "zh-CN": "万物低沉迟缓，只有气泡向上浮起。"
  },
  "upstreamUi.native.cue.town.label": {
    "en": "Village",
    "zh-CN": "村庄"
  },
  "upstreamUi.native.cue.town.blurb": {
    "en": "Carts, chickens, hammering, a dog making its case.",
    "zh-CN": "车轮、鸡鸣、锤打，还有不停吠叫的狗。"
  },
  "upstreamUi.native.cue.city.label": {
    "en": "City street",
    "zh-CN": "城市街道"
  },
  "upstreamUi.native.cue.city.blurb": {
    "en": "A street with too many people on it and traffic of some kind.",
    "zh-CN": "拥挤的街道，人声与车马交织。"
  },
  "upstreamUi.native.cue.market.label": {
    "en": "Market",
    "zh-CN": "集市"
  },
  "upstreamUi.native.cue.market.blurb": {
    "en": "Hawkers, haggling, livestock, someone dropping something.",
    "zh-CN": "叫卖、讨价还价、牲畜声，不知谁又打翻了东西。"
  },
  "upstreamUi.native.cue.crowd.label": {
    "en": "Crowd",
    "zh-CN": "人群"
  },
  "upstreamUi.native.cue.crowd.blurb": {
    "en": "A press of people close enough to touch you.",
    "zh-CN": "人潮拥挤，近得伸手就能碰到。"
  },
  "upstreamUi.native.cue.tavern.label": {
    "en": "Tavern",
    "zh-CN": "酒馆"
  },
  "upstreamUi.native.cue.tavern.blurb": {
    "en": "Fire, mugs, low talk, and someone murdering a lute.",
    "zh-CN": "炉火、酒杯、低语，还有弹得不怎么样的鲁特琴。"
  },
  "upstreamUi.native.cue.camp.label": {
    "en": "Camp",
    "zh-CN": "营地"
  },
  "upstreamUi.native.cue.camp.blurb": {
    "en": "A fire going, night around it, watch being kept.",
    "zh-CN": "篝火燃烧，夜色环绕，有人正在守夜。"
  },
  "upstreamUi.native.cue.keep.label": {
    "en": "Great hall",
    "zh-CN": "大厅"
  },
  "upstreamUi.native.cue.keep.blurb": {
    "en": "A big fire in a bigger room, banners moving in the draught.",
    "zh-CN": "巨厅中的炉火熊熊，旗帜随穿堂风摆动。"
  },
  "upstreamUi.native.cue.library.label": {
    "en": "Library",
    "zh-CN": "图书馆"
  },
  "upstreamUi.native.cue.library.blurb": {
    "en": "Pages, a distant cough, and the sound of being told to be quiet.",
    "zh-CN": "翻页声、远处的咳嗽，以及要求安静的提醒。"
  },
  "upstreamUi.native.cue.forge.label": {
    "en": "Forge",
    "zh-CN": "锻造坊"
  },
  "upstreamUi.native.cue.forge.blurb": {
    "en": "Bellows, hammer on anvil, metal complaining.",
    "zh-CN": "风箱呼呼，铁锤敲砧，金属发出刺耳声响。"
  },
  "upstreamUi.native.cue.graveyard.label": {
    "en": "Graveyard",
    "zh-CN": "墓园"
  },
  "upstreamUi.native.cue.graveyard.blurb": {
    "en": "Wind, crows, and wet grass between the stones.",
    "zh-CN": "风声、鸦鸣，墓碑之间是湿润的草。"
  },
  "upstreamUi.native.cue.arcane.label": {
    "en": "Arcane",
    "zh-CN": "奥术"
  },
  "upstreamUi.native.cue.arcane.blurb": {
    "en": "A hum with no source, and air that feels used.",
    "zh-CN": "无源的嗡鸣，空气仿佛被消耗过一般。"
  },
  "upstreamUi.native.cue.wind.label": {
    "en": "Bare wind",
    "zh-CN": "风声"
  },
  "upstreamUi.native.cue.wind.blurb": {
    "en": "Wind with nothing to say about where you are.",
    "zh-CN": "只有风声，听不出身在何处。"
  },
  "upstreamUi.native.cue.rain.label": {
    "en": "Rain",
    "zh-CN": "雨声"
  },
  "upstreamUi.native.cue.rain.blurb": {
    "en": "Steady rain on whatever is over your head.",
    "zh-CN": "雨水持续落在头顶的遮蔽物上。"
  },
  "upstreamUi.native.cue.storm.label": {
    "en": "Storm",
    "zh-CN": "风暴"
  },
  "upstreamUi.native.cue.storm.blurb": {
    "en": "Wind, rain and thunder taking turns.",
    "zh-CN": "风、雨与雷鸣交替响起。"
  },
  "upstreamUi.native.cue.night.label": {
    "en": "Night",
    "zh-CN": "夜晚"
  },
  "upstreamUi.native.cue.night.blurb": {
    "en": "Crickets, an owl, the world with the lights off.",
    "zh-CN": "蟋蟀、猫头鹰，熄灯后的世界。"
  },
  "upstreamUi.native.cue.calm.label": {
    "en": "Calm",
    "zh-CN": "平静"
  },
  "upstreamUi.native.cue.calm.blurb": {
    "en": "Nothing is wrong yet. Rest, shopping, talking it over.",
    "zh-CN": "一切暂且平安。休息、购物、闲谈。"
  },
  "upstreamUi.native.cue.wonder.label": {
    "en": "Wonder",
    "zh-CN": "惊奇"
  },
  "upstreamUi.native.cue.wonder.blurb": {
    "en": "They have just seen something worth the trip.",
    "zh-CN": "眼前的景象让一路奔波都值得。"
  },
  "upstreamUi.native.cue.mystery.label": {
    "en": "Mystery",
    "zh-CN": "谜团"
  },
  "upstreamUi.native.cue.mystery.blurb": {
    "en": "Something does not add up and they have noticed.",
    "zh-CN": "他们察觉了不对劲的地方。"
  },
  "upstreamUi.native.cue.tension.label": {
    "en": "Tension",
    "zh-CN": "紧张"
  },
  "upstreamUi.native.cue.tension.blurb": {
    "en": "It has not gone wrong yet, and it is going to.",
    "zh-CN": "事情还没出错，但很快就会。"
  },
  "upstreamUi.native.cue.dread.label": {
    "en": "Dread",
    "zh-CN": "恐惧"
  },
  "upstreamUi.native.cue.dread.blurb": {
    "en": "The scene where they should have run.",
    "zh-CN": "这是他们本该逃跑的场景。"
  },
  "upstreamUi.native.cue.battle.label": {
    "en": "Battle",
    "zh-CN": "战斗"
  },
  "upstreamUi.native.cue.battle.blurb": {
    "en": "A fight worth rolling initiative for.",
    "zh-CN": "一场值得掷先攻的战斗。"
  },
  "upstreamUi.native.cue.boss.label": {
    "en": "The big one",
    "zh-CN": "决战"
  },
  "upstreamUi.native.cue.boss.blurb": {
    "en": "The fight the campaign has been walking towards.",
    "zh-CN": "整场战役一路走向的决战。"
  },
  "upstreamUi.native.cue.chase.label": {
    "en": "Chase",
    "zh-CN": "追逐"
  },
  "upstreamUi.native.cue.chase.blurb": {
    "en": "Someone is running and someone else is closing.",
    "zh-CN": "有人在逃，追兵越来越近。"
  },
  "upstreamUi.native.cue.triumph.label": {
    "en": "Triumph",
    "zh-CN": "凯旋"
  },
  "upstreamUi.native.cue.triumph.blurb": {
    "en": "They won and everyone should hear about it.",
    "zh-CN": "他们赢了，所有人都该听见。"
  },
  "upstreamUi.native.cue.sorrow.label": {
    "en": "Sorrow",
    "zh-CN": "悲伤"
  },
  "upstreamUi.native.cue.sorrow.blurb": {
    "en": "A death, a betrayal, or the cost coming due.",
    "zh-CN": "死亡、背叛，或终于到来的代价。"
  },
  "upstreamUi.native.cue.travel.label": {
    "en": "On the road",
    "zh-CN": "旅途"
  },
  "upstreamUi.native.cue.travel.blurb": {
    "en": "Miles passing under them without incident.",
    "zh-CN": "一路平安，里程在脚下延伸。"
  },
  "upstreamUi.native.cue.festive.label": {
    "en": "Festival",
    "zh-CN": "节庆"
  },
  "upstreamUi.native.cue.festive.blurb": {
    "en": "A feast, a fair, a wedding, a coronation.",
    "zh-CN": "宴席、集市、婚礼或加冕庆典。"
  },
  "upstreamUi.native.cue.thunder.label": {
    "en": "Thunderclap",
    "zh-CN": "雷鸣"
  },
  "upstreamUi.native.cue.thunder.blurb": {
    "en": "Close enough to feel.",
    "zh-CN": "近得能感到震动。"
  },
  "upstreamUi.native.cue.door_slam.label": {
    "en": "Door slams",
    "zh-CN": "关门巨响"
  },
  "upstreamUi.native.cue.door_slam.blurb": {
    "en": "The way out just stopped being one.",
    "zh-CN": "退路突然不再是退路。"
  },
  "upstreamUi.native.cue.door_creak.label": {
    "en": "Door creaks open",
    "zh-CN": "门缓缓开启"
  },
  "upstreamUi.native.cue.door_creak.blurb": {
    "en": "Slowly, and not by anyone's hand.",
    "zh-CN": "门缓缓开启，却没有人推它。"
  },
  "upstreamUi.native.cue.roar.label": {
    "en": "Monster roar",
    "zh-CN": "怪物咆哮"
  },
  "upstreamUi.native.cue.roar.blurb": {
    "en": "Something large announcing itself.",
    "zh-CN": "庞然大物宣告着自己的到来。"
  },
  "upstreamUi.native.cue.wolf_howl.label": {
    "en": "Wolves",
    "zh-CN": "狼嚎"
  },
  "upstreamUi.native.cue.wolf_howl.blurb": {
    "en": "A howl, then answers from three directions.",
    "zh-CN": "一声长嚎，三个方向传来回应。"
  },
  "upstreamUi.native.cue.horn.label": {
    "en": "War horn",
    "zh-CN": "战号"
  },
  "upstreamUi.native.cue.horn.blurb": {
    "en": "Someone has called for help, or for blood.",
    "zh-CN": "有人呼叫援军，或渴求鲜血。"
  },
  "upstreamUi.native.cue.bell.label": {
    "en": "Bell",
    "zh-CN": "钟声"
  },
  "upstreamUi.native.cue.bell.blurb": {
    "en": "A single toll, and everyone stops talking.",
    "zh-CN": "钟声一响，众人停止交谈。"
  },
  "upstreamUi.native.cue.gong.label": {
    "en": "Gong",
    "zh-CN": "锣声"
  },
  "upstreamUi.native.cue.gong.blurb": {
    "en": "For arrivals nobody wanted.",
    "zh-CN": "不受欢迎的来客到了。"
  },
  "upstreamUi.native.cue.scream.label": {
    "en": "Scream",
    "zh-CN": "尖叫"
  },
  "upstreamUi.native.cue.scream.blurb": {
    "en": "From somewhere they have not been yet.",
    "zh-CN": "来自他们尚未踏足的地方。"
  },
  "upstreamUi.native.cue.sword_clash.label": {
    "en": "Steel on steel",
    "zh-CN": "金铁交鸣"
  },
  "upstreamUi.native.cue.sword_clash.blurb": {
    "en": "The moment a talk became a fight.",
    "zh-CN": "交谈化为战斗的那一刻。"
  },
  "upstreamUi.native.cue.magic_cast.label": {
    "en": "A spell lands",
    "zh-CN": "法术生效"
  },
  "upstreamUi.native.cue.magic_cast.blurb": {
    "en": "Whatever that was, it worked.",
    "zh-CN": "不管那是什么，它生效了。"
  },
  "upstreamUi.native.cue.coin.label": {
    "en": "Coin",
    "zh-CN": "金币"
  },
  "upstreamUi.native.cue.coin.blurb": {
    "en": "Payment, bribe, or a purse hitting a table.",
    "zh-CN": "付款、行贿，或钱袋砸在桌上。"
  },
  "upstreamUi.native.cue.crow.label": {
    "en": "Crows",
    "zh-CN": "鸦鸣"
  },
  "upstreamUi.native.cue.crow.blurb": {
    "en": "They lift off all at once, which is never nothing.",
    "zh-CN": "群鸦齐飞，绝非毫无缘由。"
  },
  "upstreamUi.native.cue.heartbeat.label": {
    "en": "Heartbeat",
    "zh-CN": "心跳"
  },
  "upstreamUi.native.cue.heartbeat.blurb": {
    "en": "For the pause before a death save.",
    "zh-CN": "死亡豁免前的短暂停顿。"
  },
  "upstreamUi.native.cue.chain.label": {
    "en": "Chains",
    "zh-CN": "锁链"
  },
  "upstreamUi.native.cue.chain.blurb": {
    "en": "Something is being let off a chain, or put back on one.",
    "zh-CN": "某物正被解开锁链，或重新锁上。"
  },
  "upstreamUi.native.cue.splash.label": {
    "en": "Splash",
    "zh-CN": "落水"
  },
  "upstreamUi.native.cue.splash.blurb": {
    "en": "Someone or something went in.",
    "zh-CN": "有人或什么东西落入水中。"
  },
  "upstreamUi.native.cue.hit_melee.label": {
    "en": "Blade lands",
    "zh-CN": "刀剑命中"
  },
  "upstreamUi.native.cue.hit_melee.blurb": {
    "en": "A weapon connects.",
    "zh-CN": "武器命中。"
  },
  "upstreamUi.native.cue.hit_ranged.label": {
    "en": "Arrow strikes",
    "zh-CN": "箭矢命中"
  },
  "upstreamUi.native.cue.hit_ranged.blurb": {
    "en": "A shot finds its mark.",
    "zh-CN": "箭矢正中目标。"
  },
  "upstreamUi.native.cue.hit_crit.label": {
    "en": "Critical hit",
    "zh-CN": "重击"
  },
  "upstreamUi.native.cue.hit_crit.blurb": {
    "en": "A blow that changes the fight.",
    "zh-CN": "改变战局的一击。"
  },
  "upstreamUi.native.cue.swing_miss.label": {
    "en": "Swing and a miss",
    "zh-CN": "挥击落空"
  },
  "upstreamUi.native.cue.swing_miss.blurb": {
    "en": "Air, and nothing else.",
    "zh-CN": "只击中了空气。"
  },
  "upstreamUi.native.cue.spell_fire.label": {
    "en": "Fire spell",
    "zh-CN": "火焰法术"
  },
  "upstreamUi.native.cue.spell_fire.blurb": {
    "en": "A rush of flame.",
    "zh-CN": "烈焰扑来。"
  },
  "upstreamUi.native.cue.spell_cold.label": {
    "en": "Cold spell",
    "zh-CN": "寒冷法术"
  },
  "upstreamUi.native.cue.spell_cold.blurb": {
    "en": "Frost crackling over everything.",
    "zh-CN": "冰霜蔓延，噼啪作响。"
  },
  "upstreamUi.native.cue.spell_thunder.label": {
    "en": "Lightning spell",
    "zh-CN": "闪电法术"
  },
  "upstreamUi.native.cue.spell_thunder.blurb": {
    "en": "A crack that rattles teeth.",
    "zh-CN": "电闪轰鸣，震得牙齿发颤。"
  },
  "upstreamUi.native.cue.spell_radiant.label": {
    "en": "Radiant spell",
    "zh-CN": "光耀法术"
  },
  "upstreamUi.native.cue.spell_radiant.blurb": {
    "en": "A chord of light.",
    "zh-CN": "光明奏响和弦。"
  },
  "upstreamUi.native.cue.spell_dark.label": {
    "en": "Dark spell",
    "zh-CN": "黑暗法术"
  },
  "upstreamUi.native.cue.spell_dark.blurb": {
    "en": "Something cold drawn out of someone.",
    "zh-CN": "某种冰冷之物被从体内抽出。"
  },
  "upstreamUi.native.cue.heal.label": {
    "en": "Healing",
    "zh-CN": "治疗"
  },
  "upstreamUi.native.cue.heal.blurb": {
    "en": "Warmth returning.",
    "zh-CN": "温暖重新回到体内。"
  },
  "upstreamUi.native.cue.death.label": {
    "en": "A death",
    "zh-CN": "死亡"
  },
  "upstreamUi.native.cue.death.blurb": {
    "en": "Low and final.",
    "zh-CN": "低沉，终结。"
  },
  "upstreamUi.native.cue.door_locked.label": {
    "en": "Locked door",
    "zh-CN": "锁住的门"
  },
  "upstreamUi.native.cue.door_locked.blurb": {
    "en": "A handle that will not turn.",
    "zh-CN": "门把手纹丝不动。"
  },
  "upstreamUi.native.cue.door_secret.label": {
    "en": "Secret door",
    "zh-CN": "暗门"
  },
  "upstreamUi.native.cue.door_secret.blurb": {
    "en": "Stone grinding where there was no door.",
    "zh-CN": "原本无门的地方，石块缓缓磨动。"
  },
  "upstreamUi.native.cue.thud.label": {
    "en": "Thud",
    "zh-CN": "重物落地"
  },
  "upstreamUi.native.cue.thud.blurb": {
    "en": "Something heavy meets the ground.",
    "zh-CN": "重物砸落地面。"
  },
  "upstreamUi.native.cue.turn.label": {
    "en": "Your turn",
    "zh-CN": "你的回合"
  },
  "upstreamUi.native.cue.turn.blurb": {
    "en": "A short chime for the person whose turn it is.",
    "zh-CN": "一声短促铃音，提醒轮到谁行动。"
  },
  "upstreamUi.soundLayerBed": {
    "en": "Room",
    "zh-CN": "环境"
  },
  "upstreamUi.soundLayerMusic": {
    "en": "Music",
    "zh-CN": "音乐"
  },
  "upstreamUi.soundTake": {
    "en": " · take {take} of {count}",
    "zh-CN": " · 第 {take}/{count} 个版本"
  },
  "upstreamUi.soundNextBed": {
    "en": "Next room take",
    "zh-CN": "下一个环境音版本"
  },
  "upstreamUi.soundNextMusic": {
    "en": "Next music take",
    "zh-CN": "下一个音乐版本"
  },
  "upstreamUi.soundBedLevel": {
    "en": "Room level",
    "zh-CN": "环境音音量"
  },
  "upstreamUi.soundMusicLevel": {
    "en": "Music level",
    "zh-CN": "音乐音量"
  },
  "upstreamUi.soundPlayingMusic": {
    "en": "{music} music",
    "zh-CN": "{music}音乐"
  },
  "upstreamUi.soundNoLibrary": {
    "en": "Sound: no library on this server yet",
    "zh-CN": "声音：服务器尚未安装音库"
  },
  "upstreamUi.soundOff": {
    "en": "Sound: off for you",
    "zh-CN": "声音：你已关闭"
  },
  "upstreamUi.soundPlaying": {
    "en": "Sound: {playing}",
    "zh-CN": "声音：{playing}"
  },
  "upstreamUi.soundIdle": {
    "en": "Sound: nothing playing",
    "zh-CN": "声音：暂无播放"
  },
  "upstreamUi.native.soundFailed": {
    "en": "That did not take.",
    "zh-CN": "操作未生效。"
  },
  "upstreamUi.unoffered": {
    "en": "This builder does not offer {name}'s {what}: a table's own content, or a row this server no longer has. Saving here would put {standIn} in their place, so the save waits until you pick on purpose. Leave without saving to keep the character as stored.",
    "zh-CN": "此建卡器不提供{name}的{what}：这些可能是战役自定义资料，或服务器已移除的条目。在此保存会将其替换为{standIn}，因此必须先明确选择才能保存。若要保留角色原样，请不保存直接离开。"
  },
  "upstreamUi.unoffered.race": {
    "en": "race ({value})",
    "zh-CN": "种族（{value}）"
  },
  "upstreamUi.unoffered.other.race": {
    "en": "another race",
    "zh-CN": "另一个种族"
  },
  "upstreamUi.unoffered.class": {
    "en": "class ({value})",
    "zh-CN": "职业（{value}）"
  },
  "upstreamUi.unoffered.other.class": {
    "en": "another class",
    "zh-CN": "另一个职业"
  },
  "upstreamUi.unoffered.background": {
    "en": "background ({value})",
    "zh-CN": "背景（{value}）"
  },
  "upstreamUi.unoffered.other.background": {
    "en": "another background",
    "zh-CN": "另一个背景"
  },
  "upstreamUi.unoffered.character": {
    "en": "this character",
    "zh-CN": "此角色"
  },
  "upstreamUi.soundNoAudio": {
    "en": "{label}: no audio on this server yet",
    "zh-CN": "{label}：服务器尚无对应音频"
  },
  "upstreamUi.soundHoldBed": {
    "en": "Hold the room here",
    "zh-CN": "固定当前环境音"
  },
  "upstreamUi.soundHoldMusic": {
    "en": "Hold the music here",
    "zh-CN": "固定当前音乐"
  },
  "upstreamUi.handMoveLeft": {
    "en": "Move {name} one seat left",
    "zh-CN": "将{name}向左移动一个位置"
  },
  "upstreamUi.handMoveRight": {
    "en": "Move {name} one seat right",
    "zh-CN": "将{name}向右移动一个位置"
  },
  "upstreamUi.partyDrag": {
    "en": "Drag to move {name}; the arrow keys move it up or down",
    "zh-CN": "拖动以移动{name}；方向键可上下移动"
  },
  "upstreamUi.partyUp": {
    "en": "Move {name} up",
    "zh-CN": "将{name}上移"
  },
  "upstreamUi.partyDown": {
    "en": "Move {name} down",
    "zh-CN": "将{name}下移"
  },
  "upstreamUi.native.partySave": {
    "en": "The order could not be saved.",
    "zh-CN": "无法保存顺序。"
  },
  "upstreamUi.native.partyNetwork": {
    "en": "Could not reach the server; the order was not saved.",
    "zh-CN": "无法连接服务器，顺序未保存。"
  },
  "upstreamUi.loading": {
    "en": "Loading",
    "zh-CN": "加载中"
  },
  "upstreamUi.imageEnv": {
    "en": "Env: {value}",
    "zh-CN": "环境变量：{value}"
  },
  "upstreamUi.imageFluxEnv": {
    "en": "Env: {value}. The worker loads its own FLUX model.",
    "zh-CN": "环境变量：{value}。工作进程会加载自己的 FLUX 模型。"
  },
  "upstreamUi.imageAuto": {
    "en": "Auto ({backend})",
    "zh-CN": "自动（{backend}）"
  }
});
