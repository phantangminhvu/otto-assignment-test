import axios from 'axios'
import { REDIS_KEYS } from '@/constants/redisKey'
import { generateKey } from '../utils/redis'
import { request } from '../utils/api'
import {
  formatSearchCityData,
  formatCurrentWeather,
  formatDailyForecast
} from '../utils/apiResponseFormatter'

export const searchCity = async (query: string) => {
  try {
    // get from cache first
    const searchCityKey = generateKey(REDIS_KEYS.SEARCH_CITY, query)
    const { cachedResponse } = await request(
      `/api/get-cached-value?key=${searchCityKey}`
    )
    if (cachedResponse) {
      return JSON.parse(cachedResponse)
    }
    const response = await request(
      `https://openweathermap.org/data/2.5/find?q=${query}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_ID}&units=metric`
    )

    const searchCityResults = formatSearchCityData(response)

    // store cache value for later usage
    await request(`/api/store-cache-value`, {
      method: 'POST',
      body: {
        value: JSON.stringify(searchCityResults),
        key: searchCityKey
      }
    })
    return searchCityResults
  } catch (error) {
    console.error('Error fetching the weather data', error)
  }
}

export const getWeather = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(
      `https://openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_ID}&exclude=minutely,hourly,alerts`
    )

    const currentWeather = formatCurrentWeather(response.data.current)
    const weatherForecasts = formatDailyForecast(response.data.daily)

    return {
      currentWeather,
      weatherForecasts
    }
  } catch (error) {
    console.error('Error fetching the weather data', error)
  }
}
