import { Head, Html, Main, NextScript } from 'next/document';

// const INSERT_LATEST_VERSION_HERE = '8.8.3';
// const hyperVerge = `https://hv-camera-web-sg.s3-ap-southeast-1.amazonaws.com/hyperverge-web-sdk@${INSERT_LATEST_VERSION_HERE}/src/sdk.min.js`;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
       
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.jpg" />
      </Head>
      <body className='h-screen'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
