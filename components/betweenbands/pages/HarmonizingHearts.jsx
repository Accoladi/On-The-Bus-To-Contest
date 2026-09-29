// Article 3
import React, { useCallback, useState } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import "../styles/article.css";
import Ad from '../Ad';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const maxWidth = 1500;

const PDFFile = '/pdfs/Articles/harmonizing hearts.pdf'; // 

export default function HarmonizingHearts() {
  const [numPages, setNumPages] = useState(null);
  const [containerRef, setContainerRef] = useState(null);
  const [containerWidth, setContainerWidth] = useState(null);

  const onResize = useCallback((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, {}, onResize);

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  return (
    <div className="card">
      <div className="image-container">
        <div className="overlay"></div>
        <img src="/images/fan-etiquette.jpg" alt="Image description" className="cropped-image"></img>
        <div className="image-text">Harmonizing Hearts: The Inspiring Role of the Audience</div>
      </div>
      <div className="Home__container" ref={setContainerRef}>
        <div className='article-border'>
          <div className='article-container'>

            <div className='paragraphwimage'>
              <img src={'images/harmonizing-hearts/hh-1.png'}></img>
              <p className='articles-paragraph'>
                One of the most exhilarating aspects of a
                marching band contest lies in the boundless
                energy of the audience. This diverse gathering of
                spectators brings with them a myriad of
                motivations, yet they share two profound
                commonalities: an unwavering desire to savor
                the complete experience and a heartfelt
                commitment to uplift the performers.
              </p>
              <p className='articles-paragraph'>
                In this vibrant tapestry of enthusiasts, you are
                called upon to be the true conductor of unity
                and support. Your role is to champion all the
                bands, to ignite applause that reverberates through the very soul of the competition, and to
                join in a resounding cheer as the grand finale crescendos.
              </p>
            </div>

            <div id='etiquette-container'>
              <div id='etiquette' style={{ backgroundImage: `url(/images/ad-square-background.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div id='etiquette-content'>
                  <h4>Support all bands by applauding/cheering at
                    high performance points and at show finale.</h4>
                  <h5>Be respectful of all other spectators by:</h5>
                  <ul id='etiquette-list'>
                    <li>-Not talking during performance</li>
                    <li>-Not talking on cell phones</li>
                    <li>-Turning off cell phones</li>
                    <li>-Not allow children to play in the stands</li>
                    <li>-Not obstructing the view of others. (Especially if you have flags, signs,
                      banners)</li>
                    <li>-Not going to the bathroom or snack bar
                      during a performance</li>
                    <li>-Never making negative comments about
                      other bands</li>
                    <li>-Never booing -Never approach judges with questions or
                      concerns</li>
                    <li>-Never play games or read
                      BetweenBands.org while a band is
                      performing</li>
                    <li>-Thank event sponsors and volunteers</li>
                  </ul>
                </div>
              </div>
              <div id='etiquette-paragraph'>

                <p className='articles-paragraph'>
                  Amidst this harmonious symphony of
                  camaraderie, let your conduct be a
                  reflection of respect for your fellow
                  spectators. Honor the sacred silence during
                  performances, let your cell phones rest in
                  hushed reverence, and allow the
                  uninterrupted flow of artistic expression to
                  captivate your senses. Shield the view of
                  others from obstructions, mindful that the
                  vibrancy of your flags, signs, or banners
                  does not eclipse the brilliance on the field.
                  Refrain from deserting your post for
                  bathroom breaks or snacks during a
                  performance, for these moments are
                  fleeting, and every note is a treasure.
                </p>
                <p className='articles-paragraph'>
                  In this orchestra of collective support,
                  negativity and discord find no place. Let
                  your words be a soothing melody of
                  encouragement, and banish any thought of
                  booing to the furthest reaches of your
                  heart. Instead, let your applause and
                  cheers be the ovation that echoes across
                  the ages.
                </p>
              </div>
            </div>


            <p className='articles-paragraph'>
              And when questions or concerns arise, remember
              that the judges are the impartial arbiters of this
              musical odyssey. Resist the temptation to approach
              them, for the beauty of their judgment lies in its
              detachment.
            </p>

            <p className='articles-paragraph'>
              Lastly, let your gratitude resound like a triumphant
              crescendo. Offer thanks to the tireless event
              sponsors and the dedicated volunteers who make
              this spectacle possible. They are the unsung heroes
              behind the scenes, ensuring that the music of unity
              and harmony fills the air.
            </p>

            <p className='articles-paragraph'>
              In the grand overture of a marching band contest, you, the audience, hold the power to
              elevate the experience into an unforgettable symphony of support and togetherness.
              Embrace this role with unwavering dedication, and let your presence be a testament to the
              enduring spirit of musical camaraderie.
            </p>

          </div>

          <div className='article-container-2'>
            <a href="https://www.mymusicfuture.com/" target='_blank'>
              <img src="../../../images/mmf-2.jpg" alt="My Music Future promotion" style={{ width: '100%' }} />
            </a>

          </div>
        </div>

      </div>
      <Ad></Ad>
    </div>
  );
}
