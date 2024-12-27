import React from 'react'
import { Outlet } from 'react-router-dom'
import Inicio from '../views/Inicio'
import Login from '../views/Login'

export default function AuthLayout() {
  return (
    <main className='max-w-4xl m-auto mt-10 md:mt-28 flex flex-col md:flex-row items-center'>
      <img
      className='max-w-xs'
      src="/public/img/ets.png" alt="Imagen Logo" />

      <div className='p-10 w-full'>
          <Outlet/>
          
      </div>
    
    </main>
  )
}
