
import {IoMdPartlySunny, IoIosSunny} from 'react-icons/io'
import { AiFillCloud} from 'react-icons/ai'
import {  BsFillCloudLightningRainFill,BsFillCloudHaze2Fill, BsFillCloudsFill, BsFillCloudRainFill,BsCloudSnowFill } from 'react-icons/bs'


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