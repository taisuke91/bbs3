"use client";

import { deleteBBSAction } from "@/app/actions/deleteBBSAction"; // 先ほど作成したActionをインポート


export const DeleteButton = ({ bbsId }: { bbsId: string }) => {
  const handleClick = async () => {
    if (window.confirm("この投稿を本当に削除しますか？")) {
      await deleteBBSAction(bbsId);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-red-500 text-white font-bold py-2 px-4 rounded-md"
    >
    削除
    </button>
  );
};