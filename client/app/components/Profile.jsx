'use client'

import { useState } from 'react'
// import { useContext, useEffect } from 'react'
// import { useSession } from 'next-auth/react'
import Dashboard from './Dashboard'
// import Farmers from './Farmers'
// import { useRouter } from 'next/navigation'
// import { ThemeContext } from '../components/Providers'
import { Layout, Grid } from 'antd'
const { useBreakpoint } = Grid
const { Header, Content, Sider } = Layout

const sideNav = [
  'Dashboard',
  'Farmers',
  'Staff',
  'Synchronization',
  'Settings',
  'Report'
]

const Profile = () => {
  const [activeNav, setActiveNav] = useState(0)
  // const router = useRouter()
  // const { data: session } = useSession()

  const screens = useBreakpoint()
  // const theme = useContext(ThemeContext)
  // useEffect(() => {
  //   if (session === undefined || null) {
  //     router.replace('/')
  //   }
  // }, [])

  const handleActiveNav = (index) => {
    setActiveNav(index)
  }

  return (
    <Layout>
      <Sider
        breakpoint='lg'
        collapsedWidth='0'
        style={{
          position: 'fixed',
          top: 0,
          height: '100vh',
          background: 'white',
          zIndex: 200
        }}
      >
        <div className='h-screen pl-[10%]'>
          <img
            src='/e-ADAPP logo 23.png'
            alt='logo'
            className='w-[90%] h-15 object-contain'
          />
          <p className='my-10 text-lg text-green-500'>MAIN NAVIGATION</p>
          <div className='flex flex-col px-2 gap-2'>
            {sideNav.map((navItem, index) => (
              <p
                key={navItem}
                className={`font-semibold hover:cursor-pointer hover:text-green-400 ${
                  activeNav === index ? 'text-green-400' : ''
                }`}
                onClick={() => handleActiveNav(index)}
              >
                {navItem}
              </p>
            ))}
          </div>
        </div>
      </Sider>
      <Layout>
        <Header
          style={{
            width: '100%',
            zIndex: 100,
            background: 'white',
            position: 'fixed',
            boxShadow: '0 15px 10px -6px rgb(0 0 0 / 0.25)'
          }}
        >
          <div className='pl-2 pr-2 md:pl-[16%] md:pr-[10%] h-full  w-screen flex items-center justify-between'>
            <img
              src='/3sdclTHE 2.png'
              alt='3sdcl'
              className='h-[65px] w-[65px] rounded-[50%] object-contain'
            />
            <div className='flex items-center gap-10'>
              <div className='flex items-center gap-3'>
                <div className='p-[6px] bg-gray-200 rounded-[50%] hidden md:block'>
                  <img
                    src='/search (2).png'
                    alt='3sdcl'
                    className=' h-[25px] w-[25px] rounded-[50%] object-cover object-left transform rotate-90'
                  />
                </div>
                <div className='p-1 bg-black rounded hidden md:block'>
                  <img
                    src='/lamp (2).png'
                    alt='3sdcl'
                    className=' h-[30px] w-[30px] rounded-[50%] object-contain'
                  />
                </div>
                <div className='p-[4px] bg-[#f7f6f6] rounded hidden md:block'>
                  <img
                    src='/language.png'
                    alt='3sdcl'
                    className=' h-[25px] w-[25px] rounded-[50%] object-contain'
                  />
                </div>
              </div>
              <div className='flex items-center gap-5'>
                <img
                  src='/graves.jpg'
                  alt='3sdcl'
                  className='h-[50px] w-[50px] rounded-[50%] object-cover'
                />
                <div className=' leading-none'>
                  <p>Kwame Anim</p>
                  <p className='text-gray-400 text-sm'>Farmer</p>
                </div>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            position: 'relative',
            top: 80,
            margin: `20px 20px 120px ${screens.xs ? '5%' : '18%'}`
          }}
        >
          <div className='shadow-2xl rounded-lg py-5 px-10 mb-3 flex items-center gap-5'>
            <div className='p-2 md:p-3 shadow-md rounded-md shadow-gray-600'>
              <img
                src='/agenda.png'
                className='w-[150px] md:w-[40px] h-[50px] object-contain'
              />
            </div>
            <div className=' leading-2 font-semibold'>
              <p className='text-lg'>Farmer's Panel</p>

              <p className=' text-gray-500 text-sm font-light'>
                {' '}
                Laborum Lorem sint laborum amet amet. Velit quis qui incididunt
                cillum proident. Nisi qui anim consectetur et.{' '}
              </p>
            </div>
          </div>

          <Dashboard />
        </Content>
      </Layout>
    </Layout>
  )
}
export default Profile
