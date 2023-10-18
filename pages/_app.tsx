import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {SWRConfig} from 'swr'
import { lightTheme } from '@/themes'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { AuthProvider, CartProvider, UiProvider } from '@/context'

export default function App({ Component, pageProps }: AppProps) {
  return  (
    <SWRConfig
      value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        
      }}
    >
      <AuthProvider>
        <CartProvider>
          <UiProvider>
            <ThemeProvider theme={lightTheme}>
              <CssBaseline>
                <Component {...pageProps}/>
              </CssBaseline>
            </ThemeProvider>
          </UiProvider>
        </CartProvider>
      </AuthProvider>
    </SWRConfig>
  )
}
