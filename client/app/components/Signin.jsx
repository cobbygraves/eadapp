'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button, notification } from 'antd'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import Image from 'next/image'
import axios from 'axios'
import { hostAPI } from '../utils/configure'

function Signin() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [usernameError, setUsernameError] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [type, setType] = useState('password')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [signup, setSignup] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isChecked, setIsChecked] = useState(true)
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [passwordConfirmError, setPasswordConfirmError] = useState(false)
  const [api, contextHolder] = notification.useNotification()

  const openNotificationWithIcon = (type) => {
    api[type]({
      message: 'LOGIN FAILED',
      description: 'Wrong Username or Password'
    })
  }

  const handleToggle = () => {
    if (type === 'password') {
      setPasswordVisible(true)
      setType('text')
    } else {
      setPasswordVisible(false)
      setType('password')
    }
  }

  // const validateEmail = (email) => {
  //   return String(email)
  //     .toLowerCase()
  //     .match(
  //       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //     )
  // }

  const loginHandler = async () => {
    if (signup) {
      if (
        username.trim() === '' &&
        password.trim() === '' &&
        passwordConfirm.trim() === ''
      ) {
        setUsernameError(true)
        setPasswordError(true)
        setPasswordConfirmError(true)
        return
      }

      if (
        username.trim() === '' &&
        password.trim() === passwordConfirm.trim()
      ) {
        return setUsernameError(true)
      }

      if (password.trim() !== passwordConfirm.trim()) {
        return setPasswordConfirmError(true)
      }
      if (
        username.trim() !== '' &&
        password.trim() !== passwordConfirm.trim()
      ) {
        setPasswordError(true)
        setPasswordConfirmError(true)
        return
      }
      setLoading(true)
      //code
      try {
        const response = await axios.post(`${hostAPI}/user/signup`, {
          username,
          password
        })
        console.log(response)
        if (response.status === 200) {
          await signIn('credentials', {
            username,
            password,
            redirect: false
          })
        }
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    } else {
      if (username.trim() === '' && password.trim() === '') {
        setUsernameError(true)
        setPasswordError(true)
        return
      }
      if (username.trim() === '') {
        return setUsernameError(true)
      }

      if (password.trim() === '') {
        return setPasswordError(true)
      }
      setLoading(true)
      try {
        const response = await signIn('credentials', {
          redirect: false,
          username,
          password
        })

        if (response.status !== 200) {
          openNotificationWithIcon('error')
          //show an alert with a success message - green
        }
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
  }

  const usernameHandler = (event) => {
    if (usernameError) {
      setUsernameError(false)
    }

    setUsername(event.target.value)
  }

  const passwordHandler = (event) => {
    if (passwordError) {
      setPasswordError(false)
    }
    setPassword(event.target.value)
  }

  const passwordConfirmHandler = (event) => {
    if (passwordConfirmError) {
      setPasswordConfirmError(false)
    }
    setPasswordConfirm(event.target.value)
  }

  const googleSignIn = async () => {
    const resp = await signIn('google', {
      redirect: false
    })
  }

  const facebookSignIn = async () => {
    const resp = await signIn('facebook', {
      redirect: false
    })
  }

  const twitterSignIn = async () => {
    const resp = await signIn('twitter', {
      redirect: false
    })
    console.log(resp)
  }

  return (
    <>
      {contextHolder}
      <form className=' w-[90%] h-[90%] top-[5%] left-[5%] md:top-0 md:left-0 absolute  md:w-[40%] md:h-full z-[1000] bg-white rounded-2xl md:rounded-l-none p-3 md:p-5 opacity-95'>
        <Image
          height={50}
          width={250}
          src='/e-ADAPP logo 23.png'
          alt='eadappLogo'
          objectFit='cover'
        />
        <div className='md:px-[19%] mt-2'>
          <p className='text-6xl text-[#23A35C] mb-2'>
            {' '}
            {signup ? 'Signup' : 'Login'}
          </p>

          <div className='flex flex-col'>
            <div>
              <div className='flex items-center gap-1'>
                <label className='font-semibold'>Email</label>
                {usernameError ? (
                  <p className='text-red-600 ml-1 text-xs'>
                    required email or username
                  </p>
                ) : null}
              </div>
              <input
                className='w-full h-9 py-1 px-3 outline outline-1 rounded-2xl my-2 bg-gray-100 outline-gray-400 focus:bg-white'
                type='email'
                placeholder='email or username'
                value={username}
                onChange={usernameHandler}
              />
            </div>
            <div>
              <div className='flex items-center gap-1'>
                <label className='font-semibold'>Password</label>
                {passwordError ? (
                  <p className='text-red-600 ml-1 text-xs'>required password</p>
                ) : null}
              </div>
              <div className='flex items-center'>
                <input
                  type={type}
                  className='w-full h-9 py-1 px-3 outline outline-1 rounded-2xl my-2 bg-gray-100 outline-gray-400 focus:bg-white'
                  value={password}
                  onChange={passwordHandler}
                  placeholder='password'
                />
                {password !== '' && !signup ? (
                  <span
                    className='flex justify-around items-center cursor-pointer'
                    onClick={handleToggle}
                  >
                    {passwordVisible ? (
                      <AiOutlineEyeInvisible
                        size={25}
                        className='absolute mr-10'
                      />
                    ) : (
                      <AiOutlineEye className='absolute mr-10' size={25} />
                    )}
                  </span>
                ) : null}
              </div>
            </div>
            {signup ? (
              <div>
                <div className='flex items-center gap-1'>
                  <label className=' font-semibold'>Confirm Password</label>
                  {passwordConfirmError ? (
                    <p className='text-red-600 ml-1 text-xs'>
                      password mismatch
                    </p>
                  ) : null}
                </div>
                <div className='flex items-center'>
                  <input
                    type='password'
                    className='w-full h-9 py-1 px-3 outline outline-1 rounded-2xl my-2 bg-gray-100 outline-gray-400 focus:bg-white'
                    value={passwordConfirm}
                    onChange={passwordConfirmHandler}
                    placeholder='repeat password'
                  />
                  {password !== '' && !signup ? (
                    <span
                      className='flex justify-around items-center cursor-pointer'
                      onClick={handleToggle}
                    >
                      {passwordVisible ? (
                        <AiOutlineEyeInvisible
                          size={25}
                          className='absolute mr-10'
                        />
                      ) : (
                        <AiOutlineEye className='absolute mr-10' size={25} />
                      )}
                    </span>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className='flex justify-between px-5 text-sm'>
                <div className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    id='checkbox'
                    className='accent-green-500 text-white border border-green-500 cursor-pointer'
                    checked={isChecked}
                    onChange={() => setIsChecked((prevValue) => !prevValue)}
                  />
                  <label htmlFor='checkbox'>Remember me</label>
                </div>
                <Link href='#'>
                  <p className=' cursor-pointer underline'>forgot password</p>
                </Link>
              </div>
            )}

            <Button
              style={{
                height: 50,
                width: '100%',
                borderRadius: 25,
                backgroundColor: '#23A35C',
                marginTop: 8,
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold'
              }}
              onClick={loginHandler}
              loading={loading}
            >
              {signup ? 'Signup' : 'Login'}
            </Button>
          </div>
          {signup ? (
            <p className=' text-xs text-gray-400 mt-3 px-5'>
              Have an account{' '}
              <span
                className='text-green-500 pl-2 cursor-pointer'
                onClick={() => setSignup(false)}
              >
                Login
              </span>
            </p>
          ) : (
            <p className=' text-xs text-gray-400 mt-3 px-5'>
              Don't have an account{' '}
              <span
                className='text-green-500 pl-2 cursor-pointer'
                onClick={() => setSignup(true)}
              >
                Signup
              </span>
            </p>
          )}
          {signup ? null : (
            <div className='text-xs flex items-center mt-3 mb-1 gap-2 text-black'>
              <hr className='w-[30%] border-[1.3px] border-black' />
              <p>Or continue with</p>
              <hr className='w-[32%] border-[1.3px] border-black' />
            </div>
          )}
          {signup ? null : (
            <div className='flex items-center gap-3 justify-center'>
              <div className='py-1 px-[25px] border-[1.5px] border-gray-400 rounded-2xl cursor-pointer'>
                <img
                  src='/search.png'
                  className='w-7 h-7 object-contain'
                  onClick={googleSignIn}
                />
              </div>
              <div className='py-1 px-[25px] border-[1.5px] border-gray-400 rounded-2xl cursor-pointer'>
                <img
                  src='/facebook.png'
                  className='w-7 h-7 object-contain'
                  onClick={facebookSignIn}
                />
              </div>
              <div className='py-1 px-[25px] border-[1.5px] border-gray-400 rounded-2xl cursor-pointer'>
                <img
                  src='/twitter.png'
                  className='w-7 h-7 object-contain'
                  onClick={twitterSignIn}
                />
              </div>
            </div>
          )}

          <p className=' text-[8px] mt-5'>
            By clicking the button above you agree to our
            <span className='text-green-500 cursor-pointer'>
              {' '}
              terms of use{' '}
            </span>
            and
            <span className='text-green-500 cursor-pointer'>
              {' '}
              privacy policy{' '}
            </span>
          </p>
        </div>
      </form>
    </>
  )
}

export default Signin
