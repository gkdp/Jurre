import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="nl">
        <Head />
        <body>
          <Main />
          <NextScript />

          <style jsx global>{`
            body {
              font: 16px Nunito, sans-serif;
            }

            * {
              box-sizing: border-box;
            }

            html,
            body,
            #__next {
              height: 100%;
              padding: 0;
              margin: 0;
            }

            @keyframes fadeInImg {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }

            .img-lazy {
              margin: 2px;
              position: relative;
            }

            .img-lazy > canvas {
              position: absolute;
              top: 0;
              left: 0;
              pointer-events: none;
            }

            .img-loading {
              opacity: 0;
              width: 100%;
              height: auto;
            }

            .img-loaded {
              animation: fadeInImg cubic-bezier(0.23, 1, 0.32, 1) 1;
              position: relative;
              opacity: 0;
              animation-fill-mode: forwards;
              animation-duration: 0.7s;
              animation-delay: 0.1s;
              cursor: pointer;
              z-index: 1;
            }

            .img-hover {
              opacity: 0;
              position: absolute;
              top: 0;
              left: 0;
              pointer-events: none;
              z-index: 12;
              transition: all 0.4s;
            }

            .img-lazy:hover .img-hover {
              opacity: 1;
            }
          `}</style>
        </body>
      </Html>
    )
  }
}
