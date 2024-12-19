# レンダリングとは
HTML / CSS / JSを組み合わせてページとして見れる状態にすること
HTMLの骨格を生成→CSSでスタイリング→JSでインタラクティブ化

※ レンダリングは文脈によって意味が変わる
上記のレンダリングフロー全体を指すこともあるがReactのレンダリングを指すケースもある

Reactのレンダリング

* Trigering a render
* Rendering the component
* Committing to the DOM

キャッシュとの違い
「キャッシュ」はデータをいつ再利用するか
「レンダリング」はページをいつ作るか

レンダリング方法を決定するとキャッシュ方法も自動的に決まる
クライアント側もしくはサーバ側でレンダリングするかでパフォーマンスが変わる
Next.jsでは基本的にサーバ側でレンダリングさせる

# Static Rendering
SSG 最速、静的ページで有効
ISR データキャッシュ更新時間を指定可能　静的と動的の中間ページで有効

# Dynamic Rendering
SSR 初期ロードはClientComponentよりも早い傾向 リクエスト毎に都度サーバでレンダリング

※ 注意点
キャッシュされない
都度APIリクエストを投げるので負荷がかかる
headers() / cookies()で自動的にSSRになる

# Streaming / Pertial Pre Rendering(PPR)
## Streaming 
段階的にUIやデータを提供すること
SSRの時に利用する→Streaming SSR
データフェッチのストリーミングデータフェッチングを参照する

## Pertial Pre Rendering
v15で実験的に導入されている
Pertial Pre Rendering 部分レンダリング
ページ単位からUI単位へのレンダリング方式へ

# ベストプラクティス
実装箇所によってレンダリング方式を判断できたらOK
キャッシュも同様
Next.jsユーザーであれば理解しておくべきトピック