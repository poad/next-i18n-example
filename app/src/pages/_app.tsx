import { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../styles/theme';
import '../styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import i18nextConfig from '../../next-i18next.config';
import { AppCacheProvider } from '@mui/material-nextjs/v15-pagesRouter';

function App(props: AppProps) {
  return (
    <AppCacheProvider {...props}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <props.Component />
      </ThemeProvider>
    </AppCacheProvider>
  );
}

App.onRedirectCallback = (appState: { targetUrl: string }): void => {
  history.state.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname,
  );
};

export default appWithTranslation(App, i18nextConfig);
