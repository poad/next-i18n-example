import {
  ReadonlyURLSearchParams,
  usePathname,
  useSearchParams,
} from 'next/navigation';
import { useTranslation } from 'react-i18next';
import i18nextConfig from '../../next-i18next.config';
import languageDetector from '../lib/languageDetector';

const makeHref = (
  pathname: string,
  pName: string,
  locale?: string,
  href?: string
) => {
  if (locale) {
    return href ? `/${locale}${href}` : pName;
  }
  return href || pathname;
};

const makePathname = (
  origin: string,
  query: ReadonlyURLSearchParams,
  locale: string
) => {
  const params = Object.keys(query);

  const pathnames = params.map((param) =>
    param === 'locale'
      ? origin.replace(`[${param}]`, locale)
      : origin.replace(`[${param}]`, query[param] as string)
  );
  return pathnames[pathnames.length - 1];
};

function LanguageSwitchLink({ locale, ...rest }: { [x: string]: string }) {
  const pathname = usePathname();
  const params = useSearchParams();

  const pName = makePathname(pathname, params, locale);
  const { t } = useTranslation();

  const href = makeHref(pathname, pName, locale, rest.href);
  return (
    <>
      <a href={href}>
        <button
          style={{ fontSize: 'small' }}
          onClick={() => {
            if (languageDetector.cache) {
              languageDetector.cache(locale);
            }
          }}
        >
          {t(`common:language-name-${locale}`)}
        </button>
      </a>
    </>
  );
}

export default function LangSwitcher(): JSX.Element {
  const params = useSearchParams();

  const currentLocale =
    (params.get('locale') as string) || i18nextConfig.i18n.defaultLocale;

  return (
    <>
      {i18nextConfig.i18n.locales
        .filter((locale) => locale !== currentLocale)
        .map((locale: string) => {
          return <LanguageSwitchLink locale={locale} key={locale} />;
        })}
    </>
  );
}
