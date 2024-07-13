import { DailyForecastData } from '../types'

interface DailyForecastProps {
  forecast: DailyForecastData
}

const DailyForecast = ({ forecast }: DailyForecastProps) => {
  return (
    <tr key={forecast.date}>
      <td>{forecast.date}</td>
      <td>
        {forecast.maxTemperature} / {forecast.minTemperature}
      </td>
      <td className='text-end'>
        <img src={forecast.imgIcon} alt={forecast.description} />
      </td>
      <td className='text-end'>{forecast.description}</td>
    </tr>
  )
}

export default DailyForecast
