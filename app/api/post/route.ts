// app/api/post/route.ts
import { NextResponse } from "next/server";
import prisma from "../../../lib/prismaClient";

export async function GET(req: Request) {
  // ★ ここから追加・変更 ★
  console.log('--- API /api/post GET request received ---'); // APIが呼び出されたことを確認するためのログ

  try {
    console.log('Attempting to connect to database via Prisma...'); // Prismaがデータベース接続を試みているログ

    // 環境変数の値を安全にログに出力する（本番環境ではパスワードが漏洩しないように注意）
    // パスワードは隠していますが、形式が正しく読み込まれているか確認できます。
    console.log('DATABASE_URL (partial):', process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 30) + '...' : 'Not Set');
    console.log('DIRECT_URL (partial):', process.env.DIRECT_URL ? process.env.DIRECT_URL.substring(0, 30) + '...' : 'Not Set');

    const allBBSPosts = await prisma.post.findMany();
    console.log('Successfully fetched posts from database.'); // データベースから取得成功のログ
    console.log('Number of posts fetched:', allBBSPosts.length); // 取得した投稿数のログ

    return NextResponse.json(allBBSPosts);

  } catch (error: any) { // error の型を any にすることで、どんなエラーでもキャッチしやすくしています
    console.error('--- Error in API /api/post GET request ---'); // APIでエラーが発生したことを示すログ
    console.error('API Route Error Details:', error); // エラーの詳細を出力

    // クライアント側にもエラー内容を返すように一時的に変更（デバッグ用）
    // これでブラウザのネットワークタブでエラー詳細が見える可能性があります。
    return NextResponse.json({ 
      error: 'Internal Server Error', 
      details: String(error), // エラーオブジェクトを文字列に変換
      message: error.message || 'No specific message' // エラーメッセージがあれば追加
    }, { status: 500 });
  }
}