# 本地中文旁白（Kokoro）

本项目使用 Kokoro-FastAPI 的 `/v1/audio/speech` 接口。中文战役首期使用
一个旁白音色；英文保留原有配音行为。界面语言与战役语言分开：英文界面也可以
试听和播放中文战役。已有角色音色配置保留，中文播报暂不使用英文选角启发式。

## 准备服务

在独立服务目录按 [Kokoro-FastAPI 官方启动说明](https://github.com/remsky/Kokoro-FastAPI)
安装并启动，记录实际使用的版本或提交。官方支持容器部署，也支持在 macOS
直接运行；运行方式以该版本的说明为准。服务需安装中文音色，例如
`zf_xiaobei` 或 `zm_yunxi`；[官方音色文件](https://huggingface.co/hexgrad/Kokoro-82M/tree/main/voices)
可用于核对音色是否属于所装模型。

如果自行搭建 Python Kokoro 环境，需安装中文依赖 `misaki[zh]`。
[官方中文 pipeline](https://github.com/hexgrad/kokoro/blob/main/kokoro/pipeline.py)
在缺少该依赖时会报错。不要为了中文战役把整个服务的 `DEFAULT_VOICE_CODE`
强制设成 `z`：同一服务还要供英文战役使用。应用的中文请求会单独传
`lang_code: "z"`，英文沿用音色本身的语言。

## 接入项目

管理员设置里选择 Kokoro，服务地址填写实际本地地址；默认是
`http://127.0.0.1:8880`。也可通过项目启动环境配置：

```dotenv
TTS_PROVIDER=kokoro
KOKORO_URL=http://127.0.0.1:8880
```

服务在容器或另一台机器上时，地址必须从运行本项目的进程可达。
无需增加付费 API 配置。保存后重新打开战役语音设置，选择中文音色并点击试听。
中文战役遇到旧的英文 Kokoro 默认音色时，会使用中文默认音色；明确的自定义
服务音色仍按用户配置传递。音色列表有短时缓存，服务刚启动时可稍后重新打开。
列表回退仅代表内置候选，不证明服务安装了这些音色或能生成中文。

试听使用中文句子；旁白按战役语言规划，中文短片段先开始，后续片段按顺序播放。
中文断句包括句号、问号、感叹号、分号、省略号和闭合引号；无标点长文本也有
按 Unicode 字符计算的上限。片段和试听缓存区分语言，试听还区分示例文本与
所用默认音色，英文已有缓存地址保持兼容。

## 真实验收

一次完整验收应记录：服务版本、Kokoro 模型版本、中文依赖版本、音色、CPU/MPS
等执行设备，以及本项目提交。先听默认中文试听，再听一段实际 DM 战斗叙事，
检查数字、法术环位、生命值、骰子表达式和中英文专有名词；不要只检查文件非空。

随后检查游戏内首次播放、连续片段、手动重播、暂停/静音和失败重试，并用英文
战役确认英文仍能播放。中文战役中切换界面语言不应改变播报语言。服务关闭时
应显示可理解的失败提示，文字游玩仍可继续；服务恢复后可重试。

`scripts/test-tts-locales.mjs` 使用模拟音频传输检查接口、缓存、队列和控件。
它不会证明真实音频质量、浏览器解码或实际播放成功。

本轮在独立临时目录启动了真实 CPU 服务，版本、依赖和验收边界记录在
[运行记录](../validation/chinese-tts-runtime.json)。中文样本已生成并通过音频解码、
时长及信号检查；测试战役也成功请求并取回实际 DM 段落的中文语音。数字、骰子与混合名称样本和英文样本也已生成并成功解码；游戏内试听在服务
中断后显示中文失败提示，恢复服务后重试成功。用户听审明确拒绝了当前中文音色，
因此中文语音质量未验收通过，不能视为已交付。实际英文战役播报和
完整播放控制验收仍待完成。`/tmp` 服务用于隔离验收，不代表已配置
持久生产部署，系统 Python 未修改。

本轮服务使用 Python 3.12、Kokoro-FastAPI 固定提交
`61797914e5f8da0baf1d0b97d9d0b15c66625615`（0.9.1-rc1）、PyTorch 2.8.0，
按官方源码依赖安装，包含 `misaki[zh]`。先运行官方模型下载脚本并通过其哈希
校验，然后在独立虚拟环境启动；将下面路径替换为实际服务目录：

```sh
env USE_GPU=false DEVICE_TYPE=cpu \
  MODEL_DIR=/path/to/Kokoro-FastAPI/api/src/models \
  VOICES_DIR=/path/to/Kokoro-FastAPI/api/src/voices/v1_0 \
  WEB_PLAYER_PATH=/path/to/Kokoro-FastAPI/web \
  .venv/bin/python -m uvicorn api.src.main:app --host 127.0.0.1 --port 8880
```

启动时载入音色不等于中文生成成功。新版音色接口可返回包含 `id` 的对象，
项目同时支持对象和字符串列表；应核对 `zf_xiaobei` 等音色实际存在，并向
`/v1/audio/speech` 请求中文样本确认。

## 双模型接入（2026-10-14）

当前新增方案：中文请求 `kokoro-v1.1-zh`；英文继续请求 `kokoro`，由现有
Kokoro-FastAPI v1.0 服务处理，保留英文音色、混音与语速行为。双模型路由器
位于 `services/kokoro-router`，独立监听本机 8881；原英文服务保留在 8880。
只将 ODM 的 `KOKORO_URL`（或管理员已保存的 Kokoro 地址）改为
`http://127.0.0.1:8881`，`TTS_PROVIDER=kokoro`、`TTS_MODEL=kokoro`。
管理员已保存的配置优先于环境变量。不能把旧的单模型服务当作双模型服务使用。

在独立 Python 3.12 虚拟环境安装 `services/kokoro-router/requirements.txt`，
设置 `KOKORO_ZH_DIR` 为持久模型目录，再执行 `download.py`。下载固定官方
revision `01e7505bd6a7a2ac4975463114c3a7650a9f7218` 的配置、权重及 100 个中文
音色，校验模型 SHA256。已有英文服务及权重不被替换。

```sh
# 从 services/kokoro-router 目录执行，使用该服务的独立虚拟环境。
export KOKORO_ZH_DIR=/path/to/persistent/kokoro-zh
.venv/bin/python download.py
KOKORO_EN_URL=http://127.0.0.1:8880 \
  .venv/bin/python -m uvicorn app:app --host 127.0.0.1 --port 8881
# 另一终端，验证真实列表、模型路由、MP3/WAV 与错误输入。
.venv/bin/python smoke.py --output /tmp/odm-kokoro-check
```

中文默认 `zf_001`；10 个初始推荐音色为 `zf_001/003/004/006/008` 和
`zm_009/010/011/012/013`，在列表前以 ★ 标示，**不是经过听审的质量排名**。
用户可选服务实际安装的其他编号音色，也可手填服务支持的 ID。旧中文八音色
设置只在读取播报时回退到新默认，不写回战役；新版明确选择的音色保持不变。
中文仍是单旁白，多角色配音不在本次范围。服务未返回列表时的十个候选不代表
安装或合成成功。中文接口仅接受实际安装的 v1.1 编号；不静默用 v1.0 代替。

音色列表与音频片段缓存区分模型，试听磁盘缓存同样包含模型 ID。试听路由
禁止浏览器持久缓存，以确保后端切换后重新解析；已有英文缓存键保持兼容。
历史消息已保存的音频不批量重生成，主动重生成时使用新模型与新的播放版本。

中文服务为 CPU 推理，串行锁保护模型；英文转发仍由原服务调度。服务无对外
鉴权层，默认只能绑定回环地址；跨主机部署应置于已有认证网关后。模型第一次
使用才载入，`/health` 的 `chineseLoaded` 区分加载状态，不能只凭音色文件数量
判定合成成功。该方案增加中文模型的常驻内存；无付费 API 或 DM 模型改动。
