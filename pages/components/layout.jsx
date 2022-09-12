import React, { useContext, useState } from 'react';
import { UserStore } from '../utilities/userContext';
import Navbar from './navbar';
import NavModal from './navModal';

export default function Layout(props) {
  const {user} = useContext(UserStore)
  const [modalToggle, setModalToggle] = useState(false);
  const toggleModal = () => {
    setModalToggle(!modalToggle);
  };
  return (
    <div className="w-full h-full flex flex-col items-center">
      {user ? <Navbar toggleSetting={toggleModal} user={user} /> : null}
      <main className="flex flex-col sm:flex-row sm:justify-center w-full p-0 sm:p-10 lg:w-[90vw]">
        <div className="block sm:hidden w-1/3">
          {modalToggle && <NavModal toggleModal={toggleModal} />}
        </div>
        {user ? <div className="hidden sm:block min-w-[220px] m-3">
          <NavModal />
        </div> : null}
        <div className="w-full sm:w-2/3 h-full">{props.children}</div>
      </main>
    </div>
  );
}
