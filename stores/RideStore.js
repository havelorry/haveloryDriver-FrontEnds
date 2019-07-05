import {types} from "mobx-state-tree"


const Coordinate = types.model({
    latitude:types.optional(types.number,0),
    longitude:types.optional(types.number,0),
}).actions(self=>({
    setCoordinate({latitude,longitude}){
        self.latitude = latitude
        self.longitude = longitude
    }
}))

const Ride = types.model({
    origin:types.optional(Coordinate,{}),
    dst:types.optional(Coordinate,{}),
    fixed:false,
    current:types.optional(Coordinate,{})
}).actions(self=>({
    update(coord1,coord2){
        self.origin.setCoordinate(coord1)
        self.dst.setCoordinate(coord2)
        self.fixed = true
    },

    setCurrent({latitude,longitude}){
        self.current.setCoordinate({latitude,longitude})
    }
}))


const RideStore = Ride.create()

export default RideStore
