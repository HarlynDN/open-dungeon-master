# PDF font

Noto Sans SC (Version 2.004;hotconv 1.0.118;makeotfexe 2.5.65603), SIL Open Font License 1.1; see OFL.txt.
Downloaded 2026-10-14 from the official project:
https://github.com/notofonts/noto-cjk/blob/main/Sans/Variable/TTF/Subset/NotoSansSC-VF.ttf

Source SHA-256: d68bafcb48a2707749396aa12bbbd833cb70401f3a9a689fd2902c7e0d295964
Bundled regular instance SHA-256: ee1733e070fcda45d141d6f7a754b1d9f3f3d956e0a313d4f702795e39fceeff

Generated with fontTools 4.57.0, preserving the full glyph set for editable PDF fields:

```python
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
font = TTFont("NotoSansSC-VF.ttf")
instantiateVariableFont(font, {"wght": 400}, inplace=True).save("NotoSansSC-Regular.ttf")
```

The browser loads this local static asset only on PDF export requiring Chinese
or other non-Latin-1 text. No third-party font request occurs at runtime.
The TrueType instance avoids the full-OTF embedding warnings from pdf-lib.
