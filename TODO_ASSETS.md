# TODO: 카드 이미지 수동 교체 필요

자동 크롤링 시도 결과, 본 상품(메가드림ex / SV11)은 실 발매일 기준 자동 수집 가능한 공개 이미지 DB에 아직 등록되지 않은 상태입니다 (2026-05-30 기준). 따라서 placeholder SVG가 자동으로 렌더링되도록 처리해두었습니다.

## 교체 방법

1. 아래 파일들을 동일 파일명으로 `public/images/mega-dream-ex/`에 저장하면 placeholder가 자동으로 사라지고 실제 이미지로 대체됩니다.

| 파일명 | 권장 출처 |
|---|---|
| `mega-dream-ex-pack.webp` | 일본 공식 [pokemon-card.com](https://www.pokemon-card.com/products/) - 박스/팩 사진 |
| `240-mega-gengar-ex-sar.webp` | 카드DB / mercari 캡쳐 |
| `234-pikachu-ex-sar.webp` | 〃 |
| `250-mega-dragonite-ex-mur.webp` | 〃 |
| `246-mega-dragonite-ex-sar.webp` | 〃 |
| `237-team-rockets-mewtwo-ex-sar.webp` | 〃 |
| `223-mega-charizard-x-ex-ma.webp` | 〃 |
| `242-ns-zoroark-ex-sar.webp` | 〃 |
| `236-ionos-bellibolt-ex-sar.webp` | 〃 |
| `243-marnies-grimmsnarl-ex-sar.webp` | 〃 |
| `230-mega-gengar-ex-ma.webp` | 〃 |

## 권장 스펙
- 가로 600~800px, webp 또는 jpg
- 비율 3:4 (카드 비율)
- 워터마크 있는 이미지는 사용 금지 (제거도 금지)

## 출처 기록
신규 이미지를 추가할 때마다 `public/images/mega-dream-ex/asset-sources.json`의 cards 배열에 `sourceUrl` 필드를 추가하여 출처를 기록해 주세요.
