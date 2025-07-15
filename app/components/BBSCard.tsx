import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { BBSData } from '../types/type';

interface BBSDataProps {
    bbsData: BBSData;
}
//BBSCardコンポーネントはbbsDataという名前のプロップを1つ受け取り、
//そのbbsDataはBBSData型である必要があることを示しています。

const BBSCard = ({ bbsData }: BBSDataProps) => {
  //{ bbsData }は{}で　分割代入
  //props.bbsDataと書かないでも直接親コンポーネントから渡されたbbsDataを使用できるようにするための構文
  //BBSDataPropsは型定義
  const { id, title, content, createdAt, username } = bbsData;
  return (
    <div>
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{username}</CardDescription>
            </CardHeader>
            <CardContent>
                {content}
            </CardContent>
            <CardFooter className="flex-justify-between">
                <Link href={`/bbs-posts/${id}`} className="text-blue-500">
                    Read More
                </Link>
            </CardFooter>
        </Card>
    </div>
  )
}

export default BBSCard