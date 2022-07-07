import React, { useMemo } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

export default function LangSwitcher(): JSX.Element {
  const { t, i18n } = useTranslation();
  const langs = useMemo(() => Object.keys(
    i18n.store.data[Object.keys(
      i18n.store.data)[0]].common)
    .filter(key => key.startsWith('language-name-')).map(key => key.replaceAll('language-name-', '')), []);

  return (
    <>
      {
        langs.map((lng) => {
          if (lng === i18n.language) return <Box key={lng} component="span"></Box>;

          return (
            <Link href="/" locale={lng} key={lng}>
              {t(`common:language-name-${lng}`)}
            </Link>
          );
        })
      }
    </>
  );
}
