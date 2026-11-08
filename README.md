# 느헤미야와 예루살렘 성벽 · Nehemiah and the Wall

**Live site / 웹사이트:** https://chanwoo777.github.io/nehemiah-timeline/

An interactive map and timeline of the book of Nehemiah (chapters 1–13), in Korean and English, styled like an old Bible atlas.

느헤미야서 1–13장을 지도와 타임라인으로 따라가는 웹페이지입니다. 한국어와 영어로 볼 수 있습니다.

## What it does / 기능

- **Drag the timeline** left and right (or swipe on a phone) to move through 31 scenes, from the exiles' return to Nehemiah's last prayer.
- **The map follows the story** at three zoom levels: the Persian Empire (Susa to Jerusalem), the province of Judah, and a sketch of Jerusalem's walls and gates.
- **Tap a gate** on the Jerusalem map to see who rebuilt it in chapter 3.
- **Who's who** lists the 20 people Nehemiah dealt with. Tap a name to highlight their scenes.
- **한국어 / English** button switches the whole page. Korean links go to the 개역개정 (Korean Bible Society); English links go to the NIV (BibleGateway).
- **Phone friendly:** a bottom bar with large previous/next buttons, bigger tap targets, and a layout made for one hand.

## Sources and text / 출처

Scenes are retold in plain words; Bible text is not copied, apart from one short NIV phrase (Nehemiah 8:10) in the English version. Each scene links to the full passage:

- English: New International Version (NIV) on [BibleGateway](https://www.biblegateway.com/passage/?search=Nehemiah+1&version=NIV). NIV © Biblica.
- 한국어: 개역개정 on [대한성서공회](https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=neh&chap=1). 개역개정 © 대한성서공회.

Dates are approximate (Artaxerxes I's 20th year ≈ 445 BC). The travel route and the Jerusalem gate positions are reconstructions; the Bible does not give them exactly.

## How it's built

Plain HTML, CSS and JavaScript with no build step and no dependencies. Fonts come from Google Fonts.

| File | Purpose |
| --- | --- |
| `index.html` | Page structure and the security policy |
| `styles.css` | Parchment design and phone layout |
| `app.js` | Map, timeline, translations and story data |
| `favicon.svg` | Browser tab icon |

To try it locally, open `index.html` in a browser.

## Security

See [SECURITY.md](SECURITY.md).
