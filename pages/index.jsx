import Head from 'next/head'
import { useEffect, useState } from 'react'
import ListDetail from './components/listDetail'
import { CgChevronLeft, CgChevronRight, CgMathPlus } from 'react-icons/cg'
import StyledInput from './components/input.jsx'
import axios from './config/axios'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'

export default function Home(props) {
  const [data, setData] = useState(props.transactions)
  const [filterBy, setFilterBy] = useState(props.filterBy[0])
  const [count, setCount] = useState(0)
  const [detailModalVisible, setDetailModalVisible] = useState(false)
  const [addingModalVisible, setaddingModalVisible] = useState(false)
  const [category, setCategory] = useState([])
  const [record, setRecord] = useState({bill_img: '', cateId:'', cost:'', date:'', title: ''})
  const changeFilter = (id) => {
    setFilterBy(props.filterBy[id])
  }
  const increaseCount = () => {
    if (count < 0) {
      setCount(prev => prev + 1)
    }
  }
  const decreaseCount = () => {
    setCount(prev => prev - 1)
  }
  const modalToggle = () => {
    setDetailModalVisible(!detailModalVisible)
  }
  const toggleAddingModal = () => {
    setaddingModalVisible(!addingModalVisible)
  }
  const cancel = (e) => {
    e.preventDefault();
    setaddingModalVisible(false)
    setRecord({bill_img: '', cateId:'', cost:'', date:'', title: ''})
  }
  const save = () => {
    console.log('record', record)
  }
  useEffect(() => {
    async()=>{
      const response = await axios.get('/category')
      console.log('reponse :>> ', response.data);
    }
  }, [])
  
  return (
    <div className='flex justify-center h-full py-3'>
      <Head>
        <title>Money Tracker</title>
        <meta name="description" content="Online money tracking" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className='mr-3 bg-gray-100 rounded text-blue-300 w-8/12 sm:w-2/3'>
        <div className='mx-3 my-3 bg-offWhite rounded'>
          <ul className='flex justify-around border-b-[1px] border-gray-200'>
            <li className='p-3'>Year</li>
            <li className='p-3'>Month</li>
            <li className='p-3'>Day</li>
          </ul>
          <div className='p-3 flex items-center justify-center gap-x-5 cursor-pointer'>
            <div><CgChevronLeft /></div>
            <p>Today</p>
            <div><CgChevronRight /></div>
          </div>
          <div>
            <ul className='p-3'>
              <li className='py-1 flex justify-between items-center'>
                <p>Income</p>
                <p>+500</p>
              </li>
              <li className='py-1 flex justify-between items-center'>
                <p>Expense</p>
                <p className='border-b-[1px] border-gray-200'>-450</p>
              </li>
              <li className='py-1 flex justify-between items-center'>
                <p></p>
                <p className='border-b-[1px] border-double border-gray-200'>+50</p>
              </li>
            </ul>
          </div>
        </div>
        <div className='p-3 flex justify-end'>
          <button
            className='flex items-center gap-x-2 text-offWhite bg-blue-100 hover:bg-blue-200 rounded p-3 border border-blue-300'
            onClick={toggleAddingModal}><CgMathPlus />New record</button>
        </div>
        {addingModalVisible && <div className='z-10 fixed inset-1 flex items-center justify-center w-full'>
          <form onSubmit={cancel} className='shadow-[0_0_100vw_100vw_rgba(0,0,0,0.7)] w-6/12 h-[290px] min-w-[340px] bg-offWhite rounded max-w-[600px]'>
            <p className='pl-5 py-5 border-b-[1px]'>New Record</p>
            <div className='px-5 flex items-center content-center gap-4 mt-3'>
            <div className='flex'>
                <label className='p-0 text-sm text-gray-200'>Photo
                  <div>bill</div>
                </label>
              </div>
              <div className='w-full flex flex-col'>
                <div className='flex justify-evenly items-center'>
                  <div className='flex'>
                    <label className='p-0 text-sm text-gray-200'>category
                      <select
                        className='w-full h-11 rounded bg-offWhite border border-gray-200 pl-3 text-blue-300'
                      onChange={(e)=> setRecord({...record, cateId: e.target.value})}
                      value={record.cateId}
                      >
                        <option></option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                      </select>
                    </label>
                  </div>
                  <StyledInput
                    title='amount'
                    type='number'
                  change={(e) => setRecord({...record, cost: e.target.value})}
                  value={record.cost}
                  />
                  <StyledInput
                    title='date'
                    type='date'
                  change={e=> setRecord({...record, date: e.target.value})}
                  value={record.date}
                  />
                </div>
                <div>
                <StyledInput
                    title='title'
                    type='text'
                  change={e=> setRecord({...record, title: e.target.value})}
                  value={record.title}
                  />
                </div>
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
          </form>
        </div>}
        <div className='p-3 flex gap-y-3 flex-col md:flex-row md:gap-x-3 md:gap-y-0 w-full'>
          <div className='bg-offWhite rounded w-full md:w-6/12 p-3'>
            <p className='text-sm text-gray-100'>INCOME</p>
            <div className='divide-y-1'>
              {data.map((list) => {
                if (list.type === 'income') return (<div className='flex justify-between items-center text-sm mt-2' onClick={modalToggle}>
                  <div>
                    <p>{list.date}</p>
                    <p>{list.title}</p>
                  </div>
                  <div>
                    + {list.cost}
                  </div>
                </div>)
              })}
            </div>
          </div>
          <div className='bg-offWhite rounded w-full md:w-6/12 p-3'>
            <p className='text-sm text-gray-100'>Expense</p>
            <div className='divide-y divide-gray-100'>
              {data.map((list) => {
                if (list.type === 'expense') return (<div className='flex justify-between items-center text-sm py-1' onClick={modalToggle}>
                  <div>
                    <p>{list.date}</p>
                    <p>{list.title}</p>
                  </div>
                  <div>
                    - {list.cost}
                  </div>
                </div>)
              })}
            </div>
          </div>
        </div>
      </section>
      <aside className='hidden sm:block w-1/3 max-h-[200px]'>
        {detailModalVisible && <ListDetail />}
      </aside>
    </div>
  )
}
export const getStaticProps = async() => {
  return {
    props: {
      transactions: [
        { id: 1, title: 'Lunch', cost: 50, date: '11/07/22', year: 2022, bill_img: '', category: 1, type: 'expense', user: 1 },
        { id: 1, title: 'Lunch', cost: 50, date: '11/07/22', year: 2022, bill_img: '', category: 1, type: 'expense', user: 1 },
        { id: 1, title: 'Lunch', cost: 50, date: '11/07/22', year: 2022, bill_img: '', category: 1, type: 'expense', user: 1 },
        { id: 1, title: 'Salary', cost: 500, date: '11/07/22', year: 2022, bill_img: '', category: 4, type: 'income', user: 1 },
      ],
      filterBy: ['date', 'month', 'year']
    }
  }
}