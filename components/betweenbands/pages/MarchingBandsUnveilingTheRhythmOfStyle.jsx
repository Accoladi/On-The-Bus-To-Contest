// Article 4
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

const PDFFile = '/pdfs/Articles/marching bands unveiling the rhythm of style.pdf'; // 

export default function MarchingBandsUnveilingTheRhythmOfStyle() {
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
        <img src="/images/got-style.jpg" alt="Image description" className="cropped-image"></img>
        <div className="image-text">Marching Bands Unveiling The Rhythm Of Style</div>
      </div>
      <div className="Home__container" ref={setContainerRef}>
        <div className='article-border'>
          <div className='article-container'>
            <h2 id='got-style'>They've Got Style!</h2>


            <p className='articles-paragraph'>
              In the mesmerizing world of marching bands, style reigns supreme. Style, often described as
              the distinctive essence that shapes how something is crafted, is the very heartbeat of these
              musical ensembles. Whether it's the spirited cadence of military precision or the dazzling
              showmanship of corps-style choreography, marching bands enchant us with their unique
              and captivating styles.
            </p>


            <h3 className='style-h3'>Marching to the Beat of Style</h3>
            <div className='paragraphwimage'>
              <img src={'images/marching-band-style/style-1.png'}></img>

              <p className='articles-paragraph'>
                Marching bands, much like fashion trends, are categorized
                and defined by their distinct styles. These styles are
                determined by their primary function, instrumentation, and
                technique. While some bands adhere steadfastly to a single
                style, others gracefully waltz between different styles, giving
                birth to their distinctive and ever-evolving identities. This
                chameleon-like transformation arises from the profound
                synergy between the musical style and the accompanying
                marching design.
              </p>
            </div>

            <h3 className='style-h3'> Discovering the Quintessential Styles</h3>
            <p className='articles-paragraph'>
              To fully appreciate the artistic tapestry woven by today's marching bands in the competitive
              arena, let's embark on a journey through the five major style categories of high school
              marching bands.
            </p>


            <h3 className='style-h3'>Military Majesty</h3>
            <div className='paragraphwimage-left'>
              <img id='military-majesty' src={'images/marching-band-style/style-2.png'}></img>
              <p className='articles-paragraph'>
                Picture a grand procession of military bands,
                resplendent in brass, woodwinds, and percussion
                instruments. These ensembles, historically the
                pioneers of marching bands, adhere to a strict
                regimen. Their forward march maintains impeccable
                straight lines, synchronized to the constant tempo of
                120–140 Beats Per Minute (BPM). The marching step
                size, whether at 6 to 5 or 8 to 5, creates a disciplined
                spectacle. Military-style bands encompass drum and
                bugle corps, bagpipe bands, fife and drum corps, and full military marching bands. Their
                repertoire, including compositions by renowned masters like Kenneth Alfred, Karl King, Henry
                Filmore, Edwin Franko Goldman, and the iconic John Philip Sousa, epitomizes military
                precision.
              </p>
            </div>

            <h3 className='style-h3'> A Salute to Tradition</h3>
            <div className='paragraphwimage'>
              <img src={'images/marching-band-style/style-3.png'}></img>
              <p className='articles-paragraph'>
                Military marches and military-style show
                designs once reigned supreme in high
                school marching bands across America until
                the mid-1970s. Like the precise structure of a
                military march, the show design of a military
                marching band show is equally structured
                and commanding.
              </p>

              <p className='articles-paragraph'>
                This style still thrives in high school band
                programs throughout East Texas and
                Southern California, where competing bands
                proudly uphold military-style marching traditions during standard marches. Notably,
                esteemed nstitutions like the US Naval Academy Band, the United States Army Academy, the
                United States Air Force Academy, The Citadel, and the legendary Fightin' Texas Aggie Band
                from Texas A&M University carry the torch of military precision.
                Meanwhile, the United States military bands, including the
                "President's Own" United States Marine Band, the Old Guard Fife and
                Drum Corps the United States Army Field Band, The United States
                Navy Band, and the United States Coast Guard Pipe Band, continue to
                inspire with their majestic performances.
              </p>

            </div>



            <p className='articles-paragraph'>
              Beyond America's borders, British military bands, an integral part of
              royal ceremonies, captivate audiences. The spirit of military-style
              marching bands also thrives in countries like Germany, Austria, the
              Russian Federation, Ukraine, Belarus, Italy, Spain, Portugal, and
              France. German and French military-style bands expand to include
              Corps of Drums and fanfare bands staffed by civilian musicians. The
              Bagad bands in Brittany, and similar groups outside France,
              showcase the enduring appeal of bagpipes.
            </p>

            <h3 className='style-h3'>Corps Style: A Theatrical Odyssey</h3>
            <div className='paragraphwimage'>
              <img src={'images/marching-band-style/style-4.png'}></img>
              <p className='articles-paragraph'>
                Imagine a captivating Broadway musical, brimming with
                drama and spectacle. Now, transpose that theatrical
                grandeur onto a sprawling field. Welcome to the realm of
                Corps Style bands, direct descendants of the modern drum
                and bugle corps of Drum Corps International (DCI). These
                bands burst into the spotlight during the early 1970s,
                embracing the essence of Broadway's musical flow. Their
                performances follow a script akin to a Broadway
                production:
              </p>
            </div>

            <ul id='style-list' className='articles-bullet-list' style={{ listStyleType: 'disc' }}>
              <li><span>Opening Number:</span> This sets the tone for the entire show, establishing the musical
                ambiance with a dash of theatrical flair.</li>
              <li><span>Production Number:</span> Like a show-stopping musical ensemble, this number features the full
                cast, spotlighting auxiliary units such as the colorguard, majorettes, and dance-line.</li>
              <li><span>Patter Song:</span> A whirlwind of rhythms and tempos, echoing a rapid succession of rhythmic
                patterns, akin to the captivating percussion break in a corps-style show.</li>
              <li><span>Power Ballad:</span> The emotional core of the show, this melodious gem tugs at the
                heartstrings.</li>
              <li><span>The Eleven O'Clock Number:</span> As the grand showstopper, it combines the production's style
                with the ballad's grandeur, often inducing a musical modulation to rouse the audience.</li>
            </ul>




            <div className='paragraphwimage-left'>
              <img id='military-majesty' src={'images/marching-band-style/style-9.png'}></img>
              <p className='articles-paragraph'>
                The instrumentation in corps-style bands undergoes a
                transformation. Snare drums, tenor drums, and bass
                drums give way to a medley of percussion instruments,
                including snare, tri-toms, quads, multi-pitched bass
                drums, and the versatile percussion pit. This pit features
                an array of percussion keyboard instruments, traditional
                and electronic keyboards, and even sound amplification
                or synthesizers, adding layers to the musical narrative.
              </p>
              <p className='articles-paragraph'>
                Unlike the regimented steps of military marching,
                corps-style bands embrace dynamic step sizes to
                create intricate formations. These formations can range from linear to curvilinear or scatter,
                and the choice hinges on the visual interpretation of the accompanying music. Colorguard,
                dance, props, backdrops, and costumes enrich the visual spectacle, redefining the notion of
                a marching band.
              </p>
            </div>


            <div className='paragraphwimage'>
              <img src={'images/marching-band-style/style-10.png'}></img>
              <p className='articles-paragraph'>
                The corps style is a living, evolving art form, continually
                shaped by college bands, high school bands, and drum
                and bugle corps across the United States. Their
                performances are finely tuned for marching
                competitions and festivals. The crown jewel of
                competitions for corps-style bands includes Drum Corps
                International, Winter Guard International, and Bands of
                America. Indeed, the corps style reigns supreme in high
                school marching bands throughout America.
              </p>
            </div>


            <h3 className='style-h3'>Traditional Style: A Feast for the Senses</h3>
            <div className='paragraphwimage-left'>
              <img src={'images/marching-band-style/style-5.png'}></img>
              <p className='articles-paragraph'>
                Traditional Style bands, also known as Show
                Bands, embrace their role as crowd entertainers.
                Competitive show bands refine a single show
                throughout the season, while those prioritizing
                entertainment over competition craft unique
                performances for each game. These shows
                usually comprise three to five musical pieces
                complemented by visually striking formations.
              </p>

              <p className='articles-paragraph'>
                The patterns formed by band members on the
                field often mirror the title or lyrics of the
                performed selection, drawing inspiration from
                the visionary band director William C. "Bill" Moffit,
                renowned for his work with Purdue University's
                All-American Marching Band. Notably, historically black colleges and universities (HBCUs)
                boast a unique show band style, characterized by the "ankle-knee" high step,
                choreographed dance routines, and a repertoire rooted in R&B, hip-hop, and contemporary
                pop. HBCU bands, featuring twirler lines and dancer lines, enrapture audiences with their
                mesmerizing performances. The likes of Southern University's Human Jukebox,
                Bethune-Cookman University's Marching Wildcats, North Carolina A&T State University's Blue
                and Gold Marching Machine, and Florida A&M University's Marching 100 have etched their
                names in the annals of HBCU band culture.
              </p>
            </div>

            <p className='articles-paragraph'>
              Another facet of the traditional style is showcased by several Big Ten Conference marching
              bands, such as Penn State University's Blue Band, The Ohio State University Buckeye
              Marching Band, the University of Michigan Marching Band, and Purdue University's
              All-American Band. These bands meld elements of military, corps, and traditional show
              styles, captivating audiences with symphonic compositions, marches, jazz, and older pop
              tunes. While they may include woodwinds, brass, and battery percussion, some also
              incorporate front ensemble keyboard percussion, colorguards, and dance-lines.
            </p>



            <h3 className='style-h3'>Carnival Bands: A British Twist</h3>
            <div className='paragraphwimage'>
              <img src={'images/marching-band-style/style-6.png'}></img>
              <p className='articles-paragraph'>
                Carnival bands, hailing from Britain, add a dash of whimsy to
                the marching band landscape. These bands often march in
                time with the music, participating in parades and
                competitions. Their instrumentation includes brass and
                percussion, with occasional woodwinds. In the United States,
                regions like Southern California and Seattle host carnival
                bands, known as Parade bands. They grace parades and
                parade competitions, taking inspiration from the American
                military band tradition while adopting the ceremonial British
                band style.
              </p>
            </div>

            <h3 className='style-h3'>Scramble Bands: A Comedic Interlude</h3>
            <div id='scramble-bands' className='paragraphwimage'>
              <img src={'images/marching-band-style/style-7.png'}></img>
              <p className='articles-paragraph'>

                Scramble bands, also known as 'Scatter' bands,defy
                convention with their playful antics. These bands
                eschew synchronized marching, instead scrambling
                from one formation to another, often injecting
                humor into their performances. While prevalent in
                the Ivy League and some California institutions,
                scramble-style bands are rare in high schools,
                mainly found in boarding schools and academies in
                the Northeast.
              </p>
            </div>



            <h3 className='style-h3'>Competitive Style: The Harmonious Blend</h3>
            <div className='paragraphwimage-left'>
              <img src={'images/marching-band-style/style-8.png'}></img>
              <p className='articles-paragraph'>
                Amidst the grandeur of competition,
                bands artfully blend styles to convey their
                theme, captivate visually, and craft an
                unforgettable show concept. While corps
                style usually takes center stage, glimpses
                of other styles emerge, enhancing the
                musical and visual impact. These bands
                meticulously design and rehearse their
                shows to secure victory in the fiercely
                competitive realm of marching band
                competitions. In their performances, a
                symphony of styles harmonizes to create
                a triumphant crescendo, reminding us
                that the world of marching bands knows no bounds in creativity and expression.
              </p>
            </div>

            <p className='articles-paragraph'> In the end, marching bands are a testament to the power of style, where music and
              movement merge to create captivating performances that resonate with audiences far and
              wide. Whether you're drawn to the precision of military marches, the theatricality of corps
              style, the crowd-pleasing entertainment of traditional shows, or the playful antics of
              scramble bands, the world of marching bands welcomes all to be enthralled by its rich
              tapestry of styles.</p>

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
