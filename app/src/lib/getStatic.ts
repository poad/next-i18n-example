import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Context } from 'vm';
import i18nextConfig from '../../next-i18next.config';
import type { SSRConfig } from 'next-i18next';

export const getI18nPaths = () =>
  i18nextConfig.i18n.locales.map((lng) => ({
    params: {
      locale: lng,
    },
  }));

export const getStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths(),
});

export const getI18nProps = async (
  ctx: Context,
  ns = ['common']
): Promise<SSRConfig> => {
  const locale = ctx?.params?.locale;
  const props = {
    ...(await serverSideTranslations(locale, ns, i18nextConfig)),
  };
  return props;
};

export const makeStaticProps =
  (ns: string[] = []) =>
  async (ctx: Context) => ({
    props: await getI18nProps(ctx, ns),
  });
