import moment from 'moment'
import {
  SearchData,
  CurrentWeatherData,
  DailyForecastData
} from '../pages/weather-forecast/types'

interface ApiResponse {
  list: Array<{
    id: number
    name: string
    coord: { lat: number; lon: number }
    main: { temp: number }
    weather: Array<{ icon: string }>
    sys: { country: string }
  }>
}

const kelvinToCelcius = (temp: number) => {
  return (temp - 273.15).toFixed(2)
}

const formatUnixTimestampToDate = (unixTimestamp: number) => {
  return moment.unix(unixTimestamp).format('MMMM Do YYYY')
}

const degrees = new Intl.NumberFormat('en-US', {
  style: 'unit',
  unit: 'celsius'
})

export const formatSearchCityData = (data: ApiResponse): SearchData[] => {
  if (!data || !data.list || data.list.length === 0) {
    return []
  }

  return data.list.map((city) => ({
    id: city.id,
    name: city.name,
    lat: city.coord.lat,
    lon: city.coord.lon,
    weatherIcon: city.weather[0].icon,
    country: city.sys.country,
    countryFlag: `https://openweathermap.org/images/flags/${city.sys.country.toLowerCase()}.png`,
    temp: `${kelvinToCelcius(city.main.temp)}\u00B0C` // Include temperature in Celsius , with symbol
  }))
}

export const formatCurrentWeather = (data: any): CurrentWeatherData => {
  return {
    date: formatUnixTimestampToDate(data.dt),
    temperature: degrees.format(data.temp),
    description: data.weather[0].description,
    feelsLike: degrees.format(data.feels_like),
    icon: data.weather[0].icon,
    imgIcon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  }
}

export const formatDailyForecast = (data: any[]): DailyForecastData[] => {
  return data.map((day: any) => ({
    date: formatUnixTimestampToDate(day.dt),
    minTemperature: degrees.format(day.temp.min),
    maxTemperature: degrees.format(day.temp.max),
    description: day.weather[0].description,
    icon: day.weather[0].icon,
    imgIcon: `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`
  }))
}
