import React from 'react'
import Head from '../components/head'

const Home = () => {
  const getAge = (birthDate) =>
    Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10)

  return (
    <div>
      <Head
        title="Jurre de Jongh"
        description={`Een ${getAge('1997-09-26')} jarige Software Engineer.`}
      />

      <div className="header">
        <div className="information">
          <div className="image">
            <img
              src="/04-2020/photo-300.jpg"
              alt="Profielfoto"
              className="profile"
            />
            <img
              src="/04-2020/photo.svg"
              alt="Profielfoto"
              className="profile-svg"
            />
          </div>

          <div className="details">
            <div className="title">Jurre de Jongh</div>
            <div className="description">
              <span>Software Engineer</span>
            </div>
          </div>
        </div>
      </div>

      <div className="link">
        <a href="/">
          Home
        </a>
      </div>

      <div
        style={{
          borderTop: '1px solid #f2f2f2',
          maxWidth: 300,
          margin: '0 auto',
        }}
      ></div>

      <div className="container">
        <div className="trail">
          <div
            className="trail-image"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0, 0, 0, 0.3) 0px, rgba(0, 0, 0, 0) 70px, rgba(0, 0, 0, 0) 100%), url(https://d29l31asz84kwp.cloudfront.net/route/7CB67CB8C276116EB8F1A33787DC7C15.jpg)',
            }}
          ></div>
          <div className="trail-content">
            <div className="trail-title">Holtingerveld - Oorlogspad</div>
            <div className="trail-length">
              Lengte: <strong>8,9km</strong> &#183; Gem hartslag:{' '}
              <strong>111bpm</strong>
            </div>
            <div className="trail-komoot">
              <a href="https://www.komoot.nl/tour/308158214" target="_blank">
                Komoot
              </a>
            </div>
          </div>
        </div>

        <div className="trail">
          <div
            className="trail-image"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0, 0, 0, 0.3) 0px, rgba(0, 0, 0, 0) 70px, rgba(0, 0, 0, 0) 100%), url(https://d29l31asz84kwp.cloudfront.net/route/8B287952DBD80B7ABC12D8AB208FC1BB.jpg)',
            }}
          ></div>
          <div className="trail-content">
            <div className="trail-title">Radio Kootwijk</div>
            <div className="trail-length">
              Lengte: <strong>12,5km</strong> &#183; Gem hartslag:{' '}
              <strong>114bpm</strong>
            </div>
            <div className="trail-komoot">
              <a href="https://www.komoot.nl/tour/307309909" target="_blank">
                Komoot
              </a>
            </div>
          </div>
        </div>

        <div className="trail">
          <div
            className="trail-image"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0, 0, 0, 0.3) 0px, rgba(0, 0, 0, 0) 70px, rgba(0, 0, 0, 0) 100%), url(https://d29l31asz84kwp.cloudfront.net/route/D8BB968A0B101DCCC41F868853198890.jpg)',
            }}
          ></div>
          <div className="trail-content">
            <div className="trail-title">Archemerberg</div>
            <div className="trail-length">
              Lengte: <strong>6,8km</strong> &#183; Gem hartslag:{' '}
              <strong>114bpm</strong>
            </div>
            <div className="trail-komoot">
              <a href="https://www.komoot.nl/tour/307309908" target="_blank">
                Komoot
              </a>
            </div>
          </div>
        </div>
      </div>

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
      <style jsx>{`
        .link {
          display: flex;
          padding-bottom: 1rem;
        }

        .link a {
          color: #4299e1;
          text-decoration: none;
          margin: 0 auto;
        }
        .link a:hover {
          color: #2b7bbd;
          text-decoration: underline;
        }

        .trail {
          // box-shadow: 0 8px 16px 0 rgba(0,0,0,.08);
          border-radius: 8px;
          display: flex;
          border: 1px solid #f2f2f2;
        }

        .trail ~ .trail {
          margin-top: 2rem;
        }

        .trail-content {
          padding: 1rem;

          flex: 1;
          justify-content: center;
          flex-direction: column;
          display: flex;
        }

        .trail-title {
          font-size: 1.5rem;
          font-weight: bold;
        }

        .trail-length {
          color: #6f6f6f;
        }

        .trail-komoot {
          margin-top: 0.25rem;
        }

        .trail-komoot a {
          color: #4299e1;
          text-decoration: none;
        }
        .trail-komoot a:hover {
          color: #2b7bbd;
          text-decoration: underline;
        }

        .trail-image {
          background-color: rgb(101, 96, 92);
          background-image: linear-gradient(
              rgba(0, 0, 0, 0.3) 0px,
              rgba(0, 0, 0, 0) 70px,
              rgba(0, 0, 0, 0) 100%
            ),
            url(https://cdn-assets.alltrails.com/uploads/photo/image/33071616/large_5b9b2bee5739f66ab5a7301cfbd4b144.jpg);
          background-repeat: no-repeat;
          background-position: center center;
          background-size: cover;

          height: 128px;
          min-height: 128px;

          width: 275px;
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
        }
      `}</style>
      <style jsx>{`
        .header {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 2rem 0;
        }

        .information {
          display: flex;
        }

        .image {
          margin-right: 2rem;
          align-self: center;
          position: relative;
        }

        .image img {
          width: 75px;
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
          font-size: 16px;
        }

        .title {
          line-height: 1.1;
          font-size: 1.5rem;
          text-align: center;
        }

        .container {
          max-width: 800px;
          margin: 2rem auto 0;
          padding: 0 1.5rem;
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
        }
      `}</style>
    </div>
  )
}

export default Home
