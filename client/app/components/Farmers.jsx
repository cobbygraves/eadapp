'use client'
import React, { useState, useContext, useEffect } from 'react'
import { ThemeContext } from './Providers'
import { CiImageOn } from 'react-icons/ci'
import { Radio, Input, Select, DatePicker } from 'antd'
const { TextArea } = Input

const breadcrumbItems = [
  'Item one',
  'Item two',
  'Item three',
  'Item four',
  'Item five'
]

const married = [
  {
    value: 'single',
    label: 'Single'
  },
  {
    value: 'married',
    label: 'Married'
  },
  {
    value: 'complicated',
    label: 'Complicated'
  }
]

const regions = [
  {
    value: 'central',
    label: 'Central'
  },
  {
    value: 'western',
    label: 'Western'
  },
  {
    value: 'accra',
    label: 'Greater Accra'
  },
  {
    value: 'volta',
    label: 'Volta'
  },
  {
    value: 'ashanti',
    label: 'Ashanti'
  },
  {
    value: 'bono',
    label: 'Bono'
  },
  {
    value: 'bono east',
    label: 'Bono East'
  },
  {
    value: 'ahafo',
    label: 'Ahafo'
  },
  {
    value: 'western north',
    label: 'Western North'
  },
  {
    value: 'savanah',
    label: 'Savanah'
  },
  {
    value: 'upper west',
    label: 'Upper West'
  },
  {
    value: 'upper east',
    label: 'Upper East'
  },
  {
    value: 'north east',
    label: 'North East'
  },
  {
    value: 'oti',
    label: 'Oti'
  },
  {
    value: 'eastern',
    label: 'Eastern'
  },
  {
    value: 'northen',
    label: 'Northen'
  }
]

const Farmers = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  const [itemIndex, setItemIndex] = useState(0)
  const [imgURL, setImageURL] = useState('')
  const [imgFile, setImageFile] = useState(null)
  const [date, setDate] = useState(null)
  const ctx = useContext(ThemeContext)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  const itemSwitcher = (itemPosition) => {
    setItemIndex(itemPosition)
  }

  const handleImage = (e) => {
    setImageFile(e.target.files[0])
    setImageURL(URL.createObjectURL(e.target.files[0]))
  }

  const handleRegion = (value) => {
    console.log(`selected ${value}`)
  }

  const dateHandler = (dateValue) => {
    setDate(dateValue)
  }

  const handleMarried = (value) => {
    console.log(`selected ${value}`)
  }

  return (
    <div className='shadow-2xl rounded-lg p-5  bg-white dark:bg-black text-black dark:text-white'>
      <p className='text-[17px] font-bold mb-5'>Personal details</p>
      <div className='flex items-center gap-x-5'>
        {breadcrumbItems.map((item, index) => (
          <p
            key={index}
            onClick={() => itemSwitcher(index)}
            className={`text-sm pb-3 relative z-10 top-[1px] cursor-pointer ${
              index === itemIndex && 'border-b-2 border-[#00B96B]'
            }`}
          >
            {item}
          </p>
        ))}
      </div>
      <hr className='relative border border-gray-300 w-full mb-2' />
      <div className='grid grid-cols-4 gap-4 my-5'>
        <div>
          <div className='flex justify-center'>
            {imgFile ? (
              <div className='w-[100px] h-[100px] rounded-[50%] border-[2px] border-[#00B96B] flex justify-center items-center'>
                <img
                  src={imgURL}
                  className='h-[93px] w-[93px] object-cover rounded-[50%]'
                />
              </div>
            ) : (
              <div className='w-[100px] h-[100px] rounded-[50%] border-[2px] border-[#00B96B] flex justify-center items-center'>
                <CiImageOn size={50} color='#ccc' />
              </div>
            )}
          </div>
          <div className='flex justify-center items-center gap-x-7'>
            <div className='flex flex-col items-center'>
              <img
                src={
                  ctx.theme === 'light'
                    ? '/dslr-camera.png'
                    : '/dslr-camera-white.png'
                }
                className='h-[27px] w-[27px] object-contain cursor-pointer border border-black dark:border-white  rounded-[50%] p-1'
              />

              <p className=' text-xs text-gray-500'>Take a photo</p>
            </div>
            <div className='flex flex-col items-center'>
              <label>
                <input
                  type='file'
                  hidden
                  accept='image/png, image/gif, image/jpeg'
                  onChange={handleImage}
                />
                <img
                  src={
                    ctx.theme === 'light'
                      ? '/cloud-computing.png'
                      : '/cloud-computing-white.png'
                  }
                  className='h-[25px] w-[25px] object-contain cursor-pointer'
                />
              </label>
              <p className=' text-xs'>Upload photo</p>
            </div>
          </div>
          <div className='pl-8 mt-5'>
            <p className='text-sm mb-2'>Gender</p>
            <Radio.Group name='radiogroup' defaultValue={1}>
              <Radio value={1}>
                <p>Male</p>
              </Radio>
              <Radio value={2}>
                <p className='text-gray-500'>Female</p>
              </Radio>
            </Radio.Group>
          </div>
        </div>
        <div>
          <div className='mb-4'>
            <p className='mb-2'>First Name</p>
            <Input placeholder='first name' />
          </div>
          <div className='mb-4'>
            <p className='mb-2'>Birth Place</p>
            <Input placeholder='town of birth' />
          </div>
          <div className='mb-4'>
            <p className='mb-2'>House Number</p>
            <Input placeholder='GPS address' />
          </div>
          <div className='mb-4'>
            <p className='mb-2'>Occupation</p>
            <Input placeholder='job title' />
          </div>
          <div className='mb-4'>
            <p className='mb-2'>Region</p>
            <Select
              defaultValue='Greater Accra'
              style={{
                width: '100%'
              }}
              onChange={handleRegion}
              options={regions}
            />
          </div>
        </div>
        <div>
          <div className='mb-4'>
            <p className='mb-2'>Last Name</p>
            <Input placeholder='last name' />
          </div>
          <div className='mb-4'>
            <p className='mb-2'>Date of Birth</p>
            <DatePicker
              onChange={dateHandler}
              style={{
                width: '100%',
                cursor: 'pointer'
              }}
            />
          </div>
          <div className='mb-4'>
            <p className='mb-2'>Community</p>
            <Input placeholder='community' />
          </div>
          <div className='mb-4'>
            <p className='mb-2'>District</p>
            <Input placeholder='district' />
          </div>
          <div className='mb-4'>
            <p className='mb-2'>Marital Status</p>
            <Select
              defaultValue='Single'
              style={{
                width: '100%'
              }}
              onChange={handleMarried}
              options={married}
            />
          </div>
        </div>
        <div className='relative'>
          <div className='mb-4'>
            <p className='mb-2'>Bio</p>
            <TextArea rows={4} />
          </div>
          <div className='flex gap-24 items-center absolute bottom-4  bg-white dark:bg-black text-white dark:text-white'>
            <button className='py-1 px-5 bg-[#00B96B] rounded-lg'>Reset</button>
            <button className='py-1 px-5 border border-[#00B96B] rounded-lg text-black'>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Farmers
