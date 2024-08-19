
import { ReactNode } from 'react'

export default function MainContainer({ children } : { children: ReactNode }) {
    return (
        <main className='bg-[#1e1e1e] flex items-center justify-center min-h-dvh'>
            <div className='bg-[#0F0F1A] border-[1px] border-[#2B344D] flex flex-col h-[544px] items-start rounded-[16px] shadow-[0px_4px_16px_2px_rgba(0,0,0,0.25)] w-[360px]'>
                {children}
            </div>
        </main>
    )
}