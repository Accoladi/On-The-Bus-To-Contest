// Article 1
import React, { useCallback, useState } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import "../styles/article.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const maxWidth = 1500;




export default function WhoAreTheseBandMembers() {
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
        <img src="/images/who-are-band-members.png" alt="Image description" className="cropped-image"></img>
        <div className="image-text">Marching Band: A Fusion of Sport and Performance Art</div>
      </div>
      <div className="Home__container" ref={setContainerRef}>
        <div className='article-border'>
          <div className='article-container'>

            <p>
              As the bands march proudly across the field, captivating
              our hearts with their dedication to excellence, it becomes
              evident that there's more to these performers than their
              musical prowess. With over forty years of research and
              analysis, the present and future of these young musicians
              have been meticulously documented. Here, we unveil the
              remarkable highlights
            </p>


            <h2>1. The Heartbeat of Enthusiasm</h2>
            <div className='left-image'>
              <div className='article-image'>
                <img src="/images/A-Symphony-Of-Support/ASOS-img1.png" alt="Band Dad" width={'250px'}></img>
              </div>

              <div className='text-container'>
                <p>
                  At the core of every great band parent is boundless enthusiasm. They dive headfirst into their child's band journey and champion the entire program. Whether it's attending performances, cheering from the sidelines at competitions, or fervently advocating for the band in the community, they're the band's most ardent supporters.
                </p>
              </div>
            </div>

            <div className='right-image'>
              <div className='text-container'>
                <p>
                  <h2>2. The Dedication Dynamo</h2>
                  Being a band parent isn't just a label; it's a commitment, especially during the electrifying marching season. Great band parents roll up their sleeves, dedicating their time and effort to bolster their child and the band program. This may entail volunteering at fundraisers, supervising trips, or lending a hand with the intricacies of performances and competitions.
                </p>
              </div>

              <div className='article-image'>
                <img src="/images/A-Symphony-Of-Support/ASOS-img2.png" alt="Band Dad"></img>
              </div>
            </div>

            <br />
            <h2>3. Harmony in Flexibility</h2>
            <div className='left-image'>
              <div className='article-image'>
                <img src="/images/A-Symphony-Of-Support/asos-img3.png" alt="Band Dad"></img>
              </div>

              <div className='text-container'>
                <p>
                  High school band programs are known for their ever-evolving nature. Great band parents sway with the changing tempo, adapting to last-minute schedule adjustments or pitching in for impromptu fundraising endeavors. They're the embodiment of adaptability.
                </p>
              </div>
            </div>

            <br />
            <h2>4. The Supportive Serenade</h2>
            <div className='right-image'>
              <div className='text-container'>
                <p>
                  Band life can be challenging, but great band parents are unwavering sources of support. They stand firmly by their child and their bandmates, offering words of encouragement during practices, motivation before significant performances, and sustenance in the form of snacks and refreshments during lengthy rehearsals.
                </p>
              </div>

              <div className='article-image'>
                <img src="/images/A-Symphony-Of-Support/asos-img4.png" alt="Band Dad"></img>
              </div>
            </div>
            <br />
            <h2>5. The Ensemble Extraordinaire</h2>
            <p>
              Great band parents understand that the band's triumph is a collective effort. They collaborate seamlessly with other parents, band boosters, and the band director to ensure that the program operates seamlessly. It's about providing resources and unwavering support to help every student shine.
            </p>

            <div className='left-image'>
              <div className='article-image'>
                <img src="/images/A-Symphony-Of-Support/asos-img5.png" alt="Band Dad"></img>
              </div>

              <div className='text-container'>
                <p>
                  In essence, being an exceptional high school band parent is a symphony composed of enthusiasm, dedication, adaptability, encouragement, and teamwork. By embracing these qualities, band parents nationwide play a pivotal role in elevating their child's band program to new heights of excellence. Here's to you, the future great band parents, who not only advance the program but also demonstrate unwavering support for your child's musical journey. March on, maestros of parenthood!
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
