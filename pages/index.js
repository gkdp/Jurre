import React, { useCallback, useState } from 'react';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-image-lightbox';
import LazyLoad from 'react-lazyload';
import Head from '../components/head';
import Form from '../components/form';
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
          debounce={0}
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
            <img src="/04-2020/photo-300.jpg" alt="Profielfoto" className="profile" />
            <img src="/04-2020/photo.svg" alt="Profielfoto" className="profile-svg" />
          </div>
          <div className="details">
            <div className="title">Jurre de Jongh</div>
            <div className="description">
              <span>Software Engineer</span>
              <div className="socials">
                <a href="https://linkedin.com/in/jurre-de-jongh" target="_blank" className="social-link" rel="noopener" title="LinkedIn">
                  <svg className="social" fill="#0077B5" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
                <a href="https://github.com/gkdp" target="_blank" className="social-link" rel="noopener" title="GitHub">
                  <svg className="social" fill="#181717" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                </a>
                <a href="https://medium.com/@dastint" target="_blank" className="social-link" rel="noopener" title="Medium">
                  <svg className="social" fill="#12100E" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0v24h24V0H0zm19.938 5.686L18.651 6.92a.376.376 0 0 0-.143.362v9.067a.376.376 0 0 0 .143.361l1.257 1.234v.271h-6.322v-.27l1.302-1.265c.128-.128.128-.165.128-.36V8.99l-3.62 9.195h-.49L6.69 8.99v6.163a.85.85 0 0 0 .233.707l1.694 2.054v.271H3.815v-.27L5.51 15.86a.82.82 0 0 0 .218-.707V8.027a.624.624 0 0 0-.203-.527L4.019 5.686v-.27h4.674l3.613 7.923 3.176-7.924h4.456v.271z"/></svg>
                </a>
                <a href="https://bunq.me/jurre" target="_blank" className="social-link" rel="noopener" title="Donneer een koffie" style={{ marginTop: -1 }}>
                  <svg className="social" fill="#33A0FF" role="img" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g><path fill="#000" d="M139.3 67.3a94.83 94.83 0 0 1-26.4-53.5A16.11 16.11 0 0 0 96.8 0H80.4a16.31 16.31 0 0 0-16.3 18 145.36 145.36 0 0 0 40.6 84.4 81.22 81.22 0 0 1 22.4 44.1 16.23 16.23 0 0 0 16 13.5h16.5c9.8 0 17.6-8.5 16.3-18a130.72 130.72 0 0 0-36.6-74.7zM287.9 142a130.72 130.72 0 0 0-36.6-74.7 94.83 94.83 0 0 1-26.4-53.5A16.11 16.11 0 0 0 208.8 0h-16.4c-9.8 0-17.5 8.5-16.3 18a145.36 145.36 0 0 0 40.6 84.4 81.22 81.22 0 0 1 22.4 44.1 16.23 16.23 0 0 0 16 13.5h16.5c9.8 0 17.6-8.5 16.3-18z" opacity="0.4"></path><path fill="#000" d="M400 192H32a32 32 0 0 0-32 32v192a96 96 0 0 0 96 96h192a96 96 0 0 0 96-96h16a112 112 0 0 0 0-224zm0 160h-16v-96h16a48 48 0 0 1 0 96z"></path></g></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-helper">
          <div className="links">
            <a href="#photos" onClick={(e) => { e.preventDefault(); scrollElementIntoView(document.getElementById('photos'), 'smooth') }} className="link">
              <span>Foto's</span>
            </a>

            <a href="https://blog.jur.re" className="link">
              <span>Blog</span>
            </a>

            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollElementIntoView(document.getElementById('contact'), 'smooth') }} className="link">
              <span className="bold">Contact</span>
            </a>
          </div>
        </div>
      </div>

      <div className="divider" id="contact"></div>

      <div className="contact">
        <div className="section-title">Contact</div>

        <Form />
      </div>

      <div className="divider" id="photos"></div>

      <Async promiseFn={loadPhotos}>
        {({ data, err, isLoading }) => {
          if (isLoading || err) {
            return <div></div>
          }

          return (
            <div className="gallery">
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
          )
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
          color: #c7c7c7;
        }

        .links .link {
          color: #c7c7c7;
          text-decoration: none;
        }

        .links .link ~ .link {
          margin-left: .75rem;
        }

        .links .link:hover {
          opacity: 0.7;
        }

        .links .link:hover span {
          text-decoration: underline;
        }

        .contact {
          max-width: 500px;
          margin: 0 auto;
          margin-bottom: 5rem;
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

        .section-title {
          line-height: 1.1;
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 1rem;
        }

        .bold {
          color: #ababab;
          font-weight: bold;
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

          .contact {
            padding-right: 1.5rem;
            padding-left: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
