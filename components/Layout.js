import Head from "next/head";
import Image from "next/image";
import logo from "../public/assets/basketball-logo.png";

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>橡树村男子篮球天团</title>
        <meta name="description" content="Oakville basketball club" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-screen-md mx-auto min-h-screen px-3 pt-8">
        <div className="mb-5">
          <div className="flex justify-center mb-3">
            <Image src={logo} alt="logo" />
          </div>
          <h1 className="text-xl text-center">橡树村男子篮球天团</h1>
        </div>
        {children}
      </main>
    </div>
  );
}
