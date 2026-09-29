// Article 9
import React, { useCallback, useState } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import "../styles/article.css";
import Ad from '../Ad';

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const maxWidth = 1500;

//const PDFFile = '/pdfs/Articles/marching to success article.pdf';

export default function MarchingToSuccess() {
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
        <img src={"/images/pic-7.png"} alt="Image description" className="cropped-image"></img>
        <div className="image-text">Marching to Success: How the Band Journey Can Lead to College Scholarships</div>
      </div>
      <div className="Home__container" ref={setContainerRef}>
        <div className="article-border">
          <div className="article-container">
            <h2 id="got-style">
              Marching to Success: How the Band Journey Can Lead to College
              Scholarships!
            </h2>

            <p className="articles-paragraph">
              As the band’s final note fades into the night, you can’t help but
              feel the swell of applause and cheers reverberate through your
              thoughts. In the uncomfortable stadium seat, you find yourself
              pondering the countless hours of band practice and the dedication
              of each member. Is it all worth it? Can marching band really make
              a difference when it comes to college acceptance and those elusive
              scholarships? The answer, my friends, is a resounding yes!
            </p>

            <h3 className="style-h3">A Symphony of Success</h3>
            <div className="paragraphwimage-left">
              <img id='marching-to-success-img'
                src={"/images/marching-to-success/mts_1.jpeg"}
              ></img>
              <p className="articles-paragraph">
                Research has uncovered a harmonious truth: participating in
                music programs, especially the exhilarating world of marching
                band, can be an academic and personal game-changer. Beyond the
                vibrant performances and toe-tapping tunes, students reap
                cognitive rewards, enhancing skills like laser-focused
                attention, memory that could rival an elephant’s, and the
                ability to tackle problems with ease. And that’s just the
                beginning.
              </p>

              <h3 className="style-h3">GPA Boosters and Class Toppers</h3>

              <p className="articles-paragraph">
                Here’s the crescendo: music enthusiasts often find themselves
                not only in tune with their instruments but also with their
                studies. Those who embrace the rhythm of music programs tend to
                score higher GPAs and find themselves shining in the top 10% of
                their class. It’s like music is the secret ingredient to
                academic excellence!
              </p>

              <h3 className="style-h3">Marching to the College Doorstep</h3>

              <p className="articles-paragraph">
                Colleges and universities aren’t just looking for bookworms.
                They crave students with passion, dedication, and a life outside
                of textbooks. Marching band members stand out in a sea of
                applications. Why? Because the commitment, discipline, teamwork,
                and time management skills they’ve honed in the band demonstrate
                qualities that colleges adore. It’s not just about hitting the
                right note; it’s about showing you’re in harmony with the world.
              </p>
            </div>






            <h3 className="style-h3">Scholarships, the Crescendo of Rewards</h3>
            <div className="paragraphwimage">
              <p className="articles-paragraph">
                Now, let’s talk money. Yes, you heard right! There’s a treasure
                trove of scholarships waiting for music program aficionados.
                These scholarships are like golden tickets, helping the students
                and their family ease the financial burden of tuition and
                expenses. By diving into the world of marching band, these band
                students are not only building their musical skills but also
                boosting their chances of scoring these scholarships. And guess
                what? They don’t have to be a music major to reap the rewards.
                Some collegiate marching band programs offer scholarships to
                dedicated members, no matter their major.
              </p>
            </div>
            <h3 className="style-h3">
              Unlocking the Potential with Accoladi.com
            </h3>
            <div className="paragraphwimage">
              <p className="articles-paragraph">
                But wait, there’s more! Let us introduce Accoladi.com, a gateway
                to a world of opportunities. It’s an online matchmaker,
                connecting budding music maestros with colleges and universities
                eager to welcome their talent. Accoladi.com is a treasure map,
                brimming with answers to all the burning questions about the
                college application process, auditions, and the elusive art of
                scholarship hunting.
              </p>
            </div>

            <h3 className="style-h3">Marching Toward a Bright Future</h3>
            <div className="paragraphwimage">
              <p className="articles-paragraph">
                So, as you shift in your stadium seat, remember this: every
                practice, every note, every ounce of passion and dedication may
                well lead to the land of scholarship dollars. Now, doesn’t that
                make your stadium seat feel a whole lot cozier? Yes, the band
                journey is a ticket to success, and the future for each of these
                marching band members is wide open for each of them to compose!
              </p>
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
