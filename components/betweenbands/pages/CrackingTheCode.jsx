// Article 10
import React, { useCallback, useState } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import "../styles/article.css";
import Ad from '../Ad';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

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

  return (
    <div className="card">
      <div className="image-container" style={{ backgroundPosition: 'center top' }} >
        <div className="overlay"></div>
        <img src="/images/crackcodes-3.png" alt="Image description" className="cropped-image" loading="lazy"></img>
        <div className="image-text">Cracking the Code: How Marching Bands Win Big</div>
      </div>
      <div className="Home__container" ref={setContainerRef}>
        <div className='article-border'>
          <div className='article-container'>
            <div id='cc-post-border'>
              <p id="post-title"><b>Cracking the Code: How Marching Bands Win Big</b></p>
              <div className='left-image-cc'>
                <div className='article-image-cc'>
                  <img src="/images/crackcodes-1.png" alt="Band Dad" width={'300px'} height={'200px'}></img>
                </div>
                <div className='text-container'>
                  <p>
                    As we delve into the world of marching band competitions, let's unravel the mystery
                    behind how these spectacular performances are scored. Whether you're a fan of music
                    or simply curious, understanding the evaluation process adds a layer of appreciation
                    to the hard work that goes into each show.
                  </p>
                </div>
              </div>

              <div className='left-image-cc'>
                <div className='text-container'>
                  <p id="post-body-title"><b>The Scoring System</b></p>
                  <p>
                    At a marching band competition, every ensemble faces the scrutiny of judges
                    who assess their performance based on several key criteria: music, marching,
                    and general effect.<br></br>The aims to achieve exllence in each area.
                  </p>
                  <div className='crackcode-bp'>
                    <p>
                      <b>• Music Performance: </b>This category zeroes in on the quality of the music itself.
                      Judges listen for elements like tone, intonation, balance, and phrasing.
                      It's all about creating a harmonious auditory experience.
                    </p>
                    <p>
                      <b>• Marching and Maneuvering: </b>Precision is the name of the game here.
                      Judges watch for coordinated movements, from marching in perfect step to intricate
                      formations on the field. Unity and synchrony are crucial.
                    </p>
                    <p>
                      <b>• General Effect: </b> This category is all about the 'wow' factor.
                      Judges assess the visual and musical impact of the performance, looking for creativity,
                      emotional resonance, <br></br>and entertainment value.
                    </p>
                  </div>
                </div>
                <div className='article-image-cc'>
                  <img src="/images/crackcodes-2.png" alt="Band Dad" width={'400px'} height={'500px'}></img>
                </div>
              </div>

              <div className='text-container'>
                <p>
                  <b>The Math Behind the Scores</b><br></br>
                  Scoring is typically done on a scale of 1 to 30 for each category,
                  totaling 90 points in most cases. Some competitions, however, use a 100-point system.
                  In this scenario, the breakdown adjusts slightly: 1-30 points <br></br>for musical performance,
                  1-30 for marching and maneuvering, and a maximum of 40 points for general effect.
                  Add up these scores to determine the band's total score, which ultimately determines their ranking.
                </p>
              </div>

              <div className='left-image-cc'>
                <div className='article-image-cc'>
                  <img src="/images/crackcodes-3.png" alt="Band Dad" width={'300px'} height={'200px'}></img>
                </div>
                <div className='text-container'>
                  <p>
                    <b>Subjectivity in Scoring</b>
                  </p>
                  <p>
                    Here's the interesting part: scoring is subjective. Different judges may<br></br>have
                    varying preferences and opinions. Bands aren't necessarily<br></br>competing head-to-head;
                    they're striving to meet a standard of<br></br>exllence set by the judges.
                  </p>
                </div>
              </div>

              <div className='left-image-cc'>
                <div className='text-container'>
                  <p id="crackcode-pg">
                    <b>The Bigger Picture</b><br></br>
                    While winning is exhilarating, it's vital to remember that the ultimate goal<br></br>
                    is to deliver a captivating performance for the audience. Competitions are just
                    one aspect of this artistic journey. The hard work, dedication, and unity displayed
                    by this year's bands promise to make each show a meaningful and entertaining experience.
                    With that spirit, trophies are well within reach.
                  </p>
                </div>
                <div className='article-image-cc'>
                  <img src="/images/crackcodes-4.png" alt="Band Dad" width={'300px'} height={'200px'}></img>
                </div>
              </div>

            </div>
          </div>
          <div className='cc-btm-img'>
            <a className='nsma-add-link' href='https://www.nationalscholasticmusiciansawards.com/home' target='_blank'>
              <img className="cracking-the-code-img" src="/images/crackcodes-5.png" alt="Band Dad"></img>
            </a>

          </div>

          <div className='article-btm-cc'>
            <a className='nsma-add-link' href='https://www.nationalscholasticmusiciansawards.com/home' target='_blank'>
              <p>Check Out</p>
              <br></br>
              <p>NationalScholasticMusiciansAwards.com</p>
            </a>
          </div>

        </div>
      </div>
      <Ad></Ad>
    </div>
  );
}
