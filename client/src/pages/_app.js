import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import {Provider} from "react-redux";
import store from '../redux/store/index'
export default function App({ Component, pageProps }) {
  return (
  <ChakraProvider>
    <Provider store={store}>
       <Component {...pageProps} />
    </Provider>

  </ChakraProvider>
)
}
