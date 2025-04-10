import path from 'path';

export default {
  debug: process.env.NODE_ENV === 'development',
  i18n: {
    defaultLocale: 'ja',
    locales: ['en', 'ja'],
  },
  react: { useSuspense: false },
};
