import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div id="notification-alert" style={{ position: 'relative' }}></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
