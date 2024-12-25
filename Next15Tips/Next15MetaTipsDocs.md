# メタデータとは
Googleのクローラーが巡回しやすいように設定するデータ

* title
* description
* OGP
* sitemap

SEO対策をするならば必須の設定
従来のメタデータ設定

```
<meta />
```

を作っていた

Next.jsだと

```
export const metadata = {}
```

に記述する
静的ページと動的ページで若干記述方法が変わる

# 静的メタデータ
静的ページのメタデータ

page.tsx / layout.tsx に

```
export const metadata = {}
```

を記述するだけ


# 動的メタデータ
動的ページのメタデータ
page.tsx / layout.tsx に

```
export async function generateMetadata(){}
```

を記述する

Request Memoizationの効力が発揮される
fetch()を使った場合のみ、重複にフェッチされている場合はメモ化されている
fetch以外の関数を呼ぶ場合、React.cache関数を利用する

# メタデータのファイル規約
page.tsxなどのファイル規則のようにメタデータもファイル規則がある
例えば

```
favicon.ico / apple-icon.jpg / icon.jpg
opengraph-image.jpg / twitter-image.jpg
robots.txt / sitemap.xml
```

opengrapg-image.tsxもある
ImageResponseを使ってOGP画像を動的生成可能
ファイル規約のメタデータが優先される

# メタデータの上書き（評価順序）
メタデータ設定には評価順序が存在します
評価が高い順番

- ファイル規約のメタデータ
- 最下層で定義したメタデータ
- /app/layout.tsx等、最上位で定義した共通メタデータ

意図しない上書きに注意が必要

# ベストプラクティス
メタデータの基本を抑える
メタデータの階層的設計を抑える

* 評価順序の理解
* layout.tsxでベースを設定
* 個別に決めたい場合は、下層のpage.tsxで設定する

静的アセットの活用

* アイコン類はファイル規約で管理
* デフォルトのOGP画像は静的ファイルで用意
* 静的OGP画像はopengraph-image.tsxを積極的に使う

SEO対策の知識

description設定 150から160字の間に設定
OGP画像サイズ 1200✖️630
robots.txt / sitemap.ts
