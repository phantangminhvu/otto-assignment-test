import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Navigation = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(router.pathname)

  const navItems = [
    { href: '/', icon: 'fas fa-home', label: 'Dashboard' },
    { href: '/todo', icon: 'fas fa-tasks', label: 'To do list' },
    {
      href: '/weather-forecast',
      icon: 'fas fa-sun',
      label: 'Weather Forecast'
    }
  ]

  const tabItems = useMemo(
    () =>
      navItems.map((item) => (
        <li
          key={item.href}
          className={`nav-item ${activeTab === item.href ? 'active' : ''}`}
          onClick={() => setActiveTab(item.href)}
        >
          <Link href={item.href}>
            <i className={item.icon}></i>
            <p>{item.label}</p>
          </Link>
        </li>
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeTab]
  )

  return <ul className='nav nav-secondary'>{tabItems}</ul>
}

export default Navigation
