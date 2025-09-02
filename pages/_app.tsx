import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { Web3Provider } from '@/lib/Web3Provider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <Web3Provider>
        <Component {...pageProps} />
      </Web3Provider>
    </ErrorBoundary>
  );
}

export default MyApp;
