import React from 'react';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import i18nextConfig from '../../next-i18next.config';
import languageDetector from '../lib/languageDetector';

const makeHref = (router: NextRouter, pName: string, locale?: string, href?: string) => {
  if (locale) {
    return href ? `/${locale}${href}` : pName;
  }
  return href || router.asPath;
};

const makePathname = (router: NextRouter, locale: string) => {
  const origin = router.pathname;
  const query = router.query;
  const params = Object.keys(query);

  const pathnames = params.map(param => param === 'locale' ? origin.replace(`[${param}]`, locale) : origin.replace(`[${param}]`, query[param] as string));
  return pathnames[pathnames.length - 1];
};

const LanguageSwitchLink = ({ locale, ...rest }: { [x: string]: string }) => {
  const router = useRouter();
  const pName = makePathname(router, locale);
  const { t } = useTranslation();


  const href = makeHref(router, pName, locale, rest.href);
  return (
    <Link
      href={href}
    >
      <button style={{ fontSize: 'small' }} onClick={() => { if (languageDetector.cache) { languageDetector.cache(locale); } }}>{t(`common:language-name-${locale}`)}</button>
    </Link>
  );
};

export default function LangSwitcher(): JSX.Element {
  const router = useRouter();

  const currentLocale = router.query.locale as string || i18nextConfig.i18n.defaultLocale;

  return (
    <>
      {
        i18nextConfig.i18n.locales
          .filter(locale => locale !== currentLocale)
          .map((locale: string) => {
            return (
              <LanguageSwitchLink
                locale={locale}
                key={locale}
              />
            );
          })
      }
    </>
  );
}
