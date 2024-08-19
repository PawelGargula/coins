import SearchIcon from "../assets/search-icon.svg";

export default function Search({ 
    query, 
    handleSearch 
} : {
    query: string,
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
    return (
        <div className="relative w-full">
            <input aria-label='Search' className="bg-[#040407] w-full h-[40px] px-[8px] py-[9px] rounded-[6px] border-[1px] border-[#2B344D] text-[#F7F7F7] font-[Prompt] placeholder-[#7685A0]" onChange={handleSearch} placeholder="Search" type="text" value={query} />
            <img alt="magnifying glass" className="absolute top-[12px] right-[8px]" height={16} src={SearchIcon} width={16} />
        </div>
    )
}