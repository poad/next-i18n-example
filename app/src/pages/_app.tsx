import { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../styles/theme';
import '../styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import i18nextConfig from '../../next-i18next.config';

const App = ({ Component }: AppProps): JSX.Element => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Component />
  </ThemeProvider>
);

/* eslint-disable no-restricted-globals */
App.onRedirectCallback = (appState: { targetUrl: string }): void => {
  history.state.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname);
};
/* eslint-enable no-restricted-globals */

export default appWithTranslation(App, i18nextConfig);
