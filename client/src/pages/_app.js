import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import {Provider} from "react-redux";
import {store, persistor} from '../redux/store/index'
import { PersistGate } from 'redux-persist/integration/react';

export default function App({ Component, pageProps }) {
  return (
  <ChakraProvider>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
       <Component {...pageProps} />
       </PersistGate>
    </Provider>

  </ChakraProvider>
)
}
