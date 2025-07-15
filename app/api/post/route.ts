import { NextResponse } from "next/server";
import prisma from "../../../lib/prismaClient";

export async function GET(req: Request) {
  const allBBSPosts = await prisma.post.findMany();
  //Prismaクライアントを使って、データベースのpostモデル（テーブルに対応）
  //からすべてのレコード（投稿）を取得しています。

  return allBBSPosts
  //return NextResponse.json(allBBSPosts);
  //extResponseのjsonメソッドを使用し、allBBSPostsに格納
  //されているデータをJSON形式に変換してレスポンスボディとして設定します。
  //これにより、クライアント側はhttp://localhost:3000/api/postの
  //ようなURLにGETリクエストを送ることで、データベースに保存されている
  //すべての掲示板投稿データをJSON形式で受け取ることができます。
}