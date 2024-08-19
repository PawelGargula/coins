import './App.css';
import Header from './components/header';
import PageContent from './components/page-content';
import MainContainer from './components/main-container';
import { useState } from "react";
import useCoinSearch from './hooks/useCoinSearch';
import Coin from './models/coin';

function App() {
  const [query, setQuery] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);

  const {
      isLoading, 
      isError, 
      coins, 
      hasMore,
      notFound
  } : {
      isLoading: boolean,
      isError: boolean,
      coins: Array<Coin>,
      hasMore: boolean,
      notFound: boolean
  } = useCoinSearch(query, pageNumber);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      setPageNumber(1);
  }

  return (
    <MainContainer>
      <Header />
      <PageContent 
        query={query}
        handleSearch={handleSearch}
        isLoading={isLoading}
        isError={isError}
        coins={coins}
        hasMore={hasMore}
        notFound={notFound}
        setPageNumber={setPageNumber}
      />
    </MainContainer>
  );
}

export default App
