import Image from 'next/image'
import React from 'react'
import axios from '../config/axios'
import { CgTrashEmpty, CgPen } from 'react-icons/cg'

export default function ListDetail(props) {
  // const [record, setRecord] = useState({ bill_img: '', cateId: '', cost: '', date: new Date().toISOString().slice(0, 10), title: '' })
  const { data, editToggle, record, setRecord } = props
  const edit = () => {
    editToggle()
    setRecord({ ...record, bill_img: data.bill_img, cateId: data.catId, cost: data.cost, date: data.date, title: data.title })
  }
  const deleteTracking = async() => {
    try{
      const response = await axios.delete(`/tracking/${data.trackId}`)
      alert(response.data.message)
    }catch(err){
      alert('Error deleting tracking ', err)
    }
  }
  return (
    <div className=' inset-0 md:inset-1 sm:mr-3 bg-offWhite md:bg-gray-100 rounded text-blue-300 sm:h-[210px] sm:min-w-[285px] box-border flex flex-col justify-evenly'>
      <div className='flex items-center justify-between border-b-[1px] border-gray-200 text-sm'>
        <p className='p-3'>Tracnsaction detail</p>
        <div className='p-3 flex items-center justify-end gap-x-3'>
          <div className="cursor-pointer" onClick={deleteTracking}>
            <CgTrashEmpty />
          </div>
          <div className="cursor-pointer" onClick={edit}>
            <CgPen />
          </div>
        </div>
      </div>
      <div className='p-3 flex items-center justify-around gap-x-5'>
        <div className='w-7/12'>
          <div className='border-b-[1px] border-gray-200'>
            <p>{data.catName}</p>
            <p>{data.date}</p>
          </div>
          <div>
            <p>{data.title}</p>
            <p>{data.cost}</p>
          </div>
        </div>
        <div className=' w-4/12 h-[100px] flex justify-center items-center'>
          <Image src={data.bill_img ? data.bill_img : 'https://res.cloudinary.com/wannaj/image/upload/v1662886036/mt/gray-bg_t7lxmf.jpg'} alt='bill_img' width={145} height={145} />
        </div>
      </div>
    </div>
  )
}
