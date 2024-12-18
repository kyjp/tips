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