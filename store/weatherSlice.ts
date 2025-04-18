import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WeatherState {
  city: string;
  darkMode: boolean;
  lastWeatherData: any | null;
}

const initialState: WeatherState = {
  city: '',
  darkMode: false,
  lastWeatherData: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    setLastWeatherData: (state, action: PayloadAction<any>) => {
      state.lastWeatherData = action.payload;
    },
  },
});

export const { setCity, setDarkMode, setLastWeatherData } = weatherSlice.actions;
export default weatherSlice.reducer;
