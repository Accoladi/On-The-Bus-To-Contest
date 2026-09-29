import React from 'react';
import cheeseBiscuitsImage from './recipe_images/CheddarCheeseBiscuits.png';
import DrumMajorsMomChili from './recipe_images/DrumMajors.png';
import BakedHamPepper from './recipe_images/BakedHamPepper&OniosSpread.png';
import EggSalad from './recipe_images/EggSalad.png';
import BaconWrappedChicken from './recipe_images/BaconWrappedSmokies.png';
import Alamo from './recipe_images/AlamoCrockpotChicken.png';
import Ethel from './recipe_images/EthelVegetableSoup.png'
import Sasuage from './recipe_images/Sausageballs.png';
import Mac from './recipe_images/MacandCheese.png';
import Tennessee from './recipe_images/TennesseeCrockpotMeatballs.png';
import Pimento from './recipe_images/PimentoCheeseSpread.png';
import Ad from '../Ad';

function Recipes() {
  const recipes = [
    { src: cheeseBiscuitsImage, alt: 'Cheese Biscuits' },
    { src: DrumMajorsMomChili, alt: 'Drum Majors Mom Chili' },
    { src: BakedHamPepper, alt: 'Baked Ham Pepper' },
    { src: EggSalad, alt: 'Egg Salad' },
    { src: BaconWrappedChicken, alt: 'Bacon Wrapped Chicken' },
    { src: Alamo, alt: 'Alamo Crockpot Chicken' },
    { src: Ethel, alt: 'Ethels Vegetable Soup' },
    { src: Sasuage, alt: 'Sausage Balls' },
    { src: Mac, alt: 'Mac and Cheese' },
    { src: Tennessee, alt: 'Tennessee Crockpot Meatballs' },
    { src: Pimento, alt: 'Pimento Cheese Spread' },
  ];

  return (
    <div className="card">
      <div className="image-container">
        <div className="overlay"></div>
        <img src="/images/tailgating.jpg" alt="Image description" className="cropped-image" />
        <div className="image-text">The Art of Tailgating</div>
      </div>
      <div className="Home__container">
        <div className='article-border'>
          <div className='article-container'>
            <div className='recipe-banner'>
              <div className='recipe-banner-text'>
                <h3>Between Bands Tailgating Recipes</h3>
              </div>
              <img src="/images/SOA-Article/recipes-banner.png" alt="SOA" />
            </div>
            <div className="recipes-container">
              <table>
                <tbody>
                  {recipes.map((recipe, index) => (
                    <tr key={index}>
                      <td>
                        <div className="common-image-class">
                          <img src={recipe.src} alt={recipe.alt} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Ad></Ad>
    </div>
  );
}
export default Recipes;
