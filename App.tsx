import React, { useState } from 'react';
import {
  StyleSheet,
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
import { ApiProvider, useApi } from './context/ApiContext';
import { lightStyles, darkStyles } from './styles/themeStyles';

const WeatherApp: React.FC = () => {
  const systemScheme = useColorScheme();
  const { getWeatherByCity } = useApi();

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(systemScheme === 'dark');

  const getWeather = async () => {
    if (!city.trim()) return;
    Keyboard.dismiss();
    setLoading(true);
    setError(null);

    try {
      const data = await getWeatherByCity(city);
      setWeather(data);
    } catch (err) {
      setError('City not found or API error.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const themeStyles = isDarkMode ? darkStyles : lightStyles;

  return (
    <ScrollView contentContainerStyle={themeStyles.container}>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Text style={themeStyles.title}>Weather App 🌦️</Text>
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
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
        onChangeText={setCity}
        returnKeyType="search"
        onSubmitEditing={getWeather}
      />

      <Button title="Get Weather" onPress={getWeather} />
      {loading && <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />}
      {error && <Text style={themeStyles.error}>{error}</Text>}

      {weather && (
        <View style={themeStyles.result}>
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
        </View>
      )}
    </ScrollView>
  );
};

// 👇 Wrap the app in ApiProvider
export default function App() {
  return (
    <ApiProvider>
      <WeatherApp />
    </ApiProvider>
  );
}
