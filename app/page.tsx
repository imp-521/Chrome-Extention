import Clock from '@/src/components/Clock/Clock'
import Shortcuts from '@/src/components/Shortcuts/Shortcuts'
import React from 'react'

const page = () => {
  return (
    <main style={{backgroundImage : "url('/default-wallpaper.jpg')"}} className='h-dvh w-full overflow-hidden bg-cover bg-center bg-no-repeat'>
        <Clock />
        <Shortcuts />
    </main>
  )
}

export default page

