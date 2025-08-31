import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

export default MyApp;
