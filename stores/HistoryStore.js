import {types} from "mobx-state-tree"
import { driverHistory, Get } from "../components/constants/api";

const Ride = types.model({
    "id":                   types.number,
    "customer_id":          types.number,
    "status":               types.string,
    "dest_latitude":        types.number,
    "dest_longitude":       types.number,
    "origin_latitude":      types.number,
    "origin_longitude":     types.number,
    "origin_string":        types.string,
    "dest_string":          types.string,
    "fare":                 types.number,
    "driver_id":            types.number,
    "isCurrent":false
})

const RideStore = types.model({
    rides:types.optional(types.array(Ride),[]),
    loading:false,
    pullAgain:false
}).actions(self => ({
    pull(list){
        self.rides.replace(list)
    },

    setCurrentRide(index){
        self.rides[index].isCurrent =  true
    },

    setPulling(value){
        self.pullAgain = value
    },

    refresh(username){
        self.updateLoading(true)
        Get(driverHistory(username)).then(
            results => {
                console.log('====================================');
                results.map(el => {
                    delete el['driver']
                    return el
                })

                self.pull(results)
                self.setPulling(false)
                console.log('====================================');
                self.updateLoading(false)
            }
        )
    },

    updateLoading(status){
        self.loading = status
    }

})).views(self=>({
    get results(){
        return self.rides
    },

    get currentRide(){
        return self.rides.filter( ({isCurrent}) => isCurrent)
    },
    get controlDisabled(){
        const [ride] = self.rides.filter( ({isCurrent}) => isCurrent)
        switch(ride.status){
            case 'CANCELLED':
            case 'COMPLETED':
            case 'ACCEPTED':
                return true
            default: return false
        }
    },

    
}))

const RideState = RideStore.create()

export default RideState

