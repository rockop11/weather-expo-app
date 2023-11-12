import axios from "axios"
import * as Location from 'expo-location';

export async function getLatAndLon(city) {
    try {
        const { data } = await axios(
            `${process.env.EXPO_PUBLIC_API_URL}/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.EXPO_PUBLIC_API_KEY}`
        )

        const lat = data[0].lat
        const lon = data[0].lon

        const cityWeather = await getCityWeather(lat, lon)

        return cityWeather
    } catch (err) {
        return err.response.status
    }
}

export async function getCityWeather(lat, lon) {
    try {
        const { data } = await axios(
            `${process.env.EXPO_PUBLIC_API_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.EXPO_PUBLIC_API_KEY}`
        )
        return data
    } catch (err) {
        return err
    }
}

export async function getCurrentWeather() {
    try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }

        let { coords } = await Location.getCurrentPositionAsync({});


        const cityWeather = await getCityWeather(coords.latitude, coords.longitude)

        return cityWeather
    } catch (err) {
        return err
    }
}