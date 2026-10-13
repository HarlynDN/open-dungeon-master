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
时长及信号检查；测试战役也成功请求并取回实际 DM 段落的中文语音。听审、
英文回归和完整播放控制验收仍待完成。`/tmp` 服务用于隔离验收，不代表已配置
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
