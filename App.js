import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, Platform, Text } from 'react-native';
import GetCityWeatherCard from './src/components/GetCityWeatherCard';
import ActualCityWeather from './src/components/ActualCityWeather';


export default function App() {
  return (
    <SafeAreaView>
      <View style={[styles.container, { marginTop: Platform.OS === "android" && 50, }]}>
        <ActualCityWeather />
        {/* <GetCityWeatherCard /> */}
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: "center",
    borderWidth: 1,
    borderColor: 'red',
  },
});
