'use client'
import { useSession } from 'next-auth/react'
import Profile from './components/Profile'
import Login from './components/Login'

export default function Home() {
  const { data: session } = useSession()
  return (
    <div className='relative w-screen h-screen '>
      {session ? <Profile /> : <Login />}
    </div>
  )
}
