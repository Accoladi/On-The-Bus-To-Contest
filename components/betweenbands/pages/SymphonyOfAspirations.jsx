// Article 2
import React, { useCallback, useState } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import "../styles/article.css";
import Ad from '../Ad';
import { Link, useLocation } from 'react-router-dom'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const maxWidth = 1500;

const PDFFile = '/pdfs/Articles/SOA_Cropped.pdf';

export default function SymphonyOfAspirations() {
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
      <div className="image-container" style={{ backgroundImage: `url(/images/soa-home.jpg)` }}>
        <div className="overlay"></div>

        <div className="image-text">Symphony of Aspirations</div>
      </div>
      <div className="Home__container" ref={setContainerRef}>

        <div className='article-border'>
          <div className='article-container'>

            <p>
              At the tender age of eleven, in the heart of Greenville, South Carolina, I was just a novice in the world of music, diligently honing my skills on the clarinet. My entry into the school's beginning band had only spanned seven weeks when my friend Brad, a eighth-grader and trumpet virtuoso, extended an invitation. An invitation that would lead me on an unexpected journey, immortalized in memory as the "Symphony of Aspirations."</p>

            <p>
              Our destination? The South Carolina Band Director's Association State Marching Band Contest in the state's capital, Columbia. My intrigue soared, for I had long admired the awe-inspiring performances of the high school band that our middle school fed into during Friday night football games. Their introduction by the announcer, "And now, ladies and gentlemen, the Award-Winning Parker High School Band," was etched in my mind, followed by the litany of their first-place triumphs at marching band contests
            </p>

            <p>
              The town's pride in their beloved band was palpable. I yearned to witness firsthand how this exceptional ensemble came to be known as “award-winning,” and thus, the invitation was a dream come true.
            </p>

            <div className='paragraphwimage-left'>
              <img src="/images/SOA-Article/soa-img1.png" alt="Tailgate"></img>


              <p className='articles-paragraph'>
                The night before our grand expedition, I bunked with Brad's family. We savored an array of delectable treats at the local Rainbow Drive-In – hot dogs, chips, and a luscious vanilla milkshake. The evening was devoted to packaging the culinary creations that Brad's mother had meticulously prepared: cheese biscuits, homemade party mix, egg salad sandwiches, baked-ham-pepperand-onion dip for crackers, and sausage-cheese balls.
              </p >

              <p className='articles-paragraph'>
                While we meticulously sealed these delights into Tupperware, Brad's father secured their charcoal grill in the station wagon. We retired early for the night, as the early morning departure required us to rendezvous with the passionate Parker Band fans for a tailgating extravaganza, a term entirely foreign to my vocabulary, but one that would forever be imprinted on my soul.
              </p>


              <p className='articles-paragraph'>
                In the predawn hours, under the faint glow of floodlights, we adorned the station wagon in Parker's signature hues of purple and gold. Coolers and picnic baskets were carefully loaded, and with anticipation coursing through our veins, we embarked on our journey to Columbia. Brad and I fell back asleep during the ride, and upon awakening, it felt akin to waking on Christmas morning.
              </p>




            </div>



            <p className='articles-paragraph'>
              Upon our arrival, a spectacle unfolded before us. Ten Parker Band Booster cars were arranged in symmetrical rows, their trunks adorned with a regal display of purple and gold. Three lengthy tables, swathed in pristine white linens, beckoned us with opulent bouquets of purple and gold flowers at their center. Each trunk gaped open, showcasing an assortment of foods that rivaled a Thanksgiving, July 4th, and Christmas feast combined, encapsulated in the vibrant aura of tailgating jubilance.
            </p >

            <p className='articles-paragraph'>
              We feasted on cheese biscuits, country ham biscuits, grits casserole, fresh orange juice, and that magical elixir known as coffee – my first cup, an initiation of sorts. Subsequently, we entered the stadium, prepared to witness the 1A and 2A bands compete.
            </p >

            <p className='articles-paragraph'>
              As the performances unfolded, an intriguing phenomenon unveiled itself. Regardless of the band's origin, cheers erupted from the crowd for every single performance. Yet, the Parker fans exhibited an unwavering intensity, reserving their most exuberant ovations for the bands whose directors had once marched with the Parker Band. An elderly Parker Band Booster beside me declared, "We're so very proud of them." This depth of pride, unlike anything I'd ever witnessed, kindled an inner fire, and in that moment, I aspired to be a part of the Award-Winning Parker High School Band.
            </p>

            <p className='articles-paragraph'>
              The transition to the 3A and 4A competition ushered in an electrifying atmosphere. The stands teemed with spectators, while the opposing side accommodated 1A and 2A bands. Each band was met with cheers, but when the iconic Award-Winning Parker High School Band graced the field, silence enveloped us, save for the silent beat of our hearts. Even bands from 1A and 2A that boasted former Parker Band members as directors observed this tradition of reverence.
            </p>

            <p className='articles-paragraph'>
              We stood in solidarity, enveloped by the magnetic allure of the performance. A breathtaking silence cloaked the audience as the band executed their opening fanfare. Only when the Drum Major concluded with a flourish did the stands erupt in jubilation.
            </p>

            <p className='articles-paragraph'>
              Trophies were awarded, but the Parker Band left empty-handed. To our dismay, they were among the five bands that received no accolades. The announcement of finalists, however, rekindled hope. Abbeville High School (2A), Berea High School (3A), Camden High School (4A), Summerville High School (4A), and, of course, Parker High School (4A) would vie for top honors. The stadium was cleared of all bands and fans in anticipation of the finals that would start two-hours later.
            </p>

            <div className='paragraphwimage-left'>
              <img src="/images/SOA-Article/soa-img2.png" alt="Food"></img>

              <p className='articles-paragraph'>
                Our return to the tailgating area was met with a flurry of activity. Grills were ablaze, sizzling steaks and burgers filled the air with tantalizing aromas. Conversations buzzed with excitement, laden with phrases like "I feel it in my bones…," "Another win this year…," and "Mr. Senn, (Parker's Band Director), has done it again…."
              </p>

              <p className='articles-paragraph'>
                A sumptuous feast ensued, a testament to the camaraderie and affection shared among these individuals. Amidst the revelry, I couldn't help but wonder what awaited the Parker Band for their celebratory dinner. Brad's mother disclosed that the Parker football team and their coaches were hosting a catered meal by their busses, adding yet another layer to the night's festivities.
              </p>


            </div>

            <p className='articles-paragraph'>
              As the dinner meal wound to a close, we packed away the remnants of our celebratory feast. Rushing back to the stadium for the finals, we witnessed the same poignant rituals as before as each bands competed one last time.
            </p>

            <p className='articles-paragraph'>
              The anticipation reached a fever pitch as all the finalist bands returned to the field. A cadence from the University of South Carolina Marching Band signaled their arrival. Each band stood at attention in a company formation. The Drum Majors moved forward, aligning themselves for the impending awards ceremony. The University of South Carolina Marching Band's brass section and drumline heralded the occasion with the Olympic Fanfare.
            </p >

            <p className='articles-paragraph'>
              Finally, the moment arrived. The announcer's voice resonated through the stadium as he proclaimed, "3rd Place in tonight's finals is Berea High School, and 2nd Place Abbeville High School. Finally, the announcement came, proclaiming Parker High School Band as the South Carolina State Championship Marching Band. The elation was palpable, and the crowd roared in celebration. Yet, the Parker Band stood resolute, marching out with the same disciplined precision that had become their hallmark.
            </p>

            <div className='paragraphwimage-left'>

              <img src="/images/SOA-Article/soa-img3.png" alt="SOA" className="article-image"></img>
              <div className='text-container'>
                <p className='articles-paragraph'>
                  Our return journey was marked by conversations about the dedication and practice required to secure a spot in the 9th grade and join the prestigious Parker High School Band. That day, I wholeheartedly committed to perfecting my craft and earning a place in the Award-Winning Parker High School Band.
                </p>

                <p className='articles-paragraph'>
                  To my surprise we did not return home but once in Greenville we drove straight to Parker High School.
                </p>

                <p className='articles-paragraph'>
                  Amid the electrifying air of anticipation, we hurried to our cars, eager to begin the festivities. The moment our trunks swung open, it was as if we were unlocking treasure chests, revealing the remnants of an opulent banquet. One by one, cakes emerged, each a sweet harbinger of celebration - "State Champions," "You Did It Again," "So Proud of Our Band," and, close to my heart, "Award-Winning."
                </p>

                <p className='articles-paragraph'>
                  In just a matter of minutes, the entire Parker Band had gathered around us. Parents embraced their children, and plates filled to the brim with delectable offerings. The cakes, particularly, were a sought-after delight, symbolizing our collective achievements and shared joy.
                </p>
              </div>




            </div>



            <p>These cherished moments, infused with the aroma of delightful cuisine and the unity of kindred spirits, marked the genesis of an enduring tradition. Tailgating, the resounding melodies of the band, and the exhilaration of marching contests have woven themselves into the very fabric of my life. Together, they've shaped a remarkable journey, one that I hold dear, adorned with the vibrant threads of shared passions and unyielding camaraderie.
            </p>

            <br />

            <img src="/images/SOA-Article/soa-footer.png" alt="SOA" id="article-footer-image"></img>
          </div>

          <br />
          <br />


          <div id='soa-recipes'>
            <div id='soa-recipes-img-container' style={{ backgroundImage: `url(/images/tail-gate-home.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

              <h2>Try Our Amazing Tailgating Recipes</h2>

              <Link to='/recipes'>
                <button>Recipes</button>
              </Link>


            </div>
          </div>


        </div>
      </div>
      <Ad></Ad>
    </div>
  );
}
