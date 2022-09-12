// import axios from 'axios';
import axios from './config/axios'
import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import { CgTrashEmpty, CgPen, CgMathPlus } from 'react-icons/cg'
import StyledInput from './components/input';

export default function Category() {
  const [type, setType] = useState('expense')
  const [category, setCategory] = useState({ id: null, type: 'expense', name: '', isActive: true, state: 'new' })
  const [categories, setCategories] = useState([])
  const [modalVisible, setmodalVisible] = useState(false)
  const [cfModal, setCfModal] = useState({ visible: false, clickCat: {} })
  const changeType = type => {
    setType(type);
    setCategory({ ...category, type })
  }
  const setCatData = (e, key) => {
    setCategory({ ...category, [key]: e.target.value })
  }
  const cancel = () => {
    setmodalVisible(false)
    setCategory({ type: '', name: '', isActive: true, state: 'new' })

  }
  const getCat = async () => {
    const response = await axios.get('/category')
    setCategories(response.data)
  }
  const save = async (e) => {
    e.preventDefault();
    if (category.state === 'new') {
      try {
        const res = await axios.post('/category', {
          name: category.name,
          type: category.type || 'expense',
          isActive: category.isActive
        })
        setmodalVisible(!modalVisible)
        setTimeout(() => {
          alert(res.data.message)
        }, 1500)
        setType(category.type)
        getCat()
        return
      } catch (err) {
        alert('Error: Creating new category failed, Please try again.\n', err?.message)
        setmodalVisible(!modalVisible)
      }
    } else {
      try {
        const res = await axios.patch('/category', {
          categoryId: category.id,
          name: category.name,
          type: category.type
        })
        setmodalVisible(!modalVisible)
        setType(category.type)
        setTimeout(() => {
          alert(res.data.message)
        }, 1500)
        getCat()
        return
      } catch (err) {
        alert('Error: Updating a category failed, Please try again.\n', err?.message)
        setmodalVisible(!modalVisible)
      }
    }
  }
  const removeCat = async (e, cat) => {
    e.preventDefault();
    try {
      const res = await axios.patch('/category', {
        categoryId: cat.id,
        name: cat.name,
        type: cat.type,
        isActive: false
      })
      if (res.status === 200) {
        setTimeout(() => {
          alert('Deleted successfully')
        }, 1500)
        setCfModal({ clickCat: {}, visible: false })
        getCat()
      }
    } catch (err) {
      alert('Error: Deleting Failed\n', err?.message)
    }
  }
  useEffect(() => {
    getCat()
  }, [])
  return (
    <div className='w-full flex justify-center items-cemter sm:block mt-5 sm:mt-0'>
      <Head>
        <title>setting-category</title>
      </Head>
      <section className='relative w-full sm:w-full sm:my-3 bg-offWhite rounded text-blue-300 w-5/6 min-h-[185px] flex flex-col'>
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
          categories.filter((cat) => cat.type === type && cat.isActive).map((cat) => {
            return (<div
              className='z-0 flex justify-between items-center mt-5 py-2 px-10'
              key={cat.id}
            >
              <p>{cat.name}</p>
              <div className='flex min-w-[80px] justify-evenly items-center text-lg'>
                <div
                  className='cursor-pointer w-5 h-5 text-gray-200'
                  onClick={(e) => {
                    if (confirm(`Are you sure to delete ${cat.name} ?`)){
                      removeCat(e, cat)
                    }else{
                      setCfModal({visible: false, clickCat: {}})
                    }
                  }}
                >
                  {cfModal.visible || <CgTrashEmpty />}
                </div>
                <div
                  className='cursor-pointer w-5 h-5'
                  onClick={() => {
                    setmodalVisible(true);
                    setCategory({ ...category, state: 'update', ...cat });
                  }}
                >
                  <CgPen />
                </div>
              </div>
            </div>)
          })
        }
        <div
          className='p-8 min-h-[24px]'
          onClick={() => {
            setmodalVisible(!modalVisible);
            setCategory({ ...category, state: 'new' });
          }}
        >
          {modalVisible || <div
            className='text-gray-200 flex self-center justify-center cursor-pointer'
            onClick={() => {
              setmodalVisible(!modalVisible);
              setCategory({ ...category, state: 'new' });
            }}
          >
            <CgMathPlus className='w-5 h-5' /><p>New category</p>
          </div>}
        </div>
        {
          modalVisible &&
          <ModalForm
            save={save}
            setCatData={setCatData}
            category={category}
            cancel={cancel}
          />
        }
      </section>
    </div>
  )
}

export const ModalForm = (props) => {
  const { save, setCatData, category, cancel } = props
  return (<div className='z-10 fixed inset-1 flex items-center justify-center w-full'>
    <form onSubmit={save} className='shadow-[0_0_100vw_100vw_rgba(0,0,0,0.7)] w-6/12 h-[220px] min-w-[340px] bg-offWhite rounded max-w-[600px]'>
      <p className='pl-5 py-5 border-b-[1px]'>New Category</p>
      <div className='px-5 flex items-center content-center gap-4 mt-3'>
        <div className='flex'>
          <label className='p-0 text-sm text-gray-200'>type
            <select
              className='w-full h-11 rounded bg-offWhite border border-gray-200 pl-3 text-blue-300'
              onChange={(e) => { setCatData(e, 'type') }}
              value={category?.type}
            >
              <option value="expense" selected>Expense</option>
              <option value="income">Income</option>
            </select>
          </label>
        </div>
        <div className='w-full'>
          <StyledInput
            title='name'
            type='text'
            change={(e) => setCatData(e, 'name')}
            value={category?.name}
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
          type='submit'
        >
          Save
        </button>
      </div>
    </form>
  </div>)
}