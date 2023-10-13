'use client'

// import { useContext, useEffect } from 'react'
// import { useSession } from 'next-auth/react'
import Dashboard from './Dashboard'
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
          <div className='pl-7 md:pl-[16%]  w-screen'>Header</div>
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
