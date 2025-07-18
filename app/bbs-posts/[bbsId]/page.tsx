import { BBSData } from '@/app/types/type';
import Link from 'next/link';
import React from 'react'
import { DeleteButton } from '@/app/components/DeleteButton';

async function getDetailBBSData(id: number) {
  const apiBaseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}` // Vercelにデプロイされた場合
    : 'http://localhost:3000';           // ローカル開発環境の場合
  
  const response = await fetch(`${apiBaseUrl}/api/post/${id}`, {
    cache: "no-store",
  });
  // fetch関数を使って指定されたURLに対してHTTPリクエストを送信しています。
  // awaitキーワードは、fetchリクエストが完了してレスポンスが返ってくるまで、この関数の実行を一時停止します。
  // レスポンスが返ってくると、そのResponseオブジェクトがresponse定数に代入されます。
  // cache: "no-store"は、このリクエストの結果をブラウザやその他のキャッシュに保存しないように指示しています。
  // これにより、常にサーバーから最新のデータが取得されることが保証されます。

  const bbsDetailData: BBSData = await response.json();
  // 前の行で取得したresponseオブジェクトは、生のHTTPレスポンスを含んでいます。
  // response.json()メソッドは、そのレスポンスボディをJSON形式として
  // パース（解析）し、JavaScriptのオブジェクトまたは配列に変換する非同期操作です。
  // JSON(JavaScript Object Notation)とは、データを表現するための
  // 軽量なテキストベースのフォーマットです。

  return bbsDetailData;
}

//{ params: { bbsId: number } }について、
//paramsというプロパティを持つオブジェクトであり、
//そのparamsプロパティもまたオブジェクトであり、
//さらにそのparamsオブジェクトはbbsIdというプロパティを持ち、
// そのbbsIdプロパティの値はnumber型である」という意味になります。

const BBSDetailPage = async ({ params }: { params: Promise<{ bbsId: number }> }) => {
  
  const bbsDetailData = await getDetailBBSData((await params).bbsId);
  if (bbsDetailData) {
    const { title, content, username } = bbsDetailData;
    return (
      <div className="mx-auto max-w-4xl p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-gray-700">{username}</p>
        </div>

        <div className="mb-8">
          <p className="text-gray-900">{content}</p>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <Link href={"/"} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md">戻る</Link>
          <DeleteButton bbsId={(await params).bbsId.toString()} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="mx-auto max-w-4xl p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">投稿が見つかりません</h1>
        </div>
        <Link href={"/"} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md">戻る</Link>
      </div>
    );
  }
};

export default BBSDetailPage