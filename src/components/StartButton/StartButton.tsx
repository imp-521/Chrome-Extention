import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'

type stratButtonProps ={
  onStart : () => void
}



const StartButton = ({onStart} : stratButtonProps) => {
  return (
    <button onClick={onStart} className='absolute bottom-5 text-white right-5 bg-white/20 px-15 py-3 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/30 cursor-pointer flex items-center justify-center font-bold gap-1 border border-white/10 shadow-lg active:scale-95 text-sm'>
      START
      <IoIosArrowForward />
    </button>
  )
}

export default StartButton