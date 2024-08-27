import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from '@/common/components/Header';

const queryClient = new QueryClient();
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main className={roboto.className}>
        <Component {...pageProps} />;
      </main>
    </QueryClientProvider>
  );
}
