# 高機能やることリスト

## 概要
編集・ステータス更新・並べ替えなどの機能を搭載した、高機能のやることリストアプリです。

## 使用言語・ライブラリ・フレームワーク・ツール
<p>
<img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB">
<img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white">
<img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white">
</p>

## 解説・機能など
* 各todoに①編集、②削除、③ステータス（未着手・進行中・完了）更新機能を搭載
* 並べ替え機能を搭載（①期限が近い順、②ステータス順（期限切れ → 未着手 → 進行中 → 完了））

## データベース
* Supabase

## 工夫点など
* TypeScript導入
* デザインも自作
* ステータスを更新するとstyleが変わり、ステータス状態を一目で分かりやすくするように設定
* formにはreact-hook-formを導入
* 入力欄は、未入力の場合にエラー文が表示されるように設定
* 期限は、本日より過去の日付を選択できないように設定
* todoの追加、編集、削除時にメッセージが表示されるように設定
* カスタムフックを使用
* CSSはChakra UIを使用

## デモサイト
https://hyper-todo-app-three.vercel.app/