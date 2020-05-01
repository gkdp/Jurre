import React, { useCallback, useState } from 'react';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-image-lightbox';
import LazyLoad from 'react-lazyload';
import Head from '../components/head';
import Async from 'react-async';

const loadPhotos = () =>
  fetch('https://jurre.s3.amazonaws.com/photos.json')
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())

const scrollElementIntoView = (element, behavior) => {
  let scrollTop = window.pageYOffset || element.scrollTop
  const finalOffset = element.getBoundingClientRect().top + scrollTop

  window.parent.scrollTo({
    top: finalOffset,
    behavior: behavior || 'auto'
  })
}

const RenderImage = ({ index, photo, onClick }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <img
        src={photo.src}
        id={photo.file.split('.')[0]}
        width={photo.width}
        height={photo.height}
        style={{ display: 'block' }}
        className={loaded ? 'img-loaded' : 'img-loading'}
        onClick={(e) => onClick(e, { index })}
        onLoad={(e) => setLoaded(true)}
      />

      {photo.vector && (
        <img
          src={photo.src.replace('thumbnail', 'vectors')}
          id={photo.file.split('.')[0] + '-vectors'}
          width={photo.width}
          height={photo.height}
          className={'img-hover'}
        />
      )}
    </>
  )
}

const RenderTitle = (data) => {
  if (!data || !data.exif) return;

  return (
    <div className="title">
      <div className="stay">{`${data.exif.dateTime} (${data.exif.width}x${data.exif.height})`}</div>
    </div>
  )
}

