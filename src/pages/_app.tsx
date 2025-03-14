import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
  <SessionProvider>
    <Head>
      <link rel="icon" href="/logo.png" />
      <title>DepHelp</title>
    </Head>
    <Component {...pageProps} />
    
    </SessionProvider>
    )
}
