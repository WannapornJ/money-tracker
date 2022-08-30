import React, { useState } from 'react'
import Link from 'next/link'
import { CgClose } from 'react-icons/cg'

export default function NavModal({ toggleModal }) {
    const [defaultTab, setDefaultTab] = useState('dashboard')
    const handleTabClick = (tab) => {
        toggleModal
        setDefaultTab(tab)
    }
    return (
        <div className='rounded bg-offWhite text-blue-300 pb-2 w-screen sm:max-w-[220px]'>
            <div
                className='block sm:hidden pt-3 pr-3 flex justify-end cursor-pointer hover:text-red'
                onClick={toggleModal}
            >
                <CgClose />
            </div>
            <ul>
                <li>
                    <p className='text-gray-200 p-3'>page</p>
                    <ul className={defaultTab === 'dashboard' ? 'bg-blue-100 text-offWhite': 'hover:bg-blue-100 hover:text-offWhite'}>
                        <li className='pl-6 py-2 font-extrabold' onClick={() => handleTabClick('dashboard')}>
                            <Link href='/'>Dashboard</Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <p className='text-gray-200 p-3'>setting</p>
                    <ul className={defaultTab === 'cate' ? 'bg-blue-100 text-offWhite': 'hover:bg-blue-100 hover:text-offWhite'}>
                        <li className='pl-6 py-2 font-extrabold' onClick={() => handleTabClick('cate')}>
                            <Link href='/category'>Category</Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}
