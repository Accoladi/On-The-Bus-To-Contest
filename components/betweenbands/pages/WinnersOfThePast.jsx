// Article 6 HARMONIOUS BEGINNINGS
import React, { useCallback, useState } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import "../styles/article.css";
import Ad from '../Ad';

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const maxWidth = 1500;

// const PDFFile1 = '/pdfs/Articles/harmonious beginnings.pdf'; 
// const PDFFile2 = '/pdfs/Articles/harmonious beginnings part 2.pdf'; 

export default function WinnersOfThePast() {
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
        <img className='cropped-image' src="/images/articles/article-title-bgs/celebrities.png" alt="Image description"></img>
        <div className="image-text">Celebrities in Marching Band</div>
      </div>
      <div className="Home__container" ref={setContainerRef}>
        <div className='article-border'>
          <div className='article-container'>
            <p><b>Harmonious Beginnings: The Impact of Marching Bands on Icons of Success</b></p>
            <p>Marching bands have left an indelible mark on the lives of many remarkable
              individuals. The rhythmic cadence of the drums, the harmonious blend of brass
              and woodwinds, and the choreographed precision of synchronized movements
              have shaped the destinies of many.
            </p>

            <h2>Featured Personalities</h2><br />
            <div>
              <h3>Lizzo / Melissa Viviane Jefferson</h3>
              <p>Played: Flute, Piccolo, and French Horn<br />
                High School: Alief Elsik High School in Houston, Texas<br />
                Professional: Singer, Songwriter, Rapper, Actress
              </p>
              <img src="/images/articles/article-content-pics/celebrities/1.png" alt="lizzo playing flute" style={{ width: '100%' }} />
            </div>
            <br />
            <div>
              <h3>Jennifer Garner</h3>
              <p>Played: Saxophone<br />
                High School: George Washington High School in Charleston, West Virginia<br />
                Professional: Actor, Film Producer, Spokesperson
              </p>
              <img src="/images/articles/article-content-pics/celebrities/2.png" alt="jennifer garner playing saxophone" style={{ width: '100%' }} />
            </div>
            <br />
            <div>
              <h3>Vince Carter</h3>
              <p>Played: Euphonium and Drum Major<br />
                High School: Mainland High School, Daytona Beach, Florida<br />
                Professional: Basketball Player
              </p>
              <img src="/images/articles/article-content-pics/celebrities/3.png" alt="vince carter in a basketball jersey" style={{ width: '100%' }} />
            </div>
            <br />
            <div>
              <h3>Bill Clinton</h3>
              <p>Played: Saxophone and Drum Major<br />
                High School: Hot Springs High School, Hot Springs, Arkansas<br />
                Professional: President of the United States of America
              </p>
              <img src="/images/articles/article-content-pics/celebrities/4.png" alt="bill clinton in a suit" style={{ width: '100%' }} />
            </div>
            <br />
            <div>
              <h3>Dolly Parton</h3>
              <p>Played: Drums and Marjorette<br />
                High School: Sevier County High School, Sevierville, Tennessee<br />
                Professional: Country Music Artists, Businesswoman, Philanthropist
              </p>
              <img src="/images/articles/article-content-pics/celebrities/5.png" alt="dolly parton performing" style={{ width: '100%' }} />
            </div>
            <br />
            <div>
              <h3>Julia Roberts</h3>
              <p>Played: Oboe<br />
                High School: Campbell High Scool Smyrna, Georgia<br />
                Professional: Actress
              </p>
              <img src="/images/articles/article-content-pics/celebrities/6.png" alt="julia roberts with her oboe" style={{ width: '100%' }} />
            </div>
            <br />
            <div>
              <h3>Jimmy Kimmel</h3>
              <p>Played: Clarinet<br />
                High School: Ed W Clark High School, Las Vegas, Nevada<br />
                Professional: Television Host
              </p>
              <img src="/images/articles/article-content-pics/celebrities/7.png" alt="jimmy kimmel with his clarinet" style={{ width: '100%' }} />
            </div>
            <br />
            <div>
              <h3>Arethra Franklin</h3>
              <p>Played: Tuba<br />
                High School: Northern High School, Detroit, Michigan<br />
                Professional: Singer-Songwriter, Record Producer, Civil Rights Activists
              </p>
              <img src="/images/articles/article-content-pics/celebrities/8.png" alt="arethra franklin smiling" style={{ width: '100%' }} />
            </div>
            <br />
            <div>
              <h3>Neil Armstrong</h3>
              <p>Played: Euphonium<br />
                High School: Blume High School, Wapakoneta, Ohio<br />
                Professional: Astronaut to the Moon
              </p>
              <img src="/images/articles/article-content-pics/celebrities/9.png" alt="neil armstrong in uniform" style={{ width: '100%' }} />
            </div>
            <br />
            <div>
              <h3>Samuel L Jackson</h3>
              <p>Played: Trumpet, Piccolo, and French Horn<br />
                High School: Riverside High School, Chattanooga, Tennessee<br />
                Professional: Actor, Director, Civil Rights Activist
              </p>
              <img src="/images/articles/article-content-pics/celebrities/10.png" alt="young samuel l jackson" style={{ width: '100%' }} />
            </div>
            <br />
            <br />

            <h2>Other Famous People Who Were In Band</h2>
            <div>
              <h3>Flute</h3>
              <p>Alanis Morrisette (Singer) Halle Berry (Actress)<br />
                Celine Dion (Singer)<br />
                Lizzo / Melissa Viviane Jefferson (Singer, Songwriter, Rapper, Flutist, Actress)<br />
                Terry Crews (NFL Football Player, Actor, and Television Host)<br />
                Calista Flockhart (Actress - "Ally McBeal)<br />
                George Eastman (Founderof Kodak)<br />
                Alyssa Milano (Actress)<br />
                Noah Webster (Editor of Webster's Dictionary)<br />
                Gwen Stephani (Singer) Tina Fey (Comedian, Actress)<br />
                Molly Erdman (Television Personality - the "wife" in the Sonic Commercials)<br />
                James Wolfensohn (President of the World Bank)<br />
                Knute Rockne (Legendary Notre Dame University Coach)<br />
                Oscar Robertson (NBA)<br />
                Fredrick Il (King of Prussia)<br />
                Patrick Henry (Governor of Virginia, Founding Father, Lawyer, Patriot)<br />
                John Quincy Adams (6th President of the United States)<br />
                Sarah Palin (Vice Presidential Nominee)<br />
              </p>
            </div>
            <br />
            <div>
              <h3>Oboe</h3>
              <p>Julia Roberts (Actress)<br />
                Dennis O'Hare (Tony Award Winning Actor)<br />
              </p>
            </div>
            <div>
              <h3>Clarinet</h3>
              <p>Rainn Wilson (Actor)<br />
                Julia Roberts (Actress)
                Woody Allen (Actor/Director)<br />
                Gloria Estefan (Singer, Songwriter, Recording Artist)<br />
                Tony Shaloub (Actor-"Monk)<br />
                Julia Roberts (Actress)<br />
                Eva Longoria (Avtress - "Desperate Housewives")<br />
                Dr. Michael DeBakey (Pioneering Heart Surgeon)<br />
                Jimmy Kimmel (Comedian/Talk Show Host)<br />
                Allan Greenspan (Former Federal Reserve Chairman)<br />
                Steven Spielberg (Movie Director)<br />
                Robert Reid (former Houston Rocket)<br />
                Squidward Amy Acuff (US Olympic High Jumper & Model)<br />
                Stephano Dimera (Actress- "Days of Our Lives")<br />
              </p>
            </div>
            <div>
              <h3>Bass Clarinet</h3>
              <p>Zakk Wylde (Guitarist for Ozzy Osbourne)<br />
                George Segal (Actor)
              </p>
            </div>
            <div>
              <h3>Sax</h3>
              <p>Allan Greenspan (Federal Reserve Chairman, yes, he plays both)<br />
                Jennifer Garner (Actress - "Alias")<br />
                Bill Clinton (Former U.S. President)<br />
                Roy Williams (NFL - Detriot Lions)<br />
                Vince Carter (NBA Star)<br />
                David Robinson (Retired NBA Star)<br />
                Fred McMurray (Actor)<br />
                Tedi Bruschi (NFL New England Patriots)<br />
                Bob Hope (late Comedian/Actor)<br />
                Lionel Richie (Singer)<br />
                Tyler Wright (NHL - Anaheim Ducks)<br />
                Tom Selleck (Actor - Magnum PI)<br />
                Richard Gere (Actor)<br />
                Ronald McNair (Astronaut)<br />
                Robert Ryman (Artist)<br />
              </p>
            </div>
            <div>
              <h3>Trumpet</h3>
              <p>James Woods (Actor)<br />
                John Glenn (Astronaut and U.S. Senator)<br />
                Michael Anthony (Bass Player for Van Halen)<br />
                Drew Carey (Actor/Comedian)<br />
                Kesha / Kesha Rose Sebert (Singer, Songwriter)<br />
                Stephen Tyler (Lead Singer for Aerosmith)<br />
                Prince Charles (Future King of England)<br />
                Montel Williams (Talk Show Host)<br />
                Peter Weller (Actor - "Robocop")<br />
                Steve Earle (Nashville bad boy)<br />
                Darcy Hordichuk (NHL - Nashville Predators)<br />
                Richard Gere (Actor)<br />
                Shania Twain (Country Music Singer)<br />
                Flea (Singer - Red Hot Chili Peppers)<br />
                Jackie Gleason (Actor)<br />
                Peter Weller (Actor – RoboCop)<br />
                Eric Lindros (Dallas Stars Forward)<br />
                Brandon Routh (Actor – Superman Returns)<br />
                Samuel L. Jackson (Actor)<br />
                Brandon Routh (Actor - "Superman Returns")<br />
              </p>
            </div>
            <div>
              <h3>French Horn</h3>
              <p>Ewan McGregor (Actor – “Obi Wan Kanobi in Star Wars I, II, III)<br />
                Vanessa Williams (Singer/Actress)<br />
                Otto Graham (NFL Hall of Fame quarterback)<br />
                Henry Cisneros (Former Secretary of Housing and Urban Development)<br />
                Samuel L. Jackson (Actor)<br />
              </p>
            </div>
            <div>
              <h3>Trombone</h3>
              <p>Jonathan Frakes (Actor/Director -"Star Trek")<br />
                Bill Engvall (Comedian – “Blue Collar Comedy Tour”)<br />
                Nelly Furtado (Singer)<br />
                Conrad Janis (Actor)<br />
                Bobby Bowden (College Football Coach)<br />
                John Pankow (Actor, "Mad About You")<br />
                Tony Stewart (NASCAR Driver)<br />
                Fred Rogers ("Mr. Roger's Neighborhood" actor)<br />
              </p>
            </div>
            <div>
              <h3>Baritone</h3>
              <p>
                Neil Armstrong (Astronaut…first man on the moon)
              </p>
            </div>
            <div>
              <h3>Tuba</h3>
              <p>Andy Griffith (Actor)<br />
                Malik Rose (NBA)<br />
                Thomas F. Wilson (Actor - "Biff" from the Back to the Future)<br />
                Harry Smith (Television Host - CBS's "The Early Show")<br />
                Dan Akroyd (Actor)<br />
                Aretha Franklin (Singer, Songwriter, Producer - "Queen of Soul")  <br />
              </p>
            </div>
            <div>
              <h3>Percussion</h3>
              <p>Mike Anderson (NFL)<br />
                Tommy Lee (Motley Crue)<br />
                Adam Brody (Actor)<br />
                Tracy Simien (NFL)<br />
                Johnny Depp (Actor)<br />
                Eddie George (Retired NFL)<br />
                Trent Raznor (Nine Inch Nails)<br />
                Dana Carvey (Actor/Comedian)<br />
                Vinnie Paul (Rock Drummer)<br />
                Andy Schneider (NHL Pittsburgh Penguins)<br />
                Walter Payton (NFL Hall of Fame running back)<br />
                Johnny Carson (TV Host)<br />
                Mike Piazza (Former MLB Catcher)<br />
                Emeril Lagasse (World Famous Chef)<br />
                Rosie O' Donnel (TV Host/Actress)<br />
              </p>
            </div>
            <p>As we look back on the legendary figures who once stood on the same turf as the aspiring
              students marching across the field todayy, it becomes abundantly clear that the world's
              most influential voices and celebrated icons have indeed shared a common path. These
              remarkable individuals, whose journeys started on the very same fields we watch today,
              exemplify the power of discipline, teamwork, creativity, and perseverance—values honed
              during their time in marching bands. Just as our students fill the air with music and their
              dreams with vibrant colors, they too are embarking on their own path toward success, fame,
              and achievement. As we witness their spirited performances, let us not forget that among
              them may be the future leaders, legends, and luminaries whose stories will someday inspire
              the world.</p>
          </div>
          <br />
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
