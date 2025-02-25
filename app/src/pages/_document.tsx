import {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import {
  documentGetInitialProps,
  DocumentHeadTags,
} from '@mui/material-nextjs/v15-pagesRouter';

export default function NextDocument(props) {
  return (
    <Html lang="en">
      <Head>
        <DocumentHeadTags {...props} />
        ...
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

NextDocument.getInitialProps = async (ctx) => {
  const finalProps = await documentGetInitialProps(ctx);
  return finalProps;
};
