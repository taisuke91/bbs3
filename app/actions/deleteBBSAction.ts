"use server"; // このファイル内の関数がサーバーでのみ実行されることを示す

import prisma from "@/lib/prismaClient"; // prismaClientのパスは適宜調整してください
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteBBSAction(id: string) {
  try {
    // 投稿を削除
    await prisma.post.delete({
      where: {
        id: parseInt(id),
      },
    });

    // ホームページのキャッシュをクリアして、投稿リストを最新の状態にする
    revalidatePath("/");
  } catch (err) {
    console.error(err);
    // エラーハンドリング（必要に応じて）
  }

  // 処理完了後、ホームページにリダイレクト
  redirect("/");
}