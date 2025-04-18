import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  ActivityIndicator,
  Switch,
  Keyboard,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { store, persistor } from './store';
import { setDarkMode, setLastWeatherData, setCity as setCityRedux } from './store/weatherSlice';
import { RootState } from './store';
import { ApiProvider, useApi } from './context/ApiContext';
import { lightStyles, darkStyles } from './styles/themeStyles';


const WeatherApp: React.FC = () => {
  const systemScheme = useColorScheme();
  const dispatch = useDispatch();
  const { getWeatherByCity } = useApi();

  const persistedCity = useSelector((state: RootState) => state.weather.city);
  const persistedDarkMode = useSelector((state: RootState) => state.weather.darkMode);
  const persistedWeather = useSelector((state: RootState) => state.weather.lastWeatherData);

  const [city, setCityState] = useState('');
  const [weather, setWeather] = useState<any | null>(persistedWeather);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(persistedDarkMode ?? systemScheme === 'dark');


  // Fetch weather
  const getWeather = async (overrideCity?: string) => {
    const cityToUse = overrideCity ?? city;
    if (!cityToUse.trim()) return;

    Keyboard.dismiss();
    setLoading(true);
    setError(null);

    try {
      const data = await getWeatherByCity(cityToUse);
      setWeather(data);
      dispatch(setCityRedux(cityToUse));
      dispatch(setLastWeatherData(data));
    } catch (err) {
      setError('City not found or API error.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Load persisted city and auto-fetch weather
  useEffect(() => {
    if (persistedCity) {
      setCityState(persistedCity);
    }
  
    if (persistedWeather) {
      setWeather(persistedWeather); // restore from persisted data
    } else {
      getWeather(persistedCity);   // fetch
    }
  }, []);

  const themeStyles = isDarkMode ? darkStyles : lightStyles;

  return (
    <ScrollView contentContainerStyle={themeStyles.container}>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Text style={themeStyles.title}>Weather App 🌦️</Text>
        <Switch
          value={isDarkMode}
          onValueChange={(val) => {
            setIsDarkMode(val);
            dispatch(setDarkMode(val));
          }}
          thumbColor={isDarkMode ? '#f4f3f4' : '#333'}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
        />
        <Text style={themeStyles.label}>Dark Mode</Text>
      </View>

      <TextInput
        style={themeStyles.input}
        placeholder="Enter city name"
        placeholderTextColor={isDarkMode ? '#ccc' : '#888'}
        value={city}
        onChangeText={setCityState}
        returnKeyType="search"
        onSubmitEditing={() => getWeather()}
      />

      <Button title="Get Weather" onPress={() => getWeather()} />

      {loading && <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />}
      {error && <Text style={themeStyles.error}>{error}</Text>}

      {weather && !loading && (
        <Animated.View
          entering={FadeInUp.duration(1000)}
          style={themeStyles.result}
        >
          <Text style={themeStyles.city}>{weather.name}</Text>
          <Text style={themeStyles.temp}>{weather.main.temp}°C</Text>
          <Text style={themeStyles.description}>{weather.weather[0].description}</Text>
          <View style={themeStyles.metrics}>
            <Text style={themeStyles.metric}>Feels like: {weather.main.feels_like}°C</Text>
            <Text style={themeStyles.metric}>Min: {weather.main.temp_min}°C</Text>
            <Text style={themeStyles.metric}>Max: {weather.main.temp_max}°C</Text>
            <Text style={themeStyles.metric}>Humidity: {weather.main.humidity}%</Text>
            <Text style={themeStyles.metric}>Pressure: {weather.main.pressure} hPa</Text>
            <Text style={themeStyles.metric}>Wind Speed: {weather.wind.speed} m/s</Text>
          </View>
        </Animated.View>
      )}
    </ScrollView>
  );
};

// Wrap the app in Redux and Persist providers
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApiProvider>
          <WeatherApp />
        </ApiProvider>
      </PersistGate>
    </Provider>
  );
}
