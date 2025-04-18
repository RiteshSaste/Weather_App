Weather App Implementation:

# App Overview

The weather app is a React Native application that allows users to:
- Search for a city and fetch current weather
- View detailed weather metrics (temperature, wind, humidity, etc.)
- Toggle between dark/light mode
- Persist last used city and its weather data
- Animate weather card UI for polished UX

## Components of the Application

- OpenWeatherMap API for real-time weather data
- Redux Toolkit + redux-persist for state management and persistence
- Reanimated for smooth animations
- React Context for handling API logic
- Custom styles with dark mode support

## Architectural Decisions

- State Management :
    Redux Toolkit + redux-persist
    These are used for the ease of global state management and automatic persistence of city/theme/weather.
- API Logic :
    React Context (ApiContext.tsx)
    Centralizes API config and logic, avoids prop drilling and make modifying the code easier
- Animations :
    react-native-reanimated
    Most basic of the Animation in react-native, which has declarative UI animations.

## Data Flow Summary
The data flow within the application can be given as:
1. User Input → App.tsx sets city via useState.
2. Button Press → Calls getWeatherByCity() from ApiContext.
3. Weather Data Fetched → Stored in local weather state and Redux (lastWeatherData).
4. Redux Actions:
    - setCity() → stores city for future
    - setDarkMode() → persists theme toggle
    - setLastWeatherData() → stores latest API result
5. UI Rendering:
    - Weather card shows data with animation
    - Styles are applied based on dark/light mode
6. App Relaunch:
    - Redux persist rehydrates stored values
    - UI restores previous state instantly