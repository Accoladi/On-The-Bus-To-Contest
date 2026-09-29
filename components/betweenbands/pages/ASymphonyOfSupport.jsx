//Article 11
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

const PDFFile = '/pdfs/Articles/a symphony of support.pdf'; // 

export default function ASymphonyofSupport() {
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
    <div class="card">
      <div class="image-container">
        <div class="overlay"></div>
        <img src="/images/parents.png" alt="Image description" class="cropped-image"></img>
        <div class="image-text"> A Symphony of Support: What it Takes to Be a Marching Band Parent</div>
      </div>
      <div className="Home__container" ref={setContainerRef}>
        <div className='article-border'>
          <div className='article-container'>





            <div className='paragraphwimage-left'>

              <img id='band-dad-img' src="/images/A-Symphony-Of-Support/ASOS-img1.png" alt="Band Dad" width={'250px'}></img>

              <p className='articles-paragraph'>
                As the sun sets behind the marching band on the field today, you'll find a group of young musicians eagerly sharing their adventures in the world of marching band. Their passion and pride are palpable, and as parents, you're right there, basking in the glow of their newfound excitement. You want to be more than just an audience to their stories; you want to be their unwavering support. So, let's embark on a journey that explores the role of parents in this musical marching odyssey, a role embraced by band parents all across the nation.
              </p>
              <div className='text-container'>
                <h2>1. The Heartbeat of Enthusiasm</h2>
                <p className='articles-paragraph'>
                  At the core of every great band parent is boundless enthusiasm. They dive headfirst into their child's band journey and champion the entire program. Whether it's attending performances, cheering from the sidelines at competitions, or fervently advocating for the band in the community, they're the band's most ardent supporters.
                </p>
              </div>
            </div>
            <br />

            <div className='paragraphwimage'>
              <img src="/images/A-Symphony-Of-Support/ASOS-img2.png" alt="Band Dad"></img>
              <div className='text-container'>
                <p className='articles-paragraph'>
                  <h2>2. The Dedication Dynamo</h2>
                  Being a band parent isn't just a label; it's a commitment, especially during the electrifying marching season. Great band parents roll up their sleeves, dedicating their time and effort to bolster their child and the band program. This may entail volunteering at fundraisers, supervising trips, or lending a hand with the intricacies of performances and competitions.
                </p>
              </div>




            </div>

            <br />

            <div className='paragraphwimage-left'>
              <img src="/images/A-Symphony-Of-Support/asos-img3.png" alt="Band Dad"></img>
              <h2>3. Harmony in Flexibility</h2>
              <p className='articles-paragraph'>
                High school band programs are known for their ever-evolving nature. Great band parents sway with the changing tempo, adapting to last-minute schedule adjustments or pitching in for impromptu fundraising endeavors. They're the embodiment of adaptability.
              </p>
            </div>


            <br />



            <div className='paragraphwimage'>
              <img src="/images/A-Symphony-Of-Support/asos-img4.png" alt="Band Dad"></img>
              <h2>4. The Supportive Serenade</h2>
              <p className='articles-paragraph'>
                Band life can be challenging, but great band parents are unwavering sources of support. They stand firmly by their child and their bandmates, offering words of encouragement during practices, motivation before significant performances, and sustenance in the form of snacks and refreshments during lengthy rehearsals.
              </p>

              <h2>5. The Ensemble Extraordinaire</h2>
              <p className='articles-paragraph'>
                Great band parents understand that the band's triumph is a collective effort. They collaborate seamlessly with other parents, band boosters, and the band director to ensure that the program operates seamlessly. It's about providing resources and unwavering support to help every student shine.
              </p>
            </div>
            <br />


            <div className='paragraphwimage-left'>

              <img src="/images/A-Symphony-Of-Support/asos-img5.png" alt="Band Dad"></img>


              <div className='text-container'>
                <p className='articles-paragraph'>
                  In essence, being an exceptional high school band parent is a symphony composed of enthusiasm, dedication, adaptability, encouragement, and teamwork. By embracing these qualities, band parents nationwide play a pivotal role in elevating their child's band program to new heights of excellence. Here's to you, the future great band parents, who not only advance the program but also demonstrate unwavering support for your child's musical journey. March on, maestros of parenthood!
                </p>
              </div>

            </div>

          </div>
          <div className='article-container-2'>
            <a href="https://www.mymusicfuture.com/" target='_blank'>
              <img src="../../../images/my-music-future-footer.png" alt="My Music Future promotion" style={{ width: '100%' }} />
            </a>
          </div>
        </div>
      </div>
      <Ad></Ad>
    </div>
  );
}
