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
