// Article 
import React, { useCallback, useState } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import "../styles/article.css";

import Ad from '../Ad';

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const maxWidth = 1500;

export default function MarchingBandAFusion() {
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
        <img src="images/is-it-a-sport.jpg" alt="Image description" className="cropped-image"></img>
        <div className="image-text">Marching Band: A Fusion of Sport and Performance Art</div>
      </div>
      <div className="Home__container" ref={setContainerRef}>
        <div className="article-border">
          <div className="article-container">
            <h2 id="got-style">
              Marching Band: A Fusion of Sport and Performance Art (The
              Definitive Verdict)
            </h2>

            <p className="articles-paragraph">
              For generations, a contentious debate has swirled around the
              classification of marching band as either a sport or a performance
              art. After conducting extensive research on this perennial
              question, a dedicated marching band enthusiast now unveils a
              definitive answer.
            </p>
            <div className="paragraphwimage">
              <img
                src="/images/is-marching-band-a-sport/ismb_sport_2.jpeg"
              ></img>
              <p className="articles-paragraph">
                The question at the heart of it all: Is marching band a sport?
                In straightforward terms, yes, marching band does meet the
                criteria to be regarded as a sport. However, it extends its
                identity beyond this realm, aligning even more closely with the
                domain of performance art. This perspective may be a revelation
                to many, given that the sporting aspects of marching band often
                escape notice.
              </p>
              <p className="articles-paragraph">
                Analyzing the alignment of marching band with the conventional
                definitions of a sport is illuminating. Various sources define
                "sport" in distinct yet overlapping ways, and marching band
                shares characteristics with these definitions:
              </p>
            </div>
            <ul
              id="style-list"
              className="articles-bullet-list"
              style={{ listStyleType: "disc" }}
            >
              <li>
                According to Oxford, a sport is "an activity that you do for
                pleasure and that requires physical effort or skill, usually
                performed in a special area and following established rules."
              </li>
              <li>
                Dictionary.com characterizes sport as "an athletic activity that
                demands skill or physical prowess, often of a competitive
                nature."
              </li>
              <li>
                Merriam-Webster identifies sport as "a source of diversion."
              </li>
              <li>
                Collins defines sports as "games such as football and basketball
                and other competitive leisure activities that necessitate
                physical effort and skill."
              </li>
              <li>
                American Heritage views it as "an activity involving physical
                exertion and skill, governed by a set of rules or customs, and
                often undertaken competitively."
              </li>
              <li>
                Macmillan defines it as "an activity in which players or teams
                compete against each other, typically involving physical
                effort."
              </li>
              <li>
                Longman sees sport as "a physical activity in which people
                compete against each other."
              </li>
            </ul>
            <p className="articles-paragraph">
              While these definitions lend credence to marching band's
              classification as a sport, the prevailing perception often
              diverges. Historical context plays a pivotal role in shaping this
              view. Competitive marching band is a relatively recent phenomenon,
              emerging in the 1920s. To this day, college and military bands
              remain non-competitive, leaving drum corps and high school bands
              as the primary exponents of competition.
            </p>
            <p className="articles-paragraph">
              Further complicating matters is the way marching band is
              positioned within the societal framework. Typically, marching band
              programs find their home within a school district's music and arts
              department, rather than within the athletic department. This
              differs markedly from sports such as diving, figure skating, and
              gymnastics, which achieve widespread recognition through their
              inclusion in the Olympics. The context in which an activity is
              presented holds substantial sway, and many today remain unaware of
              the competitive nature of high school marching bands or the
              existence of drum corps.
            </p>

            <div className="paragraphwimage-left">
              <img
                id="military-majesty"
                src="/images/is-marching-band-a-sport/ismb_sport_1.jpeg"
              ></img>
              <p className="articles-paragraph">
                However, the rigor and dedication demanded by marching band are
                undeniable. The physical exertion, the hours of disciplined
                practice, and the intense performances rival the demands of many
                sports. ESPN even once equated the heart rate of a DCI Cavalier
                tenor drum player to that of a marathon runner, underscoring the
                athleticism inherent in marching band.
              </p>
              <p className="articles-paragraph">
                If marching band eludes a straightforward sports categorization,
                where does it fit? Many proponents argue that it leans more
                toward performance art or pageantry.
              </p>
            </div>

            <p className="articles-paragraph">
              Performance art, as described by multiple sources, involves an
              artist delivering a live performance that combines elements of
              acting, dance, music, and more. Pageantry, on the other hand,
              typically relates to impressive and formal events marked by
              distinctive attire, music, and elaborate displays.
            </p>
            <p className="articles-paragraph">
              Marching band closely aligns with the definition of performance
              art. Although it does not precisely conform to the traditional
              notion of pageantry, it undeniably presents spectacular displays
              and engages a substantial ensemble of participants, each bedecked
              in unique uniforms, all set to the backdrop of captivating music.
            </p>

            <p className="articles-paragraph">
              {" "}
              In summation, marching band occupies a distinct and hybrid space,
              serving as a bridge between the worlds of sport and performance
              art. It harnesses the power of music in a way no other sport does
              and, while leaning toward the realm of performance art, retains a
              strong thread of athleticism. In future debates, consider marching
              band as a harmonious fusion of artistic expression, competition,
              and physical prowess—a classification that defies easy
              categorization but undeniably inspires in its own right.
            </p>
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
