import React from 'react'
import { IoIosClose } from 'react-icons/io'
import SettingsButton from '../SettingsButton/SettingsButton'
import DashboardGrid from '../DashboardGrid/DashboardGrid'

type dashboardProps = {
  onClose: () => void;
  onSettingsClick: () => void;
};

const Dashboard = ({ onClose, onSettingsClick }: dashboardProps) => {
  return (
    <div className='w-full h-full relative'>
     <SettingsButton onClick={onSettingsClick} />
      <button onClick={onClose} className='w-12 h-12 figma-glass-static flex items-center justify-center rounded-full bg-white/20 text-white absolute right-20 top-5 cursor-pointer'><IoIosClose size={30} /></button>
      <DashboardGrid/>
    </div>
  )
}

export default Dashboard