'use client'
import { useState } from 'react'
import axios from 'axios'
import { Button, notification } from 'antd'
import { hostAPI } from '../utils/configure'
import { useRouter } from 'next/navigation'

const ResetPassword = ({ params }) => {
  //   console.log(params)
  const router = useRouter()
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [newPasswordError, setNewPasswordError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [api, contextHolder] = notification.useNotification()

  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message: message,
      description: description
    })
  }

  const submitNewPassword = async (e) => {
    if (newPassword !== confirmNewPassword) {
      return setNewPasswordError(true)
    }
    setLoading(true)
    try {
      const response = await axios.post(`${hostAPI}/user/reset-password`, {
        accessToken: params.resetPassword[1],
        newPassword
      })
      console.log(response)
      if (response.status === 200) {
        setNewPassword('')
        setConfirmNewPassword('')
        setLoading(false)
        openNotificationWithIcon(
          'success',
          'SUCCESSFUL',
          'Password successfully resetted'
        )
        setTimeout(() => {
          router.push('/')
        }, 2000)
      }
    } catch (error) {
      console.log(error)
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
        <div className='w-[90%] md:w-1/3 rounded-lg shadow-xl p-5 bg-[#1E9E5B]'>
          <p className='text-center font-semibold text-2xl mb-10 text-white'>
            Reset Password ?
          </p>
          <div>
            <label className='italic text-white'>New Password</label>

            <input
              className='w-full h-9 py-1 px-3 outline outline-1 rounded-2xl my-2 bg-gray-100 outline-gray-400 focus:bg-white'
              type='text'
              placeholder='enter your new password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className='mt-5'>
            <label className='italic text-white'>Confirm Password</label>

            <input
              className='w-full h-9 py-1 px-3 outline outline-1 rounded-2xl my-2 bg-gray-100 outline-gray-400 focus:bg-white'
              type='text'
              placeholder='enter your new password'
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </div>
          <Button
            className='rounded-xl py-1 px-3 bg-green-900 text-white font-bold  w-full outline-none'
            loading={loading}
            onClick={submitNewPassword}
          >
            Submit
          </Button>
          {newPasswordError ? (
            <p className='text-red-600 ml-1 text-xs'>passwords mismatch</p>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default ResetPassword
