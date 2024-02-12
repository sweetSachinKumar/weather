import React, { useEffect, useState } from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import { DateWithMonth } from './component/myDate'
import { formatTimeLine } from './component/myDate'
import { BsFillCloudDrizzleFill } from 'react-icons/bs'
import { FaCloudSunRain } from 'react-icons/fa'
import { FiCornerUpLeft } from 'react-icons/fi'
import { IoIosArrowDropup } from 'react-icons/io'
// import {BsFillCloudDrizzleFill, BsFillCloudLightningRainFill,BsFillCloudHaze2Fill, BsFillCloudRainFill,BsCloudSnowFill } from 'react-icons/bs'
import { desideIcon, backgrounStyle } from './component/myWeatherIcon'

// import ReactLoading from 'react-loading';
import ReactLoading from 'react-loading'











const Wheather = () => {
  const [tempUnite, setTempUnite] = useState("metric")
  const [city, setCity] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [recentSearch, setRecentSearch] = useState(JSON.parse(localStorage.getItem("RSH")) || [] )
  const [loading, setLoading] = useState(false)
  const [weatherData, setWeatherData] = useState({
    country: "",
    cityName: "",
    windSpeed: "",
    moodWeather: ""
  })
  const { icon, style } = desideIcon(weatherData.moodWeather)

  let weatherIco = icon
  let screenBg = style


  console.log(weatherData)

  const handleForm = (e) => {
    e.preventDefault()
    setLoading(false)
    setIsSearching(false)
  }

  // my current time setting
  const myDate = new Date()

  const monthWithDate = DateWithMonth()
  let myTime = formatTimeLine(myDate)

  const [search, setSearch] = useState("mumbai")
  console.log(recentSearch)

  const searchHistory = (mydata) => {
    return mydata?.filter((item) => item.toLowerCase().includes(search.toLowerCase()))
  }

  const searchListItem = (states) => {
    setSearch(states)
    setIsSearching(false)
  }

  const fetchData = async (unite = tempUnite ) => {
    try {
      setLoading(true)
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search.trim()}&units=${unite}&appid=37bade05657cf2ed8db314803e27887e`

      const response = await fetch(url)
      const data = await response.json()

      setCity(data.main)
      if (data?.main && city.length !== 0 && recentSearch.indexOf(data?.name) === -1) {
        setRecentSearch(prev => [data.name, ...prev])
        console.log(recentSearch)
      }
      localStorage.setItem("RSH", JSON.stringify(recentSearch))
    

      setWeatherData({
        country: data.sys.country,
        cityName: data.name,
        windSpeed: data.wind.speed,
        moodWeather: data.weather[0].main
      })
      setTimeout(() => {
        setLoading(false)

      }, 1500)
    }
    catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [search, tempUnite])

  return (
    // <div className='max-h-full min-h-screen w-full ' style={{ background: screenBg }}>
    <div className={`max-h-full min-h-screen w-full ${backgrounStyle( Number(city?.temp))} `} >
      {/* navbar  */}
      <nav className='bg-sky-500/70 w-full h-full z-[290] '>
        <div className=' max-w-[1140px] mx-auto shadow-md flex items-center justify-between'>

          <h2 className='sm:text-2xl text-xl font-semibold md:text-3xl max-w-[313px] text-white py-3 px-5 '>Wheather app </h2>
          <form className='text-center z-[300] mr-4 flex-1 h-[40px] max-w-[513px] ms-5 relative' onSubmit={handleForm}>
            <input  onClick={() => setIsSearching(true)} type="text" className=' w-full h-full ps-[26px] lg:pe-[70px] pe-[40px] bg-gray-200/90 border border-gray-800 rounded-full py-1 px-5 focus:outline-none focus:border-blue-400 hover:border-indigo-400  ' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='search Your City...' />
            <button onClick={fetchData} type="submit" className=' absolute top-0 right-0  text-2xl scale-90 p-2 rounded-full hover:bg-indigo-700/50 bg-indigo-600/80 transition-all duration-200 cursor-pointer'><BiSearchAlt2 /></button>

            {isSearching && <div className={`${searchHistory(recentSearch)?.length === 0 ? "hidden" : "block"} p-3 z-[300] overflow-hidden bg-slate-300/90 w-full min-h-full  rounded-3xl shadow-md shadow-indigo-800/20 max-h-[300px] absolute top-[110%] left-0 `}>
              {searchHistory(recentSearch).slice(0, 5).map(states => {
                return (
                  <div onClick={() => searchListItem(states)} className='rounded-2xl cursor-pointer last:border-b-0 mt-0.5 hover:bg-slate-200/90   border-b-2 border-gray-300/80 flex p-2 text-sm sm:text-lg justify-between'>
                    <span>{states}</span>
                    <span><FiCornerUpLeft /></span>
                  </div>
                )
              })
              }
            </div>}
          </form>

          <div onClick={() => setIsSearching(false)} className={`${isSearching ? "block" : "hidden"} bg-neutral-900/5 z-20 fixed top-0 left-0 w-screen h-screen`}></div>

        </div>

      </nav>

      {/* wheather */}
      <div style={{ background: " #0000001c" }} className='  w-full  h-full pb-12  '>
        <div className='   rounded-md pt-4  mx-auto px-5'>
          {/* input search  */}

          {/* dispaly error if not fund  */}
          {!city ? (
            <>
              {(search.length >= 1 && !loading) ? <div className='w-full h-screen flex items-center justify-center  flex-col space-y-7'>
                <p className='text-lg text-center sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-[2px] text-gray-50 '> <span className=' underline mx-0.5'>{search} </span> does not match <br />  any known locations.</p>
                <div className='text-white'>
                  <BsFillCloudDrizzleFill size={150} />
                </div>
              </div>
                :
                <div className='w-full h-screen flex items-center justify-center  flex-col space-y-7'>
                  <p className='text-lg sm:text-xl md:text-2xl  font-bold tracking-[2px] text-gray-50 '> search State Name for see Weather data</p>
                  <div className='text-white'>
                    <FaCloudSunRain size={150} />


                  </div>
                </div>}
            </>
          ) : (

            loading ? (<div className='w-screen h-screen flex items-center justify-center'>
              <span className='md:w-[200px] md:h-[80px] w-[100px] h-[30px] '>    <ReactLoading type="bars" color="#fff" height={"100%"} width={"100%"} /> </span>
            </div>)
              :

              <>

                {/* data show  */}
                <div className='text-slate-100 mt-3   '>

                  {/* date */}
                  <div className='    flex items-center justify-center flex-col'>
                    <p className='text-base lg:text-xl  font-poppinss'> {monthWithDate}  </p>
                    <p className='text-5xl lg:text-7xl my-3 font-robotos '> {myTime} </p>
                    <p className='lg:text-xl text-base capitalize py-6 font-poppinss'>{weatherData.cityName.toUpperCase()}, {weatherData.country}</p>
                  </div>

                  {/* icon */}
                  <div className=' max-w-[850px] mx-auto h-full min-h-[280px] max-h-[400px]  flex items-center md:flex-row md:justify-around justify-center flex-col'>
                    <div className=' text-[200px] md:text-[250px] mb-9'>
                      {/* <BsFillCloudHaze2Fill  /> */}
                      {/* {showIcon} */}
                      {
                        weatherIco
                      }


                    </div>
                    {/* info */}
                    <div >
                      <p className='text-5xl mb-5 flex gap-3 justify-center items-center group-temp max-w-min mx-auto  text-center font-robotos'>
                        {parseFloat(city.temp).toFixed(1)} 
                        {/* <span onClick={ ()=> setTempUnite( tempUnite === "metric" ? "imperial" : "metric")} className='cursor-pointer flex gap-2 text-center'>
                         {tempUnite === "metric" ? <i>&#8451;</i> : <i>&#8457;</i>}
                        <i className='group-hover/temp:-mt-0.5 mt-1 transition-all duration-500'> <IoIosArrowDropup  size={25} /> </i>
                         </span>  */}

                         <span className='flex flex-col font-[Arial]'>
                         <i onClick={()=> setTempUnite("metric")} className={` cursor-pointer text-sm border-b-2 ${tempUnite === "metric"? "text-text-gray-50" : "text-gray-300"}   sm:text-base lg:text-lg`}>&#8451;</i> 

                         <i onClick={()=> setTempUnite("imperial")} className={`  cursor-pointer text-sm sm:text-base  ${tempUnite === "imperial"? "text-text-gray-50" : "text-gray-300"}  lg:text-lg`}>&#8457;</i>
                         </span>
                         </p>


                      <div className='    flex items-center justify-center space-x-20 lg:space-x-20 md:space-x-8 mt-1 '>
                        <p className='     md:text-xl sm:text-base text-xs font-loras'>min: <span className='text-base sm:text-xl md:text-2xl ms-1'> {city.temp_min} {tempUnite === "metric" ? <i>&#8451;</i> : <i>&#8457;</i>} </span> </p>
                        <p className='        md:text-xl sm:text-sm text-xs font-loras '>max:  <span className='text-base sm:text-xl md:text-2xl ms-1'>  {city.temp_max}  {tempUnite === "metric" ? <i>&#8451;</i> : <i>&#8457;</i>} </span> </p>
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
