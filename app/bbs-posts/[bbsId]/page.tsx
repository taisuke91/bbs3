import { BBSData } from '@/app/types/type';
import prisma from "../../../lib/prismaClient";
import Link from 'next/link';
import React from 'react'
import { DeleteButton } from '@/app/components/DeleteButton';

async function getDetailBBSData(id: string) {
  const bbsDetailData = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return bbsDetailData;
}


//{ params: { bbsId: number } }について、
//paramsというプロパティを持つオブジェクトであり、
//そのparamsプロパティもまたオブジェクトであり、
//さらにそのparamsオブジェクトはbbsIdというプロパティを持ち、
// そのbbsIdプロパティの値はnumber型である」という意味になります。

const BBSDetailPage = async ({ params }: { params: Promise<{ bbsId: string }> }) => {
  
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
        <Link href={"/"} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md">戻る</Link>
        <DeleteButton bbsId={(await params).bbsId} /> {/* ボタンを配置し、投稿IDを渡す */}
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