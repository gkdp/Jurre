import 'react-image-lightbox/style.css'

import smoothscroll from 'smoothscroll-polyfill'
import { useEffect } from 'react'

export default function JurreApp({ Component, pageProps }) {
  useEffect(() => smoothscroll.polyfill())

  return <Component {...pageProps} />
}
