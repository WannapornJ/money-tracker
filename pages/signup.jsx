import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import StyledInput from './components/input';
import Logo from './components/logo';
import axios from './config/axios'

export default function Signup() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const inputRef = useRef();
  const [signUpData, setSignUpData] = useState({ email: '', username: '', password: '', rePassword: '' })
  const handleSignIn = async (e) => {
    e.preventDefault();
    const {username, email, password, rePassword} = signUpData
    if (!username || !email || !password || !rePassword) {
      alert('username, email, passord and re-password fields are required')
      return
    }
    if (password !== rePassword) {
      alert('Password doesn\'t match re-passeord')
      return
    }
    try {
      const response = await axios.post('/user/register', {
        username: username,
        email: email,
        password: password
      })
      alert(response.data.message)
      router.push('/signin');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  }
  const collectUserData = (e, key) => {
    setSignUpData({ ...signUpData, [key]: e.target.value });
  }
  useEffect(() => {
    inputRef.current.focus();
  }, [])
  return (
    <div className='flex justify-center items-center w-full h-screen sm:h-[90vh]'>
      <Head>
        <title>Sign up</title>
      </Head>
      <div className="h-screen w-screen sm:h-5/6 sm:w-4/12 sm:min-w-[480px] sm:max-h-[580px] bg-offWhite text-blue-300 p-12 sm:p-10 sm:pt-4 flex flex-col items-center justify-evenly sm:justify-between rounded gap-y-2">
        <Logo />
        <h1 className='text-2xl font-semibold'>Sign up</h1>
        <form
          className='w-full flex flex-col items-center box-border py-4 gap-y-3 border-b'
          onSubmit={handleSignIn}
        >
          <StyledInput
            refs={inputRef}
            type={'email'}
            title={'E-mail'}
            change={(e) => collectUserData(e, 'email')}
            reqiure={true}
          />
          <StyledInput
            type={'text'}
            title={'Username'}
            change={(e) => collectUserData(e, 'username')}
            reqiure={true}
          />
          <StyledInput
            type={'password'}
            title={'Password'}
            change={(e) => collectUserData(e, 'password')}
            reqiure={true}
          />
          <StyledInput
            type={'password'}
            title={'Re-password'}
            change={(e) => collectUserData(e, 'rePassword')}
            reqiure={true}
          />
          <button
            className='w-full text-white p-2 bg-yellow-200 hover:bg-yellow-100 rounded text-blue-300 border-2 border-blue-300 font-semibold text-lg '
            onClick={handleSignIn}
          >
            Sign up
          </button>
        </form>
        <Link
          className='text-blue-100 text-sm'
          href='/signin'
        >
          Sign in instead
        </Link>
      </div>
    </div>
  )
}
