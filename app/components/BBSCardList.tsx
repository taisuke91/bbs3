import React from 'react'
import BBSCard from './BBSCard';
import { BBSData } from '../types/type';

interface BBSAllDataProps {
  bbsAllData: BBSData[];
}
//BBSData型の配列を受け取るBBSCardListコンポーネントのプロパティ型定義

const BBSCardList = ({ bbsAllData }: BBSAllDataProps) => {
  return (
    <div  className="grid lg:grid-cols-3 px-4 py-4 gap-4">
      {bbsAllData.map((bbsData: BBSData) => (
        <BBSCard key={bbsData.id} bbsData={bbsData} />
      ))}
      {/*
        mapメソッドは配列の各要素に対して指定された関数を実行し、
        その結果から新しい配列を作成します。
        key={bbsData.id}: これはReactのリストレンダリングにおいて非常に重要な**keyプロップ**です。
        Reactがリスト内のアイテムを効率的に識別し、再レンダリングの際にどのアイテムが追加、変更、削除されたかを追跡するために必要です。
      */}
    </div>
  )
}

export default BBSCardList