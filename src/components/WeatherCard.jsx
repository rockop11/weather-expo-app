import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'

const WeatherCard = ({ cityWeather }) => {
  const [backgroundImage, setBackgroundImage] = useState("")

  const { coord, weather, main, sys, name } = cityWeather

  console.log("WATHER CARD", JSON.stringify(cityWeather, null, 2));

  function checkTypeOfWeather() {
    if (weather[0].main === "Clear") {
      // console.log("ESTA DESPEJADO");
      const cloudsImage = require("../../assets/clear-sky.jpeg")
      setBackgroundImage(cloudsImage)
    }
  }

  function convertKelvinToCelsius(kelvinTemp) {
    const kelvin = kelvinTemp
    const celcius = Math.floor(kelvin - 273)
    return celcius
  }

  useEffect(() => {
    checkTypeOfWeather()
  }, [])

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <Text style={{ fontSize: 30, color: "#ffffff" }}>Mi ubicación</Text>
        <Text style={styles.cityText}>{name} - {sys.country}</Text>
        <Text style={styles.temp}>{convertKelvinToCelsius(main.temp)}°</Text>
        <View style={{ display: "flex", flexDirection: "row", gap: 24 }}>
          <Text style={{ fontSize: 16, color: "#ffffff" }}>Mínima: {convertKelvinToCelsius(main.temp_min)}°</Text>
          <Text style={{ fontSize: 16, color: "#ffffff" }}>Máxima: {convertKelvinToCelsius(main.temp_max)}°</Text>
        </View>
        <Image
          source={{ uri: `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png` }}
          style={{ width: 50, height: 50 }}
        />
      </ImageBackground>
    </View>
  )
}

export default WeatherCard

const styles = StyleSheet.create({
  container: {
    width: "90%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  backgroundImage: {
    width: "100%",
    height: 300,
    borderRadius: 15,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center"
  },
  cityText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff"
  },
  temp: {
    fontSize: 80,
    color: "#ffffff"
  }
})



// container: {
//   borderRadius: 15,
//   width: "90%",
//   height: 300,
//   justifyContent: "center",
//   alignItems: "center",
//   backgroundColor: "rgba(0, 0, 0)"
// },
// text: {
//   fontSize: 32,
//   color: "white",
//   textAlign: "center",
//   paddingTop: 10
// },
// weatherText: {
//   fontSize: 100,
//   color: "white",
//   textAlign: "center",
//   paddingTop: 10
// }