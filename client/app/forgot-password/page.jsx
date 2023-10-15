'use client'
import { useState } from 'react'
import axios from 'axios'
import { Button, notification } from 'antd'
import { hostAPI } from '../utils/configure'
import { useRouter } from 'next/navigation'

const ForgotPassword = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [api, contextHolder] = notification.useNotification()

  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message: message,
      description: description
    })
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const submitEmail = async (e) => {
    if (!validateEmail(email) || email.trim() === '') {
      return setEmailError(true)
    }
    setLoading(true)
    try {
      const response = await axios.post(`${hostAPI}/user/forgot-password`, {
        email
      })
      console.log(response)
      if (response.status === 200) {
        setEmail('')
        setLoading(false)
        openNotificationWithIcon(
          'success',
          'SUCCESSFUL',
          'A link has been sent to your mail, please click to reset your password'
        )
        setTimeout(() => {
          router.push('/')
        }, 3500)
      }
    } catch (error) {
      setLoading(false)
      openNotificationWithIcon(
        'error',
        'ERROR',
        'Something went wrong, please try again'
      )
    }
  }
  return (
    <>
      {contextHolder}

      <div className='flex justify-center items-center h-screen'>
        <div className='md:w-1/3 rounded-lg shadow-xl p-5 h-[200px] bg-[#1E9E5B]'>
          <p className='text-center font-semibold text-2xl mb-10 text-white'>
            Forgot Password ?
          </p>
          <div>
            <div className='flex gap-2 items-center'>
              <input
                className='w-full h-9 py-1 px-3 outline outline-1 rounded-2xl my-2 bg-gray-100 outline-gray-400 focus:bg-white'
                type='email'
                placeholder='Enter registered email address'
                value={email}
                onChange={handleEmail}
              />
              <Button
                type='submit'
                className='rounded-lg py-1 px-3 bg-[#1E9E5B] text-white font-bold outline outline-1 outline-white hover:bg-white hover:text-black'
                loading={loading}
                onClick={submitEmail}
              >
                Send
              </Button>
            </div>
          </div>
          {emailError ? (
            <p className='text-red-600 ml-1 text-xs'>
              please provide a valid email address
            </p>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
