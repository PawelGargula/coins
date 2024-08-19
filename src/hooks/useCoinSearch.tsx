import { useEffect, useState } from 'react';
import axios, { Canceler } from "axios";
import SearchObject from '../models/search-object';
import Coin from '../models/coin';

const apiKey = "CG-K8zh1ty41yJVzcBkPe7aRiUg";

export default function useCoinSearch(query: string, pageNumber: number) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [coins, setCoins] = useState<Array<Coin>>([]);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [notFound, setNotFound] = useState<boolean>(false);

    useEffect(() => {
        setCoins([]);
    }, [query]);

    useEffect(() => {
        let cancelSearch: Canceler;
        let cancelMarkets: Canceler;

        const fetchCoins = async () => {
            try {
                setIsLoading(true);
                setIsError(false);
                setNotFound(false);
                let ids: Array<string> = [];
                if(query) {
                    const response = await axios({
                            method: 'GET',
                            url: "https://api.coingecko.com/api/v3/search",
                            params: {
                                query: query,
                                x_cg_demo_api_key: apiKey
                            },
                            cancelToken: new axios.CancelToken(c => cancelSearch = c)
                        });
                    const foundObject: SearchObject = response.data;
                    const foundCoins = foundObject.coins;
                    ids = foundCoins.map(foundCoin => foundCoin.id);
                }
                
                let coins: Array<Coin> = [];

                if (query && ids.length === 0) {
                    setNotFound(true);
                } else {
                    coins = (await axios({
                        method: 'GET',
                        url: "https://api.coingecko.com/api/v3/coins/markets",
                        params: {
                            vs_currency: "usd",
                            per_page: 10,
                            page: pageNumber,
                            ids: ids.join(),
                            x_cg_demo_api_key: apiKey
                        },
                        cancelToken: new axios.CancelToken(c => cancelMarkets = c)
                    })).data;                    
                }

                setCoins(prevCoins => [...prevCoins, ...coins]);
                
                setHasMore(coins.length > 0);
            } catch (error) {
                if (axios.isCancel(error)) return;
                
                setIsError(true);
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
  
        fetchCoins();

        return () => {
            if (cancelSearch) {
                cancelSearch();
            }
            if (cancelMarkets) {
                cancelMarkets();      
            }
        };
    }, [query, pageNumber])

    return { isLoading, isError, coins, hasMore, notFound };
}