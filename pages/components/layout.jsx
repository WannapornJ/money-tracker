import React, { useState } from 'react';
import Navbar from './navbar';
import NavModal from './navModal';

export default function Layout(props) {
  const [modalToggle, setModalToggle] = useState(false);
  const toggleModal = () => {
    setModalToggle(!modalToggle);
  };
  return (
    <div className="w-full h-full flex flex-col items-center">
      <Navbar toggleSetting={toggleModal} />
      <main className="flex flex-col sm:flex-row sm:justify-center w-full p-0 sm:p-10 lg:w-[90vw]">
        <div className="block sm:hidden w-1/3">
          {modalToggle && <NavModal toggleModal={toggleModal} />}
        </div>
        <div className="hidden sm:block w-1/4 min-w-[220px] m-3">
          <NavModal />
        </div>
        <div className="w-full sm:w-2/3">{props.children}</div>
      </main>
    </div>
  );
}
