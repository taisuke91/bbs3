import { NextResponse } from "next/server";
import prisma from "../../../lib/prismaClient";

export async function GET(req: Request) {
  console.log('--- API /api/post GET request received ---'); // ★追加

  try {
    console.log('Attempting to connect to database via Prisma...'); // ★追加
    // DATABASE_URLの値を安全にログに出力する（本番ではパスワードを隠す必要あり）
    console.log('DATABASE_URL (partial):', process.env.DATABASE_URL?.substring(0, 30) + '...'); // ★追加
    console.log('DIRECT_URL (partial):', process.env.DIRECT_URL?.substring(0, 30) + '...'); // ★追加

    const allBBSPosts = await prisma.post.findMany();
    console.log('Successfully fetched posts from database.'); // ★追加
    console.log('Number of posts fetched:', allBBSPosts.length); // ★追加

    return NextResponse.json(allBBSPosts);

  } catch (error) {
    console.error('--- Error in API /api/post GET request ---'); // ★追加
    console.error('API Route Error Details:', error); // ★追加
    // エラー詳細をクライアントには返さない方がセキュリティ上良いですが、
    // デバッグのため一時的に含めることもできます。
    // return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}