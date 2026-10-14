import { aiButtons } from '@/data'
import React from 'react'

const Shortcuts = () => {
  return (
    <div className='absolute right-5 top-1/2 -translate-y-1/2 flex gap-4 flex-col'>
       {aiButtons.map((item)=>{
        const Icon = item.icon
         return(
            <div key={item.name}>
                
                <a href={item.url} target='_blank' rel="noopener noreferrer" className='w-12 h-12 flex items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:scale-110 hover:bg-white/30'><Icon size={24}/></a>
            </div>
         )
       })}
    </div>
  )
}

export default Shortcuts