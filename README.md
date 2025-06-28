sUSD Rate Checker

sUSD レートチェッカー — Solana Mainnet 上の sUSD (Token‑2022) ミントの on‑chain データを使用して「1 sUSD = ? USD」レートを計算するシンプルな TypeScript スクリプトです。

📦 プロジェクト概要

このリポジトリには、Solana RPC ノードを介して createUiAmountToAmountInstruction をシミュレートし、
sUSDbag... ミントの最小単位（u64）を取得する関数 uiAmountToAmount() が含まれています。
取得した整数値から 1 sUSD の価格レートを計算し、ターミナルに出力します。

言語: TypeScript 5

依存ライブラリ: @solana/web3.js, @solana/spl-token

対象ネットワーク: Solana Mainnet Beta

🔧 前提条件

ツール

推奨バージョン

Node.js

20.18 (LTS) 以上

npm / pnpm / yarn

任意 (例: npm 10+)

注意: Solana RPC エンドポイント (default: https://api.mainnet-beta.solana.com) にアクセスできることを確認してください。

🚀 インストール

# リポジトリをクローン
$ git clone https://github.com/kumavalidator/susd-rate-checker.git
$ cd susd-rate-checker

# 依存関係をインストール
$ npm install

▶️ 実行方法

1. 直接 ts-node-dev で実行 (開発向け)

$ npx ts-node-dev src/index.ts

2. コンパイルして実行 (本番向け)

# TypeScript -> JavaScript へトランスパイル
$ npx tsc

# 実行
$ node dist/index.js

🖨️ 出力例

rate:  1.1039355301650384

数値は RPC から取得したブロック高およびプール状態に依存し、実行のたびに変化します。
