export interface SearchData {
  id: number
  name: string
  lat: number
  lon: number
  weatherIcon: string
  country: string
}

export interface CurrentWeatherData {
  date: string
  temperature: string
  description: string
  feelsLike: string
  icon: string
  imgIcon: string
}

export interface DailyForecastData {
  date: string
  minTemperature: string
  maxTemperature: string
  description: string
  icon: string
}
