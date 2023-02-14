import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "@/components/Layout/Layout";
import '../firebase.config';

import { store } from "@/store/";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  )
}
