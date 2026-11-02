import React from 'react'
import { IoMdSettings } from 'react-icons/io'

const SettingsButton = () => {
  return (
    <button className='w-12 h-12 flex items-center justify-center rounded-full figma-glass-static text-white  absolute right-5 top-5 cursor-pointer'><IoMdSettings size={24} /></button>
  )
}

export default SettingsButton