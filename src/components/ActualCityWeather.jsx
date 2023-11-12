import { useEffect, useState } from "react"
import { View, Text, StyleSheet, ActivityIndicator } from "react-native"
import { getCurrentWeather } from "../services"
import WeatherCard from "./WeatherCard"


const ActualCityWeather = () => {
    const [cityWeather, setCityWeather] = useState(null)

    const getCurrentCityWeather = async () => {
        const response = await getCurrentWeather()
        console.log("RESPUESTA CURRENT WEATHER", response);
        setCityWeather(response)
    }

    useEffect(() => {
        getCurrentCityWeather()
    }, [])

    if (cityWeather === null) {
        return (
            <View>
                <Text>Obteniendo datos...</Text>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return (
        <WeatherCard cityWeather={cityWeather} />
    )
}

export default ActualCityWeather