// pages/_app.js
import React, { useState } from 'react'
import '@/styles/bootstrap.min.css'
import '@/styles/fonts.min.css'
import '@/styles/kaiadmin.min.css'
import '@/styles/demo.css'
import '@/styles/custom.css'

import type { AppProps } from 'next/app'
import SideBar from '../components/Sidebar'

export default function App({ Component, pageProps }: AppProps) {
  const [sidebarIsOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarIsOpen)
  }

  return (
    <>
      <div className='App wrapper'>
        <SideBar isOpen={sidebarIsOpen} toggle={toggleSidebar} />
        <div className='main-panel'>
          <div className='main-header'>
            <div className='main-header-logo'>
              <div className='logo-header' data-background-color='dark'>
                <div className='nav-toggle' onClick={() => toggleSidebar()}>
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
            <nav
              onClick={() => toggleSidebar()}
              className='navbar navbar-header navbar-header-transparent navbar-expand-lg border-bottom'
            >
              <div className='container-fluid'></div>
            </nav>
          </div>
          <Component {...pageProps} />
        </div>
      </div>
    </>
  )
}
