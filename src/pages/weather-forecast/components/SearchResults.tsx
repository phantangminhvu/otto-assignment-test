import { SearchData } from '../types'

interface SearchResultsProps {
  result: SearchData
  onGetWeather: (
    lat: number,
    lon: number,
    name: string,
    country: string
  ) => void
}

const SearchResults = ({ onGetWeather, result }: SearchResultsProps) => {
  return (
    <div
      className='dropdown-item'
      key={result.id}
      onClick={() =>
        onGetWeather(result.lat, result.lon, result.name, result.country)
      }
    >
      <div className='list-group-item d-flex gap-4 ustify-content-between align-items-center'>
        <div className='d-flex align-items-center'>
          <div className='flag me-3'>
            <img src={result.countryFlag} className='flag' />
          </div>
          <div>
            {result.name}, {result.country}
          </div>
        </div>
        <div className='ms-auto'>
          {result.lat}, {result.lon}
        </div>
      </div>
    </div>
  )
}

export default SearchResults
