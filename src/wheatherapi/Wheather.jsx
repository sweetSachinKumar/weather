import React, { useEffect, useState } from 'react'
import {BiSearchAlt2} from 'react-icons/bi'
import {DateWithMonth} from './component/myDate'
import {formatTimeLine} from './component/myDate' 
import {BsFillCloudDrizzleFill  } from 'react-icons/bs'
// import {BsFillCloudDrizzleFill, BsFillCloudLightningRainFill,BsFillCloudHaze2Fill, BsFillCloudRainFill,BsCloudSnowFill } from 'react-icons/bs'
import {desideIcon} from './component/myWeatherIcon'
const Wheather = () => {
  const [city, setCity] = useState("") 
  const [weatherData, setWeatherData] = useState({
    country:"",
    cityName:"",
    windSpeed:"",
    moodWeather: ""
})
 const {icon, style} =  desideIcon(weatherData.moodWeather)
let weatherIco = icon
let screenBg = style




console.log(weatherData)

// my current time setting
const myDate = new Date()

const monthWithDate = DateWithMonth() 
let myTime = formatTimeLine(myDate) 
 
  const [search, setSearch] = useState("mumbai")
  // console.log(city)
 

  const fetchData = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=37bade05657cf2ed8db314803e27887e`

      const response = await fetch(url)
      const data = await response.json() 
      setCity(data.main)
      setWeatherData({
        country:data.sys.country,
        cityName:data.name,
        windSpeed:data.wind.speed,
        moodWeather:data.weather[0].main
      })
    }
    catch (err) {
      console.log(err)
    }
  }


  // decide the cloud 

// switch (weatherData.moodWeather){
//   case "Haze":
//     setSowIcon(<BsFillCloudHaze2Fill/>)
//     break;
//     default:
//       setSowIcon(<BsFillCloudRainFill/>)
//     break
    
// }

  useEffect(() => {
  

    fetchData()
  }, [search])

  return (
    <div className='h-screen w-full ' style={{background:screenBg}}>
      {/* navbar  */}
      <nav className='bg-sky-500/70'>
        <div className=' max-w-[1140px] mx-auto shadow-md flex items-center justify-between'>

          <h2 className='text-2xl md:text-3xl max-w-[313px] text-white py-3 px-5 '>my Wheather app </h2>
          <form className='text-center mr-4 flex-1 h-[40px] max-w-[513px] ms-5 relative' onClick={(e)=> e.preventDefault()}>
            <input type="text" className=' w-full h-full ps-[26px] lg:pe-[70px] pe-[40px] bg-gray-200/90 border border-gray-800 rounded-full py-1 px-5 focus:outline-none focus:border-blue-400 hover:border-indigo-400  ' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='search Your City...' />
            <button onClick={()=> fetchData()} type="submit"  className=' absolute top-0 right-0  text-2xl scale-90 p-2 rounded-full hover:bg-indigo-700/50 bg-indigo-600/80 transition-all duration-200 cursor-pointer'><BiSearchAlt2/></button>
          </form>
        </div>

      </nav>



      {/* wheather */}
      <div style={{background:" #0000001c"}} className='  w-full  h-full   '>
        <div className='   rounded-md pt-4  mx-auto px-5'>
          {/* input search  */}
         


          {/* dispaly error if not fund  */}
          {!city ? (
            <>
            <div className='w-full h-screen flex items-center justify-center  flex-col space-y-7'>
              <p className='text-2xl sm:text-5xl md:text-7xl  font-bold tracking-[2px] text-gray-50 '>No Data found</p>
              <div className='text-white'>
                 <BsFillCloudDrizzleFill size={150}/>
              </div>
              </div>
            </>
          ) : (
            <>

              {/* data show  */}
              <div className='text-slate-100 mt-3   '>

            {/* date */}
            <div className='    flex items-center justify-center flex-col'>
              <p className='text-base lg:text-xl  font-poppinss'> {monthWithDate}  </p>
              <p className='text-5xl lg:text-7xl my-3 font-robotos '> {myTime} </p>
              <p className='lg:text-xl text-base capitalize py-6 font-poppinss'>{weatherData.cityName.toUpperCase()}, {weatherData.country }</p>
            </div>

            {/* icon */}
            <div className=' max-w-[850px] mx-auto  h-[400px]    flex items-center md:flex-row md:justify-around justify-center flex-col'>
              <div className=' text-[200px] md:text-[250px] mb-9'>
                {/* <BsFillCloudHaze2Fill  /> */}
                {/* {showIcon} */}
                {
                  weatherIco
                }
                
                
                </div>
                {/* info */}
                <div >
              <p className='text-5xl mb-5 text-center font-robotos'>{parseFloat(city.temp).toFixed(1)} &#8451;</p>
             
             
              <div className='    flex items-center justify-center space-x-20 lg:space-x-20 md:space-x-8 mt-1 '>    
              <p className='     md:text-xl sm:text-base text-xs font-loras'>min: <span className='text-base sm:text-xl md:text-2xl ms-1'> {city.temp_min} &#8451; </span> </p>
                 <p className='        md:text-xl sm:text-sm text-xs font-loras '>max:  <span className='text-base sm:text-xl md:text-2xl ms-1'>  {city.temp_max} &#8451; </span> </p>
              </div>
              </div>

             
            </div>
             {/* another data  */}
             <div className='        mt-12  max-w-[950px] p-3    w-full mx-auto   bg-white/5  grid grid-cols-2 gap-x-3 gap-y-3 lg:grid-cols-4'>
                  <p className='   md:text-xl sm:text-sm text-xs  font-robotos'>feels like: <span className='text-base sm:text-xl md:text-2xl ms-1'>  {city.feels_like} &#8451;  </span></p>
                  <p className='     md:text-base sm:text-sm text-xs  font-robotos '>humidity: <span className='text-sm sm:text-xl md:text-xl ms-1'> {city.humidity}% </span></p>
                  <p className='     md:text-base sm:text-sm text-xs  font-robotos '>wind speed: <span className='text-sm sm:text-xl md:text-xl ms-1'> {weatherData.windSpeed}km/h </span></p>
                  <p className='     md:text-base sm:text-sm text-xs  font-robotos'>pressure: <span className='text-sm sm:text-xl md:text-xl ms-1'> {city.pressure} atm  </span></p>

              </div>

            </div>
            </>
          )}


        </div>
      </div>
    </div>


  )
}

export default Wheather
