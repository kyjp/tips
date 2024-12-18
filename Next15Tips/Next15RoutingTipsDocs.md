
# ルーティング
プロジェクトのURLを決定する作業

## 階層構造の基本
tree(root)
|
sub tree(root)
|
leaf

root ツリー、サブツリーの根本のフォルダ
root segment サブツリーの各フォルダ
secment(断片)

## App Routerのルーティング
### /app配下にフォルダやファイルを配置していく

```
/app/page.tsx
/app/[slug]/page.tsx
```

### ファイル規約

```
page ルーティングとして認識
layout ページ共通レイアウト
loading ストリーミングとローディングUI
not-found 404ページ
error / global-error　エラーページの作成
route　APIルーティングとして認識
template　共通レイアウト作成 layoutと違って遷移するとサイレンダリングされる　アニメーション遷移の実装時に利用される
default　Pararell Routesで使用される
```

#### コンポーネント階層
これらのファイル群は自動的に同階層の(root segment)のpage.tsxにレンダリングされる
裏ではどのようにレンダリングされているのか

./ComponentHierarchy.tsx参照


### コロケーション
関連するものは近い位置に配置すること
page.tsxを宣言せずに利用
pageを利用しなければルーティングとして認識されない

Not Routable

```
/app/dashboard/header.tsx
/app/dashboard/footer.tsx
/app/dashboard/utils.tsx

/app/api/db.ts
```

近い位置で管理＝保守・運用しやすい
採用するかどうかはチームによる

### プロジェクト整理機能
#### プライベートフォルダ
ルーティングから除外する機能
フォルダの前にアンダースコアをつける

Not Routable

```
/app/_components/button.tsx
```

##### メリット

* ルーティングロジックから除外される
* 一目でわかりやすい
* エディタ上で並び替えやグループ化がしやすい

#### ルートグループ
プロジェクトをグループ化するときに使う

（）内はドメインに含まれない
（）内の関連のものというグルーピングをしていく

```
/app/(admin)/dashboard/page.tsx
/app/(marketing)/about/page.tsx
```

##### メリット

* そのルーティングの役割を認識＆共有しやすい
* 特定のsegmentをlayout.tsxに組み込める
* 複数のルートレイアウトが作れる(ナビゲーション時にはフルページロードが発生する)

## ベストプラクティス
### ルーティング設計のベストプラクティス

3つの戦略

- /appの外側にプロジェクトファイルを配置(/appはルーティングのみに使用する)
- /appの内側のトップフォルダにプロジェクトファイルを配置
- 機能やRoute毎にプロジェクトファイルを配置(コロケーション機能を採用する)

### プロジェクト配置設計のベストプラクティス

- Atomic Design
- Bukketproof-React

#### Bukketproof-React
featuresディレクトリを配置
機能毎にfeaturesの中に配置していく