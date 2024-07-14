import React, { useState } from 'react'
import styles from './WeatherForecast.module.scss'
import { searchCity, getWeather } from '../../api/openWeather'
import { SearchData, CurrentWeatherData, DailyForecastData } from './types'
import DailyForecast from './components/DailyForecast'
import CurrentWeather from './components/CurrentWeather'
import SearchResults from './components/SearchResults'
import Loader from '../../components/Loader'

type WeatherForecastState = {
  searchingCity: string
  searchResults: SearchData[]
  currentWeather: CurrentWeatherData | null
  selectedCity: string | null
  selectedCountry: string | null
  weatherForecasts: DailyForecastData[]
  loadingSearchCity: boolean
  loadingGetWeather: boolean
}

const WeatherForecast = () => {
  const [state, setState] = useState<WeatherForecastState>({
    searchingCity: '',
    searchResults: [],
    currentWeather: null,
    selectedCity: null,
    selectedCountry: null,
    weatherForecasts: [],
    loadingSearchCity: false,
    loadingGetWeather: false
  })

  const onSearchCity = async () => {
    if (state.searchingCity !== '') {
      setState((currentState) => ({
        ...currentState,
        loadingSearchCity: true
      }))
      const cities = await searchCity(state.searchingCity)
      setState((currentState) => ({
        ...currentState,
        searchResults: cities,
        loadingSearchCity: false
      }))
    }
  }

  const onGetWeather = async (
    lat: number,
    lon: number,
    city: string,
    country: string
  ) => {
    if (state.searchingCity !== '') {
      setState((currentState) => ({
        ...currentState,
        loadingGetWeather: true
      }))
      const response = await getWeather(lat, lon)
      if (response) {
        const { currentWeather, weatherForecasts } = response
        setState((currentState) => ({
          ...currentState,
          selectedCity: city,
          selectedCountry: country,
          currentWeather,
          weatherForecasts,
          searchResults: [],
          loadingGetWeather: false
        }))
      }
    }
  }

  const onChangeSearchCity = (e) => {
    setState((currentState) => ({
      ...currentState,
      searchingCity: e.target.value
    }))
  }

  const {
    searchingCity,
    searchResults,
    currentWeather,
    selectedCity,
    selectedCountry,
    weatherForecasts,
    loadingSearchCity,
    loadingGetWeather
  } = state

  return (
    <>
      <div className='container'>
        <div className='page-inner'>
          <div className='page-header'>
            <h3 className='fw-bold mb-3'>Weather Forecast</h3>
          </div>
          <div className='input-group mb-3'>
            <input
              onChange={(e) => {
                onChangeSearchCity(e)
              }}
              value={searchingCity}
              type='text'
              className='form-control'
              placeholder='Search city'
            />
            <button className='btn btn-primary' onClick={() => onSearchCity()}>
              Search
            </button>
          </div>
          <small id='emailHelp2' className='form-text text-muted'>
            Please click Search button to browse cities
          </small>
          {searchResults && searchResults.length ? (
            <div className={`dropdown-menu ${styles.menu}`}>
              {searchResults.map((result) => {
                return (
                  <SearchResults
                    result={result}
                    onGetWeather={onGetWeather}
                    key={result.id}
                  />
                )
              })}
            </div>
          ) : loadingSearchCity ? (
            <div
              className={`dropdown-menu p-3 justify-content-center ${styles.menu}`}
            >
              <Loader />
            </div>
          ) : (
            <></>
          )}
          {currentWeather && weatherForecasts.length ? (
            <div className='row mt-4'>
              <div className='col-sm-12 col-lg-4'>
                {Boolean(currentWeather) ? (
                  <CurrentWeather
                    currentWeather={currentWeather}
                    selectedCity={selectedCity}
                    selectedCountry={selectedCountry}
                  />
                ) : (
                  <></>
                )}
              </div>
              <div className='col-sm-12 col-lg-8'>
                <div className='table-responsive table-hover table-sales'>
                  <h4 className='card-title mb-4'>Daily forecast</h4>
                  <table className='table'>
                    <tbody>
                      {weatherForecasts.map((forecast) => {
                        return (
                          <DailyForecast
                            forecast={forecast}
                            key={forecast.date}
                          />
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : loadingGetWeather ? (
            <div className='p-3 justify-content-center'>
              <Loader />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  )
}

export default WeatherForecast
