const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'ja',
    locales: ['en', 'ja'],
  },
  react: { useSuspense: false },
  localePath: path.resolve('./locales'),
};
