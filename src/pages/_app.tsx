import { wrapper } from '@/app/store'
import { type AppPropsWithLayout } from '@/lib/types'
import '@/styles/main.scss'
import { createTheme, ThemeProvider } from '@mui/material'
import { SessionProvider } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { Suspense, type FC } from 'react'

const Loading = dynamic(() => import('@/components/shared/Loading'))
const CssBaseline = dynamic(() => import('@mui/material/CssBaseline'))
const StateProvider = dynamic(() =>
  import('react-redux').then(module => module.Provider)
)

const theme = createTheme({
  components: {
    MuiIconButton: {
      defaultProps: {
        disableFocusRipple: true,
        disableRipple: true,
        disableTouchRipple: true
      }
    }
  }
})

const App: FC<AppPropsWithLayout> = ({
  Component,
  pageProps: { session, ...rest }
}) => {
  const getLayout = Component.getLayout || (page => page)
  const { store, props } = wrapper.useWrappedStore(rest)

  return (
    <SessionProvider session={session}>
      <StateProvider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Suspense fallback={<Loading />}>
            {getLayout(<Component {...props} />)}
          </Suspense>
        </ThemeProvider>
      </StateProvider>
    </SessionProvider>
  )
}

export default App
