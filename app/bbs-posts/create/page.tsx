"use client";
import { formSchema } from "@/app/components/formSchema";
import { postBBS } from "../../actions/postBBSAction";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
//複数行のテキスト入力フィールド。
import { zodResolver } from "@hookform/resolvers/zod";
//react-hook-formとZodというスキーマバリデーションライブラリを連携させるためのアダプターです。
import { useRouter } from "next/navigation";
//Next.jsのルーターにアクセスするためのフックです。フォーム送信後にページをリダイレクトするなどの操作に使用します。
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
//ZodはJavaScript/TypeScriptのためのスキーマ定義とバリデーションライブラリです。

const CreateBBSPage = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      title: "",
      content: "",
    },
  });
  //useFormフックを呼び出して、フォームのインスタンスを生成しています。
  //resolver: zodResolver(formSchema)は、Zodスキーマを使用して
  // フォームのバリデーション(基準や仕様に適合していることを検証し、証明するプロセス)を行うための設定です。

  async function onSubmit(value: z.infer<typeof formSchema>) {
    const { username, title, content } = value;
    await postBBS({ username, title, content });
  }
  //フォームが有効な状態で送信されたときに実行される非同期関数onSubmitを定義
  //z.infer<typeof formSchema>の型であるvalueを受け取ります。
  //postBBS関数を呼び出して、フォームのデータをサーバーに送信します。

  return (
    <Form {...form}>
      {/* Form に form というまとまった情報を渡すために...をつける*/}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 w-1/2 px-7"
      >
        {/*
          form.handleSubmit(): react-hook-formが提供するヘルパー関数です。
          フォーム送信時にバリデーションを実行し、入力値が有効な場合にのみ引数に渡された関数
          （この場合はonSubmit）を呼び出します。これにより、無効なデータでの送信を防ぎ、
          バリデーションロジックを自動で処理してくれます。
        */}
        <FormField
          control={form.control}
          //FormFieldはフォーム全体の状態（入力値、バリデーション状態など）
          //にアクセスし、管理できるようになります。
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ユーザー名</FormLabel>
              <FormControl>
                <Input placeholder="ユーザー名" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          //fieldオブジェクトには、react-hook-formが管理する
          //入力要素に必要なプロパティ（例: name, value, onChange, onBlurなど）
          //が含まれています。これらを直接入力コンポーネントにスプレッド（{...field}）
          //することで、react-hook-formとの連携を簡単に行えます。
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>タイトル</FormLabel>
              <FormControl>
                <Input placeholder="タイトル" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>本文</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="投稿内容"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default CreateBBSPage