import Link from "next/link"

const Logo = () => {
    return (
        <Link clasName='hover:cursor-pointer' href='/'>
            <div className='font-Sansita text-[32px] text-center leading-[38.4px] text-yellow-200'>
                <p className='p-0 font-bold'>Money</p>
                <p className='p-0 font-black'>Tracker</p>
            </div>
        </Link>
    )
}

export default Logo
