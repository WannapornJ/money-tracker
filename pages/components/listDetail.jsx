import React from 'react'
import { CgTrashEmpty, CgPen } from 'react-icons/cg'

export default function ListDetail() {
  return (
    <div className='mr-3 bg-gray-100 rounded text-blue-300 h-full box-border'>
      <div className='flex items-center justify-between border-b-[1px] border-gray-200 text-sm'>
        <p className='p-3'>Tracnsaction detail</p>
        <div className='p-3 flex items-center justify-end gap-x-3'>
          <CgTrashEmpty />
          <CgPen />
        </div>
      </div>
      <div className='p-3 flex items-center justify-around gap-x-5'>
        <div>
          <div className='border-b-[1px] border-gray-200'>
            <p>Food</p>
            <p>17/11/22</p>
          </div>
          <div>
            <p>Lunch</p>
            <p>-50</p>
          </div>
        </div>
        <div className='border rounded w-full h-[100px] flex justify-center items-center'>IMG</div>
      </div>
    </div>
  )
}
