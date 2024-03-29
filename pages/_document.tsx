import React from 'react';
import createCache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;
    const cache = createCache({ key: 'css', prepend: true });
    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = () =>
      originalRenderPage({
        // eslint-disable-next-line react/display-name
        enhanceApp: (App) => (props) => <App emotionCache={cache} {...props} />,
      });

    const initialProps = await Document.getInitialProps(ctx);
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
      <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ));
    return {
      ...initialProps,
      styles: [
        ...React.Children.toArray(initialProps.styles),
        ...emotionStyleTags,
      ],
    };
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta charSet='utf-8' />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&display=swap'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
