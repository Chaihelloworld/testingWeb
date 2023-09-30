import React from "react";
import App from "next/app";
import Head from "next/head";

import "./globals.css";
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <div>
        <Head>
          <link rel="shortcut icon" href="/next.svg" />
          <title>แบบทดสอบ</title>
          <meta name="description" content="แบบทดสอบ" />

          <meta name="viewport" content="width=976" />
        </Head>
        <Component {...pageProps} />
      </div>
    );
  }
}

export default MyApp;
