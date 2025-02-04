import React,{useState,useEffect} from 'react'
import axios from 'axios'

const WeatherApp = () => {
    const[city, setCity] =useState("");
    const[weatherData, setWeatherData] = useState({})
    const[error, setError] = useState("")
    const[loading, setLoading] = useState(false);
    const[search, setSearch] = useState('');
    
    async function fetchWeather(city){
        if(!city) return;
        setLoading(true);
        setError('');
        
        try {
            setLoading(true);
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric`);
            setWeatherData(response.data);

           } catch (error) {
            setError(error.res?.data?.message || error.message);
            setWeatherData(null);
            
           } finally{
            setLoading(false);
           }
    }

    function handleSearch(){
        fetchWeather(search);
    }
    const today = new Date();
    const formattedDate = today.toLocaleDateString(undefined, {
        weekday : 'long',
        year: 'numeric',
        month : 'long',
        day: 'numeric'
    });
    

  return (
        <div className='w-full h-screen flex justify-center items-center bg=gray-100'>
            <div className='bg-orange-200 w-[500px] p-6 rounded shadow-md'>
                <h2 className='text-2xl font-bold mb-4'>Tell me about the weather!</h2>
                <div className='flex mb-4'>
                <input className='flex-1 p-2 border border-gray-300 rounded-l focus:outline-none'
                type='text' onChange={(e)=>setSearch(e.target.value)} placeholder='Enter city' name='search' value={search}/>
                <button className='bg-blue-500 text-white p-2 rounded-r cursor-pointer hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed' onClick={handleSearch} disabled={!search || loading}>search</button>
                </div>
            {loading && <p>Loading...</p>}   
            {error && <p className='text-red-500 mb-4'>{error}</p>}
            {weatherData && (
                <div className='p-4 rounded'>
                    <h3 className='text-xl font-semibold'>{weatherData.name}</h3>
                    <p>{formattedDate}</p>
                    <p>
                        Temperature : <strong>{weatherData.main?.temp} 'C</strong>
                    </p>
                    <p>
                        Humidity : <strong>{weatherData.main?.humidity}%</strong>
                    </p>
                    <p>
                        Wind Speed : <strong>{weatherData.wind?.speed} m/s</strong>
                    </p>
                    {weatherData.weather && weatherData.weather[0] && (
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt="Weather Icon"
              />
            )}
                </div>
            )}
            </div>
        </div>
  )
}

export default WeatherApp