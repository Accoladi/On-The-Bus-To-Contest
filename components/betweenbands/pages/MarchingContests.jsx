//ARTICLE 12

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


export default function MarchingContests() {
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
        <img src="/images/marching-contests.jpg" alt="Image description" className="cropped-image"></img>
        <div className="image-text">Marching Contests: Where More than Music Takes Flight</div>
      </div>

      <div className="Home__container" ref={setContainerRef}>
        <div className='article-border'>
          <div className='article-container'>

            <p>
              Across the nation, football stadiums awaken to the resonant melodies and vibrant
              performances of high school marching bands. As we hear the warm-ups of the bands in the
              distance and the audience gathers, something extraordinary unfolds on the field. It's a
              phenomenon fueled by passion, determination, and a quest for something far greater than a trophy.
            </p>

            <div className='paragraphleftimage'>
              <img src={'/images/mc1.png'}></img>
              <h1 className='style-h3'>A Symphony of Dedication</h1>

              <p className='articles-paragraph'>
                Saturday after Saturday, these young musicians take the
                stage, each note and step a testament to their unwavering
                commitment. Behind the scenes, they've surrendered summer
                vacations to the relentless heat of July, honing their craft in
                marching band camps. Their dedication is palpable, and it is
                on that stage where their hard work blooms, as they perform
                before an audience and receive invaluable feedback from judges.
              </p>

              <h1 className='style-h3'>Beyond The Win</h1>
              <p className='articles-paragraph'>
                While victory is a worthy aspiration, marching contests transcend the pursuit of a trophy.
                They challenge these band members to reach deep within themselves, to stretch their
                boundaries, and to aim for nothing less than excellence. It's not about competing
                with other bands; it's a personal journey of growth and self-discovery, a quest to evolve
                continuously as musicians and performers.
              </p>
            </div>
            <br></br>

            <div className='paragraphwimage'>
              <img src={'/images/mc2.png'}></img>
              <h1 className='style-h3'>A Harmonious Classroom</h1>

              <p className='articles-paragraph'>
                Within the contests' dynamic arena, these young
                musicians find classrooms without walls. They become
                eager learners, observing the diverse techniques and
                styles of their fellow bands and musicians.
                In this exchange of creativity, inspiration ignites like wildfire,
                forming connections that extend beyond the competition.
                Bonds are forged, friendships are born, and a sense of camaraderie weaves its magic.
              </p>

              <h1 className='style-h3'>The Anthem of Pride</h1>
              <p className='articles-paragraph'>
                Participating in marching contests illuminates their program's reputation, instilling pride in
                each student and their community. They proudly display their skills and talents on a grand
                stage, epitomizing the strength and unwavering commitment of their program. Through this,
                they champion the importance of music education.
              </p>
            </div>



            <div className='paragraphleftimage'>
              <img src={'/images/mc3.png'}></img>
              <h1 className='style-h3'>A Crescendo of Success</h1>
              <p className='articles-paragraph'>
                These contests aren't mere battles; they are celebrations of dedication, artistry, and unity.
                They are where music transcends boundaries, and bonds forged in the rhythm of the march
                extend far beyond the field.
              </p>
              <p className='articles-paragraph'>
                So, let us stand together today with open hearts and eager
                spirits. Let us raise our voices in thunderous applause for
                these marching musicians as they create stirring melodies,
                forge unbreakable connections, and elevate their programs to
                breathtaking new heights. In their music, we find inspiration,
                and in their journey, we find the very essence of unity and triumph.
              </p>
            </div>
          </div>
          <div className='cc-btm-img'>
            <a href='https://www.accoladi.com/' target='_blank'>
              <img className='marching-contests-ad' src="/images/border.png" alt="Image description"></img>
            </a>
          </div>
        </div>
      </div>

      <Ad></Ad>
    </div>
  );
}
