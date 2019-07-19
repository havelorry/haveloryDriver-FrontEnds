const debug = true
const debugUrl = `http://3fcb89bf.ngrok.io`
const url = debug ? debugUrl:'https://have-drivers.herokuapp.com'
const key = 'AIzaSyDz_VDMBsGjRBG_VtgStOlcb-MIGfPTL58'

const loginUrl = `${url}/driver/login/`
const profileUrl = (username) => `${url}/driver/profile/?username=${username}`
const saveProfile = `${url}/driver/profile/`
const updateLocationUrl = `${url}/driver/active/`
const earningUrl = (driver) =>`${url}/driver/earnings/?driver=${driver}`
export const MAIN_API = debug ? debugUrl :'http://have-drivers.herokuapp.com'

const RideStatus = `${MAIN_API}/driver/rides/`
const HistoryUrl = `${MAIN_API}/driver/rides/`
const driverHistory = (id) => `${MAIN_API}/driver/history/?identifier=${id}&by=driver`
export const FetchDirections = (startLoc,destinationLoc) => `https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }&key=${key}`



const configureFetch = config => url => {
    return new Promise((resolve,reject)=>{
      fetch(url,config).then(js => js.json())
                       .catch(err => reject(err))
                       .then(json => resolve(json)) 
    }); 
  }
 

  
  
export const SOCK_URL = `${MAIN_API}/driver/notifications/`

  const defaultConfig = {
    method:'post',
    headers:{
      'Content-Type':'application/json'
    }
  }
  
  export const TOKEN_URL = `${MAIN_API}/driver/alerts/`

  export const Post = (url,data, extraConfig = {}) => configureFetch({
    ...defaultConfig,
    ...extraConfig,
    body:JSON.stringify(data)
  })(url)
  
export const Get = (url, extraConfig={}) => configureFetch({
    ...defaultConfig,
    ...extraConfig,
    method:'get'
  })(url)
  


export {
    loginUrl,
    profileUrl,
    saveProfile,
    updateLocationUrl,
    earningUrl,
    RideStatus,
    HistoryUrl,
    driverHistory
    
}