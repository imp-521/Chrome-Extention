import React from 'react'
import { IoMdSettings } from 'react-icons/io'

type SettingsButtonProps = {
  onClick: () => void;
};

const SettingsButton = ({ onClick }: SettingsButtonProps) => {
  return (
    <button onClick={onClick} className='w-12 h-12 flex items-center justify-center rounded-full figma-glass-static text-white  absolute right-5 top-5 cursor-pointer'><IoMdSettings size={24} /></button>
  )
}

export default SettingsButton