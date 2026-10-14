"""Real API/codec checks. Run against a started router; not a listening review."""
import argparse
import io
import json
from pathlib import Path
import urllib.error
import urllib.request
import soundfile as sf

parser = argparse.ArgumentParser()
parser.add_argument('--url', default='http://127.0.0.1:8881')
parser.add_argument('--output', required=True)
args = parser.parse_args()
output = Path(args.output)
output.mkdir(parents=True, exist_ok=True)
http = urllib.request.build_opener(urllib.request.ProxyHandler({}))

def request(route, body=None):
    return http.open(urllib.request.Request(args.url + route,
        data=None if body is None else json.dumps(body).encode(),
        headers={'Content-Type': 'application/json'}), timeout=180)

rows = []
for model, voice, text in [
    ('kokoro-v1.1-zh', 'zf_001', '夜色笼罩着古老的神殿。你推开石门，听见远处传来脚步声。米拉施放魔法飞弹，哥布林受到七点伤害。现在，你准备怎么做？'),
    ('kokoro-v1.1-zh', 'zm_095', '米拉消耗1个法术位。Brom掷出1d6加3，造成7点伤害。'),
    ('kokoro', 'af_heart', 'The tavern door creaks open. Roll for initiative, adventurer.'),
    ('kokoro', 'bm_fable', 'The wizard opens the ancient door. What do you do?'),
]:
    with request('/v1/audio/voices?model=' + model) as r:
        ids = json.load(r)['voices']
    assert voice in ids
    for fmt in ['mp3', 'wav']:
        body = dict(model=model, input=text, voice=voice, speed=1, response_format=fmt)
        if model.endswith('zh'):
            body['lang_code'] = 'z'
        with request('/v1/audio/speech', body) as r:
            data, actual_model = r.read(), r.headers['X-Kokoro-Model']
        assert actual_model == ('kokoro-v1.0' if model == 'kokoro' else model)
        audio, rate = sf.read(io.BytesIO(data))
        assert len(audio) / rate > 1
        (output / (voice + '.' + fmt)).write_bytes(data)
        rows.append(dict(model=actual_model, voice=voice, format=fmt, seconds=len(audio)/rate, voiceCount=len(ids)))
for model, voice in [('kokoro-v1.1-zh', '../config'), ('kokoro-v1.1-zh', 'zf_xiaobei'), ('kokoro-v1.1-zh', 'af_heart'), ('kokoro', 'zf_001')]:
    try:
        request('/v1/audio/speech', dict(model=model, voice=voice, input='test'))
        raise AssertionError('Invalid model/voice request accepted')
    except urllib.error.HTTPError as e:
        assert e.code == 400
with request('/health') as r:
    health = json.load(r)
(output / 'results.json').write_text(json.dumps(dict(health=health,results=rows,invalidRequestsRejected=4),indent=2))
print(json.dumps(rows,indent=2))