const RenderCaption = (data) => {
  if (!data || !data.exif) return;

  let hasLoc = false

  if (data.exif.gps) {
    var exifLong = data.exif.gps.longitude;
    var exifLongRef = data.exif.gps.longitudeRef;
    var exifLat = data.exif.gps.latitude;
    var exifLatRef = data.exif.gps.latitudeRef;

    hasLoc = true
  }

  return (
    <div className="row">
      <div className="stay">{`${data.exif.make}, ${data.exif.model}`}</div>
      {hasLoc && (
        <div className="go-right"><a href={`https://www.google.com/maps/place/${exifLat[0]}°${exifLat[1]}'${exifLat[2]}"${exifLatRef}+${exifLong[0]}°${exifLong[1]}'${exifLong[2]}"${exifLongRef}`} className="location-link" target="_blank">Locatie</a></div>
      )}
    </div>
  )
}

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((_event, { index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setViewerIsOpen(false);
  };

  const imageRenderer = useCallback(({ index, key, photo, onClick }) => {
    return (
      <div className="LazyLoad img-lazy" style={{ width: photo.width, height: photo.height }} key={'p-' + index}>
        <LazyLoad
          height={photo.height}
          once
          debounce={200}
          key={key}
        >
          <RenderImage photo={photo} index={index} onClick={onClick} />
        </LazyLoad>
      </div>
    )
  }, []);

  const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10);

  return (
    <div>
      <Head title="Jurre de Jongh" description={`Een ${getAge('1997-09-26')} jarige Software Engineer.`} />

      <div className="fullscreen">
        <div className="information">
          <div className="image">
            <img src="/04-2020/photo.jpg" alt="Profielfoto" className="profile" />
            <img src="/04-2020/photo.svg" alt="Profielfoto" className="profile-svg" />
          </div>
          <div className="details">
            <div className="title">Jurre de Jongh</div>
            <div className="description">
              <span>Software Engineer</span>
              <div className="socials">
                <a href="https://linkedin.com/in/jurre-de-jongh" target="_blank" className="social-link">
                  <svg className="social" fill="#0077B5" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
                <a href="https://github.com/gkdp" target="_blank" className="social-link">
                  <svg className="social" fill="#181717" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                </a>
                <a href="https://keybase.io/dastin" target="_blank" className="social-link" style={{ display: 'none' }}>
                  <svg className="social" fill="#33A0FF" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Keybase</title><path d="M10.446 21.371c0 .528-.428.953-.954.953-.525 0-.954-.425-.954-.953 0-.526.428-.954.953-.954.524 0 .951.431.951.955m5.922-.001c0 .528-.428.953-.955.953-.526 0-.952-.425-.952-.953 0-.526.423-.954.949-.954s.954.431.954.955M20.904 12.213l-.156-.204c-.046-.06-.096-.116-.143-.175-.045-.061-.094-.113-.141-.169-.104-.12-.209-.239-.319-.359l-.076-.08-.091-.099-.135-.131c-.015-.018-.032-.034-.05-.053-1.16-1.139-2.505-1.986-3.955-2.504l-.23-.078c.012-.027.024-.055.035-.083.41-1.064.367-2.223-.12-3.255-.491-1.035-1.356-1.8-2.438-2.16-.656-.216-1.23-.319-1.711-.305-.033-.105-.1-.577.496-1.848L10.663 0l-.287.399c-.33.455-.648.895-.945 1.328-.328-.345-.766-.552-1.245-.58L6.79 1.061h-.012c-.033-.003-.07-.003-.104-.003-.99 0-1.81.771-1.87 1.755l-.088 1.402v.003c-.061 1.029.727 1.915 1.755 1.979l1.002.061c-.065.84.073 1.62.405 2.306-1.346.562-2.586 1.401-3.66 2.484C.913 14.391.913 18.051.913 20.994v1.775l1.305-1.387c.266.93.652 1.807 1.145 2.615H5.06c-.833-1.114-1.419-2.426-1.68-3.848l1.913-2.03-.985 3.091 1.74-1.268c3.075-2.234 6.744-2.75 10.91-1.529 1.805.532 3.56.039 4.473-1.257l.104-.165c.091.498.141.998.141 1.496 0 1.563-.255 3.687-1.38 5.512h1.611c.776-1.563 1.181-3.432 1.181-5.512-.001-2.199-.786-4.421-2.184-6.274zM8.894 6.191c.123-1.002.578-1.949 1.23-2.97.025.05.054.097.084.144.264.398.713.625 1.199.605.217-.008.605.025 1.233.232.714.236 1.286.744 1.608 1.425s.349 1.442.079 2.149c-.173.445-.454.82-.806 1.109l-.408-.502-.002-.003c-.279-.341-.694-.535-1.134-.535-.335 0-.664.117-.925.33-.334.27-.514.66-.534 1.058-1.2-.541-1.8-1.643-1.628-3.041l.004-.001zm4.304 5.11l-.519.425c-.046.036-.095.053-.146.053-.066 0-.133-.03-.177-.085l-.111-.135c-.083-.1-.067-.25.034-.334l.51-.42-1.055-1.299c-.109-.133-.091-.33.044-.436.058-.048.126-.072.194-.072.091 0 .181.038.24.113l2.963 3.645c.109.135.09.33-.042.436-.039.029-.082.053-.126.063-.023.006-.045.009-.07.009-.09 0-.178-.04-.24-.113l-.295-.365-1.045.854c-.046.037-.1.055-.154.055-.068 0-.139-.03-.186-.09l-.477-.579c-.082-.102-.068-.252.035-.336l1.051-.857-.426-.533-.002.001zM7.753 4.866l-1.196-.075c-.255-.015-.45-.235-.435-.488l.09-1.401c.014-.245.216-.436.461-.436h.024l1.401.091c.123.006.236.06.317.152.083.094.123.21.116.336l-.007.101c-.32.567-.585 1.134-.773 1.72h.002zm12.524 11.481c-.565.805-1.687 1.081-2.924.718-3.886-1.141-7.396-.903-10.468.701l1.636-5.123-5.291 5.609c.099-3.762 2.453-6.966 5.758-8.311.471.373 1.034.66 1.673.841.16.044.322.074.48.102-.183.458-.119.997.21 1.407l.075.09c-.172.45-.105.975.221 1.374l.475.582c.266.325.659.513 1.079.513.321 0 .635-.111.886-.314l.285-.232c.174.074.367.113.566.113.113 0 .222-.01.33-.035.218-.05.424-.15.598-.291.623-.51.72-1.435.209-2.06l-1.67-2.056c.145-.117.281-.244.408-.381.135.037.271.078.4.12.266.097.533.198.795.315 1.005.445 1.954 1.1 2.771 1.897.029.03.059.055.085.083l.17.175c.038.039.076.079.111.12.079.085.16.175.239.267l.126.15c.045.053.086.104.13.16l.114.15c.04.051.079.102.117.154.838 1.149.987 2.329.404 3.157v.005zM7.719 4.115l-.835-.051.053-.835.834.051-.052.835z"/></svg>
                </a>
                <a href="https://medium.com/@dastint" target="_blank" className="social-link">
                  <svg className="social" fill="#12100E" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Medium</title><path d="M0 0v24h24V0H0zm19.938 5.686L18.651 6.92a.376.376 0 0 0-.143.362v9.067a.376.376 0 0 0 .143.361l1.257 1.234v.271h-6.322v-.27l1.302-1.265c.128-.128.128-.165.128-.36V8.99l-3.62 9.195h-.49L6.69 8.99v6.163a.85.85 0 0 0 .233.707l1.694 2.054v.271H3.815v-.27L5.51 15.86a.82.82 0 0 0 .218-.707V8.027a.624.624 0 0 0-.203-.527L4.019 5.686v-.27h4.674l3.613 7.923 3.176-7.924h4.456v.271z"/></svg>
                </a>
                <a href="https://bunq.me/jurre" target="_blank" className="social-link" style={{ marginTop: -1 }}>
                  <svg className="social" fill="#33A0FF" role="img" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title>Buy Me A Coffee</title><g><path fill="#000" d="M139.3 67.3a94.83 94.83 0 0 1-26.4-53.5A16.11 16.11 0 0 0 96.8 0H80.4a16.31 16.31 0 0 0-16.3 18 145.36 145.36 0 0 0 40.6 84.4 81.22 81.22 0 0 1 22.4 44.1 16.23 16.23 0 0 0 16 13.5h16.5c9.8 0 17.6-8.5 16.3-18a130.72 130.72 0 0 0-36.6-74.7zM287.9 142a130.72 130.72 0 0 0-36.6-74.7 94.83 94.83 0 0 1-26.4-53.5A16.11 16.11 0 0 0 208.8 0h-16.4c-9.8 0-17.5 8.5-16.3 18a145.36 145.36 0 0 0 40.6 84.4 81.22 81.22 0 0 1 22.4 44.1 16.23 16.23 0 0 0 16 13.5h16.5c9.8 0 17.6-8.5 16.3-18z" opacity="0.4"></path><path fill="#000" d="M400 192H32a32 32 0 0 0-32 32v192a96 96 0 0 0 96 96h192a96 96 0 0 0 96-96h16a112 112 0 0 0 0-224zm0 160h-16v-96h16a48 48 0 0 1 0 96z"></path></g></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-helper">
          <div className="links">
            <a href="#photos" onClick={(e) => { e.preventDefault(); scrollElementIntoView(document.getElementById("photos"), 'smooth') }} className="link">
              <span>Foto's</span>
            </a>
          </div>
        </div>

        {/* <div className="scroll-helper">Scroll omlaag</div> */}
      </div>

      <div className="fullscreen lighter" style={{ display: 'none' }}>
        <div className="fullscreen-inner">
          <div className="halve">
            <h1>Over mij</h1>

            <div className="text">
              Ik ben Jurre, een {getAge('1997-09-26')} jarige software engineer die op het moment aan het afstuderen is bij Topicus Zorg. Hiervoor heb ik opdrachten gedaan voor onder andere de Politie, NS en Tenzer.
            </div>
          </div>

          <div className="halve">
            <h1>Links</h1>

            <div className="text">
              <a href="mailto:ik@jur.re">Contact</a>
              <a href="https://solestium.nl" target="_blank">Solestium</a>
            </div>
          </div>
        </div>
      </div>

      <div className="divider" id="photos"></div>

      <Async promiseFn={loadPhotos}>
        {({ data, err, isLoading }) => {
          if (isLoading || err) {
            return <div></div>
          }

          return <div className="gallery">
            <Gallery
              photos={data || []}
              onClick={openLightbox}
              renderImage={imageRenderer}
            />

            {viewerIsOpen ? (
              <Lightbox
                mainSrc={data[currentImage].src.replace('thumbnail', 'processed')}
                onCloseRequest={closeLightbox}
                nextSrc={data[(currentImage + 1) % data.length].src.replace('thumbnail', 'processed')}
                prevSrc={data[(currentImage + data.length - 1) % data.length].src.replace('thumbnail', 'processed')}
                onMovePrevRequest={() => setCurrentImage((currentImage + data.length - 1) % data.length)}
                onMoveNextRequest={() => setCurrentImage((currentImage + 1) % data.length)}
                imageTitle={RenderTitle(data[currentImage])}
                imageCaption={RenderCaption(data[currentImage])}
              />
            ) : null}
          </div>
        }}
      </Async>

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

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .content {
          color: #676767;
          padding-top: 1rem;
          font-size: 1.1rem;
          letter-spacing: 1px;
        }

        .fullscreen {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        .fullscreen.lighter {
          padding: 5rem;
          height: auto;
          border-top: 1px solid #f2f2f2;
          border-bottom: 1px solid #f2f2f2;
          margin-bottom: 5rem;
        }

        .fullscreen .fullscreen-inner {
          background: #ebfdff;
          width: 75%;
          height: 100%;
          display: flex;
        }

        .divider {
          height: auto;
          border-top: 1px solid #f2f2f2;
          margin-bottom: 5rem;
        }

        @keyframes fadeInImg {
          from {
            opacity: 0
          }
          to {
            opacity: 1
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
          transition: all .4s;
        }

        .img-lazy:hover .img-hover {
          opacity: 1;
        }
      `}</style>
      <style jsx>{`
        .information {
          display: flex;
        }

        .bottom-helper {
          position: absolute;
          bottom: 2rem;
          font-size: 14px;
          color: #dbdbdb;
        }

        .scroll-helper {
          position: absolute;
          bottom: 2rem;
          font-size: 14px;
          pointer-events: none;
        }

        .links {
          display: flex;
          color: #dbdbdb;
        }

        .links .link {
          color: #dbdbdb;
          text-decoration: none;
        }

        .links .link:hover {
          opacity: 0.7;
        }

        .links .link:hover span {
          text-decoration: underline;
        }

        .halve {
          flex: 0 0 50%;
          padding: 2rem;
        }

        .halve h1 {
          padding: 0;
          margin: 0;
          margin-bottom: 1rem;
          font-family: Catamaran, Nunito, sans-serif;
          font-weight: 700;
          font-size: 42px;
          color: #444;
        }

        .halve .text {
          font-size: 18px;
          color: #444;
        }

        .halve .text a {
          text-decoration: none;
          color: #444;
          transition: all .2s;
          display: block;
        }

        .halve .text a:hover {
          text-decoration: underline;
          color: #666;
        }

        .about-me {
          width: 100%;
          max-width: 400px;
          position: relative;
          display: none;
        }

        .about-me .text {
          position: absolute;
          margin-top: 50px;
          text-align: center;
          font-size: 14px;
          width: 100%;
          color: #909090;
        }

        a.social-text {
          text-decoration: none;
          color: #ddd;
          font-size: 12px;
        }

        .gallery {
          padding: 2px 2px calc(5rem + 2px);
          margin: 0 5rem;
          margin-top: 0;
        }

        .image {
          margin-right: 2rem;
          align-self: center;
          position: relative;
        }

        .image img {
          width: 100px;
          border-radius: 100%;
          display: block;
        }

        .profile-svg {
          opacity: 0;
          transition: all 0.5s;
          position: absolute;
          top: 0;
        }

        .profile-svg:hover {
          opacity: 1;
        }

        .details {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .description {
          color: #ababab;
          font-size: 18px;
        }

        .socials {
          margin-top: .5rem;
          display: flex;
        }

        .social-link {
          margin-right: .6rem;
          display: inline-flex;
        }

        .social {
          width: 17px;
          height: 17px;
        }

        .social:hover {
          opacity: 0.7;
        }

        .title {
          line-height: 1.1;
          font-size: 2.5rem;
          text-align: center;
        }

        @media (max-width: 1092px) {
          .fullscreen .fullscreen-inner {
            width: 100%;
            flex-wrap: wrap;
          }

          .halve:last-child {
            border-top: 2px solid #fff;
          }
        }

        @media (max-width: 768px) {
          .information {
            flex-direction: column;
            align-items: center;
          }

          .image {
            margin-right: 0;
            margin-bottom: 1rem;
          }

          .description {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .socials .social-link {
            margin-left: 5px;
            margin-right: 5px;
          }

          .fullscreen.lighter {
            padding: 4px 4px 2px;
            margin-bottom: 0;
            border-top: 0;
            border-bottom: 0;
            height: auto;
          }

          .halve {
            flex: 0 0 100%;
          }

          .gallery {
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
