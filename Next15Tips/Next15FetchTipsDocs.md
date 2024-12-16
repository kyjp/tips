# fetch
Next.jsでは拡張されている
デフォルトでSSG

オプトインでSSG/SSR/ISRに変更可能
キャッシュ設定が簡単

```
// SSG
fetch(url, {cache: 'force-cache'})

// SSR
fetch(url, {cache: 'no-store'})

// ISR
fetch(url, {next: {revalidate: 3600}})
```

Request Memorizationが自動で発動する

# ORMを使う場合
prismaなど
Route Handler(API)で書く必要はない

※ RouteHandler NextjsでAPIが作れる機能のこと

Route Handlerでかくと通信回数が増える

## Route Handlerを利用するケース
WebhookやOAuthコールバック用のAPIを利用するケース
サードパーティサービスとの統合ポイントとして利用する時がある

# サードパーティライブラリ
※ client componentでしか使用できない

非推奨な実装

* 学習コストがかかる
* パブリックなネットワークへの公開
* JSバンドルサイズの増加
* Next.jsを使う意義が損なわれる(Next.jsの強みはServer Componentでのfetch)

主な一覧

* useSWR(stale-while-revalidate)
* Tanstack Query
* useEffect(非推奨) 

## useEffectが非推奨の理由

* バケツリレーが増える
* エラーハンドリングやローディング状態の管理も大変
* キャッシュ実装が面倒かつ難しい

# 並行データフェッチング
同期よりも並行を優先

どうすれば平行になるのか

- コンポーネントを分割すると自動的に非同期なデータフェッチになる
- Promise.allを使う

# ストリーミングデータフェッチング
段階的にUIを表示したい場合、ストリーミングデータフェッチングを利用する
Server Componentが基本になっている

用意できたデータから順次表示する手法

* UXの向上につながる
* 用意できていないデータはフォールバックを表示(ローディングUIやスケルトンUI)

Reactの<Suspence />を利用(個々のコンポーネントのローディングで使用)
もしくはルートセグメントでloading.jsを利用(ページ全体でローディン
グしたいときに使用)

# ベストプラクティス

* Server Componentを利用する
* Container / Presentationパターンの意識

## Server Componentを利用する理由

- 初回ページ読み込み速度の向上
- SEO向上
- セキュア
- キャッシュの利用

### デメリット
#### リアルタイム性に弱い

* WebSocket(配信やチャットなど)
* 楽観的UI更新(useStateやuseOptimistic)

#### ユーザー操作に基づいたデータフェッチに弱い

* フォーム入力や検索機能など(react-hook-form・useSearchParams・usePathname)
* ServerActionsの登場でServerComponentのみでも処理できる

ServerActionsはJS無効な環境でも動作する(プログレッシブエンハンスメント)
UX向上につながる
リアルタイムバリデーションは難しい

ServerActionsがベストプレクティスになりつつある

* useActionState
* useFormStatus

ClientComponentと併用して使い分けていく必要がある
必要に応じて平行データフェッチ / ストリーミングデータフェッチを行う

## Container / Presentationパターン
データフェッチをする際のコンポーネントの分け方、データの分け方の概念
これを意識することにより、適切にフェイルを分割し、パフォーマンスを向上させた状態で保守運用ができる

- Container データ取得層
- Presentation 見た目の部分

関心の分離をすることでUI部分とデータロジックの責務が明確になる

テストがしやすくなる
※ React Testing LibraryはServerComponentのテストに現在未対応(2024/12/16)

Compostionパターンにも対応しやすい
Containerから実装してPresentationを実装すると良い
データ取得 → 見た目

小規模ならオーバーエンジニアリングかもしれない