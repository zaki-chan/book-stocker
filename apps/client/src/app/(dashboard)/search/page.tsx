import Image from "next/image";
import Link from "next/link"
import Header from "../../../components/Header";
import SearchPage from "../../../components/SearchPage";


export default function Search() {
  return (
    <div>
      <Header />
      {/* 検索処理はSearchPageで実装 */}
      <SearchPage
        initialResults={[]}
        currentUserId={0}
      />
    </div>
  );
}
