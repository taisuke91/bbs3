"use server";

import { z } from "zod";
import prisma from "../../lib/prismaClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { formSchema } from "../components/formSchema";

export const postBBS = async ({
  username,
  title,
  content,
}: z.infer<typeof formSchema>) => {
  await prisma.post.create({
    data: {
      username,
      title,
      content,
    },
  });

  revalidatePath("/");
  redirect("/");
};
//z.infer<typeof formSchema>の型である入力を受け取り、
//prisma.post.createを使用してデータベースに新しい投稿を作成します。
//revalidatePath("/")を使用して、トップページのキャッシュを再検証し
//、redirect("/")を使用してトップページにリダイレクトします。