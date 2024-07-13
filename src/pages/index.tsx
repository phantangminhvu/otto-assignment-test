import Link from 'next/link'

export default function Home() {
  return (
    <div className='container'>
      <div className='page-inner'>
        <div className='page-header'>
          <h3 className='fw-bold mb-3'>Welcome to demo page</h3>
        </div>
        <div className='list-group'>
          <Link
            href='/todo'
            className='list-group-item list-group-item-action flex-column align-items-start'
          >
            <div className='d-flex w-100 justify-content-between'>
              <h5 className='mb-1'>To do list</h5>
            </div>
            <p className='mb-1'>List down what you are going to do</p>
          </Link>
          <Link
            href='/weather-forecast'
            className='list-group-item list-group-item-action flex-column align-items-start'
          >
            <div className='d-flex w-100 justify-content-between'>
              <h5 className='mb-1'>Weather forecast</h5>
            </div>
            <p className='mb-1'>
              Get to know today weather and weekly weather forecast
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}
