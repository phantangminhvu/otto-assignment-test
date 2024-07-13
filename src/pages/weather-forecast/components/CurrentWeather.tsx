import { CurrentWeatherData } from '../types'

interface CurrentWeatherDataProps {
  currentWeather: CurrentWeatherData
  selectedCity: string | null
  selectedCountry: string | null
}

const CurrentWeather = ({
  currentWeather,
  selectedCity,
  selectedCountry
}: CurrentWeatherDataProps) => {
  return (
    <div className='card card-primary'>
      <div className='card-header'>
        <p>{currentWeather.date}</p>
        <h3>
          {selectedCity}, {selectedCountry}
        </h3>
      </div>
      <div className='card-body pb-0'>
        <div className='mb-4 d-flex'>
          <div>
            <h1 className='primary'>{currentWeather.temperature}</h1>
            <h6>
              Feels like {currentWeather.feelsLike},{currentWeather.description}
            </h6>
          </div>
          <div className='float-right ml-auto'>
            <img
              src={currentWeather.imgIcon}
              alt={currentWeather.description}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather
