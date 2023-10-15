'use client'

// import { useContext, useEffect } from 'react'
// import { useSession } from 'next-auth/react'
import Dashboard from './Dashboard'
// import Farmers from './Farmers'
// import { useRouter } from 'next/navigation'
// import { ThemeContext } from '../components/Providers'
import { Layout, Grid } from 'antd'
const { useBreakpoint } = Grid
const { Header, Content, Sider } = Layout
const Profile = () => {
  // const router = useRouter()
  // const { data: session } = useSession()

  const screens = useBreakpoint()
  // const theme = useContext(ThemeContext)
  // useEffect(() => {
  //   if (session === undefined || null) {
  //     router.replace('/')
  //   }
  // }, [])

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
        <div className=' p-5 h-screen'>Sidebar</div>
      </Sider>
      <Layout>
        <Header
          style={{
            width: '100%',
            zIndex: 100,
            background: 'white',
            position: 'fixed',
            boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)'
          }}
        >
          <div className='pl-7 pr-2 md:pl-[16%] md:pr-[10%] h-full  w-screen flex items-center justify-between'>
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
          <p className='shadow-2xl rounded-lg p-5 mb-3 '>
            Laborum Lorem sint laborum amet amet. Velit quis qui incididunt
            cillum proident. Nisi qui anim consectetur et. Consectetur excepteur
            ullamco elit cillum cillum irure dolore minim exercitation.
          </p>

          <Dashboard />
        </Content>
      </Layout>
    </Layout>
  )
}
export default Profile
