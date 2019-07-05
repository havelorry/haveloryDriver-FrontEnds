const url = 'https://have-drivers.herokuapp.com'

const loginUrl = `${url}/driver/login/`
const profileUrl = (username) => `${url}/driver/profile/?username=${username}`
const saveProfile = `${url}/driver/profile/`
const updateLocationUrl = `${url}/driver/active/`
const earningUrl = (driver) =>`GET http://have-drivers.herokuapp.com/driver/earnings/?driver=${driver}`
export const MAIN_API = 'http://have-drivers.herokuapp.com'

const RideStatus = `${MAIN_API}/driver/rides/`
const HistoryUrl = `${MAIN_API}/driver/rides/`
const driverHistory = (id) => `${MAIN_API}/driver/history/?identifier=${id}&by=customer`

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