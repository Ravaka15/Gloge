import React from 'react';
import { Outlet } from 'react-router-dom';
import CustomHeader from '../../layout/CustomHeader';

export default function PageContent() {
  return (
    <div  className="PageContent">
      <CustomHeader />
      <Outlet />
    </div>
  )
}
