import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import '../../styles/globals.css';
import { Inter } from 'next/font/google'; // Import Inter font

const inter = Inter({ subsets: ['latin'] }); // Initialize Inter font

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <main className={inter.className}> {/* Apply Inter font globally */}
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}

export default MyApp;
