import { PersistConfig } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig: PersistConfig<any> = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['city', 'darkMode', 'lastWeatherData'],
};  

export default persistConfig;
