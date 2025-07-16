import BBSCardList from "./components/BBSCardList"; //BBSCardListコンポーネントのインポート
import { BBSData } from "./types/type";  //BBSData型のインポート(型定義ファイルから)
import prisma from "../lib/prismaClient";

async function getBBSAllData() {
  const bbsAllData = await prisma.post.findMany();
  return bbsAllData;
}

export default async function Home() {
  const bbsAllData = await getBBSAllData();
  return (
    <main>
      <BBSCardList bbsAllData={bbsAllData}/>
      {/* bbsAllDataは引数 */}
    </main>
  );
}
