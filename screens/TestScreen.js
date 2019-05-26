import React from "react"
import {View,Text,Alert} from "react-native"
const TestScreen = (props) => <View>
    <View style ={{
        position:'absolute',
        top:20,
        left:20
    }}>

        <Text onPress={
            ()=> Alert.alert('Done')
        }>
                Sample TEXT
        </Text>

    </View>
</View>

export default TestScreen
