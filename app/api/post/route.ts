import { NextResponse } from "next/server";
import prisma from "../../../lib/prismaClient";

export async function GET() {
  try {
    // Prismaクライアントを使って、データベースのpostテーブルからすべてのレコードを取得します。
    const allBBSPosts = await prisma.post.findMany();

    // 取得した投稿データをJSON形式でクライアントに返します。
    return NextResponse.json(allBBSPosts);
  } catch (error) {
    // データベース接続エラーなど、何らかのエラーが発生した場合の処理です。
    console.error("Failed to fetch posts:", error); // エラー内容をサーバーのコンソールに出力します。

    // クライアントには、サーバーで問題が発生したことを示すエラーメッセージと
    // 500 (Internal Server Error) ステータスコードを返します。
    return NextResponse.json(
      { message: "An error occurred while fetching the posts." },
      { status: 500 }
    );
  }
}
//  const allBBSPosts = await prisma.post.findMany();
  //Prismaクライアントを使って、データベースのpostモデル（テーブルに対応）
  //からすべてのレコード（投稿）を取得しています。

//  return NextResponse.json(allBBSPosts);
  //extResponseのjsonメソッドを使用し、allBBSPostsに格納
  //されているデータをJSON形式に変換してレスポンスボディとして設定します。
  //これにより、クライアント側はhttp://localhost:3000/api/postの
  //ようなURLにGETリクエストを送ることで、データベースに保存されている
  //すべての掲示板投稿データをJSON形式で受け取ることができます。
//}