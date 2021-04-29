import Link from "next/link";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <nav className="header">
        {/* left side */}
        <div>
          <Link href="/">
            <a>Kap's Kitchen</a>
          </Link>
        </div>

        {/* right side */}
        <div>
          <Link href="/">
            <a>Home page</a>
          </Link>
          <Link href="/">
            <a>Home page</a>
          </Link>
          <Link href="/">
            <a>Home page</a>
          </Link>
        </div>
      </nav>

      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
