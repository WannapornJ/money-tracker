import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { CgLogOff, CgMenu } from 'react-icons/cg'
import Logo from './logo';
import { removeToken } from '../utilities/loacalStorageServices';
import Cookies from 'js-cookie'
import { UserStore } from '../utilities/userContext';

export default function Navbar({toggleSetting}) {
    const {user, handleUser} = useContext(UserStore)
    const router = useRouter();
    const [logoutVislible, setLogoutVislible] = useState(false)
    const handleSignout = () => {
        setLogoutVislible(false)
        removeToken()
        Cookies.remove('TOKEN')
        router.replace('/signin');
        handleUser("")
    }
    const toggleModal = () => {
        setLogoutVislible(!logoutVislible)
    }
    
    return (
        <div className='w-full sticky top-[0] bg-blue-100 border border-blue-200 h-[108px] flex justify-center items:center'>
            <div className='flex justify-between items-center py-4 max-w-screen-lg w-10/12'>
                <div className="max-w-[100px] min-w-[100px]"></div>
                <Logo w={128} h={76} />
                <div
                    className="relative text-right hidden sm:block max-w-[100px] w-[100px] truncate text-lg font-semibold cursor-pointer"
                    onClick={toggleModal}
                >
                    <div className='text-sm'>Hello,</div>
                    <div className='h-[28px]'>{user || 'unknown'}</div>
                    {logoutVislible && <div
                        className="fixed bg-offWhite w-min px-3 py-2 text-red text-sm top-[100px] rounded triangle-up flex justify-evenly shadow-lg delay-200"
                        onClick={toggleModal}
                    >
                        <div
                            className='flex items-center justify-evenly gap-x-2'
                            onClick={handleSignout}
                        >
                            <CgLogOff />Logout
                        </div>
                    </div>}
                </div>
                <div
                    className="block max-w-[100px] min-w-[100px] sm:hidden flex justify-end"
                    onClick={toggleSetting}
                >
                    <CgMenu className='w-5 h-5' />
                </div>
            </div>
        </div>
    )
}
