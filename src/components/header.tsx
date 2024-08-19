import ArrowLeftIcon from "../assets/arrow-left.svg"

export default function Header() {
    return (
        <header className="bg=[#0F0F1A] border-b-[1px] border-[#2B344D] flex flex-row gap=[16px] h-[56px] items-center justify-between py-[12px] px-[16px] w-full">
            <button aria-label="Go back" className="bg-[#2b344d80] flex justify-center items-center w-[32px] h-[32px] px-[8px] py-[4px] rounded-[16px] hover:bg-[#202741]" type="button">
                <img  alt="Arrow left" height={16} src={ArrowLeftIcon} width={16} />
            </button>
            <h1 className="font-bold text-[16px] leading-[22px] tracking-[0.02em] text-[#F7F7F7] font-[Prompt]">Select a token</h1>
            <span className="w-[32px]"></span>
        </header>
    )
}