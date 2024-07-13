import React from 'react'
import Navigation from './Navigation'
import { useRouter } from 'next/router'

const SideBar = ({
  isOpen,
  toggle
}: {
  isOpen: boolean
  toggle: () => void
}) => {
  return (
    <div
      className={`sidebar ${isOpen ? 'show' : ''}`}
      data-background-color='dark'
    >
      <div className='sidebar-logo'>
        <div className='logo-header' data-background-color='dark'>
          <div className='nav-toggle'>
            <button className='btn btn-toggle toggle-sidebar'>
              <i className='gg-menu-right'></i>
            </button>
            <button className='btn btn-toggle sidenav-toggler'>
              <i className='gg-menu-left'></i>
            </button>
          </div>
          <button className='topbar-toggler more'>
            <i className='gg-more-vertical-alt'></i>
          </button>
        </div>
      </div>
      <div
        className='scroll-wrapper sidebar-wrapper scrollbar scrollbar-inner'
        onClick={toggle}
      >
        <div className='sidebar-wrapper scrollbar scrollbar-inner scroll-content'>
          <div className='sidebar-content'>
            <Navigation />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideBar
