# キャッシュとは
データを一時保存して取り出しやすくすること

# Request Memorization
Reactの機能
同じリクエストは重複排除される

## 注意点

* URLやオプションが少しでも違うとメモ化されない
* fetchを使う場合は関数化しておくと良い(データ取得層に分離しておく)


※ ServerComponentでfetchを使う場合のみ適用される
ORMで作った関数はメモ化されない
RouterHandler(API)での利用は適用されない
fetch以外ならReact cacheを利用

コンポーネントの最下層でfetchしても問題ない

動的なメタデータ設定の際効果を発揮する
generateMetadata()

キャッシュ期間は永続的ではない
fetchリクエスト毎に行われている

# Requestメモ化の仕組み
ルートをレンダリング中に特定のリクエストが最初に呼び出された場合、その結果はメモリに存在せず、キャッシュMISSになる
そのため、関数が実行され、データが外部ソースからフェッチされて結果がメモリにセットされる
同じレンダリングパス内でのリクエストの後続の関数呼び出しはキャッシュHIT隣、メモリからデータが渡され、関数は実行されない
ルートがレンダリングされレンダリングパスが完了するとメモリはRESETされ、全てのリクエストメモ化エントリがクリアされる

# Data cacheについて
fetchに関するキャッシュ
Data Chache 設定ができる

```
force-chace
no-store
{next: {revalidate: 3600}}
```

SSG / SSR / ISRが関係する

SSRは常に最新のデータを利用するのでData Cacheは利用しない

# 時間ベース再検証のキャッシュワークフロー（state while revalidate）
時間ベースでのキャッシュの再検証(ISR)
古いものを返している間に再検証をする（state while revalidate）

新しさがそれほど重要でない場合→時間ベースの再検証
早く最新のデータを確実に表示したい→オンデマンドの再検証

# Data Cacheのキャッシュ期間とオプトアウト
永続的である
サーバ再起動 / タブを閉じてもData Cacheは残る
再ビルド / デプロイしたら更新される
Webhookでイベントが起こったら CI / CD で再デプロイして更新するなどもあり

最新のデータを返したいなら

* SSRにする
* no-storeをfetchで指定する
* Route Segment Configを指定する

```
export const dynamic = 'force-dynamic'
```

再検証を設けることも可能
revalidate

* 時間ベースでキャッシュを再検証
* イベント発火時に再検証

# Full Route Cache
## 静的ページ全体をキャッシュする

* SSG / ISR で生成されたページをサーバ側でキャッシュ(ビルド時 / 再検証時にキャッシュされる)
* 具体的にはHTML / RSCPayloadをキャッシュする
  - HTML ページの骨格情報、Next.jsがキャッシュ
  - RSC Payload レンダリングされたReact Server Components treeのコンパクトなバイナリ表現(コンポーネントツリー構造、必要なこpropsの情報)、Reactがキャッシュ
  - HTML → RSC Payload → Hydration(ページをJSを使ってインタラクションに動くようにする)の順番でページをクライアントでレンダリングする(まず見せる→構造理解→インタラクティブ化)
* レンダリングコストの削減、ページ表示速度の向上

Static Renderingのみ適用される(SSG / ISR時のみ)
SSR時はキャッシュされない
APPRouterはStaticRenderingを推奨

* Full Route Cacheで静的ページを自動キャッシュ
* 純粋に早い
* 意図しないDynamic Renderingに注意

cookies() / headers() といったdynamic functionsを使うと自動でDynamic Rendering(SSR)になる

# キャッシュ期間
永続的
ユーザー感を超えてキャッシュが共有される
指定時は慎重に

# Router Cache
クライアントでRSC Payloadをキャッシュすること

* ページ訪問時にキャッシュされる
* Full Route Cacheで見た通り
* 戻る / 進むボタンでキャッシュが利用される
* UXの大幅な向上

パージ訪問前にキャッシュするには<Link />を使えばプリフェッチできる
プリフェッチとはページ訪問前に事前取得してキャッシュすること
プリフェッチのデフォルトの挙動は静的 / 動的ページで変わる

##　静的ページ
静的ページはprefetchがデフォルトでtrue
5分間Router Cacheにキャッシュされる
バックグラウンドでプリロードされている(ユーザーのビューポートに入った時、スクロールして見えた時に実行)
事前ページ読み込みでリンクを押した瞬間にページ遷移可能に
productionのみ有効(開発環境では実感できない)

## 動的ページ
デフォルトで共通レイアウト(動的以外の部分)とloading.jsはprefetchされている
動的ページはloading.jsのフォールバックUIを表示
静的ページはプリフェッチ＆キャッシュ、動的ページは訪問時にキャッシュ

<Link />はソフトナビゲーション
ページ遷移は本来はハードナビゲーション(ページ遷移するたびにクライアント全体が再レンダリングされる)がNext.jsでは変わったルートセグメント(差分)だけレンダリングする

## キャッシュを無効にしたい時
Server Actionsの
cookie.set / cookie.delete
revalidatePath / revalidateTag
を使う

またはrouter.refreshを行う

## キャッシュ期間
セッション中のみ(ブラウザのタブが閉じるまで)
静的ページはデフォルトで5分間
動的ページは0秒
staleTimesで詳細に時間決定ができる

# ベストプラクティス
キャッシュの挙動を理解する

* 予期しないキャッシュが発生しないようにする
* キャッシュすべき箇所も把握できるようにする
* ドキュメントから最新情報を知るとなお良い

キャッシュをもっと制御したい場合
WebAPI標準に準拠しているRemixを利用する
キャッシュの詳細なカスタマイズが可能

