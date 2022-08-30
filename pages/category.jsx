import Head from 'next/head';
import React, { useState } from 'react'
import { CgTrashEmpty, CgPen, CgMathPlus } from 'react-icons/cg'
import StyledInput from './components/input';

export default function Category(props) {
  const [data, setData] = useState([])
  const [type, setType] = useState('expense')
  const [category, setCategory] = useState({ type: '', name: '' })
  const [modalVisible, setmodalVisible] = useState(false)
  const changeType = type => {
    setData(props.category.filter(cat => cat.type === type))
    setType(type);
  }
  const toggleCategory = () => {
    setmodalVisible(!modalVisible)
  }
  const setCatName = e => {
    setCategory({ ...category, name: e.target.value })
  }
  const setCatType = e => {
    setCategory({ ...category, type: e.target.value })
  }
  const cancel = () => {
    setmodalVisible(!modalVisible)
    setCategory({ type: '', name: '' })
  }
  const save = () => {
    setmodalVisible(!modalVisible)
    setData([...data, { type: category.type, name: category.name }])
  }
  return (
    <div className='w-full'>
      <Head>
        <title>setting-category</title>
      </Head>
      <section className='relative w-full sm:my-3 sm:mr-3 bg-offWhite rounded text-blue-300 w-5/6 min-h-[185px] min-w-full sm:min-w-[350px] flex flex-col'>
        <div className='flex justify-around mt-3 border-b-[1px] border-gray-200 p-1 text-lg font-extrabold'>
          <p
            className={type === 'income' ? 'text-blue-300 px-3 py-2 rounded cursor-default' : 'text-gray-200 hover:text-blue-100 hover:border-b-2 border-blue-100 px-3 py-1 cursor-pointer'}
            onClick={() => changeType('income')}
          >
            Income
          </p>
          <p
            className={type === 'expense' ? 'text-blue-300 px-3 py-2 rounded cursor-default' : 'text-gray-200 hover:text-blue-100 hover:border-b-2 border-blue-100 px-3 py-1 cursor-pointer'}
            onClick={() => changeType('expense')}
          >
            Expense
          </p>
        </div>
        {
          data.map((cat) => {
            return (<div
              className='z-0 flex justify-between items-center mt-5 py-2 px-10'
              key={cat.id}
            >
              <p>{cat.name}</p>
              <div className='flex min-w-[80px] justify-evenly items-center text-lg'>
                <div
                  className='cursor-pointer w-5 h-5 text-gray-200'
                  onClick={() => console.log('----- delete -----')}
                >
                  <CgTrashEmpty />
                </div>
                <div
                  className='cursor-pointer w-5 h-5'
                  onClick={toggleCategory}
                >
                  <CgPen />
                </div>
              </div>
            </div>)
          })
        }
        <div
          className='p-8 min-h-[24px]'
          onClick={toggleCategory}
        >
          {modalVisible || <div
            className='text-gray-200 flex self-center justify-center cursor-pointer'
            onClick={toggleCategory}
          >
            <CgMathPlus className='w-5 h-5' /><p>New category</p>
          </div>}
        </div>
        {
          modalVisible &&
          <div className='z-10 fixed inset-1 flex items-center justify-center w-full'>
            <div className='shadow-[0_0_100vw_100vw_rgba(0,0,0,0.7)] w-6/12 h-[220px] min-w-[340px] bg-offWhite rounded max-w-[600px]'>
              <p className='pl-5 py-5 border-b-[1px]'>New Category</p>
              <div className='px-5 flex items-center content-center gap-4 mt-3'>
                <div className='flex'>
                  <label className='p-0 text-sm text-gray-200'>type
                    <select
                      className='w-full h-11 rounded bg-offWhite border border-gray-200 pl-3 text-blue-300'
                      onChange={setCatType}
                      value={category.type}
                    >
                      <option></option>
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </select>
                  </label>
                </div>
                <div className='w-full'>
                  <StyledInput
                    title='name'
                    type='text'
                    change={setCatName}
                    value={category.name}
                  />
                </div>
              </div>
              <div className='px-5 font-semibold flex justify-end gap-x-6 mt-5'>
                <button
                  className='border rounded p-2 border-blue-300 hover:bg-red w-3/12'
                  onClick={cancel}
                >
                  cancel
                </button>
                <button
                  className='border rounded p-2 border-blue-300 bg-yellow-200 hover:bg-yellow-100 w-5/12'
                  onClick={save}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        }
      </section>
    </div>
  )
}
export const getStaticProps = async () => {
  return {
    props: {
      category: [
        { id: 1, name: 'Food', type: 'expense' },
        { id: 2, name: 'Bill', type: 'expense' },
        { id: 3, name: 'Transportation', type: 'expense' },
        { id: 4, name: 'Salary', type: 'income' }
      ]
    }
  }
}