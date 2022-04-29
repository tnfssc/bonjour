import {
  AppProps,
  ErrorBoundary,
  ErrorComponent,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
} from "blitz"
import { Suspense } from "react"
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    // @ts-ignore
    <ErrorBoundary
      FallbackComponent={RootErrorFallback}
      onReset={useQueryErrorResetBoundary().reset}
    >
      {getLayout(
        <Suspense fallback={<div>Loading...</div>}>
          <SessionProvider session={session}>
            {/* @ts-ignore */}
            <Component {...pageProps} />
          </SessionProvider>
        </Suspense>
      )}
    </ErrorBoundary>
  )
}

function RootErrorFallback({ error }: ErrorFallbackProps) {
  return <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
}
