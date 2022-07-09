// pages/_app.js
import Link, { LinkProps } from "next/link";
import { ThemeProvider } from "ui";

const NextLink: React.FC<LinkProps> = (props) => <Link passHref {...props} />;

function MyApp({ Component, pageProps, router }) {
  return (
    <ThemeProvider linkComponent={NextLink} router={router}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
