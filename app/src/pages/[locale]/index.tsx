import { Box, Link, Typography } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';

import Layout from '../../components/Layout';
import { getStaticPaths, makeStaticProps } from 'lib/getStatic';
import { ReactNode } from 'react';

function CardStyleLink({ children, href, className }: { children: ReactNode, href: string, className?: string }) {
  return (<Link href={href} sx={{
    padding: '18px 18px 24px',
    width: '220px',
    textAlign: 'left',
    color: '#434343',
    border: '1px solid #9b9b9b',
    textDecoration: 'none',
    '&:hover, &.Mui-focusVisible, &.Mui-active': {
      borderColor: '#067df7',
    },
    '& h3': {
      margin: '0',
      color: '#067df7',
      fontSize: '18px',
    },
    '& p': {
      margin: '0',
      padding: '12px 0 0',
      color: '#333',
      fontSize: '13px',
    },
  }} className={className}>{children}</Link>);
}

function Home() {
  const { t } = useTranslation();

  return (
    <Layout title={t('home:title')}>
      <Box component='main' sx={{ width: '100%', color: '#333' }}>
        <Box sx={{
          margin: '0',
          width: '100%',
          paddingTop: '80px',
          lineHeight: '1.15',
        }}>
          <Typography
            component='h1'
            align='center'
            fontSize='48px'
          >
            {t('home:h1')}
          </Typography>
        </Box>
        <Typography align='center'>
          <Trans
            t={t}
            i18nKey='home:navigation'
            values={{ code: 'pages/index.tsx' }}
            components={[
              <code key="nav">pages/index.tsx</code>,
            ]}
            shouldUnescape
          />
        </Typography>

        <Box sx={{
          maxWidth: '880px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          margin: '80px auto 40px',
          textDecoration: 'none',
        }}>
          <CardStyleLink href="https://nextjs.org/docs">
            <Typography component='h3'>{t('home:doc')} &rarr;</Typography>
            <Typography component='p'>{t('home:docDesc')}</Typography>
          </CardStyleLink>
          <CardStyleLink href="https://nextjs.org/learn" className="card">
            <Typography component='h3'>{t('home:learn')} &rarr;</Typography>
            <Typography component='p'>{t('home:learnDesc')}</Typography>
          </CardStyleLink>
          <CardStyleLink href="https://github.com/zeit/next.js/tree/master/examples" className="card">
            <Typography component='h3'>{t('home:examples')} &rarr;</Typography>
            <Typography component='p'>{t('home:examplesDesc')}</Typography>
          </CardStyleLink>
        </Box>
      </Box>
    </Layout>
  );
};

export default Home;

const getStaticProps = makeStaticProps(['common', 'home']);
export { getStaticPaths, getStaticProps };
