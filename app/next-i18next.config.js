const path = require('path');

module.exports = {
  debug: process.env.NODE_ENV === 'development',
  i18n: {
    defaultLocale: 'ja',
    locales: ['en', 'ja'],
  },
};
