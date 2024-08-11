import { Provider } from 'react-redux';
import { store } from '../redux/store';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '../components/ThemeContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;