import Loader from "./loader";
import Error from './error';
import RandomSmallIcons from "./random-small-icons";
import clsx from 'clsx';
import { useRef, useCallback } from "react";
import Coin from '../models/coin';
import NotFound from "./not-found";

export default function List({
    isLoading, 
    isError, 
    coins, 
    hasMore,
    notFound,
    setPageNumber,
} : {
    isLoading: boolean,
    isError: boolean,
    coins: Array<Coin>,
    hasMore: boolean,
    notFound: boolean,
    setPageNumber: React.Dispatch<React.SetStateAction<number>>
}) {
    const observer = useRef<IntersectionObserver>();
    const lastCoinElementRef: React.RefCallback<HTMLElement> = useCallback((node: HTMLElement) => {
        if (isLoading) {
            return;
        }
        
        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
            setPageNumber(prevPageNumber => prevPageNumber + 1);
        }
        });

        if (node) {
            observer.current.observe(node);
        }
    }, [isLoading, hasMore, setPageNumber]);

    return (
        <>
            <div className="flex flex-col gap-1 w-full">{coins.map((coin, index) => {
                return (
                <button className="bg-[#171C2F] flex flex-row justify-between items-center gap-[16px] h-[64px] px-[12px] py-[8px] rounded-[12px] hover:bg-[#202741]" key={coin.id} ref={coins.length === index + 1 ? lastCoinElementRef : undefined} type="button">
                    <div className="flex flex-row justify-center items-center gap-2">
                        <div className="relative">
                            <img alt={`${coin.name} icon`} height={48} loading="lazy" src={coin.image} width={48} />
                            <RandomSmallIcons />
                        </div>
                        <div className="flex flex-col items-start gap-[3px]">
                            <span className="text-left font-bold text-[16px] leading-[22px] tracking-[0.02em] text-[#F7F7F7] font-[Prompt] truncate w-[117px]" title={coin.name}>{coin.name}</span>
                            <span className="bg-[#3E4864] rounded-[4px] px-[5px] py-[2px] text-[10px] leading-[13px] text-[#F7F7F7] font-[Prompt]">{coin.symbol.toUpperCase()}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="font-bold text-[16px] leading-[22px] tracking-[0.02em] text-[#F7F7F7] font-[Prompt]">
                            {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            }).format(coin.current_price)}
                        </span>
                        <span className={clsx("rounded-[4px] px-[8px] py-[2px] text-[12px] leading-[16px] font-[Prompt]",
                            {
                                "bg-[rgba(210,88,88,0.25)] text-[#F08282]": coin.price_change_percentage_24h && Number(coin.price_change_percentage_24h.toFixed(2)) < 0,
                                "bg-[rgba(237,237,237,0.45)] text-gray": !coin.price_change_percentage_24h || Number(coin.price_change_percentage_24h.toFixed(2)) === 0,
                                "bg-[rgba(90,184,139,0.25)] text-[#70D1A3]": coin.price_change_percentage_24h && Number(coin.price_change_percentage_24h.toFixed(2)) > 0
                            }
                        )}>
                            {`${coin.price_change_percentage_24h && Number(coin.price_change_percentage_24h.toFixed(2)) > 0 ? "+" : ""}${coin.price_change_percentage_24h ? coin.price_change_percentage_24h.toFixed(2) : "0.00"}%`}
                        </span>
                    </div>
                </button>
                )  
            })}</div>
            {isLoading && <Loader />}
            {notFound && <NotFound />}
            {isError && <Error />}
        </>
    )
}