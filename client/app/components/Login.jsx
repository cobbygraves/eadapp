import Image from 'next/image'
import Signin from './Signin'

function Login() {
  return (
    <div>
      <Image
        fill={true}
        src='/loginBg.jpeg'
        alt='loginBackground'
        objectFit='cover'
      />
      <Signin />
    </div>
  )
}

export default Login
