// Article 14
import React, { useCallback, useState } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import "../styles/article.css";
import Ad from '../Ad';
const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const maxWidth = 1500;

export default function EvolutionOfMarchingBandUniforms() {
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
        <img src="/images/Evaluation-of-marching-band-uniforms/embu_1.png" alt="Image description" className="cropped-image"></img>
        <div className="image-text">Evolution Of Marching Band Uniforms</div>
      </div>
      <div className="Home__container" ref={setContainerRef}>
        <div className="article-border">
          <div className="article-container">
            <h2 id="got-style">
              The Evolution of Marching Band Uniforms: A Storied Tale
            </h2>

            <p className="articles-paragraph">
              Marching bands, with their precision and artistry, often prompt
              questions about the origins of their military-inspired uniforms.
              From bugle corps to plumed hats, the connection to military attire
              is undeniable. These bands have long symbolized discipline and
              musical expression, but the evolution of their attire tells a
              fascinating story of transformation.
            </p>
            <p> </p>
            <h3 className="style-h3">Military Roots and Early History</h3>
            <div className="paragraphwimage">
              <img
                src="/images/Evaluation-of-marching-band-uniforms/embu_2.png"
                alt="Image description"
                className="cropped-image"
              ></img>
              <p className="articles-paragraph">
                In ancient times, musical instruments like horns and drums were
                used to convey orders and rally troops in battle. Over the
                centuries, these rudimentary bands evolved, reflecting the
                military bands we know today. Their attire, functional and
                visually striking, included elaborate uniforms with plumed hats
                and vibrant colors, distinguishing regiments and boosting
                morale.
              </p>
            </div>

            <h3 className="style-h3">
              Transition to Military Influence (17th-19th Century)
            </h3>
            <div className="paragraphwimage">
              <p className="articles-paragraph">
                The 17th-19th centuries marked a shift as marching bands
                embraced military traditions, adopting uniform designs mirroring
                soldiers to foster unity and pride. Epaulets, braided ropes, and
                sashes were incorporated, symbolizing their connection to
                military precision. Bands moved from civilian clothing to more
                formal, regimented styles for parades and public events, shaping
                their role as community symbols.
              </p>
            </div>

            <div className="paragraphwimage-left">
              <img
                src="/images/Evaluation-of-marching-band-uniforms/embu_3.png"
                alt="Students Marching"
                className="cropped-image"
              ></img>
              <h3 className="style-h3">
                Birth of American Marching Bands with the Revolution
              </h3>
              <p className="articles-paragraph">
                During the American War of Independence, fife and drum corps
                emerged, replacing the British military bands. This shift laid
                the foundation for American marching band traditions, which
                further expanded with the establishment of the United States
                Marine Band in 1798.
              </p>
            </div>
            <p> </p>
            <div className="paragraphwimage">
              <img
                src="/images/Evaluation-of-marching-band-uniforms/embu_4.png"
                alt=""
                className="cropped-image"
              ></img>
              <h3 className="style-h3">
                The 20th Century and Departure from Military Traditions
              </h3>
              <p className="articles-paragraph">
                The 20th century witnessed a departure from strict military
                influences as bands embraced new sartorial expressions. John
                Philip Sousa popularized civilian marching bands, and the
                Ringling Brothers and Barnum Bailey Circus adopted military
                bands, inspiring more modern and stylish outfits for
                competitions. African-American marching band traditions were
                also integrated into previously all-white bands.
              </p>
            </div>

            <div id="scramble-bands" className="paragraphwimage-left">
              <img
                src="/images/Evaluation-of-marching-band-uniforms/embu_5.png"
                alt="Students with drums"
                className="cropped-image"
              ></img>
              <h3 className="style-h3">Drum and Bugle Corps Revolution</h3>
              <p className="articles-paragraph">
                Bugle and drum corps' integration revolutionized marching bands,
                leading to more dynamic performances. This era marked the
                freedom of bands to create unique styles, setting the stage for
                contemporary marching band uniforms.
              </p>
              <h3 className="style-h3">Influence of Formal Dress Codes</h3>
              <p className="articles-paragraph">
                Formal dress codes influenced sleek silhouettes, rich fabrics,
                and intricate details, reflecting the dedication and craft of
                modern marching bands.
              </p>
            </div>
            <div id="scramble-bands" className="paragraphwimage">
              <img
                src="/images/Evaluation-of-marching-band-uniforms/embu_6.png"
                alt="Students with trumpets"
                className="cropped-image"
              ></img>
              <h3 className="style-h3">Modern Innovations</h3>
              <p className="articles-paragraph">
                Modern marching band attire incorporates high-tech features,
                advanced fabrics for comfort, stylish cuts, and electronics and
                amplification built into the uniform. These innovations have
                pushed the boundaries of traditional designs, transforming the
                spectacle of marching band performances.
              </p>
              <p className="articles-paragraph">
                From military traditions to modern innovations, the journey of
                marching band uniforms encapsulates a vibrant tapestry of
                history and creativity.
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
