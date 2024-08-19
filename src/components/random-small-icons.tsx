import BitcoinIcon from "../assets/bitcoin.webp";
import BnbIcon from "../assets/bnb.png";
import CardanoIcon from "../assets/cardano.png";
import DogcoinIcon from "../assets/dogecoin.png";
import EthereumIcon from "../assets/ethereum.png";
import SolanaIcon from "../assets/solana.png";
import StethIcon from "../assets/steth.png";
import TonIcon from "../assets/ton.png";
import UsdcIcon from "../assets/usdc.png";
import XrpIcon from "../assets/xrp.png";

export default function RandomSmallIcons() {
    const smallIcons: Array<string> = getThreeRandomSmallIcons();

    return (
        <div className="absolute flex right-0 bottom-0">
            {smallIcons.map((smallIcon, index) => {
                return <img alt="" className="rounded-full bg-[#fff] mr-[-6px]" height={12} key={index} loading="lazy" src={smallIcon} width={12} />
            })}
            <div className="bg-[#3E4864] h-[12px] w-[12px] rounded-full font-bold font-[Prompt] text-[6px] text-[#F7F7F7] leading-[6px] flex items-center justify-center">
                <span>{Math.floor(Math.random() * 9) + 1}+</span>
            </div>
        </div>
    )
}

function getThreeRandomSmallIcons() {
    const smallIcons = [
        BitcoinIcon,
        BnbIcon,
        CardanoIcon,
        DogcoinIcon,
        EthereumIcon,
        SolanaIcon,
        StethIcon,
        TonIcon,
        UsdcIcon,
        XrpIcon,
    ];

    for (let i = smallIcons.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [smallIcons[i], smallIcons[j]] = [smallIcons[j], smallIcons[i]];
    }

    return smallIcons.slice(0, 3);
}