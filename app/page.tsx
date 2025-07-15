import BBSCardList from "./components/BBSCardList"; //BBSCardListコンポーネントのインポート
import { BBSData } from "./types/type";  //BBSData型のインポート(型定義ファイルから)
const API_BASE_URL: string = process.env.NEXT_PUBLIC_API_BASE_URL || ''; //環境変数からAPIのベースURLを取得

async function getBBSAllData() {
  const apiBaseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}` // Vercelにデプロイされた場合
    : 'http://localhost:3000';           // ローカル開発環境の場合

  const response = await fetch(`${apiBaseUrl}/api/post`, {
    cache: "no-store",
  });
  {/*
    ここでは、fetch関数を使って指定されたURL (http://localhost:3000/api/post) に対してHTTPリクエストを送信しています。
    awaitキーワードは、fetchリクエストが完了してレスポンスが返ってくるまで、この関数の実行を一時停止します。
    レスポンスが返ってくると、そのResponseオブジェクトがresponse定数に代入されます。
    cache: "no-store"は、このリクエストの結果をブラウザやその他のキャッシュに保存しないように指示しています。これにより、常にサーバーから最新のデータが取得されることが保証されます。
  */}
  //console.log("response:", response);

  const bbsAllData: BBSData[] = await response.json();
  {/*
    前の行で取得したresponseオブジェクトは、生のHTTPレスポンスを含んでいます。
    response.json()メソッドは、そのレスポンスボディをJSON形式としてパース（解析）し、
    JavaScriptのオブジェクトまたは配列に変換する非同期操作です。
    JSON(JavaScript Object Notation)とは、データを表現するための軽量なテキストベースのフォーマット
    ここでもawaitキーワードが使用されており、JSONのパースが完了するまで処理を一時停止し、
    変換されたデータがbbsAllData定数に代入されます。
    BBSData[]は定義した型の名前で、これはBBSData型のオブジェクトの配列であることを示しています。
  */}

  console.log("bbsAllData:", bbsAllData);
  
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
