
import {IoMdPartlySunny, IoIosSunny} from 'react-icons/io'
import { AiFillCloud} from 'react-icons/ai'
import {  BsFillCloudLightningRainFill,BsFillCloudHaze2Fill, BsFillCloudsFill, BsFillCloudRainFill,BsCloudSnowFill } from 'react-icons/bs'


export const backgrounStyle = (temprature) => {
  if(temprature > 55) { return  " bg-gradient-to-b from-amber-500 from-30%  to-yellow-600 "}
  else if (temprature <=55 && temprature >40) { return " bg-gradient-to-b from-amber-400 from-30%  to-yellow-500 " }
  else if( temprature <=40 && temprature >30 ) { return "bg-gradient-to-b from-amber-300 from-30%  to-yellow-400 " }  
else if (temprature <= 30 && temprature >20 ){ return "  bg-gradient-to-b from-cyan-300 from-30%  to-sky-400"}
else if (temprature <=20 && temprature >3) { return "bg-gradient-to-b from-cyan-400 from-30%  to-sky-500 "}
else if (temprature<=3 && temprature>-8 ) { return "bg-gradient-to-b from-cyan-500 from-30%  to-sky-600" }
else if (temprature<=8 && temprature>-18 ) { return "bg-gradient-to-b from-cyan-600 from-30%  to-sky-700 " }
else if (temprature < -18) {return "bg-gradient-to-b from-cyan-700 from-30%  to-sky-700" } 
else { return  "bg-gradient-to-b from-blue-400 from-30%  to-blue-500" } 

}

export const desideIcon = (weatherMood) => {
    
  // decide the cloud 
  let stIc;

switch (weatherMood){
  case "Haze":
        stIc = {icon: <BsFillCloudHaze2Fill/>,style: "linear-gradient(20deg, #12bbcef7, #18b1b4)"}
    return stIc
 
  case "Clouds":
    stIc = {icon:  <BsFillCloudsFill/>  , style:"linear-gradient(7deg, #3297a4, #0ad8f3)"}
    return stIc 
 
  case "Sunny":
    stIc = {icon:<IoIosSunny/> , style:"linear-gradient(7deg, #b9a11f , #cea217)"}

    return stIc
 
  case "Clear":
    stIc = {icon: <IoMdPartlySunny/> , style:"linear-gradient(7deg, #b9a11f , #cea217)"}

    return  stIc
 
  case "Light rain":
    stIc = {icon: <BsFillCloudRainFill/>  , style:"linear-gradient(7deg, #3297a4, #0ad8f3)"}
    return stIc
 
  case "Moderate rain":
    stIc = {icon: <BsFillCloudLightningRainFill/> , style:"linear-gradient(7deg, #3297a4, #0ad8f3)"}
    return stIc 
 
  case "heavy rain":
    stIc = {icon: <BsFillCloudLightningRainFill/>  , style:"linear-gradient(7deg, #172554, #1e1b4b)"}
    return stIc 
 
  case "snow":
    stIc = {icon: <BsCloudSnowFill/> , style:"linear-gradient(7deg, #3297a4, #0ad8f3)"}
    return stIc 
 
  case "Moderate or heaviy rain with thunder":
    stIc = {icon: <BsFillCloudLightningRainFill/> , style:"linear-gradient(7deg, #172554, #1e1b4b)"}
    return stIc 
 
    default:
        stIc = {icon: <AiFillCloud/>, style:  "linear-gradient(7deg, #1f838f, #3fa1ae)"}
      return  stIc
   
    
}

} 