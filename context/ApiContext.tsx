import React, { createContext, useContext } from 'react';
import axios from 'axios';

const API_KEY = 'a37d12bf98fd83b34e4f797f0290fe80'; // Replace with your actual key

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp_min: number;
    temp_max: number;
  };
  wind: {
    speed: number;
  };
  weather: {
    description: string;
  }[];
}

interface ApiContextType {
  getWeatherByCity: (city: string) => Promise<WeatherData>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getWeatherByCity = async (city: string): Promise<WeatherData> => {
    const response = await axios.get<WeatherData>(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  };

  return (
    <ApiContext.Provider value={{ getWeatherByCity }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};
