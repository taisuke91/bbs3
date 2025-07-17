import BBSCardList from "./components/BBSCardList"; //BBSCardListコンポーネントのインポート
import { BBSData } from "./types/type";  //BBSData型のインポート(型定義ファイルから)


async function getBBSAllData() {
  const apiBaseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}` // Vercelにデプロイされた場合
    : 'http://localhost:3000';           // ローカル開発環境の場合

  const response = await fetch(`${apiBaseUrl}/api/post`, {
    cache: "no-store",
  });
  const bbsAllData: BBSData[] = await response.json();
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
