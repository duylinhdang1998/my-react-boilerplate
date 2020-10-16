import React from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './stores/configureStore';
import HomeScreen from '@containers/Home/HomeScreen';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <HomeScreen />
        </View>
      </PersistGate>
    </Provider>
  );
}
