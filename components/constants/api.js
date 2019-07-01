const url = 'https://have-drivers.herokuapp.com'

const loginUrl = `${url}/driver/login/`
const profileUrl = (username) => `${url}/driver/profile/?username=${username}`
const saveProfile = `${url}/driver/profile/`
const updateLocationUrl = `${url}/driver/active/`
export {
    loginUrl,
    profileUrl,
    saveProfile,
    updateLocationUrl
}