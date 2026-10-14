import React from 'react'
import { IoIosClose } from 'react-icons/io'
import SettingsButton from '../SettingsButton/SettingsButton'

type dashboardProps = {
  onClose : () => void
}

const Dashboard = ({onClose} : dashboardProps) => {
  return (
    <div className='w-full h-full relative'>
      <SettingsButton />
      <button onClick={onClose} className='w-12 h-12 flex items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:scale-110 hover:bg-white/30 absolute right-20 top-5'><IoIosClose size={30} /></button>
    </div>
  )
}

export default Dashboard