import { useState, useEffect } from 'react';
import { Text, StyleSheet, View, ActivityIndicator, ImageBackground, Image } from 'react-native';
import { getLatAndLon } from "../services"

const GetCityWeatherCard = () => {
    const [cityWeather, setCityWeather] = useState(null)
    const [celciusTemp, setCelciusTemp] = useState("")
    const [weatherIcon, setWeatherIcon] = useState('')
    const [backgroundImage, setBackgorundImage] = useState(null)
    const [errors, setErrors] = useState(false)

    const getFrontData = async () => {
        const response = await getLatAndLon("Colegiales")

        if (response === 400) {
            setErrors(true)
        } else {
            setErrors(false)
            setCityWeather(response)

            const kelvin = response.main.temp
            const celcius = Math.floor(kelvin - 273)

            setCelciusTemp(celcius)
            setWeatherIcon(`https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`)

            if (response.weather[0].main === "Clouds") {
                const cloudsImage = require("../../assets/clouds.jpg")
                setBackgorundImage(cloudsImage)
            }

            if (response.weather[0].main === "Clear") {
                const cloudsImage = require("../../assets/clear-sky.jpeg")
                setBackgorundImage(cloudsImage)
            }
        }
    }

    useEffect(() => {
        getFrontData()
    }, [])

    return (
        <View style={styles.container}>
            {
                !cityWeather && (
                    <ActivityIndicator size="large" />
                )
            }
            {
                errors && (
                    <Text>No se pudo obtener la data</Text>
                )
            }
            {
                cityWeather && (
                    <ImageBackground
                        source={backgroundImage}
                        resizeMode="cover"
                        style={styles.image}
                    >
                        <Text style={styles.text}>{cityWeather.name} - {cityWeather.sys.country}</Text>

                        <Text style={styles.weatherText}>{celciusTemp}°</Text>

                        <Image source={{ uri: weatherIcon }} style={{ width: 50, height: 50 }} />
                    </ImageBackground>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        width: "90%",
        height: 300,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255)"
    },
    image: {
        flex: 1,
        width: "100%",
        height: 300,
        borderRadius: 15,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 32,
        color: "white",
        textAlign: "center",
        paddingTop: 10
    },
    weatherText: {
        fontSize: 100,
        color: "white",
        textAlign: "center",
        paddingTop: 10
    }
})

export default GetCityWeatherCard