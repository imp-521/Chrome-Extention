import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'

type stratButtonProps ={
  onStart : () => void
}



const StartButton = ({onStart} : stratButtonProps) => {
  return (
    <button onClick={onStart} className='absolute bottom-5 text-white right-5  px-15 py-3 rounded-full backdrop-blur-md cursor-pointer flex items-center justify-center font-bold gap-1 shadow-lg figma-glass-static text-sm'>
      START
      <IoIosArrowForward />
    </button>
  )
}

export default StartButton