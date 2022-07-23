import React from 'react';
import { Box, Typography } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';

import Layout from '../../components/Layout';
import StyledBox from 'components/styled/StyledBox';
import CardStyleLink from 'components/styled/CardStyleLink';
import { getStaticPaths, makeStaticProps } from 'lib/getStatic';


const Home = (): JSX.Element => {
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

        <StyledBox>
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
        </StyledBox>
      </Box>
    </Layout>
  );
};

export default Home;

const getStaticProps = makeStaticProps(['common', 'home']);
export { getStaticPaths, getStaticProps };
