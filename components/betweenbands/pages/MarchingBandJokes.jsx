// Marching Band Jokes Post

import React from 'react';
import "../styles/article.css";
import Ad from '../Ad';

const MarchingContests = () => {
  return (
    <div className="card">
      <div className="image-container">
        <div className="overlay"></div>
        <img src="/images/band-jokes-cover.jpg" alt="Marching Band" className="cropped-image" />
        <div className="image-text">Marching Band<br />Can be Funny too</div>
      </div>
      <div className="Home__container">
        <div style={{ backgroundImage: `url(/images/article-background.jpg)`, backgroundSize: 'cover' }} className='jokes-bg'>
          <div >
            <div id='jokes-images'>
              <img className='jokes-img' src={'images/jokes/jokes-1.jpg'}></img>
              <img className='jokes-img' src={'images/jokes/jokes-2.jpg'}></img>
              <img className='jokes-img' src={'images/jokes/jokes-3.jpg'}></img>
              <img className='jokes-img' src={'images/jokes/jokes-4.jpg'}></img>
              <img className='jokes-img' src={'images/jokes/jokes-5.jpg'}></img>
              <img className='jokes-img' src={'images/jokes/jokes-6.jpg'}></img>
              <img className='jokes-img' src={'images/jokes/jokes-7.jpg'}></img>
              <img className='jokes-img' src={'images/jokes/jokes-8.jpg'}></img>
              <img id='joke-img-tall' src={'images/jokes/jokes-9.jpg'}></img>

            </div>
          </div>
          <h2 id='this-is-no-joke'>And This Is No Joke!</h2>
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

export default MarchingContests;
