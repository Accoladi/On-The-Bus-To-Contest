// Article 8
import React, { useCallback, useState } from "react";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import "../styles/article.css";

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const maxWidth = 1500;

//const PDFFile = '/pdfs/Articles/the saturday after.pdf';

export default function NextSaturday() {
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
        <img
          src="/images/next-saturday.jpg"
          alt="description"
          className="cropped-image"
        ></img>
        <div className="image-text">The Saturday After</div>
      </div>
      <div className="Home__container" ref={setContainerRef}>
        <div className="article-border">
          <div className="article-container">
            <h1>The Saturday After</h1>
            <div className='paragraphwimage'>
              <img src={'images/saturday-after/saturday-1.jpg'}></img>
              <p className="articles-paragraph">
                Have you felt as if marching band has controlled the lives of your
                family since mid-July. That’s four months out of your year. You’ve
                scheduled your life around marching band camp, marching
                rehearsals, booster club meetings, Friday night football games,
                and Saturday marching band contests. Marching band has become a
                major part of your life. Yes, it really has happened: This past
                Saturday was our last marching band contest for this year. So how
                are you going to be feeling this week, especially come Saturday
                when there is no marching band contest to attend? Maybe, you’ll be
                celebrating by requesting your marching band child serve you
                breakfast in bed in appreciation of all you’ve done. Or you’ll be
                off to a massage to have all the marching band stress eradicated
                from your life. Or a trip to Walgreens to get all the magazines
                you’ve missed reading while you’ve been forced to read the
                day-by-day changing schedule for the next Saturday’s contest. But
                where can you take your magazines and quietly read them?
                Starbucks.
              </p>
            </div>


            <div className='paragraphwimage-left'>
              <img src={'images/saturday-after/saturday-2.jpg'}></img>
              <p className="articles-paragraph">
                So how are you going to be feeling this week,
                especially come Saturday when there is no
                marching band contest to attend? Maybe, you’ll be
                celebrating by requesting your marching band
                child serve you breakfast in bed in appreciation of
                all you’ve done. Or you’ll be off to a massage to
                have all the marching band stress eradicated
                from your life. Or a trip to Walgreens to get all the
                magazines you’ve missed reading while you’ve
                been forced to read the day-by-day changing
                schedule for the next Saturday’s contest. But where can you take your magazines
                and quietly read them? Starbucks.
                Just an hour alone at Starbucks where you don’t have to hear “and the next band
                entering today’s field of competition is the . . .”
              </p>

            </div>


            <div className='paragraphwimage'>
              <img src={'images/saturday-after/saturday-3.jpg'}></img>

              <p className="articles-paragraph">
                So, you walk into Starbucks with magazines in hand
                and order a Double Ristretto Venti Half-Soy Nonfat
                Decaf Organic Chocolate Brownie Iced Vanilla
                Double-Shot Gingerbread Frappuccino Extra Hot
                with Whipped Cream. And while you wait with great
                anticipation for the barista to fill your order, you see
                one of those large leather club chairs open so you
                race over to claim it while you wait. You get your
                drink, sit down, and begin reading. You breath deep
                and let out an audible “Ahhhh…… .” Then all of a
                sudden you have a throwback moment from the previous Saturday hearing the
                announcer say, “it’s time to leave the prelims and get in line to get your tickets for the
                finals.” Then your previous Saturday’s emotions come rushing in, you’ve held that
                thought is the deepest cavern of your mind, but it’s now escaping; you were hoping
                your child’s band wouldn’t make the finals so you could get to Golden Corral early
                while the yeast rolls were fresh and hot. Yes, you now realize you’ve had these
                feelings bottled up inside for weeks about your own child’s band—and especially
                their band director—so you begin to feel guilty. In fact, this guilt is almost
                overwhelming, so you decide to go to confession.
              </p>
            </div>

            <div className='paragraphwimage-left'>
              <img src={'images/saturday-after/saturday-4.jpg'}></img>
              <p className="articles-paragraph">At confession, your priest pulls back the window
                and you say “Bless me Father, for I have sinned. It
                been four months since I’ve been to confession,
                because I’m a marching band parent and all of
                my free time has been taken from me. I have to
                confess that I so glad that marching band season
                is over. The priest says, “My dear child, all parents
                need balance between their own lives and the
                lives of their children.” Then there is a grand pause
                before he continues. “I wonder if my parents felt
                that way but never told me. You see, I played trombone in high school I loved being
                in marching band—it was the first time I ever felt like I was part of something bigger
                than just myself. You know, most everything I learned in life I learned in marching
                band. So, my penance may be a little personal. Go home and ask your child why they
                participate in marching band. Then either personally cross stitch it or have it done in
                calligraphy, frame it, and hang it next to your bathroom mirror. Now go in peace, take
                your family to dinner at Golden Corral, and most importantly, encourage your child
                to be in marching band next year.”</p>

            </div>


            <div className='paragraphwimage'>
              <img src={'images/saturday-after/saturday-5.jpg'}></img>
              <p className="articles-paragraph">
                The more important question is what is your child
                going to be doing next Saturday? How will he or
                she be reacting to a free non-marching band
                Saturday?   Research shows that many band
                members will go through a few weeks of
                marching band withdrawal. Marching band
                members have had their time structured for over
                four months. Most of their friends are in the band.
                They are accustomed to being with each other for
                more than twenty hours a week outside the
                classroom and they have been together the majority of every weekend for the past
                two months, as they work in tandem to achieve the same goal. It’s very much like a
                military unit coming home from deployment. Military families realize there are steps
                associated with the reintegration into their lives. This may be the same consideration
                you as a marching band family needs to anticipate:
              </p>


            </div>

            <p className="articles-paragraph">
              <li className="art-li">

                First, celebrate your child’s accomplishment, leadership, and
                overall service.
              </li>
            </p>

            <div className='paragraphwimage-left'>
              <img src={'images/saturday-after/saturday-6.jpg'}></img>
              <li className="articles-paragraph art-li">
                Consider writing your child’s name, band name, something like
                “Marched in Grand National Championship” or “Placed _____ in State
                Marching Band Contest”on your car windows. Have this already
                written on your car when your child gets off the bus when they
                arrive home from their last contest. Keep this on your car for at
                least a week or until your child asks you to wash it off. (To
                write on car windows use a Glass Chalk Paint Sponge Marker from
                Walmart, or White Window Marker from Amazon)
              </li>

              <li className="articles-paragraph art-li">
                Hang a sign in front of your house, inside your house, or in your
                yard denoting your child’s accomplishment. The sign should read
                something like this: Your child’s name, band name, “Marched in
                America’s Grand National Championship” or “Placed _____ in State
                Marching Band Contest” and make sure you write “We Are Proud of
                You” or “Our Family Is Proud of You.” (All on Amazon: White Kraft
                Butcher Paper Roll 18-inch x 100 feet, LARREEDE Blank Yard Signs
                with Stakes, 4 Pack 18 x 12, and ZEYAR Permanent Markers JUMBO
                size)
              </li>

            </div>

            <br></br>


            <li className="articles-paragraph art-li">
              Take pictures of your child in uniform and post it on your
              Facebook page and note how very proud you are on your child’s
              accomplishments as a marching band member. Consider other forms of
              social media if you are a part of Twitter, Instagram, and/or
              TikTok.
            </li>
            <br></br>
            <li className="articles-paragraph art-li">
              Have a celebration dinner within ten days of being home. This
              could be just your family or with another band member’s family
              that your child is close to.
            </li>
            <br></br>
            <li className="articles-paragraph art-li">

              Next, be patient. Realize your child may feel out of sync or
              disconnected with their new non-marching band schedule and
              he/she may need some time to readjust. They may need some time
              for reintegration within the family system which includes
              readjusting to a non-marching season schedule. Remember, they
              miss the time together with their friends so allow extra phone
              and texting time with their band friends.

            </li>
            <br></br>


            <div className='paragraphwimage'>
              <img src={'images/saturday-after/saturday-7.jpg'}></img>
              <li className="articles-paragraph art-li">
                Consider a family story night where your child tells stories about
                this marching season. You may have to tee-up the start to the
                stories: Band Camp....your best story, Band Practice....your
                funniest experience, Friday Night Football Games....what do you
                talk about in the stands, Marching Contests....what were your
                feelings just before walking onto the field? And overall, this
                marching season what was your best experience and what made you
                proud of yourself?
              </li>
              <br></br>
              <li className="articles-paragraph art-li">
                Allow for a season of fatigue. Their bodies
                and spirits need time to slow down and readjust. Research reveals
                that a change in pace and adjustments to new routines can lead to
                frustration and short tempers. They may be overly sensitive during
                this transition period which may result in emotional outbursts
                and/or they may even be rude. If this happens ask questions like:
                Do you miss your band time and your band friends?
              </li>

            </div>
            <br></br>


            <div className='paragraphwimage-left'>
              <img src={'images/saturday-after/saturday-8.jpg'}></img>
              <li className="articles-paragraph art-li">
                Combating feelings of loneliness. Your child has been
                part of an organization that has been working collectively
                towards a goal, with an end date. Now that this
                collective pursuit has passed, there may be a period
                (usually two-three weeks) in  which your child is sad
                and lonely. If you witness this happening affirm with your
                child that their feelings are normal, but the family also
                needs them and loves them.
              </li>

              <li className="articles-paragraph art-li">
                Projecting into the future. Often the band member has problems talking about the
                day-to-day activities of their post marching band season, so they began to talk
                about next year’s marching band season. Allow them the opportunity to dream
                about this with you, encourage this conversation and share that you are going to
                be there for them again.
              </li>

              <li className="articles-paragraph art-li">
                Another aspect of projecting into the future is when your child begins to talk about
                majoring in music and one day becoming a band director themselves. Share with
                them that you will be right there every step of the way as they explore this
                possibility. Remember, they are in the “exploring possibility” season not necessarily
                in the “decision” season.

              </li>

            </div>

            <br></br>






            <li className="articles-paragraph art-li">
              Have your child take the music career assessment profile that can be found at
              MyMusicFuture.com as this will give you and your child a good indication of
              success in the specific career field.
            </li>
            <br></br>

            <li className="articles-paragraph art-li">
              Subscribe to the service of Accoladi.com which is the nation’s premier online
              service for providing performing arts students (band students) with tools,
              information, and resources to maximize their college potential.

            </li>
            <br></br>

            <div className='paragraphwimage'>
              <img src={'images/saturday-after/saturday-9.jpg'}></img>
              <p className="articles-paragraph">
                Combating feelings of loneliness. Your child has been
                part of an organization that has been working collectively
                towards a goal, with an end date. Now that this
                collective pursuit has passed, there may be a period
                (usually two-three weeks) in  which your child is sad
                and lonely. If you witness this happening affirm with your
                child that their feelings are normal, but the family also
                needs them and loves them.
              </p>

            </div>
            <br></br>


          </div>
          <div className='article-container-2'>
            <a href="https://www.accoladi.com/" target='_blank'>
              <img src="../../../images/accoladi-add.jpg" alt="My Music Future promotion" style={{ width: '100%' }} />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
