import { NextResponse } from "next/server";
import prisma from "../../../../lib/prismaClient";

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ bbsId: string }> }
    //bbsIdというプロパティを持つparamsオブジェクトをparamsという名前で受け取ります。
) {
    const bbsId = (await params).bbsId;
    const bbsDetailData = await prisma.post.findUnique({
        where: {
            id: parseInt(bbsId), //bbsIdを整数に変換
        },
    });
    return NextResponse.json(bbsDetailData);
}