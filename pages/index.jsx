import Head from 'next/head'
import { useEffect, useState } from 'react'
import ListDetail from './components/listDetail'
import { CgChevronLeft, CgChevronRight, CgMathPlus } from 'react-icons/cg'
import StyledInput from './components/input.jsx'
import axios from './config/axios'
import Image from 'next/image'
import { ModalForm as CatModalForm } from './category'

export default function Home() {
  const [data, setData] = useState([])
  const [count, setCount] = useState(0)
  const [detailModal, setDetailModal] = useState({ visible: false, catName: '', catId: '', bill_img: '', cost: '', date: '', trackId: '', title: '', edit: false })
  const [addingModalVisible, setaddingModalVisible] = useState(false)
  const [category, setCategory] = useState([])
  const [record, setRecord] = useState({ bill_img: '', cateId: '', cost: '', date: new Date().toISOString().slice(0, 10), title: '' })
  const [tab, setTab] = useState('daily')
  const [billImg, setbillImg] = useState({ data: '', src: '', file: '' })
  const [newCat, setNewCat] = useState({ visible: false, name: '', type: 'expense', isActive: true })

  const setCatData = (e, key) => {
    setNewCat({ ...newCat, [key]: e.target.value })
  }
  const cancelCreateCat = () => {
    setNewCat({ type: 'expense', name: '', isActive: true, visible: false })
  }
  const saveCat = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/category/', {
        name: newCat.name,
        type: newCat.type,
        isActive: newCat.isActive
      })
      alert(response.data.message)
      setNewCat({ type: 'expense', name: '', isActive: true, visible: false })
      try {
        const res = await axios.get("/category/")
        setCategory(res.data)
      } catch (err) {
        console.log("Error: fetching category failed", err)
        setCategory([])
      }
    } catch (err) {
      console.log('Error', err)
      setNewCat({ type: 'expense', name: '', isActive: true, visible: false })
    }
  }
  const increaseCount = () => {
    if (tab === 'monthly' && count < 13) {
      setCount(prev => prev + 1)
    } else if (tab === 'weekly' && count < -1) {
      setCount(prev => prev + 1)
    } else if (tab === 'daily' && count < 0) {
      setCount(prev => prev + 1)
    }
  }
  const decreaseCount = () => {
    if (tab === 'monthly' && count > 0) {
      setCount(prev => prev - 1)
    } else {
      setCount(prev => prev - 1)
    }
  }
  const modalToggle = (cat, track) => {
    setDetailModal({ ...detailModal, visible: true, catName: cat.name, catId: cat.id, bill_img: track.bill_img, cost: track.cost, date: track.date, trackId: track.id, title: track.title })
  }
  const editToggle = async() => {
    if(detailModal.edit){
      setCount(false)
    }else{
      setRecord({ billImg: '', cateId: '', cost: '', date: new Date().toISOString().slice(0, 10), title: '' })
      setbillImg({ src: '', file: '', data: '' })
    }
    try {
      const res = await axios.get("/category/")
      setCategory(res.data)
      setDetailModal({ ...detailModal, edit: !detailModal.edit })
      
    } catch (err) {
      console.log("Error: fetching category failed", err)
      setCategory([])
      setDetailModal({ ...detailModal, edit: !detailModal.edit })
    }
  }
  const toggleAddingModal = async () => {
    try {
      const res = await axios.get("/category/")
      setCategory(res.data)
      setaddingModalVisible(!addingModalVisible)
    } catch (err) {
      console.log("Error: fetching category failed", err)
      setCategory([])
      setaddingModalVisible(!addingModalVisible)
    }
  }
  const cancel = (e) => {
    e.preventDefault();
    setaddingModalVisible(false)
    setRecord({ billImg: '', cateId: '', cost: '', date: new Date().toISOString().slice(0, 10), title: '' })
    setbillImg({ src: '', file: '', data: '' })
  }
  const save = async (e) => {
    e.preventDefault();
    try {
      record.bill_img = billImg.src
      const response = await axios.post("/tracking", record)
      alert(response.data.message)
      setRecord({ billImg: '', cateId: '', cost: 0, date: '' })
      setaddingModalVisible(false)
      setbillImg({ data: '', file: '', src: '' })
      setRecord({ bill_img: '', cateId: '', cost: '', date: new Date().toISOString().slice(0, 10), title: '' })
    } catch (err) {
      alert('Error: creating new record failed, Please try again', err)
    }
  }
  const changeTab = (tabValue, current) => {
    setTab(tabValue)
    setCount(current)
  }
  const handleFormChange = (e) => {
    if (e.target.type === 'file') {
      const reader = new FileReader();
      reader.onload = function (onLoadEvent) {
        setbillImg({ ...billImg, src: onLoadEvent.target.result, file: e.target.files[0] })
      }
      reader.readAsDataURL(e.target.files[0]);

    }
  }
  const uploadImg = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('file', billImg.file);
    formData.append('upload_preset', 'money-tracker');
    const imageData = await fetch('https://api.cloudinary.com/v1_1/wannaj/image/upload', {
      method: 'POST',
      body: formData
    }).then((res) => res.json())

    if (imageData.secure_url) {
      setbillImg({ ...billImg, src: imageData.secure_url, data: imageData })
      setRecord({ ...record, bill_img: imageData.secure_url })
    } else {
      setbillImg({ data: '', file: '', src: '' })
    }
  }
  const updateTracking = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.patch(`/tracking/${detailModal.trackId}`, {
        bill_img: record.bill_img,
        cateId: record.cateId,
        cost: record.cost,
        date: record.date,
        title: record.title
      })
      alert(response.data.message)
      editToggle()
      setDetailModal({...detailModal, visible: true, catId: record.cateId, bill_img: record.bill_img, cost: record.cost, date: record.date, title: record.title, edit: false})
      if(tab === 'monthly'){
        setCount(new Date().getMonth())
      }else{
        setCount(0)
      }
    } catch (error) {
      alert('Updating Tracking failed', error)
      editToggle()
      setRecord({ billImg: '', cateId: '', cost: '', date: new Date().toISOString().slice(0, 10), title: '' })
      setbillImg({ src: '', file: '', data: '' })
      if(tab === 'monthly'){
        setCount(new Date().getMonth())
      }else{
        setCount(0)
      }
    }
  }

  useEffect(() => {
    if (tab === 'daily') {
      const getDailyTrack = async () => {
        if (count <= 0) {
          let targetDate = new Date((new Date().getTime()) + (count * 24 * 60 * 60 * 1000))
            .toISOString()
            .slice(0, 10)
          try {
            const response = await axios.get(`/tracking/daily/${targetDate}`)
            setData(response.data)
          } catch (error) {
            console.log("Error: fetching tracking data", error)
          }
        }
      }
      getDailyTrack()
    }
    if (tab === 'weekly') {
      const getWeeklyTrack = async () => {
        try {
          const response = await axios.get(`/tracking/weekly/${Math.abs(count)}`)
          setData(response.data)
        } catch (error) {
          console.log("Error: fetching tracking data", error)
        }
      }
      getWeeklyTrack()
    }
    if (tab === 'monthly') {
      const getMonthlyTrack = async () => {
        try {
          const response = await axios.get(`/tracking/monthly/${count}`)
          setData(response.data)
        } catch (error) {
          console.log("Error: fetching tracking data", error)
        }
      }
      getMonthlyTrack()
    }
  }, [tab, count])
  console.log('data :>> ', data);
  return (
    <div className='flex justify-center h-full py-3'>
      <Head>
        <title>Money Tracker</title>
        <meta name="description" content="Online money tracking" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className='mr-3 bg-gray-100 rounded text-blue-300 w-8/12 sm:w-2/3'>
        <div className='mx-3 my-3 bg-offWhite rounded'>
          <ul className='flex justify-around border-b-[1px] border-gray-200 p-1 text-lg font-extrabold mt-3'>
            <li className={tab === 'monthly' ? 'text-blue-300 px-3 py-2 rounded cursor-default' : 'text-gray-200 hover:text-blue-100 hover:border-b-2 border-blue-100 px-3 py-1 cursor-pointer'} onClick={() => changeTab('monthly', new Date().getMonth() + 1)}>Month</li>
            <li className={tab === 'weekly' ? 'text-blue-300 px-3 py-2 rounded cursor-default' : 'text-gray-200 hover:text-blue-100 hover:border-b-2 border-blue-100 px-3 py-1 cursor-pointer'} onClick={() => changeTab('weekly', -1)}>Week</li>
            <li className={tab === 'daily' ? 'text-blue-300 px-3 py-2 rounded cursor-default' : 'text-gray-200 hover:text-blue-100 hover:border-b-2 border-blue-100 px-3 py-1 cursor-pointer'} onClick={() => changeTab('daily', 0)}>Day</li>
          </ul>
          <div className='p-3 flex items-center justify-center gap-x-5 cursor-pointer'>
            <div onClick={decreaseCount}><CgChevronLeft /></div>
            <p>{tab === 'daily' ? new Date(new Date().getTime() + (count * 24 * 60 * 60 * 1000)).toISOString().slice(0, 10) : tab === 'weekly' ? `${count === -1 ? 'This week' : 'Past ' + Math.abs(count) + ' week'}` : new Date(new Date().setMonth(count - 1)).toLocaleString('en-us', { month: 'long' })}</p>
            <div onClick={increaseCount}><CgChevronRight /></div>
          </div>
          <div>
            <ul className='p-3'>
              <li className='py-1 flex justify-between items-center'>
                <p>Income</p>
                <p>{data?.income || 0}</p>
              </li>
              <li className='py-1 flex justify-between items-center'>
                <p>Expense</p>
                <p className='border-b-[1px] border-gray-200'>{data?.expense || 0}</p>
              </li>
              <li className='py-1 flex justify-between items-center'>
                <p></p>
                <p className='border-b-[1px] border-double border-gray-200'>{data?.total || 0}</p>
              </li>
            </ul>
          </div>
        </div>
        <div className='p-3 flex justify-end'>
          <button
            className='flex items-center gap-x-2 text-offWhite bg-blue-100 hover:bg-blue-200 rounded p-3 border border-blue-300'
            onClick={toggleAddingModal}><CgMathPlus />New record</button>
        </div>
        {addingModalVisible &&
          <TrackForm
            billImg={billImg}
            cancel={cancel}
            category={category}
            handleFormChange={handleFormChange}
            newCat={newCat}
            record={record}
            save={save}
            setNewCat={setNewCat}
            setRecord={setRecord}
            uploadImg={uploadImg}
          />}
        {newCat.visible && <CatModalForm
          save={saveCat}
          setCatData={setCatData}
          category={newCat}
          cancel={cancelCreateCat} />}
        <div className='p-3 flex gap-y-3 flex-col md:flex-row md:gap-x-3 md:gap-y-0 w-full'>
          <div className='bg-offWhite rounded w-full md:w-6/12 p-3'>
            <p className='text-sm text-gray-200'>INCOME</p>
            <div className='divide-y-1 divide-gray-100'>
              {data?.targetTracking?.filter(({ type }) => type === 'income').map(item => {
                return (
                  <div key={item.id} className='border-b border-gray-100 mt-1 overflow-y-scroll'>
                    <h3 className='text-blue-100'>{item.name}</h3>
                    {item?.Trackings?.map(track => (
                      <div key={track.id} className='flex justify-between items-center text-sm py-1 cursor-pointer' onClick={() => modalToggle(item, track)}>
                        <div>
                          <p>{track.date}</p>
                          <p>{track.title}</p>
                        </div>
                        <div>{track.cost}</div>
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>
          <div className='bg-offWhite rounded w-full md:w-6/12 p-3'>
            <p className='text-sm text-gray-200'>Expense</p>
            <div className='divide-y-1 divide-gray-100'>
              {data?.targetTracking?.filter(({ type }) => type === 'expense').map(item => {
                return (
                  <div key={item.id} className='border-b border-gray-100 mt-1 overflow-y-scroll'>
                    <h3 className='text-blue-100'>{item.name}</h3>
                    {item?.Trackings?.map(track => (
                      <div key={track.id} className='flex justify-between items-center text-sm py-1 cursor-pointer' onClick={() => modalToggle(item, track)}>
                        <div>
                          <p>{track.date}</p>
                          <p>{track.title}</p>
                        </div>
                        <div>{track.cost}</div>
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section >
      <aside className='hidden sm:block w-1/3 max-h-[200px]'>
        {detailModal.visible && <ListDetail data={detailModal} editToggle={editToggle} setRecord={setRecord} record={record} />}
        {detailModal.edit &&
          <div className='text-blue-300'>
            <TrackForm
              billImg={billImg}
              cancel={editToggle}
              category={category}
              handleFormChange={handleFormChange}
              newCat={newCat}
              record={record}
              save={updateTracking}
              setNewCat={setNewCat}
              setRecord={setRecord}
              uploadImg={uploadImg}
            />
          </div>
        }
      </aside>
    </div >
  )
}

export const TrackForm = (props) => {
  const { save, handleFormChange, billImg, newCat, setNewCat, record, setRecord, category, cancel, uploadImg } = props;
  return (
    <div className='z-10 fixed inset-1 flex items-center justify-center w-full'>
      <form onSubmit={save} onChange={handleFormChange} className='shadow-[0_0_100vw_100vw_rgba(0,0,0,0.7)] w-6/12 h-[350px] min-w-[500px] bg-offWhite rounded max-w-[600px]'>
        <p className='pl-5 py-5 border-b-[1px]'>New Record</p>
        <div className='px-5 flex items-start content-center gap-4 mt-3 h-[200px]'>
          <div className='flex flex-col w-4/12'>
            <label className='p-0 text-sm text-gray-200 flex flex-col gap-y-1'>Photo
              <div className='flex items-center justify-between gap-x-1'>
                <input type="file" name='file' accept="image/png, image/jpeg, image/jpg" />
                <div className={billImg.data ? 'text-green' : 'text-gray-100'}>{billImg.data && billImg.src ? '✓' : 'X'}</div>
              </div>
              <Image src={record.bill_img ? record.bill_img : billImg.src? billImg.src : 'https://res.cloudinary.com/wannaj/image/upload/v1662886036/mt/gray-bg_t7lxmf.jpg'} width={150} height={150} alt='tracking bill' className='rounded' />
              {billImg.src && !billImg.data && <button className='hover:text-blue-300 font-extrabold' onClick={uploadImg}>Upload</button>}
            </label>
          </div>
          <div className='w-full flex flex-col w-8/12'>
            <div className='flex justify-evenly items-center gap-x-1'>
              <div className='flex'>
                <label className='p-0 text-sm text-gray-200'>category
                  <select
                    className='w-full h-11 rounded bg-offWhite border border-gray-200 pl-3 text-blue-300'
                    onChange={(e) => e.target.value === 'newCat' ? setNewCat({ ...newCat, visible: true }) : setRecord({ ...record, cateId: e.target.value })}
                    value={record.cateId}
                  >
                    <optgroup label='Expense'>
                      {category?.filter(cat => cat.type === 'expense').map(cat => {
                        return (<option key={cat.id} value={cat.id}>{cat.name}</option>)
                      })}
                    </optgroup>
                    <optgroup label='Income'>
                      {category?.filter(cat => cat.type === 'income').map(cat => {
                        return (<option key={cat.id} value={cat.id}>{cat.name}</option>)
                      })}
                    </optgroup>
                    <optgroup label='category'>
                      <option value='newCat'>+ new Category</option>
                    </optgroup>
                  </select>
                </label>
              </div>
              <StyledInput
                title='date'
                type='date'
                change={e => setRecord({ ...record, date: e.target.value })}
                value={record.date}
              />
            </div>
            <div className='flex justify-evenly items-center gap-x-1'>
              <div className='w-4/12'>
                <StyledInput
                  title='amount'
                  type='number'
                  change={(e) => setRecord({ ...record, cost: e.target.value })}
                  value={Math.abs(record.cost)}
                />
              </div>
              <div className='w-8/12'>
                <StyledInput
                  title='title'
                  type='text'
                  change={e => setRecord({ ...record, title: e.target.value })}
                  value={record.title}
                />
              </div>
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
          <button className='border rounded p-2 border-blue-300 bg-yellow-200 hover:bg-yellow-100 w-5/12'>
            Save
          </button>
        </div>
      </form>
    </div>
  )
}