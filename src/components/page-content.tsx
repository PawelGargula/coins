import Coin from '../models/coin';
import Search from "./search";
import List from "./list";

export default function PageContent({
    query,
    handleSearch,
    isLoading, 
    isError, 
    coins, 
    hasMore,
    notFound,
    setPageNumber,
} : {
    query: string,
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
    isLoading: boolean,
    isError: boolean,
    coins: Array<Coin>,
    hasMore: boolean,
    notFound: boolean,
    setPageNumber: React.Dispatch<React.SetStateAction<number>>
}) {
    return (
        <div className="flex flex-col items-center gap-4 w-full h-[488px] overflow-y-scroll p-4">
            <Search query={query} handleSearch={handleSearch} />
            <List 
                isLoading={isLoading}
                isError={isError}
                coins={coins}
                hasMore={hasMore}
                notFound={notFound}
                setPageNumber={setPageNumber}
            />
        </div>
    );
}