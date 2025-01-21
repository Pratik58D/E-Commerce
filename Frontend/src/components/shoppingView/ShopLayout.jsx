import React from 'react'
import { Outlet } from 'react-router-dom'
import ShopHeader from '../../components/shoppingView/ShopHeader';

const ShopLayout = () => {
  return (
    <div className='flex flex-col bg-white overflow-hidden'>
        {/* header commponent */}
        <ShopHeader />
        <main className='flex flex-col w-full '>
            <Outlet />

        </main>
        
        </div>
  )
}

export default ShopLayout;