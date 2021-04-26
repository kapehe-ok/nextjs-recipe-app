import Link from "next/link";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <nav>
        <Link href="/">
          <a>Home page - LOGO GOES HERE</a>
        </Link>
      </nav>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
