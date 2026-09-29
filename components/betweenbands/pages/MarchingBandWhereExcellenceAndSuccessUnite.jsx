// Article 7
import React, { useCallback, useState } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import "../styles/article.css";
import Ad from '../Ad';


const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const maxWidth = 1500;

//const PDFFile = '/pdfs/Articles/marching band where excellence and success unite.pdf';

export default function MarchingBandWhereExcellenceAndSuccessUnite() {
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
        <img src="/images/who-are-these.jpg" alt="Image description" className="cropped-image"></img>
        <div className="image-text">Marching Band: Where Excellence and Success Unite</div>
      </div>
      <div className="Home__container" ref={setContainerRef}>
        <div className='article-border'>
          <div className='article-container'>

            <div id='who-are-these-band-members-head'>
              <img src={'images/who-are-these-band-members/watbm-1.png'}></img>

              <p className='articles-paragraph'>
                As the bands march proudly across the field, captivating
                our hearts with their dedication to excellence, it becomes
                evident that there's more to these performers than their
                musical prowess. With over forty years of research and
                analysis, the present and future of these young musicians
                have been meticulously documented. Here, we unveil the
                remarkable highlights:
              </p>

            </div>




            <h3 className='articles-h3'>General Overview</h3>
            <div className='articles-line'></div>
            <ul className='articles-bullet-list' style={{ listStyleType: 'disc' }}>
              <li>Band Members Are Smart: Playing an instrument and reading music enhance cognitive,
                emotional, and motor skills, laying the foundation for all other learning endeavors.</li>
              <li>Advanced Literacy Skills: Band members exhibit larger vocabularies and more advanced
                reading skills than their peers who do not partake in music.</li>
              <li>Academic Excellence: Band members tend to excel in all of their studies, possess
                enhanced critical thinking skills, stay in school, and pursue further education.</li>
              <li>High Graduation and Attendance Rates: Band members boast an impressive 92.2% high
                school graduation rate and a 93.9% attendance rate, significantly higher than non-music
                students.</li>
              <li>Enhanced Brain Development: Their musical journey contributes to greater brain
                development and improved memory skills.</li>
              <li>Higher GPAs: Band members consistently maintain higher grade point averages GPAs in
                high school.</li>
              <li>Top-Performing Graduates: In American high schools, 87.6% of band members rank in the
                top ten percent of their graduating class, with a staggering 94.9% of valedictorians and
                salutatorians being band, orchestra, or choral members.</li>
              <li>Discipline and Camaraderie: Band members are less likely to have disciplinary issues,
                fostering camaraderie, reducing racism, and diminishing the use of harmful sarcasm.</li>
              <li>Healthy Lifestyle Choices: They exhibit the lowest levels of alcohol, tobacco, and illicit drug
                use in comparison to any other group in society.</li>
            </ul>

            <h3 className='articles-h3'>Collegiate Path</h3>
            <div className='articles-line'></div>
            <div className='listwimage'>
              <img src={'images/who-are-these-band-members/watbm-2.png'}></img>
              <ul className='articles-bullet-list' style={{ listStyleType: 'disc' }}>
                <li>College-Bound: Band members and music students
                  in American high schools are at the  forefront when it
                  comes to college attendance, with a rate of 86.4%.</li>
                <li>Scholarship Success: They achieve a 91.2% rate of
                  scholarship funds beyond government assistance,
                  resulting in more manageable loan payback
                  amounts and timeframes.</li>
                <li>Collegiate Performing Ensembles: Regardless of their
                  desired degree path, 47.9% of band  members
                  participate in collegiate performing ensembles.</li>
                <li>Music Majors: A substantial 16.8% of band members major in music and related music
                  degrees.</li>
                <li>High Graduation Rates: Band members enjoy an impressive collegiate graduation rate of
                  88.4%, a striking contrast to the national average of 60.4% for non-music participants.</li>
                <li>Advanced Study: A remarkable 46.4% of band members pursue advanced study through
                  graduate programs.</li>
                <li>Outstanding Exam Scores: Music majors excel on the Graduate Records Examinations
                  (GRE), the Medical College Admission Test (MCAT), Law School Admission Test (LSAT), and
                  the Graduate Management Admission Test (GMAT) by a remarkable 86.4% compared to
                  non-music majors.</li>
                <li>Medical School Admission: Music majors are the most likely group of college graduates to
                  gain admission to medical school.</li>

              </ul>


            </div>


            <h3 className='articles-h3'>General Career Paths</h3>
            <div className='articles-line'></div>
            <div className='listwimage'>
              <img src={'images/who-are-these-band-members/watbm-3.png'}></img>
              <ul className='articles-bullet-list-condensed' style={{ listStyleType: 'disc' }}>
                <li>Computer Sciences and Information Services: 16.2%</li>
                <li>Business: 13.1%</li>
                <li>Health Services: 10.2%</li>
                <li>Financial Services: 9.1%</li>
                <li>Engineering: 8.8%</li>
                <li>Education (including Music Education): 8.7%</li>
                <li>Biological and Biomedical Services: 8.4%</li>
                <li>Visual and Performing Arts: 8.2%</li>
                <li>Psychology and Clergy: 4.2%</li>
                <li>Legal Services: 2.7%</li>
                <li>Communication and Journalism: 2.5%</li>
                <li>Travel and Leisure: 1.7%</li>
                <li>Social Sciences and History: 1.2%</li>
                <li>Other: 5.0%</li>

              </ul>


            </div>

            <h3 className='articles-h3' >Conclusion</h3>
            <div className='articles-line'></div>
            <p id='watbm-conclusion'>
              In summary, what we discover about the remarkable band members marching before us is
              truly inspiring. They are not just smart and talented; they are driven, unique, ambitious,
              energetic, capable, devoted, and the list goes on. These musicians are the embodiment of
              excellence, embodying qualities such as creativity, loyalty, and innovation. They shine
              brightly as wonderful, well-rounded individuals who are set to make a lasting impact on the
              world. Their journey exemplifies that excellence in the arts cultivates remarkable success in
              all aspects of life
            </p>



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
