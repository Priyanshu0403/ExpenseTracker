import SettingForm from '@/components/settings-form';
import Title from '@/components/title';
import useStore from '@/store'
import React from 'react'

const Settings = () => {
  const {user} = useStore((state)=>state);
 return (
  <div className="flex flex-col items-center w-full">
    <div className="w-full max-w-4xl px-4 py-4 my-6 shadow-lg bg-gray-50 dark:bg-black/20 md:px-10 md:my-10">
      <div className="mt-6 border-b-2 border-gray-200 dark:border-gray-800">
        <Title title="General Settings" />
      </div>

      <div className="py-10">
        <p className="text-lg font-bold text-black dark:text-white">
          Profile Information
        </p>

        <div className="flex items-center gap-4 my-8">
          <div className="flex items-center justify-center font-bold text-2xl w-12 h-12 text-white rounded-full cursor-pointer bg-violet-500">
            <p >{user?.firstname.charAt(0)}</p>
          </div>
          <p className='text-2xl font-semibold text-black dark:text-gray-400'>
            {user?.firstname}
          </p>
        </div>
        <SettingForm/>
        
      </div>
    </div>
  </div>
);

}

export default Settings
